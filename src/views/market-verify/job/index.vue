<template>
  <div class="container">
      <el-form :model="jobForm">
        <div class="search-form_box clearfix">
          <div class="search-form_item">
            <el-input v-model="jobForm.keyword" placeholder="请输入姓名/身份证号" @keyup.enter.native="searchJobList"></el-input>
          </div>
          <div class="search-form_item start-line">
            <el-date-picker
              v-model="jobForm.startTime"
              type="date"
              placeholder="提交开始时间">
            </el-date-picker>
          </div>
          <div class="search-form_item">
            <el-date-picker
              v-model="jobForm.endTime"
              :picker-options="pickerOptions"
              type="date"
              placeholder="提交结束时间">
            </el-date-picker>
          </div>
          <div class="search-form_button pt-3">
            <el-button type="primary" size="small" @click="searchJobList">查询</el-button>
          </div>
        </div>
      </el-form>
     <el-row class="mt-20">
     <el-col :span="24">
      <div class="tab-wrap clearfix">
        <ul class="edit-tab clearfix">
          <li @click="emptyClearMsg" v-show="permission.indexOf('干部新增我发起的') !=-1">
             <router-link :to="'/market-verify/job/addVerifyJob'">新增干部</router-link>
          </li>
          <li @click="emptyClearMsg" v-show="permission.indexOf('干部免除我发起的') !=-1">
            <router-link :to="'/market-verify/job/moveVerifyJob'">免除干部</router-link>
          </li>
        </ul>
      </div>
    </el-col>
  </el-row>
      <router-view></router-view>
    </div>
</template>
<script>
/* import {mapGetters} from 'vuex' */
import { getExmine } from 'assets/js/exmine'
export default {
  data () {
    return {
      jobForm: {
        keyword: '',
        startTime: '',
        endTime: ''
      }
    }
  },
  computed: {
    pickerOptions () {
      return {
        disabledDate: (time) => {
          return new Date(time).getTime() < new Date(this.jobForm.startTime).getTime()
        }
      }
    },
    /* ...mapGetters(['getPersonnalBaseStatusSelect', 'getpermission']), */
    permission () {
      return getExmine().marketVerifyJob
    }
  },
  methods: {
    setSerchList (boolean) {
      this.$store.dispatch('setMarketVerifyJobSearch', this.jobForm)
      this.$store.commit('SET_MARKETVERIFYJOB_CLICKED', boolean)
    },
    searchJobList () {
      this.setSerchList(true)
    },
    emptyClearMsg () {
      this.jobForm.keyword = ''
      this.jobForm.startTime = ''
      this.jobForm.endTime = ''
      this.setSerchList(false)
    }
  },
  filters: {},
  created () {
    this.setSerchList(false)
    console.log(this.permission)
  }
}
</script>

<style scoped lang="less">
  .el-select{width: 100%}
</style>
