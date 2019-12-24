<template>
<div class="owner-box">
 <el-table
      :data="taskFinshDatas"
      tooltip-effect="dark"
      style="max-width: 100%;min-width:700px;overflow-y: auto"
      border>
      <el-table-column
        label="序号"
        type="index"
        width="60px">
      </el-table-column>

      <el-table-column
        label="姓名"
        prop="name"
        min-width="150px">
      </el-table-column>
      <el-table-column
      label="一级组织"
      min-width="150px"
      prop="levelOne"
      >
      </el-table-column>
      <el-table-column
        label="身份证号"
        prop="idNo"
        width="220px">
      </el-table-column>

      <el-table-column
        label="部门"
        prop="deptName"
        width="160px">
      </el-table-column>

      <el-table-column
        label="岗位"
        prop="postName"
        min-width="160px">
      </el-table-column>

      <el-table-column
        label="联系方式"
        prop="telephone"
        width="160px">
      </el-table-column>

      <el-table-column
        label="创建时间"
        width="180px">
        <template slot-scope="scope">
          {{scope.row.createTime}}
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        width="160px">
        <template slot-scope="scope">
          <div v-if="scope.row.realityEndTime === null && scope.row.task !== null" >
            {{scope.row.task.name}}中
          </div>
          <div v-else>
            <div v-if="scope.row.historicVariableInstance !== null">
              <div v-if="scope.row.historicVariableInstance.value === '撤销操作'">
                <span>已撤销</span>
              </div>
              <div v-else>
                <el-tooltip placement="top" effect="light">
                  <div slot="content" style="width: 130px;height: 55px;overflow: auto;">{{scope.row.historicVariableInstance.value}}</div>
                  <span>被驳回</span>
                </el-tooltip>
              </div>
            </div>
            <span v-else>已完成</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="办理人"
        width="100px">
        <template slot-scope="scope">
          <div v-if="scope.row.historicTaskInstance!==null">
            {{scope.row.historicTaskInstance.assignee | filterName}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="140px"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <div class="operation">
            <span @click="lookMsg(scope.row)">查看</span>
            <span @click="revoke(scope.row)"
                  v-if="scope.row.task !== null && scope.row.task.name === '入职审核'">撤销</span>
            <span v-if="scope.row.realityEndTime !== null && scope.row.historicVariableInstance" @click="reExmine(scope.row)">重新发起</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageMsg.currentPage"
      :page-sizes="pageMsg.pageSizes"
      :page-size="pageMsg.pageSize"
      :total="pageMsg.total">
    </pagination>
  </div>
</template>
<script>
import { getTaskFinshed, assessCallback } from 'static/api/recruit/entry/entry'
import { getTaskComplete } from 'static/api/exmine/exmine'
import { mapGetters } from 'vuex'
import { getToken } from 'assets/js/util'
import { timeZeroToString } from 'assets/js/common'
import Pagination from 'components/Pagination.vue'
export default {
  data () {
    return {
      taskFinshDatas: [],
      pageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      }
    }
  },
  computed: {
    ...mapGetters(['getMarketVerifyEntrySearchArr', 'getMarketVerifyEntryClick']),
    taskFinshedParams () {
      return {
        userId: getToken('loginId').toString(),
        actType: 'entryMarket',
        searchType: 'ower',
        keyword: this.getMarketVerifyEntrySearchArr.keyWord,
        /* idKeyWord: this.getMarketVerifyEntrySearchArr.idKeyWord, */
        startTime: this.getMarketVerifyEntrySearchArr.startTime ? timeZeroToString(this.getMarketVerifyEntrySearchArr.startTime) : '',
        endTime: this.getMarketVerifyEntrySearchArr.endTime ? timeZeroToString(this.getMarketVerifyEntrySearchArr.endTime) : '',
        page: this.pageMsg.currentPage,
        size: this.pageMsg.pageSize
      }
    }
  },
  methods: {
    // 撤销
    revoke (row) {
      let newPassKey = row.task.taskDefinitionKey
      newPassKey = (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass') + ',' + (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'BackReason')
      let valuePost = false + ',撤销操作'
      let revokeParams = {
        actType: 'entryMarket',
        userId: 'rolluser',
        pId: row.task.processInstanceId,
        id: row.id,
        taskId: row.task.id,
        owner: row.userId,
        var: {
          keys: newPassKey,
          values: valuePost,
          types: 'B,S'
        }
      }
      let Params = {
        auditStatus: 2,
        userId: row.employeeId
      }
      this.$confirm('确定要撤销' + row.name + '入职申请吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        assessCallback(Params).then(res => {
          getTaskComplete(revokeParams).then(data => {
            this.$message.success('撤销成功')
            this._getTaskList()
          })
        })
      }).catch(() => {})
    },
    // 获取列表
    _getTaskList () {
      this.taskFinshDatas = []
      getTaskFinshed(this.taskFinshedParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.taskFinshDatas = data.result.records
          }
          this.pageMsg.total = data.result.total
        }
      })
    },
    handleSizeChange (pageSize) {
      this.pageMsg.pageSize = pageSize
      this._getTaskList()
    },
    // 重新审核
    reExmine (row) {
      this.$router.push('/market-verify/entry/review?employeeId=' + row.employeeId + '&actId=' + row.id + '&come=MarketReExmine')
      // let employeeId = row.employeeId ? row.employeeId : 'null'
      // let exmineId = row.id ? row.id : 'null'
      // let exmineUserId = row.userId ? row.userId : 'null'
      // let exminePassKey = row.task ? row.task.taskDefinitionKey ? row.task.taskDefinitionKey : 'null' : 'null'
      // let exmineTaskId = row.task ? row.task.id ? row.task.id : 'null' : 'null'
      // let exminePid = row.task ? row.task.processInstanceId ? row.task.processInstanceId : 'null' : 'null'
      // this.$router.push({name: 'VerifyEntryDetailLabor',
      //   params: {
      //     employeeId: employeeId,
      //     exmineId: exmineId,
      //     exmineUserId: exmineUserId,
      //     exminePassKey: exminePassKey,
      //     exmineTaskId: exmineTaskId,
      //     exminePid: exminePid,
      //     type: 'entry',
      //     actId: row.id,
      //     come: '/market-verify/entry'
      //   },
      //   query: {
      //     opeator: 'remine'
      //   }
      // })
    },
    // 查看详情
    // lookMsg (row) {
    //   this.$router.push({name: 'VerifyOwnerDetail', params: {acceptId: row.employeeId, come: '/market-verify/entry/owner'}})
    // },
    lookMsg (row) {
      let employeeId = row.employeeId ? row.employeeId : 'null'
      let exmineId = row.id ? row.id : 'null'
      let exmineUserId = row.userId ? row.userId : 'null'
      let exminePassKey = row.task ? row.task.taskDefinitionKey ? row.task.taskDefinitionKey : 'null' : 'null'
      let exmineTaskId = row.task ? row.task.id ? row.task.id : 'null' : 'null'
      let exminePid = row.task ? row.task.processInstanceId ? row.task.processInstanceId : 'null' : 'null'
      this.$router.push({ name: 'VerifyEntryLabor',
        params: {
          employeeId: employeeId,
          exmineId: exmineId,
          exmineUserId: exmineUserId,
          exminePassKey: exminePassKey,
          exmineTaskId: exmineTaskId,
          exminePid: exminePid,
          type: 'entry',
          backReson: 'null',
          come: '/market-verify/entry/owner'
        } })
    },
    handleCurrentChange (currentPage) {
      this.pageMsg.currentPage = currentPage
      this._getTaskList()
    }
  },
  components: {
    Pagination
  },
  filters: {
    filterName (value) {
      return value
    }
  },
  watch: {
    getMarketVerifyEntryClick (val) {
      if (val) this._getTaskList()
      this.$store.commit('SET_MARKET_VERIFY_ENTRY_CLICKED', false)
    }
  },
  created () {
    this._getTaskList()
  }
}
</script>
