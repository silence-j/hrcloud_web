// 处理薪资组件分离接口逻辑和交互逻辑这边只处理交互逻辑
import SalaryAssembly from './index'
import { getSalaryListByPid, getCurrentComSalaryType } from 'static/api/setting/index'
import { mapGetters } from 'vuex'
export default {
  props: {
    salaryData: {
      mlist: {
        type: Array
      },
      selectSalaryOptions: {
        type: Array
      },
      commonSalaryArr: {
        type: Array
      },
      otherSalaryDatas: {
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
      optionArr: {
        type: Array
      }
    }
  },
  data () {
    return {
      mainSalaryDatas: [],
      otherSalaryDatas: [],
      idId: ''
    }
  },
  components: {
    SalaryAssembly
  },
  computed: {
    ...mapGetters(['getInfoByOrgId', 'getHrBelongId'])
  },
  methods: {
    _filterEnd (arr) {
      arr.forEach(item => {
        if (item.isEnd === '1' || item.isEnd === 1) {
          let endItem = this.deepClone(item.ssList)
          item.commArr = endItem
          delete item.ssList
        }
        if (item.ssList && item.ssList.length) {
          this._filterEnd(item.ssList)
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
    // 删除空的ssList
    _delEmprySslist (arr) {
      arr.forEach(item => {
        if (item.ssList.length === 0) {
          delete item.ssList
        } else {
          this._delEmprySslist(item.ssList)
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
                console.log('otherSalaryDatas', this.otherSalaryDatas)
                console.log('mainSalaryDatas', this.mainSalaryDatas)
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
    _handleChange (value) {
      console.log('value678', value)
      this.$refs.salaryPureRef.handleChange(value)
    },
    checkSalaryValidate () {
      return this.$refs.salaryPureRef.checkSalaryValidate()
    },
    resetSalaryValidate () {
      this.$refs.salaryPureRef.resetSalaryValidate()
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
    clearValidate () {
      this.$refs.salaryPureRef.clearValidate()
    }
  },
  render () {
    return (
      <div>
        <p class="mean-title mt-20 ft14">工资标准</p>
        <salary-assembly
          class="mt-20"
          ref="salaryPureRef"
          mainSalaryDatas={this.mainSalaryDatas}
          salaryData={this.salaryData}
          otherSalaryDatas={this.otherSalaryDatas}
        />
      </div>
    )
  },
  watch: {
    getHrBelongId (value) {
      console.log('value', value)
      if (value) {
        this._getCurrentComSalaryTypes(Number(value))
      } else {
        console.log('getInfoByOrgId', this.getInfoByOrgId)
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
    }
  },
  beforeDestroy () {
    this.$store.commit('SET_HRBELONGID', '')
  },
  created () {
    if (this.getHrBelongId) {
      this._getCurrentComSalaryTypes(Number(this.getHrBelongId))
    } else {
      this._getCurrentComSalaryTypes(Number(this.getInfoByOrgId))
    }
  }
}
