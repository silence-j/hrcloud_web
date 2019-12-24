<template>
  <div class="role-detail-box">
     <el-form
    :model="roleForm"
    ref="roleForm"
    label-width="100px">
     <el-form-item
      prop="roleName"
      :rules=" { required: true, message: '角色名称不能为空', trigger: ['change', 'blur'] }"
      label="角色名称:">
     <el-input v-model="roleForm.roleName"></el-input>
     </el-form-item>
     <el-form-item label="角色说明:">
       <el-input
         v-model="roleForm.remark"
         type="textarea"
         :row="4"
        ></el-input>
    </el-form-item>
    <el-form-item label="是否启用:">
    <el-switch
      v-model="roleForm.enable"
      on-text="是"
       off-text="否">
     </el-switch>
    </el-form-item>
    <el-form-item label="权限配置:">
              <div style="height:460px;">
                <el-scrollbar style="height:100%;">
                <el-tree
                  :data="dataRoleTree"
                  node-key="id"
                  ref="roleTree"
                  show-checkbox
                  @check-change="handleCheckChange"
                  @node-expand= "nodeClick"
                  :props="defaultProps"
                ></el-tree>
                </el-scrollbar>
              </div>
            </el-form-item>
     </el-form>
  </div>
</template>
<script>
import { getToken } from 'assets/js/util'
import { transData } from 'assets/js/common'
export default {
  props: {
    roleForm: {
      type: Object
    }
  },
  data () {
    return {
      ids: [],
      allIds: [],
      defaultProps: {
        children: 'children',
        label: 'NAME'
      },
      dataRoleTree: []
    }
  },
  methods: {
    getHalfCheckedKeys () {
      return this.$refs.roleTree.getHalfCheckedKeys()
    },
    getCheckedKeys () {
      return this.$refs.roleTree.getCheckedKeys()
    },
    getOweerCheckKeys () {
      return this.$refs.roleTree.getCheckedKeys().filter(x => this.allIds.indexOf(`${x}`) !== -1)
    },
    setCheckedKeys (arr) {
      this.$refs.roleTree.setCheckedKeys(arr)
    },
    validate () {
      let valid1 = false
      this.$refs.roleForm.validate(valid => { valid1 = valid })
      return valid1
    },
    handleCheckChange (data, checked, child) {
      if (checked) {
        this.ids.push(data.id, (data.parentId).toString())
      } else {
        if (this.ids.indexOf(data.id) !== -1) this.ids.splice(this.ids.indexOf(data.id), 1)
      }
    },
    nodeClick () {
      this.setDomStyle()
    },
    setDomStyle () {
      setTimeout(() => {
        const elements = document.getElementsByClassName('is-leaf')
        Array.from(elements).forEach((element) => {
          element.parentNode.parentNode.style.float = 'left'
          element.parentNode.parentNode.style.width = '136px'
          element.parentNode.style.paddingLeft = '0px'
          element.parentNode.style.marginLeft = '36px'
        })
      })
    },
    _findIdNonParent (arr) {
      let childrenIds = []
      function findIds (array) {
        array.forEach(item => {
          if (!item.children) {
            childrenIds.push(item.id)
          }
          if (item.children && item.children.length) {
            findIds(item.children)
          }
        })
      }
      findIds(arr)
      return childrenIds
    },
    _getRoleMenu () {
      const menus = JSON.parse(getToken('meauList'))
      if (menus) {
        setTimeout(() => {
          this.dataRoleTree = transData(menus, 'id', 'parentId', 'children')
          this.allIds = this._findIdNonParent(this.dataRoleTree)
        }, 200)
      }
    }
  },
  created () {
    this._getRoleMenu()
  }
}
</script>

<style scoped lang="less">
  /*&/deep/.el-tree-node__content{*/
    /*width: 800px!important;*/
  /*}*/
  &/deep/.el-tree {
    .el-tree-node:nth-child(3), .el-tree-node:nth-child(7), .el-tree-node:nth-child(8) {
      .el-tree-node__children {
        .el-tree-node:last-child {
          .el-tree-node__content {
            margin-left: 18px !important;
          }
        }
      }
    }
    .el-tree-node:nth-child(6) {
      .el-tree-node__children {
        .el-tree-node:nth-child(3), .el-tree-node:nth-child(4), .el-tree-node:nth-child(5),
        .el-tree-node:nth-child(6), .el-tree-node:nth-child(7), .el-tree-node:nth-child(8),
        .el-tree-node:nth-child(9), .el-tree-node:nth-child(10) {
          width: 180px !important;
          .el-tree-node__content {
            margin-left: 18px !important;
          }
        }
        .el-tree-node:nth-child(11) {
          clear: both !important;
        }
      }
    }
  }
.role-detail-box{
   width: 90%;
    height: auto;
    border: 1px solid #c6c6c6;
    padding: 30px 15px 30px 15px
}
</style>
