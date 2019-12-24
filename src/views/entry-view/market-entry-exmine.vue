<!--营销人员新增-->
<template>
<div class="market-add_box">
     <ul class="tab-bar-ul clearfix mb-20">
      <li><el-button type="primary" size="mini" @click="goBack">返  回</el-button></li>
      <li><el-button type="primary" size="mini" @click="goReview">同  意</el-button></li>
      <li><el-button type="primary" size="mini" @click="unReview" v-if="this.$route.query.come!=='MarketVerifyEntryHeadquarters'">不同意</el-button></li>
    </ul>
    <div class="mt-20">
     <common-add-view ref="commonAddref"/>
    </div>
     <el-dialog title="不同意入职原因" :visible.sync="resonVisible" width="500px">
      <div class="module-opera">
        <el-form
          :model="resonForm"
          :rules="unAgressRules"
          ref="unAgressRef"
          label-width="80px" >
          <el-form-item
            label="原因："
            prop="remark">
            <el-select style="width:100%" v-model="resonForm.remark" placeholder="请选择">
              <el-option
                style="100%"
                v-for="item in UnresonOption"
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
import commonAddView from './common-add-view'
import { mapGetters } from 'vuex'
import { getEntryParams } from 'assets/js/mixins'
import { getToken } from 'assets/js/util'
import { getTaskComplete } from 'static/api/exmine/exmine'
import { checkAcceptBaseDetail } from 'static/api/recruit/accept/accept'
import { getUserInfoDetail, assessCallback, setUserBatch } from 'static/api/recruit/entry/entry'
import { getSysDic } from 'static/api/common/common'
export default {
  mixins: [getEntryParams],
  data () {
    return {
      resonVisible: false,
      UnresonOption: [],
      resonForm: {
        remark: '',
        backreson: ''
      },
      unComplateForm: {},
      unAgressRules: {
        remark: { required: true, message: '请选择不同意原因', trigger: 'change' }
      }
    }
  },
  components: {
    commonAddView
  },
  computed: {
    ...mapGetters(['getSalaryArr', 'getAllSave']),
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
      this.$router.push({ name: this.$route.query.come })
    },
    goReview () {
      if (this.vaildate) {
        getUserInfoDetail(this.employeeId).then(data => {
          if (data.result && data.result.id) {
            checkAcceptBaseDetail(this.employeeId).then(res => {
              if (res.result && res.result.name) {
                if (!this.getAllSave.save1) {
                  this.$message.warning('请先保存劳动人事信息')
                  return
                }
                if (!this.getAllSave.save2) {
                  this.$message.warning('请先保存个人档案!')
                  return
                }
                this.$confirm('是否同意通过审批', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  if (this.$route.query.come === 'MarketVerifyEntryHeadquarters') {
                    let passParams = {
                      auditStatus: 1,
                      userId: this.$route.query.employeeId
                    }
                    assessCallback(passParams).then(data => {
                      this._setGetTaskComplete('审核完成')
                    })
                  } else {
                    this._setGetTaskComplete('审核通过请等待其他审核人的结果')
                  }
                }).catch(() => {})
              }
            })
          } else {
            this.$message.warning('请先保存劳动人事信息')
          }
        })
      } else {
        this.$message.warning('请先把信息保存完整')
      }
    },
    _setGetTaskComplete (message) {
      let newPassKey = this.$route.query.exminePassKey
      newPassKey = newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass'
      let complateParams = {
        actType: 'entry',
        userId: getToken('loginId').toString(),
        pId: this.$route.query.exminePid,
        id: this.$route.query.exmineId,
        taskId: this.$route.query.exmineTaskId,
        owner: this.$route.query.exmineUserId,
        var: {
          keys: newPassKey,
          values: 'true',
          types: 'B'
        }
      }
      getTaskComplete(complateParams).then(data => {
        this.$message.success(message)
        setTimeout(() => {
          this.$router.push({ name: this.$route.query.come, query: { active: 'first' } })
        }, 400)
      })
    },
    // 不同意
    unReview () {
      this.resonVisible = true
      setTimeout(() => {
        this.$refs.unAgressRef.resetFields()
      })
    },
    resonComfire () {
      this.$refs.unAgressRef.validate(valid => {
        if (valid) {
          let newPassKey = this.$route.query.exminePassKey
          newPassKey = (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass') + ',' + (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'BackReason')
          let valuePost = false + ',' + this.resonForm.remark + ' ' + this.resonForm.backreson
          let taskParams = [{
            actType: 'entryMarket',
            userId: getToken('loginId').toString(),
            pId: this.$route.query.exminePid,
            id: this.$route.query.actId,
            taskId: this.$route.query.exmineTaskId,
            userIds: this.$route.query.employeeId,
            auditStatus: 0,
            owner: this.$route.query.exmineUserId,
            var: {
              keys: newPassKey,
              values: valuePost,
              types: 'B,S'
            }
          }]
          setUserBatch(taskParams).then(data => {
            let results = data.result
            let tips = ''
            if (results.failNames.length) {
              tips += ','
              tips += results.failNames.join(',')
              tips += ',审核失败'
            }
            this.$message.success(data.subMsg + tips)
            this.resonVisible = false
            setTimeout(() => {
              this.$router.push({ name: this.$route.query.come })
            }, 200)
          })
        }
      })
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
  created () {
    this._getQueryClassList()
  }
}
</script>
