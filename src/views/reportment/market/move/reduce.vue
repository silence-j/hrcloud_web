<template>
  <div class="mt-20">
    <el-table
      :data="reduceData"
      border
      empty-text="请选择部门"
      >
      <el-table-column
        prop="name"
        label="姓名"
        width="120px">
      </el-table-column>
      <el-table-column
        prop="idNumber"
        label="身份证号"
        width="180px">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="80px">
      </el-table-column>
      <el-table-column
        prop="birthdate"
        label="出生日期"
        width="140px">
      </el-table-column>
      <el-table-column
        prop="diploma"
        label="学历"
        width="100px">
      </el-table-column>
      <el-table-column
        prop="graduationSchool"
        label="毕业院校"
        width="150px">
      </el-table-column>
      <el-table-column
        prop="specialty"
        label="专业"
        width="120px">
      </el-table-column>
      <el-table-column
        prop="telephone"
        label="手机号"
        width="120px">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="joinWorkTime"-->
        <!--label="参加工作时间"-->
        <!--width="160px">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="moveDate"-->
        <!--width="120px"-->
        <!--label="异动时间"-->
        <!--&gt;-->
      <!--</el-table-column>-->
      <el-table-column
        prop="intoCompanyTime"
        label="进入公司时间"
        width="160px">
      </el-table-column>
      <el-table-column
        prop="dimissionTime"
        label="离开公司时间"
        width="160px">
      </el-table-column>
      <el-table-column
        prop="agoLevelOne"
        label="异动前一级组织"
        width="160px">
      </el-table-column>
        <el-table-column
        prop="agoDepartment"
        label="异动前部门"
        width="160px">
      </el-table-column>
       <el-table-column
        prop="agoPost"
        label="异动前岗位"
        width="160px">
      </el-table-column>
       <el-table-column
        prop="rearLevelOne"
        label="异动后一级组织"
        width="160px">
      </el-table-column>
      <el-table-column
        prop="rearDepartment"
        label="异动后部门"
        width="160px">
      </el-table-column>
      <el-table-column
        prop="rearPost"
        label="异动后岗位"
        width="160px">
      </el-table-column>
      <el-table-column
        prop="decreaseCause"
        min-width="120px"
        label="减少原因">
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
  </div>
</template>

<script>
import { getSelectMonthlyMove } from 'static/api/report'
import Pagination from 'components/Pagination.vue'
export default {
  data () {
    return {
      marketMoveForm: {
        type: '',
        startTime: '',
        endTime: '',
        orgIds: ''
      },
      searchFlag: false,
      reduceData: [],
      pageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      }
    }
  },
  methods: {
    /** 分页**/
    handleSizeChange (pageSize) {
      this.pageMsg.pageSize = pageSize
      this._getSelectMonthlyMove()
    },
    handleCurrentChange (currentPage) {
      this.pageMsg.currentPage = currentPage
      this._getSelectMonthlyMove()
    },
    _getSelectMonthlyMove () {
      if (this.marketMoveForm.orgIds) {
        getSelectMonthlyMove(this.searchMoveParams).then(res => {
          if (res.result) {
            if (res.result.records) {
              this.reduceData = res.result.records
            }
            this.pageMsg.total = res.result.total
          } else {
            this.reduceData = []
            this.pageMsg.total = 0
          }
        })
      }
    },
    _getSearchData () {
      this.$bus.$on('marketReportSearch', data => {
        this.marketMoveForm.type = data.type
        this.marketMoveForm.startTime = data.startTime
        this.marketMoveForm.endTime = data.endTime
        this.marketMoveForm.orgIds = data.orgIds
        this.searchFlag = data.searchFlag
      })
    }
  },
  computed: {
    searchMoveParams () {
      return {
        type: 2,
        orgIds: this.marketMoveForm.orgIds,
        startTime: this.marketMoveForm.startTime,
        endTime: this.marketMoveForm.endTime,
        page: this.pageMsg.currentPage,
        size: this.pageMsg.pageSize
      }
    }
  },
  watch: {
    searchFlag (value) {
      if (value) {
        this._getSelectMonthlyMove()
        this.searchFlag = false
      }
    }
  },
  components: {
    Pagination
  },
  // beforeDestroy () {
  //   this.$bus.$off('marketReportSearch')
  // },
  created () {
    this._getSearchData()
    this._getSelectMonthlyMove()
  }
}
</script>

<style lang="less" scoped>
  .move-h5{
    color: #009688;
    margin-bottom:20px;
    font-size: 14px;
    text-align:center;
  }
</style>
