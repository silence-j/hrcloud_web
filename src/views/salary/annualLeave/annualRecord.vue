<template>
  <div class="salary" @click="mutilTreeData.showTree=false">
    <el-form :model="postForm">
      <div class="search-form_box clearfix six-box">
        <div style="height: 40px;margin-bottom: 20px">
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
              placeholder="休假开始日期">
            </el-date-picker>
          </div>
          <div class="search-form_item">
            <el-date-picker
              v-model="postForm.endTime"
              clearable
              :picker-options="pickerBeginDateAfter1"
              placeholder="休假结束日期">
            </el-date-picker>
          </div>
        </div>
        <div>
          <div class="search-form_item">
            <el-select v-model="postForm.normalStatus" filterable clearable placeholder="全部状态">
              <el-option
                v-for="item in normalState"
                :label="item.name"
                :value="item.value"
                :key="item.index">
              </el-option>
            </el-select>
          </div>
          <div class="search-form_item start-line">
            <el-date-picker
              v-model="postForm.operatorStart"
              clearable
              placeholder="操作开始日期">
            </el-date-picker>
          </div>
          <div class="search-form_item">
            <el-date-picker
              v-model="postForm.operatorEnd"
              clearable
              :picker-options="pickerBeginDateAfter2"
              placeholder="操作结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="search-form_button pt-3">
          <el-button type="primary" size="mini" @click="normalSearch">查 询</el-button>
          <!--<el-button size="small" @click="chooseData.deepSearchVisible = true">高级查询</el-button>-->
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
          <el-table-column label="部门" prop="orgName"></el-table-column>
          <el-table-column label="休假日期" prop="leaveDate">
            <template slot-scope="scope">
              {{scope.row.leaveDate}}<span style="color: #f56c6c;" v-if="scope.row.deleteTag === 3">(已撤销)</span>
            </template>
          </el-table-column>
          <el-table-column prop="userStatus" label="人员状态" width="120px">
            <template slot-scope="scope">
              <span>{{scope.row.userStatus | filterStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作时间" prop="updateTime"></el-table-column>
          <el-table-column label="操作人" prop="creator"></el-table-column>
        </el-table>
      </div>
      <el-pagination
        v-if="this.page.totalCount > 10"
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
    <form style="display:none" name="form" method="POST" target="_blank" ref="submitExcel" id="submitExcel" :action="hostBaseUrl+'/system/export/annual/detail/list'">
      <p>keyword: <input type="text" id="keyword" name="keyword" value="" /></p>
      <p>searchOrgIds: <input type="text" id="searchOrgIds" name="searchOrgIds" value="" /></p>
      <p>userStatus: <input type="text" id="userStatus" name="userStatus" value="" /></p>
      <p>deleteTag: <input type="text" id="deleteTag" name="deleteTag" value="" /></p>
      <p>beginDate: <input type="text" id="beginDate" name="beginDate" value="" /></p>
      <p>endDate: <input type="text" id="endDate" name="endDate" value="" /></p>
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
        status: '',
        operatorStart: '',
        operatorEnd: '',
        normalStatus: '',
        options: []
      },
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
      normalState: [
        { name: '正常', value: '0' },
        { name: '撤销', value: '3' }
      ],
      searchList: [],
      pickerBeginDateAfter2: {
        disabledDate: (time) => {
          let beginDateVal = this.postForm.operatorStart
          if (beginDateVal) {
            return time.getTime() < beginDateVal
          }
        }
      },
      pickerBeginDateAfter1: {
        disabledDate: (time) => {
          let beginDateVal = this.postForm.startTime
          if (beginDateVal) {
            return time.getTime() < beginDateVal
          }
        }
      },
      restBeginDateAfter: {
        disabledDate: (time) => {
          let beginRest = this.rest.restBegin
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
        deleteTag: this.postForm.normalStatus !== '' ? this.postForm.normalStatus : '',
        leaveBeginDate: changeDate(this.postForm.startTime),
        leaveEndDate: changeDate(this.postForm.endTime),
        beginDate: changeDate(this.postForm.operatorStart),
        endDate: changeDate(this.postForm.operatorEnd)
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
  watch: {
  },
  methods: {
    exportBtn () {
      document.getElementById('keyword').setAttribute('value', this.postForm.keyWords)
      document.getElementById('userStatus').setAttribute('value', this.postForm.status)
      document.getElementById('searchOrgIds').setAttribute('value', this.mutilTreeData.orgIds.length ? this.mutilTreeData.orgIds.join(' ') : '')
      document.getElementById('deleteTag').setAttribute('value', this.postForm.normalStatus !== '' ? this.postForm.normalStatus : '')
      document.getElementById('leaveBeginDate').setAttribute('value', changeDate(this.postForm.startTime))
      document.getElementById('leaveEndDate').setAttribute('value', changeDate(this.postForm.endTime))
      document.getElementById('beginDate').setAttribute('value', changeDate(this.postForm.operatorStart))
      document.getElementById('endDate').setAttribute('value', changeDate(this.postForm.operatorEnd))
      console.log(this.$refs.submitExcel)
      this.$refs.submitExcel.submit()
    },
    // 查询年假列表
    _getWageList () {
      SalaryApi.annualRecordList(this.getParams).then(data => {
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
    keyInput (value) {
      this.postForm.keyWords = value
    },
    normalSearch () {
      this.page.page = 1
      this.page.pageSize = 10
      this._getWageList()
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
  .rest-dialog{
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
