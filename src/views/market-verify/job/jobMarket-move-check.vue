<template>
  <div class="container">
      <el-row style="margin-bottom: 20px">
        <el-button type="primary" size="small" @click="goBack">返  回</el-button>
        <el-button type="primary" size="small" @click="agreeMsg">同  意</el-button>
        <el-button type="primary" size="small" @click="UnagreeMsg">不同意</el-button>
      </el-row>
    <el-tabs type="border-card">
      <el-tab-pane label="免除信息">
        <el-form :model="moveForm" label-width="150px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="免职发文号：">
                <span>{{jobAuditDetailsData.deposeNumber}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发文时间：">
                <span>{{jobAuditDetailsData.deposeDispatchTime}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="执行时间：">
                <span>{{jobAuditDetailsData.deposeExecuteTime}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="免职发文：">
                <span>{{jobAuditDetailsData.deposeDispatch}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="jobAuditDetailsData.newTreatmentRank">
            <el-col :span="24">
              <el-form-item label="新待遇级别：">
                <span>{{jobAuditDetailsData.newTreatmentRank}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="jobAuditDetailsData.newWageLevel">
            <el-col :span="24">
              <el-form-item label="新工资标准：">
                {{jobAuditDetailsData.newWageLevel}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row align="center" style="font-size: 14px;color: #FF7500;" v-show="jobAuditDetailsData.dutyChange">
            <el-col :span="24">
              <el-form-item label="主职/兼职变更：">
                <span>{{jobAuditDetailsData.dutyChange}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="职务信息">
        <el-form label-width="120px">
          <el-row align="center">
            <el-col :span="8">
              <el-form-item label="姓　名:">
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
                <span v-if="jobAuditDetailsData.isPrincipal">{{jobAuditDetailsData.isPrincipal}}</span>
                <span v-else class="color999">未填写</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row align="center">
            <el-col :span="8">
              <el-form-item label="职务级别:">
                <span v-if="jobAuditDetailsData.dutyRank">{{jobAuditDetailsData.dutyRank}}</span>
                <span v-else class="color999">未填写</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="待遇级别:">
                <span>{{jobAuditDetailsData.treatmentRank}}</span>
              </el-form-item>
            </el-col>
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
                <span>{{jobAuditDetailsData.dutyExecuteTime}}</span>
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
              <el-form-item label="备注:">
                <span v-if="jobAuditDetailsData.remark">{{jobAuditDetailsData.remark}}</span>
                <span v-else class="color999">未填写</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>

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
import { dutyPass, getJobAuditdetail, checkAccept } from 'static/api/personnel-information/job/job'
import { getToken } from 'assets/js/util'
import { getTaskComplete } from 'static/api/exmine/exmine'
import { getJobStatus } from 'assets/js/filters'
import { getSysDic } from 'static/api/common/common'
export default {
  data () {
    return {
      UnresonOption: [],
      treatmentlevelDatas: [],
      jobAuditDetailsData: [],
      radioSelect: [],
      informationDatas: [],
      UncancelVisible: false,
      UnconcludeForm: {
        information: ''
      },
      activeName2: 'first',
      jobDetailsData: [],
      dutynameDatas: [],
      moveForm: {
        deposeNumber: '',
        deposeDispatch: '',
        deposeDispatchTime: '',
        deposeExecuteTime: '',
        isPrincipal: '',
        newTreatmentRank: '',
        user: '',
        dutyChange: '',
        id: ''
      },
      UnagreeVisible: false,
      UnagreeForm: {
        id: '',
        reason: '',
        remark: ''
      },
      moveLForm: {
        dutyRankType: '',
        newTreatmentRank: '',
        gzType: ''
      },
      peopleDetailsData: []
    }
  },
  methods: {
    /** 审核免除同意**/
    agreeMsg () {
      let newPassKey = this.$route.params.exminePassKey
      newPassKey = newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass'
      let complateParams = {
        actType: 'dutyMarketDepose',
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
        appointRemoves: '免职',
        ids: getIds,
        auditDoneStatus: 2,
        employeeId: this.$route.params.employeeId,
        dutyChangeId: this.jobAuditDetailsData.dutyChangeId
      }
      dutyPass(dutyParams).then((data) => {
        getTaskComplete(complateParams).then((data) => {
          this.$message.success('操作成功')
          setTimeout(() => {
            window.history.go(-1)
          }, 500)
        })
      })
    },
    /** 审核免除不同意**/
    UnagreeMsg () {
      this.UnagreeVisible = true
      let newPassKey = this.$route.params.exminePassKey
      newPassKey = (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass') + ',' + (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'BackReason')
      let unParams = {
        actType: 'dutyMarketDepose',
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
      let getIds = [{ id: this.jobAuditDetailsData.id }]
      let dutyParams = {
        appointRemoves: '免职',
        ids: getIds,
        auditDoneStatus: 3,
        employeeId: this.$route.params.employeeId,
        dutyChangeId: this.jobAuditDetailsData.dutyChangeId
      }
      dutyPass(dutyParams).then((data) => {
        getTaskComplete(this.unComplateForm).then((data) => {
          this.$message.success('操作成功')
          setTimeout(() => {
            window.history.go(-1)
          }, 500)
        })
      })
    },
    /** 查询免除审核的详情**/
    _getJobdetail () {
      let idParams2 = {
        dutyId: this.$route.params.jobId
      }
      getJobAuditdetail(idParams2).then((data) => {
        if (data.result && data.result.length) {
          this.jobAuditDetailsData = data.result[0]
        }
      })
      /** 查询personnel信息**/
      let peopleidParams = {
        id: this.$route.params.employeeId
      }
      checkAccept(peopleidParams).then((data) => {
        if (data.result) {
          this.peopleDetailsData = data.result
        }
      })
    },
    goBack () {
      this.$router.replace('/market-verify/job/moveVerifyJob')
    },
    /* 获取数字字典 */
    async _getQueryClassList () {
      /* 不同意类型 */
      await getSysDic('auditRefusedType').then((data) => {
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
    filterExemptStatus (status) {
      return getJobStatus(status)
    },
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
  .el-select{width: 100%}
</style>
