<template>
  <div class="account-add-box">
    <el-row>
      <el-button type="primary" size="mini" @click="goBack">返 回</el-button>
      <el-button type="primary" size="mini" @click="addAccount">保 存</el-button>
    </el-row>
    <el-row class="mt-20">
      <detail/>
    </el-row>
  </div>
</template>
<script>
import Detail from './detail'
export default {
  components: {
    Detail
  },
  methods: {
    goBack () {
      this.$router.push('/setting/number-setting')
    },
    addAccount () {}
  }
}
</script>

<style scoped lang="less">
</style>
