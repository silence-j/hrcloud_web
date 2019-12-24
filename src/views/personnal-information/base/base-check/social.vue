<template>
    <div class="mt-20">
        <!--9当前停保-->
        <div class="stop-main m-b-30" v-if="DetailDatas.status === 9">
            <p class="base-sec-title">当前停保</p>
            <div style="margin-left:20px;" class="stop-remark">
                <p style="color:red;">已停保</p>
                <p>停保原因：{{DetailDatas.endReasonType}}</p>
                <p>停保月份：{{DetailDatas.endMonth}}</p>
                <p>备注：{{DetailDatas.endReason}}</p>
            </div>
        </div>
        <!--2正常 -->
        <div v-if="DetailDatas.status === 2">
            <div class="m-b-30">
               <p class="base-sec-title">当前参保</p>
                <el-form label-width="100px">
                    <el-row align="center">
                        <el-col :span="4">
                            <el-form-item label="姓  名:">
                                <span>{{DetailDatas.name}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="身份证号码:">
                                <span>{{DetailDatas.idCardNumber}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="手机号:">
                                <span>{{DetailDatas.telephone}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="户籍性质:">
                                <span>{{DetailDatas.nature}} {{userNatureType}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row align="center">
                        <el-col :span="12">
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
                    <el-col :span="4"><span>{{DetailDatas.pensionHandleTime ? DetailDatas.pensionHandleTime : '暂无'}}</span></el-col>
                    <el-col :span="3"><span>{{DetailDatas.pensionHandleMonth ? DetailDatas.pensionHandleMonth :'暂无'}}</span></el-col>
                    <el-col :span="3"><span>{{DetailDatas.pensionSettlementMonth ? DetailDatas.pensionSettlementMonth : '暂无'}}</span></el-col>
                    <el-col :span="3"><span>{{DetailDatas.pensionBasicNum ? DetailDatas.pensionBasicNum :' 暂无'}}</span></el-col>
                    <el-col :span="4"><span>{{DetailDatas.personalPensionPercent * 100}}%</span></el-col>
                    <el-col :span="4" class="border-right"><span>{{DetailDatas.pensionAmount ? DetailDatas.pensionAmount :'暂无'}}</span></el-col>
                </el-row>
                <el-row class="check-table" style="border-bottom:none">
                    <el-col :span="3">医疗保险</el-col>
                    <el-col :span="4"><span>{{DetailDatas.medicalHandleTime ? DetailDatas.medicalHandleTime : '暂无'}}</span></el-col>
                    <el-col :span="3"><span>{{DetailDatas.medicalHandleMonth ? DetailDatas.medicalHandleMonth :'暂无'}}</span></el-col>
                    <el-col :span="3"><span>{{DetailDatas.medicalSettlementMonth ? DetailDatas.medicalSettlementMonth :'暂无'}}</span></el-col>
                    <el-col :span="3"><span>{{DetailDatas.medicalBasicNum ? DetailDatas.medicalBasicNum:'暂无'}}</span></el-col>
                    <el-col :span="4"><span>{{DetailDatas.personalMedicalPercent * 100}}% + {{DetailDatas.personalMedicalFixedMoney}}元</span></el-col>
                    <el-col :span="4" class="border-right"><span>{{DetailDatas.medicalAmount ? DetailDatas.medicalAmount :'暂无'}}</span></el-col>
                </el-row>
                <el-row class="check-table">
                    <el-col :span="3">失业保险</el-col>
                    <el-col :span="4"><span>{{DetailDatas.unemploymentHandleTime ? DetailDatas.unemploymentHandleTime :'暂无' }}</span></el-col>
                    <el-col :span="3"><span>{{DetailDatas.unemploymentHandleMonth ? DetailDatas.unemploymentHandleMonth :'暂无'}}</span></el-col>
                    <el-col :span="3"><span>{{DetailDatas.unemploymentSettlementMonth ? DetailDatas.unemploymentSettlementMonth :'暂无'}}</span></el-col>
                    <el-col :span="3"><span>{{DetailDatas.unemploymentBasicNum ? DetailDatas.unemploymentBasicNum :'暂无'}}</span></el-col>
                    <el-col :span="4"><span>{{DetailDatas.personalUnemploymentPercent * 100}}%</span></el-col>
                    <el-col :span="4" class="border-right"><span>{{DetailDatas.unemploymentAmount ? DetailDatas.unemploymentAmount :'暂无'}}</span></el-col>
                </el-row>
            </div>
        </div>
        <!--0不参保 -->
        <div class="stop-main" v-if="DetailDatas.status === 0">
            <div class="stop-remark">
                <p class="base-sec-title">不参保</p>
                <p>不参保原因：{{DetailDatas.remark}}</p>
            </div>
        </div>
        <!-- 1待参保 -->
        <div class="stop-main" v-if="DetailDatas.status === 1">
            <p class="hint f14">当前未参保</p>
        </div>
        <!-- 变更记录 -->
        <div v-show="historyList.length>0">
            <p class="base-sec-title">变更记录</p>
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
            <div v-for="item in historyList" :key="item.id">
                <el-row class="check-table" style="border-bottom:none">
                    <el-col :span="2">{{item.createTime}}</el-col>
                    <el-col :span="2">养老保险</el-col>
                    <el-col :span="2">{{item.pensionHandleTime}}</el-col>
                    <el-col :span="2">{{item.pensionHandleMonth}}</el-col>
                    <el-col :span="2">{{item.pensionSettlementMonth}}</el-col>
                    <el-col :span="2">{{item.pensionBasicNum}}</el-col>
                    <el-col :span="2">{{item.pensionPercent*100}}%</el-col>
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
                    <el-col :span="2">{{item.medicalPercent*100}}% + {{item.medicalFixedMoney}}元</el-col>
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
                    <el-col :span="2">{{item.unemploymentPercent *100}}%</el-col>
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
import { getSocialDetail } from 'static/api/socialSecurity'
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
        percentId: '',
        standard: ''
      },
      userNatureType: '',
      SocialId: '',
      historyList: [],
      orgId: '',
      areaNameDatas: '',
      insurNatureId: '',
      fundPercentId: '',
      areaNameVal: '',
      medicalAmountAccountType: ''
    }
  },
  methods: {
    /* 查看详情 */
    _getSocialDetail () {
      let param = {
        userId: this.$route.params.baseId
      }
      getSocialDetail(param).then(data => {
        if (data.result) {
          this.DetailDatas = data.result
          if (this.DetailDatas.insurNature === 1) {
            this.userNatureType = '本地'
          } else {
            this.userNatureType = '外地'
          }
          /* 其它 */
          this.orgId = this.DetailDatas.orgId
          this.userNature = this.DetailDatas.userNature
          this.DetailDatas.insurNature = this.DetailDatas.insurNature
          this.DetailDatas.personalPensionPercent = this.DetailDatas.personalPensionPercent
          this.DetailDatas.personalMedicalPercent = this.DetailDatas.personalMedicalPercent
          this.DetailDatas.personalMedicalFixedMoney = this.DetailDatas.personalMedicalFixedMoney
          this.DetailDatas.personalUnemploymentPercent = this.DetailDatas.personalUnemploymentPercent
          /* 变更记录 */
          if (data.result.historyList.length > 0) {
            this.historyList = data.result.historyList
          }
        }
      })
    }
  },
  created () {
    this._getSocialDetail()
    this.$store.commit('SET_ACTIVE_ROUTER', '7')
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
.base-sec-title{
    font-size:14px;
    width:99%
}
.base-sec-title::after{
    left: 90px;
}
.f14{
    font-size:14px;
}
</style>
