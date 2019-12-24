<template>
  <div class="market-main_box">
    <el-row><el-button type="primary" size="mini" @click="exportReport">导出</el-button></el-row>
    <div class="search-form_wrap">
      <div class="search-form_item">
        <el-date-picker
          :clearable="false"
          v-model="mainSearchForm.startTime"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          :picker-options="mainSearchForm.endTime ?{disabledDate: time => new Date(time).getTime() >= new Date(mainSearchForm.endTime).getTime() }:{ disabledDate: time => new Date(time).getTime() >= new Date(new Date()).getTime() }"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>
      <div class="line">
        <span>-</span>
      </div>
      <div class="search-form_item">
        <el-date-picker
          :clearable="false"
          v-model="mainSearchForm.endTime"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          :picker-options="{disabledDate: time => new Date(time).getTime() <= new Date(mainSearchForm.startTime).getTime() - 60 * 60 * 24 * 1000 }"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>
      <div class="search-form_button">
        <el-button type="primary" size="mini" @click="searchMainReportList">查询</el-button>
      </div>
    </div>
    <div style="overflow-y:auto;margin-top:60px">
      <div class="mainForm">
        <div class="mt-20 statistics" align="right">
          <div>统计区间:{{mainSearchForm.startTime || '不限'}}—{{mainSearchForm.endTime || formDate(new Date())}}</div>
        </div>
        <div class="table-div_box">
          <div class="table-header">
            <ul class="clearfix">
              <li style="width:50px;">序号</li>
              <li style="width:100px;">组织名称</li>
              <li style="width:150px;">单位名称</li>
              <li style="width:170px;">公司名称</li>
              <li style="width:210px">
                <div style="height:24px;line-height:24px;border-bottom:1px solid #dfe6ec" class="right-no left-no top-no">上月末人数</div>
                <div>
                  <dl>
                    <dd>试用</dd>
                    <dd>正式</dd>
                    <dd class="right-no">小计</dd>
                  </dl>
                </div>
              </li>
              <li style="width:209px">
                <div style="height:24px;line-height:24px;border-bottom:1px solid #dfe6ec" class="right-no left-no top-no">本月增加人数</div>
                <div>
                  <dl>
                    <dd>招聘</dd>
                    <dd>外部调入</dd>
                    <dd class="right-no">内部调入</dd>
                  </dl>
                </div>
              </li>
              <li style="width:209px">
                <div style="height:24px;line-height:24px;border-bottom:1px solid #dfe6ec" class="right-no left-no top-no">本月减少人数</div>
                <div>
                  <dl>
                    <dd>辞职</dd>
                    <dd>调出外部</dd>
                    <dd class="right-no">调出内部</dd>
                  </dl>
                </div>
              </li>
              <li style="width:209px" class="right-no">
                <div style="height:24px;line-height:24px;border-bottom:1px solid #dfe6ec" class="right-no left-no top-no">本月末人数</div>
                <div>
                  <dl>
                    <dd>试用</dd>
                    <dd>正式</dd>
                    <dd class="right-no">小计</dd>
                  </dl>
                </div>
              </li>
            </ul>
          </div>
          <div class="table-body">
            <ul class="clearfix" v-for="(item,index) in mainDatas" :key="item.id">
              <li :style="{
            width:'50px',
            height:_countMuchCompanys(item),
            lineHeight:_countMuchCompanys(item),
             borderTop:'1px solid #dfe6ec',
             borderRight:'1px solid #dfe6ec'
            }">
                <!-- {{index+1}} -->
                {{index +1}}
              </li>
              <li
                class="right-no"
                :style="{
                width:'1258px',
                height:_countMuchCompanys(item),
                lineHeight:_countMuchCompanys(item),
                borderTop:'1px solid #dfe6ec',
            }">
                <ul>
                  <li
                    :style="{
                width:'100px',
                height:_countMuchCompanys(item),
                lineHeight:_countMuchCompanys(item),
               }"
                  >
                    <el-tooltip v-if="item.name.length>6" class="item" effect="dark" :content="item.name" placement="top-start">
                   <span
                     style="width:100px"
                     class="line-clamp"
                   >{{item.name}}</span>
                    </el-tooltip>
                    <span v-else=""
                          style="width:100px"
                          class="line-clamp"
                    >{{item.name}}</span>
                  </li>
                  <li
                    class="right-no"
                  >
                    <ul v-for="unit in item.units" :key="unit.id">
                      <li
                        :style="{
                      width:'150px',
                      height:_countMuchUnits(unit.companys) + 'px',
                      lineHeight:_countMuchUnits(unit.companys) + 'px',
                      borderBottom: '1px solid #ccc',
                      overflow:'hidden'
                      }">
                        <!--<span :title="unit.name"-->
                        <!--style="width:150px"-->
                        <!--class="line-clamp"-->
                        <!--&gt;{{unit.name}}</span>-->
                        <el-tooltip v-if="unit.name.length > 9" class="item" effect="dark" :content="unit.name" placement="top-start">
                          <span style="height:31px;line-height:31px;border-bottom: 1px solid #ccc;">{{unit.name}}</span>
                        </el-tooltip>
                        <span v-else>{{unit.name}}</span>
                      </li>
                      <li class="right-no"
                      >
                        <ul>
                          <li class="right-no">
                            <dl>
                              <dd
                                v-for="com in unit.companys"
                                style="heigt:32px;line-height:32px;"
                                :key="com.id">
                                <ul>
                                  <li style="width:170px;" class="click-li" @click="skipDetail(com)">
                                    <el-tooltip v-if="com.name.length > 12" class="item" effect="dark" :content="com.name" placement="top-start">
                                      <span style="height:31px;line-height:31px;border-bottom: 1px solid #ccc;">{{com.name}}</span>
                                    </el-tooltip>
                                    <span v-else style="height:31px;line-height:31px;border-bottom: 1px solid #ccc;">{{com.name}}</span>
                                  <li>
                                  <li style="width:69px;height:32px;line-height:32px;border-bottom: 1px solid #ccc;">{{com.totalInfo.lastmonthProbation}}</li>
                                  <li style="width:69px;height:32px;line-height:32px;border-bottom: 1px solid #ccc;">{{com.totalInfo.lastmonthDismass}}</li>
                                  <li style="width:72px;height:32px;line-height:32px;border-bottom: 1px solid #ccc;">{{com.totalInfo.lastmonthSubtotal}}</li>
                                  <li style="width:69px;height:32px;line-height:32px;border-bottom: 1px solid #ccc;">{{com.totalInfo.recruit}}</li>
                                  <li style="width:69px;height:32px;line-height:32px;border-bottom: 1px solid #ccc;">{{com.totalInfo.externalCall}}</li>
                                  <li style="width:71px;height:32px;line-height:32px;border-bottom: 1px solid #ccc;">{{com.totalInfo.internalCall}}</li>
                                  <li style="width:69px;height:32px;line-height:32px;border-bottom: 1px solid #ccc;">{{com.totalInfo.dimission}}</li>
                                  <li style="width:69px;height:32px;line-height:32px;border-bottom: 1px solid #ccc;">{{com.totalInfo.calloutExterna}}</li>
                                  <li style="width:71px;height:32px;line-height:32px;border-bottom: 1px solid #ccc;">{{com.totalInfo.calloutInternal}}</li>
                                  <li style="width:69px;height:32px;line-height:32px;border-bottom: 1px solid #ccc;">{{com.totalInfo.thisMonthProbation}}</li>
                                  <li style="width:69px;height:32px;line-height:32px;border-bottom: 1px solid #ccc;">{{com.totalInfo.thisMonthDismass}}</li>
                                  <li style="width:70px;height:32px;line-height:32px;border-bottom: 1px solid #ccc;" class="right-no">{{com.totalInfo.thisMonthSubtotal}}</li>
                                </ul>
                              </dd>
                            </dl>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="table-footer right-no">
            <ul class="clearfix">
              <li style="width:470px">小计</li>
              <li style="width:69px;">{{_getReportTotal('lastmonthProbation')}}</li>
              <li style="width:69px;">{{_getReportTotal('lastmonthDismass')}}</li>
              <li style="width:72px;">{{_getReportTotal('lastmonthSubtotal')}}</li>
              <li style="width:69px;">{{_getReportTotal('recruit')}}</li>
              <li style="width:69px;">{{_getReportTotal('externalCall')}}</li>
              <li style="width:71px;">{{_getReportTotal('internalCall')}}</li>
              <li style="width:69px;">{{_getReportTotal('dimission')}}</li>
              <li style="width:69px;">{{_getReportTotal('calloutExterna')}}</li>
              <li style="width:71px;">{{_getReportTotal('calloutInternal')}}</li>
              <li style="width:69px;">{{_getReportTotal('thisMonthProbation')}}</li>
              <li style="width:69px;">{{_getReportTotal('thisMonthDismass')}}</li>
              <li style="width:71px;" class="right-no">{{_getReportTotal('thisMonthSubtotal')}}</li>
            </ul>
          </div>
          <div class="table-footer right-no">
            <ul class="clearfix">
              <li style="width:470px">签订劳动合同人数</li>
              <li style="width:138px"></li>
              <li style="width:141px">参保人数</li>
              <li style="width:69px"></li>
              <li style="width:140px">社保企业部分概算</li>
              <li style="width:69px"></li>
              <li style="width:140px">应付工资总额</li>
              <li style="width:140px"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <form style="display:none" name="form"
          method="POST"
          target="_blank"
          ref="submitExcel" id="submitExcel" :action="hostBaseUrl+'/report/monthlyReportForms/queryMonthlyMain/hrBelong/export'">
      <p>startTime: <input type="text" id="startTime" name="startTime" value="" /></p>
      <p>endTime: <input type="text" id="endTime" name="endTime" value="" /></p>
      <input type="submit" value="Submit"/>
    </form>
  </div>
</template>
<script>
import { monthToString, toMonthEndTime } from 'assets/js/common'
import { getQueryMonthlyMain } from 'static/api/report/index'
import { hostBaseUrl } from 'utils/config'
import dayjs from 'dayjs'
export default {
  data () {
    return {
      hostBaseUrl,
      mainSearchForm: {
        type: 0,
        startTime: '',
        endTime: ''
        // companyId: ''
      },
      mainDatas: []
    }
  },
  computed: {
    searchParams () {
      return {
        type: this.mainSearchForm.type,
        startTime: this.mainSearchForm.startTime ? this.mainSearchForm.startTime : '',
        endTime: this.mainSearchForm.endTime ? this.mainSearchForm.endTime : '',
        companyId: this.mainSearchForm.companyId
      }
    }
  },
  methods: {
    formDate (date) {
      return dayjs(date).format('YYYY-MM-DD')
    },
    // 导出
    exportReport () {
      document.getElementById('startTime').setAttribute('value', this.searchParams.startTime)
      document.getElementById('endTime').setAttribute('value', this.searchParams.endTime)
      this.$refs.submitExcel.submit()
    },
    _getReportTotal (custome) {
      let total = 0
      this.mainDatas.forEach(item => {
        item.units.forEach(unit => {
          unit.companys.forEach(com => {
            total += Number(com.totalInfo[custome])
          })
        })
      })
      return total
    },
    // 计算单位里面包含多少公司
    _countMuchCompanys (item) {
      let count = 0
      item.units.forEach(uti => {
        count += this._countMuchUnits(uti.companys)
      })
      return count + 'px'
    },
    // 计算组织里包含多少单位
    _countMuchUnits (utils) {
      return utils.length * 32
    },
    skipDetail (com) {
      this.$router.push({ name: 'ReportMarketMainDetail',
        query: { companyName: com.name, companyId: com.id },
        params: { id: com.id, startTime: this.mainSearchForm.startTime, endTime: this.mainSearchForm.endTime } })
    },
    searchMainReportList () {
      this._queryMonthlyMain()
    },
    _queryMonthlyMain () {
      getQueryMonthlyMain(this.searchParams).then(res => {
        this.mainDatas = res.result
      })
    },
    // 设置默认搜索的时间范围为当前月开始和结束
    _getCurrentTime () {
      this.mainSearchForm.startTime = monthToString(new Date()).split(' ')[0]
      this.mainSearchForm.endTime = toMonthEndTime(new Date())
      this.searchMainReportList()
    }
  },
  created () {
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
    max-height:600px;
    width:1312px;
    overflow-x: hidden;
    box-sizing: border-box;
    .table-div_box{
      border:1px solid #dfe6ec;
      width: 1308px;
      // overflow: hidden;
      height:100%;
      .table-header{
        ul{
          li{
            border-right:1px solid #dfe6ec;
            float:left;
            font-size:14px;
            height:48px;
            line-height:48px;
            text-align: center;
            box-sizing: border-box;
            div{
              dl{
                box-sizing: border-box;
                dd{
                  float:left;
                  width:69px;
                  border-right:1px solid #dfe6ec;
                  line-height:24px;
                  box-sizing: border-box;
                }
              }
            }
          }
        }
      }
      .table-body{
        ul{
          li{
            border-right:1px solid #dfe6ec;
            float:left;
            font-size:14px;
            text-align: center;
            box-sizing: border-box;
            //  line-height:32px;
            // height:32px;
            span{
              display: block;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
            &.click-li{
              color:#ff7500;
              cursor: pointer;
              &:hover{
                text-decoration: underline
              }
            }
          }
        }
      }
      .table-footer{
        width:100%;
        border-top:1px solid #dfe6ec;
        ul{
          li{
            border-right:1px solid #dfe6ec;
            float:left;
            font-size:14px;
            text-align: center;
            box-sizing: border-box;
            height:32px;
            line-height:32px;
          }
        }
      }
    }
    .el-row{
      .el-col{
        border:1px solid #dfe6ec;
        height:48px;
        line-height:48px;
        text-align:center;
        font-size:13px;
        box-sizing: border-box;
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
  .market-main_box{
    .statistics{
      font-size:14px;
      line-height:36px;
      // position: relative;
      width:1310px;
      &>div{
        display: inline-block;
        // text-align: right;
        //  position: absolute;
        // right:20px;
      }
    }
  }
</style>
