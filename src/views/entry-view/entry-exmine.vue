<!--营销人员新增-->
<template>
<div class="market-add_box">
     <ul class="tab-bar-ul clearfix mb-20">
      <li><el-button type="primary" size="mini" @click="goBack">返　回</el-button></li>
      <li><el-button type="primary" size="mini" @click="goReview">提　交</el-button></li>
    </ul>
    <div class="mt-20">
     <common-add-view ref="commonAddref"/>
    </div>
</div>
</template>
<script>
import commonAddView from './common-add-view'
import { mapGetters } from 'vuex'
import { getEntryParams } from 'assets/js/mixins'
import { getToken } from 'assets/js/util'
import { getTaskComplete } from 'static/api/exmine/exmine'
import { checkAcceptBaseDetail } from 'static/api/recruit/accept/accept'
import { getUserInfoDetail } from 'static/api/recruit/entry/entry'
import { debounce } from 'lodash'
export default {
  mixins: [getEntryParams],
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
      this.$router.push('/verify/entry/entry?active=first')
    },
    goReview: debounce(function () {
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
                    this.$message.success('审核通过请等待其他审核人的结果')
                    setTimeout(() => {
                      this.$router.push({ name: this.$route.query.come, query: { active: 'first' } })
                    }, 400)
                  })
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
    }, 500)
  }
}
</script>
