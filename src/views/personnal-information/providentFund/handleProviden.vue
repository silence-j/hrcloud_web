<template>
    <div>
        <el-button type="primary" size="small" @click="goBack">返 回</el-button>
        <el-button type="primary" size="small" @click="fundsSave" v-if="this.$route.params.type==='handle' || this.$route.params.type==='change'">提 交</el-button>
        <el-button type="primary" size="small" @click="recordsMsg">缴费记录</el-button>
        <!-- 办理/变更状态 -->
        <div class="check-main" v-if="this.$route.params.type==='handle' || this.$route.params.type==='change'">
            <p class="tit mb-10">&nbsp;&nbsp;当前参保</p>
            <el-form label-width="100px">
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
                    <el-col :span="24">
                        <el-form-item label="工资标准：">
                            <span>{{fundDetailDatas.standard}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="缴纳公司：" class="mustForm">
                            <el-input v-model="fundDetailDatas.orgName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="缴纳机构：" class="mustForm">
                            <el-select v-model="fundDetailDatas.areaName" placeholder="请选择缴纳机构" @change="areaNameChange">
                                <el-option
                                    v-for="item in areaNameOptions"
                                    :key="item.id"
                                    :label="item.areaName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="this.$route.params.type==='change'">
                        <el-form-item label="首交月份：" class="mustForm">
                            <el-date-picker
                                disabled
                                v-model="fundDetailDatas.startMonth"
                                type="month"
                                placeholder="选择首交月份">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" v-else>
                        <el-form-item label="首交月份：" class="mustForm">
                            <el-date-picker
                                v-model="fundDetailDatas.startMonth"
                                type="month"
                                placeholder="选择首交月份">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="办理时间：" class="mustForm">
                            <el-date-picker
                                v-model="fundDetailDatas.handleTime"
                                type="date"
                                placeholder="选择办理时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="生效月份：" class="mustForm">
                            <el-date-picker
                                v-model="fundDetailDatas.handleMonth"
                                type="month"
                                placeholder="选择生效月份">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="结算月份：" class="mustForm">
                            <el-date-picker
                                v-model="fundDetailDatas.settlementMonth"
                                type="month"
                                placeholder="选择结算月份">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="缴纳方式：" class="mustForm">
                            <el-radio-group v-model="fundDetailDatas.isFunded">
                                <el-radio :label="1">按基数比例</el-radio>
                                <el-radio :label="0">按固定金额</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-show="fundDetailDatas.isFunded === 1">
                    <el-col :span="6">
                        <el-form-item label="缴纳基数：" class="mustForm">
                            <el-input v-model="fundDetailDatas.fundBasicNum"><template slot="append">元</template></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="缴纳比例：">
                            <el-input v-model="fundDetailDatas.fundPercentView" disabled><template slot="append">%</template></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="缴纳金额：">
                            <el-input v-model="fundAmountAccount" disabled><template slot="append">元</template></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-show="fundDetailDatas.isFunded === 0">
                    <el-col :span="6">
                        <el-form-item label="缴纳金额：" class="mustForm">
                            <el-input v-model="fundDetailDatas.fundAmount"><template slot="append">元</template></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <!-- 查看状态 -->
        <div class="check-main" v-if="this.$route.params.type==='check'">
            <p class="tit mb-10">&nbsp;&nbsp;当前参保</p>
            <el-form label-width="100px">
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
                    <el-col :span="12">
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

        <!-- 已停保>-->
        <div class="check-main stop-main" v-if="this.$route.params.type==='stopcheck'">
            <p class="tit mb-10">&nbsp;&nbsp;当前停缴</p>
            <div style="margin-left:20px;" class="stop-remark">
                <p style="color:red;">已停缴</p>
                <p>停保原因：{{fundDetailDatas.endReasonType}}</p>
                <p>停保月份：{{fundDetailDatas.endMonth}}</p>
                <p>备注：{{fundDetailDatas.endReason}}</p>
            </div>
        </div>
        <br/>

        <!-- 变更记录-->
        <div>
            <p class="tit mb-20">&nbsp;&nbsp;变更记录</p>
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
                    <template slot-scope="scope">
                        <span>{{(scope.row.fundPercent * 100).toFixed(2)}}</span>
                    </template>
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
import { getFundDetail, getFundHandelSave } from 'static/api/socialSecurity'
import { timeZeroToString, timeToString } from 'assets/js/common'
export default {
  data () {
    return {
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
        areaNameVal: ''
      },
      historyData: [],
      areaNameOptions: [],
      DetailId: '',
      standard: ''
    }
  },
  computed: {
    fundAmountAccount () {
      return Math.ceil(this.fundDetailDatas.fundBasicNum * this.fundDetailDatas.fundPercent)
    }
  },
  methods: {
    /* 根据缴纳机构计算比例 */
    areaNameChange (val) {
      if (val) {
        this.areaNameOptions.forEach(item => {
          if (item.id === val) {
            this.fundDetailDatas.fundPercentView = ((item.fundPercent) * 100).toFixed(2)
            this.fundDetailDatas.fundPercentId = item.id
            this.fundDetailDatas.fundPercent = item.fundPercent
            this.fundDetailDatas.areaNameVal = item.areaName
          }
        })
      }
    },
    /* 获取详情信息 */
    _getFundsDeatil () {
      let param = {
        userId: this.$route.params.Id
      }
      getFundDetail(param).then(data => {
        if (data.result) {
          this.fundDetailDatas = data.result
          this.DetailId = data.result.id
          /* 变更记录 */
          if (data.result.historyList.length > 0) {
            this.historyData = data.result.historyList
          }
          /* 缴纳机构 */
          if (data.result.percentList.length > 0) {
            this.areaNameOptions = data.result.percentList
          }
          this.fundDetailDatas.standard = this.fundDetailDatas.standard
          this.fundDetailDatas.orgId = this.fundDetailDatas.orgId
          this.fundDetailDatas.orgName = this.fundDetailDatas.orgName
          this.fundDetailDatas.areaName = this.fundDetailDatas.areaName
          this.fundDetailDatas.fundPercentView = (this.fundDetailDatas.fundPercent * 100).toFixed(2)
          this.fundDetailDatas.fundPercent = this.fundDetailDatas.fundPercent
          this.fundDetailDatas.fundAmount = this.fundDetailDatas.fundAmount
          this.fundDetailDatas.fundPercentId = this.fundDetailDatas.percentId
        }
      })
    },
    /* 办理信息提交 */
    fundsSave () {
      let param = {
        userId: this.$route.params.Id,
        status: 2,
        fundPercentId: this.fundDetailDatas.fundPercentId,
        orgId: this.fundDetailDatas.orgId,
        orgName: this.fundDetailDatas.orgName,
        areaName: this.fundDetailDatas.areaNameVal ? this.fundDetailDatas.areaNameVal : this.fundDetailDatas.areaName,
        startMonth: timeZeroToString(this.fundDetailDatas.startMonth),
        handleTime: timeToString(this.fundDetailDatas.handleTime),
        handleMonth: timeZeroToString(this.fundDetailDatas.handleMonth),
        settlementMonth: timeZeroToString(this.fundDetailDatas.settlementMonth),
        isFunded: this.fundDetailDatas.isFunded,
        fundBasicNum: this.fundDetailDatas.fundBasicNum ? this.fundDetailDatas.fundBasicNum : '',
        fundAmount: this.fundDetailDatas.isFunded === 1 ? this.fundDetailDatas.fundBasicNum * this.fundDetailDatas.fundPercent : this.fundDetailDatas.fundAmount
      }
      let timeMonth = timeZeroToString(this.fundDetailDatas.settlementMonth)
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      month = (month < 10 ? '0' + month : month)
      let mydate = (year.toString() + '-' + month.toString())

      if (!this.fundDetailDatas.areaName) {
        this.$message.warning('请填写缴纳机构!')
        return false
      } else if (!this.fundDetailDatas.startMonth) {
        this.$message.warning('请填写首交月份!')
        return false
      } else if (!this.fundDetailDatas.handleTime) {
        this.$message.warning('请填写办理时间!')
        return false
      } else if (!this.fundDetailDatas.handleMonth) {
        this.$message.warning('请填写生效月份!')
        return false
      } else if (!this.fundDetailDatas.settlementMonth) {
        this.$message.warning('请填写结算月份!')
        return false
      } else if (this.fundDetailDatas.isFunded === '') {
        this.$message.warning('请填写缴纳方式!')
        return false
      } else if (this.fundDetailDatas.isFunded === 1 && !this.fundDetailDatas.fundBasicNum) {
        this.$message.warning('请填写缴纳基数!')
        return false
      } else if (this.fundDetailDatas.isFunded === 0 && !this.fundDetailDatas.fundAmount) {
        this.$message.warning('请填写缴纳基数!')
        return false
      }
      if (this.$route.params.type === 'change') {
        if (timeMonth < mydate) {
          this.$message.warning('结算月份不能小于当前月份!')
          return false
        }
      }
      getFundHandelSave(param).then(data => {
        this.$message.success('操作成功!')
        setTimeout(() => {
          history.go(-1)
        }, 500)
      })
    },
    /* 缴费记录 */
    recordsMsg () {
      this.$router.push({ name: '公积金缴纳记录',
        params: {
          Id: this.$route.params.Id
          /* name: this.fundDetailDatas.name */
        } })
    },
    goBack () {
      history.go(-1)
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
.el-form-item.mustForm{
    position: relative;
}
.el-form-item.mustForm:before {
    content: "*";
    color: red;
    position: absolute;
    top: 15px;
    left: 6px;
}
</style>
