<template>
    <div class="mt-20 remark-box">
      <p class="base-sec-title f14">备注信息</p>
        <el-table
            :data="remarkList"
            border
            style="width: 100%">
            <el-table-column
                label="序号"
                type="index"
                width="70">
            </el-table-column>

            <el-table-column
                prop="content"
                label="备注内容"
                width="300px">
            </el-table-column>

            <el-table-column
                prop="createTime"
                label="操作时间">
            </el-table-column>

            <el-table-column
                prop="createName"
                label="操作人">
            </el-table-column>
        </el-table>
        <br/>
        <div>
            <el-input type="textarea" v-model="form.content" placeholder="请输入信息"></el-input>
            <el-button type="primary" size="small" @click="addRemarkMsg" class="add-remark">添加备注</el-button>
        </div>
    </div>
</template>

<script>
import { getUserRemarkList, getAddRemarkList } from 'static/api/personnel-information/base/base'
import { getToken } from 'assets/js/util'
export default {
  data () {
    return {
      remarkList: [],
      form: {
        content: ''
      }
    }
  },
  methods: {
    _getUserRemarkList () {
      getUserRemarkList(this.$route.params.baseId).then(data => {
        if (data.result && data.result.length) {
          this.remarkList = data.result
        }
      })
    },
    addRemarkMsg () {
      let param = {
        content: this.form.content,
        createName: getToken('loginName'),
        userId: this.$route.params.baseId
      }
      if (!this.form.content) {
        this.$message.warning('请填写备注信息!')
        return false
      }
      getAddRemarkList(param).then(data => {
        this.$message.success('操作成功!')
        this._getUserRemarkList()
        this.form.content = ''
      })
    }
  },
  created () {
    this._getUserRemarkList()
    this.$store.commit('SET_ACTIVE_ROUTER', '10')
  }
}
</script>

<style scoped lang="less">
.remark-box{
    width:1005px
}
.add-remark{
    margin-top:20px;
    float:right;
}
.base-sec-title::after{
  left: 90px;
}
.f14{
  font-size:14px;
}
.base-sec-title{
    width:98%
}
</style>
