<template>
  <div>
    <el-button type="primary" size="small" @click="goBack">返 回</el-button>
    <el-button type="primary" size="small" @click="exportMsg">导 出</el-button>
    <div class="top-margin mt-20">
      <span>姓名：{{idName}}</span>
      <span class="m-l-30">身份证号：{{idCardNumber}}</span>
    </div>
    <el-table
        :data="fundPaymentList"
        border>
        <el-table-column
            prop="handleMonth"
            label="缴纳月份">
        </el-table-column>
        <el-table-column
            prop="personalFundAmount"
            label="公积金（元）">
        </el-table-column>
        <el-table-column
            prop="orgName"
            label="缴纳公司">
        </el-table-column>
        <el-table-column
            prop="areaName"
            label="缴纳机构">
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
    <form style="display:none" name="form" method="POST" ref="submitExcel" id="submitExcel" :action="hostBaseUrl+'/funds/fund/payment/exportExcel'">
      <p>userId: <input type="text" id="userId" name="userId" value="" /></p>
      <input type="submit" value="Submit"/>
    </form>
  </div>
</template>

<script>
import { getFundPaymentList } from 'static/api/socialSecurity'
import Pagination from 'components/Pagination.vue'
import { hostBaseUrl } from 'utils/config'
export default {
  data () {
    return {
      hostBaseUrl: '',
      fundPaymentList: [],
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
    _getFundPaymentList () {
      let param = {
        userId: this.$route.params.Id,
        page: this.pageMsg.currentPage,
        size: this.pageMsg.pageSize
      }
      getFundPaymentList(param).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.fundPaymentList = data.result.records
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
      this._getFundPaymentList()
    },
    handleCurrentChange (currentPage) {
      this.pageMsg.currentPage = currentPage
      this._getFundPaymentList()
    },
    goBack () {
      history.go(-1)
    }
  },
  created () {
    this._getFundPaymentList()
    this.hostBaseUrl = hostBaseUrl
  }
}
</script>

<style lang="less" scoped>
.top-margin{
    margin:20px 0px;
}
.m-l-30{
    margin-left:30px;
}
</style>
