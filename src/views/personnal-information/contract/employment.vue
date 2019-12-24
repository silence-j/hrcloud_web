<template>
  <div class="mt-20">
    <el-tabs type="border-card" @tab-click="handleClick" v-model="activeName">
      <!-- 待签订 -->
      <el-tab-pane label="待签订" name="1">
         <wait-employ v-if="activeName=='1'"/>
      </el-tab-pane>
      <!-- 待解除 -->
      <el-tab-pane label="待解除" name="2">
        <stop-employ v-if="activeName=='2'"/>
      </el-tab-pane>
      <!-- 全部 -->
      <el-tab-pane label="全部" name="3">
        <all-employ v-if="activeName=='3'"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import waitEmploy from '../../homepage/message/waitEmploy'
import stopEmploy from '../../homepage/message/stopEmploy'
import allEmploy from '../../homepage/message/allEmploy'
export default {
  data () {
    return {
      activeName: '1',
      searchFlag: false,
      employmentForm: {}
    }
  },
  components: {
    waitEmploy,
    stopEmploy,
    allEmploy
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
      if (tab.name === '3') {
        this.$store.commit('SET_CONTRACT_ALL_SELECT', true)
      } else {
        this.$store.commit('SET_CONTRACT_ALL_SELECT', false)
      }
      this.employmentForm.keyword = ''
      this.employmentForm.status = ''
    },
    _setDefaultRouter () {
      let routerActive = this.$route.query.active
      this.activeName = routerActive || '1'
      this.$router.push({ name: this.$route.name,
        query: {
          active: routerActive || '1'
        } })
      if (routerActive === '3') {
        this.$store.commit('SET_CONTRACT_ALL_SELECT', true)
      }
      this.employmentForm.keyword = ''
      this.employmentForm.status = ''
    },
    _getSearchParams () {
      this.$bus.$on('contractSearch', (data, search) => {
        this.employmentForm = data
        this.searchFlag = search
      })
    },
    beforeDestroy () {
      this.$bus.$off('contractSearch')
    }
  },
  created () {
    this._setDefaultRouter()
    this._getSearchParams()
    if (this.$route.query.active) {
      this.activeName = this.$route.query.active
    }
  }
}
</script>
<style scoped lang="less">
.el-select{
  width:100%;
}
.checkbox-box{
  .el-checkbox{
    &:last-child{
      margin-left:0px;
    }
  }
}
</style>
