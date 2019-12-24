<template>
  <el-row>
    <el-col :span="24">
      <div class="tab-wrap clearfix">
        <ul class="edit-tab clearfix">
          <li v-for="(item,index) in data"
          :key="index"><router-link
          :to="item.path" :key="index"
           @click.native="clearVuexData(item)">{{item.name}}
           </router-link>
           </li>
        </ul>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  methods: {
    clearVuexData (item) {
      this.$emit('clearVuexData', item)
    }
  }
}
</script>
<style scoped lang="less">
</style>
