<template>
  <div class="employment-box">
    <el-tabs
    type="border-card"
    v-model="activeName"
    @tab-click="tabClick">
      <el-tab-pane
      name="first"
      >
        <span slot="label">待审批</span>
        <el-table
          :data="taskDatas"
          border>
          <el-table-column
            label="序号"
            type="index"
            width="70px">
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name"
            width="120px">
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
            label="操作"
            fixed="right"
            width="120px">
            <template slot-scope="scope">
              <div class="operation">
                <div v-if="scope.row.historicVariableInstance === null">
                 <!-- <span @click="unExmine(scope.row)">不录用</span>-->
                  <span @click="exmineMsg(scope.row, 'add')">审批</span>
                </div>
                <div v-else>
                  <el-tooltip placement="top" effect="light">
                    <div slot="content" style="width: 130px;height: 55px;overflow: auto;">
                      <div v-if="scope.row.historicVariableInstance.value === '撤销操作'"><span>撤销</span></div>
                      <div v-else>驳回原因：{{scope.row.historicVariableInstance.value}}</div>
                    </div>
                    <span @click="exmineMsg(scope.row, 'edit')">重新审批</span>
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
      <el-tab-pane
        name="second">
        <span slot="label">已审批</span>
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
            width="260px">
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
            width="110px">
            <template slot-scope="scope">
              <div v-if="scope.row.historicVariableInstance !== null && scope.row.reason !==''" >
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
            width="170px">
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
            width="120px">
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
                <span @click="lookMsg(scope.row)">查看</span>
                <span @click="sendOffer(scope.row)" v-if="scope.row.task !== null && (scope.row.task.name === '入职专员审核' || scope.row.task.name === '复核人员审批')">发offer</span>
                <span v-if="scope.row.task!= null && scope.row.task.taskDefinitionKey == 'headRecruitHrAudit'" @click="exmineMsg(scope.row, 'edit')">重新审批</span>
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
      title="不录用原因"
      :visible.sync="resonVisible"
      width="400px">
        <el-form :model="resonForm" label-width="80px">
          <el-form-item  label="原因：" class="mustForm">
            <el-select v-model="resonForm.remark" placeholder="请选择">
              <el-option
                v-for="item in reasonOption"
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
      <span slot="footer" class="dialog-footer">
				<el-button @click="resonVisible = false" class="false" size="mini">取 消</el-button>
				<el-button type="primary" @click="resonComfire" size="mini">确 定</el-button>
			</span>
    </el-dialog>
  </div>
</template>
<script>
import { getTaskList, getTaskFinshed, assessCallback } from 'static/api/recruit/entry/entry'
import Pagination from 'components/Pagination.vue'
import { getToken } from 'assets/js/util'
import { timeZeroToString } from 'assets/js/common'
import { getTaskComplete } from 'static/api/exmine/exmine'
import { mapGetters } from 'vuex'
import { getSysDic } from 'static/api/common/common'
export default {
  data () {
    return {
      activeName: '',
      resonVisible: false,
      unComplateForm: {},
      resonForm: {
        remark: '',
        backreson: '',
        userId: ''
      },
      tabTitle: '待审批',
      taskFinshDatas: [],
      taskDatas: [],
      taskPageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      reasonOption: [],
      taskFinshPageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      }
    }
  },
  computed: {
    ...mapGetters(['getVerifyEntrySearchArr', 'getVerifyEntryClick']),
    /** 待审核**/
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
    /** 已审核**/
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
        taskDId: 'headRecruitHrAudit'
      }
    }
  },
  components: {
    Pagination
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
    /** 待审核**/
    _getTaskList () {
      getTaskList(Object.assign(this.taskParams, { groupId: 'headRecruitHr' })).then(data => {
        if (data.result) {
          this.taskDatas = data.result.records
          this.taskPageMsg.total = data.result.total
        }
      })
    },
    // 已审核
    _getTaskFinshList () {
      getTaskFinshed(this.taskFinshedParams).then(data => {
        if (data.result) {
          this.taskFinshDatas = data.result.records
          this.taskFinshPageMsg.total = data.result.total
        }
      })
    },
    exmineMsg (row, type) {
      let employeeId = row.employeeId ? row.employeeId : 'null'
      let exmineId = row.id ? row.id : 'null'
      let exmineUserId = row.userId ? row.userId : 'null'
      let exminePassKey = row.task ? row.task.taskDefinitionKey ? row.task.taskDefinitionKey : 'null' : 'null'
      let exmineTaskId = row.task ? row.task.id ? row.task.id : 'null' : 'null'
      let exminePid = row.task ? row.task.processInstanceId ? row.task.processInstanceId : 'null' : 'null'
      this.$router.push({ name: 'VerifyEntryOption',
        params: {
          employeeId: employeeId,
          exmineId: exmineId,
          exmineUserId: exmineUserId,
          exminePassKey: exminePassKey,
          exmineTaskId: exmineTaskId,
          exminePid: exminePid,
          type: 'head',
          backReason: row.historicVariableInstance ? row.historicVariableInstance.value ? row.historicVariableInstance.value : 'null' : 'null'
        },
        query: {
          type: type,
          employeeId: row.employeeId,
          come: 'VerifyEntryEmployment'
        } })
    },
    // 不录用
    unExmine (row) {
      this.resonForm.userId = row.employeeId
      this.resonVisible = true
      let newPassKey = row.task.taskDefinitionKey
      newPassKey = (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass') + ',' + (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'BackReason')
      let unComplateParams = {
        actType: 'entry',
        userId: getToken('loginId').toString(),
        pId: row.task.processInstanceId,
        id: row.id + '',
        taskId: row.task.id,
        owner: row.userId,
        var: {
          keys: newPassKey,
          values: '',
          types: 'B,S'
        }
      }
      this.unComplateForm = unComplateParams
    },
    resonComfire () {
      if (this.resonForm.remark === '') {
        this.$message.warning({
          message: '请选择原因!'
        })
        return
      }
      if (this.resonForm.backreson === '') {
        this.unComplateForm.var.values = false + ',' + this.resonForm.remark
      } else {
        this.unComplateForm.var.values = false + ',' + this.resonForm.remark + ' ' + this.resonForm.backreson
      }
      let UnassParams = {
        auditStatus: 0,
        remark: this.resonForm.remark,
        userId: this.resonForm.userId,
        reson: this.resonForm.backreson
      }
      assessCallback(UnassParams).then(data => {
        getTaskComplete(this.unComplateForm).then(res => {
          this.$message.success('操作成功')
          this.resonVisible = false
          setTimeout(() => {
            this._getTaskList()
            this._getTaskFinshList()
          }, 400)
        })
      })
    },
    sendOffer (row) {
      this.$router.push({
        path: '/verify/examine/offer',
        query: {
          orgId: row.deptNo,
          email: row.email,
          employeeId: row.employeeId,
          actId: row.id,
          processInstanceId: row.processInstanceId
        }
      })
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
          type: 'head',
          backReason: row.reason ? row.reason : 'null'
        },
        query: {
          come: row.realityEndTime && !row.reason ? 'hasRealityEndTime' : ''
        } })
    },
    tabClick (tab, event) {
      if (tab.index === '0') {
        this.tabTitle = '待审批'
        this.$router.push({ name: this.$route.name, query: { active: 'first' } })
        this.handleTaskCurrentChange(1)
      } else if (tab.index === '1') {
        this.tabTitle = '已审批'
        this.$router.push({ name: this.$route.name, query: { active: 'second' } })
        this.handleTaskFinshCurrentChange(1)
      }
    },
    goWhereRouter () {
      this.activeName = this.$route.query.active
      if (this.activeName === 'first') {
        this.tabTitle = '待审批'
        this.handleTaskCurrentChange(1)
      } else {
        this.tabTitle = '已审批'
        this.handleTaskFinshCurrentChange(1)
      }
    },
    /* 获取数字字典 */
    async _getQueryClassList () {
      /* 不同意类型 */
      await getSysDic('auditRefusedType').then(data => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.reasonOption.push(item)
            }
          })
        }
      })
    }
  },
  watch: {
    getVerifyEntryClick (value) {
      if (value) {
        if (this.tabTitle === '待审批') {
          this.handleTaskCurrentChange(1)
        } else if (this.tabTitle === '已审批') {
          this.handleTaskFinshCurrentChange(1)
        }
        this.$store.commit('SET_VERIFY_ENTRY_CLICKED', false)
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
  created () {
    this.goWhereRouter()
    this._getQueryClassList()
  }
}
</script>
