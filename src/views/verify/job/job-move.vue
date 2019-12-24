<template>
  <div class="container">
    <el-tabs
    type="border-card"
    class="mt-20"
     @tab-click="tabClick">
      <el-tab-pane>
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
            prop="name">
          </el-table-column>
          <el-table-column
            label="身份证号"
            prop="idNo"
            width="180px">
          </el-table-column>
          <el-table-column
            label="任职组织"
            prop="deptName"
            width="200px">
          </el-table-column>
          <el-table-column
            label="任职职务"
            prop="dutyName">
          </el-table-column>
          <el-table-column
            label="是否负责人"
            prop="isPrincipal">
          </el-table-column>
          <el-table-column
            label="职务级别"
            prop="dutyRank">
          </el-table-column>
          <el-table-column
            label="待遇级别"
            prop="treatmentRank">
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="170px">
            <template slot-scope="scope">
              {{scope.row.createTime}}
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="160px">
            <template slot-scope="scope">
              <div v-if ="scope.row.realityEndTime === null">
                {{scope.row.historicTaskInstance.name}}中
              </div>
              <div v-else>
                <span v-if="scope.row.historicVariableInstance">
                  <div v-if="scope.row.historicVariableInstance.value === '撤销操作'">已撤销</div>
                  <div v-else>
                    <el-tooltip placement="top" effect="light">
                      <div slot="content" style="width: 130px;height: 55px;overflow: auto;">{{scope.row.historicVariableInstance.value}}</div>
                      <span>拒绝</span>
                    </el-tooltip>
                  </div>
                </span>
                <span v-else>已完成</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="100px">
            <template slot-scope="scope">
              <div class="operation">
                <span v-if="!scope.row.realityEndTime" @click="revoke(scope.row)">撤销</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          @size-change="handlePownerSizeChange"
          @current-change="handlePownerCurrentChange"
          :current-page="pownerPageMsg.currentPage"
          :page-sizes="pownerPageMsg.pageSizes"
          :page-size="pownerPageMsg.pageSize"
          :total="pownerPageMsg.total">
        </pagination>
      </el-tab-pane>

      <el-tab-pane v-if="getCurrentRoleGroups.indexOf('dutyDepose')!==-1">
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
            prop="name">
          </el-table-column>
          <el-table-column
            label="身份证号"
            prop="idNo"
            width="180px">
          </el-table-column>
          <el-table-column
            label="任职组织"
            prop="deptName"
            width="200px">
          </el-table-column>
          <el-table-column
            label="任职职务"
            prop="dutyName">
          </el-table-column>
          <el-table-column
            label="是否负责人"
            prop="isPrincipal">
          </el-table-column>
          <el-table-column
            label="职务级别"
            prop="dutyRank">
          </el-table-column>
          <el-table-column
            label="待遇级别"
            prop="treatmentRank">
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="170px">
            <template slot-scope="scope">
              {{scope.row.createTime}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="100px">
            <template slot-scope="scope">
              <div class="operation">
                <span @click="verifyJobMsg(scope.row)">审核</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          @size-change="handlePwaitSizeChange"
          @current-change="handlePwaitCurrentChange"
          :current-page="pwaitPageMsg.currentPage"
          :page-sizes="pwaitPageMsg.pageSizes"
          :page-size="pwaitPageMsg.pageSize"
          :total="pwaitPageMsg.total">
        </pagination>
      </el-tab-pane>

      <el-tab-pane v-if="getCurrentRoleGroups.indexOf('dutyDepose')!==-1">
        <span slot="label">已审核</span>
        <el-table
          :data="verifyFinishDatas"
          border>
          <el-table-column
            label="序号"
            type="index"
            width="60">
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name">
          </el-table-column>
          <el-table-column
            label="身份证号"
            prop="idNo"
            width="180px">
          </el-table-column>
          <el-table-column
            label="任职组织"
            prop="deptName"
            width="200px">
          </el-table-column>
          <el-table-column
            label="任职职务"
            prop="dutyName">
          </el-table-column>
          <el-table-column
            label="是否负责人"
            prop="isPrincipal">
          </el-table-column>
          <el-table-column
            label="职务级别"
            prop="dutyRank">
          </el-table-column>
          <el-table-column
            label="待遇级别"
            prop="treatmentRank">
          </el-table-column>
          <el-table-column
            label="审批时间"
            width="170px">
            <template slot-scope="scope">
              {{scope.row.historicTaskInstance.endTime}}
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="170px">
            <template slot-scope="scope">
              {{scope.row.historicTaskInstance.startTime}}
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="100px">
            <template slot-scope="scope">
              <div v-if ="scope.row.reason === ''">
                <span>已同意</span>
              </div>
              <div v-else>
                <span v-if="scope.row.historicVariableInstance">
                  <el-tooltip placement="top" effect="light">
                    <div slot="content" style="width: 130px;height: 55px;overflow: auto;">{{scope.row.historicVariableInstance.value}}</div>
                    <span>拒绝</span>
                  </el-tooltip>
                </span>
                <span v-else>拒绝</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          @size-change="handlePfinishSizeChange"
          @current-change="handlePfinishCurrentChange"
          :current-page="pfinishPageMsg.currentPage"
          :page-sizes="pfinishPageMsg.pageSizes"
          :page-size="pfinishPageMsg.pageSize"
          :total="pfinishPageMsg.total">
        </pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getDeptNo } from 'static/api/common/common'
import { mapGetters, mapMutations } from 'vuex'
import { getToken } from 'assets/js/util'
import { MessageBox } from 'element-ui'
import { getTaskFinshed, getTaskList, rollBackExmine } from 'static/api/recruit/entry/entry'
import { backout } from 'static/api/personnel-information/job/job'
import { timeZeroToString } from 'assets/js/common'
import Pagination from 'components/Pagination.vue'
export default {
  data () {
    return {
      tabTitle: '我发起的',
      verifyOwnerDatas: [],
      verifywaitDatas: [],
      verifyFinishDatas: [],
      pownerPageMsg: {},
      pwaitPageMsg: {},
      pfinishPageMsg: {},
      revokeForm: {
        dutyId: ''
      },
      getIds: ''
    }
  },
  components: {
    Pagination
  },
  computed: {
    ...mapGetters(['getVerifyJobArr', 'getVerifyJobClicked', 'getCurrentRoleGroups']),
    contractOwnerParams () {
      return {
        actType: 'dutyDepose',
        userId: getToken('loginId').toString(),
        keyword: this.getVerifyJobArr.keyword,
        startTime: this.getVerifyJobArr.startTime ? timeZeroToString(this.getVerifyJobArr.startTime) : '',
        endTime: this.getVerifyJobArr.endTime ? timeZeroToString(this.getVerifyJobArr.endTime) : '',
        page: this.pownerPageMsg.currentPage,
        size: this.pownerPageMsg.pageSize,
        searchType: 'ower'
      }
    },
    contractWaitParams () {
      return {
        actType: 'dutyDepose',
        groupId: 'dutyDepose',
        userId: getToken('loginId').toString(),
        keyword: this.getVerifyJobArr.keyword,
        startTime: this.getVerifyJobArr.startTime ? timeZeroToString(this.getVerifyJobArr.startTime) : '',
        endTime: this.getVerifyJobArr.endTime ? timeZeroToString(this.getVerifyJobArr.endTime) : '',
        page: this.pwaitPageMsg.currentPage,
        size: this.pwaitPageMsg.pageSize
      }
    },
    contractFinishParams () {
      return {
        actType: 'dutyDepose',
        userId: getToken('loginId').toString(),
        keyword: this.getVerifyJobArr.keyword,
        startTime: this.getVerifyJobArr.startTime ? timeZeroToString(this.getVerifyJobArr.startTime) : '',
        endTime: this.getVerifyJobArr.endTime ? timeZeroToString(this.getVerifyJobArr.endTime) : '',
        page: this.pfinishPageMsg.currentPage,
        size: this.pfinishPageMsg.pageSize
      }
    }
  },
  methods: {
    ...mapMutations({
      getExmineId: 'SET_EXMINE_ID',
      getExmineUserId: 'SET_EXMINE_USERID',
      getExminePassKey: 'SET_EXMINE_PASSKEY',
      getExmineTaskId: 'SET_EXMINE_TASKID',
      getExminePid: 'SET_EXMINE_PID',
      getJobClicked: 'SET_JOB_CLICKED'
    }),
    verifyJobMsg (row) {
      let jobId = row.dutyId ? row.dutyId : ''
      let employeeId = row.employeeId ? row.employeeId : 'null'
      let exmineId = row.id ? row.id : 'null'
      let exmineUserId = row.userId ? row.userId : 'null'
      let exminePassKey = row.task ? row.task.taskDefinitionKey ? row.task.taskDefinitionKey : 'null' : 'null'
      let exmineTaskId = row.task ? row.task.id ? row.task.id : 'null' : 'null'
      let exminePid = row.task ? row.task.processInstanceId ? row.task.processInstanceId : 'null' : 'null'
      this.$router.push({
        name: '免除干部详情审核',
        params: {
          jobId: jobId,
          employeeId: employeeId,
          exmineId: exmineId,
          exmineUserId: exmineUserId,
          exminePassKey: exminePassKey,
          exmineTaskId: exmineTaskId,
          exminePid: exminePid
        }
      })
    },
    /** 撤销免除**/
    revoke (row) {
      this.revokeForm.dutyId = row.dutyId
      let revokeParams = {
        'taskId': row.task.id,
        'pId': row.historicTaskInstance.executionId,
        'tKey': row.historicTaskInstance.taskDefinitionKey,
        'userId': 'rolluser',
        'owner': row.historicTaskInstance.owner || row.userId || '',
        'actType': 'dutyDepose'
      }
      let Params = {
        id: this.revokeForm.dutyId
      }
      MessageBox.confirm('确定要撤销' + row.name + '吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        rollBackExmine(revokeParams).then(data => {
          backout(Params).then((data) => {
            this.$message.success('撤销成功')
            setTimeout(() => {
              this._getOwnerTaskList()
              this._getwaitTaskList()
            }, 400)
          })

          /* if (data.data.returnCode === '0') {
              backout(Params).then((data) => {
                if (data.data.returnCode === '1') {
                  this.$message.success('撤销成功')
                  setTimeout(() => {
                    this._getOwnerTaskList()
                    this._getwaitTaskList()
                  }, 400)
                } else {
                  setTimeout(() => {
                    this.$message.error('撤销失败' + data)
                  }, 400)
                }
              })
            } */
        })
      }).catch(() => {})
    },
    handlePownerSizeChange (pageSize) {
      this.pownerPageMsg.pageSize = pageSize
      this._getOwnerTaskList()
    },
    handlePownerCurrentChange (currentPage) {
      this.pownerPageMsg.currentPage = currentPage
      this._getOwnerTaskList()
    },
    handlePwaitSizeChange (pageSize) {
      this.pwaitPageMsg.pageSize = pageSize
      this._getwaitTaskList()
    },
    handlePwaitCurrentChange (currentPage) {
      this.pwaitPageMsg.currentPage = currentPage
      this._getwaitTaskList()
    },
    handlePfinishSizeChange (pageSize) {
      this.pfinishPageMsg.pageSize = pageSize
      this._getfinishTaskList()
    },
    handlePfinishCurrentChange (currentPage) {
      this.pfinishPageMsg.currentPage = currentPage
      this._getfinishTaskList()
    },
    _getOwnerTaskList () {
      /** 我发起的**/
      getTaskFinshed(this.contractOwnerParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.verifyOwnerDatas = data.result.records
          }
          this.pownerPageMsg.total = data.result.total
        }
      })
    },
    _getwaitTaskList () {
      /** 待审核**/
      getTaskList(Object.assign(this.contractWaitParams, { groupId: 'dutyDepose' })).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.verifywaitDatas = data.result.records
          }
          this.pwaitPageMsg.total = data.result.total
        }
      })
    },
    _getfinishTaskList () {
      /** 已审核**/
      getTaskFinshed(this.contractFinishParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.verifyFinishDatas = data.result.records
          }
          this.pfinishPageMsg.total = data.result.total
        }
      })
    },
    tabClick (tab, event) {
      if (tab.index === '0') {
        this.tabTitle = '我发起的'
        this.handlePownerCurrentChange(1)
      } else if (tab.index === '1') {
        this.tabTitle = '待审核'
        this.handlePwaitCurrentChange(1)
      } else if (tab.index === '2') {
        this.tabTitle = '已审核'
        this.handlePfinishCurrentChange(1)
      }
    },
    _getDeptNo () {
      getDeptNo().then(data => {
        if (data.result) {
          this.getIds = data.result.toString()
        }
      })
    }
  },
  watch: {
    getVerifyJobClicked (val) {
      if (val) {
        if (this.tabTitle === '我发起的') {
          this._getOwnerTaskList()
        } else if (this.tabTitle === '待审核') {
          this._getwaitTaskList()
        } else if (this.tabTitle === '已审核') {
          this._getfinishTaskList()
        }
      }
      this.$store.commit('SET_VERIFYJOB_CLICKED', false)
    }
  },
  created () {
    this._getOwnerTaskList()
    this._getDeptNo()
  }
}
</script>

<style scoped lang="less">

</style>
