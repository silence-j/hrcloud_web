<template>
  <div class="container">
      <el-form class="mt-20">
        <el-row :gutter="22" type="flex">
          <el-col :span='4'>
            <el-input v-model="postForm.name" placeholder="请输入报表名称" @keyup.enter.native="searchPostList"></el-input>
            <el-input v-model="postForm.name" placeholder="请输入报表名称" style="display: none"></el-input>
          </el-col>
          <el-col class="pt-3">
            <el-button type="primary" @click="searchPostList" size="small">查询</el-button>
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
        label="截止时间"
        prop="endTime">
      </el-table-column>

      <el-table-column
        prop="createName"
        label="创建人">
      </el-table-column>

      <!--<el-table-column-->
        <!--prop="createDate"-->
        <!--label="最后一次上报时间">-->
      <!--</el-table-column>-->

      <el-table-column
        label="操作"
        fixed="right"
         width="150">
        <template slot-scope="scope">
          <div class="operation">
            <template v-if="(new Date(scope.row.endTime.replace(/-/g, '/')) >= new Date())&&(new Date(scope.row.startTime.replace(/-/g, '/')) <= new Date())">
              <span @click="_downLoadExcel(scope.row)"  v-show="(permission.indexOf('下载'))!==-1">下载模板</span>
              <span @click="reportUpload(scope.row)" v-show="(permission.indexOf('上报'))!==-1">上报</span>
            </template>
            <template v-if="(new Date(scope.row.endTime.replace(/-/g, '/')) < new Date())">
              <span @click="seeDetail(scope.row)" v-show="(permission.indexOf('查看'))!==-1">查看详情</span>
            </template>
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
    <form  style="display:none" name="form" method="POST" ref="submitExcel" :action="hostBaseUrl+'/report/temporaryReport/downloadTemplate'">
      <p>name: <input type="text" id="name" name="name" value="" /></p>
      <p>tableName: <input type="text" id="tableName" name="tableName" value="" /></p>
      <input type="submit" value="Submit"  />
    </form>
  </div>
</template>
<script>
import { getReportList } from 'static/api/temporary/report-manage'
import Pagination from 'components/Pagination.vue'
import { getExmine } from 'assets/js/exmine'
import { hostBaseUrl } from 'utils/config'
export default {
  data () {
    return {
      hostBaseUrl: '',
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
      return getExmine().reportMange2
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
          userType: '2'
        }
      })
    },
    reportUpload (row) {
      this.$router.push({
        name: '报表中心上报',
        params: {
          id: row.id,
          name: row.name,
          endTime: row.endTime,
          tableName: row.tableName
        }
      })
    },
    searchPostList () {
      this.handleCurrentChange(1)
      // this._getReportList()
    },
    _getReportList () {
      getReportList(this.postParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.postListDatas = data.result.records
          }
          this.pageMsg.total = data.result.total
        }
      })
    },
    _downLoadExcel (row) {
      document.getElementById('name').setAttribute('value', row.name)
      document.getElementById('tableName').setAttribute('value', row.tableName)
      this.$refs.submitExcel.submit()
    }
  },
  created () {
    this.hostBaseUrl = hostBaseUrl
    this._getReportList()
    /*  console.log('1', new Date().getTime())
      console.log('2', new Date('2018-11-02 18:10:42')) */
  }
}
</script>

<style>

</style>
