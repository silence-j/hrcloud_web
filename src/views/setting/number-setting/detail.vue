<template>
  <div class="account-detail-box">
    <el-form
    :model="detailForm"
    label-width="120px"
    :rules="detailRules"
    >
       <el-form-item
            prop="id"
            label="员工姓名:">
              <el-select
                v-model="detailForm.id"
                filterable
                remote
                clearable
                placeholder="请输入员工姓名"
                :remote-method="remoteMethod"
                :loading="loading">
                <el-option
                  v-for="item in nameOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
      </el-form-item>
      <el-form-item
        label="登录账号:"
         prop="account"
        >
          <el-input v-model="detailForm.account"></el-input>
      </el-form-item>
      <el-form-item label="审批角色分组：">
              <el-row :gutter="20" type="flex"
              :class="index!==0 ? 'mt-20' :''"
              v-for="(item,index) in roleExmine" :key="index">
                <el-col :span="11">
                <el-select
                multiple
                v-model="item.roleIds"
                @visible-change="handleVisChange"
                >
                  <el-option
                    v-for="role in roleGroupSelect"
                    :key="role.id"
                    :label="role.name"
                    :value="role.id"
                    :disabled="role.disabled"
                    >
                  </el-option>
                </el-select>
                </el-col>
                <el-col :span="13" class="role-group-box">
                 <el-cascader
                  :options="cascaderOptions"
                  :props="defaultProps"
                  clearable></el-cascader>
                 <i class="el-icon-circle-close" @click="delExmineRole(item,index)"></i>
                </el-col>
              </el-row>
              <el-row class="mt-20">
                <el-button type="primary" icon="el-icon-plus" size="mini" @click="addExmineRole">添加</el-button>
              </el-row>
            </el-form-item>
    </el-form>
  </div>
</template>
<script>
import settingApi from 'api/setting'
import commonApi from 'api/common'
import { transData } from 'assets/js/common'
import { compare } from 'assets/js/getDatas'
export default {
  data () {
    const accountValidate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账户'))
      } else if (value.length < 2 || value.length > 15) {
        callback(new Error('账户长度必须在2-15之间'))
      } else {
        callback()
      }
    }
    return {
      detailForm: {
        id: '',
        account: '',
        roleIds: []
      },
      roleExmine: [
        {
          roleIds: [],
          orgIds: []
        }
      ],
      cascaderOptions: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      loading: false,
      list: [],
      nameOptions: [],
      roleGroupSelect: [],
      orgGroupSelect: [],
      detailRules: {
        id: { required: true, message: '请输入员工', trigger: 'change' },
        account: { validator: accountValidate, required: true, trigger: 'blur' }
      }
    }
  },
  methods: {
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.nameOptions = this.list.filter(item => {
            return item.name.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.nameOptions = []
      }
    },
    // 审批角色下拉框去重
    handleVisChange (val) {
      if (val) {
        const groupSelectArr = []
        this.roleGroupSelect = []
        this.roleExmine.forEach(item => {
          item.roleIds.forEach(data => {
            groupSelectArr.push(data)
          })
        })
        this.orgGroupSelect.forEach(item => {
          if (groupSelectArr.indexOf(item.id) === -1) {
            this.roleGroupSelect.push(item)
          }
        })
      }
    },
    // 添加审批角色
    addExmineRole () {
      this.roleExmine.push({
        roleIds: [],
        orgIds: []
      })
    },
    // 删除审批角色
    delExmineRole (item, index) {
      const { id } = item
      if (id) {} else {
        this.roleExmine.splice(index, 1)
      }
    },
    _getUsetList () {
      settingApi.getUserList().then(data => {
        const { result } = data
        this.list = result
      })
    },
    _getRoleGroup () {
      settingApi.getRoleGroup().then(data => {
        const { result } = data
        this.roleGroupSelect = result
        this.orgGroupSelect = result
      })
    },
    _getTreeData () {
      commonApi.getAllOrganize().then(data => {
        const { result } = data
        if (result && result.length) {
          const dataDept = data.result.sort(compare('id'))
          this.cascaderOptions = transData(dataDept, 'id', 'parentId', 'children')
        }
      })
    }
  },
  created () {
    this._getUsetList()
    this._getRoleGroup()
    this._getTreeData()
  }
}
</script>

<style scoped lang="less">
.account-detail-box{
  .el-form{
    border: 1px solid #ebeef5;
    width: 90%;
    padding: 20px;
    .el-select{
      width:100%;
    }
  }
  .role-group-box{
    position: relative;
    i{
      position: absolute;
      right: 2px;
      top:-5px;
      font-size:14px;
      color: @base-color;
      transition: all 2s;
      cursor: pointer;
      &:hover{
        transform: rotate(360deg)
      }
    }
  }
}
</style>
