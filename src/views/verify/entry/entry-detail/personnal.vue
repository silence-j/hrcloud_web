<template>
  <div class="mt-20">
    <el-collapse v-model="activeNames" accordion>
      <el-collapse-item title="基本信息" name="1">
        <el-form  label-width="130px">
          <p class="base-sec-title">身份证信息</p>
            <el-row>
              <el-col :span="8">
                <el-form-item label="姓  名：">
                  <el-input v-model="baseInformation.name" disabled ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item  label="性  别：" class="mustForm">
                  <el-select
                  v-model="baseInformation.sex"
                  filterable
                  placeholder="请填写性别"
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
              </el-col>
              <el-col :span="8">
                <el-form-item label="民  族：" class="mustForm">
                  <el-input v-model="baseInformation.nation"></el-input>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="出 生 日 期 ：" class="mustForm">
                  <el-date-picker
                      v-model="baseInformation.birthday"
                      type="date"
                      placeholder="请选择时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="身份证号：" >
                  <el-input v-model="baseInformation.idCardNumber" disabled ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="14">
                <el-form-item  label="身份证地址：" prop="province" class="mustForm">
                  <address-select
                   :area='idCardAddressArea'
                   :colSpan="7" :lineSpan="1"
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
                  <el-form-item
                  label="户 籍 地 址 ："
                   prop="province"
                   class="mustForm">
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
                    <el-input placeholder="请填写详细地址" :number="true" v-model="hujiForm.address"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="14">
                  <el-form-item label="户 籍 性 质：" class="mustForm">
                    <el-select v-model="baseInformation.nature" placeholder="请选择" style="width: 100%">
                      <el-option
                        v-for="item in natureSelect"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="曾用名：" >
                    <el-input v-model="baseInformation.formerName"></el-input>
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
                  <el-form-item label="身  高：" class="mustForm">
                    <el-input type="number" min="0" v-model="baseInformation.height"><template slot="append">CM</template></el-input>
                  </el-form-item>
                </el-col>
                 <el-col :span="5">
                  <el-form-item label="体  重：">
                    <el-input v-model="baseInformation.weight"><template slot="append">KG</template></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
                <el-row>
                  <el-col :span="14">
                    <el-form-item label="籍  贯：" class="mustForm">
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
                        v-for="item in marriage"
                        :label="item.label"
                        :value="item.value"
                        :key="item.index">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="政 治 面 貌 ：" class="mustForm" prop="politicsStatus">
                    <el-select v-model="baseInformation.politicsStatus"  placeholder="请填写政治面貌">
                      <el-option
                        v-for="item in polticSelect"
                        :label="item.label"
                        :value="item.value"
                        :key="item.index">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <p class="base-sec-title">教育背景 </p>
              <el-row>
                <el-col :span="8">
                  <el-form-item  label="最 高 学 历 ：" class="mustForm" prop="heighestEducation">
                    <el-select v-model="baseInformation.highestEducation" placeholder="请填写学历">
                      <el-option
                        v-for="item in eduSelect"
                        :label="item.label"
                        :value="item.value"
                        :key="item.index">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="毕 业 时 间：" class="mustForm">
                    <el-date-picker
                      v-model="baseInformation.graduationDate"
                      type="month"
                      placeholder="请选择时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                  <el-col :span="8">
                  <el-form-item label="毕 业 院 校：" class="mustForm">
                    <el-input v-model="baseInformation.schoolOfGraduation"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="所 学 专 业：" class="mustForm">
                    <el-input v-model="baseInformation.major"></el-input>
                  </el-form-item>
                </el-col>
                  <el-col :span="8">
                  <el-form-item label="学历获取形式：" >
                    <el-select v-model="baseInformation.highestEducationWay" filterable placeholder="学历获取形式" style="width:100%;">
                      <el-option
                        v-for="item in highestEducationWaySelect"
                        :label="item.label"
                        :value="item.value"
                        :key="item.index">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                  <el-col :span="8">
                  <el-form-item label="学历认证情况：" >
                    <el-select v-model="baseInformation.educationCertificateStatus" filterable placeholder="学历认证情况" style="width:100%;">
                      <el-option
                        v-for="item in educationCertificateSelect"
                        :label="item.label"
                        :value="item.value"
                        :key="item.index">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                  <el-col :span="8">
                  <el-form-item label="技 术 职 称：">
                    <el-input v-model="baseInformation.technicalTitle" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="职 业 资 格：" label-width="130px">
                    <el-input v-model="baseInformation.vocationalQualification" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="技 能 等 级：" >
                    <el-input v-model="baseInformation.technicalGrade"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <p class="base-sec-title">地址及联系 </p>
              <el-row>
                <el-col :span="14">
                  <el-form-item label="档案存放地 ：" prop="province" class="mustForm">
                    <address-select :area="archivesAddressArea" :colSpan="7" :lineSpan="1" :showZone="true"></address-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="详 细 地 址 ：" class="mustForm">
                    <el-input placeholder="请填写详细地址" :number="true" v-model="archivesForm.address"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
                <el-row>
                  <el-col :span="14">
                    <el-form-item label="现  住  址 ：" class="mustForm">
                      <address-select :area='nowArea' :colSpan="7" :lineSpan="1" :showZone="true"></address-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="详 细 地 址 ：" class="mustForm">
                      <el-input placeholder="请填写详细地址" :number="true" v-model="nowForm.address"></el-input>
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
                        <el-input placeholder="请填写详细地址" :number="true" v-model="contactForm.address"></el-input>
                      </el-form-item>
                    </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="联系电话：">
                    <el-input v-model="baseInformation.telephone" disabled ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="电子邮箱：" >
                    <el-input v-model="baseInformation.mail"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
      </el-collapse-item>

      <el-collapse-item title="健康情况" name="2">
        <el-form label-width="300px">
          <el-form-item label="家族（三代以内）是否有遗传病:" >
            <el-row>
              <el-col :span="8">
                <el-radio-group v-model="baseInformation.healthStatus1">
                  <el-radio class="radio"  :label="1">有</el-radio>
                  <el-radio class="radio"  :label="0">无</el-radio>
                </el-radio-group>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="三年以内是否有重大或复发疾病:" >
            <el-row>
              <el-col :span="8">
                <el-radio-group v-model="baseInformation.healthStatus2">
                  <el-radio class="radio"  :label="1">有</el-radio>
                  <el-radio class="radio"  :label="0">无</el-radio>
                </el-radio-group>
              </el-col>
            </el-row>
          </el-form-item>
          <div v-if="baseInformation.sex === 0">
            <el-form-item label="是否处于孕（哺乳）期:" >
              <el-row>
                <el-col :span="8">
                  <el-radio-group v-model="baseInformation.healthStatus3">
                    <el-radio class="radio"  :label="1">有</el-radio>
                    <el-radio class="radio"  :label="0">无</el-radio>
                  </el-radio-group>
                </el-col>
              </el-row>
            </el-form-item>
          </div>
          <el-form-item label="是否有三高（高血压、高血脂、高血糖）:" >
            <el-row>
              <el-col :span="8">
                <el-radio-group v-model="baseInformation.healthStatus4">
                  <el-radio class="radio"  :label="1">有</el-radio>
                  <el-radio class="radio"  :label="0">无</el-radio>
                </el-radio-group>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="是否有癫痫 :" >
            <el-row>
              <el-col :span="8">
                <el-radio-group v-model="baseInformation.healthStatus5">
                  <el-radio class="radio"  :label="1">有</el-radio>
                  <el-radio class="radio"  :label="0">无</el-radio>
                </el-radio-group>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="是否有过敏史 : " >
            <el-row>
              <el-col :span="8">
                <el-radio-group v-model="baseInformation.healthStatus6">
                  <el-radio class="radio"  :label="1">有</el-radio>
                  <el-radio class="radio"  :label="0">无</el-radio>
                </el-radio-group>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="是否有哮喘史 : " >
            <el-row>
              <el-col :span="8">
                <el-radio-group v-model="baseInformation.healthStatus7">
                  <el-radio class="radio"  :label="1">有</el-radio>
                  <el-radio class="radio"  :label="0">无</el-radio>
                </el-radio-group>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-collapse-item>

      <el-collapse-item title="学习简历" name="3">
        <el-form label-width="100px">
          <el-table
            :data="resumeInformation"
            :highlight-current-row="true"
            border>
              <el-table-column
              type="index"
              width="50"
              label="序号"
              >
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
                          v-for="item in Selectedu"
                          :label="item.label"
                          :value="item.value"
                          :key="item.index">
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
                      <div class="operation"><span @click="delListData(scope.row, resumeInformation, '学历')" class="icon">删除</span></div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form>
              <el-row class="mt-15">
                <el-col :span="1"><el-button type="primary" size="small" @click="addEduMsg">新增</el-button></el-col>
                <!-- <el-col :span="1"  v-if="resumeInformation.length!==0"><el-button type="danger" size="small" @click="deletEduMsg">删除</el-button></el-col> -->
              </el-row>
      </el-collapse-item>

      <el-collapse-item title="工作简历" name="4">
        <el-table
          :data="jobInformation"
          highlight-current-row
          border>
          <el-table-column
          type="index"
          width="50"
          label="序号"
          >
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
                <span @click="delListData(scope.row, jobInformation, '工作简历')" class="icon">删除</span>
              </template>
            </el-table-column>
          </el-table>
        <el-row class="mt-15">
          <el-col :span="1"><el-button type="primary" size="small" @click="addWorkMsg">新增</el-button></el-col>
          <!-- <el-col :span="1"  v-if="resumeInformation.length!==0"><el-button type="danger" size="small" @click="deletEduMsg">删除</el-button></el-col> -->
        </el-row>
      </el-collapse-item>

      <el-collapse-item title="家庭成员信息" name="5">
        <el-table
          :data="familyInformation"
          highlight-current-row
          border>
          <el-table-column
          type="index"
          width="50px"
          label="序号"
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
              <el-select v-model="scope.row.relation"  placeholder="请选择称呼">
                <el-option
                  v-for="item in familySelect"
                  :label="item.label"
                  :value="item.value"
                  :key="item.index">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="年龄">
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
            width="120px"
            >
              <template slot-scope="scope">
                <span @click="delListData(scope.row, familyInformation, '家庭成员')" class="icon">删除</span>
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
      <el-col :span="2" :offset="10"><el-button type="primary" size="small" style="width:100%" @click="savePersonalInfo">保  存</el-button></el-col>
    </el-row>
  </div>
</template>
<script>
import AddressSelect from 'components/AddressSelect.vue'
import { getAllarea } from 'static/api/common/common'
import { getToken } from 'assets/js/util'
import { timeToString } from 'assets/js/common'
import { checkAcceptBaseDetail, checkAcceptOtherDetail, checkAcceptJobDetail, checkAcceptFamilyDetail, checkAcceptResumeDetail, savePersonnelMsg } from 'static/api/recruit/accept/accept'
import { delFamilyList, delResumeList, delEduList } from 'static/api/personnel-information/base/base'
export default {
  data () {
    return {
      activeNames: '',
      baseInformation: [],
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
      eduSelect: [
        { value: 7, label: '博士' },
        { value: 6, label: '硕士' },
        { value: 5, label: '本科' },
        { value: 4, label: '大专' },
        { value: 3, label: '高中' },
        { value: 2, label: '中专' },
        { value: 1, label: '初中及以下' }
      ],
      marriage: [
        { value: 0, label: '未婚' },
        { value: 1, label: '已婚' },
        { value: 2, label: '离异' },
        { value: 3, label: '再婚' },
        { value: 4, label: '丧偶' }
      ],
      polticSelect: [
        { value: 0, label: '群众' },
        { value: 1, label: '中共党员' },
        { value: 2, label: '预备党员' },
        { value: 3, label: '共青团员' },
        { value: 4, label: '民主党派' },
        { value: 5, label: '其它' }
      ],
      highestEducationWaySelect: [
        { value: 0, label: '国家统招(全日制)' },
        { value: 1, label: '专升本' },
        { value: 2, label: '成人' },
        { value: 3, label: '远程' },
        { value: 4, label: '自考' },
        { value: 5, label: '留学' }
      ],
      Selectedu: [
        { value: '7', label: '博士' },
        { value: '6', label: '硕士' },
        { value: '5', label: '本科' },
        { value: '4', label: '大专' },
        { value: '3', label: '高中' },
        { value: '2', label: '中专' },
        { value: '1', label: '初中及以下' }
      ],
      natureSelect: [
        { value: 1, label: '城镇' },
        { value: 2, label: '农村' }
      ],
      familySelect: [
        { value: 1, label: '父亲' },
        { value: 2, label: '母亲' },
        { value: 3, label: '儿子' },
        { value: 4, label: '女儿' },
        { value: 5, label: '配偶' },
        { value: 6, label: '兄弟姐妹' },
        { value: 7, label: '兄弟姐妹之配偶' },
        { value: 8, label: '兄弟姐妹之子女' }
      ],
      educationCertificateSelect: [
        { value: 0, label: '认证成功' },
        { value: 1, label: '认证失败' }
      ],
      jobInformation: [],
      familyInformation: [],
      resumeInformation: []
    }
  },
  methods: {
    _getAllArea () {
      getAllarea(0).then(data => {
        if (data && data.data && data.data.length) {
          data.data.forEach((area) => {
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
                this._getReturnCode(data, this._checkAcceptResumeDetail())
              })
              break
            case '工作简历' :
              delResumeList(delParams).then(data => {
                this._getReturnCode(data, this._checkAcceptJobDetail())
              })
              break
            case '家庭成员' :
              delFamilyList(delParams).then(data => {
                this._getReturnCode(data, this._checkAcceptFamilyDetail())
              })
          }
        }
      }).catch(() => {})
    },
    _getReturnCode (data, callback) {
      if (data.meta && data.meta.code === 200) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        setTimeout(() => {
        // eslint-disable-next-line
          callback
        }, 400)
      } else {
        this.$message({
          message: data,
          type: 'error'
        })
      }
    },
    _getAcceptDetail () {
      checkAcceptBaseDetail(this.$route.params.employeeId).then((data) => {
        if (data && data.data) {
          this.baseInformation = data.data
          /** 通讯地址**/
          if (data.data.contactAddressMod) {
            this.contactForm = data.data.contactAddressMod
            this.contactAddressArea.provinceId = this.contactForm.provinceId
            this.contactAddressArea.provinceName = this.contactForm.provinceName
            this.contactAddressArea.cityId = this.contactForm.cityId
            if (this.contactForm.provinceId) {
              getAllarea(this.contactForm.provinceId).then((data) => {
                if (data && data.data && data.data.length) {
                  data.data.forEach((area) => {
                    this.contactAddressArea.optionCities.push(area)
                  })
                }
              })
            }
            if (this.contactForm.cityId) {
              getAllarea(this.contactForm.cityId).then((data) => {
                if (data && data.data && data.data.length) {
                  data.data.forEach((area) => {
                    this.contactAddressArea.optionZones.push(area)
                  })
                }
              })
            }
            this.contactAddressArea.cityName = this.contactForm.cityName
            this.contactAddressArea.areaId = this.contactForm.areaId
            this.contactAddressArea.areaName = this.contactForm.areaName
            //  this.baseInformation.contactAddress = this.contactForm.address
          }
          /** 户籍地址**/
          if (data.data.hujiAddressMod) {
            this.hujiForm = data.data.hujiAddressMod
            this.hujiArea.provinceId = this.hujiForm.provinceId
            this.hujiArea.provinceName = this.hujiForm.provinceName
            this.hujiArea.cityId = this.hujiForm.cityId
            if (this.hujiForm.provinceId) {
              getAllarea(this.hujiForm.provinceId).then((data) => {
                if (data && data.data && data.data.length) {
                  data.data.forEach((area) => {
                    this.hujiArea.optionCities.push(area)
                  })
                }
              })
            }
            if (this.hujiForm.cityId) {
              getAllarea(this.hujiForm.cityId).then((data) => {
                if (data && data.data && data.data.length) {
                  data.data.forEach((area) => {
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
          /** 籍贯地址**/
          if (data.data.nativePlaceMod) {
            this.nativeForm = data.data.nativePlaceMod
            this.nativeArea.provinceId = this.nativeForm.provinceId
            this.nativeArea.provinceName = this.nativeForm.provinceName
            this.nativeArea.cityId = this.nativeForm.cityId
            if (this.nativeForm.provinceId) {
              getAllarea(this.nativeForm.provinceId).then((data) => {
                if (data && data.data && data.data.length) {
                  data.data.forEach((area) => {
                    this.nativeArea.optionCities.push(area)
                  })
                }
              })
            }
            if (this.nativeForm.cityId) {
              getAllarea(this.nativeForm.cityId).then((data) => {
                if (data && data.data && data.data.length) {
                  data.data.forEach((area) => {
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
          /** 现住址**/
          if (data.data.nowAddressMod) {
            this.nowForm = data.data.nowAddressMod
            this.nowArea.provinceId = this.nowForm.provinceId
            this.nowArea.provinceName = this.nowForm.provinceName
            this.nowArea.cityId = this.nowForm.cityId
            if (this.nowForm.provinceId) {
              getAllarea(this.nowForm.provinceId).then((data) => {
                if (data && data.data && data.data.length) {
                  data.data.forEach((area) => {
                    this.nowArea.optionCities.push(area)
                  })
                }
              })
            }
            if (this.nowForm.cityId) {
              getAllarea(this.nowForm.cityId).then((data) => {
                if (data && data.data && data.data.length) {
                  data.data.forEach((area) => {
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
          if (data.data.archivesAddressMod) {
            this.archivesForm = data.data.archivesAddressMod
            this.archivesAddressArea.provinceId = this.archivesForm.provinceId
            this.archivesAddressArea.provinceName = this.archivesForm.provinceName
            this.archivesAddressArea.cityId = this.archivesForm.cityId
            if (this.archivesForm.provinceId) {
              getAllarea(this.archivesForm.provinceId).then((data) => {
                if (data && data.data && data.data.length) {
                  data.data.forEach((area) => {
                    this.archivesAddressArea.optionCities.push(area)
                  })
                }
              })
            }
            if (this.archivesForm.cityId) {
              getAllarea(this.archivesForm.cityId).then((data) => {
                if (data && data.data && data.data.length) {
                  data.data.forEach((area) => {
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
          /** 出生地地址**/
          if (data.data.birthplaceMod) {
            this.birthplaceForm = data.data.birthplaceMod
            this.birthplaceArea.provinceId = this.birthplaceForm.provinceId
            this.birthplaceArea.provinceName = this.birthplaceForm.provinceName
            this.birthplaceArea.cityId = this.birthplaceForm.cityId
            if (this.birthplaceForm.provinceId) {
              getAllarea(this.birthplaceForm.provinceId).then((data) => {
                if (data && data.data && data.data.length) {
                  data.data.forEach((area) => {
                    this.birthplaceArea.optionCities.push(area)
                  })
                }
              })
            }
            if (this.birthplaceForm.cityId) {
              getAllarea(this.birthplaceForm.cityId).then((data) => {
                if (data && data.data && data.data.length) {
                  data.data.forEach((area) => {
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
          /** 身份证地址**/
          if (data.data.idCardAddressMod) {
            this.idCardForm = data.data.idCardAddressMod
            this.idCardAddressArea.provinceId = this.idCardForm.provinceId
            this.idCardAddressArea.provinceName = this.idCardForm.provinceName
            this.idCardAddressArea.cityId = this.idCardForm.cityId
            if (this.idCardForm.provinceId) {
              getAllarea(this.idCardForm.provinceId).then((data) => {
                if (data && data.data && data.data.length) {
                  data.data.forEach((area) => {
                    this.idCardAddressArea.optionCities.push(area)
                  })
                }
              })
            }
            if (this.idCardForm.cityId) {
              getAllarea(this.idCardForm.cityId).then((data) => {
                if (data && data.data && data.data.length) {
                  data.data.forEach((area) => {
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
      checkAcceptOtherDetail(this.$route.params.employeeId).then((data) => {
        this.otherInformation = data.data[0]
      })
    },
    _checkAcceptJobDetail () {
      checkAcceptJobDetail(this.$route.params.employeeId).then((data) => {
        this.jobInformation = data.data
      })
    },
    _checkAcceptFamilyDetail () {
      checkAcceptFamilyDetail(this.$route.params.employeeId).then((data) => {
        this.familyInformation = data.data
        this.familyInformation.forEach(item => {
          if (item.relation === 0) {
            item.relation = ''
          }
        })
      })
    },
    _checkAcceptResumeDetail () {
      checkAcceptResumeDetail(this.$route.params.employeeId).then((data) => {
        this.resumeInformation = data.data
      })
    },
    /** 个人信息保存**/
    savePersonalInfo () {
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
        if (item.startDate || item.endDate || item.school || item.major || item.studyMode || item.education || item.educationWay) {
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
          'graduationDate': this.baseInformation.graduationDate,
          'vocationalQualification': this.baseInformation.vocationalQualification,
          'highestEducationWay': this.baseInformation.highestEducationWay,
          'educationCertificateStatus': this.baseInformation.educationCertificateStatus,
          'technicalGrade': this.baseInformation.technicalGrade,
          'height': this.baseInformation.height,
          'weight': this.baseInformation.weight || '',
          'telephone': this.baseInformation.telephone,
          'mail': this.baseInformation.mail,
          'healthStatus1': this.baseInformation.healthStatus1,
          'healthStatus2': this.baseInformation.healthStatus2,
          'healthStatus3': this.baseInformation.healthStatus3,
          'healthStatus4': this.baseInformation.healthStatus4,
          'healthStatus5': this.baseInformation.healthStatus5,
          'healthStatus6': this.baseInformation.healthStatus6,
          'healthStatus7': this.baseInformation.healthStatus7,
          'id': this.$route.params.employeeId,
          'contactAddressMod': {
            operator: getToken('loginId').toString(),
            id: this.contactForm.id,
            address: this.contactForm.address ? this.contactForm.address : '',
            // address: this.baseInformation.contactAddress,
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
            //  address: this.baseInformation.idCardAddress,
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
            // address: this.baseInformation.nowAddress,
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
            //  address: this.baseInformation.birthAddress,
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
            // address: this.baseInformation.nativeAddress,
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
            //  address: this.baseInformation.hujiAddress,
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
            // address: this.baseInformation.archivesAddress,
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
      let mail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (this.baseInformation.sex !== 0 && !this.baseInformation.sex) {
        this.$message({
          type: 'warning',
          message: '请选择性别!'
        })
        return
      }
      if (!this.baseInformation.nation) {
        this.$message({
          type: 'warning',
          message: '请填写民族!'
        })
        return
      }
      if (!this.baseInformation.birthday) {
        this.$message({
          type: 'warning',
          message: '请填写出生日期!'
        })
        return
      }
      if (!this.idCardAddressArea.provinceId || !this.idCardAddressArea.cityId || !this.idCardAddressArea.areaId || !this.idCardForm.address) {
        this.$message({
          type: 'warning',
          message: '请填写身份证地址!'
        })
        return
      }
      if (!this.hujiArea.provinceId || !this.hujiArea.cityId || !this.hujiArea.areaId || !this.hujiForm.address) {
        this.$message({
          type: 'warning',
          message: '请填写户籍地址!'
        })
        return
      }
      if (this.baseInformation.nature !== 0 && !this.baseInformation.nature) {
        this.$message({
          type: 'warning',
          message: '请填写户籍性质!'
        })
        return
      }
      if (!this.birthplaceArea.provinceId || !this.birthplaceArea.cityId || !this.birthplaceArea.areaId) {
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
      if (!this.nativeArea.provinceId || !this.nativeArea.cityId || !this.nativeArea.areaId) {
        this.$message({
          type: 'warning',
          message: '请填写籍贯地址!'
        })
        return
      }
      if (this.baseInformation.maritalStatus !== 0 && !this.baseInformation.maritalStatus) {
        this.$message({
          type: 'warning',
          message: '请填写婚姻状况!'
        })
        return
      }
      if (this.baseInformation.politicsStatus !== 0 && !this.baseInformation.politicsStatus) {
        this.$message({
          type: 'warning',
          message: '请填写政治面貌!'
        })
        return
      }
      if (this.baseInformation.highestEducation !== 0 && !this.baseInformation.highestEducation) {
        this.$message({
          type: 'warning',
          message: '请选择最高学历!'
        })
        return
      }
      if (!this.baseInformation.graduationDate) {
        this.$message({
          type: 'warning',
          message: '请选择毕业时间!'
        })
        return
      }
      if (!this.baseInformation.schoolOfGraduation) {
        this.$message({
          type: 'warning',
          message: '请填写毕业学校!'
        })
        return
      }
      if (!this.baseInformation.major) {
        this.$message({
          type: 'warning',
          message: '请写所学专业!'
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
      if (this.baseInformation.mail) {
        if (!mail.test(this.baseInformation.mail)) {
          this.$message({
            type: 'warning',
            message: '请填写正确的电子邮箱!'
          })
          return
        }
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
      savePersonnelMsg(savePersonalParams).then((res) => {
        if (res.meta && res.meta.code === 200) {
          this.$message({
            type: 'success',
            message: '信息保存成功!'
          })
          setTimeout(() => {
            this._getAcceptDetail()
          }, 400)
        } else {
          this.$message({
            type: 'error',
            message: '信息保存失败:' + res

          })
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
    this.$store.commit('SET_ACTIVE_ROUTER', true)
  }
}
</script>
<style lang="less" scoped>
.el-form-item.mustForm::before{top:8px;}
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
