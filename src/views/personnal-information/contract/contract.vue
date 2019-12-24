<template>
<div class="mt-20">
  <el-tabs type="border-card" @tab-click="handleClick" v-model="activeName">
   <!-- 1待签订 -->
   <el-tab-pane label="待签订" name="1" >
      <wait-contract ref="_wait" v-show="activeName=='1'"/>
   </el-tab-pane>
     <!-- 2待解除 -->
   <el-tab-pane label="待解除" name="2" >
      <stop-contract ref="_stop" v-show="activeName=='2'"/>
   </el-tab-pane>
     <!-- 3待续签 -->
   <el-tab-pane label="待续签" name="3" >
      <renewal-contract ref="_renewal" v-show="activeName=='3'"/>
   </el-tab-pane>
   <!-- 4全部 -->
   <el-tab-pane label="全部" name="4" >
      <all-contract ref="_all" v-show="activeName=='4'"/>
   </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
import waitContract from '../../homepage/message/waitContract'
import stopContract from '../../homepage/message/stopContract'
import renewalContract from '../../homepage/message/renewalContract'
import allContract from '../../homepage/message/allContract'
export default {
  data () {
    return {
      activeName: '1',
      searchFlag: false,
      contractSearchForm: {}
    }
  },
  components: {
    waitContract,
    stopContract,
    renewalContract,
    allContract
  },
  watch: {
    searchFlag (value) {
      if (value) {
        this.searchFlag = false
      }
    }
  },
  methods: {
    handleClick (tab) {
      this.activeName = tab.name
      this.$router.push({ name: this.$route.name, query: { active: this.activeName } })
      if (tab.name === '4') {
        this.$store.commit('SET_CONTRACT_ALL_SELECT', true)
      } else {
        this.$store.commit('SET_CONTRACT_ALL_SELECT', false)
      }
      this.contractSearchForm.keyword = ''
      this.contractSearchForm.endDate = ''
      this.contractSearchForm.status = ''
    },
    _setDefaultRouter () {
      let routerActive = this.$route.query.active
      this.activeName = routerActive || '1'
      this.$router.push({ name: this.$route.name,
        query: {
          active: routerActive || '1'
        } })
      if (routerActive === '4') {
        this.$store.commit('SET_CONTRACT_ALL_SELECT', true)
      }
      this.contractSearchForm.keyword = ''
      this.contractSearchForm.endDate = ''
      this.contractSearchForm.status = ''
    },
    _getSearchParams () {
      this.$bus.$on('contractSearch', (data, search) => {
        this.contractSearchForm = data
        this.searchFlag = search
      })
    }
  },
  beforeDestroy () {
    console.log('oooo')
    if (!this.$route.path.includes('/personnel-information/contract')) {
      this.$refs._wait._setPage()
      this.$refs._stop._setPage()
      this.$refs._all._setPage()
      this.$refs._renewal._setPage()
    }
    this.$bus.$off('contractSearch')
  },
  created () {
    this._getSearchParams()
    if (this.$route.query.active) {
      this.activeName = this.$route.query.active
    }
  }
}
</script>
