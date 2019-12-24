<template>
  <div class="mt-20 table-setting-warp" @click="showTreeTag1=false;">
    <div class="table-setting-icon el-icon-setting" @click="chooseMsg"></div>
    <el-table
      :data="stopFundList" @sort-change="sortChange"
      border>
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
              <span>{{scope.row.status | filterStatus}}</span>
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
                <span v-show="permission.indexOf('停缴') !=-1" @click="stopMsg(scope.row)">停缴</span>
                <span v-show="permission.indexOf('查看') !=-1" @click="lookMsg(scope.row)">查看</span>
             </div>
             <div v-else>
                <span v-show="permission.indexOf('查看') !=-1" @click="lookMsg(scope.row)">查看</span>
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

    <!--停缴 -->
    <el-dialog title="停缴" :visible.sync="stopFormVisible" width="30%">
      <el-form :model="form" label-width="105px">
        <el-form-item label="停缴原因：" class="mustForm">
          <el-select v-model="form.endReasonType" placeholder="请选择停缴原因">
            <el-option
              v-for="item in endReasonTypeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="停缴月份：" class="mustForm">
          <el-date-picker
            v-model="form.endMonth"
            type="month"
            placeholder="选择停缴月份">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备　注：">
          <el-input type="textarea" v-model="form.endReason" placeholder="填写备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="stopFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="stopSaveMsg" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getFundList, getFundHandelSave } from 'static/api/socialSecurity'
import { timeZeroToString } from 'assets/js/common'
import Pagination from 'components/Pagination.vue'
import { listByUserId } from 'static/api/common/common'
import { getToken } from 'assets/js/util'
import { mapGetters, mapMutations } from 'vuex'
import { getExmine } from 'assets/js/exmine'
export default {
  data () {
    return {
      // 选择显示字段
      fieldList: [],
      prop: '',
      order: '',
      form: {
        endMonth: '',
        endReasonType: '',
        endReason: ''
      },
      stopFundList: [],
      endReasonTypeOption: [
        { value: '离职', label: '离职' },
        { value: '调出', label: '调出' },
        { value: '其他', label: '其他' }
      ],
      stopFormVisible: false,
      userId: '',
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
        status: this.fundStatus,
        page: this.pageMsg.currentPage,
        size: this.pageMsg.pageSize,
        tag: 2,
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
    Pagination
  },
  methods: {
    ...mapMutations({
      setUninsuredMsg: 'SET_RECORD_NMINSURED_MSG'
    }),
    /* 获取列表信息 */
    _getFundList () {
      getFundList(this.listParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.stopFundList = data.result.records
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
    /* 查看 */
    lookMsg (row) {
      this.$router.push({ name: '公积金办理',
        params: {
          Id: row.userId,
          type: 'check'
        } })
    },
    /* 停缴 */
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
        this.$message.warning('请填写停缴原因!')
        return false
      }
      if (!this.form.endMonth) {
        this.$message.warning('请填写停缴月份!')
        return false
      }
      getFundHandelSave(param).then(data => {
        this.$message.success('操作成功!')
        this.setUninsuredMsg('11')
        setTimeout(() => {
          this._getFundList()
          this.stopFormVisible = false
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
      if (value) {
        this._getUserFiled()
      }
    }
  },
  created () {
    // this._getFundList()
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
