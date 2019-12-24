<template>
  <div class="report-market_box">
    <el-row>
      <el-button type="primary" size="mini" @click="addOriginal" v-show="(permission.indexOf('新增'))!==-1">新增</el-button>
    </el-row>
    <div class="search-form_wrap clearfix">
      <div class="search-form_item">
         <el-input v-model="keyword" placeholder="关键词搜索"/>
      </div>
      <div class="search-form_button">
         <el-button type="primary" size="mini" @click="searchTree">搜索</el-button>
      </div>
    </div>
    <ul class="table-title clearfix mt-20">
      <li>组织名称</li>
      <li>单位名称</li>
      <li>公司名称</li>
      <li>部门名称</li>
      <li>操作</li>
    </ul>
    <!--:default-expanded-keys="defaultExpandedKeys" @node-expand="nodeExpand"
        @node-collapse="nodeCollapse"-->
    <el-tree
      :data="orgListDatas"
      node-key="uuid"
      :indent="200"
      :props="defaultProps"
      check-on-click-node
      :default-expanded-keys="defaultExpandedKeys"
      @node-expand="nodeExpand"
       @node-collapse="nodeCollapse"
      ref="treeGrid"
      >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span :class="data.active? 'active' :''"><a v-if="data.level===0">{{data.num}}</a>&nbsp;&nbsp;{{node.label}}</span>
        <!-- <span v-else class="clearfix">
          <span class="custom-tree-label">{{node.label}}</span>
          <dl class="custom-tree-dl">
            <dd v-for="item in data.depts" :key="item.id">{{item.name}}</dd>
          </dl>
        </span> -->
        <span class="custom-tree-button">
          <el-button
            type="text"
            size="mini"
            v-show="!data.units && permission.indexOf('查看')!==-1"
            @click="(e)=>seeDetail(e,node, data)"
          >
            详情
          </el-button>
          <el-button
            type="text"
            size="mini"
            v-show="!data.companys&&data.units&& permission.indexOf('新增')!==-1"
            @click="(e) => append(e,node,data)">
            新增
          </el-button>
          <el-button
            type="text"
            size="mini"
             v-show="!data.depts&& permission.indexOf('编辑')!==-1"
            @click="(e) => edit(e,node,data)">
            编辑
          </el-button>
          <el-button
            type="text"
            size="mini"
            v-show="!data.depts&& permission.indexOf('删除')!==-1"
            @click="(e) => remove(e,node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
    <!--详情-->
    <el-dialog
    title="详情"
    width="700px"
    :visible.sync="treeVisible"
    v-draggable
    >
    <div style="overflow:auto">
        <el-tree
        :data="deptOptions"
        ref="deptAllTreeRef1"
        node-key="id"
        :props="defaultDeptProps1"
        :filter-node-method="filterNode"
        style="width:100%;height:400px;ovweflow:hidden"
        >
      </el-tree>
    </div>
    </el-dialog>
    <!--新增组织-->
    <el-dialog
    :title="orgDiaTitle + '组织'"
    :visible.sync="originVisible"
    width="600px"
    v-draggable
    >
    <el-form
    :model="originForm"
    label-width="100px"
    style="width:400px"
    ref="originFormRef"
    >
      <el-form-item
      label="序号："
      prop="num"
      :rules="[
      { required: true, message: '请输入填写序号', trigger: 'blur' }
    ]"
      >
       <el-input-number
       controls-position="right"
       type="number"
       style="width:100%"
        v-model="originForm.num" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item
      label="组织名称："
      prop="name"
      :rules="[
      {required:true, message: '请输入组织名称', trigger: 'blur'}
      ]"
      >
      <el-input placeholder="请输入组织名称" v-model="originForm.name"/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="originVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" @click="sureOrigin" size="mini">确 定</el-button>
    </span>
    </el-dialog>
    <!--单位名称新增-->
    <el-dialog
     :title="unitDiaTitle + '单位'"
    :visible.sync="unitVisible"
    width="600px"
    v-draggable
     @close="$refs.unitFormRef.resetFields();unitVisible = false"
    >
    <el-form
    :model="unitForm"
     label-width="100px"
     ref="unitFormRef"
    >
      <el-form-item
      label="单位名称："
      prop="name"
      :rules="{
        required:true,
        message: '单位名称必填',
        trigger: 'blur'
      }"
      >
      <el-input v-model="unitForm.name" placeholder="单位名称"/>
      </el-form-item>
      <el-form-item
      label="包含公司："
      prop="companyIds"
      :rules="{
        required:true,
        message: '请选择包含公司',
         validator:(rule, value, callback)=>{
           if(!unitForm.companyIds.length){
             callback('请选择包含公司')
           } else {
             callback()
           }
         }
      }"
      >
      <el-select
      style="width:100%"
      multiple
      filterable
      @remove-tag="removeTag"
       v-model="unitForm.companyIds" placeholder="请选择包含公司">
      <el-option-group
      v-for="group in unitOptions"
      :key="group.id"
      :label="group.name"
      >
      <el-option v-for="item in group.companys"
        :key="item.id"
        :label="item.name"
        :disabled="item.checked===1"
        :value="item.id"
      ></el-option>
    </el-option-group>
      </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$refs.unitFormRef.resetFields();unitVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" @click="sureUnit" size="mini">确 定</el-button>
    </span>
    </el-dialog>
    <el-dialog
    :visible.sync="deptVisible"
    :title="deptDiaTitle + '部门'"
    width="600px"
    v-draggable
    >
    <el-form
    :model="deptForm"
    ref="deptFormRef"
    label-width="100px">
      <el-form-item label="序号："
       prop="num"
      :rules="[
      { required: true, message: '请输入填写序号', trigger: 'blur' }
    ]"
      >
      <el-input-number
       controls-position="right"
       type="number"
        :min="1" v-model="deptForm.num" style="width:100%"/>
      </el-form-item>
      <el-form-item
      prop="name"
      :rules="{
        required:true,
        message: '请填写部门名称',
        trigger:'blur'
      }"
      label="部门名称：">
        <el-input v-model="deptForm.name"/>
      </el-form-item>
      <el-form-item label="包含部门："
        required
      >
      <!--check-strictly-->
        <div class="tree-scrollbar">
        <el-scrollbar ref="scrollbar">
        <el-tree
        :data="deptOptions"
        show-checkbox
        ref="deptAllTreeRef"
        node-key="id"
        :default-expanded-keys="deptDefaultExpandKeys"
        :props="defaultDeptProps"
        style="width:100%;height:400px;"
         @check-change="checkChange"
        >
      </el-tree>
      </el-scrollbar>
      </div>
        <!-- <el-select
        style="width:100%"
        multiple
        v-model="deptForm.sysDeptIds"
        placeholder="包含部门">
          <el-option
           v-for="item in deptOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"></el-option>
        </el-select> -->
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="deptVisible = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="sureDept" size="mini">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>
<script>
import reportApi from 'api/report'
import { cloneDeep } from 'lodash'
import { getExmine } from 'assets/js/exmine'
import { hasClass } from '@/assets/js/dom'
export default {
  data () {
    return {
      treeVisible: false,
      originVisible: false,
      unitVisible: false,
      deptVisible: false,
      orgDiaTitle: '新增',
      unitDiaTitle: '新增',
      deptDiaTitle: '新增',
      defaultExpandedKeys: [],
      originForm: {
        num: 1,
        name: '',
        id: '',
        uuid: ''
      },
      unitForm: {
        name: '',
        id: '',
        parentId: '',
        companyIds: []
      },
      deptForm: {
        num: 0,
        name: '',
        id: '',
        companyId: '',
        orgId: '',
        unitId: '',
        sysDeptIds: []
      },
      keyword: '',
      orgListDatas: [],
      defaultProps: {
        children: 'units',
        label: 'name'
      },
      detailProps: {
        label: 'name',
        children: 'node'
        // disabled: function (children) {
        //   return children.id
        // }
      },
      dataOrginal: [],
      bestNumber: 1,
      unitOptions: [],
      copyDeptOptions: [],
      deptOptions: [],
      deptOptions1: [],
      defaultDeptProps: {
        label: 'name',
        children: 'node',
        disabled: function (data) {
          return data.canChecked === 0 || data.disabled
        }
      },
      defaultDeptProps1: {
        label: 'name',
        children: 'node'
      },
      deptDefaultExpandKeys: [],
      copyDeptoptions1: []
      // treeData:[]
    }
  },

  methods: {
    // 点击勾选数据处理
    checkChange (data, checked, node) {
      // // deptAllTreeRef
      // const currentIds = this.$refs.deptAllTreeRef.getCheckedKeys()
      // const checkIds = data.node.filter(x => x.canChecked !== 0).map(item => item.id)
      // if (checked) {
      //   this.$refs.deptAllTreeRef.setCheckedKeys(currentIds.concat(checkIds))
      // } else {
      //   this.$refs.deptAllTreeRef.setCheckedKeys(currentIds.filter(x => checkIds.indexOf(x) === -1))
      // }
    },
    filterNode (value, data) {
      if (!value) return true
      return value.indexOf(data.id) !== -1
    },
    // 删除包含公司
    removeTag (tag) {
      const copyUnitOptions = cloneDeep(this.unitOptions)
      copyUnitOptions.forEach(item => {
        if (item.companys && item.companys.length) {
          item.companys.forEach(x => {
            if (x.id + '' === tag + '') {
              x.checked = 0
            }
          })
        }
      })
      this.unitOptions = copyUnitOptions
    },
    // 循环遍历找到所有的子节点
    loopFindChildrenId (data) {
      /* console.log('data321', data); */
      const childIds = []
      function finChildId (data) {
        data.forEach((item) => {
          childIds.push(item.uuid)
          if (item.units) {
            finChildId(item.units)
          }
        })
      }
      finChildId(data)
      return childIds
    },
    // 节点展开收缩给默认的展开数组添加减少对应的值
    nodeExpand (data, node, self) {
      let selfId = data.uuid
      this.defaultExpandedKeys.push(selfId)
    },
    nodeCollapse (data, node, self) {
      const chiIds = [data.uuid].concat(this.loopFindChildrenId(data.units))
      const dArr = []
      this.defaultExpandedKeys.forEach((item) => {
        if (chiIds.indexOf(item) === -1) {
          dArr.push(item)
        }
      })
      this.defaultExpandedKeys = dArr
    },
    findNonParentNode (node) {
      const parentNode = []
      function findNode (nodes) {
        nodes.forEach(item => {
          if (!item.node || !item.node.length) {
            parentNode.push(item.id)
          } else {
            findNode(item.node)
          }
        })
      }
      findNode(node)
      return parentNode
    },
    seeDetail (event, node, data) {
      this.treeVisible = true
      this._getDeptList(data.parentId, data.id)
      event.stopPropagation()
      this.treeVisible = true
    },
    _setActiveTarge (arr) {
      const isBack = this._findAllNull(this.orgListDatas, this.keyword)
      if (!isBack) {
        this.$message.warning('无相关组织架构，请重新搜索')
        this.keyword = null
        this.searchTree()
        return false
      }
      arr.forEach(item => {
        if (item.name.includes(this.keyword)) {
          item.active = true
          this.defaultExpandedKeys.push(item.uuid)
        }
        // } else {
        //   this.$message.warning('无相关组织架构，请重新搜索')
        //   this.keyword = null
        //   this.searchTree()
        // }
        if (item.units) {
          this._setActiveTarge(item.units)
        }
      })
    },
    // 确认新增编辑组织
    sureOrigin () {
      this.$refs.originFormRef.validate(valid => {
        if (valid) {
          const params = {
            num: this.originForm.num,
            name: this.originForm.name,
            id: this.originForm.id
          }
          reportApi.saveReportOrg(params).then(res => {
            this.$message.success(this.orgDiaTitle + '成功')
            this._getOrgList()
            this.defaultExpandedKeys.push(this.originForm.uuid)
            setTimeout(() => {
              this.originVisible = false
            }, 50)
          })
        }
      })
    },
    // 确认新增单位
    sureUnit () {
      this.$refs.unitFormRef.validate((valid) => {
        if (valid) {
          const unitParams = {
            name: this.unitForm.name,
            id: this.unitForm.id,
            parentId: this.unitForm.parentId,
            companyIds: this.unitForm.companyIds
          }
          reportApi.saveReportUnit(unitParams).then(res => {
            this.$message.success(this.unitDiaTitle + '成功')
            this._getOrgList()
            this.defaultExpandedKeys.push(this.unitForm.uuid)
            setTimeout(() => {
              this.unitVisible = false
            }, 50)
          })
        }
      })
    },
    sureDept () {
      this.$refs.deptFormRef.validate(valid => {
        if (valid) {
          const deptParams = {
            id: this.deptForm.id,
            num: this.deptForm.num,
            companyId: this.deptForm.companyId,
            name: this.deptForm.name,
            orgId: this.deptForm.orgId,
            unitId: this.deptForm.unitId,
            sysDeptIds: this.$refs.deptAllTreeRef.getCheckedNodes().filter(x => !x.node.length && x.canChecked !== 0).map(item => item.id)
          }
          reportApi.saveReportDept(deptParams).then(res => {
            this.$message.success(this.deptDiaTitle + '成功')
            this.defaultExpandedKeys.push(this.deptForm.uuid)
            this._getOrgList()
            setTimeout(() => {
              this.deptVisible = false
            }, 50)
          })
        }
      })
    },
    searchTree () {
      this.orgListDatas = this.transferDefaultTree(this.dataOrginal)
      if (this.keyword) {
        this._setActiveTarge(this.orgListDatas)
      }
      // const arr = []
    },
    // 所有都没有找到
    _findAllNull (arr, keyword) {
      let Boolean1 = false
      function findCheckBoolean (arr, keyword) {
        arr.forEach(item => {
          if (item.name.includes(keyword)) {
            Boolean1 = true
          }
          if (item.units && item.units.length) {
            findCheckBoolean(item.units, keyword)
          }
        })
      }
      findCheckBoolean(arr, keyword)
      return Boolean1
    },
    transferDefaultTree (tree) {
      let treeData = []
      tree.forEach((data, index) => {
        data.index = '0' + (index + 1)
        data.active = false
        data.uuid = data.uuid ? data.uuid : data.id
        // data.uuid = data.id
        if (data.units) {
          data.units.forEach(unit => {
            unit.units = unit.companys
            unit.parentId = data.id
            unit.uuid = unit.uuid ? unit.uuid : unit.id
            // unit.uuid = unit.id
            unit.active = false
            if (unit.companys.length) {
              unit.companys.forEach(com => {
                com.active = false
                com.units = com.depts
                com.parentId = unit.id
                com.uuid = com.uuid ? com.uuid : com.id
                // com.uuid = com.id
                if (com.depts.length) {
                  com.depts.forEach(dept => {
                    dept.active = false
                    dept.parentId = com.id
                    dept.uuid = dept.uuid ? dept.uuid : dept.id
                    // dept.uuid = dept.id
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
    addOriginal () {
      this.orgDiaTitle = '新增'
      this.originForm.id = ''
      this.originForm.name = ''
      this.originForm.num = this.bestNumber
      this.originVisible = true
    },
    edit (e, node, data) {
      e.stopPropagation()
      if (data.level === 0) {
        this.orgDiaTitle = '编辑'
        this.originForm.id = data.id
        this.originForm.name = data.name
        this.originForm.num = data.num
        this.originVisible = true
      } else if (data.level === 1) {
        this.unitDiaTitle = '编辑'
        this.unitForm.id = data.id
        this.unitForm.parentId = data.parentId
        this.unitForm.name = data.name
        this.unitForm.companyIds = data.units.map(item => item.id)
        this.unitVisible = true
        this._getCompanyList()
      } else {
        this._getCompanyLists(data.parentId, data.id).then(res => {
          if (res) {
            const canCheckArr = this._findCanChecked2(this.copyDeptOptions)
            const finIds = this.findNonParentNode(this.copyDeptOptions)
            reportApi.getDeptGroupIds({ companyId: data.parentId }).then(res => {
              const checkArrs = canCheckArr.concat(res.result)
              this.$refs.deptAllTreeRef.setCheckedKeys(checkArrs.filter(x => finIds.indexOf(x) !== -1))
              this.deptDefaultExpandKeys = checkArrs.filter(x => finIds.indexOf(x) !== -1)
              this._countScrollTop(canCheckArr.map(Number).sort()[0])
            })
          }
        })
        this.deptDiaTitle = '编辑'
        this.deptVisible = true
        this.deptForm.id = data.id
        this.deptForm.companyId = data.parentId
        this.deptForm.num = data.num
        this.deptForm.name = data.name
        this.deptForm.orgId = node.parent.data.orgId
        this.deptForm.unitId = node.parent.data.unitId
        setTimeout(() => {
        }, 200)
      }
    },
    _countScrollTop (id) {
      // const node = this.$refs.deptAllTreeRef.getNode(id)
      const elements = this.$refs.deptAllTreeRef.$el
      // this.$refs.deptAllTreeRef.setCurrentNode(node)
      // .querySelectorAll('.el-checkbox.is-checked')
      const eles = elements.getElementsByClassName('el-checkbox is-checked')
      const targets = []
      setTimeout(() => {
        Array.prototype.slice.call(eles).forEach(item => {
          if (!hasClass(item, 'is-disabled')) {
            targets.push(item)
          }
        })
        setTimeout(() => {
          this.$refs.scrollbar && (this.$refs.scrollbar.wrap.scrollTop = Array.isArray(targets) && targets.length ? targets[0].offsetTop : 0)
        }, 200)
        this.$refs.scrollbar && this.$refs.scrollbar.handleScroll()
      }, 200)
    },
    append (e, node, data) {
      e.stopPropagation()
      if (data.level === 0) {
        e.stopPropagation()
        this.unitForm.parentId = data.id
        this.unitForm.companyIds = []
        this.unitForm.id = ''
        this.unitForm.name = ''
        this.unitVisible = true
        this.unitForm.uuid = data.uuid ? data.uuid : data.id
        this.unitDiaTitle = '新增'
        this._getCompanyList()
      } else {
        this._getCompanyLists(data.id).then(res => {
          reportApi.getDeptGroupIds({ companyId: data.id }).then(res => {
            const finIds = this.findNonParentNode(this.copyDeptOptions)
            this.$refs.deptAllTreeRef.setCheckedKeys(res.result.filter(x => finIds.indexOf(x) !== -1))
            this.deptDefaultExpandKeys = res.result
          })
        })
        this.deptDiaTitle = '新增'
        this.deptDefaultExpandKeys = [data.id]
        this.deptForm.id = ''
        this.deptForm.companyId = data.id
        this.deptForm.name = ''
        this.deptForm.sysDeptIds = []
        this.deptForm.uuid = data.uuid ? data.uuid : data.id
        this.deptVisible = true
        this.deptForm.num = data.depts.length ? Number(this._getBestNum(data.depts)) + 1 : 1
      }
    },
    remove (e, node, data) {
      e.stopPropagation()
      // 【自定义]】0:组织，1：单位，2：部门
      this.$confirm('确定要删除' + data.name + '及以下所有设置？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const delParams = {
          id: data.id,
          type: data.level === 0 ? 0 : data.companys ? 1 : 2
        }
        reportApi.delOrg(delParams).then(res => {
          this.$message.success('删除成功')
          setTimeout(() => {
            this._getOrgList()
          }, 200)
        })
      }).catch(() => {})
    },
    // 获取列表最大的num
    _getBestNum (res) {
      return res[res.length - 1].num
    },
    _getOrgList () {
      reportApi.getReportOrgList().then(res => {
        const result = cloneDeep(res.result)
        this.dataOrginal = cloneDeep(res.result)
        this.orgListDatas = this.transferDefaultTree(result)
        if (res.result.length) {
          this.bestNumber = Number(this._getBestNum(result)) + 1
        }
      })
    },
    _getCompanyList () {
      reportApi.getReportCompanyList().then(res => {
        const result = res.result
        this.unitOptions = result
        // this.unitOptions = result.find(x => x.name === '化建').companys
      })
    },
    // 所有的树形结构加上parentId方便查找
    _findAllTreeId (arr, findId) {
      let findArr = []
      function setParentId (arr) {
        arr.forEach(item => {
          if (item.id === findId) {
            findArr.push(item)
          }
          if (item.node && item.node.length) {
            item.node.forEach(nd => {
              if (nd.id === findId) {
                findArr.push(item)
              }
              if (nd.node && nd.node.length) {
                nd.node.forEach(ex => {
                  if (ex.id === findId) {
                    findArr.push(item)
                  }
                })
              }
            })
          }
        })
      }
      setParentId(arr)
      return findArr
    },
    _get2Deptoptions1 (arr) {
      let deptOptions2 = []
      function findCheck2 (arr) {
        arr.forEach(item => {
          if (!item.node.length && item.canChecked === 2) {
            deptOptions2.push(item)
          }
          if (item.node.length) {
            findCheck2(item.node)
          }
        })
      }
      findCheck2(arr)
      return deptOptions2
    },
    // 循环遍历所有的子级的node
    _setAllNodes (arr) {
      const nodes = []
      const checks = []
      function finArr (array) {
        array.forEach(node => {
          if (!node.node || !node.node.length) {
            nodes.push(node)
            if (node.canChecked === 0) {
              checks.push(node)
            }
          } else {
            finArr(node.node)
          }
        })
      }
      finArr(arr)
      return nodes.length === checks.length
    },
    _setDisabledDepOp (arr) {
      // return this._setAllNodes(arr)
      arr.forEach(item => {
        // const childs = item.node.filter(x => x.canChecked === 0)
        item.disabled = this._setAllNodes(item.node)
        if (!item.node || !item.node.length) {
          item.disabled = false
        }
        // if (childs.length > 0 && childs.length === item.node.length) {
        //   item.disabled = true
        // } else {
        //   item.disabled = false
        // }
        if (item.node && item.node.length) {
          this._setDisabledDepOp(item.node)
        }
      })
    },
    _getDeptList (companyId, deptId) {
      const compams = {
        companyId,
        deptId
      }
      reportApi.getAllTreeList(compams).then(res => {
        const result = res.result
        this.deptOptions = result
        setTimeout(() => {
          const canCheckArr = this._findCanChecked2(cloneDeep(result))
          this.$refs.deptAllTreeRef1.filter(canCheckArr)
        }, 200)
      })
    },
    _getCompanyLists (companyId, deptId) {
      return new Promise((resolve, reject) => {
        const compams = {
          companyId
        }
        if (deptId) compams.deptId = deptId
        reportApi.getAllTreeList(compams).then(res => {
          const result = res.result
          this.deptOptions = cloneDeep(result)
          this._setDisabledDepOp(this.deptOptions, companyId)
          this.copyDeptOptions = cloneDeep(result)
          resolve(result)
        // this.deptOptions1 = this._setDisabled(result)
        })
      })
    },
    _findCanChecked2 (arr) {
      const arr2 = []
      function find2Check (arr) {
        arr.forEach(item => {
          if (item.canChecked === 2) {
            arr2.push(item.id)
          }
          if (item.node && item.node.length) {
            find2Check(item.node)
          }
        })
      }
      find2Check(arr)
      return arr2
    },
    _findCanChecked1 (arr) {
      let arr1 = []
      function find1Check (arr) {
        arr.forEach(item => {
          if (item.canChecked === 1) {
            arr1.push(item.id)
          }
          if (item.node && item.node.length) {
            find1Check(item.node)
          }
        })
      }
      find1Check(arr)
      return arr1
    },
    _setDisabled (arr) {
      arr.forEach(item => {
        item.disabled = true
        if (item.node && item.node.length) {
          this._setDisabled(item.node)
        }
      })
      return arr
    }
  },
  computed: {
    permission () {
      return getExmine().marketReportSystem
    }
  },
  created () {
    this._getOrgList()
  }
}
</script>
<style lang="less" scoped>
.report-market_box{
  .el-tree{
    width:1000px;
  }
  .table-title{
    border:1px solid #888;
    width:1000px;
    li{
      float:left;
      width:20%;
      font-size:14px;
      color:#888;
      line-height:28px;
      box-sizing: border-box;
      &:not(:nth-last-of-type(1)){
        border-right:1px solid #888;
      }
    }
  }
  .tree-scrollbar{
    &/deep/.el-scrollbar__wrap{
      margin-bottom: 0!important;
    }
  }
  .custom-tree-node{
    position: relative;
    width:100%;
    &>span{
      &.active{
        color:red;
      }
    }
    .custom-tree-button{
      position:absolute;
      top:-10px;
      right:20px;
    }
    .custom-tree-label{
      float:left;
    }
    .custom-tree-dl{
      float:left;
      margin-left:20px;
    }
  }
  &/deep/ .el-tree{
    .el-button{
      padding:0px 0px;
    }
  }
}
</style>
