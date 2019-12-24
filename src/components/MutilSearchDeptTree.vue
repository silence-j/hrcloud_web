<template>
<div class="tree-wrap"
:style="{zIndex:ZIndex}"
@foucs="mutilTreeData.showTree = true"
>
 <div class="tree-div">
   <div class="ipt-show-box"
  @click.stop="mutilTreeData.showTree = true"
  >
    <el-input
    v-model="filterNames"
    :placeholder="placeTxt"
    @focus="mutilTreeData.showTree = true"
    @input="filterNodeTree"
    style="width:100%"
    ></el-input>
  <div
  class="scroll-infor"
  v-show="mutilTreeData.showTree"
  style="background: #fff;max-height: 280px;overflow:auto;margin-top: 5px;width:100%;min-width:200px;resize:auto">
        <!-- :default-expanded-keys="defaultExpandedKeys"-->
        <el-tree
        class="filter-tree"
        :data="mutilTreeData.dataTree"
        node-key="id"
        :props="mutilTreeData.bindData === 'marketReport' ? defaultMarketProps : defaultProps"
        show-checkbox
        :filter-node-method="filterNode"
        @check-change="selectChange"
        ref="searchTree"
        @node-click="nodeClick"
        @node-expand="nodeExpand"
        @node-collapse="nodeCollapse"
        :auto-expand-parent="false"
        >
        </el-tree>
  </div>
 </div>
 </div>
</div>
</template>
<script>
import { getDeptTreelist } from 'static/api/common/common'
import reportApi from 'api/report'
import { uniq } from 'lodash'
export default {
  data () {
    return {
      filterNames: '',
      defaultExpandedKeys: [],
      childrenIds: [],
      defaultProps: {
        children: 'sysDeptListVO',
        label: function (children) {
          return children.sysDept.name
        }
      },
      defaultMarketProps: {
        children: 'units',
        label: 'name'
      }
    }
  },
  props: {
    placeTxt: {
      type: String,
      default: '请输入要查找的公司/组织'
    },
    ZIndex: {
      type: Number,
      default: 100
    },
    mutilTreeData: {
      type: Object,
      filterName: {
        type: String
      },
      orgIds: {
        type: Array
      },
      reportOrgIds: {
        type: Array
      },
      dataTree: {
        type: Array
      },
      checkDatas: {
        type: Array
      },
      bindData: {
        type: String
      },
      showTree: {
        type: Boolean,
        default: false
      },
      isLimit: {
        type: String,
        default: '1'
      }
    }
  },
  computed: {
    // filterNames () {
    //   return this.mutilTreeData.checkDatas.reduce((currentTotalName, item) => currentTotalName + item.name + ' ', '')
    // },
    treeParams () {
      return { isLimit: this.mutilTreeData.isLimit ? this.mutilTreeData.isLimit : '1' }
    }
  },
  methods: {
    transferDefaultTree (tree) {
      let treeData = []
      tree.forEach((data, index) => {
        data.index = '0' + (index + 1)
        data.active = false
        data.uuid = data.uuid ? data.uuid : data.id
        if (data.units) {
          data.units.forEach(unit => {
            unit.units = unit.companys
            unit.parentId = data.id
            unit.uuid = unit.uuid ? unit.uuid : unit.id
            unit.active = false
            if (unit.companys.length) {
              unit.companys.forEach(com => {
                com.active = false
                com.units = com.depts
                com.parentId = unit.id
                com.uuid = com.uuid ? com.uuid : com.id
                if (com.depts.length) {
                  com.depts.forEach(dept => {
                    dept.active = false
                    dept.units = dept.deptGroup
                    dept.parentId = com.id
                    dept.uuid = dept.uuid ? dept.uuid : dept.id
                  })
                }
              })
            }
          })
        }
        treeData.push(data)
      })
      return treeData
    },
    nodeClick (data, node, self) {
      // if (!node.isLeaf) {
      //   const childNodes = node.childNodes
      //   childNodes.forEach(child => {
      //     child.visible = true
      //     child.expanded = false
      //     child.expand()
      //   })
      // }
    },
    // 节点展开收缩给默认的展开数组添加减少对应的值
    nodeExpand (data, node, self) {
      let selfId = data.id
      this.defaultExpandedKeys.push(selfId)
    },
    nodeCollapse (data, node, self) {
      this.childrenIds = [data.id]
      this.loopFindChildrenId(this.mutilTreeData.bindData === 'marketReport' ? data.units : data.sysDeptListVO)
      let dArr = []
      this.defaultExpandedKeys.forEach(item => {
        if (this.childrenIds.indexOf(item) === -1) {
          dArr.push(item)
        }
      })
      this.defaultExpandedKeys = dArr
      // let selfId = data.id
      // if (this.defaultExpandedKeys.indexOf(selfId) !== -1) { this.defaultExpandedKeys.splice(this.defaultExpandedKeys.indexOf(selfId), 1) }
    },
    // 循环遍历找到所有的子节点
    loopFindChildrenId (data) {
      data.forEach(item => {
        this.childrenIds.push(item.id)
        if (item.sysDeptListVO) {
          this.loopFindChildrenId(item.sysDeptListVO)
        }
      })
    },
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    clearFilterName () {
      this.filterNames = ''
    },
    filterNodeTree (value) {
      this.filterNames = value
      if (value) {
        this.$refs.searchTree.filter(value)
      } else {
        this.$refs.searchTree.setCheckedKeys([])
        this._getAllOrganzation()
      }
    },
    _findListIds (arr) {
      const ids = []
      function findIds (array) {
        array.forEach(item => {
          if (!item.units || !item.units.length) {
            ids.push(`${item.id}`)
          } else {
            findIds(item.units)
          }
        })
      }
      findIds(arr)
      return ids
    },
    selectChange (data, checked) {
      this.mutilTreeData.orgIds = this.$refs.searchTree.getCheckedKeys()
      this.mutilTreeData.reportOrgIds = uniq(this._findListIds(this.$refs.searchTree.getCheckedNodes()))
      this.mutilTreeData.checkDatas = this.$refs.searchTree.getCheckedNodes()
      this.$emit('selectChange', this.$refs.searchTree.getCheckedKeys())
      this.$emit('selectParent', this.mutilTreeData.bindData !== 'marketReport' ? data.sysDept.parentId : '')
      this.filterNames = this.mutilTreeData.checkDatas.reduce((currentTotalName, item) => currentTotalName + item.name + ' ', '')
      // console.log(this.$refs.searchTree.getCheckedNodes())
      if (this.$refs.searchTree.getCheckedNodes().length === 0) {
        // this._getAllOrganzation()
        this.$emit('selectChange', '')
        this.$emit('selectParent', '')
      }
    },
    // 把id和name抽出来
    _setIdAndNames (item) {
      item.forEach(data => {
        delete data.id
        delete data.name
        data.id = data.sysDept.id
        data.name = data.sysDept.name
        if (data.sysDeptListVO) {
          this._setIdAndNames(data.sysDeptListVO)
        }
      })
    },
    _getAllOrganzation () {
      if (this.mutilTreeData.bindData === 'company') {
        this.getCompany()
      } else if (this.mutilTreeData.bindData === 'marketReport') {
        reportApi.getHrOrgTreeByLogin().then(data => {
          this.mutilTreeData.dataTree = this.transferDefaultTree(data.result)
          // this.$refs.searchTree.setCheckedKeys(this.mutilTreeData.orgIds)
        })
      } else {
        getDeptTreelist(this.treeParams).then(data => {
          if (data.result) {
            this.mutilTreeData.dataTree = []
            data.result.forEach(item => {
              this.mutilTreeData.dataTree.push({
                sysDept: item.sysDept,
                sysDeptListVO: item.sysDeptListVO
              })
            })
            // this.$refs.searchTree.setCheckedKeys(this.mutilTreeData.orgIds)
            this._setIdAndNames(this.mutilTreeData.dataTree)
          }
        })
      }
    },
    clearSelectTree () {
      this.$refs.searchTree.setCheckedKeys([])
    },
    getCompany () {
      let comParams = {
        isCompany: 1,
        isMarketLeader: 1,
        isLimit: this.mutilTreeData.isLimit ? this.mutilTreeData.isLimit : '1'
      }
      getDeptTreelist(comParams).then(data => {
        if (data.result) {
          this.mutilTreeData.dataTree = []
          data.result.forEach(item => {
            this.mutilTreeData.dataTree.push({
              sysDept: item.sysDept,
              sysDeptListVO: item.sysDeptListVO
            })
          })
          // this.$refs.searchTree.setCheckedKeys(this.mutilTreeData.orgIds)
        }
      })
    },
    _setCheckedKeys (checkKeys) {
      const checkedKeys = Array.isArray(checkKeys) ? checkKeys : checkKeys.split(',') || []
      setTimeout(() => {
        this.mutilTreeData.orgIds = checkedKeys
        this.$refs.searchTree.setCheckedKeys(checkedKeys)
        if (!checkedKeys.length) {
          this.filterNames = ''
        } else {}
      }, 400)
      //
    }
  },
  created () {
    this._getAllOrganzation()
    // setTimeout(() => {
    //   setTimeout(() => {
    //     this.$refs.searchTree.setCheckedKeys(this.mutilTreeData.orgIds)
    //   }, 200)
    // }, 200)
  }
}
</script>
<style scoped lang="less">
  .tree-wrap{
    position: relative;
    width:100%;
    height: 100%;
    z-index:100;
    .tree-div{
      width:100%;
      position: absolute;
      top:0px;
    }
  }
  &/deep/.el-tree-node>.el-tree-node__children{
    overflow: inherit;
  }
</style>
