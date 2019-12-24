<template>
  <div class="container" @click="orgDatas.showTree = false">
    <el-form :model="mainForm" class="mt-20">
      <div class="search-form_box clearfix">
        <div class="search-form_item">
          <search-dept-tree
          :orgDatas="orgDatas"
          />
        </div>
        <div class="search-form_item start-line">
          <el-date-picker
            v-model="mainForm.startTime"
            type="date"
            :clearable="false"
            placeholder="请选择开始时间">
          </el-date-picker>
        </div>
        <div class="search-form_item">
         <el-date-picker
            v-model="mainForm.endTime"
            type="date"
            :clearable="false"
             :picker-options="pickerOptions"
            placeholder="请选择结束时间">
          </el-date-picker>
        </div>
        <div class="search-form_button pt-3">
          <el-button type="primary" size="small" @click="searchMainReport">查询</el-button>
        </div>
      </div>
    </el-form>
    <h4 class="mt-20 move-h4">中财集团劳动人事统计报表（月报主表）</h4>
    <div class="mainForm">
      <el-row class="th-bg">
        <el-col :span="2"  class="right-no bottom-no">填报公司</el-col>
        <el-col :span="2"  class="right-no bottom-no over-hide" v-if="orgDept" :title="orgDept">{{orgDept}}</el-col>
        <el-col :span="2"  class="right-no bottom-no over-hide" v-else>{{orgName}}</el-col>
        <el-col :span="10"  class="right-no bottom-no">统计年月</el-col>
        <el-col :span="10" class="bottom-no" v-if="!countMonth">{{timeZeroToString(new Date()).split('-')[0]+'-'+timeZeroToString(new Date()).split('-')[1] +'-'+ '01'}} - {{toMonthEndTime(new Date())}}</el-col>
        <el-col :span="10" class="bottom-no" v-else>{{timeZeroToString(mainForm.startTime)}} - {{timeZeroToString(mainForm.endTime)}}</el-col>
      </el-row>
      <el-row class="th-bg">
        <el-col :span="2" class="right-no row-two bottom-no">序号</el-col>
        <el-col :span="2" class="row-two bottom-no">机构</el-col>
        <el-col :span="5" class="right-no left-no col-pno bottom-no">
          <el-row>
            <el-col :span="24" class="border-no">上期末人数</el-col>
          </el-row>
          <el-row>
            <el-col :span="8" class="right-no bottom-no left-no">试用</el-col>
            <el-col :span="8" class="right-no bottom-no">正式</el-col>
            <el-col :span="8" class="bottom-no">小计</el-col>
          </el-row>
        </el-col>
        <el-col :span="5" class="right-no col-pno bottom-no">
          <el-row>
            <el-col :span="24" class="border-no">本期增加人数</el-col>
          </el-row>
          <el-row>
            <el-col :span="8" class="right-no bottom-no left-no">招聘</el-col>
            <el-col :span="8" class="right-no bottom-no">外部调入</el-col>
            <el-col :span="8" class="bottom-no">内部调入</el-col>
          </el-row>
        </el-col>
        <el-col :span="5" class="right-no col-pno bottom-no">
          <el-row>
            <el-col :span="24" class="border-no">本期减少人数</el-col>
          </el-row>
          <el-row>
            <el-col :span="8" class="right-no bottom-no left-no">离职</el-col>
            <el-col :span="8" class="right-no bottom-no">调出外部</el-col>
            <el-col :span="8" class="bottom-no">调出内部</el-col>
          </el-row>
        </el-col>
        <el-col :span="5" class="col-pno bottom-no">
          <el-row>
            <el-col :span="24" class="border-no">本期末人数</el-col>
          </el-row>
          <el-row>
            <el-col :span="8" class="right-no bottom-no left-no">试用</el-col>
            <el-col :span="8" class="right-no bottom-no">正式</el-col>
            <el-col :span="8" class="bottom-no">小计</el-col>
          </el-row>
        </el-col>
      </el-row>
    <div v-if="mainDatas.length">
       <el-row
        :key="item.value"
        v-for="(item,index) in mainDatas">
        <el-col :span="2" class="bottom-no right-no">{{index+1}}</el-col>
        <el-col :span="2" class="bottom-no right-no over-hide">{{item.name}}</el-col>
        <el-col :span="5" class="bottom-no right-no">
          <el-row>
            <el-col :span="8" class="border-no">{{item.lastmonthProbation}}</el-col>
            <el-col :span="8" class="right-no top-no">{{item.lastmonthDismass}}</el-col>
            <el-col :span="8" class="right-no top-no">{{item.lastmonthSubtotal}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="5" class="bottom-no right-no">
          <el-row>
            <el-col :span="8" class="border-no">{{item.recruit}}</el-col>
            <el-col :span="8" class="right-no top-no">{{item.externalCall}}</el-col>
            <el-col :span="8" class="right-no top-no">{{item.internalCall}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="5" class="bottom-no right-no">
          <el-row>
            <el-col :span="8" class="border-no">{{item.dimission}}</el-col>
            <el-col :span="8" class="right-no top-no">{{item.calloutExterna}}</el-col>
            <el-col :span="8" class="right-no top-no">{{item.calloutInternal}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="5" class="bottom-no right-no">
          <el-row>
            <el-col :span="8" class="border-no">{{item.thisMonthProbation}}</el-col>
            <el-col :span="8" class="right-no top-no">{{item.thisMonthDismass}}</el-col>
            <el-col :span="8" class="top-no">{{item.thisMonthSubtotal}}</el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
      <el-row>
        <el-col :span="4" class="th-bg">小计</el-col>
        <el-col :span="5" class="right-no left-no top-no">
          <el-row>
            <el-col :span="8" class="right-no left-no">{{totalForm.lastmonthProbationTotal}}</el-col>
            <el-col :span="8" class="right-no">{{totalForm.lastmonthDismassTotal}}</el-col>
            <el-col :span="8">{{totalForm.lastmonthSubtotalTotal}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="5" class="border-no">
          <el-row>
            <el-col :span="8" class="right-no left-no">{{totalForm.recruitTotal}}</el-col>
            <el-col :span="8" class=" top-no">{{totalForm.externalCallTotal}}</el-col>
            <el-col :span="8" class="left-no top-no">{{totalForm.internalCallTotal}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="5" class="border-no">
          <el-row>
            <el-col :span="8" class="right-no left-no">{{totalForm.dimissionTotal}}</el-col>
            <el-col :span="8" class=" top-no">{{totalForm.calloutExternaTotal}}</el-col>
            <el-col :span="8" class="left-no top-no">{{totalForm.calloutInternalTotal}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="5" class="border-no">
          <el-row>
            <el-col :span="8" class="right-no left-no">{{totalForm.thisMonthProbationTotal}}</el-col>
            <el-col :span="8" class=" top-no">{{totalForm.thisMonthDismassTotal}}</el-col>
            <el-col :span="8" class="left-no top-no">{{totalForm.thisMonthSubtotalTotal}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <!--<el-row class="border-no">
        <el-col :span="4" class="top-no th-bg">合计</el-col>
        <el-col :span="5" class="top-no left-no">{{totalForm.lastmonthProbationTotal+totalForm.lastmonthDismassTotal+totalForm.lastmonthSubtotalTotal}}</el-col>
        <el-col :span="5" class="top-no left-no">{{totalForm.recruitTotal+totalForm.externalCallTotal+totalForm.internalCallTotal}}</el-col>
        <el-col :span="5" class="top-no left-no">{{totalForm.dimissionTotal+totalForm.calloutExternaTotal+totalForm.calloutInternalTotal}}</el-col>
        <el-col :span="5" class="top-no left-no">{{totalForm.thisMonthProbationTotal+totalForm.thisMonthDismassTotal+totalForm.thisMonthSubtotalTotal}}</el-col>
      </el-row>-->
      <el-row>
        <el-col :span="4" class="top-no th-bg">月末签订劳动合同人数:</el-col>
        <el-col :span="7" class="top-no left-no">{{mianEndDatas.endmonthLabourContract}}</el-col>
        <el-col :span="5" class="top-no th-bg left-no">月末参保人数:</el-col>
        <el-col :span="8" class="top-no left-no">{{mianEndDatas.endmonthInsured}}</el-col>
       <!-- <el-col :span="4" class="top-no th-bg">本月社保企业部分概算:</el-col>
        <el-col :span="4" class="top-no left-no">{{mianEndDatas. estimate}}</el-col>-->
      </el-row>
    </div>
  </div>
</template>
<script>
import { getReportMain } from 'static/api/report/index'
import { monthToString, toMonthEndTime, getStartandTime, timeZeroToString } from 'assets/js/common'
import { getToken } from 'assets/js/util'
import SearchDeptTree from 'components/SearchDeptTree'
export default {
  data () {
    return {
      orgDatas: {
        filterName: '',
        orgId: '',
        dataTree: [],
        showTree: false
      },
      mainDatas: [],
      mianEndDatas: {
        endmonthLabourContract: '',
        endmonthInsured: '',
        estimate: ''
      },
      mainForm: {
        startTime: '',
        endTime: '',
        organizationId: '',
        organizationName: ''
      },
      totalForm: {
        lastmonthProbationTotal: 0,
        lastmonthDismassTotal: 0,
        lastmonthSubtotalTotal: 0,
        recruitTotal: 0,
        externalCallTotal: 0,
        internalCallTotal: 0,
        dimissionTotal: 0,
        calloutExternaTotal: 0,
        calloutInternalTotal: 0,
        thisMonthProbationTotal: 0,
        thisMonthDismassTotal: 0,
        thisMonthSubtotalTotal: 0
      },
      orgDept: '',
      countMonth: ''
    }
  },
  components: {
    SearchDeptTree
  },
  methods: {
    toMonthEndTime (value) {
      return toMonthEndTime(value)
    },
    timeZeroToString (value) {
      return timeZeroToString(value)
    },
    searchMainReport () {
      this.countMonth = this.mainForm.startTime
      this.orgDept = this.orgDatas.filterName
      this._getReportMian()
    },
    _getReportMian () {
      getReportMain(this.mainFormParams).then(res => {
        if (res.result) {
          if (res.result.monthlyMain) {
            this.totalForm = {
              lastmonthProbationTotal: 0,
              lastmonthDismassTotal: 0,
              lastmonthSubtotalTotal: 0,
              recruitTotal: 0,
              externalCallTotal: 0,
              internalCallTotal: 0,
              dimissionTotal: 0,
              calloutExternaTotal: 0,
              calloutInternalTotal: 0,
              thisMonthProbationTotal: 0,
              thisMonthDismassTotal: 0,
              thisMonthSubtotalTotal: 0
            }
            this.mainDatas = res.result.monthlyDetail
            res.result.monthlyDetail.forEach((item) => {
              this.totalForm.lastmonthProbationTotal += item.lastmonthProbation
              this.totalForm.lastmonthDismassTotal += item.lastmonthDismass
              this.totalForm.lastmonthSubtotalTotal += item.lastmonthSubtotal
              this.totalForm.recruitTotal += item.recruit
              this.totalForm.externalCallTotal += item.externalCall
              this.totalForm.internalCallTotal += item.internalCall
              this.totalForm.dimissionTotal += item.dimission
              this.totalForm.calloutExternaTotal += item.calloutExterna
              this.totalForm.calloutInternalTotal += item.calloutInternal
              this.totalForm.thisMonthProbationTotal += item.thisMonthProbation
              this.totalForm.thisMonthDismassTotal += item.thisMonthDismass
              this.totalForm.thisMonthSubtotalTotal += item.thisMonthSubtotal
            })
          }
          if (res.result.monthlyMain) {
            this.mianEndDatas.endmonthLabourContract = res.result.monthlyMain.endmonthLabourContract
            this.mianEndDatas.endmonthInsured = res.result.monthlyMain.endmonthInsured
            this.mianEndDatas.estimate = res.result.monthlyMain.estimate
          }
        }
      })
    },
    // 设置默认搜索的时间范围为当前月开始和结束
    _getCurrentTime () {
      this.mainForm.startTime = monthToString(new Date()).split(' ')[0]
      this.mainForm.endTime = toMonthEndTime(new Date())
      this.searchMainReport()
    }
  },
  computed: {
    mainFormParams () {
      return {
        organizationId: this.orgDatas.orgId,
        startTime: timeZeroToString(this.mainForm.startTime),
        endTime: timeZeroToString(this.mainForm.endTime)
      }
    },
    orgName () {
      //  return this.mainForm.organizationName ? this.mainForm.organizationName : getToken('loginDeptName')
      return getToken('loginDeptName')
    },
    pickerOptions () {
      return {
        disabledDate: (time) => {
          return new Date(time).getTime() < new Date(this.mainForm.startTime).getTime()
        }
      }
    }
  },
  filters: {
    monthToString (monthValue) {
      let newYear = new Date(monthValue).getFullYear()
      let newMon = new Date(monthValue).getMonth() + 1
      let newMonthTime = getStartandTime(newYear) + '-' + getStartandTime(newMon)
      return newMonthTime
    }
  },
  created () {
    // this._getReportMian()
    this._getCurrentTime()
  }
}
</script>
<style lang="less" scoped>
  .el-row{
    margin-bottom:0px!important;
  }
  .th-bg{background: #F4F4F4!important;}
  .move-h4{
    color: #FF7500;
    margin:2% 0px 2% 0px;
    text-align:center;
  }
  .move-h5{
    color: #FF7500;
    margin-bottom:10px;
    font-size: 14px;
    text-align:center;
  }
  .mainForm{
    .el-row{
      .el-col{
        border:1px solid #dfe6ec;
        height:40px;
        line-height:40px;
        text-align:center;
        font-size:13px;
      }
    }
  }
  .row-two{height:80px!important;line-height:80px!important;}
  .col-pno{padding: 0px!important;}
  .right-no{border-right:none!important;}
  .bottom-no{border-bottom:none!important;}
  .left-no{border-left:none!important;}
  .top-no{border-top:none!important;}
  .border-no{border:none!important;}
  .over-hide{overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
</style>
