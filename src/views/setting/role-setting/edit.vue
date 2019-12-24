<template>
  <div class="role-add-box">
    <el-row>
       <el-button type="primary" size="small" @click="goBack">返 回</el-button>
       <el-button type="primary" size="small" @click="saveRole">保 存</el-button>
    </el-row>
    <detail ref="roleTree" :roleForm="roleForm" class="mt-20"/>
  </div>
</template>
<script>
import Detail from './detail'
import { createRole, getListByRole } from 'static/api/setting/index'
import { debounce } from 'lodash'
export default {
  name: 'RoleDetail',
  components: {
    Detail
  },
  data () {
    return {
      roleForm: {
        roleName: '',
        remark: '',
        enable: true,
        id: ''
      }
    }
  },
  computed: {
    querys () {
      return {
        roleId: unescape(this.$route.query.roleId),
        roleName: unescape(this.$route.query.roleName),
        remark: unescape(this.$route.query.remark),
        enable: unescape(this.$route.query.enable)
      }
    }
  },
  methods: {
    goBack () {
      this.$router.replace('/setting/role-setting')
    },
    _getRoleDetail () {
      this.roleForm.roleName = this.querys.roleName === 'roleNameNull' ? '' : this.querys.roleName
      this.roleForm.remark = this.querys.remark === 'remarkNull' ? '' : this.querys.remark
      this.roleForm.id = this.querys.roleId
      if (this.querys.enable.toString() === '1') {
        this.roleForm.enable = true
      } else if (this.querys.enable.toString() === '0') {
        this.roleForm.enable = false
      }
      getListByRole(this.querys.roleId).then(data => {
        if (data.subMsg) {
          const msgIds = data.subMsg.split(',')
          this.$refs.roleTree.setCheckedKeys(msgIds)
        }
      })
    },
    saveRole: debounce(function (formName) {
      const valid = this.$refs.roleTree.validate()
      if (valid) {
        const roleParams = {
          menuIds: this.$refs.roleTree.getHalfCheckedKeys().concat(this.$refs.roleTree.getCheckedKeys()),
          roleInfo: {
            enable: this.roleForm.enable ? '1' : '0',
            id: this.roleForm.id,
            remark: this.roleForm.remark,
            roleName: this.roleForm.roleName,
            updateIds: `${this.$refs.roleTree.getOweerCheckKeys()}`
          }
        }
        createRole(roleParams).then(data => {
          this.$message.success('编辑成功')
          setTimeout(() => {
            this.$router.replace('/setting/role-setting')
          }, 400)
        })
      }
    }, 500)
  },
  created () {
    this._getRoleDetail()
  }
}
</script>
