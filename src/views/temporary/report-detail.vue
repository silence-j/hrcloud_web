<template>
  <div class="container">
    <el-button type="primary" size="small" @click="goBack">返 回</el-button>
    <el-button type="primary" size="small" @click="_downLoadExcel" v-if="usertype !=2">导 出</el-button>
    <!--<div class="user-filter">-->
      <!--<el-form>-->
        <!--<el-row :gutter="22" type="flex">-->
          <!--<el-col :span='4'><el-input v-model="postForm.keyWords" placeholder="请输入组织机构"></el-input></el-col>-->
          <!--<el-col :span='4'><el-input v-model="postForm.keyWords" placeholder="请输入填报人"></el-input></el-col>-->
          <!--<el-col>-->
            <!--<el-button type="primary" @click="searchPostList">查询</el-button>-->
          <!--</el-col>-->
        <!--</el-row>-->
      <!--</el-form>-->
    <!--</div>-->
    <div style="margin-bottom: 20px;margin-top: 20px;font-size: 14px;color:#666666">关于{{name}}的调查报表 &nbsp;&nbsp; 截止日期：{{endtime}}</div>
    <el-table
      :data="reportDatas"
      border
      tooltip-effect="dark"
      style="max-width: 100%;min-width:700px;overflow-x: auto">
      <el-table-column
        label="序号"
        type="index"
        width="60">
      </el-table-column>
      <template v-for="(item,index) in reportTitle">
        <el-table-column
         :key="index"
          min-width="110px"
          :label="item.name"
          :prop="item.name">
        </el-table-column>
      </template>
    </el-table>
    <pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageMsg.currentPage"
      :page-sizes="pageMsg.pageSizes"
      :page-size="pageMsg.pageSize"
      :total="pageMsg.total">
    </pagination>
    <form  style="display:none" name="form" method="POST" ref="submitExcel" target="_blank" :action="hostBaseUrl+'/report/temporaryReport/exportDataToExcel'">
      <p>name: <input type="text" id="name" name="name" value="" /></p>
      <p>tableName: <input type="text" id="tableName" name="tableName" value="" /></p>
      <p>columnName: <input type="text" id="columnName" name="columnName" value="" /></p>
      <input type="submit" value="Submit"  />
    </form>
  </div>
</template>
<script>
import { getReportTitle, getReportData } from 'static/api/temporary/report-detail'
import Pagination from 'components/Pagination.vue'
import { getToken } from 'assets/js/util'
import { hostBaseUrl } from 'utils/config'
export default {
  data () {
    return {
      hostBaseUrl: '',
      loading: false,
      list: [],
      name: '',
      tablename: '',
      endtime: '',
      usertype: '',
      reportDatas: [],
      pageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      postForm: {
        keyWords: ''
      },
      reportTitle: [],
      columnName: ''
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
        tableName: this.$route.params.tableName,
        userId: ''
      }
    }
  },
  methods: {
    handleSizeChange (pageSize) {
      this.pageMsg.pageSize = pageSize
      this._getReportData()
    },
    handleCurrentChange (currentPage) {
      this.pageMsg.currentPage = currentPage
      this._getReportData()
    },
    goBack () {
      window.history.go(-1)
    },
    addPost () {
      this.$router.push({ path: '/recruitment/post/add-post' })
    },
    searchPostList () {},
    _getReportData () {
      let preload = {
        tableName: this.$route.params.tableName
      }
      getReportTitle(preload).then(data => {
        this.reportTitle = []
        if (data.result && data.result.length) {
          data.result.forEach((item) => {
            if (item.name !== 'id' && item.name !== 'create_id' && item.name !== 'create_time') {
              this.reportTitle.push(item)
            }
          })
          setTimeout(() => {
            if (this.usertype === '2') {
              this.postParams.userId = getToken('loginId')
            }
            getReportData(this.postParams).then(data => {
              if (data.result) {
                if (data.result.records) {
                  this.reportDatas = data.result.records
                }
                this.pageMsg.total = data.result.total
              }
            })
          }, 10)
        }
      })
    },
    _downLoadExcel () {
      document.getElementById('name').setAttribute('value', this.name)
      document.getElementById('tableName').setAttribute('value', this.tablename)
      let columnNamearr = []
      let preload = {
        tableName: this.$route.params.tableName
      }
      getReportTitle(preload).then(data => {
        if (data.result && data.result.length) {
          data.result.forEach((item) => {
            if (item.name !== 'id' && item.name !== 'create_id' && item.name !== 'create_time') {
              columnNamearr.push(item.name)
            }
          })
          this.columnName = columnNamearr.join(',')
          document.getElementById('columnName').setAttribute('value', this.columnName)
          this.$refs.submitExcel.submit()
        }
      })
    }
  },
  created () {
    this.hostBaseUrl = hostBaseUrl
    this._getReportData()
    this.name = this.$route.params.name
    this.tablename = this.$route.params.tableName
    this.endtime = this.$route.params.endTime
    this.usertype = this.$route.params.userType
    if (this.usertype === '2') {
      this.$store.commit('ACTIVEINDEX', '31')
    } else {
      this.$store.commit('ACTIVEINDEX', '30')
    }
  }
}
</script>

<style>

</style>
