<template>
  <div class="container">
    <div class="mt-20">
      <el-tabs type="border-card" @tab-click="tabClick">
        <el-tab-pane>
          <span slot="label">待审核</span>
          <el-table
            :data="verifywaitDatas"
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
              <template slot-scope="scope">{{(scope.row.applyTime).substring(0,10)}}</template>
            </el-table-column>
            <el-table-column
              label="创建时间"
              width="170px">
              <template slot-scope="scope">
                {{scope.row.createTime}}
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

        <el-tab-pane>
          <span slot="label">已审核</span>
          <el-table
            :data="verifyFinishDatas"
            border
            tooltip-effect="dark"
            style="max-width: 100%;min-width:700px;overflow-y: auto"
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
              prop="outTime"
              width="120px">
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

    <!-- 详情 -->
    <el-dialog title="详情" :visible.sync="detailVisible" v-draggable width="600px">
      <el-form :model="detailForm" label-width="140px">
        <el-form-item label="申请日期：">{{detailForm.applyTime}}</el-form-item>
        <el-form-item label="申请原因：">{{detailForm.outType}}</el-form-item>
        <el-form-item label="确定离职日期："> {{detailForm.outTime}}</el-form-item>
        <el-form-item label="离 职 类 型：">{{detailForm.outTypeSure}}</el-form-item>
        <el-form-item label="备  注：">{{detailForm.remark ? detailForm.remark:'未填写'}}</el-form-item>
      </el-form>
    </el-dialog>

    <!--同意-->
    <el-dialog title="同意" :visible.sync="agreeVisible" v-draggable width="600px">
      <div class="module-opera">
        <el-form :model="agreeForm" ref="agressForm" label-width="140px">
         <el-form-item label="申请日期：">
            {{agreeForm.leavetime}}
          </el-form-item>
          <el-form-item label="申请原因：">
            {{agreeForm.dimissionReason}}
          </el-form-item>
          <el-form-item  label="确定离职日期：">
            {{agreeForm.sureLeavetime}}
          </el-form-item>
          <el-form-item  label="离 职 类 型：">
            {{agreeForm.reason}}
          </el-form-item>
          <el-form-item label="备　注：">
            {{agreeForm.remark ? agreeForm.remark:'未填写'}}
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="agreeVisible = false" class="false" size="mini">取 消</el-button>
        <el-button type="primary" @click="AgreeSave" size="mini">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 不同意原因 -->
    <el-dialog title="不同意原因" :visible.sync="UnagreeVisible" v-draggable width="600px">
      <div class="module-opera">
        <el-form  :model="UnagreeForm" ref="unAgressForm" :rules="unAgressRules" label-width="80px">
          <el-form-item  label="原因：" prop="reason">
            <el-select style="width: 100%" v-model="UnagreeForm.reason" placeholder="请选择">
              <el-option
                v-for="item in resonOption"
                :key="item.id"
                :label="item.codeText"
                :value="item.codeText">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="说明：">
            <el-input type="textarea" v-model="UnagreeForm.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="UnagreeVisible = false" class="false" size="mini">取 消</el-button>
        <el-button type="primary" @click="UnAgreeSave('unAgressForm')" size="mini">确 定</el-button>
      </span>
    </el-dialog>
</div>
</template>
<script>
import { getToken } from 'assets/js/util'
import { timeZeroToString } from 'assets/js/common'
import { leaveRollback } from 'static/api/verify/leave/leave'
import { getTaskFinshed, getTaskList, getTaskComplete, rollBackExmine } from 'static/api/recruit/entry/entry'
import Pagination from 'components/Pagination'
import { getDeptNo, getSysDic } from 'static/api/common/common'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      tabTitle: '待审核',
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
        sureLeavetime: '',
        dimissionReason: '',
        dimissionDate: ''
      },
      UnagreeForm: {
        id: '',
        reason: '',
        remark: ''
      },
      detailForm: {
        applyTime: '',
        outType: '',
        outTime: '',
        reason: '',
        outTimeSure: '',
        outTypeSure: ''
      },
      revokeForm: {
        dutyId: '',
        userId: ''
      },
      unagreeDateForm: {},
      resonOption: [],
      LeaveVisible: false,
      LeaveForm: {
        dimissionDate: '',
        dimissionReason: '',
        remark: ''
      },
      getIds: '',
      unAgressRules: {
        reason: { required: true, message: '请选择离职原因', trigger: 'change' }
      }
    }
  },
  computed: {
    ...mapGetters(['getMarketVerifyLeaveSearchArr', 'getMarketVerifyLeaveClick']),
    contractWaitParams () {
      return {
        actType: 'outMarket',
        groupId: 'outMarketHr',
        userId: getToken('loginId').toString(),
        keyword: this.getMarketVerifyLeaveSearchArr.keyword,
        startTime: this.getMarketVerifyLeaveSearchArr.startTime ? timeZeroToString(this.getMarketVerifyLeaveSearchArr.startTime) : '',
        endTime: this.getMarketVerifyLeaveSearchArr.endTime ? timeZeroToString(this.getMarketVerifyLeaveSearchArr.endTime) : '',
        page: this.lwaitPageMsg.currentPage,
        size: this.lwaitPageMsg.pageSize
      }
    },
    contractFinishParams () {
      return {
        actType: 'outMarket',
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
    tabClick (tab, event) {
      if (tab.index === '0') {
        this.tabTitle = '待审核'
        this._getwaitTaskList()
      } else if (tab.index === '1') {
        this.tabTitle = '已审核'
        this._getfinishTaskList()
      }
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
    // 详情
    detailMsg (row, tab) {
      this.detailVisible = true
      this.detailForm.applyTime = row.applyTime ? timeZeroToString(row.applyTime) : ''
      this.detailForm.outTime = row.outTime
      this.detailForm.outTypeSure = row.remark
      this.detailForm.outType = row.outType.split(',')[0]
      this.detailForm.remark = row.outType.split(',')[1]
    },
    // 待审核
    _getwaitTaskList () {
      getTaskList(this.contractWaitParams).then(data => {
        if (data.result) {
          this.verifywaitDatas = data.result.records
          this.lwaitPageMsg.total = data.result.total
        }
      })
    },
    // 已审核
    _getfinishTaskList () {
      getTaskFinshed(this.contractFinishParams).then(data => {
        if (data.result) {
          this.verifyFinishDatas = data.result.records
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
        'actType': 'outMarket'
      }
      let Params = {
        auditStatus: -1,
        userId: this.revokeForm.userId.toString()
      }
      this.$confirm('确定要撤销' + row.name + '入职申请吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        leaveRollback(Params).then(res => {
          rollBackExmine(revokeParams).then(data => {
            this.$message.success('撤销成功')
            this._getwaitTaskList()
          })
        })
      }).catch(() => {})
    },
    // 不同意
    UnAgreeMsg (row) {
      this.UnagreeForm.reason = ''
      this.UnagreeForm.remark = ''
      this.UnagreeVisible = true
      let newPassKey = row.task.taskDefinitionKey
      newPassKey = (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass') + ',' + (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'BackReason')
      var unagreeParams = {
        actType: 'outMarket',
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
    UnAgreeSave (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          /* let valuePost = false + ',' + this.UnagreeForm.reason + this.UnagreeForm.remark
          this.unagreeDateForm.var.values = valuePost */

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
      this.agreeForm.leavetime = timeZeroToString(row.applyTime)
      this.agreeForm.sureLeavetime = row.outTime
      this.agreeForm.dimissionReason = row.outType.split(',')[0]
      this.agreeForm.remark = row.outType.split(',')[1]
      this.agreeForm.reason = row.remark
      // agreeForm: {
      //   id: '',
      //   reason: '',
      //   remark: '',
      //   leavetime: '',
      //   sureLeavetime: '',
      //   dimissionReason: '',
      //   dimissionDate: ''
      // },
      let newPassKey = row.task.taskDefinitionKey
      newPassKey = newPassKey ? newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass' : ''
      var agreeParams = {
        actType: 'outMarket',
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
    AgreeSave () {
      this.agreeBackForm.dimissionDateComfirmed = timeZeroToString(this.agreeForm.sureLeavetime)
      if (this.agreeForm.reason === '公司提出离职') {
        this.agreeBackForm.dimissionType = 1
      } else if (this.agreeForm.reason === '员工提出离职') {
        this.agreeBackForm.dimissionType = 2
      } else if (this.agreeForm.reason === '公司协商离职') {
        this.agreeBackForm.dimissionType = 3
      } else if (this.agreeForm.reason === '员工协商离职') {
        this.agreeBackForm.dimissionType = 4
      }
      // this.agreeBackForm.dimissionType = this.agreeForm.reason
      leaveRollback(this.agreeBackForm).then(res => {
        getTaskComplete(this.agreeDateForm).then(data => {
          this.agreeVisible = false
          this.$message.success('审核成功')
          setTimeout(() => {
            this._getwaitTaskList()
          }, 400)
        })
      })
    },
    // 获取ids
    _getDeptNo () {
      getDeptNo().then((data) => {
        if (data && data.data) {
          this.getIds = data.data.toString()
        }
      })
    },
    /* 获取数字字典 */
    async _getQueryClassList () {
      /* 不同意类型 */
      await getSysDic('auditRefusedType').then((data) => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.resonOption.push(item)
            }
          })
        }
      })
    }
  },
  components: {
    Pagination
  },
  watch: {
    getMarketVerifyLeaveClick (val) {
      if (val) {
        if (this.tabTitle === '待审核') {
          this.handleLwaitCurrentChange(1)
        } else if (this.tabTitle === '已审核') {
          this.handleLfinishCurrentChange(1)
        }
      }
      this.$store.commit('SET_MARKETVERIFY_CLICKED', false)
    }
  },
  created () {
    this._getwaitTaskList()
    this._getDeptNo()
    this._getQueryClassList()
  }
}
</script>
