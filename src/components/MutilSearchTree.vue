<!--该组件逐步废弃换用MutilSearchDeptTree组件-->
<template>
  <div class="tree-wrap" :style="{zIndex:ZIndex}">
    <div class="tree-div">
      <div class="ipt-show-box"
      @click.stop="showTree"
      >
        <el-input
        placeholder="输入部门名称"
        v-model="filterText"
        style="width:100%"
        :disabled="isAbled"
        @input="watchDeptTree">
        </el-input>
        <el-input v-model='serTreeId' style="display: none"></el-input>
      </div>
      <div v-show="!isAbled&&showTreeTag"
      class="scroll-infor"
      style="background: #fff;max-height: 480px;overflow: auto;margin-top: 5px;width:100%;min-width:200px;">
        <el-tree
          :data="dataTree"
          show-checkbox
          :disabled="isAbled"
          node-key="id"
          highlight-current
          :filter-node-method="filterNode"
          @check-change="selectChange"
          style="position:relative;width:100%;"
          class="scroll-infor"
          :props="defaultProps"
          ref="searchTree"
         >
        </el-tree>
      </div>
    </div>
  </div>
</template>
<script>
import { getAllOrganize } from 'static/api/common/common'
import { transData } from 'assets/js/common'
import { compare } from 'assets/js/getDatas'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      allNameArr: [],
      allDeptIdArr: [],
      filterText: '',
      serTreeId: '',
      dataTree: [],
      list: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  props: {
    isAbled: {
      type: Boolean,
      default: false
    },
    isCompany: String,
    disabled: {
      type: Boolean,
      default: false
    },
    showTreeTag: {
      type: Boolean,
      default: false
    },
    ZIndex: {
      type: Number,
      default: 100
    }
  },
  mounted () {
    /* console.log('jioji', this.disabled) */
  },
  computed: {
    ...mapGetters(['getTreeCheckedName', 'getTreeCheckedVal', 'getTreeCheckedOrgIds'])
  },
  methods: {
    /** this.$emit("自定义事件名",要传送的数据)**/
    showTree () {
      this.$emit('show-tree')
    },
    /** 对树节点进行筛选操作**/
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    /** 节点选中状态发生变化时的回调**/
    selectChange (data, checked) {
      this.allDeptIdArr = this.$refs.searchTree.getCheckedKeys()
      this.$emit('getAllDept', this.allDeptIdArr)
      this.$emit('getAllDeptData', this.$refs.searchTree.getCheckedNodes())
      this.$store.dispatch('setTreeCheckedData', this.allDeptIdArr)
      this.$store.dispatch('setTreeCheckedName')
    },
    /** 获取树结构信息**/
    _getTreeData () {
      if (this.isCompany && this.isCompany === '1') {
        getAllOrganize({ isCompany: 1 }).then(data => {
          if (data.result && data.result.length) {
            let orgData = data.result
            let dataDept = data.result.sort(compare('id'))
            this.dataTree = transData(dataDept, 'id', 'parentId', 'children')
            this.$store.commit('SET_TREE_CHECKED_ALL_ORGIDS', orgData)
          }
        })
      } else {
        getAllOrganize().then(data => {
          if (data.result && data.result.length) {
            let orgData = data.result
            let dataDept = data.result.sort(compare('id'))
            this.dataTree = transData(dataDept, 'id', 'parentId', 'children')
            this.$store.commit('SET_TREE_CHECKED_ALL_ORGIDS', orgData)
          }
        })
      }
    },
    watchDeptTree (value) {
      if (this.disabled) {
      } else {
        if (!value) {
          this.$refs.searchTree.setCheckedNodes([])
          this.$refs.searchTree.setCheckedNodes([])
          this.filterText = ''
          this.serTreeId = '-'
          // this._getTreeData()
        } else {
          this.$refs.searchTree.filter(this.filterText)
        }
      }
    },
    setValAndName (name, data) {
      this.filterText = name
      // this.$refs.searchTree.setCheckedNodes(new Array(Number(data)))
      this.$refs.searchTree.setCheckedKeys(data)
    },
    setValAll (data) {
      /* console.log('data', data) */
      this.$refs.searchTree.setCheckedNodes(data)
      // this.$refs.searchTree.setCheckedNodes(data)
    },
    getCheckedNodes () {
      return this.$refs.searchTree.getCheckedNodes()
    }
  },
  watch: {
    serTreeId (val) {
      this.$emit('changeSerId', val)
    },
    filterText (val) {
      this.$emit('getChangeVal', val)
    },
    getTreeCheckedOrgIds (val) {
      if (val) {
        // this.$store.dispatch('setTreeCheckedName')
        setTimeout(() => {
          this.setValAndName(this.getTreeCheckedName, val)
        }, 200)
      }
      // setTimeout(() => {
      //   this.setValAndName(this.getTreeCheckedName, val)
      // }, 200)
      this.$store.commit('SET_TREE_CHECKED_VAL', false)
    }
    // getTreeCheckedVal (val) {
    //   if (val) {
    //     setTimeout(() => {
    //       this.setValAndName(this.getTreeCheckedName, this.getTreeCheckedOrgIds)
    //     }, 400)
    //     this.$store.commit('SET_TREE_CHECKED_VAL', false)
    //   }
    // }
  },
  created () {
    this._getTreeData()
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
