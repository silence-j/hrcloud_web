<template>
  <div class="mt-20" >
    <p class="base-sec-title">薪酬管理</p>
    <el-table :data="lookData" border >
        <el-table-column prop="type" label="调薪方式">
        <template slot-scope="scope">
            <!-- <span>{{scope.row.typeText}}}</span> -->
            <span>{{scope.row.typeStr}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="effectiveDate" label="生效日期" ></el-table-column>
        <el-table-column prop="standard" label="工资结构" width="300px">
          <template slot-scope="scope">
            <span v-if="scope.row.isProbation && scope.row.isProbation === 1">{{scope.row.probationStandard}}</span>
            <span v-else="">{{scope.row.standard}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payrolCompany" label="发放公司"></el-table-column>
        <el-table-column prop="remark" label="调薪说明"></el-table-column>
        <el-table-column prop="changeVal" label="变化幅度">
        <template slot-scope="scope">
            <span v-if="scope.row.changeVal < 0"><em style="color: #FF7500;" class="el-icon-caret-bottom"></em> {{scope.row.changeVal}}</span>
            <span v-if="scope.row.changeVal === 0">{{scope.row.changeVal}}</span>
            <span v-if="scope.row.changeVal > 0"><em style="color: #FF7500;" class="el-icon-caret-top"></em> {{scope.row.changeVal}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="createTime" label="操作时间" ></el-table-column>
        <el-table-column prop="creator" label="操作人"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import SalaryApi from 'static/api/wage/wage'
export default {
  data () {
    return {
      lookData: []
    }
  },
  methods: {
    _getSalaryList () {
      SalaryApi.lookSalary({ size: 10000, userId: this.$route.params.baseId }).then(data => {
        if (data.result) {
          this.lookData = data.result
        }
      })
    }
  },
  created () {
    this._getSalaryList()
    this.$store.commit('SET_ACTIVE_ROUTER', '9')
  }
}
</script>
<style scoped lang="less">
.base-sec-title::after{
  left: 90px;
}
.base-sec-title{
  font-size:14px;
  width:99%;
}

</style>
