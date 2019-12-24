<template>
  <div class="mt-20">
    <el-table
      :data="removeData"
      border
      style="width: 100%"
      empty-text="请选择部门"
      class="center">
      <el-table-column
        prop="name"
        label="姓名"
        class="bgcolor-none"
        width="121px">
      </el-table-column>
      <el-table-column
        prop="idNumber"
        label="身份证号"
        width="200px">
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
        width="140px">
      </el-table-column>
      <el-table-column
        prop="telephone"
        label="手机号"
        width="120px">
      </el-table-column>
      <el-table-column
        prop="moveDate"
        width="120px"
        label="异动时间"
        >
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="intoCompanyTime"-->
        <!--label="进入公司时间"-->
        <!--width="150px">-->
      <!--</el-table-column>-->
       <el-table-column
        prop="agoLevelOne"
        label="异动前一级组织"
        width="150px"
        >
      </el-table-column>
        <el-table-column
        prop="agoDepartment"
        label="异动前部门"
        width="130px"
        >
      </el-table-column>
       <el-table-column
        prop="agoPost"
        label="异动前岗位"
        width="130px">
      </el-table-column>
       <el-table-column
        prop="rearLevelOne"
        label="异动后一级组织"
        width="150px"
        >
      </el-table-column>
      <el-table-column
        prop="rearDepartment"
        label="异动后部门"
         width="130px"
       >
      </el-table-column>
      <el-table-column
        prop="rearPost"
        label="异动后岗位"
         width="130px"
        >
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
import { getReportMove } from 'static/api/report/index'
import { timeZeroToString } from 'assets/js/common'
import Pagination from 'components/Pagination.vue'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      removeData: [],
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
      this._getMoveReportDatas()
    },
    handleCurrentChange (currentPage) {
      this.pageMsg.currentPage = currentPage
      this._getMoveReportDatas()
    },
    _getMoveReportDatas () {
      setTimeout(() => {
        getReportMove(this.monthMoveParams).then(res => {
          if (res.result) {
            if (res.result.records) {
              this.removeData = res.result.records
            }
            this.pageMsg.total = res.result.total
          } else {
            this.removeData = []
            this.pageMsg.total = 0
          }
        })
      }, 400)
    }
  },
  computed: {
    ...mapGetters(
      ['reportMoveDeptId', 'reportMoveStartTime', 'reportMoveEndTime', 'getMainReportClick']
    ),
    monthMoveParams () {
      return {
        startTime: this.reportMoveStartTime ? timeZeroToString(this.reportMoveStartTime).split(' ')[0] : '',
        endTime: this.reportMoveEndTime ? timeZeroToString(this.reportMoveEndTime) : '',
        organizationId: this.reportMoveDeptId,
        page: this.pageMsg.currentPage,
        size: this.pageMsg.pageSize,
        type: 3
      }
    }
  },
  watch: {
    getMainReportClick (val) {
      if (val) {
        this.handleCurrentChange(1)
      }
      this.$store.commit('SET_MAIN_REPORT_CLICK', false)
    }
  },
  components: {
    Pagination
  },
  created () {
    this._getMoveReportDatas()
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
