<template>
  <div class="container">
    <el-row class="mt-20">
      <ul class="tab-bar-ul clearfix">
        <li><el-button type="primary" size="mini" @click="goBack">返  回</el-button></li>
        <li v-if="$route.params.type == 'head'">
          <el-button type="primary" size="mini" @click="saveUp">提  交</el-button>
        </li>
      </ul>
    </el-row>
    <el-tabs
      class="mt-20"
      v-model="activeName">
      <el-tab-pane label="审批意见" name="first">
        <p class="infor-title">是否录用</p>
        <el-form label-width="130px" ref="typeAndSalaryForm" :model="typeAndSalaryForm">
        <div class="entry-labor_row clearfix">
          <div class="entry-labor_item">
            <el-form-item label="是 否 录 用："
              rop="ptype"
              :rules="{ required: true, message: '请选择是否录用', trigger: ['change', 'blur'] }">
              <el-select
                style="width:100%"
                v-model="typeAndSalaryForm.ptype" placeholder="请选择">
                <el-option label="录用" value="0"></el-option>
                <el-option label="驳回" value="1"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="entry-labor_item" v-show="typeAndSalaryForm.ptype==0">
             <el-form-item label="拟报到时间："
                      prop="preEntryDate"
                       :rules="{ required: true, message: '请选择拟到时间', trigger: ['change', 'blur'] }">
                <el-date-picker
                    v-model="typeAndSalaryForm.preEntryDate"
                    type="date"
                    placeholder="拟报到时间">
                  </el-date-picker>
              </el-form-item>
          </div>
        </div>
          <div v-if="typeAndSalaryForm.ptype==1"  class="reback-row">
            <el-row>
              <el-col>
                <el-form-item label="驳 回 原 因：" class="mustForm">
                  <el-select v-model="backForm.resonNameReason" placeholder="请选择">
                    <el-option
                      v-for="item in resonSelect"
                      :key="item.id"
                      :label="item.codeText"
                      :value="item.codeText">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item >
                  <el-input type="textarea" v-model="backForm.reason"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <br/>
        <div v-if="typeAndSalaryForm.ptype==0">
          <entry-type-and-salary
            ref="entryTypeAs"
         :typeAndSalaryForm="typeAndSalaryForm"
         :rules="rules"
         />
        </div>
      </el-tab-pane>
      <el-tab-pane label="登记表信息" name="second">
        <br/>
        <candidates-detail :baseDatas="acceoeCheckDatas"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { saveSalarySetting, assessCallback } from 'static/api/recruit/entry/entry'
import { saveSalaryStructure } from 'static/api/setting/index'
import { checkAcceptBaseDetail, checkAcceptOtherDetail, checkAcceptJobDetail, checkAcceptFamilyDetail, checkAcceptResumeDetail } from 'static/api/recruit/accept/accept'
import CandidatesDetail from 'components/CandidatesDetail'
import { returnFloat, timeZeroToString } from 'assets/js/common'
import { getToken } from 'assets/js/util'
import { getTaskComplete } from 'static/api/exmine/exmine'
import EntryTypeAndSalary from 'components/EntryTypeAndSalary.vue'
import { setSalaryType, entryRulesMixin } from 'assets/js/mixins'
import { mapGetters } from 'vuex'
import { getSysDic, getOrgDetail } from 'static/api/common/common'
export default {
  mixins: [setSalaryType, entryRulesMixin],
  data () {
    return {
      activeName: 'first',
      ptype: '0',
      probationSalaryStr: '',
      isSalaryStandar: 1,
      backForm: {
        resonNameReason: '',
        reason: ''
      },
      typeAndSalaryForm: {
        ptype: '0',
        preEntryDate: '',
        candidateType: 1,
        exercitationBeginTime: '',
        exercitationEndTime: '',
        exercitationSalary: '',
        exercitationAllowance: '',
        probationBeginTime: '',
        probationEndTime: '',
        workAgreement: '',
        noProbation: false
      },
      resonSelect: [],
      acceoeCheckDatas: {
        baseInformation: [],
        otherInformation: [],
        jobInformation: [],
        familyInformation: [],
        resumeInformation: [],
        nativeForm: {
          provinceName: '',
          provinceId: '',
          areaName: '',
          areaId: '',
          cityName: '',
          cityId: ''
        },
        nowAddressForm: {
          provinceName: '',
          provinceId: '',
          areaName: '',
          areaId: '',
          cityName: '',
          cityId: ''
        },
        hujiForm: {
          provinceName: '',
          provinceId: '',
          areaName: '',
          areaId: '',
          cityName: '',
          cityId: ''
        },
        archivesAddressForm: {
          provinceName: '',
          provinceId: '',
          areaName: '',
          areaId: '',
          cityName: '',
          cityId: ''
        }
      },
      formSalaryParams: '',
      probaSalaryParams: ''
    }
  },
  computed: {
    ...mapGetters(['getSalaryArr'])
  },
  methods: {
    goBack () {
      if (this.$route.params.type === 'head') {
        this.$router.replace('/verify/entry/employment?active=first')
      } else {

      }
    },
    // 查询薪资
    _getSalaryDetail () {
      let isBackReason = this.$route.params.backReason
      if (isBackReason) {
        // let indexOf = isBackReason.indexOf('不同意')
        let newIndex = isBackReason.substr(0, isBackReason.length)
        this.backForm.resonNameReason = newIndex.substr(0, newIndex.indexOf(' '))
        this.backForm.reason = newIndex.substr(newIndex.indexOf(' ') + 1, newIndex.length) === 'null' ? '' : newIndex.substr(newIndex.indexOf(' ') + 1, newIndex.length)
      }
    },
    _getAcceptDetail () {
      this.$store.commit('SET_SALARY_ID', this.$route.params.employeeId)
      /** 查询地址 */
      checkAcceptBaseDetail(this.$route.params.employeeId).then(data => {
        if (data.result) {
          this.acceoeCheckDatas.baseInformation = data.result
          if (data.result.orgId) {
            this.$store.commit('SET_INFO_BY_ORG_ID', data.result.orgId)
            getOrgDetail(data.result.orgId).then(res => {
              this.$store.commit('SET_HRBELONGID', res.result.hrBelongId ? res.result.hrBelongId : res.result.companyId)
            })
          }
          this.acceoeCheckDatas.nativeForm = data.result.nativePlaceMod || this.acceoeCheckDatas.nativeForm
          this.acceoeCheckDatas.hujiForm = data.result.hujiAddressMod || this.acceoeCheckDatas.hujiForm
          this.acceoeCheckDatas.archivesAddressForm = data.result.archivesAddressMod || this.acceoeCheckDatas.archivesAddressForm
          this.acceoeCheckDatas.nowAddressForm = data.result.nowAddressMod || this.acceoeCheckDatas.nowAddressForm
        }
      })
      checkAcceptOtherDetail(this.$route.params.employeeId).then(data => {
        if (data.result && data.result.length) {
          this.acceoeCheckDatas.otherInformation = data.result[0]
          let datas = data.result[0].expectYearSalary
          this.acceoeCheckDatas.otherInformation.expectYearSalary = datas.split(',')[0] === 'null' ? '' : datas.split(',')[0]
          this.acceoeCheckDatas.otherInformation.expectMaxYearSalary = datas.split(',')[1] === 'undefined' ? '' : datas.split(',')[1]
        } else {
          this.acceoeCheckDatas.otherInformation.monthSalaryForm = ''
          this.acceoeCheckDatas.otherInformation.expectYearSalary = ''
          this.acceoeCheckDatas.otherInformation.expectMaxYearSalary = ''
        }
      })
      checkAcceptJobDetail(this.$route.params.employeeId).then(data => {
        this.acceoeCheckDatas.jobInformation = []
        // 去掉全空的数据
        if (data.result && data.result.length) {
          data.result.forEach(item => {
            if (item.startDate || item.endDate || item.workUnit || item.post || item.certifier || item.telephone) {
              this.acceoeCheckDatas.jobInformation.push(item)
            }
          })
        }
      })
      checkAcceptFamilyDetail(this.$route.params.employeeId).then(data => {
        this.acceoeCheckDatas.familyInformation = []
        if (data.result && data.result.length) {
          data.result.forEach(item => {
            if (item.name || item.relation || item.birthday || item.workUnit || item.post || item.telephone || item.age) {
              this.acceoeCheckDatas.familyInformation.push(item)
            }
          })
        }
      })
      checkAcceptResumeDetail(this.$route.params.employeeId).then(data => {
        this.acceoeCheckDatas.resumeInformation = []
        if (data.result && data.result.length) {
          data.result.forEach(item => {
            if (item.startDate || item.endDate || item.school || item.major || item.studyMode || item.education || item.educationWay) {
              this.acceoeCheckDatas.resumeInformation.push(item)
            }
          })
        }
      })
    },
    saveUp () {
      if (this.typeAndSalaryForm.ptype === '0') {
        let isCheckSalaryVaild = true
        let isCheckTrySalaryVaild = true
        let isCheckVaild = this.$refs.entryTypeAs.checkValid()
        if (!this.typeAndSalaryForm.noProbation) {
          isCheckTrySalaryVaild = this.$refs.entryTypeAs.checkTrySalaryValidate()
        } else {
          isCheckSalaryVaild = this.$refs.entryTypeAs.checkSalaryValidate()
        }
        this.$refs['typeAndSalaryForm'].validate(valid => {
          if (valid && isCheckVaild && isCheckTrySalaryVaild && isCheckSalaryVaild) {
            let salaryParams = {
              candidateType: this.typeAndSalaryForm.candidateType,
              probationBeginTime: this.typeAndSalaryForm.probationBeginTime ? timeZeroToString(this.typeAndSalaryForm.probationBeginTime) : '',
              probationEndTime: this.typeAndSalaryForm.noProbation ? '' : this.typeAndSalaryForm.probationEndTime ? timeZeroToString(this.typeAndSalaryForm.probationEndTime) : '',
              exercitationBeginTime: this.typeAndSalaryForm.noProbation ? '' : this.typeAndSalaryForm.exercitationBeginTime ? timeZeroToString(this.typeAndSalaryForm.exercitationBeginTime) : '',
              exercitationEndTime: this.typeAndSalaryForm.exercitationEndTime ? timeZeroToString(this.typeAndSalaryForm.exercitationEndTime) : '',
              workAgreement: this.typeAndSalaryForm.workAgreement,
              operator: getToken('loginId').toString(),
              noProbation: this.typeAndSalaryForm.noProbation ? '1' : '0',
              exercitationSalary: this.typeAndSalaryForm.exercitationSalary,
              exercitationAllowance: this.typeAndSalaryForm.exercitationAllowance,
              preEntryDate: this.typeAndSalaryForm.preEntryDate ? timeZeroToString(this.typeAndSalaryForm.preEntryDate) : '',
              userId: this.$route.params.employeeId
            }
            let salaryObj = Object.assign({}, this.$refs.entryTypeAs._getSalaryData(), { userId: this.$route.params.employeeId, deleteTag: 5 })
            if (this.typeAndSalaryForm.candidateType === 2) {
              salaryObj.exercitationSalary = this.typeAndSalaryForm.exercitationSalary
              salaryObj.exercitationAllowance = this.typeAndSalaryForm.exercitationAllowance
            }

            saveSalarySetting(salaryParams).then(data => {
              saveSalaryStructure(salaryObj).then(res => {
                this.saveUpFinially()
              })
            })
          }
        })
      } else {
        let UnassParams = {
          auditStatus: 0,
          userId: this.$route.params.employeeId,
          remark: this.backForm.resonNameReason,
          reson: this.backForm.reason

        }
        let newPassKey = this.$route.params.exminePassKey
        newPassKey = (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass') + ',' + (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'BackReason')
        let valuePost = false + ',' + this.backForm.resonNameReason + ',' + this.backForm.reason
        let unComplateParams = {
          actType: 'entry',
          userId: getToken('loginId').toString(),
          pId: this.$route.params.exminePid.toString(),
          id: this.$route.params.exmineId.toString(),
          taskId: this.$route.params.exmineTaskId.toString(),
          owner: this.$route.params.exmineUserId.toString(),
          var: {
            keys: newPassKey,
            values: valuePost,
            types: 'B,S'
          }
        }
        this.unComplateForm = unComplateParams
        if (this.backForm.reason === '') {
          this.unComplateForm.var.values = false + ',' + this.backForm.resonNameReason
        } else {
          this.unComplateForm.var.values = false + ',' + this.backForm.resonNameReason + ' ' + this.backForm.reason
        }
        if (!this.backForm.resonNameReason) {
          this.$message.warning('请选择原因!')
          return
        }
        assessCallback(UnassParams).then(data => {
          getTaskComplete(unComplateParams).then(data => {
            this.$message.success('操作成功')
            setTimeout(() => {
              this.$router.replace('/verify/entry/employment?active=first')
            }, 200)
          })
        })
      }
    },
    saveUpFinially () {
      let newPassKey = this.$route.params.exminePassKey
      newPassKey = newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass'
      let complateParams = {
        actType: 'entry',
        userId: getToken('loginId').toString(),
        pId: this.$route.params.exminePid.toString(),
        id: this.$route.params.exmineId.toString(),
        taskId: this.$route.params.exmineTaskId.toString(),
        owner: this.$route.params.exmineUserId.toString(),
        var: {
          keys: newPassKey,
          values: 'true',
          types: 'B'
        }
      }
      getTaskComplete(complateParams).then(data => {
        this.$message.success('审核通过请等待其他审核人的结果')
        setTimeout(() => {
          this.$router.replace('/verify/entry/employment?active=first')
        }, 400)
      })
    },
    /* 数字字典自定义 */
    async _getQueryClassList () {
      await getSysDic('auditRefusedType').then(data => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.resonSelect.push(item)
            }
          })
        }
      })
    }
  },
  components: {
    CandidatesDetail,
    EntryTypeAndSalary
  },
  filters: {
    returnFloat (value) {
      return returnFloat(value)
    }
  },
  created () {
    this._getSalaryDetail()
    this._getAcceptDetail()
    this._getQueryClassList()
  }
}
</script>
<style lang="less" scoped>
  .el-select{
    width:100%;
  }
  .title-span{
    color:#ff7500;
    margin-right:10px;
  }
  .try-salary-text{
    font-size:14px;
    margin-left:15px;
  }
  .try-f-left{
    float:left;
  }
  .try-r-left{
    float: left;
    margin-left:10px;
    max-width:200px;
  }
  .el-form-item{
    margin-bottom: 10px
  }
  .salary-form .el-col{
    margin-right:15px;
  }
  .el-select{width: 100%!important;}
  .salary-div{
    margin: 10px 0px;
    span{
      font-size:14px;
      margin:0px 10px;
    }
  }
  .el-date-editor.el-input{
    min-width:80px;
  }
.entry-labor_row{
  .entry-labor_item{
    float:left;
    min-width:480px;
  }
}
.reback-row{
  .el-col{
    width:480px;
  }
}
</style>
