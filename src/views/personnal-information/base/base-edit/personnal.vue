<template>
  <div class="mt-20">
    <el-collapse v-model="activeNames" accordion>
      <!-- 基本信息 -->
      <el-collapse-item title="基本信息" name="1">
        <el-form
          label-width="130px"
          :model="baseInformation"
          :rules="baseInfoRules"
          ref="baseInformation">
          <p class="base-sec-title">身份证信息</p>
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓　名：" prop="name">
                <el-input v-model="baseInformation.name" disabled ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item  label="性　　别：" prop="sex">
                <el-select
                  v-model="baseInformation.sex"
                  filterable
                  placeholder="请填写性别"
                  style="width:100%">
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
              <el-form-item label="民    族：" prop="nation">
                <el-input v-model="baseInformation.nation"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="出 生 日 期：" prop="birthday">
                <el-date-picker
                  v-model="baseInformation.birthday"
                  type="date"
                  placeholder="请选择时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号：" prop="idCardNumber">
                <el-input v-model="baseInformation.idCardNumber" disabled ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14">
              <el-form-item  label="身份证地址：" prop="province" class="mustForm">
                <address-select
                  :area="idCardAddressArea"
                  :colSpan="7"
                  :lineSpan="1"
                  :showZone="true">
                  </address-select>
              </el-form-item>
            </el-col>
              <el-col :span="10">
                <el-form-item label="详 细 地 址 ：" class="mustForm">
                <el-input placeholder="请填写详细地址" :number="true"  v-model="idCardForm.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <p class="base-sec-title">户籍信息</p>
          <el-row>
            <el-col :span="14">
              <el-form-item label="户 籍 地 址：" prop="province" class="mustForm">
              <address-select
                :area="hujiArea"
                :colSpan="7"
                :lineSpan="1"
                :showZone="true">
              </address-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="详 细 地 址 ：" class="mustForm">
                <el-input placeholder="请填写户籍详细地址" :number="true" v-model="hujiForm.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14">
              <el-form-item label="户 籍 性 质：" prop="nature">
                <el-select v-model="baseInformation.nature" placeholder="请选择户籍性质" style="width:98%">
                  <el-option label="城镇" :value="1"></el-option>
                  <el-option label="农村" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="曾用名：" >
                <el-input v-model="baseInformation.formerName" placeholder="请填写曾用名"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14">
              <el-form-item label="出 生 地 址：" class="mustForm">
                <address-select
                :area='birthplaceArea'
                :colSpan="7"
                :lineSpan="1"
                :showZone="true">
                </address-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="身    高：" prop="height">
                <el-input type="number" min="0" v-model="baseInformation.height"><template slot="append">CM</template></el-input>
              </el-form-item>
            </el-col>
              <el-col :span="5">
              <el-form-item label="体   重：">
                <el-input v-model="baseInformation.weight"><template slot="append">KG</template></el-input>
              </el-form-item>
            </el-col>
          </el-row>
            <el-row>
              <el-col :span="14">
                <el-form-item label="籍 贯 地 址：" class="mustForm">
                  <address-select
                  :area='nativeArea'
                  :colSpan="7"
                  :lineSpan="1"
                  :showZone="true">
                  </address-select>
                </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="婚 姻 状 况 ：" class="mustForm" prop="maritalStatus">
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
            <el-col :span="5">
              <el-form-item label="政 治 面 貌 ：" class="mustForm" prop="politicsStatus">
                <el-select v-model="baseInformation.politicsStatus"  placeholder="请填写政治面貌">
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
          </el-row>

          <p class="base-sec-title">教育背景 </p>
          <el-row>
            <el-col :span="8">
              <el-form-item  label="最 高 学 历：" prop="highestEducation">
                <el-select v-model="baseInformation.highestEducation" placeholder="请填写学历" style="width:100%;">
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
              <el-form-item label="毕 业 时 间：" prop="graduationDate">
                <el-date-picker
                  v-model="baseInformation.graduationDate"
                  type="month"
                  placeholder="请选择时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
              <el-col :span="8">
              <el-form-item label="毕 业 院 校：" prop="schoolOfGraduation">
                <el-input v-model="baseInformation.schoolOfGraduation" placeholder="请填写毕业院校"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="所 学 专 业：" >
                <el-input v-model="baseInformation.major" placeholder="请填写所学专业"></el-input>
              </el-form-item>
            </el-col>
              <el-col :span="8">
              <el-form-item label="学历获取形式：" >
                <el-select v-model="baseInformation.highestEducationWay" filterable placeholder="请选择学历获取形式" style="width:100%;">
                  <el-option
                    v-for="item in highestEducationWayOption"
                    :label="item.codeText"
                    :value="item.id"
                    :key="item.id"
                    :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
              <el-col :span="8">
              <el-form-item label="学历认证情况：" >
                <el-select v-model="baseInformation.educationCertificateStatus" filterable placeholder="请选择学历认证情况" style="width:100%;">
                  <el-option
                    v-for="item in educationCertificateOption"
                    :label="item.codeText"
                    :value="item.id"
                    :key="item.id"
                    :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
              <el-col :span="8">
              <el-form-item label="技 术 职 称：">
                <el-input v-model="baseInformation.technicalTitle" placeholder="请填写技术职称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职 业 资 格：" label-width="130px">
                <el-input v-model="baseInformation.vocationalQualification" placeholder="请填写职业资格"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="技 能 等 级：" >
                <el-input v-model="baseInformation.technicalGrade" placeholder="请填写技能等级"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <p class="base-sec-title">地址及联系信息</p>
          <el-row>
            <el-col :span="14">
              <el-form-item label="档案存放地：" prop="province" class="mustForm">
                <address-select :area="archivesAddressArea" :colSpan="7" :lineSpan="1" :showZone="true"></address-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="详 细 地 址 ：" class="mustForm">
                <el-input placeholder="请填写档案存放地详细地址" :number="true" v-model="archivesForm.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14">
              <el-form-item label="现居住住址：" class="mustForm">
                <address-select :area='nowArea' :colSpan="7" :lineSpan="1" :showZone="true"></address-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="详 细 地 址 ：" class="mustForm">
                <el-input placeholder="请填写现住址详细地址" :number="true" v-model="nowForm.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14">
              <el-form-item  label="通 讯 地 址：" prop="province" class="mustForm">
                <address-select :area='contactAddressArea' :colSpan="7" :lineSpan="1" :showZone="true"></address-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="详 细 地 址 ：" class="mustForm">
                <el-input placeholder="请填写通讯地址详细地址" :number="true" v-model="contactForm.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="联 系 电 话：">
                <el-input v-model="baseInformation.telephone" disabled ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电子邮箱：" prop="mail">
                <el-input v-model="baseInformation.mail"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <p class="base-sec-title">其他信息 </p>
          <el-row>
              <el-col :span="8">
                <el-form-item label="工资卡号:">
                  <el-input v-model="baseInformation.payCardNo" placeholder="请填写工资卡号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开户行:">
                  <el-input v-model="baseInformation.openBank" placeholder="请填写开户行"></el-input>
                </el-form-item>
              </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>

      <!-- 健康情况 -->
      <el-collapse-item title="健康情况" name="2">
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
      </el-collapse-item>

      <!-- 学习简历 -->
      <el-collapse-item title="学习简历" name="3">
        <el-form label-width="100px">
          <el-table
            :data="resumeInformation"
            border>
            <el-table-column
              type="index"
              width="60"
              label="序号">
            </el-table-column>
            <el-table-column
              label="开始年月"
              prop="startDate">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.startDate"
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
                <el-select v-model="scope.row.education" placeholder="请选择学历">
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
                <div class="operation">
                  <span @click="delListData(scope.row, resumeInformation, '学历')" class="icon">删除</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <el-row class="mt-15">
          <el-col :span="1"><el-button type="primary" size="small" @click="addEduMsg">新增</el-button></el-col>
          <!-- <el-col :span="1"  v-if="resumeInformation.length!==0"><el-button type="danger" size="small" @click="deletEduMsg">删除</el-button></el-col> -->
        </el-row>
      </el-collapse-item>

      <!-- 工作简历 -->
      <el-collapse-item title="工作简历" name="4">
         <el-form label-width="150px">
          <el-form-item required label=" 是否在中财工作过">
            <el-radio-group
            v-model="baseInformation.inZcBefore">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          </el-form>
          <el-table
            :data="jobInformation"
            class="mt-20"
            border>
            <el-table-column
            type="index"
            width="60"
            label="序号">
            </el-table-column>
            <el-table-column
              prop="startDate"
              label="开始年月">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.startDate"
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
                  v-model="scope.row.endDate"
                  type="month"
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
                <el-input min='0' v-model="scope.row.telephone" placeholder="请填写证明人电话" ></el-input>
              </template>
            </el-table-column>
              <el-table-column
              label="操作"
              v-if="jobInformation.length>1"
              width="120px"
              >
                <template slot-scope="scope">
                  <div class="operation">
                      <span @click="delListData(scope.row, jobInformation, '工作简历')" class="icon">删除</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          <el-row class="mt-15">
            <el-col :span="1"><el-button type="primary" size="small" @click="addWorkMsg">新增</el-button></el-col>
            <!-- <el-col :span="1"  v-if="resumeInformation.length!==0"><el-button type="danger" size="small" @click="deletEduMsg">删除</el-button></el-col> -->
          </el-row>
      </el-collapse-item>

      <!-- 家庭成员信息 -->
      <el-collapse-item title="家庭成员信息" name="5">
        <el-table
          :data="familyInformation"
          border>
          <el-table-column
            type="index"
            width="60px"
            label="序号">
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
              <el-select v-model="scope.row.relation"  placeholder="请选择称呼">
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
          <el-table-column label="年龄">
            <template slot-scope="scope">
              <el-input type="number" v-model="scope.row.age"  placeholder="请填写年龄"></el-input>
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
              <el-input type="number" min="0" v-model="scope.row.telephone"  placeholder="请填写联系电话" ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            v-if="familyInformation.length>1"
            width="120px">
              <template slot-scope="scope">
                <div class="operation">
                  <span @click="delListData(scope.row, familyInformation, '家庭成员')" class="icon">删除</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-row class="mt-15">
          <el-col :span="1"><el-button type="primary" size="small" @click="familyMsg">新增</el-button></el-col>
          <!-- <el-col :span="1"  v-if="resumeInformation.length!==0"><el-button type="danger" size="small" @click="deletEduMsg">删除</el-button></el-col> -->
          </el-row>
      </el-collapse-item>
    </el-collapse>

    <el-row style="margin-top: 30px">
      <el-col :span="2" :offset="10"><el-button type="primary" size="small" @click="savePersonalInfo">保　存</el-button></el-col>
    </el-row>
  </div>
</template>
<script>
import { validatoRules } from 'assets/js/validator'
import AddressSelect from 'components/AddressSelect.vue'
import { getAllarea, getSysDic } from 'static/api/common/common'
import { getToken } from 'assets/js/util'
import { timeToString } from 'assets/js/common'
import { checkAcceptBaseDetail, checkAcceptOtherDetail, checkAcceptJobDetail, checkAcceptFamilyDetail, checkAcceptResumeDetail, savePersonnelMsg } from 'static/api/recruit/accept/accept'
import { delFamilyList, delResumeList, delEduList } from 'static/api/personnel-information/base/base'
import { debounce } from 'lodash'
import dayjs from 'dayjs'
export default {
  data () {
    var validateMail = (rule, value, callback) => {
      let mail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
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
      disabled: false,
      activeNames: '',
      /* 基本信息 */
      baseInformation: {},
      baseInfoRules: {
        name: { required: true, message: '请填写姓名', trigger: 'blur' },
        sex: { required: true, message: '请选择性别', trigger: 'change' },
        nation: { required: true, message: '请填写民族', trigger: 'blur' },
        birthday: { required: true, message: '请选择出生日期', trigger: 'change' },
        idCardNumber: validatoRules.idCardNumber,
        nature: { required: true, message: '请填写户籍性质', trigger: 'change' },
        height: { required: true, message: '请填写身高', trigger: 'blur' },
        highestEducation: { required: true, message: '请选择最高学历', trigger: 'change' },
        graduationDate: { required: true, message: '请选择毕业时间' },
        schoolOfGraduation: { required: true, message: '请填写毕业学校', trigger: 'blur' },
        mail: { validator: validateMail, trigger: 'blur' }
      },
      healthStatusList: [],
      validatorHealth: validatorHealth,
      /** 地址**/
      idCardForm: {
        id: '',
        provinceId: '',
        provinceName: '',
        cityId: '',
        cityName: '',
        areaId: '',
        areaName: '',
        address: ''
      },
      archivesForm: {
        id: '',
        provinceId: '',
        provinceName: '',
        cityId: '',
        cityName: '',
        areaId: '',
        areaName: '',
        address: ''
      },
      hujiForm: {
        id: '',
        provinceId: '',
        provinceName: '',
        cityId: '',
        cityName: '',
        areaId: '',
        areaName: '',
        address: ''
      },
      contactForm: {
        id: '',
        provinceId: '',
        provinceName: '',
        cityId: '',
        cityName: '',
        areaId: '',
        areaName: '',
        address: ''
      },
      nativeForm: {
        id: '',
        provinceId: '',
        provinceName: '',
        cityId: '',
        cityName: '',
        areaId: '',
        areaName: '',
        address: ''
      },
      birthplaceForm: {
        id: '',
        provinceId: '',
        provinceName: '',
        cityId: '',
        cityName: '',
        areaId: '',
        areaName: '',
        address: ''
      },
      nowForm: {
        id: '',
        provinceId: '',
        provinceName: '',
        cityId: '',
        cityName: '',
        areaId: '',
        areaName: '',
        address: ''
      },
      /** 通讯地址**/
      contactAddressArea: {
        optionProvinces: [],
        optionCities: [],
        optionZones: [],
        provinceId: '',
        provinceName: '',
        cityId: '',
        cityName: '',
        areaId: '',
        areaName: ''
      },
      /** 身份证地址**/
      idCardAddressArea: {
        optionProvinces: [],
        optionCities: [],
        optionZones: [],
        provinceId: '',
        provinceName: '',
        cityId: '',
        cityName: '',
        areaId: '',
        areaName: ''
      },
      /** 生日地址**/
      birthplaceArea: {
        optionProvinces: [],
        optionCities: [],
        optionZones: [],
        provinceId: '',
        provinceName: '',
        cityId: '',
        cityName: '',
        areaId: '',
        areaName: ''
      },
      /** 户籍地址**/
      hujiArea: {
        optionProvinces: [],
        optionCities: [],
        optionZones: [],
        provinceId: '',
        provinceName: '',
        cityId: '',
        cityName: '',
        areaId: '',
        areaName: ''
      },
      /** 档案地址**/
      archivesAddressArea: {
        optionProvinces: [],
        optionCities: [],
        optionZones: [],
        provinceId: '',
        provinceName: '',
        cityId: '',
        cityName: '',
        areaId: '',
        areaName: ''
      },
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
      nowArea: {
        optionProvinces: [],
        optionCities: [],
        optionZones: [],
        provinceId: '',
        provinceName: '',
        cityId: '',
        cityName: '',
        areaId: '',
        areaName: ''
      },
      sexOption: [
        { value: 0, label: '女' },
        { value: 1, label: '男' }
      ],
      /* 最高学历 */
      eduOption: [],
      /* 婚姻状况 */
      marriageOption: [],
      /* 政治面貌 */
      polticOption: [],
      /* 学历获取形式 */
      highestEducationWayOption: [],
      /* 学历 */
      SelecteduOption: [],
      /* 户籍性质 */
      natureOption: [],
      /* 家庭成员称呼 */
      relationOption: [],
      /* 认证情况 */
      educationCertificateOption: [],
      jobInformation: [],
      familyInformation: [],
      resumeInformation: []
    }
  },
  methods: {
    _getAllArea () {
      getAllarea(0).then(data => {
        if (data.result && data.result.length) {
          data.result.forEach(area => {
            this.idCardAddressArea.optionProvinces.push(area)
            this.nowArea.optionProvinces.push(area)
            this.nativeArea.optionProvinces.push(area)
            this.archivesAddressArea.optionProvinces.push(area)
            this.hujiArea.optionProvinces.push(area)
            this.birthplaceArea.optionProvinces.push(area)
            this.contactAddressArea.optionProvinces.push(area)
          })
        }
      })
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
    delListData (row, arr, msg) {
      console.log('arr', arr)
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
                this._getReturnCode(this._checkAcceptResumeDetail())
              })
              break
            case '工作简历' :
              delResumeList(delParams).then(data => {
                this._getReturnCode(this._checkAcceptJobDetail())
              })
              break
            case '家庭成员' :
              delFamilyList(delParams).then(data => {
                this._getReturnCode(this._checkAcceptFamilyDetail())
              })
          }
        }
      }).catch(() => {})
    },
    _getReturnCode (callback) {
      this.$message.success('success')
      setTimeout(() => {
        // eslint-disable-next-line
          callback
      }, 400)
    },
    _getAcceptDetail () {
      checkAcceptBaseDetail(this.$route.params.baseId).then(data => {
        if (data.result) {
          this.baseInformation = data.result
          // 通讯地址
          if (data.result.contactAddressMod) {
            this.contactForm = data.result.contactAddressMod
            this.contactAddressArea.provinceId = this.contactForm.provinceId
            this.contactAddressArea.provinceName = this.contactForm.provinceName
            this.contactAddressArea.cityId = this.contactForm.cityId
            if (this.contactForm.provinceId) {
              getAllarea(this.contactForm.provinceId).then(data => {
                if (data.result && data.result.length) {
                  data.result.forEach((area) => {
                    this.contactAddressArea.optionCities.push(area)
                  })
                }
              })
            }
            if (this.contactForm.cityId) {
              getAllarea(this.contactForm.cityId).then(data => {
                if (data.result && data.result.length) {
                  data.result.forEach((area) => {
                    this.contactAddressArea.optionZones.push(area)
                  })
                }
              })
            }
            this.contactAddressArea.cityName = this.contactForm.cityName
            this.contactAddressArea.areaId = this.contactForm.areaId
            this.contactAddressArea.areaName = this.contactForm.areaName
          }
          // 户籍地址
          if (data.result.hujiAddressMod) {
            this.hujiForm = data.result.hujiAddressMod
            this.hujiArea.provinceId = this.hujiForm.provinceId
            this.hujiArea.provinceName = this.hujiForm.provinceName
            this.hujiArea.cityId = this.hujiForm.cityId
            if (this.hujiForm.provinceId) {
              getAllarea(this.hujiForm.provinceId).then(data => {
                if (data.result && data.result.length) {
                  data.result.forEach((area) => {
                    this.hujiArea.optionCities.push(area)
                  })
                }
              })
            }
            if (this.hujiForm.cityId) {
              getAllarea(this.hujiForm.cityId).then(data => {
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
            // this.baseInformation.hujiAddress = this.hujiForm.address
          }
          // 籍贯地址
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
              getAllarea(this.nativeForm.cityId).then(data => {
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
            // this.baseInformation.nativeAddress = this.nativeForm.address
          }
          // 现住址
          if (data.result.nowAddressMod) {
            this.nowForm = data.result.nowAddressMod
            this.nowArea.provinceId = this.nowForm.provinceId
            this.nowArea.provinceName = this.nowForm.provinceName
            this.nowArea.cityId = this.nowForm.cityId
            if (this.nowForm.provinceId) {
              getAllarea(this.nowForm.provinceId).then(data => {
                if (data.result && data.result.length) {
                  data.result.forEach((area) => {
                    this.nowArea.optionCities.push(area)
                  })
                }
              })
            }
            if (this.nowForm.cityId) {
              getAllarea(this.nowForm.cityId).then(data => {
                if (data.result && data.result.length) {
                  data.result.forEach((area) => {
                    this.nowArea.optionZones.push(area)
                  })
                }
              })
            }
            this.nowArea.cityName = this.nowForm.cityName
            this.nowArea.areaId = this.nowForm.areaId
            this.nowArea.areaName = this.nowForm.areaName
            //  this.baseInformation.nowAddress = this.nowForm.address
          }
          /** 档案所在地**/
          if (data.result.archivesAddressMod) {
            this.archivesForm = data.result.archivesAddressMod
            this.archivesAddressArea.provinceId = this.archivesForm.provinceId
            this.archivesAddressArea.provinceName = this.archivesForm.provinceName
            this.archivesAddressArea.cityId = this.archivesForm.cityId
            if (this.archivesForm.provinceId) {
              getAllarea(this.archivesForm.provinceId).then(data => {
                if (data.result && data.result.length) {
                  data.result.forEach((area) => {
                    this.archivesAddressArea.optionCities.push(area)
                  })
                }
              })
            }
            if (this.archivesForm.cityId) {
              getAllarea(this.archivesForm.cityId).then(data => {
                if (data.result && data.result.length) {
                  data.result.forEach((area) => {
                    this.archivesAddressArea.optionZones.push(area)
                  })
                }
              })
            }
            this.archivesAddressArea.cityName = this.archivesForm.cityName
            this.archivesAddressArea.areaId = this.archivesForm.areaId
            this.archivesAddressArea.areaName = this.archivesForm.areaName
            // this.baseInformation.archivesAddress = this.archivesForm.address
          }
          // 出生地地址
          if (data.result.birthplaceMod) {
            this.birthplaceForm = data.result.birthplaceMod
            this.birthplaceArea.provinceId = this.birthplaceForm.provinceId
            this.birthplaceArea.provinceName = this.birthplaceForm.provinceName
            this.birthplaceArea.cityId = this.birthplaceForm.cityId
            if (this.birthplaceForm.provinceId) {
              getAllarea(this.birthplaceForm.provinceId).then(data => {
                data.result.forEach((area) => {
                  this.birthplaceArea.optionCities.push(area)
                })
              })
            }
            if (this.birthplaceForm.cityId) {
              getAllarea(this.birthplaceForm.cityId).then(data => {
                if (data.result && data.result.length) {
                  data.result.forEach((area) => {
                    this.birthplaceArea.optionZones.push(area)
                  })
                }
              })
            }
            this.birthplaceArea.cityName = this.birthplaceForm.cityName
            this.birthplaceArea.areaId = this.birthplaceForm.areaId
            this.birthplaceArea.areaName = this.birthplaceForm.areaName
          //  this.baseInformation.birthAddress = this.birthplaceForm.address
          }
          // 身份证地址
          if (data.result.idCardAddressMod) {
            this.idCardForm = data.result.idCardAddressMod
            this.idCardAddressArea.provinceId = this.idCardForm.provinceId
            this.idCardAddressArea.provinceName = this.idCardForm.provinceName
            this.idCardAddressArea.cityId = this.idCardForm.cityId
            if (this.idCardForm.provinceId) {
              getAllarea(this.idCardForm.provinceId).then(data => {
                if (data.result && data.result.length) {
                  data.result.forEach((area) => {
                    this.idCardAddressArea.optionCities.push(area)
                  })
                }
              })
            }
            if (this.idCardForm.cityId) {
              getAllarea(this.idCardForm.cityId).then(data => {
                if (data.result && data.result.length) {
                  data.result.forEach((area) => {
                    this.idCardAddressArea.optionZones.push(area)
                  })
                }
              })
            }
            this.idCardAddressArea.cityName = this.idCardForm.cityName
            this.idCardAddressArea.areaId = this.idCardForm.areaId
            this.idCardAddressArea.areaName = this.idCardForm.areaName
            // this.baseInformation.idCardAddress = this.idCardForm.address
          }
        }
      })
      this._checkAcceptOtherDetail()
      this._checkAcceptJobDetail()
      this._checkAcceptFamilyDetail()
      this._checkAcceptResumeDetail()
    },
    _checkAcceptOtherDetail () {
      checkAcceptOtherDetail(this.$route.params.baseId).then(data => {
        if (data.result && data.result.lenght) {
          this.otherInformation = data.result[0]
        }
      })
    },
    _checkAcceptJobDetail () {
      checkAcceptJobDetail(this.$route.params.baseId).then(data => {
        if (data.result) {
          this.jobInformation = data.result
        }
      })
    },
    _checkAcceptFamilyDetail () {
      checkAcceptFamilyDetail(this.$route.params.baseId).then(data => {
        if (data.result) {
          this.familyInformation = data.result
          this.familyInformation.forEach(item => {
            if (item.relation === 0) {
              item.relation = ''
            }
          })
        }
      })
    },
    _checkAcceptResumeDetail () {
      checkAcceptResumeDetail(this.$route.params.baseId).then(data => {
        if (data.result) {
          this.resumeInformation = data.result
        }
      })
    },
    /** 个人信息保存**/
    savePersonalInfo: debounce(function (e) {
      let vail1 = false
      let vail2 = false
      this.$refs['baseInformation'].validate((vaild, object) => {
        if (vaild) {
          vail1 = vaild
          // vail1 = true
          // return vail1
        } else {
          for (let key in object) {
            return this.$message.warning(object[key][0].message)
          }
        }
      })
      this.$refs['healthRef'].validate((vaild, object) => {
        vail2 = vaild
        // if (vaild) {
        //   vail2 = true
        //   return vail2
        // }
      })
      if (vail1 && vail2) {
        let jobData = []
        let eduData = []
        let familyMember = []
        this.familyInformation.forEach((item) => {
          if (item.name || item.relation || item.workUnit || item.post || item.telephone || item.age) {
            familyMember.push({
              operator: getToken('loginId').toString(),
              id: item.id,
              userId: item.userId,
              name: item.name,
              relation: item.relation,
              age: item.age,
              workUnit: item.workUnit,
              post: item.post,
              telephone: item.telephone,
              type: item.type,
              isEmployee: item.isEmployee,
              isKeAbove: item.isKeAbove,
              marryDate: item.marryDate
            })
          }
        })
        this.jobInformation.forEach((item) => {
          if (item.startDate || item.endDate || item.workUnit || item.post || item.certifier || item.telephone) {
            jobData.push({
              operator: getToken('loginId').toString(),
              id: item.id,
              userId: item.userId,
              idCardNumber: item.idCardNumber,
              startDate: timeToString(item.startDate),
              endDate: timeToString(item.endDate),
              workUnit: item.workUnit,
              post: item.post,
              nature: item.nature,
              certifier: item.certifier,
              telephone: item.telephone,
              dimissionReason: item.dimissionReason
            })
          }
        })
        this.resumeInformation.forEach((item) => {
          if (item.startDate || item.endDate || item.school || item.education || item.major) {
            eduData.push({
              operator: getToken('loginId').toString(),
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
        let savePersonalParams = {
          'userBaseInfo': {
            'operator': getToken('loginId').toString(),
            'name': this.baseInformation.name,
            'idCardNumber': this.baseInformation.idCardNumber,
            'sex': this.baseInformation.sex,
            'formerName': this.baseInformation.formerName,
            'nature': this.baseInformation.nature,
            'nation': this.baseInformation.nation,
            'birthday': timeToString(this.baseInformation.birthday),
            'maritalStatus': this.baseInformation.maritalStatus,
            'politicsStatus': this.baseInformation.politicsStatus,
            'highestEducation': this.baseInformation.highestEducation,
            'major': this.baseInformation.major,
            'technicalTitle': this.baseInformation.technicalTitle,
            'schoolOfGraduation': this.baseInformation.schoolOfGraduation,
            'graduationDate': dayjs(this.baseInformation.graduationDate).format('YYYY-MM-DD'),
            'vocationalQualification': this.baseInformation.vocationalQualification,
            'highestEducationWay': this.baseInformation.highestEducationWay,
            'educationCertificateStatus': this.baseInformation.educationCertificateStatus,
            'technicalGrade': this.baseInformation.technicalGrade,
            'height': this.baseInformation.height,
            'weight': this.baseInformation.weight || '',
            'telephone': this.baseInformation.telephone,
            'mail': this.baseInformation.mail,
            'inZcBefore': this.baseInformation.inZcBefore,
            'openBank': this.baseInformation.openBank,
            'payCardNo': this.baseInformation.payCardNo,
            'healthStatusList': healthList,
            'id': this.$route.params.baseId,
            'contactAddressMod': {
              operator: getToken('loginId').toString(),
              id: this.contactForm.id,
              address: this.contactForm.address ? this.contactForm.address : '',
              areaId: this.contactAddressArea.areaId,
              areaName: this.contactAddressArea.areaName,
              cityId: this.contactAddressArea.cityId,
              cityName: this.contactAddressArea.cityName,
              provinceId: this.contactAddressArea.provinceId,
              provinceName: this.contactAddressArea.provinceName
            },
            'idCardAddressMod': {
              operator: getToken('loginId').toString(),
              id: this.idCardForm.id,
              address: this.idCardForm.address ? this.idCardForm.address : '',
              areaId: this.idCardAddressArea.areaId,
              areaName: this.idCardAddressArea.areaName,
              cityId: this.idCardAddressArea.cityId,
              cityName: this.idCardAddressArea.cityName,
              provinceId: this.idCardAddressArea.provinceId,
              provinceName: this.idCardAddressArea.provinceName
            },
            'nowAddressMod': {
              operator: getToken('loginId').toString(),
              id: this.nowForm.id,
              address: this.nowForm.address ? this.nowForm.address : '',
              areaId: this.nowArea.areaId,
              areaName: this.nowArea.areaName,
              cityId: this.nowArea.cityId,
              cityName: this.nowArea.cityName,
              provinceId: this.nowArea.provinceId,
              provinceName: this.nowArea.provinceName
            },
            'birthplaceMod': {
              operator: getToken('loginId').toString(),
              id: this.birthplaceForm.id,
              address: this.birthplaceForm.address ? this.birthplaceForm.address : '',
              areaId: this.birthplaceArea.areaId,
              areaName: this.birthplaceArea.areaName,
              cityId: this.birthplaceArea.cityId,
              cityName: this.birthplaceArea.cityName,
              provinceId: this.birthplaceArea.provinceId,
              provinceName: this.birthplaceArea.provinceName
            },
            'nativePlaceMod': {
              operator: getToken('loginId').toString(),
              id: this.nativeForm.id,
              address: this.nativeForm.address ? this.nativeForm.address : '',
              areaId: this.nativeArea.areaId,
              areaName: this.nativeArea.areaName,
              cityId: this.nativeArea.cityId,
              cityName: this.nativeArea.cityName,
              provinceId: this.nativeArea.provinceId,
              provinceName: this.nativeArea.provinceName
            },
            'hujiAddressMod': {
              operator: getToken('loginId').toString(),
              id: this.hujiForm.id,
              address: this.hujiForm.address ? this.hujiForm.address : '',
              areaId: this.hujiArea.areaId,
              areaName: this.hujiArea.areaName,
              cityId: this.hujiArea.cityId,
              cityName: this.hujiArea.cityName,
              provinceId: this.hujiArea.provinceId,
              provinceName: this.hujiArea.provinceName
            },
            'archivesAddressMod': {
              operator: getToken('loginId').toString(),
              id: this.archivesForm.id,
              address: this.archivesForm.address ? this.archivesForm.address : '',
              areaId: this.archivesAddressArea.areaId,
              areaName: this.archivesAddressArea.areaName,
              cityId: this.archivesAddressArea.cityId,
              cityName: this.archivesAddressArea.cityName,
              provinceId: this.archivesAddressArea.provinceId,
              provinceName: this.archivesAddressArea.provinceName
            }
          },
          'familyMembers': familyMember,
          'jobResume': jobData,
          'userEducations': eduData
        }

        if (this.baseInformation.sex === '') {
          this.$message.warning('请选择性别!')
          return
        }
        if (!this.baseInformation.nation) {
          this.$message.warning('请填写民族!')
          return
        }
        if (!this.baseInformation.birthday) {
          this.$message.warning('请填写出生日期!')
          return
        }
        if (!this.idCardAddressArea.provinceId || !this.idCardAddressArea.cityId || !this.idCardAddressArea.areaId || !this.idCardForm.address) {
          this.$message.warning('请填写身份证地址!')
          return
        }
        if (!this.hujiArea.provinceId || !this.hujiArea.cityId || !this.hujiArea.areaId || !this.hujiForm.address) {
          this.$message({
            type: 'warning',
            message: '请填写户籍地址!'
          })
          return
        }
        if (!this.baseInformation.nature) {
          this.$message({
            type: 'warning',
            message: '请填写户籍性质!'
          })
          return
        }
        if (!this.birthplaceArea.provinceId || !this.birthplaceArea.cityId || !this.birthplaceArea.cityId) {
          this.$message({
            type: 'warning',
            message: '请填写出生地址!'
          })
          return
        }
        if (!this.baseInformation.height) {
          this.$message({
            type: 'warning',
            message: '请填写身高!'
          })
          return
        }
        if (!this.nativeArea.provinceId || !this.nativeArea.cityId || !this.nativeArea.cityId) {
          this.$message({
            type: 'warning',
            message: '请填写籍贯地址!'
          })
          return
        }
        if (!this.baseInformation.maritalStatus) {
          this.$message({
            type: 'warning',
            message: '请填写婚姻状况!'
          })
          return
        }
        if (!this.baseInformation.politicsStatus) {
          this.$message({
            type: 'warning',
            message: '请填写政治面貌!'
          })
          return
        }
        if (!this.baseInformation.highestEducation) {
          this.$message({
            type: 'warning',
            message: '请填写最高学历!'
          })
          return
        }
        if (!this.baseInformation.graduationDate) {
          this.$message({
            type: 'warning',
            message: '请填写毕业时间!'
          })
          return
        }
        if (!this.baseInformation.schoolOfGraduation) {
          this.$message({
            type: 'warning',
            message: '请填写毕业院校!'
          })
          return
        }
        if (!this.archivesAddressArea.provinceId || !this.archivesAddressArea.cityId || !this.archivesAddressArea.areaId || !this.archivesForm.address) {
          this.$message({
            type: 'warning',
            message: '请填写档案存放地!'
          })
          return
        }
        if (!this.nowArea.provinceId || !this.nowArea.cityId || !this.nowArea.areaId || !this.nowForm.address) {
          this.$message({
            type: 'warning',
            message: '请填写现住址!'
          })
          return
        }
        if (!this.contactAddressArea.provinceId || !this.contactAddressArea.cityId || !this.contactAddressArea.areaId || !this.contactForm.address) {
          this.$message({
            type: 'warning',
            message: '请填写通讯地址!'
          })
          return
        }
        savePersonalParams.userBaseInfo = Object.assign(savePersonalParams.userBaseInfo, {
          'idCardAddress': savePersonalParams.userBaseInfo.idCardAddressMod.provinceName + savePersonalParams.userBaseInfo.idCardAddressMod.cityName +
            savePersonalParams.userBaseInfo.idCardAddressMod.areaName + savePersonalParams.userBaseInfo.idCardAddressMod.address,
          'contactAddress': savePersonalParams.userBaseInfo.contactAddressMod.provinceName + savePersonalParams.userBaseInfo.contactAddressMod.cityName +
            savePersonalParams.userBaseInfo.contactAddressMod.areaName + savePersonalParams.userBaseInfo.contactAddressMod.address,
          'birthplace': savePersonalParams.userBaseInfo.birthplaceMod.provinceName + savePersonalParams.userBaseInfo.birthplaceMod.cityName +
            savePersonalParams.userBaseInfo.birthplaceMod.areaName + savePersonalParams.userBaseInfo.birthplaceMod.address,
          'nativePlace': savePersonalParams.userBaseInfo.nativePlaceMod.provinceName + savePersonalParams.userBaseInfo.nativePlaceMod.cityName +
            savePersonalParams.userBaseInfo.nativePlaceMod.areaName + savePersonalParams.userBaseInfo.nativePlaceMod.address,
          'hujiAddress': savePersonalParams.userBaseInfo.hujiAddressMod.provinceName + savePersonalParams.userBaseInfo.hujiAddressMod.cityName +
            savePersonalParams.userBaseInfo.hujiAddressMod.areaName + savePersonalParams.userBaseInfo.hujiAddressMod.address,
          'nowAddress': savePersonalParams.userBaseInfo.nowAddressMod.provinceName + savePersonalParams.userBaseInfo.nowAddressMod.cityName +
            savePersonalParams.userBaseInfo.nowAddressMod.areaName + savePersonalParams.userBaseInfo.nowAddressMod.address,
          'archivesAddress': savePersonalParams.userBaseInfo.archivesAddressMod.provinceName + savePersonalParams.userBaseInfo.archivesAddressMod.cityName +
            savePersonalParams.userBaseInfo.archivesAddressMod.areaName + savePersonalParams.userBaseInfo.archivesAddressMod.address
        })
        savePersonnelMsg(savePersonalParams).then(res => {
          this.$message.success('信息保存成功!')
          setTimeout(() => {
            this._getAcceptDetail()
          }, 200)
        })
      }
    }, 500),
    /* 获取数字字典 */
    async _getQueryClassList () {
      /* 政治面貌 */
      await getSysDic('politicsStatus').then((data) => {
        // console.log('政治面貌', data.result)
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
      /* 婚姻状况 */
      await getSysDic('maritalStatus').then((data) => {
        if (data.result) {
          // console.log('婚姻状况', data.result)
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
      /* 最高学历 */
      await getSysDic('highestEducation').then((data) => {
        if (data.result) {
          // console.log('最高学历', data.result)
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
      /* 学历获取形式 */
      await getSysDic('highestEducationWay').then((data) => {
        if (data.result) {
          // console.log('学历获取形式', data.result)
          data.result.forEach(item => {
            if (item.enable === 1 || item.id === this.baseInformation.highestEducationWay) {
              item.disabled = false
              if (item.enable === 2) {
                item.disabled = true
              }
              this.highestEducationWayOption.push(item)
            }
          })
        }
      })
      /* 增加学历中简历 */
      await getSysDic('education').then((data) => {
        if (data.result) {
          // console.log('增加学历中简历', data.result)
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
          // console.log('家庭成员称呼', data.result)
          let reaIds = this.familyInformation.map(item => item.relation)
          // console.log(reaIds)
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
      /* 认证情况 */
      await getSysDic('educationCertificateStatus').then((data) => {
        if (data.result) {
          // console.log('认证情况', data.result)
          let reaIds = this.familyInformation.map(item => item.educationCertificateStatus)
          data.result.forEach(item => {
            if (item.enable === 1 || reaIds.indexOf(item.id) !== -1) {
              item.disabled = false
              if (item.enable === 2) {
                item.disabled = true
              }
              this.educationCertificateOption.push(item)
            }
          })
        }
      })
      /* 健康状况 */
      await getSysDic('healthStatus').then((data) => {
        if (data.result) {
          // console.log('健康', data.result)
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
      })
    }
  },
  components: {
    AddressSelect
  },
  created () {
    this._getAllArea()
    this._getAcceptDetail()
    this.$store.commit('SET_ACTIVE_ROUTER', '2')
    this._getQueryClassList()
  }
}
</script>
<style lang="less" scoped>
.el-form-item.mustForm::before{top:8px;}
.health{
  .health-text{
    width: 45%;
    margin-left: 5%;
  }
}
.el-collapse-item__header {
    height: 43px;
    line-height: 43px;
    padding-left: 15px;
    background-color: #fff;
    color: #48696a;
    cursor: pointer;
    border-bottom: 1px solid #dfecec;
    font-size: 13px;
}
</style>
