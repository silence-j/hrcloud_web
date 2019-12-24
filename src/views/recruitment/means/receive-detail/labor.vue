<template>
<div class="mt-20">
  <check-labor
  :entryInformation="entryInformation"
  :allDicOptions="allDicOptions"
  :fininshDicOptions="fininshDicOptions"
  :checkDetailDatas="checkDetailDatas"
  ></check-labor>
</div>
</template>
<script>
import CheckLabor from 'components/CheckLabor.vue'
import { getSysDic, checkMaterial } from 'static/api/common/common'
import { getUserInfoDetail, checkDetail } from 'static/api/recruit/entry/entry'
export default {
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
      getUserInfoDetail(this.$route.params.meansId).then((data) => {
        if (data.result) {
          this.entryInformation = data.result
        }
      })
    },
    /** 获取入职资料信息**/
    _getSysDic () {
      getSysDic('ENTRYINFOTYPE').then((data) => {
        if (data.result) {
          this.allDicOptions = data.result
        }
      })
    },
    /** 获取已提交的入职材料**/
    _getFininshMaterial () {
      let userId = this.$route.params.meansId
      checkMaterial(userId).then(data => {
        if (data.result) {
          this.fininshDicOptions = data.result
        }
      })
    },
    // 薪资详情
    _getSalaryDetail () {
      let employeeId = Number(this.$route.params.meansId)
      checkDetail(employeeId).then(data => {
        if (data.result) {
          this.checkDetailDatas = data.result
        }
      })
    }
  },
  created () {
    this._getUserInfo()
    this._getSysDic()
    this._getFininshMaterial()
    this._getSalaryDetail()
    this.$store.commit('SET_ACTIVE_ROUTER', false)
  }
}
</script>
