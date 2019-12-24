<template>
  <div class="entry-box">
     <el-form :model="entryForm">
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
    <div class="tab-wrap clearfix mt-20">
      <ul class="edit-tab clearfix">
        <li @click="clearSearchData">
          <router-link to="/verify/entry/owner">我发起的</router-link>
        </li>
        <li @click="clearSearchData" v-if="getCurrentRoleGroups.indexOf('headRecruitHr') !== -1">
          <router-link to="/verify/entry/employment?active=first">录用</router-link>
        </li>
        <li @click="clearSearchData" v-if="getCurrentRoleGroups.indexOf('recruitLeader') !== -1">
          <router-link to="/verify/entry/recheck?active=first">录用复核</router-link>
        </li>
        <li @click="clearSearchData" v-if="getCurrentRoleGroups.indexOf('entryHr') !== -1">
          <router-link to="/verify/entry/entry?active=first">入职</router-link>
        </li>
        <li @click="clearSearchData" v-if="getCurrentRoleGroups.indexOf('reviewHr') !== -1">
          <router-link to="/verify/entry/review-entry?active=first">入职复核</router-link>
        </li>
      </ul>
    </div>
     <div class="mt-20">
        <router-view/>
      </div>
  </div>
</template>
<script>
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
      this.$store.dispatch('setVerifyEntrySearch', this.entryForm)
      this.$store.commit('SET_VERIFY_ENTRY_CLICKED', boolean)
    },
    searchList () {
      this.setSearchList(true)
      // this.$store.dispatch('setVerifyEntrySearch', this.entryForm)
    }
  },
  created () {
    this.setSearchList(false)
  }
}
</script>
