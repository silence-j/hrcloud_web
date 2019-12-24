<template>
  <div class="mt-20 table-setting-warp" @click="orgDatas1.showTree = false">
    <div class="table-setting-icon el-icon-setting" @click="chooseMsg"></div>
    <el-table
      :data="waitFundList"
      border @sort-change="sortChange">
      <el-table-column
        label="序号"
        type="index"
        width="60">
      </el-table-column>

      <div v-for="item in fieldList" :key="item.id">
        <template v-if="item.prop == 'status'">
          <el-table-column
            label="缴纳状态"
            prop="status" min-width="120">
            <template slot-scope="scope">
              <div>
                <span>{{scope.row.status | filterStatus}}</span>
              </div>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column
            :label="item.name"
            :prop="item.prop" :key="item.name" :sortable="item.orderFlag === 1" min-width="120">
          </el-table-column>
        </template>
      </div>

      <el-table-column
        label="操作"
        fixed="right"
        width="200px">
        <template slot-scope="scope">
          <div class="operation">
            <div v-if="scope.row.canOperate === 1">
              <span v-show="permission.indexOf('办理') !=-1" @click="handleMsg(scope.row)">办理</span>
              <span v-show="permission.indexOf('不缴纳') !=-1" @click="NotTopayMsg(scope.row)">不缴纳</span>
              <span v-show="permission.indexOf('异地') !=-1" @click="otherPlaceMsg(scope.row)">异地</span>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageMsg.currentPage"
      :page-sizes="pageMsg.pageSizes"
      :page-size="pageMsg.pageSize"
      :total="pageMsg.total">
    </pagination>

    <!-- 不缴纳原因 -->
    <el-dialog title="不缴纳" :visible.sync="notToypayFormVisible" width="30%">
      <el-form :model="notToypayForm">
        <el-form-item label="不缴纳原因：" label-width="120px" class="mustForm">
          <el-input type="textarea" v-model="notToypayForm.reason"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="notToypayFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="notToypaySave" size="mini">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 异地 -->
    <el-dialog title="异地缴纳" :visible.sync="otherPlaceVisible" width="30%">
      <el-form>
        <el-form-item label="异地缴纳公司:" label-width="120px" class="mustForm">
          <div class="search-form_item">
            <search-dept-tree :orgDatas="orgDatas1" ref="deptTree"/>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="otherPlaceVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="otherPlaceSave" size="mini">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getFundList, getFundHandelSave } from 'static/api/socialSecurity'
import { timeZeroToString } from 'assets/js/common'
import { listByUserId } from 'static/api/common/common'
import { getToken } from 'assets/js/util'
import Pagination from 'components/Pagination.vue'
import { mapGetters, mapMutations } from 'vuex'
import { getExmine } from 'assets/js/exmine'
import SearchDeptTree from 'components/SearchDeptTree'
export default {
  data () {
    return {
      // 选择显示字段
      fieldList: [],
      prop: '',
      order: '',
      orgDatas1: {
        filterName: '',
        orgId: '',
        dataTree: [],
        showTree: false,
        isLimit: '0',
        bindData: 'different'
      },
      waitFundList: [],
      otherPlaceVisible: false,
      notToypayFormVisible: false,
      notToypayForm: {
        reason: ''
      },
      userId: '',
      SignVisible: false,
      SignForm: {
        orgName: '',
        signTime: ''
      },
      pageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      }
    }
  },
  computed: {
    ...mapGetters(['getFundSearchArr', 'getFundClicked', 'getIsDel', 'getDeepSearchOptions', 'getChooseCheck']),
    listParams () {
      return {
        startTime: this.getFundSearchArr.startTime ? timeZeroToString(this.getFundSearchArr.startTime) : '',
        endTime: this.getFundSearchArr.endTime ? timeZeroToString(this.getFundSearchArr.endTime) : '',
        keyword: this.getFundSearchArr.keyword,
        status: this.getFundSearchArr.fundStatus,
        page: this.pageMsg.currentPage,
        size: this.pageMsg.pageSize,
        tag: 1,
        prop: this.prop,
        order: this.order,
        options: this.getDeepSearchOptions
      }
    },
    permission () {
      return getExmine().infoAllProviden
    }
  },
  components: {
    Pagination,
    SearchDeptTree
  },
  methods: {
    ...mapMutations({
      setDelType: 'SET_ACCEPT_IS_DELETE',
      setUninsuredMsg: 'SET_RECORD_NMINSURED_MSG'
    }),
    /* 获取列表信息 */
    _getFundList () {
      getFundList(this.listParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.waitFundList = data.result.records
          }
          this.pageMsg.total = data.result.total
        }
      })
    },
    /** 分页**/
    handleSizeChange (pageSize) {
      this.pageMsg.pageSize = pageSize
      this._getFundList()
    },
    handleCurrentChange (currentPage) {
      this.pageMsg.currentPage = currentPage
      this._getFundList()
    },
    /* 缴纳 */
    handleMsg (row) {
      this.$router.push({ name: '公积金办理',
        params: {
          Id: row.userId,
          type: 'handle'
        } })
    },
    /* 不缴纳 */
    NotTopayMsg (row) {
      this.userId = row.userId
      this.notToypayFormVisible = true
      this.notToypayForm.reason = ''
    },
    notToypaySave () {
      let param = {
        userId: this.userId,
        remark: this.notToypayForm.reason,
        status: 0
      }
      if (!this.notToypayForm.reason) {
        this.$message.warning('请填写不缴纳原因!')
        return false
      }
      getFundHandelSave(param).then(data => {
        this.$message.success('操作成功!')
        setTimeout(() => {
          this._getFundList()
          this.setUninsuredMsg('11')
          this.notToypayFormVisible = false
        }, 500)
      })
    },
    /* 异地签 */
    otherPlaceMsg (row) {
      this.userId = row.userId
      this.otherPlaceVisible = true
      setTimeout(() => {
        this.$refs.deptTree.clearSelectTree()
      })
      /* setTimeout(() => {
        this.$refs.deptTree.getCompany('1')
      }, 200) */
    },
    otherPlaceSave () {
      let param = {
        userId: this.userId,
        status: 1,
        offsiteId: this.orgDatas1.orgId,
        offsiteName: this.orgDatas1.filterName
      }
      if (!param.offsiteId) {
        this.$message.warning('请选择缴纳公司!')
        return false
      }
      getFundHandelSave(param).then(data => {
        this.$message.success('操作成功!')
        setTimeout(() => {
          this.otherPlaceVisible = false
          this._getFundList()
        }, 500)
      })
    },
    // 选择显示字段
    chooseMsg () {
      this.$store.commit('SET_CHOOSE_VIS', true)
    },
    // 获取原来选择字段
    _getUserFiled () {
      this.fieldList = []
      let preload = {
        userId: getToken('loginId').toString(),
        type: 'fund'
      }
      listByUserId(preload).then((data) => {
        if (data.result) {
          this.fieldList = data.result
          this.$store.commit('SET_CHOOSE_FILELIST', data.result.map(item => item.prop))
        }
        setTimeout(() => {
          this._getFundList()
        }, 10)
      })
    },
    // 排序
    sortChange (column, prop, order) {
      if (column && column.prop) {
        let orderColumn = this.fieldList.filter(item => item.prop === column.prop)[0].orderColumn
        this.prop = orderColumn
        this.order = column.order
        this._getFundList()
      } else {
        this.prop = ''
        this.order = ''
        this._getFundList()
      }
    }
  },
  filters: {
    filterStatus (status) {
      if (status === 0) {
        status = '不缴纳'
      } else if (status === 1) {
        status = '待办理'
      } else if (status === 2) {
        status = '缴纳中'
      } else if (status === 9) {
        status = '已停缴'
      }
      return status
    }
  },
  watch: {
    getFundClicked (val) {
      if (val) {
        this.handleCurrentChange(1)
      }
      this.$store.commit('SET_FUND_CLICKED', false)
    },
    getIsDel (val) {
      if (val) {
        this.pageMsg.currentPage = 1
        this._getFundList()
      }
      this.setDelType('')
    },
    getDeepSearchOptions (val) {
      if (val) {
        this.listParams.options = val
        this.handleCurrentChange(1)
      }
    },
    getChooseCheck (value) {
      console.log(11)
      if (value) {
        console.log(value)
        this._getUserFiled()
      }
    }
  },
  created () {
    this._getUserFiled()
  }
}
</script>

<style scoped lang="less">
.el-form-item.mustForm {
  position: relative;
}
.el-form-item.mustForm:before {
  content: "*";
  color: red;
  position: absolute;
  top: 15px;
  left: 12px;
}
.operation span{
  padding:0px 3px;
}
</style>
