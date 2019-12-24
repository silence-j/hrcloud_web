<template>
<div class="market-report-mainDetail_box">
  <el-row>
    <el-button
     size="mini"
     type="primary"
     @click="$router.go(-1)">返回</el-button>
     <el-button @click="exportReport" type="primary" size="small">导出</el-button>
  </el-row>
  <el-row class="mt-20">
       <div class="table-div_box">
        <div class="table-header">
          <ul class="clearfix">
            <li style="width:50px;">序号</li>
            <li style="width:200px;">部门名称</li>
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
          <ul class="clearfix" v-for="(item,index) in mainReportDatas" :key="item.id">
             <li style="width:50px;">{{index +1}}</li>
            <li style="width:200px;">
              <el-tooltip v-if="item.name.length > 12" class="item" :content="item.name" effect="light"  placement="top-start">
                <span>{{item.name}}</span>
              </el-tooltip>
              <span v-else>{{item.name}}</span>
            </li>
            <li style="width:69px;">{{item.totalInfo.lastmonthProbation}}</li>
            <li style="width:69px;">{{item.totalInfo.lastmonthDismass}}</li>
            <li style="width:72px;">{{item.totalInfo.lastmonthSubtotal}}</li>
            <li style="width:69px;">{{item.totalInfo.recruit}}</li>
            <li style="width:69px;">{{item.totalInfo.externalCall}}</li>
            <li style="width:71px;">{{item.totalInfo.internalCall}}</li>
            <li style="width:69px;">{{item.totalInfo.dimission}}</li>
            <li style="width:69px;">{{item.totalInfo.calloutExterna}}</li>
            <li style="width:71px;">{{item.totalInfo.calloutInternal}}</li>
            <li style="width:69px;">{{item.totalInfo.thisMonthProbation}}</li>
            <li style="width:69px;">{{item.totalInfo.thisMonthDismass}}</li>
            <li style="width:70px;" class="right-no">{{item.totalInfo.thisMonthSubtotal}}</li>
          </ul>
        </div>
        <div class="table-footer right-no">
          <ul class="clearfix">
            <li style="width:250px">小计</li>
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
             <li style="width:150px">签订劳动合同人数</li>
             <li style="width:100px"></li>
             <li style="width:138px">参保人数</li>
             <li style="width:141px"></li>
             <li style="width:140px">社保企业部分概算</li>
             <li style="width:138px"></li>
            <li style="width:140px">应付工资总额</li>
             <li style="width:140px" class="right-no"></li>
          </ul>
        </div>
       </div>
  </el-row>
    <form name="form"
   method="POST"
   style="display:none"
   target="_blank"
   ref="submitExcel" id="submitExcel" :action="hostBaseUrl+'/report/monthlyReportForms/queryMonthlyMain/hrBelong/export'">
      <p>startTime: <input type="text" id="startTime" name="startTime" value="" /></p>
      <p>endTime: <input type="text" id="endTime" name="endTime" value="" /></p>
      <p>companyName: <input type="text" id="companyName" name="companyName" value="" /></p>
      <p>companyId: <input type="text" id="companyId" name="companyId" value="" /></p>
      <p>groupIds: <input type="text" id="groupIds" name="groupIds" value="" /></p>
      <p>type: <input type="text" id="type" name="type" value="2" /></p>
      <input type="submit" value="Submit"/>
    </form>
</div>
</template>
<script>
import { getQueryMonthlyMain } from 'static/api/report/index'
import { hostBaseUrl } from 'utils/config'
export default {
  data () {
    return {
      hostBaseUrl,
      mainReportDatas: []
    }
  },
  computed: {
    queryparams () {
      return {
        type: 2,
        startTime: this.$route.params.startTime ? this.$route.params.startTime : '',
        endTime: this.$route.params.endTime ? this.$route.params.endTime : '',
        companyId: this.$route.params.id,
        groupIds: `${JSON.parse(this.$route.query.groupIds)}`
      }
    }
  },
  methods: {
    exportReport () {
      document.getElementById('startTime').setAttribute('value', this.queryparams.startTime)
      document.getElementById('endTime').setAttribute('value', this.queryparams.endTime)
      document.getElementById('companyName').setAttribute('value', this.$route.query.companyName)
      document.getElementById('companyId').setAttribute('value', this.queryparams.companyId)
      document.getElementById('groupIds').setAttribute('value', `${JSON.parse(this.$route.query.groupIds)}`)
      console.log(this.$refs.submitExcel)
      this.$refs.submitExcel.submit()
    },
    // 求和
    _getReportTotal (custome) {
      let total = 0
      this.mainReportDatas.forEach(item => {
        total += Number(item.totalInfo[custome])
        // console.log(custome, Number(item.totalInfo[custome]))
      })
      return total
    //  return this.mainReportDatas.reduce((item, total) => total + Number(item.totalInfo[custome]), 0)
    },
    _getQueryMonthlyMain () {
      getQueryMonthlyMain(this.queryparams).then(res => {
        this.mainReportDatas = res.result
      })
    }
  },
  created () {
    this._getQueryMonthlyMain()
  }
}
</script>
<style lang="less" scoped>
.right-no{border-right:none!important;}
.bottom-no{border-bottom:none!important;}
.left-no{border-left:none!important;}
.top-no{border-top:none!important;}
.border-no{border:none!important;}
.market-report-mainDetail_box{
  .table-div_box{
      border:1px solid #dfe6ec;
      width: 1088px;
      overflow: hidden;
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
          border-top:1px solid #dfe6ec;
          li{
            border-right:1px solid #dfe6ec;
            float:left;
            font-size:14px;
            text-align: center;
            box-sizing: border-box;
            line-height:32px;
            height:32px;
            span{
              display: block;
              height:32px;
              line-height:32px;
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

}
</style>
