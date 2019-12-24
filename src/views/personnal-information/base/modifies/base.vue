<template>
  <div class="update-base-box">
  <el-row class="mt-20">
    <el-button type="primary" size="mini" @click="goBack">返回</el-button>
  </el-row>
  <el-row class="mt-20">
  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="劳动人事信息" name="first">
      <Labor v-if="activeName === 'first'" />
    </el-tab-pane>
    <el-tab-pane label="个人档案" name="second">
      <Personnal v-if="activeName === 'second'" />
    </el-tab-pane>
    <el-tab-pane label="人员状态变化" name="third" >
      <user-status v-if="activeName === 'third'"/>
    </el-tab-pane>
  </el-tabs>
  </el-row>
  </div>
</template>
<script>
import Labor from './labor'
import Personnal from './personnal'
import UserStatus from './userStatus'
export default {
  data () {
    return {
      activeName: 'first',
      actives: []
    }
  },
  components: {
    Labor,
    Personnal,
    UserStatus
  },
  methods: {
    goBack () {
      const { id: baseId, status } = this.$route.params
      this.$router.push({
        name: 'BaseLabor',
        params: {
          baseId,
          status
        },
        query: this.$route.query
      })
    },
    handleClick (tab, event) {
      console.log('dada')
      const { id, status } = this.$route.params
      const routerName = this.$route.name
      this.$router.push({
        name: routerName,
        params: {
          id,
          status
        },
        query: {
          key: this.activeName,
          orgId: this.$route.query.orgId,
          come: this.$route.query.come
        }
      })
    }
  },
  created () {
    this.activeName = this.$route.query.key
  }
}
</script>
