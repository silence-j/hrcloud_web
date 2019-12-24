<template>
<div>
  <el-dialog @close="showTable = false;$emit('close')" :title="form.typeData + '' === '2' ? '原在校生入职' : '原社会人员入职'" class="work-table" width="600px" :visible.sync="showTable">
    <el-form :data="form">
      <el-row>
        <el-col :span="20">
          <el-form-item label="入职类型:">{{form.typeData + '' === '2' ? '在校生入职' : '社会人员入职'}}</el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.typeData + '' === '2'">
        <el-col :span="10">
          <el-form-item label="实习生开始时间:">{{form.exercitationBeginTime}}</el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="实习生结束时间:">{{form.exercitationEndTime}}</el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.typeData + '' === '2'">
        <el-col :span="10">
          <el-form-item label="实习期工资:">{{form.exercitationSalary}}</el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="实习期津贴:">{{form.exercitationAllowance}}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="试用期开始时间:">{{form.probationBeginTime}}</el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="试用期结束时间:">{{form.probationEndTime}}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="试用期工资标准:">{{form.probationSalary}}</el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="转正后工资标准:">{{form.formalSalary}}</el-form-item>
      </el-row>
    </el-form>
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
  },
  mounted () {
    console.log('form:', this.form)
  }
}
</script>

<style scoped>

</style>
