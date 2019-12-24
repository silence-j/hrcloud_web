<template>
  <div class="container">
    <div class="mt-50"></div>
    <div class="content-box">
      <el-form label-width="120px">
        <el-row align="center">
          <el-col :span="8">
            <el-form-item label="姓  名:">
              <span>{{jobDetailsData.name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证号:" >
              <span>{{jobDetailsData.idCardNumber}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="组织架构:">
              <span>{{jobDetailsData.orgName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row align="center">
          <el-col :span="8">
            <el-form-item label="任职组织:">
              <span>{{jobDetailsData.organizationName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任职职务:" >
              <span>{{jobDetailsData.dutyName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否负责人:">
              <span v-if="jobDetailsData.isPrincipal">{{jobDetailsData.isPrincipal}}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row align="center">
          <el-col :span="8">
            <el-form-item label="职务级别:">
              <span v-if="jobDetailsData.dutyRank">{{jobDetailsData.dutyRank}}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职务性质:">
              <span>{{jobDetailsData.status | filterExemptStatus}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="待遇级别:">
              <span>{{jobDetailsData.treatmentRank}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row align="center">
          <el-col :span="24">
            <el-form-item label="工资标准:" >
              <div class="salary-div">{{jobDetailsData.wageLevel}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row align="center">
          <el-col :span="8">
            <el-form-item label="任职发文号:">
              <span>{{jobDetailsData.dispatchNumber}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发文时间:" >
              <span>{{jobDetailsData.dutyDispatchTime}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="执行时间:">
              <span>{{jobDetailsData.dutyExecuteTime}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row align="center">
          <el-col :span="24">
            <el-form-item label="任免发文:">
              <span>{{jobDetailsData.appointRemoveDispatch}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row align="center">
          <el-col :span="24">
            <el-form-item label="备 注:">
              <span v-if="jobDetailsData.remark">{{jobDetailsData.remark}}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row class="mt-30">
      <el-col :span="2" :offset="10"><el-button type="primary" style="width: 100%" size="small" @click="goBack">返  回</el-button></el-col>
    </el-row>
  </div>
</template>
<script>
import { getJobStatus } from 'assets/js/filters'
import { getJobdetail } from 'static/api/personnel-information/job/job'
export default {
  data () {
    return {
      jobDetailsData: [],
      dutyChangeLogDatas: [],
      wageLevelDatas: ''
    }
  },
  methods: {
    goBack () {
      this.$router.replace('/personnel-information/job')
    },
    /** 获取职务详情**/
    _getJobdetail () {
      let idParams = {
        id: this.$route.params.jobId,
        userId: this.$route.params.jobUserId
      }
      getJobdetail(idParams).then(data => {
        if (data.result) {
          this.jobDetailsData = data.result.dutyInformation
          this.dutyChangeLogDatas = data.result.userDutyChangeLog
        }
      })
    }
  },
  filters: {
    filterExemptStatus (status) {
      return getJobStatus(status)
    }
  },
  created () {
    this._getJobdetail()
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
  .salary-div {
    span:nth-child(1){
      margin-left: 0px;
    }
    span{
      margin: 0px 10px;
    }
  }
</style>
