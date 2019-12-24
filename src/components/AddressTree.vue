<template>
  <div>
    <div class="tree-div">
      <el-input placeholder="请输入部门搜索" v-model="filterText"></el-input>
      <div>
        <el-tree
          :data="dataTree"
          :show-checkbox="showCheckBox"
          node-key="id"
          highlight-current
          :filter-node-method="filterNode"
          @check-change="checkChange"
          @current-change="currentChange"
          style="position:relative;height: 441px;overflow: auto;margin-top: 5px"
          :props="defaultProps"
          ref="originTree"
          :check-strictly = false
          @node-click="nodeClick">
        </el-tree>
      </div>
    </div>
  </div>
</template>
<script>
import { getAllOrganize } from 'static/api/common/common'
import { transData } from 'assets/js/common'
import { mapMutations } from 'vuex'
import { compare } from 'assets/js/getDatas'
export default {
  data () {
    return {
      filterText: '',
      dataTree: [],
      list: [],
      orgListDatas: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  props: {
    treeCheckArray: {
      type: Array
    },
    showCheckBox: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    ...mapMutations({
      getOrgId: 'SET_ORG_ID'
    }),
    /** 对树节点进行筛选操作**/
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    _getTreeData () {
      getAllOrganize().then(data => {
        if (data.result && data.result.length) {
          let dataDept = data.result.sort(compare('id'))
          this.getOrgId({ orgId: dataDept[0].id })
          this.dataTree = transData(dataDept, 'id', 'parentId', 'children')
        }
      })
    },
    checkChange (data, checked, child) {
      this.$emit('check-change', data, checked, child)
    },
    currentChange (data, node) {
      this.$emit('current-change', data, node)
    },
    clearSearchWords () {
      this.filterText = ''
    },
    clearTree () {
      this.$refs.originTree.setCheckedKeys([])
    },
    checkTree (array) {
      this.$refs.originTree.setCheckedKeys(array)
    },
    nodeClick (data, node, self) {
      this.$emit('node-click', data, node, self)
    },
    getTreeData () {
      return this.$refs.originTree.getCheckedKeys()
    },
    getTreeHalfData () {
      return this.$refs.originTree.getHalfCheckedKeys()
    },
    getTreeNodes () {
      return this.$refs.originTree.getCheckedNodes()
    }
  },
  watch: {
    filterText (val) {
      this.$refs.originTree.filter(val)
    }
  },
  created () {
    this._getTreeData()
  }
}
</script>
<style lang="less">
</style>
