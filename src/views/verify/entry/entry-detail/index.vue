<template>
<div class="container">
    <!-- <el-row class="mt-20">
         <ul class="tab-bar-ul clearfix">
            <li><el-button type="primary" size="mini" @click="goBack">返  回</el-button></li>
             <li><el-button type="primary" size="mini" @click="goReview">提交</el-button></li>
         </ul>
    </el-row>-->
    <!-- <el-row class="mt-20">
    <el-col :span="24">
      <div class="tab-wrap clearfix">
        <ul class="edit-tab clearfix">
          <li @click="skipLabor">
            <a :class="{'router-link-active': !activeRouter}">劳动人事信息</a>
          </li>
          <li @click="skipPersonnal" >
            <a :class="{'router-link-active': activeRouter}">个人档案</a>
          </li>
        </ul>
      </div>
    </el-col>
  </el-row> -->
  <router-view></router-view>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getToken } from 'assets/js/util'
import { getTaskComplete } from 'static/api/exmine/exmine'
import { getUserInfoDetail } from 'static/api/recruit/entry/entry'
import { checkAcceptBaseDetail } from 'static/api/recruit/accept/accept'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      'activeRouter': 'getActiveRouter'
    })
  },
  methods: {
    // goBack () {
    //   let routeCome = this.$route.params.come
    //   this.$router.replace(routeCome)
    // },
    skipLabor () {
      this.$router.push({ name: 'VerifyEntryDetailLabor',
        params: {
          employeeId: this.$route.params.employeeId,
          exmineId: this.$route.params.exmineId,
          exmineUserId: this.$route.params.exmineUserId,
          exminePassKey: this.$route.params.exminePassKey,
          exmineTaskId: this.$route.params.exmineTaskId,
          exminePid: this.$route.params.exminePid,
          type: this.$route.params.type,
          come: '/verify/entry/entry',
          actId: this.$route.params.actId
        } })
    },
    skipPersonnal () {
      this.$router.push({ name: 'VerifyEntryDetailPersonnal',
        params: {
          employeeId: this.$route.params.employeeId,
          exmineId: this.$route.params.exmineId,
          exmineUserId: this.$route.params.exmineUserId,
          exminePassKey: this.$route.params.exminePassKey,
          exmineTaskId: this.$route.params.exmineTaskId,
          exminePid: this.$route.params.exminePid,
          type: this.$route.params.type
        } })
    },
    goReview () {
      getUserInfoDetail(this.$route.params.employeeId).then(data => {
        if (data.result && data.result.id) {
          checkAcceptBaseDetail(this.$route.params.employeeId).then(res => {
            if (res.result && data.result.nature) {
              this.$confirm('是否同意通过审批', '提示', {
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
                  this.$message({
                    type: 'success',
                    message: '审核通过请等待其他审核人的结果'
                  })
                  setTimeout(() => {
                    this.$router.replace('/verify/entry/entry')
                  }, 400)
                })
              })
            } else {
              this.$message.warning('请先保存个人档案')
            }
          })
        } else {
          this.$message.warning('请先保存劳动人事信息')
        }
      })
    }
  }
}
</script>
