<template>
  <div id="pagination" class="mt-20" v-if="total>10">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number
    },
    pageSize: {
      type: Number
    },
    pageSizes: {
      type: Array
    },
    total: {
      type: Number
    }
  },
  methods: {
    handleCurrentChange (currentPage) {
      this.$emit('current-change', currentPage)
    },
    handleSizeChange (pageSize) {
      this.$emit('size-change', pageSize)
    }
  }
}
</script>

<style scoped lang="less">
.el-pagination{
  text-align: right;
}
</style>
