<template>
<div class="sure-box">
  <el-table
    :data="headListDatas"
    border>
    <el-table-column
      label="序号"
      type="index"
      width="60">
    </el-table-column>
    <el-table-column
      label="姓名"
      prop="name"
      width="160px">
    </el-table-column>
    <el-table-column
      label="身份证号"
      prop="idNo"
      width="200px">
    </el-table-column>
    <el-table-column
      label="部门"
      prop="deptName"
      width="170px">
    </el-table-column>
    <el-table-column
      label="岗位"
      width="170px"
      prop="postName">
    </el-table-column>
    <el-table-column
      label="联系方式"
      prop="telephone"
      width="120px">
    </el-table-column>
    <el-table-column
      label="离职日期"
      prop="outTime"
      width="120px">
    </el-table-column>
    <el-table-column
      label="创建时间"
      width="175px">
      <template slot-scope="scope">
        {{scope.row.createTime}}
      </template>
    </el-table-column>
    <el-table-column
      label="离职说明"
      prop="outType">
    </el-table-column>
    <el-table-column
      label="状态"
      width="155px">
      <template slot-scope="scope">
        <div v-if ="scope.row.realityEndTime === null">
          待审批
        </div>
        <div v-else>
          <div v-if ="scope.row.reason === ''">
            <span>已同意</span>
          </div>
          <div v-else-if ="scope.row.reason === '撤销操作'">
            <span>已撤销</span>
          </div>
          <div v-else>
            <el-tooltip placement="top" effect="light">
              <div slot="content" style="width: 130px;height: 55px;overflow: auto;">{{scope.row.reason}}</div>
              <span>不同意</span>
            </el-tooltip>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      fixed="right"
      width="130px">
      <template slot-scope="scope">
        <div class="operation">
          <span @click="sureLeaveMsg(scope.row)">确认</span>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <pagination
  @size-change="handleLownerSizeChange"
  @current-change="handleLownerCurrentChange"
  :current-page="lownerPageMsg.currentPage"
  :page-sizes="lownerPageMsg.pageSizes"
  :page-size="lownerPageMsg.pageSize"
  :total="lownerPageMsg.total">
  </pagination>
</div>
</template>
<script>
import { getHeadList, sureHeadConfirm } from 'static/api/exmine/exmine'
import { timeZeroToString } from 'assets/js/common'
import Pagination from 'components/Pagination'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      headListDatas: [],
      lownerPageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      }
    }
  },
  methods: {
    _getHeadList () {
      let headParams = {
        actType: 'outMarket',
        keyword: this.getMarketVerifyLeaveSearchArr.keyword,
        startTime: this.getMarketVerifyLeaveSearchArr.startTime ? timeZeroToString(this.getMarketVerifyLeaveSearchArr.startTime) : '',
        endTime: this.getMarketVerifyLeaveSearchArr.endTime ? timeZeroToString(this.getMarketVerifyLeaveSearchArr.endTime) : '',
        page: this.lownerPageMsg.currentPage,
        size: this.lownerPageMsg.pageSize
      }
      getHeadList(headParams).then(data => {
        if (data.result) {
          this.headListDatas = data.result.records
          this.lownerPageMsg.total = data.result.total
        }
      })
    },
    sureLeaveMsg (row) {
      this.$confirm('确认' + row.name + '离职吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let headParams = {
          actType: 'outMarket',
          id: row.id
        }
        sureHeadConfirm(headParams).then(data => {
          this.$message.success('确认成功')
          setTimeout(() => {
            this._getHeadList()
          }, 200)
        })
      }).catch(() => {})
    },
    handleLownerSizeChange (pageSize) {
      this.lownerPageMsg.pageSize = pageSize
      this._getHeadList()
    },
    handleLownerCurrentChange (currentPage) {
      this.lownerPageMsg.currentPage = currentPage
      this._getHeadList()
    }
  },
  computed: {
    ...mapGetters(['getMarketVerifyLeaveSearchArr', 'getMarketVerifyLeaveClick'])
  },
  watch: {
    getMarketVerifyLeaveClick (val) {
      if (val) {
        this.handleLownerCurrentChange(1)
      }
      this.$store.commit('SET_MARKETVERIFY_CLICKED', false)
    }
  },
  components: {
    Pagination
  },
  created () {
    this._getHeadList()
  }
}
</script>
