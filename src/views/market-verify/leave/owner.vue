<template>
<div class="owner-box">
  <el-table
    :data="verifyOwnerDatas"
    border
    tooltip-effect="dark"
    style="max-width: 100%;min-width:700px;overflow-y: auto"
    >
    <el-table-column
      label="序号"
      type="index"
      width="60">
    </el-table-column>
    <el-table-column
      label="姓名"
      prop="name"
      width="160px">
    </el-table-column>
    <el-table-column
      label="身份证号"
      prop="idNo"
      width="200px">
    </el-table-column>
    <el-table-column
      label="部门"
      prop="deptName"
      width="170px">
    </el-table-column>
    <el-table-column
      label="岗位"
      width="170px"
      prop="postName">
    </el-table-column>
    <el-table-column
      label="联系方式"
      prop="telephone"
      width="120px">
    </el-table-column>
    <el-table-column
      label="离职日期"
      prop="outTime"
      >
    </el-table-column>
    <el-table-column
      label="创建时间"
      >
      <template slot-scope="scope">
        {{scope.row.createTime}}
      </template>
    </el-table-column>
    <el-table-column
      label="离职说明"
      prop="outType"
      >
    </el-table-column>
    <el-table-column
      label="状态"
      width="155px">
      <template slot-scope="scope">
        <div v-if ="scope.row.realityEndTime === null">
          待审批
        </div>
        <div v-else>
          <div v-if ="scope.row.reason === ''">
            <span>已同意</span>
          </div>
          <div v-else-if ="scope.row.reason === '撤销操作'">
            <span>已撤销</span>
          </div>
          <div v-else>
            <el-tooltip placement="top" effect="light">
              <div slot="content" style="width: 130px;height: 55px;overflow: auto;">{{scope.row.reason}}</div>
              <span>不同意</span>
            </el-tooltip>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      fixed="right"
      width="130px">
      <template slot-scope="scope">
        <div class="operation">
          <span @click="detailMsg(scope.row, 'owner')">详情</span>
          <span v-if="scope.row.task !== null && scope.row.task.name === '离职人事审批'" @click="revoke(scope.row)">撤销</span>
          <span v-if="scope.row.reason !== null && scope.row.reason !== ''&&scope.row.reason !== '撤销操作'" @click="leaveMsg(scope.row)">重新发起</span>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <pagination
    @size-change="handleLownerSizeChange"
    @current-change="handleLownerCurrentChange"
    :current-page="lownerPageMsg.currentPage"
    :page-sizes="lownerPageMsg.pageSizes"
    :page-size="lownerPageMsg.pageSize"
    :total="lownerPageMsg.total">
  </pagination>

  <!--详情 -->
  <el-dialog title="详情" :visible.sync="detailVisible" v-draggable width="600px">
      <el-form :model="detailForm" label-width="140px">
        <el-form-item
        label="申请日期："
        >
          {{detailForm.applyTime}}
        </el-form-item>
        <el-form-item
        label="申请原因："
          >
          {{detailForm.outType}}
        </el-form-item>
        <el-form-item
        label="确定离职日期："
        >
        {{detailForm.outTime}}
        </el-form-item>
        <el-form-item
        label="离 职 类 型："
        >
        {{detailForm.outTypeSure}}
        </el-form-item>
        <el-form-item label="备  注：">
          {{detailForm.remark}}
        </el-form-item>
      </el-form>
  </el-dialog>

  <!-- 离职申请 -->
  <el-dialog  title="离职申请" :visible.sync="LeaveVisible" v-draggable width="600px">
    <el-form :model="LeaveForm" label-width="150px" :rules="leaveFormRules" ref="LeaveForm" class="dialog-form">
      <el-form-item
        label="申请日期："
        prop="dimissionDate">
          <el-date-picker
            v-model="LeaveForm.dimissionDate"
            type="date"
            placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="申请原因：" prop="dimissionReason">
        <el-select
          v-model="LeaveForm.dimissionReason"
          style="width: 100%"
          placeholder="请选择">
          <el-option
            v-for="item in dimresonOption"
            :key="item.id"
            :label="item.codeText"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="sureLeavetime"
        label="确定离职日期：">
        <el-date-picker
          v-model="LeaveForm.sureLeavetime"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="离 职 类 型："
        prop="reson">
        <el-select
          v-model="LeaveForm.reson"
          style="width:100%"
          placeholder="请选择">
          <el-option
            v-for="item in leaveOption"
            :key="item.id"
            :label="item.codeText"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备  注：">
        <el-input type="textarea" v-model="LeaveForm.remark"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="LeaveVisible = false" class="false" size="mini">取 消</el-button>
        <el-button type="primary" @click="leaveSave('LeaveForm')" size="mini">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
import { getToken } from 'assets/js/util'
import { timeZeroToString } from 'assets/js/common'
import { leaveRollback } from 'static/api/verify/leave/leave'
import { getTaskFinshed, rollBackExmine } from 'static/api/recruit/entry/entry'
import Pagination from 'components/Pagination'
import { leaveApply } from 'static/api/personnel-information/base/base'
import { getDeptNo, getSysDic } from 'static/api/common/common'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      tabTitle: '我发起的',
      lownerPageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      verifyOwnerDatas: [],
      detailVisible: false,
      UnagreeVisible: false,
      agreeVisible: false,
      agreeForm: {
        id: '',
        reson: '',
        remark: '',
        leavetime: '',
        sureLeavetime: ''
      },
      UnagreeForm: {
        id: '',
        reson: '',
        remark: ''
      },
      detailForm: {
        applyTime: '',
        outType: '',
        outTime: '',
        reason: '',
        outTimeSure: '',
        outTypeSure: ''
      },
      revokeForm: {
        dutyId: '',
        userId: ''
      },
      LeaveVisible: false,
      LeaveForm: {
        dimissionDate: '',
        dimissionReason: '',
        remark: '',
        reson: '',
        sureLeavetime: ''
      },
      leaveOption: [],
      /* leaveSelect: [
        {value: 1, label: '公司提出离职'},
        {value: 2, label: '员工提出离职'},
        {value: 3, label: '公司协商离职'},
        {value: 4, label: '员工协商离职'}
      ], */
      dimresonOption: [],
      /*  dimresonSelect: [
          {value: '个人发展', label: '个人发展'},
          {value: '工作环境', label: '工作环境'},
          {value: '薪酬福利', label: '薪酬福利'},
          {value: '家庭原因', label: '家庭原因'},
          {value: '其它原因', label: '其它原因'}
      ], */
      getIds: '',
      leaveFormRules: {
        dimissionDate: {
          required: true, message: '请选择离职日期', trigger: 'change', type: 'date'
        },
        dimissionReason: {
          required: true, message: '请选择离职原因', trigger: 'change'
        },
        reson: {
          required: true, message: '请选择离职类型', trigger: 'change'
        },
        sureLeavetime: {
          required: true, message: '请选择确定离职日期', trigger: 'change', type: 'date'
        }
      }
    }
  },
  computed: {
    ...mapGetters(['getMarketVerifyLeaveSearchArr', 'getMarketVerifyLeaveClick']),
    contractOwnerParams () {
      return {
        actType: 'outMarket',
        userId: getToken('loginId').toString(),
        keyword: this.getMarketVerifyLeaveSearchArr.keyword,
        startTime: this.getMarketVerifyLeaveSearchArr.startTime ? timeZeroToString(this.getMarketVerifyLeaveSearchArr.startTime) : '',
        endTime: this.getMarketVerifyLeaveSearchArr.endTime ? timeZeroToString(this.getMarketVerifyLeaveSearchArr.endTime) : '',
        page: this.lownerPageMsg.currentPage,
        size: this.lownerPageMsg.pageSize,
        searchType: 'ower'
      }
    }
  },
  methods: {
    handleLownerSizeChange (pageSize) {
      this.lownerPageMsg.pageSize = pageSize
      this._getOwnerTaskList()
    },
    handleLownerCurrentChange (currentPage) {
      this.lownerPageMsg.currentPage = currentPage
      this._getOwnerTaskList()
    },
    // 详情
    detailMsg (row, tab) {
      this.detailVisible = true
      this.detailForm.applyTime = row.applyTime ? timeZeroToString(row.applyTime) : ''
      this.detailForm.outTime = row.outTime
      this.detailForm.outTypeSure = row.remark
      this.detailForm.outType = row.outType.split(',')[0]
      this.detailForm.remark = row.outType.split(',')[1]
    },
    // 我发起的
    _getOwnerTaskList () {
      getTaskFinshed(this.contractOwnerParams).then(data => {
        if (data.result) {
          this.verifyOwnerDatas = data.result.records
          this.lownerPageMsg.total = data.result.total
        }
      })
    },
    // 撤销
    revoke (row) {
      this.revokeForm.userId = row.employeeId
      let revokeParams = {
        'taskId': row.task.id,
        'pId': row.historicTaskInstance.executionId,
        'tKey': row.historicTaskInstance.taskDefinitionKey,
        'userId': 'rolluser',
        'owner': row.userId,
        'actType': 'outMarket'
      }
      let Params = {
        auditStatus: 0,
        userId: this.revokeForm.userId.toString()
      }
      this.$confirm('确定要撤销' + row.name + '离职申请吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        rollBackExmine(revokeParams).then(data => {
          leaveRollback(Params).then(res => {
            this.$message.success('撤销成功')
            this._getOwnerTaskList()
          })
        })
      }).catch(() => {})
    },
    // 离职申请
    leaveMsg (row) {
      this.LeaveForm.remark = ''
      this.LeaveForm.dimissionReason = ''
      this.LeaveForm.reson = ''
      this.LeaveForm.sureLeavetime = ''
      this.LeaveVisible = true
      this.LeaveForm.dimissionDate = new Date(row.outTime)
      let LeaveDate = {
        dimissionStatus: 8,
        userId: row.employeeId
        // deptNo: (row.employeeId).toString()
      }
      this.LeaveDateForm = LeaveDate
    },
    leaveSave (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.LeaveDateForm.dimissionDate = this.LeaveForm.dimissionDate ? timeZeroToString(this.LeaveForm.dimissionDate) : ''
          this.LeaveDateForm.dimissionReason = this.LeaveForm.dimissionReason
          this.LeaveDateForm.remark = this.LeaveForm.remark

          this.LeaveDateForm.dimissionDateComfirmed = timeZeroToString(this.LeaveForm.sureLeavetime)
          this.LeaveDateForm.dimissionType = this.LeaveForm.reson

          leaveApply(this.LeaveDateForm).then(data => {
            this.$message.success('离职申请成功')
            setTimeout(() => {
              this._getOwnerTaskList()
            }, 400)

            this.LeaveVisible = false
          })
        }
      })
    },
    // 获取ids
    _getDeptNo () {
      getDeptNo().then((data) => {
        if (data && data.data) {
          this.getIds = data.data.toString()
        }
      })
    },
    /* 获取数字字典 */
    async _getQueryClassList () {
      /* 确认离职类型 */
      await getSysDic('auditDimissionType').then((data) => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.leaveOption.push(item)
            }
          })
        }
      })
      /* 离职申请原因 */
      await getSysDic('dimissionType').then(data => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.dimresonOption.push(item)
            }
          })
        }
      })
    }
  },
  components: {
    Pagination
  },
  watch: {
    getMarketVerifyLeaveClick (val) {
      if (val) {
        this.handleLownerCurrentChange(1)
      }
      this.$store.commit('SET_MARKETVERIFY_CLICKED', false)
    }
  },
  created () {
    this._getOwnerTaskList()
    this._getDeptNo()
    this._getQueryClassList()
  }
}
</script>
