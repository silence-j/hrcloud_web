<template>
  <div class="container">
    <el-button type="primary" @click="goBack" size="small">返  回</el-button>
    <el-button type="primary" @click="excelMod" size="small">下载模板</el-button>
    <el-button type="primary" @click="fileChoose" size="small">{{wordbtn}}</el-button>
    <div style="margin: 20px 0;">关于{{name}}的调查报表 &nbsp;&nbsp; 截止日期：{{endtime}} &nbsp;&nbsp; 最后一次上报时间：{{lasttime}}</div>
    <el-table
      :data="reportDatas"
      border
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        width="60">
      </el-table-column>
      <div v-for="item in reportTitle" :key="item.id">
        <el-table-column
          :label="item.name"
          :prop="item.name">
        </el-table-column>
      </div>
    </el-table>
    <pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageMsg.currentPage"
      :page-sizes="pageMsg.pageSizes"
      :page-size="pageMsg.pageSize"
      :total="pageMsg.total">
    </pagination>

    <el-dialog title="选择导入文件" :visible.sync="chooseVisible" size="tiny" label-width="500px">
      <div class="module-opera">
        <form>
          <input type="file" name="file" @change="getFile($event)"/>
          <input type="hidden" name="userId" v-model="userId" />
          <input type="hidden" name="tableName" v-model="tablename" />
        </form>
        <!--<iframe id="rfFrame" name="rfFrame" src="about:blank" style="display:none;"></iframe>-->
      </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="chooseVisible = false" class="false" size="mini">取 消</el-button>
		<el-button type="primary" @click="fileUpload($event)" size="mini">确 定</el-button>
	</span>
    </el-dialog>

    <form  style="display:none" name="form2" method="POST" ref="submitExcelMod" target="_blank" :action="hostBaseUrl+'/report/temporaryReport/downloadTemplate'">
      <p>tableName: <input type="text" id="tableName2" name="tableName" value="" /></p>
      <p>name: <input type="text" id="name2" name="name" value="" /></p>
      <input type="submit" value="Submit"  />
    </form>
  </div>
</template>
<script>
import { getReportTitle, getReportData } from 'static/api/temporary/report-detail'
import Pagination from 'components/Pagination.vue'
import { getToken } from 'assets/js/util'
import axios from 'axios'
import { hostBaseUrl } from 'utils/config'
export default {
  data () {
    return {
      hostBaseUrl: '',
      loading: false,
      name: '',
      tablename: '',
      endtime: '',
      lasttime: '',
      userId: '',
      accountId: '',
      userName: '',
      list: [],
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
      chooseVisible: false,
      wordbtn: '导　入'
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
        userId: this.userId
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
    fileChoose () {
      this.chooseVisible = true
    },
    getFile (event) {
      this.file = event.target.files[0]
    },
    fileUpload (event) {
      event.preventDefault()
      let formData = new FormData()
      formData.append('userId', this.userId)
      formData.append('userName', this.userName)
      formData.append('tableName', this.tablename)
      formData.append('file', this.file)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      if (this.file === undefined) {
        this.$message.error('请选择导入文件')
        return
      }
      axios.post(this.hostBaseUrl + '/report/temporaryReport/export', formData, config).then((res) => {
        if (res.data.subCode === 10000) {
          this.chooseVisible = false
          this.$message({
            type: 'success',
            message: '导入成功!'
          })
          setTimeout(() => {
            this._getReportData()
          }, 400)
        } else {
          this.$message.error('导入失败')
        }
      })
    },
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
            getReportData(this.postParams).then(data => {
              if (data.result) {
                this.reportDatas = data.result.records
                this.pageMsg.total = data.result.total
                if (data.result.records.length) {
                  this.wordbtn = '重新导入'
                  this.lasttime = data.result.records[0].导入时间
                }
              }
            })
          }, 10)
        }
      })
    },
    _getReportDataOnly () {
      getReportData(this.postParams).then(data => {
        if (data.result) {
          this.reportDatas = data.result.records
          this.pageMsg.total = data.result.total
          if (data.result.records.length) {
            this.wordbtn = '重新导入'
            this.lasttime = data.result.records[0].create_time
          }
        }
      })
    },
    excelMod () {
      document.getElementById('tableName2').setAttribute('value', this.tablename)
      document.getElementById('name2').setAttribute('value', this.name)
      this.$refs.submitExcelMod.submit()
    }
  },
  created () {
    this.hostBaseUrl = hostBaseUrl
    this.name = this.$route.params.name
    this.tablename = this.$route.params.tableName
    this.endtime = this.$route.params.endTime
    this.userId = getToken('loginId')
    this.accountId = getToken('accountId')
    this.userName = getToken('loginName')
    this._getReportData()
  }
}
</script>

<style>

</style>
