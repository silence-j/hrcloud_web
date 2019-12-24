<template>
  <div class="salary">
    <el-button @click="add" type="primary" size="small" v-show="permission.indexOf('管理')!=-1">新增</el-button>
    <el-button @click="exportList" type="primary" size="small" v-show="permission.indexOf('导出')!=-1">导出</el-button>
    <div class="mt-20">
      <el-form :model="postForm">
        <div class="search-form_box clearfix length-box search">
          <div class="search-form_item">
            <el-input v-model="postForm.keyWords" placeholder="请输入关键字" @keyup.enter.native="SearchInfo"></el-input>
          </div>
          <div class="search-form_item start-line">
            <el-date-picker
              v-model="postForm.startTime"
              type="date"
              clearable
              @change="changeStart"
              placeholder="申领开始时间">
            </el-date-picker>
          </div>
          <div class="search-form_item">
            <el-date-picker
              v-model="postForm.endTime"
              type="date"
              clearable
              @change="changeEnd"
              :picker-options="pickerBeginDateAfter"
              placeholder="申领结束时间">
            </el-date-picker>
          </div>
          <div class="search-form_button pt-3">
            <el-button type="primary" @click="SearchInfo" size="mini">查询</el-button>
           <!-- <el-button size="small" @click="deepLevelSearchObject.deepLevelSearchVisible = true">高级查询</el-button>-->
          </div>
        </div>
      </el-form>
    </div>
    <div class="search-data">
      <el-table :data="nourishGoldList" border>
        <el-table-column prop="a" label="序号" width="120px">
          <template slot-scope="scope">
            <span>{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="姓名" width="105px">
          <template slot-scope="scope">
            <span :title="scope.row.userName" class="brokenStyle">{{scope.row.userName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="idCardNumber" label="身份证号" width="185px">
          <template slot-scope="scope">
            <span :title="scope.row.idCardNumber" class="brokenStyle">{{scope.row.idCardNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="135px">
          <template slot-scope="scope">
            <span v-if="scope.row.sex === 0" class="brokenStyle">女</span>
            <span v-if="scope.row.sex === 1" class="brokenStyle">男</span>
            <span v-if="scope.row.sex === 2" class="brokenStyle">其他</span>
          </template>
        </el-table-column>
        <el-table-column prop="entryDate" label="入司时间" width="145px">
          <template slot-scope="scope">
            <span :title="scope.row.entryDate" class="brokenStyle">{{scope.row.entryDate}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="disease" label="病种" width="145px">
          <template slot-scope="scope">
            <span :title="scope.row.disease" class="brokenStyle">{{scope.row.disease}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="validYear" label="可申领年限" width="145px">
          <template slot-scope="scope">
            <span :title="scope.row.validYear" class="brokenStyle">{{scope.row.validYear}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="usedYear" label="已申领年限" width="125px">
          <template slot-scope="scope">
            <span :title="scope.row.usedYear" class="brokenStyle">{{scope.row.usedYear}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="companyName" label="所在公司" width="125px"></el-table-column>
        <el-table-column prop="post" label="岗位" width="125px"></el-table-column>
        <el-table-column prop="currentYear" label="申领日期" width="135px"></el-table-column>
        <el-table-column prop="auditTime" label="审批时间" width="175px"></el-table-column>
        <el-table-column prop="amount" label="申领金额" width="135px"></el-table-column>
        <el-table-column label="操作" min-width="150" fixed="right">
          <template slot-scope="scope">
            <div class="operation">
              <span @click="seeSy(scope.row, 0)" v-show="permission.indexOf('管理')!=-1">编辑</span>
              <span @click="seeSy(scope.row, 1)" v-show="permission.indexOf('查看')!=-1">查看</span>
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
    <deep-level-search
      :deepLevelSearchObject="deepLevelSearchObject"
      @sureDeepSearch="sureDeepSearch"
      v-draggable />
    <!--选择人员弹框-->
    <el-dialog
      title="选择新增人员"
      :visible.sync="UncancelVisible"
      size="small">
      <div class="module-opera">
        <el-form :model="UnconcludeForm">
          <el-form-item>
            <el-row>
              <el-col :span="13">
                <address-tree :showCheckBox=false @node-click="handleNodeClick"></address-tree>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-input
                  placeholder="输入姓名进行搜索"
                  v-model="filterSelectStaffList"
                >
                </el-input>
                <el-table
                  :data="orgSelectStaffDatas"
                  border
                  @select="getStffMessage"
                  @select-all="clearAllSelect"
                  ref="staffTable"
                  class="elTable"
                  style="width: 100%;margin-top: 5px">
                  <el-table-column type="selection"></el-table-column>
                  <el-table-column
                    label="员工姓名"
                    prop="name">
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
            <pagination
              v-if="showPage"
              @size-change="handleJobSizeChange"
              @current-change="handleJobCurrentChange"
              :current-page="jobPageMsg.currentPage"
              :page-sizes="jobPageMsg.pageSizes"
              :page-size="jobPageMsg.pageSize"
              :total="jobPageMsg.total">
            </pagination>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
         <el-button @click="UncancelVisible = false" class="false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addSave" size="mini">确 定</el-button>
      </span>
    </el-dialog>
    <form  style="display:none" name="form" method="POST" ref="submitExcel" :action="hostBaseUrl+'/duty/nutritionMoney/export'">
      <p>keyword: <input type="text" id="keyword" name="keyword" value="" /></p>
      <p>createTimeStart: <input type="text" id="createTimeStart" name="createTimeStart" value="" /></p>
      <p>createTimeEnd: <input type="text" id="createTimeEnd" name="createTimeEnd" value="" /></p>
      <input type="submit" value="Submit"  />
    </form>
  </div>
</template>

<script>
import DeepLevelSearch from '@/components/DeepLevelSearch.vue'
import WelfareApi from 'static/api/welfare/welfare'
import AddressTree from 'components/AddressTree.vue'
import { hostBaseUrl } from 'utils/config'
import Pagination from 'components/Pagination.vue'
import { mapGetters } from 'vuex'
import { debounce } from 'assets/js/util'
import { getExmine } from 'assets/js/exmine'
import { orgSelectStaffList } from 'static/api/common/common'
export default {
  data () {
    return {
      deepLevelSearchObject: {
        deepLevelSearchVisible: false,
        selectType: 'demand'
      },
      hostBaseUrl: '',
      UncancelVisible: false,
      UnconcludeForm: {},
      showPage: true,
      filterSelectStaffList: '',
      orgSelectStaffDatas: [],
      addJobForm: {
        userId: ''
      },
      jobPageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      postStartTime: '',
      postEndTIme: '',
      postForm: {
        keyWords: '',
        startTime: '',
        endTime: '',
        options: []
      },
      page: {
        page: 1,
        pageSize: 10,
        totalCount: 0
      },
      nourishGoldList: [],
      pickerBeginDateAfter: {
        disabledDate: (time) => {
          let beginDateVal = this.postForm.startTime
          if (beginDateVal) {
            return time.getTime() < beginDateVal
          }
        }
      }
    }
  },
  components: {
    AddressTree,
    Pagination,
    DeepLevelSearch
  },
  computed: {
    ...mapGetters(['getOrgId']),
    permission () {
      return getExmine().welfareNourishGold
    },
    departmentStaffParams () {
      return {
        orgId: this.OrgId ? this.OrgId : this.getOrgId,
        page: this.jobPageMsg.currentPage,
        size: this.jobPageMsg.pageSize
      }
    }
  },
  mounted () {
    // this._getNourishGoldList()
  },
  created () {
    this.$watch('filterSelectStaffList', debounce((query) => {
      this.selectStaffListAll(query)
    }, 200))
    this.hostBaseUrl = hostBaseUrl
    this._getNourishGoldList()
    setTimeout(() => {
      this._orgSelectStaffList()
    }, 400)
  },
  methods: {
    exportList () {
      document.getElementById('keyword').setAttribute('value', this.postForm.keyWords)
      document.getElementById('createTimeStart').setAttribute('value', this.postStartTime ? this.postStartTime : '')
      document.getElementById('createTimeEnd').setAttribute('value', this.postEndTime ? this.postEndTime : '')
      this.$refs.submitExcel.submit()
    },
    // 高级搜索确认
    sureDeepSearch (deepSearchArr) {
      this.deepLevelSearchObject.deepLevelSearchVisible = false
      let options = []
      deepSearchArr.forEach(item => {
        if (item.width) {
          options.push({
            field: item.width,
            op: item.op,
            value: item.value,
            searchFlag: item.searchFlag
          })
        }
      })
      this.postForm.options = options
      setTimeout(() => {
        this.SearchInfo()
      }, 200)
    },
    SearchInfo () {
      this.page.page = 1
      this.page.pageSize = 10
      this._getNourishGoldList()
    },
    handleJobSizeChange (pageSize) {
      this.jobPageMsg.pageSize = pageSize
      this._orgSelectStaffList()
    },
    handleJobCurrentChange (currentPage) {
      this.jobPageMsg.currentPage = currentPage
      this._orgSelectStaffList()
    },
    /** 当勾选数据行时触发的事件**/
    getStffMessage (value, row) {
      if (row) {
        this.addJobForm.userId = row.id
        this.$refs.staffTable.clearSelection()
        this.$refs.staffTable.toggleRowSelection(row, true)
        this.checkTable = true
      }
    },
    /** 当手动勾选全选 Checkbox 时触发的事件**/
    clearAllSelect () {
      this.$refs.staffTable.clearSelection()
    },
    /** 进行姓名搜索**/
    selectStaffListAll (value) {
      if (value) {
        this.showPage = false
        let newKeyWordArr = []
        let postParams = {
          page: 1,
          size: 600000,
          orgId: this.OrgId
        }
        orgSelectStaffList(postParams).then(data => {
          if (data.result && data.result.records) {
            data.result.records.forEach(item => {
              if (item.name.indexOf(value) !== -1) {
                newKeyWordArr.push(item)
              }
            })
          }
        })
        this.orgSelectStaffDatas = newKeyWordArr
        setTimeout(() => {
          this.jobPageMsg.total = this.orgSelectStaffDatas.length
        }, 200)
      } else {
        this.showPage = true
        this._orgSelectStaffList()
        // this.orgSelectStaffDatas = this.newKeyWordsArr
      }
    },
    /** 根据组织架构获取所有员工列表**/
    _orgSelectStaffList () {
      if (this.departmentStaffParams.orgId.orgId) {
        this.departmentStaffParams.orgId = this.departmentStaffParams.orgId.orgId
      }
      orgSelectStaffList(this.departmentStaffParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.orgSelectStaffDatas = data.result.records
            this.newKeyWordsArr = data.result.records
            this.jobPageMsg.total = data.result.total
          }
        }
      })
    },
    handleNodeClick (data, node, self) {
      this.showPage = true
      this.departmentStaffParams.orgId = data.id
      this.filterSelectStaffList = ''
      this.OrgId = data.id
      this._orgSelectStaffList()
    },
    add (row) {
      this.UncancelVisible = true
      // this.$router.push({
      //   path: '/welfare/nourishGold/add',
      //   query: {userId: row.userId}
      // })
    },
    addSave () {
      if (this.checkTable) {
        this.$router.push({
          path: '/welfare/nourishGold/add',
          query: {
            userId: this.addJobForm.userId,
            type: 'add'
          } })
      } else {
        this.$message.warning({
          message: '请选择要增加的员工姓名!'
        })
      }
    },
    _getNourishGoldList () {
      let params = {
        page: this.page.page,
        size: this.page.pageSize,
        options: this.postForm.options,
        keyword: this.postForm.keyWords ? this.postForm.keyWords : null,
        createTimeStart: this.postStartTime ? this.postStartTime : null,
        createTimeEnd: this.postEndTime ? this.postEndTime : null
      }
      WelfareApi.getNourishGoldList(params).then(res => {
        if (res.result && res.result.records) {
          this.nourishGoldList = res.result.records
          this.page.totalCount = res.result.total
        } else {
          this.nourishGoldList = []
        }
      })
    },
    seeSy (row, type) {
      this.$router.push({
        path: '/welfare/nourishGold/add',
        query: {
          id: row.id,
          type: type === 1 ? 'look' : 'edit',
          userId: row.userId
        }
      })
    },
    changeDate (value) {
      let time = new Date(value)
      let year = time.getFullYear()
      let month = (time.getMonth() < 9 ? '0' : '') + (time.getMonth() + 1)
      let day = (time.getDate() < 10 ? '0' : '') + time.getDate()
      return year + '-' + month + '-' + day
    },
    changeStart () {
      this.postStartTime = this.postForm.startTime ? this.changeDate(this.postForm.startTime) : ''
    },
    changeEnd () {
      this.postEndTime = this.postForm.endTime ? this.changeDate(this.postForm.endTime) : ''
    },
    handleSizeChange (val) {
      this.page.page = 1
      this.page.pageSize = val
      this._getNourishGoldList()
    },
    handleCurrentChange (val) {
      this.page.page = val
      this._getNourishGoldList()
    },
    searchPostList () {}
  }
}
</script>

<style scoped lang="less">
  @import "~assets/less/homePage";
  @import "~assets/less/page";
  .search-data{
    margin-top: 20px;
  }
  .elTable{
    &/deep/.has-gutter tr{
      &/deep/th:first-child{
        &/deep/.cell{
          display: none;
        }
      }
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
    .search-form_box.length-box .search-form_button{
      margin-top: 20px;
    }
  }
</style>
