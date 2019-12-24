<template>
<div class="search-tree_box"
  @foucs="orgDatas.showTree = true"
>
 <div class="search-tree_div">
  <!-- <div class="search-tree_search_item"
  @click.stop="orgDatas.showTree = true"
  >
    <el-input v-model="orgDatas.filterName"
    :placeholder="placeTxt"
    @focus="orgDatas.showTree = true"
    @input="filterNodeTree"
    style="width:100%"
    ></el-input> -->
    <el-popover
        placement="bottom"
        width="400"
        trigger="click">
         <el-input v-model="orgDatas.filterName"
          @input="filterNodeTree"
          :placeholder="placeTxt"
          style="width:100%"
         slot="reference"/>
  <div
  class="scroll-infor"
  style="background: #fff;max-height: 280px;overflow:auto;margin-top: 5px;width:100%;min-width:200px">
        <el-tree
        class="filter-tree"
        :data="orgDatas.dataTree"
        node-key="id"
        :props="orgDatas.bindData === 'marketReport' ? defaultMarketProps : defaultProps"
         @node-click="nodeClick"
        show-checkbox
        :filter-node-method="filterNode"
        @check-change="selectChange"
        ref="searchTree"
        :check-strictly="true"
        :default-expanded-keys="defaultExpandedKeys"
        @node-expand="nodeExpand"
        @node-collapse="nodeCollapse"
        >
        </el-tree>
  </div>
    </el-popover>
 </div>
 </div>
</template>
<script>
import { getDeptTreelist } from 'static/api/common/common'
import { getMarketReportTree } from 'static/api/report/index'
// import { getPostCompanyName } from 'static/api/verify/transfer/transfer'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      defaultExpandedKeys: [],
      checkeTree: true,
      childrenIds: [],
      defaultMarketProps: {
        children: 'node',
        label: 'name'
      }
    }
  },
  props: {
    placeTxt: {
      type: String,
      default: '请输入要查找的公司/组织'
    },
    orgDatas: {
      type: Object,
      filterName: {
        type: String
      },
      orgId: {
        type: String
      },
      dataTree: {
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
    ...mapGetters(['getUserOrgId', 'getTransferId']),
    treeParams () {
      return { isLimit: this.orgDatas.isLimit ? this.orgDatas.isLimit : '1' }
    },
    defaultProps () {
      return this.orgDatas.bindData === 'company' || this.orgDatas.bindData === 'different' ? {
        children: 'sysDeptListVO',
        disabled: function (data, node) {
          return data.checked
        },
        label: function (children) {
          return children.sysDept.name
        }
      } : {
        children: 'sysDeptListVO',
        label: function (children) {
          return children.sysDept.name
        }
      }
    }
  },
  methods: {
    blurData (e) {
      const targetValue = e.target.value
      const filters = this.findItemNames(this.orgDatas.dataTree, targetValue)
      if ((!filters || !filters.length) && !this.checkeTree) {
        this.orgDatas.filterName = ''
        this.$message.warning('没有对应的组织架构，请重新搜索')
        this.filterNodeTree('')
        this.$emit('update:btnMessage', false)
      } else {
        this.$emit('update:btnMessage', true)
      }
    },
    findItemNames (arr, name) {
      const arrNames = []
      function findNames (array) {
        array.forEach(item => {
          // console.log('item', item)
          if (item.name.indexOf(name) !== -1) {
            // console.log('item', item.name)
            arrNames.push(item.name)
          }
          if (item.children && item.children.length) {
            findNames(item.children)
          }
        })
      }
      findNames(arr)
      return arrNames
    },
    nodeClick (data, node, self) {
      this.checkeTree = true
      // if (!node.isLeaf) {
      //   const childNodes = node.childNodes
      //   childNodes.forEach(child => {
      //     child.visible = true
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
      this.loopFindChildrenId(data.sysDeptListVO)
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
    filterNodeTree (value) {
      this.checkeTree = false
      if (value) {
        this.$refs.searchTree.filter(value)
        // if (!filters || !filters.length) this.checkeTree = false
      } else {
        this.$refs.searchTree.setCheckedKeys([])
        this._getAllOrganzation()
        this.orgDatas.filterName = ''
        this.orgDatas.orgId = ''
        this.$emit('selectChange', '')
      }
    },
    selectChange (data, checked) {
      if (checked) {
        this.$refs.searchTree.setCheckedKeys([])
        this.$refs.searchTree.setChecked(data, true)
        this.orgDatas.filterName = data.name
        this.orgDatas.orgId = data.id
        this.$store.commit('SET_INFO_BY_ORG_ID', data.id)
        this.$store.commit('SET_HRBELONGID', data.sysDept.hrBelongId ? data.sysDept.hrBelongId : data.sysDept.companyId)
        this.$emit('selectChange', data.id, data.name)
        this.checkeTree = true
      } else {
        this.$store.commit('SET_INFO_BY_ORG_ID', '')
        this.$store.commit('SET_HRBELONGID', '')
      }
      if (this.$refs.searchTree.getCheckedKeys().length === 0) {
        this.orgDatas.filterName = ''
        this.orgDatas.orgId = ''
        this.$emit('selectChange', '')
      }
    },
    _getAllOrganzation () {
      if (this.orgDatas.bindData === 'company') {
        this.getCompany('1')
      } else if (this.orgDatas.bindData === 'market') {
        this.getCompany('2')
      } else if (this.orgDatas.bindData === 'noMarket') {
        this.getCompany('3')
      } else if (this.orgDatas.bindData === 'orgTree') {
        this.getCompany('4')
      } else if (this.orgDatas.bindData === 'different') {
        this.getCompany('5')
      } else if (this.orgDatas.bindData === 'dept') {
        this.getDept(this.getUserOrgId)
      } else if (this.orgDatas.bindData === 'transfer') {
        this.getDept(this.getTransferId)
      } else if (this.orgDatas.bindData === 'marketReport') {
        getMarketReportTree().then(data => {
          this.orgDatas.dataTree = []
          data.result.forEach(item => {
            this.orgDatas.dataTree.push(item)
          })
        })
      } else {
        getDeptTreelist(this.treeParams).then(data => {
          if (data.result) {
            this.orgDatas.dataTree = []
            data.result.forEach(item => {
              this.orgDatas.dataTree.push({
                sysDept: item.sysDept,
                sysDeptListVO: item.sysDeptListVO
              })
            })
            this._setIdAndNames(this.orgDatas.dataTree)
            if (this.orgDatas.disabled) {
              console.log('3123')
              this.setDisableValue(this.orgDatas.dataTree)
            }
          }
        })
      }
    },
    setDisableValue (arr) {
      arr.forEach(item => {
        if (item.sysDeptListVO && item.sysDeptListVO.length) {
          item.disabled = true
          this.setDisableValue(item.sysDeptListVO)
        }
      })
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
    getCompany (type) {
      this.orgDatas.dataTree = []
      let comParams = {
        isLimit: this.orgDatas.isLimit ? this.orgDatas.isLimit : '1'
      }
      if (type === '1') {
        // comParams.isCompany = 1
        comParams.isMarketLeader = 1
      } else if (type === '2') {
        comParams.isMarketing = 1
      } else if (type === '3') {
        comParams.isMarketing = 0
      } else if (type === '4') {
        comParams.isCompany = 1
        comParams.isMarketLeader = 0
      } else if (type === '5') { // 工资发放主体，合同异地签 社保异地签
        // comParams.isCompany = 1
      }
      getDeptTreelist(comParams).then(data => {
        if (data.result) {
          data.result.forEach(item => {
            this.orgDatas.dataTree.push({
              sysDept: item.sysDept,
              disabled: item.sysDept.isCompany !== 1,
              sysDeptListVO: item.sysDeptListVO
            })
          })
          this._setIdAndNames(this.orgDatas.dataTree)
          if (type === '5' || type === '1') {
            this.setIscompany(this.orgDatas.dataTree)
          }
          if (this.orgDatas.disabled) {
            this.setDisableValue(this.orgDatas.dataTree)
          }
        }
      })
    },
    clearSelectTree () {
      this.$refs.searchTree.setCheckedKeys([])
    },
    getDept (id) {
      this.orgDatas.dataTree = []
      let deptParams = {
        isLimit: this.orgDatas.isLimit ? this.orgDatas.isLimit : '1',
        // isCompany: 0,
        isMarketLeader: 0,
        id
      }
      getDeptTreelist(deptParams).then(data => {
        if (data.result) {
          data.result.forEach(item => {
            this.orgDatas.dataTree.push({
              sysDept: item.sysDept,
              sysDeptListVO: item.sysDeptListVO
            })
          })
          this._setIdAndNames(this.orgDatas.dataTree)
          if (this.orgDatas.disabled) {
            this.setDisableValue(this.orgDatas.dataTree)
          }
        }
      })
    },
    setIscompany (arr) {
      arr.forEach(item => {
        item.checked = item.sysDept.isCompany !== 1 && item.sysDept.isMarketLeader !== 1
        if (item.sysDeptListVO && item.sysDeptListVO.length) {
          this.setIscompany(item.sysDeptListVO)
        }
      })
    }
  },
  watch: {
    'orgDatas.orgId' (value) {
      this.$refs.searchTree.setCheckedKeys([value])
    },
    getTransferId (value) {
      if (value) {
        this.getDept(this.getTransferId)
        this.$refs.searchTree.setCheckedKeys([value])
      }
    }
  },
  created () {
    this._getAllOrganzation()
    setTimeout(() => {
      setTimeout(() => {
        this.$refs.searchTree.setCheckedKeys([this.orgDatas.orgId])
      }, 200)
    }, 200)
  }
}
</script>
<style scoped lang="less">
.search-tree_box{
    position: relative;
    width:100%;
    height:100%;
    z-index:100;
    .search-tree_div{
        width:100%;
        position: absolute;
        top:0px;
    }
 &/deep/.el-tree-node>.el-tree-node__children{
   overflow: inherit;
 }
}
</style>
