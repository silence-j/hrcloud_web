<template>
  <div class="market-main_box" @click="orgDatas.showTree = false">
    <!--主信息-->
    <div v-if="!jumpDetail">
      <div style="height: 40px" class="search-form_wrap">
        <div class="search-form_item">
          <search-dept-tree
            :orgDatas="orgDatas"
          />
        </div>
        <div class="search-form_button">
          <el-button type="primary" size="mini" @click="searchMainReportList">查询</el-button>
        </div>
      </div>
      <div class="search-data mt-20">
        <el-button type="primary" size="small" @click="exportBtn">导 出</el-button>
       </div>
      <div style="overflow-y:auto;margin-top:20px">
        <div class="mainForm">
          <div class="table-div_box">
            <div class="table-header">
              <ul class="clearfix">
                <li style="width:50px;">序号</li>
                <li style="width:200px;">机构</li>
                <li style="width:280px">
                  <div style="height:24px;line-height:24px;border-bottom:1px solid #dfe6ec" class="right-no left-no top-no">全部已休完人数</div>
                  <div>
                    <dl>
                      <dd>在职</dd>
                      <dd>已调出</dd>
                      <dd>已离职</dd>
                      <dd class="right-no">小计</dd>
                    </dl>
                  </div>
                </li>
                <li style="width:279px">
                  <div style="height:24px;line-height:24px;border-bottom:1px solid #dfe6ec" class="right-no left-no top-no">部分未休完人数</div>
                  <div>
                    <dl>
                      <dd>在职</dd>
                      <dd>已调出</dd>
                      <dd>已离职</dd>
                      <dd class="right-no">小计</dd>
                    </dl>
                  </div>
                </li>
                <li style="width:279px">
                  <div style="height:24px;line-height:24px;border-bottom:1px solid #dfe6ec" class="right-no left-no top-no">全部未休人数</div>
                  <div>
                    <dl>
                      <dd>在职</dd>
                      <dd>已调出</dd>
                      <dd>已离职</dd>
                      <dd class="right-no">小计</dd>
                    </dl>
                  </div>
                </li>
                <li style="width:279px">
                  <div style="height:24px;line-height:24px;border-bottom:1px solid #dfe6ec" class="right-no left-no top-no">本年无年休人数</div>
                  <div>
                    <dl>
                      <dd>在职</dd>
                      <dd>已调出</dd>
                      <dd>已离职</dd>
                      <dd class="right-no">小计</dd>
                    </dl>
                  </div>
                </li>
                <li style="width:100px;" class="right-no">合计</li>
              </ul>
            </div>
            <div class="table-body">
              <ul class="clearfix" v-for="(item,index) in mainDatas" :key="item.id">
                <li style="width:50px" v-if="item.orgName !== '合计'">{{index + 1}}</li>
                <li style="width:200px" v-if="item.orgName !== '合计'">{{item.orgName}}</li>
                <li style="width:250px" v-if="item.orgName === '合计'">{{item.orgName}}</li>
                <li @click="skipDetail(item.orgName, item.allUseUpInserviceon, 1, 1, item.orgId)" :class="item.allUseUpInserviceon ? 'pointer' : ''" style="width:69px;">{{item.allUseUpInserviceon}}</li>
                <li @click="skipDetail(item.orgName, item.allUseUpOut, 1, 3, item.orgId)" :class="item.allUseUpOut ? 'pointer' : ''" style="width:69px;">{{item.allUseUpOut}}</li>
                <li @click="skipDetail(item.orgName, item.allUseUpDimission, 1, 2, item.orgId)" :class="item.allUseUpDimission ? 'pointer' : ''" style="width:72px;">{{item.allUseUpDimission}}</li>
                <li @click="skipDetail(item.orgName, item.allUseUpTotal, 1, 0, item.orgId)" :class="item.allUseUpTotal ? 'pointer' : ''" style="width:70px;">{{item.allUseUpTotal}}</li>
                <li @click="skipDetail(item.orgName, item.partNoUseUpInserviceon, 2, 1, item.orgId)" :class="item.partNoUseUpInserviceon ? 'pointer' : ''" style="width:69px;">{{item.partNoUseUpInserviceon}}</li>
                <li @click="skipDetail(item.orgName, item.partNoUseUpOut, 2, 3, item.orgId)" :class="item.partNoUseUpOut ? 'pointer' : ''" style="width:69px;">{{item.partNoUseUpOut}}</li>
                <li @click="skipDetail(item.orgName, item.partNoUseUpDimission, 2, 2, item.orgId)" :class="item.partNoUseUpDimission ? 'pointer' : ''" style="width:71px;">{{item.partNoUseUpDimission}}</li>
                <li @click="skipDetail(item.orgName, item.partNoUseUpTotal, 2, 0, item.orgId)" :class="item.partNoUseUpTotal ? 'pointer' : ''" style="width:70px;">{{item.partNoUseUpTotal}}</li>
                <li @click="skipDetail(item.orgName, item.allNoUseUpInserviceon, 3, 1, item.orgId)" :class="item.allNoUseUpInserviceon ? 'pointer' : ''" style="width:69px;">{{item.allNoUseUpInserviceon}}</li>
                <li @click="skipDetail(item.orgName, item.allNoUseUpOut, 3, 3, item.orgId)" :class="item.allNoUseUpOut ? 'pointer' : ''" style="width:69px;">{{item.allNoUseUpOut}}</li>
                <li @click="skipDetail(item.orgName, item.allNoUseUpDimission, 3, 2, item.orgId)" :class="item.allNoUseUpDimission ? 'pointer' : ''" style="width:71px;">{{item.allNoUseUpDimission}}</li>
                <li @click="skipDetail(item.orgName, item.allNoUseUpTotal, 3, 0, item.orgId)" :class="item.allNoUseUpTotal ? 'pointer' : ''" style="width:70px;">{{item.allNoUseUpTotal}}</li>
                <li @click="skipDetail(item.orgName, item.noAnnualLeaveInserviceon, 4, 1, item.orgId)" :class="item.noAnnualLeaveInserviceon ? 'pointer' : ''" style="width:69px;">{{item.noAnnualLeaveInserviceon}}</li>
                <li @click="skipDetail(item.orgName, item.noAnnualLeaveOut, 4, 3, item.orgId)" :class="item.noAnnualLeaveOut ? 'pointer' : ''" style="width:69px;">{{item.noAnnualLeaveOut}}</li>
                <li @click="skipDetail(item.orgName, item.noAnnualLeaveDimission, 4, 2, item.orgId)" :class="item.noAnnualLeaveDimission ? 'pointer' : ''" style="width:71px;">{{item.noAnnualLeaveDimission}}</li>
                <li @click="skipDetail(item.orgName, item.noAnnualLeaveTotal, 4, 0, item.orgId)" :class="item.noAnnualLeaveTotal ? 'pointer' : ''" style="width:70px;">{{item.noAnnualLeaveTotal}}</li>
                <li @click="skipDetail(item.orgName, item.total, 0, 0, item.orgId)" style="width:100px;" :class="item.total ? 'pointer' : ''" class="right-no">{{item.total}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--子页面-->
    <div v-else="">
      <el-row>
        <el-button
          size="mini"
          type="primary"
          @click="jumpDetail = false">返回</el-button>
      </el-row>
      <DetailAnnualMag/>
    </div>
    <!-- 导出列表 -->
    <form style="display:none" name="form" method="POST" target="_blank" ref="submitExcel" id="submitExcel" :action="hostBaseUrl+'/system/annual/leave/export'">
      <p>orgId: <input type="text" id="orgId" name="orgId" value="" /></p>
      <input type="submit" value="Submit"/>
    </form>
  </div>
</template>
<script>
// import { monthToString, toMonthEndTime } from 'assets/js/common'
import SalaryApi from 'static/api/wage/wage'
import { hostBaseUrl } from 'utils/config'
import { setToken, getToken, unsetToken } from 'assets/js/util'
import SearchDeptTree from 'components/SearchDeptTree'
import DetailAnnualMag from './detailAnnualMag'
export default {
  data () {
    return {
      jumpDetail: getToken('jumpFresh') ? getToken('jumpFresh') : false,
      orgDatas: {
        filterName: '',
        orgId: '',
        dataTree: [],
        showTree: false
      },
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
  beforeRouteLeave (to, from, next) {
    unsetToken('detailOrgId')
    unsetToken('detailUserStatus')
    unsetToken('detailType')
    setToken('jumpFresh', false)
    next()
    // remove()
  },
  watch: {
    jumpDetail (val) {
      setToken('jumpFresh', val)
    }
  },
  components: {
    SearchDeptTree, DetailAnnualMag
  },
  computed: {
    searchParams () {
      return {
        orgId: this.orgDatas.orgId ? this.orgDatas.orgId : 1
      }
    }
  },
  methods: {
    exportBtn () {
      document.getElementById('orgId').setAttribute('value', this.orgDatas.orgId ? this.orgDatas.orgId : 1)
      console.log(this.$refs.submitExcel)
      this.$refs.submitExcel.submit()
    },
    skipDetail (name, val, type, userStatus, orgId) {
      if (!val) return
      if (name === '合计') {
        setToken('detailType', type)
        setToken('detailUserStatus', userStatus)
        setToken('detailOrgId', this.orgDatas.orgId ? this.orgDatas.orgId : 1)
      } else {
        setToken('detailType', type)
        setToken('detailUserStatus', userStatus)
        setToken('detailOrgId', orgId)
      }
      this.jumpDetail = true
    },
    searchMainReportList () {
      SalaryApi.annualOverview(this.searchParams).then(res => {
        this.mainDatas = res.result
      })
    },
    // 设置默认搜索的时间范围为当前月开始和结束
    _getCurrentTime () {
      // this.mainSearchForm.startTime = monthToString(new Date()).split(' ')[0]
      // this.mainSearchForm.endTime = toMonthEndTime(new Date())
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
  .mainForm{
    max-height:600px;
    overflow-x: hidden;
    box-sizing: border-box;
    .table-div_box{
      border:1px solid #dfe6ec;
      width: 1468px;
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
            border-top:1px solid #dfe6ec;
            float:left;
            font-size:14px;
            text-align: center;
            box-sizing: border-box;
            line-height:32px;
            height:32px;
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
  .right-no{border-right:none!important;}
  .left-no{border-left:none!important;}
  .top-no{border-top:none!important;}
  .pointer{cursor: pointer;color: #ff7500}
  .pointer:hover{text-decoration: underline}
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
