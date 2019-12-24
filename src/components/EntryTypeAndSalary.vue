<!--入职类型及薪资信息-->
<template>
<div class="type-salary_box">
   <p class="mean-title">入职类型</p>
   <el-form
   class="mt-20"
   label-width="130px"
   :rules="rules"
   ref="typeASF"
   :model="typeAndSalaryForm">
   <div>
    <div class="div-row_box">
            <el-radio-group
            @change="changeCandidateType"
            v-model="typeAndSalaryForm.candidateType">
            <el-radio :label="1">社会人员</el-radio>
            <el-radio :label="2">在校生</el-radio>
            <el-radio :label="3">应届生</el-radio>
            <el-radio :label="4">退休人员</el-radio>
        </el-radio-group>
    </div>
    <div v-if="typeAndSalaryForm.candidateType == 2" class="mt-20">
         <div class="div-row_box clearfix">
         <div class="div-col_box">
             <el-form-item label="实习开始时间:"
                prop="exercitationBeginTime"
                >
                  <el-date-picker
                    v-model="typeAndSalaryForm.exercitationBeginTime"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
         </el-form-item>
        </div>
        <div class="div-col_box">
              <el-form-item
                  label="实习结束时间:"
                  prop="exercitationEndTime"
                >
                  <el-date-picker
                    v-model="typeAndSalaryForm.exercitationEndTime"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
            </el-form-item>
        </div>
    </div>
    <div class="div-row_box clearfix">
       <div class="div-col_box">
         <el-form-item
            label="实习期工资:"
            prop="exercitationSalary">
                <el-input v-model="typeAndSalaryForm.exercitationSalary" type="number" @blur="blurText($event, 'exercitationSalary')">
            <template slot="append">元/月</template>
            </el-input>
            </el-form-item>
        </div>
        <div class="div-col_box">
            <el-form-item
              label="实习期津贴:"
            >
            <el-input v-model="typeAndSalaryForm.exercitationAllowance"
               @blur="blurText($event, 'exercitationAllowance')"
             type="number">
                <template slot="append">元/月</template>
            </el-input>
          </el-form-item>
        </div>
    </div>
     <div class="div-row_box clearfix"
      v-if="!typeAndSalaryForm.noProbation">
        <div class="div-col_box">
            <el-form-item
            label="试用开始时间:">
                <el-date-picker
                v-model="typeAndSalaryForm.probationBeginTime"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
        </div>
        <div class="div-col_box">
            <el-form-item
            label="试用结束时间:"
            prop="probationEndTime"
            >
                  <el-date-picker
                    v-model="typeAndSalaryForm.probationEndTime"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
            </el-form-item>
        </div>
    </div>
    </div>
    <div v-else class="mt-20">
       <div class="div-row_box clearfix">
        <div v-if="!typeAndSalaryForm.noProbation">
              <div class="div-col_box startForm">
            <el-form-item
            prop="probationBeginTime"
            label-width="130px"
            v-if="!typeAndSalaryForm.noProbation"
            label="试用开始时间:">
                <el-date-picker
                v-model="typeAndSalaryForm.probationBeginTime"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
        </div>
        <div class="div-col_box startForm">
            <el-form-item
            label="试用结束时间:"
            label-width="130px"
            prop="probationEndTime"
            v-if="!typeAndSalaryForm.noProbation"
            >
                  <el-date-picker
                    v-model="typeAndSalaryForm.probationEndTime"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
            </el-form-item>
        </div>
        </div>
        <div class="div-check_box">
             <el-checkbox @change="clearTimeValue" v-model="typeAndSalaryForm.noProbation">无试用期</el-checkbox>
        </div>
    </div>
    </div>
     <div class="div-row_box mt-20 clearfix">
      <el-row>
        <el-col :span="16" style="min-width:700px">
             <salary-all
               v-if="updateCom"
              ref="selectSalaryRef"
              :salaryForm="salaryForm"
              :showTry="typeAndSalaryForm.noProbation"
              :trySalaryForm="trySalaryForm"
              />
        </el-col>
      </el-row>
    </div>
   </div>
   </el-form>
</div>
</template>
<script>
import SalaryAll from '@/components/SalaryAssembly/all-salary.jsx'
import { returnFloat, timeZeroToString } from 'assets/js/common'
import { checkDetail } from 'static/api/recruit/entry/entry'
import { getSalaryDeatil, getLinkSalaryDetail } from 'static/api/setting/index'
import { salaryStandarJson } from 'utils/config'
import { mapGetters } from 'vuex'
export default {
  data () {
    let validateExercitationEndDate = (rule, value, callback) => {
      if (value && new Date(timeZeroToString(value)).getTime() < new Date(timeZeroToString(this.typeAndSalaryForm.exercitationBeginTime)).getTime()) {
        callback(new Error('实习结束时间不得早于实习开始时间!'))
      } else {
        callback()
      }
    }
    let validateProbationEndTime = (rule, value, callback) => {
      if (value === '') {
        if (this.typeAndSalaryForm.candidateType + '' === '2' && !this.typeAndSalaryForm.noProbation) {
          callback()
        } else {
          callback(new Error('请选择试用期结束时间'))
        }
      } else if (value && new Date(timeZeroToString(value)).getTime() < new Date(timeZeroToString(this.typeAndSalaryForm.probationBeginTime)).getTime()) {
        callback(new Error('试用结束时间不得早于试用开始时间!'))
      } else {
        callback()
      }
    }
    return {
      updateCom: true,
      comeRouters: ['VerifyEntryEntry', 'VerifyEntryEmployment', 'MarketVerifyEntryEntry', 'MarketReExmine', 'MarketVerifyEntryHeadquarters'],
      recCandidateType: '',
      reExercitationBeginTime: '',
      recFormSalaryStr: '',
      recTrySalaryStr: '',
      salaryForm: this.deepClone(salaryStandarJson),
      trySalaryForm: this.deepClone(salaryStandarJson),
      salaryId: '',
      //   typeAndSalaryForm: {
      //     candidateType: 1,
      //     exercitationBeginTime: '',
      //     exercitationEndTime: '',
      //     exercitationSalary: '',
      //     exercitationAllowance: '',
      //     probationBeginTime: '',
      //     probationEndTime: '',
      //     workAgreement: '',
      //     noProbation: ''
      //   },
      //   salarySelectForm: {
      //     countBasicsSalary: '',
      //     firstSalary: '',
      //     firstSalaryName: '',
      //     SecondSalary: '',
      //     SecondSalaryName: '',
      //     thirdSalary: '',
      //     thirdSalaryName: '',
      //     fourSalary: '',
      //     fourSalaryName: '',
      //     fiveSalary: '',
      //     fiveSalaryName: '',
      //     postTestSalary: '',
      //     baseSalary: '',
      //     levelSalary: '',
      //     operationSalary: '',
      //     businessSalary: '',
      //     isSubsidy: 1,
      //     subsidySalary: '',
      //     isWarehouse: false
      //   },
      //   trySalaryForm: {
      //     tryPrecent: '',
      //     jtPrecent: '',
      //     baseSalary: '',
      //     operationSalary: '',
      //     businessSalary: '',
      //     countBasicsSalary: '',
      //     levelSalary: '',
      //     postTestSalary: '',
      //     subsidySalary: '',
      //     trySalaryStanderMon: ''
      //   },
      rules: {
        exercitationBeginTime: { required: true, message: '请选择实习期开始时间', trigger: 'change', type: 'date' },
        exercitationEndTime: { validator: validateExercitationEndDate, trigger: 'change', type: 'date' },
        // exercitationEndTime: {required: true, message: '请选择试用期结束时间', trigger: 'change', type: 'date'},
        exercitationSalary: { required: true, message: '请填写实习期工资', trigger: 'blur' },
        workAgreement: { required: true, message: '是否签订就业协议', trigger: 'change' },
        probationBeginTime: { required: true, message: '请选择试用期开始时间', trigger: 'change', type: 'date' },
        // probationEndTime: {required: true, message: '请选择试用期结束时间', trigger: 'change', type: 'date'}
        probationEndTime: { validator: validateProbationEndTime, required: this.typeAndSalaryForm.candidateType + '' === '2' && !this.typeAndSalaryForm.noProbation, trigger: 'change', type: 'date' }

      },
      showSalaryMethods: false
    }
  },
  computed: {
    ...mapGetters(['getSalaryId', 'getSalaryChange'])
  },
  props: {
    // rules: {
    //   type: Object
    // },
    typeAndSalaryForm: {
      type: Object
    }
    // salarySelectForm: {
    //   type: Object
    // },
    // trySalaryForm: {
    //   type: Object
    // }
  },
  components: {
    SalaryAll
  },
  methods: {
    blurText (e, value) {
      let boolean = new RegExp('^[1-9][0-9]*$').test(e.target.value)
      if (!boolean) {
        this.$message.warning('请输入正整数')
        this.typeAndSalaryForm[value] = ''
      }
    },
    _getSalaryData () {
      let type = 173
      if (this.typeAndSalaryForm.candidateType === 2) {
        type = 172
      } else {
        if (this.typeAndSalaryForm.noProbation) {
          type = 174
        }
      }
      let salaryMlist = this.salaryForm.commonSalaryArr.map(item => {
        return {
          id: item.ssId ? item.editId : '',
          ssId: item.ssId ? item.ssId : item.id,
          money: Number(item.amount),
          grandId: item.grandId,
          type: 1
        }
      })
      if (this.salaryForm.selectOtherOptions.join(',')) {
        salaryMlist.push({
          id: this.salaryForm.otherArr.ssId ? this.salaryForm.otherArr.editId : '',
          ssId: this.salaryForm.otherArr.ssId ? this.salaryForm.otherArr.ssId : this.salaryForm.otherArr.id,
          money: Number(this.salaryForm.otherArr.money),
          grandId: this.salaryForm.otherArr.grandId,
          type: 1
        })
      }
      let baseParams = {
        id: this.salaryId,
        type,
        // isProbation: this.typeAndSalaryForm.noProbation ? 2 : 1,
        ssId: this.salaryForm.selecteSalarydOptions.join(','),
        otherSsId: this.salaryForm.selectOtherOptions.join(','),
        postId: this.salaryForm.postArr.length ? this.salaryForm.postArr.join(',') + ',' + this.salaryForm.optionArr : this.salaryForm.optionArr,
        percent: this.trySalaryForm.showParcent ? Number(this.trySalaryForm.percent) : null,
        mlist: salaryMlist
      }
      if (!this.typeAndSalaryForm.noProbation) {
        baseParams.effectiveDate = timeZeroToString(this.typeAndSalaryForm.probationBeginTime)
        baseParams = Object.assign({}, baseParams, {
          probationSsId: this.trySalaryForm.selecteSalarydOptions.join(','),
          probationOtherSsId: this.trySalaryForm.selectOtherOptions.join(','),
          probationPostId: this.trySalaryForm.postArr.length ? this.trySalaryForm.postArr.join(',') + ',' + this.trySalaryForm.optionArr : this.trySalaryForm.optionArr
        })
        this.trySalaryForm.commonSalaryArr.map(item => {
          baseParams.mlist.push({
            id: item.ssId ? item.editId : '',
            ssId: item.ssId ? item.ssId : item.id,
            money: Number(item.amount),
            grandId: item.grandId,
            type: 2
          })
        })
        if (this.trySalaryForm.selectOtherOptions.join(',')) {
          baseParams.mlist.push({
            id: this.trySalaryForm.otherArr.ssId ? this.trySalaryForm.otherArr.editId : '',
            ssId: this.trySalaryForm.otherArr.ssId ? this.trySalaryForm.otherArr.ssId : this.trySalaryForm.otherArr.id,
            money: Number(this.trySalaryForm.otherArr.money),
            grandId: this.trySalaryForm.otherArr.grandId,
            type: 2
          })
        }
      } else {
        baseParams.effectiveDate = timeZeroToString(new Date())
      }
      if (this.typeAndSalaryForm.candidateType === 2) {
        baseParams.exercitationSalary = this.typeAndSalaryForm.exercitationSalary
        baseParams.exercitationAllowance = this.typeAndSalaryForm.exercitationAllowance
        baseParams.effectiveDate = timeZeroToString(this.typeAndSalaryForm.exercitationBeginTime)
      } else {
        baseParams.isProbation = this.typeAndSalaryForm.noProbation ? 2 : 1
      }
      return baseParams
    },
    showSalaryStandard (value) {
      if (value === 1) {
        this._getSalaryDetail()
      }
    },
    clearTimeValue (value) {
      this.typeAndSalaryForm.probationBeginTime = ''
      this.typeAndSalaryForm.probationEndTime = ''
      this.$store.commit('SET_PROBATION', value)
      setTimeout(() => {
        // this.$refs.selectSalaryRef.commonResetSalaryValidata()
      }, 200)
    },
    _getSalaryDetail () {
      if (this.getSalaryId) {
        checkDetail(this.getSalaryId).then(data => {
          if (data.result) {
            this.typeAndSalaryForm.candidateType = data.result.candidateType
            this.$store.commit('SET_CANDIDATE_TYPE', data.result.candidateType)
            this.recCandidateType = data.result.candidateType
            this.typeAndSalaryForm.positiveTime = data.result.positiveTime ? new Date(data.result.positiveTime) : ''
            this.typeAndSalaryForm.exercitationBeginTime = data.result.exercitationBeginTime ? new Date(data.result.exercitationBeginTime) : ''
            this.reExercitationBeginTime = data.result.exercitationBeginTime
            this.typeAndSalaryForm.exercitationEndTime = data.result.exercitationEndTime ? new Date(data.result.exercitationEndTime) : ''
            // this.typeAndSalaryForm.exercitationSalary = data.result.exercitationSalary
            // this.typeAndSalaryForm.exercitationAllowance = data.result.exercitationAllowance
            this.typeAndSalaryForm.probationBeginTime = data.result.probationBeginTime ? new Date(data.result.probationBeginTime) : ''
            this.typeAndSalaryForm.probationEndTime = data.result.probationEndTime ? new Date(data.result.probationEndTime) : ''
            this.typeAndSalaryForm.noProbation = data.result.noProbation === '1'
            this.typeAndSalaryForm.preEntryDate = data.result.preEntryDate
          }
        })
      } else {
        // this.typeAndSalaryForm.candidateType = ''
        //  this.salarySelectForm.isSalaryStandar = ''
      }
    },
    // 切换清除数据
    changeCandidateType (value) {
      this.typeAndSalaryForm.probationEndTime = ''
      this.typeAndSalaryForm.probationBeginTime = ''
      this.typeAndSalaryForm.noProbation = false
      this.$store.commit('SET_CANDIDATE_TYPE', value)
      if (value !== 2) {
        this.typeAndSalaryForm.exercitationAllowance = ''
        this.typeAndSalaryForm.exercitationSalary = ''
        this.typeAndSalaryForm.exercitationEndTime = ''
        this.typeAndSalaryForm.exercitationBeginTime = ''
      }
      this.salaryForm = this.deepClone(salaryStandarJson)
      this.trySalaryForm = this.deepClone(salaryStandarJson)
      if (value === this.recCandidateType) {
        this.showSalaryMethods = true
        this._getSalaryDetail()
        this._getNewSalaryDetail()
        // 重新渲染组件
        this.updateCom = false
        this.$nextTick(() => {
          this.updateCom = true
        })
      } else {
        this.showSalaryMethods = false
      }
    },
    // 调用salary-select组件里面的方法
    checkSalaryValidate () {
    //  return true
      return this.$refs.selectSalaryRef.checkSalaryValidate()
    },
    checkTrySalaryValidate () {
      // return true
      return this.$refs.selectSalaryRef.checkTrySalaryValidate()
    },
    // 调用验证方法
    checkValid () {
      let vall = ''
      this.$refs.typeASF.validate(valid => {
        vall = !!valid
      })
      return vall
    },
    commonVailData () {
      if (this.typeAndSalaryForm.noProbation) {
        return this.checkValid() && this.checkSalaryValidate()
      } else {
        return this.checkValid() && this.checkTrySalaryValidate()
      }
    },
    handleResult (data) {
      if (data.result) {
        this.salaryId = data.result.id
        let salaryMlist = []
        let tryMlist = []
        if (data.result.mlist && data.result.mlist.length) {
          salaryMlist = data.result.mlist.filter(x => x.type === 1)
          tryMlist = data.result.mlist.filter(x => x.type === 2)
        }
        if (data.result.ssId) {
          let sSids = data.result.ssId.split(',').map(item => Number(item))
          this.salaryForm.selecteSalarydOptions = sSids
          this.salaryForm.mlist = salaryMlist
          if (this.showSalaryMethods) {
            this.$refs.selectSalaryRef.handleSalaryResult(sSids)
          }
        }
        if (data.result.otherSsId) {
          let othersSids = data.result.otherSsId.split(',').map(item => Number(item))
          this.salaryForm.selectOtherOptions = othersSids
          this.$refs.selectSalaryRef.handleOtherSalaryResult(othersSids)
        }
        if (data.result.probationSsId) {
          this.trySalaryForm.selecteSalarydOptions = data.result.probationSsId.split(',').map(item => Number(item))
          this.trySalaryForm.mlist = tryMlist
        }
        if (data.result.probationOtherSsId) {
          this.trySalaryForm.selectOtherOptions = data.result.probationOtherSsId.split(',').map(item => Number(item))
        }
        if (data.result.postId) {
          const numbers = data.result.postId.split(',').map(Number)
          this.salaryForm.postArr = numbers
          this.salaryForm.optionArr = numbers[0]
        }
        if (data.result.probationPostId) {
          const numbers1 = data.result.probationPostId.split(',').map(Number)
          this.trySalaryForm.postArr = numbers1
          this.trySalaryForm.optionArr = numbers1[0]
        }
        if (data.result.mlist) {
          this.salaryForm.mlist = data.result.mlist.filter(x => x.type === 1 || x.type === '1')
          this.trySalaryForm.mlist = data.result.mlist.filter(x => x.type === 2 || x.type === '2')
        }
        if (data.result.percent) {
          this.trySalaryForm.percent = data.result.percent
        } else {
          this.trySalaryForm.percent = null
        }
        if (data.result.exercitationSalary) {
          this.typeAndSalaryForm.exercitationSalary = data.result.exercitationSalary
        }
        if (data.result.exercitationAllowance) {
          this.typeAndSalaryForm.exercitationAllowance = data.result.exercitationAllowance
        }
      }
    },
    // 获取薪资详情====（调用新接口）
    _getNewSalaryDetail () {
      const copyToken = this.$route.query.copyToken
      if (!copyToken) {
        let userId = this.$route.query.employeeId
        let comeRouter = this.$route.query.come
        this.salaryId = ''
        if (userId) {
          let detailParms = {
            userId
            // deleteTag: 5
          }
          if (comeRouter && this.comeRouters.indexOf(comeRouter) !== -1) {
            detailParms.deleteTag = 5
          }
          getSalaryDeatil(detailParms).then(data => {
            this.handleResult(data)
          })
        }
      } else {
        getLinkSalaryDetail({
          copyToken,
          deleteTag: 5,
          userId: this.$store.state.entryDetailId
        }).then(data => {
          this.handleResult(data)
        })
      }
    }
  },
  filters: {
    returnFloat (value) {
      return returnFloat(value)
    },
    timeToString (value) {
      if (value) {
        return timeZeroToString(value)
      } else {
        return ''
      }
    }
  },
  watch: {
    getSalaryChange (value) {
      if (value) {
        this._getSalaryDetail()
      }
      this.$store.commit('SET_SALARY_CHANGE', false)
    }
  },
  created () {
    console.log('$route:', this.$route.name)
    this._getSalaryDetail()
    this._getNewSalaryDetail()
  }
}
</script>
<style lang="less" scoped>
.startForm{
    .el-form-item.mustForm::before{
      left: -2px;
    }
  }
.div-row_box{
  .div-col_box{
    float:left;
    width:400px;
    margin-right:20px;
    &:nth-of-type(1){
      .el-form-item{}
    }
  }
  .div-check_box{
    float:left;
    margin-top:8px;
  }
}
.txt-salary{
  line-height:32px;
}
// /deep/.mean-title{
//   &::after{
//     top:4px;
//   }
// }
</style>
