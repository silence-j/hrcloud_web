<template>
  <div class="base-update-personnal">
    <el-row>
      <el-button type="primary" size="mini" @click="submitUpdate">提交{{updateType === '2' ? '更正' : '更新'}}</el-button>
    </el-row>
    <el-tabs type="card" closable  class="mt-20"  @tab-remove="handleClose">
     <el-tab-pane
      :key="tag"
      v-for="tag in selectTags"
      :label="tag"
      :name="tag"
    >
  </el-tab-pane>
    </el-tabs>
    <!-- <el-row :gutter="12" type="flex"  class="mt-20 tags-box">
      <el-col  v-for="tag in selectTags" :key="tag" style="width:auto">
        <el-tag
           closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
         </el-tag>
        </el-col>
    </el-row> -->
       <div class="fix-select">
       <el-select
          style="width:100%"
           multiple
           collapse-tags
          v-model="selectTag"
          placeholder="请选择"
          @change="changeTag"
          @remove-tag="removeTag"
          >
          <el-option
          v-for="item in selecDynamics"
          :key="item.value"
          :value="item.value"
          :label="item.label"
          :disabled="item.disabled"
          ></el-option>
          </el-select>
    </div>
     <el-table
     class="mt-20"
      border
      :data="tableTabs"
      id="el-table"
    >
    <el-table-column
      type="index"
      label="序号"
      width="80">
    </el-table-column>
    <el-table-column
      prop="field"
      :label="updateType === '2'? '更正字段' :'更新字段'"
      min-width="290"
    >
    <template slot-scope="scope" >
      <div v-if="scope.row.type==='wage' || scope.row.type === 'educationList' || scope.row.type === 'healthStatus'">
      <div v-for="(item,index) in scope.row.children" :key="index" :class="index === scope.row.children.length-1 ? 'no-bor mutil-div' : 'mutil-div'">
        {{item.field}}
      </div>
      </div>
      <div v-else>
         {{scope.row.field}}
      </div>
    </template>
    </el-table-column>
    <el-table-column
      prop="originalValue"
      label="原值"
      width="280"
    >
    <template slot-scope="scope">
      <div v-if="scope.row.type==='wage' || scope.row.type === 'educationList' || scope.row.type === 'healthStatus'">
        <div v-for="(item,index) in scope.row.children" :key="index" :class="index === scope.row.children.length-1 ? 'no-bor mutil-div' : 'mutil-div'">
          {{item.originalValue}}
        </div>
      </div>
      <div v-else>
        {{scope.row.originalValue}}
      </div>
    </template>
    </el-table-column>
    <el-table-column
      prop="type"
      label="新值"
      width="406"
      >
      <template slot-scope="scope" >
        <div v-if="scope.row.type==='wage'">
          <div v-for="(item,index) in scope.row.children" :key="index" :class="index === scope.row.children.length-1 ? 'no-bor mutil-div' : 'mutil-div'">
            <el-row :gutter="15">
             <el-col :span="18">
               <el-input v-model="personnalForm[item.type]" :placeholder="item.field" :disabled="item.disabled"/>
             </el-col>
              <el-col :span="6" style="line-height:60px;">
              <el-checkbox v-model="item.isUpdate" @change="changeCheckValue(item.isUpdate, item)">不修改</el-checkbox>
            </el-col>
            </el-row>
         </div>
        </div>
        <div v-if="scope.row.type==='educationList'">
          <div v-for="(item,index) in scope.row.children" :key="index" :class="index === scope.row.children.length-1 ? 'no-bor mutil-div' : 'mutil-div'">
           <div v-if="item.type==='highestEducation'">
            <el-row :gutter="15">
             <el-col :span="18">
               <el-select
                style="width:100%"
                :disabled="item.disabled"
                v-model="personnalForm.highestEducation"  placeholder="最高学历">
                <el-option
                  v-for="item in highestEduOptions"
                  :label="item.codeText"
                  :value="item.code"
                  :key="item.code"
                  :disabled="item.disabled">
                </el-option>
             </el-select>
            </el-col>
            <el-col :span="6" style="line-height:60px;">
              <el-checkbox v-model="item.isUpdate" @change="changeCheckValue(item.isUpdate, item, item.original)">不修改</el-checkbox>
            </el-col>
           </el-row>
        </div>
        <div v-if="item.type==='graduationDate'">
          <el-row :gutter="15">
            <el-col :span="18">
              <el-date-picker
              v-model="personnalForm.graduationDate"
              type="date"
              value-format="yyyy-MM-dd"
              :disabled="item.disabled"
              placeholder="毕业时间">
            </el-date-picker>
            </el-col>
             <el-col :span="6" style="line-height:60px;">
              <el-checkbox v-model="item.isUpdate" @change="changeCheckValue(item.isUpdate, item)">不修改</el-checkbox>
            </el-col>
          </el-row>
        </div>
        <div v-if="item.type==='schoolOfGraduation'">
          <el-row :gutter="15">
            <el-col :span="18">
               <el-input v-model="personnalForm.schoolOfGraduation" placeholder="毕业院校" :disabled="item.disabled"></el-input>
            </el-col>
            <el-col :span="6" style="line-height:60px;">
               <el-checkbox v-model="item.isUpdate" @change="changeCheckValue(item.isUpdate, item)">不修改</el-checkbox>
            </el-col>
            </el-row>
        </div>
         <div v-if="item.type==='major'">
          <el-row :gutter="15">
            <el-col :span="18">
               <el-input v-model="personnalForm.major" placeholder="所学专业" :disabled="item.disabled"></el-input>
            </el-col>
            <el-col :span="6" style="line-height:60px;">
               <el-checkbox v-model="item.isUpdate" @change="changeCheckValue(item.isUpdate, item)">不修改</el-checkbox>
            </el-col>
            </el-row>
        </div>
        <div v-if="item.type === 'highestEducationWay'">
          <el-row :gutter="15">
            <el-col :span="18">
               <el-select
                style="width:100%"
                :disabled="item.disabled"
                v-model="personnalForm.highestEducationWay"  placeholder="学历获取形式">
                <el-option
                  v-for="item in eduWayOptions"
                  :label="item.codeText"
                  :value="item.code"
                  :key="item.code"
                  :disabled="item.disabled">
                </el-option>
             </el-select>
            </el-col>
            <el-col :span="6" style="line-height:60px;">
              <el-checkbox v-model="item.isUpdate" @change="changeCheckValue(item.isUpdate, item, item.original)">不修改</el-checkbox>
            </el-col>
          </el-row>
        </div>
        <div v-if="item.type === 'educationCertificateStatus'">
          <el-row :gutter="15">
            <el-col :span="18">
               <el-select
                style="width:100%"
                :disabled="item.disabled"
                v-model="personnalForm.educationCertificateStatus"  placeholder="学历认证情况">
                <el-option
                  v-for="item in educationCertificateOptions"
                  :label="item.codeText"
                  :value="item.code"
                  :key="item.code"
                  :disabled="item.disabled">
                </el-option>
             </el-select>
            </el-col>
            <el-col :span="6" style="line-height:60px;">
              <el-checkbox v-model="item.isUpdate" @change="changeCheckValue(item.isUpdate, item, item.original)">不修改</el-checkbox>
            </el-col>
          </el-row>
        </div>
         </div>
        </div>
        <div v-else-if="scope.row.type === 'healthStatus'">
          <div v-for="(item,index) in scope.row.children" :key="index" :class="index === scope.row.children.length-1 ? 'no-bor mutil-div' : 'mutil-div'">
            <el-row :gutter="15">
                <el-col :span="12">
                  <el-radio-group v-model="item.status" :disabled="item.enable === 2 ? true  : false">
                    <el-radio class="radio"  :label="1" >有</el-radio>
                    <el-radio class="radio"  :label="0">无</el-radio>
                  </el-radio-group>
                </el-col>
                <el-col :span="12">
                  <el-input v-model="item.text" :disabled="item.enable === 2 ? true  : false" v-if="item.status === 1"></el-input>
                </el-col>
            </el-row>
          </div>
        </div>
        <div v-else>
        <div v-if="scope.row.type === 'idCardAddress'">
          <el-row>
             <address-select
              :area="idCardAddressArea"
              :colSpan="7"
              :lineSpan="1"
              :showZone="true">
            </address-select>
          </el-row>
          <el-row>
            <el-input v-model="idCardAddressArea.address" placeholder="详情地址"/>
          </el-row>
        </div>
        <div v-if="scope.row.type === 'nature'">
            <el-select
            style="width:100%"
            v-model="personnalForm.nature" placeholder="请选择户籍性质">
            <el-option label="城镇" :value="1"></el-option>
            <el-option label="农村" :value="2"></el-option>
          </el-select>
        </div>
        <div v-if="scope.row.type === 'hujiAddress'">
          <el-row>
             <address-select
              :area="hujiAddressaArea"
              :colSpan="7"
              :lineSpan="1"
              :showZone="true">
            </address-select>
          </el-row>
          <el-row>
            <el-input v-model="hujiAddressaArea.address" placeholder="详情地址"/>
          </el-row>
        </div>
        <div v-if="scope.row.type === 'birthplace'">
          <el-row>
             <address-select
              :area="birthAddressArea"
              :colSpan="7"
              :lineSpan="1"
              :showZone="true">
            </address-select>
          </el-row>
          <!--<el-row>-->
            <!--<el-input v-model="birthAddressArea.address" placeholder="详情地址"/>-->
          <!--</el-row>-->
        </div>
        <div v-if="scope.row.type==='politicsStatus'">
          <el-select
           style="width:100%"
           v-model="personnalForm.politicsStatus"  placeholder="请填写政治面貌">
            <el-option
              v-for="item in politicsOptions"
              :label="item.codeText"
              :value="item.code"
              :key="item.code"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </div>
         <div v-if="scope.row.type==='nativePlace'">
           <el-row>
           <address-select
              :area="nativeAddressArea"
              :colSpan="7"
              :lineSpan="1"
              :showZone="true">
            </address-select>
          </el-row>
          <!--<el-row>-->
            <!--<el-input v-model="nativeAddressArea.address" placeholder="详情地址"/>-->
          <!--</el-row>-->
         </div>
          <div v-if="scope.row.type==='maritalStatus'">
          <el-select
          style="width:100%"
           v-model="personnalForm.maritalStatus"  placeholder="婚姻状况">
            <el-option
              v-for="item in maritalOptions"
              :label="item.codeText"
              :value="item.code"
              :key="item.code"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </div>
        <div v-if="scope.row.type==='formerName'">
           <el-input v-model="personnalForm.formerName" placeholder="曾用名"/>
        </div>
        <div v-if="scope.row.type==='weight'">
           <el-input v-model="personnalForm.weight" placeholder="体重"
           @input="value=>personnalForm.weight = value.replace(/[^\d.]/g, '')"
          :min="1">
             <template slot="append">KG</template>
           </el-input>
        </div>
        <div v-if="scope.row.type==='height'">
           <el-input v-model="personnalForm.height"
            @input="value=>personnalForm.height = value.replace(/[^\d.]/g, '')"
           placeholder="身高" :min="1">
             <template slot="append">CM</template>
           </el-input>
        </div>
        <div v-if="scope.row.type === 'technicalTitle'">
          <el-input v-model="personnalForm.technicalTitle" placeholder="技术职称"></el-input>
        </div>
        <div v-if="scope.row.type === 'vocationalQualification'">
          <el-input v-model="personnalForm.vocationalQualification" placeholder="职业资格"></el-input>
        </div>
         <div v-if="scope.row.type === 'technicalGrade'">
          <el-input v-model="personnalForm.technicalGrade" placeholder="技能等级"></el-input>
        </div>
        <div v-if="scope.row.type === 'archivesAddress'">
          <el-row>
           <address-select
              :area="archivesAddressArea"
              :colSpan="7"
              :lineSpan="1"
              :showZone="true">
            </address-select>
          </el-row>
          <el-row>
            <el-input v-model="archivesAddressArea.address" placeholder="详情地址"/>
          </el-row>
        </div>
        <div v-if="scope.row.type === 'nowAddress'">
          <el-row>
           <address-select
              :area="nowAddressArea"
              :colSpan="7"
              :lineSpan="1"
              :showZone="true">
            </address-select>
          </el-row>
          <el-row>
            <el-input v-model="nowAddressArea.address" placeholder="详情地址"/>
          </el-row>
        </div>
        <div v-if="scope.row.type === 'contactAddress'">
          <el-row>
           <address-select
              :area="contactAddressArea"
              :colSpan="7"
              :lineSpan="1"
              :showZone="true">
            </address-select>
          </el-row>
          <el-row>
            <el-input v-model="contactAddressArea.address" placeholder="详情地址"/>
          </el-row>
        </div>
         <div v-if="scope.row.type === 'telephone'">
          <el-input v-model.number="personnalForm.telephone" placeholder="联系电话" :maxlength="11"></el-input>
        </div>
         <div v-if="scope.row.type === 'mail'">
          <el-input v-model="personnalForm.mail" placeholder="邮箱"></el-input>
        </div>
        <div v-if="scope.row.type === 'payCardNo'">
          <el-input v-model="personnalForm.payCardNo" placeholder="工资卡号"></el-input>
        </div>
         <div v-if="scope.row.type === 'openBank'">
          <el-input v-model="personnalForm.openBank" placeholder="开户行"></el-input>
        </div>
         <div v-if="scope.row.type === 'name'">
          <el-input v-model="personnalForm.name" placeholder="姓名"></el-input>
        </div>
         <div v-if="scope.row.type === 'nation'">
          <el-input v-model="personnalForm.nation" placeholder="民族"></el-input>
        </div>
         <div v-if="scope.row.type === 'sex'">
           <el-select v-model="personnalForm.sex" placeholder="性别">
             <el-option value="1" label="男"></el-option>
             <el-option value="0" label="女"></el-option>
           </el-select>
        </div>
         <div v-if="scope.row.type === 'idCardNumber'">
            <el-input v-model="personnalForm.idCardNumber" placeholder="身份证号码"></el-input>
         </div>
         <div v-if="scope.row.type==='birthday'">
             <el-date-picker
              v-model="personnalForm.birthday"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="出生日期"/>
         </div>
        </div>
      </template>
      </el-table-column>
       <el-table-column
        prop="remark"
        label="说明"
        min-width="200"
        >
        <template slot-scope="scope">
          <div v-if="scope.row.type==='wage' || scope.row.type === 'educationList' || scope.row.type === 'healthStatus'">
          <el-input
           v-model="scope.row.remark"
           type="textarea"
           :rows="scope.row.children.length*2"
            placeholder="说明"/>
            </div>
            <div  v-else>
              <el-input v-model="scope.row.remark" placeholder="说明"/>
            </div>
        </template>
     </el-table-column>
     </el-table>
     <el-collapse v-if="familyVisible || resumeVisible || jobVisible" v-model="showCollArr">
       <el-collapse-item title="学习简历" v-if="resumeVisible" name="resume">
          <el-row class="mt-20">
            <person-resume @delResume="delResume" ref="personResume"/>
            <el-input type="textarea"
            :rows="3"
            placeholder="说明"
            class="mt-10"
            v-model="personnalForm.resumeRemark"/>
          </el-row>
       </el-collapse-item>
       <el-collapse-item title="工作简历" v-if="jobVisible" name="job">
         <el-row class="mt-20">
            <el-form label-width="150px">
            <el-form-item required label=" 是否在中财工作过">
           <el-radio-group v-model="personnalForm.inZcBeforeNew">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
              </el-radio-group>
        </el-form-item>
        </el-form>
          <person-job @delJob="delJob" ref="personJob" />
           <el-input type="textarea"
            :rows="3"
            placeholder="说明"
             class="mt-10"
            v-model="personnalForm.jobRemark"/>
        </el-row>
       </el-collapse-item>
        <el-collapse-item title="家庭成员信息" v-if="familyVisible" name="family">
            <el-row class="mt-20">
            <person-family @delFamily="delFamily" ref="personFamily"/>
            <el-input type="textarea"
            :rows="3"
            class="mt-10"
             placeholder="说明"
            v-model="personnalForm.familyRemark"/>
          </el-row>
        </el-collapse-item>
     </el-collapse>
  </div>
</template>
<script>
import entryApi from 'api/entry'
import commonApi from 'api/common'
import AddressSelect from '@/components/AddressSelect.vue'
import PersonResume from '@/views/entry-view/entry-person/entry-person-resume'
import PersonJob from '@/views/entry-view/entry-person/entry-person-job'
import PersonFamily from '@/views/entry-view/entry-person/entry-person-family'
import { cloneDeep, debounce } from 'lodash'
import { getToken } from 'assets/js/util'
/* import { getToken } from '@/assets/js/util' */
/* import { checkAcceptResumeDetail } from 'static/api/recruit/accept/accept' */
const areas = {
  optionProvinces: [],
  optionCities: [],
  optionZones: [],
  provinceName: '',
  provinceId: '',
  areaName: '',
  areaId: '',
  cityName: '',
  cityId: '',
  address: '',
  id: ''
}
export default {
  data () {
    return {
      showCollArr: [],
      selectTag: [],
      userDetails: {},
      selectTags: [],
      tableTabs: [],
      idCardAddressArea: cloneDeep(areas),
      hujiAddressaArea: cloneDeep(areas),
      birthAddressArea: cloneDeep(areas),
      nativeAddressArea: cloneDeep(areas),
      archivesAddressArea: cloneDeep(areas),
      nowAddressArea: cloneDeep(areas),
      contactAddressArea: cloneDeep(areas),
      personnalForm: {
        nature: '',
        politicsStatus: '',
        maritalStatus: '',
        formerName: '',
        weight: '',
        height: '',
        highestEducation: '',
        graduationDate: '',
        schoolOfGraduation: '',
        major: '',
        highestEducationWay: '',
        educationCertificateStatus: '',
        technicalTitle: '',
        vocationalQualification: '',
        technicalGrade: '',
        telephone: '',
        mail: '',
        payCardNo: '',
        openBank: '',
        name: '',
        sex: '',
        nation: '',
        idCardNumber: '',
        inZcBeforeNew: 0,
        birthday: '',
        resumeRemark: '',
        jobRemark: '',
        familyRemark: ''
      },
      politicsOptions: [],
      maritalOptions: [],
      highestEduOptions: [],
      eduWayOptions: [],
      educationCertificateOptions: [],
      jobVisible: false,
      familyVisible: false,
      resumeVisible: false,
      arrSelectLen: '',
      defaultSelects: {
        '身份证地址': 'idCardAddress',
        '户籍性质': 'nature',
        '户籍地址': 'hujiAddress',
        '出生地址': 'birthplace',
        '政治面貌': 'politicsStatus',
        '籍贯地址': 'nativePlace',
        '婚姻状况': 'maritalStatus',
        '曾用名': 'formerName',
        '体重': 'weight',
        '身高': 'height',
        '学历信息': 'educationList',
        '技术职称': 'technicalTitle',
        '职业资格': 'vocationalQualification',
        '技能等级': 'technicalGrade',
        '档案存放地': 'archivesAddress',
        '现居住地址': 'nowAddress',
        '通讯地址': 'contactAddress',
        '联系电话': 'telephone',
        '电子邮箱': 'mail',
        '工资卡信息': 'wage',
        '健康状况': 'healthStatus',
        '学习简历': 'educationsResume',
        '工作简历': 'jobsResume',
        '家庭成员信息': 'families',
        '姓名': 'name',
        '性别': 'sex',
        '民族': 'nation',
        '出生日期': 'birthday',
        '身份证号码': 'idCardNumber'

      },
      dynamicTags: [{
        tag: 'idCardAddress',
        tagTitle: '身份证地址'
      },
      {
        tag: 'nature',
        tagTitle: '户籍性质'
      },
      {
        tag: 'hujiAddress',
        tagTitle: '户籍地址'
      },
      {
        tag: 'birthplace',
        tagTitle: '出生地址'
      },
      {
        tag: 'politicsStatus',
        tagTitle: '政治面貌'
      },
      {
        tag: 'nativePlace',
        tagTitle: '籍贯地址'
      },
      {
        tag: 'maritalStatus',
        tagTitle: '婚姻状况'
      },
      {
        tag: 'formerName',
        tagTitle: '曾用名'
      },
      {
        tag: 'weight',
        tagTitle: '体重'
      },
      {
        tag: 'height',
        tagTitle: '身高'
      },
      {
        tag: 'educationList',
        tagTitle: '学历信息'
      },
      {
        tag: 'technicalTitle',
        tagTitle: '技术职称'
      },
      {
        tag: 'vocationalQualification',
        tagTitle: '职业资格'
      },
      {
        tag: 'technicalGrade',
        tagTitle: '技能等级'
      },
      {
        tag: 'archivesAddress',
        tagTitle: '档案存放地'
      },
      {
        tag: 'nowAddress',
        tagTitle: '现居住地址'
      },
      {
        tag: 'contactAddress',
        tagTitle: '通讯地址'
      },
      {
        tag: 'telephone',
        tagTitle: '联系电话'
      },
      {
        tag: 'mail',
        tagTitle: '电子邮箱'
      },
      {
        tag: 'wage',
        tagTitle: '工资卡信息'
      },
      {
        tag: 'healthStatus',
        tagTitle: '健康状况'
      },
      {
        tag: 'educationsResume',
        tagTitle: '学习简历'
      },
      {
        tag: 'jobsResume',
        tagTitle: '工作简历'
      },
      {
        tag: 'families',
        tagTitle: '家庭成员信息'
      }
      ],
      newArray: []
    }
  },
  components: {
    AddressSelect,
    PersonResume,
    PersonJob,
    PersonFamily
  },
  computed: {
    selecDynamics () {
      return this.dynamicTags.map(x => ({
        value: x.tag,
        label: x.tagTitle,
        disabled: this.selectTags.indexOf(x.tagTitle) !== -1 || x.disabled
      }))
    },
    updateType () {
      return this.$route.name === 'PersonnalBaseCorrections' ? '2' : '1'
    },
    resumeForm () {
      return this.$refs.personResume._getResumeDatas()
    },
    jobForm () {
      return this.$refs.personJob._getJobDatas()
    },
    familyForm () {
      return this.$refs.personFamily._getFamilyDatas()
    }
  },
  methods: {
    // 验证必填项
    validateDatas () {
      //   '户籍地址': 'hujiAddress',
      //   '出生地址': 'birthplace',
      //   '政治面貌': 'politicsStatus',
      //   '籍贯地址': 'nativePlace',
      //   '婚姻状况': 'maritalStatus',
      //   '曾用名': 'formerName',
      //   '体重': 'weight',
      //   '身高': 'height',
      //   '学历信息': 'educationList',
      //   '技术职称': 'technicalTitle',
      //   '职业资格': 'vocationalQualification',
      //   '技能等级': 'technicalGrade',
      //   '档案存放地': 'archivesAddress',
      //   '现居住地址': 'nowAddress',
      //   '通讯地址': 'contactAddress',
      //   '联系电话': 'telephone',
      //   '电子邮箱': 'mail',
      //   '工资卡信息': 'wage',
      //   '健康状况': 'healthStatus',
      //   '学习简历': 'educationsResume',
      //   '工作简历': 'jobsResume',
      //   '家庭成员信息': 'families',
      //   '身份证号码': 'idCardNumber'
      return new Promise((resolve, reject) => {
        if (this.selectTags.indexOf('姓名') !== -1 && !this.personnalForm.name) {
          resolve('请填写姓名')
        }
        if (this.selectTags.indexOf('民族') !== -1 && !this.personnalForm.nation) {
          resolve('请填写民族')
        }
        if (this.selectTags.indexOf('性别') !== -1 && !this.personnalForm.sex) {
          resolve('请选择性别')
        }
        if (this.selectTags.indexOf('出生日期') !== -1 && !this.personnalForm.birthday) {
          resolve('请选择出生日期')
        }
        if (this.selectTags.indexOf('身份证号码') !== -1 && !this.personnalForm.idCardNumber) {
          resolve('请选择身份证号码')
        }
        if (this.selectTags.indexOf('身份证地址') !== -1 && (!this.idCardAddressArea.provinceId || !this.idCardAddressArea.cityId || !this.idCardAddressArea.areaId || !this.idCardAddressArea.address)) {
          resolve('请选择身份证地址')
        }
        if (this.selectTags.indexOf('户籍性质') !== -1 && !this.personnalForm.nature) {
          resolve('请选择户籍性质')
        }
        if (this.selectTags.indexOf('户籍地址') !== -1 && (!this.hujiAddressaArea.provinceId || !this.hujiAddressaArea.cityId || !this.hujiAddressaArea.areaId || !this.hujiAddressaArea.address)) {
          resolve('户籍地址不正确')
        }
        if (this.selectTags.indexOf('出生地址') !== -1 && (!this.birthAddressArea.provinceId || !this.birthAddressArea.cityId || !this.birthAddressArea.areaId)) {
          resolve('出生地址不正确')
        }
        if (this.selectTags.indexOf('政治面貌') !== -1 && !this.personnalForm.politicsStatus) {
          resolve('请选择政治面貌')
        }
        if (this.selectTags.indexOf('籍贯地址') !== -1 && (!this.nativeAddressArea.provinceId || !this.nativeAddressArea.cityId || !this.nativeAddressArea.areaId)) {
          resolve('请选择籍贯地址')
        }
        if (this.selectTags.indexOf('婚姻状况') !== -1 && !this.personnalForm.maritalStatus) {
          resolve('请选择婚姻状况')
        }
        if (this.selectTags.indexOf('身高') !== -1 && !this.personnalForm.height) {
          resolve('请填写身高')
        }
        if (this.selectTags.indexOf('体重') !== -1 && !this.personnalForm.weight) {
          resolve('请填写体重')
        }
        if (this.selectTags.indexOf('学历信息') !== -1 && !this.personnalForm.highestEducation) {
          resolve('请选择最高学历')
        }
        if (this.selectTags.indexOf('学历信息') !== -1 && !this.personnalForm.graduationDate) {
          resolve('请选择毕业时间')
        }
        if (this.selectTags.indexOf('学历信息') !== -1 && !this.personnalForm.schoolOfGraduation) {
          resolve('请填写院校')
        }
        /* if (this.selectTags.indexOf('学历信息') !== -1 && !this.personnalForm.major) {
          resolve('请选择填写专业')
        }
         if (this.selectTags.indexOf('学历信息') !== -1 && !this.personnalForm.highestEducationWay) {
          resolve('请选择学历获取方式')
        }
        if (this.selectTags.indexOf('学历信息') !== -1 && !this.personnalForm.educationCertificateStatus) {
          resolve('请选择学历认证情况')
        }
        if (this.selectTags.indexOf('技术职称') !== -1 && !this.personnalForm.technicalTitle) {
          resolve('请填写技术职称')
        }
        if (this.selectTags.indexOf('职业资格') !== -1 && !this.personnalForm.vocationalQualification) {
          resolve('请填写职业资格')
        }
        if (this.selectTags.indexOf('技能等级') !== -1 && !this.personnalForm.technicalGrade) {
          resolve('请填写技能等级')
        } */
        if ((!this.archivesAddressArea.provinceId || !this.archivesAddressArea.cityId || !this.archivesAddressArea.areaId || !this.archivesAddressArea.address) && this.selectTags.indexOf('档案存放地') !== -1) {
          resolve('档案存放地不正确')
        }
        if ((!this.nowAddressArea.provinceId || !this.nowAddressArea.cityId || !this.nowAddressArea.areaId || !this.nowAddressArea.address) && this.selectTags.indexOf('现居住地') !== -1) {
          resolve('现居住地不正确')
        }
        if ((!this.contactAddressArea.provinceId || !this.contactAddressArea.cityId || !this.contactAddressArea.areaId || !this.contactAddressArea.address) && this.selectTags.indexOf('通讯地址') !== -1) {
          resolve('通讯地址不正确')
        }
        if (this.selectTags.indexOf('联系电话') !== -1 && (!this.personnalForm.telephone || !/^1\d{1}\d{9}$/.test(this.personnalForm.telephone))) {
          resolve('请填写正确的联系电话')
        }
        /* if (this.selectTags.indexOf('电子邮箱') !== -1 && !this.personnalForm.mail) {
          resolve('请填写电子邮箱')
        } */
        if (this.selectTags.indexOf('健康状况') !== -1) {
          const findChildren = this.tableTabs.find(x => x.type === 'healthStatus').children
          const mapHeals = findChildren.filter(x => x.status || x.status === 0)
          const mapHas = findChildren.filter(x => x.status === 1)
          const maptxt = findChildren.filter(x => x.text)
          if (mapHeals.length !== findChildren.length || mapHas.length !== maptxt.length) {
            resolve('健康状况信息填写不完整')
          }
        }
        resolve(false)
      })
    },
    // 不修改新值变老值且置灰
    changeCheckValue (isUpdate, item, original) {
      item.disabled = isUpdate
      this.personnalForm[item.type] = isUpdate ? original ? `${item.original}` : item.originalValue || '未填写' : ''
    },
    _getRemark (type) {
      return this.tableTabs.find(x => x.type === type) ? this.tableTabs.find(x => x.type === type).remark : ''
    },
    _getIsUpdate (child, parentType) {
      const findItem = this.tableTabs.find(x => x.type === parentType)
      const findChildItem = findItem.children.find(x => x.type === child)
      return findChildItem.isUpdate ? '0' : '1'
    },
    // 判断是否有这个对象有在取其中的某个值否则返回空
    getNullObject (obj, key) {
      return obj ? obj[key] : ''
    },
    _countParams () {
      const params = []
      if (this.selectTags.indexOf('身份证地址') !== -1) {
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          oldId: this.getNullObject(this.userDetails.idCardAddressMod, 'id'),
          oldValue: this.userDetails.idCardAddress,
          newId: '',
          changeName: '身份证地址',
          name: '身份证地址',
          newValue: '',
          userAddress: {
            type: '3',
            userId: this.$route.params.id,
            provinceId: this.idCardAddressArea.provinceId,
            provinceName: this.idCardAddressArea.provinceName,
            cityId: this.idCardAddressArea.cityId,
            cityName: this.idCardAddressArea.cityName,
            areaId: this.idCardAddressArea.areaId,
            areaName: this.idCardAddressArea.areaName,
            address: this.idCardAddressArea.address
          },
          remark: this._getRemark('idCardAddress')
        })
      }
      if (this.selectTags.indexOf('户籍性质') !== -1) {
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          changeName: '户籍性质',
          name: '户籍性质',
          oldId: this.userDetails.nature,
          oldValue: `${this.userDetails.nature}` === '1' ? '城镇' : '农村',
          newId: this.personnalForm.nature,
          newValue: `${this.personnalForm.nature}` === '1' ? '城镇' : '农村',
          remark: this._getRemark('nature')
        })
      }
      if (this.selectTags.indexOf('户籍地址') !== -1) {
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          oldId: this.getNullObject(this.userDetails.hujiAddressMod, 'id'),
          oldValue: this.userDetails.hujiAddress,
          newId: '',
          changeName: '户籍地址',
          name: '户籍地址',
          newValue: '',
          userAddress: {
            type: '8',
            userId: this.$route.params.id,
            provinceId: this.hujiAddressaArea.provinceId,
            provinceName: this.hujiAddressaArea.provinceName,
            cityId: this.hujiAddressaArea.cityId,
            cityName: this.hujiAddressaArea.cityName,
            areaId: this.hujiAddressaArea.areaId,
            areaName: this.hujiAddressaArea.areaName,
            address: this.hujiAddressaArea.address
          },
          remark: this._getRemark('hujiAddress')
        })
      }
      if (this.selectTags.indexOf('出生地址') !== -1) {
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          oldId: this.getNullObject(this.userDetails.birthplaceMod, 'id'),
          oldValue: this.userDetails.birthplace,
          newId: '',
          changeName: '出生地址',
          name: '出生地址',
          newValue: '',
          userAddress: {
            type: '1',
            userId: this.$route.params.id,
            provinceId: this.birthAddressArea.provinceId,
            provinceName: this.birthAddressArea.provinceName,
            cityId: this.birthAddressArea.cityId,
            cityName: this.birthAddressArea.cityName,
            areaId: this.birthAddressArea.areaId,
            areaName: this.birthAddressArea.areaName
          },
          remark: this._getRemark('birthplace')
        })
      }
      if (this.selectTags.indexOf('政治面貌') !== -1) {
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          changeName: '政治面貌',
          name: '政治面貌',
          changeValue: '',
          oldId: this.userDetails.politicsStatus,
          oldValue: this.userDetails.politicsStatusText,
          newId: this.personnalForm.politicsStatus,
          newValue: this.personnalForm.politicsStatus ? this.politicsOptions.find(x => `${x.code}` === `${this.personnalForm.politicsStatus}`).codeText : '',
          remark: this._getRemark('politicsStatus')
        })
      }
      if (this.selectTags.indexOf('籍贯地址') !== -1) {
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          oldId: this.getNullObject(this.userDetails.nativePlaceMod, 'id'),
          oldValue: this.userDetails.nativePlace,
          newId: '',
          changeName: '籍贯地址',
          name: '籍贯地址',
          newValue: '',
          userAddress: {
            type: '2',
            userId: this.$route.params.id,
            provinceId: this.nativeAddressArea.provinceId,
            provinceName: this.nativeAddressArea.provinceName,
            cityId: this.nativeAddressArea.cityId,
            cityName: this.nativeAddressArea.cityName,
            areaId: this.nativeAddressArea.areaId,
            areaName: this.nativeAddressArea.areaName
          },
          remark: this._getRemark('nativePlace')
        })
      }
      if (this.selectTags.indexOf('婚姻状况') !== -1) {
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          changeName: '婚姻状况',
          name: '婚姻状况',
          changeValue: '',
          oldId: this.userDetails.maritalStatus,
          oldValue: this.userDetails.maritalStatusText,
          newId: this.personnalForm.maritalStatus,
          newValue: this.personnalForm.maritalStatus ? this.maritalOptions.find(x => `${x.code}` === `${this.personnalForm.maritalStatus}`).codeText : '',
          remark: this._getRemark('maritalStatus')
        })
      }
      if (this.selectTags.indexOf('曾用名') !== -1) {
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          changeName: '曾用名',
          name: '曾用名',
          changeValue: '',
          oldId: '',
          oldValue: this.userDetails.formerName || '未填写',
          newId: '',
          newValue: this.personnalForm.formerName,
          remark: this._getRemark('formerName')
        })
      }
      if (this.selectTags.indexOf('体重') !== -1) {
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          changeName: '体重',
          name: '体重',
          changeValue: '',
          oldId: '',
          oldValue: this.userDetails.weight,
          newId: '',
          newValue: this.personnalForm.weight,
          remark: this._getRemark('weight')
        })
      }
      if (this.selectTags.indexOf('身高') !== -1) {
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          changeName: '身高',
          name: '身高',
          changeValue: '',
          oldId: '',
          oldValue: this.userDetails.height,
          newId: '',
          newValue: this.personnalForm.height,
          remark: this._getRemark('height')
        })
      }
      if (this.selectTags.indexOf('学历信息') !== -1) {
        const eduList = {
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          changeName: '学历信息',
          remark: this._getRemark('educationList', 'educationList')
        }
        if (this.personnalForm.highestEducation) {
          this.newValue = this.highestEduOptions.find(x => `${x.code}` === `${this.personnalForm.highestEducation}`).codeText
        }
        params.push(Object.assign({}, eduList, {
          name: '最高学历',
          oldId: this.userDetails.highestEducation,
          oldValue: this.userDetails.highestEducationText,
          newId: this.personnalForm.highestEducation,
          newValue: this.personnalForm.highestEducation ? this.highestEduOptions.find(x => `${x.code}` === `${this.personnalForm.highestEducation}`).codeText : '',
          isUpdate: this._getIsUpdate('highestEducation', 'educationList')
        }))
        params.push(Object.assign({}, eduList, {
          name: '毕业时间',
          oldId: '',
          oldValue: this.userDetails.graduationDate,
          newId: '',
          newValue: this.personnalForm.graduationDate,
          isUpdate: this._getIsUpdate('graduationDate', 'educationList')
        }))
        params.push(Object.assign({}, eduList, {
          name: '毕业院校',
          oldId: '',
          oldValue: this.userDetails.schoolOfGraduation,
          newId: '',
          newValue: this.personnalForm.schoolOfGraduation,
          isUpdate: this._getIsUpdate('schoolOfGraduation', 'educationList')
        }))
        params.push(Object.assign({}, eduList, {
          name: '所学专业',
          oldId: '',
          oldValue: this.userDetails.major,
          newId: '',
          newValue: this.personnalForm.major,
          isUpdate: this._getIsUpdate('major', 'educationList')
        }))
        params.push(Object.assign({}, eduList, {
          name: '学历获取形式',
          oldId: this.userDetails.highestEducationWay,
          oldValue: this.userDetails.highestEducationWayText,
          newId: this.personnalForm.highestEducationWay === '未填写' ? '' : this.personnalForm.highestEducationWay,
          newValue: this.personnalForm.highestEducationWay && this.personnalForm.highestEducationWay !== '未填写' ? this.eduWayOptions.find(x => `${x.code}` === `${this.personnalForm.highestEducationWay}`).codeText : '',
          isUpdate: this._getIsUpdate('highestEducationWay', 'educationList')
        }))
        params.push(Object.assign({}, eduList, {
          name: '学历认证情况',
          oldId: this.userDetails.educationCertificateStatus,
          oldValue: this.userDetails.educationCertificateStatusText,
          newId: this.personnalForm.educationCertificateStatus === '未填写' ? '' : this.personnalForm.educationCertificateStatus,
          newValue: this.personnalForm.educationCertificateStatus && this.personnalForm.educationCertificateStatus !== '未填写' ? this.educationCertificateOptions.find(x => `${x.code}` === `${this.personnalForm.educationCertificateStatus}`).codeText : '',
          isUpdate: this._getIsUpdate('educationCertificateStatus', 'educationList')
        }))
      }
      if (this.selectTags.indexOf('技术职称') !== -1) {
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          changeName: '技术职称',
          name: '技术职称',
          changeValue: '',
          oldId: '',
          oldValue: this.userDetails.technicalTitle,
          newId: '',
          newValue: this.personnalForm.technicalTitle,
          remark: this._getRemark('technicalTitle')
        })
      }
      if (this.selectTags.indexOf('职业资格') !== -1) {
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          changeName: '职业资格',
          name: '职业资格',
          changeValue: '',
          oldId: '',
          oldValue: this.userDetails.vocationalQualification,
          newId: '',
          newValue: this.personnalForm.vocationalQualification,
          remark: this._getRemark('vocationalQualification')
        })
      }
      if (this.selectTags.indexOf('技能等级') !== -1) {
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          changeName: '技能等级',
          name: '技能等级',
          changeValue: '',
          oldId: '',
          oldValue: this.userDetails.technicalGrade,
          newId: '',
          newValue: this.personnalForm.technicalGrade,
          remark: this._getRemark('technicalGrade')
        })
      }
      if (this.selectTags.indexOf('档案存放地') !== -1) {
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          oldId: this.getNullObject(this.userDetails.archivesAddressMod, 'id'),
          oldValue: this.userDetails.archivesAddress,
          newId: '',
          changeName: '档案存放地',
          name: '档案存放地',
          newValue: '',
          userAddress: {
            type: '7',
            userId: this.$route.params.id,
            provinceId: this.archivesAddressArea.provinceId,
            provinceName: this.archivesAddressArea.provinceName,
            cityId: this.archivesAddressArea.cityId,
            cityName: this.archivesAddressArea.cityName,
            areaId: this.archivesAddressArea.areaId,
            areaName: this.archivesAddressArea.areaName,
            address: this.archivesAddressArea.address
          },
          remark: this._getRemark('archivesAddress')
        })
      }
      if (this.selectTags.indexOf('现居住地址') !== -1) {
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          oldId: this.getNullObject(this.userDetails.nowAddressMod, 'id'),
          oldValue: this.userDetails.nowAddress,
          newId: '',
          changeName: '现居住地址',
          name: '现居住地址',
          newValue: '',
          userAddress: {
            type: '5',
            userId: this.$route.params.id,
            provinceId: this.nowAddressArea.provinceId,
            provinceName: this.nowAddressArea.provinceName,
            cityId: this.nowAddressArea.cityId,
            cityName: this.nowAddressArea.cityName,
            areaId: this.nowAddressArea.areaId,
            areaName: this.nowAddressArea.areaName,
            address: this.nowAddressArea.address
          },
          remark: this._getRemark('nowAddress')
        })
      }
      if (this.selectTags.indexOf('通讯地址') !== -1) {
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          oldId: this.getNullObject(this.userDetails.contactAddressMod, 'id'),
          oldValue: this.userDetails.contactAddress,
          newId: '',
          changeName: '通讯地址',
          name: '通讯地址',
          newValue: '',
          userAddress: {
            type: '4',
            userId: this.$route.params.id,
            provinceId: this.contactAddressArea.provinceId,
            provinceName: this.contactAddressArea.provinceName,
            cityId: this.contactAddressArea.cityId,
            cityName: this.contactAddressArea.cityName,
            areaId: this.contactAddressArea.areaId,
            areaName: this.contactAddressArea.areaName,
            address: this.contactAddressArea.address
          },
          remark: this._getRemark('contactAddress')
        })
      }
      if (this.selectTags.indexOf('联系电话') !== -1) {
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          changeName: '联系电话',
          name: '联系电话',
          changeValue: '',
          oldId: '',
          oldValue: this.userDetails.telephone,
          newId: '',
          newValue: this.personnalForm.telephone,
          remark: this._getRemark('telephone')
        })
      }
      if (this.selectTags.indexOf('电子邮箱') !== -1) {
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          changeName: '电子邮箱',
          name: '电子邮箱',
          changeValue: '',
          oldId: '',
          oldValue: this.userDetails.mail,
          newId: '',
          newValue: this.personnalForm.mail,
          remark: this._getRemark('mail')
        })
      }
      if (this.selectTags.indexOf('工资卡信息') !== -1) {
        const wages = {
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          changeName: '工资卡信息',
          remark: this._getRemark('wage')
        }
        params.push(Object.assign({}, wages, {
          name: '工资卡号',
          changeValue: '',
          oldId: '',
          oldValue: this.userDetails.payCardNo,
          newId: '',
          newValue: this.personnalForm.payCardNo,
          isUpdate: this._getIsUpdate('payCardNo', 'wage')
        }))
        params.push(Object.assign({}, wages, {
          name: '开户行',
          changeValue: '',
          oldId: '',
          oldValue: this.userDetails.openBank,
          newId: '',
          newValue: this.personnalForm.openBank,
          isUpdate: this._getIsUpdate('openBank', 'wage')
        }))
      }
      if (this.selectTags.indexOf('健康状况') !== -1) {
        const healChilds = this.tableTabs.find(x => x.type === 'healthStatus').children
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          changeName: '健康状况',
          name: '健康状况',
          remark: this._getRemark('healthStatus'),
          userHealthStatus: healChilds.map(item => ({
            userId: this.$route.params.id,
            dictId: item.id,
            status: item.status,
            text: item.text
          }))
        })
      }
      if (this.selectTags.indexOf('学习简历') !== -1) {
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          changeName: '学习简历',
          name: '学习简历',
          userEducations: this.$refs.personResume.getResumeDatas().map(item => ({
            idCardNumber: this.userDetails.idCardNumber,
            userId: this.$route.params.id,
            startDate: item.startDate,
            endDate: item.endDate,
            school: item.school,
            major: item.major,
            studyMode: item.studyMode,
            education: item.education,
            educationWay: item.educationWay
          })),
          remark: this.personnalForm.resumeRemark
        })
      }
      if (this.selectTags.indexOf('工作简历') !== -1) {
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          changeName: '工作简历',
          name: '工作简历',
          inZcBeforeOld: this.userDetails.inZcBefore,
          inZcBeforeNew: this.personnalForm.inZcBeforeNew,
          userJobResume: this.$refs.personJob.getJobDatas().map(item => ({
            idCardNumber: this.userDetails.idCardNumber,
            userId: this.$route.params.id,
            startDate: item.startDate,
            endDate: item.endDate,
            workUnit: item.workUnit,
            post: item.post,
            nature: item.nature,
            certifier: item.certifier,
            telephone: item.telephone,
            dimissionReason: item.dimissionReason
          })),
          remark: this.personnalForm.jobRemark
        })
      }
      if (this.selectTags.indexOf('家庭成员信息') !== -1) {
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          changeName: '家庭成员信息',
          name: '家庭成员信息',
          userFamilyMembers: this.$refs.personFamily.getFamilyDatas().map(item => ({
            idCardNumber: this.userDetails.idCardNumber,
            userId: this.$route.params.id,
            name: item.name,
            type: item.type,
            relation: item.relation,
            birthday: item.birthday,
            age: item.age,
            workUnit: item.workUnit,
            post: item.post,
            telephone: item.telephone,
            isEmployee: item.isEmployee,
            marryDate: item.marryDate,
            isKeAbove: item.isKeAbove
          })),
          remark: this.personnalForm.familyRemark
        })
      }
      if (this.selectTags.indexOf('姓名') !== -1) {
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          changeName: '姓名',
          name: '姓名',
          changeValue: '',
          oldId: '',
          oldValue: this.userDetails.name,
          newId: '',
          newValue: this.personnalForm.name,
          remark: this._getRemark('name')
        })
      }
      if (this.selectTags.indexOf('性别') !== -1) {
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          changeName: '性别',
          name: '性别',
          changeValue: '',
          oldId: this.userDetails.sex,
          oldValue: `${this.userDetails.sex}` ? `${this.userDetails.sex}` === '0' ? '女' : '男' : '',
          newId: this.personnalForm.sex,
          newValue: `${this.personnalForm.sex}` ? `${this.personnalForm.sex}` === '0' ? '女' : '男' : '',
          remark: this._getRemark('sex')
        })
      }
      if (this.selectTags.indexOf('身份证号码') !== -1) {
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          changeName: '身份证号码',
          name: '身份证号码',
          changeValue: '',
          oldId: '',
          oldValue: this.userDetails.idCardNumber,
          newId: '',
          newValue: this.personnalForm.idCardNumber,
          remark: this._getRemark('idCardNumber')
        })
      }
      if (this.selectTags.indexOf('民族') !== -1) {
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          changeName: '民族',
          name: '民族',
          changeValue: '',
          oldId: '',
          oldValue: this.userDetails.nation,
          newId: '',
          newValue: this.personnalForm.nation,
          remark: this._getRemark('nation')
        })
      }
      if (this.selectTags.indexOf('出生日期') !== -1) {
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '2',
          changeName: '出生日期',
          name: '出生日期',
          changeValue: '',
          oldId: '',
          oldValue: this.userDetails.birthday,
          newId: '',
          newValue: this.personnalForm.birthday,
          remark: this._getRemark('birthday')
        })
      }
      return params
    },
    // 提交
    submitUpdate: debounce(function () {
      this.$confirm(`确定要提交${getToken('updateName')}的信息${this.updateType === '2' ? '更正' : '更新'}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!this.selectTags.length) return this.$message.warning('请选择要修改的值')
        this.validateDatas().then(res => {
          if (res) {
            this.$message.warning(res)
          } else {
            const userChangeData = this._countParams()
            entryApi.saveUserChangeFile(userChangeData).then(res => {
              this.$message.success(this.updateType === '2' ? '更正申请成功' : '更新成功')
              setTimeout(() => {
                const { id: baseId, status } = this.$route.params
                this.$router.push({
                  name: 'BaseLabor',
                  params: {
                    baseId,
                    status: this.updateType === '2' ? '19' : status
                  },
                  query: {
                    come: this.$route.query.come
                  }
                })
              }, 200)
            })
          }
        })
      }).catch(() => {})
    }, 200),
    handleClose (tag) {
      console.log('ss', tag)
      if (tag === '学习简历' || tag === '工作简历' || tag === '家庭成员信息') {
        if (tag === '学习简历') {
          this.resumeVisible = false
          this.showCollArr.splice(this.showCollArr.findIndex(x => x === 'resume'), 1)
          console.log('dd', this.showCollArr)
        }
        if (tag === '工作简历') {
          this.jobVisible = false
          this.showCollArr.splice(this.showCollArr.findIndex(x => x === 'job'), 1)
        }
        if (tag === '家庭成员信息') {
          this.familyVisible = false
          this.showCollArr.splice(this.showCollArr.findIndex(x => x === 'family'), 1)
        }
        const findSx = this.selectTag.findIndex(x => x === this.defaultSelects[tag])
        this.selectTag.splice(findSx, 1)
        const fiX = this.selectTags.findIndex(x => x === tag)
        this.selectTags.splice(fiX, 1)
      } else {
        const findSx = this.selectTag.findIndex(x => x === this.defaultSelects[tag])
        this.selectTag.splice(findSx, 1)
        const fiX = this.selectTags.findIndex(x => x === tag)
        this.selectTags.splice(fiX, 1)
        const fIndex = this.tableTabs.findIndex(x => x.field === tag)
        this.tableTabs.splice(fIndex, 1)
      }
    },
    changeTag (tags) {
      console.log('dd', this.tableTabs)
      const mapTags = this.tableTabs.map(x => x.type)
      if (mapTags.length + this.showCollArr.length > tags.length) {
        return false
      } else {
        const tag = tags[tags.length - 1]
        const findTagTitle = this.selecDynamics.find(x => x.value === tag).label
        this.selectTags.push(findTagTitle)
        this._getDifferentType(tag, findTagTitle)
      }
    },
    removeTag (tag) {
      const fiItem = this.dynamicTags.find(x => x.tag === tag).tagTitle
      if (fiItem === '学习简历') {
        this.resumeVisible = false
        this.showCollArr.splice(this.showCollArr.findIndex(x => x === 'resume'), 1)
      }
      if (fiItem === '工作简历') {
        this.jobVisible = false
        this.showCollArr.splice(this.showCollArr.findIndex(x => x === 'job'), 1)
      }
      if (fiItem === '家庭成员信息') {
        this.familyVisible = false
        this.showCollArr.splice(this.showCollArr.findIndex(x => x === 'family'), 1)
      }
      const fiX = this.selectTags.findIndex(x => x === fiItem)
      this.selectTags.splice(fiX, 1)
      const fIndex = this.tableTabs.findIndex(x => x.field === fiItem)
      this.tableTabs.splice(fIndex, 1)
    },
    delResume (id, index) {
      this.delListData(id, index, this.resumeForm, '学历')
    },
    delJob (id, index) {
      this.delListData(id, index, this.jobForm, '工作简历')
    },
    delFamily (id, index) {
      this.delListData(id, index, this.familyForm, '家庭成员')
    },
    delListData (id, index, arr, msg) {
      console.log('index', index)
      if (!id) return arr.splice(index, 1)
      this.$confirm('确定要删除这条' + msg + '吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
        return arr.splice(index, 1) // 不调接口
        // arr.splice(index, 1)
        // if (id) {
        //   let delParams = {
        //     id,
        //     operator: getToken('loginId')
        //   }
        //   switch (msg) {
        //     case '学历' :
        //       entryApi.delEduList(delParams).then(data => {
        //         this._getReturnCode(data)
        //       })
        //       break
        //     case '工作简历' :
        //       entryApi.delResumeList(delParams).then(data => {
        //         this._getReturnCode(data)
        //       })
        //       break
        //     case '家庭成员' :
        //       entryApi.delFamilyList(delParams).then(data => {
        //         this._getReturnCode(data)
        //       })
        //   }
        // }
      }).catch(() => {})
    },
    _getReturnCode (data, callback) {
      this.$message.success('删除成功')
      this.$bus.$emit('getList', true)
    },
    // 根据不同的类型处理不同的个人档案
    _getDifferentType (type, title) {
      console.log('type', type)
      switch (type) {
        case 'idCardAddress':
          this.tableTabs.push({
            type,
            field: title,
            originalValue: this.userDetails[type].replace(/null/g, '') || '未填写',
            remark: ''
          })
          break
        case 'nature' :
          this.tableTabs.push({
            type,
            field: title,
            originalValue: `${this.userDetails[type]}` === '1' ? '城镇' : '农村',
            remark: ''
          })
          break
        case 'hujiAddress':
          this.tableTabs.push({
            type,
            field: title,
            originalValue: this.userDetails[type].replace(/null/g, '') || '未填写',
            remark: ''
          })
          break
        case 'birthplace':
          this.tableTabs.push({
            type,
            field: title,
            originalValue: this.userDetails[type].replace(/null/g, '') || '未填写',
            remark: ''
          })
          break
        case 'politicsStatus' :
          this.getPoliticsStatus()
          this.tableTabs.push({
            type,
            field: title,
            originalValue: this.userDetails.politicsStatusText || '未填写',
            remark: ''
          })
          break
        case 'nativePlace':
          this.tableTabs.push({
            type,
            field: title,
            originalValue: this.userDetails[type].replace(/null/g, '') || '未填写',
            remark: ''
          })
          break
        case 'maritalStatus':
          this.getMaritalStatus()
          this.tableTabs.push({
            type,
            field: title,
            originalValue: this.userDetails.maritalStatusText || '未填写',
            remark: ''
          })
          break
        case 'formerName':
          this.tableTabs.push({
            type,
            field: title,
            originalValue: this.userDetails[type] || '未填写',
            remark: ''
          })
          break
        case 'weight':
          this.tableTabs.push({
            type,
            field: title,
            originalValue: this.userDetails[type] ? this.userDetails[type] + 'kg' : '未填写',
            remark: ''
          })
          break
        case 'height':
          this.tableTabs.push({
            type,
            field: title,
            originalValue: this.userDetails[type] ? this.userDetails[type] + 'cm' : '未填写',
            remark: ''
          })
          break
        case 'educationList' :
          this.getHighestEdu()
          this.getEducationCertificate()
          this.getHighestEducationWay()
          this.tableTabs.push({
            type,
            field: title,
            children: [
              {
                type: 'highestEducation',
                field: '最高学历',
                originalValue: this.userDetails.highestEducationText || '未填写',
                original: this.userDetails.highestEducation,
                remark: '',
                disabled: false,
                isUpdate: false
              },
              {
                type: 'graduationDate',
                field: '毕业时间',
                originalValue: this.userDetails.graduationDate || '未填写',
                original: this.userDetails.graduationDate,
                remark: '',
                disabled: false,
                isUpdate: false
              },
              {
                type: 'schoolOfGraduation',
                field: '毕业院校',
                originalValue: this.userDetails.schoolOfGraduation || '未填写',
                original: this.userDetails.schoolOfGraduation,
                remark: '',
                disabled: false,
                isUpdate: false
              },
              {
                type: 'major',
                field: '所学专业',
                originalValue: this.userDetails.major || '未填写',
                original: this.userDetails.major,
                remark: '',
                disabled: false,
                isUpdate: false
              },
              {
                type: 'highestEducationWay',
                field: '学历获取形式',
                originalValue: this.userDetails.highestEducationWayText || '未填写',
                original: this.userDetails.highestEducationWay,
                remark: '',
                disabled: false,
                isUpdate: false
              },
              {
                type: 'educationCertificateStatus',
                field: '学历认证情况',
                originalValue: this.userDetails.educationCertificateStatusText || '未填写',
                original: this.userDetails.educationCertificateStatus,
                remark: '',
                disabled: false,
                isUpdate: false
              }
            ],
            remark: ''
          })
          break
        case 'technicalTitle':
          this.tableTabs.push({
            type,
            field: title,
            originalValue: this.userDetails[type] || '未填写',
            remark: ''
          })
          break
        case 'vocationalQualification':
          this.tableTabs.push({
            type,
            field: title,
            originalValue: this.userDetails[type] || '未填写',
            remark: ''
          })
          break
        case 'technicalGrade':
          this.tableTabs.push({
            type,
            field: title,
            originalValue: this.userDetails[type] || '未填写',
            remark: ''
          })
          break
        case 'archivesAddress' :
          this.tableTabs.push({
            type,
            field: title,
            /* originalValue: this.userDetails[type].replace(/null/g, '') || '未填写', */
            originalValue: this.userDetails[type] || '未填写',
            remark: ''
          })
          break
        case 'nowAddress':
          console.log('as', this.userDetails[type])
          this.tableTabs.push({
            type,
            field: title,
            /* originalValue: this.userDetails[type].replace(/null/g, '') || '未填写', */
            originalValue: this.userDetails[type] || '未填写',
            remark: ''
          })
          break
        case 'contactAddress':
          this.tableTabs.push({
            type,
            field: title,
            /* originalValue: this.userDetails[type].replace(/null/g, '') || '未填写', */
            originalValue: this.userDetails[type] || '未填写',
            remark: ''
          })
          break
        case 'telephone':
          this.tableTabs.push({
            type,
            field: title,
            originalValue: this.userDetails[type] || '未填写',
            remark: ''
          })
          break
        case 'mail':
          this.tableTabs.push({
            type,
            field: title,
            originalValue: this.userDetails[type] || '未填写',
            remark: ''
          })
          break
        case 'wage':
          this.tableTabs.push({
            type,
            field: title,
            children: [{
              type: 'payCardNo',
              field: '工资卡号',
              originalValue: this.userDetails.payCardNo || '未填写',
              remark: '',
              disabled: false,
              isUpdate: false
            },
            {
              type: 'openBank',
              field: '开户行',
              originalValue: this.userDetails.openBank || '未填写',
              remark: '',
              disabled: false,
              isUpdate: false
            }
            ],
            remark: ''
          })
          break
        case 'healthStatus':
          this.getHealthList().then(res => {
            const maps = []
            res.forEach(item => {
              const mapItem = this.userDetails.healthStatusList.find(x => x.code === item.code)
              maps.push(Object.assign({}, item, {
                type,
                field: item.codeText,
                originalValue: mapItem.status === 1 ? `有${mapItem.text}` : '无'
              }))
            })
            this.tableTabs.push({
              type,
              field: title,
              children: maps,
              remark: ''
            })
          })
          break
        case 'educationsResume' :
          this.resumeVisible = true
          this.showCollArr.push('resume')
          break
        case 'jobsResume' :
          this.jobVisible = true
          this.showCollArr.push('job')
          break
        case 'families' :
          this.familyVisible = true
          this.showCollArr.push('family')
          break
        case 'name' :
          this.tableTabs.push({
            type,
            field: title,
            originalValue: this.userDetails.name || '未填写',
            remark: ''
          })
          break
        case 'sex' :
          this.tableTabs.push({
            type,
            field: title,
            originalValue: `${this.userDetails.sex}` === '0' ? '女' : '男' || '未填写',
            remark: ''
          })
          break
        case 'nation' :
          this.tableTabs.push({
            type,
            field: title,
            originalValue: this.userDetails.nation || '未填写',
            remark: ''
          })
          break
        case 'birthday':
          this.tableTabs.push({
            type,
            field: title,
            originalValue: this.userDetails.birthday || '未填写',
            remark: ''
          })
          break
        case 'idCardNumber' :
          this.tableTabs.push({
            type,
            field: title,
            originalValue: this.userDetails.idCardNumber || '未填写',
            remark: ''
          })
          break
      }
    },

    // 把健康信息转换为需要的信息
    getChangeHealth (children, healthList, type) {
      const mapChilds = children.map(item => {
        const mapItem = healthList.find(x => x.code === item.code)
        return Object.assign({}, item, {
          type,
          field: item.codeText,
          originalValue: mapItem.status === 1 ? mapItem.text : '无'
        })
      })
      return mapChilds
    },
    // 获取员工详情
    getUserDetail () {
      entryApi.getUserDetail(this.$route.params.id).then(res => {
        this.userDetails = res.result
        this.personnalForm.inZcBeforeNew = res.result.inZcBefore
      })
    },
    // 默认的请求所有的省份
    getDefaultProvivces () {
      commonApi.getAreaByPid(0).then(res => {
        const cloneResult = cloneDeep(res.result)
        this.idCardAddressArea.optionProvinces = cloneResult
        this.hujiAddressaArea.optionProvinces = cloneResult
        this.birthAddressArea.optionProvinces = cloneResult
        this.nativeAddressArea.optionProvinces = cloneResult
        this.archivesAddressArea.optionProvinces = cloneResult
        this.nowAddressArea.optionProvinces = cloneResult
        this.contactAddressArea.optionProvinces = cloneResult
      })
    },
    // 数据字典
    getPoliticsStatus () {
      // 查询政治面貌
      commonApi.getSysDic('politicsStatus').then((data) => {
        if (data.result) {
          this.politicsOptions = data.result.filter(x => x.enable === 1)
        }
      })
    },
    // 获取婚姻状况
    getMaritalStatus () {
      commonApi.getSysDic('maritalStatus').then(res => {
        this.maritalOptions = res.result.filter(x => x.enable === 1)
      })
    },
    // 最高学历
    getHighestEdu () {
      commonApi.getSysDic('highestEducation').then(res => {
        this.highestEduOptions = res.result.filter(x => x.enable === 1)
      })
    },
    // 学历获取方式
    getHighestEducationWay () {
      commonApi.getSysDic('highestEducationWay').then(res => {
        this.eduWayOptions = res.result.filter(x => x.enable === 1)
      })
    },
    // 学历认证情况
    getEducationCertificate () {
      commonApi.getSysDic('educationCertificateStatus').then(res => {
        this.educationCertificateOptions = res.result.filter(x => x.enable === 1)
      })
    },
    // 健康状况
    getHealthList () {
      return new Promise((resolve) => {
        commonApi.getSysDic('healthStatus').then(res => {
          resolve(res.result.filter(x => x.enable === 1))
        })
      })
    },
    // 更正时获取下拉框
    getUpdateSelects () {
      if (this.updateType === '2') {
        const params = {
          userId: this.$route.params.id,
          type: 'personalFile'
        }
        entryApi.queryChangeNames(params).then(res => {
          console.log('123', res)
          this.dynamicTags = res.result.map(item => ({
            tagTitle: item.changeName,
            tag: this.defaultSelects[item.changeName],
            disabled: item.check === 1
          }))
        })
      }
    }
  },
  created () {
    this.getUserDetail()
    this.getDefaultProvivces()
    this.getUpdateSelects()
  }
}
</script>

<style scoped lang="less">
.base-update-personnal{
  position: relative;
  .fix-select{
    position: absolute;
    right:10px;
    top:10px;
    width:300px;
  }
}
.mutil-div{
  line-height:60px;
  // border-bottom:1px solid #ebeef5;
  position: relative;
  &::after{
    position: absolute;
    width:128%;
    height:1px;
    content: '';
    background-color:#ebeef5;
    right:-10px;
    bottom:0px;
  }
  &.no-bor{
    margin-top:15px;
    line-height:46px;
    &::after{
      background-color:#fff;
    }
  }
  &.noMt{
    margin-top:0px;
  }
}
.tags-box{
  max-width:1000px;
}
</style>
