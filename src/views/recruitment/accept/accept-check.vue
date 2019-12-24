<template>
<div class="container">
    <candidates-detail :baseDatas="acceoeCheckDatas"/>
    <el-row style="padding-bottom:50px;text-align:center;width:100%">
       <el-button type="primary" size="mini" @click="goBack">返回</el-button>
       <el-button type="primary" size="mini" @click="printAccept">打印</el-button>
       <el-button type="primary" size="mini" @click="downLoad">下载</el-button>
    </el-row>
</div>
</template>
<script>
import { checkAcceptBaseDetail, checkAcceptOtherDetail, checkAcceptJobDetail, checkAcceptFamilyDetail, checkAcceptResumeDetail } from 'static/api/recruit/accept/accept'
import CandidatesDetail from 'components/CandidatesDetail'
import { printCheckMessage } from 'static/api/recruit/entry/entry'
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
      },
      pdfUrl: '',
      wordUrl: ''
    }
  },
  methods: {
    // 去掉时间字符串末尾的天数
    sliceLastIndex (value) {
      if (typeof value === 'string') {
        return value.substring(0, value.lastIndexOf('-'))
      }
    },
    _getAcceptDetail () {
      /** 查询地址 */
      checkAcceptBaseDetail(this.$route.params.acceptId).then((data) => {
        this.acceoeCheckDatas.baseInformation = data.result
        this.acceoeCheckDatas.nativeForm = data.result.nativePlaceMod || this.acceoeCheckDatas.nativeForm
        this.acceoeCheckDatas.hujiForm = data.result.hujiAddressMod || this.acceoeCheckDatas.hujiForm
        this.acceoeCheckDatas.archivesAddressForm = data.result.archivesAddressMod || this.acceoeCheckDatas.archivesAddressForm
        this.acceoeCheckDatas.nowAddressForm = data.result.nowAddressMod || this.acceoeCheckDatas.nowAddressForm
      })
      checkAcceptOtherDetail(this.$route.params.acceptId).then((data) => {
        if (data.result && data.result.length) {
          this.acceoeCheckDatas.otherInformation = data.result[0]
          let datas = data.result[0].expectYearSalary ? data.result[0].expectYearSalary : ''
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
      checkAcceptJobDetail(this.$route.params.acceptId).then((data) => {
        this.acceoeCheckDatas.jobInformation = []
        // 去掉全空的数据
        data.result.forEach(item => {
          if (item.startDate || item.endDate || item.workUnit || item.post || item.certifier || item.telephone) {
            this.acceoeCheckDatas.jobInformation.push(item)
          }
        })
      })
      checkAcceptFamilyDetail(this.$route.params.acceptId).then((data) => {
        this.acceoeCheckDatas.familyInformation = []
        data.result.forEach(item => {
          if (item.name || item.relation || item.birthday || item.workUnit || item.post || item.telephone || item.age) {
            this.acceoeCheckDatas.familyInformation.push(item)
          }
        })
      })
      checkAcceptResumeDetail(this.$route.params.acceptId).then((data) => {
        this.acceoeCheckDatas.resumeInformation = []
        data.result.forEach(item => {
          if (item.startDate || item.endDate || item.school || item.major || item.studyMode || item.education || item.educationWay) {
            this.acceoeCheckDatas.resumeInformation.push(item)
          }
        })
      })
    },
    goBack () {
      this.$router.push({ name: this.$route.query.name })
    },
    // 打印
    printAccept () {
      if (this.pdfUrl) {
        window.open(this.pdfUrl, '_blank')
      } else {
        const { acceptId } = this.$route.params
        const newPage = window.open('about:blank')
        printCheckMessage({ userId: acceptId }).then(res => {
          const { pdfUrl, wordUrl } = res.result
          this.pdfUrl = pdfUrl
          this.wordUrl = wordUrl
          newPage.location.href = pdfUrl
        })
      }
    },
    // 下载
    downLoad () {
      if (this.wordUrl) {
        window.open(this.wordUrl, '_self')
      } else {
        const { acceptId } = this.$route.params
        printCheckMessage({ userId: acceptId }).then(res => {
          const { pdfUrl, wordUrl } = res.result
          this.pdfUrl = pdfUrl
          this.wordUrl = wordUrl
          window.open(wordUrl, '_self')
        })
      }
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
