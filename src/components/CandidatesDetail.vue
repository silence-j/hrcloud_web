<template>
  <div>
    <h6 class="table-title">中财集团应聘人员登记表</h6>
    <p class="base-sec-title">基本信息</p>
    <el-row>
      <el-col>
        <el-form  label-width="130px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓    名:">
                <span>{{baseDatas.baseInformation.name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性    别:">
                <span>{{baseDatas.baseInformation.sex | filterSex}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出生日期:">
                <span>{{baseDatas.baseInformation.birthday}}</span>
              </el-form-item>
            </el-col>
          </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="民    族:">
                  <span>{{baseDatas.baseInformation.nation}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="毕业时间:">
                  <span>{{baseDatas.baseInformation.graduationDate | filterGraduate}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="资格证书:">
                  <span v-if="baseDatas.baseInformation.qualificationCertificate">{{baseDatas.baseInformation.qualificationCertificate}}</span>
                  <span v-else class="color999">未填写</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="身份证号:">
                  <span>{{baseDatas.baseInformation.idCardNumber}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="政治面貌:">
                  <span>{{baseDatas.baseInformation.politicsStatusText}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电子邮箱:">
                  <span v-if="baseDatas.baseInformation.mail">{{baseDatas.baseInformation.mail}}</span>
                  <span v-else class="color999">未填写</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="最高学历:">
                  <span>{{baseDatas.baseInformation.highestEducationText}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="毕业院校:">
                  <span>{{baseDatas.baseInformation.schoolOfGraduation}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所学专业:">
                  <span v-if="baseDatas.baseInformation.major">{{baseDatas.baseInformation.major}}</span>
                  <span v-else class="color999">未填写</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="婚姻状况:">
                  <span>{{baseDatas.baseInformation.maritalStatusText}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话:">
                  <span>{{baseDatas.baseInformation.telephone}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="身    高:">
                  <span>{{baseDatas.baseInformation.height}}</span>CM
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="籍    贯:" >
                  <div v-if="baseDatas.baseInformation.nativePlace!=='   '">{{baseDatas.baseInformation.nativePlace}}</div>
                  <div v-else class="color999">未填写</div>
                </el-form-item>
              </el-col>
            </el-row>
             <el-row>
              <el-col :span="20">
                <el-form-item  label="户籍地址:" prop="province">
                  <div v-if="baseDatas.baseInformation.hujiAddress!=='   '">{{baseDatas.baseInformation.hujiAddress}}</div>
                  <div v-else class="color999">未填写</div>
                </el-form-item>
              </el-col>
            </el-row>
             <el-row>
              <el-col :span="20">
                <el-form-item label="档案存放:">
                  <div v-if="baseDatas.baseInformation.archivesAddress!=='   '">{{baseDatas.baseInformation.archivesAddress}}</div>
                  <div v-else class="color999">未填写</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="现 住 址:" >
                  <div v-if="baseDatas.baseInformation.nowAddress!=='   '">{{baseDatas.baseInformation.nowAddress}}</div>
                  <div v-else class="color999">未填写</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="当前月薪构成:" prop="monthSalaryForm">
                 <span v-if="baseDatas.otherInformation.monthSalaryForm">{{baseDatas.otherInformation.monthSalaryForm}}</span>
                 <span v-else class="color999">未填写</span>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="当前年薪构成:" prop="monthSalaryForm">
                  <span v-if="baseDatas.otherInformation.yearSalaryForm">{{baseDatas.otherInformation.yearSalaryForm}}</span>
                  <span v-else class="color999">未填写</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="当前年薪:" prop="yearlySalary">
                 <span v-if="baseDatas.otherInformation.yearlySalary">{{baseDatas.otherInformation.yearlySalary}}万元</span>
                 <span v-else class="color999">未填写</span>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="期望年薪:" prop="expectYearSalary">
                 <span v-if="baseDatas.otherInformation.expectYearSalary">{{baseDatas.otherInformation.expectYearSalary}} -- {{baseDatas.otherInformation.expectMaxYearSalary}}万元</span>
                 <span v-else class="color999">未填写</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
    </el-row>

    <!--健康状况-->
    <p class="base-sec-title">健康状况</p>
    <el-form class="mt-20 health"
      label-width="300px">
      <el-row v-for="item in baseDatas.baseInformation.healthStatusList" :label="item.codeText" :key="item.code">
        <el-col :span="12" :offset="3" v-show="item.status !== -1 || item.enable !== 2">
          <el-form-item :label='item.codeText'>
            <span v-if="item.status === 1">有</span>
            <span v-if="item.status === 0">无</span>
            <span>{{item.text}}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 学习简历 -->
    <el-row class="mt-20">
      <p class="base-sec-title">学 习 简 历</p>
      <el-table
        :data="baseDatas.resumeInformation"
        highlight-current-row
        border>
        <el-table-column label="开始年月">
          <template slot-scope="scope">{{scope.row.startDate | filterGraduate}}</template>
        </el-table-column>
        <el-table-column label="结束年月">
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
    </el-row>

    <!--工作简历-->
    <el-row class="mt-20">
      <p class="base-sec-title">工 作 简 历</p>
       <el-form label-width="150px">
        <el-form-item required label=" 是否在中财工作过">
            <el-radio-group
              disabled
              v-model="baseDatas.baseInformation.inZcBefore">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
        </el-radio-group>
        </el-form-item>
      </el-form>
      <el-table
        :data="baseDatas.jobInformation"
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
    </el-row>

    <!--家庭成员信息-->
    <el-row class="mt-20">
      <p class="base-sec-title">家庭成员信息</p>
      <el-table
        :data="baseDatas.familyInformation"
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
    </el-row>

    <!-- 其它信息 -->
    <div class="other-msg mt-20">
      <p class="base-sec-title">其 它 信 息</p>
      <div class="tab-width">
        <el-row>
          <el-col :span="22" :offset="1">
            <el-form label-width="150px">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="应聘人员类型:">
                    <span>{{baseDatas.otherInformation.candidateTypeText}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="中财是否有熟人:">
                    <span>{{baseDatas.otherInformation.haveAcquaintanceText}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                  <el-form-item label="第一应聘岗位:">
                    <span>{{baseDatas.otherInformation.postName}}</span>
                  </el-form-item>
              </el-row>
              <el-row>
                  <el-form-item label="第二应聘岗位:">
                    <span v-if="baseDatas.otherInformation.orgName">{{baseDatas.otherInformation.orgName}}</span>
                    <span v-else class="color999">未填写</span>
                  </el-form-item>
              </el-row>
              <el-row>
                  <el-form-item label="预计到岗时间:">
                    <span>{{baseDatas.otherInformation.arrivalTime}}</span>
                  </el-form-item>
              </el-row>
              <el-row>
                  <el-form-item label="离职原因:">
                    <span v-if="baseDatas.otherInformation.dimissionReason">{{baseDatas.otherInformation.dimissionReason}}</span>
                    <span v-else class="color999">未填写</span>
                  </el-form-item>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import { getSex, getPoltic, getEdu, getMarriage, getTureFalse, getRelation, getCandidateType, getAcquaintance } from 'assets/js/filters'
export default {
  props: {
    baseDatas: {
      type: Object
    }
  },
  filters: {
    filterGraduate (value) {
      if (typeof value === 'string') {
        return value.substring(0, value.lastIndexOf('-'))
      }
    },
    filterTrueFalse (value) {
      return getTureFalse(value)
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
    filterMarriage (marriage) {
      return getMarriage(marriage)
    },
    filterRelation (relation) {
      return getRelation(relation)
    },
    filterCandidateType (type) {
      return getCandidateType(type)
    },
    filterAcquaintance (ace) {
      return getAcquaintance(ace)
    }
  }
}
</script>
