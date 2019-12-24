<template>
<div class="mt-20">
     <el-row>
      <ul class="tab-bar-ul clearfix">
        <li><el-button type="primary" size="mini" @click="goBack">返 回</el-button></li>
        <li><el-button type="primary" size="mini" @click="_saveAccount">保 存</el-button></li>
      </ul>
    </el-row>
    <el-form
    :model="accountAddForm"
    class="mt-20 accout-form"
    :rules="addNumberRules"
    ref="accountAddForm"
    label-width="125px">
        <el-row>
          <el-col :span="23">
            <el-form-item
            prop="name"
            label="员工姓名:">
              <el-select
                v-model="accountAddForm.name"
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
                  :value="item.id+ '~+@' +item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="23">
            <el-form-item
            label="登录账号:"
            prop="account"
            >
              <el-input v-model="accountAddForm.account"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row
        >
          <el-col :span="23" class="pass-col">
            <el-form-item label="登录密码:">
              <el-input value="123456" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row
         :gutter="20"
         v-for="(role,index) in accountAddForm.roleExmine"
         :key="index"
         >
          <el-col :span="11">
            <el-form-item
            :class="'color-w'+index"
            label="审批角色分组:">
                <el-select
                multiple
                @visible-change="handleVisChange"
                v-model="role.roleIds"
                @change="selectRoleChange"
                >
                  <el-option
                    v-for="item in roleGroupSelect"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    :disabled="item.disabled"
                    >
                  </el-option>
                </el-select>
            </el-form-item>
         </el-col>
         <el-col :span="12" class="name-and-icon-col">
            <el-form-item
            label-width="0px"
            >
              <div
             class="array-tree-div checked-div"
             @click="showOrgTree(index, 'exmine')"
             >
                 <span class="text-overflow">{{role.roleNames ? role.roleNames:'请选择审批角色组织架构'}}</span>
             </div>
            </el-form-item>
             <i class="el-icon-circle-close" @click="delExmineRole(index)"></i>
         </el-col>
        </el-row>
        <el-row class="icon-row">
            <div class="icon-div" @click="addExmineRole"><i class="el-icon-plus"></i></div>
        </el-row>
        <div class="mt-20"></div>
         <el-row
         :gutter="20"
          v-for="(own, index) in accountAddForm.roleOwner"
          :key="index+100"
         >
             <el-col :span="11">
            <el-form-item
            :class="'color-w'+index"
            :prop="'roleOwner.' + index + '.roleIds'"
            :rules="{
              required: true, message: '所属角色不能为空', trigger: 'change'
            }"
            label="所属角色:">
                <el-select
                multiple
                @visible-change="handleLoginChange"
                v-model="own.roleIds"
                >
                  <el-option
                    v-for="item in loginNameOptions"
                    :key="item.id"
                    :label="item.roleName"
                    :value="item.id"
                    >
                  </el-option>
                </el-select>
            </el-form-item>
         </el-col>
         <el-col :span="12" class="name-and-icon-col">
            <el-form-item
            label-width="0px"
            >
            <div
             class="array-tree-div checked-div"
             @click="showOrgTree(index, 'owner')"
             >
                 <span class="text-overflow">{{own.roleNames ? own.roleNames:'请选择审批角色组织架构'}}</span>
             </div>
            </el-form-item>
             <i class="el-icon-circle-close" @click="delOwnerRole(index)"></i>
         </el-col>
        </el-row>
        <el-row class="icon-row">
            <div class="icon-div" @click="addOwnerRole"><i class="el-icon-plus"></i></div>
        </el-row>
        <el-row class="mt-20">
          <el-col :span="23">
            <el-form-item label="备注:">
              <el-input v-model="accountAddForm.remark" type="textarea" :row="2"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
    </el-form>
     <el-dialog
      :title="diaologTile"
      :visible.sync="treeVisible"
      width="700px"
      :before-close="handleClose"
    >
      <address-tree @check-change="getTreeValue" ref="treeGrid"></address-tree>
      <span slot="footer" class="dialog-footer">
         <el-button @click="treeVisible = false" size="mini">取 消</el-button>
         <el-button type="primary" @click="sureTreeOrg" size="mini">确 定</el-button>
      </span>
    </el-dialog>
</div>
</template>

<script>
import { getUserList, getRoleGroup, getRoleByLogin, saveAccount, createRoleGroup } from 'static/api/setting/index'
import AddressTree from 'components/AddressTree'
import { getToken, md5Encrypt, cutstr } from 'assets/js/util'
import { getAllOrganize } from 'static/api/common/common'
import { debounce } from 'lodash'
export default {
  data () {
    let accountValidate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账户'))
      } else if (value.length < 2 || value.length > 15) {
        callback(new Error('账户长度必须在2-15之间'))
      } else {
        callback()
      }
    }
    return {
      diaologTile: '',
      treeVisible: false,
      accountAddForm: {
        name: '',
        userId: '',
        id: '',
        account: '',
        roleValue: '',
        password: '',
        restPassWord: '',
        remark: '',
        roleExmine: [{
          roleIds: [],
          roleNames: '',
          orgIds: [],
          id: ''
        }],
        roleOwner: [{
          roleIds: [],
          roleNames: '',
          orgIds: [],
          id: ''
        }]
      },
      loading: false,
      list: [],
      nameOptions: [],
      loginNameOptions: [],
      orgLoginOptions: [],
      roleGroupSelect: [],
      orgGroupSelect: [],
      getRoleIndex: -1,
      showType: '',
      setNameArr: [],
      addNumberRules: {
        name: { required: true, message: '请输入员工', trigger: 'change' },
        account: { validator: accountValidate, required: true, trigger: 'blur' }
      }
    }
  },
  methods: {
    goBack () {
      this.$router.replace('/setting/number-setting')
    },
    selectRoleChange (value) {
      // this.accountAddForm.roleValue = value
    },
    _getUsetList () {
      getUserList().then(data => {
        if (data.result) {
          this.list = data.result
        }
      })
    },
    handleClose (done) {
      //  this.$refs.treeGrid.clearTree()
      done()
    },
    // 增加审批角色
    addExmineRole () {
      this.accountAddForm.roleExmine.push({
        roleIds: [],
        roleNames: '',
        orgIds: [],
        id: ''
      })
    },
    // 增加所属角色
    addOwnerRole () {
      this.accountAddForm.roleOwner.push({
        roleIds: [],
        roleNames: '',
        orgIds: [],
        id: ''
      })
    },
    // 删除审批角色
    delExmineRole (index) {
      this.accountAddForm.roleExmine.splice(index, 1)
      if (this.accountAddForm.roleExmine.length === 0) {
        this.accountAddForm.roleExmine = [{
          roleIds: [],
          roleNames: '',
          orgIds: [],
          id: ''
        }]
      }
    },
    // 删除所属角色
    delOwnerRole (index) {
      console.log('index', index)
      this.accountAddForm.roleOwner.splice(index, 1)
      if (this.accountAddForm.roleOwner.length === 0) {
        this.accountAddForm.roleOwner = [{
          roleIds: [],
          roleNames: '',
          orgIds: [],
          id: ''
        }]
      }
    },
    // 显示树形结构
    showOrgTree (index, type) {
      if (type === 'exmine') {
        this.diaologTile = '审批角色组织架构'
        if (!this.dialogCount) {
          setTimeout(() => {
            this.$refs.treeGrid.clearSearchWords()
            this.$refs.treeGrid.checkTree(this.accountAddForm.roleExmine[index].orgIds)
            this.dialogCount = true
          }, 2)
        } else {
          this.$refs.treeGrid.clearSearchWords()
          this.$refs.treeGrid.checkTree(this.accountAddForm.roleExmine[index].orgIds)
        }
      }
      if (type === 'owner') {
        this.diaologTile = '所属角色组织架构'
        if (!this.dialogCount) {
          setTimeout(() => {
            this.$refs.treeGrid.clearSearchWords()
            this.$refs.treeGrid.checkTree(this.accountAddForm.roleOwner[index].orgIds)
            this.dialogCount = true
          }, 0)
        } else {
          this.$refs.treeGrid.clearSearchWords()
          this.$refs.treeGrid.checkTree(this.accountAddForm.roleOwner[index].orgIds)
        }
      }
      this.setNameArr = []
      this.treeVisible = true
      this.getRoleIndex = index
      this.showType = type
    },
    getTreeValue (data, checked, child) {
      if (this.showType === 'exmine') {
        if (checked) {
          if (!data.children) {
            this.setNameArr.push(data.name)
          }
        } else {
          let indexOf = this.setNameArr.indexOf(data.name)
          if (indexOf && indexOf !== -1) {
            this.setNameArr.splice(indexOf, 1)
          }
        }
      }
    },
    sureTreeOrg () {
      if (this.showType === 'exmine') {
        const nameArr = this.$refs.treeGrid.getTreeNodes()
        this.accountAddForm.roleExmine[this.getRoleIndex].orgIds = this.$refs.treeGrid.getTreeData()
        this.accountAddForm.roleExmine[this.getRoleIndex].roleNames = this._getAllName(nameArr)
      }
      if (this.showType === 'owner') {
        let nameArr = this.$refs.treeGrid.getTreeNodes()
        this.accountAddForm.roleOwner[this.getRoleIndex].orgIds = this.$refs.treeGrid.getTreeData().concat(this.$refs.treeGrid.getTreeHalfData())
        this.accountAddForm.roleOwner[this.getRoleIndex].roleNames = this._getAllName(nameArr)
      }
      this.treeVisible = false
    },
    _getAllName (arr) {
      let str = ''
      arr.forEach((item, index) => {
        str += item.name + ' '
      })
      return str
      // return arr.reduce((total, item) => total + ',' + item.account, '')
    },
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
    _getRoleGroup () {
      getRoleGroup().then(data => {
        if (data.result) {
          this.roleGroupSelect = data.result
          this.orgGroupSelect = data.result
        }
      })
    },
    _getRoleByLoginList () {
      getRoleByLogin(getToken('accountId')).then(data => {
        if (data.result && data.result.length) {
          data.result.forEach((item) => {
            this.loginNameOptions.push(item)
            this.orgLoginOptions.push(item)
          })
        }
      })
    },
    _saveRoleGroup () {
      let groupRoleParams = []
      this.accountAddForm.roleExmine.forEach((item) => {
        if (item.roleIds.length && item.roleNames && item.orgIds.length) {
          groupRoleParams.push({
            testId: item.roleIds,
            ids: item.orgIds,
            name: item.roleNames,
            id: item.id
          })
        }
      })
      let postParamsArr = []
      groupRoleParams.forEach(item => {
        item.testId.forEach(data => {
          let datas = data
          postParamsArr.push(Object.assign({ groupId: datas
          }, item))
        })
      })
      let getDatasParams = []
      postParamsArr.forEach(item => {
        getDatasParams.push({
          ids: (this.qcArray(item.ids)).join(','),
          // name: cutstr(item.roleGroupName, 80),
          name: cutstr(item.name, 80),
          id: item.id,
          groupId: item.groupId
        })
      })
      const groupParams = {
        userId: this.accountAddForm.name.split('~+@')[0],
        groups: getDatasParams,
        name: this.accountAddForm.name.split('~+@')[1]
        //  name: this.accountDetailForm.account
      }
      if (getDatasParams[0].groupId) {
        createRoleGroup(groupParams).then(data => {
          this.$router.replace('/setting/number-setting')
        })
      }
    },
    _saveAccount: debounce(function () {
      this.$refs.accountAddForm.validate(valid => {
        if (valid) {
          let flagTure1 = true
          let flagTure2 = true
          this.accountAddForm.roleExmine.forEach(item => {
            if (item.roleIds.length && !item.roleNames) {
              flagTure1 = false
            }
          })
          this.accountAddForm.roleOwner.forEach(item => {
            if (item.roleIds.length && !item.roleNames) {
              flagTure2 = false
            }
          })
          if (!flagTure1) {
            this.$message.warning('请选择审批角色分组对应的组织架构')
            return
          }
          if (!flagTure2) {
            this.$message.warning('请选择所属角色对应的组织架构')
            return
          }
          let accountRoleParams = []
          this.accountAddForm.roleOwner.forEach((item) => {
            accountRoleParams.push({
              roleIds: item.roleIds,
              orgLevel: item.roleNames,
              orgIds: item.orgIds
            })
          })
          let newOwnerIds = []
          accountRoleParams.forEach(item => {
            item.roleIds.forEach(data => {
              let datas = data
              newOwnerIds.push(Object.assign({ roleId: datas
              }, item))
            })
          })
          const newPostIds = []
          newOwnerIds.forEach(item => {
            newPostIds.push({
              roleId: item.roleId,
              orgLevel: cutstr(item.orgLevel, 120),
              orgIds: `${this.qcArray(item.orgIds)}`
            })
          })
          const accountParams = {
            sysUserInfo: {
              account: this.accountAddForm.account,
              id: this.accountAddForm.id,
              name: this.accountAddForm.name.split('~+@')[1],
              password: md5Encrypt('123456'),
              status: '1',
              userId: this.accountAddForm.name.split('~+@')[0],
              remark: this.accountAddForm.remark
            },
            accountRoleList: newPostIds
          }
          saveAccount(accountParams).then(data => {
            this.$message.success('新增成功')
            if (this.accountAddForm.roleExmine[0].roleIds && this.accountAddForm.roleExmine[0].roleIds.length) {
              this._saveRoleGroup()
            } else {
              this.$router.replace('/setting/number-setting')
            }
            setTimeout(() => {
              this.treeVisible = false
            }, 400)
          })
        }
      })
    }, 500),
    qcArray (arr) {
      var newArr = [arr[0]]
      for (var i = 1; i < arr.length; i++) {
        if (newArr.indexOf(arr[i]) === -1) {
          newArr.push(arr[i])
        }
      }
      return newArr
    },
    // 审批角色下拉框去重
    handleVisChange (val) {
      if (val) {
        let groupSelectArr = []
        this.roleGroupSelect = []
        this.accountAddForm.roleExmine.forEach(item => {
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
    // 所属角色下拉框去重
    handleLoginChange (val) {
      if (val) {
        let groupSelectArr = []
        this.loginNameOptions = []
        this.accountAddForm.roleOwner.forEach(item => {
          item.roleIds.forEach(data => {
            groupSelectArr.push(data)
          })
        })
        this.orgLoginOptions.forEach(item => {
          if (groupSelectArr.indexOf(item.id) === -1) {
            this.loginNameOptions.push(item)
          }
        })
      }
    },
    _getAllParentIds () {
      getAllOrganize().then(data => {
        this.parentIdBoxArr = []
        if (data.result && data.result.length) {
          data.result.forEach(item => {
            this.parentIdBoxArr.push(item.parentId.toString())
          })
        }
      })
    }
  },
  components: {
    AddressTree
  },
  created () {
    this._getUsetList()
    this._getRoleByLoginList()
    this._getRoleGroup()
    this._getAllParentIds()
  }
}
</script>

<style scoped lang="less">
@import '~assets/less/variable';
.accout-form{
  border: 1px solid #ebeef5;
  width: 90%;
  padding: 20px;
  .el-select{
     width:100%;
  }
}
.array-tree-div{
    height:36px;
    width: 100%;
    border:1px dotted @base-color;
    display:inline-block;
    line-height:32px;
    cursor: pointer;
    box-sizing: border-box;
    padding-left:20px;
    border-radius: 4px;
    span{
      color:#FF7500;
      font-size:12px;
    }
}
.icon-row{
  .icon-div{
    width:16px;
    height: 16px;
    float:right;
    margin-right:40px;
    cursor: pointer;
    i{
      color:@base-color;
      font-size:18px;
      font-weight:bold;
      transition: all 2s;
      &:hover{
        transform: scale(1.2)
      }
    }
  }
}
.name-and-icon-col{
   position: relative;
   i{
      position:absolute;
      right: 2px;
      top:-5px;
      color:@base-color;
      transition: all 2s;
      cursor: pointer;
      &:hover{
        transform: rotate(360deg)
      }
   }
}
</style>
