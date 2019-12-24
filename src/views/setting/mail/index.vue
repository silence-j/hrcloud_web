<template>
  <div class="mail-box">
    <div class="btn-box">
      <el-button type="primary" size="small" @click="addMail">新 增</el-button>
    </div>
    <div class="search-form_box clearfix mt-20">
         <div class="search-form_item">
          <el-input @keyup.enter.native="searchMailList"
          v-model="mailForm.keyword" placeholder="请输入搜索关键字"></el-input>
        </div>
       <div class="search-form_item">
          <el-select
            v-model="mailForm.enabled"
            placeholder="请选择模板的状态"
            @change="setEnableNull"
           >
            <el-option label="全部" :value="null"></el-option>
            <el-option label="使用中" value="1"></el-option>
            <el-option label="已停用" value="0"></el-option>
          </el-select>
        </div>
      <div class="search-form_button pt-3">
        <el-button type="primary" size="mini" @click="searchMailList">查询</el-button>
      </div>
      </div>
    <div class="tab-wrap mt-20">
      <ul class="edit-tab clearfix">
        <li @click="clearSearchData" v-if="permission.indexOf('面试模板管理')!=-1">
          <router-link to="/setting/mail-template/interview">面试邀请模板</router-link>
        </li>
        <li @click="clearSearchData" v-if="permission.indexOf('offer模板管理')!=-1">
          <router-link to="/setting/mail-template/offer">offer模板</router-link>
        </li>
      </ul>
    </div>
    <div class="mt-20">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { getExmine } from 'assets/js/exmine'
export default {
  data () {
    return {
      mailForm: {
        keyword: '',
        enabled: null
      }
    }
  },
  computed: {
    permission () {
      return getExmine().sysMail
    }
  },
  methods: {
    clearSearchData () {
      this.mailForm.keyword = ''
      this.mailForm.enabled = null
      this.$bus.$emit('searchForm', this.mailForm)
      // this.setSearchList(false)
    },
    addMail () {
      let routeName = this.$route.name
      if (routeName === 'MailInterview') {
        this.$router.push({ name: 'InterviewAdd' })
      } else if (routeName === 'MailOffer') {
        this.$router.push({ name: 'OfferAdd' })
      }
    },
    setSearchList (boolean) {
      this.$store.dispatch('setSettingMailSearch', this.mailForm)
      this.$store.commit('SET_SETTING_MAIL_CLICKED', boolean)
    },
    searchMailList () {
      this.$bus.$emit('searchForm', this.mailForm, true)
      // this.setSearchList(true)
    },
    // " "的时候把值设置为null
    setEnableNull (value) {
      if (!value) {
        this.mailForm.enabled = null
      }
    }
  },
  created () {
    // this.setSearchList(false)
  }
}
</script>
