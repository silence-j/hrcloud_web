<template>
<div class="mt-20">
  <check-labor
  :entryInformation="entryInformation"
  :allDicOptions="allDicOptions"
  :fininshDicOptions="fininshDicOptions"
  :checkDetailDatas="checkDetailDatas"
  >12</check-labor>
</div>
</template>
<script>
import CheckLabor from 'components/CheckLabor.vue'
import { getSysDic, checkMaterial } from 'static/api/common/common'
import { getUserInfoDetail, checkDetail } from 'static/api/recruit/entry/entry'
import { setGoBackFinRouter } from 'assets/js/mixins'
import { getSalaryDeatil } from 'static/api/setting/index'
export default {
  mixins: [setGoBackFinRouter],
  data () {
    return {
      entryInformation: {},
      allDicOptions: [],
      fininshDicOptions: [],
      checkDetailDatas: {}
    }
  },
  components: {
    CheckLabor
  },
  methods: {
    /** 获取入职信息**/
    _getUserInfo () {
      getUserInfoDetail(this.$route.params.employeeId).then(data => {
        if (data.result && data.result) {
          this.entryInformation = data.result
        }
      })
    },
    /** 获取入职资料信息**/
    _getSysDic () {
      getSysDic('ENTRYINFOTYPE').then(data => {
        if (data.result) {
          this.allDicOptions = data.result
        }
      })
    },
    /** 获取已提交的入职材料**/
    _getFininshMaterial () {
      let userId = this.$route.params.employeeId
      checkMaterial(userId).then(data => {
        if (data.result) {
          this.fininshDicOptions = data.result
        }
      })
    },
    // 薪资详情
    _getSalaryDetail () {
      let userId = Number(this.$route.params.employeeId)
      checkDetail(userId).then(data => {
        if (data.result) {
          this.checkDetailDatas = data.result
          let detailParams = {
            userId,
            deleteTag: '5'
          }
          getSalaryDeatil(detailParams).then(res => {
            let result = res.result
            this.checkDetailDatas.standard = result.standard
            this.checkDetailDatas.probationStandard = result.probationStandard
            this.checkDetailDatas.exercitationAllowance = result.exercitationAllowance
            this.checkDetailDatas.exercitationSalary = result.exercitationSalary
            this.checkDetailDatas.formStandard = result.formStandard
          })
        }
      })
    }
  },
  created () {
    this._getUserInfo()
    this._getSysDic()
    this._getFininshMaterial()
    this.$store.commit('SET_ACTIVE_ROUTER', false)
    this._getSalaryDetail()
  }
}
</script>
