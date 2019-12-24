<template>
  <div class="container">
    <candidates-detail :baseDatas="acceoeCheckDatas"/>
    <el-row>
      <el-col :span="2" :offset="10"><el-button type="primary" style="width:100%" size="small" @click="goBack">返  回</el-button></el-col>
    </el-row>
  </div>
</template>
<script>
import { checkAcceptBaseDetail, checkAcceptOtherDetail, checkAcceptJobDetail, checkAcceptFamilyDetail, checkAcceptResumeDetail } from 'static/api/recruit/accept/accept'
import CandidatesDetail from 'components/CandidatesDetail'
import { setGoBackRouter } from 'assets/js/mixins'
export default {
  mixins: [setGoBackRouter],
  data () {
    return {
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
      }
    }
  },
  methods: {
    _getAcceptDetail () {
      /** 查询地址 */
      checkAcceptBaseDetail(this.$route.params.acceptId).then(data => {
        if (data.result) {
          this.acceoeCheckDatas.baseInformation = data.result
          this.acceoeCheckDatas.nativeForm = data.result.nativePlaceMod || this.acceoeCheckDatas.nativeForm
          this.acceoeCheckDatas.hujiForm = data.result.hujiAddressMod || this.acceoeCheckDatas.hujiForm
          this.acceoeCheckDatas.archivesAddressForm = data.result.archivesAddressMod || this.acceoeCheckDatas.archivesAddressForm
          this.acceoeCheckDatas.nowAddressForm = data.result.nowAddressMod || this.acceoeCheckDatas.nowAddressForm
        }
      })
      checkAcceptOtherDetail(this.$route.params.acceptId).then(data => {
        if (data.result && data.result.length) {
          this.acceoeCheckDatas.otherInformation = data.result[0]
          let datas = data.result[0].expectYearSalary
          if (datas.split(',')[0] === 'null' || datas.split(',')[0] === 'undefined') {
            this.acceoeCheckDatas.otherInformation.expectYearSalary = ''
          } else {
            this.acceoeCheckDatas.otherInformation.expectYearSalary = datas.split(',')[0]
          }
          if (datas.split(',')[1] === 'null' || datas.split(',')[1] === 'undefined') {
            this.acceoeCheckDatas.otherInformation.expectMaxYearSalary = ''
          } else {
            this.acceoeCheckDatas.otherInformation.expectMaxYearSalary = datas.split(',')[1]
          }
        } else {
          this.acceoeCheckDatas.otherInformation.monthSalaryForm = ''
          this.acceoeCheckDatas.otherInformation.expectYearSalary = ''
          this.acceoeCheckDatas.otherInformation.expectMaxYearSalary = ''
        }
      })
      checkAcceptJobDetail(this.$route.params.acceptId).then(data => {
        if (data.result) {
          this.acceoeCheckDatas.jobInformation = data.result
        }
      })
      checkAcceptFamilyDetail(this.$route.params.acceptId).then(data => {
        if (data.result) {
          this.acceoeCheckDatas.familyInformation = data.result
        }
      })
      checkAcceptResumeDetail(this.$route.params.acceptId).then(data => {
        if (data.result) {
          this.acceoeCheckDatas.resumeInformation = data.result
        }
      })
    }
  },
  components: {
    CandidatesDetail
  },
  created () {
    this._getAcceptDetail()
  }
}
</script>
<style lang="less" scoped></style>
