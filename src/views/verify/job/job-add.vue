<template>
  <div class="mt-20">
    <el-tabs
      type="border-card"
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
          @size-change="handleJownerSizeChange"
          @current-change="handleJownerCurrentChange"
          :current-page="jownerPageMsg.currentPage"
          :page-sizes="jownerPageMsg.pageSizes"
          :page-size="jownerPageMsg.pageSize"
          :total="jownerPageMsg.total">
        </pagination>
      </el-tab-pane>

      <el-tab-pane v-if="getCurrentRoleGroups.indexOf('dutyAdd')!==-1">
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
          @size-change="handleJwaitSizeChange"
          @current-change="handleJwaitCurrentChange"
          :current-page="jwaitPageMsg.currentPage"
          :page-sizes="jwaitPageMsg.pageSizes"
          :page-size="jwaitPageMsg.pageSize"
          :total="jwaitPageMsg.total">
        </pagination>
      </el-tab-pane>

      <el-tab-pane v-if="getCurrentRoleGroups.indexOf('dutyAdd')!==-1">
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
            width="140px">
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
          @size-change="handleJfinishSizeChange"
          @current-change="handleJfinishCurrentChange"
          :current-page="jfinishPageMsg.currentPage"
          :page-sizes="jfinishPageMsg.pageSizes"
          :page-size="jfinishPageMsg.pageSize"
          :total="jfinishPageMsg.total">
        </pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getDeptNo } from 'static/api/common/common'
import { mapGetters } from 'vuex'
import { getToken } from 'assets/js/util'
import { MessageBox } from 'element-ui'
import Pagination from 'components/Pagination.vue'
import { backout } from 'static/api/personnel-information/job/job'
import { getTaskFinshed, getTaskList, rollBackExmine } from 'static/api/recruit/entry/entry'
import { timeZeroToString } from 'assets/js/common'
/* import { getExmine } from 'assets/js/exmine' */
export default {
  data () {
    return {
      // activeName: '',
      verifyOwnerDatas: [],
      verifywaitDatas: [],
      verifyFinishDatas: [],
      jownerPageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      jwaitPageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      jfinishPageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      tabTitle: '我发起的',
      getIds: '',
      revokeForm: {
        dutyId: ''
      }
    }
  },
  components: {
    Pagination
  },
  computed: {
    ...mapGetters(['getVerifyJobArr', 'getVerifyJobClicked', 'getCurrentRoleGroups']),
    contractOwnerParams () {
      return {
        actType: 'dutyAdd',
        userId: getToken('loginId').toString(),
        keyword: this.getVerifyJobArr.keyword,
        startTime: this.getVerifyJobArr.startTime ? timeZeroToString(this.getVerifyJobArr.startTime) : '',
        endTime: this.getVerifyJobArr.endTime ? timeZeroToString(this.getVerifyJobArr.endTime) : '',
        page: this.jownerPageMsg.currentPage,
        size: this.jownerPageMsg.pageSize,
        searchType: 'ower'
      }
    },
    contractWaitParams () {
      return {
        actType: 'dutyAdd',
        groupId: 'dutyAdd',
        userId: getToken('loginId').toString(),
        keyword: this.getVerifyJobArr.keyword,
        startTime: this.getVerifyJobArr.startTime ? timeZeroToString(this.getVerifyJobArr.startTime) : '',
        endTime: this.getVerifyJobArr.endTime ? timeZeroToString(this.getVerifyJobArr.endTime) : '',
        page: this.jwaitPageMsg.currentPage,
        size: this.jwaitPageMsg.pageSize
      }
    },
    contractFinishParams () {
      return {
        actType: 'dutyAdd',
        userId: getToken('loginId').toString(),
        keyword: this.getVerifyJobArr.keyword,
        startTime: this.getVerifyJobArr.startTime ? timeZeroToString(this.getVerifyJobArr.startTime) : '',
        endTime: this.getVerifyJobArr.endTime ? timeZeroToString(this.getVerifyJobArr.endTime) : '',
        page: this.jfinishPageMsg.currentPage,
        size: this.jfinishPageMsg.pageSize
      }
    }
  },
  methods: {
    verifyJobMsg (row) {
      let jobId = row.dutyId ? row.dutyId : ''
      let employeeId = row.employeeId ? row.employeeId : 'null'
      let exmineId = row.id ? row.id : 'null'
      let exmineUserId = row.userId ? row.userId : 'null'
      let exminePassKey = row.task ? row.task.taskDefinitionKey ? row.task.taskDefinitionKey : 'null' : 'null'
      let exmineTaskId = row.task ? row.task.id ? row.task.id : 'null' : 'null'
      let exminePid = row.task ? row.task.processInstanceId ? row.task.processInstanceId : 'null' : 'null'
      this.$router.push({
        name: '新增干部详情审核',
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
    /** 撤销干部新增**/
    revoke (row) {
      this.revokeForm.dutyId = row.dutyId
      let revokeParams = {
        'taskId': row.task.id,
        'pId': row.historicTaskInstance.executionId,
        'tKey': row.historicTaskInstance.taskDefinitionKey,
        'userId': 'rolluser',
        'owner': row.historicTaskInstance.owner || row.userId || '',
        'actType': 'dutyAdd'
      }
      let Params = {
        id: this.revokeForm.dutyId
      }
      MessageBox.confirm('确定要撤销' + row.name + '吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        rollBackExmine(revokeParams).then((data) => {
          backout(Params).then((data) => {
            this.$message.success('撤销成功')
            setTimeout(() => {
              this._getOwnerTaskList()
              this._getwaitTaskList()
            }, 500)
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
            } else {
              setTimeout(() => {
                this.$message.error('撤销失败' + data.data.msg)
              }, 400)
            } */
        })
      }).catch(() => {})
    },
    handleJownerSizeChange (pageSize) {
      this.jownerPageMsg.pageSize = pageSize
      this._getOwnerTaskList()
    },
    handleJownerCurrentChange (currentPage) {
      this.jownerPageMsg.currentPage = currentPage
      this._getOwnerTaskList()
    },
    handleJwaitSizeChange (pageSize) {
      this.jwaitPageMsg.pageSize = pageSize
      this._getwaitTaskList()
    },
    handleJwaitCurrentChange (currentPage) {
      this.jwaitPageMsg.currentPage = currentPage
      this._getwaitTaskList()
    },
    handleJfinishSizeChange (pageSize) {
      this.jfinishPageMsg.pageSize = pageSize
      this._getfinishTaskList()
    },
    handleJfinishCurrentChange (currentPage) {
      this.jfinishPageMsg.currentPage = currentPage
      this._getfinishTaskList()
    },
    _getOwnerTaskList () {
      // 我发起的
      getTaskFinshed(this.contractOwnerParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.verifyOwnerDatas = data.result.records
          }
          this.jownerPageMsg.total = data.result.total
        }
      })
    },
    _getwaitTaskList () {
      /** 待审核**/
      getTaskList(Object.assign(this.contractWaitParams, { groupId: 'dutyAdd' })).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.verifywaitDatas = data.result.records
          }
          this.jwaitPageMsg.total = data.result.total
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
          this.jfinishPageMsg.total = data.result.total
        }
      })
    },
    tabClick (tab, event) {
      if (tab.index === '0') {
        // this.$router.push({name: this.$route.name, query: {active: 'first'}})
        this.tabTitle = '我发起的'
        this.handleJownerCurrentChange(1)
      } else if (tab.index === '1') {
        // this.$router.push({name: this.$route.name, query: {active: 'second'}})
        this.tabTitle = '待审核'
        this.handleJwaitCurrentChange(1)
      } else if (tab.index === '2') {
        // this.$router.push({name: this.$route.name, query: {active: 'third'}})
        this.tabTitle = '已审核'
        this.handleJfinishCurrentChange(1)
      }
    },
    _getDeptNo () {
      getDeptNo().then(data => {
        if (data.result) {
          this.getIds = data.result.toString()
        }
      })
    }
    /* goWhereRouter () {
        this.activeName = this.$route.query.active
        if (this.activeName === 'first') {
          this.handleJownerCurrentChange(1)
          this.tabTitle = '我发起的'
        } else if (this.activeName === 'second') {
          this.tabTitle = '待审核'
        } else if (this.activeName === 'third') {
          this.handleJwaitCurrentChange(1)
          this.tabTitle = '已审核'
          this.handleJfinishCurrentChange(1)
        }
      } */
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
    /*  this.goWhereRouter() */
    /* console.log(this.getVerifyJobArr) */
  }
}
</script>

<style scoped lang="less">

</style>
