<template>
<div class="come-in_owner_box" @click="orgDatas.showTree = false">
       <el-table
          :data="comeInOwnerDatas"
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
            width="200px">
          </el-table-column>
          <el-table-column
            label="部门"
            prop="oldDeptName"
            width="150px">
          </el-table-column>
          <el-table-column
            label="岗位"
            prop="postName"
            min-width="150px">
          </el-table-column>
          <el-table-column
            label="联系方式"
            prop="telephone"
            width="150px">
          </el-table-column>
          <el-table-column
            label="调动日期"
            prop="changeTime"
            width="160px">
          </el-table-column>
          <el-table-column
            label="调入公司"
            prop="newDeptName"
            width="150px">
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="175px">
            <template slot-scope="scope">
              {{scope.row.createTime}}
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="100px">
            <template slot-scope="scope">
              <div v-if ="scope.row.realityEndTime === null">
                待接收
              </div>
              <div v-else>
                <div v-if ="scope.row.reason === ''">
                  <span>已接收</span>
                </div>
                <div v-else-if ="scope.row.reason === '撤销操作'">
                  <span>已撤销</span>
                </div>
                <div v-else>
                  <el-tooltip placement="top" effect="light">
                    <div slot="content" style="width: 130px;height: 55px;overflow: auto;">{{scope.row.reason}}</div>
                    <span>不接收</span>
                  </el-tooltip>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="150px">
            <template slot-scope="scope">
              <div class="operation">
                <span @click="detailMsg(scope.row)">详情</span>
                <span v-if="scope.row.task&&scope.row.task.name=='市场总部CEO审核'" @click="revoke(scope.row)">撤销</span>
                <span v-if="scope.row.reason !== null && scope.row.reason !== ''&&scope.row.reason !== '撤销操作'" @click="transferMsg(scope.row)">重新发起</span>
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
    <!--调动dialog-->
       <el-dialog
      title="详情"
      :visible.sync="detailVisible"
      v-draggable
      width="500px">
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
            <template v-if="detailType === 2">
              <el-form-item label="不接收原因：">
                <span>{{receiveDetailDatas.reason}}</span>
              </el-form-item>
            </template>
          </el-form>
      </el-dialog>
      <el-dialog
      title="调动"
      :visible.sync="moveVisible"
       v-draggable
      width="700px"
      >
          <el-form
          :model="moveForm"
          label-width="125px"
          ref="moveForm"
          :rules = "moveFormRules"
          class="change-box dialog-form">
            <el-form-item label="调 动 日 期："
            prop="transferDate"
            >
                <el-date-picker
                  v-model="moveForm.transferDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="调 入 公 司："
              prop="orgId">
                <search-dept-tree
                :orgDatas="orgDatas"
                @selectChange="selectChange"
                />
              </el-form-item>
            <el-form-item label="原工资标准：">
              {{formalSalaryStr}}
            </el-form-item>
              <el-form-item label="社 保 停 缴："
              prop="insuranceStop"
              >
                <el-radio-group v-model="moveForm.insuranceStop">
                  <el-radio :label= "1" >是</el-radio>
                  <el-radio :label= "0" >否</el-radio>
                  <el-radio :label= "2" >无社保</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="社保缴纳至："
              prop="insuranceDate"
              v-if="moveForm.insuranceStop===1">
                <el-date-picker
                  v-model="moveForm.insuranceDate"
                  type="month"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="公积金停缴："
              prop="fundStop"
              >
                <el-radio-group v-model="moveForm.fundStop">
                  <el-radio :label= "1">是</el-radio>
                  <el-radio :label= "0">否</el-radio>
                  <el-radio :label= "2" >无公积金</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="公积金缴纳至："
               v-if="moveForm.fundStop===1"
               prop="fundDate"
               >
                <el-date-picker
                  v-model="moveForm.fundDate"
                  type="month"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="工资结算至："
              prop="salaryDate"
              >
                <el-date-picker
                  v-model="moveForm.salaryDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="其 他 费 用："
              prop="otherCost"
              >
                <el-input type="textarea" v-model="moveForm.otherCost"></el-input>
              </el-form-item>
              <el-form-item label="休 假 情 况：">
                <el-input type="number" min="0" disabled v-model="moveForm.vacationDaysAll">
                  <template slot="prepend">可休:</template>
                  <template slot="append">天</template>
                </el-input>
                <el-input type="number" min="0" disabled v-model="moveForm.vacationDaysUsable">
                  <template slot="prepend">已休:</template>
                  <template slot="append">天</template>
                </el-input>
                <el-input type="number" min="0" disabled :value="moveForm.vacationDaysAll - moveForm.vacationDaysUsable">
                  <template slot="prepend">剩余:</template>
                  <template slot="append">天</template>
                </el-input>
              </el-form-item>
              <el-form-item
              label="劳 动 关 系："
              prop="relieveLaborRelation"
              >
                <el-radio-group v-model="moveForm.relieveLaborRelation">
                  <el-radio :label= "1">已解除</el-radio>
                  <el-radio :label= "0">未解除</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="解 除 日 期："
              v-if="moveForm.relieveLaborRelation===1"
              prop="relieveLaborDate"
              >
                <el-date-picker
                  v-model="moveForm.relieveLaborDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="其 他 说 明：">
                <el-input type="textarea" v-model="moveForm.remark"></el-input>
              </el-form-item>
          </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="moveVisible = false" class="false" size="mini">取 消</el-button>
          <el-button type="primary" @click="transferSave('moveForm')" size="mini">确 定</el-button>
        </span>
      </el-dialog>
</div>
</template>
<script>
import { getToken } from 'assets/js/util'
import { timeZeroToString } from 'assets/js/common'
import { getTaskFinshed, rollBackExmine } from 'static/api/recruit/entry/entry'
import Pagination from 'components/Pagination'
import { getReceiveDetail2, transferback, getTransfer } from 'static/api/verify/transfer/transfer'
import { getfilterInsuranceStatus, getfilterRelieveStatus } from 'assets/js/filters'
import { mapGetters } from 'vuex'
import SearchDeptTree from 'components/SearchDeptTree'
let initMoveForm = {
  MoveType: 0,
  transferDate: '',
  orgName: '',
  insuranceStop: '',
  insuranceDate: '',
  fundStop: '',
  fundDate: '',
  salaryDate: '',
  otherCost: '',
  vacationDaysAll: '',
  vacationDaysUsable: '',
  vacationDaysUsed: '',
  relieveLaborDate: '',
  relieveLaborRelation: '',
  remark: '',
  userId: '',
  status: ''
}
export default {
  data () {
    return {
      orgDatas: {
        filterName: '',
        orgId: '',
        dataTree: [],
        showTree: false,
        bindData: 'company'
      },
      detailVisible: false,
      // 调动
      moveVisible: false,
      formalSalaryStr: '',
      moveForm: this.deepClone(initMoveForm),
      /** 部门间调动**/
      movePostForm: {
        transferDate: '',
        toDeptName: '',
        newPostName: '',
        remark: ''
      },
      detailType: '',
      pageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      comeInOwnerDatas: [],
      receiveDetailDatas: [],
      moveFormRules: {
        transferDate: { required: true, message: '请选择调动日期', trigger: 'change' },
        orgId: { required: true, message: '请选择调入公司', trigger: 'change' },
        insuranceStop: { required: true, message: '请选择社保停缴情况', trigger: 'change' },
        insuranceDate: { required: true, message: '请选择社保停缴截止日', trigger: 'change' },
        fundStop: { required: true, message: '请选择公积金停缴情况', trigger: 'change' },
        fundDate: { required: true, message: '请选择公积金停缴截止日', trigger: 'change' },
        salaryDate: { required: true, message: '请选择工资结算日', trigger: 'change' },
        otherCost: { required: true, message: '请填写其他费用', trigger: 'blur' },
        relieveLaborRelation: { required: true, message: '请选择劳动关系情况', trigger: 'change' },
        relieveLaborDate: { required: true, message: '请选择劳动关系解除日期', trigger: 'change' }
      }
    }
  },
  computed: {
    ...mapGetters(['getMarketVerifyTransferSearchArr', 'getMarketVerifyTransferClick']),
    contractOwnerParams () {
      return {
        actType: 'changeMarketOutside',
        userId: getToken('loginId').toString(),
        keyword: this.getMarketVerifyTransferSearchArr.keyword,
        startTime: this.getMarketVerifyTransferSearchArr.startTime ? timeZeroToString(this.getMarketVerifyTransferSearchArr.startTime) : '',
        endTime: this.getMarketVerifyTransferSearchArr.endTime ? timeZeroToString(this.getMarketVerifyTransferSearchArr.endTime) : '',
        page: this.pageMsg.currentPage,
        size: this.pageMsg.pageSize,
        searchType: 'ower'
      }
    }
  },
  methods: {
    selectChange (orgId) {
      if (orgId) {
        this.moveForm.orgId = orgId
      } else {
        this.moveForm.orgId = ''
      }
    },
    handleSizeChange (pageSize) {
      this.pageMsg.pageSize = pageSize
      this._getOwnerTaskList()
    },
    handleCurrentChange (currentPage) {
      this.pageMsg.currentPage = currentPage
      this._getOwnerTaskList()
    },
    /** 我发起的**/
    _getOwnerTaskList () {
      getTaskFinshed(this.contractOwnerParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.comeInOwnerDatas = data.result.records
          }
          this.pageMsg.total = data.result.total
        }
      })
    },
    detailMsg (row) {
      this.detailVisible = true
      if (!row.reason) {
        this.detailType = 1
      } else {
        this.detailType = 2
      }
      this._getDetail(Number(row.changeId))
    },
    // 调动
    transferMsg (row) {
      this.moveForm.userId = row.employeeId
      this.moveForm.orgId = row.deptNo
      this.moveVisible = true
      this._getDetail(Number(row.changeId), 'again')
    },
    // 撤销
    revoke (row) {
      let revokeParams = {
        'taskId': row.task.id,
        'pId': row.historicTaskInstance.executionId,
        'tKey': row.historicTaskInstance.taskDefinitionKey,
        'userId': 'rolluser',
        'owner': row.historicTaskInstance.owner || row.userId || '',
        'actType': 'changeMarketOutside'
      }
      let Params = {
        userId: row.employeeId,
        operator: getToken('loginId'),
        status: 0
      }
      this.$confirm('确定要撤销' + row.name + '吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        rollBackExmine(revokeParams).then(data => {
          transferback(Params).then(res => {
            this.$message.success('撤销成功')
            setTimeout(() => {
              this._getOwnerTaskList()
            }, 400)
          })
        })
      }).catch(() => {})
    },
    /** 公司间调动**/
    transferSave (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let transferParams = {
            fundStop: this.moveForm.fundStop,
            fundDate: this.moveForm.fundDate ? timeZeroToString(this.moveForm.fundDate) : '',
            insuranceStop: this.moveForm.insuranceStop,
            insuranceDate: this.moveForm.insuranceDate ? timeZeroToString(this.moveForm.insuranceDate) : '',
            otherCost: this.moveForm.otherCost,
            relieveLaborRelation: this.moveForm.relieveLaborRelation,
            relieveLaborDate: this.moveForm.relieveLaborDate ? timeZeroToString(this.moveForm.relieveLaborDate) : '',
            remark: this.moveForm.remark,
            salaryDate: this.moveForm.salaryDate ? timeZeroToString(this.moveForm.salaryDate) : '',
            toCompanyId: this.orgDatas.orgId,
            transferDate: this.moveForm.transferDate ? timeZeroToString(this.moveForm.transferDate) : '',
            userId: this.moveForm.userId,
            vacationDaysAll: this.moveForm.vacationDaysAll,
            vacationDaysUsable: this.moveForm.vacationDaysUsable,
            vacationDaysUsed: this.moveForm.vacationDaysAll - this.moveForm.vacationDaysUsable,
            oldSalaryForm: this.formalSalaryStr,
            deptNo: (this.moveForm.orgId).toString()
          }
          getTransfer(transferParams).then(data => {
            this.$message.success('操作成功')
            setTimeout(() => {
              this._getOwnerTaskList()
            }, 400)
            this.moveVisible = false
            // this.moveForm.orgId = ''
            setTimeout(() => {
              this.moveForm = this.deepClone(initMoveForm)
            }, 200)
          })
        }
      })
    },
    _getDetail (id, tab) {
      getReceiveDetail2(id).then(data => {
        if (data.result) {
          this.receiveDetailDatas = data.result
          this.orgDatas.orgId = data.result.toCompanyId
          this.orgDatas.filterName = data.result.toCompanyName
          this.moveForm.orgId = data.result.toCompanyId
          if (tab && tab === 'again') {
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
          }
        }
      })
    }
  },
  components: {
    Pagination,
    SearchDeptTree
  },
  watch: {
    getMarketVerifyTransferClick (val) {
      if (val) {
        this._getOwnerTaskList()
      }
      this.$store.commit('SET_MARKETVERIFYTRANSFER_CLICKED', false)
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
  created () {
    this._getOwnerTaskList()
  }
}
</script>
