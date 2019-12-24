<!--该组件逐步废弃换用SearchDeptTree-->
<template>
  <div class="tree-wrap" :style="{zIndex:ZIndex}">
    <div class="tree-div">
      <div class="ipt-show-box" @click.stop="showTree">
        <el-input :placeholder="placeholderTxt" v-model="filterText" style="width:100%" @input="watchDeptTree"></el-input>
        <el-input v-model='serTreeId' style="display: none"></el-input>
        <el-input v-model='allCheckDeptId' style="display: none"></el-input>
      </div>
      <div v-show="showTreeTag" class="scroll-infor"
      style="background: #fff;max-height: 280px;overflow:auto;margin-top: 5px;width:100%;min-width:200px">
        <el-tree
          :data="dataTree"
          show-checkbox
          node-key="id"
          highlight-current
          :filter-node-method="filterNode"
          @check-change="selectChange"
          style="position:relative;"
          class="scroll-infor"
          :props="defaultProps"
          ref="searchTree"

          :check-strictly="strictTrue">
        </el-tree>
      </div>
    </div>
  </div>
</template>
<script>
import { getAllOrganize, getAllNoSysCompany, getReveiveOrg } from 'static/api/common/common'
import { transData } from 'assets/js/common'
import { compare } from 'assets/js/getDatas'
import { getPostCompanyName } from 'static/api/verify/transfer/transfer'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      allDeptIdArr: [],
      allNameArr: [],
      searchDept: true,
      filterText: '',
      serTreeId: '',
      allCheckDeptId: '',
      dataTree: [],
      list: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  props: {
    strictTrue: {
      type: Boolean,
      default: true
    },
    multSelect: {
      type: Boolean,
      default: true
    },
    showTreeTag: {
      type: Boolean,
      default: false
    },
    bindData: {
      type: String
    },
    newOrgId: {
      type: String
    },
    ZIndex: {
      type: Number,
      default: 100
    },
    placeholderTxt: {
      type: String,
      default: '输入部门名称'
    }
  },
  computed: {
    ...mapGetters(['getTreeSingleCheckedName',
      'getTreeSingleCheckedVal',
      'getTreeSingleCheckedOrgId',
      'getCompanyType',
      'getUserOrgId'])
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
      if (checked) {
        this.$refs.searchTree.setCheckedKeys([])
        this.$refs.searchTree.setChecked(data, true)
        this.$store.dispatch('setSingleCheckedData', data.id)
        this.$store.dispatch('setSingleTreeCheckedName')
        this.serTreeId = data.id + '-' + data.name
        this.$emit('changeSerId', data.id + '-' + data.name)
        this.$store.commit('SET_INFO_BY_ORG_ID', data.id)
      } else {
        this.$emit('nonChangeSerId')
        this.filterText = ''
        this.$store.commit('SET_SINGLE_CHECKED_ORGID', '')
      }
    },
    /** 获取树结构信息**/
    _getTreeData () {
      if (this.getCompanyType === 'company' || this.bindData === 'company') {
        this.getCompany('1')
      } else if (this.getCompanyType === 'marking' || this.bindData === 'marking') {
        this.getCompany('2')
      } else if (this.getCompanyType === 'noMarking' || this.bindData === 'noMarking') {
        this.getCompany('3')
      } else if (this.getCompanyType === 'dept' || this.bindData === 'dept') {
        this.getDept()
      } else if (this.getCompanyType === 'transfer') {
        this.getTransfer(this.getTreeSingleCheckedOrgId)
      } else if (this.getCompanyType === 'transferDis') {
        getAllOrganize().then(data => {
          if (data.result && data.result.length) {
            let orgData = data.result
            let dataDept = data.result.sort(compare('id'))
            this.dataTree = transData(dataDept, 'id', 'parentId', 'children')
            this.dataTree[0].disabled = true
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
      if (!value) {
        this.$refs.searchTree.setCheckedNodes([])
        this.filterText = ''
        this.serTreeId = '-'
        this.allCheckDeptId = ''
        this._getTreeData()
      } else {
        this.$refs.searchTree.filter(this.filterText)
      }
    },
    getDept () {
      this.dataTree = []
      let deptParams = {
        userOrgId: this.getUserOrgId
      }
      getPostCompanyName(deptParams).then(data => {
        if (data.result && data.result.length) {
          let orgData = data.result
          let dataDept = data.result.sort(compare('id'))
          this.dataTree = transData(dataDept, 'id', 'parentId', 'children')
          this.$store.commit('SET_TREE_CHECKED_ALL_ORGIDS', orgData)
        }
      })
    },
    getCompany (type) {
      this.dataTree = []
      let comParams = {}
      if (type === '1') {
        comParams.isCompany = 1
      } else if (type === '2') {
        comParams.isMarketing = 1
      } else if (type === '3') {
        comParams.isMarketing = 0
      }
      getAllNoSysCompany(comParams).then(data => {
        if (data.result && data.result.length) {
          let orgData = data.result
          let dataDept = data.result.sort(compare('id'))
          this.dataTree = transData(dataDept, 'id', 'parentId', 'children')
          this.$store.commit('SET_TREE_CHECKED_ALL_ORGIDS', orgData)
        }
      })
    },
    getTransfer (parentId) {
      this.showTransfer = true
      let transferParams = {
        parentId: parentId
      }
      getReveiveOrg(transferParams).then(data => {
        if (data.result && data.result.length) {
          let orgData = data.result
          let dataTransfer = data.result.sort(compare('id'))
          this.dataTree = transData(dataTransfer, 'id', 'parentId', 'children')
          this.$store.commit('SET_TREE_CHECKED_ALL_ORGIDS', orgData)
        }
      })
    },
    setValAndName (name, data) {
      this.filterText = name
      // this.$refs.searchTree.setCheckedNodes(new Array(Number(data)))
      this.$refs.searchTree.setCheckedKeys([data])
    },
    setValAll (data) {
      this.$refs.searchTree.setCheckedNodes(new Array(data))
      // this.$refs.searchTree.setCheckedNodes(data)
    }
  },
  watch: {
    serTTreeId (val) {
      this.$emit('changeSerId', val)
    },
    allCheckDeptId (val) {
      this.$emit('getAllDeptId', val)
    },
    filterText (val) {
      this.$emit('getChangeVal', val)
    },
    getTreeSingleCheckedOrgId (value) {
      if (value) {
        setTimeout(() => {
          this.setValAndName(this.getTreeSingleCheckedName, value)
        }, 200)
      }
    }
  },
  created () {
    this._getTreeData()
    setTimeout(() => {
      this.setValAndName(this.getTreeSingleCheckedName, this.getTreeSingleCheckedOrgId)
    }, 300)
  }
}
</script>
<style scoped lang="less">
  .tree-wrap{
    position: relative;
    width:100%;
    height:100%;
    z-index:100;
    .tree-div{
      width:100%;
      position: absolute;
      top:0px;
    }
    &/deep/.el-tree-node>.el-tree-node__children{
      overflow: inherit;
    }
  }
</style>
