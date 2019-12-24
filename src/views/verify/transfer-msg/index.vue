<template>
<div class="container" @click="orgDatas1.showTree =false;orgDatas2.showTree = false">
     <el-form :model="transferForm">
       <div class="search-form_box clearfix">
          <div class="search-form_item">
            <el-input v-model="transferForm.keyWords" placeholder="请输入姓名/身份证号"  @keyup.enter.native="searchList"></el-input>
          </div>
         <div class="search-form_item start-line">
           <el-date-picker
             v-model="transferForm.startTime"
             type="date"
             placeholder="提交开始时间">
           </el-date-picker>
         </div>
         <div class="search-form_item">
           <el-date-picker
             v-model="transferForm.endTime"
             type="date"
             :picker-options="pickerOptions"
             placeholder="提交结束时间">
           </el-date-picker>
         </div>
         <div class="search-form_button pt-3">
           <el-button type="primary" size="small" @click="searchList">查询</el-button>
         </div>
       </div>
      </el-form>
    <el-tabs
    type="border-card"
    class="mt-20"
    v-model="activeName"
     @tab-click="tabClick">
      <el-tab-pane name="first">
        <span slot="label">我发起的</span>
        <el-table
          :data="verifyOwnerDatas"
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
            prop="deptName"
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
            width="130px">
            <template slot-scope="scope">
              <div class="operation">
                <span @click="detailMsg(scope.row, 'owner')">详情</span>
                <span v-if="!scope.row.realityEndTime" @click="revoke(scope.row)" size="mini">撤销</span>
                <span v-if="scope.row.reason !== null && scope.row.reason !== ''&&scope.row.reason !== '撤销操作'" @click="transferMsg(scope.row)" size="mini">重新发起</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
         v-if="townerPageMsg.total>10"
          @size-change="handleTownerSizeChange"
          @current-change="handleTownerCurrentChange"
          :current-page="townerPageMsg.currentPage"
          :page-sizes="townerPageMsg.pageSizes"
          :page-size="townerPageMsg.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="townerPageMsg.total">
      </el-pagination>
      </el-tab-pane>

      <el-tab-pane name="second" v-if="getCurrentRoleGroups.indexOf('changeHr')!==-1">
        <span slot="label">待接收</span>
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
                <span @click="AgreeMsg(scope.row)">接收</span>
                <span @click="UnAgreeMsg(scope.row)">不接收</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
         <el-pagination
          @size-change="handleTwaitSizeChange"
          @current-change="handleTwaitCurrentChange"
          :current-page="twaitPageMsg.currentPage"
          :page-sizes="twaitPageMsg.pageSizes"
          v-if="twaitPageMsg.total>10"
          :page-size="twaitPageMsg.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="twaitPageMsg.total">
        </el-pagination>
      </el-tab-pane>

      <el-tab-pane name="third" v-if="getCurrentRoleGroups.indexOf('changeHr')!==-1">
        <span slot="label">接收记录</span>
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
        <el-pagination
        v-if="tfinishPageMsg.total>10"
          @size-change="handleTfinishSizeChange"
          @current-change="handleTfinishCurrentChange"
          :current-page="tfinishPageMsg.currentPage"
          :page-sizes="tfinishPageMsg.pageSizes"
          :page-size="tfinishPageMsg.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tfinishPageMsg.total">
        </el-pagination>
      </el-tab-pane>

      <el-dialog title="接收"
        :visible.sync="agreeVisible"
         v-draggable
        width="900px">
          <el-form
          :model="agreeForm"
          ref="agreeForm"
          :rules="agressRules"
          label-width="130px"
          class="dialog-form">
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
              <span>可休:{{receiveDetailDatas.vacationDaysAll}}  已休:{{receiveDetailDatas.vacationDaysUsable}}  剩余:{{receiveDetailDatas.vacationDaysUsed}}</span>
            </el-form-item>
            <el-form-item label="劳动关系：">
              <span>{{receiveDetailDatas.relieveLaborRelation | filterRelieveStatus}}</span>
            </el-form-item>
            <el-form-item label="解除日期：" v-if="receiveDetailDatas.relieveLaborRelation ===1 ">
              <span>{{receiveDetailDatas.relieveLaborDate}}</span>
            </el-form-item>
            <el-form-item label="其他说明：">
              <span v-if="receiveDetailDatas.remark">{{receiveDetailDatas.remark}}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
            <el-form-item label="新  部  门："
            required
            >
              <search-dept-tree
              ref="deptRef"
              :orgDatas="orgDatas2"
              @selectChange="selectChange"
              />
            </el-form-item>
            <el-form-item label="新  岗  位："  prop="newPostName">
              <el-input v-model="agreeForm.newPostName" placeholder="请输入新的岗位"></el-input>
            </el-form-item>
            <div v-if="acceptStatus == '14'">
              <el-form-item  label="新工资标准:" required class="exercitation-form_item_box clearfix">
              <el-form-item prop="exercitationSalary">
                <el-input placeholder="请输入实习工资" v-model="agreeForm.exercitationSalary">
                <template slot="append">元/月</template>
              </el-input>
              </el-form-item>
              <el-form-item prop="exercitationAllowance">
               <el-input placeholder="请输入实习津贴" v-model="agreeForm.exercitationAllowance">
                <template slot="append">元/月</template>
              </el-input>
              </el-form-item>
            </el-form-item>
            </div>
            <div v-else>
             <salary-pure
             ref="salaryPureRef"
             :salaryData="salaryForm"
             />
            </div>
          </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="agreeVisible = false" class="false" size="mini">取 消</el-button>
          <el-button type="primary" @click="agreeSave('agreeForm')" size="mini">确 定</el-button>
       </span>
      </el-dialog>
      <!-- 不接收原因 -->
      <el-dialog title="不接收原因"
       :visible.sync="UnagreeVisible"
        v-draggable
       width="500px">
          <el-form
          :model="UnagreeForm"
          label-width="90px"
          :rules="unagressRules"
          ref="unAgressRef"
          class="dialog-form">
            <el-form-item label="原  因：" class="mustForm">
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
          <el-button type="primary" @click="UnagreeSave" size="mini">确 定</el-button>
       </span>
      </el-dialog>

      <el-dialog
      title="详情"
      :visible.sync="detailVisible"
      v-draggable
      width="700px">
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
              <span>可休:{{receiveDetailDatas.vacationDaysAll}}   已休:{{receiveDetailDatas.vacationDaysUsable}}    剩余:{{receiveDetailDatas.vacationDaysUsed}}</span>
            </el-form-item>
            <el-form-item label="劳动关系：">
              <span>{{receiveDetailDatas.relieveLaborRelation | filterRelieveStatus}}</span>
            </el-form-item>
            <el-form-item label="解除日期：" v-if="receiveDetailDatas.relieveLaborRelation ===1 ">
              <span>{{receiveDetailDatas.relieveLaborDate}}</span>
            </el-form-item>
            <el-form-item label="其他说明：">
              <span v-if="receiveDetailDatas.remark">{{receiveDetailDatas.remark}}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
            <template v-if="type === 1">
              <el-form-item label="新部门：">
                <span>{{receiveDetailDatas.toCompanyName}}-{{receiveDetailDatas.toDeptName}}</span>
              </el-form-item>
              <el-form-item label="新岗位：">
                <span>{{receiveDetailDatas.newPostName}}</span>
              </el-form-item>
              <el-form-item label="新工资标准：">
                <span>{{receiveDetailDatas.newSalaryForm}}</span>
              </el-form-item>
            </template>
            <template v-if="type === 2">
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
          :rules="moveFormRules"
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
              ref="companyRef"
              :orgDatas="orgDatas1"
              @selectChange="selectChange1"
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
    </el-tabs>
  </div>
</template>
<script>
import { getToken } from 'assets/js/util'
import { getTaskFinshed, getTaskList, rollBackExmine } from 'static/api/recruit/entry/entry'
import { timeZeroToString } from 'assets/js/common'
import { getReceiveDetail2, transferCallback, transferback, getTransfer } from 'static/api/verify/transfer/transfer'
import { getTaskComplete } from 'static/api/exmine/exmine'
import { getfilterInsuranceStatus, getfilterRelieveStatus } from 'assets/js/filters'
import SearchDeptTree from 'components/SearchDeptTree'
import SalaryPure from 'components/SalaryAssembly/pure-salary.jsx'
import { salaryStandarJson } from 'utils/config'
import { mapGetters } from 'vuex'
import { salaryParams } from 'assets/js/mixins'
import { getSysDic } from 'static/api/common/common'
import { saveSalaryStructure } from 'static/api/setting/index'
import { debounce } from 'lodash'
const initMoveForm = {
  MoveType: 0,
  transferDate: '',
  orgId: '',
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
const orgDatas = {
  filterName: '',
  orgId: '',
  dataTree: [],
  showTree: false
}
export default {
  mixins: [salaryParams],
  data () {
    return {
      activeName: '',
      orgDatas1: Object.assign({}, orgDatas, { bindData: 'company' }),
      orgDatas2: Object.assign({}, orgDatas, { disabled: true, bindData: 'transfer' }),
      showTreeTag: false,
      loading: false,
      list: [],
      organizeSelect: [],
      transferForm: {
        keyWords: '',
        startTime: '',
        endTime: ''
      },
      // 新的薪资
      salaryForm: this.deepClone(salaryStandarJson),
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
        oldSalaryForm: '',
        isSalaryStandar: '',
        exercitationSalary: '',
        exercitationAllowance: ''
      },
      acceptStatus: '',
      verifyOwnerDatas: [],
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
      receiveDetailDatas: [],
      oldSalaryForm: [],
      detailVisible: false,
      type: '',
      /** 调动**/
      moveVisible: false,
      moveForm: this.deepClone(initMoveForm),
      /** 树结构**/
      formalSalaryStr: '',
      formSalaryParams: '',
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
      },
      agressRules: {
        newDeptId: { required: true, message: '请选择调入公司', trigger: ['change', 'blur'] },
        newPostName: { required: true, message: '请填写新岗位', trigger: 'blur' },
        exercitationSalary: { required: true, message: '请填写实习期工资', trigger: 'blur' },
        exercitationAllowance: { required: true, message: '请填写实习期津贴', trigger: 'blur' }
      },
      unagressRules: {
        backreson: { required: true, message: '请选择不接收原因', trigger: 'change' }
      }
    }
  },
  components: {
    SearchDeptTree,
    SalaryPure
  },
  computed: {
    pickerOptions () {
      return {
        disabledDate: (time) => {
          return new Date(time).getTime() < new Date(this.transferForm.startTime).getTime()
        }
      }
    },
    ...mapGetters(['getCurrentRoleGroups']),
    contractOwnerParams () {
      return {
        actType: 'change',
        userId: getToken('loginId').toString(),
        keyword: this.transferForm.keyWords,
        startTime: this.transferForm.startTime ? timeZeroToString(this.transferForm.startTime) : '',
        endTime: this.transferForm.endTime ? timeZeroToString(this.transferForm.endTime) : '',
        page: this.townerPageMsg.currentPage,
        size: this.townerPageMsg.pageSize,
        searchType: 'ower'
      }
    },
    contractWaitParams () {
      return {
        actType: 'change',
        userId: getToken('loginId').toString(),
        groupId: 'changeHr',
        keyword: this.transferForm.keyWords,
        startTime: this.transferForm.startTime ? timeZeroToString(this.transferForm.startTime) : '',
        endTime: this.transferForm.endTime ? timeZeroToString(this.transferForm.endTime) : '',
        page: this.twaitPageMsg.currentPage,
        size: this.twaitPageMsg.pageSize
      }
    },
    contractFinishParams () {
      return {
        actType: 'change',
        userId: getToken('loginId').toString(),
        keyword: this.transferForm.keyWords,
        startTime: this.transferForm.startTime ? timeZeroToString(this.transferForm.startTime) : '',
        endTime: this.transferForm.endTime ? timeZeroToString(this.transferForm.endTime) : '',
        page: this.tfinishPageMsg.currentPage,
        size: this.tfinishPageMsg.pageSize
      }
    }
  },
  methods: {
    selectChange (orgId) {
      this.agreeForm.newDeptId = orgId
    },
    selectChange1 (orgId) {
      this.moveForm.orgId = orgId
    },
    //  撤销
    revoke (row) {
      this.revokeForm.employeeId = row.employeeId
      let revokeParams = {
        'taskId': row.task.id,
        'pId': row.historicTaskInstance.executionId,
        'tKey': row.historicTaskInstance.taskDefinitionKey,
        'userId': 'rolluser',
        'owner': row.historicTaskInstance.owner || row.userId || '',
        'actType': 'change'
      }
      let Params = {
        userId: this.revokeForm.employeeId
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

    /** 接收**/
    AgreeMsg (row) {
      this.agreeForm.employeeId = row.employeeId
      this.agreeForm.pId = row.processInstanceId
      this.agreeForm.id = row.id
      this.agreeForm.taskId = row.task.id
      this.agreeForm.owner = row.task.owner
      this.agreeForm.taskDefinitionKey = row.task.taskDefinitionKey
      this.salaryForm = this.deepClone(salaryStandarJson)
      this.orgDatas2.orgId = ''
      this.orgDatas2.filterName = ''
      this.$store.commit('SET_HRBELONGID', '')
      this.$store.commit('SET_TRANSFER_ORGID', row.deptNo)
      if (`${this.acceptStatus}` === '14') {
        this.$store.commit('SET_INFO_BY_ORG_ID', '')
      }
      this.agreeVisible = true
      this._getDetail(row, 'accept')
      setTimeout(() => {
        this.$refs.agreeForm.resetFields()
        if (`${this.acceptStatus}` !== '14') {
          this.$refs.salaryPureRef.clearValidate()
        }
      }, 200)
    },
    agreeSave: debounce(function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let newPassKey = this.agreeForm.taskDefinitionKey
          newPassKey = newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass'
          const complateParams = {
            actType: 'change',
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
          let transferParams = {
            newPostName: this.agreeForm.newPostName,
            operator: getToken('loginId'),
            toDeptId: this.agreeForm.newDeptId,
            userId: Number(this.agreeForm.employeeId),
            status: 1
          }

          let regularSalaryParams = {
            type: 177,
            deleteTag: 4,
            userId: Number(this.agreeForm.employeeId),
            effectiveDate: this.receiveDetailDatas.transferDate
          }
          let newSalaryParams = {}
          if (this.acceptStatus !== 14) {
            if (!this.$refs.salaryPureRef.checkSalaryValidate()) {
              return
            }
            newSalaryParams = Object.assign({}, this._getSalaryParams(), regularSalaryParams)
          } else {
            newSalaryParams = Object.assign({}, regularSalaryParams, {
              exercitationSalary: this.agreeForm.exercitationSalary,
              exercitationAllowance: this.agreeForm.exercitationAllowance
            })
          }
          saveSalaryStructure(newSalaryParams).then(result => {
            transferCallback(transferParams).then(data => {
              getTaskComplete(complateParams).then(res => {
                this.$message.success('操作成功')
                setTimeout(() => {
                  this._getwaitTaskList()
                }, 200)
              })
            })
          })
          this.agreeVisible = false
        }
      })
    }, 500),

    /** 不接收**/
    UnAgreeMsg (row) {
      this.UnagreeForm.backreson = ''
      this.UnagreeForm.remark = ''
      this.agreeForm.employeeId = row.employeeId
      this.UnagreeVisible = true
      let newPassKey = row.task.taskDefinitionKey
      newPassKey = (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass') + ',' + (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'BackReason')
      let unParams = {
        actType: 'change',
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
    UnagreeSave () {
      this.$refs.unAgressRef.validate(valid => {
        if (valid) {
          if (this.UnagreeForm.backreson === '') {
            this.unComplateForm.var.values = false + ',拒绝'
          } else {
            this.unComplateForm.var.values = false + ',' + this.UnagreeForm.backreson + ':' + this.UnagreeForm.remark
          }
          let transferParams = {
            userId: Number(this.agreeForm.employeeId),
            operator: getToken('loginId'),
            status: 0
          }
          if (!this.UnagreeForm.backreson) {
            this.$message.warning('请选择不接收原因!')
            return false
          }
          getTaskComplete(this.unComplateForm).then(data => {
            transferCallback(transferParams).then(res => {
              this.$message.success('操作成功')
              setTimeout(() => {
                this._getwaitTaskList()
              }, 400)
            })

            this.UnagreeVisible = false
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
    handleTownerSizeChange (pageSize) {
      this.townerPageMsg.pageSize = pageSize
      this._getOwnerTaskList()
    },
    handleTownerCurrentChange (currentPage) {
      this.townerPageMsg.currentPage = currentPage
      this._getOwnerTaskList()
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
    // 我发起的
    _getOwnerTaskList () {
      getTaskFinshed(this.contractOwnerParams).then(data => {
        if (data.result) {
          this.verifyOwnerDatas = data.result.records
          this.townerPageMsg.total = data.result.total
        }
      })
    },
    // 待接收
    _getwaitTaskList () {
      getTaskList(this.contractWaitParams).then(data => {
        if (data.result) {
          this.verifywaitDatas = data.result.records
          this.twaitPageMsg.total = data.result.total
        }
      })
    },
    // 已接收
    _getfinishTaskList () {
      getTaskFinshed(this.contractFinishParams).then(data => {
        if (data.result) {
          this.verifyfinishDatas = data.result.records
          this.tfinishPageMsg.total = data.result.total
        }
      })
    },
    // 调动
    transferMsg (row) {
      // this.$store.commit('SET_COMPANY_TYPE', 'company')
      // this.$store.commit('SET_USER_ORGID', row.orgId)
      // this.$store.commit('SET_SINGLE_CHECKED_ORGID', row.deptNo)
      this.moveForm.userId = row.employeeId
      this.moveForm.orgId = row.deptNo
      this.orgDatas1.orgId = row.deptNo
      this.orgDatas1.filterName = row.deptName
      this.moveVisible = true
      this._getDetail(row, 'again')
    },
    // 公司间调动
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
            toCompanyId: this.orgDatas1.orgId,
            transferDate: this.moveForm.transferDate ? timeZeroToString(this.moveForm.transferDate) : '',
            userId: this.moveForm.userId,
            vacationDaysAll: this.moveForm.vacationDaysAll,
            vacationDaysUsable: this.moveForm.vacationDaysUsable,
            vacationDaysUsed: this.moveForm.vacationDaysAll - this.moveForm.vacationDaysUsable,
            oldSalaryForm: this.formalSalaryStr,
            deptNo: (this.orgDatas1.orgId).toString()
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
    _getDetail (row, tab) {
      getReceiveDetail2(Number(row.changeId)).then(data => {
        if (data.result) {
          this.receiveDetailDatas = data.result
          this.acceptStatus = data.result.userStatusTmp
          this.$store.commit('SET_HRBELONGID', data.result.toCompanyId)
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
      if (this.tabTitle === '我发起的') {
        this.handleTownerCurrentChange(1)
      } else if (this.tabTitle === '待接收') {
        this.handleTwaitCurrentChange(1)
      } else if (this.tabTitle === '已接收') {
        this.handleTfinishCurrentChange(1)
      }
    },
    tabClick (tab, event) {
      if (tab.index === '0') {
        this.tabTitle = '我发起的'
        this.handleTownerCurrentChange(1)
        this.$router.push({ name: this.$route.name, query: { active: 'first' } })
      } else if (tab.index === '1') {
        this.tabTitle = '待接收'
        this.handleTwaitCurrentChange(1)
        this.$router.push({ name: this.$route.name, query: { active: 'second' } })
      } else if (tab.index === '2') {
        this.tabTitle = '已接收'
        this.handleTfinishCurrentChange(1)
        this.$router.push({ name: this.$route.name, query: { active: 'third' } })
      }
    },
    // 根据路由判断当前定位到的路由
    _getCurrentRouter () {
      this.activeName = this.$route.query.active
      if (!this.activeName) {
        this.$router.push({ name: this.$route.name, query: { active: 'first' } })
        this.activeName = 'first'
      }
      if (this.activeName === 'first') {
        this.tabTitle = '我发起的'
        this.handleTownerCurrentChange(1)
      } else if (this.activeName === 'second') {
        this.tabTitle = '待接收'
        this.handleTwaitCurrentChange(1)
      } else if (this.activeName === 'third') {
        this.tabTitle = '已接收'
        this.handleTfinishCurrentChange(1)
      }
    },
    /* 获取数字字典 */
    async _getQueryClassList () {
      await getSysDic('auditRefusedType').then((data) => {
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
  filters: {
    filterInsuranceStatus (status) {
      return getfilterInsuranceStatus(status)
    },
    filterRelieveStatus (status) {
      return getfilterRelieveStatus(status)
    }
  },
  created () {
    this._getCurrentRouter()
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
.exercitation-form_item_box{
  .el-form-item{
    float:left;
    width:320px;
    &:nth-of-type(2){
      margin-left:20px;
    }
  }
}
.salary-item_box{
  &/deep/ .mt-20{
      margin-top:0px;
  }
}
</style>
