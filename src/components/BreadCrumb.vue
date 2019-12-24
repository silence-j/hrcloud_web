<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
      :to="index<data.length-1?item.path: ''"
      v-for="(item,index) in data"
      :key="index">{{item.name}}
      <span v-if="item.name === '员工基本信息劳动人事信息' || item.name === '员工基本信息劳动个人档案' ||
      item.name === '员工基本信息操作记录' || item.name === '员工基本信息变动记录' ||
item.name === '员工基本信息职务信息' || item.name === '员工基本信息劳动' || item.name === '员工基本信息社保参保' ||
item.name === '员工基本信息公积金' || item.name === '员工基本信息薪酬' || item.name === '员工基本信息备注' || item.name === '员工信息更新' || item.name === '员工信息更正'" v-html="getName()"></span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { getToken } from 'assets/js/util'
export default {
  props: {
    data: {
      type: Array
    }
  },
  methods: {
    getName () {
      return `- ${getToken('updateName')}`
    }
  }
}
</script>
<style lang="less" scoped>
</style>
