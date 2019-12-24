<template>
  <div class="container">
    <el-row>
       <el-button type="primary" @click="addReport" size="small" v-show="(permission.indexOf('新增'))!==-1">新增</el-button>
    </el-row>
    <el-form class="mt-20">
        <el-row :gutter="22" type="flex">
          <el-col :span='4'>
            <el-input v-model="postForm.name" placeholder="请输入报表名称" @keyup.enter.native="searchPostList"></el-input>
            <el-input v-model="postForm.name" placeholder="请输入报表名称" style="display: none"></el-input>
          </el-col>
          <el-col class="pt-3">
            <el-button type="primary" size="small" @click="searchPostList">查询</el-button>
          </el-col>
        </el-row>
    </el-form>
    <el-table
      class="mt-20"
      :data="postListDatas"
      border
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        width="60">
      </el-table-column>

      <el-table-column
        label="报表名称"
        prop="name">
      </el-table-column>

      <el-table-column
        label="报表描述"
        prop="remark">
      </el-table-column>

      <el-table-column
        prop="startTime"
        width="190px"
        label="开始时间">
      </el-table-column>

      <el-table-column
        prop="endTime"
        width="190px"
        label="截止时间">
      </el-table-column>

      <el-table-column
        prop="createName"
        label="创建人">
      </el-table-column>

      <el-table-column
        label="创建时间"
        width="190px"
        prop="createTime">
      </el-table-column>

      <el-table-column
        label="操作"
        width="180px"
        fixed="right"
        >
        <template slot-scope="scope">
          <div class="operation">
            <span @click="editReport(scope.row)" v-show="(permission.indexOf('编辑'))!==-1">编辑</span>
            <span @click="seeDetail(scope.row)" v-show="(permission.indexOf('查看'))!==-1">查看</span>
            <span @click="_deteleReport(scope.row)" v-show="(permission.indexOf('删除'))!==-1">删除</span>
            <!--<template v-if="(new Date(scope.row.startTime) > new Date()) && (scope.row.startTime != null)">-->
              <!--<span @click="editReport(scope.row)">编辑</span>-->
            <!--</template>-->
          </div>
        </template>
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
import { getManageReportList, deteleReport } from 'static/api/temporary/report-manage'
import Pagination from 'components/Pagination.vue'
import { getExmine } from 'assets/js/exmine'
export default {
  data () {
    return {
      loading: false,
      list: [],
      postListDatas: [],
      pageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      postForm: {
        name: ''
      }
    }
  },
  components: {
    Pagination
  },
  computed: {
    postParams () {
      return {
        page: this.pageMsg.currentPage,
        size: this.pageMsg.pageSize,
        name: this.postForm.name
      }
    },
    permission () {
      return getExmine().reportManage
    }
  },
  methods: {
    handleSizeChange (pageSize) {
      this.pageMsg.pageSize = pageSize
      this._getReportList()
    },
    handleCurrentChange (currentPage) {
      this.pageMsg.currentPage = currentPage
      this._getReportList()
    },
    seeDetail (row) {
      this.$router.push({
        name: '报表中心详情',
        params: {
          id: row.id,
          name: row.name,
          endTime: row.endTime,
          tableName: row.tableName,
          userType: '1'
        }
      })
    },
    addReport () {
      this.$router.push({ path: '/temporary/report-add?type=add' })
    },
    editReport (row) {
      let time = row.startTime.replace(/-/g, '/')
      if ((new Date(time) > new Date()) && (time != null)) {
        this.$router.push({ path: '/temporary/report-edit?id=' + row.id + '&type=edit' })
      } else {
        this.$router.push({ path: '/temporary/report-edit?id=' + row.id + '&type=edit&over=' + 1 })
      }
    },
    _deteleReport (row) {
      this.$confirm('确定要删除该报表？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let preload = {
          id: row.id
        }
        deteleReport(preload).then(data => {
          if (data.result) {
            this.$message.success('删除成功!')
            setTimeout(() => {
              this._getReportList()
            }, 400)
          }
        })
      }).catch(() => {})
    },
    searchPostList () {
      this.handleCurrentChange(1)
      // this._getReportList()
    },
    _getReportList () {
      getManageReportList(this.postParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.postListDatas = data.result.records
            /*  console.log(this.postListDatas) */
          }
          this.pageMsg.total = data.result.total
        }
      })
    }
  },
  created () {
    this._getReportList()
    /* console.log(this.permission) */
  }
}
</script>

<style>

</style>
