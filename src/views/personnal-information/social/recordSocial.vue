<template>
  <div>
    <el-button type="primary" size="small" @click="goBack">返 回</el-button>
    <el-button type="primary" size="small" @click="exportMsg">导 出</el-button>
    <br/>
    <div class="top-margin">
      <span>姓名：{{idName}}</span>
      <span class="m-l-30">身份证号：{{idCardNumber}}</span>
    </div>
    <el-table
      :data="SocialpaymentList"
      border
      style="width: 100%">
      <el-table-column
          prop="handleMonth"
          label="缴纳月份">
      </el-table-column>
      <el-table-column
          prop="personalPensionAmount"
          label="养老保险（元）">
      </el-table-column>
      <el-table-column
          prop="personalMedicalAmount"
          label="医疗保险（元）">
      </el-table-column>
      <el-table-column
          prop="personalUnemploymentAmount"
          label="失业保险（元）">
      </el-table-column>
      <el-table-column
          prop="personalAmount"
          label="合计">
      </el-table-column>
      <el-table-column
          prop="nature"
          label="户籍性质">
      </el-table-column>
      <el-table-column
          prop="orgName"
          label="参保公司">
      </el-table-column>
      <el-table-column
          prop="areaName"
          label="参保机构">
      </el-table-column>
    </el-table>
    <pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageMsg.currentPage"
      :page-sizes="pageMsg.pageSizes"
      :page-size="pageMsg.pageSize"
      :total="pageMsg.total">
    </pagination>
     <!-- 导出列表 -->
    <form style="display:none" name="form" method="POST" ref="submitExcel" id="submitExcel" :action="hostBaseUrl+'/funds/insurance/payment/exportExcel'">
      <p>userId: <input type="text" id="userId" name="userId" value="" /></p>
      <input type="submit" value="Submit"/>
    </form>
  </div>
</template>

<script>
import { getSocialpaymentList } from 'static/api/socialSecurity'
import Pagination from 'components/Pagination.vue'
import { hostBaseUrl } from 'utils/config'
export default {
  data () {
    return {
      hostBaseUrl: '',
      SocialpaymentList: [],
      pageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      idCardNumber: '',
      idName: ''
    }
  },
  components: {
    Pagination
  },
  methods: {
    /* 导出列表 */
    exportMsg () {
      document.getElementById('userId').setAttribute('value', this.$route.params.Id)
      this.$refs.submitExcel.submit()
    },
    /* 获取列表信息 */
    _getSocialpaymentList () {
      let param = {
        userId: this.$route.params.Id,
        page: this.pageMsg.currentPage,
        size: this.pageMsg.pageSize
      }
      getSocialpaymentList(param).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.SocialpaymentList = data.result.records
          }
          this.pageMsg.total = data.result.total
        }
        if (data.resMap) {
          this.idCardNumber = data.resMap.idCardNumber
          this.idName = data.resMap.name
        }
      })
    },
    /** 分页**/
    handleSizeChange (pageSize) {
      this.pageMsg.pageSize = pageSize
      this._getSocialpaymentList()
    },
    handleCurrentChange (currentPage) {
      this.pageMsg.currentPage = currentPage
      this._getSocialpaymentList()
    },
    goBack () {
      history.go(-1)
    }
  },
  created () {
    this._getSocialpaymentList()
    this.hostBaseUrl = hostBaseUrl
  }
}
</script>

<style lang="less" scoped>
.top-margin{
    margin:20px 2px;
    font-size:15px;
}
.m-l-30{
    margin-left:30px;
}
</style>
