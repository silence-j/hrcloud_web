<template>
  <div class="container" @click="orgDatas.showTree = false">
    <div class="mt-20 clearfix">
      <el-form :model="moveForm" class="mt-20 tree-wrap-box">
        <div class="search-form_box clearfix">
          <div class="search-form_item">
            <search-dept-tree
            :orgDatas = "orgDatas"
            />
          </div>
          <div class="search-form_item start-line">
            <el-date-picker
              v-model="moveForm.startTime"
              type="date"
              placeholder="请选择开始时间">
            </el-date-picker>
          </div>
          <div class="search-form_item">
            <el-date-picker
              v-model="moveForm.endTime"
              type="date"
              :picker-options="pickerOptions"
              placeholder="请选择结束时间">
            </el-date-picker>
          </div>
          <div class="search-form_button pt-3">
            <el-button type="primary" size="small" @click="setMoveData">查询</el-button>
            <!--<i class="el-icon-refresh ml-15" @click="refresh" title="重置搜索条件"/>-->
          </div>
        </div>
      </el-form>
    </div>
    <el-row class="mt-20">
    <el-col :span="24">
      <div class="tab-wrap clearfix">
        <ul class="edit-tab clearfix">
          <li @click="clearSearchData">
             <router-link :to="'/reportment/move/add'">新增人员</router-link>
          </li>
          <li @click="clearSearchData">
            <router-link :to="'/reportment/move/reduce'">减少人员</router-link>
          </li>
          <li @click="clearSearchData">
            <router-link :to="'/reportment/move/move'">内部调动人员</router-link>
          </li>
        </ul>
      </div>
    </el-col>
  </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
import SearchDeptTree from 'components/SearchDeptTree'
import { getToken } from 'assets/js/util'
import { getStartandTime } from 'assets/js/common'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      orgDatas: {
        filterName: '',
        orgId: '',
        dataTree: [],
        showTree: false
      },
      comTimeDate: [
        {
          company: '',
          writeTime: ''
        }
      ],
      moveForm: {
        startTime: '',
        endTime: '',
        organizationId: '',
        organizationName: ''
      },
      orgDept: '',
      countMonth: ''
    }
  },
  methods: {
    _fangfa () {
      if (this.$route.name === 'reportment-contract-move-add') {
        return this.orgBreadDate
      }
    },
    setSerIdEmpty () {
      this.moveForm.organizationId = ''
      this.moveForm.organizationName = ''
      this.moveForm.startTime = ''
      this.moveForm.endTime = ''
      this.orgDatas.orgId = ''
      this.$store.commit('SET_MAIN_REPORT_CLICK', false)
      this.$store.commit('REPORT_MOVEDEPATID', '')
      // this.$refs.searchTree.clearSelectTree()
    },
    refresh () {
      this.moveForm.organizationId = ''
      this.moveForm.organizationName = ''
      this.moveForm.startTime = ''
      this.moveForm.endTime = ''
      this.orgDatas.orgId = ''
      this.$store.dispatch('setMainReportSearch', this.moveForm)
      this.$store.commit('SET_MAIN_REPORT_CLICK', true)
    },
    monthToString (monthValue) {
      let newYear = new Date(monthValue).getFullYear()
      let newMon = new Date(monthValue).getMonth() + 1
      let newMonthTime = getStartandTime(newYear) + '-' + getStartandTime(newMon)
      return newMonthTime
    },
    setMoveData () {
      this.orgDept = this.orgDatas.orgId
      if (this.moveForm.startTime && !this.moveForm.endTime) {
        this.countMonth = this.monthToString(this.moveForm.startTime)
      } else if (!this.moveForm.startTime && this.moveForm.endTime) {
        this.countMonth = this.monthToString(this.moveForm.endTime)
      } else if (this.moveForm.startTime && this.moveForm.endTime) {
        this.countMonth = this.monthToString(this.moveForm.startTime) + '-' + this.monthToString(this.moveForm.endTime)
      }
      this.moveForm.organizationId = this.orgDatas.orgId
      this.$store.dispatch('setMainReportSearch', this.moveForm)
      this.$store.commit('SET_MAIN_REPORT_CLICK', true)
    },
    _initSearchData () {
      this.moveForm.startTime = this.reportMoveStartTime
      this.moveForm.endTime = this.reportMoveEndTime
    },
    clearSearchData () {
      // this.setSerIdEmpty()
      // this.setMoveData()
      this.$store.dispatch('setMainReportSearch', this.moveForm)
    }
  },
  computed: {
    ...mapGetters(
      ['reportMoveStartTime', 'reportMoveEndTime']
    ),
    orgName () {
      return this.orgDept ? this.orgDept : getToken('loginDeptName')
    },
    pickerOptions () {
      return {
        disabledDate: (time) => {
          return new Date(time).getTime() < new Date(this.moveForm.startTime).getTime()
        }
      }
    }
  },
  filters: {
    monthToString (monthValue) {
      let newYear = new Date(monthValue).getFullYear()
      let newMon = new Date(monthValue).getMonth() + 1
      let newMonthTime = getStartandTime(newYear) + '-' + getStartandTime(newMon)
      return newMonthTime
    }
  },
  components: {
    SearchDeptTree
  },
  created () {
    this._fangfa()
    this._initSearchData()
  }
}
</script>

<style lang="less" scoped>
  .move-from-head{
    margin-bottom:20px;
  }
  .move-h4{
    color: #009688;
    margin-bottom:16px;
    text-align:center;
  }
  .move-h5{
    color: #009688;
    margin-bottom:20px;
    font-size: 14px;
    text-align:center;
  }
</style>
