<template>
  <div style="margin-top: 10px">
    <el-form :model="postForm" v-if="searchShow">
      <div class="search-form_box clearfix length-box search">
        <div class="search-form_item">
          <el-input @keyup.enter.native="normalSearch" v-model="postForm.keyWords" placeholder="请输入关键字" ></el-input>
        </div>
        <div class="search-form_item">
          <el-date-picker
            v-model="postForm.dateStart"
            type="date"
            placeholder="发放开始时间">
          </el-date-picker>
        </div>
        <div class="search-form_item">
          <el-date-picker
            v-model="postForm.dateEnd"
            type="date"
            placeholder="发放结束时间">
          </el-date-picker>
        </div>
        <div class="search-form_item">
          <el-select v-model="postForm.status" filterable clearable placeholder="全部状态">
            <el-option
              v-for="item in state"
              :label="item.name"
              :value="item.value"
              :key="item.index">
            </el-option>
          </el-select>
        </div>
        <div class="search-form_button pt-3">
          <el-button type="primary" size="mini" @click="normalSearch">查询</el-button>
        </div>
      </div>
    </el-form>
    <div style="margin-top: 20px" class="table-data">
      <el-table :data="reportList" border>
        <el-table-column prop="a" label="序号" width="120px">
          <template slot-scope="scope">
            <span>{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="festivalName" label="发放节日"></el-table-column>
        <el-table-column prop="companyName" label="发放公司" ></el-table-column>
        <el-table-column prop="startTime" label="上报开始时间"></el-table-column>
        <el-table-column prop="endTime" label="上报截止时间"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="createName" label="创建人"></el-table-column>
        <el-table-column v-if="type === '节日'" prop="regulationCopy" label="发放规则">
          <template slot-scope="scope">
          <span class="brokenStyle" v-html="scope.row.regulationCopy"></span>
          </template>
        </el-table-column>
        <el-table-column prop="issueTime" label="发放时间"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
          <span v-if="scope.row.status === 1" class="brokenStyle">未上报</span>
          <span v-if="scope.row.status === 2" class="brokenStyle">未核准</span>
          <span v-if="scope.row.status === 3" class="brokenStyle">已核准</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="120">
          <template slot-scope="scope">
             <div class="operation">
              <el-button size="small" v-if="scope.row.status === 1" :disabled="!(curDate >= scope.row.startTime && curDate <= scope.row.endTime)" @click="jumpTo(scope.row, '0')" v-show="permission.indexOf('上报')!==-1">上报名单</el-button>
              <el-button v-else="" @click="jumpTo(scope.row, '1')" v-show="permission.indexOf('查看')!==-1">查看</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
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
  </div>
</template>

<script>
import WelfareApi from 'static/api/welfare/welfare'
import { getExmine } from 'assets/js/exmine'
export default {
  props: {
    type: String,
    come: String
  },
  data () {
    return {
      reportList: [],
      curDate: this.changeDate(new Date()),
      postForm: {
        keyWords: '',
        dateStart: '',
        dateEnd: '',
        status: ''
      },
      startTime: '',
      startEnd: '',
      state: [
        { name: '未上报', value: 1 },
        { name: '未核准', value: 2 },
        { name: '已审核', value: 3 }
      ],
      page: {
        page: 1,
        pageSize: 10,
        totalCount: 0
      },
      searchShow: true
    }
  },
  computed: {
    permission () {
      return getExmine().welfwReportMg
    }
  },
  mounted () {
    this._getReportList()
    if (this.come === 'homepage') {
      this.searchShow = false
    } else {
      this.searchShow = true
    }
  },
  methods: {
    _getReportList () {
      let params = {
        page: this.page.page,
        size: this.page.pageSize,
        type: this.type === '节日' ? 1 : 2,
        keyword: this.postForm.keyWords,
        status: this.postForm.status,
        createTimeStart: this.postForm.dateStart ? this.changeDate(this.postForm.dateStart) : '',
        createTimeEnd: this.postForm.dateEnd ? this.changeDate(this.postForm.dateEnd) : ''
      }
      if (this.come === 'homepage') {
        params.status = 1
      }
      WelfareApi.getReportList(params).then(res => {
        if (res.result && res.result.records) {
          let curGrantList = []
          curGrantList = res.result.records
          curGrantList.forEach(res => {
            if (res.regulation) {
              res.regulationCopy = ''
              let arr = []
              let curStr = ''
              arr = JSON.parse(res.regulation)
              arr.forEach(item => {
                let cur = item.startMonth + '月' + (item.endMonth !== 9999 ? '至' + item.endMonth + '月' : '以上') + '发放' + (item.amount ? item.amount : 0) + '元' + '</br>'
                curStr += cur
              })
              res.regulationCopy = curStr
            }
          })
          this.reportList = curGrantList
          this.page.totalCount = res.result.total
        } else {
          this.reportList = []
        }
      })
    },
    jumpTo (row, type) {
      if (this.type === '节日') {
        this.$router.push({
          path: '/welfare/giftBag/reportList',
          query: {
            isExport: false,
            isOperation: type,
            companyId: row.companyId,
            id: row.id,
            templateId: row.templateId
          }
        })
      }
      if (this.type === '实物') {
        this.$router.push({
          path: '/welfare/grant/reportList',
          query: {
            isExport: false,
            isOperation: type,
            companyId: row.companyId,
            id: row.id,
            templateId: row.templateId
          }
        })
      }
    },
    changeDate (value) {
      let time = new Date(value)
      let year = time.getFullYear()
      let month = (time.getMonth() < 9 ? '0' : '') + (time.getMonth() + 1)
      let day = (time.getDate() < 10 ? '0' : '') + time.getDate()
      return year + '-' + month + '-' + day
    },
    normalSearch () {
      this.page.page = 1
      this.page.pageSize = 10
      this._getReportList()
    },
    handleSizeChange (val) {
      this.page.page = 1
      this.page.pageSize = val
      this._getReportList()
    },
    handleCurrentChange (val) {
      this.page.page = val
      this._getReportList()
    }
  }
}
</script>

<style scoped lang="less">
  @import "~assets/less/page";
  &/deep/.el-button{
    padding: 0 20px;
    &/deep/span{
      cursor: inherit;
    }
  }
  @media screen and (max-width: 1600px) {
    .search-form_box.length-box .search-form_button{
      margin-top: 0;
      .el-button{
        margin-left: 20px;
      }
    }
  }
  @media screen and (max-width: 744px) {
    .search-form_box.length-box .search-form_button .el-button{
      margin-top: 20px;
    }
  }
</style>
