<template>
<div class="leave-box">
    <div class="search-form_box clearfix mt-20">
         <div class="search-form_item">
          <el-input @keyup.enter.native="searchLeaveList" v-model="leaveForm.keyword" placeholder="请输入姓名/身份证号"></el-input>
        </div>
          <div class="search-form_item start-line">
          <el-date-picker
            v-model="leaveForm.startTime"
            type="date"
            clearable
            placeholder="开始时间">
          </el-date-picker>
        </div>
         <div class="search-form_item">
          <el-date-picker
            v-model="leaveForm.endTime"
            type="date"
            clearable
            :picker-options="pickerOptions"
            placeholder="结束时间">
          </el-date-picker>
        </div>
        <div class="search-form_button pt-3">
          <el-button type="primary" size="mini" @click="searchLeaveList">查询</el-button>
        </div>
    </div>
     <div class="tab-wrap mt-20">
      <ul class="edit-tab clearfix">
        <li @click="clearSearchData">
          <router-link to="/market-verify/leave/owner">我发起的</router-link>
        </li>
        <li @click="clearSearchData" v-show="getCurrentRoleGroups.indexOf('outMarketHr')!==-1">
          <router-link to="/market-verify/leave/market-ceo">市场总部CEO</router-link>
        </li>
        <li @click="clearSearchData" v-show="permission.indexOf('总部确认')!==-1">
          <router-link to="/market-verify/leave/market-sure">总部确认</router-link>
        </li>
      </ul>
    </div>
    <div class="mt-20">
        <router-view/>
    </div>
</div>
</template>
<script>
import { getExmine } from 'assets/js/exmine'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      leaveForm: {
        keyword: '',
        startTime: '',
        endTime: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getCurrentRoleGroups']),
    pickerOptions () {
      return {
        disabledDate: (time) => {
          return new Date(time).getTime() < new Date(this.leaveForm.startTime).getTime()
        }
      }
    },
    permission () {
      return getExmine().marketVerifyLeave
    }
  },
  methods: {
    // 切换路由清空搜索条件
    clearSearchData () {
      this.leaveForm.keyword = ''
      this.leaveForm.startTime = ''
      this.leaveForm.endTime = ''
      this.setSearchList(false)
    },
    setSearchList (boolean) {
      this.$store.dispatch('setMarketVerifyLeaveSearch', this.leaveForm)
      this.$store.commit('SET_MARKETVERIFY_CLICKED', boolean)
    },
    searchLeaveList () {
      this.setSearchList(true)
    }
  },
  created () {
    this.setSearchList(false)
  }
}
</script>
