<template>
  <div class="container">
   <div class="mt-50"></div>
    <div class="content-box">
      <el-form label-width="120px">
        <el-row align="center">
          <el-col :span="8">
            <el-form-item label="姓  名:">
              <span>{{peopleDetailsData.name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证号:" >
              <span>{{peopleDetailsData.idCardNumber}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="组织架构:">
              <span>{{peopleDetailsData.orgName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row align="center">
          <el-col :span="8">
            <el-form-item label="任职组织:">
              <span>{{jobAuditDetailsData.organizationName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任职职务:" >
              <span>{{jobAuditDetailsData.dutyName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否负责人:">
              <span>{{jobAuditDetailsData.isPrincipal}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row align="center">
          <el-col :span="8">
            <el-form-item label="职务级别:">
              <span>{{jobAuditDetailsData.dutyRank}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="待遇级别:">
              <span>{{jobAuditDetailsData.treatmentRank}}</span>
            </el-form-item>
          </el-col>
          <div v-show="jobAuditDetailsData.newTreatmentRank">
            <el-col :span="8">
              <el-form-item label="新待遇级别:">
                <span>{{jobAuditDetailsData.newTreatmentRank}}</span>
              </el-form-item>
            </el-col>
          </div>
          <el-col :span="8">
            <el-form-item label="职务性质:">
              <span>{{jobAuditDetailsData.status | filterJstatus}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row align="center">
          <el-col :span="24">
            <el-form-item label="原工资标准:">
              {{jobAuditDetailsData.wageLevel}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row align="center" v-show="jobAuditDetailsData.newWageLevel">
          <el-col :span="24">
            <el-form-item label="新工资标准:" >
              {{jobAuditDetailsData.newWageLevel}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row align="center">
          <el-col :span="8">
            <el-form-item label="任职发文号:">
              <span>{{jobAuditDetailsData.dispatchNumber}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发文时间:" >
              <span>{{jobAuditDetailsData.dutyDispatchTime}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="执行时间:">
              <span><span>{{jobAuditDetailsData.dutyExecuteTime}}</span></span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row align="center">
          <el-col :span="24">
            <el-form-item label="任免发文:">
              <span>{{jobAuditDetailsData.appointRemoveDispatch}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row align="center">
          <el-col :span="24">
            <el-form-item label="备 注:">
              <span v-if="jobAuditDetailsData.remark">{{jobAuditDetailsData.remark}}</span>
              <span v-else>未填写</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row align="center" style="font-size: 14px;color:#FF7500" v-show="jobAuditDetailsData.dutyChange">
          <el-col :span="24">
            <el-form-item label="主职/兼职变更:">
              <span>{{jobAuditDetailsData.dutyChange}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row class="mt-30">
      <el-col :span="2" :push="7"><el-button type="primary" size="small" style="width:100%" @click="goBack">返  回</el-button></el-col>
      <el-col :span="2" :push="8"><el-button type="primary" size="small" style="width:100%" @click="agreeMsg">同  意</el-button></el-col>
      <el-col :span="2" :push="9"><el-button type="primary" size="small" style="width:100%" @click="UnagreeMsg">不同意</el-button></el-col>
    </el-row>

    <!-- 不同意原因 -->
    <el-dialog title="不同意原因" :visible.sync="UnagreeVisible" width="500px">
      <el-form :model="UnagreeForm" label-width="85px">
          <el-form-item label="原 因：" class="mustForm">
            <el-select v-model="UnagreeForm.reason" placeholder="请选择原因">
              <el-option
                v-for="item in UnresonOption"
                :key="item.id"
                :label="item.codeText"
                :value="item.codeText">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="说 明：">
            <el-input type="textarea" v-model="UnagreeForm.remark" placeholder="请填写说明"></el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="UnagreeVisible = false" class="false" size="mini">取 消</el-button>
        <el-button type="primary" @click="UnagreeSave" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getJobAuditdetail, dutyPass, checkAccept } from 'static/api/personnel-information/job/job'
import { getToken } from 'assets/js/util'
import { getTaskComplete } from 'static/api/exmine/exmine'
import { getJobStatus } from 'assets/js/filters'
import { getSysDic } from 'static/api/common/common'
export default {
  data () {
    return {
      UnresonOption: [],
      jobAuditDetailsData: [],
      peopleDetailsData: [],
      UnagreeVisible: false,
      UnagreeForm: {
        id: '',
        reason: '',
        remark: ''
      },
      formSalary: '',
      newFormSalary: ''
    }
  },
  methods: {
    /** 审核新增不同意**/
    UnagreeMsg () {
      this.UnagreeVisible = true
      let newPassKey = this.$route.params.exminePassKey
      newPassKey = (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass') + ',' + (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'BackReason')
      let unParams = {
        actType: 'dutyMarketAdd',
        userId: getToken('loginId').toString(),
        pId: this.$route.params.exminePid,
        id: this.$route.params.exmineId,
        taskId: this.$route.params.exmineTaskId,
        owner: this.$route.params.exmineUserId,
        var: {
          keys: newPassKey,
          values: '',
          types: 'B,S'
        }
      }
      this.unComplateForm = unParams
    },
    UnagreeSave () {
      let getIds = [{ id: this.jobAuditDetailsData.id }]
      let dutyParams = {
        appointRemoves: '任职',
        ids: getIds,
        auditDoneStatus: 3,
        employeeId: this.$route.params.employeeId,
        newTreatmentRank: this.jobAuditDetailsData.newTreatmentRank,
        newWageLevel: this.newFormSalary,
        dutyChangeId: this.jobAuditDetailsData.dutyChangeId
      }

      if (this.UnagreeForm.remark) {
        let valuePost = false + ',' + this.UnagreeForm.reason + ':' + this.UnagreeForm.remark
        this.unComplateForm.var.values = valuePost
      } else {
        let valuePost = false + ',' + this.UnagreeForm.reason
        this.unComplateForm.var.values = valuePost
      }

      if (!this.UnagreeForm.reason) {
        this.$message.warning({
          message: '请选择不同意原因!'
        })
        return
      }
      dutyPass(dutyParams).then(data => {
        getTaskComplete(this.unComplateForm).then(data => {
          this.$message.success('操作成功')
          this.UnagreeVisible = false
          setTimeout(() => {
            window.history.go(-1)
          }, 500)
        })
      })
    },
    /** 职务新增同意**/
    agreeMsg () {
      let newPassKey = this.$route.params.exminePassKey
      newPassKey = newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass'
      let complateParams = {
        actType: 'dutyMarketAdd',
        userId: getToken('loginId').toString(),
        pId: this.$route.params.exminePid,
        id: this.$route.params.exmineId,
        taskId: this.$route.params.exmineTaskId,
        owner: this.$route.params.exmineUserId,
        var: {
          keys: newPassKey,
          values: 'true',
          types: 'B'
        }
      }
      let getIds = [{ id: this.jobAuditDetailsData.id }]
      let dutyParams = {
        appointRemoves: '任职',
        ids: getIds,
        auditDoneStatus: 2,
        employeeId: this.$route.params.employeeId,
        newTreatmentRank: this.jobAuditDetailsData.newTreatmentRank,
        newWageLevel: this.newFormSalary,
        dutyChangeId: this.jobAuditDetailsData.dutyChangeId
      }
      dutyPass(dutyParams).then((data) => {
        getTaskComplete(complateParams).then((data) => {
          this.$message.success('操作成功')
          setTimeout(() => {
            this.$router.replace('/market-verify/job/addVerifyJob')
          }, 500)
        })
      })
    },
    goBack () {
      this.$router.replace('/market-verify/job/addVerifyJob')
    },
    _getJobdetail () {
      /** 查询干部信息**/
      let idParams = {
        dutyId: this.$route.params.jobId
      }
      getJobAuditdetail(idParams).then((data) => {
        if (data.result && data.result.length) {
          this.jobAuditDetailsData = data.result[0]
        }
      })
      /** 查询personnel信息**/
      let peopleidParams = {
        id: this.$route.params.employeeId
      }
      checkAccept(peopleidParams).then(data => {
        if (data.result) {
          this.peopleDetailsData = data.result
        }
      })
    },
    /* 获取数字字典 */
    async _getQueryClassList () {
      /* 不同意类型 */
      await getSysDic('auditRefusedType').then(data => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.UnresonOption.push(item)
            }
          })
        }
      })
    }
  },
  filters: {
    filterJstatus (type) {
      return getJobStatus(type)
    }
  },
  created () {
    this._getJobdetail()
    this._getQueryClassList()
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
   .el-select{width: 100%}
</style>
