<template>
    <div>
        <el-button type="primary" size="small" @click="goBack">返 回</el-button>
        <el-button type="primary" size="small" @click="insuredSave" v-if="this.$route.params.type==='handle' || this.$route.params.type==='change'">提 交</el-button>
        <el-button type="primary" size="small" @click="recordsBtn">缴费记录</el-button>

        <!--办理状态 -->
        <div v-if="this.$route.params.type==='handle' || this.$route.params.type==='change'">
            <div class="check-main m-b-30">
                <p class="tit mt-20">&nbsp;&nbsp;当前参保</p>
                <el-form label-width="100px">
                    <el-row align="center">
                        <el-col :span="4">
                            <el-form-item label="姓  名:">
                                <span>{{DetailDatas.name}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="身份证号码:">
                                <span>{{DetailDatas.idCardNumber}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="手机号:">
                                <span>{{DetailDatas.telephone}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="户籍性质:" class="mustForm">
                                <span>{{DetailDatas.nature}}</span>
                                <el-radio-group v-model="DetailDatas.insurNature" style="margin-left:20px;" @change="insurNatureChange">
                                    <el-radio :label="1">本地</el-radio>
                                    <el-radio :label="2">外地</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row align="center">
                        <el-col :span="24">
                            <el-form-item label="工资标准:">
                                <span>{{DetailDatas.standard}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row align="center">
                        <el-col :span="6">
                            <el-form-item label="参保公司:" class="mustForm">
                                <el-input v-model="DetailDatas.orgName" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="参保机构:" class="mustForm">
                                <el-select
                                    v-model="DetailDatas.areaName"
                                    placeholder="请选择参保机构"
                                    @change="areaNameChange"
                                    @visible-change="visAreaNameChange">
                                    <el-option
                                        v-for="item in areaNameOptions"
                                        :key="item.value"
                                        :label="item.areaName"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" v-if="this.$route.params.type==='change'">
                            <el-form-item label="首交月份:" class="mustForm">
                                <el-date-picker
                                    disabled
                                    v-model="DetailDatas.startMonth"
                                    type="month"
                                    placeholder="选择首交月份">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" v-else>
                            <el-form-item label="首交月份:" class="mustForm">
                                <el-date-picker
                                    v-model="DetailDatas.startMonth"
                                    type="month"
                                    placeholder="选择首交月份">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="m-b-30">
                <el-row class="check-table" style="border-bottom:none">
                    <el-col :span="3">险种</el-col>
                    <el-col :span="4">办理时间</el-col>
                    <el-col :span="3">生效月份</el-col>
                    <el-col :span="3">结算月份</el-col>
                    <el-col :span="3">基数（元）</el-col>
                    <el-col :span="4">比例/固定金额</el-col>
                    <el-col :span="4" class="border-right">缴纳金额（元）</el-col>
                </el-row>
                <el-row class="check-table" style="border-bottom:none">
                    <el-col :span="3">养老保险</el-col>
                    <el-col :span="4">
                        <template>
                            <el-date-picker
                                class="dateInfo"
                                v-model="DetailDatas.pensionHandleTime"
                                type="date"
                                placeholder="选择办理时间">
                            </el-date-picker>
                        </template>
                    </el-col>
                    <el-col :span="3">
                        <template>
                            <el-date-picker
                                class="dateInfo"
                                v-model="DetailDatas.pensionHandleMonth"
                                type="month"
                                placeholder="选择生效月份">
                            </el-date-picker>
                        </template>
                    </el-col>
                    <el-col :span="3">
                        <template>
                            <el-date-picker
                                class="dateInfo"
                                v-model="DetailDatas.pensionSettlementMonth"
                                type="month"
                                placeholder="选择结算月份">
                            </el-date-picker>
                        </template>
                    </el-col>
                    <el-col :span="3">
                        <template>
                            <el-input class="money-input" v-model="DetailDatas.pensionBasicNum" placeholder="输入缴纳基数"></el-input>
                        </template>
                    </el-col>
                    <el-col :span="4">
                        <template v-if="this.$route.params.type==='handle'">
                            {{DetailDatas.personalPensionPercentView ? DetailDatas.personalPensionPercentView : 0}} %
                        </template>
                        <template v-if="this.$route.params.type==='change'">
                            {{(DetailDatas.personalPensionPercent *100).toFixed(0)}} %
                        </template>
                    </el-col>
                    <el-col :span="4" class="border-right">
                        <template>
                            <el-input class="money-input" v-model="pensionAmountAccount" placeholder="输入缴纳金额" disabled></el-input>
                        </template>
                    </el-col>
                </el-row>
                <el-row class="check-table" style="border-bottom:none">
                    <el-col :span="3">医疗保险</el-col>
                    <el-col :span="4">
                        <template>
                            <el-date-picker
                                class="dateInfo"
                                v-model="DetailDatas.medicalHandleTime"
                                type="date"
                                placeholder="选择办理时间">
                            </el-date-picker>
                        </template>
                    </el-col>
                    <el-col :span="3">
                        <template>
                            <el-date-picker
                                class="dateInfo"
                                v-model="DetailDatas.medicalHandleMonth"
                                type="month"
                                placeholder="选择生效月份">
                            </el-date-picker>
                        </template>
                    </el-col>
                    <el-col :span="3">
                        <template>
                            <el-date-picker
                                class="dateInfo"
                                v-model="DetailDatas.medicalSettlementMonth"
                                type="month"
                                placeholder="选择结算月份">
                            </el-date-picker>
                        </template>
                    </el-col>
                    <el-col :span="3">
                        <template>
                            <el-input class="money-input" v-model="DetailDatas.medicalBasicNum" placeholder="输入缴纳基数"></el-input>
                        </template>
                    </el-col>
                    <el-col :span="4">
                        <template v-if="this.$route.params.type==='handle'">
                         {{DetailDatas.personalMedicalPercentView ? DetailDatas.personalMedicalPercentView : 0}} %
                         + {{DetailDatas.personalMedicalFixedMoneyView ? DetailDatas.personalMedicalFixedMoneyView : 0}} 元
                        </template>
                        <template v-if="this.$route.params.type==='change'">
                            {{(DetailDatas.personalMedicalPercent*100).toFixed(0)}} % + {{DetailDatas.personalMedicalFixedMoney}} 元
                        </template>
                    </el-col>
                    <el-col :span="4" class="border-right">
                        <template>
                           <el-input class="money-input" v-model="medicalAmountAccount" placeholder="输入缴纳金额" disabled></el-input>
                        </template>
                    </el-col>
                </el-row>
                <el-row class="check-table">
                    <el-col :span="3">失业保险</el-col>
                    <el-col :span="4">
                        <template>
                            <el-date-picker
                                class="dateInfo"
                                v-model="DetailDatas.unemploymentHandleTime"
                                type="date"
                                placeholder="选择办理时间">
                            </el-date-picker>
                        </template>
                    </el-col>
                    <el-col :span="3">
                        <template>
                            <el-date-picker
                                class="dateInfo"
                                v-model="DetailDatas.unemploymentHandleMonth"
                                type="month"
                                placeholder="选择生效月份">
                            </el-date-picker>
                        </template>
                    </el-col>
                    <el-col :span="3">
                        <template>
                            <el-date-picker
                                class="dateInfo"
                                v-model="DetailDatas.unemploymentSettlementMonth"
                                type="month"
                                placeholder="选择结算月份">
                            </el-date-picker>
                        </template>
                    </el-col>
                    <el-col :span="3">
                        <template>
                            <el-input class="money-input" v-model="DetailDatas.unemploymentBasicNum" placeholder="输入缴纳基数"></el-input>
                        </template>
                    </el-col>
                    <el-col :span="4">
                        <template v-if="this.$route.params.type==='handle'">
                            <span>{{DetailDatas.personalUnemploymentPercentView ? DetailDatas.personalUnemploymentPercentView : 0}}%</span>
                        </template>
                        <template v-if="this.$route.params.type==='change'">
                            {{(DetailDatas.personalUnemploymentPercent*100).toFixed(0)}} %
                        </template>
                    </el-col>
                    <el-col :span="4" class="border-right">
                        <template>
                            <el-input class="money-input" v-model="unemploymentAmountAccount" placeholder="输入缴纳金额" disabled></el-input>
                        </template>
                    </el-col>
                </el-row>
            </div>
        </div>

        <!--查看状态 -->
        <div v-if="this.$route.params.type==='check'">
            <div class="check-main m-b-30">
                <p class="tit mb-20">&nbsp;&nbsp;当前参保</p>
                <el-form label-width="100px">
                    <el-row align="center">
                        <el-col :span="4">
                            <el-form-item label="姓  名:">
                                <span>{{DetailDatas.name}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="身份证号码:">
                                <span>{{DetailDatas.idCardNumber}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="手机号:">
                                <span>{{DetailDatas.telephone}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="户籍性质:">
                                <span>{{userNatureType}}  {{DetailDatas.nature}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row align="center">
                        <el-col :span="24">
                            <el-form-item label="工资标准:">
                                <span>{{DetailDatas.standard}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row align="center">
                        <el-col :span="6">
                            <el-form-item label="参保公司:"><span>{{DetailDatas.orgName}}</span></el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="参保机构:"><span>{{DetailDatas.areaName}}</span></el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="首交月份:"><span>{{DetailDatas.startMonth}}</span></el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="m-b-30">
                <el-row class="check-table" style="border-bottom:none">
                    <el-col :span="3">险种</el-col>
                    <el-col :span="4">办理时间</el-col>
                    <el-col :span="3">生效月份</el-col>
                    <el-col :span="3">结算月份</el-col>
                    <el-col :span="3">基数（元）</el-col>
                    <el-col :span="4">比例/固定金额(%)</el-col>
                    <el-col :span="4" class="border-right">缴纳金额（元）</el-col>
                </el-row>
                <el-row class="check-table" style="border-bottom:none">
                    <el-col :span="3">养老保险</el-col>
                    <el-col :span="4"><span>{{DetailDatas.pensionHandleTime}}</span></el-col>
                    <el-col :span="3"><span>{{DetailDatas.pensionHandleMonth}}</span></el-col>
                    <el-col :span="3"><span>{{DetailDatas.pensionSettlementMonth}}</span></el-col>
                    <el-col :span="3"><span>{{DetailDatas.pensionBasicNum}}</span></el-col>
                    <el-col :span="4"><span>{{(DetailDatas.personalPensionPercent * 100).toFixed(0)}}%</span></el-col>
                    <el-col :span="4" class="border-right"><span>{{DetailDatas.pensionAmount}}</span></el-col>
                </el-row>
                <el-row class="check-table" style="border-bottom:none">
                    <el-col :span="3">医疗保险</el-col>
                    <el-col :span="4"><span>{{DetailDatas.medicalHandleTime}}</span></el-col>
                    <el-col :span="3"><span>{{DetailDatas.medicalHandleMonth}}</span></el-col>
                    <el-col :span="3"><span>{{DetailDatas.medicalSettlementMonth}}</span></el-col>
                    <el-col :span="3"><span>{{DetailDatas.medicalBasicNum}}</span></el-col>
                    <el-col :span="4"><span>{{(DetailDatas.personalMedicalPercent * 100).toFixed(0)}}% + {{DetailDatas.personalMedicalFixedMoney}}元</span></el-col>
                    <el-col :span="4" class="border-right"><span>{{DetailDatas.medicalAmount}}</span></el-col>
                </el-row>
                <el-row class="check-table">
                    <el-col :span="3">失业保险</el-col>
                    <el-col :span="4"><span>{{DetailDatas.unemploymentHandleTime}}</span></el-col>
                    <el-col :span="3"><span>{{DetailDatas.unemploymentHandleMonth}}</span></el-col>
                    <el-col :span="3"><span>{{DetailDatas.unemploymentSettlementMonth}}</span></el-col>
                    <el-col :span="3"><span>{{DetailDatas.unemploymentBasicNum}}</span></el-col>
                    <el-col :span="4"><span>{{(DetailDatas.personalUnemploymentPercent * 100).toFixed(0)}}%</span></el-col>
                    <el-col :span="4" class="border-right"><span>{{DetailDatas.unemploymentAmount}}</span></el-col>
                </el-row>
            </div>
        </div>

        <!--当前停保-->
        <div class="check-main stop-main" v-if="this.$route.params.type==='stopcheck'">
            <p class="tit">&nbsp;&nbsp;当前停保</p>
            <div style="margin-left:20px;" class="stop-remark">
                <p style="color:red;">已停保</p>
                <p>停保原因：{{DetailDatas.endReasonType}}</p>
                <p>停保月份：{{DetailDatas.endMonth}}</p>
                <p>备注：{{DetailDatas.endReason}}</p>
            </div>
        </div>
        <br/>

        <!-- 变更记录 -->
        <div v-show="historyList.length>0">
            <p class="tit">&nbsp;&nbsp;变更记录</p>
            <br/>
            <el-row class="check-table" style="border-bottom:none">
                <el-col :span="2">变更日期</el-col>
                <el-col :span="2">险种</el-col>
                <el-col :span="2">办理时间</el-col>
                <el-col :span="2">生效月份</el-col>
                <el-col :span="2">结算月份</el-col>
                <el-col :span="2">基数（元）</el-col>
                <el-col :span="2">比例/固定金额</el-col>
                <el-col :span="2">缴纳金额（元）</el-col>
                <el-col :span="4">参保公司</el-col>
                <el-col :span="3">参保机构</el-col>
                <el-col :span="1" class="border-right">户籍性质</el-col>
            </el-row>
            <div v-for="(item,index) in historyList" :key="index">
                <el-row class="check-table" style="border-bottom:none">
                    <el-col :span="2">{{item.createTime}}</el-col>
                    <el-col :span="2">养老保险</el-col>
                    <el-col :span="2">{{item.pensionHandleTime}}</el-col>
                    <el-col :span="2">{{item.pensionHandleMonth}}</el-col>
                    <el-col :span="2">{{item.pensionSettlementMonth}}</el-col>
                    <el-col :span="2">{{item.pensionBasicNum}}</el-col>
                    <el-col :span="2">{{(item.pensionPercent*100).toFixed(2)}}%</el-col>
                    <el-col :span="2">{{item.pensionAmount}}</el-col>
                    <el-col :span="4">{{item.orgName}}</el-col>
                    <el-col :span="3">{{item.areaName}}</el-col>
                    <el-col :span="1" class="border-right">{{item.nature}}</el-col>
                </el-row>
                <el-row class="check-table" style="border-bottom:none">
                    <el-col :span="2">{{item.createTime}}</el-col>
                    <el-col :span="2">医疗保险</el-col>
                    <el-col :span="2">{{item.medicalHandleTime}}</el-col>
                    <el-col :span="2">{{item.medicalHandleMonth}}</el-col>
                    <el-col :span="2">{{item.medicalSettlementMonth}}</el-col>
                    <el-col :span="2">{{item.medicalBasicNum}}</el-col>
                    <el-col :span="2">{{(item.medicalPercent*100).toFixed(2)}}% + {{item.medicalFixedMoney}}元</el-col>
                    <el-col :span="2">{{item.medicalAmount}}</el-col>
                    <el-col :span="4">{{item.orgName}}</el-col>
                    <el-col :span="3">{{item.areaName}}</el-col>
                    <el-col :span="1" class="border-right">{{item.nature}}</el-col>
                </el-row>
                <el-row class="check-table">
                    <el-col :span="2">{{item.createTime}}</el-col>
                    <el-col :span="2">失业保险</el-col>
                    <el-col :span="2">{{item.unemploymentHandleTime}}</el-col>
                    <el-col :span="2">{{item.unemploymentHandleMonth}}</el-col>
                    <el-col :span="2">{{item.unemploymentSettlementMonth}}</el-col>
                    <el-col :span="2">{{item.unemploymentBasicNum}}</el-col>
                    <el-col :span="2">{{(item.unemploymentPercent *100).toFixed(2)}}%</el-col>
                    <el-col :span="2">{{item.unemploymentAmount}}</el-col>
                    <el-col :span="4">{{item.orgName}}</el-col>
                    <el-col :span="3">{{item.areaName}}</el-col>
                    <el-col :span="1" class="border-right">{{item.nature}}</el-col>
                </el-row>
                <br/>
            </div>
        </div>

    </div>
</template>

<script>
import { getSocialDetail, getSocialSave, getSelectPercentList } from 'static/api/socialSecurity'
import { timeZeroToString, timeToString } from 'assets/js/common'
import { debounce } from 'lodash'
export default {
  data () {
    return {
      areaNameOptions: [],
      DetailDatas: {
        endReasonType: '',
        endMonth: '',
        endReason: '',
        nature: '',
        userNature: '',
        startMonth: '',
        orgName: '',
        insurancePercentId: '',
        pensionHandleTime: '',
        pensionHandleMonth: '',
        pensionSettlementMonth: '',
        pensionBasicNum: '',
        pensionAmount: '',
        medicalHandleMonth: '',
        medicalHandleTime: '',
        medicalSettlementMonth: '',
        medicalBasicNum: '',
        medicalAmount: '',
        unemploymentHandleMonth: '',
        unemploymentHandleTime: '',
        unemploymentSettlementMonth: '',
        unemploymentBasicNum: '',
        unemploymentAmount: '',
        insurNature: '',
        personalPensionPercent: '',
        personalMedicalPercent: '',
        personalMedicalFixedMoney: '',
        personalUnemploymentPercent: '',
        areaName: '',
        percentId: ''
      },
      userNatureType: '',
      SocialId: '',
      historyList: [],
      orgId: '',
      areaNameDatas: '',
      insurNatureId: '',
      fundPercentId: '',
      areaNameVal: ''
    }
  },
  computed: {
    pensionAmountAccount () {
      return (this.DetailDatas.pensionBasicNum * this.DetailDatas.personalPensionPercent).toFixed(2)
    },
    medicalAmountAccount () {
      return ((this.DetailDatas.medicalBasicNum * this.DetailDatas.personalMedicalPercent) + parseInt(this.DetailDatas.personalMedicalFixedMoney)).toFixed(2)
    },
    unemploymentAmountAccount () {
      return (this.DetailDatas.unemploymentBasicNum * this.DetailDatas.personalUnemploymentPercent).toFixed(2)
    }
  },
  methods: {
    /* 查看详情 */
    _getSocialDetail () {
      let param = {
        userId: this.$route.params.Id
      }
      getSocialDetail(param).then(data => {
        this.DetailDatas = data.result
        if (this.DetailDatas.insurNature === 1) {
          this.userNatureType = '本地'
        } else {
          this.userNatureType = '外地'
        }
        /* 已停保 */
        this.DetailDatas.endReasonType = this.DetailDatas.endReasonType
        this.DetailDatas.endMonth = this.DetailDatas.endMonth
        this.DetailDatas.endReason = this.DetailDatas.endReason
        /* 其它 */
        this.orgId = this.DetailDatas.orgId
        this.userNature = this.DetailDatas.userNature
        this.DetailDatas.insurNature = this.DetailDatas.insurNature
        this.DetailDatas.personalMedicalPercentView = (this.DetailDatas.personalPensionPercent * 100).toFixed(2)
        this.DetailDatas.personalPensionPercent = this.DetailDatas.personalPensionPercent
        this.DetailDatas.personalMedicalPercent = this.DetailDatas.personalMedicalPercent
        this.DetailDatas.personalMedicalFixedMoney = this.DetailDatas.personalMedicalFixedMoney
        this.DetailDatas.personalUnemploymentPercent = this.DetailDatas.personalUnemploymentPercent
        /* 变更记录 */
        if (data.result.historyList.length > 0) {
          this.historyList = data.result.historyList
        }
      })
    },
    /* 根据参保公司,参保机构,户籍性质,查询比例 */
    insurNatureChange (val) {
      this.DetailDatas.areaName = ''
      this.DetailDatas.personalUnemploymentPercentView = 0
      this.DetailDatas.personalMedicalPercentView = 0
      this.DetailDatas.personalMedicalFixedMoneyView = 0
      this.DetailDatas.personalPensionPercentView = 0
      this.insurNatureId = val
      this._getSelectPercentList()
    },
    /* 默认获取下拉内容 */
    visAreaNameChange (val) {
      if (this.$route.params.type === 'change') {
        this._getSelectPercentList()
        this.areaNameChange()
      }
      if (val) {
        if (this.$route.params.type === 'handle' && !this.areaNameOptions.length && !this.DetailDatas.insurNature) {
          this.$message.warning('请选择户籍性质!')
        }
      }
    },
    areaNameChange (val) {
      if (val) {
        this.areaNameOptions.forEach(item => {
          if (val === item.id) {
            this.DetailDatas.personalPensionPercentView = ((item.personalPensionPercent) * 100).toFixed(2)
            this.DetailDatas.personalMedicalPercentView = ((item.personalMedicalPercent) * 100).toFixed(2)
            this.DetailDatas.personalMedicalFixedMoneyView = item.personalMedicalFixedMoney
            this.DetailDatas.personalUnemploymentPercentView = ((item.personalUnemploymentPercent) * 100).toFixed(2)
            this.fundPercentId = item.id
            this.DetailDatas.personalPensionPercent = item.personalPensionPercent
            this.DetailDatas.personalMedicalPercent = item.personalMedicalPercent
            this.DetailDatas.personalMedicalFixedMoney = item.personalMedicalFixedMoney
            this.DetailDatas.personalUnemploymentPercent = item.personalUnemploymentPercent
            this.areaNameVal = item.areaName
          }
        })
      }
    },
    _getSelectPercentList () {
      let param = {
        orgId: this.orgId,
        insurNature: this.insurNatureId ? this.insurNatureId : this.DetailDatas.insurNature,
        userNature: this.userNature
      }
      getSelectPercentList(param).then(data => {
        this.areaNameOptions = data.result
      })
    },
    /* 参保保存 */
    insinsuredSave: debounce(function () {
      let param = {
        areaName: this.areaNameVal ? this.areaNameVal : this.DetailDatas.areaName,
        userId: this.$route.params.Id,
        status: 2,
        insurancePercentId: this.fundPercentId ? this.fundPercentId : this.DetailDatas.percentId,
        pensionHandleMonth: timeZeroToString(this.DetailDatas.pensionHandleMonth),
        pensionHandleTime: timeToString(this.DetailDatas.pensionHandleTime),
        pensionSettlementMonth: timeZeroToString(this.DetailDatas.pensionSettlementMonth),
        pensionBasicNum: this.DetailDatas.pensionBasicNum,
        pensionAmount: this.pensionAmountAccount,
        medicalHandleMonth: timeZeroToString(this.DetailDatas.medicalHandleMonth),
        medicalHandleTime: timeToString(this.DetailDatas.medicalHandleTime),
        medicalSettlementMonth: timeZeroToString(this.DetailDatas.medicalSettlementMonth),
        medicalBasicNum: this.DetailDatas.medicalBasicNum,
        medicalAmount: this.medicalAmountAccount,
        unemploymentHandleMonth: timeZeroToString(this.DetailDatas.unemploymentHandleMonth),
        unemploymentHandleTime: timeToString(this.DetailDatas.unemploymentHandleTime),
        unemploymentSettlementMonth: timeZeroToString(this.DetailDatas.unemploymentSettlementMonth),
        unemploymentBasicNum: this.DetailDatas.unemploymentBasicNum,
        unemploymentAmount: this.unemploymentAmountAccount,
        startMonth: timeZeroToString(this.DetailDatas.startMonth),
        insurNature: this.DetailDatas.insurNature,
        userNature: this.DetailDatas.userNature,
        orgId: this.DetailDatas.orgId,
        orgName: this.DetailDatas.orgName
      }
      let pensionMonth = timeZeroToString(this.DetailDatas.pensionSettlementMonth)
      let medicalMonth = timeZeroToString(this.DetailDatas.medicalSettlementMonth)
      let unemploymentMonth = timeZeroToString(this.DetailDatas.unemploymentSettlementMonth)
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      month = (month < 10 ? '0' + month : month)
      let mydate = (year.toString() + '-' + month.toString())
      if (!this.DetailDatas.insurNature) {
        this.$message.warning('请选择户籍性质!')
        return false
      } else if (!this.DetailDatas.areaName) {
        this.$message.warning('请填写参保机构!')
        return false
      } else if (!this.DetailDatas.startMonth) {
        this.$message.warning('请填写首交月份!')
        return false
      } else if (!this.DetailDatas.pensionHandleTime) {
        this.$message.warning('请填写养老保险办理时间!')
        return false
      } else if (!this.DetailDatas.pensionHandleMonth) {
        this.$message.warning('请填写养老保险生效月份!')
        return false
      } else if (!this.DetailDatas.pensionSettlementMonth) {
        this.$message.warning('请填写养老保险结算月份!')
        return false
      } else if (!this.DetailDatas.pensionBasicNum) {
        this.$message.warning('请填写养老保险基数（元）!')
        return false
      } else if (!this.DetailDatas.medicalHandleTime) {
        this.$message.warning('请填写医疗保险办理时间!')
        return false
      } else if (!this.DetailDatas.medicalHandleMonth) {
        this.$message.warning('请填写医疗保险生效月份!')
        return false
      } else if (!this.DetailDatas.medicalSettlementMonth) {
        this.$message.warning('请填写医疗保险结算月份!')
        return false
      } else if (!this.DetailDatas.medicalBasicNum) {
        this.$message.warning('请填写医疗保险基数（元）!')
        return false
      } else if (!this.DetailDatas.unemploymentHandleTime) {
        this.$message.warning('请填写失业保险办理时间!')
        return false
      } else if (!this.DetailDatas.unemploymentHandleMonth) {
        this.$message.warning('请填写失业保险生效月份!')
        return false
      } else if (!this.DetailDatas.unemploymentSettlementMonth) {
        this.$message.warning('请填写失业保险结算月份!')
        return false
      } else if (!this.DetailDatas.unemploymentBasicNum) {
        this.$message.warning('请填写失业保险基数（元）!')
        return false
      }
      if (this.$route.params.type === 'change') {
        if (pensionMonth < mydate) {
          this.$message.warning('养老保险结算月份不能小于当前月份!')
          return false
        }
        if (medicalMonth < mydate) {
          this.$message.warning('医疗保险结算月份不能小于当前月份!')
          return false
        }
        if (unemploymentMonth < mydate) {
          this.$message.warning('失业保险结算月份不能小于当前月份!')
          return false
        }
      }
      getSocialSave(param).then(data => {
        this.$message.success('操作成功!')
        setTimeout(() => {
          history.go(-1)
        }, 500)
      })
    }, 500),
    /* 缴费记录 */
    recordsBtn () {
      this.$router.push({ name: '缴费记录',
        params: {
          Id: this.$route.params.Id
        } })
    },
    goBack () {
      history.go(-1)
    }
  },
  created () {
    this._getSocialDetail()
  }
}
</script>

<style  lang="less" scoped>
.check-main{
    margin-top:25px;
}
.tit{
    border-left:5px solid #FF7500;
    font-size:16px;
}
.el-select{
    width:100%;
}
.check-table{
    height:50px;
    line-height:48px;
    text-align:center;
    border:1px solid #ccc;
    font-size:14px;
    .el-col{
        border-right:1px solid #ccc;
    }
    .border-bottom{
        border:none;
    }
    .border-right{
        border:none;
    }
}
.stop-remark{
    p{
        margin:20px 20px 20px 20px;
    }
}
.dateInfo{
    width:92%!important;
}
.money-input{
    width:92%!important;
}
.m-b-30{
    margin-bottom:30px;
}
.el-form-item.mustForm{
    position: relative;
}
.el-form-item.mustForm:before {
    content: "*";
    color: red;
    position: absolute;
    top: 15px;
    left: 18px;
}
</style>
