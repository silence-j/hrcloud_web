<!--营销人员新增-->
<template>
<div class="market-add_box">
     <ul class="tab-bar-ul clearfix mb-20">
      <li><el-button type="primary" size="mini" @click="goBack">返  回</el-button></li>
      <li><el-button type="primary" size="mini" @click="goReview">提  交</el-button></li>
    </ul>
    <div class="mt-20">
     <common-add-view ref="commonAddref"/>
    </div>
</div>
</template>
<script>
import commonAddView from './common-add-view'
import { addMarketUser } from 'static/api/personnel-information/base/base'
import { mapGetters } from 'vuex'
import { getEntryParams } from 'assets/js/mixins'
import { saveSalaryStructure } from 'static/api/setting/index'
import { debounce } from 'lodash'
export default {
  mixins: [getEntryParams],
  components: {
    commonAddView
  },
  computed: {
    ...mapGetters(['getSalaryArr']),
    vaildate () {
      return this.$refs.commonAddref.commonEntryVaildate()
    },
    personData () {
      return this.$refs.commonAddref.entryPersonData()
    },
    laborData () {
      return this.$refs.commonAddref.entryLaborData()
    },
    employeeId () {
      return this.$route.query.employeeId ? this.$route.query.employeeId : ''
    },
    actId () {
      return this.$route.query.actId ? this.$route.query.actId : ''
    }
  },
  methods: {
    goBack () {
      this.$router.push({ name: this.$route.query.comeRouter })
    },
    goReview: debounce(function (e) {
      // let vaildate = this.$refs.commonAddref.commonEntryVaildate()
      // let personData = this.$refs.commonAddref.entryPersonData()
      // let laborData = this.$refs.commonAddref.entryLaborData()
      if (this.vaildate) {
        let addParams = {
          userPersonalInfo: this.getUserPersonalInfo(),
          entryInfo: this.getEntryInfo(),
          userSalarySettingInfo: this.getUserSalarySettingInfo()
        }
        let salaryParams = this.$refs.commonAddref.entryLaborData().salaryDatas
        addMarketUser(addParams).then(data => {
          let userId = data.result
          if (userId) {
            saveSalaryStructure(Object.assign({}, salaryParams, { userId, deleteTag: 5 })).then(result => {
              this.$message.success('新增营销人员成功')
              setTimeout(() => {
                this.$router.push({ name: this.$route.query.come })
              }, 200)
            })
          }
        })
      } else {
        this.$message.warning('请把信息填写完整')
      }
    }, 500)
  }
}
</script>
