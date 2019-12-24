/* 转正和试用期工资标准 */
import SalaryAssembly from './index'
import { getSalaryListByPid, getCurrentComSalaryType } from 'static/api/setting/index'
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'
import './all-salary.less'
export default {
  props: {
    showTry: {
      type: Boolean,
      default: false
    },
    salaryForm: {
      mlist: {
        type: Array
      },
      selecteSalarydOptions: {
        type: Array
      },
      commonSalaryArr: {
        type: Array
      },
      selectOtherOptions: {
        type: Array
      },
      otherArr: {
        otherAmount: {
          type: String || Number
        },
        unit: {
          type: String
        }
      },
      postArr: {
        type: Array
      },
      postOption: {
        type: Array
      },
      optionArr: {
        type: Array
      }
    },
    trySalaryForm: {
      mlist: {
        type: Array
      },
      selecteSalarydOptions: {
        type: Array
      },
      commonSalaryArr: {
        type: Array
      },
      selectOtherOptions: {
        type: Array
      },
      otherArr: {
        otherAmount: {
          type: String || Number
        },
        unit: {
          type: String
        }
      },
      postArr: {
        type: Array
      },
      percent: {
        type: Number,
        default: 80
      },
      showParcent: {
        type: Boolean,
        default: false
      },
      optionArr: {
        type: Array
      }
    }
  },
  data () {
    return {
      mainSalaryDatas: [],
      otherSalaryDatas: [],
      postArr: [],
      idId: ''
    }
  },
  computed: {
    ...mapGetters(['getInfoByOrgId', 'getCandidateType', 'getHrBelongId']),
    showStyle () {
      return this.showTry
    }
  },
  methods: {
    _filterEnd (arr) {
      arr.forEach(item => {
        if (item.isEnd === '1' || item.isEnd === 1) {
          let endItem = cloneDeep(item.ssList)
          item.commArr = endItem
          delete item.ssList
        }
        if (item.ssList && item.ssList.length) {
          this._filterEnd(item.ssList)
        }
      })
    },
    // 删除空的ssList
    _delEmprySslist (arr) {
      arr.forEach(item => {
        if (item.ssList && item.ssList.length === 0) {
          delete item.ssList
        } else {
          this._delEmprySslist(item.ssList)
        }
      })
    },
    _filterTypeOne (arr) {
      arr.forEach((item, index) => {
        if (item.type === 1 || item.type === '1') {
          arr.splice(index, 1)
          this._filterTypeOne(arr)
        }
        if (item.ssList && item.ssList.length) {
          this._filterTypeOne(item.ssList)
        }
      })
    },
    // 筛选isEnd === 1的节点,把他的ssList改成一个新增的数组 改完之后删除ssList使其不再下拉树里面显示
    _getCurrentComSalaryTypes (id) {
      if (id) {
        this.idId = id
        getCurrentComSalaryType(id).then(data => {
          const result = data.data
          if (result.subCode === 10000 && result.result.salarySysIds) {
            const salary = {
              // type: 4,
              ids: result.result.otherTypes + ',' + result.result.salarySysIds,
              enable: '1'
            }
            getSalaryListByPid(salary).then(data => {
              if (data.result) {
                this.otherSalaryDatas = data.result.filter(item => item.type === '3' || item.type === 3)
                this.mainSalaryDatas = data.result.filter(item => item.type === '4' || item.type === 4)
                this._delEmprySslist(this.mainSalaryDatas)
                this._filterEnd(this.mainSalaryDatas)
                this._filterTypeOne(this.mainSalaryDatas)
                this._delEmprySslist(this.otherSalaryDatas)
                this._filterEnd(this.otherSalaryDatas)
              }
            })
          } else {
            this._skipSettingWage('薪资结构未设置')
          }
        })
      } else {
        this.mainSalaryDatas = []
        this.otherSalaryDatas = []
      }
    },
    _skipSettingWage (errorMsg) {
      this.$confirm(errorMsg + '是否跳转工资设置页面', '提示', {
        confirmButtonText: '跳转',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/setting/wage?id=' + this.idId)
      }).catch(() => {
        this.$store.commit('SET_INFO_BY_ORG_ID', '')
        this.$store.commit('SET_HRBELONGID', '')
      })
    },
    checkSalaryValidate () {
      return this.$refs.salaryRef.checkSalaryValidate()
    },
    checkTrySalaryValidate () {
      return this.$refs.trySalaryRef.checkSalaryValidate()
    },
    resetSalaryValidate () {
      this.$refs.salaryRef.resetSalaryValidate()
    },
    resetTrySalaryValidate () {
      this.$refs.trySalaryRef.resetSalaryValidate()
    },
    commonCheckSalaryValidate () {
      return this.checkSalaryValidate() && this.checkTrySalaryValidate()
    },
    clearSalaryValidate () {
      this.$refs.salaryRef.clearValidate()
    },
    clearTrySalaryValidate () {
      this.$refs.trySalaryRef.clearValidate()
    },
    commonClearSalaryValidate () {
      this.clearSalaryValidate()
      this.clearTrySalaryValidate()
    },
    commonResetSalaryValidata () {
      this.resetTrySalaryValidate() && this.resetSalaryValidata()
    },
    handleTryChange (value) {
      let newArr = cloneDeep(value)
      let sortArr1 = newArr.sort().toString()
      let newArr2 = cloneDeep(this.salaryForm.selecteSalarydOptions)
      let sortArr2 = newArr2.sort().toString()
      console.log('sortArr1', sortArr1, sortArr2, sortArr1 === sortArr2)
      if (sortArr1 && sortArr1 === sortArr2) {
        if (this.trySalaryForm.percent) {
          this.trySalaryForm.showParcent = true
          this.getBaseAmount(this.trySalaryForm.percent)
          this.handleTryOtherChange(this.trySalaryForm.selectOtherOptions)
        }
      } else {
        this.trySalaryForm.percent = 80
        this.trySalaryForm.showParcent = false
      }
    },
    handleChange (value) {
      // 有试用期再执行下面的
      let newArr = cloneDeep(value)
      let salaryOption = newArr.sort().toString()
      let newOtherArr = cloneDeep(this.trySalaryForm.selecteSalarydOptions)
      let trySalaryOption = newOtherArr.sort().toString()
      if (trySalaryOption) {
        if (salaryOption && salaryOption === trySalaryOption) {
          if (this.trySalaryForm.percent) {
            this.trySalaryForm.showParcent = true
            this.getBaseAmount(this.trySalaryForm.percent)
          }
        } else {
          this.trySalaryForm.percent = 80
          this.trySalaryForm.showParcent = false
        }
      }
    },
    handleOtherChange (value) {
      let newArr1 = cloneDeep(value)
      let sortArr1 = newArr1.sort().toString()
      let newArr2 = cloneDeep(this.salaryForm.selecteSalarydOptions)
      let sortArr2 = newArr2.sort().toString()
      let newArr3 = cloneDeep(this.trySalaryForm.selecteSalarydOptions)
      let sortArr3 = newArr3.sort().toString()
      let newArr4 = cloneDeep(this.trySalaryForm.selectOtherOptions)
      let sortArr4 = newArr4.sort().toString()
      if (sortArr3) {
        if (sortArr1 === sortArr4 && sortArr2 === sortArr3) {
          this.getOtherAmount(this.trySalaryForm.percent)
        }
      }
    },
    handleTryOtherChange (value) {
      let newArr = cloneDeep(value)
      let sortArr1 = newArr.sort().toString()
      let newArr2 = cloneDeep(this.salaryForm.selectOtherOptions)
      let sortArr2 = newArr2.sort().toString()
      let newArr3 = cloneDeep(this.salaryForm.selecteSalarydOptions)
      let sortArr3 = newArr3.sort().toString()
      let newArr4 = this.trySalaryForm.selecteSalarydOptions
      let sortArr4 = newArr4.sort().toString()
      if (sortArr3 === sortArr4 && sortArr1 === sortArr2) {
        this.getOtherAmount(this.trySalaryForm.percent)
      }
    },
    getBaseAmount (value) {
      console.log('valueAmount', value)
      if (this.salaryForm.commonSalaryArr.length && this.trySalaryForm.commonSalaryArr.length && this.trySalaryForm.showParcent) {
        console.log('dd', this.salaryForm.commonSalaryArr)
        this.salaryForm.commonSalaryArr.forEach((item, index) => {
          this.trySalaryForm.commonSalaryArr[index].amount = item.amount * value / 100
        })
      }
    },
    getOtherAmount (value) {
      this.trySalaryForm.otherArr.money = this.salaryForm.otherArr.money * value / 100
    },
    handleSalaryResult (value) {
      this.$refs.salaryRef.handleChange(value)
    },
    handleOtherSalaryResult (value) {
      this.$refs.salaryRef.handleOtherChange(value)
    },
    handleOtherInput (value) {
      let findIndex = this.trySalaryForm.commonSalaryArr.findIndex(x => x.amount === value)
      let orgVal = findIndex ? Number(this.salaryForm.commonSalaryArr[findIndex].amount) : 0
      if (value / this.trySalaryForm.percent * 100 !== orgVal) {
        this.trySalaryForm.showParcent = false
      } else {
        this.trySalaryForm.showParcent = true
      }
      // if(value/this.trySalaryForm.percent !===this.salaryForm.){}
      // console.log('vaa', value)
    }
  },
  components: {
    SalaryAssembly
  },
  render () {
    return <div>
      <div>
        <p class="mean-title mt-20 ft14">转正后工资标准</p>
        <salary-assembly
          onHandleChange={this.handleChange}
          onHandleOtherChange={this.handleOtherChange}
          salaryData={this.salaryForm}
          mainSalaryDatas={this.mainSalaryDatas}
          otherSalaryDatas={this.otherSalaryDatas}
          ref="salaryRef"
          checkValidate={this.showStyle}
          class="mt-20" />
      </div>
      <div style={this.showStyle ? 'display:none' : 'display:block'}>
        <p class="mean-title mt-20 ft14">试用期工资标准</p>
        {this.trySalaryForm.showParcent
          ? <el-form
            labelWidth="220px"
            class="precent-form"
          >
            <el-form-item
              label="试用期工资标准=正式工资标准X"
            >
              {this.trySalaryForm.percent !== 0 ? <el-input
                type="number"
                v-model={this.trySalaryForm.percent}>
                <template slot="append">%</template>
              </el-input> : ''}
            </el-form-item>
          </el-form> : ''
        }
        <salary-assembly
          onHandleInput={this.handleOtherInput}
          onHandleChange={this.handleTryChange}
          onHandleOtherChange={this.handleTryOtherChange}
          mainSalaryDatas={this.mainSalaryDatas}
          otherSalaryDatas={this.otherSalaryDatas}
          salaryData={this.trySalaryForm}
          ref="trySalaryRef"
          checkValidate={this.getCandidateType === 2 ? false : !this.showStyle}
          class="mt-20" />
      </div>
    </div>
  },
  watch: {
    getHrBelongId (value) {
      if (value) {
        // console.log('dasda', value)
        this._getCurrentComSalaryTypes(Number(value))
        // this.$store.commit('SET_HRBELONGID', '')
      } else {
        if (this.getInfoByOrgId) {
          this._getCurrentComSalaryTypes(Number(this.getInfoByOrgId))
        } else {
          this._getCurrentComSalaryTypes()
        }
      }
    },
    getInfoByOrgId (value) {
      if (!value) {
        this._getCurrentComSalaryTypes()
      }
    },
    'trySalaryForm.percent' (value) {
      if (value) {
        this.handleTryChange(this.trySalaryForm.selecteSalarydOptions)
        this.handleTryOtherChange(this.trySalaryForm.selectOtherOptions)
      } else {
        this.trySalaryForm.showParcent = false
      }
    }
  },
  created () {
    if (this.getHrBelongId) {
      this._getCurrentComSalaryTypes(Number(this.getHrBelongId))
    } else {
      this._getCurrentComSalaryTypes(Number(this.getInfoByOrgId))
    }
  }
}
