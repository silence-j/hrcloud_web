<template>
<div class="staff-box" style="height: 100%;overflow-y: auto;" >
  <p class="staff-title">
  <span></span><a>中财集团入职详情登记表</a><span></span>
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
                label="姓　　名："
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
                          v-if="baseInformation.birthday"
                          placeholder="请选择出生日期"
                          style="width:100%"
                          >
                        </el-date-picker>
                        <el-date-picker
                          v-model="baseInformation.birthday"
                          type="date"
                          v-else
                          placeholder="请选择出生日期"
                          style="width:100%"
                          >
                        </el-date-picker>
                      </el-form-item>
                    </div>
                  <div class="div-a_col two">
                  <el-form-item
                  label="民　　族："
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
            <div class="div-a_row clearfix">
              <div class="div-a_col">
                <el-form-item label="曾 用 名：" >
                  <el-input v-model="baseInformation.formerName" placeholder="请填写曾用名"></el-input>
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
                  v-if="baseInformation.graduationDate"
                    v-model="baseInformation.graduationDate"
                    type="month"
                    placeholder="请选择毕业时间">
                  </el-date-picker>
                   <el-date-picker
                    v-else
                    v-model="baseInformation.graduationDate"
                    type="month"
                    placeholder="请选择毕业时间">
                  </el-date-picker>
                </el-form-item>
              </div>
              <div class="div-a_col two">
                <el-form-item label="技 能 等 级：" >
                <el-input v-model="baseInformation.technicalGrade" placeholder="请填写技能等级"></el-input>
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
            <div class="div-a_row clearfix">
              <div class="div-a_col">
                <el-form-item label="毕业院校：" prop="schoolOfGraduation">
                  <el-input v-model="baseInformation.schoolOfGraduation" placeholder="请填写毕业院校"></el-input>
                </el-form-item>
              </div>
              <div class="div-a_col two">
                <el-form-item label="户籍性质：" prop="nature">
                  <el-select v-model="baseInformation.nature"
                  style="width:100%"
                   placeholder="请选择户籍性质">
                    <el-option label="城镇" :value="1"></el-option>
                    <el-option label="农村" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="div-a_row clearfix mt-20">
              <div class="div-a_col">
                <el-form-item label="身    高：" prop="height">
                  <el-input type="number" min="0" v-model="baseInformation.height" placeholder="请填写身高"><template slot="append">CM</template></el-input>
                </el-form-item>
              </div>
              <div class="div-a_col two">
                 <el-form-item label="体    重：">
                  <el-input type="number" min="0" v-model="baseInformation.weight" placeholder="请填写体重"><template slot="append">KG</template></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="div-a_row clearfix mt-20">
              <div class="div-a_col">
               <el-form-item label="学历获取形式：" >
                <el-select v-model="baseInformation.highestEducationWay" filterable placeholder="请选择学历获取形式" style="width:100%;">
                  <el-option
                    v-for="item in highestEducationWaySelect"
                    :label="item.codeText"
                    :value="item.id"
                    :key="item.id"
                    :disabled="item.disabled">
                  </el-option>
                </el-select>
               </el-form-item>
              </div>
              <!-- <div class="div-a_col two">
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
              </div> -->
            </div>
            <div class="div-a_row clearfix mt-20">
              <div class="div-a_col">
                <el-form-item label="技 术 职 称：">
                  <el-input v-model="baseInformation.technicalTitle" placeholder="请填写技术职称"></el-input>
                </el-form-item>
              </div>
              <div class="div-a_col two">
                <el-form-item label="职 业 资 格：" label-width="130px">
                  <el-input v-model="baseInformation.vocationalQualification" placeholder="请填写职业资格"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="div-a_row clearfix borderBox">
            <div class="div-a_col">
              <el-form-item label="工资卡号：">
                <el-input type="number" min="0" v-model="baseInformation.payCardNo" placeholder="请填写工资卡号"></el-input>
              </el-form-item>
            </div>
            <div class="div-a_col two">
                <el-form-item label="开户行：">
                <el-input v-model="baseInformation.openBank"  placeholder="请填写开户行"></el-input>
              </el-form-item>
            </div>
          </div>
              <div class="div-a_row clearfix mt-20">
              <div class="div-a_col w1050">
                 <el-form-item label="身份证地址：" required>
                 <address-select
                  :area="areaCollections.idCardAddressArea"
                  :colSpan="7"
                  :noLogin="'not'"
                  :lineSpan="1"
                  ref="idAddressRef"
                  :showZone="true">
                </address-select>
                </el-form-item>
              </div>
            </div>
            <div class="div-a_row clearfix mt-20">
              <div class="div-a_col w1050">
                 <el-form-item label="详细地址：" required>
                  <el-input placeholder="请填写详细地址" :number="true" v-model="baseInformation.idCardAddress"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="div-a_row clearfix mt-20">
              <div class="div-a_col w1050">
                 <el-form-item label="籍    贯：" required>
                 <address-select
                  :area='areaCollections.nativeAddressArea'
                  :colSpan="7"
                  :lineSpan="1"
                  :noLogin="'not'"
                  ref="nativeAddressRef"
                  :showZone="true">
               </address-select>
              </el-form-item>
              </div>
            </div>
            <div class="div-a_row clearfix mt-20">
              <div class="div-a_col w1050">
                 <el-form-item label="户籍地址：" required>
                 <address-select
                  :area="areaCollections.hujiAddressArea"
                  :colSpan="7"
                  :lineSpan="1"
                  :noLogin="'not'"
                  ref="hjAddressRef"
                  :showZone="true">
                 </address-select>
                </el-form-item>
              </div>
            </div>
            <div class="div-a_row clearfix mt-20">
              <div class="div-a_col w1050">
                 <el-form-item label="详细地址：" required>
                  <el-input placeholder="请填写详细地址" :number="true" v-model="baseInformation.hujiAddress"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="div-a_row clearfix mt-20">
              <div class="div-a_col w1050">
                <el-form-item label="档案存放：" required>
                  <address-select
                  :area="areaCollections.archivesAddressArea"
                  :colSpan="7"
                  :lineSpan="1"
                  :noLogin="'not'"
                  ref="archivesAddressRef"
                  :showZone="true">
                  </address-select>
                </el-form-item>
              </div>
            </div>
            <div class="div-a_row clearfix mt-20">
              <div class="div-a_col w1050">
                <el-form-item label="详细地址：" required>
                  <el-input placeholder="请填写详细地址" :number="true" v-model="baseInformation.archivesAddress"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="div-a_row clearfix">
                 <div class="div-a_col w1050">
                 <el-form-item label="现 住 址：" required>
                   <address-select
                    :area='areaCollections.nowAddressArea'
                    :colSpan="7"
                    :lineSpan="1"
                    :noLogin="'not'"
                    ref="nowAddressRef"
                    :showZone="true">
                </address-select>
                </el-form-item>
              </div>
            </div>
             <div class="div-a_row clearfix">
              <div class="div-a_col w1030">
                 <el-form-item label="详细地址：" required>
                   <el-input placeholder="请填写详细地址" :number="true" v-model="baseInformation.nowAddress"></el-input>
                </el-form-item>
              </div>
            </div>
              <div class="div-a_row clearfix">
                 <div class="div-a_col w1050">
                 <el-form-item label="通讯地址：" required>
                  <address-select
                    :area='areaCollections.contactAddressArea'
                    :colSpan="7"
                    :lineSpan="1"
                    :showZone="true"
                    :noLogin="'not'"
                    ref="contactAddressRef">
                  </address-select>
                </el-form-item>
              </div>
            </div>
             <div class="div-a_row clearfix">
              <div class="div-a_col w1030">
                 <el-form-item label="详 细 地 址：" required>
                    <el-input placeholder="请填写通讯详细地址" :number="true" v-model="baseInformation.contactAddress"></el-input>
                  </el-form-item>
              </div>
            </div>
            <div class="div-a_row clearfix borderBox">
                 <div class="div-a_col w1050">
                 <el-form-item label="出生地址：" required>
                    <address-select
                    :area='areaCollections.birthAddressArea'
                    :colSpan="7"
                    :lineSpan="1"
                    :noLogin="'not'"
                    ref="birthAddressRef"
                    :showZone="true">
                  </address-select>
                </el-form-item>
              </div>
            </div>
    </el-form>
  </div>
  <div class="content">
   <p class="mean-title">入职信息</p>
    <el-form
     :model="laborForm"
    label-width="150px"
    :rules="laborFormRules"
    ref="laborFormRef"
    >
    <div class="div-a_row clearfix">
      <div class="div-a_col">
        <el-form-item  prop="takejobDate" label="参加工作时间：">
          <el-date-picker
            v-model="laborForm.takejobDate"
            type="date"
            placeholder="参加工作时间">
          </el-date-picker>
        </el-form-item>
      </div>
      <!-- <div class="div-a_col two">
        <el-form-item prop="entryDate" label="本次入职时间：">
          <el-date-picker
            v-model="laborForm.entryDate"
            type="date"
            placeholder="本次入职时间">
          </el-date-picker>
        </el-form-item>
      </div>-->
    </div>
    <div class="div-a_row clearfix">
      <div class="div-a_col">
        <el-form-item prop="orgId" label="任 职 部 门：">
            <el-input v-model="laborForm.orgDatas.filterName" placeholder="请选择任职部门" disabled></el-input>
          </el-form-item>
      </div>
      <div class="div-a_col two">
        <el-form-item  prop="postName" label="岗 位：">
            <el-input v-model="laborForm.postName" disabled></el-input>
          </el-form-item>
      </div>
      <div class="div-a_row clearfix">
        <div class="div-a_col">
          <el-form-item
          label="原单位是否已缴纳社保："
          prop="insuredInOld"
          label-width="220px">
          <el-radio-group v-model="laborForm.insuredInOld">
            <el-radio :label="0" >未缴纳</el-radio>
            <el-radio :label="1" >缴纳</el-radio>
          </el-radio-group>
        </el-form-item>
        </div>
      </div>
      <div class="div-a_row clearfix" v-if="laborForm.insuredInOld == 1">
        <div class="div-a_col">
          <el-form-item  prop="insuredOldMonth" label="社保缴纳至：">
            <el-date-picker
            v-if="laborForm.insuredOldMonth"
              v-model="laborForm.insuredOldMonth"
              type="month"
              placeholder="选择日期">
            </el-date-picker>
          <el-date-picker
            v-else
              v-model="laborForm.insuredOldMonth"
              type="month"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="div-a_col two">
          <el-form-item prop="insuredOldArea"  label="社保缴纳地：">
            <el-input  style="width:100%" v-model.trim="laborForm.insuredOldArea" placeholder="请填写社保缴纳地"></el-input>
          </el-form-item>
        </div>
      </div>
        <div class="div-a_row clearfix">
        <div class="div-a_col">
          <el-form-item
          label="原单位是否已缴纳公积金："
          prop="fundedInOld"
          label-width="220px">
          <el-radio-group v-model="laborForm.fundedInOld">
            <el-radio :label="0" >未缴纳</el-radio>
            <el-radio :label="1" >缴纳</el-radio>
          </el-radio-group>
        </el-form-item>
        </div>
      </div>
      <div class="div-a_row clearfix" v-if="laborForm.fundedInOld == 1">
        <div class="div-a_col">
          <el-form-item  prop="fundedOldMonth" label="公积金缴纳至：">
            <el-date-picker
             v-if="laborForm.fundedOldMonth"
              v-model="laborForm.fundedOldMonth"
              type="month"
              placeholder="选择日期">
            </el-date-picker>
             <el-date-picker
             v-else
              v-model="laborForm.fundedOldMonth"
              type="month"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="div-a_col two">
          <el-form-item prop="fundedOldArea"  label="公积金缴纳地：">
            <el-input  style="width:100%" v-model.trim="laborForm.fundedOldArea" placeholder="请填写公积金缴纳地："></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="div-a_clearfix">
        <div class="div-a_col" style="width:100%">
          <el-form-item label="是否与原单位解除劳动合同:" label-width="220px" prop="cancelConctractWithOld">
            <el-radio-group v-model="laborForm.cancelConctractWithOld">
              <el-radio v-for="item in cancelConctractWithOldOption" :label="item.id" :key="item.id" :disabled="item.disabled">{{item.codeText}}</el-radio>
            </el-radio-group>
           <!--   <el-radio-group v-model="laborForm.cancelConctractWithOld">
             <el-radio :label="0">未解除</el-radio>
             <el-radio :label="1">已解除</el-radio>
            </el-radio-group> -->
          </el-form-item>
        </div>
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
          <div class="div-a_col" style="margin-left:70px" v-for="(item, index) in baseInformation.healthStatusList" :key="item.code">
           <el-form-item
            :label='item.codeText'
            :key="item.key"
            :prop="'healthStatusList.' + index + '.status'"
            :rules="{ required: true, validator:(rule, value, callback) => {
              if (value === 0 || value === 1 && item.text ) {
                callback()
              } else {
                callback('请填写正确的健康状况')
              }
             }, trigger: 'change' || 'blur'}"
           >
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
        :data="resumeForm"
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
            v-if="scope.row.startDate"
              v-model="scope.row.startDate"
               @focus="getResumeTime(scope.$index)"
            :picker-options="resumeStartOptions"
              type="month"
              placeholder="选择时间">
            </el-date-picker>
             <el-date-picker
            v-else
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
             v-if="scope.row.endDate"
            :picker-options="resumeEndOptions"
            @focus="getResumeTime(scope.$index)"
              v-model="scope.row.endDate"
              type="month"
              placeholder="选择时间">
            </el-date-picker>
            <el-date-picker
             v-else
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
          v-if="resumeForm.length>1"
          width="120px"
        >
          <template slot-scope="scope">
            <span @click="delListData(scope.row, scope.$index, resumeForm, '学历')" class="icon click-active del">删除</span>
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
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    <el-table
        :data="jobForm"
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
             v-if="scope.row.startDate"
              v-model="scope.row.startDate"
              type="month"
              @focus="getJobTime(scope.$index)"
            :picker-options="jobStartOptions"
              placeholder="选择时间">
            </el-date-picker>
            <el-date-picker
             v-else
              v-model="scope.row.startDate"
              type="month"
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
             v-if="scope.row.endDate"
              v-model="scope.row.endDate"
              type="month"
              @focus="getJobTime(scope.$index)"
            :picker-options="jobEndOptions"
              placeholder="选择时间"
              width="200">
            </el-date-picker>
             <el-date-picker
             v-else
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
          v-if="jobForm.length>1"
          width="120px"
        >
          <template slot-scope="scope">
            <span @click="delListData(scope.row, scope.$index, jobForm, '工作简历')" class="icon click-active del">删除</span>
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
        :data="familyForm"
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
          v-if="familyForm.length>1"
          width="120px"
        >
          <template slot-scope="scope">
            <span @click="delListData(scope.row, scope.$index, familyForm, '家庭成员')" class="icon click-active del">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-20 clearfix">
        <div class="r-float"><el-button type="primary" size="small" @click="familyMsg">新增</el-button></div>
      </div>
  </div>
     <div class="div-a_row" style="padding-bottom:50px;text-align:center">
       <el-button type="primary" size="small" @click="editAccept">提 交</el-button>
     </div>
     <div class="attch-tip">
     <el-tooltip class="item" effect="dark" placement="left-start">
       <div slot="content" class="message-div" style="overflow:auto;height:500px;">
         <div style="overflow:hidden"></div>
          <p style="font-size:24px;font-weight:bold;text-align:center">填表说明</p>
          <p>１、	表内所列项目，由本人实事求是地填写。如本人确实不能填写，可由经办人代笔，但须本人签字确认。</p>
          <p>２、	没有内容的项目写“无”。无法填写的写“不详”。书写时一律用黑色或蓝色钢笔或签字笔，字迹要端正、清楚。个别项目填写不下时，可加附页。</p>
          <p>３、	表内的年、月、日一律用公历和阿拉伯数字。</p>
          <p> ４、	“营销人员分类”中：Ⅰ、Ⅱ以公司发文中任命的职务为准，A－F以营销机构负责人签字确认的人员分类为准。</p>
          <p>５、	“籍贯”和“出生地”：按现行政区划分填写，要填写省、市或县的名称，如“浙江杭州”、“江苏盐城”等。</p>
          <p>６、	“政治面貌”：根据本人情况填写“党员”、“团员”、“群众”。</p>
          <p>７、	“最高学历”：分毕业、结业、肄业三种。凡在各类成人高等教育（电大、函大、夜大、职大、管理干部学院等）、各级党校函授或通过自学考试取得学历的，应具体写明，如“电大本（专）科毕业”、“××党校本（专）科函授毕（结、肄）业”、“自学高考大专毕业”等。各级党校培训、进修一年半以下的，不作为学历填写。不得填写“相当××学历”。</p>
          <p>８、	“健康状况”：请根据本人身体情况分别填写“健康”、“一般”、“较弱”，有严重疾病或伤残的要具体写明。</p>
          <p>９、	“家庭住址”栏：目前居住在自购房的员工请填写自购房地址；目前租房住或住在宿舍的员工请填写父母住址。地址应尽量详细，保证填表人能够收取物件。</p>
          <p>１０、	“通讯地址”：填表人收取物件的地址。
          <p>１１、	“进入本公司时间”：填表人在中财集团内部有工作调动的，填写进入中财集团工作的时间；在公司工作时间因离职间断的，填写最近一次进入公司工作的时间。</p>
          <p>１２、	 “是否已与原单位解除劳动关系”栏：已与原单位解除劳动关系的填“是”。</p>
          <p>１３、	“社会保险情况”和“住房公积金情况”：从未参加过社会保险或住房公积金的写“无”；曾经参加过但现已停保的，填写停保年月和参保地；目前仍在参保的，填写参保地，并注明是单位参保还是个人参保。</p>
          <p>１４、	“户籍地址”和“户籍性质”：填写户口簿或户籍证明上的详细地址，并注明户籍性质，如“农业家庭户”、“非农业集体户”等。</p>
          <p>１５、	“档案所在地”：填表人的正式人事档案所在地。</p>
          <p>１６、	“学习简历”：自高中开始填写，并注明学位情况，高中以下的填写最高学历。</p>
          <p>１７、	“工作简历”：请填写进入中财集团前的工作经历，此栏罗列不下的，请选择工作时间较长或工作时间较近的填写。</p>
          <p>１８、	“中财集团内岗位变动记录”：请填写在中财集团各处室、各辖属公司、各营销机构间调动的情况。</p>
          <p>１９、	“家庭主要成员及主要社会关系”：请填写父母、配偶、子女情况以及其他与本人关系较密切的亲属，主要包括兄弟姐妹等。</p>
          <p>２０、	需要提交的资料：</p>
          <p>□（1）身份证原件及复印件；</p>
          <p>□（2）学历证书原件及复印件；</p>
          <p>□（3）结婚证书原件及复印件；</p>
          <p>□（4）劳动关系证明原件，提交下列材料之一：</p>
          <p>①	劳动部门签发的失业证；</p>
          <p>②	上一家用工单位出具的解除劳动合同的证明；</p>
          <p>③	离职证明；</p>
          <p>④	参保证明。</p>
        </div>
      <el-button type="primary" size="small">填表说明</el-button>
    </el-tooltip>
     </div>
</div>
</template>
<script>
import { validatoRules } from 'assets/js/validator'
import AddressSelect from 'components/AddressSelect.vue'
import {
  checkLinkAcceptBaseDetail,
  checkAcceptJobDetailStaff,
  checkAcceptFamilyDetailStaff,
  checkAcceptResumeDetailStaff,
  saveLinkPersonelMsg,
  searchJoy } from 'static/api/recruit/accept/accept'
import { getToken } from 'assets/js/util'
import { areaJson } from 'utils/config'
import { getUserLinkDetail, saveLinkUserEntryInfo } from 'static/api/recruit/entry/entry'
import { getAllareaStaff, getSysDic } from 'static/api/common/common'
import { getEntryParams } from 'assets/js/mixins'
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
  name: 'EntryDetail',
  mixins: [getEntryParams],
  data () {
    var validatorHealth = (rule, value, callback) => {
      if (value === 0 || value === 1) {
        callback()
      } else {
        callback(new Error('请填写健康状况'))
      }
    }
    let validateEnteryDate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择本次入职时间'))
      } else if (value < this.laborForm.takejobDate) {
        callback(new Error('本次入职时间要大于等于参加工作的时间!'))
      } else {
        callback()
      }
    }
    return {
     laborForm: {
        takejobDate: '',
        entryDate: '',
        orgId: '',
        id: '',
        postName: '',
        insuredInOld: '',
        insuredOldMonth: '',
        insuredOldArea: '',
        fundedInOld: '',
        fundedOldMonth: '',
        fundedOldArea: '',
        cancelConctractWithOld: '',
        orgDatas: {
          filterName: '',
          orgId: '',
          dataTree: [],
          showTree: false,
          disabled: true
         // bindData: 'market'
        }
      },
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
        contactAddressId: '',
        inZcBefore:0
      },
      jobForm: [
        {
          startDate: '',
          endDate: '',
          workUnit: '',
          certifier: '',
          post: '',
          phone: ''
        }
      ],
      familyForm: [
        {
          name: '',
          relation: '',
          birthday: '',
          workUnit: '',
          post: '',
          telephone: ''
        }
      ],
      resumeForm: [
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
      tipShow: false,
      candidateTypeRadio: [],
      haveAcquaintanceRadio: [],
      cancelConctractWithOldOption:[],
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
        height: {required: true, message: '请填写身高', trigger: 'blur'},
        nature:{required:true, message:'请选择户籍性质', trigger:'change'}
      },
        laborFormRules: {
        takejobDate: {
          required: true, message: '请选择参加工作的时间', trigger: 'change', type: 'date'
        },
        entryDate: {validator: validateEnteryDate, required: true, trigger: 'change', type: 'date'},
        orgId: {required: true, message: '请选择任职部门', trigger: 'change'},
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
        }
      },
      areaCollections: {
        idCardAddressArea: this.deepClone(areaJson),
        hujiAddressArea: this.deepClone(areaJson),
        birthAddressArea: this.deepClone(areaJson),
        nativeAddressArea: this.deepClone(areaJson),
        archivesAddressArea: this.deepClone(areaJson),
        nowAddressArea: this.deepClone(areaJson),
        contactAddressArea: this.deepClone(areaJson)
      },
      // 学历获取形式
      highestEducationWaySelect: [],
      educationCertificateOption:[],
      idCardNumber:''
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
      getAllareaStaff(0).then(data => {
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
      /** 删除**/
    delListData (row, index, arr, msg) {
        this.$confirm('确定要删除这条' + msg + '吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.resumeSelectIndex = 0
        this.jobSelectIndex = 0
       // arr.splice(index, 1)
        if (row.id) {
          let delParams = {
            id: row.id,
            operator: getToken('loginId'),
            userId: this.$store.state.entryDetailId,
            copyToken:this.$route.query.copyToken
          }
          console.log('msg', msg)
          switch (msg) {
            case '学历' :
              delEduListStaff(delParams).then(data => {
                this._getReturnCode(this._getAcceptResumeDetail(this.$store.state.entryDetailId))
              })
              break
            case '工作简历' :
              delResumeListStaff(delParams).then(data => {
                this._getReturnCode(this._getAcceptJobDetail(this.$store.state.entryDetailId))
              })
              break
            case '家庭成员' :
              delFamilyListStaff(delParams).then(data => {
                this._getReturnCode(this._getAcceptFamilyDetail(this.$store.state.entryDetailId))
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
      this.resumeForm.push({
        startDate: '',
        endDate: '',
        school: '',
        pross: '',
        record: ''
      })
    },
    addWorkMsg () {
      this.jobForm.push({
        startDate: '',
        endDate: '',
        workUnit: '',
        certifier: '',
        post: '',
        phone: ''
      })
    },
    familyMsg () {
      this.familyForm.push({
        name: '',
        relation: '',
        birthday: '',
        workUnit: '',
        post: '',
        telephone: ''
      })
    },
      handleRulst (data) {
      if (data.result) {
              // console.log('详情显示', data.result)
        this.baseInformation = data.result
        this.baseInformation.inZcBefore = data.result.inZcBefore ? data.result.inZcBefore : 0
        this.$store.commit('SET_ENTRY_DETAIL_ID', data.result.userId)
        this.$store.commit('SET_ENTRY_IDCARDNUMBER', data.result.idCardNumber)
        this.$emit('changeSex', data.result.sex)
        this.idCardNumber = data.result.idCardNumber
        this.baseInformation.sex = data.result.sex
        if (data.result.birthday) this.baseInformation.birthday = new Date(data.result.birthday)
        if (data.result.graduationDate) this.baseInformation.graduationDate = new Date(data.result.graduationDate)
        // 通讯地址
        if (data.result.contactAddressMod) {
          this.baseInformation.contactAddressId = data.result.contactAddressMod.id
          this.areaCollections.contactAddressArea.id = data.result.contactAddressMod.id
          this.areaCollections.contactAddressArea.provinceId = data.result.contactAddressMod.provinceId
          this.areaCollections.contactAddressArea.provinceName = data.result.contactAddressMod.provinceName
          this.areaCollections.contactAddressArea.cityId = data.result.contactAddressMod.cityId
          if (this.areaCollections.contactAddressArea.provinceId) {
            this.areaCollections.contactAddressArea.optionCities = []
            getAllareaStaff(this.areaCollections.contactAddressArea.provinceId).then(data => {
              if (data.result && data.result.length) {
                data.result.forEach((area) => {
                  this.areaCollections.contactAddressArea.optionCities.push(area)
                })
              }
            })
          }
          if (this.areaCollections.contactAddressArea.cityId) {
            this.areaCollections.contactAddressArea.optionZones = []
            getAllareaStaff(this.areaCollections.contactAddressArea.cityId).then(data => {
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
          this.baseInformation.contactAddress = data.result.contactAddressMod.address
        }
        // 身份证地址
        if (data.result.idCardAddressMod) {
          this.baseInformation.idCardAddressId = data.result.idCardAddressMod.id
          this.areaCollections.idCardAddressArea.id = data.result.idCardAddressMod.id
          this.areaCollections.idCardAddressArea.provinceId = data.result.idCardAddressMod.provinceId
          this.areaCollections.idCardAddressArea.provinceName = data.result.idCardAddressMod.provinceName
          this.areaCollections.idCardAddressArea.cityId = data.result.idCardAddressMod.cityId
          if (this.areaCollections.idCardAddressArea.provinceId) {
            this.areaCollections.idCardAddressArea.optionCities = []
            getAllareaStaff(this.areaCollections.idCardAddressArea.provinceId).then(data => {
              if (data.result && data.result.length) {
                data.result.forEach((area) => {
                  this.areaCollections.idCardAddressArea.optionCities.push(area)
                })
              }
            })
          }
          if (this.areaCollections.idCardAddressArea.cityId) {
            this.areaCollections.idCardAddressArea.optionZones = []
            getAllareaStaff(this.areaCollections.idCardAddressArea.cityId).then(data => {
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
          this.baseInformation.idCardAddress = data.result.idCardAddressMod.address
        }
        // 现居住住址
        if (data.result.nowAddressMod) {
          this.baseInformation.nowAddressId = data.result.nowAddressMod.id
          this.areaCollections.nowAddressArea.id = data.result.nowAddressMod.id
          this.areaCollections.nowAddressArea.provinceId = data.result.nowAddressMod.provinceId
          this.areaCollections.nowAddressArea.provinceName = data.result.nowAddressMod.provinceName
          this.areaCollections.nowAddressArea.cityId = data.result.nowAddressMod.cityId
          if (this.areaCollections.nowAddressArea.provinceId) {
            this.areaCollections.nowAddressArea.optionCities = []
            getAllareaStaff(this.areaCollections.nowAddressArea.provinceId).then(data => {
              if (data.result && data.result.length) {
                data.result.forEach((area) => {
                  this.areaCollections.nowAddressArea.optionCities.push(area)
                })
              }
            })
          }
          if (this.areaCollections.nowAddressArea.cityId) {
            this.areaCollections.nowAddressArea.optionZones = []
            getAllareaStaff(this.areaCollections.nowAddressArea.cityId).then(data => {
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
          this.baseInformation.nowAddress = data.result.nowAddressMod.address
        }
        // 档案存放地
        if (data.result.archivesAddressMod) {
          this.baseInformation.archivesAddressId = data.result.archivesAddressMod.id
          this.areaCollections.archivesAddressArea.id = data.result.archivesAddressMod.id
          this.areaCollections.archivesAddressArea.provinceId = data.result.archivesAddressMod.provinceId
          this.areaCollections.archivesAddressArea.provinceName = data.result.archivesAddressMod.provinceName
          this.areaCollections.archivesAddressArea.cityId = data.result.archivesAddressMod.cityId
          if (this.areaCollections.archivesAddressArea.provinceId) {
            this.areaCollections.archivesAddressArea.optionCities = []
            getAllareaStaff(this.areaCollections.archivesAddressArea.provinceId).then(data => {
              if (data.result && data.result.length) {
                data.result.forEach((area) => {
                  this.areaCollections.archivesAddressArea.optionCities.push(area)
                })
              }
            })
          }
          if (this.areaCollections.archivesAddressArea.cityId) {
            this.areaCollections.archivesAddressArea.optionZones = []
            getAllareaStaff(this.areaCollections.archivesAddressArea.cityId).then(data => {
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
          this.baseInformation.archivesAddress = data.result.archivesAddressMod.address
        }
        // 籍贯地址
        if (data.result.nativePlaceMod) {
          this.baseInformation.nativeAddressId = data.result.nativePlaceMod.id
          this.areaCollections.nativeAddressArea.id = data.result.nativePlaceMod.id
          this.areaCollections.nativeAddressArea.provinceId = data.result.nativePlaceMod.provinceId
          this.areaCollections.nativeAddressArea.provinceName = data.result.nativePlaceMod.provinceName
          this.areaCollections.nativeAddressArea.cityId = data.result.nativePlaceMod.cityId
          if (this.areaCollections.nativeAddressArea.provinceId) {
            this.areaCollections.nativeAddressArea.optionCities = []
            getAllareaStaff(this.areaCollections.nativeAddressArea.provinceId).then(data => {
              if (data.result && data.result.length) {
                data.result.forEach((area) => {
                  this.areaCollections.nativeAddressArea.optionCities.push(area)
                })
              }
            })
          }
          if (this.areaCollections.nativeAddressArea.cityId) {
            this.areaCollections.nativeAddressArea.optionZones = []
            getAllareaStaff(this.areaCollections.nativeAddressArea.cityId).then(data => {
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
          this.baseInformation.nativeAddress = data.result.nativePlaceMod.address
        }
        // 出生地
        if (data.result.birthplaceMod) {
          this.baseInformation.birthAddressId = data.result.birthplaceMod.id
          this.areaCollections.birthAddressArea.id = data.result.birthplaceMod.id
          this.areaCollections.birthAddressArea.provinceId = data.result.birthplaceMod.provinceId
          this.areaCollections.birthAddressArea.provinceName = data.result.birthplaceMod.provinceName
          this.areaCollections.birthAddressArea.cityId = data.result.birthplaceMod.cityId
          if (this.areaCollections.birthAddressArea.provinceId) {
            this.areaCollections.birthAddressArea.optionCities = []
            getAllareaStaff(this.areaCollections.birthAddressArea.provinceId).then(data => {
              if (data.result && data.result.length) {
                data.result.forEach((area) => {
                  this.areaCollections.birthAddressArea.optionCities.push(area)
                })
              }
            })
          }
          if (this.areaCollections.birthAddressArea.cityId) {
            this.areaCollections.birthAddressArea.optionZones = []
            getAllareaStaff(this.areaCollections.birthAddressArea.cityId).then(data => {
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
          this.baseInformation.birthAddressArea = data.result.birthplaceMod.address
        }
        // 户籍地址
        if (data.result.hujiAddressMod) {
          this.baseInformation.hujiAddressId = data.result.hujiAddressMod.id
          this.areaCollections.hujiAddressArea.id = data.result.hujiAddressMod.id
          this.areaCollections.hujiAddressArea.provinceId = data.result.hujiAddressMod.provinceId
          this.areaCollections.hujiAddressArea.provinceName = data.result.hujiAddressMod.provinceName
          this.areaCollections.hujiAddressArea.cityId = data.result.hujiAddressMod.cityId
          if (this.areaCollections.hujiAddressArea.provinceId) {
            this.areaCollections.hujiAddressArea.optionCities = []
            getAllareaStaff(this.areaCollections.hujiAddressArea.provinceId).then(data => {
              if (data.result && data.result.length) {
                data.result.forEach((area) => {
                  this.areaCollections.hujiAddressArea.optionCities.push(area)
                })
              }
            })
          }
          if (this.areaCollections.hujiAddressArea.cityId) {
            this.areaCollections.hujiAddressArea.optionZones = []
            getAllareaStaff(this.areaCollections.hujiAddressArea.cityId).then(data => {
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
          this.baseInformation.hujiAddress = data.result.hujiAddressMod.address
        }
        let healthObj = data.result.healthStatusList
              // console.log('edit返回数据', healthObj)
        this.$store.commit('SET_HEALTH_ARR', JSON.stringify(healthObj))
      }
    },
    _getEntryDetail(){
        const copyToken = this.$route.query.copyToken
        checkLinkAcceptBaseDetail(copyToken).then(data => {
          this.handleRulst(data)
        })
    },
    _getAcceptJobDetail (id) {
      checkAcceptJobDetailStaff(id).then(data => {
        this.jobForm = data.result
      })
    },
    _getAcceptFamilyDetail (id) {
      checkAcceptFamilyDetailStaff(id).then(data => {
        this.familyForm = data.result
        this.familyForm.forEach(item => {
          if (item.relation === 0) {
            item.relation = ''
          }
        })
      })
    },
    _getAcceptResumeDetail (id) {
      checkAcceptResumeDetailStaff(id).then(data => {
         this.resumeForm = data.result
      })
    },
    _getAllAttchList(id){
      this._getAcceptJobDetail(id)
      this._getAcceptFamilyDetail(id)
      this._getAcceptResumeDetail(id)
    },
    editAccept () {
      this.$refs.baseInformation.validate((valid) => {
        if(valid){
          this.$refs.laborFormRef.validate(val1=>{
            if(val1){
              this.$refs.healthRef.validate(val2=>{
                  let filterHealth = this.baseInformation.healthStatusList.filter(x => x.status === undefined || (x.status === 1 && !x.text))
                  if (filterHealth.length) {
                    this.$message.warning('请填写完整健康信息')
                  }
                if(val2){
                    if (!this.areaCollections.nativeAddressArea.provinceId|| ! this.areaCollections.nativeAddressArea.cityId || ! this.areaCollections.nativeAddressArea.areaId) {
                        this.$message.warning('请填写籍贯地址')
                        return
                      } else if (!this.areaCollections.hujiAddressArea.provinceId || !this.areaCollections.hujiAddressArea.cityId || !this.areaCollections.hujiAddressArea.areaId || !this.baseInformation.hujiAddress) {
                        this.$message.warning('请填写户籍地址')
                        return
                      } else if(!this.areaCollections.idCardAddressArea.provinceId || !this.areaCollections.idCardAddressArea.cityId || !this.areaCollections.idCardAddressArea.areaId || !this.baseInformation.idCardAddress){
                         this.$message.warning('请填写身份证地址')
                        return
                      }else if (!this.areaCollections.nowAddressArea.provinceId || !this.areaCollections.nowAddressArea.cityId || !this.areaCollections.nowAddressArea.areaId || !this.baseInformation.nowAddress) {
                        this.$message.warning( '请填写现住址')
                        return
                      }else if (!this.areaCollections.contactAddressArea.provinceId || !this.areaCollections.contactAddressArea.cityId || !this.areaCollections.contactAddressArea.areaId || !this.baseInformation.contactAddress) {
                        this.$message.warning( '请填写通讯住址')
                        return
                      }else if (!this.areaCollections.birthAddressArea.provinceId || !this.areaCollections.birthAddressArea.cityId || !this.areaCollections.birthAddressArea.areaId) {
                        this.$message.warning( '请填写出生地')
                        return
                      }
                     const copyToken = this.$route.query.copyToken
                     const {familyMembers,jobResume,userBaseInfo,userEducations} = this.getUserPersonalInfo()
                    saveLinkPersonelMsg({
                      familyMembers,
                      jobResume,
                      userBaseInfo,
                      userEducations,
                      copyToken
                    }).then(res => {
                      saveLinkUserEntryInfo(Object.assign({}, this.getEntryInfo(),
                        {copyToken})).then(data => {
                          this.$message.success('提交成功')
                            this._getAllAttchList(this.$store.state.entryDetailId)
                            this.closeDialog = true
                        })
                    })
                }
              })
            }
          })
        }
      })
    },
      /* 获取数字字典 */
    async _getQueryClassList () {
         /* 是否与原单位解除劳动合同 */
      getSysDic('cancelConctractWithOld').then((data) => {
          // console.log('是否与原单位解除劳动合同', data.result)
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.cancelConctractWithOldOption.push(item)
            }
          })
        }
      }),
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
              this.highestEducationWaySelect.push(item)
            }
          })
        }
      }),
      /* 学历认证情况 */
      await getSysDic('educationCertificateStatus').then((data) => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1 || item.id === this.baseInformation.educationCertificateStatus) {
              item.disabled = false
              if (item.enable === 2) {
                item.disabled = true
              }
              this.educationCertificateOption.push(item)
            }
          })
        }
      }),
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
    },
      handleDetailResult (data) {
      if (data.result) {
        this.laborForm.cancelConctractWithOld = data.result.cancelConctractWithOld
        this.laborForm.fundedOldArea = data.result.fundedOldArea
        this.laborForm.fundedInOld = data.result.fundedInOld
        this.laborForm.insuredOldArea = data.result.insuredOldArea
        this.laborForm.insuredInOld = data.result.insuredInOld
        this.laborForm.idCardNumber = data.result.idCardNumber
        this.laborForm.orgId = data.result.orgId
        this.laborForm.id = data.result.id
        this.laborForm.orgDatas.orgId = data.result.orgId
        this.$store.commit('SET_INFO_BY_ORG_ID', data.result.orgId)
        this.laborForm.orgDatas.filterName = data.result.orgName
        this.laborForm.postName = data.result.postName
        if (data.result.fundedOldMonth) this.laborForm.fundedOldMonth = new Date(data.result.fundedOldMonth)
        if (data.result.insuredOldMonth) this.laborForm.insuredOldMonth = new Date(data.result.insuredOldMonth)
        if (data.result.entryDate) this.laborForm.entryDate = new Date(data.result.entryDate)
        if (data.result.takejobDate) this.laborForm.takejobDate = new Date(data.result.takejobDate)
      }
    }
  },
  watch:{
    '$store.state.entryDetailId'(value){
      if(value){
      const copyToken = this.$route.query.copyToken
      getUserLinkDetail({
      copyToken,
       userId: this.$store.state.entryDetailId
      }).then(data=>{
        this.handleDetailResult(data)
      })
      this._getAllAttchList(value)
    }
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
          if (this.resumeForm[selecIndex] && this.resumeForm[selecIndex].endDate) {
            return new Date(time).getTime() < new Date(this.resumeForm[selecIndex].endDate).getTime()
          }
        }
      }
    },
    resumeEndOptions () {
      return {
        disabledDate: (time) => {
          return new Date(time).getTime() < new Date(this.resumeForm[this.resumeSelectIndex].startDate).getTime()
        }
      }
    },
    jobStartOptions () {
      let selecIndex = this.jobSelectIndex - 1 < 0 ? 0 : this.jobSelectIndex - 1
      return {
        disabledDate: (time) => {
          if (this.jobForm[selecIndex] && this.jobForm[selecIndex].endDate) {
            return new Date(time).getTime() < new Date(this.jobForm[selecIndex].endDate).getTime()
          }
        }
      }
    },
    jobEndOptions () {
      return {
        disabledDate: (time) => {
          return new Date(time).getTime() < new Date(this.jobForm[this.jobSelectIndex].startDate).getTime()
        }
      }
    },
   personData () {
      let allDatas = {
        areaCollections: this.areaCollections,
        personBaseForm: Object.assign({}, this.baseInformation),
        healthForm: this.baseInformation.healthStatusList,
        resumeForm: this.resumeForm,
        jobForm: this.jobForm,
        familyForm: this.familyForm
      }
      return allDatas
    },
    laborData(){
      return {laborForm:this.laborForm}
    }
  },
  created () {
    this._getAllArea()
    this._getEntryDetail()
    this._getQueryClassList()
  }
}
</script>
<style lang="less">
@import '~assets/less/staff.less';
.attch-tip{
  position: fixed;
  top:50%;
  transform: translateY(-250px);
  right:20px;
}
 .message-div{
    p{
      line-height:36px;
    }
  }
</style>
