<template>
  <div class="container">
    <el-row class="mt-20">
      <ul class="tab-bar-ul clearfix">
        <li><el-button type="primary" size="mini" @click="goBack">返  回</el-button></li>
        <div v-if="$route.params.type == 'leader'">
          <li><el-button type="primary" size="mini" @click="savefhSalaryMsg">同 意</el-button></li>
          <li><el-button type="primary" size="mini" @click="UnAgree">不同意</el-button></li>
        </div>
      </ul>
    </el-row>
    <el-row class="mt-20">
      <el-col :span="24">
        <div class="tab-wrap clearfix">
          <ul class="edit-tab clearfix">
            <li @click="skipApprove">
              <a :class="{'router-link-active': !activeRouter}">审批意见</a>
            </li>
            <li @click="skipCheckForm" >
              <a :class="{'router-link-active': activeRouter}">登记表信息</a>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <router-view></router-view>
    <el-dialog
      title="不同意原因"
      :visible.sync="resonVisible"
      width="500px">
      <div class="module-opera">
        <el-form :model="resonForm" label-width="80px">
          <el-form-item  label="原因：" class="mustForm">
            <el-select
            style="width:100%"
            v-model="resonForm.remark" placeholder="请选择">
              <el-option
                v-for="item in UnresonSelect"
                :key="item.id"
                :label="item.codeText"
                :value="item.codeText">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label="说明："  label-width="80px">
            <el-input type="textarea" v-model="resonForm.backreson"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
				<el-button @click="resonVisible = false" class="false" size="mini">取 消</el-button>
				<el-button type="primary" @click="resonComfire" size="mini">确 定</el-button>
			</span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getToken } from 'assets/js/util'
import { getTaskComplete } from 'static/api/exmine/exmine'
import { getSysDic } from 'static/api/common/common'
export default {
  data () {
    return {
      curActive: true,
      resonForm: {
        remark: '',
        backreson: ''
      },
      unComplateForm: {},
      UnresonSelect: [],
      resonVisible: false
    }
  },
  computed: {
    ...mapGetters({
      'activeRouter': 'getActiveRouter'
    })
  },
  methods: {
    skipApprove () {
      this.$router.push({ name: 'VerifyEntryCheckApprove',
        params: {
          employeeId: this.$route.params.employeeId,
          exmineId: this.$route.params.exmineId,
          exmineUserId: this.$route.params.exmineUserId,
          exminePassKey: this.$route.params.exminePassKey,
          exmineTaskId: this.$route.params.exmineTaskId,
          exminePid: this.$route.params.exminePid,
          type: this.$route.params.type,
          backReason: this.$route.params.backReason
        } })
    },
    skipCheckForm () {
      this.$router.push({ name: 'VerifyEntryCheckForm',
        params: {
          employeeId: this.$route.params.employeeId,
          exmineId: this.$route.params.exmineId,
          exmineUserId: this.$route.params.exmineUserId,
          exminePassKey: this.$route.params.exminePassKey,
          exmineTaskId: this.$route.params.exmineTaskId,
          exminePid: this.$route.params.exminePid,
          type: this.$route.params.type,
          backReason: this.$route.params.backReason
        } })
    },
    goBack () {
      let routerType = this.$route.params.type
      if (routerType.match(/^head/)) {
        this.$router.replace('/verify/entry/employment?active=first')
      } else if (routerType.match(/^leader/)) {
        this.$router.replace('/verify/entry/recheck?active=first')
      }
    },
    /** 复核同意**/
    savefhSalaryMsg () {
      this.$confirm('是否同意复核', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let newPassKey = this.$route.params.exminePassKey
        newPassKey = newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass'
        let complateParams = {
          actType: 'entry',
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
        getTaskComplete(complateParams).then(data => {
          this.$message.success('审核通过请等待其他审核人的结果')
          setTimeout(() => {
            this.$router.replace('/verify/entry/recheck?active=first')
          }, 400)
        })
      }).catch(() => {})
    },
    /** 复核不同意原因**/
    UnAgree () {
      this.resonVisible = true
      let newPassKey = this.$route.params.exminePassKey
      newPassKey = (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass') + ',' + (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'BackReason')
      let valuePost = false + ',' + this.resonForm.remark + ',' + this.resonForm.backreson
      let unComplateParams = {
        actType: 'entry',
        pId: this.$route.params.exminePid,
        userId: getToken('loginId').toString(),
        id: this.$route.params.exmineId,
        taskId: this.$route.params.exmineTaskId,
        owner: this.$route.params.exmineUserId,
        var: {
          keys: newPassKey,
          values: valuePost,
          types: 'B,S'
        }
      }
      this.unComplateForm = unComplateParams
    },
    resonComfire () {
      if (this.resonForm.backreson === '') {
        this.unComplateForm.var.values = false + ',' + this.resonForm.remark
      } else {
        this.unComplateForm.var.values = false + ',' + this.resonForm.remark + ' ' + this.resonForm.backreson
      }
      if (!this.resonForm.remark) {
        this.$message.warning({
          message: '请选择原因!'
        })
        return
      }
      getTaskComplete(this.unComplateForm).then(data => {
        this.$message.success('操作成功')
        this.resonVisible = false
        setTimeout(() => {
          this.$router.replace('/verify/entry/recheck?active=first')
        }, 400)
      })
    },
    /* 获取数字字典 */
    async _getQueryClassList () {
      /* 不同意类型 */
      await getSysDic('auditRefusedType').then((data) => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.UnresonSelect.push(item)
            }
          })
        }
      })
    }
  },
  created () {
    this._getQueryClassList()
  }
}
</script>
