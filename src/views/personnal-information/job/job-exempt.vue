<template>
  <div class="container">
    <el-row class="mb-20">
      <el-button type="primary" size="small" @click="goBack">返  回</el-button>
      <el-button type="primary" size="small" @click="stopSave('moveForm')">提  交</el-button>
    </el-row>
    <el-tabs type="border-card">
      <el-tab-pane label="免除信息">
          <el-form :model="moveForm" label-width="115px" :rules="rules" ref="moveForm" >
            <el-row>
              <el-col :span="8">
                <el-form-item label="免职发文号:" prop="deposeNumber">
                  <el-input v-model="moveForm.deposeNumber" placeholder="请填写免除发文号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发 文 时 间:" prop="deposeDispatchTime">
                  <el-date-picker
                    v-model="moveForm.deposeDispatchTime"
                    type="date"
                    placeholder="请填写发文时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="执 行 时 间:" prop="deposeExecuteTime">
                  <el-date-picker
                    v-model="moveForm.deposeExecuteTime"
                    type="date"
                    placeholder="请填写执行时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="免 职 发 文:" prop="deposeDispatch">
                  <el-input type="textarea" :rows="3" v-model="moveForm.deposeDispatch" placeholder="请填写免职发文"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="待遇级别是否改变:" label-width="130px">
                  <el-radio-group v-model="moveLForm.dutyRankType">
                    <el-radio :label= "0" >是</el-radio>
                    <el-radio :label= "1" >否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7" v-show="moveLForm.dutyRankType === 0">
                <el-form-item label="新待遇级别:" class="mustForm">
                  <el-select v-model="moveLForm.newTreatmentRank" filterable clearable placeholder="新待遇级别">
                    <el-option
                      v-for="item in treatmentlevelDatas"
                      :label="item.codeText"
                      :value="item.codeText +','+ item.id"
                      :key="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="工资标准是否改变:" label-width="130px">
                  <el-radio-group v-model="moveLForm.gzType">
                    <el-radio :label= "0" >是</el-radio>
                    <el-radio :label= "1" >否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-show="moveLForm.gzType === 0">
              <el-col :span="24">
                <salary-pure ref="salaryPureRef" :salaryData="salaryForm"/>
              </el-col>
            </el-row>
          </el-form>
      </el-tab-pane>

      <el-tab-pane label="职务信息">
        <el-form label-width="120px">
          <el-row align="center">
            <el-col :span="8">
              <el-form-item label="姓  名:">
                <span>{{jobDetailsData.name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号:" >
                <span>{{jobDetailsData.idCardNumber}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="组织架构:">
                <span>{{jobDetailsData.orgName}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row align="center">
            <el-col :span="8">
              <el-form-item label="任职组织:">
                <span>{{jobDetailsData.organizationName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="任职职务:" >
                <span>{{jobDetailsData.dutyName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否负责人:">
                <span>{{jobDetailsData.isPrincipal}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row align="center">
            <el-col :span="8">
              <el-form-item label="职务级别:">
              <span v-if="jobDetailsData.dutyRank">{{jobDetailsData.dutyRank}}</span>
              <span v-else class="color999">未填写</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职务性质:">
                <span>{{jobDetailsData.status | filterExemptStatus}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="待遇级别:">
                <span v-if="jobDetailsData.treatmentRank">{{jobDetailsData.treatmentRank}}</span>
                <span v-else class="color999">未填写</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row align="center">
            <el-col :span="24">
              <el-form-item label="工资标准:">
                <span>{{jobDetailsData.wageLevel}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row align="center">
            <el-col :span="8">
              <el-form-item label="任职发文号:">
                <span>{{jobDetailsData.dispatchNumber}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发文时间:" >
                <span>{{jobDetailsData.dutyDispatchTime}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="执行时间:">
                <span>{{jobDetailsData.dutyExecuteTime}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row align="center">
            <el-col :span="24">
              <el-form-item label="任免发文:">
                <span>{{jobDetailsData.appointRemoveDispatch}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row align="center">
            <el-col :span="24">
              <el-form-item label="备 注:">
                <span v-if="jobDetailsData.remark">{{jobDetailsData.remark}}</span>
                <span v-else class="color999">未填写</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="提示" :visible.sync="UncancelVisible" size="tiny" width="550px">
      <div class="module-opera">
        <p>免除后该员工将没有主职，是否将以下兼职变为主职？</p>
        <el-radio-group v-model="UnconcludeForm.information" class="radio-style">
          <el-radio  v-for="(radio, index) in radioSelect" :label="radio.id +','+ radio.dutyChange" :key="index">{{radio.dutyChange}}</el-radio>
        </el-radio-group>
        </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="UnMainmsg" size="mini">不设主职</el-button>
          <el-button type="primary" @click="Save" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getJobdetail, queryClassList, stopDuty, stopPassDuty } from 'static/api/personnel-information/job/job'
import { timeToString } from 'assets/js/common'
import { getToken } from 'assets/js/util'
import { getJobStatus } from 'assets/js/filters'
import { getOrgDetail } from 'static/api/common/common'
import { checkAcceptBaseDetail } from 'static/api/recruit/accept/accept'
import { salaryStandarJson } from 'utils/config'
import { saveSalaryStructure } from 'static/api/setting/index'
import { salaryParams } from 'assets/js/mixins'
import SalaryPure from 'components/SalaryAssembly/pure-salary.jsx'
import { debounce } from 'lodash'
export default {
  mixins: [salaryParams],
  data () {
    return {
      rules: {
        deposeNumber: [
          { required: true, message: '请填写免职发文号', trigger: 'blur' }
        ],
        deposeDispatchTime: [
          { type: 'date', required: true, message: '请填写发文时间', trigger: 'change' }
        ],
        deposeExecuteTime: [
          { type: 'date', required: true, message: '请填写执行时间', trigger: 'change' }
        ],
        deposeDispatch: [
          { required: true, message: '请填写免职发文', trigger: 'blur' }
        ]
      },
      formSalaryParams: '',
      salaryForm: this.deepClone(salaryStandarJson),
      treatmentlevelDatas: [],
      radioSelect: [],
      informationDatas: [],
      activeName2: 'first',
      jobDetailsData: [],
      dutynameDatas: [],
      UncancelVisible: false,
      UnconcludeForm: {
        information: ''
      },
      moveForm: {
        deposeNumber: '',
        deposeDispatch: '',
        deposeDispatchTime: '',
        deposeExecuteTime: '',
        isPrincipal: '',
        newTreatmentRank: '',
        user: '',
        dutyChange: '',
        id: ''
      },
      moveLForm: {
        dutyRankType: '',
        newTreatmentRank: '',
        gzType: ''
      },
      dutylevelDatas: [],
      baseInformation: [],
      newWageLevel: '',
      newWageLevelId: '',
      oldStandard: ''
    }
  },
  methods: {
    /** 免除信息提交**/
    Save () {
      if (!this.UnconcludeForm.information.toString()) {
        this.$message.warning({
          message: '请选择主职变兼职信息!'
        })
      } else {
        this.UnconcludePost = true
        this.postJob()
      }
    },
    /** 不设主职**/
    UnMainmsg () {
      this.UnconcludePost = false
      this.postJob()
    },
    stopSave: debounce(function (formName) {
      let salaryVail = this.moveLForm.gzType === 0 ? this.$refs.salaryPureRef.checkSalaryValidate() : true
      this.$refs[formName].validate((valid) => {
        if (valid && salaryVail) {
          if (this.moveLForm.dutyRankType === 0) {
            if (!this.moveLForm.newTreatmentRank) {
              this.$message.warning({
                message: '请选择新待遇级别!'
              })
              return
            }
          }
          if (this.jobDetailsData.status === 0 && this.informationDatas.length) {
            this.UncancelVisible = true
          } else {
            this.UnconcludePost = true
            this.postJob()
          }
        } else {
          return false
        }
      })
    }),
    postJob () {
      if (this.moveLForm.gzType === 0) {
        this.zeroJob()
      } else {
        this.oneJob()
      }
    },

    zeroJob () {
      let regularSalaryParams = {
        type: 171,
        deleteTag: 3,
        userId: this.$route.params.jobUserId,
        effectiveDate: timeToString(this.moveForm.deposeExecuteTime)
      }
      saveSalaryStructure(Object.assign({}, this._getSalaryParams(), regularSalaryParams)).then(res => {
        this.newWageLevelId = res.result.id
        this.newWageLevel = res.result.standard
        this.oneJob()
      })
    },
    oneJob () {
      let getId = [{ id: this.jobDetailsData.id }]
      let preload = {
        newWageLevel: this.newWageLevel ? this.newWageLevel : '',
        wageLevel: this.oldStandard,
        newWageLevelId: this.newWageLevelId,
        treatmentRank: this.jobDetailsData.treatmentRank,
        treatmentLevelId: this.jobDetailsData.treatmentLevelId,
        newTreatmentRank: this.moveLForm.dutyRankType === 0 ? this.moveLForm.newTreatmentRank.split(',')[0] : '',
        newTreatmentLevelId: this.moveLForm.dutyRankType === 0 ? this.moveLForm.newTreatmentRank.split(',')[1] : '',
        deposeNumber: this.moveForm.deposeNumber,
        deposeDispatch: this.moveForm.deposeDispatch,
        deposeWhy: this.moveForm.deposeWhy,
        deposeDispatchTime: timeToString(this.moveForm.deposeDispatchTime),
        deposeExecuteTime: timeToString(this.moveForm.deposeExecuteTime),
        employeeId: this.$route.params.jobUserId,
        name: this.jobDetailsData.name,
        idCardNumber: this.jobDetailsData.idCardNumber,
        telephone: this.jobDetailsData.telephone,
        dutyNames: this.jobDetailsData.dutyName,
        deptName: this.jobDetailsData.organizationName,
        isPrincipal: this.jobDetailsData.isPrincipal,
        dutyRank: this.jobDetailsData.dutyRank,
        organizationName: this.jobDetailsData.organizationName,
        ids: getId,
        dutyChange: this.UnconcludePost ? (this.UnconcludeForm.information.split(',')[1] || '') : '',
        dutyChangeId: this.UnconcludePost ? (this.UnconcludeForm.information.split(',')[0] || '') : '',
        loginId: getToken('loginId'),
        deptNo: this.baseInformation.orgId,
        id: this.jobDetailsData.id
      }
      stopDuty(preload).then((data) => {
        this.$message.success('操作成功!')
        setTimeout(() => {
          this.$router.replace('/personnel-information/job')
          this.UncancelVisible = false
        }, 400)
      })
    },

    goBack () {
      this.$router.replace('/personnel-information/job')
    },
    /** 查询发起免除的详情**/
    _getJobdetail () {
      let idParams = {
        id: this.$route.params.jobId,
        userId: this.$route.params.jobUserId
      }
      getJobdetail(idParams).then((data) => {
        if (data.result) {
          this.jobDetailsData = data.result.dutyInformation
          // console.log(this.jobDetailsData)
        }
      })
    },
    /** 获取待遇级别信息**/
    _getQueryClassList () {
      queryClassList('TREATMENTLEVEL').then((data) => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.treatmentlevelDatas.push(item)
            }
          })
        }
      })
    },
    /** 获取主职变兼职信息**/
    _getinformation () {
      let Params = {
        userId: this.$route.params.jobUserId,
        id: this.$route.params.jobId
      }
      stopPassDuty(Params).then(data => {
        if (data.result) {
          this.informationDatas = data.result
          data.result.forEach((item) => {
            this.radioSelect.push(item)
          })
        }
      })
    },
    /** 根据ueseId 获取组织结构**/
    _getAcceptDetail () {
      checkAcceptBaseDetail(this.$route.params.jobUserId).then((data) => {
        if (data.result) {
          this.baseInformation = data.result
          this.oldStandard = this.baseInformation.standard
          this.$store.commit('SET_INFO_BY_ORG_ID', data.result.orgId)
          getOrgDetail(data.result.orgId).then(res => {
            this.$store.commit('SET_HRBELONGID', res.result.hrBelongId ? res.result.hrBelongId : res.result.companyId)
          })
        }
      })
    }
  },
  components: {
    SalaryPure
  },
  filters: {
    filterExemptStatus (status) {
      return getJobStatus(status)
    }
  },
  created () {
    this._getJobdetail()
    this._getQueryClassList()
    this._getinformation()
    this._getAcceptDetail()
  }
}
</script>

<style scoped lang="less">
  .salary-form .el-col { margin-right: 10px;}
  .el-select{width: 100%}
  .salary-div span {font-size: 14px;margin: 0px 10px;}
  .radio-style .el-radio{margin-left: 0px!important;margin-top: 10px}
  .div-row_box {
    /deep/ .el-form{
    margin-top:-38px;
    }
    /deep/.el-form-item .el-form-item {
      margin-bottom: 20px;
    }
  }
  .module-opera {
    padding-left:50px;
  }
  .module-opera p{
    font-size: 14px;
    margin-bottom: 15px;
  }
  .module-opera label{
    display:block;
    padding-bottom:8px;
  }
</style>
