<template>
  <div class="salary">
    <div class="search-data mt-20">
      <div class="table-setting-warp">
        <el-table :data="searchList" border>
          <el-table-column label="序号" width="60px">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="userName"></el-table-column>
          <el-table-column label="一级组织" prop="levelOne"></el-table-column>
          <el-table-column label="部门" prop="orgName"></el-table-column>
          <el-table-column label="可休年假" prop="vacationDaysAll"></el-table-column>
          <el-table-column label="已休年假" prop="vacationDaysUsed"></el-table-column>
          <el-table-column label="剩余年假" prop="vacationDays"></el-table-column>
          <el-table-column prop="userStatus" label="人员状态" width="120px">
            <template slot-scope="scope">
              <span>{{scope.row.userStatus | filterStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userStatus" label="是否一把手" width="120px">
            <template slot-scope="scope">
              <span>{{scope.row.topLeader | filterTop}}</span>
            </template>
          </el-table-column>
          <el-table-column label="任免时间" prop="inOfficeDate"></el-table-column>
          <el-table-column label="年份" prop="year"></el-table-column>
        </el-table>
      </div>
      <el-pagination
        v-if="page.totalCount > 10"
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.page"
        :page-size="page.pageSize"
        layout="total, prev, pager, next, sizes, jumper"
        :total="page.totalCount">
      </el-pagination>
    </div>
    <!-- 导出列表 -->
    <form style="display:none" name="form" method="POST" target="_blank" ref="submitExcel" id="submitExcel" :action="hostBaseUrl+'/system/export/annual/leave/list'">
      <p>keyword: <input type="text" id="keyword" name="keyword" value="" /></p>
      <p>searchOrgIds: <input type="text" id="searchOrgIds" name="searchOrgIds" value="1" /></p>
      <p>userStatus: <input type="text" id="userStatus" name="userStatus" value="" /></p>
      <p>topLeader: <input type="text" id="topLeader" name="topLeader" value="" /></p>
      <p>yearStart: <input type="text" id="yearStart" name="yearStart" value="" /></p>
      <p>yearEnd: <input type="text" id="yearEnd" name="yearEnd" value="" /></p>
      <input type="submit" value="Submit"/>
    </form>
  </div>
</template>

<script>
import SalaryApi from 'static/api/wage/wage'
import { hostBaseUrl } from 'utils/config'
import { getToken } from 'assets/js/util'
// import { getExmine } from 'assets/js/exmine'
export default {
  data () {
    return {
      row: {},
      hostBaseUrl: '',
      page: {
        page: 1,
        pageSize: 10,
        totalCount: 0
      },
      searchList: []
    }
  },
  computed: {
    params () {
      return {
        page: this.page.page,
        size: this.page.pageSize,
        orgId: getToken('detailOrgId'),
        userStatus: getToken('detailUserStatus') ? getToken('detailUserStatus') : null,
        type: getToken('detailType')
      }
    }
  },
  components: {},
  filters: {
    filterStatus (status) {
      if (status === 1) {
        status = '在职'
      } else if (status === 2) {
        status = '已离职'
      } else if (status === 3) {
        status = '已调出'
      }
      return status
    },
    filterTop (val) {
      if (val === 0) {
        val = '不是'
      } else if (val === 1) {
        val = '是'
      }
      return val
    }
  },
  mounted () {
    this._getWageList()
  },
  methods: {
    // 查询年假列表
    _getWageList () {
      SalaryApi.detailAnnualOverview(this.params).then(data => {
        if (data.result) {
          this.searchList = data.result.records
          this.page.totalCount = data.result.total
        }
      })
    },
    handleSizeChange (val) {
      this.page.page = 1
      this.page.pageSize = val
      this._getWageList()
    },
    handleCurrentChange (val) {
      this.page.page = val
      this._getWageList()
    }
  },
  created () {
    this.hostBaseUrl = hostBaseUrl
  }
}
</script>

<style scoped lang="less">
  @import "~assets/less/homePage";
  @import "~assets/less/page";
  /*@import "~assets/less/base";*/
</style>
