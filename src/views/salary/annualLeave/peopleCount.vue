<template>
  <div class="salary" @click="mutilTreeData.showTree=false">
    <el-form :model="postForm">
      <div class="search-form_box clearfix six-box">
        <div>
          <div class="search-form_item">
            <el-input @keyup.enter.native="normalSearch" v-model="postForm.keyWords" @change="keyInput" placeholder="请输入姓名" ></el-input>
          </div>
          <div class="search-form_item">
            <mutil-search-dept-tree
              :mutilTreeData="mutilTreeData"
            />
          </div>
          <div class="search-form_item">
            <el-select v-model="postForm.status" filterable clearable placeholder="全部状态">
              <el-option
                v-for="item in wageState"
                :label="item.name"
                :value="item.value"
                :key="item.index">
              </el-option>
            </el-select>
          </div>
          <div class="search-form_item start-line">
            <el-date-picker
              v-model="postForm.startTime"
              clearable
              @change="startTime"
              placeholder="休假开始日期">
            </el-date-picker>
          </div>
          <div class="search-form_item">
            <el-date-picker
              v-model="postForm.endTime"
              clearable
              @change="endTime"
              :picker-options="pickerBeginDateAfter"
              placeholder="休假结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="search-form_button pt-3">
          <el-button type="primary" size="mini" @click="normalSearch">查 询</el-button>
        </div>
      </div>
    </el-form>
    <div class="search-data mt-20">
      <el-button type="primary" size="small" @click="exportBtn">导 出</el-button>
      <br/><br/>
      <div class="table-setting-warp">
        <!--<div class="table-setting-icon el-icon-setting" @click="chooseMsg"></div>-->
        <el-table :data="searchList" border>
          <el-table-column label="序号" width="60px">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="userName"></el-table-column>
          <el-table-column label="一级组织" prop="levelOne"></el-table-column>
          <el-table-column label="部门" prop="deptName"></el-table-column>
          <el-table-column label="休假天数" prop="num"></el-table-column>
          <el-table-column label="休假日期" prop="leaveDate"></el-table-column>
          <el-table-column prop="userStatus" label="人员状态" width="120px">
            <template slot-scope="scope">
              <span>{{scope.row.userStatus | filterStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column label="异动日期" prop="changeDate"></el-table-column>
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
    <form style="display:none" name="form" method="POST" target="_blank" ref="submitExcel" id="submitExcel" :action="hostBaseUrl+'/system/annual/detail/export'">
      <p>keyword: <input type="text" id="keyword" name="keyword" value="" /></p>
      <p>searchOrgIds: <input type="text" id="searchOrgIds" name="searchOrgIds" value="" /></p>
      <p>userStatus: <input type="text" id="userStatus" name="userStatus" value="" /></p>
      <p>leaveBeginDate: <input type="text" id="leaveBeginDate" name="leaveBeginDate" value="" /></p>
      <p>leaveEndDate: <input type="text" id="leaveEndDate" name="leaveEndDate" value="" /></p>
      <input type="submit" value="Submit"/>
    </form>

  </div>
</template>

<script>
import SalaryApi from 'static/api/wage/wage'
import { changeDate } from 'assets/js/common'
import { hostBaseUrl } from 'utils/config'
import { getExmine } from 'assets/js/exmine'
import MutilSearchDeptTree from 'components/MutilSearchDeptTree'
export default {
  data () {
    return {
      mutilTreeData: {
        filterName: '',
        orgIds: [],
        dataTree: [],
        checkDatas: [],
        showTree: false
      },
      hostBaseUrl: '',
      postForm: {
        keyWords: '',
        orgName: '',
        startTime: '',
        endTime: '',
        status: ''
      },
      timeStart: '',
      timeEnd: '',
      page: {
        page: 1,
        pageSize: 10,
        totalCount: 0
      },
      wageState: [
        { name: '在职', value: 1 },
        { name: '已离职', value: 2 },
        { name: '已调出', value: 3 }
      ],
      searchList: [],
      pickerBeginDateAfter: {
        disabledDate: (time) => {
          let beginDateVal = this.postForm.startTime
          if (beginDateVal) {
            return time.getTime() < beginDateVal
          }
        }
      },
      restBeginDateAfter: {
        disabledDate: (time) => {
          let beginRest = this.postForm.endTime
          if (beginRest) {
            return time.getTime() < beginRest
          }
        }
      }
    }
  },
  computed: {
    permission () {
      return getExmine().salaryAnnualLeave
    },
    getParams () {
      return {
        page: this.page.page,
        size: this.page.pageSize,
        keyword: this.postForm.keyWords,
        searchOrgIds: this.mutilTreeData.orgIds ? this.mutilTreeData.orgIds.join(',') : '',
        userStatus: this.postForm.status,
        leaveBeginDate: changeDate(this.postForm.startTime),
        leaveEndDate: changeDate(this.postForm.endTime)
      }
    }
  },
  components: {
    MutilSearchDeptTree
  },
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
    }
  },
  mounted () {
    this._getWageList()
  },
  methods: {
    exportBtn () {
      document.getElementById('keyword').setAttribute('value', this.postForm.keyWords)
      document.getElementById('userStatus').setAttribute('value', this.postForm.status)
      document.getElementById('searchOrgIds').setAttribute('value', this.mutilTreeData.orgIds.length ? this.mutilTreeData.orgIds.join(' ') : '')
      document.getElementById('leaveBeginDate').setAttribute('value', changeDate(this.postForm.startTime))
      document.getElementById('leaveEndDate').setAttribute('value', changeDate(this.postForm.endTime))
      console.log(this.$refs.submitExcel)
      this.$refs.submitExcel.submit()
    },
    // 查询年假列表
    _getWageList () {
      SalaryApi.peopleCount(this.getParams).then(data => {
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
    },
    startTime () {
      this.timeStart = this.postForm.startTime ? this.postForm.startTime.getFullYear() : ''
    },
    endTime () {
      this.timeEnd = this.postForm.endTime ? this.postForm.endTime.getFullYear() : ''
    },
    keyInput (value) {
      this.postForm.keyWords = value
    },
    normalSearch () {
      this.page.page = 1
      this.page.pageSize = 10
      this._getWageList()
    },
    changeDate (value) {
      let time = new Date(value)
      let year = time.getFullYear()
      let month = (time.getMonth() < 9 ? '0' : '') + (time.getMonth() + 1)
      let day = (time.getDate() < 10 ? '0' : '') + time.getDate()
      return year + '-' + month + '-' + day
    },
    _date (value) {
      let time = new Date(value)
      let year = time.getFullYear()
      let month = (time.getMonth() < 9 ? '0' : '') + (time.getMonth() + 1)
      let day = (time.getDate() < 10 ? '0' : '') + time.getDate()
      return year + '_' + month + '_' + day
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
  .rest{
    &/deep/.el-input{
      width: 240px;
    }
  }
  .editorAnnual{
    .must{
      padding-right: 6px;
    }
  }
  .records{
    border: none;
    color: #FF7500;
    position: relative;
    padding: 0!important;
    left: 10px;
    &:hover{
      background: none!important;
      color: #FF7500!important;
    }
  }
  .wage-list{
    span {
      display: inline-block;
      font-size: 14px;
      height: 36px;
      padding: 11px 0;
      cursor: pointer;
      box-sizing: border-box;
      margin-bottom: 20px;
      &:hover, &:focus{
        color: #FF7500;
        border-bottom: 1px solid #FF7500;
      }
    }
    span:first-child{
      margin-right: 20px;
    }
  }
</style>
