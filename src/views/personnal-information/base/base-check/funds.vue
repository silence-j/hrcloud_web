<template>
    <div class="mt-20">
        <!-- 9已停保>-->
        <div class="stop-main" v-if="fundDetailDatas.status === 9">
            <div class="stop-remark">
                <p class="base-sec-title">已停保</p>
                <p>停保原因：{{fundDetailDatas.endReasonType}}</p>
                <p>停保月份：{{fundDetailDatas.endMonth}}</p>
                <p>备注：{{fundDetailDatas.endReason}}</p>
            </div>
        </div>
        <!-- 2正常 -->
        <div v-if="fundDetailDatas.status === 2">
            <el-form label-width="100px">
                <p class="base-sec-title">当前参保</p>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="姓名：">
                            <span>{{fundDetailDatas.name}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="身份证号码：">
                            <span>{{fundDetailDatas.idCardNumber}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="手机号：">
                            <span>{{fundDetailDatas.telephone}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="工资标准：">
                            <span>{{fundDetailDatas.standard}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="缴纳公司：">
                            <span>{{fundDetailDatas.orgName}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="缴纳机构：">
                            <span>{{fundDetailDatas.areaName}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="首交月份：">
                            <span>{{fundDetailDatas.startMonth}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="办理时间：">
                            <span>{{fundDetailDatas.handleTime}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="生效月份：">
                        <span>{{fundDetailDatas.handleMonth}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="结算月份：">
                        <span>{{fundDetailDatas.settlementMonth}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="缴纳方式：">
                            <span v-if="fundDetailDatas.isFunded === 1">按基数比例</span>
                            <span v-if="fundDetailDatas.isFunded === 0">按固定金额</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-show="fundDetailDatas.isFunded === 1">
                    <el-col :span="6">
                        <el-form-item label="缴纳基数：">
                            <span>{{fundDetailDatas.fundBasicNum}} 元</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="缴纳比例：">
                            <span>{{fundDetailDatas.fundPercentView}} %</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="缴纳金额：">
                            <span>{{fundDetailDatas.fundAmount}} 元</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-show="fundDetailDatas.isFunded === 0">
                    <el-col :span="6">
                        <el-form-item label="缴纳金额：">
                            <span>{{fundDetailDatas.fundAmount}} 元</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- 0不缴纳 -->
        <div class="stop-main" v-if="fundDetailDatas.status === 0">
            <div class="stop-remark">
                <p class="base-sec-title">不缴纳</p>
                <p>不缴纳原因：{{fundDetailDatas.remark}}</p>
            </div>
        </div>
        <!-- 1待缴纳 -->
        <div class="stop-main" v-if="fundDetailDatas.status === 1">
            <p class="hint f14">当前未缴纳</p>
        </div>
        <br/><br/>
        <!-- 变更记录 -->
        <div v-show="historyData.length > 0">
            <el-table
                :data="historyData"
                border
                style="width: 100%">
                <el-table-column
                    prop="createTime"
                    label="变更日期">
                </el-table-column>
                <el-table-column
                    prop="handleTime"
                    label="办理时间"
                    width='180px'>
                </el-table-column>
                <el-table-column
                    prop="handleMonth"
                    label="生效月份">
                </el-table-column>
                <el-table-column
                    prop="settlementMonth"
                    label="结算月份">
                </el-table-column>
                <el-table-column
                    prop="isFunded"
                    label="缴纳方式">
                    <template slot-scope="scope">
                        <span>{{scope.row.isFunded | filterIsFunded}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="fundBasicNum"
                    label="缴纳基数(元)">
                </el-table-column>
                <el-table-column
                    prop="fundPercent"
                    label="缴纳比例(%)">
                </el-table-column>
                <el-table-column
                    prop="fundAmount"
                    label="缴纳金额(元)">
                </el-table-column>
                <el-table-column
                    prop="orgName"
                    label="缴纳公司">
                </el-table-column>
                <el-table-column
                    prop="areaName"
                    label="缴纳机构">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { getFundDetail } from 'static/api/socialSecurity'
export default {
  data () {
    return {
      activeName: '1',
      fundDetailDatas: {
        name: '',
        idCardNumber: '',
        telephone: '',
        orgName: '',
        areaName: '',
        startMonth: '',
        handleTime: '',
        handleMonth: '',
        settlementMonth: '',
        fundBasicNum: '',
        fundAmount: '',
        fundPercent: '',
        orgId: '',
        isFunded: '',
        fundPercentId: '',
        fundPercentView: '',
        fundAmountView: '',
        percentId: '',
        areaNameVal: '',
        standard: ''
      },
      historyData: [],
      areaNameOptions: [],
      DetailId: ''
    }
  },
  methods: {
    /* 获取详情信息 */
    _getFundsDeatil () {
      let param = {
        userId: this.$route.params.baseId
      }
      getFundDetail(param).then(data => {
        if (data.result) {
          this.fundDetailDatas = data.result
          this.DetailId = data.result.id
          /* 变更记录 */
          if (data.result.historyList.length > 0) {
            this.historyData = data.result.historyList
          }
          this.fundDetailDatas.fundPercentView = (this.fundDetailDatas.fundPercent * 100).toFixed(2)
        }
      })
    }
  },
  filters: {
    filterIsFunded (status) {
      if (status === 1) {
        status = '按基数比例'
      } else if (status === 0) {
        status = '按固定金额'
      }
      return status
    }
  },
  created () {
    this._getFundsDeatil()
    this.$store.commit('SET_ACTIVE_ROUTER', '8')
  }
}
</script>

<style  lang="less" scoped>
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
.base-sec-title::after{
  left: 90px;
  font-size:15px;
}
.f14{
  font-size:14px;
}
.base-sec-title{
    width:98%;
    font-size:14px;
}
</style>
