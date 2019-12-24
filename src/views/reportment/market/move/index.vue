<template>
  <div class="report-market_box"  @click="mutilTreeData.showTree=false">
    <div class="search-form_wrap clearfix">
      <div class="search-form_item">
        <!-- <el-input v-model="marketMoveForm.orgIds"/> -->
        <mutil-search-dept-tree
        ref="mutilTreeRef"
        :mutilTreeData="mutilTreeData"
        @selectChange="selectChange"
        />
      </div>
       <div class="search-form_item">
       <el-date-picker
        v-model="marketMoveForm.startTime"
        type="date"
        placeholder="选择日期"
        format="yyyy-MM-dd"
        :picker-options="marketMoveForm.endTime ?{disabledDate: time => new Date(time).getTime() >= new Date(marketMoveForm.endTime).getTime() }:{ disabledDate: time => new Date(time).getTime() >= new Date(new Date()).getTime() }"
        value-format="yyyy-MM-dd">
      </el-date-picker>
    </div>
    <div class="line">
        <span>-</span>
      </div>
    <div class="search-form_item">
       <el-date-picker
        v-model="marketMoveForm.endTime"
        type="date"
        placeholder="选择日期"
        :picker-options="{disabledDate: time => new Date(time).getTime() <= new Date(marketMoveForm.startTime).getTime() - 60 * 60 * 24 * 1000 }"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd">
      </el-date-picker>
    </div>
    <div class="search-form_button">
      <el-button type="primary" size="mini" @click="searchMainReportList">查询</el-button>
    </div>
    </div>
     <el-row class="mt-20">
    <el-col :span="24">
      <div class="tab-wrap clearfix">
        <ul class="edit-tab clearfix">
          <li @click="clearSearchData">
             <router-link :to="'/reportment/market/move/add'">新增人员</router-link>
          </li>
          <li @click="clearSearchData">
            <router-link :to="'/reportment/market/move/reduce'">减少人员</router-link>
          </li>
          <li @click="clearSearchData">
            <router-link :to="'/reportment/market/move/move'">内部调动人员</router-link>
          </li>
        </ul>
      </div>
    </el-col>
  </el-row>
  <el-row class="mt-20">
    <el-button size="mini" type="primary" @click="exportReport">导出</el-button>
  </el-row>
  <el-row>
    <router-view></router-view>
  </el-row>
  <form name="form"
   method="POST"
   style="display:none"
   target="_blank"
   ref="submitExcel" id="submitExcel" :action="hostBaseUrl+'/report/monthlyReportForms/selectMonthlyMove/hrBelong/export'">
      <p>startTime: <input type="text" id="startTime" name="startTime" value="" /></p>
      <p>endTime: <input type="text" id="endTime" name="endTime" value="" /></p>
      <p>orgIds: <input type="text" id="orgIds" name="orgIds" value="" /></p>
      <input type="submit" value="Submit"/>
    </form>
  </div>
</template>
<script>
import MutilSearchDeptTree from 'components/MutilSearchDeptTree'
import { debounce } from 'lodash'
import { hostBaseUrl } from 'utils/config'
export default {
  data () {
    return {
      hostBaseUrl,
      mutilTreeData: {
        filterName: '',
        orgIds: [],
        reportOrgIds: [],
        dataTree: [],
        checkDatas: [],
        showTree: false,
        bindData: 'marketReport'
      },
      marketMoveForm: {
        type: '',
        orgIds: [],
        startTime: '',
        endTime: ''
      }
    }
  },
  components: {
    MutilSearchDeptTree
  },
  methods: {
    // 导出
    exportReport () {
      if (this.mutilTreeData.orgIds.length) {
        document.getElementById('startTime').setAttribute('value', this.marketMoveForm.startTime)
        document.getElementById('endTime').setAttribute('value', this.marketMoveForm.endTime)
        document.getElementById('orgIds').setAttribute('value', this.marketMoveForm.orgIds.join('|'))
        this.$refs.submitExcel.submit()
      } else {
        this.$message.warning('请先选择组织架构')
      }
    },
    selectChange (orgId) {
      this.marketMoveForm.orgIds = orgId
    },
    searchMainReportList: debounce(function () {
      const searchDatas = {
        startTime: this.marketMoveForm.startTime,
        endTime: this.marketMoveForm.endTime,
        orgIds: this.mutilTreeData.reportOrgIds.join(','),
        searchFlag: true
      }
      this.$bus.$emit('marketReportSearch', searchDatas)
      if (!searchDatas.orgIds.length) {
        this.$message.warning('请先选择组织架构')
      }
      // console.log('marketMoveForm', this.marketMoveForm)
    }, 200),
    setSerIdEmpty () {
      this.marketMoveForm.startTime = ''
      this.marketMoveForm.endTime = ''
      // this.mutilTreeData.orgIds = []
      // this.marketMoveForm.orgIds = ''
      // this.mutilTreeData.filterName = ''
      // this.$refs.mutilTreeRef.clearSelectTree()
    },
    clearSearchData () {
      // this.setSerIdEmpty()
      this.searchMainReportList()
    }
  },
  created () {
    console.log('mutilTreeData', this.mutilTreeData)
    if (!this.mutilTreeData.orgIds.length) {
      this.$message.warning('请选选择组织架构')
    }
  }
}
</script>
