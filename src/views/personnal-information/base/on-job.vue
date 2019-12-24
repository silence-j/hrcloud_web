<template>
  <div class="on-job_box" @click="companyOrgDatas.showTree = false; deptOrgDatas.showTree = false">
    <div class="table-setting-warp">
      <div class="table-setting-icon el-icon-setting" @click="chooseMsg"></div>
      <el-table
        :data="onJobListDatas"
        tooltip-effect="dark"
        @selection-change="selectionChange"
       @select-all="selectAll"
       ref="tableSelects"
        border
        @sort-change="sortChange">
        <el-table-column
          type="selection"
          v-if="bitchMove"
          :selectable="selectable"
          width="55">
        </el-table-column>
        <el-table-column
          label="序号"
          type="index"
          width="60">
        </el-table-column>
        <div v-for="item in fieldList" :key="item.id">
          <template v-if="item.prop == 'name'">
            <el-table-column
              label="姓名" prop="name"
              min-width="120px" :sortable="item.orderFlag === 1">
                <template slot-scope="scope">
                  {{scope.row.name}} <span class="entry-iconcolor" v-if="scope.row.entryTimes > 0 || scope.row.inZcBefore == 1" @click="entryList(scope.row)"><i class="fa fa-thumb-tack"></i></span>
                </template>
            </el-table-column>
          </template>
          <template v-else-if="item.prop == 'nature'">
            <el-table-column
              prop="nature"
              label="户籍性质" min-width="120px" :sortable="item.orderFlag === 1">
              <template slot-scope="scope">
                {{scope.row.nature | filternature}}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.prop == 'status'">
            <el-table-column
              prop="status"
              label="人员状态" min-width="120px" :sortable="item.orderFlag === 1">
              <template slot-scope="scope">
                {{scope.row.status | filterEmployeeStatus}}
              </template>

              <!-- 工资状态
                <template slot-scope="scope">
                <span v-if="scope.row.userStatus === 5">正式员工</span>
                <span v-if="scope.row.userStatus === 6">退休</span>
                <span v-if="scope.row.userStatus === 7">退休返聘</span>
                <span v-if="scope.row.userStatus === 8">离职申请中</span>
                <span v-if="scope.row.userStatus === 9">离职办理中</span>
                <span style="color: #6E7382;" v-if="scope.row.userStatus === 10">已离职</span>
                <span v-if="scope.row.userStatus === 11">调动中</span>
                <span style="color: #A25600;" v-if="scope.row.userStatus === 12">已调动</span>
                <span style="color: #0855DB;" v-if="scope.row.userStatus === 13">试用</span>
                <span style="color: #AC1DD8;" v-if="scope.row.userStatus === 14">实习</span>
                <span v-if="scope.row.userStatus === 16">外部退休返聘</span>
              </template> -->

            </el-table-column>
          </template>
          <template v-else>
            <el-table-column
              :label="item.name"
              :prop="item.prop" :key="item.name" :sortable="item.orderFlag === 1" min-width="120">
            </el-table-column>
          </template>
        </div>

        <el-table-column
          min-width="190"
          max-width="260"
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <div class="operation">
              <span @click="lookMsg(scope.row)" v-show="(permission.indexOf('查看'))!=-1">详情</span>
              <span @click="setReport(scope.row)" v-show="scope.row.status == 14&&permission.indexOf('报到')!=-1">报到</span>
              <span @click="setRegeular(scope.row)" v-show="scope.row.status == 13&& permission.indexOf('转正')!=-1">转正</span>
              <!--<span @click="editMsg(scope.row,'baseType')" v-show="(scope.row.status == 5|| scope.row.status == 13 || scope.row.status == 14 || scope.row.status == 7 || scope.row.status == 16)&&(permission.indexOf('编辑'))!=-1">编辑</span>-->
              <span @click="transferMsg(scope.row)" v-show="(scope.row.status == 5 || scope.row.status == 13 || scope.row.status == 14 || scope.row.status == 7 || scope.row.status == 16) &&(permission.indexOf('调动'))!=-1">调动</span>
              <span @click="leaveMsg(scope.row)" v-show="(scope.row.status == 5 || scope.row.status == 13 || scope.row.status == 14 || scope.row.status == 7 || scope.row.status == 16)&&(permission.indexOf('离职'))!=-1">离职</span>
              <span @click="joinMsg(scope.row)" v-show="scope.row.dimissionStatus == 0&&(permission.indexOf('交接'))!==-1">交接</span>
              <span @click="leaveSureMsg(scope.row)" v-show="scope.row.status == 9 && permission.indexOf('离职确认')!=-1">确认离职</span>
              <span @click="retiredRemploy(scope.row)" v-show="countRetireAge(scope.row.birthday, scope.row.sex) && scope.row.status != 7&& scope.row.status != 8&& scope.row.status != 11 && permission.indexOf('退休返聘')!=-1">退休返聘</span>
              <span @click="showRetiredDetail(scope.row)"  v-show="scope.row.status == 7 && permission.indexOf('返聘详情')!=-1">返聘详情</span>
              <span @click="retiredRemploy(scope.row, 'continue')"  v-if="scope.row.status == 7">续聘</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
      <pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageMsg.currentPage"
        :page-sizes="pageMsg.pageSizes"
        :page-size="pageMsg.pageSize"
        :total="pageMsg.total">
      </pagination>

      <!--调动dialog-->
      <el-dialog title="调动"
       @close="closeMoveForm"
        :visible.sync="moveVisible"
        lock-scroll
        class="move-dialog"
        top="3vh"
        width="700px"
        v-draggable>
        <el-form
        :model="moveForm"
        ref="moveForm"
        label-width="125px"
        class="change-box dialog-form"
        :rules="moveFormRules">
          <el-form-item label="调 动 方 式：">
            <el-radio-group v-model="moveForm.MoveType" @change ="getDeptMoveValue">
              <el-radio :label="0" >公司间调动</el-radio>
              <el-radio :label="1" >部门间调动</el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-if="moveForm.MoveType == 0">
            <el-form-item label="调 动 日 期："
            prop="transferDate">
              <el-date-picker
                v-model="moveForm.transferDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item
            label="调 入 公 司："
            prop="toCompanyId">
            <search-dept-tree
            :orgDatas="companyOrgDatas"
            @selectChange="selectCompanyChange"
            ref="searchCompanyTreeRef"/>
            </el-form-item>
            <el-form-item label="当前工资标准：">
              {{formalSalaryStr}}
            </el-form-item>
            <el-form-item
            label="社 保 停 缴："
            prop="insuranceStop">
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
            prop="fundStop">
              <el-radio-group v-model="moveForm.fundStop">
                <el-radio :label= "1">是</el-radio>
                <el-radio :label= "0">否</el-radio>
                <el-radio :label= "2" >无公积金</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="公积金缴纳至："
            prop="fundDate"
            v-if="moveForm.fundStop===1">
              <el-date-picker
                v-model="moveForm.fundDate"
                type="month"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item
            label="工资结算至："
             prop="salaryDate">
              <el-date-picker
                v-model="moveForm.salaryDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="其 他 费 用："
            prop="otherCost">
              <el-input type="textarea" v-model.trim="moveForm.otherCost"></el-input>
            </el-form-item>
            <el-form-item label="休 假 情 况：" >
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
            prop="relieveLaborRelation">
              <el-radio-group v-model="moveForm.relieveLaborRelation">
                <el-radio :label= "1">已解除</el-radio>
                <el-radio :label= "0">未解除</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
            prop="relieveLaborDate"
            label="解 除 日 期：" v-if="moveForm.relieveLaborRelation===1" >
              <el-date-picker
                v-model="moveForm.relieveLaborDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="其 他 说 明：">
              <el-input type="textarea" v-model="moveForm.remark"></el-input>
            </el-form-item>
          </div>
          <div v-if="moveForm.MoveType == 1">
          <el-form
          label-width="125px"
          :model="movePostForm"
           ref="movePostForm"
           :rules ='movePostRules'>
               <el-form-item
             prop="transferDate"
             label="调 动 日 期：">
              <el-date-picker
                v-model="movePostForm.transferDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item
            label="调 入 部 门："
            prop="toDeptId"
            >
            <search-dept-tree
            :orgDatas = "deptOrgDatas"
            @selectChange="selectDeptChange"
            />
            </el-form-item>
            <el-form-item label="新 岗 位："
            prop="newPostName"
            >
              <el-input v-model="movePostForm.newPostName" placeholder="请填写新的岗位"></el-input>
            </el-form-item>
            <el-form-item label="其 他 说 明：">
              <el-input type="textarea" v-model="movePostForm.remark" placeholder="请填写说明"></el-input>
            </el-form-item>
           </el-form>
          </div>
        </el-form>
      <span slot="footer" class="dialog-footer" v-if="moveForm.MoveType == 0">
        <el-button @click="moveVisible = false" class="false" size="mini">取 消</el-button>
        <el-button type="primary" @click="transferSave('moveForm')" size="mini">确 定</el-button>
      </span>
      <span slot="footer" class="dialog-footer" v-else>
        <el-button @click="closeMoveForm" class="false" size="mini">取 消</el-button>
        <el-button type="primary" @click="transferPostSave('movePostForm')" size="mini">确 定</el-button>
      </span>
    </el-dialog>
    <!--转正diaolog 弹窗-->
    <el-dialog
      :visible.sync="updateRegularVisible"
      title="转正"
      width="900px"
      v-draggable
      >
      <el-form
      :model="regularForm"
      ref="regularFormRef"
      label-width="150px">
      <el-row>
        <el-col :span="12">
        <el-form-item label="试用期开始时间：">
          {{regularForm.probationBeginTime}}
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item
        label="试用期结束时间：">
          {{regularForm.probationEndTime}}
        </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label-width="100px"
            label="转正时间:"
            prop="date"
            :rules="{ required: true, message: '转正日期不能为空', trigger:'change'}"
          >
            <el-date-picker
              v-model="regularForm.date"
              type="date"
              placeholder="选择日期"
              >
          </el-date-picker>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row>
          <div class="div-row_box mt-20 clearfix">
            <salary-pure ref="salaryPureRef"  v-if="updateRegularVisible" :salaryData="salaryForm"/>
          </div>
      </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="updateRegularVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="sureUpdateRegular" size="mini">确 定</el-button>
      </span>
    </el-dialog>

    <!--报到dialog弹窗-->
    <el-dialog
      title="报到"
      width="900px"
      :visible.sync="updateStatusVisible"
      >
      <el-form
      :model="transferRegularForm"
      label-width="130px"
      ref="transferRegularFormRef"
      :rules="transferRegularRules"
      >
      <el-row>
      <el-col :span="12">
        <el-form-item
        prop="graduationDate"
        label="毕业时间:">
            <el-date-picker
              v-model="transferRegularForm.graduationDate"
              @change="getTryStartDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
        </el-form-item>
      </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
         <el-form-item
         prop="tryStartDate"
         label="试用期开始时间:">
          <el-date-picker
            v-model="transferRegularForm.tryStartDate"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
            <el-form-item
            prop="tryEndDate"
            label="试用期结束时间:">
              <el-date-picker
                v-model="transferRegularForm.tryEndDate"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      </el-form>
      <div class="clearfix">
          <div class="div-row_box mt-20 clearfix">
            <salary-all
            v-if="updateStatusVisible"
            ref="salaryAllRef"
            :salaryForm="salaryForm"
            :trySalaryForm="trySalaryForm"
            />
          </div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="updateStatusVisible = false; showSalaryMethods =false" size="mini">取 消</el-button>
          <el-button type="primary" @click="sureUpdateStatus" size="mini">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 离职申请 -->
    <el-dialog title="离职申请" :visible.sync="LeaveVisible" width="500px">
      <div class="module-opera">
        <el-form
          :model="LeaveForm"
          label-width="130px"
          :rules="leaveFormRules"
          ref="LeaveForm"
          class="dialog-form">
          <el-form-item label="申请日期：" prop="dimissionDate" >
            <el-date-picker
              v-model="LeaveForm.dimissionDate"
              type="date"
              placeholder="请选择">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="申请原因：" prop="dimissionReason">
            <el-select v-model="LeaveForm.dimissionReason" placeholder="请选择">
              <el-option
                v-for="item in reasonOption"
                :key="item.id"
                :label="item.codeText"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="userMarketing == 1" prop="sureLeavetime" label="确定离职日期：">
            <el-date-picker
              v-model="LeaveForm.sureLeavetime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item v-if="userMarketing == 1" label="离 职 类 型：" prop="reson">
            <el-select v-model="LeaveForm.reson" style="width:100%" placeholder="请选择">
              <el-option
                v-for="item in leaveOption"
                :key="item.id"
                :label="item.codeText"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备　注：">
            <el-input type="textarea" v-model="LeaveForm.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="LeaveVisible = false" class="false" size="mini">取 消</el-button>
        <el-button type="primary" @click="leaveSave('LeaveForm')" size="mini">保 存</el-button>
      </span>
    </el-dialog>

    <!--退休返聘dialog-->
    <el-dialog
      title="退休返聘"
      :visible.sync="retireVisible"
      width="500px"
      v-draggable
      >
      <div class="retire-from_box">
        <el-form
        :model="retireForm"
        :rules="onJobRules"
        label-width="110px"
        ref="onJobFrom"
        >
          <el-form-item
            label="退休时间:"
            prop="retireDate"
            >
          <el-date-picker
          v-model="retireForm.retireDate"
            :disabled="continueVis"
            type="date"
            placeholder="退休时间">
          </el-date-picker>
          </el-form-item>
          <el-form-item
          label="返聘开始时间:"
          prop="reemployStart"
          >
            <el-date-picker
            type="date"
            v-model="retireForm.reemployStart"
            >

            </el-date-picker>
          </el-form-item>
          <el-form-item
          prop="reemployEnd"
          label="返聘结束时间:"
          >
            <el-date-picker
            type="date"
            v-model="retireForm.reemployEnd"
            >

            </el-date-picker>
          </el-form-item>
          <el-form-item
          label="备注:"
          >
          <el-input
            type="textarea"
            :rows="2"
            placeholder="填写备注"
          v-model="retireForm.reemployRemark">
          </el-input>
        </el-form-item>
        </el-form>
      </div>
     <span slot="footer" class="dialog-footer">
          <el-button @click="retireVisible = false" class="false" size="mini">取 消</el-button>
          <el-button type="primary" @click="saveRetired" size="mini">保 存</el-button>
          <el-button type="primary" size="mini" @click="sureRetired">完成返聘</el-button>
      </span>
    </el-dialog>

    <!--返聘详情-->
    <el-dialog
      title="返聘详情"
      :visible.sync="retireDetail"
      width="400px"
      v-draggable
      >
        <div class="retire-from_box">
        <el-form
        :model="retireForm"
        label-width="110px"
        >
          <el-form-item
            label="退休时间:"
            prop="retireDate"
            >
            {{retireForm.retireDate}}
          </el-form-item>
          <el-form-item
          label="返聘开始时间:"
          prop="reemployStart"
          >
          {{retireForm.reemployStart}}
          </el-form-item>
          <el-form-item
          prop="reemployEnd"
          label="返聘结束时间:"
          >
            {{retireForm.reemployEnd}}
          </el-form-item>
          <el-form-item
          label="备注:"
          >
          {{retireForm.reemployRemark}}
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!--交接-->
    <el-dialog
      title="交接"
      :visible.sync="joinVisible"
      width="500px">
        <div class="module-opera">
          <el-form :model="joinForm" label-width="130px" ref="joinForm" class="dialog-form">
            <el-form-item label="工资：">
              <el-date-picker
                v-model="joinForm.salaryDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="补贴：">
              <el-date-picker
                v-model="joinForm.subsidyDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="社保：">
              <el-date-picker
                v-model="joinForm.insuranceDate"
                type="month"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="公积金：">
              <el-date-picker
                v-model="joinForm.fundDate"
                type="month"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="人事档案及户口：">
              <el-input v-model="joinForm.archivesHousehold"></el-input>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input type="textarea" v-model="joinForm.remark"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-checkbox label="工作已移交" v-model="joinForm.workHandover"></el-checkbox>
              <el-checkbox label="纸质及电子档案已移交" v-model="joinForm.archivesHandover"></el-checkbox>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="joinVisible = false" class="false" size="mini">取 消</el-button>
          <el-button type="primary" @click="joinSave" size="mini">保存</el-button>
          <el-button type="primary" @click="joinFinishMsg" size="mini">完成交接</el-button>
        </span>
    </el-dialog>

    <EntryList
      @handleColse="entryVisible = false"
      :dialogVisible="entryVisible" :entryDatas="entryDatas">
    </EntryList>
   <!--选择显示字段-->
  </div>
</template>
<script>
import personnalApi from 'api/personnal'
import commonApi from 'api/common'
import { returnFloat, timeZeroToString } from 'assets/js/common'
import Pagination from 'components/Pagination'
import EntryList from 'components/EntryList'
import { getbaseStatus,
  getfilterInsuranceStatus,
  getfilterRelieveStatus,
  getWorkStaue, getfilternature } from 'assets/js/filters'
import SalaryPure from 'components/SalaryAssembly/pure-salary.jsx'
import SalaryAll from 'components/SalaryAssembly/all-salary.jsx'
import SearchDeptTree from 'components/SearchDeptTree'
import { getToken, setToken } from 'assets/js/util'
import { mapGetters, mapMutations } from 'vuex'
import { getTransfer, getPostTransfer, getUserInfoForTramsfer } from 'static/api/verify/transfer/transfer'
import { getEntryList } from 'static/api/recruit/accept/accept'
import { salaryStandarJson } from 'utils/config'
import { salaryParams } from 'assets/js/mixins'
import { getExmine } from 'assets/js/exmine'
import { checkDetail } from 'static/api/recruit/entry/entry'
import { getSalaryDeatil } from 'static/api/setting/index'
// import { saveSalaryStructure } from 'static/api/setting/index'
import { debounce } from 'lodash'
const pageMsg = {
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 20, 50],
  total: 0
}
let initMoveForm = {
  MoveType: 0,
  transferDate: '',
  orgId: '',
  toCompanyId: '',
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
let orgDatas = {
  filterName: '',
  orgId: '',
  grayId: '',
  dataTree: [],
  showTree: false
}
export default {
  mixins: [salaryParams],
  data () {
    let validateTryTime = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请填写试用期开始时间'))
      } else if (new Date(this.transferRegularForm.tryStartDate) <= new Date(this.transferRegularForm.graduationDate)) {
        callback(new Error('试用期开始时间不能早于毕业时间'))
      } else {
        callback()
      }
    }
    let validateEndTime = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请填写试用期结束时间'))
      } else if (new Date(this.transferRegularForm.tryStartDate) > new Date(this.transferRegularForm.tryEndDate)) {
        callback(new Error('试用期结束时间不得早于试用期开始时间'))
      } else {
        callback()
      }
    }
    return {
      companyOrgDatas: Object.assign({}, orgDatas, { bindData: 'company', isLimit: '0' }),
      deptOrgDatas: Object.assign({}, orgDatas, { bindData: 'dept', disabled: true }),
      joinVisible: false,
      retireVisible: false,
      retireDetail: false,
      // 退休返聘form
      retireForm: {
        retireDate: '',
        reemployStart: '',
        reemployEnd: '',
        reemployRemark: '',
        id: ''
      },
      onJobListDatas: [],
      leaveOption: [],
      /* leaveSelect: [
        {value: 1, label: '公司提出离职'},
        {value: 2, label: '员工提出离职'},
        {value: 3, label: '公司协商离职'},
        {value: 4, label: '员工协商离职'}
      ], */
      pageMsg: Object.assign({}, pageMsg),
      regularForm: {
        date: '',
        userId: ''
      },
      transferRegularForm: {
        graduationDate: '',
        tryStartDate: '',
        tryEndDate: '',
        userId: ''
      },
      joinForm: {
        id: '',
        salaryDate: '',
        subsidyDate: '',
        insuranceDate: '',
        fundDate: '',
        archivesHousehold: '',
        remark: '',
        archivesHandover: '',
        workHandover: '',
        userId: '',
        status: ''
      },
      updateStatusVisible: false,
      updateRegularVisible: false,
      salaryForm: this.deepClone(salaryStandarJson),
      trySalaryForm: this.deepClone(salaryStandarJson),
      typeAndSalaryForm: {
        candidateType: '1',
        noProbation: false
      },
      moveVisible: false,
      moveForm: Object.assign({}, initMoveForm),
      movePostForm: {
        transferDate: '',
        toDeptId: '',
        newPostName: '',
        remark: ''
      },
      formalSalaryStr: '',
      LeaveVisible: false,
      LeaveForm: {
        dimissionDate: '',
        dimissionReason: '',
        sureLeavetime: '',
        reson: '',
        remark: ''
      },
      /* 申请离职原因 */
      reasonOption: [],
      /* resonSelect: [
        {value: '个人发展', label: '个人发展'},
        {value: '工作环境', label: '工作环境'},
        {value: '薪酬福利', label: '薪酬福利'},
        {value: '家庭原因', label: '家庭原因'},
        {value: '其它原因', label: '其它原因'},
        {value: '退休', label: '退休'}
      ], */
      entryVisible: false,
      entryDatas: [],
      statusSelect: [
        { value: 5, label: '正式员工' },
        { value: 8, label: '离职申请中' },
        { value: 9, label: '离职办理中' },
        { value: 11, label: '调动中' },
        { value: 13, label: '试用' },
        { value: 14, label: '实习' }
      ],
      rowOrgId: '', // 置灰当前部门
      // 选择显示字段
      fieldList: [],
      prop: '',
      order: '',
      options: [],
      userMarketing: '',
      continueVis: false,
      onJobRules: {
        retireDate: { required: true, message: '请选择退休时间', trigger: 'blur' },
        reemployStart: { required: true, message: '请选择返聘开始时间', trigger: 'blur' },
        reemployEnd: { required: true, message: '请选择返聘结束时间', trigger: 'blur' }
      },
      moveFormRules: {
        transferDate: { required: true, message: '请选择调动日期', trigger: 'change' },
        toCompanyId: { required: true, message: '请选择调入公司', trigger: 'change' },
        insuranceStop: { required: true, message: '请选择社保停缴情况', trigger: ['change', 'blur'] },
        insuranceDate: { required: true, message: '请选择社保停缴截止日', trigger: 'change' },
        fundStop: { required: true, message: '请选择公积金停缴情况', trigger: ['change', 'blur'] },
        fundDate: { required: true, message: '请选择公积金停缴截止日', trigger: 'change' },
        salaryDate: { required: true, message: '请选择工资结算日', trigger: 'change' },
        otherCost: { required: true, message: '请填写其他费用', trigger: ['blur', 'change'] },
        relieveLaborRelation: { required: true, message: '请选择劳动关系情况', trigger: 'change' },
        relieveLaborDate: { required: true, message: '请选择劳动关系解除日期', trigger: 'change' }
      },
      movePostRules: {
        transferDate: { required: true, message: '请选择调动日期', trigger: 'change' },
        toDeptId: { required: true, message: '请选择调入公司', trigger: 'change' },
        newPostName: { required: true, message: '请填写新岗位', trigger: 'blur' }
      },
      leaveFormRules: {
        dimissionDate: {
          required: true, message: '请选择离职日期', trigger: 'change', type: 'date'
        },
        dimissionReason: {
          required: true, message: '请选择离职原因', trigger: 'change'
        },
        reson: {
          required: true, message: '请选择离职类型', trigger: 'change'
        },
        sureLeavetime: {
          required: true, message: '请选择确定离职日期', trigger: 'change', type: 'date'
        }
      },
      transferRegularRules: {
        graduationDate: {
          required: true, message: '请选择毕业时间', trigger: 'change'
        },
        tryStartDate: {
          required: true, validator: validateTryTime, trigger: 'change'
        },
        tryEndDate: {
          required: true, validator: validateEndTime, trigger: 'change'
        }
        // tryEndDate tryStartDate graduationDate
      },
      baodaoId: '',
      baodaoName: '',
      bitchMove: false,
      showSalaryMethods: false
    }
  },
  computed: {
    ...mapGetters(['getPersonnalBaseSearchArr', 'getPersonBaseClick', 'getIsDel', 'getDeepSearchOptions', 'getChooseCheck', 'getClickType']),
    permission () {
      return getExmine().infoBase
    },
    baseParams () {
      return {
        page: this.pageMsg.currentPage,
        size: this.pageMsg.pageSize,
        dataType: 3,
        keyword: this.getPersonnalBaseSearchArr.keyword,
        status: this.getPersonnalBaseSearchArr.status,
        entryDateStart: this.getPersonnalBaseSearchArr.entryDateStart ? timeZeroToString(this.getPersonnalBaseSearchArr.entryDateStart) : '',
        entryDateEnd: this.getPersonnalBaseSearchArr.entryDateEnd ? timeZeroToString(this.getPersonnalBaseSearchArr.entryDateEnd) : '',
        // orgId: this.baseForm.orgName.split(',')[0]
        searchOrgIds: this.getPersonnalBaseSearchArr.searchOrgIds ? this.getPersonnalBaseSearchArr.searchOrgIds : [],
        prop: this.prop,
        order: this.order,
        options: this.getDeepSearchOptions
      }
    },
    currentRouteName () {
      return this.$route.name
    }
  },
  methods: {
    ...mapMutations({
      setDelType: 'SET_ACCEPT_IS_DELETE'
    }),
    handleResult (data, type) {
      const { ssId, probationSsId, otherSsId, postId, probationPostId, mlist } = data.result
      // const { ssId, probationSsId, postId, probationPostId, mlist } = data.result
      const salaryMlist = mlist.filter(x => x.type === 1)
      const tryMlist = mlist.filter(x => x.type === 2)
      if (ssId) {
        this.salaryForm.selecteSalarydOptions = ssId.split(',').map(Number)
        this.salaryForm.selectOtherOptions = otherSsId.split(',').map(Number)
        this.salaryForm.mlist = salaryMlist
      }
      if (postId) {
        const numbers = data.result.postId.split(',').map(Number)
        this.salaryForm.postArr = numbers
        this.salaryForm.optionArr = numbers[0]
      }
      if (probationSsId && type === 'report') {
        const probationArr = Array.from(probationSsId.split(',')).map(Number)
        this.trySalaryForm.selecteSalarydOptions = probationArr
        this.trySalaryForm.selectOtherOptions = otherSsId.split(',').map(Number)
        this.trySalaryForm.mlist = tryMlist
      }
      if (probationPostId && type === 'report') {
        const numbers1 = data.result.probationPostId.split(',').map(Number)
        this.trySalaryForm.postArr = numbers1
        this.trySalaryForm.optionArr = numbers1[0]
      }
    },
    _getNewSalaryDetail (userId, type) {
      const detailParms = {
        userId
        // deleteTag: 5
      }
      getSalaryDeatil(detailParms).then(data => {
        this.handleResult(data, type)
      })
    },
    selectable (row, index) {
      return row.status === 5 || row.status === 13 || row.status === 14 || row.status === 7 || row.status === 16
    },
    selectionChange (selection) {
      this.$bus.$emit('bitchArr', selection)
    },
    selectAll (selection) {
      this.$bus.$emit('bitchArr', selection)
    },
    // 关闭调动
    closeMoveForm () {
      this.$refs.moveForm.resetFields()
      this.moveVisible = false
    },
    // 获取员工休假情况
    _getUserInfoForTramsfer (userId) {
      getUserInfoForTramsfer(userId).then(data => {
        if (data.result) {
          this.moveForm.vacationDaysAll = data.result.vacationDaysAll
          this.moveForm.vacationDaysUsable = data.result.vacationDaysUsed
        }
      })
    },
    // 返聘详情
    showRetiredDetail (row) {
      this.retireDetail = true
      this.retireForm.id = row.id
      this._getRetiredDetail(row.id)
    },
    // 退休返聘操作
    retiredRemploy (row, type) {
      if (type === 'continue') this.continueVis = true
      this.retireVisible = true
      this.retireForm.id = row.id
      this._getRetiredDetail(row.id)
    },
    _getRetiredDetail (id) {
      personnalApi.getRetireDetail(id).then(data => {
        if (data.result) {
          this.retireForm.retireDate = data.result.retireDate
          this.retireForm.reemployStart = data.result.reemployStart
          this.retireForm.reemployEnd = data.result.reemployEnd
          this.retireForm.reemployRemark = data.result.reemployRemark
        }
      })
    },
    // 退休返聘保存
    saveRetired () {
      let retiredReemployParams = {
        retireDate: timeZeroToString(this.retireForm.retireDate),
        reemployStart: timeZeroToString(this.retireForm.reemployStart),
        reemployEnd: timeZeroToString(this.retireForm.reemployEnd),
        reemployRemark: this.retireForm.reemployRemark,
        id: this.retireForm.id
      }
      personnalApi.saveRetireReemploy(retiredReemployParams).then(data => {
        this.$message.success('保存成功')
        setTimeout(() => {
          this.retireVisible = false
          this._getOnJobList()
        }, 200)
      })
    },
    sureRetired () {
      this.$refs['onJobFrom'].validate((valid) => {
        if (valid) {
          let retiredReemployParams = {
            retireDate: timeZeroToString(this.retireForm.retireDate),
            reemployStart: timeZeroToString(this.retireForm.reemployStart),
            reemployEnd: timeZeroToString(this.retireForm.reemployEnd),
            reemployRemark: this.retireForm.reemployRemark,
            id: this.retireForm.id
          }
          personnalApi.sureRetireReemploy(retiredReemployParams).then(data => {
            this.$message.success('保存成功')
            setTimeout(() => {
              this.retireVisible = false
              this._getOnJobList()
            }, 200)
          })
        }
      })
    },
    _getOnJobList () {
      // this.baseParams.searchOrgIds = this.baseParams.searchOrgIds === '' ? this.baseParams.searchOrgIds = [] : this.baseParams.searchOrgIds
      // if (this.baseParams.options.length <= 0) {
      //   let deepSearchArr = getToken('queryOptions')
      //   let options = []
      //   if (deepSearchArr.length > 0) {
      //     deepSearchArr.forEach(item => {
      //       if (item.width) {
      //         options.push({
      //           field: item.width,
      //           op: item.op,
      //           value: item.value,
      //           searchFlag: item.searchFlag
      //         })
      //       }
      //     })
      //     console.log('job-options', options)
      //     this.baseParams.options = options
      //   }
      // }
      // console.log('baseParams', this.baseParams)
      personnalApi.getRecruitList(this.baseParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.onJobListDatas = data.result.records
          }
          // console.log('before', this.baseParams.options)
          // setToken('queryOptions', this.baseParams.options)
          this.pageMsg.total = data.result.total
        }
      })
    },
    handleSizeChange (pageSize) {
      this.pageMsg.currentPage = 1
      this.pageMsg.pageSize = pageSize
      this._getOnJobList()
    },
    handleCurrentChange (currentPage) {
      this.pageMsg.currentPage = currentPage
      this._getOnJobList()
    },
    // 详情
    lookMsg (row) {
      this.$router.push({ name: '员工基本信息劳动个人档案',
        params: {
          baseId: row.id,
          status: row.status ? row.status : 'null'
        },
        query: {
          come: this.$route.name
        } })
      setToken('updateName', row.name)
    },
    // 编辑
    editMsg (row) {
      this.$router.push({ name: 'BaseEditLabor',
        params: {
          baseId: row.id,
          status: row.status ? row.status : 'null'
        } })
    },
    selectCompanyChange (orgId) {
      this.moveForm.toCompanyId = orgId
    },
    selectDeptChange (orgId) {
      this.movePostForm.toDeptId = orgId
    },
    // 根据userId查询薪资
    /* _getDetail () {
      getUserCurrentSalary(this.moveForm.userId).then(data => {
          if (data.result) {
            this.formalSalaryStr = data.result
          }
      })
    }, */
    // 确认离职
    leaveSureMsg (row) {
      this.$confirm('确认所有手续已办结，完成离职', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let preload = {
          dimissionStatus: 10,
          userId: row.id
        }
        personnalApi.leaveSure(preload).then(res => {
          this.$message.success('确认离职成功')
          setTimeout(() => {
            this._getOnJobList()
          }, 400)
        })
      }).catch(() => {})
    },
    // 交接保存
    joinMsg (row) {
      this.joinVisible = true
      personnalApi.leaveDataGet(row.id).then(data => {
        if (data.result) {
          this.leaveDatas = data.result
          this.joinForm.id = data.result.id
          this.joinForm.salaryDate = data.result.salaryDate
          this.joinForm.subsidyDate = data.result.subsidyDate
          this.joinForm.insuranceDate = data.result.insuranceDate
          this.joinForm.fundDate = data.result.fundDate
          this.joinForm.archivesHousehold = data.result.archivesHousehold
          this.joinForm.remark = data.result.remark
          this.joinForm.userId = data.result.userId
          if (data.result.archivesHandover === 1) {
            this.joinForm.archivesHandover = true
          } else {
            this.joinForm.archivesHandover = ''
          }
          if (data.result.workHandover === 1) {
            this.joinForm.workHandover = true
          } else {
            this.joinForm.workHandover = ''
          }
        }
      })
    },
    joinSave () {
      let joinFormData = {
        status: 0,
        archivesHousehold: this.joinForm.archivesHousehold,
        fundDate: this.joinForm.fundDate ? timeZeroToString(this.joinForm.fundDate) : '',
        id: this.joinForm.id,
        insuranceDate: this.joinForm.insuranceDate ? timeZeroToString(this.joinForm.insuranceDate) : '',
        remark: this.joinForm.remark,
        salaryDate: this.joinForm.salaryDate ? timeZeroToString(this.joinForm.salaryDate) : '',
        subsidyDate: this.joinForm.subsidyDate ? timeZeroToString(this.joinForm.subsidyDate) : '',
        userId: this.joinForm.userId,
        archivesHandover: this.joinForm.archivesHandover === true ? 1 : 0,
        workHandover: this.joinForm.workHandover === true ? 1 : 0
      }
      personnalApi.leaveDataSave(joinFormData).then(data => {
        this.joinVisible = false
        this.$refs.joinForm.resetFields()
        this.$message.success('保存成功')
        setTimeout(() => {
          this._getOnJobList()
        }, 200)
      })
    },
    // 交接完成
    joinFinishMsg () {
      let joinFormData = {
        archivesHousehold: this.joinForm.archivesHousehold,
        fundDate: this.joinForm.fundDate ? timeZeroToString(this.joinForm.fundDate) : '',
        id: this.joinForm.id,
        insuranceDate: this.joinForm.insuranceDate ? timeZeroToString(this.joinForm.insuranceDate) : '',
        remark: this.joinForm.remark,
        salaryDate: this.joinForm.salaryDate ? timeZeroToString(this.joinForm.salaryDate) : '',
        subsidyDate: this.joinForm.subsidyDate ? timeZeroToString(this.joinForm.subsidyDate) : '',
        userId: this.joinForm.userId
      }
      if (this.joinForm.archivesHandover === true) {
        joinFormData.archivesHandover = 1
      } else if (this.joinForm.archivesHandover === false) {
        joinFormData.archivesHandover = 0
      }
      if (this.joinForm.workHandover === true) {
        joinFormData.workHandover = 1
      } else if (this.joinForm.workHandover === false) {
        joinFormData.workHandover = 0
      }
      if (this.joinForm.archivesHousehold === '' || this.joinForm.fundDate === '' || this.joinForm.insuranceDate === '' || this.joinForm.salaryDate === '' || this.joinForm.subsidyDate === '' || this.joinForm.archivesHandover === 0 || this.joinForm.workHandover === 0) {
        this.$confirm('还有交接项未完成，是否确定归档？', '提示', {
          confirmButtonText: '立即归档',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          joinFormData.status = 1 // 本来是 0 现在改成 1  1712281652
          personnalApi.leaveDataSave(joinFormData).then(data => {
            this.joinVisible = false
            this.$message.success('归档成功', 'success')
            setTimeout(() => {
              this.$refs.joinForm.resetFields()
              this._getOnJobList()
            }, 400)
          })
        }).catch(() => {})
      } else {
        this.$confirm('所有交接已完成，确定归档', '提示', {
          confirmButtonText: '立即归档',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          joinFormData.status = 1
          personnalApi.leaveDataSave(joinFormData).then(data => {
            this.joinVisible = false
            this.$message.success('归档成功')
            setTimeout(() => {
              this.$refs.joinForm.resetFields()
              this._getOnJobList()
            }, 400)
          })
        }).catch(() => {})
      }
    },
    // 录入记录
    entryList (row) {
      this.entryVisible = true
      getEntryList(row.idCardNumber).then(res => {
        if (res.result) {
          this.entryDatas = res.result
        }
      })
    },
    // 获取试用期时间====毕业时间+1天
    getTryStartDate (value) {
      value = timeZeroToString(value)
      let newDate = ''
      value.split('-').forEach((item, index) => {
        newDate += (index === 2 ? Number(item) + 1 : item) + (index === 2 ? '' : '-')
      })
      this.transferRegularForm.tryStartDate = this.addOneDay(newDate)
    },
    addOneDay (date) {
      let newDay = date.split('-')
      let newDate = ''
      newDay.forEach((item, index) => {
        if (index === 2 && item === '32') {
          if (newDay[1] !== '12') {
            newDay[1] = Number(newDay[1]) + 1
            newDay[2] = '01'
          } else {
            newDay[0] = Number(newDay[0]) + 1
            newDay[1] = '01'
            newDay[2] = '01'
          }
        }
      })
      newDate = newDay[0] + '-' + newDay[1] + '-' + newDay[2]
      return newDate
    },
    setReport (row) {
      this.showSalaryMethods = true
      this.baodaoId = row.id
      this.baodaoName = row.name
      this.$store.commit('SET_PROBATION', '')
      // this.$store.commit('SET_INFO_BY_ORG_ID', row.orgId)
      commonApi.getOrgDetail(row.orgId).then(res => {
        this.$store.commit('SET_HRBELONGID', res.result.hrBelongId ? res.result.hrBelongId : res.result.companyId)
      })
      this.transferRegularForm.userId = row.id
      this.updateStatusVisible = true
      this.salaryForm = this.deepClone(salaryStandarJson)
      this.trySalaryForm = this.deepClone(salaryStandarJson)
      this._getNewSalaryDetail(row.id, 'report')
      this.transferRegularForm.graduationDate = ''
      this.transferRegularForm.tryStartDate = ''
      this.transferRegularForm.tryEndDate = ''
      this.salaryForm = this.deepClone(salaryStandarJson)
      this.trySalaryForm = this.deepClone(salaryStandarJson)
      setTimeout(() => {
        // this.$refs.selectSalaryRef.resetValidate()
        this.$store.commit('SET_PROBATION', 'clear')
        this.$refs.salaryAllRef.commonClearSalaryValidate()
      })
    },
    // 确认报到
    sureUpdateStatus () {
      this.$refs.transferRegularFormRef.validate(valid => {
        if (valid && this.$refs.salaryAllRef.commonCheckSalaryValidate()) {
          let regularSalaryParams = {
            type: 175,
            userId: this.transferRegularForm.userId,
            isProbation: 1,
            effectiveDate: timeZeroToString(this.transferRegularForm.tryStartDate)
          }
          let updateParams = {
            graduationDate: timeZeroToString(this.transferRegularForm.graduationDate),
            probationBeginTime: timeZeroToString(this.transferRegularForm.tryStartDate),
            probationEndTime: timeZeroToString(this.transferRegularForm.tryEndDate),
            userId: this.transferRegularForm.userId,
            status: 13,
            userSalaryMonth: Object.assign({}, this._getTrySalaryParams(), regularSalaryParams)
          }
          personnalApi.updateUserStatus(updateParams).then(data => {
            // saveSalaryStructure(Object.assign({}, this._getTrySalaryParams(), regularSalaryParams))
            this.baodaoContractId = data.result.contractId
            if (this.baodaoContractId) {
              this.$confirm('报到成功！是否现在立即签订' + this.baodaoName + '劳动合同？', '提示', {
                confirmButtonText: '立即签订',
                cancelButtonText: '稍后签订',
                type: 'warning'
              }).then(() => {
                setTimeout(() => {
                  this.$router.push({
                    name: '合同编辑',
                    params: {
                      contractId: this.baodaoContractId,
                      type: 'edit'
                    }
                  })
                }, 500)
              }).catch(() => {
                this._getOnJobList()
              })
            }
            this.updateStatusVisible = false
          })
        }
      })
    },

    // 转正
    setRegeular (row) {
      commonApi.getOrgDetail(row.orgId).then(res => {
        this.$store.commit('SET_HRBELONGID', res.result.hrBelongId ? res.result.hrBelongId : res.result.companyId)
      })
      checkDetail(row.id).then(data => {
        this.regularForm.probationBeginTime = data.result.probationBeginTime
        this.regularForm.probationEndTime = data.result.probationEndTime
        // this.$store.commit('SET_INFO_BY_ORG_ID', row.orgId)
        this.regularForm.userId = row.id
        this.updateRegularVisible = true
        this._getNewSalaryDetail(row.id, 'regular')
        console.log('salaryStandarJson', salaryStandarJson)
        this.salaryForm = this.deepClone(salaryStandarJson)
        this.trySalaryForm = this.deepClone(salaryStandarJson)
        setTimeout(() => {
          this.$refs.salaryPureRef.resetSalaryValidate()
        })
        this.regularForm.date = ''
      })
    },
    // 转正确认
    sureUpdateRegular () {
      this.typeAndSalaryForm.noProbation = true
      this.$refs.regularFormRef.validate(valid => {
        if (valid && this.$refs.salaryPureRef.checkSalaryValidate()) {
          let regularSalaryParams = {
            type: 176,
            userId: this.regularForm.userId,
            effectiveDate: timeZeroToString(this.regularForm.date)
          }
          let regularParams = {
            positiveTime: timeZeroToString(this.regularForm.date),
            userId: this.regularForm.userId,
            status: 5,
            userSalaryMonth: Object.assign({}, this._getSalaryParams(), regularSalaryParams)
          }
          personnalApi.updateUserStatus(regularParams).then(data => {
            // saveSalaryStructure(Object.assign({}, this._getSalaryParams(), regularSalaryParams)).then(res => {
            this.$message.success('转正操作成功')
            this.updateRegularVisible = false
            setTimeout(() => {
              this._getOnJobList()
            }, 200)
            // })
          })
        }
      })
    },
    // 调动
    getDeptMoveValue (value) {
      if (value === 1) {
        this.deptOrgDatas.orgId = ''
        this.deptOrgDatas.grayId = this.rowOrgId
        this.deptOrgDatas.filterName = ''
        this.movePostForm.remark = ''
        this.movePostForm.newPostName = ''
        this.movePostForm.transferDate = ''
        this.movePostForm.toDeptId = ''
        this.$refs.movePostForm.resetFields()
      } else if (value === 0) {
        this.companyOrgDatas.orgId = ''
        this.companyOrgDatas.filterName = ''
        this.$refs.moveForm.clearValidate()
      }
    },
    transferMsg (row) {
      this.rowOrgId = row.orgId
      this._getUserInfoForTramsfer(row.id)
      this.moveForm = Object.assign({}, initMoveForm)
      this.moveVisible = true
      this.formalSalaryStr = row.standard
      this.companyOrgDatas.orgId = ''
      this.moveForm.userId = row.id
      this.moveForm.orgId = row.orgId
      this.moveForm.status = row.status
      this.companyOrgDatas.filterName = ''
      setTimeout(() => {
        this.$refs.moveForm.clearValidate()
        this.$refs.searchCompanyTreeRef.clearSelectTree()
        /* this.$refs.moveForm.resetFields() */
      }, 200)
      this.$store.commit('SET_USER_ORGID', row.orgId)
    },
    // 公司间调动
    transferSave: debounce(function (e) {
      this.$refs.moveForm.validate((valid) => {
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
            toCompanyId: this.companyOrgDatas.orgId,
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
              this.moveVisible = false
              this._getOnJobList()
            }, 400)
          })
        }
      })
    }, 500),
    // 部门间调动
    transferPostSave: debounce(function (e) {
      this.$refs.movePostForm.validate((valid) => {
        if (valid) {
          let postParams = {
            newPostName: this.movePostForm.newPostName,
            remark: this.movePostForm.remark,
            toDeptId: this.deptOrgDatas.orgId,
            operator: getToken('loginId'),
            transferDate: this.movePostForm.transferDate ? timeZeroToString(this.movePostForm.transferDate) : '',
            userId: this.moveForm.userId
          }
          getPostTransfer(postParams).then(data => {
            this.$message.success('操作成功')
            setTimeout(() => {
              this._getOnJobList()
              this.$store.commit('SET_SINGLE_CHECKED_ORGID', '')
            }, 400)
            setTimeout(() => {
              this.moveVisible = false
              this.movePostForm = {
                transferDate: '',
                toDeptId: '',
                newPostName: '',
                remark: ''
              }
            }, 400)
          })
        }
      })
    }, 500),
    // 离职申请
    leaveMsg (row) {
      this.userMarketing = row.isMarketing
      this.LeaveForm.dimissionDate = ''
      this.LeaveForm.dimissionReason = ''
      this.LeaveForm.sureLeavetime = ''
      this.LeaveForm.reson = ''
      this.LeaveForm.remark = ''
      this.LeaveVisible = true
      let LeaveDate = {
        dimissionStatus: 8,
        userId: row.id
      }
      this.LeaveDateForm = LeaveDate
    },
    leaveSave (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.LeaveDateForm.dimissionDate = this.LeaveForm.dimissionDate ? timeZeroToString(this.LeaveForm.dimissionDate) : ''
          this.LeaveDateForm.dimissionReason = this.LeaveForm.dimissionReason
          this.LeaveDateForm.remark = this.LeaveForm.remark
          if (this.userMarketing === 1) {
            this.LeaveDateForm.dimissionDateComfirmed = timeZeroToString(this.LeaveForm.sureLeavetime)
            this.LeaveDateForm.dimissionType = this.LeaveForm.reson
          }
          personnalApi.leaveApply(this.LeaveDateForm).then(data => {
            this.LeaveVisible = false
            this.$message.success('离职申请成功')
            setTimeout(() => {
              this._getOnJobList()
            }, 400)
          })
        }
      })
    },
    // 选择显示字段
    chooseMsg () {
      this.$store.commit('SET_CHOOSE_VIS', true)
    },
    // 获取原来选择字段
    _getUserFiled () {
      let preload = {
        userId: getToken('loginId').toString(),
        type: 'user'
      }
      commonApi.listByUserId(preload).then(data => {
        if (data.result) {
          if (data.result) {
            this.fieldList = data.result
            this.$store.commit('SET_CHOOSE_FILELIST', data.result.map(item => item.prop))
          }
        }
        setTimeout(() => {
          this._getOnJobList()
        }, 10)
      })
    },
    // 排序
    sortChange (column, prop, order) {
      if (column && column.prop) {
        let orderColumn = this.fieldList.filter(item => item.prop === column.prop)[0].orderColumn
        this.prop = orderColumn
        this.order = column.order
        this._getOnJobList()
      } else {
        this.order = ''
        this.prop = ''
        this._getOnJobList()
      }
    },
    // 计算算退休年纪还剩多少天 男60,女50 sex 0:女，1:男
    countRetireAge (birthday, sex) {
      if (!birthday) return
      var ageYear = ''
      if (sex === 0) {
        ageYear = Number(birthday.split('-')[0]) + 50 + '-' + birthday.split('-')[1] + '-' + birthday.split('-')[2]
      } else if (sex === 1) {
        ageYear = Number(birthday.split('-')[0]) + 60 + '-' + birthday.split('-')[1] + '-' + birthday.split('-')[2]
      }
      ageYear = new Date(ageYear.replace(/-/g, '/'))
      var days = new Date().getTime() - ageYear.getTime()
      return days / (1000 * 60 * 60 * 24) + 60 >= 0
    },
    /** 获取数字字典**/
    async _getQueryClassList () {
      await commonApi.getSysDic('dimissionType').then(data => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.reasonOption.push(item)
            }
          })
        }
      })
      /* 离职类型 */
      await commonApi.getSysDic('auditDimissionType').then((data) => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.leaveOption.push(item)
            }
          })
        }
      })
    },
    _getSelection () {
      this.$bus.$on('bitchMove', (data, type) => {
        this.bitchMove = data
        if (!data && type === 'bitch' && this.$refs.tableSelects) {
          this.$refs.tableSelects.clearSelection()
        }
      })
    },
    // 设置默认搜索项
    _setDefaultSearch () {
      const params = this.getSearchParams({}, this.currentRouteName + '1')
      const pageMsg1 = params.pageMsg ? JSON.parse(params.pageMsg) : Object.assign({}, pageMsg)
      this.pageMsg = pageMsg1
    },
    _setDefaultLocalData (page) {
      if (page) this.pageMsg.currentPage = 1
      const searchParams = Object.assign({}, this.pageMsg)
      const searchParamsForm = Object.assign({}, { pageMsg: JSON.stringify(searchParams) })
      console.log('searchParamsForm', searchParamsForm)
      this.setSearchParams(searchParamsForm, this.currentRouteName + '1')
    }
  },
  components: {
    Pagination,
    SalaryPure,
    SalaryAll,
    SearchDeptTree,
    EntryList
  },
  watch: {
    getPersonBaseClick (val) {
      if (val && val !== 'created') {
        if (val === 'look') {
          this._setDefaultSearch()
          this._getOnJobList()
        } else {
          this.handleCurrentChange(1)
        }
      }
      this.$store.commit('SET_PERSONNAL_BASE_CLICKED', false)
    },
    getIsDel (val) {
      if (val) {
        this.pageMsg.currentPage = 1
        this._getOnJobList()
      }
      this.setDelType('')
    },
    getDeepSearchOptions (val) {
      if (val) {
        this.baseParams.options = val
        this.handleCurrentChange(1)
      }
    },
    getChooseCheck (value) {
      if (value) {
        this._getUserFiled()
      }
    }
  },
  filters: {
    returnFloat (value) {
      return returnFloat(value)
    },
    filterEmployeeStatus (str) {
      return getbaseStatus(str)
    },
    filterInsuranceStatus (status) {
      return getfilterInsuranceStatus(status)
    },
    filterRelieveStatus (status) {
      return getfilterRelieveStatus(status)
    },
    filterWorkStaue (value) {
      return getWorkStaue(value)
    },
    filternature (str) {
      return getfilternature(str)
    }
  },
  beforeDestroy () {
    this.$bus.$off('bitchMove')
  },
  beforeRouteLeave (to, from, next) {
    if (!to.path.includes('/personnel-information/base')) {
      this._setDefaultLocalData('1')
    } else {
      this._setDefaultLocalData()
    }
    next()
  },
  created () {
    // if (!getToken('queryOptions').length) this._getOnJobList()
    this._getOnJobList()
    this._getUserFiled()
    this.$store.commit('SET_PERSONNAL_BASE_STATUSSELECT', this.statusSelect)
    this._getQueryClassList()
    this._getSelection()
    this._setDefaultSearch()
  }
}
</script>
<style lang="less" scoped>
.try-salary-text{
    font-size:14px;
    margin-left:15px;
  }
  .try-f-left{
    float:left;
  }
  .try-r-left{
    float: left;
    margin-left:10px;
    max-width:200px;
  }
  .el-form-item.mustForm::before {
    left:-2px!important;
  }
  .el-select{width: 100%}
  .change-box .el-form-item{margin-bottom: 20px!important}
  .salary-div{
    span{
      font-size:14px;
      margin:0px 2px;
    }
  }
 /*.dialog-form .el-form-item{margin-bottom: 20px!important;}*/
</style>
