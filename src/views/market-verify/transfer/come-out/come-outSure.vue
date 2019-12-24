<template>
<div class="sure-box">
 <el-table
          :data="headListDatas"
          border
          tooltip-effect="dark"
          style="max-width: 100%;min-width:700px;overflow-y: auto"
          >
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
            width="220px">
          </el-table-column>
           <el-table-column
             label="原一级组织"
             prop="levelOne"
             width="220px">
           </el-table-column>
          <el-table-column
            label="原单位"
            prop="companyName"
            min-width="160px">
          </el-table-column>
          <el-table-column
            label="原部门"
            prop="oldDeptName"
            width="150px">
          </el-table-column>
          <el-table-column
            label="原岗位"
            prop="postName"
            width="155px">
          </el-table-column>
          <el-table-column
            label="调动日期"
            prop="changeTime"
            width="170px">
          </el-table-column>
          <el-table-column
            label="调动说明"
            prop="changeType"
            width="185px">
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="185px">
            <template slot-scope="scope">
              {{scope.row.createTime}}
            </template>
          </el-table-column>
          <el-table-column
           width="120px"
           fixed="right"
            label="操作">
            <template slot-scope="scope">
              <div class="operation">
               <span @click="sureTransferMsg(scope.row)">确认</span>
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
        actType: 'changeMarketOutside',
        keyword: this.getMarketVerifyTransferSearchArr.keyword,
        startTime: this.getMarketVerifyTransferSearchArr.startTime ? timeZeroToString(this.getMarketVerifyTransferSearchArr.startTime) : '',
        endTime: this.getMarketVerifyTransferSearchArr.endTime ? timeZeroToString(this.getMarketVerifyTransferSearchArr.endTime) : '',
        page: this.lownerPageMsg.currentPage,
        size: this.lownerPageMsg.pageSize
      }
      getHeadList(headParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.headListDatas = data.result.records
          }
          this.lownerPageMsg.total = data.result.total
        }
      })
    },
    sureTransferMsg (row) {
      this.$confirm('确认' + row.name + '的调动吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let headParams = {
          actType: 'changeMarketOutside',
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
    ...mapGetters(['getMarketVerifyTransferSearchArr', 'getMarketVerifyTransferClick'])
  },
  watch: {
    getMarketVerifyTransferClick (val) {
      if (val) {
        this._getHeadList()
      }
      this.$store.commit('SET_MARKETVERIFYTRANSFER_CLICKED', false)
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
