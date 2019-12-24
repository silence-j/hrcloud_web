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
import { createRole } from 'static/api/setting/index'
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
        enable: true
      }
    }
  },
  methods: {
    goBack () {
      this.$router.replace('/setting/role-setting')
    },
    saveRole: debounce(function (formName) {
      const valid = this.$refs.roleTree.validate()
      if (valid) {
        const roleParams = {
          menuIds: this.$refs.roleTree.getHalfCheckedKeys().concat(this.$refs.roleTree.getCheckedKeys()).concat(['19']),
          roleInfo: {
            enable: this.roleForm.enable ? '1' : '0',
            id: this.roleForm.id,
            remark: this.roleForm.remark,
            roleName: this.roleForm.roleName,
            updateIds: `${this.$refs.roleTree.getOweerCheckKeys()}`
          }
        }
        createRole(roleParams).then(data => {
          this.$message.success('新增成功')
          setTimeout(() => {
            this.$router.replace('/setting/role-setting')
          }, 400)
        })
      }
    }, 500)
  }
}
</script>
