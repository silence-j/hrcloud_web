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
const addressArr = { province: '', city: '', zone: '' }
export default {
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
      checkAcceptBaseDetail(this.$route.params.meansId).then((data) => {
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
      /** 学习简历**/
      checkAcceptResumeDetail(this.$route.params.meansId).then((data) => {
        if (data.result) {
          this.baseDatasForm.resumeInformation = data.result
        }
      })
      /** 工作简历**/
      checkAcceptJobDetail(this.$route.params.meansId).then((data) => {
        if (data.result) {
          this.baseDatasForm.jobInformation = data.result
        }
      })
      /** 家庭简历**/
      checkAcceptFamilyDetail(this.$route.params.meansId).then((data) => {
        if (data.result) {
          this.baseDatasForm.familyInformation = data.result
        }
      })
    }
  },
  components: {
    CheckPersonnal
  },
  created () {
    this._getAcceptDetail()
    this.$store.commit('SET_ACTIVE_ROUTER', true)
  }
}
</script>
