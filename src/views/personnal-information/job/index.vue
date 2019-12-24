<template>
  <section class="container" @click="mutilTreeData.showTree=false">
    <el-row>
      <el-button type="primary" size="small" @click="addjobMsg" v-show="permission.indexOf('新增') !=-1">新增职务</el-button>
      <el-button type="primary" size="small" @click="ExportMsg" v-show="permission.indexOf('导出') !=-1">导  出</el-button>
    </el-row>
    <el-form class="mt-20">
      <el-row :gutter="20"  type="flex">
        <el-col :span='4'><el-input v-model="jobForm.inputValue" placeholder="请输入关键字" @keyup.enter.native="searchjobList"></el-input></el-col>
        <el-col :span="4">
          <div class="search-form_item">
            <mutil-search-dept-tree
            :mutilTreeData="mutilTreeData"
            />
          </div>
        </el-col>
        <el-col :span="4">
          <el-select v-model="jobForm.dutyName" filterable clearable placeholder="请选择任职职务">
            <el-option
              v-for="item in dutynameDatas"
              :label="item.codeText"
              :value="item.code"
              :key="item.index">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="jobForm.dictDutyIdValue" filterable clearable placeholder="请选择职务级别">
            <el-option
              v-for="item in dutylevelDatas"
              :label="item.codeText"
              :value="item.code"
              :key="item.index">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="jobForm.dictTreatmentIdValue" filterable clearable placeholder="请选择待遇级别">
            <el-option
              v-for="item in treatmentlevelDatas"
              :label="item.codeText"
              :value="item.code"
              :key="item.index">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="jobForm.appointRemoveValue" filterable clearable placeholder="请选择任职状态">
            <el-option
              v-for="item in appointRemoveSelect"
              :label="item.label"
              :value="item.value"
              :key="item.index">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <br/>
      <el-row :gutter="20"  type="flex">
        <el-col :span="4">
          <el-select v-model="jobForm.statusValue" filterable clearable placeholder="请选择职务性质">
            <el-option
              v-for="item in statusSelect"
              :label="item.label"
              :value="item.value"
              :key="item.index">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="jobForm.isPrincipal" filterable clearable placeholder="请选择是否为负责人">
            <el-option
              v-for="item in personSelect"
              :label="item.label"
              :value="item.value"
              :key="item.index">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="mt-20">
      <el-button type="primary" size="mini" @click="searchjobList">查询</el-button>
      <el-button size="mini" @click="chooseData.deepSearchVisible = true">高级查询</el-button>
    </el-row>

    <div class="table-setting-warp">
      <div class="table-setting-icon el-icon-setting" @click="chooseMsg"></div>
      <el-table
        class="mt-20"
        :data="jobListDatas"
        border
        tooltip-effect="dark" @sort-change="sortChange">
        <el-table-column
          label="序号"
          type="index"
          width="60">
        </el-table-column>
        <template v-for="item in fieldList">
          <el-table-column
            :label="item.name"
            :prop="item.prop" :key="item.name" :sortable="item.orderFlag === 1">
          </el-table-column>
        </template>
        <el-table-column
          label="操作"
          fixed="right"
          width="140px">
          <template slot-scope="scope">
            <div class="operation">
              <span v-show="permission.indexOf('查看') !=-1" @click="lookMsg(scope.row)">查看</span>
              <span v-show="(permission.indexOf('免除') !=-1) && (scope.row.appointRemoves !== '卸任' && scope.row.auditStatus !== 1)" @click="exemptMsg(scope.row)">免除</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageMsg.currentPage"
      :page-sizes="pageMsg.pageSizes"
      :page-size="pageMsg.pageSize"
      :total="pageMsg.total">
    </pagination>

    <!--选择新增人员弹框-->
    <el-dialog
      title="选择新增人员"
      :visible.sync="addjobVisible"
      width="800px">
      <div class="module-opera">
        <el-form :model="UnconcludeForm">
          <el-form-item>
            <el-row>
              <el-col :span="13">
                <address-tree :showCheckBox=false @node-click="handleNodeClick"></address-tree>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-input
                  placeholder="输入姓名进行搜索"
                  v-model="filterSelectStaffList">
                </el-input>
                <el-table
                  :data="orgSelectStaffDatas"
                  border
                  @select="getStffMessage"
                  @select-all="clearAllSelect"
                  ref="staffTable"
                  class="elTable"
                  style="width: 100%;margin-top: 5px">
                  <el-table-column type="selection"></el-table-column>
                  <el-table-column
                    label="员工姓名"
                    prop="name">
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
            <pagination
              v-if="showPage"
              @size-change="handleJobSizeChange"
              @current-change="handleJobCurrentChange"
              :current-page="jobPageMsg.currentPage"
              :page-sizes="jobPageMsg.pageSizes"
              :page-size="jobPageMsg.pageSize"
              :total="jobPageMsg.total">
            </pagination>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
         <el-button @click="addjobVisible = false" class="false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addSave" size="mini">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 导出列表 -->
    <form style="display:none" name="form" method="POST" ref="submitExcel" id="submitExcel" :action="hostBaseUrl+'/duty/export'">
      <p>keyword: <input type="text" id="keyword" name="keyword" value="" /></p>
      <p>dutyName: <input type="text" id="dutyName" name="dutyName" value="" /></p>
      <p>dutyRank: <input type="text" id="dutyRank" name="dutyRank" value="" /></p>
      <p>treatmentRank: <input type="text" id="treatmentRank" name="treatmentRank" value="" /></p>
      <p>appointRemove: <input type="text" id="appointRemove" name="appointRemove" value="" /></p>
      <p>status: <input type="text" id="status" name="status" value="" /></p>
      <p>isPrincipal: <input type="text" id="isPrincipal" name="isPrincipal" value="" /></p>
      <p>organizationId: <input type="text" id="organizationId" name="organizationId" value="" /></p>
      <input type="submit" value="Submit"/>
    </form>

    <!--高级搜索和筛选字段的dialog-->
    <choose-column-search
    :chooseData="chooseData"
    @sureDeepSearch="sureDeepSearch"
    />
  </section>
</template>
<script>
import { getJobList, queryClassList } from 'static/api/personnel-information/job/job'
import Pagination from 'components/Pagination.vue'
import AddressTree from 'components/AddressTree.vue'
import { orgSelectStaffList, listByUserId } from 'static/api/common/common'
import { mapGetters } from 'vuex'
import { debounce, getToken } from 'assets/js/util'
import ChooseColumnSearch from 'components/ChooseColumnSearch'
import { hostBaseUrl } from 'utils/config'
/*   import MutilSearchTree from 'components/MutilSearchTree' */
import { getExmine } from 'assets/js/exmine'
import MutilSearchDeptTree from 'components/MutilSearchDeptTree'
export default {
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
        filedType: 'duty',
        fieldList: [],
        selectedWordArr: [{ prop: '', op: '', value: '', width: '', searchFlag: '' }]
      },
      hostBaseUrl: '',
      showPage: true,
      newKeyWordsArr: [],
      selectStaffListForm: [],
      filterSelectStaffList: '',
      UnconcludeForm: {},
      addjobVisible: false,
      jobListDatas: [],
      jobForm: {
        inputValue: '',
        departmentValue: '',
        dutyName: '',
        dictDutyIdValue: '',
        dictTreatmentIdValue: '',
        appointRemoveValue: 1,
        statusValue: '',
        isPrincipal: '',
        orgName: ''
      },
      dutynameDatas: [],
      dutylevelDatas: [],
      treatmentlevelDatas: [],
      appointRemoveSelect: [
        { value: 0, label: '卸任' },
        { value: 1, label: '在任' }
      ],
      statusSelect: [
        { value: 0, label: '主职' },
        { value: 1, label: '兼职' }
      ],
      personSelect: [
        { value: '是', label: '是' },
        { value: '否', label: '否' }
      ],
      pageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      jobPageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      orgSelectStaffDatas: [],
      addJobForm: {
        userId: ''
      },
      /* 选择显示字段 */
      fieldList: [],
      prop: '',
      order: '',
      options: []
    }
  },
  components: {
    Pagination,
    AddressTree,
    /* MutilSearchTree, */
    MutilSearchDeptTree,
    ChooseColumnSearch
  },
  computed: {
    permission () {
      return getExmine().infoJob
    },
    ...mapGetters(['getOrgId']),
    jobParams () {
      return {
        page: this.pageMsg.currentPage,
        size: this.pageMsg.pageSize,
        keyword: this.jobForm.inputValue,
        /*  organizationIds: this.jobForm.orgName ? this.jobForm.orgName : [], */
        organizationIds: this.mutilTreeData.orgIds ? this.mutilTreeData.orgIds : [],
        dutyNameId: this.jobForm.dutyName,
        dutyLevelId: this.jobForm.dictDutyIdValue,
        treatmentLevelId: this.jobForm.dictTreatmentIdValue,
        appointRemove: this.jobForm.appointRemoveValue,
        status: this.jobForm.statusValue,
        isPrincipal: this.jobForm.isPrincipal,
        prop: this.prop,
        order: this.order,
        options: this.options
      }
    },
    departmentStaffParams () {
      return {
        orgId: this.OrgId,
        page: this.jobPageMsg.currentPage,
        size: this.jobPageMsg.pageSize
      }
    }
  },
  methods: {
    /** 新增职务**/
    addjobMsg () {
      this.addjobVisible = true
    },
    addSave () {
      if (this.checkTable) {
        this.$router.push({
          name: '新增干部',
          params: {
            jobId: this.addJobForm.userId
          } })
      } else {
        this.$message.warning({
          message: '请选择要增加的员工姓名!'
        })
      }
    },
    /* 选择组织架构 */
    handleNodeClick (data, node, self) {
      this.showPage = true
      this.departmentStaffParams.orgId = data.id
      this.filterSelectStaffList = ''
      this.OrgId = data.id
      this._orgSelectStaffList()
    },
    /** 根据组织架构获取所有员工列表**/
    _orgSelectStaffList () {
      orgSelectStaffList(this.departmentStaffParams).then((data) => {
        if (data.result) {
          if (data.result.records) {
            this.orgSelectStaffDatas = data.result.records
            this.newKeyWordsArr = data.result.records
          }
          this.jobPageMsg.total = data.result.total
        }
      })
    },
    /** 进行姓名搜索**/
    selectStaffListAll (value) {
      if (value) {
        this.showPage = false
        let newKeyWordArr = []
        let postParams = {
          page: 1,
          size: 6000,
          orgId: this.OrgId
        }
        orgSelectStaffList(postParams).then(data => {
          if (data.result) {
            if (data.result.records) {
              data.result.records.forEach(item => {
                if (item.name.indexOf(value) !== -1) {
                  newKeyWordArr.push(item)
                }
              })
            }
          }
        })
        this.orgSelectStaffDatas = newKeyWordArr
        setTimeout(() => {
          this.jobPageMsg.total = this.orgSelectStaffDatas.length
        }, 200)
      } else {
        this.showPage = true
        this._orgSelectStaffList()
      }
    },
    /** 当勾选数据行时触发的事件**/
    getStffMessage (value, row) {
      if (row) {
        this.addJobForm.userId = row.id
        this.$refs.staffTable.clearSelection()
        this.$refs.staffTable.toggleRowSelection(row, true)
        this.checkTable = true
      }
    },
    /** 当手动勾选全选 Checkbox 时触发的事件**/
    clearAllSelect () {
      this.$refs.staffTable.clearSelection()
    },
    /** 搜索**/
    searchjobList () {
      this._getAlljob()
      this.pageMsg.currentPage = 1
    },
    /* 高级查询 */
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
      this.options = options
      setTimeout(() => {
        this.handleCurrentChange(1)
      }, 200)
    },
    /* 导出 */
    ExportMsg () {
      document.getElementById('keyword').setAttribute('value', this.jobForm.inputValue)
      document.getElementById('dutyName').setAttribute('value', this.jobForm.dutyName)
      document.getElementById('dutyRank').setAttribute('value', this.jobForm.dictDutyIdValue)
      document.getElementById('treatmentRank').setAttribute('value', this.jobForm.dictTreatmentIdValue)
      document.getElementById('appointRemove').setAttribute('value', this.jobForm.appointRemoveValue)
      document.getElementById('status').setAttribute('value', this.jobForm.statusValue)
      document.getElementById('isPrincipal').setAttribute('value', this.jobForm.isPrincipal)
      document.getElementById('organizationId').setAttribute('value', this.mutilTreeData.orgIds.join(' '))
      console.log(this.$refs.submitExcel)
      this.$refs.submitExcel.submit()
    },
    /** 查看**/
    lookMsg (row, jobType) {
      this.$router.push({ name: '干部详情',
        params: {
          jobId: row.id,
          jobUserId: row.userId ? row.userId : 'null'
        } })
    },
    /** 免除**/
    exemptMsg (row, jobType) {
      this.$router.push({ name: '干部免除',
        params: {
          jobId: row.id,
          jobUserId: row.userId
        } })
    },
    /** 获取job列表信息**/
    _getAlljob () {
      getJobList(this.jobParams).then((data) => {
        if (data.result) {
          if (data.result.records) {
            this.jobListDatas = data.result.records
          }
          this.pageMsg.total = data.result.total
        }
      })
    },
    /* 选择显示字段 */
    chooseMsg () {
      this.chooseData.chooseVisible = true
      this.chooseData.fieldList = this.fieldList.map(item => item.prop)
    },
    /* 获取原来选择字段 */
    _getUserFiled () {
      let preload = {
        userId: getToken('loginId').toString(),
        type: 'duty'
      }
      listByUserId(preload).then((data) => {
        if (data.result) {
          this.fieldList = data.result
        }
        setTimeout(() => {
          this._getAlljob()
        }, 10)
      })
    },
    /* 排序 */
    sortChange (column, prop, order) {
      if (column && column.prop) {
        let orderColumn = this.fieldList.filter(item => item.prop === column.prop)[0].orderColumn
        this.prop = orderColumn
        this.order = column.order
        this._getAlljob()
      } else {
        this.prop = ''
        this.order = ''
        this._getAlljob()
      }
    },
    /** 分页**/
    handleJobSizeChange (pageSize) {
      this.jobPageMsg.pageSize = pageSize
      this._orgSelectStaffList()
    },
    handleJobCurrentChange (currentPage) {
      this.jobPageMsg.currentPage = currentPage
      this._orgSelectStaffList()
    },
    handleSizeChange (pageSize) {
      this.pageMsg.pageSize = pageSize
      this._getAlljob()
    },
    handleCurrentChange (currentPage) {
      this.pageMsg.currentPage = currentPage
      this._getAlljob()
    },
    /** 获取数字字典**/
    async _getQueryClassList () {
      await queryClassList('DUTYLEVEL').then((data) => {
        if (data.result) {
          this.dutylevelDatas = data.result
        }
      })
      await queryClassList('TREATMENTLEVEL').then((data) => {
        if (data.result) {
          this.treatmentlevelDatas = data.result
        }
      })
      await queryClassList('DUTYNAME').then((data) => {
        if (data.result) {
          this.dutynameDatas = data.result
        }
      })
    }
  },
  created () {
    this._getQueryClassList()
    this.$watch('filterSelectStaffList', debounce((query) => {
      this.selectStaffListAll(query)
    }, 200))
    this._getUserFiled()
    setTimeout(() => {
      this._orgSelectStaffList()
    }, 400)
    this.hostBaseUrl = hostBaseUrl
  }
}
</script>

<style scoped lang="less">
  .el-tree{border: none!important;}
  .elTable&/deep/.has-gutter tr{
    &/deep/th:first-child{
      &/deep/.cell{
        display: none;
      }
    }
  }
  .el-select{
    width:100%;
  }
</style>
