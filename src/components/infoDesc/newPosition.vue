<template>
  <div>
    <el-dialog @close="showTable = false;$emit('close')" :title="form ? '新转正信息' : '提示'" class="work-table" width="600px" :visible.sync="showTable">
      <el-form v-if="form" :data="form">
        <el-row>
          <el-col :span="20">
            <el-form-item label="转正时间:">{{form.positiveTime}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="工资标准:">{{form.formalSalary}}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span v-else>暂无数据</span>
      <p style="text-align: center;margin-top: 15px">
        <el-button @click="showTable = false;$emit('close')">关闭</el-button>
      </p>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['form'],
  data () {
    return {
      showTable: true
    }
  }
}
</script>

<style scoped></style>
