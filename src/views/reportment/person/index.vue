<template>
<div class="container" @click="orgDatas.showTree = false">
  <el-form  class="mt-20">
    <div class="search-form_box clearfix">
      <div class="search-form_item">
        <search-dept-tree
        :orgDatas="orgDatas"
        />
      </div>
      <div class="search-form_item start-line">
        <el-date-picker
          v-model="mainForm.startTime"
          type="month"
          :clearable="true"
          placeholder="请选择开始时间"
          :picker-options="pickerOptions1">
        </el-date-picker>
      </div>
      <div class="search-form_item">
        <el-date-picker
          v-model="mainForm.endTime"
          type="month"
          :clearable="true"
          placeholder="请选择结束时间"
          :picker-options="pickerOptions2">
        </el-date-picker>
      </div>
      <div class="search-form_button pt-3">
        <el-button type="primary" size="small" @click="searchList">查询</el-button>
      </div>
    </div>
  </el-form>
  <h4 class="mt-20 move-h4">人员变化(环比)</h4>
  <div v-if="isShow===true" class="formWarp">
    <div class="changeForm" :style="{'width':(70*countNumber+410+20) +'px'}" >
      <el-row>
        <el-col style="width:70px" class="right-no left-no">序号</el-col>
        <el-col style="width:240px" class="right-no">机构</el-col>
        <el-col style="width:100px" class="">月份</el-col>
        <template>
          <el-col v-for="item in monthTitleList" :key="item.index" style="width:70px;" class="">{{item}}</el-col>
        </template>
      </el-row>
      <div v-for="(item,index) in monthCompareList" :key="item.index">
        <el-row>
          <el-col style="width:70px" class="right-no left-no" :style="{'line-height': 40*5+8+'px'}">{{index+1}}</el-col>
          <el-col style="width:240px" class="right-no" :style="{'line-height': 40*5+8+'px'}">{{item.orgName}}</el-col>
          <el-col style="width:100px" class="right-no">期初人数</el-col>
          <template>
            <el-col
              v-for="(i,index1) in item.earlyCountList"
              :key="index1"
              style="width:70px;"
              >
              <span v-if="item.earlyCountList.length>0">{{i || i===0 ? i :'-'}}</span>
            </el-col>
          </template>
        </el-row>
        <el-row>
          <el-col style="width:100px" class="right-no">增加人数</el-col>
          <template>
            <el-col
              v-for="(i,index2) in item.increaseCountList"
              :key="index2"
              style="width:70px;"
              class="">
              <span v-if="item.increaseCountList.length>0">{{i || i===0 ? i :'-'}}</span>
            </el-col>
          </template>
        </el-row>
        <el-row>
          <el-col style="width:100px" class="right-no">减少人数</el-col>
          <template>
            <el-col
              v-for="(i,index3) in item.reduceCountList"
              :key="index3"
              style="width:70px;"
             >
              <span  v-if="item.reduceCountList.length>0">{{i || i===0 ? i :'-'}}</span>
            </el-col>
          </template>
        </el-row>
        <el-row>
          <el-col style="width:100px" class="right-no">环比净增</el-col>
          <template>
            <el-col
              v-for="(i,index4) in item.netIncreaseList"
              :key="index4"
              style="width:70px;"
              >
              <span  v-if="item.netIncreaseList.length>0">{{i || i===0 ? i :'-'}}</span>
            </el-col>
          </template>
        </el-row>
        <el-row>
          <el-col style="width:100px" class="right-no">百分比(%)</el-col>
          <template>
            <el-col
              v-for="(i,index5) in item.monthPerList"
              :key="index5"
              style="width:70px;"
              >
              <span  v-if="item.monthPerList.length>0">{{i || i===0 ? i :'-'}}</span>
            </el-col>
          </template>
        </el-row>
      </div>
      <!-- 合计 -->
      <el-row>
        <el-col style="width:310px" class="right-no left-no" :style="{'line-height': 40*5+8+'px'}">合计</el-col>
        <el-col style="width:100px" class="" >期初人数</el-col>
        <template>
          <el-col
            v-for="(i,index6) in TearlyCountList"
            :key="index6"
            style="width:70px;"
            >
            <span  v-if="TearlyCountList.length>0">{{i || i===0 ? i :'-'}}</span>
          </el-col>
        </template>
      </el-row>
      <el-row>
        <el-col style="width:100px" class="">增加人数</el-col>
        <template>
          <el-col
            v-for="(i,index7) in TincreaseCountList"
            :key="index7"
            style="width:70px;"
           >
            <span  v-if="TincreaseCountList.length>0">{{i || i===0 ? i :'-'}}</span>
          </el-col>
        </template>
      </el-row>
      <el-row>
        <el-col style="width:100px" class="">减少人数</el-col>
        <template>
          <el-col
            v-for="(i,index8) in TreduceCountList"
            :key="index8"
            style="width:70px;"
           >
            <span  v-if="TreduceCountList.length>0">{{i || i===0 ? i :'-'}}</span>
          </el-col>
        </template>
      </el-row>
      <el-row>
        <el-col style="width:100px" class="">环比净增</el-col>
        <template>
          <el-col
            v-for="(i,index8) in TnetIncreaseList"
            :key="index8"
            style="width:70px;"
            >
            <span v-if="TnetIncreaseList.length>0">{{i || i===0 ? i :'-'}}</span>
          </el-col>
        </template>
      </el-row>
      <el-row>
        <el-col style="width:100px" class="">百分比(%)</el-col>
        <template>
          <el-col
            v-for="(i,index9) in TmonthPerList"
            :key="index9"
            style="width:70px;"
            >
           <span v-if="TmonthPerList.length>0"> {{i || i===0 ? i :'-'}}</span>
          </el-col>
        </template>
      </el-row>
    </div>
  </div>
  <div v-else class="formWarp">
    <div class="noForm">
      <el-row>
        <el-col :span="2" class="right-no bottom-no">序号</el-col>
        <el-col :span="3" class="right-no bottom-no">机构</el-col>
        <el-col :span="5" class="right-no bottom-no">月份</el-col>
        <el-col :span="1" class="right-no bottom-no">1月</el-col>
        <el-col :span="1" class="right-no bottom-no">2月</el-col>
        <el-col :span="1" class="right-no bottom-no">3月</el-col>
        <el-col :span="1" class="right-no bottom-no">4月</el-col>
        <el-col :span="1" class="right-no bottom-no">5月</el-col>
        <el-col :span="1" class="right-no bottom-no">6月</el-col>
        <el-col :span="1" class="right-no bottom-no">7月</el-col>
        <el-col :span="1" class="right-no bottom-no">8月</el-col>
        <el-col :span="1" class="right-no bottom-no">9月</el-col>
        <el-col :span="1" class="right-no bottom-no">10月</el-col>
        <el-col :span="1" class="right-no bottom-no">11月</el-col>
        <el-col :span="1" class="right-no bottom-no">12月</el-col>
        <el-col :span="2" class="bottom-no">累计</el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="">暂无数据</el-col>
      </el-row>
    </div>
  </div>
</div>
</template>

<script>
import SearchDeptTree from 'components/SearchDeptTree'
import { getChangeCircle } from 'static/api/report'
import { timeZeroToString } from 'assets/js/common'
export default {
  data () {
    return {
      orgDatas: {
        filterName: '',
        orgId: '',
        dataTree: [],
        showTree: false
      },
      mainForm: {
        startTime: '',
        endTime: ''
      },
      monthCompareList: [],
      compareVoTotalData: [],
      TearlyCountList: [],
      TincreaseCountList: [],
      TreduceCountList: [],
      TnetIncreaseList: [],
      TmonthPerList: [],
      monthTitleList: [],
      countNumber: '',
      isShow: false,
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      pickerOptions2: {
        disabledDate: (time) => {
          return time.getTime() < (this.mainForm.startTime).getTime() || time.getTime() > Date.now()
        }
      }
    }
  },
  computed: {
    params () {
      return {
        organizationId: this.orgDatas.orgId,
        startTime: this.mainForm.startTime ? timeZeroToString(this.mainForm.startTime) : '',
        endTime: this.mainForm.endTime ? timeZeroToString(this.mainForm.endTime) : ''
      }
    }
  },
  components: {
    SearchDeptTree
  },

  methods: {
    /* 搜索 */
    searchList () {
      this._getInfomation()
    },
    /* 获取信息 */
    _getInfomation () {
      getChangeCircle(this.params).then(data => {
        if (data.result) {
          this.isShow = true
          this.monthCompareList = data.result.monthCompareList
          /* 月份 */
          this.monthTitleList = data.result.monthTitleList
          this.countNumber = this.monthTitleList.length
          /* 合计 */
          this.compareVoTotalData = data.result.compareVoTotal
          /* 期初人数 */
          this.TearlyCountList = this.compareVoTotalData.earlyCountList
          /* 增加 */
          this.TincreaseCountList = this.compareVoTotalData.increaseCountList
          /* 减少 */
          this.TreduceCountList = this.compareVoTotalData.reduceCountList
          /* 环比 */
          this.TnetIncreaseList = this.compareVoTotalData.netIncreaseList
          /* 百分比 */
          this.TmonthPerList = this.compareVoTotalData.monthPerList
        }
      })
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
.formWarp{
  width:92%;
  overflow:auto;
  margin-left:60px;
  margin-bottom:40px;
}
.move-h4{
    color: #FF7500;
    margin:2% 0px 2% 0px;
    text-align:center;
}
.changeForm{
  border:1px solid #dfe6ec;
  height:670px;
  overflow-y:auto;
  .el-row{
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size:13px;
    .el-col{
      border:1px solid #dfe6ec;
    }
  }
}
.noForm{
  .el-row{
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size:13px;
    .el-col{
      border:1px solid #dfe6ec;
    }
  }

}
.right-no{border-right:none!important;}
.bottom-no{border-bottom:none!important;}
.left-no{border-left:none!important;}
.top-no{border-top:none!important;}
</style>
