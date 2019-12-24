<template>
  <div class="container">
    <el-form>
      <el-row :gutter="22"  type="flex">
        <el-col :span='8'>
          <el-input v-model="fundsForm.keyword" placeholder="输入关键词" @keyup.enter.native="searchFundList"></el-input>
        </el-col>
        <el-col :span='8' v-if="getFundAllSelect">
          <el-select v-model="fundsForm.status" clearable placeholder="状态">
            <el-option
              v-for="item in fundsStatueOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span='8'>
          <el-date-picker
            v-model="fundsForm.startTime"
            type="date"
            placeholder="选择开始日期">
          </el-date-picker>
        </el-col>
        <span class="lineSearch"> - </span>
        <el-col :span='8'>
          <el-date-picker
            v-model="fundsForm.endTime"
            type="date"
             :picker-options="pickerOptions"
            placeholder="选择结束日期">
          </el-date-picker>
        </el-col>
      <el-col class="pt-3">
        <el-button type="primary" size="small" @click="searchFundList">查询</el-button>
      <!--  <el-button size="mini" @click="deepLevelAcceptSearch.deepLevelSearchVisible = true">高级查询</el-button> -->
        <el-button size="mini" @click="chooseData.deepSearchVisible = true">高级查询</el-button>
      </el-col>
    </el-row>
  </el-form>
  <br/>
  <el-button type="primary" size="small" v-show="permission.indexOf('标准调整') !=-1" @click="StandardBtn">标准调整</el-button>
  <el-button type="primary" size="small" v-show="permission.indexOf('导出') !=-1 && getFundAllSelect" @click="ExportFundMsg" >导 出</el-button>
  <br/>
  <el-row class="mt-20">
    <el-col :span="24">
      <div class="tab-wrap clearfix">
        <ul class="edit-tab clearfix">
          <li @click="providMsg('waitProviden')">
            <router-link :to="'/personnel-information/providentFund/waitProviden'">待办理</router-link>
          </li>
          <li @click="providMsg('stopProviden')">
            <router-link :to="'/personnel-information/providentFund/stopProviden'">待停缴</router-link>
          </li>
          <li @click="providMsg('allProviden')">
            <router-link :to="'/personnel-information/providentFund/allProviden'">全部</router-link>
          </li>
        </ul>
      </div>
    </el-col>
  </el-row>
  <router-view></router-view>
  <!-- 导出列表 -->
  <form style="display:none" name="form" method="POST" ref="submitExcel" id="submitExcel" :action="hostBaseUrl+'/funds/fund/exportFund'">
    <p>startTime: <input type="text" id="startTime" name="startTime" value="" /></p>
    <p>endTime: <input type="text" id="endTime" name="endTime" value="" /></p>
    <p>keyword: <input type="text" id="keyword" name="keyword" value="" /></p>
    <p>status: <input type="text" id="status" name="status" value="" /></p>
    <input type="submit" value="Submit"/>
  </form>

  <!--高级搜索和筛选字段的dialog-->
  <choose-column-search
  :chooseData="chooseData"
  @sureDeepSearch="sureDeepSearch"
  />
</div>
</template>
<script>
import { timeZeroToString } from 'assets/js/common'
import { hostBaseUrl } from 'utils/config'
import { mapGetters } from 'vuex'
import { getExmine } from 'assets/js/exmine'
import ChooseColumnSearch from 'components/ChooseColumnSearch'
export default {
  data () {
    return {
      chooseData: {
        chooseVisible: false,
        deepSearchVisible: false,
        filedType: 'fund',
        fieldList: [],
        selectedWordArr: [{ prop: '', op: '', value: '', width: '', searchFlag: '' }]
      },
      hostBaseUrl: '',
      fundsForm: {
        keyword: '',
        status: '',
        startTime: '',
        endTime: ''
      },
      fundsStatueOption: [
        { value: 0, label: '不缴纳' },
        { value: 1, label: '待办理' },
        { value: 2, label: '缴纳中' },
        { value: 9, label: '已停缴' }
      ],
      showStatus: false
    }
  },
  components: {
    /*  DeepLevelSearch, */
    ChooseColumnSearch
  },
  computed: {
    pickerOptions () {
      return {
        disabledDate: (time) => {
          return new Date(time).getTime() < new Date(this.fundsForm.startTime).getTime()
        }
      }
    },
    ...mapGetters(['getFundSearchArr', 'getFundAllSelect', 'getFundAllSelect', 'getChooseFieldList', 'getChooseVis']),
    permission () {
      return getExmine().infoAllProviden
    }
  },
  methods: {
    // 选择带应聘职位
    _getUserFiled () {
      this.$store.commit('SET_CHOOSE_CHECK', true)
    },
    // 高级搜索
    sureDeepSearch (deepSearchArr) {
      this.chooseData.deepSearchVisible = false
      let options = []
      deepSearchArr.forEach(item => {
        if (item.width) {
          options.push({
            field: item.width,
            op: item.op,
            value: item.value,
            searchFlag: item.searchFlag
          })
        }
      })
      this.options = options
      this.$store.commit('SET_DEEP_SEARCH_OPTIONS', options)
    },
    /* 标准调整 */
    StandardBtn () {
      this.$router.push({ path: '/personnel-information/providentFund/standard' })
    },
    setSerchList (boolean) {
      this.$store.dispatch('setFundsSearch', this.fundsForm)
      this.$store.commit('SET_FUND_CLICKED', boolean)
    },
    searchFundList () {
      this.setSerchList(true)
    },
    /* 导出列表 */
    ExportFundMsg () {
      document.getElementById('startTime').setAttribute('value', this.getFundSearchArr.startTime ? timeZeroToString(this.getFundSearchArr.startTime) : '')
      document.getElementById('endTime').setAttribute('value', this.getFundSearchArr.endTime ? timeZeroToString(this.getFundSearchArr.endTime) : '')
      document.getElementById('keyword').setAttribute('value', this.getFundSearchArr.keyword)
      document.getElementById('status').setAttribute('value', this.getFundSearchArr.status ? this.getFundSearchArr.status : null)
      /*  console.log(document.getElementById('status').getAttribute('value'))
      console.log(this.$refs.submitExcel) */
      this.$refs.submitExcel.submit()
    },
    providMsg (val) {
      this.fundsForm.keyword = ''
      this.fundsForm.status = ''
      this.fundsForm.startTime = ''
      this.fundsForm.endTime = ''
      this.setSerchList(false)
      if (val === 'allProviden') {
        this.$store.commit('SET_FUNDALL_SELECT', true)
      } else if (val === 'waitProviden') {
        this.$store.commit('SET_FUNDALL_SELECT', false)
      } else if (val === 'stopProviden') {
        this.$store.commit('SET_FUNDALL_SELECT', false)
      }
    },
    _jugeStatus () {
      if (this.$route.name === '全部公积金') {
        this.$store.commit('SET_FUNDALL_SELECT', true)
      } else if (this.$route.name === '待办理') {
        this.$store.commit('SET_FUNDALL_SELECT', false)
      } else if (this.$route.name === '待停缴') {
        this.$store.commit('SET_FUNDALL_SELECT', false)
      }
    }
  },
  watch: {
    getChooseVis (value) {
      if (value) {
        this.chooseData.chooseVisible = true
        this.chooseData.fieldList = this.getChooseFieldList
      }
      this.$store.commit('SET_CHOOSE_VIS', false)
    }
  },
  created () {
    this.hostBaseUrl = hostBaseUrl
    this._jugeStatus()
    this.setSerchList(false)
  }
}
</script>

<style>
.el-select{
  width:100%;
}
.lineSearch{
  margin-top:10px;
}
</style>
