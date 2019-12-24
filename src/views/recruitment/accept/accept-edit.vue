<template>
<div class="container">
  <h6 class="table-title">中财集团应聘人员登记表</h6>
  <p class="base-sec-title">基本信息</p>
  <el-form
    label-width="130px"
    :model="baseInformation"
    :rules="baseInfoRules"
    ref="baseInformation">
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓    名：" prop="name">
            <el-input  v-model.trim="baseInformation.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性    别：" prop="sex">
            <el-select v-model="baseInformation.sex" filterable placeholder="请选择性别" >
              <el-option
                v-for="item in sexOption"
                :label="item.label"
                :value="item.value"
                :key="item.index">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop='birthday' label="出生日期 ：">
            <el-date-picker
              v-model="baseInformation.birthday"
              placeholder="请选择出生日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="民    族：" prop="nation">
            <el-input v-model.trim="baseInformation.nation" placeholder="请填写民族"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="毕业时间：" prop="graduationDate">
            <el-date-picker
              v-model="baseInformation.graduationDate"
              type="month"
              placeholder="请选择毕业时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="资格证书：">
            <el-input v-model="baseInformation.qualificationCertificate" placeholder="请填写资格证书"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="身份证号："  prop="idCardNumber">
            <el-input v-model="baseInformation.idCardNumber" placeholder="请填写身份证号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item  label="政治面貌：" prop="politicsStatus">
            <el-select v-model="baseInformation.politicsStatus"  placeholder="请选择政治面貌">
              <el-option
                v-for="item in polticOption"
                :label="item.codeText"
                :value="item.id"
                :key="item.id"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电子邮箱：" prop="mail">
            <el-input v-model="baseInformation.mail" placeholder="请填写电子邮箱"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item  label="最高学历：" prop="highestEducation">
            <el-select v-model="baseInformation.highestEducation" placeholder="请选择最高学历">
              <el-option
                v-for="item in eduOption"
                :label="item.codeText"
                :value="item.id"
                :key="item.id"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="毕业院校：" prop="schoolOfGraduation">
            <el-input v-model="baseInformation.schoolOfGraduation"  placeholder="请填写毕业院校"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所学专业：">
            <el-input v-model="baseInformation.major" placeholder="请填写所学专业"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item  label="婚姻状况：" prop="maritalStatus">
            <el-select v-model="baseInformation.maritalStatus" filterable placeholder="请选择婚姻状况" style="width:100%;">
              <el-option
                v-for="item in marriageOption"
                :label="item.codeText"
                :value="item.id"
                :key="item.id"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话："  prop="telephone">
            <el-input v-model="baseInformation.telephone" placeholder="请填写联系电话"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身    高：" prop="height">
            <el-input type="number" min="0" v-model.trim="baseInformation.height" placeholder="请填写身高">
              <template slot="append">CM</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            required
            label="籍    贯：">
              <address-select
              :area='nativeArea'
              :colSpan="7"
              :lineSpan="1"
              :showZone="true"></address-select>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item  label="户籍地址：" required>
            <address-select :area="hujiArea" :colSpan="7" :lineSpan="1" :showZone="true"></address-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="详 细 地 址 ：">
            <el-input placeholder="请填写详细地址" :number="true" v-model="hujiForm.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item  label="档案存放：">
            <address-select
              :area="archiveArea"
              :colSpan="7"
              :lineSpan="1"
              :clearable="true"
              :showZone="true"
              :rulesRequire="false">
            </address-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="存 放 机 构 ：">
            <el-input placeholder="请填写详细地址" :number="true" v-model="archivesAddressForm.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="现 住 址：" required>
            <address-select :area='nowArea' :colSpan="7" :lineSpan="1" :showZone="true"></address-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="详 细 地 址 ：" required>
            <el-input placeholder="请填写详细地址" :number="true" v-model="nowAddressForm.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="22">
        <el-col :span="6">
          <el-form-item label="当前月薪构成：">
            <el-input v-model="otherInformation.monthSalaryForm" placeholder="请填写当前月薪构成"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="当前年薪构成：">
            <el-input v-model="otherInformation.yearSalaryForm" placeholder="请填写当前年薪构成"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="当前年薪：">
            <el-input type="number" min="0" v-model="otherInformation.yearlySalary"  placeholder="请填写当前年薪"><template slot="append">万元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="期望年薪：">
            <el-input type="number" :min="0" @input="changeMaxYearSalary1" v-model.number="otherInformation.expectYearSalary"  placeholder="请填写期望年薪"><template slot="append">万元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1" class="rang-span">---</el-col>
        <el-col :span="4">
          <el-input type="number"
                    :min="0"
          v-model="otherInformation.expectMaxYearSalary"
          @input="changeMaxYearSalary"
          placeholder="上限不超过下限2倍">
          <template slot="append">万元</template>
          </el-input>
          <span class="tip-span" v-show="tipShow">上限不能超过下限2倍且年薪不得为负数</span>
        </el-col>
      </el-row>
  </el-form>

  <!-- 健康状况 -->
  <el-form
    class="mt-20 health"
    ref="healthRef"
    label-width="300px"
    :model="baseInformation">
    <p class="base-sec-title">健康状况</p>
    <el-row v-for="(item, index) in baseInformation.healthStatusList" :label="item.codeText" :key="item.code">
      <el-col :span="12" :offset="3">
        <el-form-item
          :key="item.key"
          :prop="'healthStatusList.' + index + '.status'"
          :rules="{ required: true, validator:(rule, value, callback) => {
              if (value === 0 || value === 1 && item.text ) {
                callback()
              } else {
                callback('请填写正确的健康状况')
              }
            }, trigger: 'change' || 'blur'}"
          :label='item.codeText'>
          <el-radio-group v-model="item.status" :disabled="item.enable === 2 ? true  : false">
            <el-radio class="radio"  :label="1" >有</el-radio>
            <el-radio class="radio"  :label="0">无</el-radio>
          </el-radio-group>
        <el-input v-model="item.text" :disabled="item.enable === 2 ? true  : false"  v-if="item.status === 1" class="health-text"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <!--学习简历-->
  <div class="mt-20">
    <p class="base-sec-title">学 习 简 历（请按入学时间从先到后填写）</p>
    <el-table
      :data="resumeInformation"
      highlight-current-row
      border>
      <el-table-column
        type="index"
        label="序号"
        width="60px">
      </el-table-column>
      <el-table-column
        label="开始年月"
        prop="startDate">
        <template slot-scope="scope">
          <el-date-picker
            v-model="scope.row.startDate"
            type="month"
            :clearable="false"
             @focus="getResumeTime(scope.$index)"
            :picker-options="resumeStartOptions"
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
            :clearable="false"
            :picker-options="resumeEndOptions"
           @focus="getResumeTime(scope.$index)"
            type="month"
            placeholder="选择时间">
          </el-date-picker>
        </template>
      </el-table-column>
      <el-table-column
        prop="school"
        label="学校">
        <template slot-scope="scope">
          <el-input v-model="scope.row.school" placeholder="请填写学校"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="major"
        label="专业">
        <template slot-scope="scope">
          <el-input v-model="scope.row.major" placeholder="请填写专业"></el-input>
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
              :key="item.id"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        v-if="resumeInformation.length>1"
        width="120px">
        <template slot-scope="scope">
          <span @click="delListData(scope.row, resumeInformation,scope.$index, '学历')" class="icon click-active del">删除</span>
        </template>
        </el-table-column>
    </el-table>
    <el-row class="mt-20">
      <el-col :span="1" class="r-float"><el-button type="primary" size="small" @click="addEduMsg">新增</el-button></el-col>
    </el-row>
  </div>

  <!--工作简历-->
  <div class="mt-20">
  <p class="base-sec-title">工 作 简 历（请按入职时间从先到后填写）</p>
   <el-form label-width="150px">
        <el-form-item required label=" 是否在中财工作过">
           <el-radio-group v-model="baseInformation.inZcBefore">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
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
        width="60px">
      </el-table-column>
      <el-table-column
        prop="startDate"
        label="开始年月">
        <template slot-scope="scope">
          <el-date-picker
            v-model="scope.row.startDate"
            type="month"
            :clearable="false"
             @focus="getJobTime(scope.$index)"
            :picker-options="jobStartOptions"
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
            :clearable="false"
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
        width="120px" >
        <template slot-scope="scope">
          <span @click="delListData(scope.row, jobInformation,scope.$index, '工作简历')" class="icon click-active del">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="mt-20">
      <el-col :span="1" class="r-float"><el-button type="primary" size="small" @click="addWorkMsg">新增</el-button></el-col>
    </el-row>
  </div>

  <!--家庭成员信息-->
  <div class="mt-20">
    <p class="base-sec-title">家庭成员信息</p>
    <el-table
      :data="familyInformation"
      highlight-current-row
      border>
      <el-table-column
        type="index"
        label="序号"
        width="60px">
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
              :key="item.id"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="年龄">
        <template slot-scope="scope">
          <el-input type="number" v-model.trim="scope.row.age"  placeholder="请填写年龄"></el-input>
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
          width="120px">
          <template slot-scope="scope">
            <span @click="delListData(scope.row, familyInformation,scope.$index, '家庭成员')" class="icon click-active del">删除</span>
          </template>
      </el-table-column>
    </el-table>
    <el-row class="mt-20">
      <el-col :span="1" class="r-float"><el-button type="primary" size="small" @click="familyMsg">新增</el-button></el-col>
    </el-row>
  </div>

  <!--其它成员信息-->
  <el-form label-width="130px"
    ref="otherInfomation"
    :model="otherInformation"
    :rules="otherInfoRules"
    class="mt-20">
    <p class="base-sec-title">其 它 信 息</p>
      <el-row>
        <el-col :span="12">
          <el-form-item label="应聘人员类型:" prop="candidateType">
            <el-radio-group v-model="otherInformation.candidateType">
              <el-radio v-for="item in candidateTypeRadio" :label="item.id" :key="item.id" :disabled="item.disabled">{{item.codeText}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="中财是否有熟人:" prop="haveAcquaintance">
            <el-radio-group v-model="otherInformation.haveAcquaintance" >
              <el-radio v-for="item in haveAcquaintanceRadio" :label="item.id" :key="item.id" :disabled="item.disabled">{{item.codeText}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="第一应聘岗位:" prop="postName">
            <el-input readonly @focus="chooseJoy" v-model.trim="otherInformation.postName" placeholder="请输入第一应聘岗位"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="第二应聘岗位:">
            <el-input v-model="otherInformation.orgName" placeholder="请输入第二应聘岗位"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="预计到岗时间:" prop="arrivalTime">
            <el-date-picker
              v-model="otherInformation.arrivalTime"
              type="date"
              :picker-options="pickerBeginDateAfter"
              placeholder="选择时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="离职原因:">
            <el-input v-model="otherInformation.dimissionReason" type="textarea" placeholder="请填写离职原因"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
  </el-form>

  <el-row style="margin-bottom: 100px">
    <el-col :span="2" :offset="9"><el-button type="primary" size="small" @click="goBack">返  回</el-button></el-col>
    <el-col :span="2" :offset="1"><el-button type="primary" size="small" @click="editAccept">保  存</el-button></el-col>
  </el-row>

  <!-- 应聘岗位弹框 -->
  <el-dialog title="应聘岗位" :visible.sync="applyJoy" width="680px" class="interViewDialog">
    <el-table :data="joyList">
      <el-table-column width="30">
        <template slot-scope="scope">
          <el-radio v-model="isChoose" :label="scope.$index"></el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="identifier" label="需求编号" width="150" sortable></el-table-column>
      <el-table-column prop="levelOne" label="一级组织" width="150" sortable></el-table-column>
      <el-table-column prop="orgName" label="需求部门" width="150" sortable></el-table-column>
      <el-table-column prop="postName" label="需求岗位" width="150" sortable></el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="applyJoy = false" size="mini">取消</el-button>
      <el-button type="primary" @click="sureApply" size="mini">确定</el-button>
    </div>
  </el-dialog>
</div>
</template>
<script>
import { validatoRules } from 'assets/js/validator'
import AddressSelect from 'components/AddressSelect.vue'
import { savePersonnelMsgNew, checkAcceptBaseDetail, checkAcceptOtherDetail, checkAcceptJobDetail, checkAcceptFamilyDetail, checkAcceptResumeDetail, searchJoy } from 'static/api/recruit/accept/accept'
import { getToken } from 'assets/js/util'
import { timeToString } from 'assets/js/common'
import dayjs from 'dayjs'

import { getAllarea, getSysDic } from 'static/api/common/common'
import { delFamilyList, delResumeList, delEduList } from 'static/api/personnel-information/base/base'
import { debounce } from 'lodash'
export default {
  data () {
    let validateMail = (rule, value, callback) => {
      let mail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      if (value && !mail.test(value)) {
        callback(new Error('请填写正确的电子邮箱'))
      } else {
        callback()
      }
    }
    var validatorHealth = (rule, value, callback) => {
      if (value === 0 || value === 1) {
        callback()
      } else {
        callback(new Error('请填写健康状况'))
      }
    }
    return {
      healthRadio: [],
      healthy: {},
      disabled: false,
      // 应聘岗位查询
      applyJoy: false,
      joyList: [],
      isChoose: -1,
      prossId: '',
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
        healthStatusList: [],
        selectProv: '',
        selectCity: '',
        selectZone: '',
        inZcBefore: 0
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
        haveAcquaintance: ''
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
        { value: 0, label: '女' },
        { value: 1, label: '男' }
      ],
      /* 政治面貌 */
      polticOption: [],
      /* 最高学历 */
      eduOption: [],
      /* 增加学历中简历 */
      SelecteduOption: [],
      /* 婚姻状况  */
      marriageOption: [],
      /* 家庭成员称呼 */
      relationOption: [],
      /* 应聘信息 */
      candidateTypeRadio: [],
      /* 中财是否有熟人 */
      haveAcquaintanceRadio: [],
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
      baseInfoRules: {
        name: { required: true, message: '请填写姓名', trigger: 'blur' },
        sex: { required: true, message: '请选择性别', trigger: 'change' },
        birthday: { required: true, message: '请选择出生日期', trigger: 'change' },
        nation: { required: true, message: '请填写民族', trigger: 'blur' },
        graduationDate: { required: true, message: '请选择毕业时间' },
        idCardNumber: validatoRules.idCardNumber,
        politicsStatus: { required: true, message: '请选择政治面貌', trigger: 'change' },
        mail: { validator: validateMail, trigger: 'blur' },
        highestEducation: { required: true, message: '请选择最高学历', trigger: 'change' },
        schoolOfGraduation: { required: true, message: '请填写毕业学校', trigger: 'blur' },
        maritalStatus: { required: true, message: '请选择婚姻状况', trigger: 'change' },
        telephone: validatoRules.telephone,
        height: { required: true, message: '请填写身高', trigger: 'blur' }
      },
      otherInfoRules: {
        candidateType: { required: true, message: '请选择应聘人员类型', trigger: 'change' },
        haveAcquaintance: { required: true, message: '在中财是否有熟人', trigger: 'change' },
        postName: { required: true, message: '请填写第一应聘岗位', trigger: 'change' },
        arrivalTime: { required: true, message: '请选择预计到岗时间', trigger: ['change', 'blur'] }
      },
      validatorHealth: validatorHealth,
      resumeSelectIndex: 0,
      jobSelectIndex: 0
    }
  },
  components: {
    AddressSelect
  },
  computed: {
    resumeStartOptions () {
      let selecIndex = this.resumeSelectIndex - 1 < 0 ? 0 : this.resumeSelectIndex - 1
      return {
        disabledDate: (time) => {
          return new Date(time).getTime() < new Date(this.resumeInformation[selecIndex].endDate).getTime()
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
          return new Date(time).getTime() < new Date(this.jobInformation[selecIndex].endDate).getTime()
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
  methods: {
    // 获取学习开始和结束时间
    getResumeTime (index) {
      this.resumeSelectIndex = index
    },
    // 获取学习开始和结束时间
    getJobTime (index) {
      this.jobSelectIndex = index
    },
    // 选择带应聘职位
    chooseJoy () {
      searchJoy({ selectFlag: '1', size: 10000 }).then(res => {
        if (res.result && res.result.records) {
          this.joyList = res.result.records
        }
      })
      this.applyJoy = true
    },
    sureApply () {
      if (this.isChoose === -1) {
        this.$message.warning('请选择要招聘的岗位')
      } else {
        let cur = ''
        let level = this.joyList[this.isChoose].levelOne || ''
        let org = this.joyList[this.isChoose].orgName || ''
        let post = this.joyList[this.isChoose].postName || ''
        if (level !== '' && org !== '' && post !== '') {
          cur = level + '-' + org + '-' + post
        } else if (level === '' && org !== '' && post !== '') {
          cur = org + '-' + post
        } else if (level !== '' && org === '' && post !== '') {
          cur = level + '-' + post
        } else if (level !== '' && org !== '' && post === '') {
          cur = level + '-' + org
        }
        this.otherInformation.postName = cur
        this.prossId = this.joyList[this.isChoose].id
        this.applyJoy = false
      }
    },
    _getAllArea () {
      getAllarea(0).then((data) => {
        if (data.result && data.result.length) {
          data.result.forEach((area) => {
            this.archiveArea.optionProvinces.push(area)
            this.hujiArea.optionProvinces.push(area)
            this.nowArea.optionProvinces.push(area)
            this.nativeArea.optionProvinces.push(area)
          })
        }
      })
    },
    goBack () {
      this.$router.push({ name: this.$route.query.name })
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
    delListData (row, arr, index, msg) {
      this.resumeSelectIndex = index === 0 ? index : index - 1
      this.jobSelectIndex = index === 0 ? index : index - 1
      if (row.id) {
        this.$confirm('确定要删除这条' + msg + '吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          arr.splice(arr.length - 1, 1)
          if (row.id) {
            let delParams = {
              id: row.id,
              operator: getToken('loginId')
            }
            switch (msg) {
              case '学历' :
                delEduList(delParams).then(data => {
                  this.$message.success('删除成功')
                  this._getAcceptResumeDetail()
                })
                break
              case '工作简历' :
                delResumeList(delParams).then(data => {
                  this.$message.success('删除成功')
                  this._getAcceptJobDetail()
                })
                break
              case '家庭成员' :
                delFamilyList(delParams).then(data => {
                  this.$message.success('删除成功')
                  this._getAcceptFamilyDetail()
                })
            }
          }
        }).catch(() => {})
      } else {
        arr.splice(index, 1)
      }
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
      checkAcceptBaseDetail(this.$route.params.acceptId).then((data) => {
        this.baseInformation = data.result
        this.baseInformation.inZcBefore = this.baseInformation.inZcBefore !== null ? this.baseInformation.inZcBefore : 0
        // console.log('baseInformation', this.baseInformation)
        if (data.result.nativePlaceMod) {
          this.nativeForm = data.result.nativePlaceMod
          this.nativeArea.provinceId = this.nativeForm.provinceId
          this.nativeArea.provinceName = this.nativeForm.provinceName
          this.nativeArea.cityId = this.nativeForm.cityId
          if (this.nativeForm.provinceId) {
            getAllarea(this.nativeForm.provinceId).then(data => {
              if (data.result && data.result.length) {
                data.result.forEach((area) => {
                  this.nativeArea.optionCities.push(area)
                })
              }
            })
          }
          if (this.nativeForm.cityId) {
            getAllarea(this.nativeForm.cityId).then((data) => {
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
            getAllarea(this.nowAddressForm.provinceId).then((data) => {
              if (data.result && data.result.length) {
                data.result.forEach((area) => {
                  this.nowArea.optionCities.push(area)
                })
              }
            })
          }
          if (this.nowAddressForm.cityId) {
            getAllarea(this.nowAddressForm.cityId).then((data) => {
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
            getAllarea(this.hujiForm.provinceId).then((data) => {
              if (data.result && data.result.length) {
                data.result.forEach((area) => {
                  this.hujiArea.optionCities.push(area)
                })
              }
            })
          }
          if (this.hujiForm.cityId) {
            getAllarea(this.hujiForm.cityId).then((data) => {
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
            getAllarea(this.archivesAddressForm.provinceId).then((data) => {
              if (data.result && data.result.length) {
                data.result.forEach((area) => {
                  this.archiveArea.optionCities.push(area)
                })
              }
            })
          }
          if (this.archivesAddressForm.cityId) {
            getAllarea(this.archivesAddressForm.cityId).then((data) => {
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
        this._getAccountOtherDetail()
        this._getAcceptJobDetail()
        this._getAcceptFamilyDetail()
        this._getAcceptResumeDetail()
      })
    },
    _getAccountOtherDetail () {
      checkAcceptOtherDetail(this.$route.params.acceptId).then((data) => {
        if (data.result && data.result.length) {
          data.result[0].expectMaxYearSalary = ''
          this.otherInformation = data.result[0]
          this.prossId = this.otherInformation.demandId
          let datas = data.result[0].expectYearSalary
          if (datas && datas !== 'null,undefined') {
            this.otherInformation.expectYearSalary = datas.split(',')[0] ? datas.split(',')[0] : ''
            this.otherInformation.expectMaxYearSalary = datas.split(',')[1] ? datas.split(',')[1] : ''
          } else {
            this.otherInformation.expectYearSalary = ''
            this.otherInformation.expectMaxYearSalary = ''
          }
        } else {
          this.otherInformation.expectYearSalary = ''
          this.otherInformation.expectMaxYearSalary = ''
        }
      })
    },
    _getAcceptJobDetail () {
      checkAcceptJobDetail(this.$route.params.acceptId).then((data) => {
        this.jobInformation = data.result
      })
    },
    _getAcceptFamilyDetail () {
      checkAcceptFamilyDetail(this.$route.params.acceptId).then((data) => {
        this.familyInformation = data.result
        this.familyInformation.forEach(item => {
          if (item.relation === 0) {
            item.relation = ''
          }
        })
      })
    },
    _getAcceptResumeDetail () {
      checkAcceptResumeDetail(this.$route.params.acceptId).then(data => {
        this.resumeInformation = data.result
      })
    },
    editAccept: debounce(function (e) {
      let vail0 = false
      let vail1 = false
      let vail2 = false
      this.$refs['baseInformation'].validate((vaild, object) => {
        if (vaild) {
          vail2 = vaild
          return vail2
        } else {
          for (let key in object) {
            return this.$message.warning(object[key][0].message)
          }
        }
      })
      this.$refs['otherInfomation'].validate((vaild) => {
        vail0 = vaild
      })
      this.$refs['healthRef'].validate((vaild, object) => {
        vail1 = vaild
      })
      if (vail0 && vail2 && vail1) {
        if (!this.nativeArea.provinceId || !this.nativeArea.cityId || !this.nativeArea.areaId) {
          this.$message.warning('请填写籍贯地址')
          return
        }
        if (!this.hujiArea.provinceId || !this.hujiArea.cityId || !this.hujiArea.areaId) {
          this.$message.warning('请填写户籍地址')
          return
        }
        if (!this.nowArea.provinceId || !this.nowArea.cityId || !this.nowArea.areaId || !this.nowAddressForm.address) {
          this.$message.warning('请填写现住址')
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
        let healthList = []
        /* (id 健康状况 dicId 字段对应数据字典ID) */
        this.baseInformation.healthStatusList.forEach(item => {
          healthList.push({
            id: item.id,
            deleteTag: item.deleteTag,
            dictId: item.dictId,
            status: item.status,
            text: item.status === 1 ? item.text : ''
          })
        })
        /* (验证新增的健康条件) */
        let IdStatus = healthList.map(item => item.status)
        if ((IdStatus).indexOf(-1) !== -1) {
          this.$message.warning('健康状况填写不完整!')
          return false
        }
        if (this.tipShow) {
          this.$message.warning('期望年薪输入有误!')
          return false
        }
        let preload = {
          'userBaseInfo': {
            id: this.baseInformation.id,
            operator: getToken('loginId'),
            name: this.baseInformation.name,
            sex: this.baseInformation.sex,
            birthday: timeToString(this.baseInformation.birthday),
            nation: this.baseInformation.nation,
            graduationDate: dayjs(this.baseInformation.graduationDate).format('YYYY-MM-DD'),
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
            healthStatusList: healthList,
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
            expectYearSalary: (this.otherInformation.expectYearSalary === '' && this.otherInformation.expectMaxYearSalary === '') ? '' : this.otherInformation.expectYearSalary + ',' + this.otherInformation.expectMaxYearSalary,
            expectMonthSalary: this.otherInformation.expectMonthSalary,
            candidateType: this.otherInformation.candidateType,
            postName: this.otherInformation.postName,
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
        savePersonnelMsgNew(preload).then((res) => {
          this.$message.success('编辑成功')
          setTimeout(() => {
            this.goBack()
          }, 200)
        })
      }
    }, 500),
    /* 获取数字字典 */
    async _getQueryClassList () {
      /* 政治面貌 */
      await getSysDic('politicsStatus').then((data) => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1 || item.id === this.baseInformation.politicsStatus) {
              item.disabled = false
              if (item.enable === 2) {
                item.disabled = true
              }
              this.polticOption.push(item)
            }
          })
        }
      })
      /* 最高学历 */
      await getSysDic('highestEducation').then((data) => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1 || item.id === this.baseInformation.highestEducation) {
              item.disabled = false
              if (item.enable === 2) {
                item.disabled = true
              }
              this.eduOption.push(item)
            }
          })
        }
      })
      /* 婚姻状况 */
      await getSysDic('maritalStatus').then((data) => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1 || item.id === this.baseInformation.maritalStatus) {
              item.disabled = false
              if (item.enable === 2) {
                item.disabled = true
              }
              this.marriageOption.push(item)
            }
          })
        }
      })
      /* 增加学历中简历 */
      await getSysDic('education').then((data) => {
        if (data.result) {
          let eduIds = this.resumeInformation.map(item => item.education)
          data.result.forEach(item => {
            if (item.enable === 1 || eduIds.indexOf(item.id) !== -1) {
              item.disabled = false
              if (item.enable === 2) {
                item.disabled = true
              }
              this.SelecteduOption.push(item)
            }
          })
        }
      })
      /* 家庭成员称呼 */
      await getSysDic('relation').then((data) => {
        if (data.result) {
          let reaIds = this.familyInformation.map(item => item.relation)
          data.result.forEach(item => {
            if (item.enable === 1 || reaIds.indexOf(item.id) !== -1) {
              item.disabled = false
              if (item.enable === 2) {
                item.disabled = true
              }
              this.relationOption.push(item)
            }
          })
        }
      })
      /* 应聘人员类型 */
      await getSysDic('candidateType').then((data) => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1 || item.id === this.otherInformation.candidateType) {
              this.candidateTypeRadio.push(item)
              item.disabled = false
              if (item.enable === 2) {
                item.disabled = true
              }
            }
          })
        }
      })
      /* 中财是否有熟人 */
      await getSysDic('haveAcquaintance').then((data) => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1 || item.id === this.otherInformation.haveAcquaintance) {
              this.haveAcquaintanceRadio.push(item)
              item.disabled = false
              if (item.enable === 2) {
                item.disabled = true
              }
            }
          })
        }
      })

      /* 健康状况
      await getSysDic('healthStatus').then((data) => {
          if (data.result) {
            console.log('健康', data.result)
            let dicHeathArray = []
            let editHeathArray = []
            data.result.forEach(item => {
              if (item.enable === 1) {
                dicHeathArray.push(item)
              }
            })
            this.baseInformation.healthStatusList.forEach(item => {
              editHeathArray.push(item)
            })
            // console.log('dic', dicHeathArray)
            // console.log('edit', editHeathArray)
            let dicArrayId = editHeathArray.map(item => item.dictId)
            let result = dicHeathArray.filter(item => !dicArrayId.includes(item.id))
            // console.log('最后相差数据', result)
            result.forEach(item => {
              this.baseInformation.healthStatusList.push({
                id: '',
                deleteTag: item.deleteTag,
                dictId: item.id,
                status: '',
                text: '',
                code: item.code,
                codeText: item.codeText
              })
            })
            // console.log('完整数据', this.baseInformation.healthStatusList)
          }
      }) */
    }

  },
  watch: {
    'baseInformation' (value) {
      if (value && !this.policCount) {
        this._getQueryClassList()
        this.policCount = true
      }
    }
  },
  created () {
    this._getAllArea()
    this._getAcceptDetail()
  }
}
</script>
<style lang="less" scoped>
.rang-span{
  position: relative;
  top:10px;
  left:18px;
}
.el-select{
  width: 100%;
}
  .health{
    .health-text{
      width: 45%;
      margin-left: 5%;
    }
  }
.interViewDialog{
  &/deep/.el-dialog__body{
    &/deep/.el-table{
      max-height: 500px;
      overflow-y: auto;
    }
  }
}
.tip-span{
  font-size:13px;
  color:red;
  position:absolute;
  top:45px;
}
</style>
