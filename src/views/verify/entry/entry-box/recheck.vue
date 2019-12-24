<template>
  <div class="mt-20">
    <el-tabs type="border-card"
    v-model="activeName"
     @tab-click="tabClick">
      <el-tab-pane name="first">
        <span slot="label">待复核</span>
        <el-table
          :data="taskDatas"
          border>
          <el-table-column
            label="序号"
            type="index"
            width="70">
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name"
            width="160px">
          </el-table-column>
          <el-table-column
            label="身份证号"
            prop="idNo">
          </el-table-column>
          <el-table-column
            label="部门"
            prop="deptName">
          </el-table-column>
          <el-table-column
            label="岗位"
            prop="postName"
            width="260px">
          </el-table-column>
          <el-table-column
            label="联系方式"
            prop="telephone">
          </el-table-column>
          <el-table-column
            label="创建时间">
            <template slot-scope="scope">
              {{scope.row.createTime}}
            </template>
          </el-table-column>
          <el-table-column
            width="120px"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <div class="operation">
                <div v-if="scope.row.historicVariableInstance === null">
                  <span @click="exmineAgine(scope.row)">复核</span>
                </div>
                <div v-else>
                  <el-tooltip placement="top" effect="light">
                    <div slot="content" style="width: 130px;height: 55px;overflow: auto;">
                      <div v-if="scope.row.historicVariableInstance.value === '撤销操作'"><span>撤销</span></div>
                      <div v-else>驳回原因：{{scope.row.historicVariableInstance.value}}</div>
                    </div>
                    <span @click="exmineAgine(scope.row)">重新复核</span>
                  </el-tooltip>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          @size-change="handleTaskSizeChange"
          @current-change="handleTaskCurrentChange"
          :current-page="taskPageMsg.currentPage"
          :page-sizes="taskPageMsg.pageSizes"
          :page-size="taskPageMsg.pageSize"
          :total="taskPageMsg.total">
        </pagination>
      </el-tab-pane>

      <el-tab-pane name="second">
        <span slot="label">已复核</span>
        <el-table
          :data="taskFinshDatas"
          border>
          <el-table-column
            label="序号"
            type="index"
            width="60">
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name"
            width="150px">
          </el-table-column>
          <el-table-column
            label="身份证号"
            prop="idNo"
            width="180px">
          </el-table-column>
          <el-table-column
            label="部门"
            prop="deptName"
            width="130px">
          </el-table-column>
          <el-table-column
            label="岗位"
            prop="postName"
            width="240px">
          </el-table-column>
          <el-table-column
            label="联系方式"
            prop="telephone"
            width="130px">
          </el-table-column>
          <el-table-column
            label="审批时间"
            width="180px">
            <template slot-scope="scope">
              {{scope.row.historicTaskInstance.endTime}}
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="180px">
            <template slot-scope="scope">
              {{scope.row.createTime}}
            </template>
          </el-table-column>
          <el-table-column
            label="审批意见"
            prop="reason"
            width="120px">
            <template slot-scope="scope">
              <div v-if="scope.row.historicVariableInstance !== null && scope.row.reason !==''">
                <el-tooltip placement="top" effect="light">
                  <div slot="content" style="width: 130px;height: 55px;overflow: auto;">{{scope.row.historicVariableInstance.value}}</div>
                  <span>不同意</span>
                </el-tooltip>
              </div>
              <div v-else><span>同意</span></div>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="180px">
            <template slot-scope="scope">
              <div v-if="scope.row.task !== null">
                {{scope.row.task.name}}中
              </div>
              <div v-else>
                {{scope.row.historicTaskInstance.name}}{{scope.row.historicTaskInstance.deleteReason | filterStatus}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="办理人"
            width="100px">
            <template slot-scope="scope">
              {{scope.row.historicTaskInstance.assignee}}
            </template>
          </el-table-column>
          <el-table-column
            width="140px"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <div class="operation">
               <!-- <span v-if="scope.row.task != null && scope.row.task.taskDefinitionKey === 'entryHrAudit'" @click="revoke(scope.row)">撤销</span>-->
                <span @click="lookMsg(scope.row)">查看</span>
                <span v-if="scope.row.task!= null && scope.row.task.taskDefinitionKey == 'recruitLeaderAudit'" @click="exmineAgine(scope.row)">重新复核</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          @size-change="handleTaskFinshSizeChange"
          @current-change="handleTaskFinshCurrentChange"
          :current-page="taskFinshPageMsg.currentPage"
          :page-sizes="taskFinshPageMsg.pageSizes"
          :page-size="taskFinshPageMsg.pageSize"
          :total="taskFinshPageMsg.total">
        </pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Pagination from 'components/Pagination.vue'
import { getTaskList, getTaskFinshed, rollBackExmine } from 'static/api/recruit/entry/entry'
import { getToken } from 'assets/js/util'
import { timeZeroToString } from 'assets/js/common'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      activeName: '',
      tabTitle: '待复核',
      taskDatas: [],
      taskFinshDatas: [],
      taskPageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      taskFinshPageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      }
    }
  },
  components: {
    Pagination
  },
  computed: {
    ...mapGetters(['getVerifyEntrySearchArr', 'getVerifyEntryClick']),
    taskParams () {
      return {
        keyword: this.getVerifyEntrySearchArr.keyWord,
        /* idKeyWord: this.getVerifyEntrySearchArr.idKeyWord, */
        startTime: this.getVerifyEntrySearchArr.startTime ? timeZeroToString(this.getVerifyEntrySearchArr.startTime) : '',
        endTime: this.getVerifyEntrySearchArr.endTime ? timeZeroToString(this.getVerifyEntrySearchArr.endTime) : '',
        userId: getToken('loginId').toString(),
        actType: 'entry',
        page: this.taskPageMsg.currentPage,
        size: this.taskPageMsg.pageSize
      }
    },
    taskFinshedParams () {
      return {
        userId: getToken('loginId').toString(),
        actType: 'entry',
        keyword: this.getVerifyEntrySearchArr.keyWord,
        /* idKeyWord: this.getVerifyEntrySearchArr.idKeyWord, */
        startTime: this.getVerifyEntrySearchArr.startTime ? timeZeroToString(this.getVerifyEntrySearchArr.startTime) : '',
        endTime: this.getVerifyEntrySearchArr.endTime ? timeZeroToString(this.getVerifyEntrySearchArr.endTime) : '',
        page: this.taskFinshPageMsg.currentPage,
        size: this.taskFinshPageMsg.pageSize,
        taskDId: 'recruitLeaderAudit'
      }
    }
  },
  methods: {
    handleTaskSizeChange (pageSize) {
      this.taskPageMsg.pageSize = pageSize
      this._getTaskList()
    },
    handleTaskCurrentChange (currentPage) {
      this.taskPageMsg.currentPage = currentPage
      this._getTaskList()
    },
    handleTaskFinshSizeChange (pageSize) {
      this.taskFinshPageMsg.pageSize = pageSize
      this._getTaskFinshList()
    },
    handleTaskFinshCurrentChange (currentPage) {
      this.taskFinshPageMsg.currentPage = currentPage
      this._getTaskFinshList()
    },
    /** 待审批**/
    _getTaskList () {
      getTaskList(Object.assign(this.taskParams, { groupId: 'recruitLeader' })).then(data => {
        if (data.result) {
          this.taskDatas = data.result.records
          this.taskPageMsg.total = data.result.total
        }
      })
    },
    /** 已审批**/
    _getTaskFinshList () {
      getTaskFinshed(this.taskFinshedParams).then(data => {
        this.taskFinshDatas = data.result.records
        this.taskFinshPageMsg.total = data.result.total
      })
    },
    /** 审批中撤销**/
    revoke (row) {
      let revokeParams = {
        'taskId': row.task.id,
        'pId': row.task.processInstanceId,
        'tKey': row.task.taskDefinitionKey,
        'userId': 'rolluser',
        'owner': row.historicTaskInstance.owner || row.userId || '',
        'actType': 'entry'
      }
      this.$confirm('确定要撤销对' + row.name + '的入职审批吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        rollBackExmine(revokeParams).then(data => {
          this.$message.success('撤销成功')
          this._getTaskList()
          this._getTaskFinshList()
        })
      }).catch(() => {})
    },
    exmineAgine (row) {
      let employeeId = row.employeeId ? row.employeeId : 'null'
      let exmineId = row.id ? row.id : 'null'
      let exmineUserId = row.userId ? row.userId : 'null'
      let exminePassKey = row.task ? row.task.taskDefinitionKey ? row.task.taskDefinitionKey : 'null' : 'null'
      let exmineTaskId = row.task ? row.task.id ? row.task.id : 'null' : 'null'
      let exminePid = row.task ? row.task.processInstanceId ? row.task.processInstanceId : 'null' : 'null'
      this.$router.push({ name: 'VerifyEntryCheckApprove',
        params: {
          employeeId: employeeId,
          exmineId: exmineId,
          exmineUserId: exmineUserId,
          exminePassKey: exminePassKey,
          exmineTaskId: exmineTaskId,
          exminePid: exminePid,
          type: 'leader',
          backReason: 'null'
        } })
    },
    lookMsg (row) {
      let employeeId = row.employeeId ? row.employeeId : 'null'
      let exmineId = row.id ? row.id : 'null'
      let exmineUserId = row.userId ? row.userId : 'null'
      let exminePassKey = row.task ? row.task.taskDefinitionKey ? row.task.taskDefinitionKey : 'null' : 'null'
      let exmineTaskId = row.task ? row.task.id ? row.task.id : 'null' : 'null'
      let exminePid = row.task ? row.task.processInstanceId ? row.task.processInstanceId : 'null' : 'null'
      this.$router.push({ name: 'VerifyEntryCheckApprove',
        params: {
          employeeId: employeeId,
          exmineId: exmineId,
          exmineUserId: exmineUserId,
          exminePassKey: exminePassKey,
          exmineTaskId: exmineTaskId,
          exminePid: exminePid,
          type: 'leaderSee',
          backReason: 'null'
        },
        query: {
          come: row.realityEndTime && !row.reason ? 'hasRealityEndTime' : ''
        } })
    },
    tabClick (tab, event) {
      if (tab.index === '0') {
        this.tabTitle = '待复核'
        this.$router.push({ name: this.$route.name, query: { active: 'first' } })
        this.handleTaskCurrentChange(1)
      } else if (tab.index === '1') {
        this.tabTitle = '已复核'
        this.$router.push({ name: this.$route.name, query: { active: 'second' } })
        this.handleTaskFinshCurrentChange(1)
      }
    },
    goWhereRouter () {
      this.activeName = this.$route.query.active
      if (this.activeName === 'first') {
        this.tabTitle = '待复核'
        this.handleTaskCurrentChange(1)
      } else {
        this.tabTitle = '已复核'
        this.handleTaskFinshCurrentChange(1)
      }
    }
  },
  filters: {
    filterStatus (value) {
      if (!value) {
        value = '中'
      } else {
        value = '结束'
      }
      return value
    }
  },
  watch: {
    getVerifyEntryClick (value) {
      if (value) {
        if (this.tabTitle === '待复核') {
          this.handleTaskCurrentChange(1)
        } else if (this.tabTitle === '已复核') {
          this.handleTaskFinshCurrentChange(1)
        }
        this.$store.commit('SET_VERIFY_ENTRY_CLICKED', false)
      }
    }
  },
  created () {
    this.goWhereRouter()
  }
}
</script>
<style lang="less" scoped></style>
