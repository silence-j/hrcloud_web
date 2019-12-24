<template>
<div class="entry-box">
       <div class="entry-btn_wrap">
        <el-button type="primary" size="mini" @click="addMarketUser" v-show="permission.indexOf('新增')!=-1">新增</el-button>
      </div>
      <el-form :model="entryForm" class="mt-20">
       <div class="search-form_box clearfix">
         <div class="search-form_item">
           <el-input v-model="entryForm.keyword" placeholder="请输入姓名/身份证号" @keyup.enter.native="searchList"></el-input>
         </div>
        <!-- <div class="search-form_item">
           <el-input v-model="entryForm.idKeyword" placeholder="请输入身份证号" @keyup.enter.native="searchList"></el-input>
         </div> -->
         <div class="search-form_item start-line">
           <el-date-picker
             v-model="entryForm.startTime"
             type="date"
             clearable
             placeholder="开始时间">
           </el-date-picker>
         </div>
         <div class="search-form_item">
           <el-date-picker
             v-model="entryForm.endTime"
             type="date"
             clearable
             :picker-options="pickerOptions"
             placeholder="结束时间">
           </el-date-picker>
         </div>
         <div class="search-form_button pt-3">
           <el-button type="primary" size="mini" @click="searchList">查询</el-button>
          <!-- <el-button size="mini">高级查询</el-button> -->
         </div>
       </div>
      </el-form>
    <div class="tab-wrap mt-20">
      <ul class="edit-tab clearfix">
        <li  @click="clearSearchData">
          <router-link to="/market-verify/entry/owner">我发起的</router-link>
        </li>
        <li v-if="getCurrentRoleGroups.indexOf('entryMarket') !== -1"  @click="clearSearchData">
          <router-link to="/market-verify/entry/entry">入职审核</router-link>
        </li>
        <li v-if="getCurrentRoleGroups.indexOf('entryMarketReview') !== -1" @click="clearSearchData">
          <router-link to="/market-verify/entry/headquarters">总部审核</router-link>
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
      entryForm: {
        keyword: '',
        startTime: '',
        endTime: '',
        idKeyword: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getCurrentRoleGroups']),
    permission () {
      return getExmine().marketVerifyEntry
    },
    pickerOptions () {
      return {
        disabledDate: (time) => {
          return new Date(time).getTime() < new Date(this.entryForm.startTime).getTime()
        }
      }
    }
  },
  methods: {
    clearSearchData () {
      this.entryForm.keyword = ''
      this.entryForm.startTime = ''
      this.entryForm.endTime = ''
      this.entryForm.idKeyword = ''
      this.setSearchList(false)
    },
    setSearchList (boolean) {
      this.$store.dispatch('setMarketVerifyEntrySearch', this.entryForm)
      this.$store.commit('SET_MARKET_VERIFY_ENTRY_CLICKED', boolean)
    },
    searchList () {
      this.setSearchList(true)
    },
    addMarketUser () {
    //  this.$store.commit('SET_SALARY_ID', '')
      // this.$store.commit('SET_INFO_BY_ORG_ID', '')
      this.$store.commit('SET_INFO_BY_ORG_ID', '')
      this.$store.commit('SET_SALARY_ID', '')
      this.$store.commit('SET_HEALTH_ARR', '')
      this.$router.push('/market-verify/entry/add?come=MarketVerifyEntryOwner&comeRouter=' + this.$route.name)
    }
  },
  created () {
    this.setSearchList(false)
  }
}
</script>
<style lang="less" scoped>
.entry-box{}
</style>
