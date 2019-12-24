<template>
<div class="mt-20">
<el-collapse v-model="activeNames" accordion>
  <!--基本信息 -->
  <el-collapse-item title="基本信息" name="1">
    <el-form  label-width="130px">
      <p class="base-sec-title">身份证信息</p>
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓　名:">
            {{baseDatasForm.baseInformation.name}}
          </el-form-item>
        </el-col>
      <el-col :span="8">
          <el-form-item label="民　　族:">
            {{baseDatasForm.baseInformation.nation}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item  label="性　　别:">
              {{baseDatasForm.baseInformation.sex | filterSex}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
          <el-col :span="8">
          <el-form-item label="出生日期:">
            {{baseDatasForm.baseInformation.birthday}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证号:" >
            {{baseDatasForm.baseInformation.idCardNumber}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="身份证地址 ：" >
            <!-- 判断省 市名字相同时 -->
            <div v-if="baseDatasForm.idCardForm.provinceName && baseDatasForm.idCardForm.cityName && baseDatasForm.idCardForm.areaName && baseDatasForm.idCardForm.address">
              <div v-if="baseDatasForm.idCardForm.provinceName === baseDatasForm.idCardForm.cityName">
                <span>{{baseDatasForm.idCardForm.cityName ? baseDatasForm.idCardForm.cityName:''}}</span>
                <span>{{baseDatasForm.idCardForm.areaName ? baseDatasForm.idCardForm.areaName:''}}</span>
                <span>{{baseDatasForm.idCardForm.address ? baseDatasForm.idCardForm.address:''}}</span>
              </div>
              <div v-else>
                <span>{{baseDatasForm.idCardForm.provinceName ? baseDatasForm.idCardForm.provinceName:''}}</span>
                <span>{{baseDatasForm.idCardForm.cityName ? baseDatasForm.idCardForm.cityName:''}}</span>
                <span>{{baseDatasForm.idCardForm.areaName ? baseDatasForm.idCardForm.areaName:''}}</span>
                <span>{{baseDatasForm.idCardForm.address ? baseDatasForm.idCardForm.address:''}}</span>
              </div>
            </div>
            <div v-else class="color999">未填写</div>
          </el-form-item>
        </el-col>
      </el-row>
      <p class="base-sec-title">户籍信息</p>
        <el-row>
        <el-col :span="10">
            <el-form-item label="户 籍 性 质:">
              <span v-if="baseDatasForm.baseInformation.nature">{{baseDatasForm.baseInformation.nature | filternature}}</span>
              <span v-else class="color999">未填写</span>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
        <el-col :span="16">
            <el-form-item label="户 籍 地 址:" >
              <!-- 判断省 市名字相同时 -->
              <div v-if="baseDatasForm.hujiForm.provinceName === baseDatasForm.hujiForm.cityName">
                <span>{{baseDatasForm.hujiForm.cityName ? baseDatasForm.hujiForm.cityName:''}}</span>
                <span>{{baseDatasForm.hujiForm.areaName ? baseDatasForm.hujiForm.areaName:''}}</span>
                <span>{{baseDatasForm.hujiForm.address ? baseDatasForm.hujiForm.address:''}}</span>
              </div>
              <div v-else>
                <span>{{baseDatasForm.hujiForm.provinceName ? baseDatasForm.hujiForm.provinceName:''}}</span>
                <span>{{baseDatasForm.hujiForm.cityName ? baseDatasForm.hujiForm.cityName:''}}</span>
                <span>{{baseDatasForm.hujiForm.areaName ? baseDatasForm.hujiForm.areaName:''}}</span>
                <span>{{baseDatasForm.hujiForm.address ? baseDatasForm.hujiForm.address:''}}</span>
              </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="14">
          <el-form-item label="出生地:" >
            <!-- 判断省 市名字相同时 -->
            <div v-if="baseDatasForm.birthplaceForm.provinceName && baseDatasForm.birthplaceForm.cityName && baseDatasForm.birthplaceForm.areaName">
              <div v-if="baseDatasForm.birthplaceForm.provinceName === baseDatasForm.birthplaceForm.cityName">
                <span>{{baseDatasForm.birthplaceForm.cityName ? baseDatasForm.birthplaceForm.cityName:''}}</span>
                <span>{{baseDatasForm.birthplaceForm.areaName ? baseDatasForm.birthplaceForm.areaName:''}}</span>
                <span>{{baseDatasForm.birthplaceForm.address ? baseDatasForm.birthplaceForm.address:''}}</span>
              </div>
              <div v-else>
                <span>{{baseDatasForm.birthplaceForm.provinceName ? baseDatasForm.birthplaceForm.provinceName:''}}</span>
                <span>{{baseDatasForm.birthplaceForm.cityName ? baseDatasForm.birthplaceForm.cityName:''}}</span>
                <span>{{baseDatasForm.birthplaceForm.areaName ? baseDatasForm.birthplaceForm.areaName:''}}</span>
                <span>{{baseDatasForm.birthplaceForm.address ? baseDatasForm.birthplaceForm.address:''}}</span>
              </div>
            </div>
            <div v-else class="color999">未填写</div>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="政治面貌:" prop="politicsStatus">
            {{baseDatasForm.baseInformation.politicsStatusText}}
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="籍 贯:" >
              <!-- 判断省 市名字相同时 -->
              <div v-if="baseDatasForm.nativeForm.provinceName === baseDatasForm.nativeForm.cityName">
                <span>{{baseDatasForm.nativeForm.cityName ? baseDatasForm.nativeForm.cityName:''}}</span>
                <span>{{baseDatasForm.nativeForm.areaName ? baseDatasForm.nativeForm.areaName:''}}</span>
                <span>{{baseDatasForm.nativeForm.address ? baseDatasForm.nativeForm.address:''}}</span>
              </div>
              <div v-else>
                <span>{{baseDatasForm.nativeForm.provinceName ? baseDatasForm.nativeForm.provinceName:''}}</span>
                <span>{{baseDatasForm.nativeForm.cityName ? baseDatasForm.nativeForm.cityName:''}}</span>
                <span>{{baseDatasForm.nativeForm.areaName ? baseDatasForm.nativeForm.areaName:''}}</span>
                <span>{{baseDatasForm.nativeForm.address ? baseDatasForm.nativeForm.address:''}}</span>
              </div>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="婚姻状况:" prop="maritalStatus">
              {{baseDatasForm.baseInformation.maritalStatusText}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="曾用名:" >
            <span v-if="baseDatasForm.baseInformation.formerName">{{baseDatasForm.baseInformation.formerName}}</span>
            <span v-else class="color999">未填写</span>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="体重:">
            <span v-if="baseDatasForm.baseInformation.weight">{{baseDatasForm.baseInformation.weight}}KG</span>
            <span v-else class="color999">未填写</span>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="身高:">
            {{baseDatasForm.baseInformation.height}}CM
          </el-form-item>
        </el-col>
      </el-row>

      <p class="base-sec-title">教育背景 </p>
      <el-row>
        <el-col :span="8">
          <el-form-item  label="最高学历:" prop="heighestEducation">
            {{baseDatasForm.baseInformation.highestEducationText}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="毕业时间:">
            {{baseDatasForm.baseInformation.graduationDate | formatMonth}}
          </el-form-item>
        </el-col>
          <el-col :span="8">
          <el-form-item label="毕业院校:">
            {{baseDatasForm.baseInformation.schoolOfGraduation}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="所学专业:" >
            {{baseDatasForm.baseInformation.major}}
          </el-form-item>
        </el-col>
          <el-col :span="8">
          <el-form-item label="学历获取形式:" >
            <span v-if="baseDatasForm.baseInformation.highestEducationWay">{{baseDatasForm.baseInformation.highestEducationWayText}}</span>
            <span v-else class="color999">未填写</span>
          </el-form-item>
        </el-col>
          <el-col :span="8">
          <el-form-item label="学历认证情况:" >
            <span v-if="baseDatasForm.baseInformation.educationCertificateStatus">{{baseDatasForm.baseInformation.educationCertificateStatusText}}</span>
            <span v-else class="color999">未填写</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
          <el-col :span="8">
          <el-form-item label="技术职称:">
            <span v-if="baseDatasForm.baseInformation.technicalTitle">{{baseDatasForm.baseInformation.technicalTitle}}</span>
            <span v-else class="color999">未填写</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="职业资格:" label-width="130px">
            <span v-if="baseDatasForm.baseInformation.vocationalQualification">{{baseDatasForm.baseInformation.vocationalQualification}}</span>
            <span v-else class="color999">未填写</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="技能等级:" >
            <span v-if="baseDatasForm.baseInformation.technicalGrade">{{baseDatasForm.baseInformation.technicalGrade}}</span>
            <span v-else class="color999">未填写</span>
          </el-form-item>
        </el-col>
      </el-row>
      <p class="base-sec-title">地址及联系 </p>
      <el-row>
        <el-col :span="16">
          <el-form-item label="档案存放:" >
            <!-- 判断省 市名字相同时 -->
            <div v-if="baseDatasForm.archivesForm.provinceName && baseDatasForm.archivesForm.cityName && baseDatasForm.archivesForm.areaName">
              <div v-if="baseDatasForm.archivesForm.provinceName === baseDatasForm.archivesForm.cityName">
                <span>{{baseDatasForm.archivesForm.cityName ? baseDatasForm.archivesForm.cityName:''}}</span>
                <span>{{baseDatasForm.archivesForm.areaName ? baseDatasForm.archivesForm.areaName:''}}</span>
                <span>{{baseDatasForm.archivesForm.address ? baseDatasForm.archivesForm.address:''}}</span>
              </div>
              <div v-else>
                <span>{{baseDatasForm.archivesForm.provinceName ? baseDatasForm.archivesForm.provinceName:''}}</span>
                <span>{{baseDatasForm.archivesForm.cityName ? baseDatasForm.archivesForm.cityName:''}}</span>
                <span>{{baseDatasForm.archivesForm.areaName ? baseDatasForm.archivesForm.areaName:''}}</span>
                <span>{{baseDatasForm.archivesForm.address ? baseDatasForm.archivesForm.address:''}}</span>
              </div>
            </div>
            <div v-else class="color999">未填写</div>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="现住址:" >
              <!-- 判断省 市名字相同时 -->
              <div v-if="baseDatasForm.nowForm.provinceName === baseDatasForm.nowForm.cityName">
                <span>{{baseDatasForm.nowForm.cityName ? baseDatasForm.nowForm.cityName:''}}</span>
                <span>{{baseDatasForm.nowForm.areaName ? baseDatasForm.nowForm.areaName:''}}</span>
                <span>{{baseDatasForm.nowForm.address ? baseDatasForm.nowForm.address:''}}</span>
              </div>
              <div v-else>
                <span>{{baseDatasForm.nowForm.provinceName ? baseDatasForm.nowForm.provinceName:''}}</span>
                <span>{{baseDatasForm.nowForm.cityName ? baseDatasForm.nowForm.cityName:''}}</span>
                <span>{{baseDatasForm.nowForm.areaName ? baseDatasForm.nowForm.areaName:''}}</span>
                <span>{{baseDatasForm.nowForm.address ? baseDatasForm.nowForm.address:''}}</span>
              </div>
          </el-form-item>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="16">
            <el-form-item label="通讯地址:" >
              <!-- 判断省 市名字相同时 -->
              <div v-if="baseDatasForm.contactForm.provinceName && baseDatasForm.contactForm.cityName && baseDatasForm.contactForm.areaName">
                <div v-if="baseDatasForm.contactForm.provinceName === baseDatasForm.contactForm.cityName">
                  <span>{{baseDatasForm.contactForm.cityName ? baseDatasForm.contactForm.cityName:''}}</span>
                  <span>{{baseDatasForm.contactForm.areaName ? baseDatasForm.contactForm.areaName:''}}</span>
                  <span>{{baseDatasForm.contactForm.address ? baseDatasForm.contactForm.address:''}}</span>
                </div>
                <div v-else>
                  <span>{{baseDatasForm.nowForm.provinceName ? baseDatasForm.contactForm.provinceName:''}}</span>
                  <span>{{baseDatasForm.nowForm.cityName ? baseDatasForm.contactForm.cityName:''}}</span>
                  <span>{{baseDatasForm.nowForm.areaName ? baseDatasForm.contactForm.areaName:''}}</span>
                  <span>{{baseDatasForm.nowForm.address ? baseDatasForm.contactForm.address:''}}</span>
                </div>
              </div>
              <div v-else class="color999">未填写</div>
          </el-form-item>
          </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="联系电话:">
            {{baseDatasForm.baseInformation.telephone}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电子邮箱:" >
              <span v-if="baseDatasForm.baseInformation.mail">{{baseDatasForm.baseInformation.mail}}</span>
              <span v-else class="color999">未填写</span>
          </el-form-item>
        </el-col>
      </el-row>
      <p class="base-sec-title">其他信息</p>
      <el-row>
        <el-col :span="12">
          <el-form-item label="工资卡号:">
              <span v-if="baseDatasForm.baseInformation.payCardNo">{{baseDatasForm.baseInformation.payCardNo}}</span>
              <span v-else class="color999">未填写</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开户行:">
             <span v-if="baseDatasForm.baseInformation.openBank">{{baseDatasForm.baseInformation.openBank}}</span>
             <span v-else class="color999">未填写</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-collapse-item>
  <!-- 健康情况 -->
  <el-collapse-item title="健康情况" name="2">
    <el-form label-width="300px">
      <el-row v-for="item in baseDatasForm.baseInformation.healthStatusList" :label="item.codeText" :key="item.code">
        <el-col :span="12" :offset="3" v-show="item.status !== -1 || item.enable !== 2">
          <el-form-item :label='item.codeText'>
            <span v-if="item.status === 1">有</span>
            <span v-if="item.status === 0">无</span>
            <span style="padding-left:15px;">{{item.text}}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-collapse-item>
  <!--学习简历 -->
  <el-collapse-item title="学习简历" name="3">
    <el-form label-width="100px">
      <el-table
        :data="baseDatasForm.resumeInformation"
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
          v-model="baseDatasForm.baseInformation.inZcBefore">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    <el-table
      :data="baseDatasForm.jobInformation"
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
  <!--家庭成员信息-->
  <el-collapse-item title="家庭成员信息" name="5">
    <el-table
      :data="baseDatasForm.familyInformation"
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
export default {
  data () {
    return {
      activeNames: ''
    }
  },
  props: {
    baseDatasForm: {
      type: Object
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
  }
}
</script>
<style scoped lang="less">
</style>
