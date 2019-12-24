<template>
  <div class="base-update-status">
     <el-row>
      <el-button type="primary" size="mini" @click="submitUpdate">提交{{updateType === '2' ? '更正' : '更新'}}</el-button>
    </el-row>
    <el-collapse v-model="activeNames">
     <el-collapse-item :title="'原'+collpaseTitle+'信息'" name="1">
        <div v-if="userStatus === 'report'">
            <el-row>
                毕业时间:{{checkDetailDatas.graduationDate || '未填写'}}
            </el-row>
             <el-row v-html="renderCompent()" class="mt-10"></el-row>
             <div v-html="renderStanderComponent()"></div>
        </div>
        <div v-if="userStatus === 'internship'">
          <el-row >
            <el-col :span="8">
               实习开始时间: {{checkDetailDatas.exercitationBeginTime || '未填写'}}
            </el-col>
            <el-col :span="8">
              实习结束时间: {{checkDetailDatas.exercitationEndTime || '未填写'}}
            </el-col>
          </el-row>
           <el-row class="mt-10">
            <el-col :span="8">
              实习期工资: {{checkDetailDatas.exercitationSalary || '未填写'}}
            </el-col>
            <el-col :span="8">
              实习期津贴: {{checkDetailDatas.exercitationAllowance || '未填写'}}
            </el-col>
          </el-row>
           <el-row v-html="renderCompent()" class="mt-10"></el-row>
           <div v-html="renderStanderComponent()"></div>
        </div>
         <div v-if="userStatus==='regular'">
           <el-row>
               转正时间: {{checkDetailDatas.positiveTime}}
           </el-row>
           <el-row class="mt-10">
              转正后工资标准: {{checkDetailDatas.formalSalary || '未填写'}}
           </el-row>
        </div>
        <div v-if="userStatus === 'formal'">
           <p class="mean-title">入职类型</p>
          <el-row class="mt-10">
            <span v-if="checkDetailDatas.candidateType === 1 || checkDetailDatas.candidateType === 3 || checkDetailDatas.candidateType === 4">社会人员入职</span>
            <span v-if="checkDetailDatas.candidateType === 2">在校生入职</span>
            <!--<span v-if="checkDetailDatas.candidateType === 3">应届生</span>-->
            <!--<span v-if="checkDetailDatas.candidateType === 4">退休人员</span>-->
          </el-row>
          <el-row v-html="renderCompent()" class="mt-10"></el-row>
           <div v-html="renderStanderComponent()"></div>
        </div>
     </el-collapse-item>
      <el-collapse-item :title="'新'+collpaseTitle+'信息'" name="2">
        <el-form :rules="rules" label-width="135px" :model="statusForm">
        <div v-if="userStatus === 'report'">
        <el-row>
          <el-col :span="8">
            <el-form-item label="毕业时间">{{checkDetailDatas.graduationDate || '未填写'}}</el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15" type="flex" v-if="`${this.checkDetailDatas.noProbation}` !== '1'">
          <el-col :span="8">
            <el-form-item label="试用期开始时间：">{{checkDetailDatas.probationBeginTime || '未填写'}} </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="probationEndTime"  label="试用期结束时间：" required>
               <el-date-picker
                v-model="statusForm.probationEndTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="试用期结束时间">
              </el-date-picker>
           </el-form-item>
          </el-col>
        </el-row>
        <el-row v-else>
            无试用期
        </el-row>
        </div>
        <div v-if="userStatus === 'internship'">
          <el-row :gutter="15" type="flex">
            <el-col :span="8">
               <el-form-item
              required
              label="实习开始时间：">
              <span v-if="updateType === '1'">{{checkDetailDatas.exercitationBeginTime || '未填写'}}
              </span>
               <el-date-picker
               v-if="updateType === '2'"
                v-model="checkDetailDatas.exercitationBeginTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="实习开始时间">
              </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
              required
              prop="exercitationEndTime"
              label="实习结束时间：">
               <el-date-picker
                v-model="statusForm.exercitationEndTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="实习结束时间">
              </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="15" type="flex">
            <el-col :span="8">
              <el-form-item
              required
              label="实习期工资："
              >
              <el-input v-model="statusForm.exercitationSalary" type="number">
            <template slot="append">元/月</template>
            </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
              label="实习期津贴："
              >
              <el-input v-model="statusForm.exercitationAllowance" type="number">
              <template slot="append">元/月</template>
              </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="15" type="flex" v-if="`${this.checkDetailDatas.noProbation}` !== '1'">
            <el-col :span="8">
              <el-form-item label="试用期开始时间：">
               <el-date-picker
                v-model="statusForm.probationBeginTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="试用期开始时间">
              </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
               <el-form-item prop="probationEndTime" label="试用期结束时间：">
               <el-date-picker
                v-model="statusForm.probationEndTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="试用期结束时间">
              </el-date-picker>
               </el-form-item>
            </el-col>
          </el-row>
          <el-row v-else>
            无试用期
          </el-row>
        </div>
        <div v-if="userStatus==='regular'">
            <!--<el-col :span="8">-->
              <el-form-item
                required
                label="转正时间：">
              <span v-if="updateType === '1'">{{checkDetailDatas.positiveTime || '未填写'}}
              </span>
                <div style="width: 400px;">
                  <el-date-picker
                    v-if="updateType === '2'"
                    v-model="statusForm.positiveTime"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="转正时间">
                  </el-date-picker>
                </div>
              </el-form-item>
            <!--</el-col>-->
        </div>
        <div v-if="userStatus === 'formal'">
          <el-row
         :gutter="15"
         type="flex"
         v-if="`${this.checkDetailDatas.noProbation}` !== '1'"
         >
          <el-col :span="8">
            <el-form-item
            label="试用期开始时间："
            >
             <span v-if="updateType === '1'">{{checkDetailDatas.probationBeginTime || '未填写'}}
              </span>
               <el-date-picker
               v-if="updateType === '2'"
                v-model="checkDetailDatas.probationBeginTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="试用期开始时间">
              </el-date-picker>
          </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item
            label="试用期结束时间："
            prop="probationEndTime"
            required
            >
               <el-date-picker
                v-model="statusForm.probationEndTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="试用期结束时间">
              </el-date-picker>
          </el-form-item>
          </el-col>
        </el-row>
        <el-row v-else>
          无试用期
        </el-row>
        </div>
        </el-form>
        <el-row v-if="userStatus!== 'regular' && `${checkDetailDatas.noProbation}`!=='1'">
          <salary-all
            ref="salaryAllRef"
            :salaryForm="salaryForm"
            :trySalaryForm="trySalaryForm"
            />
        </el-row>
        <el-row v-else>
          <salary-pure ref="salaryPureRef" :salaryData="salaryForm"/>
        </el-row>
     </el-collapse-item>
  </el-collapse>
  </div>
</template>
<script>
import { debounce, cloneDeep } from 'lodash'
import entryApi from 'api/entry'
import SalaryAll from '@/components/SalaryAssembly/all-salary.jsx'
import SalaryPure from '@/components/SalaryAssembly/pure-salary.jsx'
import { salaryStandarJson } from 'utils/config'
import { salaryParams } from '@/assets/js/mixins'
import commonApi from 'api/common'
import { getToken } from 'assets/js/util'
import { timeZeroToString } from 'assets/js/common'
export default {
  mixins: [salaryParams],
  data () {
    let validateExercitationEndDate = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请选择实习期结束时间'))
      } else if (value && new Date(timeZeroToString(value)).getTime() < new Date(timeZeroToString(this.checkDetailDatas.exercitationBeginTime)).getTime()) {
        callback(new Error('实习结束时间不得早于实习开始时间!'))
      } else {
        callback()
      }
    }
    let validateProbationEndTime = (rule, value, callback) => {
      if (!value) {
        if (this.userStatus === 'internship' && `${this.checkDetailDatas.noProbation}` !== '1') {
          callback()
        } else {
          callback(new Error('请选择试用期结束时间'))
        }
      } else if (value && new Date(timeZeroToString(value)).getTime() < new Date(timeZeroToString(this.userStatus === 'internship' && `${this.checkDetailDatas.noProbation}` !== '1' ? this.statusForm.probationBeginTime : this.checkDetailDatas.probationBeginTime)).getTime()) {
        callback(new Error('试用结束时间不得早于试用开始时间!'))
      } else {
        callback()
      }
    }
    return {
      // 原入职
      checkDetailDatas: {},
      activeNames: ['1', '2'],
      statusForm: {
        graduationDate: '',
        positiveTime: '',
        probationBeginTime: '',
        probationEndTime: '',
        exercitationBeginTime: '',
        exercitationEndTime: '',
        exercitationSalary: '',
        exercitationAllowance: ''
      },
      salaryForm: cloneDeep(salaryStandarJson),
      trySalaryForm: cloneDeep(salaryStandarJson),
      rules: {
        exercitationEndTime: { validator: validateExercitationEndDate, trigger: 'change', type: 'date' },
        probationEndTime: { validator: validateProbationEndTime, required: (this.userStatus === 'internship' && `${this.checkDetailDatas.noProbation}` !== '1'), type: 'date' }

      }
    }
  },
  components: {
    SalaryAll,
    SalaryPure
  },
  computed: {
    userStatus () {
      let currentStatus = ''
      const { logType, candidateType } = this.checkDetailDatas
      if (`${logType}` === '2') {
        currentStatus = 'report' // 执行过报道操作
      } else if (`${logType}` === '3') {
        currentStatus = 'regular' // 执行过转正操作
      } else if (`${logType}` === '1') {
        if (`${candidateType}` === '2') {
          currentStatus = 'internship' // 实习未执行过报道操作
        } else {
          currentStatus = 'formal' // 正式未执行过转正操作
        }
      }
      console.log('currentStatus:', currentStatus)
      return currentStatus
    },
    collpaseTitle () {
      return this.userStatus === 'report' ? '报到' : this.userStatus === 'regular' ? '转正' : '入职'
    },
    updateType () {
      return this.$route.name === 'PersonnalBaseCorrections' ? '2' : '1'
    }
  },
  methods: {
    renderCompent () {
      return `${this.checkDetailDatas.noProbation}` !== '1' ? `
            <div  class="el-col el-col-8">
              试用期开始时间: ${this.checkDetailDatas.probationBeginTime || '未填写'}
            </div>
            <div class="el-col el-col-8">
              试用期结束时间: ${this.checkDetailDatas.probationEndTime || '未填写'}
            </div>
      ` : `
            <div class="el-col el-col-8 ft14"><span>无试用期</span></div>
      `
    },
    //  noProbation 0有试用期  1无试用期
    renderStanderComponent () {
      return `${this.checkDetailDatas.noProbation}` !== '1' ? `
       <div class="mt-10 el-row">
             试用期工资标准:
           </div>
           <div class="mt-10 el-row">
           ${this.checkDetailDatas.probationSalary || '未填写'}
           </div>
           <div class="mt-10 el-row">
             转正后工资标准:
           </div>
           <div class="mt-10 el-row">
            ${this.checkDetailDatas.formalSalary || '未填写'}
           </div>
      ` : `
           <div class="mt-10 el-row">
             转正后工资标准:
           </div>
           <div class="mt-10 el-row">
            ${this.checkDetailDatas.formalSalary || '未填写'}
           </div>
      `
    },
    // 判断转正的薪资必填项
    regularValidate () {
      return new Promise(resolve => {
        if (!this.statusForm.positiveTime) {
          resolve('转正时间必填')
        }
        const validate = this.$refs.salaryPureRef.checkSalaryValidate()
        resolve(validate)
      })
    },
    // 判断报到工资必填
    reportVaildate () {
      return new Promise(resolve => {
        let validate = ''
        if (!this.statusForm.probationEndTime && `${this.checkDetailDatas.noProbation}` !== '1') {
          resolve('试用期结束时间必填')
        }
        if (this.statusForm.probationEndTime && new Date(timeZeroToString(this.statusForm.probationEndTime)).getTime() < new Date(timeZeroToString(this.checkDetailDatas.probationBeginTime)).getTime()) {
          resolve('试用结束时间不得早于试用开始时间!')
        }
        if (`${this.checkDetailDatas.noProbation}` !== '1') {
          validate = this.trySalaryForm.selecteSalarydOptions.length && this.$refs.salaryAllRef.checkSalaryValidate() && this.$refs.salaryAllRef.checkTrySalaryValidate()
        } else {
          validate = this.salaryForm.selecteSalarydOptions.length && this.$refs.salaryPureRef.checkSalaryValidate()
        }
        resolve(validate)
      })
    },
    // 判断实习期工资必填
    internshipValidate () {
      return new Promise(resolve => {
        if (!this.statusForm.exercitationEndTime) {
          resolve('实习期结束时间必填')
        }
        if (this.statusForm.exercitationEndTime && new Date(timeZeroToString(this.statusForm.exercitationEndTime)).getTime() < new Date(timeZeroToString(this.checkDetailDatas.exercitationBeginTime)).getTime()) {
          resolve('实习结束时间不得早于实习开始时间!')
        }
        if (!this.statusForm.exercitationSalary) {
          resolve('实习期工资必填')
        }
        if (this.statusForm.probationEndTime && new Date(timeZeroToString(this.statusForm.probationEndTime)).getTime() < new Date(timeZeroToString(this.statusForm.probationBeginTime)).getTime()) {
          resolve('试用结束时间不得早于试用开始时间!')
        }
        if (this.userStatus !== 'regular' && `${this.checkDetailDatas.noProbation}` !== '1') {
          let pro = this.$refs.salaryAllRef.checkSalaryValidate() && this.$refs.salaryAllRef.checkTrySalaryValidate()
          if (!pro) resolve('请填写薪资')
        }
        resolve(false)
      })
    },
    // 计算当前应该提交哪些值和已选择的作比较
    _countParams () {
      let params = []
      const currentParams = {
        userId: this.$route.params.id,
        type: this.updateType,
        tab: 3,
        remark: '',
        changeValue: '',
        changeName: '人员状态变化',
        name: '',
        oldValue: '',
        oldId: this.checkDetailDatas.id,
        newValue: ''
      }
      if (this.userStatus === 'regular') {
        params = [Object.assign({}, currentParams, {
          userSalarySetting: {
            userSalaryMonth: Object.assign({}, this._getSalaryParams(), {
              type: 176,
              userId: this.$route.params.id,
              effectiveDate: this.checkDetailDatas.positiveTime
            }),
            positiveTime: this.updateType === '2' ? this.statusForm.positiveTime : this.checkDetailDatas.positiveTime
          }
        })]
      }
      if (this.userStatus === 'internship') {
        params = [Object.assign({}, currentParams, {
          userSalarySetting: {
            userSalaryMonth: Object.assign({}, `${this.checkDetailDatas.noProbation}` !== '1' ? this._getTrySalaryParams() : this._getSalaryParams(), {
              type: 172,
              userId: this.$route.params.id,
              exercitationSalary: this.statusForm.exercitationSalary,
              exercitationAllowance: this.statusForm.exercitationAllowance
            }),
            exercitationBeginTime: this.checkDetailDatas.exercitationBeginTime,
            exercitationEndTime: this.statusForm.exercitationEndTime,
            probationBeginTime: this.statusForm.probationBeginTime,
            probationEndTime: this.statusForm.probationEndTime
          }
        })]
      }
      if (this.userStatus === 'report') {
        params = [Object.assign({}, currentParams, {
          userSalarySetting: {
            userSalaryMonth: Object.assign({}, `${this.checkDetailDatas.noProbation}` !== '1' ? this._getTrySalaryParams() : this._getSalaryParams(), {
              type: 175,
              userId: this.$route.params.id,
              isProbation: 1,
              effectiveDate: this.checkDetailDatas.probationBeginTime
            }),
            exercitationBeginTime: this.checkDetailDatas.exercitationBeginTime,
            exercitationEndTime: this.checkDetailDatas.exercitationEndTime,
            probationBeginTime: this.checkDetailDatas.probationBeginTime,
            probationEndTime: this.statusForm.probationEndTime
          }
        })]
      }
      if (this.userStatus === 'formal') {
        params = [Object.assign({}, currentParams, {
          userSalarySetting: {
            userSalaryMonth: Object.assign({}, `${this.checkDetailDatas.noProbation}` !== '1' ? this._getTrySalaryParams() : this._getSalaryParams(), {
              type: 173,
              userId: this.$route.params.id
            }),
            probationBeginTime: this.checkDetailDatas.noProbation !== '1' ? this.checkDetailDatas.probationBeginTime : '',
            probationEndTime: this.statusForm.probationEndTime,
            exercitationBeginTime: this.checkDetailDatas.exercitationBeginTime,
            exercitationEndTime: this.checkDetailDatas.exercitationEndTime
          }
        })]
      }
      return params
    },
    // 提交
    submitUpdate: debounce(function (e) {
      this.$confirm(`确定要提交${getToken('updateName')}的信息${this.updateType === '2' ? '更正' : '更新'}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let userChangeData = ''
        if (this.userStatus === 'regular') {
          this.regularValidate().then(res => {
            if (this.updateType === '2') {
              if (res === '转正时间必填') {
                return this.$message.warning(res)
              }
            }
            if (!res) {
              return this.$message.warning('请选择薪资')
            } else {
              userChangeData = this._countParams()
              this._handelRequest(userChangeData)
            }
          })
        }
        if (this.userStatus === 'report' || this.userStatus === 'formal') {
          this.reportVaildate().then(res => {
            if (typeof res === 'string') {
              return this.$message.warning(res)
            } else {
              if (!res) {
                return this.$message.warning('请选择薪资')
              } else {
                userChangeData = this._countParams()
                this._handelRequest(userChangeData)
              }
            }
          })
        }
        if (this.userStatus === 'internship') {
          this.internshipValidate().then(res => {
            if (res) {
              return this.$message.warning(res)
            } else {
              userChangeData = this._countParams()
              this._handelRequest(userChangeData)
            }
          })
        }
      }).catch(() => {})
    }, 200),
    _handelRequest (userChangeData) {
      entryApi.saveUserChange(userChangeData).then(res => {
        this.$message.success(this.updateType === '2' ? '更正申请成功' : '更新成功')
        setTimeout(() => {
          const { id: baseId, status } = this.$route.params
          this.$router.push({
            name: 'BaseLabor',
            params: {
              baseId,
              status: this.updateType === '2' ? '19' : status
            },
            query: {
              come: this.$route.query.come
            }
          })
        }, 200)
      })
    },
    getCurrentStatus () {
      entryApi.queryUserStatus(this.$route.params.id).then(res => {
        this.checkDetailDatas = res.result
        console.log('dd', this.checkDetailDatas)
      })
      commonApi.getOrgDetail(this.$route.query.orgId).then(res => {
        this.$store.commit('SET_HRBELONGID', res.result.hrBelongId ? res.result.hrBelongId : res.result.companyId)
      })
    }
  },
  created () {
    this.getCurrentStatus()
  }
}
</script>
