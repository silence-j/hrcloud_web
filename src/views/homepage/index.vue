<template>
<div>
  <div class="report-warp">
    <p class="title-name">图表展示</p>
    <el-row>
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <div class="report-tit">本周招聘情况</div>
        <div class="chart-mod">
          <ve-waterfall :data="workrecruitData" :colors="colorsArr" :settings="chartSettings"></ve-waterfall>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <div class="report-tit">本周人员情况</div>
        <div class="chart-mod">
          <ve-pie :data="workuserData" :colors="colorsArr" :settings="chartSettings2"></ve-pie>
        </div>
      </el-col>
    </el-row>
  </div>
  <div class="msg-remind">
    <p class="title-name">消息提醒</p>
    <div class="tabs-box">
      <div class="tabs-wrap">
        <ul class="tabs-box-ul clearfix">
          <li>
            <router-link tag="div" to="/homepage/message/waitSocial"><span class="msg">社保待参保</span></router-link>
            <div class="warn" v-if="fiTotal.insur1Total != 0"><span>{{fiTotal.insur1Total | filterNum}}</span></div>
          </li>
          <li>
            <router-link tag="div" to="/homepage/message/stopSocial"><span class="msg">社保待停保</span></router-link>
            <div class="warn" v-if="fiTotal.insur2Total != 0"><span>{{fiTotal.insur2Total | filterNum}}</span></div>
          </li>
          <li>
            <router-link tag="div" to="/homepage/message/waitProviden"><span class="msg">公积金待办理</span></router-link>
            <div class="warn" v-if="fiTotal.fund1Total != 0"><span>{{fiTotal.fund1Total | filterNum}}</span></div>
          </li>
          <li>
            <router-link tag="div" to="/homepage/message/stopProviden"><span class="msg">公积金待停缴</span></router-link>
            <div class="warn" v-if="fiTotal.fund2Total != 0"><span>{{fiTotal.fund2Total | filterNum}}</span></div>
          </li>
          <li>
            <router-link tag="div" to="/homepage/message/WaitEmploy"><span class="msg">协议待签订</span></router-link>
            <div class="warn" v-if="agreementTotal.sintotal != 0"><span>{{agreementTotal.sintotal | filterNum}}</span></div>
          </li>
          <li>
            <router-link tag="div" to="/homepage/message/stopEmploy"><span class="msg">协议待解除</span></router-link>
            <div class="warn" v-if="agreementTotal.retotal != 0"><span>{{agreementTotal.retotal | filterNum}}</span></div>
          </li>
          <li>
            <router-link tag="div" to="/homepage/message/waitContract"><span class="msg">合同待签订</span></router-link>
            <div class="warn" v-if="contractTotal.sintotal != 0"><span>{{contractTotal.sintotal | filterNum}}</span></div>
          </li>
          <li>
            <router-link tag="div" to="/homepage/message/stopContract"><span class="msg">合同待解除</span></router-link>
            <div class="warn" v-if="contractTotal.retotal != 0"><span>{{contractTotal.retotal | filterNum}}</span></div>
          </li>
          <li>
            <router-link tag="div" to="/homepage/message/continueContract"><span class="msg">合同到期提醒</span></router-link>
            <div class="warn" v-if="contractTotal.contotal != 0"><span>{{contractTotal.contotal | filterNum}}</span></div>
          </li>
          <li>
            <router-link tag="div" to="/homepage/message/giftBag"><span class="msg">节日礼包上报提醒</span></router-link>
            <div class="warn" v-if="welfareTotal.jieRi != 0"><span>{{welfareTotal.jieRi | filterNum}}</span></div>
          </li>
          <li>
            <router-link tag="div" to="/homepage/message/grant"><span class="msg">实物发放上报提醒</span></router-link>
            <div class="warn" v-if="welfareTotal.shiWu != 0"><span>{{welfareTotal.shiWu | filterNum}}</span></div>
          </li>
        </ul>
      </div>
      <div>
        <router-view/>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { getContractTotal, getAgreementTotal, getWelfareTotal, getFITotal, getWeekrecruitNum, getWeekUserSituation } from 'static/api/homepage/homepage'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Index',
  data () {
    return {
      contractTotal: {
        contotal: 0,
        retotal: 0,
        sintotal: 0
      },
      agreementTotal: {
        retotal: 0,
        sintotal: 0
      },
      welfareTotal: {
        shiWu: 0,
        jieRi: 0
      },
      fiTotal: {
        insur1Total: 0,
        insur2Total: 0,
        fund1Total: 0,
        fund2Total: 0
      },
      workrecruitData: {
        columns: ['name', '人数'],
        rows: [
          { name: '录用', '人数': 0 },
          { name: '储备', '人数': 0 },
          { name: '不录用', '人数': 0 }
        ]
      },
      chartSettings: {
        totalNum: 0,
        totalName: '应聘'
      },
      workuserData: {
        columns: ['name', 'num'],
        rows: [
          { name: '入职人数', num: 0 },
          { name: '调入人数', num: 0 },
          { name: '调出人数', num: 0 },
          { name: '离职人数', num: 0 }
        ]
      },
      chartSettings2: {
        label: {
          show: false
        },
        labelLine: {
          show: false
        }
      },
      colorsArr: ['#FF963D', '#6EC4E2', '#FFBB82', '#95B6EC', '#EA9090', '#A39FEC', '#8FDB9C']
    }
  },
  filters: {
    filterNum (value) {
      if (value > 99) {
        return '99+'
      } else {
        return value
      }
    }
  },
  computed: {
    ...mapGetters(['getUninsuredMsg'])
  },
  watch: {
    getUninsuredMsg (val) {
      if (val) {
        this._getTotal()
        this.setUninsuredMsg('')
      }
    }
  },
  methods: {
    ...mapMutations({
      setUninsuredMsg: 'SET_RECORD_NMINSURED_MSG'
    }),
    _getTotal () {
      getContractTotal().then(data => {
        this.contractTotal.contotal = data.result.contotal
        this.contractTotal.retotal = data.result.retotal
        this.contractTotal.sintotal = data.result.sintotal
      })
      getAgreementTotal().then(data => {
        this.agreementTotal.retotal = data.result.retotal
        this.agreementTotal.sintotal = data.result.sintotal
      })
      getWelfareTotal().then((data) => {
        this.welfareTotal.shiWu = data.result.shiWu
        this.welfareTotal.jieRi = data.result.jieRi
      })
      getFITotal().then((data) => {
        this.fiTotal.insur1Total = data.result.insur1Total
        this.fiTotal.insur2Total = data.result.insur2Total
        this.fiTotal.fund1Total = data.result.fund1Total
        this.fiTotal.fund2Total = data.result.fund2Total
      })
    },
    _getChart () {
      getWeekrecruitNum(1).then(data => {
        this.chartSettings.totalNum = data.result.candidate
        this.workrecruitData.rows[0].人数 = data.result.entryNum
        this.workrecruitData.rows[1].人数 = data.result.store
        this.workrecruitData.rows[2].人数 = data.result.noEntryNum
      })
      getWeekUserSituation().then((data) => {
        this.workuserData.rows[0].num = data.result.ruZhi
        this.workuserData.rows[1].num = data.result.diaoRu
        this.workuserData.rows[2].num = data.result.diaoChu
        this.workuserData.rows[3].num = data.result.liZhi
      })
    }
  },
  created () {
    this._getTotal()
    this._getChart()
  }
}
</script>
<style scoped lang="less">
  @import "~assets/less/homePage";
  .el-select{
    width:100%
  }
.table-wrap{
  max-width: 700px;
  .el-table{
    width:100%;
  }
}
.index-color {
  color: #009688;
  font-weight: bolder;
  font-size: 14px;
  margin-bottom: 15px;
}
.tabs-box{
  .tabs-wrap{
    min-width:700px;
    width:100%;
    overflow-x:auto;
    overflow-y:hidden;
    ul{
      &.tabs-box-ul {
        li{
          float: left;
          position: relative;
          font-size: @font-size-medium;
          color: #6E7382;
          cursor: pointer;
          height:42px;
          line-height:42px;
          .msg{
            padding: 0px 15px;
            border-right: 1px solid #E9E9EA;
          }
          .router-link-active{
            position: relative;
            color:@base-color;
            &:after{
              content: '';
              width:90%;
              position: absolute;
              left:5%;
              height:2px;
              bottom:0px;
              background: @main-color;
              // border-bottom: 2px solid @main-color;
            }
            .msg{
              color: @main-color;
              width: 100%;
            }
          }
          .warn{
            line-height:18px;
            position: absolute;
            right: 3px;
            top: 0px;
            width: 18px;
            height: 18px;
            color: #fff;
            font-size: 10px;
            text-align: center;
            border-radius: 50%;
            background: #FF1A1A;
            letter-spacing: -1px;
            font-style:normal;
            span {
              display: block;
              transform: scale(0.8);
            }
          }
        }
      }
    }
  }
}
.title-name {
  position:relative;
}
.go-cockpit{
  position:absolute;
  top: -9px;
  left: 100px;
}
</style>
