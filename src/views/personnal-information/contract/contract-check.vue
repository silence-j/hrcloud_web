<template>
  <div class="container">
  <div class="mt-50"></div>
    <div class="content-box">
      <el-form label-width="120px">
        <el-row align="center">
          <el-col :span="8">
            <el-form-item label="身 份 证 号:">
              <span>{{contractDetailsData.idCardNumber}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓　名:" >
              <span>{{contractDetailsData.name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联 系 电 话:">
              <span>{{contractDetailsData.telephone}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row align="center">
          <el-col :span="8">
            <el-form-item label="合 同 主 体:">
              <span>{{contractDetailsData.contractSubject}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合 同 期 数:" >
              <span>{{contractDetailsData.contractNumber}}期</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否固定期限:" >
              <span>{{contractDetailsData.periodType | filterPeriodType}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row align="center">
          <el-col :span="8">
            <el-form-item label="合 同 期 限:">
              <span v-if="contractDetailsData.contractPeriod">{{contractDetailsData.contractPeriod}}月</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同开始时间:">
              <span>{{contractDetailsData.contractBeginDate}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同结束时间:" >
              <span v-if="contractDetailsData.contractEndDate ">{{contractDetailsData.contractEndDate}}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row align="center">
          <el-col :span="8">
            <el-form-item label="工  时  制  度:" >
              <span>{{contractDetailsData.workSchedule | filterworkScheduleStatus}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="劳 动 报 酬:" >
              <span>{{contractDetailsData.salary}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="试用期工资:" >
              <span>{{contractDetailsData.trySalary}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row align="center">
          <el-col :span="24">
            <el-form-item label="工 作 内 容:">
              <span>{{contractDetailsData.workContent}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row align="center">
          <el-col :span="24">
            <el-form-item label="工 作 地 点:" >
              <span>{{contractDetailsData.workAdress}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row align="center">
          <el-col :span="16">
            <el-form-item label="乙方送达地址:" >
              <span>{{contractDetailsData.userAdress}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮　编:" >
              <span v-if="contractDetailsData.zipCode">{{contractDetailsData.zipCode}}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row align="center">
          <el-col :span="24">
            <el-form-item label="备　注:" >
              <span v-if="contractDetailsData.remark">{{contractDetailsData.remark}}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row class="mt-20">
      <el-col :span="2" :offset="10"><el-button type="primary" size="small" style="width:100%" @click="goBack">返 回</el-button></el-col>
    </el-row>
  </div>
</template>

<script>
import { getContractDetails } from 'static/api/contract/contract'
import { getfilterworkStatus, getfilterPeriodType } from 'assets/js/filters'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      contractDetailsData: []
    }
  },
  methods: {
    ...mapMutations({
      getContractStatus: 'SET_CONTRACT_STATUS'
    }),
    goBack () {
      console.log('biubiu321')
      this.$router.push({ name: this.$route.query.come, query: { active: this.$route.query.active } })
      // this.$router.replace('/personnel-information/contract/contract')
      this.$store.commit('SET_CONTRACT_ALL_SELECT', false)
    },
    _getContractDetails () {
      getContractDetails(this.$route.params.contractId).then((data) => {
        if (data.result) {
          this.contractDetailsData = data.result
        }
      })
    }
  },
  filters: {
    filterworkScheduleStatus (str) {
      return getfilterworkStatus(str)
    },
    filterPeriodType (str) {
      return getfilterPeriodType(str)
    }
  },
  created () {
    this._getContractDetails()
  }
}
</script>

<style scoped lang="less">
  .content-box {
    width:95%;
    margin:0 auto;
    padding: 20px 10px 10px 2%;
    border:1px solid #d8d8d8;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
</style>
