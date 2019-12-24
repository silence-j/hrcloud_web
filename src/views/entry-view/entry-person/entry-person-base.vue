<template>
<div class="entry-perosn-base_box">
  <el-form
    :model="personBaseForm"
    label-width="130px"
    :rules="personnelRules"
    ref="personBaseRef">
    <!-- 身份证信息 -->
    <p class="base-sec-title">身份证信息</p>
    <el-row>
      <el-col :span="8">
        <el-form-item label="姓　名：" prop="name">
          <el-input v-model.trim="personBaseForm.name" placeholder="请填写姓名"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item  label="性　　别：" prop="sex">
          <el-select
            @change="changeSex"
            v-model="personBaseForm.sex"
            filterable
            placeholder="请填写性别"
            style="width:100%">
            <el-option :value="'0'" label="女" ></el-option>
            <el-option :value="'1'" label="男"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="民　　族：" prop="nation">
          <el-input v-model="personBaseForm.nation"  placeholder="请填写民族"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="出 生 日 期：" prop="birthday">
          <el-date-picker
              v-model="personBaseForm.birthday"
              type="date"
              placeholder="请选择出生日期"
              :picker-options="pickerOptionsBirth">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="身份证号：" prop="idCardNumber" >
          <el-input v-model="personBaseForm.idCardNumber" placeholder="请填写身份证号"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">
        <el-form-item label="身份证地址：" required >
          <address-select
            :area="areaCollections.idCardAddressArea"
            :colSpan="7"
            :lineSpan="1"
            ref="idAddressRef"
            :showZone="true">
          </address-select>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="详 细 地 址："  prop="idCardAddress">
          <el-input :number="true" v-model="personBaseForm.idCardAddress" placeholder="请填写身份证详细地址" ></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 户籍信息 -->
    <p class="base-sec-title">户籍信息</p>
    <el-row>
      <el-col :span="14">
        <el-form-item label="户 籍 地 址：" required>
          <address-select
            :area="areaCollections.hujiAddressArea"
            :colSpan="7"
            :lineSpan="1"
            ref="hjAddressRef"
            :showZone="true">
          </address-select>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item  prop="hujiAddress" label="详 细 地 址：">
          <el-input placeholder="请填写户籍详细地址" :number="true" v-model="personBaseForm.hujiAddress"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">
        <el-form-item label="户 籍 性 质：" prop="nature">
          <el-select v-model="personBaseForm.nature" placeholder="请选择户籍性质" style="width:98%">
            <el-option label="城镇" :value="1"></el-option>
            <el-option label="农村" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="曾 用 名：" >
          <el-input v-model="personBaseForm.formerName" placeholder="请填写曾用名"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">
        <el-form-item label="出 生 地 址：" required>
          <address-select
            :area='areaCollections.birthAddressArea'
            :colSpan="7"
            :lineSpan="1"
            ref="birthAddressRef"
            :showZone="true">
          </address-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="身    高：" prop="height">
          <el-input type="number" min="0" v-model="personBaseForm.height" placeholder="请填写身高"><template slot="append">CM</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="体    重：">
          <el-input type="number" min="0" v-model="personBaseForm.weight" placeholder="请填写体重"><template slot="append">KG</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">
        <el-form-item label="籍 贯 地 址：" required>
          <address-select
            :area='areaCollections.nativeAddressArea'
            :colSpan="7"
            :lineSpan="1"
            ref="nativeAddressRef"
            :showZone="true">
          </address-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="婚 姻 状 况：" prop="maritalStatus">
          <el-select v-model="personBaseForm.maritalStatus" filterable placeholder="请选择婚姻状况" style="width:100%;">
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
        <el-form-item label="政 治 面 貌：" prop="politicsStatus">
          <el-select v-model="personBaseForm.politicsStatus"  placeholder="请填写政治面貌">
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

    <!-- 教育背景 -->
    <p class="base-sec-title">教育背景</p>
    <el-row>
      <el-col :span="8">
        <el-form-item  label="最 高 学 历：" prop="highestEducation">
          <el-select v-model="personBaseForm.highestEducation" style="width:100%" placeholder="请填写最高学历">
            <el-option
              v-for="item in eduSelectOption"
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
            v-model="personBaseForm.graduationDate"
            type="month"
            placeholder="请选择时间">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="毕 业 院 校：" prop="schoolOfGraduation">
          <el-input v-model="personBaseForm.schoolOfGraduation" placeholder="请填写毕业院校"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="所 学 专 业：">
          <el-input v-model="personBaseForm.major" placeholder="请填写所学专业"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="学历获取形式：" >
          <el-select v-model="personBaseForm.highestEducationWay" filterable placeholder="请选择学历获取形式" style="width:100%;">
            <el-option
              v-for="item in highestEducationWaySelect"
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
          <el-select v-model="personBaseForm.educationCertificateStatus" filterable placeholder="请选择学历认证情况" style="width:100%;">
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
          <el-input v-model="personBaseForm.technicalTitle" placeholder="请填写技术职称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="职 业 资 格：" label-width="130px">
          <el-input v-model="personBaseForm.vocationalQualification" placeholder="请填写职业资格"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="技 能 等 级：" >
          <el-input v-model="personBaseForm.technicalGrade" placeholder="请填写技能等级"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 地址及联系信息 -->
    <p class="base-sec-title">地址及联系信息</p>
    <el-row>
      <el-col :span="14">
        <el-form-item  label="档案存放地："  required>
          <address-select
            :area="areaCollections.archivesAddressArea"
            :colSpan="7"
            :lineSpan="1"
            ref="archivesAddressRef"
            :showZone="true"></address-select>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="详 细 地 址：" prop="archivesAddress">
          <el-input placeholder="请填写档案存放地详细地址" :number="true" v-model="personBaseForm.archivesAddress"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">
        <el-form-item label="现居住住址：" required>
          <address-select
          :area='areaCollections.nowAddressArea'
          :colSpan="7"
          :lineSpan="1"
          ref="nowAddressRef"
          :showZone="true"></address-select>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="详 细 地 址：" prop="nowAddress">
          <el-input placeholder="请填写现住址详细地址" :number="true" v-model="personBaseForm.nowAddress"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">
        <el-form-item
          label="通 讯 地 址："
          required>
          <address-select
            :area='areaCollections.contactAddressArea'
            :colSpan="7"
            :lineSpan="1"
            :showZone="true"
            ref="contactAddressRef">
          </address-select>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="详 细 地 址：" prop="contactAddress">
          <el-input placeholder="请填写通讯详细地址" :number="true" v-model="personBaseForm.contactAddress"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="联 系 电 话：" prop="telephone">
          <el-input v-model="personBaseForm.telephone" placeholder="请填写联系电话"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
        prop="mail"
        label="电子邮箱：">
          <el-input v-model="personBaseForm.mail" placeholder="请填写电子邮箱"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 其他信息 -->
    <p class="base-sec-title">其他信息</p>
    <el-row>
      <el-col :span="8">
        <el-form-item label="工资卡号：">
          <el-input type="number" min="0" v-model="personBaseForm.payCardNo" placeholder="请填写工资卡号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="开户行：">
          <el-input v-model="personBaseForm.openBank"  placeholder="请填写开户行"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</div>
</template>
<script>
import AddressSelect from 'components/AddressSelect'
import { personnelRules } from 'assets/js/validator'
import { getAllarea, getSysDic } from 'static/api/common/common'
import { areaJson } from 'utils/config'
import { checkAcceptBaseDetail, checkLinkAcceptBaseDetail } from 'static/api/recruit/accept/accept'
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
    return {
      originalData: {},
      /* 婚姻状况 */
      marriageOption: [],
      /* 政治面貌 */
      polticOption: [],
      /* 最高学历 */
      eduSelectOption: [],
      /* 学历获取形式 */
      highestEducationWaySelect: [],
      /* 学历认证情况 */
      educationCertificateOption: [],
      /* 户籍性质 */
      natureOption: [],
      pickerOptionsBirth: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      personnelRules: Object.assign({}, personnelRules, { mail: { validator: validateMail, trigger: 'blur' } }),
      personBaseForm: {
        name: '',
        sex: '',
        nation: '',
        birthday: '',
        idCardNumber: '',
        nature: '',
        formerName: '',
        height: '',
        weight: '',
        maritalStatus: '',
        politicsStatus: '',
        educationCertificateStatus: '',
        highestEducationWay: '',
        major: '',
        technicalGrade: '',
        vocationalQualification: '',
        technicalTitle: '',
        birthAddress: '',
        contactAddress: '',
        idCardMod: [], // mod用来做验证，没有其他用途
        idCardAddress: '',
        nowAddress: '',
        archivesAaddress: '',
        nativeAddress: '',
        hujiAddress: '',
        archivesAddressId: '',
        hujiAddressId: '',
        nativeAddressId: '',
        birthAddressId: '',
        nowAddressId: '',
        idCardAddressId: '',
        contactAddressId: ''
      },
      areaCollections: {
        idCardAddressArea: this.deepClone(areaJson),
        hujiAddressArea: this.deepClone(areaJson),
        birthAddressArea: this.deepClone(areaJson),
        nativeAddressArea: this.deepClone(areaJson),
        archivesAddressArea: this.deepClone(areaJson),
        nowAddressArea: this.deepClone(areaJson),
        contactAddressArea: this.deepClone(areaJson)
      }
    }
  },
  components: {
    AddressSelect
  },
  computed: {
    employeeId () {
      return this.$route.query.employeeId
    }
  },
  methods: {
    // 验证处理
    getIdCardProvince (value) {
      this.personBaseForm.idCardMod.push(value)
    },
    getIdCardCity (value) {
      this.personBaseForm.idCardMod.push(value)
    },
    getIdCardZone (value) {
      this.personBaseForm.idCardMod.push(value)
    },
    _getAllArea () {
      getAllarea(0).then(data => {
        if (data.result && data.result.length) {
          data.result.forEach((area) => {
            this.areaCollections.idCardAddressArea.optionProvinces.push(area)
            this.areaCollections.nowAddressArea.optionProvinces.push(area)
            this.areaCollections.nativeAddressArea.optionProvinces.push(area)
            this.areaCollections.archivesAddressArea.optionProvinces.push(area)
            this.areaCollections.hujiAddressArea.optionProvinces.push(area)
            this.areaCollections.birthAddressArea.optionProvinces.push(area)
            this.areaCollections.contactAddressArea.optionProvinces.push(area)
          })
        }
      })
    },
    handleRulst (data) {
      if (data.result) {
        // console.log('详情显示', data.result)
        this.personBaseForm = data.result
        this.$store.commit('SET_ENTRY_DETAIL_ID', data.result.userId)
        this.$store.commit('SET_ENTRY_IDCARDNUMBER', data.result.idCardNumber)
        this.$store.commit('SET_INZCBEFORE', data.result.inZcBefore)
        this.$emit('changeSex', data.result.sex)
        this.personBaseForm.sex = data.result.sex.toString()
        if (data.result.birthday) this.personBaseForm.birthday = new Date(data.result.birthday)
        if (data.result.graduationDate) this.personBaseForm.graduationDate = new Date(data.result.graduationDate)
        // 通讯地址
        if (data.result.contactAddressMod) {
          this.personBaseForm.contactAddressId = data.result.contactAddressMod.id
          this.areaCollections.contactAddressArea.id = data.result.contactAddressMod.id
          this.areaCollections.contactAddressArea.provinceId = data.result.contactAddressMod.provinceId
          this.areaCollections.contactAddressArea.provinceName = data.result.contactAddressMod.provinceName
          this.areaCollections.contactAddressArea.cityId = data.result.contactAddressMod.cityId
          if (this.areaCollections.contactAddressArea.provinceId) {
            this.areaCollections.contactAddressArea.optionCities = []
            getAllarea(this.areaCollections.contactAddressArea.provinceId).then(data => {
              if (data.result && data.result.length) {
                data.result.forEach((area) => {
                  this.areaCollections.contactAddressArea.optionCities.push(area)
                })
              }
            })
          }
          if (this.areaCollections.contactAddressArea.cityId) {
            this.areaCollections.contactAddressArea.optionZones = []
            getAllarea(this.areaCollections.contactAddressArea.cityId).then(data => {
              if (data.result && data.result.length) {
                data.result.forEach((area) => {
                  this.areaCollections.contactAddressArea.optionZones.push(area)
                })
              }
            })
          }
          this.areaCollections.contactAddressArea.cityName = data.result.contactAddressMod.cityName
          this.areaCollections.contactAddressArea.areaId = data.result.contactAddressMod.areaId
          this.areaCollections.contactAddressArea.areaName = data.result.contactAddressMod.areaName
          this.personBaseForm.contactAddress = data.result.contactAddressMod.address
        }
        // 身份证地址
        if (data.result.idCardAddressMod) {
          this.personBaseForm.idCardAddressId = data.result.idCardAddressMod.id
          this.areaCollections.idCardAddressArea.id = data.result.idCardAddressMod.id
          this.areaCollections.idCardAddressArea.provinceId = data.result.idCardAddressMod.provinceId
          this.areaCollections.idCardAddressArea.provinceName = data.result.idCardAddressMod.provinceName
          this.areaCollections.idCardAddressArea.cityId = data.result.idCardAddressMod.cityId
          if (this.areaCollections.idCardAddressArea.provinceId) {
            this.areaCollections.idCardAddressArea.optionCities = []
            getAllarea(this.areaCollections.idCardAddressArea.provinceId).then(data => {
              if (data.result && data.result.length) {
                data.result.forEach((area) => {
                  this.areaCollections.idCardAddressArea.optionCities.push(area)
                })
              }
            })
          }
          if (this.areaCollections.idCardAddressArea.cityId) {
            this.areaCollections.idCardAddressArea.optionZones = []
            getAllarea(this.areaCollections.idCardAddressArea.cityId).then(data => {
              if (data.result && data.result.length) {
                data.result.forEach((area) => {
                  this.areaCollections.idCardAddressArea.optionZones.push(area)
                })
              }
            })
          }
          this.areaCollections.idCardAddressArea.cityName = data.result.idCardAddressMod.cityName
          this.areaCollections.idCardAddressArea.areaId = data.result.idCardAddressMod.areaId
          this.areaCollections.idCardAddressArea.areaName = data.result.idCardAddressMod.areaName
          this.personBaseForm.idCardAddress = data.result.idCardAddressMod.address
        }
        // 现居住住址
        if (data.result.nowAddressMod) {
          this.personBaseForm.nowAddressId = data.result.nowAddressMod.id
          this.areaCollections.nowAddressArea.id = data.result.nowAddressMod.id
          this.areaCollections.nowAddressArea.provinceId = data.result.nowAddressMod.provinceId
          this.areaCollections.nowAddressArea.provinceName = data.result.nowAddressMod.provinceName
          this.areaCollections.nowAddressArea.cityId = data.result.nowAddressMod.cityId
          if (this.areaCollections.nowAddressArea.provinceId) {
            this.areaCollections.nowAddressArea.optionCities = []
            getAllarea(this.areaCollections.nowAddressArea.provinceId).then(data => {
              if (data.result && data.result.length) {
                data.result.forEach((area) => {
                  this.areaCollections.nowAddressArea.optionCities.push(area)
                })
              }
            })
          }
          if (this.areaCollections.nowAddressArea.cityId) {
            this.areaCollections.nowAddressArea.optionZones = []
            getAllarea(this.areaCollections.nowAddressArea.cityId).then(data => {
              if (data.result && data.result.length) {
                data.result.forEach((area) => {
                  this.areaCollections.nowAddressArea.optionZones.push(area)
                })
              }
            })
          }
          this.areaCollections.nowAddressArea.cityName = data.result.nowAddressMod.cityName
          this.areaCollections.nowAddressArea.areaId = data.result.nowAddressMod.areaId
          this.areaCollections.nowAddressArea.areaName = data.result.nowAddressMod.areaName
          this.personBaseForm.nowAddress = data.result.nowAddressMod.address
        }
        // 档案存放地
        if (data.result.archivesAddressMod) {
          this.personBaseForm.archivesAddressId = data.result.archivesAddressMod.id
          this.areaCollections.archivesAddressArea.id = data.result.archivesAddressMod.id
          this.areaCollections.archivesAddressArea.provinceId = data.result.archivesAddressMod.provinceId
          this.areaCollections.archivesAddressArea.provinceName = data.result.archivesAddressMod.provinceName
          this.areaCollections.archivesAddressArea.cityId = data.result.archivesAddressMod.cityId
          if (this.areaCollections.archivesAddressArea.provinceId) {
            this.areaCollections.archivesAddressArea.optionCities = []
            getAllarea(this.areaCollections.archivesAddressArea.provinceId).then(data => {
              if (data.result && data.result.length) {
                data.result.forEach((area) => {
                  this.areaCollections.archivesAddressArea.optionCities.push(area)
                })
              }
            })
          }
          if (this.areaCollections.archivesAddressArea.cityId) {
            this.areaCollections.archivesAddressArea.optionZones = []
            getAllarea(this.areaCollections.archivesAddressArea.cityId).then(data => {
              if (data.result && data.result.length) {
                data.result.forEach((area) => {
                  this.areaCollections.archivesAddressArea.optionZones.push(area)
                })
              }
            })
          }
          this.areaCollections.archivesAddressArea.cityName = data.result.archivesAddressMod.cityName
          this.areaCollections.archivesAddressArea.areaId = data.result.archivesAddressMod.areaId
          this.areaCollections.archivesAddressArea.areaName = data.result.archivesAddressMod.areaName
          this.personBaseForm.archivesAddress = data.result.archivesAddressMod.address
        }
        // 籍贯地址
        if (data.result.nativePlaceMod) {
          this.personBaseForm.nativeAddressId = data.result.nativePlaceMod.id
          this.areaCollections.nativeAddressArea.id = data.result.nativePlaceMod.id
          this.areaCollections.nativeAddressArea.provinceId = data.result.nativePlaceMod.provinceId
          this.areaCollections.nativeAddressArea.provinceName = data.result.nativePlaceMod.provinceName
          this.areaCollections.nativeAddressArea.cityId = data.result.nativePlaceMod.cityId
          if (this.areaCollections.nativeAddressArea.provinceId) {
            this.areaCollections.nativeAddressArea.optionCities = []
            getAllarea(this.areaCollections.nativeAddressArea.provinceId).then(data => {
              if (data.result && data.result.length) {
                data.result.forEach((area) => {
                  this.areaCollections.nativeAddressArea.optionCities.push(area)
                })
              }
            })
          }
          if (this.areaCollections.nativeAddressArea.cityId) {
            this.areaCollections.nativeAddressArea.optionZones = []
            getAllarea(this.areaCollections.nativeAddressArea.cityId).then(data => {
              if (data.result && data.result.length) {
                data.result.forEach((area) => {
                  this.areaCollections.nativeAddressArea.optionZones.push(area)
                })
              }
            })
          }
          this.areaCollections.nativeAddressArea.cityName = data.result.nativePlaceMod.cityName
          this.areaCollections.nativeAddressArea.areaId = data.result.nativePlaceMod.areaId
          this.areaCollections.nativeAddressArea.areaName = data.result.nativePlaceMod.areaName
          this.personBaseForm.nativeAddress = data.result.nativePlaceMod.address
        }
        // 出生地
        if (data.result.birthplaceMod) {
          this.personBaseForm.birthAddressId = data.result.birthplaceMod.id
          this.areaCollections.birthAddressArea.id = data.result.birthplaceMod.id
          this.areaCollections.birthAddressArea.provinceId = data.result.birthplaceMod.provinceId
          this.areaCollections.birthAddressArea.provinceName = data.result.birthplaceMod.provinceName
          this.areaCollections.birthAddressArea.cityId = data.result.birthplaceMod.cityId
          if (this.areaCollections.birthAddressArea.provinceId) {
            this.areaCollections.birthAddressArea.optionCities = []
            getAllarea(this.areaCollections.birthAddressArea.provinceId).then(data => {
              if (data.result && data.result.length) {
                data.result.forEach((area) => {
                  this.areaCollections.birthAddressArea.optionCities.push(area)
                })
              }
            })
          }
          if (this.areaCollections.birthAddressArea.cityId) {
            this.areaCollections.birthAddressArea.optionZones = []
            getAllarea(this.areaCollections.birthAddressArea.cityId).then(data => {
              if (data.result && data.result.length) {
                data.result.forEach((area) => {
                  this.areaCollections.birthAddressArea.optionZones.push(area)
                })
              }
            })
          }
          this.areaCollections.birthAddressArea.cityName = data.result.birthplaceMod.cityName
          this.areaCollections.birthAddressArea.areaId = data.result.birthplaceMod.areaId
          this.areaCollections.birthAddressArea.areaName = data.result.birthplaceMod.areaName
          this.personBaseForm.birthAddressArea = data.result.birthplaceMod.address
        }
        // 户籍地址
        if (data.result.hujiAddressMod) {
          this.personBaseForm.hujiAddressId = data.result.hujiAddressMod.id
          this.areaCollections.hujiAddressArea.id = data.result.hujiAddressMod.id
          this.areaCollections.hujiAddressArea.provinceId = data.result.hujiAddressMod.provinceId
          this.areaCollections.hujiAddressArea.provinceName = data.result.hujiAddressMod.provinceName
          this.areaCollections.hujiAddressArea.cityId = data.result.hujiAddressMod.cityId
          if (this.areaCollections.hujiAddressArea.provinceId) {
            this.areaCollections.hujiAddressArea.optionCities = []
            getAllarea(this.areaCollections.hujiAddressArea.provinceId).then(data => {
              if (data.result && data.result.length) {
                data.result.forEach((area) => {
                  this.areaCollections.hujiAddressArea.optionCities.push(area)
                })
              }
            })
          }
          if (this.areaCollections.hujiAddressArea.cityId) {
            this.areaCollections.hujiAddressArea.optionZones = []
            getAllarea(this.areaCollections.hujiAddressArea.cityId).then(data => {
              if (data.result && data.result.length) {
                data.result.forEach((area) => {
                  this.areaCollections.hujiAddressArea.optionZones.push(area)
                })
              }
            })
          }
          this.areaCollections.hujiAddressArea.cityName = data.result.hujiAddressMod.cityName
          this.areaCollections.hujiAddressArea.areaId = data.result.hujiAddressMod.areaId
          this.areaCollections.hujiAddressArea.areaName = data.result.hujiAddressMod.areaName
          this.personBaseForm.hujiAddress = data.result.hujiAddressMod.address
        }
        let healthObj = data.result.healthStatusList
        // console.log('edit返回数据', healthObj)
        this.$store.commit('SET_HEALTH_ARR', JSON.stringify(healthObj))
      }
    },
    async _getAcceptDetail () {
      const copyToken = this.$route.query.copyToken
      if (!copyToken) {
        if (this.employeeId) {
          await checkAcceptBaseDetail(this.employeeId).then(data => {
            this.handleRulst(data)
          })
          await this.$store.commit('SET_SAVE2', true)
        }
      } else {
        await checkLinkAcceptBaseDetail(copyToken).then(data => {
          this.handleRulst(data)
        })
        await this.$store.commit('SET_SAVE2', true)
      }
    },
    changeSex (value) {
      this.$emit('changeSex', value)
    },
    vaildPersonBaseForm () {
      let vailPersonBase = ''
      let idValidate = this.$refs.idAddressRef.addressCheck()
      let nativeValidate = this.$refs.nativeAddressRef.addressCheck()
      let birthValidate = this.$refs.birthAddressRef.addressCheck()
      let hjValidate = this.$refs.hjAddressRef.addressCheck()
      let archivesValidate = this.$refs.archivesAddressRef.addressCheck()
      let nowValidate = this.$refs.nowAddressRef.addressCheck()
      let contactValidate = this.$refs.contactAddressRef.addressCheck()
      this.$refs.personBaseRef.validate(valid => {
        vailPersonBase = valid && idValidate && nativeValidate && birthValidate && hjValidate && archivesValidate && nowValidate && contactValidate
      })
      return vailPersonBase
    },
    getBaseDatas () {
      return {
        personBaseForm: this.personBaseForm,
        areaCollections: this.areaCollections
      }
    },
    /* 获取数字字典 */
    async _getQueryClassList () {
      /* 学历获取形式 */
      await getSysDic('highestEducationWay').then((data) => {
        if (data.result) {
          // console.log('学历获取形式', data.result)
          data.result.forEach(item => {
            if (item.enable === 1 || item.id === this.personBaseForm.highestEducationWay) {
              item.disabled = false
              if (item.enable === 2) {
                item.disabled = true
              }
              this.highestEducationWaySelect.push(item)
            }
          })
        }
      })
      /* 婚姻状况 */
      await getSysDic('maritalStatus').then((data) => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1 || item.id === this.personBaseForm.maritalStatus) {
              item.disabled = false
              if (item.enable === 2) {
                item.disabled = true
              }
              this.marriageOption.push(item)
            }
          })
        }
      })
      /* 政治面貌 */
      await getSysDic('politicsStatus').then((data) => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1 || item.id === this.personBaseForm.politicsStatus) {
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
            if (item.enable === 1 || item.id === this.personBaseForm.highestEducation) {
              item.disabled = false
              if (item.enable === 2) {
                item.disabled = true
              }
              this.eduSelectOption.push(item)
            }
          })
        }
      })
      /* 学历认证情况 */
      await getSysDic('educationCertificateStatus').then((data) => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1 || item.id === this.personBaseForm.educationCertificateStatus) {
              item.disabled = false
              if (item.enable === 2) {
                item.disabled = true
              }
              this.educationCertificateOption.push(item)
            }
          })
        }
      })
    }
  },
  watch: {
    personBaseForm: {
      deep: true,
      handler (value) {
        this.$store.commit('SET_SAVE2', false)
      }
    }
  },
  created () {
    this._getAllArea()
    this._getAcceptDetail()
    this.originalData = Object.assign({}, (this.personBaseForm))
    this._getQueryClassList()
  }
}
</script>
<style lang="less" scoped>
</style>
