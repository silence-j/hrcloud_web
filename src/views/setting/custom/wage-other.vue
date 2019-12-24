<template>
  <div class="otherSalary">
    <div class="add-btn">
      <el-button class="marBottom" size="mini" type="primary" v-show="permission.indexOf('新增')!==-1" @click="addSalary">新增</el-button>
    </div>
    <el-tree
      :data="salayTree"
      :default-expanded-keys="defaultExpandedKeys"
      node-key="id"
      @node-expand="nodeExpand"
      @node-collapse="nodeCollapse"
      :props="defaultProps"
      @node-click="handleNodeClick">
       <span class="custom-tree-node" slot-scope="{ node, data }">
         <span class="node-label">{{node.label}}<a style="color:red" v-if="data.enable === '0'">（已停用）</a></span>
        <span class="tree-btns clearfix">
          <el-button
            type="text"
            size="mini"
             v-if="permission.indexOf('新增')!==-1&&data.enable === '1' && data.isEnd !=='1'"
            @click="(e) => addTree(e,node, data, '1')">
            新增
          </el-button>
          <el-button
            type="text"
            size="mini"
             v-if="permission.indexOf('编辑')!==-1&&data.enable === '1'"
            @click="(e) => addTree(e,node, data, '2')">
            编辑
          </el-button>
          <el-button
            type="text"
            size="mini"
            v-if="permission.indexOf('停用')!==-1"
            @click="(e) => isUsed(e,node, data, '3')">
            {{data.enable === '1'? '停用':'启用'}}
          </el-button>
          <el-button
            type="text"
            size="mini"
             v-if="permission.indexOf('删除')!==-1"
            @click="(e) => delTree(e,node, data, '4')">
            删除
          </el-button>
          <el-button
            type="text"
            size="mini"
            v-show="data.ssList&&data.ssList.length"
            @click="(e) => openItemSalary(e,node, data)">
            展开全部
          </el-button>
          <el-button
            type="text"
            size="mini"
            v-if="node.previousSibling"
            v-show="permission.indexOf('排序')!==-1"
            @click="(e) => upItemSalary(e,node, data)">
            上移
          </el-button>
          <el-button
            type="text"
            size="mini"
             v-if="node.nextSibling"
             v-show="permission.indexOf('排序')!==-1"
            @click="(e) => downItemSalary(e,node, data)">
            下移
          </el-button>
        </span>
      </span>
    </el-tree>
    <!--top 新增-->
    <el-dialog
      title="新增"
      :visible.sync="topAdd"
      width="400px"
      @close="topClose">
      <div>
        <el-form label-width="80px" ref="topAddAgreeRules" :model="topValue">
          <el-row>
            <el-col>
              <el-form-item label="名称："
                            prop="addName"
                            :rules="{ required: true, message: '名称不能为空', trigger:['change', 'blur']}">
                <el-input  v-model.trim="topValue.addName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="topClose" size="mini">取 消</el-button>
        <el-button type="primary" @click="topAddSure" size="mini">确 定</el-button>
      </span>
    </el-dialog>
    <!--tree 新增/编辑-->
    <el-dialog
      :title="titleEdit"
      :visible.sync="addEdit"
      width="400px"
      @close="addClose">
      <div>
        <el-form label-width="95px" ref="addAgreeRules" :model="diffAllValue">
          <!--<el-row v-if="isShow === '0'">-->
          <el-row>
            <el-col>
              <el-form-item
              v-if="showIsEnd"
              label="是否末级："
                            prop="isLast"
                            :rules="{ required: true, message: '是否末级不能为空', trigger:['change', 'blur']}">
                <el-radio v-model="diffAllValue.isLast" label="1">是</el-radio>
                <el-radio v-model="diffAllValue.isLast" label="0">否</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="名称："
                            prop="addName"
                            :rules="{ required: true, message: '名称不能为空', trigger:['change', 'blur']}">
                <el-input v-model="diffAllValue.addName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="diffAllValue.isLast == 1">
            <el-col>
              <el-form-item :label="diffAllValue.labelName + '：'"
                            prop="allowance"
                            :rules="{ required: true, message: diffAllValue.labelName + '不能为空', trigger:['change', 'blur']}">
                <el-input type="number" v-model="diffAllValue.allowance">
                  <template slot="append">元/月</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addClose" size="mini">取 消</el-button>
        <el-button type="primary" @click="addSure" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getSalaryListByPid, saveSingleSalary, saveListSalary } from 'static/api/setting/index'
import { getExmine } from 'assets/js/exmine'
import { debounce } from 'lodash'
export default {
  data () {
    return {
      salayTree: [],
      defaultProps: {
        children: 'ssList',
        label: 'name'
      },
      topAdd: false,
      addEdit: false,
      titleEdit: '',
      bestSortNo: 0,
      singleTreeData: {},
      isShow: '0',
      topValue: {
        addName: ''
      },
      type: '',
      diffAllValue: {
        addName: '',
        isLast: '',
        labelName: '',
        grandId: ''
      },
      defaultExpandedKeys: [],
      childrenIds: [],
      showIsEnd: true
    }
  },
  computed: {
    permission () {
      return getExmine().customOther
    }
  },
  methods: {
    // 节点展开收缩给默认的展开数组添加减少对应的值
    nodeExpand (data, node, self) {
      let selfId = data.id
      this.defaultExpandedKeys.push(selfId)
    },
    nodeCollapse (data, node, self) {
      this.childrenIds = [data.id]
      this.loopFindChildrenId(data.ssList, this.childrenIds)
      let dArr = []
      this.defaultExpandedKeys.forEach(item => {
        if (this.childrenIds.indexOf(item) === -1) {
          dArr.push(item)
        }
      })
      this.defaultExpandedKeys = dArr
    },
    // type:1(top新增) type:2(tree 新增、编辑)
    adds (params, type) {
      saveSingleSalary(params).then(data => {
        let title = ''
        if (type === '1') {
          title = '新增'
          this.topAdd = false
        } else if (type === '2') {
          title = this.titleEdit
          this.addEdit = false
        }
        this.diffAllValue.allowance = ''
        this.$message.success(title + '成功')
        setTimeout(() => {
          this._getSalaryTree()
        }, 200)
      })
    },
    // 递归把有isEnd='1'的name拼成 name+amount+unit
    _getSplitEndName (arr) {
      arr.forEach(item => {
        item.beforeName = item.name
        if (item.isEnd === '1') {
          item.name = item.name + ':' + item.amount + item.unit
        }
        if (item.ssList && item.ssList.length) {
          this._getSplitEndName(item.ssList)
        }
      })
    },
    _getSalaryTree () {
      getSalaryListByPid({ type: '3' }).then(data => {
        if (data.result && data.result.length > 0) {
          this._getSplitEndName(data.result)
          this.salayTree = data.result
          this.bestSortNo = Math.max(...data.result.map(item => Number(item.sortNo)))
        }
      })
    },
    addSalary () {
      this.topAdd = true
      this.diffAllValue.grandId = ''
      this.topValue.addName = ''
    },
    // 获取grandId
    handleNodeClick () {},
    addTree (e, node, data, type) {
      e.stopPropagation()
      this.singleTreeData = data
      this.type = type
      this.diffAllValue.grandId = data.parentId === 0 ? data.id : data.grandId
      this.diffAllValue.labelName = data.beforeName
      if (type === '2') {
        this.titleEdit = '编辑'
        this.diffAllValue.isLast = this.singleTreeData.isEnd
        this.diffAllValue.allowance = this.singleTreeData.amount
        this.diffAllValue.addName = this.singleTreeData.beforeName
        if ((data.ssList && data.ssList.length) || data.parentId === 0) {
          this.showIsEnd = false
        } else {
          this.showIsEnd = true
        }
      } else {
        this.titleEdit = '新增'
        this.diffAllValue.addName = ''
        this.showIsEnd = true
        // this.showIsEnd = true
      }
      // this.titleEdit = type === '1' ? '新增' : '编辑'
      this.addEdit = true
    },
    openItemSalary (e, node, data) {
      e.stopPropagation()
      let html = e.target.innerText
      if (html === '展开全部') {
        e.target.innerHTML = '收起全部'
      } else if (html === '收起全部') {
        e.target.innerHTML = '展开全部'
      }
      if (html === '展开全部') {
        this.childrenIds = []
        this.defaultExpandedKeys.push(data.id)
        this.loopFindChildrenId(data.ssList, this.childrenIds)
        this.defaultExpandedKeys.push(...this.childrenIds)
      } else {
        let childIds = [data.id]
        if (data.ssList && data.ssList.length) {
          this.loopFindChildrenId(data.ssList, childIds)
        }
        this.defaultExpandedKeys = this.defaultExpandedKeys.filter(v => childIds.indexOf(v) === -1)
        this._getSalaryTree()
      }
    },
    upItemSalary (e, node, data) {
      e.stopPropagation()
      let prevData = node.previousSibling.data
      let upParams = [{
        id: data.id,
        sortNo: prevData.sortNo
      }, {
        id: prevData.id,
        sortNo: data.sortNo
      }]
      saveListSalary(upParams).then(data => {
        this.$message.success('排序成功')
        setTimeout(() => {
          this._getSalaryTree()
        }, 200)
      })
    },
    downItemSalary (e, node, data) {
      e.stopPropagation()
      let nextData = node.nextSibling.data
      let upParams = [{
        id: data.id,
        sortNo: nextData.sortNo
      }, {
        id: nextData.id,
        sortNo: data.sortNo
      }]
      saveListSalary(upParams).then(data => {
        this.$message.success('排序成功')
        setTimeout(() => {
          this._getSalaryTree()
        }, 200)
      })
    },
    topClose () {
      this.topAdd = false
    },
    // 循环遍历找到所有的子节点
    loopFindChildrenId (data, arr) {
      data.forEach(item => {
        arr.push(item.id)
        if (item.ssList) {
          this.loopFindChildrenId(item.ssList, arr)
        }
      })
    },
    addClose () {
      this.diffAllValue.allowance = ''
      this.$refs.addAgreeRules.resetFields()
      this.addEdit = false
    },
    isUsed (e, node, data) {
      e.stopPropagation()
      let id = data.id
      let enableParams = {
        id,
        enable: data.enable === '1' ? '0' : '1'
      }
      let stopTxt = data.enable === '1' ? '停用' : '启用'
      this.$confirm('确认' + stopTxt + (data.isEnd === '1' ? data.name.split(':')[0] : data.name) + '吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        saveSingleSalary(enableParams).then(data => {
          this.$message.success(stopTxt + '成功')
          setTimeout(() => {
            this._getSalaryTree()
          }, 200)
        })
      }).catch(() => {})
    },
    delTree (e, node, data) {
      e.stopPropagation()
      this.$confirm('确认删除' + data.name + '吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let delParams = {
          id: data.id,
          deleteTag: 1
        }
        saveSingleSalary(delParams).then(data => {
          this.$message.success('删除成功')
          setTimeout(() => {
            this._getSalaryTree()
          }, 200)
        })
      }).catch(() => {})
    },
    addSure () {
      this.$refs.addAgreeRules.validate((valid) => {
        if (valid) {
          let treeParams = {}
          if (this.type === '1') {
            treeParams = {
              type: '3',
              gradeType: this.singleTreeData.gradeType ? Number(this.singleTreeData.gradeType) + 1 : 0,
              parentId: this.singleTreeData.id ? this.singleTreeData.id : '',
              name: this.diffAllValue.addName,
              id: '',
              sortNo: this.singleTreeData.id ? '' : this.bestSortNo + 1,
              // isEnd: this.singleTreeData.ssList.length > 0 ? '0' : this.diffAllValue.isLast,
              isEnd: this.diffAllValue.isLast,
              amount: this.diffAllValue.allowance
            }
          }
          if (this.type === '2') {
            treeParams = {
              type: '3',
              gradeType: this.singleTreeData.gradeType,
              parentId: this.singleTreeData.parentId,
              name: this.diffAllValue.addName,
              id: this.singleTreeData.id,
              sortNo: this.singleTreeData.sortNo,
              isEnd: this.diffAllValue.isLast,
              amount: this.diffAllValue.allowance
            }
          }
          if (this.titleEdit === '新增') {
            treeParams.grandId = this.diffAllValue.grandId
          }
          this.adds(treeParams, '2')
        }
      })
    },
    topAddSure: debounce(function () {
      this.$refs.topAddAgreeRules.validate((valid) => {
        if (valid) {
          let singlesParam = {
            type: '3',
            gradeType: '0',
            parentId: '0',
            name: this.topValue.addName,
            id: '',
            sortNo: this.bestSortNo + 1
          }
          this.adds(singlesParam, '1')
        }
      })
    }, 500)
  },
  created () {
    this._getSalaryTree()
  }
}
</script>
<style lang="less" scoped>
  .marRight{
    margin-right: 8px;
  }
  .marBottom{
    margin-bottom: 10px;
  }
  .warning {
    color: #e6a23c;
    font-size: 24px;
    position: relative;
    top: 2px;
    margin-right: 8px;
  }
  .salary-item_box{
    .mean-title{
      font-size:14px;
    }
  }
  .otherSalary{
    .custom-tree-node{
      .node-label{
        font-size:14px;
      }
    display:inline-block;
    width:100%;
    position:relative;
    .tree-btns{
      position:absolute;
      text-align:center;
      right:10px;
      top:-10px;
       /deep/ .el-button{
          padding:0px;
        }
      }
    }
  }
</style>
