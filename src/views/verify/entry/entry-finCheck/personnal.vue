<template>
<div class="mt-20">
  <check-personnal
  :baseDatasForm = "baseDatasForm"
  />
</div>
</template>
<script>
import { checkAcceptBaseDetail, checkAcceptResumeDetail, checkAcceptJobDetail, checkAcceptFamilyDetail } from 'static/api/recruit/accept/accept'
import CheckPersonnal from 'components/CheckPersonnal.vue'
import { setGoBackFinRouter } from 'assets/js/mixins'
const addressArr = { province: '', city: '', zone: '' }
export default {
  mixins: [setGoBackFinRouter],
  data () {
    return {
      baseDatasForm: {
        baseInformation: [],
        resumeInformation: [],
        jobInformation: [],
        familyInformation: [],
        /** 地址**/
        archivesForm: {
          province: '',
          city: '',
          zone: ''
        },
        birthplaceForm: {
          province: '',
          city: '',
          zone: ''
        },
        hujiForm: {
          province: '',
          city: '',
          zone: ''
        },
        contactForm: {
          province: '',
          city: '',
          zone: ''
        },
        nativeForm: {
          province: '',
          city: '',
          zone: ''
        },
        idCardForm: {
          province: '',
          city: '',
          zone: ''
        },
        nowForm: {
          province: '',
          city: '',
          zone: ''
        }
      }
    }
  },
  methods: {
    /** 查询个人信息**/
    _getAcceptDetail () {
      checkAcceptBaseDetail(this.$route.params.employeeId).then(data => {
        if (data.result) {
          this.baseDatasForm.baseInformation = data.result
          this.baseDatasForm.archivesForm = data.result.archivesAddressMod || addressArr
          this.baseDatasForm.hujiForm = data.result.hujiAddressMod || addressArr
          this.baseDatasForm.nativeForm = data.result.nativePlaceMod || addressArr
          this.baseDatasForm.contactForm = data.result.contactAddressMod || addressArr
          this.baseDatasForm.idCardForm = data.result.idCardAddressMod || addressArr
          this.baseDatasForm.nowForm = data.result.nowAddressMod || addressArr
          this.baseDatasForm.birthplaceForm = data.result.birthplaceMod || addressArr
        }
      })
      checkAcceptJobDetail(this.$route.params.employeeId).then(data => {
        this.baseDatasForm.jobInformation = []
        // 去掉全空的数据
        if (data.result && data.result.length) {
          data.result.forEach(item => {
            if (item.startDate || item.endDate || item.workUnit || item.post || item.certifier || item.telephone) {
              this.baseDatasForm.jobInformation.push(item)
            }
          })
        }
      })
      checkAcceptFamilyDetail(this.$route.params.employeeId).then(data => {
        this.baseDatasForm.familyInformation = []
        if (data.result && data.result.length) {
          data.result.forEach(item => {
            if (item.name || item.relation || item.birthday || item.workUnit || item.post || item.telephone || item.age) {
              this.baseDatasForm.familyInformation.push(item)
            }
          })
        }
      })
      checkAcceptResumeDetail(this.$route.params.employeeId).then(data => {
        this.baseDatasForm.resumeInformation = []
        if (data.result && data.result.length) {
          data.result.forEach(item => {
            if (item.startDate || item.endDate || item.school || item.major || item.studyMode || item.education || item.educationWay) {
              this.baseDatasForm.resumeInformation.push(item)
            }
          })
        }
      })
    }
  },
  components: {
    CheckPersonnal
  },
  created () {
    this._getAcceptDetail()
    // this.$store.commit('SET_ACTIVE_ROUTER', false)
    this.$store.commit('SET_ACTIVE_ROUTER', true)
  }
}
</script>
