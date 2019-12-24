<template>
<div class="mt-20">
    <el-tabs type="border-card" @tab-click="tabClick">
      <el-tab-pane>
        <span slot="label">待接收</span>
      <el-table
          :data="WaitDatas"
          border>
          <el-table-column
            label="序号"
            type="index"
            width="60">
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name">
          </el-table-column>
          <el-table-column
            label="身份证"
            width="200px"
            prop="idCardNumber">
          </el-table-column>
          <el-table-column
            label="部门"
            prop="orgName">
          </el-table-column>
          <el-table-column
            label="岗位"
            prop="postName">
          </el-table-column>
          <el-table-column
            prop="telephone"
            label="联系方式">
          </el-table-column>
          <el-table-column
            prop="entryDate"
            label="本次入职时间">
          </el-table-column>
          <el-table-column
            prop="transferName"
            label="移交申请人">
          </el-table-column>
          <el-table-column
            prop="transferTime"
            label="移交申请时间">
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="120px">
            <template slot-scope="scope">
              <div class="operation">
                <span @click="checkMsg(scope.row)" v-show="(permission.indexOf('接收'))!==-1 || permission.indexOf('不接收')!==-1">办理</span>
                <!--<span @click="ReceiveMsg(scope.row)" v-show="(permission.indexOf('接收'))!==-1">接收</span>-->
                <!--<span @click="UnReceiveMsg(scope.row)" v-show="(permission.indexOf('不接收'))!==-1">不接收</span>-->
              </div>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          @size-change="handleWaitSizeChange"
          @current-change="handleWaitCurrentChange"
          :current-page="taskWaitPageMsg.currentPage"
          :page-sizes="taskWaitPageMsg.pageSizes"
          :page-size="taskWaitPageMsg.pageSize"
          :total="taskWaitPageMsg.total">
        </pagination>
      </el-tab-pane>
        <el-tab-pane>
        <span slot="label">已接收</span>
        <el-table
          :data="FinishDatas"
          border>
          <el-table-column
            label="序号"
            type="index"
            width="60">
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name">
          </el-table-column>
          <el-table-column
            label="身份证"
            width="200px"
            prop="idCardNumber">
          </el-table-column>
          <el-table-column
            label="部门"
            prop="orgName">
          </el-table-column>
          <el-table-column
            label="岗位"
            prop="postName">
          </el-table-column>
          <el-table-column
            prop="telephone"
            label="联系方式">
          </el-table-column>
          <el-table-column
            prop="entryDate"
            label="本次入职时间">
          </el-table-column>
          <el-table-column
            prop="transferName"
            label="移交申请人">
          </el-table-column>
          <el-table-column
            prop="transferTime"
            label="资料移交时间">
          </el-table-column>
          <el-table-column
            prop="acceptTime"
            label="资料接收时间">
          </el-table-column>
        </el-table>
        <pagination
          @size-change="handleFinishSizeChange"
          @current-change="handleFinishCurrentChange"
          :current-page="taskFinishPageMsg.currentPage"
          :page-sizes="taskFinishPageMsg.pageSizes"
          :page-size="taskFinishPageMsg.pageSize"
          :total="taskFinishPageMsg.total">
        </pagination>
      </el-tab-pane>
    </el-tabs>
</div>
</template>
<script>
import Pagination from 'components/Pagination'
import { timeZeroToString } from 'assets/js/common'
import { mapGetters, mapMutations } from 'vuex'
import { getMeansList } from 'static/api/means/means'
import { getExmine } from 'assets/js/exmine'
const pageMsg = {
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 20, 50],
  total: 0
}
export default {
  data () {
    return {
      tabTitle: '待接收',
      taskWaitPageMsg: Object.assign({}, pageMsg),
      taskFinishPageMsg: Object.assign({}, pageMsg),
      WaitDatas: [],
      FinishDatas: []
    }
  },
  computed: {
    ...mapGetters({
      'meansKeyWords': 'getMeansKeyWords',
      'meansStartTime': 'getMeansStartTime',
      'meansEndTime': 'getMeansEndTime',
      'meansClicked': 'getMeansClicked',
      'meansOrg': 'getMeansOrg'
    }),
    permission () {
      return getExmine().recruitMeansReceive
    },
    waitParams () {
      return {
        status: 1,
        orgId: this.meansOrg ? this.meansOrg : [],
        entryDateBegin: this.meansStartTime ? timeZeroToString(this.meansStartTime) : '',
        entryDateEnd: this.meansEndTime ? timeZeroToString(this.meansEndTime) : '',
        keyword: this.meansKeyWords,
        page: this.taskWaitPageMsg.currentPage,
        size: this.taskWaitPageMsg.pageSize
      }
    },
    finishParams () {
      return {
        status: 2,
        orgId: this.meansOrg ? this.meansOrg : [],
        entryDateBegin: this.meansStartTime ? timeZeroToString(this.meansStartTime) : '',
        entryDateEnd: this.meansEndTime ? timeZeroToString(this.meansEndTime) : '',
        keyword: this.meansKeyWords,
        page: this.taskFinishPageMsg.currentPage,
        size: this.taskFinishPageMsg.pageSize
      }
    },
    currentRouteName () {
      return this.$route.name
    }
  },
  methods: {
    ...mapMutations({
      getMeansClicked: 'SET_MEANS_CLICKED'
    }),
    checkMsg (row) {
      this.$router.push({ name: '资料详情劳动人事信息',
        params: {
          meansId: row.userId,
          udtId: row.udtId
        } })
    },
    _getMeanslist () {
      getMeansList(this.waitParams).then((data) => {
        if (data.result) {
          if (data.result.records) {
            this.WaitDatas = data.result.records
          }
          this.taskWaitPageMsg.total = data.result.total
        }
      })
    },
    _getFininList () {
      getMeansList(this.finishParams).then((data) => {
        if (data.result) {
          if (data.result.records) {
            this.FinishDatas = data.result.records
          }
          this.taskFinishPageMsg.total = data.result.total
        }
      })
    },
    handleWaitSizeChange (pageSize) {
      this.taskWaitPageMsg.pageSize = pageSize
      this._getMeanslist()
    },
    handleWaitCurrentChange (currentPage) {
      this.taskWaitPageMsg.currentPage = currentPage
      this._getMeanslist()
    },
    handleFinishSizeChange (pageSize) {
      this.taskFinishPageMsg.pageSize = pageSize
      this._getMeanslist()
    },
    handleFinishCurrentChange (currentPage) {
      this.taskFinishPageMsg.currentPage = currentPage
      this._getMeanslist()
    },
    tabClick (tab, event) {
      if (tab.index === '0') {
        this.tabTitle = '待接收'
        this._getMeanslist()
      } else if (tab.index === '1') {
        this.tabTitle = '已接收'
        this._getFininList()
      }
    },
    // 设置默认搜索项
    _setDefaultSearch () {
      const pageMsg = this.getSearchParams({}, this.currentRouteName + this.tabTitle)
      console.log('pageMsg', pageMsg)
      if (this.tabTitle === '待接收') {
        this.taskWaitPageMsg = pageMsg
      }
      if (this.tabTitle === '已接收') {
        this.taskFinishPageMsg = pageMsg
      }
    },
    _setDefaultLocalData () {
      let searchParams = {}
      if (this.tabTitle === '待接收') {
        searchParams = this.taskWaitPageMsg
      }
      if (this.tabTitle === '待接收') {
        searchParams = this.taskWaitPageMsg
      }
      const searchParamsForm = Object.assign({}, searchParams)
      this.setSearchParams(searchParamsForm, this.currentRouteName + this.tabTitle)
    }
  },
  components: {
    Pagination
  },
  watch: {
    meansClicked (newVal) {
      console.log('newVal7788', newVal)
      if (newVal) {
        if (this.tabTitle === '待接收') {
          this._getMeanslist()
        } else if (this.tabTitle === '已接收') {
          this._getFininList()
        }
        this.getMeansClicked(false)
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    this._setDefaultLocalData()
    next()
  },
  created () {
    this._getMeanslist()
    this._setDefaultSearch()
  }
}
</script>
