<template>
    <el-dialog title="提醒"
    :before-close="handleClose"
    :visible.sync="dialogVisible"
    width="800px">
        <div class="entry-msgtitle"><i class="fa fa-exclamation-circle"></i> 该人员曾在中财就职</div>
        <el-table
          :data="entryDatas"
          border
          class="mt-20"
          tooltip-effect="dark"
          >
          <el-table-column
            label="序号"
            type="index"
            width="60">
          </el-table-column>
          <el-table-column
            label="主体"
            prop="companyName"
            width="150px">
          </el-table-column>
          <el-table-column
            label="部门"
            prop="orgName"
            min-width="150px">
          </el-table-column>
          <el-table-column
            prop="postName"
            label="岗位"
            min-width="150px">
          </el-table-column>
          <el-table-column
            prop="entryDate"
            label="入职时间"
            min-width="120px">
          </el-table-column>
          <el-table-column
            prop="dimissionDateComfirmed"
            label="离职时间"
            min-width="120px">
          </el-table-column>
        </el-table>
    </el-dialog>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    entryDatas: {
      type: Array
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleColse')
    }
  }
}
</script>
