<template>
  <div class="quit-job_box">
    <el-button type="primary" size="mini" @click="exportBtn">导 出</el-button>
    <div class="table-setting-warp" style="margin-top:20px;">
      <div class="table-setting-icon el-icon-setting" @click="chooseMsg"></div>
      <el-table
        :data="quitJobListDatas"
        tooltip-effect="dark" border @sort-change="sortChange">
        <el-table-column
          label="序号"
          type="index"
          width="60">
        </el-table-column>

        <div v-for="item in fieldList" :key="item.id">
          <template v-if="item.prop == 'name'">
            <el-table-column
              label="姓名" prop="name"
              min-width="120px" :sortable="item.orderFlag === 1">
                <template slot-scope="scope">
                  {{scope.row.name}} <span class="entry-iconcolor" v-if="scope.row.entryTimes > 0" @click="entryList(scope.row)"><i class="fa fa-thumb-tack"></i></span>
                </template>
            </el-table-column>
          </template>
          <template v-else-if="item.prop == 'nature'">
            <el-table-column
              prop="nature"
              label="户籍性质" min-width="120px" :sortable="item.orderFlag === 1">
              <template slot-scope="scope">
                {{scope.row.nature | filternature}}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.prop == 'status'">
            <el-table-column
              prop="status"
              label="人员状态" min-width="120px" :sortable="item.orderFlag === 1">
              <template slot-scope="scope">
                {{scope.row.status | filterEmployeeStatus}}
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
          width="120px"
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <div class="operation">
            <span @click="lookMsg(scope.row)" v-show="permission.indexOf('查看')!=-1">详情</span>
             <span v-show="scope.row.status == 12&&permission.indexOf('调动详情')!=-1" @click="TransferMsg(scope.row)">调动详情</span>
             <span v-show="scope.row.dimissionStatus == 0&&permission.indexOf('交接')!=-1" @click="joinMsg(scope.row)">交接</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
      <pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageMsg.currentPage"
        :page-sizes="pageMsg.pageSizes"
        :page-size="pageMsg.pageSize"
        :total="pageMsg.total">
      </pagination>
        <!--调动详情-->
    <el-dialog title="调动详情"
      :visible.sync="agreeVisible"
      v-draggable
      top="5vh"
      >
      <div class="module-opera">
        <el-form  label-width="115px" class="dialog-form">
          <el-form-item label="调动日期：">
            <span>{{receiveDetailDatas.transferDate}}</span>
          </el-form-item>
          <el-form-item label="调入公司：">
            <span>{{receiveDetailDatas.toCompanyName}}</span>
          </el-form-item>
          <el-form-item label="工资标准：" >
           {{formalSalaryStr}}
          </el-form-item>
          <el-form-item label="社保停缴：">
            <span>{{receiveDetailDatas.insuranceStop | filterInsuranceStatus}}</span>
          </el-form-item>
          <el-form-item label="社保缴纳至：" v-show="receiveDetailDatas.insuranceStop===1">
            <span>{{receiveDetailDatas.insuranceDate | formatMonth}}</span>
          </el-form-item>
          <el-form-item label="公积金停缴：">
            <span>{{receiveDetailDatas.fundStop | filterInsuranceStatus}}</span>
          </el-form-item>
          <el-form-item label="公积金缴纳至：" v-show="receiveDetailDatas.fundStop===1">
            <span>{{receiveDetailDatas.fundDate | formatMonth}}</span>
          </el-form-item>
          <el-form-item label="工资结算至：">
            <span>{{receiveDetailDatas.salaryDate }}</span>
          </el-form-item>
          <el-form-item label="其他费用：">
            <span>{{receiveDetailDatas.otherCost}}</span>
          </el-form-item>
          <el-form-item label="休假情况：">
            <span>可休:{{receiveDetailDatas.vacationDaysAll}}　 已休:{{receiveDetailDatas.vacationDaysUsable}} 　剩余:{{receiveDetailDatas.vacationDaysUsed}}</span>
          </el-form-item>
          <el-form-item label="劳动关系：">
            <span>{{receiveDetailDatas.relieveLaborRelation | filterRelieveStatus}}</span>
          </el-form-item>
          <el-form-item label="解除日期：" v-if="receiveDetailDatas.relieveLaborRelation ===1 ">
            <span>{{receiveDetailDatas.relieveLaborDate}}</span>
          </el-form-item>
          <el-form-item label="其他说明：">
            <span>{{receiveDetailDatas.remark}}</span>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="agreeVisible = false" class="false" size="mini">取 消</el-button>
      </span>
    </el-dialog>
      <!--交接-->
    <el-dialog
    title="交接"
    :visible.sync="joinVisible"
    width="500px">
      <div class="module-opera">
        <el-form :model="joinForm" label-width="130px" ref="joinForm" class="dialog-form">
          <el-form-item label="工资：">
            <el-date-picker
              v-model="joinForm.salaryDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="补贴：">
            <el-date-picker
              v-model="joinForm.subsidyDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="社保：">
            <el-date-picker
              v-model="joinForm.insuranceDate"
              type="month"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="公积金：">
            <el-date-picker
              v-model="joinForm.fundDate"
              type="month"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="人事档案及户口：">
            <el-input v-model="joinForm.archivesHousehold"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="joinForm.remark"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-checkbox label="工作已移交" v-model="joinForm.workHandover"></el-checkbox>
            <el-checkbox label="纸质及电子档案已移交" v-model="joinForm.archivesHandover"></el-checkbox>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="joinVisible = false" class="false" size="mini">取 消</el-button>
        <el-button type="primary" @click="joinSave" size="mini">保存</el-button>
        <el-button type="primary" @click="joinFinishMsg" size="mini">完成交接</el-button>
      </span>
    </el-dialog>
     <EntryList
    @handleColse="entryVisible = false"
     :dialogVisible="entryVisible" :entryDatas="entryDatas"></EntryList>
    <!-- 导出列表 -->
    <form style="display:none" name="form" method="POST" ref="submitExcel" id="submitExcel" :action="hostBaseUrl+'/user/export/user/list'">
      <p>keyword: <input type="text" id="keyword" name="keyword" value="" /></p>
      <p>status: <input type="text" id="status" name="status" value="" /></p>
      <p>entryDateStart: <input type="text" id="entryDateStart" name="entryDateStart" value="" /></p>
      <p>entryDateEnd: <input type="text" id="entryDateEnd" name="entryDateEnd" value="" /></p>
      <p>dataType: <input type="text" id="dataType" name="dataType" value="" /></p>
      <p>searchOrgIds: <input type="text" id="searchOrgIds" name="searchOrgIds" value="" /></p>
      <input type="submit" value="Submit"/>
    </form>
  </div>
</template>
<script>
import { getRecruitList, leaveDataSave, leaveDataGet } from 'static/api/personnel-information/base/base'
import { mapGetters, mapMutations } from 'vuex'
import { timeZeroToString } from 'assets/js/common'
import Pagination from 'components/Pagination'
import EntryList from 'components/EntryList'
import { getbaseStatus, getfilterInsuranceStatus, getfilterRelieveStatus, getfilternature } from 'assets/js/filters'
import { getReceiveDetail } from 'static/api/verify/transfer/transfer'
import { getEntryList } from 'static/api/recruit/accept/accept'
import { listByUserId } from 'static/api/common/common'
import { getToken, setToken } from 'assets/js/util'
import { hostBaseUrl } from 'utils/config'
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
      hostBaseUrl: '',
      joinVisible: false,
      agreeVisible: false,
      entryVisible: false,
      entryDatas: [],
      quitJobListDatas: [],
      pageMsg: Object.assign({}, pageMsg),
      joinForm: {
        id: '',
        salaryDate: '',
        subsidyDate: '',
        insuranceDate: '',
        fundDate: '',
        archivesHousehold: '',
        remark: '',
        archivesHandover: '',
        workHandover: '',
        userId: '',
        status: ''
      },
      receiveDetailDatas: {},
      formalSalaryStr: '',
      transform: {
        id: ''
      },
      statusSelect: [
        { value: 10, label: '已离职' },
        { value: 12, label: '已调出' }
      ],
      // 选择显示字段
      fieldList: [],
      prop: '',
      order: '',
      options: []
    }
  },
  computed: {
    ...mapGetters(['getPersonnalBaseSearchArr', 'getPersonBaseClick', 'getIsDel', 'getDeepSearchOptions', 'getChooseCheck']),
    permission () {
      return getExmine().infoBase
    },
    baseParams () {
      return {
        page: this.pageMsg.currentPage,
        size: this.pageMsg.pageSize,
        dataType: 4,
        keyword: this.getPersonnalBaseSearchArr.keyword,
        status: this.getPersonnalBaseSearchArr.status,
        entryDateStart: this.getPersonnalBaseSearchArr.entryDateStart ? timeZeroToString(this.getPersonnalBaseSearchArr.entryDateStart) : '',
        entryDateEnd: this.getPersonnalBaseSearchArr.entryDateEnd ? timeZeroToString(this.getPersonnalBaseSearchArr.entryDateEnd) : '',
        // orgId: this.baseForm.orgName.split(',')[0]
        searchOrgIds: this.getPersonnalBaseSearchArr.searchOrgIds ? this.getPersonnalBaseSearchArr.searchOrgIds : [],
        prop: this.prop,
        order: this.order,
        options: this.getDeepSearchOptions
      }
    },
    currentRouteName () {
      return this.$route.name
    }
  },
  methods: {
    ...mapMutations({
      setDelType: 'SET_ACCEPT_IS_DELETE'
    }),
    exportBtn () {
      document.getElementById('entryDateStart').setAttribute('value', this.getPersonnalBaseSearchArr.entryDateStart ? timeZeroToString(this.getPersonnalBaseSearchArr.entryDateStart) : '')
      document.getElementById('entryDateEnd').setAttribute('value', this.getPersonnalBaseSearchArr.entryDateEnd ? timeZeroToString(this.getPersonnalBaseSearchArr.entryDateEnd) : '')
      document.getElementById('keyword').setAttribute('value', this.getPersonnalBaseSearchArr.keyword)
      document.getElementById('dataType').setAttribute('value', '4')
      document.getElementById('searchOrgIds').setAttribute('value', this.getPersonnalBaseSearchArr.searchOrgIds.length ? this.getPersonnalBaseSearchArr.searchOrgIds.join(' ') : null)
      document.getElementById('status').setAttribute('value', this.getPersonnalBaseSearchArr.status ? this.getPersonnalBaseSearchArr.status : null)
      console.log(this.$refs.submitExcel)
      this.$refs.submitExcel.submit()
    },
    _getQuitJobList () {
      // this.baseParams.searchOrgIds = this.baseParams.searchOrgIds === '' ? this.baseParams.searchOrgIds = [] : this.baseParams.searchOrgIds
      getRecruitList(this.baseParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.quitJobListDatas = data.result.records
          }
          // setToken('queryOptions', this.baseParams.options)
          this.pageMsg.total = data.result.total
        }
      })
    },
    // 详情
    lookMsg (row) {
      this.$router.push({ name: 'BaseLabor',
        params: {
          baseId: row.id,
          status: row.status ? row.status : 'null'
        },
        query: {
          come: this.$route.name
        }
      })
      setToken('updateName', row.name)
    },
    // 录入记录
    entryList (row) {
      this.entryVisible = true
      getEntryList(row.idCardNumber).then(res => {
        if (res.result) {
          this.entryDatas = res.result
        }
      })
    },
    // 交接保存
    joinMsg (row) {
      this.joinVisible = true
      leaveDataGet(row.id).then(data => {
        if (data.result) {
          this.leaveDatas = data.result
          this.joinForm.id = data.result.id
          this.joinForm.salaryDate = data.result.salaryDate
          this.joinForm.subsidyDate = data.result.subsidyDate
          this.joinForm.insuranceDate = data.result.insuranceDate
          this.joinForm.fundDate = data.result.fundDate
          this.joinForm.archivesHousehold = data.result.archivesHousehold
          this.joinForm.remark = data.result.remark
          this.joinForm.userId = data.result.userId
          if (data.result.archivesHandover === 1) {
            this.joinForm.archivesHandover = true
          }
          if (data.result.workHandover === 1) {
            this.joinForm.workHandover = true
          }
        }
      })
    },
    joinSave () {
      let joinFormData = {
        status: 0,
        archivesHousehold: this.joinForm.archivesHousehold,
        fundDate: this.joinForm.fundDate ? timeZeroToString(this.joinForm.fundDate) : '',
        id: this.joinForm.id,
        insuranceDate: this.joinForm.insuranceDate ? timeZeroToString(this.joinForm.insuranceDate) : '',
        remark: this.joinForm.remark,
        salaryDate: this.joinForm.salaryDate ? timeZeroToString(this.joinForm.salaryDate) : '',
        subsidyDate: this.joinForm.subsidyDate ? timeZeroToString(this.joinForm.subsidyDate) : '',
        userId: this.joinForm.userId,
        archivesHandover: this.joinForm.archivesHandover === true ? 1 : 0,
        workHandover: this.joinForm.workHandover === true ? 1 : 0
      }
      leaveDataSave(joinFormData).then(data => {
        this.joinVisible = false
        this.$message.success('保存成功')
        setTimeout(() => {
          this._getUserFiled()
        }, 400)
      })
    },
    // 交接完成
    joinFinishMsg () {
      let joinFormData = {
        archivesHousehold: this.joinForm.archivesHousehold,
        fundDate: this.joinForm.fundDate ? timeZeroToString(this.joinForm.fundDate) : '',
        id: this.joinForm.id,
        insuranceDate: this.joinForm.insuranceDate ? timeZeroToString(this.joinForm.insuranceDate) : '',
        remark: this.joinForm.remark,
        salaryDate: this.joinForm.salaryDate ? timeZeroToString(this.joinForm.salaryDate) : '',
        subsidyDate: this.joinForm.subsidyDate ? timeZeroToString(this.joinForm.subsidyDate) : '',
        userId: this.joinForm.userId
      }
      if (this.joinForm.archivesHandover === true) {
        joinFormData.archivesHandover = 1
      } else if (this.joinForm.archivesHandover === false) {
        joinFormData.archivesHandover = 0
      }
      if (this.joinForm.workHandover === true) {
        joinFormData.workHandover = 1
      } else if (this.joinForm.workHandover === false) {
        joinFormData.workHandover = 0
      }
      if (this.joinForm.archivesHousehold === '' || this.joinForm.fundDate === '' || this.joinForm.insuranceDate === '' || this.joinForm.salaryDate === '' || this.joinForm.subsidyDate === '' || this.joinForm.archivesHandover === 0 || this.joinForm.workHandover === 0) {
        this.$confirm('还有交接项未完成，是否确定归档？', '提示', {
          confirmButtonText: '立即归档',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          joinFormData.status = 1 // 本来是 0 现在改成 1  1712281652
          leaveDataSave(joinFormData).then(data => {
            this.joinVisible = false
            this.$message.success('归档成功', 'success')
            setTimeout(() => {
              this.$refs.joinForm.resetFields()
              this._getUserFiled()
            }, 400)
          })
        }).catch(() => {})
      } else {
        this.$confirm('所有交接已完成，确定归档', '提示', {
          confirmButtonText: '立即归档',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          joinFormData.status = 1
          leaveDataSave(joinFormData).then(data => {
            this.joinVisible = false
            this.$message.success('归档成功')
            setTimeout(() => {
              this.$refs.joinForm.resetFields()
              this.handleCurrentChange(1)
            }, 400)
          })
        }).catch(() => {})
      }
    },
    handleSizeChange (pageSize) {
      this.pageMsg.currentPage = 1
      this.pageMsg.pageSize = pageSize
      this._getQuitJobList()
    },
    handleCurrentChange (currentPage) {
      this.pageMsg.currentPage = currentPage
      this._getQuitJobList()
    },
    TransferMsg (row) {
      this.transform.id = row.id
      this._getTransferDetail()
      this.agreeVisible = true
    },
    _getTransferDetail () {
      getReceiveDetail(this.transform.id).then(data => {
        this.receiveDetailDatas = {}
        this.formalSalaryStr = ''
        if (data.result) {
          this.receiveDetailDatas = data.result
          this.formalSalaryStr = data.result.oldSalaryForm
        }
      })
    },
    // 选择显示字段
    chooseMsg () {
      this.$store.commit('SET_CHOOSE_VIS', true)
    },
    // 获取原来选择字段
    _getUserFiled () {
      let preload = {
        userId: getToken('loginId').toString(),
        type: 'out'
      }
      listByUserId(preload).then(data => {
        if (data.result) {
          this.fieldList = data.result
          this.$store.commit('SET_CHOOSE_FILELIST', data.result.map(item => item.prop))
          setTimeout(() => {
            this._getQuitJobList()
          }, 10)
        }
      })
    },
    // 排序
    sortChange (column, prop, order) {
      if (column && column.prop) {
        let orderColumn = this.fieldList.filter(item => item.prop === column.prop)[0].orderColumn
        this.prop = orderColumn
        this.order = column.order
        this._getQuitJobList()
        this.hostBaseUrl = hostBaseUrl
      } else {
        this.prop = ''
        this.order = ''
        this._getQuitJobList()
      }
    },
    // 设置默认搜索项
    _setDefaultSearch () {
      const params = this.getSearchParams({}, this.currentRouteName + '1')
      const pageMsg1 = params.pageMsg ? JSON.parse(params.pageMsg) : Object.assign({}, pageMsg)
      this.pageMsg = pageMsg1
    },
    _setDefaultLocalData (page) {
      if (page) this.pageMsg.currentPage = 1
      const searchParams = Object.assign({}, this.pageMsg)
      const searchParamsForm = Object.assign({}, { pageMsg: JSON.stringify(searchParams) })
      this.setSearchParams(searchParamsForm, this.currentRouteName + '1')
    }
  },
  components: {
    Pagination,
    EntryList
  },
  filters: {
    filterEmployeeStatus (str) {
      return getbaseStatus(str)
    },
    filterInsuranceStatus (status) {
      return getfilterInsuranceStatus(status)
    },
    filterRelieveStatus (status) {
      return getfilterRelieveStatus(status)
    },
    filternature (str) {
      return getfilternature(str)
    }
  },
  watch: {
    getPersonBaseClick (val) {
      if (val && val !== 'created') {
        if (val === 'look') {
          this._setDefaultSearch()
          this._getQuitJobList()
        } else {
          this.handleCurrentChange(1)
        }
      }
      this.$store.commit('SET_PERSONNAL_BASE_CLICKED', false)
      this.hostBaseUrl = hostBaseUrl
    },
    getIsDel (val) {
      if (val) {
        this.pageMsg.currentPage = 1
        this._getQuitJobList()
      }
      this.setDelType('')
    },
    getDeepSearchOptions (val) {
      if (val) {
        this.baseParams.options = val
        this.handleCurrentChange(1)
      }
    },
    getChooseCheck (value) {
      if (value) {
        this._getUserFiled()
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    if (!to.path.includes('/personnel-information/base')) {
      this._setDefaultLocalData('1')
    } else {
      this._setDefaultLocalData()
    }
    next()
  },
  created () {
    // this._getQuitJobList()
    this._getUserFiled()
    this.$store.commit('SET_PERSONNAL_BASE_STATUSSELECT', this.statusSelect)
    this._setDefaultSearch()
  }
}
</script>
