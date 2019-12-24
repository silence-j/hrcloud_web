<template>
<div class="mt-20">
  <el-tabs type="border-card" @tab-click="tabClick">
    <el-tab-pane>
     <span slot="label">待移交</span>
      <el-table
        :data="MeansDatas"
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
          label="操作"
          fixed="right"
          width="140px">
          <template slot-scope="scope">
            <div class="operation">
              <span @click="revoke(scope.row, 'revoke')" v-show="(permission.indexOf('移交'))!==-1">资料移交</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        @size-change="handleMeansSizeChange"
        @current-change="handleMeansCurrentChange"
        :current-page="taskMeansPageMsg.currentPage"
        :page-sizes="taskMeansPageMsg.pageSizes"
        :page-size="taskMeansPageMsg.pageSize"
        :total="taskMeansPageMsg.total">
      </pagination>
    </el-tab-pane>
    <el-tab-pane>
      <span slot="label">已移交</span>
      <el-table
        :data="finshDatas"
        border >
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
          prop="transferTime"
          label="移交时间">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.status | filterMeansStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="140px">
          <template slot-scope="scope">
            <div class="operation">
              <span @click="moveMsg(scope.row)" v-show="scope.row.status === 1 && (permission.indexOf('撤销移交'))!==-1">撤销移交</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        @size-change="meansFinishSizeChange"
        @current-change="meansFinishCurrentChange"
        :current-page="meansFinishPageMsg.currentPage"
        :page-sizes="meansFinishPageMsg.pageSizes"
        :page-size="meansFinishPageMsg.pageSize"
        :total="meansFinishPageMsg.total">
      </pagination>
    </el-tab-pane>
     <el-tab-pane>
        <span slot="label">驳回列表</span>
        <el-table
          :data="moveDatas"
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
            prop="idCardNumber"
            width="200px">
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
            prop="transferTime"
            label="移交时间">
          </el-table-column>
          <el-table-column
            prop="reason"
            label="不接收原因">
              <template slot-scope="scope">
                <div v-if="scope.row.remark">
                  <el-tooltip placement="top" effect="light">
                    <div slot="content" style="width: 130px;height: 55px;overflow: auto;">{{scope.row.remark}}</div>
                    <span>{{scope.row.reason}}</span>
                  </el-tooltip>
                </div>
                <div v-else>
                  <span>{{scope.row.reason}}</span>
                </div>
              </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="160px">
            <template slot-scope="scope">
              <div class="operation">
                <span @click="revoke(scope.row, 'twoRevoke')" v-show="(permission.indexOf('重新移交'))!==-1">重新提交</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      <pagination
        @size-change="meansMoveSizeChange"
        @current-change="meansMoveCurrentChange"
        :current-page="meansMovePageMsg.currentPage"
        :page-sizes="meansMovePageMsg.pageSizes"
        :page-size="meansMovePageMsg.pageSize"
        :total="meansMovePageMsg.total">
      </pagination>
      </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
import { getExmine } from 'assets/js/exmine'
import { getMeansList, meansTransfer, meansMove } from 'static/api/means/means'
import { mapGetters, mapMutations } from 'vuex'
import { timeZeroToString } from 'assets/js/common'
import Pagination from 'components/Pagination'
import { getMeansStatus } from 'assets/js/filters'
export default {
  data () {
    return {
      taskMeansPageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      meansFinishPageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      meansMovePageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      MeansDatas: [],
      finshDatas: [],
      moveDatas: [],
      tabTitle: '待移交',
      transForm: {
        udtId: ''
      }
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
    meansParams () {
      return {
        status: 0,
        orgId: this.meansOrg ? this.meansOrg : [],
        entryDateBegin: this.meansStartTime ? timeZeroToString(this.meansStartTime) : '',
        entryDateEnd: this.meansEndTime ? timeZeroToString(this.meansEndTime) : '',
        keyword: this.meansKeyWords,
        page: this.taskMeansPageMsg.currentPage,
        size: this.taskMeansPageMsg.pageSize
      }
    },
    finshParams () {
      return {
        status: 4,
        orgId: this.meansOrg ? this.meansOrg : [],
        entryDateBegin: this.meansStartTime ? timeZeroToString(this.meansStartTime) : '',
        entryDateEnd: this.meansEndTime ? timeZeroToString(this.meansEndTime) : '',
        keyword: this.meansKeyWords,
        page: this.meansFinishPageMsg.currentPage,
        size: this.meansFinishPageMsg.pageSize
      }
    },
    moveParams () {
      return {
        status: 3,
        orgId: this.meansOrg ? this.meansOrg : [],
        entryDateBegin: this.meansStartTime ? timeZeroToString(this.meansStartTime) : '',
        entryDateEnd: this.meansEndTime ? timeZeroToString(this.meansEndTime) : '',
        keyword: this.meansKeyWords,
        page: this.meansMovePageMsg.currentPage,
        size: this.meansMovePageMsg.pageSize
      }
    },
    permission () {
      return getExmine().recruitMeansTransfer
    }
  },
  methods: {
    ...mapMutations({
      getMeansClicked: 'SET_MEANS_CLICKED'
    }),
    tabClick (tab, event) {
      if (tab.index === '0') {
        this.tabTitle = '待移交'
        this._getMeanslist()
      } else if (tab.index === '1') {
        this.tabTitle = '已移交'
        this._getFinishList()
      } else if (tab.index === '2') {
        this.tabTitle = '驳回列表'
        this._getMoveList()
      }
    },
    /** 资料移交**/
    revoke (row, type) {
      this.transForm.udtId = row.udtId
      this.$confirm('确定要移交' + row.name + '吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let preload = {
          udtId: this.transForm.udtId
        }
        meansTransfer(preload).then((data) => {
          this.$message.success('操作成功')
          setTimeout(() => {
            if (type === 'revoke') {
              this._getMeanslist()
            }
            if (type === 'twoRevoke') {
              this._getMoveList()
            }
          }, 200)
        })
      }).catch(() => {})
    },
    /** 撤销移交**/
    moveMsg (row) {
      this.transForm.udtId = row.udtId
      this.$confirm('确定要撤销' + row.name + '吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let preload = {
          udtId: this.transForm.udtId
        }
        meansMove(preload).then((data) => {
          this.$message.success('操作成功')
          setTimeout(() => {
            this._getFinishList()
          }, 200)
        })
      }).catch(() => {})
    },
    handleMeansSizeChange (pageSize) {
      this.taskMeansPageMsg.pageSize = pageSize
      this._getMeanslist()
    },
    handleMeansCurrentChange (currentPage) {
      this.taskMeansPageMsg.currentPage = currentPage
      this._getMeanslist()
    },
    meansFinishSizeChange (pageSize) {
      this.meansFinishPageMsg.pageSize = pageSize
      this._getFinishList()
    },
    meansFinishCurrentChange (currentPage) {
      this.meansFinishPageMsg.currentPage = currentPage
      this._getFinishList()
    },
    meansMoveSizeChange (pageSize) {
      this.meansMovePageMsg.pageSize = pageSize
      this._getMoveList()
    },
    meansMoveCurrentChange (currentPage) {
      this.meansMovePageMsg.currentPage = currentPage
      this._getMoveList()
    },
    _getMeanslist () {
      getMeansList(this.meansParams).then((data) => {
        if (data.result) {
          if (data.result.records) {
            this.MeansDatas = data.result.records
          }
          this.taskMeansPageMsg.total = data.result.total
        }
      })
    },
    _getFinishList () {
      getMeansList(this.finshParams).then((data) => {
        if (data.result) {
          if (data.result.records) {
            this.finshDatas = data.result.records
          }
          this.meansFinishPageMsg.total = data.result.total
        }
      })
    },
    _getMoveList () {
      getMeansList(this.moveParams).then((data) => {
        if (data.result) {
          if (data.result.records) {
            this.moveDatas = data.result.records
          }
          this.meansMovePageMsg.total = data.result.total
        }
      })
    }
  },
  components: {
    Pagination
  },
  watch: {
    meansClicked (newVal) {
      console.log('newVal', newVal)
      if (newVal) {
        if (this.tabTitle === '待移交') {
          this._getMeanslist()
        } else if (this.tabTitle === '已移交') {
          this._getFinishList()
        } else if (this.tabTitle === '驳回列表') {
          this._getMoveList()
        }
        this.getMeansClicked(false)
      }
    }
  },
  filters: {
    filterMeansStatus (status) {
      return getMeansStatus(status)
    }
  },
  created () {
    this._getMeanslist()
  }
}
</script>
