<template>
<div class="mt-20" @click="orgDatas1.showTree=false">
  <div class="table-setting-warp">
    <div class="table-setting-icon el-icon-setting" @click="chooseMsg"></div>
      <el-table
        :data="contractList"
        border @sort-change="sortChange">
        <el-table-column
          label="序号"
          type="index"
          width="60">
        </el-table-column>
        <div v-for="item in fieldList" :key="item.id">
          <template v-if="item.prop == 'status'">
            <el-table-column
              label="状态" min-width="120">
              <template slot-scope="scope">
                <div v-if="scope.row.status==11||scope.row.status==10" class="moveBtn">
                  <el-tooltip placement="top" effect="light">
                    <div slot="content" style="width: 130px;height: 55px;overflow: auto;">{{scope.row.contractCancelReason}}{{scope.row.noSignedRemark?'，'+scope.row.noSignedRemark:''}}</div>
                    <span>{{scope.row.status | filterStatus }}</span>
                  </el-tooltip>
                </div>
                <div v-else>
                  <span>{{scope.row.status | filterStatus }}</span>
                </div>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.prop == 'workSchedule'">
            <el-table-column
              prop="nature"
              label="工时制度" :sortable="item.orderFlag === 1">
              <template slot-scope="scope">
                {{scope.row.workSchedule | filterworkStatus}}
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
          width="240px">
          <template slot-scope="scope">
            <div class="operation">
              <div v-if="scope.row.canOperate === 0">
                <span @click="checkContractMsg(scope.row)" v-show="(permission.indexOf('查看'))!==-1 && scope.row.status !== 1">查看</span>
              </div>
              <div v-else>
                <span v-show="(scope.row.status === 1 || scope.row.status === 11 ) && (permission.indexOf('签订'))!=-1" @click="concludeMsg(scope.row)">签订</span>
                <span v-show="scope.row.status === 1 && (permission.indexOf('不签订'))!=-1" @click="UnconcludeMsg(scope.row)">不签订</span>
                <span v-show="scope.row.status === 2 && (permission.indexOf('办结'))!=-1" @click="BanjieMsg(scope.row)">办结</span>
                <span v-show="scope.row.status === 2 && (permission.indexOf('取消'))!=-1" @click="CancelMsg(scope.row)">取消</span>
                <span v-show="((scope.row.status === 3 && !scope.row.contractCancelTime) || scope.row.status === 4) && (permission.indexOf('解除'))!=-1" @click="RemoveMsg(scope.row)">解除</span>
                <span v-show="(((scope.row.status === 3 && !scope.row.contractCancelTime && scope.row.contractEndDate) || (scope.row.status === 4 && scope.row.deleteTag === 0))) && (permission.indexOf('续签'))!=-1" @click="editContractMsg(scope.row, 'renew')">续签</span>
                <span v-show="(scope.row.status === 3 && !scope.row.contractCancelTime) && (permission.indexOf('变更'))!=-1" @click="editContractMsg(scope.row, 'change')">变更</span>
                <span v-show="scope.row.status === 6 && (permission.indexOf('作废'))!=-1 " @click="DeleteMsg(scope.row)">作废</span>
                <span v-show="(scope.row.status === 1 || scope.row.status === 11) && (permission.indexOf('编辑'))!=-1" @click="editContractMsg(scope.row, 'edit')">编辑</span>
                <span @click="checkContractMsg(scope.row)" v-show="(permission.indexOf('查看'))!=-1 && (scope.row.status != 1 && scope.row.status != 11)">查看</span>
                <span @click="putMsg(scope.row)" v-show="scope.row.status === 5 && permission.indexOf('打印')!==-1" >离职证明</span>
                <span v-show="permission.indexOf('异地签')!=-1 && ((scope.row.status === 3 && !scope.row.contractCancelTime) || scope.row.status === 4 || scope.row.status === 1 || scope.row.status === 11)" @click="placeSignMsg(scope.row)">异地签</span>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br/>
    <el-button type="primary" size="mini" @click="exportBtn">导 出</el-button>
    <pagination
      @size-change="handleContractSizeChange"
      @current-change="handleContractCurrentChange"
      :current-page="pageMsg.currentPage"
      :page-sizes="pageMsg.pageSizes"
      :page-size="pageMsg.pageSize"
      :total="pageMsg.total">
    </pagination>
    <!-- 不签订原因 -->
    <el-dialog title="不签订原因" :visible.sync="UncancelVisible" width="500px">
      <el-form :model="UnconcludeForm" label-width="120px">
        <el-form-item label="不签订原因：" class="mustForm dialog-form">
          <el-select v-model="UnconcludeForm.contractCancelReason" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in resonSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="不签订说明：">
          <el-input type="textarea" v-model="UnconcludeForm.noSignedRemark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="UncancelVisible = false" class="false" size="mini">取 消</el-button>
        <el-button type="primary" @click="UnconcludeSave" size="mini">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 作废原因 -->
    <el-dialog title="作废原因" :visible.sync="DeleteVisible" width="500px">
      <el-form :model="DeleteForm" label-width="100px">
        <el-form-item label="作废原因：" class="dialog-form" required>
          <el-input type="textarea" v-model="DeleteForm.contractCancelReason"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="DeleteVisible = false" class="false" size="mini">取 消</el-button>
        <el-button type="primary" @click="DeleteSave" size="mini">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 异地签 -->
    <el-dialog title="异地签" :visible.sync="SignVisible" width="500px">
      <el-form :model="SignForm" label-width="110px">
        <el-form-item label="合同主体：" class="mustForm">
            <div class="search-form_item">
              <search-dept-tree :orgDatas="orgDatas1" ref="deptTree"/>
            </div>
        </el-form-item>
        <el-form-item label="解除时间：" class="mustForm" v-show="this.contractStatusNumber === 3 || this.contractStatusNumber === 4">
          <el-date-picker
            v-model="SignForm.signTime"
            type="date"
            placeholder="选择解除时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="SignVisible = false" class="false" size="mini">取 消</el-button>
        <el-button type="primary" @click="SignSave" size="mini">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 解除合同 -->
    <el-dialog title="解除合同"
      :visible.sync="RemoveVisible"
      v-draggable
      width="500px">
      <el-form :model="RemoveForm"
        label-width="120px"
        class="dialog-form">
        <el-form-item label="姓 名：">
          {{RemoveForm.name}}
        </el-form-item>
        <el-form-item label="身份证号：">
          {{RemoveForm.idCardNumber}}
        </el-form-item>
        <el-form-item label="合同开始时间：">
          {{RemoveForm.contractBeginDate}}
        </el-form-item>
        <el-form-item label="合同结束时间：">
          {{RemoveForm.contractEndDate ? RemoveForm.contractEndDate : '未填写' }}
        </el-form-item>
        <el-form-item label="解 除 时 间：" class="mustForm">
          <el-date-picker
            v-model="RemoveForm.contractCancelTime"
            type="date"
            placeholder="请选择解除时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="解 除 原 因：" class="mustForm">
          <el-select v-model="RemoveForm.contractCancelReason" clearable placeholder="请选择解除原因" style="width:100%">
            <el-option
              v-for="item in RemoveSelect"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备　　注：">
          <el-input type="textarea" v-model="RemoveForm.reson"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="RemoveVisible = false" class="false" size="mini">取 消</el-button>
          <el-button type="primary" @click="RemoveSave" size="mini">确 定</el-button>
      </span>
    </el-dialog>
    <!--选择显示字段-->
    <ChooseColumn :chooseData="chooseData" ref="chooseColumn"></ChooseColumn>
    <!-- 导出列表 -->
    <form style="display:none" name="form" method="POST" ref="submitExcel" id="submitExcel" :action="hostBaseUrl+'/contract/exportDetail'">
      <p>keyword: <input type="text" id="keyword" name="keyword" value="" /></p>
      <p>endDate: <input type="text" id="endDate" name="endDate" value="" /></p>
      <p>status: <input type="text" id="status" name="status" value="" /></p>
      <input type="submit" value="Submit"/>
    </form>
</div>
</template>
<script>
import { commonContract, waitContract, stopContract, renewalContract } from 'assets/mixins/contractMixins'
import { getContractList, startContract } from 'static/api/contract/contract'
import { timeZeroToString } from 'assets/js/common'
import { hostBaseUrl } from 'utils/config'
import { getToken } from 'assets/js/util'
import { mapGetters } from 'vuex'
import { contractStatus, getfilterworkStatus } from 'assets/js/filters'
const pageMsg = {
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 20, 50],
  total: 0
}
export default {
  mixins: [commonContract, waitContract, stopContract, renewalContract],
  data () {
    return {
      hostBaseUrl,
      DeleteVisible: false,
      DeleteForm: {
        id: '',
        userId: '',
        contractCancelReason: '',
        contractSubjectId: '',
        periodType: ''
      },
      UnconcludeForm: {
        remark: '',
        contractCancelReason: ''
      },
      searchFlag: false,
      contractSearchForm: {}
    }
  },
  computed: {
    ...mapGetters(['getContracrArr'])
  },
  watch: {
    searchFlag (value) {
      if (value) {
        this.searchFlag = false
      }
    }
  },
  methods: {
    putMsg (row) {
      this.$router.push({
        name: '解除合同打印',
        params: {
          contractId: row.id,
          userId: row.userId,
          cancelTime: row.contractCancelTime,
          contractSub: row.contractSubject
        }
      })
    },
    /** 作废原因**/
    DeleteMsg (row) {
      this.DeleteVisible = true
      this.DeleteForm.id = row.id
      this.DeleteForm.userId = row.userId
      this.DeleteForm.contractSubject = row.contractSubject
      this.DeleteForm.name = row.name
      this.DeleteForm.telephone = row.telephone
      this.DeleteForm.idCardNumber = row.idCardNumber
      this.DeleteForm.contractNumber = row.contractNumber
      this.DeleteForm.contractPeriod = row.contractPeriod
      this.DeleteForm.contractBeginDate = row.contractBeginDate
      this.DeleteForm.contractEndDate = row.contractEndDate
      this.DeleteForm.workSchedule = row.workSchedule
      this.DeleteForm.salary = row.salary
      this.DeleteForm.trySalary = row.trySalary
      this.DeleteForm.workContent = row.workContent
      this.DeleteForm.workAdress = row.workAdress
      this.DeleteForm.userAdress = row.userAdress
      this.DeleteForm.zipCode = row.zipCode
      this.DeleteForm.remark = row.remark
      this.DeleteForm.contractSubjectId = row.contractSubjectId
      this.DeleteForm.levelOne = row.levelOne
      this.DeleteForm.periodType = row.periodType
      this.deptNo = row.oldSubjectId
    },
    DeleteSave () {
      const DeleteParams = {
        id: this.DeleteForm.id,
        userId: getToken('loginId').toString(),
        employeeId: this.DeleteForm.userId,
        name: this.DeleteForm.name,
        telephone: this.DeleteForm.telephone,
        idNo: this.DeleteForm.idCardNumber,
        contractSubject: this.DeleteForm.contractSubject,
        contractNumber: this.DeleteForm.contractNumber,
        contractPeriod: this.DeleteForm.contractPeriod,
        contractBeginDate: this.DeleteForm.contractBeginDate,
        contractEndDate: this.DeleteForm.contractEndDate,
        workSchedule: this.DeleteForm.workSchedule,
        salary: this.DeleteForm.salary,
        trySalary: this.DeleteForm.trySalary,
        workContent: this.DeleteForm.workContent,
        workAdress: this.DeleteForm.workAdress,
        userAdress: this.DeleteForm.userAdress,
        zipCode: this.DeleteForm.zipCode,
        remark: this.DeleteForm.remark,
        contractCancelReason: this.DeleteForm.contractCancelReason,
        actType: 'contractVoid',
        deptNo: this.deptNo,
        contractSubjectId: this.DeleteForm.contractSubjectId,
        levelOne: this.DeleteForm.levelOne,
        periodType: this.DeleteForm.periodType
      }
      if (!this.DeleteForm.contractCancelReason) {
        this.$message.warning({
          message: '请填写作废原因!'
        })
        return
      }
      startContract(DeleteParams).then((data) => {
        this.$message.success('操作成功')
        setTimeout(() => {
          this._getContractList()
          this.DeleteForm.contractCancelReason = ''
          this.DeleteVisible = false
        }, 400)
      })
    },
    exportBtn () {
      document.getElementById('keyword').setAttribute('value', this.contractSearchForm.keyword ? this.contractSearchForm.keyword : '')
      document.getElementById('endDate').setAttribute('value', this.contractSearchForm.endDate ? timeZeroToString(this.contractSearchForm.endDate) : '')
      document.getElementById('status').setAttribute('value', this.contractSearchForm.status ? this.contractSearchForm.status : '')
      this.$refs.submitExcel.submit()
      console.log(this.$refs.submitExcel)
    },
    _getContractList () {
      getContractList(this.contractListParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.contractList = data.result.records
          }
          this.pageMsg.total = data.result.total
        }
      })
    },
    _getSearchParams () {
      this.$bus.$on('contractSearch', (data, search) => {
        this.contractSearchForm = data
        /* console.log('xxx', data)
          console.log('xxx', this.contractSearchForm) */
        this.searchFlag = search
      })
    },
    // 设置默认搜索项
    _setDefaultSearch () {
      const pages = this.getSearchParams({}, '劳动合同管理全部')
      const pageMsg1 = pages.pageMsg ? JSON.parse(pages.pageMsg) : Object({}, pageMsg)
      console.log('pages', pages)
      let lists = ['currentPage', 'pageSize', 'pageSizes', 'total']
      let keys = []
      for (let key in pageMsg1) {
        keys.push(key)
      }
      lists.forEach(item => {
        let r = keys.findIndex(x => x + '' === item + '')
        if (r === -1) {
          if (item === 'currentPage') pageMsg1.currentPage = this.pageMsg.currentPage
          if (item === 'pageSize') {
            pageMsg1.pageSize = this.pageMsg.pageSize
          }
          if (item === 'pageSizes') pageMsg1.pageSizes = this.pageMsg.pageSizes
          if (item === 'total') pageMsg1.total = this.pageMsg.total
        }
      })
      setTimeout(() => {
        this.pageMsg = pageMsg1
      }, 400)
    },
    _setDefaultLocalData () {
      const searchParamsForm = Object.assign({}, { pageMsg: JSON.stringify(this.pageMsg) })
      this.setSearchParams(searchParamsForm, '劳动合同管理全部')
    },
    _setPage () {
      this.pageMsg.currentPage = 1
      this.pageMsg.pageSize = 10
    }
  },
  filters: {
    filterStatus (str) {
      return contractStatus(str)
    },
    filterworkStatus (str) {
      return getfilterworkStatus(str)
    }
  },
  destroyed () {
    // if (!this.$route.path.includes('/personnel-information/contract')) {
    //   this._setDefaultLocalData('1')
    // } else {
    //   this._setDefaultLocalData()
    // }
    this.$store.commit('SET_CONTRACT_ALL_SELECT', false)
    this._setDefaultLocalData()
  },
  created () {
    // this._getContractList()
    this._getSearchParams()
    this._setDefaultSearch()
  }
}
</script>
