<template>
<div @click="orgDatas.showTree = false">
  <ul class="tab-bar-ul clearfix mb-20">
    <li><el-button type="primary" size="mini" @click="goBack">返  回</el-button></li>
    <li><el-button type="primary" size="mini" @click="goReview">提  交</el-button></li>
  </ul>
  <el-tabs v-model="activeName">
     <el-tab-pane label="劳动人事信息" name="first">
        <el-collapse>
        <el-collapse-item
        title="入职及劳动人事信息"
        name="1">
              <el-form
              :model="entryInformation"
              :rules="entryInfoRules"
              ref="entryInformation"
              label-width="140px">
              <el-row>
                <el-col :span="12">
                  <el-form-item
                  label="参加工作时间："
                  prop="takejobDate"
                  >
                    <el-date-picker
                      v-model="entryInformation.takejobDate"
                      type="date"
                      placeholder="选择日期"
                      >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="本次入职时间："
                  prop="entryDate"
                   >
                    <el-date-picker
                      v-model="entryInformation.entryDate"
                      type="date"
                      placeholder="选择日期"
                      >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="$route.params.come =='/verify/entry/entry'">
                <el-col :span="12">
                  <el-form-item  label="任 职 部 门：" required>
                    <el-input v-model="entryInformation.orgName" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="岗    位：" required>
                    <el-input v-model="entryInformation.postName" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
               <el-row v-else>
                <el-col :span="12">
                  <el-form-item  label="任 职 部 门："
                   required
                   v-if="$route.params.come === '/market-verify/entry'||$route.params.come === '/market-verify/entry/entry'|| $route.params.come === '/market-verify/entry/headquarters'">
                  <search-dept-tree
                  :orgDatas="orgDatas"
                  />
                  </el-form-item>
                  <el-form-item
                  label="任 职 部 门："
                 required
                  v-else-if="$route.params.come === '/personnel-information/base'">
                   <search-dept-tree
                  :orgDatas="orgDatas"
                  />
                  </el-form-item>
                  <el-form-item  label="任 职 部 门："
                  required
                   class="mustForm" v-else>
                  <search-dept-tree
                  :orgDatas="orgDatas"
                  />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="岗  位："
                  prop="postName"
                  >
                    <el-input v-model="entryInformation.postName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item
                  label="原单位是否已缴纳社保："
                  label-width="220px"
                  prop="insuredInOld"
                  >
                    <el-radio-group v-model="entryInformation.insuredInOld">
                      <el-radio :label="0" >未缴纳</el-radio>
                      <el-radio :label="1" >缴纳</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="entryInformation.insuredInOld == 1">
                <el-col :span="12">
                  <el-form-item label="社保缴纳至:"
                  prop="insuredOldMonth"
                  >
                    <el-date-picker
                      v-model="entryInformation.insuredOldMonth"
                      type="month"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="社保缴纳地："
                  prop="insuredOldArea"
                  >
                    <el-input v-model.trim="entryInformation.insuredOldArea"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item
                  label="原单位是否已缴纳公积金："
                  label-width="220px"
                  prop="fundedInOld"
                  >
                    <el-radio-group v-model="entryInformation.fundedInOld">
                      <el-radio :label="0" >未缴纳</el-radio>
                      <el-radio :label="1" >缴纳</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="entryInformation.fundedInOld == 1">
                <el-col :span="12">
                  <el-form-item
                  label="公积金缴纳至:"
                  prop="fundedOldMonth"
                  >
                    <el-date-picker
                      v-model.trim="entryInformation.fundedOldMonth"
                      type="month"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="公积金缴纳地："
                  prop="fundedOldArea"
                  >
                    <el-input v-model="entryInformation.fundedOldArea"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                  label="是否与原单位解除劳动合同:"
                  label-width="220px"
                  prop="cancelConctractWithOld"
                  >
                    <el-radio-group v-model="entryInformation.cancelConctractWithOld">
                      <el-radio :label="0">未解除</el-radio>
                      <el-radio :label="1">已解除</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
        </el-collapse-item>
        <el-collapse-item title="材料附件" name="2">
          <el-form>
            <el-row>
              <el-col>
                <p class="mean-title">需提供材料</p>
              </el-col>
            </el-row>
            <el-row>
                <el-col>
                  <el-form-item label-width="30px">
                      <el-checkbox-group v-model="userEntryInfoExtraList">
                      <el-checkbox
                      v-for="(item,index) in allDicOptions"
                      :key="index" name="userEntryInfoExtraList"
                      :label="item.dictId"
                      :disabled="item.disabled"
                        @change="getDicId(item, $event)">
                        {{item.dictName}}
                        </el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <h3 class="mean-title">已提供材料</h3>
                  <el-checkbox-group v-model="userEntryInfoExtraList2">
                    <el-tag
                    v-for="(item,index) in userOtherEntryInfoExtraList"
                    :key="index"
                    class="el-tag-check"
                  >
                  <el-checkbox name="userEntryInfoExtraList2" :label="item.dictId">{{item.dictName}}<i class="el-icon-close" @click.stop="delDic(item)"></i></el-checkbox>
                  </el-tag>
                  </el-checkbox-group>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="入职类型及薪资信息" name="3">
         <entry-type-and-salary
         ref="entryType"
         :typeAndSalaryForm="typeAndSalaryForm"
         :rules="rules"
         />
        </el-collapse-item>
      </el-collapse>
      <el-row style="margin-top: 30px" v-if="$route.params.come!='/personnel-information/base'&&$route.params.come!='/market-verify/entry'">
        <el-col :span="2" :offset="10"> <el-button type="primary" size="small" style="width:100%" @click="entrySave">保 存</el-button></el-col>
      </el-row>
     </el-tab-pane>

    <el-tab-pane label="个人档案" name="second">
      <el-collapse accordion>
        <el-collapse-item title="基本信息" name="1">
          <el-form
          label-width="130px"
          :rules="personnelRules"
          :model="baseInformation"
          ref="baseInformation"
          >
            <p class="base-sec-title">身份证信息</p>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="姓  名：" prop="name">
                    <el-input v-model.trim="baseInformation.name" placeholder="请填写姓名"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item  label="性    别：" prop="sex">
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
                  <el-form-item
                  label="民  族："
                  prop="nation"
                  >
                    <el-input v-model="baseInformation.nation"  placeholder="请填写民族"></el-input>
                    </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="出 生 日 期："
                  prop="birthday"
                  >
                    <el-date-picker
                        v-model="baseInformation.birthday"
                        type="date"
                        placeholder="请选择出生日期"
                        :picker-options="pickerOptionsBirth">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号：" prop="idCardNumber" >
                    <el-input v-model="baseInformation.idCardNumber" placeholder="请填写身份证号"></el-input>
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
                    <el-form-item label="详 细 地 址：" class="mustForm">
                    <el-input placeholder="请填写身份证详细地址" :number="true"  v-model="idCardForm.address"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
                <p class="base-sec-title">户籍信息</p>
                <el-row>
                  <el-col :span="14">
                    <el-form-item
                    label="户 籍 地 址："
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
                    <el-form-item label="详 细 地 址：" class="mustForm">
                      <el-input placeholder="请填写户籍地址详细地址" :number="true" v-model="hujiForm.address"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="14">
                    <el-form-item label="户 籍 性 质：" prop="nature">
                      <el-select v-model="baseInformation.nature" placeholder="请选择户籍性质" style="width:98%">
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
                    <el-form-item label="曾 用 名：" >
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
                    <el-form-item label="身  高："
                    prop="height"
                    >
                    <el-input type="number" min="0" v-model="baseInformation.height" placeholder="请填写身高"><template slot="append">CM</template></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="体    重：">
                      <el-input type="number" min="0" v-model="baseInformation.weight" placeholder="请填写体重"><template slot="append">KG</template></el-input>
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
                    <el-form-item label="婚 姻 状 况：" prop="maritalStatus">
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
                    <el-form-item label="政 治 面 貌：" prop="politicsStatus">
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
                    <el-form-item  label="最 高 学 历：" prop="highestEducation">
                      <el-select
                      v-model="baseInformation.highestEducation"
                      style="width:100%"
                      placeholder="请填写最高学历">
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
                    <el-form-item label="毕 业 时 间："
                    prop="graduationDate"
                    >
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
                    <el-form-item label="所 学 专 业：" prop="major">
                      <el-input v-model="baseInformation.major" placeholder="请填写所学专业"></el-input>
                    </el-form-item>
                  </el-col>
                    <el-col :span="8">
                    <el-form-item label="学历获取形式：" >
                      <el-select v-model="baseInformation.highestEducationWay" filterable placeholder="请选择学历获取形式" style="width:100%;">
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
                      <el-select v-model="baseInformation.educationCertificateStatus" filterable placeholder="请选择学历认证情况" style="width:100%;">
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
                <p class="base-sec-title">地址及联系信息 </p>
                <el-row>
                  <el-col :span="14">
                    <el-form-item label="档案存放地：" prop="province" class="mustForm">
                      <address-select :area="archivesAddressArea" :colSpan="7" :lineSpan="1" :showZone="true"></address-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="详 细 地 址：" class="mustForm">
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
                      <el-form-item label="详 细 地 址：" class="mustForm">
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
                        <el-form-item label="详 细 地 址：" class="mustForm">
                          <el-input placeholder="请填写通讯地址详细地址" :number="true" v-model="contactForm.address"></el-input>
                        </el-form-item>
                      </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="联 系 电 话："
                    prop="telephone"
                    >
                      <el-input v-model="baseInformation.telephone" placeholder="请填写联系电话"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="电子邮箱：">
                      <el-input v-model="baseInformation.mail" placeholder="请填写电子邮箱"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <p class="base-sec-title">其他信息 </p>
                <el-row>
                    <el-col :span="8">
                      <el-form-item label="工资卡号：">
                        <el-input type="number" min="0" v-model="baseInformation.payCardNo" placeholder="请填写工资卡号"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="开户行：">
                        <el-input v-model="baseInformation.openBank"  placeholder="请填写开户行"></el-input>
                      </el-form-item>
                    </el-col>
                </el-row>
              </el-form>
        </el-collapse-item>

        <el-collapse-item title="健康情况" name="2">
          <el-form
            class="health"
          :model="baseInformation"
          :rules="entryInfoRules"
           ref="baseInformation"
          label-width="300px">
            <el-form-item
            prop="healthStatus1"
            label="家族（三代以内）是否有遗传病：" >
              <el-row>
                <el-col :span="8">
                  <el-radio-group v-model="baseInformation.healthStatus1">
                    <el-radio class="radio"  :label="1">有</el-radio>
                    <el-radio class="radio"  :label="0">无</el-radio>
                  </el-radio-group>
                  <el-input v-model="baseInformation.health1Txt" v-if="baseInformation.healthStatus1 === 1" class="health-text"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item
             prop="healthStatus2"
             label="三年以内是否有重大或复发疾病：" >
              <el-row>
                <el-col :span="8">
                  <el-radio-group v-model="baseInformation.healthStatus2">
                    <el-radio class="radio"  :label="1">有</el-radio>
                    <el-radio class="radio"  :label="0">无</el-radio>
                  </el-radio-group>
                  <el-input v-model="baseInformation.health2Txt" v-if="baseInformation.healthStatus2 === 1" class="health-text"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <div v-if="baseInformation.sex == 0">
              <el-form-item
               prop="healthStatus3"
              label="是否处于孕（哺乳）期：" >
                <el-row>
                  <el-col :span="8">
                    <el-radio-group v-model="baseInformation.healthStatus3">
                      <el-radio class="radio"  :label="1">有</el-radio>
                      <el-radio class="radio"  :label="0">无</el-radio>
                    </el-radio-group>
                    <el-input v-model="baseInformation.health3Txt" v-if="baseInformation.healthStatus3 === 1" class="health-text"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </div>
            <el-form-item
             prop="healthStatus4"
            label="是否有三高(高血压、高血脂、高血糖)：" >
              <el-row>
                <el-col :span="8">
                  <el-radio-group v-model="baseInformation.healthStatus4">
                    <el-radio class="radio"  :label="1">有</el-radio>
                    <el-radio class="radio"  :label="0">无</el-radio>
                  </el-radio-group>
                  <el-input v-model="baseInformation.health4Txt" v-if="baseInformation.healthStatus4 === 1" class="health-text"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item
             prop="healthStatus5"
            label="是否有癫痫：" >
              <el-row>
                <el-col :span="8">
                  <el-radio-group v-model="baseInformation.healthStatus5">
                    <el-radio class="radio"  :label="1">有</el-radio>
                    <el-radio class="radio"  :label="0">无</el-radio>
                  </el-radio-group>
                  <el-input v-model="baseInformation.health5Txt" v-if="baseInformation.healthStatus5 === 1" class="health-text"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item
             prop="healthStatus6"
             label="是否有过敏史：" >
              <el-row>
                <el-col :span="8">
                  <el-radio-group v-model="baseInformation.healthStatus6">
                    <el-radio class="radio"  :label="1">有</el-radio>
                    <el-radio class="radio"  :label="0">无</el-radio>
                  </el-radio-group>
                  <el-input v-model="baseInformation.health6Txt" v-if="baseInformation.healthStatus6 === 1" class="health-text"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item
             prop="healthStatus7"
            label="是否有哮喘史：" >
              <el-row>
                <el-col :span="8">
                  <el-radio-group v-model="baseInformation.healthStatus7">
                    <el-radio class="radio"  :label="1">有</el-radio>
                    <el-radio class="radio"  :label="0">无</el-radio>
                  </el-radio-group>
                  <el-input v-model="baseInformation.health7Txt" v-if="baseInformation.healthStatus7 === 1" class="health-text"></el-input>
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
                width="70"
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
                        <span @click="delListData(scope.row, resumeInformation, '学历')" class="icon delete-color">删除</span>
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
            width="60"
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
                  <span @click="delListData(scope.row, jobInformation, '工作简历')" class="icon delete-color">删除</span>
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
            width="60px"
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
                  <span @click="delListData(scope.row, familyInformation, '家庭成员')" class="icon delete-color">删除</span>
                </template>
              </el-table-column>
            </el-table>
            <el-row class="mt-15">
            <el-col :span="1"><el-button type="primary" size="small" @click="familyMsg">新增</el-button></el-col>
            <!-- <el-col :span="1"  v-if="resumeInformation.length!==0"><el-button type="danger" size="small" @click="deletEduMsg">删除</el-button></el-col> -->
            </el-row>
        </el-collapse-item>
      </el-collapse>
      <el-row style="margin-top: 30px" v-if="$route.params.come!='/personnel-information/base'&&$route.params.come!='/market-verify/entry'">
        <el-col :span="2" :offset="10"><el-button type="primary" size="small" style="width:100%" @click="savePersonalInfo">保  存</el-button></el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
import { checkAcceptBaseDetail, checkAcceptOtherDetail, checkAcceptJobDetail, checkAcceptFamilyDetail, checkAcceptResumeDetail, savePersonnelMsg } from 'static/api/recruit/accept/accept'
import { getInsuredInOld, getfilterRelieveStatus, getfilternature } from 'assets/js/filters'
import { saveUserEntryInfo, getUserInfoDetail, delEntryMaterial, saveSalarySetting, assessCallback } from 'static/api/recruit/entry/entry'
import { checkMaterial, getSysDic, getAllarea } from 'static/api/common/common'
import { getToken } from 'assets/js/util'
import AddressSelect from 'components/AddressSelect.vue'
import { timeToString, timeZeroToString } from 'assets/js/common'
import { delFamilyList, delResumeList, delEduList, addMarketUser, addOtherUser, reMarketUser } from 'static/api/personnel-information/base/base'
import { setGoBackRouter, setSalaryType, entryRulesMixin } from 'assets/js/mixins'
import EntryTypeAndSalary from 'components/EntryTypeAndSalary.vue'
import { getTaskComplete } from 'static/api/exmine/exmine'
import SearchDeptTree from 'components/SearchDeptTree'
import { personnelRules } from 'assets/js/validator'
import { mapGetters } from 'vuex'
export default {
  mixins: [setGoBackRouter, setSalaryType, entryRulesMixin],
  data () {
    let validateEnteryDate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择本次入职时间'))
      } else if (value < this.entryInformation.takejobDate) {
        callback(new Error('本次入职时间要大于等于参加工作的时间!'))
      } else {
        callback()
      }
    }
    return {
      pickerOptionsBirth: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      orgDatas: {
        filterName: '',
        orgId: '',
        dataTree: [],
        showTree: false,
        disable: true
      },
      typeAndSalaryForm: {
        candidateType: '',
        exercitationBeginTime: '',
        exercitationEndTime: '',
        exercitationSalary: '',
        exercitationAllowance: '',
        probationBeginTime: '',
        probationEndTime: '',
        workAgreement: '',
        noProbation: false
      },
      activeName: 'first',
      userSalarySettingInfo: {},
      entryInformation: {
        takejobDate: '',
        entryDate: '',
        orgId: '',
        orgName: '',
        postName: '',
        cancelConctractWithOld: '',
        fundedInOld: '',
        fundedOldArea: '',
        fundedOldMonth: '',
        insuredInOld: '',
        insuredOldMonth: '',
        insuredOldArea: '',
        nature: '',
        selectProv: '',
        selectCity: '',
        hujiAddress: '',
        archivesAddress: ''
      },
      newAllDicArr: [],
      allDicOptions: [],
      userOtherEntryInfoExtraList: [],
      userEntryInfoExtraList: [],
      userEntryInfoExtraList2: [],
      baseInformation: {},
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
        { value: 1, label: '认证成功' },
        { value: 0, label: '认证失败' }
      ],
      jobInformation: [],
      familyInformation: [],
      resumeInformation: [],
      formSalaryParams: '',
      probaSalaryParams: '',
      personnelRules: personnelRules,
      entryInfoRules: {
        takejobDate: {
          required: true, message: '请选择参加工作的时间', trigger: 'change', type: 'date'
        },
        entryDate: { validator: validateEnteryDate, required: true, trigger: 'change', type: 'date' },
        postName: {
          required: true, message: '请填写岗位', trigger: 'blur'
        },
        insuredInOld: {
          required: true, message: '请选择原单位是否已缴纳社保', trigger: 'change'
        },
        insuredOldMonth: {
          required: true, message: '请选择社保缴纳至', trigger: 'change', type: 'date'
        },
        insuredOldArea: {
          required: true, message: '请填写社保缴纳地', trigger: 'blur'
        },
        fundedInOld: {
          required: true, message: '请选择原单位是否已缴纳公积金', trigger: 'change'
        },
        fundedOldMonth: {
          required: true, message: '请选择公积金缴纳至', trigger: 'change', type: 'date'
        },
        fundedOldArea: {
          required: true, message: '请填写公积金缴纳地址', trigger: 'blur'
        },
        cancelConctractWithOld: {
          required: true, message: '请选择是否与原单位解除劳动合同', trigger: 'change'
        },
        healthStatus1: { required: true, message: '请选择家族（三代以内）是否有遗传病史', trigger: 'change' },
        healthStatus2: { required: true, message: '请选择三年以内是否有重大或复发疾病', trigger: 'change' },
        healthStatus3: { required: true, message: '请选择是否处于孕（哺乳）期', trigger: 'change' },
        healthStatus4: { required: true, message: '请选择是否有三高（高血压、高血脂、高血糖）', trigger: 'change' },
        healthStatus5: { required: true, message: '请选择是否有癫痫', trigger: 'change' },
        healthStatus6: { required: true, message: '请选择是否有过敏史', trigger: 'change' },
        healthStatus7: { required: true, message: '请选择是否是否有哮喘', trigger: 'change' }
      }
    }
  },
  components: {
    AddressSelect,
    EntryTypeAndSalary,
    SearchDeptTree
  },
  computed: {
    ...mapGetters(['getSalaryArr', 'getAllSave']),
    employeeId () {
      return this.$route.params.employeeId === 'null' ? '' : this.$route.params.employeeId
    }
  },
  methods: {
    _getUserSalaryParams () {
      this.getSalaryStructure()
      let params = {
        candidateType: this.typeAndSalaryForm.candidateType,
        probationBeginTime: this.typeAndSalaryForm.probationBeginTime ? timeZeroToString(this.typeAndSalaryForm.probationBeginTime) : '', // probaSalaryParams
        probationSalary: '',
        formalSalary: '',
        probationEndTime: this.typeAndSalaryForm.probationEndTime ? timeZeroToString(this.typeAndSalaryForm.probationEndTime) : '',
        exercitationBeginTime: this.typeAndSalaryForm.exercitationBeginTime ? timeZeroToString(this.typeAndSalaryForm.exercitationBeginTime) : '',
        exercitationEndTime: this.typeAndSalaryForm.exercitationEndTime ? timeZeroToString(this.typeAndSalaryForm.exercitationEndTime) : '',
        workAgreement: this.typeAndSalaryForm.workAgreement,
        operator: getToken('loginId').toString(),
        noProbation: this.typeAndSalaryForm.noProbation ? 1 : 0,
        exercitationSalary: this.typeAndSalaryForm.exercitationSalary,
        exercitationAllowance: this.typeAndSalaryForm.exercitationAllowance,
        userId: this.$route.params.employeeId === 'null' ? '' : this.$route.params.employeeId,
        salaryMonth: this.typeAndSalaryForm.salaryMonth,
        allowanceMonth: this.typeAndSalaryForm.allowanceMonth,
        expenditureMonth: this.typeAndSalaryForm.expenditureMonth,
        positiveTime: timeToString(this.entryInformation.entryDate)
      }
      return params
    },
    goReview () {
      let routeCome = this.$route.params.come
      if (routeCome === '/market-verify/entry') {
        this.checkEntrySave().then(res => {
          if (res) {
            this.checkPersonalInfo().then(data => {
              if (data) {
                let addMarketParams = {
                  userPersonalInfo: this._getUserBaseInfo(),
                  entryInfo: this._getEntrySaveParams(),
                  userSalarySettingInfo: this._getUserSalaryParams()
                }
                if (this.$route.query.opeator === 'remine') {
                  reMarketUser(addMarketParams).then(data => {
                    this.$message.success('新增营销人员成功')
                    setTimeout(() => {
                      this.$router.push('/market-verify/entry/entry?active=first')
                    }, 200)
                  })
                } else {
                  addMarketUser(addMarketParams).then(data => {
                    this.$message.success('新增营销人员成功')
                    setTimeout(() => {
                      this.$router.push('/market-verify/entry/entry')
                    }, 200)
                  })
                }
              }
            })
          }
        })
      } else if (routeCome === '/personnel-information/base') {
        this.checkEntrySave().then(res => {
          if (res) {
            this.checkPersonalInfo().then(data => {
              if (data) {
                let addMarketParams = {
                  userPersonalInfo: this._getUserBaseInfo(),
                  entryInfo: this._getEntrySaveParams(),
                  userSalarySettingInfo: this._getUserSalaryParams()
                }
                addOtherUser(addMarketParams).then(data => {
                  this.$message.success('新增员工成功')
                  setTimeout(() => {
                    this.$router.push('/personnel-information/base')
                  }, 200)
                })
              }
            })
          }
        })
      } else {
        this.checkEntrySave().then(res => {
          if (res) {
            this.checkPersonalInfo().then(data => {
              if (data) {
                if (this.getAllSave.save1 && this.getAllSave.save2) {
                  getUserInfoDetail(this.employeeId).then(data => {
                    if (data.result && data.result.id) {
                      checkAcceptBaseDetail(this.employeeId).then(res => {
                        if (res.result && res.result.nature) {
                          this.$confirm('是否同意通过审批', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                          }).then(() => {
                            if (this.$route.params.come === '/market-verify/entry/headquarters') {
                              let passParams = {
                                auditStatus: 1,
                                userId: this.$route.params.employeeId
                              }
                              assessCallback(passParams).then(data => {
                                this._setGetTaskComplete('审核完成')
                                this.$store.commit('SET_SAVE1', false)
                                this.$store.commit('SET_SAVE2', false)
                              })
                            } else {
                              this._setGetTaskComplete('审核通过请等待其他审核人的结果')
                            }
                          }).catch(() => {})
                        } else {
                          this.$message.warning('请先保存个人档案')
                        }
                      })
                    } else {
                      this.$message.warning('请先保存劳动人事信息')
                    }
                  })
                } else {
                  if (!this.getAllSave.save1) {
                    this.$message.warning('请先保存入职信息')
                  }
                  if (this.getAllSave.save1 && !this.getAllSave.save2) {
                    this.$message.warning('请先保存个人信息')
                  }
                }
              }
            })
          }
        })
      }
    },
    _setGetTaskComplete (message) {
      let newPassKey = this.$route.params.exminePassKey
      newPassKey = newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass'
      let complateParams = {
        actType: 'entry',
        userId: getToken('loginId').toString(),
        pId: this.$route.params.exminePid,
        id: this.$route.params.exmineId,
        taskId: this.$route.params.exmineTaskId,
        owner: this.$route.params.exmineUserId,
        var: {
          keys: newPassKey,
          values: 'true',
          types: 'B'
        }
      }
      getTaskComplete(complateParams).then(data => {
        this.$message.success(message)
        setTimeout(() => {
          this.$router.replace(this.$route.params.come)
        }, 400)
      })
    },
    /** 获取入职信息**/
    _getUserInfo () {
      if (this.employeeId) {
        this.$store.commit('SET_SALARY_ID', this.employeeId)
        getUserInfoDetail(this.employeeId).then(data => {
          if (data.result) {
            this.entryInformation.cancelConctractWithOld = data.result.cancelConctractWithOld
            this.entryInformation.fundedOldArea = data.result.fundedOldArea
            this.entryInformation.fundedInOld = data.result.fundedInOld
            this.entryInformation.insuredOldArea = data.result.insuredOldArea
            this.entryInformation.insuredInOld = data.result.insuredInOld
            if (data.result.fundedOldMonth) this.entryInformation.fundedOldMonth = new Date(data.result.fundedOldMonth)
            if (data.result.insuredOldMonth) this.entryInformation.insuredOldMonth = new Date(data.result.insuredOldMonth)
            if (data.result.entryDate) this.entryInformation.entryDate = new Date(data.result.entryDate)
            if (data.result.takejobDate) this.entryInformation.takejobDate = new Date(data.result.takejobDate)
          }
        })
      }
    },
    /** 获取个人信息**/
    _getPersonalMaterial () {
      if (this.employeeId) {
        checkMaterial(this.employeeId).then(data => {
          setTimeout(() => {
            if (data.result) {
              this.userOtherEntryInfoExtraList = []
              this.userEntryInfoExtraList = []
              this.userEntryInfoExtraList2 = []
              this.allDicOptions = []
              data.result.forEach(item => {
                this.userEntryInfoExtraList.push(item.dictId)
                if (item.status === 1) {
                  this.userEntryInfoExtraList2.push(item.dictId)
                }
                this.userOtherEntryInfoExtraList.push({
                  id: item.id,
                  dictId: item.dictId,
                  dictName: item.dictName,
                  userId: item.userId
                })
              })
              this.newAllDicArr.forEach(item => {
                if (this.userEntryInfoExtraList.indexOf(item.dictId) !== -1) {
                  this.allDicOptions.push({
                    dictId: item.dictId,
                    id: item.id,
                    dictName: item.dictName,
                    userId: item.userId,
                    disabled: true
                  })
                } else {
                  this.allDicOptions.push({
                    dictId: item.dictId,
                    id: item.id,
                    dictName: item.dictName,
                    disabled: false,
                    userId: item.userId
                  })
                }
              })
            } else {
              this.allDicOptions = this.newAllDicArr
            }
          }, 500)
        })
      } else {
        setTimeout(() => {
          this.allDicOptions = this.newAllDicArr
        }, 500)
      }
      this.$store.commit('SET_SAVE1', true)
    },
    getDicId (item, event) {
      if (this.userEntryInfoExtraList.indexOf(item.dictId) !== -1) {
        this.userOtherEntryInfoExtraList.push(item)
        item.disabled = true
      }
    },
    /** 获取入职资料信息**/
    _getSysDic () {
      this.newAllDicArr = []
      getSysDic('ENTRYINFOTYPE').then(data => {
        if (data.result && data.result.length) {
          data.result.forEach(item => {
            this.newAllDicArr.push({
              id: '',
              dictId: Number(item.id),
              dictName: item.codeText,
              disabled: false
            })
          })
        }
      })
    },
    /** 删除材料**/
    delDic (item) {
      let itemId = item.id
      if (itemId) {
        let delParams = {
          id: item.id,
          operator: getToken('loginId').toString(),
          userId: item.userId
        }
        delEntryMaterial(delParams).then(data => {
          setTimeout(() => {
            this._getPersonalMaterial()
          }, 200)
        })
      } else {
        let dictId = item.dictId
        this.userOtherEntryInfoExtraList.forEach(item => {
          if (item.dictId === dictId) {
            this.userOtherEntryInfoExtraList.splice(this.userOtherEntryInfoExtraList.indexOf(item), 1)
          }
        })
        this.userEntryInfoExtraList.forEach(arr => {
          if (arr === dictId) {
            this.userEntryInfoExtraList.splice(this.userEntryInfoExtraList.indexOf(arr), 1)
          }
        })
        let newAllDicArr = this.allDicOptions
        let emtpArr = []
        newAllDicArr.forEach(item => {
          if (item.dictId === dictId) {
            item.disabled = false
          }
          emtpArr.push(item)
        })
        this.allDicOptions = emtpArr
      }
    },
    checkEntrySave () {
      return new Promise((resolve, reject) => {
        let isCheckSalaryVaild = true
        let isCheckTrySalaryVaild = true
        let etyBoolean = this.$refs.entryType.checkValid()
        // let jobDate = new Date((this.entryInformation.takejobDate))
        // let entryDate = new Date((this.entryInformation.entryDate))
        this.$refs.entryInformation.validate(valid => {
          if (valid && etyBoolean && isCheckSalaryVaild && isCheckTrySalaryVaild) {
            return resolve(true)
          } else {
            this.$message.warning('请填写完整的入职信息')
            return resolve(false)
          }
        })
      })
    },
    _getEntrySaveParams () {
      let getId = []
      this.userOtherEntryInfoExtraList.forEach(item => {
        if (this.userEntryInfoExtraList2.indexOf(item.dictId) !== -1) {
          getId.push({ dictId: item.dictId, userId: this.employeeId, operator: getToken('loginId'), status: 1, id: item.id })
        } else {
          getId.push({ dictId: item.dictId, userId: this.employeeId, operator: getToken('loginId'), status: 0, id: item.id })
        }
      })
      /* this.entryInformation.takejobDate = new Date(this.entryInformation.takejobDate) */
      let entryParams = {
        actId: this.$route.params.actId !== 'null' ? this.$route.params.actId : '',
        idCardNumber: this.entryInformation.idCardNumber,
        orgId: this.orgDatas.orgId,
        orgName: this.orgDatas.filterName,
        userId: this.entryInformation.id,
        userEntryInfo: {
          archivesAddress: '',
          operator: getToken('loginId'),
          cancelConctractWithOld: this.entryInformation.cancelConctractWithOld,
          entryDate: timeToString(this.entryInformation.entryDate),
          fundedInOld: this.entryInformation.fundedInOld,
          fundedOldArea: this.entryInformation.fundedOldArea,
          fundedOldMonth: timeToString(this.entryInformation.fundedOldMonth),
          insuredInOld: this.entryInformation.insuredInOld,
          insuredOldArea: this.entryInformation.insuredOldArea,
          insuredOldMonth: timeToString(this.entryInformation.insuredOldMonth),
          nature: this.entryInformation.nature,
          postName: this.entryInformation.postName,
          takejobDate: timeToString(this.entryInformation.takejobDate),
          userId: this.entryInformation.id
        },
        userEntryInfoExtraList: getId
      }
      return entryParams
    },
    // 入职信息保存
    entrySave () {
      this.checkEntrySave().then(res => {
        if (res) {
          let entrySaveParams = this._getEntrySaveParams()
          let salaryParams = this._getUserSalaryParams()
          // console.log('salary', salaryParams)
          saveUserEntryInfo(entrySaveParams).then(data => {
            saveSalarySetting(salaryParams).then(res => {
              this.$store.commit('SET_SALARY_ID', this.$route.params.employeeId)
              this.$store.commit('SET_SALARY_CHANGE', true)
              this.$message.success('入职信息保存成功!')
              this.$store.commit('SET_SAVE1', true)
              this._getPersonalMaterial()
            })
          })
        }
      })
    },
    _getAllArea () {
      getAllarea(0).then(data => {
        if (data.result && data.result.length) {
          data.result.forEach((area) => {
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
      this.$message.success('删除成功')
      setTimeout(() => {
        // eslint-disable-next-line
          callback
      }, 400)
    },
    _getAcceptDetail () {
      if (this.employeeId) {
        checkAcceptBaseDetail(this.employeeId).then(data => {
          if (data.result) {
            this.orgDatas.filterName = data.result.orgName
            this.orgDatas.orgId = data.result.orgId
            this.$store.commit('SET_INFO_BY_ORG_ID', data.result.orgId)
            this.orgDatas.orgId = data.result.orgId
            this.orgDatas.filterName = data.result.orgName
            this.entryInformation.orgId = data.result.orgId
            this.entryInformation.orgName = data.result.orgName
            this.entryInformation.postName = data.result.postName
            this.entryInformation.idCardNumber = data.result.idCardNumber
            this.entryInformation.id = data.result.id
            this.baseInformation = data.result
            if (data.result.birthday) this.baseInformation.birthday = new Date(data.result.birthday)
            if (data.result.graduationDate) this.baseInformation.graduationDate = new Date(data.result.graduationDate)
            /** 通讯地址**/
            if (data.result.contactAddressMod) {
              this.contactForm = data.result.contactAddressMod
              this.contactAddressArea.provinceId = this.contactForm.provinceId
              this.contactAddressArea.provinceName = this.contactForm.provinceName
              this.contactAddressArea.cityId = this.contactForm.cityId
              if (this.contactForm.provinceId) {
                this.contactAddressArea.optionCities = []
                getAllarea(this.contactForm.provinceId).then(data => {
                  if (data.result && data.result.length) {
                    data.result.forEach((area) => {
                      this.contactAddressArea.optionCities.push(area)
                    })
                  }
                })
              }
              if (this.contactForm.cityId) {
                this.contactAddressArea.optionZones = []
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
              //  this.baseInformation.contactAddress = this.contactForm.address
            }
            // 户籍地址
            if (data.result.hujiAddressMod) {
              this.hujiForm = data.result.hujiAddressMod
              this.hujiArea.provinceId = this.hujiForm.provinceId
              this.hujiArea.provinceName = this.hujiForm.provinceName
              this.hujiArea.cityId = this.hujiForm.cityId
              if (this.hujiForm.provinceId) {
                this.hujiArea.optionCities = []
                getAllarea(this.hujiForm.provinceId).then(data => {
                  if (data.result && data.result.length) {
                    data.result.forEach((area) => {
                      this.hujiArea.optionCities.push(area)
                    })
                  }
                })
              }
              if (this.hujiForm.cityId) {
                this.hujiArea.optionZones = []
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
                this.nativeArea.optionCities = []
                getAllarea(this.nativeForm.provinceId).then(data => {
                  if (data.result && data.result.length) {
                    data.result.forEach(area => {
                      this.nativeArea.optionCities.push(area)
                    })
                  }
                })
              }
              if (this.nativeForm.cityId) {
                this.nativeArea.optionZones = []
                getAllarea(this.nativeForm.cityId).then(data => {
                  if (data.result && data.result.length) {
                    data.result.forEach(area => {
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
                this.nowArea.optionCities = []
                getAllarea(this.nowForm.provinceId).then(data => {
                  if (data.result && data.result.length) {
                    data.result.forEach(area => {
                      this.nowArea.optionCities.push(area)
                    })
                  }
                })
              }
              if (this.nowForm.cityId) {
                this.nowArea.optionZones = []
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
            // 档案所在地
            if (data.result.archivesAddressMod) {
              this.archivesForm = data.result.archivesAddressMod
              this.archivesAddressArea.provinceId = this.archivesForm.provinceId
              this.archivesAddressArea.provinceName = this.archivesForm.provinceName
              this.archivesAddressArea.cityId = this.archivesForm.cityId
              if (this.archivesForm.provinceId) {
                this.archivesAddressArea.optionCities = []
                getAllarea(this.archivesForm.provinceId).then(data => {
                  if (data.result && data.result.length) {
                    data.result.forEach(area => {
                      this.archivesAddressArea.optionCities.push(area)
                    })
                  }
                })
              }
              if (this.archivesForm.cityId) {
                this.archivesAddressArea.optionZones = []
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
                this.birthplaceArea.optionCities = []
                getAllarea(this.birthplaceForm.provinceId).then(data => {
                  if (data.result && data.result.length) {
                    data.result.forEach((area) => {
                      this.birthplaceArea.optionCities.push(area)
                    })
                  }
                })
              }
              if (this.birthplaceForm.cityId) {
                this.birthplaceArea.optionZones = []
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
                this.idCardAddressArea.optionCities = []
                getAllarea(this.idCardForm.provinceId).then(data => {
                  if (data.result && data.result.length) {
                    data.result.forEach((area) => {
                      this.idCardAddressArea.optionCities.push(area)
                    })
                  }
                })
              }
              if (this.idCardForm.cityId) {
                this.idCardAddressArea.optionZones = []
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
      }
      this._checkAcceptOtherDetail()
      this._checkAcceptJobDetail()
      this._checkAcceptFamilyDetail()
      this._checkAcceptResumeDetail()
    },
    _checkAcceptOtherDetail () {
      if (this.employeeId) {
        checkAcceptOtherDetail(this.employeeId).then(data => {
          if (data.result && data.result.length) {
            this.otherInformation = data.result[0]
          }
        })
      }
    },
    _checkAcceptJobDetail () {
      if (this.employeeId) {
        checkAcceptJobDetail(this.employeeId).then(data => {
          if (data.result) {
            this.jobInformation = data.result
          }
        })
      }
    },
    _checkAcceptFamilyDetail () {
      if (this.employeeId) {
        checkAcceptFamilyDetail(this.employeeId).then(data => {
          if (data.result) {
            this.familyInformation = data.result
            this.familyInformation.forEach(item => {
              if (item.relation === 0) {
                item.relation = ''
              }
            })
          }
        })
      }
    },
    _checkAcceptResumeDetail () {
      if (this.employeeId) {
        checkAcceptResumeDetail(this.employeeId).then(data => {
          if (data.result) {
            this.resumeInformation = data.result
          }
        })
      }
    },
    checkPersonalInfo () {
      return new Promise((resolve, reject) => {
        this.$refs.baseInformation.validate(valid => {
          if (valid) {
            if (!this.baseInformation.nature) {
              this.$message.warning('请填写户籍性质!')
              return resolve(false)
            }
            if (!this.idCardAddressArea.provinceId || !this.idCardAddressArea.cityId || !this.idCardAddressArea.areaId || !this.idCardForm.address) {
              this.$message.warning('请填写身份证地址!')
              return resolve(false)
            }
            if (!this.hujiArea.provinceId || !this.hujiArea.cityId || !this.hujiArea.areaId || !this.hujiForm.address) {
              this.$message.warning('请填写户籍地址详细地址!')
              return resolve(false)
            }
            if (!this.birthplaceArea.provinceId || !this.birthplaceArea.cityId || !this.birthplaceArea.areaId) {
              this.$message.warning('请填写出生地址!')
              return resolve(false)
            }
            if (!this.nativeArea.provinceId || !this.nativeArea.cityId || !this.nativeArea.areaId) {
              this.$message.warning('请填写籍贯地址!')
              return resolve(false)
            }
            if (!this.archivesAddressArea.provinceId || !this.archivesAddressArea.cityId || !this.archivesAddressArea.areaId || !this.archivesForm.address) {
              this.$message.warning('请填写档案存放地!')
              return resolve(false)
            }
            if (!this.nowArea.provinceId || !this.nowArea.cityId || !this.nowArea.areaId || !this.nowForm.address) {
              this.$message.warning('请填写现住址!')
              return resolve(false)
            }
            if (!this.contactAddressArea.provinceId || !this.contactAddressArea.cityId || !this.contactAddressArea.areaId || !this.contactForm.address) {
              this.$message.warning('请填写通讯地址!')
              return resolve(false)
            }
            return resolve(true)
          } else {
            this.$message.warning('请填写完整个人档案信息')
            return resolve(false)
          }
        })
      })
    },
    _getUserBaseInfo () {
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
          'payCardNo': this.baseInformation.payCardNo,
          'openBank': this.baseInformation.openBank,
          'healthStatus1': this.baseInformation.healthStatus1,
          'healthStatus2': this.baseInformation.healthStatus2,
          'healthStatus3': this.baseInformation.healthStatus3,
          'healthStatus4': this.baseInformation.healthStatus4,
          'healthStatus5': this.baseInformation.healthStatus5,
          'healthStatus6': this.baseInformation.healthStatus6,
          'healthStatus7': this.baseInformation.healthStatus7,
          'health1Txt': this.baseInformation.healthStatus1 ? this.baseInformation.health1Txt : '',
          'health2Txt': this.baseInformation.healthStatus2 ? this.baseInformation.health2Txt : '',
          'health3Txt': this.baseInformation.healthStatus3 ? this.baseInformation.health3Txt : '',
          'health4Txt': this.baseInformation.healthStatus4 ? this.baseInformation.health4Txt : '',
          'health5Txt': this.baseInformation.healthStatus5 ? this.baseInformation.health5Txt : '',
          'health6Txt': this.baseInformation.healthStatus6 ? this.baseInformation.health6Txt : '',
          'health7Txt': this.baseInformation.healthStatus7 ? this.baseInformation.health7Txt : '',
          'id': this.$route.params.employeeId === 'null' ? '' : this.$route.params.employeeId,
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
        'userEducations': eduData,
        actId: this.$route.params.actId !== 'null' ? this.$route.params.actId : ''
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
      return savePersonalParams
    },
    // 个人信息保存
    savePersonalInfo () {
      let mail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (this.baseInformation.mail) {
        if (!mail.test(this.baseInformation.mail)) {
          this.$message({
            type: 'warning',
            message: '请填写正确的电子邮箱!'
          })
          return
        }
      }
      this.checkPersonalInfo().then(res => {
        if (res) {
          savePersonnelMsg(this._getUserBaseInfo()).then(res => {
            this.$message.success('信息保存成功!')
            this.$store.commit('SET_SAVE2', true)
            // setTimeout(() => {
            //   this._getAcceptDetail()
            // }, 400)
          })
        }
      })
    }
  },
  filters: {
    filterInsuredInOld (str) {
      return getInsuredInOld(str)
    },
    filterRelieveStatus (str) {
      return getfilterRelieveStatus(str)
    },
    filternature (str) {
      return getfilternature(str)
    }
  },
  watch: {
    entryInformation: {
      handler (val, oldVal) {
        this.$store.commit('SET_SAVE1', false)
      },
      deep: true
    },
    typeAndSalaryForm: {
      handler (val, oldVal) {
        this.$store.commit('SET_SAVE1', false)
      }
    },
    familyInformation: {
      handler (val, oldVal) {
        this.$store.commit('SET_SAVE2', false)
      }
    },
    jobInformation: {
      handler (val, oldVal) {
        this.$store.commit('SET_SAVE2', false)
      }
    },
    resumeInformation: {
      handler (val, oldVal) {
        this.$store.commit('SET_SAVE2', false)
      }
    },
    baseInformation: {
      handler (val, oldVal) {
        this.$store.commit('SET_SAVE2', false)
      }
    }
  },
  created () {
    this._getAllArea()
    this._getAcceptDetail()
    this._getSysDic()
    this._getUserInfo()
    this._getPersonalMaterial()
    if (this.$route.params.come === '/personnel-information/base') {
      this.$store.commit('SET_SINGLE_TREE_CHECKED_NAME', '')
    }
    this.$store.commit('SET_ACTIVE_ROUTER', false)
  }
}
</script>
<style scoped lang="less">
  .delete-color {
    color:#FF7500;
  }
  .health{
    .health-text{
      width: 45%;
      margin-left: 5%;
    }
  }
  .mean-title{
    border-left: 4px solid #FF7500;
    padding-left: 10px;
    margin: 5px 0px 16px 16px;
    font-size: 14px;
    color: #48576a!important;
  }
  .dic-dl{
   dd{
     float: left;
     margin: 5px;
    &.active{
      position: relative;
     &::after{
       content: '';
       position:absolute;
       height: 2px;
       width:100%;
       background:red;
       bottom:0px;
       left:0px;
     }
    }
   }
  }
 .el-checkbox+.el-checkbox{
    margin-left:0px!important;
  }
  .el-checkbox{ width: 16%;}
.el-form-item.mustForm{
    position: relative;
}
.el-form-item.mustForm::before{
    content: '*';
    color:red;
    position: absolute;
    top: 7px;
    left: 24px;
}
.el-tag-check{
  margin: 5px;
  .el-checkbox__label{
    color:#fff;
  }
}
/* &/deep/.el-collapse-item__wrap{
  padding-bottom: 80px;
} */
</style>
