<template>
<div class="container">
  <el-form :model="leaveForm">
    <div class="search-form_box clearfix">
      <div class="search-form_item">
        <el-input v-model="leaveForm.keyWords" placeholder="请输入姓名/身份证号" @keyup.enter.native="searchList"></el-input>
      </div>
      <div class="search-form_item start-line">
        <el-date-picker
          v-model="leaveForm.leaveStartTime"
          type="date"
          placeholder="提交开始时间">
        </el-date-picker>
      </div>
      <div class="search-form_item">
        <el-date-picker
          v-model="leaveForm.leaveEndTime"
          type="date"
          :picker-options="pickerOptions"
          placeholder="提交结束时间">
        </el-date-picker>
      </div>
      <div class="search-form_button pt-3">
        <el-button type="primary" size="small" @click="searchList">查询</el-button>
      </div>
    </div>
  </el-form>
  <!-- 我发起的 -->
  <div class="mt-20">
    <el-tabs
      type="border-card"
      v-model="activeName"
      @tab-click="tabClick">
      <el-tab-pane name="first">
        <span slot="label">我发起的</span>
        <el-table
          :data="verifyOwnerDatas"
          border>
          <el-table-column
            label="序号"
            type="index"
            width="60">
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name"
            width="160px">
          </el-table-column>
          <el-table-column
            label="身份证号"
            prop="idNo"
            width="200px">
          </el-table-column>
          <el-table-column
            label="部门"
            prop="deptName"
            width="170px">
          </el-table-column>
          <el-table-column
            label="岗位"
            width="170px"
            prop="postName">
          </el-table-column>
          <el-table-column
            label="联系方式"
            prop="telephone"
            width="120px">
          </el-table-column>
          <el-table-column
            label="离职日期"
            prop="applyTime"
            width="120px">
            <template slot-scope="scope">
           {{scope.row.applyTime ? scope.row.applyTime.slice(0, scope.row.applyTime.indexOf('00:00:00')-1) : ''}}
          </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="175px">
            <template slot-scope="scope">
              {{scope.row.createTime}}
            </template>
          </el-table-column>
          <el-table-column
            label="离职说明"
            prop="outType">
            <template slot-scope="scope">
              {{scope.row.outType}}
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="155px">
            <template slot-scope="scope">
              <div v-if ="scope.row.realityEndTime === null">
                待审批
              </div>
              <div v-else>
                <div v-if ="scope.row.reason === ''">
                  <span>已同意</span>
                </div>
                <div v-else-if ="scope.row.reason === '撤销操作'">
                  <span>已撤销</span>
                </div>
                <div v-else>
                  <el-tooltip placement="top" effect="light">
                    <div slot="content" style="width: 130px;height: 55px;overflow: auto;">{{scope.row.reason}}</div>
                    <span>不同意</span>
                  </el-tooltip>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            fixed="right"
            width="130px">
            <template slot-scope="scope">
              <div class="operation">
                <span @click="detailMsg(scope.row, 'owner')">详情</span>
                 <span @click="revoke(scope.row)"
                  v-if="scope.row.task !== null && scope.row.task.name === '离职人事审批'">撤销</span>
                <span v-if="scope.row.reason !== null && scope.row.reason !== ''&&scope.row.reason !== '撤销操作'" @click="leaveMsg(scope.row)">重新发起</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          @size-change="handleLownerSizeChange"
          @current-change="handleLownerCurrentChange"
          :current-page="lownerPageMsg.currentPage"
          :page-sizes="lownerPageMsg.pageSizes"
          :page-size="lownerPageMsg.pageSize"
          :total="lownerPageMsg.total">
        </pagination>
      </el-tab-pane>
      <!-- 待审核 -->
      <el-tab-pane name="second" v-if="getCurrentRoleGroups.indexOf('outHr')!==-1">
        <span slot="label">待审核</span>
        <el-table
          :data="verifywaitDatas"
          border
          >
          <el-table-column
            label="序号"
            type="index"
            width="60">
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name"
            width="160px">
          </el-table-column>
          <el-table-column
            label="身份证号"
            prop="idNo"
            width="200px">
          </el-table-column>
          <el-table-column
            label="部门"
            prop="deptName"
            width="150px">
          </el-table-column>
          <el-table-column
            label="岗位"
            prop="postName"
            width="150px">
          </el-table-column>
          <el-table-column
            label="联系方式"
            prop="telephone"
            width="150px">
          </el-table-column>
          <el-table-column
            label="离职申请日期"
            prop="applyTime"
            width="150px">
           <template slot-scope="scope">
           {{scope.row.applyTime ? scope.row.applyTime.slice(0, scope.row.applyTime.indexOf('00:00:00')-1) : ''}}
          </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="170px">
            <template slot-scope="scope">
              {{scope.row.task.createTime}}
            </template>
          </el-table-column>
          <el-table-column
            label="离职说明"
            prop="outType">
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="120px">
            <template slot-scope="scope">
              <div class="operation">
                <span @click="AgreeMsg(scope.row)">同意</span>
                <span @click="UnAgreeMsg(scope.row)">不同意</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          @size-change="handleLwaitSizeChange"
          @current-change="handleLwaitCurrentChange"
          :current-page="lwaitPageMsg.currentPage"
          :page-sizes="lwaitPageMsg.pageSizes"
          :page-size="lwaitPageMsg.pageSize"
          :total="lwaitPageMsg.total">
        </pagination>
      </el-tab-pane>

      <!-- 已审核 -->
      <el-tab-pane name="third"  v-if="getCurrentRoleGroups.indexOf('outHr')!==-1">
        <span slot="label">已审核</span>
        <el-table
          :data="verifyFinishDatas"
          border
          >
          <el-table-column
            label="序号"
            type="index"
            width="60">
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name"
            width="110px">
          </el-table-column>
          <el-table-column
            label="身份证号"
            prop="idNo"
            width="200px">
          </el-table-column>
          <el-table-column
            label="部门"
            prop="deptName"
            width="130px">
          </el-table-column>
          <el-table-column
            label="岗位"
            prop="postName"
            width="150px">
          </el-table-column>
          <el-table-column
            label="联系方式"
            prop="telephone"
            width="140px">
          </el-table-column>
          <el-table-column
            label="离职日期"
            prop="applyTime"
            width="120px">
             <template slot-scope="scope">
           {{scope.row.applyTime ? scope.row.applyTime.slice(0, scope.row.applyTime.indexOf('00:00:00')-1) : ''}}
          </template>
          </el-table-column>
          <el-table-column
            label="离职说明"
            prop="outType"
            width="160px">
          </el-table-column>
          <el-table-column
            label="审批时间"
            width="185px">
            <template slot-scope="scope">
              {{scope.row.historicTaskInstance.endTime}}
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="185px">
            <template slot-scope="scope">
              {{scope.row.createTime}}
            </template>
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
              <div v-if ="scope.row.reason === ''">
                <span>已同意</span>
              </div>
              <div v-else>
                <el-tooltip placement="top" effect="light">
                  <div slot="content" style="width: 130px;height: 55px;overflow: auto;">{{scope.row.reason}}</div>
                  <span>不同意</span>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="80px"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <div class="operation">
                <span @click="detailMsg(scope.row)">详情</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          @size-change="handleLfinishSizeChange"
          @current-change="handleLfinishCurrentChange"
          :current-page="lfinishPageMsg.currentPage"
          :page-sizes="lfinishPageMsg.pageSizes"
          :page-size="lfinishPageMsg.pageSize"
          :total="lfinishPageMsg.total">
        </pagination>
      </el-tab-pane>
    </el-tabs>
  </div>

  <!-- 详情弹框 -->
  <el-dialog title="详情" :visible.sync="detailVisible" width="500px" class="leaveMsg">
    <el-form :model="detailForm" label-width="120px">
      <template v-if="detailForm.type == 1">
        <el-form-item label="申请日期：" >
          <span>{{detailForm.outTime}}</span>
        </el-form-item>
        <el-form-item label="申请原因：" >
          <span>{{detailForm.outType}}</span>
        </el-form-item>
      </template>
      <template v-if="detailForm.type == 2">
        <el-form-item label="不同意原因：" >
          <span>{{detailForm.reason}}</span>
        </el-form-item>
      </template>
      <template v-if="detailForm.type == 3">
        <el-form-item label="申请离职日期：" >
          <span>{{detailForm.outTime}}</span>
        </el-form-item>
        <el-form-item label="确认离职日期：" >
          <span>{{detailForm.outTimeSure}}</span>
        </el-form-item>
        <el-form-item label="离职类型：" >
          <span>{{detailForm.outTypeSure}}</span>
        </el-form-item>
      </template>
    </el-form>
  </el-dialog>

  <!-- 同意弹框 -->
  <el-dialog @close="cancelAgreeSave" title="同意" :visible.sync="agreeVisible" width="500px">
    <div class="module-opera">
      <el-form :model="agreeForm" label-width="140px">
        <el-form-item label="申请离职日期：" >
          <span>{{agreeForm.leavetime}}</span>
        </el-form-item>
        <el-form-item label="确认离职日期：" class="mustForm">
          <el-date-picker
            v-model="agreeForm.sureLeavetime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="确认离职类型：" class="mustForm">
          <el-select style="width:100%" v-model="agreeForm.reason" placeholder="请选择">
            <el-option
              v-for="item in leaveOption"
              :key="item.code"
              :label="item.codeText"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelAgreeSave" class="false" size="mini">取 消</el-button>
      <el-button type="primary" @click="AgreeSave" size="mini">确 定</el-button>
    </span>
  </el-dialog>

  <!-- 不同意原因 -->
  <el-dialog title="不同意原因" :visible.sync="UnagreeVisible" width="500px">
    <div class="module-opera">
      <el-form
        :model="UnagreeForm"
        :rules="unagressRules"
        ref="unagressRef"
        label-width="80px">
        <el-form-item  label="原 因：" prop="reason">
          <el-select style="width:100%" v-model="UnagreeForm.reason" placeholder="请选择原因">
            <el-option
              v-for="item in resonOption"
              :key="item.code"
              :label="item.codeText"
              :value="item.codeText">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="说 明：">
          <el-input type="textarea" v-model="UnagreeForm.remark" placeholder="请填写说明"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="UnagreeVisible = false" class="false" size="mini">取 消</el-button>
      <el-button type="primary" @click="UnAgreeSave" size="mini">确 定</el-button>
    </span>
  </el-dialog>

  <!-- 离职申请 -->
  <el-dialog title="离职申请" :visible.sync="LeaveVisible" width="500px">
    <el-form :model="LeaveForm" label-width="110px" class="dialog-form">
      <el-form-item label="申请日期：" class="mustForm">
        <el-date-picker
          v-model="LeaveForm.dimissionDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="申请原因：" class="mustForm">
        <el-select style="width:100%" v-model="LeaveForm.dimissionReason" placeholder="请选择">
          <el-option
            v-for="item in dimresonOption"
            :key="item.id"
            :label="item.codeText"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备  注：">
        <el-input type="textarea" v-model="LeaveForm.remark" placeholder="请填写备注"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="LeaveVisible = false" class="false" size="mini">取 消</el-button>
      <el-button type="primary" @click="leaveSave" size="mini">确 定</el-button>
    </span>
  </el-dialog>

</div>
</template>
<script>
import { getToken } from 'assets/js/util'
import { timeZeroToString } from 'assets/js/common'
import { leaveRollback, getLeaveDetail } from 'static/api/verify/leave/leave'
import { getTaskFinshed, getTaskList, getTaskComplete, rollBackExmine } from 'static/api/recruit/entry/entry'
import Pagination from 'components/Pagination'
import { leaveApply } from 'static/api/personnel-information/base/base'
import { getDeptNo, getSysDic } from 'static/api/common/common'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      tabTitle: '我发起的',
      activeName: '',
      lownerPageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      lwaitPageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      lfinishPageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      verifyOwnerDatas: [],
      verifywaitDatas: [],
      verifyFinishDatas: [],
      leaveForm: {
        keyWords: '',
        leaveStartTime: '',
        leaveEndTime: ''
      },
      detailVisible: false,
      UnagreeVisible: false,
      agreeVisible: false,
      agreeForm: {
        id: '',
        reason: '',
        remark: '',
        leavetime: '',
        sureLeavetime: ''
      },
      UnagreeForm: {
        id: '',
        reason: '',
        remark: ''
      },
      detailForm: {
        type: '',
        outTime: '',
        outType: '',
        reason: '',
        outTimeSure: '',
        outTypeSure: ''
      },
      revokeForm: {
        dutyId: '',
        userId: ''
      },
      unagreeDateForm: {},
      /* 确认离职类型 */
      leaveOption: [],
      /* leaveSelect: [
        {value: 1, label: '公司提出离职'},
        {value: 2, label: '员工提出离职'},
        {value: 3, label: '公司协商离职'},
        {value: 4, label: '员工协商离职'}
      ], */
      /* 不同意原因 */
      resonOption: [],
      /*  resonSelect: [
        {value: '信息有误', label: '信息有误'},
        {value: '不同意', label: '不同意'},
        {value: '其他', label: '其他'}
      ], */
      LeaveVisible: false,
      LeaveForm: {
        dimissionDate: '',
        dimissionReason: '',
        remark: ''
      },
      /* 离职申请原因 */
      dimresonOption: [],
      /* dimresonSelect: [
          {value: '个人发展', label: '个人发展'},
          {value: '工作环境', label: '工作环境'},
          {value: '薪酬福利', label: '薪酬福利'},
          {value: '家庭原因', label: '家庭原因'},
          {value: '其它原因', label: '其它原因'}
      ], */
      getIds: '',
      unagressRules: {
        reason: { required: true, message: '请选择不同意原因', trigger: 'change' }
      }
    }
  },
  computed: {
    pickerOptions () {
      return {
        disabledDate: (time) => {
          return new Date(time).getTime() < new Date(this.leaveForm.leaveStartTime).getTime()
        }
      }
    },
    ...mapGetters(['getCurrentRoleGroups']),
    contractOwnerParams () {
      return {
        actType: 'out',
        userId: getToken('loginId').toString(),
        keyword: this.leaveForm.keyWords,
        startTime: this.leaveForm.leaveStartTime ? timeZeroToString(this.leaveForm.leaveStartTime) : '',
        endTime: this.leaveForm.leaveEndTime ? timeZeroToString(this.leaveForm.leaveEndTime) : '',
        page: this.lownerPageMsg.currentPage,
        size: this.lownerPageMsg.pageSize,
        searchType: 'ower'
      }
    },
    contractWaitParams () {
      return {
        actType: 'out',
        groupId: 'outHr',
        userId: getToken('loginId').toString(),
        keyword: this.leaveForm.keyWords,
        startTime: this.leaveForm.leaveStartTime ? timeZeroToString(this.leaveForm.leaveStartTime) : '',
        endTime: this.leaveForm.leaveEndTime ? timeZeroToString(this.leaveForm.leaveEndTime) : '',
        page: this.lwaitPageMsg.currentPage,
        size: this.lwaitPageMsg.pageSize
      }
    },
    contractFinishParams () {
      return {
        actType: 'out',
        userId: getToken('loginId').toString(),
        keyword: this.leaveForm.keyWords,
        startTime: this.leaveForm.leaveStartTime ? timeZeroToString(this.leaveForm.leaveStartTime) : '',
        endTime: this.leaveForm.leaveEndTime ? timeZeroToString(this.leaveForm.leaveEndTime) : '',
        page: this.lfinishPageMsg.currentPage,
        size: this.lfinishPageMsg.pageSize
      }
    }
  },
  methods: {
    searchList () {
      if (this.tabTitle === '我发起的') {
        this.handleLownerCurrentChange(1)
      } else if (this.tabTitle === '待审核') {
        this.tabTitle = '待审核'
        this.handleLwaitCurrentChange(1)
      } else if (this.tabTitle === '已审核') {
        this.tabTitle = '已审核'
        this.handleLfinishCurrentChange(1)
      }
    },
    tabClick (tab, event) {
      if (tab.index === '0') {
        this.tabTitle = '我发起的'
        this.handleLownerCurrentChange(1)
        this.$router.push({ name: this.$route.name, query: { active: 'first' } })
      } else if (tab.index === '1') {
        this.tabTitle = '待审核'
        this.handleLwaitCurrentChange(1)
        this.$router.push({ name: this.$route.name, query: { active: 'second' } })
      } else if (tab.index === '2') {
        this.tabTitle = '已审核'
        this.handleLfinishCurrentChange(1)
        this.$router.push({ name: this.$route.name, query: { active: 'third' } })
      }
    },
    handleLownerSizeChange (pageSize) {
      this.lownerPageMsg.pageSize = pageSize
      this._getOwnerTaskList()
    },
    handleLownerCurrentChange (currentPage) {
      this.lownerPageMsg.currentPage = currentPage
      this._getOwnerTaskList()
    },
    handleLwaitSizeChange (pageSize) {
      this.lwaitPageMsg.pageSize = pageSize
      this._getwaitTaskList()
    },
    handleLwaitCurrentChange (currentPage) {
      this.lwaitPageMsg.currentPage = currentPage
      this._getwaitTaskList()
    },
    handleLfinishSizeChange (pageSize) {
      this.lfinishPageMsg.pageSize = pageSize
      this._getfinishTaskList()
    },
    handleLfinishCurrentChange (currentPage) {
      this.lfinishPageMsg.currentPage = currentPage
      this._getfinishTaskList()
    },
    /** 详情 **/
    detailMsg (row, tab) {
      this.detailVisible = true
      this.detailForm.outType = row.outType
      this.detailForm.reason = row.reason
      if (tab === 'owner') {
        this.detailForm.type = 1
      } else {
        if (row.reason === '') {
          this.detailForm.type = 3
        } else {
          this.detailForm.type = 2
        }
      }
      getLeaveDetail(row.employeeId).then(data => {
        this.detailForm.outTime = timeZeroToString(data.result.dimissionDate)
        this.detailForm.outTimeSure = data.result.dimissionDateComfirmed
        this.detailForm.outTypeSure = data.result.dimissionType
        if (data.result.dimissionType === 1) {
          this.detailForm.outTypeSure = '公司提出离职'
        } else if (data.result.dimissionType === 2) {
          this.detailForm.outTypeSure = '员工提出离职'
        } else if (data.result.dimissionType === 3) {
          this.detailForm.outTypeSure = '公司协商离职'
        } else if (data.result.dimissionType === 4) {
          this.detailForm.outTypeSure = '员工协商离职'
        }
      })
    },
    // 我发起的
    _getOwnerTaskList () {
      getTaskFinshed(this.contractOwnerParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.verifyOwnerDatas = data.result.records
          }
          this.lownerPageMsg.total = data.result.total
        }
      })
    },
    // 待审核
    _getwaitTaskList () {
      getTaskList(this.contractWaitParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.verifywaitDatas = data.result.records
          }
          this.lwaitPageMsg.total = data.result.total
        }
      })
    },
    // 已审核
    _getfinishTaskList () {
      getTaskFinshed(this.contractFinishParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.verifyFinishDatas = data.result.records
          }
          this.lfinishPageMsg.total = data.result.total
        }
      })
    },
    // 撤销
    revoke (row) {
      this.revokeForm.userId = row.employeeId
      let revokeParams = {
        'taskId': row.task.id,
        'pId': row.historicTaskInstance.executionId,
        'tKey': row.historicTaskInstance.taskDefinitionKey,
        'userId': 'rolluser',
        'owner': row.userId,
        'actType': 'out'
      }
      let Params = {
        auditStatus: 0,
        userId: this.revokeForm.userId.toString()
      }
      this.$confirm('确定要撤销' + row.name + '离职申请吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        leaveRollback(Params).then(res => {
          rollBackExmine(revokeParams).then(data => {
            this.$message.success('撤销成功')
            this._getOwnerTaskList()
          })
        })
      }).catch(() => {})
    },
    // 不同意
    UnAgreeMsg (row) {
      this.UnagreeForm.reason = ''
      this.UnagreeForm.remark = ''
      this.UnagreeVisible = true
      setTimeout(() => {
        this.$refs.unagressRef.resetFields()
      })
      let newPassKey = row.task.taskDefinitionKey
      newPassKey = (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass') + ',' + (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'BackReason')
      var unagreeParams = {
        actType: 'out',
        userId: getToken('loginId').toString(),
        pId: row.task.processInstanceId,
        id: row.id,
        taskId: row.task.id,
        owner: row.userId,
        var: {
          keys: newPassKey,
          values: '',
          types: 'B,S'
        }
      }
      this.unagreeDateForm = unagreeParams
      var unagreeBackParams = {
        auditStatus: 0,
        userId: row.employeeId
      }
      this.unagreeBackForm = unagreeBackParams
    },
    UnAgreeSave () {
      this.$refs.unagressRef.validate(valid => {
        if (valid) {
          if (this.UnagreeForm.remark) {
            let valuePost = false + ',' + this.UnagreeForm.reason + ':' + this.UnagreeForm.remark
            this.unagreeDateForm.var.values = valuePost
          } else {
            let valuePost = false + ',' + this.UnagreeForm.reason
            this.unagreeDateForm.var.values = valuePost
          }
          leaveRollback(this.unagreeBackForm).then(res => {
            getTaskComplete(this.unagreeDateForm).then(data => {
              this.UnagreeVisible = false
              this.$message.success('操作成功')
              setTimeout(() => {
                this._getwaitTaskList()
              }, 400)
            })
          })
        }
      })
    },
    // 同意
    AgreeMsg (row) {
      this.agreeVisible = true
      this.agreeForm.leavetime = timeZeroToString(row.applyTime.replace(/-/g, '/'))
      let newPassKey = row.task.taskDefinitionKey
      newPassKey = newPassKey ? newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass' : ''
      var agreeParams = {
        actType: 'out',
        userId: getToken('loginId').toString(),
        pId: row.task.processInstanceId,
        id: row.id,
        taskId: row.task.id,
        owner: row.userId,
        var: {
          keys: newPassKey,
          values: 'true',
          types: 'B'
        }
      }
      this.agreeDateForm = agreeParams
      var agreeBackParams = {
        auditStatus: 1,
        dimissionDateComfirmed: '',
        dimissionType: '',
        userId: row.employeeId
      }
      this.agreeBackForm = agreeBackParams
    },
    cancelAgreeSave () {
      this.agreeVisible = false
      this.agreeForm.sureLeavetime = ''
      this.agreeForm.reason = ''
    },
    AgreeSave () {
      this.agreeBackForm.dimissionDateComfirmed = timeZeroToString(this.agreeForm.sureLeavetime)
      this.agreeBackForm.dimissionType = this.agreeForm.reason
      if (!this.agreeForm.sureLeavetime) {
        this.$message.warning({
          message: '请选择确定离职日期!'
        })
        return
      } else if (!this.agreeForm.reason) {
        this.$message.warning({
          message: '请选择离职类型!'
        })
        return
      }
      leaveRollback(this.agreeBackForm).then(res => {
        getTaskComplete(this.agreeDateForm).then(data => {
          this.agreeVisible = false
          this.agreeForm.sureLeavetime = ''
          this.agreeForm.reason = ''
          this.$message.success('审核成功')
          setTimeout(() => {
            this._getwaitTaskList()
          }, 400)
        })
      })
    },
    // 离职申请
    leaveMsg (row) {
      this.LeaveVisible = true
      this.LeaveForm.dimissionDate = row.outTime
      let LeaveDate = {
        dimissionStatus: 8,
        userId: row.employeeId,
        deptNo: (row.employeeId).toString()
      }
      this.LeaveDateForm = LeaveDate
    },
    leaveSave () {
      this.LeaveDateForm.dimissionDate = this.LeaveForm.dimissionDate ? timeZeroToString(this.LeaveForm.dimissionDate) : ''
      this.LeaveDateForm.dimissionReason = this.LeaveForm.dimissionReason
      this.LeaveDateForm.remark = this.LeaveForm.remark
      /* this.LeaveDateForm.dimissionDate = this.LeaveForm.dimissionDate ? timeZeroToString(this.LeaveForm.dimissionDate) : ''
      if (this.LeaveForm.remark) {
        this.LeaveDateForm.dimissionReason = this.LeaveForm.dimissionReason + '，' + this.LeaveForm.remark
      } else {
        this.LeaveDateForm.dimissionReason = this.LeaveForm.dimissionReason
      } */
      if (!this.LeaveDateForm.dimissionDate) {
        this.$message.warning({
          message: '请填写申请日期!'
        })
        return
      } else if (!this.LeaveForm.dimissionReason) {
        this.$message.warning({
          message: '请填写申请原因!'
        })
        return
      }
      leaveApply(this.LeaveDateForm).then(data => {
        this.$message.success('离职申请成功')
        setTimeout(() => {
          this.LeaveForm = {
            dimissionDate: '',
            dimissionReason: '',
            remark: ''
          }
          this._getOwnerTaskList()
        }, 400)

        this.LeaveVisible = false
      })
    },
    // 获取ids
    _getDeptNo () {
      getDeptNo().then(data => {
        if (data.result) {
          this.getIds = data.result.toString()
        }
      })
    },
    // 根据路由判断当前定位到的路由
    _getCurrentRouter () {
      this.activeName = this.$route.query.active
      if (!this.activeName) {
        this.$router.push({ name: this.$route.name, query: { active: 'first' } })
        this.activeName = 'first'
      }
      if (this.activeName === 'first') {
        this.tabTitle = '我发起的'
        this.handleLownerCurrentChange(1)
      } else if (this.activeName === 'second') {
        this.tabTitle = '待审核'
        this.handleLwaitCurrentChange(1)
      } else if (this.activeName === 'third') {
        this.tabTitle = '已审核'
        this.handleLfinishCurrentChange(1)
      }
    },
    /* 获取数字字典 */
    async _getQueryClassList () {
      /* 确认离职类型 */
      await getSysDic('auditDimissionType').then(data => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.leaveOption.push(item)
            }
          })
        }
      })
      /* 不同意类型 */
      await getSysDic('auditRefusedType').then(data => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.resonOption.push(item)
            }
          })
        }
      })
      /* 离职申请原因 */
      await getSysDic('dimissionType').then(data => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.dimresonOption.push(item)
            }
          })
        }
      })
    }
  },
  components: {
    Pagination
  },
  filters: {
    /* filterLastWord (value) {
      console.log('123', value)
      return value.slice(value.length - 1, value.length) === ',' ? value.slice(0, value.length - 1) : value
    } */
  },
  created () {
    this._getCurrentRouter()
    this._getDeptNo()
    this._getQueryClassList()
  }
}
</script>

<style lang="less" scoped>
.leaveMsg .el-form-item{
  margin-bottom:10px;
}
</style>
