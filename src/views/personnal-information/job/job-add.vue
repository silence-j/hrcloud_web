<template>
  <section class="container" @click="orgDatas1.showTree = false">
    <div class="job-box mt-20">
      <el-form :model="addJobForm" label-width="125px" :rules="rules" ref="addJobForm" >
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓 名:">
              <el-input v-model="addJobForm.name" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身 份 证 号:">
              <el-input v-model="addJobForm.idCardNum" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="组 织 架 构 :">
              <el-input v-model="addJobForm.organizationName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="任 职 组 织:">
            <div class="search-form_item">
              <search-dept-tree :orgDatas="orgDatas1" ref="deptTree"/>
            </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任 职 职 务:" prop="dutyName">
              <el-select v-model="addJobForm.dutyName" filterable clearable placeholder="请填写任职职务">
                <el-option
                  v-for="item in dutynameDatas"
                  :label="item.codeText"
                  :value="item.codeText + ',' + item.id"
                  :key="item.index">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否负责人:">
              <el-radio-group v-model="addJobForm.isPrincipal" class="job-radio">
                <el-radio label='是'>是</el-radio>
                <el-radio label='否'>否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="职 务 级 别:">
              <el-select v-model="addJobForm.dutyRank" filterable clearable placeholder="请选择职务级别">
                <el-option
                  v-for="item in dutylevelDatas"
                  :label="item.codeText"
                  :value="item.codeText + ',' + item.id"
                  :key="item.index">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职 务 性 质:" prop="status">
              <el-select v-model="addJobForm.status" filterable clearable placeholder="请填写职务性质">
                <el-option
                  v-for="item in statusSelect"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <div v-if="this.showSecond">
            <el-col :span="8">
              <el-form-item label="原待遇级别:" class="mustForm">
                <el-select v-model="addJobForm.treatmentRank" filterable disabled clearable placeholder="请选择待遇级别">
                  <el-option
                    v-for="item in treatmentlevelDatas"
                    :label="item.codeText"
                    :value="item.codeText + ',' + item.id"
                    :key="item.index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </div>
          <div v-else>
            <el-col :span="8">
              <el-form-item label="待 遇 级 别:" class="mustForm">
                <el-select v-model="addJobForm.treatmentRank" filterable clearable placeholder="请选择待遇级别">
                  <el-option
                    v-for="item in treatmentlevelDatas"
                    :label="item.codeText"
                    :value="item.codeText + ',' + item.id"
                    :key="item.index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </div>
        </el-row>

        <!--第二次新增的时候显示-->
        <div v-if="this.showSecond">
          <el-row>
            <el-col :span="8">
              <el-form-item label="待遇是否改变:" class="mustForm">
                <el-radio-group v-model="addJobForm.treatmentRankType">
                  <el-radio :label="0">是</el-radio>
                  <el-radio :label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-show="addJobForm.treatmentRankType === 0">
              <el-form-item label="新待遇级别:" class="mustForm">
                <el-select v-model="addJobForm.newTreatmentRank" filterable clearable placeholder="请选择新待遇级别">
                  <el-option
                    v-for="item in treatmentlevelDatas"
                    :label="item.codeText"
                    :value="item.codeText + ',' + item.code"
                    :key="item.index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="工资是否改变:" prop="salaryType">
                <el-radio-group v-model="addJobForm.salaryType">
                  <el-radio :label="0">是</el-radio>
                  <el-radio :label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="原工资标准:">
                {{baseInformation.standard}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="addJobForm.salaryType === 0">
            <div style="padding-left:28px;">
              <salary-pure ref="salaryPureRef" :salaryData="salaryForm"/>
            </div>
          </el-row>
        </div>
        <div v-if="this.showSecond == false">
          <el-row>
            <el-col :span="24">
              <el-form-item label="原工资标准:">
               {{baseInformation.standard}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="工资是否改变:" class="mustForm">
                <el-radio-group v-model="addJobForm.salaryType">
                  <el-radio :label="0">是</el-radio>
                  <el-radio :label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="addJobForm.salaryType === 0">
            <div style="padding-left:28px;">
              <salary-pure ref="salaryPureRef" :salaryData="salaryForm"/>
            </div>
          </el-row>
        </div>

        <el-row>
          <el-col :span="8">
            <el-form-item label="任职发文号:" prop="dispatchNumber">
              <el-input v-model="addJobForm.dispatchNumber" placeholder="请填写任职发文号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发 文 时 间:" prop="dutyDispatchTime">
              <el-date-picker
                v-model="addJobForm.dutyDispatchTime"
                type="date"
                placeholder="请选择发文时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="执 行 时 间:" prop="dutyExecuteTime">
              <el-date-picker
                v-model="addJobForm.dutyExecuteTime"
                type="date"
                placeholder="请选择执行时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="任 免 发 文:" prop="appointRemoveDispatch">
              <el-input type="textarea" :rows="3" v-model="addJobForm.appointRemoveDispatch" placeholder="请填写任免发文"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="备  注:">
              <el-input type="textarea" :rows="3" v-model="addJobForm.remark" placeholder="请填写备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <p class="tit mt-20">&nbsp;&nbsp;在职职务</p>
        <br/>
        <el-table
          :data="DutyInformationList"
          @selection-change="chosedp"
          border>
          <el-table-column
            label="序号"
            type="index"
            width="60">
          </el-table-column>
          <el-table-column
            type="selection"
            width="60"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="organizationName"
            label="任职组织">
          </el-table-column>
          <el-table-column
            prop="dutyName"
            label="任职职务">
          </el-table-column>
          <el-table-column
            prop="status"
            label="职务性质">
            <template slot-scope="scope">
              <span>{{scope.row.status | filterStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="checked"
            label="操作"
            width="120px">
            <template>
              <span>免除职务</span>
            </template>
          </el-table-column>
        </el-table>
        <el-row class="mt-30 mb-20">
          <el-col :span="2" :push="9"><el-button type="primary" size="small" style="width:100%" @click="goBack()">返  回</el-button></el-col>
          <el-col :span="2" :push="10"><el-button type="primary" size="small" style="width:100%" @click="mainJobSave('addJobForm')">保  存</el-button></el-col>
        </el-row>
      </el-form>
    </div>
  </section>
</template>
<script>
import { getAddJob, getSelectUserId, getSelectPackage, getDutyInformationList } from 'static/api/personnel-information/job/job'
import { timeToString } from 'assets/js/common'
import { getToken } from 'assets/js/util'
import { checkAcceptBaseDetail } from 'static/api/recruit/accept/accept'
import { mapGetters } from 'vuex'
import { salaryStandarJson } from 'utils/config'
import SearchDeptTree from 'components/SearchDeptTree'
import { getSysDic, getOrgDetail } from 'static/api/common/common'
import { saveSalaryStructure } from 'static/api/setting/index'
import { salaryParams } from 'assets/js/mixins'
import SalaryPure from 'components/SalaryAssembly/pure-salary.jsx'
import { debounce } from 'lodash'
export default {
  mixins: [salaryParams],
  data () {
    return {
      orgDatas1: {
        filterName: '',
        orgId: '',
        dataTree: [],
        showTree: false,
        isLimit: '0',
        disabled: true
      },
      rules: {
        dutyName: [
          { required: true, message: '请填写任职职务', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择职务性质', trigger: 'change' }
        ],
        treatmentRank: [
          { required: true, message: '请填写待遇级别', trigger: 'change' }
        ],
        salaryType: [
          { required: true, message: '请选择工资标准是否改变', trigger: 'change' }
        ],
        dispatchNumber: [
          { required: true, message: '请填写职务发文号', trigger: 'blur' }
        ],
        dutyDispatchTime: [
          { type: 'date', required: true, message: '请选择发文时间', trigger: 'change' }
        ],
        dutyExecuteTime: [
          { type: 'date', required: true, message: '请填写执行时间', trigger: 'change' }
        ],
        appointRemoveDispatch: [
          { required: true, message: '请填写任免发文', trigger: 'blur' }
        ]
      },
      formSalaryParams: '',
      salaryForm: this.deepClone(salaryStandarJson),
      checked: [],
      DutyInformationList: [],
      jobPageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      showSecond: false,
      statusSelect: [
        { value: 0, label: '主职' },
        { value: 1, label: '兼职' }
      ],
      orgSelectStaffDatas: [],
      UncancelVisible: true,
      UnconcludeForm: {},
      addJobForm: {
        salaryType: '',
        treatmentRankType: '',
        userId: '',
        name: '',
        idCardNum: '',
        organizationName: '',
        organizationId: '',
        dutyOrgName: '',
        dutyName: '',
        dutyRank: '',
        treatmentRank: '',
        newTreatmentRank: '',
        isPrincipal: '否',
        dispatchNumber: '',
        dutyDispatchTime: '',
        dutyExecuteTime: '',
        appointRemoveDispatch: '',
        remark: '',
        status: ''
      },
      props: {
        label: 'name',
        children: 'zones'
      },
      treatmentlevelDatas: [],
      dutynameDatas: [],
      dutylevelDatas: [],
      dutyRnakDatas: [],
      baseInformation: [],
      mcChecked: false,
      treatDatas: '',
      treatIdDatas: '',
      newWageLevel: '',
      newWageLevelId: '',
      oldStandard: ''
    }
  },
  components: {
    SearchDeptTree,
    SalaryPure
  },
  computed: {
    ...mapGetters({
      cOrgId: 'getOrgId'
    }),
    departmentStaffParams () {
      return {
        orgId: this.cOrgId,
        page: this.jobPageMsg.currentPage,
        size: this.jobPageMsg.pageSize
      }
    }
  },
  methods: {
    /** 根据ueseId 获取个人信息**/
    _getAcceptDetail () {
      this.addJobForm.userId = this.$route.params.jobId
      checkAcceptBaseDetail(this.$route.params.jobId).then((data) => {
        if (data.result) {
          this.baseInformation = data.result
          this.addJobForm.name = this.baseInformation.name
          this.addJobForm.idCardNum = this.baseInformation.idCardNumber
          this.addJobForm.organizationName = this.baseInformation.orgName
          this.oldStandard = this.baseInformation.standard
          this.$store.commit('SET_INFO_BY_ORG_ID', data.result.orgId)
          this.salaryForm = this.deepClone(salaryStandarJson)
          getOrgDetail(data.result.orgId).then(res => {
            this.$store.commit('SET_HRBELONGID', res.result.hrBelongId ? res.result.hrBelongId : res.result.companyId)
          })
          setTimeout(() => {
            this.$refs.salaryPureRef.resetSalaryValidate()
          })
        }
      })
    },
    /** 判断是否是第一次新增**/
    _getSelectPackage () {
      getSelectPackage(this.$route.params.jobId).then((data) => {
        if (data.result) {
          if (data.result.treatmentRank === null) {
            this.showSecond = false
          } else {
            this.showSecond = true
          }
          if (!this.addJobForm.treatmentRank) this.addJobForm.treatmentRank = data.result.treatmentRank
          if (!this.addJobForm.treatmentLevelId) this.addJobForm.treatmentLevelId = data.result.treatmentLevelId
          /* this.treatDatas = data.result.treatmentRank */
          /* this.treatIdDatas = data.result.treatmentRankId */
        }
      })
    },
    /** 新增职务保存**/
    mainJobSave: debounce(function (formName) {
      let salaryVail = this.addJobForm.salaryType === 0 ? this.$refs.salaryPureRef.checkSalaryValidate() : true
      this.$refs[formName].validate((valid) => {
        if (valid && salaryVail) {
          if (!this.addJobForm.treatmentRank) {
            this.$message.warning({
              message: '请选择待遇级别!'
            })
          } else if (this.showSecond && this.addJobForm.treatmentRankType === '') {
            this.$message.warning({
              message: '请选择待遇级别是否改变!'
            })
          } else if (this.addJobForm.treatmentRankType === 0 && this.addJobForm.newTreatmentRank === '') {
            this.$message.warning({
              message: '请选择新待遇级别!'
            })
          } else if (this.addJobForm.salaryType === '') {
            this.$message.warning({
              message: '请选择工资是否改变!'
            })
          } else {
            if (this.addJobForm.status === 0) {
              if (this.statueId && this.statueId.indexOf(0) === 0) {
                this.addJobForm.dutyChange = ''
                this.addJobForm.id = ''
                this.postJob()
              } else {
                getSelectUserId(this.addJobForm.userId).then((data) => {
                  if (data.result) {
                    if (data.result.dutyChange && data.result.id) {
                      this.addJobForm.dutyChange = data.result.dutyChange
                      this.addJobForm.id = data.result.id
                      this.$confirm('该员工已存在主职，若继续添加原主职将变为兼职，是否继续？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                      }).then(() => {
                        this.postJob()
                      }).catch(() => {
                        this.addJobForm.dutyChange = ''
                        this.addJobForm.id = ''
                      })
                    } else {
                      this.postJob()
                    }
                  } else {
                    this.postJob()
                  }
                })
              }
            } else if (this.addJobForm.status === 1) {
              this.postJob()
            }
          }
        } else {
          return false
        }
      })
    }, 500),
    postJob () {
      if (this.addJobForm.salaryType === 0) {
        this.zeroJob()
      } else {
        this.oneJob()
      }
    },
    zeroJob () {
      let regularSalaryParams = {
        type: 171,
        deleteTag: 3,
        userId: this.addJobForm.userId,
        effectiveDate: timeToString(this.addJobForm.dutyExecuteTime)
      }
      saveSalaryStructure(Object.assign({}, this._getSalaryParams(), regularSalaryParams)).then(res => {
        this.newWageLevelId = res.result.id
        this.newWageLevel = res.result.standard
        this.oneJob()
      })
    },
    oneJob () {
      let mainJobForm = {
        newWageLevel: this.newWageLevel ? this.newWageLevel : '',
        wageLevel: this.oldStandard,
        newWageLevelId: this.newWageLevelId,
        userId: this.addJobForm.userId,
        dutyName: this.addJobForm.dutyName.split(',')[0],
        dutyNameId: this.addJobForm.dutyName.split(',')[1],
        dutyRank: this.addJobForm.dutyRank.split(',')[0],
        dutyLevelId: this.addJobForm.dutyRank.split(',')[1],
        treatmentRank: this.addJobForm.treatmentRank.split(',')[0] ? this.addJobForm.treatmentRank.split(',')[0] : this.addJobForm.treatmentRank,
        treatmentLevelId: this.addJobForm.treatmentRank.split(',')[1] ? this.addJobForm.treatmentRank.split(',')[1] : this.addJobForm.treatmentLevelId,
        newTreatmentRank: this.addJobForm.newTreatmentRank ? this.addJobForm.newTreatmentRank.split(',')[0] : '',
        newTreatmentLevelId: this.addJobForm.newTreatmentRank ? this.addJobForm.newTreatmentRank.split(',')[1] : '',
        isPrincipal: this.addJobForm.isPrincipal,
        status: this.addJobForm.status,
        dispatchNumber: this.addJobForm.dispatchNumber,
        dutyDispatchTime: timeToString(this.addJobForm.dutyDispatchTime),
        dutyExecuteTime: timeToString(this.addJobForm.dutyExecuteTime),
        appointRemoveDispatch: this.addJobForm.appointRemoveDispatch,
        remark: this.addJobForm.remark,
        dutyChange: this.addJobForm.dutyChange,
        dutyChangeId: this.addJobForm.id,
        organizationId: this.orgDatas1.orgId ? this.orgDatas1.orgId : this.baseInformation.orgId,
        organizationName: this.orgDatas1.filterName ? this.orgDatas1.filterName : this.baseInformation.orgName,
        deposeDutyId: this.palts ? (this.palts).join(',') : ''
      }
      let allJobJson = {
        dutyInformation: mainJobForm,
        name: this.addJobForm.name,
        idCardNumber: this.addJobForm.idCardNum,
        loginId: getToken('loginId'),
        userId: this.addJobForm.userId
      }
      getAddJob(allJobJson).then((data) => {
        this.$message.success('添加成功,等待审批人进行审核')
        setTimeout(() => {
          this.$router.replace('/personnel-information/job')
        }, 500)
      })
    },
    /* 获取在职职务信息 */
    _getDutyInformationList () {
      let param = {
        userId: this.$route.params.jobId
      }
      getDutyInformationList(param).then(data => {
        if (data.result) {
          this.DutyInformationList = data.result
        }
      })
    },
    /* 选择免除的职务 */
    chosedp (selection) {
      this.palts = []
      this.statueId = []
      selection.forEach((item) => {
        if (item.id) this.palts.push(item.id)
        this.statueId.push(item.status)
      })
    },
    goBack () {
      this.$router.replace('/personnel-information/job')
    },
    /** 获取数字字典**/
    async _getQueryClassList () {
      await getSysDic('DUTYLEVEL').then((data) => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.dutylevelDatas.push(item)
            }
          })
        }
      })
      await getSysDic('TREATMENTLEVEL').then((data) => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.treatmentlevelDatas.push(item)
            }
          })
        }
      })
      await getSysDic('DUTYNAME').then((data) => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.dutynameDatas.push(item)
            }
          })
        }
      })
    }
  },
  filters: {
    filterStatus (status) {
      if (status === 0) {
        status = '主职'
      } else {
        status = '兼职'
      }
      return status
    }

  },
  created () {
    this._getQueryClassList()
    this._getAcceptDetail()
    this._getSelectPackage()
    this._getDutyInformationList()
  }
}
</script>

<style scoped lang="less">
  .job-box{
    width: 95%;
    margin: auto;
  }
  .el-select {
    width: 100%
  }
  .tit{
    border-left: 5px solid #FF7500;
    font-size: 16px;
  }
.div-row_box {
  /deep/ .el-form{
   margin-top:-20px;
  }
  /deep/.el-form-item .el-form-item {
    margin-bottom: 20px;
  }
 /* /deep/ .el-row.mt-10{
   margin-top:20px;
 }  */
}
</style>
