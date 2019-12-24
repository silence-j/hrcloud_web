<template>
<div class="mt-20">
  <el-tabs type="border-card" v-model="activeName" @tab-click="tabClick">
    <el-tab-pane name="first">
      <span slot="label">待审核</span>
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
          width="150px"
          prop="name">
           <template slot-scope="scope">
                <span v-if="scope.row.deleteTag==2" ><i class="icon-font" style="color: red;font-size: 20px;position: absolute;left: 25px;">&#xe628;</i>{{scope.row.name}}</span>
                <span v-else>{{scope.row.name}}</span>
              </template>
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
          prop="postName">
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
          width="150px">
          <template slot-scope="scope">
            <div class="operation">
              <div v-if="scope.row.historicVariableInstance === null">
                <span @click="entryCompany(scope.row)">入职</span>
                <span @click="unEntryCompany(scope.row)">未入职</span>
              </div>
              <div v-else>
                <el-tooltip placement="top" effect="light">
                  <div slot="content" style="width: 130px;height: 55px;overflow: auto;">
                    <div v-if="scope.row.historicVariableInstance.value === '撤销操作'"><span>撤销</span></div>
                    <div v-else>驳回原因：{{scope.row.historicVariableInstance.value}}</div>
                  </div>
                  <span @click="entryCompany(scope.row)">重新入职</span>
                </el-tooltip>
                <span @click="unEntryCompany(scope.row)">未入职</span>
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
      <span slot="label">已审核</span>
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
            width="180px">
          </el-table-column>
          <el-table-column
            label="岗位"
            prop="postName"
            width="260px">
          </el-table-column>
          <el-table-column
            label="联系方式"
            prop="telephone"
            width="150px">
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
            width="150px">
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
            fixed="right"
            label="操作"
            width="140px">
            <template slot-scope="scope">
              <div class="operation">
               <!--<span v-if="scope.row.task != null && scope.row.task.taskDefinitionKey === 'reviewHrAudit'" @click="revoke(scope.row)">撤销</span>-->
                <span @click="lookMsg(scope.row)">查看</span>
                <span v-if="scope.row.task!= null && scope.row.task.taskDefinitionKey == 'entryHrAudit'"  @click="entryCompany(scope.row)">重新入职</span>
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
    title="未入职原因"
    :visible.sync="resonVisible"
    width="400px">
        <el-form
        :model="resonForm"
        :rules="resonRules"
        ref="resonForm"
        label-width="80px">
          <el-form-item
           label="原因："
           prop="remark"
           >
            <el-select
             style="width:100%"
            v-model="resonForm.remark" placeholder="请选择">
              <el-option
                v-for="item in resonSelect"
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
			<el-button type="primary" @click="resonComfire('resonForm')" size="mini">确 定</el-button>
		</span>
    </el-dialog>
</div>
</template>
<script>
import Pagination from 'components/Pagination.vue'
import { getTaskList, getTaskFinshed, rollBackExmine, assessCallback } from 'static/api/recruit/entry/entry'
import { getToken } from 'assets/js/util'
import { timeZeroToString } from 'assets/js/common'
import { mapGetters } from 'vuex'
import { getTaskComplete } from 'static/api/exmine/exmine'
import { getSysDic } from 'static/api/common/common'
export default {
  data () {
    return {
      activeName: '',
      unComplateForm: {},
      resonForm: {
        remark: '',
        backreson: '',
        userId: ''
      },
      resonSelect: [],
      resonVisible: false,
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
      },
      resonRules: {
        remark: { required: true, message: '请选择未入职原因', trigger: 'change' }
      }
    }
  },
  computed: {
    ...mapGetters(['getVerifyEntrySearchArr', 'getVerifyEntryClick']),
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
        taskDId: 'entryHrAudit'
      }
    },
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
          // actId: row.id,
          type: 'entry',
          backReson: 'null',
          come: '/verify/entry/entry'
        },
        query: {
          come: row.realityEndTime && !row.reason ? 'hasRealityEndTime' : ''
        } })
    },
    /** 待审批**/
    _getTaskList () {
      getTaskList(Object.assign(this.taskParams, { groupId: 'entryHr' })).then(data => {
        if (data.result) {
          this.taskDatas = data.result.records
          this.taskPageMsg.total = data.result.total
        }
      })
    },
    /** 已审批**/
    _getTaskFinshList () {
      getTaskFinshed(this.taskFinshedParams).then(data => {
        if (data.result) {
          this.taskFinshDatas = data.result.records
          this.taskFinshPageMsg.total = data.result.total
        }
      })
    },
    entryCompany (row) {
      this.$store.commit('SET_SALARY_ID', row.employeeId)
      this.$router.push({ name: 'EntryExmine',
        query: {
          employeeId: row.employeeId,
          exmineId: row.id,
          exmineUserId: row.userId,
          exminePassKey: row.task.taskDefinitionKey,
          exmineTaskId: row.task.id,
          exminePid: row.task.processInstanceId,
          actId: row.id,
          idCardNumber: row.idNo,
          come: 'VerifyEntryEntry'
        } })
    },
    // 未入职
    unEntryCompany (row) {
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
    resonComfire (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
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
        }
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
    tabClick (tab, event) {
      if (tab.index === '0') {
        this.tabTitle = '待审核'
        this.$router.push({ name: this.$route.name, query: { active: 'first' } })
        this.handleTaskCurrentChange(1)
      } else if (tab.index === '1') {
        this.tabTitle = '已审核'
        this.$router.push({ name: this.$route.name, query: { active: 'second' } })
        this.handleTaskFinshCurrentChange(1)
      }
    },
    goWhereRouter () {
      this.activeName = this.$route.query.active
      if (this.activeName === 'first') {
        this.tabTitle = '待审核'
        this.handleTaskCurrentChange(1)
      } else {
        this.tabTitle = '已审核'
        this.handleTaskFinshCurrentChange(1)
      }
    },
    /* 获取数字字典 */
    async _getQueryClassList () {
      await getSysDic('auditRefusedType').then(data => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.resonSelect.push(item)
            }
          })
        }
      })
    }
  },
  watch: {
    getVerifyEntryClick (value) {
      if (value) {
        if (this.tabTitle === '待审核') {
          this.handleTaskCurrentChange(1)
        } else if (this.tabTitle === '已审核') {
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
  components: {
    Pagination
  },
  created () {
    this.goWhereRouter()
    this._getQueryClassList()
  }
}
</script>
