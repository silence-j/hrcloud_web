<template>
  <div class="salary" @click="mutilTreeData.showTree=false">
    <el-form :model="postForm">
      <div class="search-form_box clearfix six-box">
        <div class="search-form_item">
          <el-input @keyup.enter.native="normalSearch" v-model="postForm.keyWords" @change="keyInput" placeholder="请输入关键字" ></el-input>
        </div>
        <div class="search-form_item">
          <mutil-search-dept-tree
            :mutilTreeData="mutilTreeData"
          />
        </div>
        <div class="search-form_item">
          <el-select v-model="postForm.status" filterable clearable placeholder="全部状态">
            <el-option
              v-for="item in wageState"
              :label="item.name"
              :value="item.value"
              :key="item.index">
            </el-option>
          </el-select>
        </div>
        <div class="search-form_item start-line">
          <el-date-picker
            v-model="postForm.startTime"
            type="year"
            clearable
            @change="startTime"
            placeholder="创建开始年份">
          </el-date-picker>
        </div>
        <div class="search-form_item">
          <el-date-picker
            v-model="postForm.endTime"
            type="year"
            clearable
            @change="endTime"
            :picker-options="pickerBeginDateAfter"
            placeholder="创建结束年份">
          </el-date-picker>
        </div>
        <div class="search-form_item checked">
          <el-checkbox class="margin-fourty" v-model="checked">一把手</el-checkbox>
        </div>
        <div class="search-form_button pt-3">
          <el-button type="primary" size="mini" @click="normalSearch">查 询</el-button>
          <el-button size="small" @click="chooseData.deepSearchVisible = true">高级查询</el-button>
        </div>
      </div>
    </el-form>
    <div class="search-data mt-20">
      <el-button type="primary" size="small" v-if="permission.indexOf('导出')!=-1" @click="exportBtn">导 出</el-button>
      <br/><br/>
      <div class="table-setting-warp">
        <div class="table-setting-icon el-icon-setting" @click="chooseMsg"></div>
        <el-table :data="searchList" border @sort-change="sortChange">
          <el-table-column label="序号" width="60px">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <div v-for="item in fieldList" :key="item.id">
            <template v-if="item.prop == 'vacationDaysUsed'">
              <el-table-column prop="vacationDaysUsed" label="已休年假" width="120px">
                <template slot-scope="scope">
                  <span @click="seeRest(scope.row.id)" v-if="scope.row.vacationDaysUsed > 0" class="brokenStyle figure">{{scope.row.vacationDaysUsed}}</span>
                  <span v-else="" class="brokenStyle">{{scope.row.vacationDaysUsed}}</span>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="item.prop == 'topLeader'">
              <el-table-column prop="topLeader" label="是否一把手" width="120px">
                <template slot-scope="scope">
                  <span>{{scope.row.topLeader | filterTop}}</span>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="item.prop == 'userStatus'">
              <el-table-column prop="userStatus" label="人员状态" width="120px">
                <template slot-scope="scope">
                  <span>{{scope.row.userStatus | filterStatus}}</span>
                </template>
              </el-table-column>
            </template>
            <template v-else>
              <el-table-column :label="item.name" :prop="item.prop" :key="item.name" :sortable="item.orderFlag === 1" min-width="120">
              </el-table-column>
            </template>
          </div>

          <el-table-column label="操作" width="150px" fixed="right">
            <template slot-scope="scope">
              <div>
                <div class="operation" v-if="curYear == scope.row.year && scope.row.userStatus !== 3">
                  <span v-if="permission.indexOf('修改')!=-1 && scope.row.realStatus !== 8 && scope.row.realStatus !== 11 && scope.row.realStatus !== 12" @click="makeModify(scope.row, '1')">修改</span>
                  <span v-if="permission.indexOf('休假')!=-1 && scope.row.realStatus !== 11 && scope.row.realStatus !== 12" @click="makeRest(scope.row)">休假</span>
                </div>
                <div class="operation" v-else="">
                  <span @click="makeModify(scope.row, '0')">查看</span>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        v-if="this.page.totalCount > 10"
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.page"
        :page-size="page.pageSize"
        layout="total, prev, pager, next, sizes, jumper"
        :total="page.totalCount">
      </el-pagination>
    </div>
    <el-dialog @close="cancelSur" width="420px" class="see-dialog" :title="seeOrMod" :visible.sync="surplusDialog">
      <ul>
        <li class="editorAnnual">
          <span>姓名：</span>
          <div style="display: inline-block;width: 240px;">
            <el-input disabled v-model="changeDialoag.name"></el-input>
          </div>
        </li>
        <li class="editorAnnual">
          <span>是否一把手：</span>
          <el-radio :disabled="look" v-model="changeDialoag.isNot" label='是'>是</el-radio>
          <el-radio :disabled="look" v-model="changeDialoag.isNot" label='不是'>不是</el-radio>
          <el-popover
            placement="right"
            width="200"
            trigger="hover">
            <el-table :data="gridData">
              <el-table-column width="80" property="optType" label="类型">
                <template slot-scope="scope">
                  <span>{{scope.row.optType | filterType}}</span>
                </template>
              </el-table-column>
              <el-table-column width="120" property="inOfficeDate" label="时间"></el-table-column>
            </el-table>
            <el-button class="records" style="border: none" slot="reference">任免记录</el-button>
          </el-popover>
        </li>
        <li class="editorAnnual" v-if="isShowOffice">
          <span class="textSpan">任免时间：</span>
          <el-date-picker
            @change="changeOfficeDate"
            :disabled="look"
            v-model="changeDialoag.date"
            :picker-options="pickerOptions"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </li>
        <li class="editorAnnual">
          <span class="textSpan">可休年假：</span>
          <span class="days">天</span>
          <div style="display: inline-block;width: 240px;">
            <el-input @change="changeWageNew" :disabled="look" v-model.number="changeDialoag.mayRest"></el-input>
            <p v-show="lawNum" style="color: #f56c6c;font-size: 12px;position: absolute;margin-top: 2px">输入不合法</p>
            <!--<el-input @change="changeWageNew" disabled v-model="changeDialoag.mayRest"></el-input>-->
          </div>
        </li>
        <li class="editorAnnual">
          <span>已休年假：</span>
          <span class="days">天</span>
          <el-input style="display: inline-block;width: 240px;" disabled v-model="changeDialoag.haveRest"></el-input>
        </li>
        <li class="editorAnnual">
          <span>剩余年假：</span><span style="padding-left: 5px;text-align: left">{{changeDialoag.Surplus}}</span>
        </li>
        <li class="editorAnnual">
          <span class="remarks">备注：</span>
          <div style="display: inline-block;width: 240px;">
            <el-input :disabled="look" type="textarea" :rows="3" v-model="changeDialoag.reMarks"></el-input>
          </div>
        </li>
      </ul>
      <div style="text-align: center">
        <el-button v-if="!look" class="default-border restbtn margin-btn" @click="cancelSur">取消</el-button>
        <el-button class="restbtn" type="primary" @click="modifyRest">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog @close="cancelRest" width="420px" class="see-dialog rest-dialog" title="休假" :visible.sync="restDialog">
      <p v-if="row.realStatus === 8" style="padding-left: 16px;margin-bottom: 10px">
        <span style="color: #FF7500;" class="el-icon-warning"></span>
        <span style="color: #f56c6c;margin-left: 8px">该员工正在离职审核中,预计可休年假为{{row.tempVacationDays ? row.tempVacationDays : 0}},剩余{{row.tempVacationDays - row.vacationDaysUsed >= 0 ? row.tempVacationDays - row.vacationDaysUsed : 0}}</span>
      </p>
      <ul>
        <li class="editorAnnual">
          <span><em class="must">*</em>休假类型：</span>
          <div style="display: inline-block;width: 240px;">
            <el-input disabled v-model="rest.type"></el-input>
          </div>
        </li>
        <li class="editorAnnual">
          <span><em class="must">*</em>休假日期：</span>
          <el-date-picker
            v-model="rest.restBegin"
            type="dates"
            @change="restBegin"
            :picker-options="pickerOptions"
            placeholder="选择日期">
          </el-date-picker>
        </li>
        <li class="editorAnnual">
          <span class="textSpan"><em class="must">*</em>休假天数：</span>
          <span class="days">天</span>
          <div style="display: inline-block;width: 240px;">
            <el-input disabled @change="changeRest" v-model="rest.restNum"></el-input>
          </div>
        </li>
        <li class="editorAnnual">
          <span class="remarks">备注：</span>
          <div style="display: inline-block;width: 240px;">
            <el-input type="textarea" :rows="3" v-model="rest.reMarks"></el-input>
          </div>
        </li>
      </ul>
      <div style="text-align: center">
        <el-button class="default-border restbtn margin-btn" @click="cancelRest">取消</el-button>
        <el-button class="restbtn" type="primary" @click="sureRest">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog width="620px" class="see-dialog" title="查看" :visible.sync="seeDialog">
      <el-table :data="restInfo">
        <el-table-column prop="start" label="休假日期" width="196">
          <template slot-scope="scope">
            <span>{{scope.row.leaveDates}}</span>
          </template>
        </el-table-column><el-table-column prop="leaveDays" label="休假天数" width="84"></el-table-column>
        <el-table-column prop="remark" label="备注" width="200">
          <template slot-scope="scope">
            <span v-html="scope.row.remark"></span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.deleteTag === 0" @click="revoke(scope.row)" class="operation"><span>撤销</span></div>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center;margin-top: 15px">
        <el-button @click="seeDialog = false">取消</el-button>
        <el-button @click="seeDialog = false" type="primary">确定</el-button>
      </div>
    </el-dialog>

    <!-- 导出列表 -->
    <form style="display:none" name="form" method="POST" target="_blank" ref="submitExcel" id="submitExcel" :action="hostBaseUrl+'/system/export/annual/leave/list'">
      <p>keyword: <input type="text" id="keyword" name="keyword" value="" /></p>
      <p>searchOrgIds: <input type="text" id="searchOrgIds" name="searchOrgIds" value="1" /></p>
      <p>userStatus: <input type="text" id="userStatus" name="userStatus" value="" /></p>
      <p>topLeader: <input type="text" id="topLeader" name="topLeader" value="" /></p>
      <p>yearStart: <input type="text" id="yearStart" name="yearStart" value="" /></p>
      <p>yearEnd: <input type="text" id="yearEnd" name="yearEnd" value="" /></p>
      <input type="submit" value="Submit"/>
    </form>
    <choose-column-search
      :chooseData="chooseData"
      @sureDeepSearch="sureDeepSearch"
    />
  </div>
</template>

<script>
import ChooseColumnSearch from 'components/ChooseColumnSearch.vue'
import SalaryApi from 'static/api/wage/wage'
import { listByUserId } from 'static/api/common/common'
import { getToken } from 'assets/js/util'
import { hostBaseUrl } from 'utils/config'
import { getExmine } from 'assets/js/exmine'
import MutilSearchDeptTree from 'components/MutilSearchDeptTree'
import { debounce } from 'lodash'
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
      lawNum: false,
      isTrue: false,
      chooseData: {
        chooseVisible: false,
        deepSearchVisible: false,
        filedType: 'annualLeave',
        fieldList: [],
        selectedWordArr: [{ prop: '', op: '', value: '', width: '', searchFlag: '' }]
      },
      row: {},
      orgDatas1: {
        filterName: '',
        orgId: '',
        dataTree: [],
        showTree: false
      },
      gridData: [],
      originData: {},
      annualId: '',
      isShowOffice: false,
      addColumn: {
        changeDays: '',
        lastChangeDate: '',
        lastChangeDays: '',
        lastChangeType: ''
      },
      hostBaseUrl: '',
      keyValue: '',
      department: '',
      State: '',
      dateStart: '',
      dateEnd: '',
      restDateStart: '',
      restDateEnd: '',
      seeOrMod: '修改',
      curYear: new Date().getFullYear(),
      checked: '',
      modifyData: '',
      restInfo: [],
      surplusDialog: false,
      restDialog: false,
      seeDialog: false,
      changeValue: '评议',
      standValue: 0,
      date1: '',
      look: false,
      serId: [],
      isConfirm: true,
      isChange: '',
      postForm: {
        keyWords: '',
        orgName: '',
        startTime: '',
        endTime: '',
        status: '',
        options: []
      },
      timeStart: '',
      timeEnd: '',
      id: '',
      restDays: 0,
      dateError: true,
      page: {
        page: 1,
        pageSize: 10,
        totalCount: 100
      },
      changeDialoag: {
        name: '',
        isNot: -1,
        date: '',
        mayRest: Number,
        haveRest: '',
        Surplus: '',
        reMarks: ''
      },
      rest: {
        type: '年假',
        restBegin: [],
        restNum: '',
        reMarks: ''
      },
      stand: [
        { name: '核定工资', value: 0 },
        { name: '评议工资', value: 1 },
        { name: '协议工资', value: 2 },
        { name: '岗位工资', value: 3 }
      ],
      wageState: [
        { name: '在职', value: 1 },
        { name: '已离职', value: 2 },
        { name: '已调出', value: 3 }
      ],
      perState: [
        { name: '已入职', value: 0 },
        { name: '离职申请中', value: 1 },
        { name: '离职办理中', value: 2 },
        { name: '已离职', value: 3 },
        { name: '调动中', value: 4 },
        { name: '已调出', value: 5 },
        { name: '试用', value: 6 },
        { name: '实习', value: 7 }
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
      restBeginDateAfter: {
        disabledDate: (time) => {
          let beginRest = this.rest.restBegin
          if (beginRest) {
            return time.getTime() < beginRest
          }
        }
      },
      // 选择显示字段
      fieldList: [],
      prop: '',
      order: ''
    }
  },
  computed: {
    pickerOptions () {
      return {
        disabledDate: (time) => {
          let year = new Date().getFullYear()
          return new Date(`${year - 1}-12-31`).getTime() > new Date(time).getTime() || new Date(`${year + 1}-01-01`).getTime() < new Date(time).getTime()
        }
      }
    },
    permission () {
      return getExmine().salaryAnnualLeave
    }
  },
  components: {
    ChooseColumnSearch,
    MutilSearchDeptTree
  },
  filters: {
    filterStatus (status) {
      if (status === 1) {
        status = '在职'
      } else if (status === 2) {
        status = '已离职'
      } else if (status === 3) {
        status = '已调出'
      }
      return status
    },
    filterType (val) {
      if (val) {
        return '任职'
      } else {
        return '免职'
      }
    },
    filterTop (val) {
      if (val === 0) {
        val = '不是'
      } else if (val === 1) {
        val = '是'
      }
      return val
    }
  },
  mounted () {
    this._getUserFiled()
  },
  watch: {
    'changeDialoag.isNot' () {
      if (this.seeOrMod === '查看') return
      let is = this.changeDialoag.isNot
      let isnot = (is === '是' ? 1 : 0)
      if (isnot === 0 && this.originData.inOfficeDate === null) {
        this.isShowOffice = false
      } else {
        this.isShowOffice = true
      }
      if (this.originData.topLeader === 1 && isnot === 0) {
        this.changeDialoag.date = ''
      } else if (this.originData.topLeader === 1 && isnot === 1) {
        this.changeDialoag.date = this.originData.inOfficeDate
        this.changeDialoag.mayRest = this.originData.vacationDaysAll
        this.changeWageNew()
      }
      if (this.originData.topLeader === 0 && isnot === 1) {
        this.changeDialoag.date = ''
      } else if (this.originData.topLeader === 0 && isnot === 0 && this.originData.inOfficeDate !== null) {
        this.changeDialoag.date = this.originData.inOfficeDate
        this.changeDialoag.mayRest = this.originData.vacationDaysAll
        this.changeWageNew()
      }
      if (isnot === this.originData.topLeader && this.originData.inOfficeDate === this.changeDialoag.date) {
        this.changeDialoag.mayRest = this.originData.vacationDaysAll
        this.changeWageNew()
        this.dateError = false
      } else if (this.originData.inOfficeDate !== null) {
        if (this.changeDialoag.date) {
          this.changeOfficeDate()
        }
      }
    }
  },
  methods: {
    exportBtn () {
      document.getElementById('keyword').setAttribute('value', this.postForm.keyWords ? this.postForm.keyWords : '')
      document.getElementById('userStatus').setAttribute('value', this.postForm.status ? this.postForm.status : '')
      document.getElementById('topLeader').setAttribute('value', this.checked ? this.checked ? 1 : 0 : '')
      document.getElementById('yearStart').setAttribute('value', this.timeStart ? this.timeStart : '')
      document.getElementById('searchOrgIds').setAttribute('value', this.mutilTreeData.orgIds.length ? this.mutilTreeData.orgIds.join(',') : '')
      console.log(this.$refs.submitExcel)
      this.$refs.submitExcel.submit()
    },
    // 离职申请中，休假天数不能大于可休天数
    changeRest (val) {
      let num = this.row.tempVacationDays - this.row.vacationDaysUsed > 0 ? this.row.tempVacationDays - this.row.vacationDaysUsed : 0
      if (val > num) {
        this.rest.restNum = num
      } else {
        this.rest.restNum = val
      }
    },
    // 撤销
    revoke (row) {
      this.$confirm(`确定要撤销该条休假`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        let params = {
          id: row.id,
          annualLeaveId: row.annualLeaveId
        }
        SalaryApi.revokeRecord(params).then(res => {
          this.$message.success('撤销成功')
          this._getWageList()
          this.seeRest(row.annualLeaveId)
        })
      }).catch(() => {})
    },
    // 高级搜索确认
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
        this.seniorSearch()
      }, 200)
    },
    // 查询年假列表
    _getWageList () {
      let params = {
        page: this.page.page,
        size: this.page.pageSize,
        keyword: this.postForm.keyWords,
        options: this.postForm.options,
        // searchOrgIds: this.orgDatas1.orgId ? this.orgDatas1.orgId : null,
        searchOrgIds: this.mutilTreeData.orgIds ? this.mutilTreeData.orgIds.join(',') : null,
        userStatus: this.postForm.status || null,
        topLeader: this.checked ? this.checked ? 1 : 0 : null,
        yearStart: this.timeStart || null,
        yearEnd: this.timeEnd || null,
        prop: this.prop || null,
        order: this.order || null
      }
      SalaryApi.getWageList(params).then(data => {
        if (data.result) {
          this.searchList = data.result.records
          this.page.totalCount = data.result.total
        }
      })
    },
    handleSizeChange (val) {
      this.page.page = 1
      this.page.pageSize = val
      this._getWageList()
    },
    handleCurrentChange (val) {
      this.page.page = val
      this._getWageList()
    },
    changeWageNew () {
      let num = this.changeDialoag.mayRest - this.changeDialoag.haveRest
      this.changeDialoag.Surplus = num >= 0 ? num : 0
      console.log('ss', typeof this.changeDialoag.mayRest)
      if ((typeof this.changeDialoag.mayRest === 'number') && this.changeDialoag.mayRest >= 0) {
        this.lawNum = false
      } else {
        this.lawNum = true
      }
    },
    startTime () {
      this.timeStart = this.postForm.startTime ? this.postForm.startTime.getFullYear() : ''
    },
    endTime () {
      this.timeEnd = this.postForm.endTime ? this.postForm.endTime.getFullYear() : ''
    },
    restBegin () {
      if (this.rest.restBegin) {
        if (this.rest.restBegin.length > this.restDays) {
          this.$message.warning('剩余年假天数不足')
        }
      }
      if (this.rest.restBegin) {
        let dateStr = ''
        this.rest.restBegin.forEach(res => {
          if (res) {
            dateStr += this.changeDate(res) + ','
          }
        })
        this.restDateStart = dateStr.substring(0, dateStr.length - 1)
        this.rest.restNum = this.rest.restBegin.length
      }
    },
    keyInput (value) {
      this.postForm.keyWords = value
    },
    normalSearch () {
      this.page.page = 1
      this.page.pageSize = 10
      this._getWageList()
    },
    seniorSearch () {
      this.page.page = 1
      this.page.pageSize = 10
      this._getWageList()
    },
    makeRest (row) {
      if (row.vacationDays) {
        this.id = ''
        this.rest.restBegin = []
        this.rest.reMarks = ''
        this.rest.restNum = ''
        this.id = row.id
        this.restDays = row.vacationDays
        this.row = row
        this.restDialog = true
      } else {
        this.$message.warning('该员工已无可休年假')
      }
    },
    cancelRest () {
      this.rest.restBegin = []
      this.rest.reMarks = ''
      this.rest.restNum = ''
      this.restDateStart = ''
      this.restDialog = false
    },
    sureRest:debounce (function () {
      if (this.rest.type === '') {
        this.$message.warning('休假类型不能为空')
      } else if (this.restDateStart === '') {
        this.$message.warning('休假日期必填')
      } else if (this.rest.restBegin && this.rest.restBegin.length > this.restDays) {
        this.$message.warning('剩余年假天数不足')
      } else {
        let params = {
          annualLeaveId: this.id,
          leaveDates: this.restDateStart,
          remark: this.rest.reMarks
        }
        SalaryApi.pushRestNum(params).then(res => {
          this.$message.success('休假成功')
          this.restDialog = false
          this.restDateStart = ''
          this.rest.restBegin = []
          this._getWageList()
        })
      }
    }, 500),
    lookIsOffice (id) {
      SalaryApi.lookOffice({ annualLeaveId: id }).then(res => {
        this.gridData = res.result
      })
    },
    changeOfficeDate () {
      if (this.changeDialoag.date) {
        let params = {
          id: this.annualId,
          inOfficeDate: this.changeDate(this.changeDialoag.date),
          topLeader: this.changeDialoag.isNot === '是' ? 1 : 0
        }
        this.dateError = true
        SalaryApi.officeAnnual(params).then(res => {
          console.log('sre', res)
          this.dateError = false
          this.addColumn.changeDays = res.result.changeDays
          this.addColumn.lastChangeDate = res.result.lastChangeDate
          this.addColumn.lastChangeDays = res.result.lastChangeDays
          this.addColumn.lastChangeType = res.result.lastChangeType
          this.changeDialoag.mayRest = (res.result.differenceVal + this.originData.vacationDaysAll) >= 0 ? (res.result.differenceVal + this.originData.vacationDaysAll) : 0
          this.changeWageNew()
        })
      }
    },
    makeModify (row, type) {
      if (type === '0') {
        this.seeOrMod = '查看'
        this.look = true
      } else {
        this.seeOrMod = '修改'
        this.look = false
        this.annualId = row.id
        this.originData = row
      }
      this.lookIsOffice(row.id)
      this.surplusDialog = true
      this.modifyData = row
      this.changeDialoag.name = row.userName
      this.changeDialoag.isNot = row.topLeader === 1 ? '是' : '不是'
      this.isChange = row.topLeader
      this.changeDialoag.date = row.inOfficeDate
      this.changeDialoag.mayRest = row.vacationDaysAll
      this.changeDialoag.haveRest = row.vacationDaysUsed
      this.changeDialoag.Surplus = (row.vacationDaysAll - row.vacationDaysUsed) >= 0 ? (row.vacationDaysAll - row.vacationDaysUsed) : 0
      this.changeDialoag.reMarks = row.remark
    },
    changeDate (value) {
      let time = new Date(value)
      let year = time.getFullYear()
      let month = (time.getMonth() < 9 ? '0' : '') + (time.getMonth() + 1)
      let day = (time.getDate() < 10 ? '0' : '') + time.getDate()
      return year + '-' + month + '-' + day
    },
    cancelSur () {
      this.surplusDialog = false
      this.changeDialoag.name = ''
      this.changeDialoag.isNot = -1
      this.changeDialoag.mayRest = ''
      this.changeDialoag.haveRest = ''
      this.changeDialoag.Surplus = ''
      this.changeDialoag.reMarks = ''
    },
    modifyRest () {
      if (this.look) {
        this.surplusDialog = false
      } else {
        let flag = true
        let fg = true
        let params = {
          id: this.modifyData.id,
          topLeader: this.changeDialoag.isNot === '是' ? 1 : 0,
          vacationDaysAll: this.changeDialoag.mayRest,
          remark: this.changeDialoag.reMarks,
          changeDays: this.addColumn.changeDays,
          lastChangeDate: this.addColumn.lastChangeDate,
          lastChangeDays: this.addColumn.lastChangeDays,
          lastChangeType: this.addColumn.lastChangeType
        }
        if (this.isShowOffice) {
          params.inOfficeDate = this.changeDialoag.date ? this.changeDate(this.changeDialoag.date) : ''
          if (params.inOfficeDate === '') {
            this.$message.warning('请输入任免时间')
            flag = false
          } else {
            flag = true
          }
        }
        if (this.changeDialoag.mayRest === '') {
          this.$message.warning('请输入可休年假')
          fg = false
        } else {
          fg = true
        }

        if ((typeof this.changeDialoag.mayRest) === 'number' && this.changeDialoag.mayRest >= 0) {
          this.lawNum = false
        } else {
          this.lawNum = true
        }
        if (flag && fg && !this.lawNum) {
          if (this.dateError) {
            this.$message.warning('生效日期应大于上次一把手变更日期')
          } else {
            SalaryApi.modifyRest(params).then(res => {
              this.$message.success('修改成功')
              this.surplusDialog = false
              this.look = false
              this._getWageList()
            })
          }
        }
      }
    },
    seeRest (id) {
      this.seeDialog = true
      SalaryApi.lookRest({ annualLeaveId: id }).then(res => {
        if (res.result) {
          res.result.forEach(res => {
            res.remark = res.remark.replace(RegExp(' ', 'g'), '<br/>')
          })
          this.restInfo = res.result
        }
      })
    },
    // 选择显示字段
    chooseMsg () {
      this.chooseData.chooseVisible = true
      this.chooseData.fieldList = this.fieldList.map(item => item.prop)
      // this.$refs.chooseColumn.chooseMsg()
    },
    // 获取原来选择字段
    _getUserFiled () {
      this.fieldList = []
      let preload = {
        userId: getToken('loginId').toString(),
        type: 'annualLeave'
      }
      listByUserId(preload).then(data => {
        if (data.result) {
          this.fieldList = data.result
        }
        setTimeout(() => {
          this._getWageList()
        }, 10)
      })
    },
    getUserFiled () {
      this.fieldList = []
      let preload = {
        userId: getToken('loginId').toString(),
        type: 'annualLeave'
      }
      listByUserId(preload).then(data => {
        if (data.result) {
          this.field = data.result
        }
        setTimeout(() => {
          this._getWageList()
        })
      })
    },
    // 排序
    sortChange (column, prop, order) {
      if (column && column.prop) {
        let orderColumn = this.fieldList.filter(item => item.prop === column.prop)[0].orderColumn
        this.prop = orderColumn
        this.order = column.order
        this._getWageList()
      } else {
        this.prop = ''
        this.order = ''
        this._getWageList()
      }
    }
  },
  created () {
    this.hostBaseUrl = hostBaseUrl
  }
}
</script>

<style scoped lang="less">
  @import "~assets/less/homePage";
  @import "~assets/less/page";
  /*@import "~assets/less/base";*/
  .rest-dialog{
    &/deep/.el-input{
      width: 240px;
    }
  }
  .editorAnnual{
    .must{
      padding-right: 6px;
    }
  }
  .records{
    border: none;
    color: #FF7500;
    position: relative;
    padding: 0!important;
    left: 10px;
    &:hover{
      background: none!important;
      color: #FF7500!important;
    }
  }
  .wage-list{
    span {
      display: inline-block;
      font-size: 14px;
      height: 36px;
      padding: 11px 0;
      cursor: pointer;
      box-sizing: border-box;
      margin-bottom: 20px;
      &:hover, &:focus{
        color: #FF7500;
        border-bottom: 1px solid #FF7500;
      }
    }
    span:first-child{
      margin-right: 20px;
    }
  }
</style>
