<template>
<div class="mt-20">
  <el-tabs type="border-card" @tab-click="tabClick">
      <el-tab-pane>
        <span slot="label">待审核</span>
        <div class="btn-box">
            <el-button type="primary" size="mini" @click="goReview" :disabled="taskDatas.length==0">同意</el-button>
            <el-button type="primary" size="mini" @click="unGoReview" :disabled="taskDatas.length==0">不同意</el-button>
        </div>
        <el-table
          :data="taskDatas"
          tooltip-effect="dark"
          style="max-width: 100%;min-width:700px;overflow-y: auto"
          class="mt-20"
          @select="selectSecs"
          @select-all="selectAllSecs"
          border>
           <el-table-column
            type="selection"
            width="55">
            </el-table-column>
          <el-table-column
            label="序号"
            type="index"
            width="70">
          </el-table-column>

          <el-table-column
            label="姓名"
            mon-width="150px"
            prop="name">
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
            width="180px">
          </el-table-column>

          <el-table-column
            label="岗位"
            prop="postName"
            width="180px">
          </el-table-column>

          <el-table-column
            label="联系方式"
            prop="telephone"
            width="180px">
          </el-table-column>

          <el-table-column
            label="创建时间"
            width="220px">
            <template slot-scope="scope">
              {{scope.row.createTime}}
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            fixed="right"
            width="150px">
            <template slot-scope="scope">
              <div class="operation">
                <div>
                  <span @click="lookMsg(scope.row, 'entryCompany')">审核</span>
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
       <el-tab-pane>
      <span slot="label">已审核</span>
        <el-table
          :data="taskFinshDatas"
          tooltip-effect="dark"
          style="max-width: 100%;min-width:700px;overflow-y: auto"
          border>
          <el-table-column
            label="序号"
            type="index"
            width="60">
          </el-table-column>

          <el-table-column
            label="姓名"
            prop="name"
            width="130px">
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
            width="200">
          </el-table-column>

          <el-table-column
            label="部门"
            prop="deptName"
            width="120px">
          </el-table-column>

          <el-table-column
            label="岗位"
            prop="postName"
            width="111px">
          </el-table-column>

          <el-table-column
            label="联系方式"
            prop="telephone"
            width="120px">
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
            label="审批意见"
            prop="reason"
            width="120px">
            <template slot-scope="scope">
              <div v-if="scope.row.historicVariableInstance !== null">
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
            width="166px">
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
            width="110px">
            <template slot-scope="scope">
              {{scope.row.historicTaskInstance.assignee}}
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            min-width="130px">
            <template slot-scope="scope">
              <div class="operation">
                <span @click="lookMsg(scope.row, 'look')">查看</span>
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
    <el-dialog
      title="不同意入职原因"
    :visible.sync="resonVisible"
      width="500px">
      <div class="module-opera">
        <el-form :model="resonForm" label-width="80px" >
          <el-form-item
          label="原因：" class="mustForm">
            <el-select
            style="width:100%"
             v-model="resonForm.remark" placeholder="请选择">
              <el-option
                style="100%"
                v-for="item in UnresonOption"
                :key="item.id"
                :label="item.codeText"
                :value="item.codeText">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label="说明："  label-width="80px">
            <el-input type="textarea" v-model="resonForm.backreson"></el-input>
          </el-form-item>
        </el-form>
      </div>
  <span slot="footer" class="dialog-footer">
      <el-button @click="resonVisible=false" class="false" size="mini">取 消</el-button>
      <el-button type="primary" @click="resonComfire" size="mini">确 定</el-button>
	</span>
    </el-dialog>
</div>
</template>
<script>
import Pagination from 'components/Pagination.vue'
import { getTaskList, getTaskFinshed, setUserBatch } from 'static/api/recruit/entry/entry'
import { getToken } from 'assets/js/util'
import { timeZeroToString } from 'assets/js/common'
import { mapGetters } from 'vuex'
import { getTaskCompleteBatch } from 'static/api/exmine/exmine'
import { getSysDic } from 'static/api/common/common'
export default {
  data () {
    return {
      resonVisible: false,
      sectionDatas: [],
      unComplateForm: [],
      resonForm: {
        remark: '',
        backreson: ''
      },
      UnresonOption: [],
      tabTitle: '待审核',
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
  computed: {
    ...mapGetters(['getMarketVerifyEntrySearchArr', 'getMarketVerifyEntryClick']),
    taskFinshedParams () {
      return {
        userId: getToken('loginId').toString(),
        actType: 'entryMarket',
        keyword: this.getMarketVerifyEntrySearchArr.keyWord,
        /* idKeyWord: this.getMarketVerifyEntrySearchArr.idKeyWord, */
        startTime: this.getMarketVerifyEntrySearchArr.startTime ? timeZeroToString(this.getMarketVerifyEntrySearchArr.startTime) : '',
        endTime: this.getMarketVerifyEntrySearchArr.endTime ? timeZeroToString(this.getMarketVerifyEntrySearchArr.endTime) : '',
        page: this.taskFinshPageMsg.currentPage,
        size: this.taskFinshPageMsg.pageSize,
        taskDId: 'entryMarketAudit'
      }
    },
    taskParams () {
      return {
        keyword: this.getMarketVerifyEntrySearchArr.keyWord,
        /* idKeyWord: this.getMarketVerifyEntrySearchArr.idKeyWord, */
        startTime: this.getMarketVerifyEntrySearchArr.startTime ? timeZeroToString(this.getMarketVerifyEntrySearchArr.startTime) : '',
        endTime: this.getMarketVerifyEntrySearchArr.endTime ? timeZeroToString(this.getMarketVerifyEntrySearchArr.endTime) : '',
        userId: getToken('loginId').toString(),
        actType: 'entryMarket',
        page: this.taskPageMsg.currentPage,
        size: this.taskPageMsg.pageSize
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
    lookMsg (row, type) {
      let queryParams = ''
      if (type === 'entryCompany') {
        this.$store.commit('SET_SALARY_ID', row.employeeId)
        queryParams = {
          come: '/market-verify/entry/entry'
        }
      }
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
          come: '/market-verify/entry/entry'
        },
        query: queryParams
      })
    },
    // 待审批
    _getTaskList () {
      getTaskList(Object.assign(this.taskParams, { groupId: 'entryMarket' })).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.taskDatas = data.result.records
          }
          this.taskPageMsg.total = data.result.total
        }
      })
    },
    // 已审批
    _getTaskFinshList () {
      getTaskFinshed(this.taskFinshedParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.taskFinshDatas = data.result.records
          }
          this.taskFinshPageMsg.total = data.result.total
        }
      })
    },
    // entryCompany (row) {
    //   this.$store.commit('SET_SALARY_ID', row.employeeId)
    //   this.$router.push({name: 'MarketEntryExmine',
    //     query: {
    //       employeeId: row.employeeId,
    //       exmineId: row.id,
    //       exmineUserId: row.userId,
    //       exminePassKey: row.task.taskDefinitionKey,
    //       exmineTaskId: row.task.id,
    //       exminePid: row.task.processInstanceId,
    //       actId: row.id,
    //       idCardNumber: row.idNo,
    //       come: 'MarketVerifyEntryEntry'
    //     }})
    // },
    tabClick (tab, event) {
      if (tab.index === '0') {
        this.tabTitle = '待审核'
        this._getTaskList()
      } else if (tab.index === '1') {
        this.tabTitle = '已审核'
        this._getTaskFinshList()
      } else if (tab.index === '2') {
        this.tabTitle = '驳回列表'
      }
    },
    // 表格勾选
    selectSecs (selection) {
      this.sectionDatas = selection
    },
    selectAllSecs (selection) {
      this.sectionDatas = selection
    },
    // 批量审核同意
    goReview () {
      if (!this.sectionDatas.length) {
        this.$message.warning('请选择员工！')
        return false
      }
      let taskParams = []
      this.sectionDatas.forEach(row => {
        let newPassKey = row.task.taskDefinitionKey
        newPassKey = newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass'
        taskParams.push({
          actType: 'entryMarket',
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
        })
      })
      getTaskCompleteBatch(taskParams).then(data => {
        this.$message.success('审核通过请等待其他审核人的结果')
        setTimeout(() => {
          this._getTaskList()
        }, 200)
      })
    },
    // 批量审核不同意
    unGoReview () {
      if (!this.sectionDatas.length) {
        this.$message.warning('请选择员工！')
        return false
      }
      this.resonVisible = true
      let taskParams = []
      this.sectionDatas.forEach(row => {
        let newPassKey = row.task.taskDefinitionKey
        newPassKey = (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass') + ',' + (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'BackReason')
        let valuePost = false + ',' + this.resonForm.remark + ' ' + this.resonForm.backreson
        taskParams.push({
          actType: 'entryMarket',
          userId: getToken('loginId').toString(),
          pId: row.task.processInstanceId,
          id: row.id,
          taskId: row.task.id,
          userIds: row.employeeId,
          auditStatus: 0,
          owner: row.userId,
          var: {
            keys: newPassKey,
            values: valuePost,
            types: 'B,S'
          }
        })
      })
      this.unComplateForm = taskParams
    },
    resonComfire () {
      if (!this.resonForm.remark) {
        this.$message.warning('请选择原因!')
        return
      }
      this.unComplateForm.forEach(item => {
        item.var.values = false + ',' + this.resonForm.remark + ' ' + this.resonForm.backreson
      })
      setUserBatch(this.unComplateForm).then(data => {
        let results = data.result
        let tips = ''
        if (results.failNames.length) {
          tips += ','
          tips += results.failNames.join(',')
          tips += ''
        }
        this.$message.success(data.subMsg + tips)
        this.resonVisible = false
        setTimeout(() => {
          this._getTaskList()
        }, 200)
      })
    },
    /* 获取数字字典 */
    async _getQueryClassList () {
      /* 不同意类型 */
      await getSysDic('auditRefusedType').then((data) => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.UnresonOption.push(item)
            }
          })
        }
      })
    }
  },
  watch: {
    getMarketVerifyEntryClick (value) {
      if (value) {
        if (this.tabTitle === '待审核') {
          this._getTaskList()
        } else if (this.tabTitle === '已审核') {
          this._getTaskFinshList()
        }
      }
      this.$store.commit('SET_MARKET_VERIFY_ENTRY_CLICKED', false)
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
  components: {
    Pagination
  },
  created () {
    this._getTaskList()
    this._getQueryClassList()
  }
}
</script>
