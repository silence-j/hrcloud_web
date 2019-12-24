<template>
<div class="mt-20">
  <el-collapse v-model="activeNames" accordion>
    <el-collapse-item title="基本信息" name="1">
      <el-form  label-width="130px">
        <p class="base-sec-title">身份证信息</p>
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓  名：">
              {{baseInformation.name}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="民   族：">
              {{baseInformation.nation}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  label="性   别：">
                {{baseInformation.sex | filterSex}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="出生日期：">
              {{baseInformation.birthday}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证号：" >
              {{baseInformation.idCardNumber}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="身份证地址：" >
            {{baseInformation.idCardAddress || '未填写'}}
            </el-form-item>
          </el-col>
        </el-row>
        <p class="base-sec-title">户籍信息</p>
          <el-row>
          <el-col :span="10">
              <el-form-item label="户 籍 性 质：">
                <span v-if="baseInformation.nature===1">城镇</span>
                <span v-else-if="baseInformation.nature===2">农村</span>
            </el-form-item>
          </el-col>
        </el-row>
          <el-row>
          <el-col :span="16">
            <el-form-item label="户 籍 地 址：" >
              {{baseInformation.hujiAddress || '未填写'}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
              <el-form-item label="出 生 地 址：" >
               {{baseInformation.birthplace || '未填写'}}
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="政治面貌：" prop="politicsStatus">
              {{baseInformation.politicsStatusText}}
            </el-form-item>
          </el-col>
        </el-row>
          <el-row>
            <el-col :span="14">
              <el-form-item label="籍 贯 地 址：" >
               {{baseInformation.nativePlace || '未填写'}}
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="婚姻状况：" prop="maritalStatus">
                {{baseInformation.maritalStatusText }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="曾用名：" >
              <span v-if="baseInformation.formerName">{{baseInformation.formerName}}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="体重：">
              <span v-if="baseInformation.weight">{{baseInformation.weight}}KG</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="身高：">
              <span v-if="baseInformation.height">{{baseInformation.height}}CM</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
        </el-row>
        <p class="base-sec-title">教育背景 </p>
        <el-row>
          <el-col :span="8">
            <el-form-item  label="最 高 学 历：" prop="heighestEducation">
              {{baseInformation.highestEducationText}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="毕 业 时 间：">
              {{baseInformation.graduationDate}}
            </el-form-item>
          </el-col>
            <el-col :span="8">
            <el-form-item label="毕 业 院 校：">
              {{baseInformation.schoolOfGraduation}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="所 学 专 业：" >
              <span v-if="baseInformation.major">{{baseInformation.major}}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
            <el-col :span="8">
            <el-form-item label="学历获取形式：" >
              <span v-if="baseInformation.highestEducationWayText">{{baseInformation.highestEducationWayText}}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
            <el-col :span="8">
            <el-form-item label="学历认证情况：" >
              <span v-if="baseInformation.educationCertificateStatusText">{{baseInformation.educationCertificateStatusText }}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
            <el-form-item label="技 术 职 称：">
              <span v-if="baseInformation.technicalTitle">{{baseInformation.technicalTitle}}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职 业 资 格：" label-width="130px">
             <span v-if="baseInformation.vocationalQualification">{{baseInformation.vocationalQualification}}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="技 能 等 级：" >
              <span v-if="baseInformation.technicalGrade">{{baseInformation.technicalGrade}}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
        </el-row>
        <p class="base-sec-title">地址及联系 </p>
        <el-row>
          <el-col :span="16">
            <el-form-item label="档案存放地：" >
              {{baseInformation.archivesAddress || '未填写'}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="现居住住址：" >
               {{baseInformation.nowAddress || '未填写'}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="通 讯 地 址：" >
             {{baseInformation.contactAddress || '未填写'}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="联 系 电 话：">
              {{baseInformation.telephone}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电子邮箱：" >
              <span v-if="baseInformation.mail">{{baseInformation.mail}}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
        </el-row>
        <p class="base-sec-title">其他信息 </p>
          <el-row>
            <el-col :span="12">
              <el-form-item label="工资卡号：">
              <span v-if="baseInformation.payCardNo">{{baseInformation.payCardNo}}</span>
              <span v-else class="color999">未填写</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开户行：">
                <span v-if="baseInformation.openBank">{{baseInformation.openBank}}</span>
                <span v-else class="color999">未填写</span>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>
    </el-collapse-item>

    <el-collapse-item title="健康情况" name="2">
      <el-form label-width="300px">
        <el-row v-for="item in baseInformation.healthStatusList" :label="item.codeText" :key="item.code">
          <el-col :span="12" :offset="3">
            <el-form-item :label='item.codeText'>
              <span v-if="item.status === 1">有</span>
              <span v-if="item.status === 0">无</span>
              <span>&nbsp;&nbsp;&nbsp;{{item.text}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-collapse-item>

    <el-collapse-item title="学习简历" name="3">
      <el-form label-width="100px">
        <el-table
          :data="resumeInformation"
          highlight-current-row
          border>
          <el-table-column
          label="开始年月">
            <template slot-scope="scope">{{scope.row.startDate | filterGraduate}}</template>
          </el-table-column>
          <el-table-column
            label="结束年月">
            <template slot-scope="scope">{{scope.row.endDate | filterGraduate}}</template>
          </el-table-column>

          <el-table-column
            prop="school"
            label="学校">
          </el-table-column>

          <el-table-column
            prop="major"
            label="专业">
          </el-table-column>

          <el-table-column
            label="学历">
            <template slot-scope="scope">
              {{scope.row.educationText}}
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </el-collapse-item>

    <el-collapse-item title="工作简历" name="4">
      <el-form label-width="150px">
        <el-form-item required label=" 是否在中财工作过">
             <el-radio-group
              disabled
              v-model="baseInformation.inZcBefore">
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
          label="开始年月">
          <template slot-scope="scope">{{scope.row.startDate | filterGraduate}}</template>
        </el-table-column>
        <el-table-column
          label="结束年月">
          <template slot-scope="scope">{{scope.row.endDate | filterGraduate}}</template>
        </el-table-column>
        <el-table-column
          prop="workUnit"
          label="工作单位">
        </el-table-column>
        <el-table-column
          prop="post"
          label="岗位">
        </el-table-column>
        <el-table-column
          prop="certifier"
          label="证明人">
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="证明人电话">
        </el-table-column>
      </el-table>
    </el-collapse-item>

    <el-collapse-item title="家庭成员信息" name="5">
      <el-table
        :data="familyInformation"
        highlight-current-row
        border>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          label="称呼">
          <template slot-scope="scope">
            {{scope.row.relationText}}
          </template>
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄">
        </el-table-column>
        <el-table-column
          prop="workUnit"
          label="工作单位">
        </el-table-column>
        <el-table-column
          prop="post"
          label="职务">
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="联系电话">
        </el-table-column>
      </el-table>
    </el-collapse-item>

  </el-collapse>
</div>
</template>
<script>
import { getSex, getEducationWay, getCertificateStatus, getMarriage, getPoltic, getEdu, getRelation, getfilternature, getTureFalse } from 'assets/js/filters'
import { checkAcceptBaseDetail, checkAcceptResumeDetail, checkAcceptJobDetail, checkAcceptFamilyDetail } from 'static/api/recruit/accept/accept'
export default {
  data () {
    return {
      activeNames: '1',
      baseInformation: [],
      resumeInformation: [],
      jobInformation: [],
      familyInformation: [],
      /** 地址**/
      archivesForm: {
        province: '',
        city: '',
        zone: ''
      },
      birthplaceForm: {
        province: '',
        city: '',
        zone: ''
      },
      hujiForm: {
        province: '',
        city: '',
        zone: ''
      },
      contactForm: {
        province: '',
        city: '',
        zone: ''
      },
      nativeForm: {
        province: '',
        city: '',
        zone: ''
      },
      idCardForm: {
        province: '',
        city: '',
        zone: ''
      },
      nowForm: {
        province: '',
        city: '',
        zone: ''
      }
    }
  },
  methods: {
    /** 查询个人信息**/
    _getAcceptDetail () {
      checkAcceptBaseDetail(this.$route.params.baseId).then((data) => {
        if (data.result) {
          this.baseInformation = data.result
          this.archivesForm = data.result.archivesAddressMod || this.archivesForm
          this.hujiForm = data.result.hujiAddressMod || this.hujiForm
          this.nativeForm = data.result.nativePlaceMod || this.nativeForm
          this.contactForm = data.result.contactAddressMod || this.contactForm
          this.idCardForm = data.result.idCardAddressMod || this.idCardForm
          this.nowForm = data.result.nowAddressMod || this.nowForm
          this.birthplaceForm = data.result.birthplaceMod || this.birthplaceForm
        }
      })
      /** 学习简历**/
      checkAcceptResumeDetail(this.$route.params.baseId).then((data) => {
        this.resumeInformation = []
        if (data.result) {
          data.result.forEach(item => {
            if (item.startDate || item.endDate || item.school || item.education || item.major) {
              this.resumeInformation.push(item)
            }
          })
        }
      })
      /** 工作简历**/
      checkAcceptJobDetail(this.$route.params.baseId).then((data) => {
        this.jobInformation = []
        // 去掉全空的数据
        if (data.result) {
          data.result.forEach(item => {
            if (item.startDate || item.endDate || item.workUnit || item.post || item.certifier || item.telephone) {
              this.jobInformation.push(item)
            }
          })
        }
      })
      /** 家庭简历**/
      checkAcceptFamilyDetail(this.$route.params.baseId).then((data) => {
        this.familyInformation = []
        if (data.result) {
          data.result.forEach(item => {
            if (item.name || item.relation || item.workUnit || item.post || item.telephone || item.age) {
              this.familyInformation.push(item)
            }
          })
        }
      })
    }
  },
  filters: {
    filterTrueFalse (value) {
      return getTureFalse(value)
    },
    filternature (str) {
      return getfilternature(str)
    },
    filterGraduate (value) {
      if (typeof value === 'string') {
        return value.substring(0, value.lastIndexOf('-'))
      }
    },
    filterSex (sex) {
      return getSex(sex)
    },
    filterPoltic (poltic) {
      return getPoltic(poltic)
    },
    filterEdu (edu) {
      return getEdu(edu)
    },
    filterRelation (relation) {
      return getRelation(relation)
    },
    filterEducationWay (str) {
      return getEducationWay(str)
    },
    filterCertificateStatus (str) {
      return getCertificateStatus(str)
    },
    filterMarriage (marriage) {
      return getMarriage(marriage)
    }
  },
  created () {
    this._getAcceptDetail()
    this.$store.commit('SET_ACTIVE_ROUTER', '2')
  }
}
</script>
<style scoped lang="less">
</style>
