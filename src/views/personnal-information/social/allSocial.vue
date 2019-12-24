<template>
  <div class="mt-20 table-setting-warp" @click="orgDatas.showTree = false">
    <div class="table-setting-icon el-icon-setting" @click="chooseMsg"></div>
    <el-table
      :data="allSocialList"
      style="width: 100%"
      border @sort-change="sortChange">
      <el-table-column
        label="序号"
        type="index"
        width="60">
      </el-table-column>

      <div v-for="item in fieldList" :key="item.id">
        <template v-if="item.prop == 'status'">
          <el-table-column
            label="参保状态"
            prop="status"
            min-width="120px">
            <template slot-scope="scope">
              <div v-if="scope.row.status==0">
                <el-tooltip placement="top" effect="light">
                  <div slot="content" style="width: 130px;height: 55px;overflow: auto;">{{scope.row.remark}}</div>
                  <span>{{scope.row.status | filterStatus}}</span>
                </el-tooltip>
              </div>
              <div v-else>
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
              <span v-show="permission.indexOf('变更') !=-1 && scope.row.status === 2" @click="insuredChangeMsg(scope.row)" v-if="scope.row.status === 2">变更</span>
              <span v-show="(permission.indexOf('参保') !=-1) && (scope.row.status === 0 || scope.row.status === 1)" @click="insuredMsg(scope.row)">参保</span>
              <span v-show="permission.indexOf('停保') !=-1 && scope.row.status === 2" @click="stopMsg(scope.row)">停保</span>
              <span v-show="permission.indexOf('不参保') !=-1 && scope.row.status === 1" @click="UninsuredMsg(scope.row,'check')">不参保</span>
              <span v-show="permission.indexOf('查看') !=-1 && scope.row.status === 2" @click="lookMsg(scope.row)">查看</span>
              <span v-show="permission.indexOf('查看') !=-1 && scope.row.status === 9" @click="lookStopMsg(scope.row)" v-if="scope.row.status === 9 ">查看</span>
              <span v-show="(permission.indexOf('异地') !=-1) && (scope.row.status === 0 || scope.row.status === 1)" @click="otherPlaceMsg(scope.row)">异地</span>
            </div>
            <div v-else>
              <span v-show="permission.indexOf('查看') !=-1 && scope.row.status === 2" @click="lookMsg(scope.row)">查看</span>
              <span v-show="permission.indexOf('查看') !=-1 && scope.row.status === 9" @click="lookStopMsg(scope.row)">查看</span>
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

    <!--停保 -->
    <el-dialog title="停保" :visible.sync="stopFormVisible" width="500px">
      <el-form :model="form" label-width="120px" >
        <el-form-item label="停 保 原 因：" class="mustForm">
          <el-select v-model="form.endReasonType" placeholder="请选择停保原因">
            <el-option
              v-for="item in endReasonTypeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="停 保 月 份：" class="mustForm">
          <el-date-picker
            v-model="form.endMonth"
            type="month"
            placeholder="选择停保月份">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备  注:">
          <el-input type="textarea" v-model="form.endReason" placeholder="填写备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="stopFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="stopSaveMsg" size="mini">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 不参保原因 -->
    <el-dialog title="不参保" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="不参保原因：" label-width="120px" class="mustForm">
          <el-input type="textarea" v-model="unCbform.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="unCbSaveBtn" size="mini">确 定</el-button>
      </div>
    </el-dialog>

     <!-- 异地 -->
    <el-dialog title="异地缴纳" :visible.sync="otherPlaceVisible" width="500px">
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
import { getSocialList, getSocialSave } from 'static/api/socialSecurity'
import Pagination from 'components/Pagination.vue'
import { timeZeroToString } from 'assets/js/common'
import { mapGetters, mapMutations } from 'vuex'
import { getToken } from 'assets/js/util'
import { getExmine } from 'assets/js/exmine'
import { listByUserId } from 'static/api/common/common'
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
      allSocialList: [],
      pageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      stopFormVisible: false,
      form: {
        endMonth: '',
        endReasonType: '',
        endReason: ''
      },
      endReasonTypeOption: [
        { value: '离职', label: '离职' },
        { value: '调出', label: '调出' },
        { value: '其他', label: '其他' }
      ],
      unCbform: {
        remark: ''
      },
      dialogFormVisible: false,
      userIdData: '',
      otherPlaceVisible: false,
      /* 异地签 */
      SignVisible: false,
      offsiteName: '',
      offsiteId: '',
      options: [],
      from: {
        nowMonth: ''
      }
    }
  },
  components: {
    Pagination,
    SearchDeptTree
  },
  computed: {
    ...mapGetters(['getSocialSearchArr', 'getSocialClicked', 'getIsDel', 'getDeepSearchOptions', 'getChooseCheck']),
    permission () {
      return getExmine().infoAllSocial
    },
    listParams () {
      return {
        keyword: this.getSocialSearchArr.keyword,
        status: this.getSocialSearchArr.status,
        nature: this.getSocialSearchArr.nature,
        company: this.getSocialSearchArr.company,
        page: this.pageMsg.currentPage,
        size: this.pageMsg.pageSize,
        tag: 0,
        prop: this.prop,
        order: this.order,
        options: this.getDeepSearchOptions
      }
    }
  },
  methods: {
    ...mapMutations({
      setDelType: 'SET_ACCEPT_IS_DELETE'
    }),
    /* 获取列表信息 */
    _getSocialList () {
      getSocialList(this.listParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.allSocialList = data.result.records
          }
          this.pageMsg.total = data.result.total
        }
      })
    },
    /** 分页**/
    handleSizeChange (pageSize) {
      this.pageMsg.pageSize = pageSize
      this._getSocialList()
    },
    handleCurrentChange (currentPage) {
      this.pageMsg.currentPage = currentPage
      this._getSocialList()
    },
    /* 停保 */
    stopMsg (row) {
      this.userId = row.userId
      this.stopFormVisible = true
      this.form.endMonth = ''
      this.form.endReasonType = ''
      this.form.endReason = ''
    },
    stopSaveMsg () {
      let param = {
        userId: this.userId,
        status: 9,
        endMonth: timeZeroToString(this.form.endMonth),
        endReasonType: this.form.endReasonType,
        endReason: this.form.endReason
      }
      if (!this.form.endReasonType) {
        this.$message.error('请填写停保原因!')
        return false
      }
      if (!this.form.endMonth) {
        this.$message.warning('请填写停保月份!')
        return false
      }
      getSocialSave(param).then(data => {
        this.$message.success('操作成功!')
        setTimeout(() => {
          this._getSocialList()
          this.stopFormVisible = false
        }, 500)
      })
    },
    /* 不参保 */
    UninsuredMsg (row) {
      this.userIdData = row.userId
      this.dialogFormVisible = true
      this.unCbform.remark = ''
    },
    unCbSaveBtn () {
      let param = {
        userId: this.userIdData,
        remark: this.unCbform.remark,
        status: 0
      }
      if (!this.unCbform.remark) {
        this.$message.warning('请填写不参保原因!')
        return false
      }
      getSocialSave(param).then(data => {
        this.$message.success('操作成功!')
        setTimeout(() => {
          this._getSocialList()
          this.dialogFormVisible = false
        }, 500)
      })
    },
    /* 变更 */
    insuredChangeMsg (row) {
      this.$router.push({ name: '社保参保查看',
        params: {
          Id: row.userId,
          type: 'change'
        } })
    },
    /* 参保 */
    insuredMsg (row) {
      this.$router.push({ name: '社保参保查看',
        params: {
          Id: row.userId,
          type: 'handle'
        } })
    },
    /* 查看 */
    lookMsg (row) {
      this.$router.push({ name: '社保参保查看',
        params: {
          Id: row.userId,
          type: 'check'
        } })
    },
    /* 已停保查看 */
    lookStopMsg (row) {
      this.$router.push({ name: '社保参保查看',
        params: {
          Id: row.userId,
          type: 'stopcheck'
        } })
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
      getSocialSave(param).then(data => {
        this.$message.success('操作成功!')
        setTimeout(() => {
          this.otherPlaceVisible = false
          this._getSocialList()
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
        type: 'insurance'
      }
      listByUserId(preload).then((data) => {
        if (data.result) {
          this.fieldList = data.result
          this.$store.commit('SET_CHOOSE_FILELIST', data.result.map(item => item.prop))
        }
        setTimeout(() => {
          this._getSocialList()
        }, 10)
      })
    },
    // 排序
    sortChange (column, prop, order) {
      if (column && column.prop) {
        let orderColumn = this.fieldList.filter(item => item.prop === column.prop)[0].orderColumn
        this.prop = orderColumn
        this.order = column.order
        this._getSocialList()
      } else {
        this.prop = ''
        this.order = ''
        this._getSocialList()
      }
    }
  },
  watch: {
    getSocialClicked (val) {
      if (val) {
        this.handleCurrentChange(1)
      }
      this.$store.commit('SET_SOCIAL_CLICKED', false)
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
      if (value) {
        this._getUserFiled()
      }
    }
  },
  filters: {
    filterStatus (status) {
      if (status === 0) {
        status = '不参保'
      } else if (status === 1) {
        status = '待参保'
      } else if (status === 2) {
        status = '参保中'
      } else if (status === 9) {
        status = '已停保'
      }
      return status
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
