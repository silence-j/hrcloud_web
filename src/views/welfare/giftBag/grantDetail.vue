<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-button @click="$router.go(-1)" type="primary" size="small">返回</el-button>
      <el-button v-show="permission.indexOf('导出')!=-1" @click="exportList" type="primary" size="small">导出</el-button>
    </div>
    <el-form :model="postForm">
      <div class="search-form_box clearfix length-box search">
        <div class="search-form_item">
          <el-input @keyup.enter.native="normalSearch" v-model="postForm.keyWords" placeholder="请输入关键字" ></el-input>
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
          <!--<el-button size="small" @click="seniorSearch">高级查询</el-button>-->
        </div>
      </div>
    </el-form>
    <div class="table-data">
      <el-table :summary-method="getSummaries" show-summary  :data="grantDetailList" border>
        <el-table-column prop="a" label="序号" width="120px">
          <template slot-scope="scope">
            <span>{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="companyName" label="公司名称" width="185px"></el-table-column>
        <el-table-column prop="num" label="人数" width="185px"></el-table-column>
        <el-table-column prop="amount" label="发放金额(元)" width="185px"></el-table-column>
        <el-table-column prop="createName" label="上报人" width="185px">
          <template slot-scope="scope">
          <span class="brokenStyle">{{scope.row.createName || ''}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reportedTime" label="上报时间" width="185px">
          <template slot-scope="scope">
          <span class="brokenStyle">{{scope.row.reportedTime || ''}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="175px">
          <template slot-scope="scope">
          <span v-if="scope.row.status === 1" class="brokenStyle">未上报</span>
          <span v-if="scope.row.status === 2" class="brokenStyle">未核准</span>
          <span v-if="scope.row.status === 3" class="brokenStyle">已核准</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="210px" fixed="right">
          <template slot-scope="scope">
            <div class="operation">
              <span @click="jumpTo(scope.row, '0')" v-if="scope.row.status === 2" v-show="permission.indexOf('核准')!=-1">核准</span>
              <span @click="jumpTo(scope.row, '1')" v-if="scope.row.status === 3" v-show="permission.indexOf('查看')!=-1">查看</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <form  style="display:none" name="form" method="POST" ref="submitExcel" target="_blank" :action="hostBaseUrl+'/duty/welfareTemplate/exportManageTalble'">
      <p>templateId: <input type="text" id="templateId" name="templateId" value="" /></p>
      <p>keyword: <input type="text" id="keyword" name="keyword" value="" /></p>
      <p>status: <input type="text" id="status" name="status" value="" /></p>
      <input type="submit" value="Submit"  />
    </form>
  </div>
</template>

<script>
import WelfareApi from 'static/api/welfare/welfare'
import { hostBaseUrl } from 'utils/config'
import { getExmine } from 'assets/js/exmine'
export default {
  data () {
    return {
      hostBaseUrl: '',
      grantDetailList: [],
      id: this.$route.query.id,
      postForm: {
        keyWords: '',
        orgName: '',
        status: ''
      },
      state: [
        { name: '未上报', value: 1 },
        { name: '未核准', value: 2 },
        { name: '已审核', value: 3 }
      ],
      page: {
        page: 1,
        pageSeze: 10,
        totalCount: 100
      }
    }
  },
  computed: {
    permission () {
      return getExmine().giftGrantMg
    }
  },
  mounted () {
    this._getControllerList()
  },
  created () {
    this.hostBaseUrl = hostBaseUrl
  },
  methods: {
    exportList () {
      document.getElementById('templateId').setAttribute('value', this.id)
      document.getElementById('keyword').setAttribute('value', this.postForm.keyWords)
      document.getElementById('status').setAttribute('value', this.postForm.status)
      this.$refs.submitExcel.submit()
    },
    _getControllerList () {
      let params = {
        templateId: this.id,
        keyword: this.postForm.keyWords,
        status: this.postForm.status
      }
      WelfareApi.getControllerList(params).then(res => {
        if (res.result) {
          this.grantDetailList = res.result
        } else {
          this.grantDetailList = []
        }
      })
    },
    jumpTo (row, type) {
      this.$router.push({
        path: '/welfare/giftBag/reportList',
        query: {
          isExport: type === '0' ? 'true' : 'false',
          isOperation: type,
          companyId: row.companyId,
          id: row.repotredId,
          templateId: row.templateId
        }
      })
    },
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
        }
        if (index === 2 || index === 3) {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            if (index === 2) {
              sums[index] += ' 人'
            } else if (index === 3) {
              sums[index] += ' 元'
            }
          }
        } else if (index === 7) {
          // sums[index] = '查看'
        }
      })
      return sums
    },
    normalSearch () {
      this.page.page = 1
      this.page.pageSize = 10
      this._getControllerList()
    },
    handleSizeChange (val) {
      this.page.page = 1
      this.page.pageSize = val
      this._getControllerList()
    },
    handleCurrentChange (val) {
      this.page.page = val
      this._getControllerList()
    }
  }
}
</script>

<style scoped lang="less">
  @import "~assets/less/page";
  &/deep/.el-button{
    padding: 0 20px;
  }
  .table-data{
    margin-top: 30px;
  }
  @media screen and (max-width: 1600px) {
    .search-form_box.length-box .search-form_button{
      margin-top: 0;
      margin-left: 20px;
    }
  }
  @media screen and (max-width: 744px) {
    .search-form_box.length-box .search-form_button{
      margin-top: 20px;
      margin-left: 20px;
    }
  }
</style>
