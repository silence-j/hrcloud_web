<template>
  <div class="salary" @click.stop="mutilTreeData.showTree=false">
    <div class="mt-20">
      <el-form :model="postForm">
        <div class="search-form_box clearfix length-box search">
          <div class="search-form_item">
            <el-input v-model="postForm.keyWords" placeholder="请输入关键字" @keyup.enter.native="SearchInfo"></el-input>
          </div>
          <div class="search-form_item">
            <mutil-search-dept-tree
              :mutilTreeData="mutilTreeData"
            />
          </div>
          <div class="search-form_item">
            <el-select v-model="postForm.status" filterable clearable placeholder="全部状态">
              <el-option
                v-for="item in perState"
                :label="item.name"
                :value="item.value"
                :key="item.index">
              </el-option>
            </el-select>
          </div>
          <div class="search-form_item start-line">
            <el-date-picker
              v-model="postForm.startTime"
              type="date"
              clearable
              @change="changeStart"
              placeholder="开始时间">
            </el-date-picker>
          </div>
          <div class="search-form_item">
            <el-date-picker
              v-model="postForm.endTime"
              type="date"
              clearable
              @change="changeEnd"
              :picker-options="pickerBeginDateAfter"
              placeholder="结束时间">
            </el-date-picker>
          </div>
          <div class="search-form_button pt-3">
            <el-button type="primary" @click="SearchInfo" size="mini">查 询</el-button>
            <el-button size="small" @click="chooseData.deepSearchVisible = true">高级查询</el-button>
          </div>
        </div>
      </el-form>
    </div>
    <div class="search-data mt-20">
      <el-button type="primary" size="small" v-if="permission  .indexOf('导出')!=-1" @click="exportBtn">导 出</el-button>
      <br/><br/>
      <div class="table-setting-warp">
        <div class="table-setting-icon el-icon-setting" @click="chooseMsg"></div>
        <el-table :data="searchList"
                  border
                  @sort-change="sortChange"
                  class="cell-h92"
                  style="max-width: 100%;min-width:700px;overflow-x: auto"
        >
          <el-table-column prop="a" label="序号" width="60px">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <div v-for="(item,index) in fieldList" :key="item.id">
            <template v-if="item.prop == 'userStatus'">
              <el-table-column prop="userStatus" label="人员状态" width="135px">
                <template slot-scope="scope">
                  <span v-if="scope.row.userStatus === 5">正式员工</span>
                  <span v-if="scope.row.userStatus === 6">退休</span>
                  <span v-if="scope.row.userStatus === 7">退休返聘</span>
                  <span v-if="scope.row.userStatus === 8">离职申请中</span>
                  <span v-if="scope.row.userStatus === 9">离职办理中</span>
                  <span v-if="scope.row.userStatus === 19">更正审核中</span>
                  <span style="color: #6E7382;" v-if="scope.row.userStatus === 10">已离职</span>
                  <span v-if="scope.row.userStatus === 11">调动中</span>
                  <span style="color: #A25600;" v-if="scope.row.userStatus === 12">已调动</span>
                  <span style="color: #0855DB;" v-if="scope.row.userStatus === 13">试用</span>
                  <span style="color: #AC1DD8;" v-if="scope.row.userStatus === 14">实习</span>
                  <span v-if="scope.row.userStatus === 16">外部退休返聘</span>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="item.prop == 'standard'">
              <el-table-column :prop="item.prop" :label="item.name" width="200px">
                <template slot-scope="scope">
                  <el-tooltip popper-class="toolTipClass" effect="light" :content="scope.row.standard" placement="right">
                    <div class="line-clamp3">
                      {{scope.row.standard}}
                    </div>
                  </el-tooltip>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="index >= lenFile">
              <el-table-column :prop="item.prop" :label="item.name" width="200px">
                <template slot-scope="scope">
                  <span v-if="scope.row.mlist" >
                    <span v-for="subItem in scope.row.mlist" :key="subItem.id">
                    <span v-if="scope.row.isProbation && scope.row.isProbation === 1">
                      <span v-if="item.id === subItem.grandId && subItem.type === 2">{{subItem.money}} <span v-if="subItem.unit">{{subItem.unit}}</span> </span>
                    </span>
                    <span v-if="scope.row.isProbation && scope.row.isProbation === 2">
                      <span v-if="item.id === subItem.grandId && subItem.type === 1">{{subItem.money}} <span v-if="subItem.unit">{{subItem.unit}}</span> </span>
                    </span>
                  </span>
                  </span>
                  <span v-else></span>
                </template>
              </el-table-column>
            </template>
            <template v-else>
              <el-table-column :label="item.name" :prop="item.prop" :key="item.name" :sortable="item.orderFlag === 1" min-width="180">
              </el-table-column>
            </template>
          </div>

          <el-table-column label="操作" width="150px" fixed="right">
            <template slot-scope="scope">
              <div class="operation">
                <span v-if="scope.row.canOperate === 1">
                    <span v-if="scope.row.userStatus === 5 || scope.row.userStatus === 13 || scope.row.userStatus === 14">
                       <span v-if="permission.indexOf('调薪')!=-1" @click="changeSy(scope.row)">调薪</span>
                       <span v-if="permission.indexOf('代发')!=-1"  @click="subSy(scope.row)">代发</span>
                    </span>
                </span>
                <span v-if="permission.indexOf('查看')!=-1" @click="seeSy(scope.row)">查看</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        v-if="page.totalCount > 10"
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.page"
        :page-sizes="[10, 20, 50]"
        :page-size="page.pageSize"
        layout="total, prev, pager, next, sizes, jumper"
        :total="page.totalCount">
      </el-pagination>
    </div>
    <el-dialog
      width="896px"
      class="see-dialog look-data maxTable"
      title="查看"
      :visible.sync="seeDialog">
      <el-table
        :data="lookData"
        >
        <el-table-column prop="type" label="调薪方式" width="135">
          <template slot-scope="scope">
            <!--<span>{{scope.row.typeText}}</span>-->
            <span>{{scope.row.typeStr}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="effectiveDate" label="生效日期" width="135"></el-table-column>
        <el-table-column prop="standard" label="工资结构" width="300">
          <template slot-scope="scope">
            <span v-if="scope.row.isProbation && scope.row.isProbation === 1">{{scope.row.probationStandard}}</span>
            <span v-else="">{{scope.row.standard}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payrolCompany" label="发放公司" width="135"></el-table-column>
        <el-table-column prop="remark" label="调薪说明" width="135"></el-table-column>
        <el-table-column prop="changeVal" label="变化幅度" width="135">
          <template slot-scope="scope">
            <span v-if="scope.row.changeVal < 0"><em style="color: #FF7500;" class="el-icon-caret-bottom"></em> {{scope.row.changeVal}}</span>
            <span v-if="scope.row.changeVal === 0">{{scope.row.changeVal}}</span>
            <span v-if="scope.row.changeVal > 0"><em style="color: #FF7500;" class="el-icon-caret-top"></em> {{scope.row.changeVal}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="操作时间" width="165"></el-table-column>
        <el-table-column prop="creator" label="操作人" width="135"></el-table-column>
      </el-table>
      <el-button class="default-border close-btn" @click="seeDialog = false">关闭</el-button>
    </el-dialog>

    <el-dialog @close="sureCancel2" width="1000px" class="change-salary" title="调薪" :visible.sync="changeDialog">
      <el-form label-width="100px" ref="regularFormRef" :model="upDownSy">
        <el-row>
          <el-col :span="8">
            <el-form-item label="调薪方式:"
                          prop="changeValue"
                          :rules="{ required: true, message: '调薪方式不能为空', trigger:'change'}">
              <el-select v-model="upDownSy.changeValue">
                <el-option
                  v-for="item in changeValueOption"
                  :key="item.id"
                  :label="item.codeText"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="effective-data"
                          label="生效日期:"
                          prop="effectiveDate"
                          :rules="{ required: true, message: '生效日期不能为空', trigger:'change'}"
            >
              <el-date-picker
                v-model="upDownSy.effectiveDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="调薪说明:"
                          prop="explain"
                          :rules="{ required: true, message: '调薪说明不能为空', trigger:['blur']}">
              <el-input type="textarea" :rows="4" v-model="upDownSy.explain"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="原工资标准:">
              <span>{{upDownSy.standard}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="rowLast">
          <el-col :span="10">
            <el-form-item v-if="hasedStand.userStatus && (hasedStand.userStatus === 14 || hasedStand.userStatus === '14')"
                          label="新工资标准:"
                          prop="exercitationSalary"
                          :rules="{ required: true, message: '实习工资不能为空', trigger:'change'}">
              <el-input style="width: 320px;" placeholder="请输入实习工资" v-model="upDownSy.exercitationSalary">
                <template slot="append">元/月</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              v-if="hasedStand.userStatus && (hasedStand.userStatus === 14 || hasedStand.userStatus === '14')"
              prop="exercitationAllowance" :rules="{ required: true, message: '实习津贴不能为空', trigger:'change'}">
              <el-input  style="width: 320px;" placeholder="请输入实习津贴" v-model="upDownSy.exercitationAllowance">
                <template slot="append">元/月</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item v-if="hasedStand.userStatus && (hasedStand.userStatus === 5 || hasedStand.userStatus === 7 || hasedStand.userStatus === 16)" label="新工资标准:" required class="exercitation-form_item_box clearfix">
              <div class="div-row_box clearfix arr-left">
                <salary-pure ref="salaryPureRef"
                v-if="changeDialog"
                :salaryData="salaryForm"/>
              </div>
            </el-form-item>
            <el-form-item v-if="hasedStand.userStatus && (hasedStand.userStatus === 13)">
              <div class="div-row_box mt-20 clearfix arr-left">
                <salary-all
                v-if="changeDialog"
                  ref="salaryAllRef"
                  :salaryForm="salaryForm"
                  :trySalaryForm="trySalaryForm"
                />
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align: center">
        <el-button class="default-border" @click="sureCancel2">取消</el-button>
        <el-button type="primary" @click="sureUpSy">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog @close="orgDatas2.showTree=false;subDialog=false" width="444px" class="see-dialog take-other" :visible.sync="subDialog">
      <div @click.stop="orgDatas2.showTree=false">
        <div class="title">代发</div>
        <ul>
          <li class="changeSalary">
            <span>代发公司:</span>
            <span class="tree">
          <search-dept-tree :orgDatas="orgDatas2" ref="deptTree2"/>
          </span>
          </li>
        </ul>
        <div style="text-align: center;padding-bottom: 30px;">
          <el-button class="default-border" @click="sureCancel">取消</el-button>
          <el-button type="primary" @click="sureSub">确定</el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 导出列表 -->
    <form style="display:none" target="_blank" name="form" method="POST" ref="submitExcel" id="submitExcel" :action="hostBaseUrl+'/user/export/salary/list'">
      <p>keyword: <input type="text" id="keyword" name="keyword" value="" /></p>
      <p>userStatus: <input type="text" id="userStatus" name="userStatus" value="" /></p>
      <p>searchOrgIds: <input type="text" id="searchOrgIds" name="searchOrgIds" value="" /></p>
      <p>effectiveStart: <input type="text" id="effectiveStart" name="effectiveStart" value="" /></p>
      <p>effectiveEnd: <input type="text" id="effectiveEnd" name="effectiveEnd" value="" /></p>
      <input type="submit" value="Submit"/>
    </form>
    <!--高级搜索和筛选字段的dialog-->
    <choose-column-search
      :chooseData="chooseData"
      @sureDeepSearch="sureDeepSearch"
    />
  </div>
</template>
<script>
import ChooseColumnSearch from 'components/ChooseColumnSearch.vue'
import SalaryApi from 'static/api/wage/wage'
import SalaryPure from 'components/SalaryAssembly/pure-salary.jsx'
import SalaryAll from 'components/SalaryAssembly/all-salary.jsx'
import SearchDeptTree from 'components/SearchDeptTree'
import { timeZeroToString } from 'assets/js/common'
import { listByUserId, getSysDic } from 'static/api/common/common'
import { getToken } from 'assets/js/util'
import { salaryStandarJson, hostBaseUrl } from 'utils/config'
import { getSalarySettingList, saveSalaryStructure } from 'static/api/setting/index'
import { salaryParams } from 'assets/js/mixins'
import { getExmine } from 'assets/js/exmine'
import MutilSearchDeptTree from 'components/MutilSearchDeptTree'

export default {
  mixins: [salaryParams],
  data () {
    return {
      mutilTreeData: {
        filterName: '',
        orgIds: [],
        dataTree: [],
        checkDatas: [],
        showTree: false
      },
      chooseData: {
        chooseVisible: false,
        deepSearchVisible: false,
        filedType: 'salaryMonth',
        fieldList: [],
        selectedWordArr: [{ prop: '', op: '', value: '', width: '', searchFlag: '' }]
      },
      orgDatas1: {
        filterName: '',
        orgId: '',
        dataTree: [],
        showTree: false
      },
      orgDatas2: {
        filterName: '',
        orgId: '',
        dataTree: [],
        showTree: false,
        bindData: 'different',
        isLimit: '0'
      },
      standStr: '',
      hostBaseUrl: '',
      seeDialog: false,
      changeDialog: false,
      subDialog: false,
      lookData: [],
      upDownSy: {
        explain: '',
        changeValue: '',
        effectiveDate: '',
        standard: '',
        exercitationSalary: '',
        exercitationAllowance: ''
      },
      lenFile: -1,
      hasedStand: '',
      postStartTime: '',
      postEndTIme: '',
      postForm: {
        keyWords: '',
        orgName: '',
        startTime: '',
        endTime: '',
        status: '',
        options: []
      },
      probaSalaryParams: '',
      formSalaryParams: '',
      salaryForm: this.deepClone(salaryStandarJson),
      trySalaryForm: this.deepClone(salaryStandarJson),
      page: {
        page: 1,
        pageSize: 10,
        totalCount: 0
      },
      stand: [
        { name: '核定工资', value: 0 },
        { name: '评议工资', value: 1 },
        { name: '协议工资', value: 2 },
        { name: '岗位工资', value: 3 }
      ],
      subData: [],
      perState: [
        { name: '正式员工', value: 5 },
        { name: '离职申请中', value: 8 },
        { name: '离职办理中', value: 9 },
        { name: '更正审核中', value: 19 },
        { name: '调动中', value: 11 },
        { name: '试用', value: 13 },
        { name: '实习', value: 14 }
      ],
      searchList: [],
      pickerBeginDateAfter: {
        disabledDate: (time) => {
          let beginDateVal = this.postForm.startTime
          if (beginDateVal) {
            return time.getTime() < beginDateVal
          }
        }
      },
      // 选择显示字段
      fieldList: [],
      fieldListBefore: [],
      prop: '',
      order: '',
      changeValueOption: []
    }
  },
  components: {
    ChooseColumnSearch,
    MutilSearchDeptTree,
    SearchDeptTree,
    SalaryPure,
    SalaryAll
  },
  mounted () {
    this._getUserFiled()
  },
  computed: {
    permission () {
      return getExmine().salaryWage
    }
  },
  methods: {
    exportBtn () {
      document.getElementById('effectiveStart').setAttribute('value', this.postStartTime ? timeZeroToString(this.postStartTime) : null)
      document.getElementById('effectiveEnd').setAttribute('value', this.postEndTime ? timeZeroToString(this.postEndTime) : null)
      document.getElementById('keyword').setAttribute('value', this.postForm.keyWords ? this.postForm.keyWords : null)
      document.getElementById('userStatus').setAttribute('value', this.postForm.status ? this.postForm.status : null)
      // document.getElementById('searchOrgIds').setAttribute('value', this.orgDatas1.orgId ? this.orgDatas1.orgId.replace(/,/g, ' ') : null)
      document.getElementById('searchOrgIds').setAttribute('value', this.mutilTreeData.orgIds.length ? this.mutilTreeData.orgIds.join(' ') : null)
      this.$refs.submitExcel.submit()
    },
    // 高级查询确认
    sureDeepSearch (deepSearchArr) {
      this.chooseData.deepSearchVisible = false
      let options = []
      deepSearchArr.forEach(item => {
        if (item.width) {
          options.push({
            field: item.width,
            op: item.op,
            value: item.value,
            searchFlag: item.searchFlag
          })
        }
      })
      this.postForm.options = options
      setTimeout(() => {
        this.SearchInfo()
      }, 200)
    },
    SearchInfo () {
      this.page.page = 1
      this.page.pageSize = 10
      this._getSalaryList()
    },
    _getSalaryList () {
      let params = {
        page: this.page.page,
        size: this.page.pageSize,
        options: this.postForm.options,
        keyword: this.postForm.keyWords ? this.postForm.keyWords : null,
        userStatus: this.postForm.status ? this.postForm.status : null,
        searchOrgIds: this.mutilTreeData.orgIds ? this.mutilTreeData.orgIds.join(',') : [],
        effectiveStart: this.postStartTime ? this.postStartTime : null,
        effectiveEnd: this.postEndTime ? this.postEndTime : null,
        prop: this.prop || null,
        order: this.order || null
      }
      SalaryApi.getSalaryList(params).then(res => {
        this.searchList = res.result.records
        this.page.totalCount = res.result.total
      })
    },
    changeSy (row) {
      this.salaryForm = this.deepClone(salaryStandarJson)
      this.trySalaryForm = this.deepClone(salaryStandarJson)
      this.standStr = row.standard
      this.$store.commit('SET_INFO_BY_ORG_ID', row.payrolCompanyId)
      this.changeDialog = true
      setTimeout(() => {
        this.$refs.regularFormRef.resetFields()
        if (row.userStatus === 5 || row.userStatus === 7 || row.userStatus === 16) {
          this.$refs.salaryPureRef.resetSalaryValidate()
        }
        if (row.userStatus === 13) {
          this.$refs.salaryAllRef.commonResetSalaryValidata()
          this.$store.commit('SET_PROBATION', 'clear')
          // this.$refs.salaryAllRef.resetTryValidate()
          // this.$refs.selectSalaryRef.clearPrecent()
        }
      })
      this.hasedStand = row
      this.upDownSy.standard = row.standard
    },
    sureCancel2 () {
      this.upDownSy.changeValue = ''
      this.upDownSy.effectiveDate = ''
      this.upDownSy.explain = ''
      this.changeDialog = false
    },
    // 确认调薪
    sureUpSy () {
      let params = {}
      let isOn = ''
      let salaryItem = ''
      this.$refs.regularFormRef.validate(valid => {
        if (valid) {
          if (this.hasedStand.userStatus === 5 || this.hasedStand.userStatus === 7 || this.hasedStand.userStatus === 16) {
            if (valid && this.$refs.salaryPureRef.checkSalaryValidate()) {
              isOn = '5'
              salaryItem = this._getSalaryParams()
            }
          }
          if (this.hasedStand.userStatus === 13) {
            if (valid && this.$refs.salaryAllRef.commonCheckSalaryValidate()) {
              isOn = '13'
              salaryItem = this._getTrySalaryParams()
            }
          }
          if (this.hasedStand.userStatus === 14) {
            salaryItem = ''
            isOn = '14'
          }
        }
      })
      if (isOn !== '') {
        params = {
          userStatus: this.hasedStand.userStatus,
          remark: this.upDownSy.explain,
          id: this.hasedStand.id,
          type: this.upDownSy.changeValue,
          userId: this.hasedStand.userId,
          effectiveDate: this.upDownSy.effectiveDate ? this.changeDate(this.upDownSy.effectiveDate) : ''
        }
        if (isOn === '13') {
          params.isProbation = 1
        }
        if (isOn === '14') {
          params.exercitationSalary = this.upDownSy.exercitationSalary
          params.exercitationAllowance = this.upDownSy.exercitationAllowance
        }
        saveSalaryStructure(Object.assign({}, salaryItem, params)).then(res => {
          this.$message.success('调薪成功')
          this.changeDialog = false
          this._getSalaryList()
          this.upDownSy.effectiveDate = ''
          this.upDownSy.explain = ''
        })
      }
    },
    subSy (row) {
      this.orgDatas2.orgId = ''
      this.orgDatas2.filterName = ''
      this.subData = []
      this.subDialog = true
      this.subData = row
      setTimeout(() => {
        this.$refs.deptTree2.clearSelectTree()
      })
    },
    seeSy (row) {
      this.lookData = []
      this.seeDialog = true
      SalaryApi.lookSalary({ userId: row.userId }).then(res => {
        if (res.result) {
          this.lookData = res.result
        }
      })
    },
    sureCancel () {
      this.subDialog = false
      this.$store.commit('SET_SINGLE_CHECKED_ORGID', '')
    },
    sureSub () {
      let params = {
        id: this.subData.id,
        payrolCompanyId: this.orgDatas2.orgId,
        payrolCompany: this.orgDatas2.filterName
      }
      if (params.payrolCompanyId !== '' && params.payrolCompany !== '') {
        SalaryApi.subSalary(params).then(res => {
          this.$message.success('设置成功')
          this._getSalaryList()
          this.$store.commit('SET_SINGLE_CHECKED_ORGID', '')
          this.subDialog = false
        })
      } else {
        this.$message.warning('请选择代发公司')
      }
    },
    changeDate (value) {
      let time = new Date(value)
      let year = time.getFullYear()
      let month = (time.getMonth() < 9 ? '0' : '') + (time.getMonth() + 1)
      let day = (time.getDate() < 10 ? '0' : '') + time.getDate()
      return year + '-' + month + '-' + day
    },
    changeStart () {
      this.postStartTime = this.postForm.startTime ? this.changeDate(this.postForm.startTime) : ''
    },
    changeEnd () {
      this.postEndTime = this.postForm.endTime ? this.changeDate(this.postForm.endTime) : ''
    },
    handleSizeChange (val) {
      this.page.page = 1
      this.page.pageSize = val
      this._getSalaryList()
    },
    handleCurrentChange (val) {
      this.page.page = val
      this._getSalaryList()
    },
    searchPostList () {},
    // 选择显示字段
    chooseMsg () {
      this.chooseData.chooseVisible = true
      this.chooseData.fieldList = this.fieldListBefore.map(item => item.prop)
      // this.$refs.chooseColumn.chooseMsg()
    },
    // 获取原来选择字段
    _getUserFiled () {
      this.fieldList = []
      let preload = {
        userId: getToken('loginId').toString(),
        type: 'salaryMonth'
      }
      listByUserId(preload).then(data => {
        if (data.result) {
          this.fieldListBefore = data.result
          this.lenFile = data.result.length
          getSalarySettingList({ types: [1, 3] }).then(dataItem => {
            if (dataItem.result) {
              let file = []
              file = dataItem.result
              this.fieldList = this.fieldListBefore.concat(file)
            }
          })
        }
        setTimeout(() => {
          this._getSalaryList()
        }, 20)
      })
    },
    // 排序
    sortChange (column, prop, order) {
      if (column && column.prop) {
        let orderColumn = this.fieldListBefore.filter(item => item.prop === column.prop)[0].orderColumn
        this.prop = orderColumn
        this.order = column.order
        this._getSalaryList()
      } else {
        this.prop = ''
        this.order = ''
        this._getSalaryList()
      }
    },
    /* 获取数字字典 */
    async _getQueryClassList () {
      /* 调薪方式 */
      await getSysDic('salaryType').then(data => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.changeValueOption.push(item)
            }
          })
        }
      })
    }
  },
  created () {
    this.hostBaseUrl = hostBaseUrl
    this._getQueryClassList()
  }
}
</script>
<style lang="less" scoped>
  .toolTipClass{
    max-width: 200px!important;
    max-height: 250px;
    overflow-y: auto;
    line-height: 1.5;
  }
</style>
<style scoped lang="less">
  @import "~assets/less/homePage";
  @import "~assets/less/page";
  .maxTable{
    &/deep/.el-table{
      max-height: 600px!important;
    }
  }
  .take-other{
    &/deep/.el-dialog__header{
      padding: 0;
    }
    .title{
      color: #263946 !important;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      padding-top: 20px;
    }
    &/deep/.el-dialog__body{
      padding: 0;
      ul{
        padding: 30px 20px;
      }
    }
  }
  &/deep/.el-dialog{
    .mean-title{
      &::after{
        top:13px;
      }
    }
  }
  .class-mustTry{
    .salary-box {
      margin-top: -20px;
    }
  }
  .el-form-item.mustForm::before{
    left: 8px;
  }
  .el-table::before{
    height: 0;
  }
  .arr-left{
    position: relative;
    left: -90px;
  }
  .rowLast{
    .el-form-item.mustForm::before{
      left: -7px;
    }
  }
  .salary-item_box {
    /deep/ .el-form{
      margin-top:-38px;
    }
    /deep/.el-form-item .el-form-item {
      margin-bottom: 20px;
    }
  }
</style>
