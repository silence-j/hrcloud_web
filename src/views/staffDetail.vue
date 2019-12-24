<template>
<div class="staff-box" style="height: 100%;overflow-y: auto;" >
  <p class="staff-title">
  <span></span><a>中财集团应聘人员登记表</a><span></span>
  </p>
  <div class="content">
    <p class="mean-title">基本信息</p>
    <el-form
    label-width="130px"
    class="mt-50"
    :model="baseInformation"
    :rules="baseInfoRules"
    ref="baseInformation"
    >
    <div class="div-a_row clearfix">
        <div class="div-a_col">
          <el-form-item
                label="姓    名："
               prop="name"
                 >
                 <el-input v-model="baseInformation.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </div>
        <div class="div-a_col two">
          <el-form-item
            label="性  别："
             prop="sex"
            >
             <el-select
              v-model="baseInformation.sex"
              style="width:100%"
              >
             <el-option
                v-for="item in sexOption"
                 :label="item.label"
                  :value="item.value"
                :key="item.index">
               </el-option>
              </el-select>
              </el-form-item>
               </div>
              </div>
                <div class="div-a_row clearfix">
                    <div class="div-a_col">
                      <el-form-item label="出生日期："
                       prop="birthday"
                        :picker-options="{
                        disabledDate (time) {
                          return time.getTime() > Date.now()
                        }
                      }"
                      >
                        <el-date-picker
                          v-model="baseInformation.birthday"
                          type="date"
                          placeholder="请选择出生日期"
                          style="width:100%"
                          >
                        </el-date-picker>
                      </el-form-item>
                    </div>
                  <div class="div-a_col two">
                  <el-form-item
                  label="民    族："
                  prop="nation"
                  >
                  <el-input v-model.trim="baseInformation.nation" placeholder="请填写民族"></el-input>
                </el-form-item>
            </div>
            </div>
            <div class="div-a_row clearfix">
                <div class="div-a_col">
                  <el-form-item label="身份证号：" prop="idCardNumber">
                    <el-input v-model="baseInformation.idCardNumber" placeholder="请填写身份证号"></el-input>
                  </el-form-item>
                </div>
                <div class="div-a_col two">
                  <el-form-item label="政治面貌：" prop="politicsStatus">
                  <el-select
                  v-model="baseInformation.politicsStatus"
                  style="width:100%"
                   placeholder="请填写政治面貌">
                    <el-option
                      v-for="item in polticOption"
                      :label="item.codeText"
                      :value="item.id"
                      :key="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                </div>
               </div>
            <div class="div-a_row clearfix">
              <div class="div-a_col">
                <el-form-item label="婚姻状况：" prop="maritalStatus">
                  <el-select v-model="baseInformation.maritalStatus" filterable placeholder="请选择婚姻状况" style="width:100%;">
                    <el-option
                      v-for="item in marriageOption"
                      :label="item.codeText"
                      :value="item.id"
                      :key="item.id">
                  </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="div-a_col two">
                <el-form-item label="联系电话：" prop="telephone">
                  <el-input
                    v-model="baseInformation.telephone"  placeholder="请填写联系电话"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="div-a_row clearfix borderBox">
              <div class="div-a_col">
                <el-form-item label="身   高：" prop="height">
                  <el-input type="number" min="0" v-model="baseInformation.height"  placeholder="请填写身高"><template slot="append">CM</template></el-input>
                </el-form-item>
              </div>
              <div class="div-a_col two">
                   <el-form-item label="电子邮箱：">
                    <el-input v-model="baseInformation.mail" placeholder="请输入电子邮箱"></el-input>
                  </el-form-item>
              </div>
            </div>
            <div class="div-a_row clearfix mt-20">
              <div class="div-a_col">
                <el-form-item label="毕业时间：" prop="graduationDate">
                  <el-date-picker
                    v-model="baseInformation.graduationDate"
                    type="month"
                    placeholder="请选择毕业时间">
                  </el-date-picker>
                </el-form-item>
              </div>
              <div class="div-a_col two">
                <el-form-item label="资格证书：">
                  <el-input v-model="baseInformation.qualificationCertificate" placeholder="请填写资格证书"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="div-a_row clearfix">
              <div class="div-a_col">
                <el-form-item label="最高学历：" prop="highestEducation">
                  <el-select
                  style="width:100%"
                   v-model="baseInformation.highestEducation" placeholder="请填写最高学历">
                    <el-option
                      v-for="item in eduOption"
                      :label="item.codeText"
                      :value="item.id"
                      :key="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="div-a_col two">
                 <el-form-item label="所学专业：">
                  <el-input v-model="baseInformation.major" placeholder="请填写所学专业"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="div-a_row clearfix borderBox">
              <div class="div-a_col">
                <el-form-item label="毕业院校：" prop="schoolOfGraduation">
                  <el-input v-model="baseInformation.schoolOfGraduation" placeholder="请填写毕业院校"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="div-a_row clearfix mt-20">
              <div class="div-a_col w1050">
                 <el-form-item label="籍    贯：" required>
                <address-select
                  :noLogin="'not'"
                  :area='nativeArea'
                  :colSpan="7"
                  :lineSpan="1"
                  :showZone="true">
                </address-select>
              </el-form-item>
              </div>
            </div>
            <div class="div-a_row clearfix mt-20">
              <div class="div-a_col w1050">
                 <el-form-item label="户籍地址：" required>
                  <address-select :noLogin="'not'"
                   :area="hujiArea" :colSpan="7"
                   :lineSpan="1" :showZone="true">
                   </address-select>
                </el-form-item>
              </div>
            </div>
            <div class="div-a_row clearfix mt-20">
              <div class="div-a_col w1050">
                 <el-form-item label="详细地址：">
                  <el-input placeholder="请填写详细地址" :number="true" v-model="hujiForm.address"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="div-a_row clearfix mt-20">
              <div class="div-a_col w1050">
                <el-form-item label="档案存放：">
                  <address-select :noLogin="'not'"
                                  ref="adressDown"
                                  :area="archiveArea" :colSpan="7"
                                  :lineSpan="1" :showZone="true">
                  </address-select>
                </el-form-item>
              </div>
            </div>
            <div class="div-a_row clearfix mt-20">
              <div class="div-a_col w1050">
                <el-form-item label="详细地址：">
                  <el-input placeholder="请填写详细地址" :number="true" v-model="archivesAddressForm.address"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="div-a_row clearfix">
                 <div class="div-a_col w1050">
                 <el-form-item label="现 住 址：" required>
                  <address-select :noLogin="'not'" :area='nowArea' :colSpan="7" :lineSpan="1" :showZone="true"></address-select>
                </el-form-item>
              </div>
            </div>
             <div class="div-a_row clearfix borderBox">
              <div class="div-a_col w1030">
                 <el-form-item label="详细地址：" required>
                   <el-input placeholder="请填写详细地址" :number="true" v-model="nowAddressForm.address"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="div-a_row clearfix mt-20">
              <div class="div-a_col">
                 <el-form-item label="当前月薪构成：" prop="monthSalaryForm">
                  <el-input v-model="otherInformation.monthSalaryForm" placeholder="请填写当前月薪构成"></el-input>
                </el-form-item>
              </div>
              <div class="div-a_col two">
                <el-form-item label="当前年薪构成：" prop="yearSalaryForm">
                  <el-input v-model="otherInformation.yearSalaryForm" placeholder="请填写当前年薪构成"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="div-a_row clearfix">
              <div class="div-a_col">
                 <el-form-item label="当前年薪：" prop="yearlySalary">
                  <el-input type="number" min="0" v-model="otherInformation.yearlySalary"  placeholder="请填写当前年薪"><template slot="append">万元</template></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="div-a_row clearfix">
              <div class="div-a_col">
              <el-form-item label="期望年薪：" prop="expectYearSalary">
                <el-input
                type="number"
                min="0"
                @input="changeMaxYearSalary1"
                v-model.number="otherInformation.expectYearSalary"
                placeholder="请填写期年薪"><template slot="append">万元</template></el-input>
              </el-form-item>
              </div>
              <div class="div-a_col line">——</div>
              <div class="div-a_col two">
                <el-form-item label=" ">
                  <el-input type="number"
                    v-model="otherInformation.expectMaxYearSalary"
                    @input="changeMaxYearSalary"
                    placeholder="上限不超过下限2倍">
                    <template slot="append">万元</template>
                  </el-input>
                </el-form-item>
               <span class="tip-span" v-show="tipShow">上限不能超过下限2倍且年薪不得为负数</span>
              </div>
            </div>
    </el-form>
  </div>
  <div class="content">
    <p class="mean-title">健康状况</p>
      <!-- 健康状况(暂时判断) -->
 <el-form
      class="mt-20 health"
      ref="healthRef"
      label-width="300px"
      label-position="left"
      :model="baseInformation">
          <div class="div-a_row clearfix">
          <div class="div-a_col" style="margin-left:70px" v-for="item in baseInformation.healthStatusList" :key="item.code">
           <el-form-item
            :label='item.codeText'
            :key="item.key"
            required
            :rules="{required: true, validator:validatorHealth, trigger: 'change' || 'blur'}">
            </el-form-item>
            <el-form-item
              label=" "
              label-width="20px"
            >
              <el-radio-group v-model="item.status" :disabled="item.enable === 2 ? true  : false">
              <dl class="health-dl">
                <dd>
                <el-radio class="radio"  :label="0">无</el-radio>
                </dd>
                <dd class="mt-20">
                  <el-radio class="radio" :label="1" >有</el-radio>
                  <el-input v-model="item.text" :disabled="item.enable === 2 ? true  : false"
                   placeholder="请输入"
                   v-if="item.status === 1" class="health-text"></el-input>
                </dd>
              </dl>
            </el-radio-group>
            </el-form-item>
          </div>
      </div>
    </el-form>
  </div>
  <div class="content">
    <p class="mean-title">学习简历</p>
    <el-table
        :data="resumeInformation"
        highlight-current-row
        class="mt-20"
        border>
        <el-table-column
          type="index"
          label="序号"
          width="60px"
        >
        </el-table-column>
        <el-table-column
          label="开始年月"
          prop="startDate">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.startDate"
               @focus="getResumeTime(scope.$index)"
            :picker-options="resumeStartOptions"
              type="month"
              placeholder="选择时间">
            </el-date-picker>
          </template>
        </el-table-column>

        <el-table-column
          prop="endDate"
          label="结束年月">
          <template slot-scope="scope">
            <el-date-picker
            :picker-options="resumeEndOptions"
            @focus="getResumeTime(scope.$index)"
              v-model="scope.row.endDate"
              type="month"
              placeholder="选择时间">
            </el-date-picker>
          </template>
        </el-table-column>

        <el-table-column
          prop="school"
          label="学校">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.school"
              placeholder="请填写学校">
            </el-input>
          </template>
        </el-table-column>

        <el-table-column
          prop="major"
          label="专业">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.major"
              placeholder="请填写专业">
            </el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="学历">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.education"
              placeholder="请选择学历">
              <el-option
              v-for="item in SelecteduOption"
              :label="item.codeText"
              :value="item.id"
              :key="item.id">
            </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          v-if="resumeInformation.length>1"
          width="120px"
        >
          <template slot-scope="scope">
            <span @click="delListData(scope.row, scope.$index, resumeInformation, '学历')" class="icon click-active del">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-20 clearfix">
        <div class="r-float"><el-button type="primary" size="small" @click="addEduMsg">新增</el-button></div>
      </div>
  </div>
  <div class="content">
    <p class="mean-title">工 作 简 历</p>
     <el-form label-width="150px">
        <el-form-item required label=" 是否在中财工作过">
            <el-radio-group v-model="baseInformation.inZcBefore">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
        </el-form-item>
      </el-form>
    <el-table
        :data="jobInformation"
        highlight-current-row
         class="mt-20"
        border>
        <el-table-column
          type="index"
          label="序号"
          width="60px"
        >
        </el-table-column>
        <el-table-column
          prop="startDate"
          label="开始年月">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.startDate"
              type="month"
              @focus="getJobTime(scope.$index)"
              placeholder="选择时间">
            </el-date-picker>
          </template>
        </el-table-column>

        <el-table-column
          prop="endDate"
          label="结束年月">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.endDate"
              type="month"
              @focus="getJobTime(scope.$index)"
            :picker-options="jobEndOptions"
              placeholder="选择时间"
              width="200">
            </el-date-picker>
          </template>
        </el-table-column>

        <el-table-column
          prop="workUnit"
          label="工作单位">
          <template slot-scope="scope">
            <el-input v-model="scope.row.workUnit" placeholder="请填写工作单位"></el-input>
          </template>
        </el-table-column>

        <el-table-column
          prop="post"
          label="岗位">
          <template slot-scope="scope">
            <el-input v-model="scope.row.post" placeholder="请填写岗位"></el-input>
          </template>
        </el-table-column>

        <el-table-column
          prop="certifier"
          label="证明人">
          <template slot-scope="scope">
            <el-input v-model="scope.row.certifier" placeholder="请填写证明人"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="证明人电话">
          <template slot-scope="scope">
            <el-input type="number" min='0' v-model="scope.row.telephone" placeholder="请填写证明人电话" ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          v-if="jobInformation.length>1"
          width="120px"
        >
          <template slot-scope="scope">
            <span @click="delListData(scope.row, scope.$index, jobInformation, '工作简历')" class="icon click-active del">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-20 clearfix">
        <div class="r-float"><el-button type="primary" size="small" @click="addWorkMsg">新增</el-button></div>
      </div>
  </div>
  <div class="content">
    <p class="mean-title">家庭成员信息</p>
     <el-table
        :data="familyInformation"
        highlight-current-row
         class="mt-20"
        border>
        <el-table-column
          type="index"
          label="序号"
          width="60px"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name"  placeholder="请填写姓名"></el-input>
          </template>
        </el-table-column>

        <el-table-column
          label="称呼">
          <template slot-scope="scope">
            <el-select v-model="scope.row.relation"  placeholder="请选择关系">
              <el-option
                v-for="item in relationOption"
                :label="item.codeText"
                :value="item.id"
                :key="item.id">
              </el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column
          label="年龄">
          <template slot-scope="scope">
            <el-input
              type="number"
              v-model.trim="scope.row.age"  placeholder="请填写年龄"></el-input>
          </template>
        </el-table-column>

        <el-table-column
          prop="workUnit"
          label="工作单位">
          <template slot-scope="scope">
            <el-input v-model="scope.row.workUnit"  placeholder="请填写工作单位"></el-input>
          </template>
        </el-table-column>

        <el-table-column
          prop="post"
          label="职务">
          <template slot-scope="scope">
            <el-input v-model="scope.row.post"  placeholder="请填写职务"></el-input>
          </template>
        </el-table-column>

        <el-table-column
          prop="telephone"
          label="联系电话">
          <template slot-scope="scope">
            <el-input type="number" min="0" v-model="scope.row.telephone"  placeholder="请填写联系电话"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          v-if="familyInformation.length>1"
          width="120px"
        >
          <template slot-scope="scope">
            <span @click="delListData(scope.row, scope.$index, familyInformation, '家庭成员')" class="icon click-active del">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-20 clearfix">
        <div class="r-float"><el-button type="primary" size="small" @click="familyMsg">新增</el-button></div>
      </div>
  </div>
  <div class="content">
    <p class="mean-title">其它信息</p>
      <el-form
      label-width="130px"
      class="mt-20"
      ref="otherInfomation"
      :model="otherInformation"
      :rules="otherInfoRules"
      >
      <div class="div-a_row clearfix">
        <div class="div-a_col w1050">
         <el-form-item
         prop="candidateType"
         label="应聘人员类型:"
         >
         <el-radio-group v-model="otherInformation.candidateType">
            <dl class="other-dl clearfix">
              <dd v-for="item in candidateTypeRadio" :key="item.id">
                 <el-radio :label="item.id" :disabled="item.disabled">{{item.codeText}}</el-radio>
              </dd>
            </dl>
            </el-radio-group>
         </el-form-item>
        </div>
      </div>
      <div class="div-a_row clearfix">
        <div class="div-a_col w1050">
         <el-form-item
         prop="haveAcquaintance"
         label="中财是否有熟人:"
         >
         <el-radio-group v-model="otherInformation.haveAcquaintance" >
            <dl class="other-dl clearfix">
              <dd v-for="item in haveAcquaintanceRadio" :key="item.id">
                <el-radio :label="item.id" :disabled="item.disabled">{{item.codeText}}</el-radio>
              </dd>
            </dl>
         </el-radio-group>
         </el-form-item>
        </div>
      </div>
      <div class="div-a_row clearfix">
        <div class="div-a_col w1050">
          <el-form-item label="第一应聘岗位:" prop="postName">
            <el-input readonly disabled @focus="chooseJoy" v-model.trim="otherInformation.postName" placeholder="请输入第一应聘岗位"></el-input>
          </el-form-item>
        </div>
      </div>
       <div class="div-a_row clearfix">
        <div class="div-a_col w1050">
          <el-form-item label="第二应聘岗位:" >
             <el-input v-model="otherInformation.orgName" placeholder="请输入第二应聘岗位"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="div-a_row clearfix">
        <div class="div-a_col w1050">
          <el-form-item
          prop="arrivalTime"
          label="预计到岗时间:" >
             <el-date-picker
              v-model="otherInformation.arrivalTime"
              type="date"
              :picker-options="pickerBeginDateAfter"
              placeholder="选择时间">
            </el-date-picker>
          </el-form-item>
        </div>
      </div>
      <div class="div-a_row clearfix">
        <div class="div-a_col w1050">
           <el-form-item label="离职原因:">
            <el-input
              v-model="otherInformation.dimissionReason"
              type="textarea"
              style="width:100%"
              placeholder="请填写离职原因"
              ></el-input>
          </el-form-item>
        </div>
      </div>
      </el-form>
      <div class="div-a_row" style="padding-bottom:50px;text-align:center">
       <el-button type="primary" size="small" @click="editAccept">提 交</el-button>
     </div>
    <!-- 提示 -->
    <el-dialog
      class="closeDialog"
      title="提示"
      :visible.sync="closeDialog"
      width="300px">
      <span v-if="isShow">你已提交成功，请关闭本页面</span>
      <span v-else>链接已失效</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</div>
</template>
<script>
import { validatoRules } from 'assets/js/validator'
import AddressSelect from 'components/AddressSelect.vue'
import { savePersonnelMsgInterView, checkAcceptBaseDetailInterView, checkAcceptOtherDetailStafff, checkAcceptJobDetailStaff, checkAcceptFamilyDetailStaff, checkAcceptResumeDetailStaff, searchJoy } from 'static/api/recruit/accept/accept'
import { getToken } from 'assets/js/util'
// import { browserRedirect } from 'assets/js/jumpLink'
import { timeToString, timeZeroToString } from 'assets/js/common'
import { getAllareaStaff, getSysDic } from 'static/api/common/common'
import { delFamilyListStaff, delResumeListStaff, delEduListStaff } from 'static/api/personnel-information/base/base'
var doClientWidth = document.body.clientWidth
if (doClientWidth <= 1200) {
  /*eslint-disable*/
  new function () {
    var _self = this
    _self.width = 750// 设置默认最大宽度
    _self.fontSize = 80// 默认字体大小
    _self.widthProportion = function () {
      var p = (document.body && document.body.clientWidth || document.getElementsByTagName('html')[0].offsetWidth) / _self.width
      return p > 1 ? 1 : p < 0.5 ? 0.5 : p
    }
    _self.changePage = function () {
      document.getElementsByTagName('html')[0].setAttribute('style', 'font-size:' + _self.widthProportion() * _self.fontSize + 'px')
    }
    _self.changePage()
    window.addEventListener('resize', function () {
      _self.changePage()
    }, false)
  }()
}
export default{
  name:'StaffDetail',
  data () {
    var validatorHealth = (rule, value, callback) => {
      if (value === 0 || value === 1) {
        callback()
      } else {
        callback(new Error('请填写健康状况'))
      }
    }
    return {
      htmlTitle: '应聘人员登记表',
        /* 政治面貌 */
      polticOption: [],
      /* 最高学历 */
      eduOption: [],
        /* 婚姻状况  */
      marriageOption: [],
        /* 增加学历中简历 */
      SelecteduOption: [],
        /* 家庭成员称呼 */
      relationOption: [],
        // 应聘岗位查询
      isShow: true,
      applyJoy: false,
      joyList: [],
      closeDialog: false,
      isChoose: -1,
      prossId: '',
      userId: '',
      intervalTimer: null,
        /** 籍贯**/
      nativeArea: {
        optionProvinces: [],
        optionCities: [],
        optionZones: [],
        provinceName: '',
        provinceId: '',
        areaName: '',
        areaId: '',
        cityName: '',
        cityId: ''
      },
        /** 现住址**/
      nowArea: {
        optionProvinces: [],
        optionCities: [],
        optionZones: [],
        provinceName: '',
        provinceId: '',
        areaName: '',
        areaId: '',
        cityName: '',
        cityId: ''
      },
        /** 户籍地派出所**/
      hujiArea: {
        optionProvinces: [],
        optionCities: [],
        optionZones: [],
        provinceName: '',
        provinceId: '',
        areaName: '',
        areaId: '',
        cityName: '',
        cityId: ''
      },
        /** 存放机构**/
      archiveArea: {
        optionProvinces: [],
        optionCities: [],
        optionZones: [],
        provinceName: '',
        provinceId: '',
        areaName: '',
        areaId: '',
        cityName: '',
        cityId: ''
      },
      baseInformation: {
        name: '',
        sex: '',
        nation: '',
        birthday: '',
        graduationDate: '',
        qualificationCertificate: '',
        idCardNumber: '',
        politicsStatus: '',
        mail: '',
        highestEducation: '',
        major: '',
        schoolOfGraduation: '',
        maritalStatus: '',
        height: '',
        telephone: '',
        domicilePoliceStation: '',
        archivesAddress: '',
        nativePlace: '',
        nowAddress: '',
        inZcBefore:0
      },
      otherInformation: {
        monthSalaryForm: '',
        yearSalaryForm: '',
        yearlySalary: '',
        expectYearSalary: '',
        expectMaxYearSalary: '',
        expectMonthSalary: '',
        candidateType: '',
        postName: '',
        postName2: '',
        arrivalTime: '',
        dimissionReason: '',
        haveAcquaintance: 0
      },
      jobInformation: [
        {
          startDate: '',
          endDate: '',
          workUnit: '',
          certifier: '',
          post: '',
          phone: ''
        }
      ],
      familyInformation: [
        {
          name: '',
          relation: '',
          birthday: '',
          workUnit: '',
          post: '',
          telephone: ''
        }
      ],
      resumeInformation: [
        {
          startDate: '',
          endDate: '',
          school: '',
          pross: '',
          record: ''
        }
      ],
      sexOption: [
          {value: 0, label: '女'},
          {value: 1, label: '男'}
      ],
      pickerBeginDateAfter: {
        disabledDate: (time) => {
          return time.getTime() < Date.now() - 86400000
        }
      },
      hujiForm: [],
      nowAddressForm: [],
      archivesAddressForm: [],
      nativeForm: [],
      tipShow: false,
      candidateTypeRadio: [],
      haveAcquaintanceRadio: [],
        /* 健康状况 */
      healthForm: {
        healthRadio: [],
        healthText: '',
        status: ''
      },
      validatorHealth: validatorHealth,
      resumeSelectIndex: 0,
      jobSelectIndex: 0,
        baseInfoRules: {
        name: {required: true, message: '请填写姓名', trigger: 'blur'},
        sex: {required: true, message: '请选择性别', trigger: 'change'},
        birthday: {type: 'date', required: true, message: '请选择出生日期', trigger: 'change'},
        nation: {required: true, message: '请填写民族', trigger: 'blur'},
        graduationDate: {type: 'date', required: true, message: '请选择毕业时间'},
        idCardNumber: validatoRules.idCardNumber,
        politicsStatus: {required: true, message: '请选择政治面貌', trigger: 'change'},
        highestEducation: {required: true, message: '请选择最高学历', trigger: 'change'},
        schoolOfGraduation: {required: true, message: '请填写毕业学校', trigger: 'blur'},
        maritalStatus: {required: true, message: '请选择婚姻状况', trigger: 'change'},
        telephone: validatoRules.telephone,
        height: {required: true, message: '请填写身高', trigger: 'blur'}
      },
      otherInfoRules: {
        candidateType: {required: true, message: '请选择应聘人员类型', trigger: 'change'},
        haveAcquaintance: {required: true, message: '在中财是否有熟人', trigger: 'change'},
        postName: {required: true, message: '请填写第一应聘岗位', trigger: 'change'},
        arrivalTime: {required: true, message: '请选择预计到岗时间', trigger: ['change', 'blur']}
      }
    }
  },
  components: {
    AddressSelect
  },
  methods: {
          // 获取学习开始和结束时间
    getResumeTime (index) {
      this.resumeSelectIndex = index
    },
      // 获取学习开始和结束时间
    getJobTime (index) {
      this.jobSelectIndex = index
    },
      // 去空判断
    getSpank (word) {
      if (!word) word = ''
      return word
    },
    // browser(){
    //   let token=this.$route.query.copyToken;
    //   browserRedirect(token)
    // },
      // 打印
    printAccept () {
      let infoForm = Object.assign({}, this.baseInformation)
      let otherForm = Object.assign({}, this.otherInformation)
      let resume = Object.assign([], this.resumeInformation)
      let jobmsg = Object.assign([], this.jobInformation)
      let familymsg = Object.assign([], this.familyInformation)
      let healthmsg = Object.assign({}, this.healthForm)
      infoForm.politicsStatus = this.baseInformation.politicsStatus ? this.polticOption.find(x => x.id === this.baseInformation.politicsStatus).codeText : ''
      infoForm.highestEducation = this.baseInformation.highestEducation ? this.eduOption.find(x => x.id === this.baseInformation.highestEducation).codeText : ''
      infoForm.maritalStatus = this.baseInformation.maritalStatus ? this.marriageOption.find(x => x.id === this.baseInformation.maritalStatus).codeText : ''
      infoForm.nativeAddress = this.nativeArea.provinceName + this.nativeArea.cityName + this.nativeArea.areaName
      infoForm.hujiAddress = this.hujiArea.provinceName + this.hujiArea.cityName + this.hujiArea.areaName + this.getSpank(this.hujiForm.address)
      infoForm.nowAddress = this.nowArea.provinceName + this.nowArea.cityName + this.nowArea.areaName + this.getSpank(this.nowAddressForm.address)
      infoForm.archiveAddress = this.archiveArea.provinceName + this.archiveArea.cityName + this.archiveArea.areaName + this.getSpank(this.archivesAddressForm.address)
      infoForm.yearSalaryForm = otherForm.yearSalaryForm + '万元'
      infoForm.monthSalaryForm = otherForm.monthSalaryForm + '万元'
      infoForm.expectYearSalary = otherForm.expectYearSalary + '万元'
      infoForm.candidateType = otherForm.candidateType ? [this.candidateTypeRadio.find(x => x.id === otherForm.candidateType).codeText] : ''
      infoForm.haveAcquaintance = otherForm.haveAcquaintance ? [this.haveAcquaintanceRadio.find(x => x.id === otherForm.haveAcquaintance).codeText === '无' ? '无' : '有（亲戚/朋友/同学）'] : ''
      infoForm.arrivalTime = otherForm.arrivalTime ? timeZeroToString(otherForm.arrivalTime) : ''
      infoForm.postName = otherForm.postName
      infoForm.dimissionReason = otherForm.dimissionReason
      let resumInfo = []
      let jobInfo = []
      let familyInfo = []
      resume.forEach(x => {
        x.startDate = timeZeroToString(x.startDate)
        x.endDate = timeZeroToString(x.endDate)
        resumInfo.push(x)
      })
      jobmsg.forEach(x => {
        x.startDate = timeZeroToString(x.startDate)
        x.endDate = timeZeroToString(x.endDate)
        jobInfo.push(x)
      })
      familymsg.forEach(x => {
        x.relation = x.relation ? this.relationOption.find(item => item.id === x.relation).codeText : ''
        familyInfo.push(x)
      })
      if (resume.length >= 5) {
        resumInfo = resume.slice(0, 5)
      } else {
        for (let i = 0; i < 5 - resume.length; i++) {
          resumInfo.push({
            startDate: '',
            endDate: '',
            school: '',
            major: '',
            education: ''
          })
        }
      }
      if (jobmsg.length >= 5) {
        jobInfo = resume.slice(0, 5)
      } else {
        for (let i = 0; i < 5 - jobmsg.length; i++) {
          jobInfo.push({
            startDate: '',
            endDate: '',
            workUnit: '',
            post: '',
            certifier: '',
            telephone: ''
          })
        }
      }
      if (familymsg.length >= 5) {
        familyInfo = familymsg.slice(0, 5)
      } else {
        for (let i = 0; i < 5 - familymsg.length; i++) {
          familyInfo.push({
            name: '',
            relation: '',
            birthday: '',
            workUnit: '',
            post: '',
            telephone: ''
          })
        }
      }
      this.$router.push({
        path: '/printing/accept1',
        query: {
          info: JSON.stringify(infoForm),
          resume: JSON.stringify(resumInfo),
          jobInfo: JSON.stringify(jobInfo),
          familyInfo: JSON.stringify(familyInfo),
          healthInfo: JSON.stringify(healthmsg)
        }
      })
    },
      // 选择带应聘职位
    chooseJoy () {
      searchJoy({selectFlag: '1', size: 10000}).then(res => {
        if (res.result && res.result.length > 0) {
          this.joyList = res.result
        }
      })
      this.applyJoy = true
    },
    sure () {
      window.location.href = 'about:blank'
      window.close()
    },

    _getAllArea () {
      getAllareaStaff(0).then((data) => {
        if (data && data.result) {
          data.result.forEach((area) => {
            this.archiveArea.optionProvinces.push(area)
            this.hujiArea.optionProvinces.push(area)
            this.nowArea.optionProvinces.push(area)
            this.nativeArea.optionProvinces.push(area)
          })
        }
      })
    },
      /** 限制上限不能超过下限的两倍**/
    changeMaxYearSalary (value) {
      let expectVal = Number(value)
        if (expectVal < 0) {
          this.tipShow = true
        } else {
          if (expectVal > this.otherInformation.expectYearSalary * 2) {
            this.tipShow = true
          } else {
            this.tipShow = false
          }
        }
    },
    /** 限制上限不能超过下限的两倍**/
    changeMaxYearSalary1 (value) {
      let expectVal = Number(value)
      if (expectVal < 0) {
        this.tipShow = true
      } else {
        if (this.otherInformation.expectMaxYearSalary > expectVal * 2) {
          this.tipShow = true
        } else {
          this.tipShow = false
        }
      }
    },
      /** 删除**/
    delListData (row, index, arr, msg) {
        this.$confirm('确定要删除这条' + msg + '吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.resumeSelectIndex = 0
        this.jobSelectIndex = 0
        arr.splice(index, 1)
        if (row.id) {
          let delParams = {
            id: row.id,
            operator: getToken('loginId'),
            userId: row.userId,
            copyToken:this.$route.query.copyToken
          }
          switch (msg) {
            case '学历' :
              delEduListStaff(delParams).then(data => {
                this._getReturnCode(this._getAcceptResumeDetail(this.userId))
              })
              break
            case '工作简历' :
              delResumeListStaff(delParams).then(data => {
                this._getReturnCode(this._getAcceptJobDetail(this.userId))
              })
              break
            case '家庭成员' :
              delFamilyListStaff(delParams).then(data => {
                this._getReturnCode(this._getAcceptFamilyDetail(this.userId))
              })
          }
        }
      }).catch(() => {})
    },
    _getReturnCode (callback) {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      setTimeout(() => {
            // eslint-disable-next-line
            callback
      }, 400)
    },
    addEduMsg () {
      this.resumeInformation.push({
        startDate: '',
        endDate: '',
        school: '',
        pross: '',
        record: ''
      })
    },
    addWorkMsg () {
      this.jobInformation.push({
        startDate: '',
        endDate: '',
        workUnit: '',
        certifier: '',
        post: '',
        phone: ''
      })
    },
    familyMsg () {
      this.familyInformation.push({
        name: '',
        relation: '',
        birthday: '',
        workUnit: '',
        post: '',
        telephone: ''
      })
    },
    _getAcceptDetail () {
      checkAcceptBaseDetailInterView({copyToken: this.$route.query.copyToken}).then((data) => {
        if (data.subCode === 10000 || data.subCode === '10000') {
          this.baseInformation = data.result
          this.baseInformation.inZcBefore = data.result.inZcBefore ? data.result.inZcBefore + '': '0'
          this.htmlTitle = data.result.name + '的应聘登记表'
          this.baseInformation.graduationDate = this.baseInformation.graduationDate ? new Date(this.baseInformation.graduationDate) : ''
          this.baseInformation.birthday = this.baseInformation.birthday ? new Date(this.baseInformation.birthday) : ''
          this.userId = this.baseInformation.id
          setTimeout(()=>{
            this.$refs['baseInformation'].clearValidate()
            this.$refs['otherInfomation'].clearValidate()
            // this.$refs.adressDown.resetFieldForm()
          },1000)
            // this.healthyText(this.baseInformation)

          if (data.result.nativePlaceMod) {
            this.nativeForm = data.result.nativePlaceMod
            this.nativeArea.provinceId = this.nativeForm.provinceId
            this.nativeArea.provinceName = this.nativeForm.provinceName
            this.nativeArea.cityId = this.nativeForm.cityId
            if (this.nativeForm.provinceId) {
              getAllareaStaff(this.nativeForm.provinceId).then((data) => {
                if (data.result && data.result.length) {
                  data.result.forEach((area) => {
                    this.nativeArea.optionCities.push(area)
                  })
                }
              })
            }
            if (this.nativeForm.cityId) {
              getAllareaStaff(this.nativeForm.cityId).then(data => {
                if (data.result && data.result.length) {
                  data.result.forEach((area) => {
                    this.nativeArea.optionZones.push(area)
                  })
                }
              })
            }
            this.nativeArea.cityName = this.nativeForm.cityName
            this.nativeArea.areaId = this.nativeForm.areaId
            this.nativeArea.areaName = this.nativeForm.areaName
          }
          if (data.result.nowAddressMod) {
            this.nowAddressForm = data.result.nowAddressMod
            this.nowArea.provinceId = this.nowAddressForm.provinceId
            this.nowArea.provinceName = this.nowAddressForm.provinceName
            this.nowArea.cityId = this.nowAddressForm.cityId
            if (this.nowAddressForm.provinceId) {
              getAllareaStaff(this.nowAddressForm.provinceId).then(data => {
                if (data.result && data.result.length) {
                  data.result.forEach((area) => {
                    this.nowArea.optionCities.push(area)
                  })
                }
              })
            }
            if (this.nowAddressForm.cityId) {
              getAllareaStaff(this.nowAddressForm.cityId).then(data => {
                if (data.result && data.result.length) {
                  data.result.forEach((area) => {
                    this.nowArea.optionZones.push(area)
                  })
                }
              })
            }
            this.nowArea.cityName = this.nowAddressForm.cityName
            this.nowArea.areaId = this.nowAddressForm.areaId
            this.nowArea.areaName = this.nowAddressForm.areaName
          }
          if (data.result.hujiAddressMod) {
            this.hujiForm = data.result.hujiAddressMod
            this.hujiArea.provinceId = this.hujiForm.provinceId
            this.hujiArea.provinceName = this.hujiForm.provinceName
            this.hujiArea.cityId = this.hujiForm.cityId
            if (this.hujiForm.provinceId) {
              getAllareaStaff(this.hujiForm.provinceId).then(data => {
                if (data.result && data.result.length) {
                  data.result.forEach((area) => {
                    this.hujiArea.optionCities.push(area)
                  })
                }
              })
            }
            if (this.hujiForm.cityId) {
              getAllareaStaff(this.hujiForm.cityId).then(data => {
                if (data.result && data.result.length) {
                  data.result.forEach((area) => {
                    this.hujiArea.optionZones.push(area)
                  })
                }
              })
            }
            this.hujiArea.cityName = this.hujiForm.cityName
            this.hujiArea.areaId = this.hujiForm.areaId
            this.hujiArea.areaName = this.hujiForm.areaName
          }
          if (data.result.archivesAddressMod) {
            this.archivesAddressForm = data.result.archivesAddressMod
            this.archiveArea.provinceId = this.archivesAddressForm.provinceId
            this.archiveArea.provinceName = this.archivesAddressForm.provinceName
            this.archiveArea.cityId = this.archivesAddressForm.cityId
            if (this.archivesAddressForm.provinceId) {
              getAllareaStaff(this.archivesAddressForm.provinceId).then(data => {
                if (data.result && data.result.length) {
                  data.result.forEach((area) => {
                    this.archiveArea.optionCities.push(area)
                  })
                }
              })
            }
            if (this.archivesAddressForm.cityId) {
              getAllareaStaff(this.archivesAddressForm.cityId).then((data) => {
                if (data.result && data.result.length) {
                  data.result.forEach((area) => {
                    this.archiveArea.optionZones.push(area)
                  })
                }
              })
            }
            this.archiveArea.cityName = this.archivesAddressForm.cityName
            this.archiveArea.areaId = this.archivesAddressForm.areaId
            this.archiveArea.areaName = this.archivesAddressForm.areaName
          }
        } else if (data.subCode === 400) {
          this.isShow = false
            // this.$message.warning(data.subMsg)
          this.closeDialog = true // 注释 该是true
        } else {
          this.$message.warning('接口出错啦')
        }
      })
      let _this = this
      _this.intervalTimer = setInterval(() => {
        if (_this.userId !== '') {
          clearInterval(_this.intervalTimer)
          this._getAccountOtherDetail(_this.userId)
          this._getAcceptJobDetail(_this.userId)
          this._getAcceptFamilyDetail(_this.userId)
          this._getAcceptResumeDetail(_this.userId)
        }
      })
    },
    _getAccountOtherDetail (id) {
      checkAcceptOtherDetailStafff(id).then(data => {
        if (data.result && data.result.length) {
          this.otherInformation = data.result[0]
          let datas = data.result[0].expectYearSalary
          this.prossId = this.otherInformation.demandId
          if (datas !== null) {
            this.otherInformation.expectYearSalary = datas.split(',')[0] ? datas.split(',')[0] : ''
            this.otherInformation.expectMaxYearSalary = datas.split(',')[1] ? datas.split(',')[1] : ''
          }
        } else {
          this.otherInformation.expectYearSalary = ''
          this.otherInformation.expectMaxYearSalary = ''
        }
      })
    },
    _getAcceptJobDetail (id) {
      checkAcceptJobDetailStaff(id).then(data => {
        this.jobInformation = data.result
      })
    },
    _getAcceptFamilyDetail (id) {
      checkAcceptFamilyDetailStaff(id).then(data => {
        this.familyInformation = data.result
        this.familyInformation.forEach(item => {
          if (item.relation === 0) {
            item.relation = ''
          }
        })
      })
    },
    _getAcceptResumeDetail (id) {
      checkAcceptResumeDetailStaff(id).then(data => {
          this.resumeInformation = data.result
      })
    },
    editAccept () {
      let vail0 = false
      let vail1 = false
      let vail2 = false
      this.$refs['baseInformation'].validate((vaild, object) => {
        if (vaild) {
          vail2 = true
          return vail2
        } else {
          for (let key in object) {
            return this.$message.warning(object[key][0].message)
          }
        }
      })
      this.$refs['otherInfomation'].validate((vaild, object) => {
        if (vaild) {
          vail0 = true
          return vail0
        }
      })
      this.$refs['healthRef'].validate((vaild, object) => {
        if (vaild) {
          vail1 = true
          return vail1
        }
      })
      if (vail0 && vail1 && vail2) {
        if (!this.nativeArea.provinceId || !this.nativeArea.cityId || !this.nativeArea.areaId) {
          this.$message.warning('请填写籍贯地址')
          return
        } else if (!this.hujiArea.provinceId || !this.hujiArea.cityId || !this.hujiArea.areaId) {
          this.$message.warning('请填写户籍地址')
          return
        } else if (!this.nowArea.provinceId || !this.nowArea.cityId || !this.nowArea.areaId || !this.nowAddressForm.address) {
          this.$message.warning( '请填写现住址')
          return
        }
        let familyMember = []
        let resumeData = []
        let eduData = []
        this.familyInformation.forEach((item) => {
          if (item.name || item.relation || item.birthday || item.workUnit || item.post || item.telephone || item.age) {
            familyMember.push({
              id: item.id,
              name: item.name,
              relation: item.relation,
              birthday: timeToString(item.birthday),
              workUnit: item.workUnit,
              post: item.post,
              telephone: item.telephone,
              age: item.age
            })
          }
        })
        this.jobInformation.forEach((item) => {
          if (item.startDate || item.endDate || item.workUnit || item.post || item.certifier || item.telephone) {
            resumeData.push({
              id: item.id,
              startDate: timeToString(item.startDate),
              endDate: timeToString(item.endDate),
              workUnit: item.workUnit,
              post: item.post,
              certifier: item.certifier,
              telephone: item.telephone
            })
          }
        })
        this.resumeInformation.forEach((item) => {
          if (item.startDate || item.endDate || item.school || item.major || item.studyMode || item.education || item.educationWay) {
            eduData.push({
              id: item.id,
              idCardNumber: item.idCardNumber,
              userId: item.userId,
              startDate: timeToString(item.startDate),
              endDate: timeToString(item.endDate),
              school: item.school,
              major: item.major,
              studyMode: item.studyMode,
              education: item.education,
              educationWay: item.educationWay
            })
          }
        })

        let healthStatusList = []
        if (this.baseInformation.healthStatusList) {
            /* (id 健康状况 dicId 字段对应数据字典ID) */
          this.baseInformation.healthStatusList.forEach(item => {
            healthStatusList.push({
              id: item.id,
              deleteTag: item.deleteTag,
              dictId: item.dictId,
              status: item.status,
              text: item.status === 1 ? item.text : ''
            })
          })
          let filterHealth = this.baseInformation.healthStatusList.filter(x=> x.status === undefined || (x.status === 1 && !x.text))
          if(filterHealth.length){
            this.$message.warning('请填写完整健康信息')
            return
          }
        } else {
          this.healthForm.healthRadio.forEach(item => {
            healthStatusList.push({
              deleteTag: 0,
              dictId: item.id,
              status: item.status !== '' ? item.status : -1,
              text: item.status === 1 ? item.healthText : ''
            })
          })
        }
        if (this.tipShow) {
          this.$message.warning('期望年薪输入有误!')
          return false
        }
        let preload = {
          'copyToken': this.$route.query.copyToken,
          'userBaseInfo': {
            id: this.baseInformation.id,
            operator: getToken('loginId'),
            name: this.baseInformation.name,
            sex: this.baseInformation.sex,
            birthday: timeToString(this.baseInformation.birthday),
            nation: this.baseInformation.nation,
            graduationDate: timeToString(this.baseInformation.graduationDate),
            qualificationCertificate: this.baseInformation.qualificationCertificate,
            idCardNumber: this.baseInformation.idCardNumber,
            politicsStatus: this.baseInformation.politicsStatus,
            mail: this.baseInformation.mail,
            highestEducation: this.baseInformation.highestEducation,
            major: this.baseInformation.major,
            schoolOfGraduation: this.baseInformation.schoolOfGraduation,
            maritalStatus: this.baseInformation.maritalStatus,
            height: this.baseInformation.height,
            telephone: this.baseInformation.telephone,
            inZcBefore: this.baseInformation.inZcBefore,
            healthStatusList: healthStatusList,
            'nativePlaceMod': {
              address: this.nativeForm.address ? this.nativeForm.address : '',
              provinceId: this.nativeArea.provinceId,
              cityId: this.nativeArea.cityId,
              areaId: this.nativeArea.areaId,
              provinceName: this.nativeArea.provinceName,
              cityName: this.nativeArea.cityName,
              areaName: this.nativeArea.areaName,
              id: this.nativeForm.id
            },
            'nowAddressMod': {
              address: this.nowAddressForm.address ? this.nowAddressForm.address : '',
              provinceId: this.nowArea.provinceId,
              cityId: this.nowArea.cityId,
              areaId: this.nowArea.areaId,
              provinceName: this.nowArea.provinceName,
              cityName: this.nowArea.cityName,
              areaName: this.nowArea.areaName,
              id: this.nowAddressForm.id
            },
            'hujiAddressMod': {
              address: this.hujiForm.address ? this.hujiForm.address : '',
              provinceId: this.hujiArea.provinceId,
              cityId: this.hujiArea.cityId,
              areaId: this.hujiArea.areaId,
              provinceName: this.hujiArea.provinceName,
              cityName: this.hujiArea.cityName,
              areaName: this.hujiArea.areaName,
              id: this.hujiForm.id
            },
            'archivesAddressMod': {
              address: this.archivesAddressForm.address ? this.archivesAddressForm.address : '',
              provinceId: this.archiveArea.provinceId,
              cityId: this.archiveArea.cityId,
              areaId: this.archiveArea.areaId,
              provinceName: this.archiveArea.provinceName,
              cityName: this.archiveArea.cityName,
              areaName: this.archiveArea.areaName,
              id: this.archivesAddressForm.id
            }
          },
          'userCandidateInfo': {
            monthSalaryForm: this.otherInformation.monthSalaryForm,
            yearSalaryForm: this.otherInformation.yearSalaryForm,
            yearlySalary: this.otherInformation.yearlySalary,
            expectYearSalary: this.otherInformation.expectYearSalary + ',' + this.otherInformation.expectMaxYearSalary,
            expectMonthSalary: this.otherInformation.expectMonthSalary,
            candidateType: this.otherInformation.candidateType,
              // postName: this.otherInformation.postName,
            demandId: this.prossId,
            postName2: this.otherInformation.postName2,
            arrivalTime: timeToString(this.otherInformation.arrivalTime),
            dimissionReason: this.otherInformation.dimissionReason,
            haveAcquaintance: this.otherInformation.haveAcquaintance,
            orgName: this.otherInformation.orgName,
            orgName2: this.otherInformation.orgName2,
            id: this.otherInformation.id
          },
          'familyMembers': familyMember,
          'jobResume': resumeData,
          'userEducations': eduData
        }
        savePersonnelMsgInterView(preload).then(res => {
          this.$message.success('提交成功')
          this.closeDialog = true
        })
      }
    },
      /* 获取数字字典 */
    async _getQueryClassList () {
        /* 政治面貌 */
      await getSysDic('politicsStatus').then(data => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.polticOption.push(item)
            }
          })
        }
      })
      /* 最高学历 */
      await getSysDic('highestEducation').then(data => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.eduOption.push(item)
            }
          })
        }
      })
        /* 婚姻状况 */
      await getSysDic('maritalStatus').then(data => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.marriageOption.push(item)
            }
          })
        }
      })
        /* 增加学历中简历 */
      await getSysDic('education').then(data => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.SelecteduOption.push(item)
            }
          })
        }
      })
        /* 家庭成员称呼 */
      await getSysDic('relation').then(data => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.relationOption.push(item)
            }
          })
        }
      })
      /* 应聘人员类型 */
      await getSysDic('candidateType').then(data => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.candidateTypeRadio.push(item)
            }
          })
        }
      })
      /* 中财是否有熟人 */
      await getSysDic('haveAcquaintance').then(data => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.haveAcquaintanceRadio.push(item)
            }
          })
        }
      })
      /* 健康状况 */
      await getSysDic('healthStatus').then(data => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.healthForm.healthRadio.push(item)
            }
          })
        }
      })
    }
  },
  computed: {
    acceptRules () {
      return validatoRules
    },
    resumeStartOptions () {
      let selecIndex = this.resumeSelectIndex - 1 < 0 ? 0 : this.resumeSelectIndex - 1
      return {
        disabledDate: (time) => {
          if (this.resumeInformation[selecIndex] && this.resumeInformation[selecIndex].endDate) {
            return new Date(time).getTime() < new Date(this.resumeInformation[selecIndex].endDate).getTime()
          }
        }
      }
    },
    resumeEndOptions () {
      return {
        disabledDate: (time) => {
          return new Date(time).getTime() < new Date(this.resumeInformation[this.resumeSelectIndex].startDate).getTime()
        }
      }
    },
    jobStartOptions () {
      let selecIndex = this.jobSelectIndex - 1 < 0 ? 0 : this.jobSelectIndex - 1
      return {
        disabledDate: (time) => {
          if (this.jobInformation[selecIndex] && this.jobInformation[selecIndex].endDate) {
            return new Date(time).getTime() < new Date(this.jobInformation[selecIndex].endDate).getTime()
          }
        }
      }
    },
    jobEndOptions () {
      return {
        disabledDate: (time) => {
          return new Date(time).getTime() < new Date(this.jobInformation[this.jobSelectIndex].startDate).getTime()
        }
      }
    }
  },
  created () {
    // this.browser()
    this._getAllArea()
    this._getAcceptDetail()
    this._getQueryClassList()
  }
}
</script>
<style lang="less">
@import '~assets/less/staff.less';
</style>
