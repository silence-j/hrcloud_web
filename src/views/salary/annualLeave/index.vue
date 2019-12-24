<template>
  <div>
    <div class="tab-wrap">
      <ul class="edit-tab clearfix">
        <li>
          <router-link to="/salary/annualLeave/annualMag">年假管理</router-link>
        </li>
        <li>
          <router-link to="/salary/annualLeave/annualRecord">年假记录</router-link>
        </li>
        <li>
          <router-link to="/salary/annualLeave/peopleCount">按人统计</router-link>
        </li>
        <li>
          <router-link to="/salary/annualLeave/annualOverview">年假概况</router-link>
        </li>
      </ul>
    </div>
    <div class="mt-20">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {
  },
  components: {
  },
  filters: {
  },
  mounted () {
  },
  watch: {},
  methods: {},
  created () {
    // this.hostBaseUrl = hostBaseUrl
  }
}
</script>

<style scoped lang="less">
  @import "~assets/less/homePage";
  @import "~assets/less/page";
</style>
