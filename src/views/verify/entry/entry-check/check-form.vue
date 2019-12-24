<template>
  <div class="container">
    <candidates-detail :baseDatas="acceoeCheckDatas"/>
  </div>
</template>
<script>
import { checkAcceptBaseDetail, checkAcceptOtherDetail, checkAcceptJobDetail, checkAcceptFamilyDetail, checkAcceptResumeDetail } from 'static/api/recruit/accept/accept'
import CandidatesDetail from 'components/CandidatesDetail'
export default {
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
      checkAcceptBaseDetail(this.$route.params.employeeId).then(data => {
        if (data.result) {
          this.acceoeCheckDatas.baseInformation = data.result
          this.acceoeCheckDatas.nativeForm = data.result.nativePlaceMod || this.acceoeCheckDatas.nativeForm
          this.acceoeCheckDatas.hujiForm = data.result.hujiAddressMod || this.acceoeCheckDatas.hujiForm
          this.acceoeCheckDatas.archivesAddressForm = data.result.archivesAddressMod || this.acceoeCheckDatas.archivesAddressForm
          this.acceoeCheckDatas.nowAddressForm = data.result.nowAddressMod || this.acceoeCheckDatas.nowAddressForm
        }
      })
      checkAcceptOtherDetail(this.$route.params.employeeId).then(data => {
        if (data.result) {
          this.acceoeCheckDatas.otherInformation = data.result[0]
          let datas = data.result[0].expectYearSalary
          if (datas) {
            this.acceoeCheckDatas.otherInformation.expectYearSalary = datas.split(',')[0] === 'null' ? '' : datas.split(',')[0]
            this.acceoeCheckDatas.otherInformation.expectMaxYearSalary = datas.split(',')[1] === 'undefined' ? '' : datas.split(',')[1]
          }
        } else {
          this.acceoeCheckDatas.otherInformation.monthSalaryForm = ''
          this.acceoeCheckDatas.otherInformation.expectYearSalary = ''
          this.acceoeCheckDatas.otherInformation.expectMaxYearSalary = ''
        }
      })
      checkAcceptJobDetail(this.$route.params.employeeId).then(data => {
        this.acceoeCheckDatas.jobInformation = []// 去掉全空的数据
        if (data.result && data.result.length) {
          data.result.forEach(item => {
            if (item.startDate || item.endDate || item.workUnit || item.post || item.certifier || item.telephone) {
              this.acceoeCheckDatas.jobInformation.push(item)
            }
          })
        }

        // this.acceoeCheckDatas.jobInformation = data.data
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

        // this.acceoeCheckDatas.familyInformation = data.data
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

        // this.acceoeCheckDatas.resumeInformation = data.data
      })
    }
  },
  components: {
    CandidatesDetail
  },
  created () {
    this._getAcceptDetail()
    this.$store.commit('SET_ACTIVE_ROUTER', true)
  }
}
</script>
<style lang="less" scoped></style>
