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
import { addOtherUser } from 'static/api/personnel-information/base/base'
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
    }
  },
  methods: {
    goBack () {
      this.$router.push({ name: this.$route.query.come })
    },
    /* 新增员工保存 */
    goReview: debounce(function (e) {
      if (this.vaildate) {
        let addParams = {
          userPersonalInfo: this.getUserPersonalInfo(),
          entryInfo: this.getEntryInfo(),
          userSalarySettingInfo: this.getUserSalarySettingInfo()
        }
        let salaryParams = this.$refs.commonAddref.entryLaborData().salaryDatas
        addOtherUser(addParams).then(data => {
          let userId = data.result.userId
          saveSalaryStructure(Object.assign({}, salaryParams, { userId, deleteTag: 0 })).then(res => {
            this.$message.success('新增员工成功')
            setTimeout(() => {
              this.$router.push('/personnel-information/base')
            }, 200)
          })
        })
      } else {
        this.$message.warning('请把信息填写完整')
      }
    }, 500)
  }
}
</script>
