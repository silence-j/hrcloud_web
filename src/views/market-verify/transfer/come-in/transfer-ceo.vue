<template>
<div class="container">
    <el-tabs
    type="border-card"
    class="mt-20"
     @tab-click="tabClick">
      <el-tab-pane>
        <span slot="label">待审核</span>
        <el-table
          :data="verifywaitDatas"
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
            width="160px">
          </el-table-column>
          <el-table-column
            label="身份证号"
            prop="idNo"
            width="220px">
          </el-table-column>
          <el-table-column
            label="原一级组织"
            prop="levelOne"
            width="220px">
          </el-table-column>
          <el-table-column
            label="原单位"
            prop="companyName"
            min-width="160px">
          </el-table-column>
          <el-table-column
            label="原部门"
            prop="oldDeptName"
            width="150px">
          </el-table-column>
          <el-table-column
            label="原岗位"
            prop="postName"
            width="155px">
          </el-table-column>
          <el-table-column
            label="调动日期"
            prop="changeTime"
            width="170px">
          </el-table-column>
          <el-table-column
            label="调动说明"
            prop="changeType"
            width="185px">
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="185px">
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
                <span @click="AgreeMsg(scope.row)">同意</span>
                <span @click="UnAgreeMsg(scope.row)">不同意</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          @size-change="handleTwaitSizeChange"
          @current-change="handleTwaitCurrentChange"
          :current-page="twaitPageMsg.currentPage"
          :page-sizes="twaitPageMsg.pageSizes"
          :page-size="twaitPageMsg.pageSize"
          :total="twaitPageMsg.total">
        </pagination>
      </el-tab-pane>

      <el-tab-pane>
        <span slot="label">已审核</span>
        <el-table
          :data="verifyfinishDatas"
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
            width="160px">
          </el-table-column>
          <el-table-column
            label="身份证号"
            prop="idNo"
            width="220px">
          </el-table-column>
          <el-table-column
            label="联系方式"
            prop="telephone"
            width="150px">
          </el-table-column>
          <el-table-column
            label="原一级组织"
            prop="levelOne"
            width="220px">
          </el-table-column>
          <el-table-column
            label="原单位"
            prop="companyName"
            min-width="160px">
          </el-table-column>
          <el-table-column
            label="原部门"
            prop="oldDeptName"
            width="150px">
          </el-table-column>
          <el-table-column
            label="原岗位"
            prop="postName"
            width="155px">
          </el-table-column>
          <el-table-column
            label="调动日期"
            prop="changeTime"
            width="170px">
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
            label="操作"
            fixed="right"
            width="80px">
            <template slot-scope="scope">
              <div class="operation">
                <span @click="detailMsg(scope.row)">详情</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          @size-change="handleTfinishSizeChange"
          @current-change="handleTfinishCurrentChange"
          :current-page="tfinishPageMsg.currentPage"
          :page-sizes="tfinishPageMsg.pageSizes"
          :page-size="tfinishPageMsg.pageSize"
          :total="tfinishPageMsg.total">
        </pagination>
      </el-tab-pane>

      <!-- 同意 -->
      <el-dialog title="同意"  v-draggable  :visible.sync="agreeVisible" width="700px">
        <el-form :model="agreeForm" label-width="115px" class="dialog-form">
          <el-form-item label="调动日期：">
            <span>{{receiveDetailDatas.transferDate}}</span>
          </el-form-item>
          <el-form-item label="工资标准：" >
            <span>{{receiveDetailDatas.oldSalaryForm}}</span>
          </el-form-item>
          <el-form-item label="社保停缴：">
            <span>{{receiveDetailDatas.insuranceStop | filterInsuranceStatus}}</span>
          </el-form-item>
          <el-form-item label="社保缴纳至：" v-show="receiveDetailDatas.insuranceStop===1">
            <span>{{receiveDetailDatas.insuranceDate | formatMonth}}</span>
          </el-form-item>
          <el-form-item label="公积金停缴：">
            <span>{{receiveDetailDatas.fundStop | filterInsuranceStatus}}</span>
          </el-form-item>
          <el-form-item label="公积金缴纳至：" v-show="receiveDetailDatas.fundStop===1">
            <span>{{receiveDetailDatas.fundDate | formatMonth}}</span>
          </el-form-item>
          <el-form-item label="工资结算至：">
            <span>{{receiveDetailDatas.salaryDate}}</span>
          </el-form-item>
          <el-form-item label="其他费用：">
            <span>{{receiveDetailDatas.otherCost}}</span>
          </el-form-item>
          <el-form-item label="休假情况：">
            <span>可休:{{receiveDetailDatas.vacationDaysAll}}    已休:{{receiveDetailDatas.vacationDaysUsable}}   剩余:{{receiveDetailDatas.vacationDaysUsed}}</span>
          </el-form-item>
          <el-form-item label="劳动关系：">
            <span>{{receiveDetailDatas.relieveLaborRelation | filterRelieveStatus}}</span>
          </el-form-item>
          <el-form-item label="解除日期：" v-if="receiveDetailDatas.relieveLaborRelation ===1 ">
            <span>{{receiveDetailDatas.relieveLaborDate}}</span>
          </el-form-item>
          <el-form-item label="其他说明：">
            <span>{{receiveDetailDatas.remark}}</span>
          </el-form-item>
          <el-form-item label="新  部  门：">
            {{receiveDetailDatas.toCompanyName}}
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="setCloseData" class="false" size="mini">取 消</el-button>
          <el-button type="primary" @click="agreeSave" size="mini">确 定</el-button>
       </span>
      </el-dialog>

      <!-- 不同意原因 -->
      <el-dialog title="不同意原因" :visible.sync="UnagreeVisible" width="500px">
        <el-form
          :model="UnagreeForm"
          :rules="unagreeRules"
          ref="unagreeForm"
          label-width="100px"
          class="dialog-form">
          <el-form-item label="原  因：" prop="backreson">
            <el-select v-model="UnagreeForm.backreson" placeholder="请选择">
              <el-option
                v-for="item in reasonOption"
                :key="item.id"
                :label="item.codeText"
                :value="item.codeText">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="说  明：">
            <el-input type="textarea" v-model="UnagreeForm.remark"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="UnagreeVisible = false" class="false" size="mini">取 消</el-button>
          <el-button type="primary" @click="UnagreeSave('unagreeForm')" size="mini">确 定</el-button>
       </span>
      </el-dialog>

      <!-- 详情 -->
      <el-dialog title="详情" :visible.sync="detailVisible" v-draggable width="700px">
        <el-form label-width="115px" class="dialog-form">
          <el-form-item label="调动日期：">
            <span>{{receiveDetailDatas.transferDate}}</span>
          </el-form-item>
          <el-form-item label="工资标准：" >
            <span>{{receiveDetailDatas.oldSalaryForm}}</span>
          </el-form-item>
          <el-form-item label="社保停缴：">
            <span>{{receiveDetailDatas.insuranceStop | filterInsuranceStatus}}</span>
          </el-form-item>
          <el-form-item label="社保缴纳至：" v-show="receiveDetailDatas.insuranceStop===1">
            <span>{{receiveDetailDatas.insuranceDate | formatMonth}}</span>
          </el-form-item>
          <el-form-item label="公积金停缴：">
            <span>{{receiveDetailDatas.fundStop | filterInsuranceStatus}}</span>
          </el-form-item>
          <el-form-item label="公积金缴纳至：" v-show="receiveDetailDatas.fundStop===1">
            <span>{{receiveDetailDatas.fundDate | formatMonth}}</span>
          </el-form-item>
          <el-form-item label="工资结算至：">
            <span>{{receiveDetailDatas.salaryDate}}</span>
          </el-form-item>
          <el-form-item label="其他费用：">
            <span>{{receiveDetailDatas.otherCost}}</span>
          </el-form-item>
          <el-form-item label="休假情况：">
            <span>可休:{{receiveDetailDatas.vacationDaysAll}}    已休:{{receiveDetailDatas.vacationDaysUsable}}    剩余:{{receiveDetailDatas.vacationDaysUsed}}</span>
          </el-form-item>
          <el-form-item label="劳动关系：">
            <span>{{receiveDetailDatas.relieveLaborRelation | filterRelieveStatus}}</span>
          </el-form-item>
          <el-form-item label="解除日期：" v-if="receiveDetailDatas.relieveLaborRelation ===1 ">
            <span>{{receiveDetailDatas.relieveLaborDate}}</span>
          </el-form-item>
          <el-form-item label="其他说明：">
            <span>{{receiveDetailDatas.remark}}</span>
          </el-form-item>
          <template v-if="type === 2">
            <el-form-item label="不同意原因：">
              <span>{{receiveDetailDatas.reason}}</span>
            </el-form-item>
          </template>
        </el-form>
      </el-dialog>
    </el-tabs>
  </div>
</template>
<script>
import { getToken } from 'assets/js/util'
import Pagination from 'components/Pagination.vue'
import { getTaskFinshed, getTaskList } from 'static/api/recruit/entry/entry'
import { timeZeroToString } from 'assets/js/common'
import { getReceiveDetail2, transferCallback } from 'static/api/verify/transfer/transfer'
import { getTaskComplete } from 'static/api/exmine/exmine'
import { getfilterInsuranceStatus, getfilterRelieveStatus } from 'assets/js/filters'
import { mapGetters } from 'vuex'
import { getSysDic } from 'static/api/common/common'
export default {
  data () {
    return {
      userOrgId: '',
      showTreeTag: false,
      loading: false,
      list: [],
      organizeSelect: [],
      salaryStandardShow: '',
      wageLevel: [],
      agreeVisible: false,
      agreeForm: {
        employeeId: '',
        pId: '',
        id: '',
        taskId: '',
        owner: '',
        MoveType: '',
        postName: '',
        orgName: '',
        company: '',
        newDeptName: '',
        newPostName: '',
        oldSalaryForm: ''
      },
      verifywaitDatas: [],
      verifyfinishDatas: [],
      townerPageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      twaitPageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      tfinishPageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      tabTitle: '我发起的',
      revokeForm: {
        id: ''
      },
      UnagreeVisible: false,
      UnagreeForm: {
        id: '',
        backreson: '',
        remark: ''
      },
      reasonOption: [],
      /*  reasonSelect: [
          {value: '信息有误', label: '信息有误'},
          {value: '不同意', label: '不同意'},
          {value: '其他', label: '其他'}
        ], */
      receiveDetailDatas: [],
      oldSalaryForm: [],
      detailVisible: false,
      type: '',
      formalSalaryStr: '',
      unagreeRules: {
        backreson: { required: true, message: '请选择不接受的原因', trigger: 'change' }
      }
    }
  },
  components: {
    Pagination
  },
  computed: {
    ...mapGetters(['getMarketVerifyTransferSearchArr', 'getMarketVerifyTransferClick']),
    contractWaitParams () {
      return {
        actType: 'changeMarket',
        userId: getToken('loginId').toString(),
        groupId: 'changeCEO',
        keyword: this.getMarketVerifyTransferSearchArr.keyword,
        startTime: this.getMarketVerifyTransferSearchArr.startTime ? timeZeroToString(this.getMarketVerifyTransferSearchArr.startTime) : '',
        endTime: this.getMarketVerifyTransferSearchArr.endTime ? timeZeroToString(this.getMarketVerifyTransferSearchArr.endTime) : '',
        page: this.twaitPageMsg.currentPage,
        size: this.twaitPageMsg.pageSize
      }
    },
    contractFinishParams () {
      return {
        actType: 'changeMarket',
        userId: getToken('loginId').toString(),
        taskDId: 'changeCEOAudit',
        keyword: this.getMarketVerifyTransferSearchArr.keyword,
        startTime: this.getMarketVerifyTransferSearchArr.startTime ? timeZeroToString(this.getMarketVerifyTransferSearchArr.startTime) : '',
        endTime: this.getMarketVerifyTransferSearchArr.endTime ? timeZeroToString(this.getMarketVerifyTransferSearchArr.endTime) : '',
        page: this.tfinishPageMsg.currentPage,
        size: this.tfinishPageMsg.pageSize
      }
    }
  },
  methods: {
    setCloseData () {
      this.agreeVisible = false
      this.$store.commit('SET_SINGLE_TREE_CHECKED_VAL', false)
    },
    /** 同意**/
    AgreeMsg (row) {
      this.agreeForm.employeeId = row.employeeId
      this.agreeForm.pId = row.processInstanceId
      this.agreeForm.id = row.id
      this.agreeForm.taskId = row.task.id
      this.agreeForm.owner = row.task.owner
      this.agreeForm.taskDefinitionKey = row.task.taskDefinitionKey
      this._getDetail(row, 'accept')
      this.agreeVisible = true
      this.$store.dispatch('setSingleCheckedData', row.newDeptId.toString())
      this.$store.dispatch('setSingleTreeCheckedName', row.newDeptIdName)
    },
    agreeSave () {
      let newPassKey = this.agreeForm.taskDefinitionKey
      newPassKey = newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass'
      let complateParams = {
        actType: 'changeMarket',
        userId: getToken('loginId'),
        pId: this.agreeForm.pId,
        id: this.agreeForm.id + '',
        taskId: this.agreeForm.taskId,
        owner: this.agreeForm.owner,
        var: {
          keys: newPassKey,
          values: 'true',
          types: 'B'
        }
      }
      getTaskComplete(complateParams).then(data => {
        this.$message.success('操作成功')
        setTimeout(() => {
          this._getwaitTaskList()
        }, 200)
      })
      this.agreeVisible = false
    },
    /** 不同意**/
    UnAgreeMsg (row) {
      this.agreeForm.employeeId = row.employeeId
      this.UnagreeVisible = true
      let newPassKey = row.task.taskDefinitionKey
      newPassKey = (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass') + ',' + (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'BackReason')
      let unParams = {
        actType: 'changeMarket',
        userId: getToken('loginId'),
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
    UnagreeSave (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.UnagreeForm.backreson === '') {
            this.unComplateForm.var.values = false + ',拒绝'
          } else {
            this.unComplateForm.var.values = false + ',' + this.UnagreeForm.backreson + ',' + this.UnagreeForm.remark
          }
          let transferParams = {
            userId: Number(this.agreeForm.employeeId),
            operator: getToken('loginId'),
            status: 0
          }
          transferCallback(transferParams).then(data => {
            getTaskComplete(this.unComplateForm).then(res => {
              this.$message.success('操作成功')
              setTimeout(() => {
                this._getwaitTaskList()
                this._getfinishTaskList()
              }, 400)
              this.UnagreeVisible = false
            })
          })
        }
      })
    },

    /** 详情 **/
    detailMsg (row, tab) {
      this.detailVisible = true
      this.type = ''
      this._getDetail(row, tab)
    },
    remoteMethod (query) {
      this.organizeSelect = []
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.organizeSelect = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.organizeSelect = []
      }
    },
    handleTwaitSizeChange (pageSize) {
      this.twaitPageMsg.pageSize = pageSize
      this._getwaitTaskList()
    },
    handleTwaitCurrentChange (currentPage) {
      this.twaitPageMsg.currentPage = currentPage
      this._getwaitTaskList()
    },
    handleTfinishSizeChange (pageSize) {
      this.tfinishPageMsg.pageSize = pageSize
      this._getfinishTaskList()
    },
    handleTfinishCurrentChange (currentPage) {
      this.tfinishPageMsg.currentPage = currentPage
      this._getfinishTaskList()
    },
    /** 待审核**/
    _getwaitTaskList () {
      getTaskList(this.contractWaitParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.verifywaitDatas = data.result.records
          }
          this.twaitPageMsg.total = data.result.total
        }
      })
    },
    /** 已审核**/
    _getfinishTaskList () {
      getTaskFinshed(this.contractFinishParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.verifyfinishDatas = data.result.records
          }
          this.tfinishPageMsg.total = data.result.total
        }
      })
    },
    _getDetail (row, tab) {
      getReceiveDetail2(Number(row.changeId)).then(data => {
        if (data.result) {
          this.receiveDetailDatas = data.result
          this.$store.commit('SET_SINGLE_CHECKED_ORGID', data.result.toCompanyId)
          if (tab === 'owner') {
            this.type = ''
          } else if (tab === 'again') {
            this.formalSalaryStr = data.result.oldSalaryForm
            this.moveForm.transferDate = data.result.transferDate
            this.moveForm.insuranceStop = data.result.insuranceStop
            this.moveForm.insuranceDate = data.result.insuranceDate
            this.moveForm.fundStop = data.result.fundStop
            this.moveForm.fundDate = data.result.fundDate
            this.moveForm.salaryDate = data.result.salaryDate
            this.moveForm.otherCost = data.result.otherCost
            this.moveForm.vacationDaysAll = data.result.vacationDaysAll
            this.moveForm.vacationDaysUsable = data.result.vacationDaysUsable
            this.moveForm.relieveLaborRelation = data.result.relieveLaborRelation
            this.moveForm.relieveLaborDate = data.result.relieveLaborDate
            this.moveForm.remark = data.result.remark
          } else {
            if (row.reason === '') {
              this.type = 1
            } else {
              this.type = 2
            }
          }
          this.receiveDetailDatas.reason = row.reason
        }
      })
    },
    searchList () {
      if (this.tabTitle === '待审核') {
        this.handleTwaitCurrentChange(1)
      } else if (this.tabTitle === '已审核') {
        this.handleTfinishCurrentChange(1)
      }
    },
    tabClick (tab, event) {
      if (tab.index === '0') {
        this.tabTitle = '待审核'
        this._getwaitTaskList()
      } else if (tab.index === '1') {
        this.tabTitle = '已审核'
        this._getfinishTaskList()
      }
    },
    /* 获取数字字典 */
    async _getQueryClassList () {
      /* 不同意类型 */
      await getSysDic('auditRefusedType').then((data) => {
        if (data.result) {
          console.log('不同意类型', data.result)
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.reasonOption.push(item)
            }
          })
        }
      })
    }
  },
  filters: {
    filterInsuranceStatus (status) {
      return getfilterInsuranceStatus(status)
    },
    filterRelieveStatus (status) {
      return getfilterRelieveStatus(status)
    }
  },
  watch: {
    getMarketVerifyTransferClick (val) {
      if (val) {
        this._getwaitTaskList()
      }
      this.$store.commit('SET_MARKETVERIFYTRANSFER_CLICKED', false)
    }
  },
  created () {
    this._getwaitTaskList()
    this._getQueryClassList()
  }
}
</script>

<style scoped lang="less">
.el-select{width: 100%!important;}
.salary-form .el-col {margin-right: 15px;}
// .el-form-item{margin-bottom: 16px!important;}
// .dialog-form .el-form-item{margin-bottom: 15px!important;}
.salary-div {
  span:nth-child(1){
    margin-left: 0px;
  }
  span{
    margin: 0px 8px;
  }
}
.el-form-item.mustForm::before {
    top: 14px;
    left: 7px;
}
</style>
