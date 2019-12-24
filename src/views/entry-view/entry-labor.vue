<!--入职审核公共页面-->
<template>
<div class="entry-labor_box" @click="laborForm.orgDatas.showTree = false">
  <el-collapse v-model="activeLaborCollapseName" @change="handleLaborChange">
    <el-collapse-item title="入职及劳动人事信息">
      <entry-labor :laborForm="laborForm" ref="laborRef"/>
    </el-collapse-item>
    <el-collapse-item title="材料附件">
      <entry-dic ref="entryDic"/>
    </el-collapse-item>
    <el-collapse-item title="入职类型及薪资信息">
      <entry-type-and-salary
      ref="entryTAS"
      :typeAndSalaryForm="typeAndSalaryForm"
      />
    </el-collapse-item>
  </el-collapse>
  <div class="btn-box mt-20" v-if="routeName.indexOf($route.query.come)!==-1 || $route.query.copyToken">
    <el-button type="primary" size="small" @click="entrySave">保存</el-button>
  </div>
</div>
</template>
<script>
import entryLabor from './entry-labor/entry-labor'
import entryDic from './entry-labor/entry-dic'
import { getUserInfoDetail,
  saveLinkUserEntryInfo,
  saveUserEntryInfo,
  saveSalarySetting,
  saveLinkSalarySettting,
  getUserLinkDetail } from 'static/api/recruit/entry/entry'
import { saveSalaryStructure, saveLinkSalaryStructure } from 'static/api/setting/index'
import { getOrgDetail } from 'static/api/common/common'
import EntryTypeAndSalary from 'components/EntryTypeAndSalary'
import { setSalaryType, getEntryParams } from 'assets/js/mixins'
import { mapGetters } from 'vuex'
import { debounce } from 'lodash'
export default {
  mixins: [setSalaryType, getEntryParams],
  data () {
    return {
      routeName: ['VerifyEntryEntry', 'MarketVerifyEntryEntry', 'MarketVerifyEntryHeadquarters'],
      typeAndSalaryForm: {
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
      activeName: 'first',
      activeLaborCollapseName: 'fisrt',
      laborForm: {
        takejobDate: '',
        entryDate: '',
        orgId: '',
        id: '',
        postName: '',
        insuredInOld: '',
        insuredOldMonth: '',
        insuredOldArea: '',
        fundedInOld: '',
        fundedOldMonth: '',
        fundedOldArea: '',
        cancelConctractWithOld: '',
        orgDatas: {
          filterName: '',
          orgId: '',
          dataTree: [],
          showTree: false,
          disabled: true
          // bindData: 'market'
        }
      },
      probaSalaryParams: '',
      formSalaryParams: ''
    }
  },
  components: {
    entryLabor,
    entryDic,
    EntryTypeAndSalary
  },
  computed: {
    ...mapGetters(['getSalaryArr', 'getSalaryArr']),
    employeeId () {
      return this.$route.query.employeeId ? this.$route.query.employeeId : ''
    },
    actId () {
      return this.$route.query.actId ? this.$route.query.actId : ''
    },
    idCardNumber () {
      return this.$route.query.idCardNumber ? this.$route.query.idCardNumber : this.$store.state.entryIdCardNumber
    },
    laborData () {
      return this.getEntryLaborData()
    }
  },
  methods: {
    handleLaborChange (collapse) {
      // console.log('collapse', collapse)
    },
    vaildLaborForm () {
      return this.$refs.laborRef.vaildLaborForm()
    },
    vaildEntrySalary () {
      return this.$refs.entryTAS.commonVailData()
    },
    getEntryDicData () {
      return this.$refs.entryDic.getExtraList()
    },
    getEntryLaborData () {
      // this.getSalaryStructure()
      // this.getTrySalaryStructure()
      let laborDatas = {
        typeAndSalaryForm: this.typeAndSalaryForm,
        laborForm: this.laborForm,
        extraList: this.getEntryDicData(),
        salaryDatas: this.$refs.entryTAS._getSalaryData()
      //  formSalaryParams: this.formSalaryParams,
      // probaSalaryParams: this.probaSalaryParams
      }
      return laborDatas
    },
    commonLaborVaildata () {
      return this.vaildLaborForm() && this.vaildEntrySalary()
    },
    setDefaultValues () {
      let routeName = this.$route.name
      if (routeName === 'MarketEntryAdd' || routeName === 'MarketEntryReview') {
        this.laborForm.orgDatas.bindData = 'market'
      } else if (routeName === 'PersonEntryAdd') {
        this.laborForm.orgDatas.bindData = 'noMarket'
      }
    },
    handleDetailResult (data) {
      if (data.result) {
        this.laborForm.cancelConctractWithOld = data.result.cancelConctractWithOld
        this.laborForm.fundedOldArea = data.result.fundedOldArea
        this.laborForm.fundedInOld = data.result.fundedInOld
        this.laborForm.insuredOldArea = data.result.insuredOldArea
        this.laborForm.insuredInOld = data.result.insuredInOld
        this.laborForm.idCardNumber = data.result.idCardNumber
        this.laborForm.orgId = data.result.orgId
        this.laborForm.id = data.result.id
        this.laborForm.orgDatas.orgId = data.result.orgId
        this.$store.commit('SET_INFO_BY_ORG_ID', data.result.orgId)
        getOrgDetail(data.result.orgId).then(res => {
          this.$store.commit('SET_HRBELONGID', res.result.hrBelongId ? res.result.hrBelongId : res.result.companyId)
        })
        this.laborForm.orgDatas.filterName = data.result.orgName
        this.laborForm.postName = data.result.postName
        if (data.result.fundedOldMonth) this.laborForm.fundedOldMonth = new Date(data.result.fundedOldMonth)
        if (data.result.insuredOldMonth) this.laborForm.insuredOldMonth = new Date(data.result.insuredOldMonth)
        if (data.result.entryDate) this.laborForm.entryDate = new Date(data.result.entryDate)
        if (data.result.takejobDate) this.laborForm.takejobDate = new Date(data.result.takejobDate)
      }
    },
    // 获取入职信息
    _getUserInfo () {
      const copyToken = this.$route.query.copyToken
      if (!copyToken) {
        if (this.employeeId) {
          this.$store.commit('SET_SALARY_ID', this.employeeId)
          setTimeout(() => {
            getUserInfoDetail(this.employeeId).then(data => {
              this.handleDetailResult(data)
            })
          }, 400)
          setTimeout(() => {
            this.$store.commit('SET_SAVE1', true)
          }, 1000)
        }
      } else {
        this.$store.commit('SET_SALARY_ID', this.employeeId)
        setTimeout(() => {
          getUserLinkDetail({
            copyToken,
            userId: this.$store.state.entryDetailId
          }).then(data => {
            this.handleDetailResult(data)
          })
        }, 400)
        setTimeout(() => {
          this.$store.commit('SET_SAVE1', true)
        }, 1000)
      }
    },
    handleSaveResult () {
      this.$store.commit('SET_SALARY_ID', this.$route.params.employeeId)
      this.$store.commit('SET_SALARY_CHANGE', true)
      this.$message.success('入职信息保存成功!')
      this.$store.commit('SET_SAVE1', true)
      this.$refs.entryDic._getPersonalMaterial()
      this._getUserInfo()
    },
    entrySave: debounce(function (e) {
      const copyToken = this.$route.query.copyToken
      let validate = this.commonLaborVaildata()
      if (validate) {
        let entrySaveParams = this.getEntryInfo()
        let salaryParams = this.getUserSalarySettingInfo()
        // console.log('salary', salaryParams)
        if (!copyToken) {
          saveUserEntryInfo(entrySaveParams).then(data => {
            saveSalarySetting(salaryParams).then(res => {
              let salaryObj = Object.assign({}, this.$refs.entryTAS._getSalaryData(), { userId: this.$route.query.employeeId, deleteTag: 5 })
              saveSalaryStructure(salaryObj).then(result => {
                this.handleSaveResult()
              })
            })
          })
        } else {
          saveLinkUserEntryInfo(Object.assign({}, entrySaveParams,
            { copyToken })).then(data => {
            saveLinkSalarySettting(Object.assign({}, salaryParams, { copyToken })).then(res => {
              let salaryObj = Object.assign({}, this.$refs.entryTAS._getSalaryData(), { userId: this.$route.query.employeeId, deleteTag: 5 })
              saveLinkSalaryStructure(Object.assign({}, salaryObj, { copyToken, userId: this.$store.state.entryDetailId })).then(data => {
                this.handleSaveResult()
              })
            })
          })
        }
      }
    }, 500)
  },
  watch: {
    getSalaryArr (value) {
      this.formSalaryParams = value.formalSalaryStr
      this.probaSalaryParams = value.probationSalaryStr
    }
  },
  created () {
    this.setDefaultValues()
    this._getUserInfo()
  }
}
</script>
<style lang="less" scoped>
.btn-box{
  text-align:center;
  .el-button{
    display: inline-block;
    // width:200px;
  }
}
/deep/.mean-title{
  &::after{
    top:4px;
  }
}
</style>
