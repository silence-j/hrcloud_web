<template>
  <div>
    <el-dialog @close="showTable = false;$emit('close')" title="提示" class="work-table" width="600px" :visible.sync="showTable">
      <div>
        暂无数据
      </div>
      <p style="text-align: center;margin-top: 15px">
        <el-button @click="showTable = false;$emit('close')">关闭</el-button>
      </p>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showTable: true
    }
  }
}
</script>

<style scoped></style>
