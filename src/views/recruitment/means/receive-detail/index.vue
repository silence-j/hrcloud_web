<template>
<div class="container">
    <el-row style="margin-bottom: 20px">
      <ul class="tab-bar-ul clearfix">
        <li><el-button type="primary" size="small" @click="goBack">返 回</el-button></li>
        <li><el-button type="primary" size="small" @click="ReceiveMsg" v-show="(permission.indexOf('接收'))!==-1">接 收</el-button></li>
        <li><el-button type="primary" size="small" @click="UnReceiveMsg" v-show="(permission.indexOf('不接收'))!==-1">不接收</el-button></li>
      </ul>
    </el-row>
    <el-row class="mt-20">
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
  </el-row>
  <router-view></router-view>

  <el-dialog title="不接收原因" :visible.sync="UncancelVisible" width="500px">
    <div class="module-opera">
      <el-form :model="UnconcludeForm" label-width="125px">
        <el-form-item label="不接收原因：" class="mustForm">
          <el-select v-model="UnconcludeForm.reason" placeholder="请选择不接收原因">
            <el-option
              v-for="item in UnresonOption"
              :key="item.id"
              :label="item.codeText"
              :value="item.codeText">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="说  明：">
          <el-input type="textarea" v-model="UnconcludeForm.illustrate" placeholder="请填写说明"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="UncancelVisible = false" class="false" size="mini">取 消</el-button>
      <el-button type="primary" @click="UnReceiveSave" size="mini">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getExmine } from 'assets/js/exmine'
import { acceptMeans } from 'static/api/means/means'
import { getSysDic } from 'static/api/common/common'
export default {
  data () {
    return {
      UncancelVisible: false,
      UnconcludeForm: {
        udtId: '',
        illustrate: '',
        reason: ''
      },
      UnresonOption: []
      /* UnresonSelect: [
        {value: '信息有误', label: '信息有误'},
        {value: '不同意', label: '不同意'},
        {value: '其它', label: '其它'}
      ] */
    }
  },
  computed: {
    ...mapGetters({
      'activeRouter': 'getActiveRouter'
    }),
    permission () {
      return getExmine().recruitMeansReceive
    }
  },
  methods: {
    goBack () {
      this.$router.replace('/recruitment/means/receive')
    },
    skipLabor () {
      this.$router.push({ name: '资料详情劳动人事信息',
        params: {
          meansId: this.$route.params.meansId,
          udtId: this.$route.params.udtId
        } })
    },
    skipPersonnal () {
      this.$router.push({ name: '资料详情个人档案',
        params: {
          meansId: this.$route.params.meansId,
          udtId: this.$route.params.udtId
        } })
    },
    /** 接收**/
    ReceiveMsg () {
      this.$confirm('确定要接收吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let preload = {
          udtId: Number(this.$route.params.udtId),
          status: 1
        }
        acceptMeans(preload).then((data) => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          setTimeout(() => {
            this.$router.replace('/recruitment/means/receive')
          }, 500)
        })
      }).catch(() => {})
    },
    /** 不接收原因**/
    UnReceiveMsg () {
      this.UncancelVisible = true
      this.UnconcludeForm.reason = ''
    },
    UnReceiveSave () {
      let preload = {
        udtId: Number(this.$route.params.udtId),
        status: 0,
        reason: this.UnconcludeForm.reason,
        remark: this.UnconcludeForm.illustrate
      }
      if (!this.UnconcludeForm.reason) {
        this.$message({
          type: 'warning',
          message: '请选择不接收原因'
        })
        return
      }
      acceptMeans(preload).then((data) => {
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        setTimeout(() => {
          this.UncancelVisible = false
          this.$router.replace('/recruitment/means/receive')
        }, 500)
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
<style scoped lang="less">
.el-select{
  width:100%
}
</style>
