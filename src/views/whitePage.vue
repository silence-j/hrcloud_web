<template>
  <div></div>
  <!-- <div style="height: 700px">
   <el-table
     v-loading="loading"
     :data="tableData"
     style="width: 100%;height: 100%">
   </el-table>
   </div>-->
</template>

<script>
// import { browserRedirect } from 'assets/js/jumpLink'
export default {
  name: 'whitePage',
  data () {
    return {
      // loading: true
    }
  },
  methods: {
    browser () {
      let token = this.$route.query.copyToken
      let host = document.location.host
      const apiConfig = {
        'test.hr.zcabc.com': 'http://test.hr.zcabc.com',
        'hr.zhongcaicloud.com': 'https://hr.zhongcaicloud.com',
        'hr.zcabc.com': 'http://hr.zcabc.com',
        'localhost:8089': 'http://hr.zcabc.com',
        'hr-pre.zhongcaicloud.com': 'https://hr-pre.zhongcaicloud.com',
        'hr-mobile.zcabc.com': 'http://hr-mobile.zcabc.com'
      }
      const mobileApiConfig = {
        'test.hr.zcabc.com': 'http://test.hr.zcabc.com/mobile',
        'hr.zhongcaicloud.com': 'https://hr.zhongcaicloud.com/mobile',
        'hr.zcabc.com': 'http://hr.zcabc.com/mobile',
        'localhost:8089': 'http://hr.zcabc.com/mobile',
        'hr-pre.zhongcaicloud.com': 'https://hr-pre.zhongcaicloud.com/mobile'
      }
      let https = apiConfig[host]
      let http = mobileApiConfig[host]
      var sUserAgent = navigator.userAgent.toLowerCase()
      if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
        // 跳转移动端页面
        // window.location.href = 'http://hr-mobile.zcabc.com/#/home?copyToken=' + token
        window.location.href = http + '/#/home?copyToken=' + token
      } else {
        // 跳转pc端页面
        window.location.href = https + '/#/staffDetail?copyToken=' + token
      }
    }
  },
  created () {
    this.browser()
  }
}
</script>

<style scoped>
  body {
    margin: 0;
  }
</style>
