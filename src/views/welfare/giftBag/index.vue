<template>
  <div>
    <!--普通管理人员权限看到的页面-->
    <GrantMg :type="'节日'" v-if="permission.indexOf('上报者')==-1 && permission.indexOf('管理者')!==-1"></GrantMg>
    <!--管理者权限进去看到的页面-->
    <ReportMg :type="'节日'" v-if="permission.indexOf('上报者')!==-1 && permission.indexOf('管理者')==-1"></ReportMg>
    <!--既是管理人员又是普通人员权限进入看到的页面-->
    <lenTabs :indexLiProp="indexLi" :activeTabIndexProp="activeTabIndex" v-if="permission.indexOf('上报者')!=-1 && permission.indexOf('管理者')!=-1" :tabDatas="msgRemind" @getItem="getWhichPage">
      <div slot="tableBox1">
        <GrantMg :type="'节日'"></GrantMg>
      </div>
      <div slot="tableBox2">
        <ReportMg :type="'节日'" ></ReportMg>
      </div>
    </lenTabs>
  </div>
</template>

<script>
import GrantMg from './grantMg'
import ReportMg from './reportMg'
import lenTabs from 'components/lenTabs'
import { getExmine } from 'assets/js/exmine'
export default {
  data () {
    return {
      activeTabIndex: this.$route.query.gift ? 2 : null,
      indexLi: this.$route.query.gift ? 1 : null,
      power: 3,
      msgRemind: [
        { name: '发放管理', unReadCount: 0 },
        { name: '上报管理', unReadCount: 0 }
      ]
    }
  },
  computed: {
    permission () {
      return getExmine().welfareGiftBag
    }
  },
  components: {
    GrantMg,
    ReportMg,
    lenTabs
  },
  methods: {
    getWhichPage (val) {
      console.log(val)
    }
  },
  created () {
    console.log('permission', this.permission)
  }
}
</script>

<style scoped>

</style>
