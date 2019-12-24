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
          border >
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
            label="合同主体"
            prop="contractSubject"
            width="240px">
          </el-table-column>
          <el-table-column
            label="合同期数(期)"
            prop="contractNumber"
            width="140px">
          </el-table-column>
          <el-table-column
            label="合同开始时间"
            prop="contractBeginDate"
            width="170px">
          </el-table-column>
          <el-table-column
            label="合同结束时间"
            prop="contractEndDate"
            width="170px">
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
            width="200px">
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
            min-width="120px">
            <template slot-scope="scope">
              <div class="operation">
                <span v-if="!scope.row.realityEndTime" @click="revoke(scope.row)">撤销</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          @size-change="handleZownerSizeChange"
          @current-change="handleZownerCurrentChange"
          :current-page="zownerPageMsg.currentPage"
          :page-sizes="zownerPageMsg.pageSizes"
          :page-size="zownerPageMsg.pageSize"
          :total="zownerPageMsg.total">
        </pagination>
      </el-tab-pane>

      <el-tab-pane v-if="getCurrentRoleGroups.indexOf('contractMarketVoid')!==-1">
        <span slot="label">待审核</span>
        <el-table
          :data="verifywaitDatas"
          border
          tooltip-effect="dark">
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
            label="合同主体"
            prop="contractSubject"
            width="240px">
          </el-table-column>
          <el-table-column
            label="合同期数(期)"
            prop="contractNumber"
            width="140px">
          </el-table-column>
          <el-table-column
            label="合同开始时间"
            prop="contractBeginDate"
            width="170px">
          </el-table-column>
          <el-table-column
            label="合同结束时间"
            prop="contractEndDate"
            width="170px">
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="170px">
            <template slot-scope="scope">
              {{scope.row.createTime}}
            </template>
          </el-table-column>
          <el-table-column
            label="作废原因"
            prop="contractCancelReason"
            width="150px">
          </el-table-column>
          <el-table-column
            width="120px;"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <div class="operation">
                <span @click="agreeMsg(scope.row)">同意</span>
                <span @click="UnagreeMsg(scope.row)">不同意</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          @size-change="handleZwaitSizeChange"
          @current-change="handleZwaitCurrentChange"
          :current-page="zwaitPageMsg.currentPage"
          :page-sizes="zwaitPageMsg.pageSizes"
          :page-size="zwaitPageMsg.pageSize"
          :total="zwaitPageMsg.total">
        </pagination>
      </el-tab-pane>

      <el-tab-pane v-if="getCurrentRoleGroups.indexOf('contractMarketVoid')!==-1">
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
            prop="name"
            width="160px">
          </el-table-column>
          <el-table-column
            label="身份证号"
            prop="idNo"
            width="200px">
          </el-table-column>
          <el-table-column
            label="合同主体"
            prop="contractSubject"
            width="240px">
          </el-table-column>
          <el-table-column
            label="合同期数(期)"
            prop="contractNumber"
            width="140px">
          </el-table-column>
          <el-table-column
            label="合同开始时间"
            prop="contractBeginDate"
            width="170px">
          </el-table-column>
          <el-table-column
            label="合同结束时间"
            prop="contractEndDate"
            width="170px">
          </el-table-column>
          <el-table-column
            label="审批时间"
            width="175px">
            <template slot-scope="scope">
              {{scope.row.historicTaskInstance.endTime}}
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
            label="作废原因"
            prop="contractCancelReason"
            width="150px">
          </el-table-column>
          <el-table-column
            width="100px;"
            label="状态">
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
          @size-change="handleZfinishSizeChange"
          @current-change="handleZfinishCurrentChange"
          :current-page="zfinishPageMsg.currentPage"
          :page-sizes="zfinishPageMsg.pageSizes"
          :page-size="zfinishPageMsg.pageSize"
          :total="zfinishPageMsg.total">
        </pagination>
      </el-tab-pane>
    </el-tabs>

    <!--不同意原因 -->
    <el-dialog title="不同意原因" :visible.sync="UnagreeVisible" width="500px">
      <el-form :model="UnagreeForm" label-width="85px">
          <el-form-item label="原 因：" class="mustForm">
            <el-select v-model="UnagreeForm.reason" placeholder="请选择原因">
              <el-option
                v-for="item in UnresonOption"
                :key="item.id"
                :label="item.codeText"
                :value="item.codeText">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="说 明：">
            <el-input type="textarea" v-model="UnagreeForm.remark" placeholder="请填写说明"></el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="UnagreeVisible = false" class="false" size="mini">取 消</el-button>
          <el-button type="primary" @click="UnagreeSave" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getDeptNo, getSysDic } from 'static/api/common/common'
import { MessageBox } from 'element-ui'
import { mapGetters } from 'vuex'
import { getTaskFinshed, getTaskList, rollBackExmine } from 'static/api/recruit/entry/entry'
import { getToken } from 'assets/js/util'
import { collbackContract, editContract } from 'static/api/contract/contract'
import { timeZeroToString } from 'assets/js/common'
import Pagination from 'components/Pagination.vue'
export default {
  data () {
    return {
      UnresonOption: [],
      verifyOwnerDatas: [],
      zownerPageMsg: {},
      verifywaitDatas: [],
      zwaitPageMsg: {},
      verifyFinishDatas: [],
      zfinishPageMsg: {},
      UnagreeVisible: false,
      UnagreeForm: {
        id: '',
        reason: '',
        remark: ''
      },
      tabTitle: '我发起的',
      getIds: ''
    }
  },
  computed: {
    ...mapGetters(['getMarketContractSearchArr', 'getMarketVerifyContractClick', 'getCurrentRoleGroups']),
    contractOwnerParams () {
      return {
        actType: 'contractMarketVoid',
        userId: getToken('loginId').toString(),
        keyword: this.getMarketContractSearchArr.keyword,
        startTime: this.getMarketContractSearchArr.startTime ? timeZeroToString(this.getMarketContractSearchArr.startTime) : '',
        endTime: this.getMarketContractSearchArr.endTime ? timeZeroToString(this.getMarketContractSearchArr.endTime) : '',
        page: this.zownerPageMsg.currentPage,
        size: this.zownerPageMsg.pageSize,
        searchType: 'ower'
      }
    },
    contractWaitParams () {
      return {
        actType: 'contractMarketVoid',
        userId: getToken('loginId').toString(),
        keyword: this.getMarketContractSearchArr.keyword,
        startTime: this.getMarketContractSearchArr.startTime ? timeZeroToString(this.getMarketContractSearchArr.startTime) : '',
        endTime: this.getMarketContractSearchArr.endTime ? timeZeroToString(this.getMarketContractSearchArr.endTime) : '',
        page: this.zwaitPageMsg.currentPage,
        size: this.zwaitPageMsg.pageSize
      }
    },
    contractFinishParams () {
      return {
        actType: 'contractMarketVoid',
        userId: getToken('loginId').toString(),
        keyWord: this.getMarketContractSearchArr.keyword,
        startTime: this.getMarketContractSearchArr.startTime ? timeZeroToString(this.getMarketContractSearchArr.startTime) : '',
        endTime: this.getMarketContractSearchArr.endTime ? timeZeroToString(this.getMarketContractSearchArr.endTime) : '',
        page: this.zfinishPageMsg.currentPage,
        size: this.zfinishPageMsg.pageSize
      }
    }
  },
  components: {
    Pagination
  },
  methods: {
    /** 撤销**/
    revoke (row) {
      let revokeParams = {
        'taskId': row.task.id,
        'pId': row.historicTaskInstance.executionId,
        'tKey': row.historicTaskInstance.taskDefinitionKey,
        'userId': 'rolluser',
        'owner': row.historicTaskInstance.owner || row.userId || '',
        'actType': 'contractMarketUpdate'
      }
      let contractParams = {
        id: row.uniqueId,
        delete_tag: 1
      }
      MessageBox.confirm('确定要撤销对' + row.name + '的审批吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        rollBackExmine(revokeParams).then((data) => {
          editContract(contractParams).then(() => {
            this.$message.success('撤销成功')
            this._getOwnerTaskList()
          })
        })
      }).catch(() => {})
    },
    /** 作废不同意原因**/
    UnagreeMsg (row) {
      this.UnagreeVisible = true
      let newPassKey = row.task.taskDefinitionKey
      newPassKey = (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass') + ',' + (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'BackReason')
      let unParams = {
        actType: 'contractMarketVoid',
        userId: getToken('loginId').toString(),
        pId: row.task.processInstanceId,
        id: row.id + '',
        taskId: row.task.id,
        deptNo: getToken('loginDeptId'),
        owner: row.task.owner,
        var: {
          keys: newPassKey,
          values: '',
          types: 'B,S'
        }
      }
      this.unComplateForm = unParams
    },
    UnagreeSave () {
      if (this.UnagreeForm.remark) {
        let valuePost = false + ',' + this.UnagreeForm.reason + ':' + this.UnagreeForm.remark
        this.unComplateForm.var.values = valuePost
      } else {
        let valuePost = false + ',' + this.UnagreeForm.reason
        this.unComplateForm.var.values = valuePost
      }

      if (!this.UnagreeForm.reason) {
        this.$message.warning({
          message: '请选择不同意原因!'
        })
        return
      }
      collbackContract(this.unComplateForm).then((data) => {
        this.$message.success('操作成功')
        this.UnagreeVisible = false
        setTimeout(() => {
          this._getwaitTaskList()
        }, 400)
      })
    },
    /** 作废同意**/
    agreeMsg (row) {
      let newPassKey = row.task.taskDefinitionKey
      newPassKey = newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass'
      this.$confirm('是否同意' + row.name + '作废合同', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let Params = {
          actType: 'contractMarketVoid',
          userId: getToken('loginId'),
          pId: row.task.processInstanceId,
          id: row.id + '',
          taskId: row.task.id,
          owner: row.task.owner,
          var: {
            keys: newPassKey,
            values: 'true',
            types: 'B'
          }
        }
        collbackContract(Params).then(data => {
          this.$message.success('操作成功')
          setTimeout(() => {
            this._getwaitTaskList()
          }, 400)
        })
      }).catch(() => {})
    },
    handleZownerSizeChange (pageSize) {
      this.zownerPageMsg.pageSize = pageSize
      this._getOwnerTaskList()
    },
    handleZownerCurrentChange (currentPage) {
      this.zownerPageMsg.currentPage = currentPage
      this._getOwnerTaskList()
    },
    handleZwaitSizeChange (pageSize) {
      this.zwaitPageMsg.pageSize = pageSize
      this._getwaitTaskList()
    },
    handleZwaitCurrentChange (currentPage) {
      this.zwaitPageMsg.currentPage = currentPage
      this._getwaitTaskList()
    },
    handleZfinishSizeChange (pageSize) {
      this.zfinishPageMsg.pageSize = pageSize
      this._getfinishTaskList()
    },
    handleZfinishCurrentChange (currentPage) {
      this.zfinishPageMsg.currentPage = currentPage
      this._getfinishTaskList()
    },
    /** 我发起的**/
    _getOwnerTaskList () {
      getTaskFinshed(this.contractOwnerParams).then((data) => {
        if (data.result) {
          if (data.result.records) {
            this.verifyOwnerDatas = data.result.records
          }
          this.zownerPageMsg.total = data.result.total
        }
      })
    },
    /** 待审核**/
    _getwaitTaskList () {
      getTaskList(Object.assign(this.contractWaitParams, { groupId: 'contractMarketVoid' })).then((data) => {
        if (data.result) {
          if (data.result.records) {
            this.verifywaitDatas = data.result.records
          }
          this.zwaitPageMsg.total = data.result.total
        }
      })
    },
    /** 已审核**/
    _getfinishTaskList () {
      getTaskFinshed(this.contractFinishParams).then((data) => {
        if (data.result) {
          if (data.result.records) {
            this.verifyFinishDatas = data.result.records
          }
          this.zfinishPageMsg.total = data.result.total
        }
      })
    },
    tabClick (tab, event) {
      if (tab.index === '0') {
        this.tabTitle = '我发起的'
        this.handleZownerCurrentChange(1)
      } else if (tab.index === '1') {
        this.tabTitle = '待审核'
        this.handleZwaitCurrentChange(1)
      } else if (tab.index === '2') {
        this.tabTitle = '已审核'
        this.handleZfinishCurrentChange(1)
      }
    },
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
              this.UnresonOption.push(item)
            }
          })
        }
      })
    }
  },
  watch: {
    getMarketVerifyContractClick (val) {
      if (val) {
        if (this.tabTitle === '我发起的') {
          this._getOwnerTaskList()
        } else if (this.tabTitle === '待审核') {
          this._getwaitTaskList()
        } else if (this.tabTitle === '已审核') {
          this._getfinishTaskList()
        }
      }
      this.$store.commit('SET_MARKETVERIFYCONTRACT_CLICKED', false)
    }
  },
  created () {
    this._getOwnerTaskList()
    this._getDeptNo()
    this._getQueryClassList()
  }
}
</script>

<style scoped lang="less">
  .el-select{width: 100%}
</style>
