<template>
  <div class="origin-box" @click="orgDatas.showTree = false">
    <el-row
    :gutter="20"
    class="row-tree">
      <el-col :span="14">
        <div class="tree-div" style="overflow:hidden">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>
          <div style="height:600px;overflow:hidden" class="scroll-box">
          <el-scrollbar style="height:100%">
          <el-tree
            :data="dataTree"
             ref="originTree"
            :props="defaultProps"
            :filter-node-method="filterNode"
            highlight-current
            @node-click="getDepartmentSaffs"
            node-key="id"
            style=" height: 100%;overflow:hidden"
            :default-expanded-keys="defaultExpandedKeys"
            @node-expand="nodeExpand"
            @node-collapse="nodeCollapse"
            :render-content="renderContent">
          </el-tree>
          </el-scrollbar>
        </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="tab-wraps">
             <dl>
                 <dt>员工列表</dt>
                 <dd v-for="(item,index) in staffNameData" :key="index">
                    <span class="ft14">{{item.name}}</span>
                    <span class="ft12"  v-if="item.status=='5' || item.status=='7' || item.status=='16'"><i style="color:red" v-show="item.dutyName">({{item.dutyName}})</i></span>
                    <span class="ft12"  v-else><i style="color:red" v-show="item.dutyName">({{item.dutyName}})</i>({{item.status | filterStatus}})</span>
                 </dd>
                 <dd v-show="staffNameData.length == 0">
                     该部门下暂时还没有员工
                 </dd>
             </dl>
        </div>
        <!-- <el-table
          :data="staffNameData"
          border>
          <el-table-column
            min-width="300px"
            label="员工列表">
            <template slot-scope="scope">
              <span class="ft14">{{scope.row.name}}</span>
              <span class="ft12"  v-if="scope.row.status=='5'"><i style="color:red" v-show="scope.row.dutyName">({{scope.row.dutyName}})</i></span>
              <span class="ft12"  v-else><i style="color:red" v-show="scope.row.dutyName">({{scope.row.dutyName}})</i>({{scope.row.status | filterStatus}})</span>
            </template>
          </el-table-column>
        </el-table> -->
       <el-pagination
        v-if="pageMsg.total>10"
         class="mt-20 el-page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageMsg.currentPage"
        :page-size="pageMsg.pageSize"
        layout="prev, pager, next, jumper"
        :total="pageMsg.total">
      </el-pagination>
      </el-col>
    </el-row>
    <el-dialog
        :visible.sync="deptVisible"
        width="600px">
        <span slot="title" class="dept-title">{{deptTitle}}</span>
        <div>
          <el-form :model="deptForm" label-width="120px" :rules="rules" ref="deptForm" class="dialog-form">
            <el-form-item label="板块属性:" prop="moduleType">
              <el-select
              @change="getModuleTypeValue"
              v-model="deptForm.moduleType">
                <el-option
                 v-for="item in moduleTypeOptions"
                 :label="item.label"
                 :value="item.value"
                 :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上级组织:" prop="parentId">
              <el-input  v-model="deptForm.parentName" disabled></el-input>
            </el-form-item>
            <el-form-item
            label="子组织名称:"
            prop="name">
              <el-input v-model="deptForm.name"></el-input>
            </el-form-item>
            <el-form-item
            label="组织类型:"
            class="mt-20"
             prop="grade">
              <el-select
              v-model="deptForm.grade"
              @change="clearDeptType"
              placeholder="请选择组织类型">
                <el-option
                  v-for="item in deptGrade"
                  :key="item.value"
                  :label="item.label"
                  :disabled="item.disabled"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select
               v-model="deptForm.type"
                placeholder="请选择组织类型"
                v-if="deptForm.grade==2"
                prop="type" class="mt-20">
                <el-option
                  v-for="item in typeSelect1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="deptForm.type"  placeholder="请选择组织类型" v-if="deptForm.grade==3" prop="type" class="mt-20">
                <el-option
                  v-for="item in typeSelect2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="deptForm.type"  placeholder="请选择组织类型" v-if="deptForm.grade==4" prop="type" class="mt-20">
                <el-option
                  v-for="item in typeSelect3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="deptForm.type"  placeholder="请选择组织类型" v-if="deptForm.grade==5" prop="type" class="mt-20">
                <el-option
                  v-for="item in typeSelect4"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否为公司:" prop="isCompany">
              <el-radio-group v-model="deptForm.isCompany">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
             <el-form-item label="是否为营销机构:" prop="isMarketing" v-if="deptForm.moduleType == '1'">
              <el-radio-group v-model="deptForm.isMarketing">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否为广角:" prop="isWideAngle" v-if="deptForm.moduleType == '2'">
              <el-radio-group v-model="deptForm.isWideAngle">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否为营销总部" v-if="deptForm.isMarketing==1 && deptForm.moduleType == '1'">
              <el-radio-group v-model="deptForm.isMarketLeader">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="人事主体:">
              <search-dept-tree
              :orgDatas="orgDatas"
              :btnMessage.sync="btnMessage"
              :placeTxt="'请输入人事主体'"
              @selectChange="selectChange"
              />
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deptVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="sureDept" size="mini">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
import commonApi from 'api/common'
import { addDept, deleteDept, editCurrentDept } from 'static/api/setting/index'
import { getbaseStatus } from 'assets/js/filters'
import SearchDeptTree from 'components/SearchDeptTree'
import { getExmine } from 'assets/js/exmine'
export default {
  data () {
    return {
      btnMessage: true,
      defaultExpandedKeys: [],
      orgDatas: {
        filterName: '',
        orgId: '',
        dataTree: [],
        showTree: false,
        isLimit: '0',
        bindData: 'different'
      },
      originOrgId: '',
      dataTree: [],
      rules: {
        parentId: [
          { required: true, message: '请输入上级部门' }
        ],
        name: [
          { required: true, message: '请输入部门名称' }
        ],
        grade: [
          { required: true, message: '请选择组织类型' }
        ],
        hrBelongId: [
          { required: true, message: '请选择人事归属' }
        ],
        moduleType: [
          { required: true, message: '板块属性不能为空' }
        ]
      },
      statusSelect: [
        { value: 5, label: '已入职' },
        { value: 8, label: '离职申请中' },
        { value: 9, label: '离职办理中' },
        { value: 10, label: '已离职' },
        { value: 11, label: '调动中' },
        { value: 12, label: '已调出' }
      ],
      typeSelect1: [
        { value: 1, label: '公司' },
        { value: 2, label: '处级' }
      ],
      typeSelect2: [
        { value: 3, label: '科室' },
        { value: 4, label: '部门' },
        { value: 5, label: '分公司' }
      ],
      typeSelect3: [
        { value: 6, label: '营业部' },
        { value: 7, label: '销售中心' },
        { value: 12, label: '其他三级' }
      ],
      typeSelect4: [
        { value: 8, label: '代表处' },
        { value: 9, label: '办事处' },
        { value: 10, label: '组' },
        { value: 13, label: '其他四级' }
      ],
      staffNameData: [],
      treeDataShow: 1,
      deptVisible: false,
      deptTitle: '新增',
      filterText: '',
      defaultProps: {
        id: 'sysDept.id',
        children: 'sysDeptListVO',
        label: function (children) {
          return children.sysDept.name
        }
      },
      deptForm: {
        id: '',
        parentId: '',
        parentName: '',
        fullName: '',
        name: '',
        grade: '',
        isCompany: '',
        hrBelongId: '',
        currentHrBelongId: '',
        type: '',
        moduleType: '',
        isWideAngle: 0,
        isMarketing: 0,
        isMarketLeader: 0
      },
      pageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30],
        total: 0
      },
      moduleTypeOptions: [
        { label: '组织机构', value: 0 },
        { label: '化建', value: 1 },
        { label: '广角', value: 2 },
        { label: '期货', value: 3 },
        { label: '境外', value: 4 },
        { label: '资本', value: 5 },
        { label: '内银', value: 6 },
        { label: '其他', value: 7 }
      ],
      childrenIds: [],
      gradeType: -1,
      gradeSyncType: 6
    }
    // 0:组织机构,1:化建,2:广角,3:期货,4:境外,5:资本,6:内银,7:其他
  },
  components: {
    SearchDeptTree
  },
  watch: {
    filterText (val) {
      this.$refs.originTree.filter(val)
    }
  },
  methods: {
    selectChange (orgId) {
      this.orgDatas.orgId = orgId
    },
    // 节点展开收缩给默认的展开数组添加减少对应的值
    nodeExpand (data, node, self) {
      let selfId = data.sysDept.id
      this.defaultExpandedKeys.push(selfId)
    },
    nodeCollapse (data, node, self) {
      this.childrenIds = [data.sysDept.id]
      this.loopFindChildrenId(data.sysDeptListVO)
      let dArr = []
      this.defaultExpandedKeys.forEach(item => {
        if (this.childrenIds.indexOf(item) === -1) {
          dArr.push(item)
        }
      })
      this.defaultExpandedKeys = dArr
      // if (this.defaultExpandedKeys.indexOf(selfId) !== -1) { this.defaultExpandedKeys.splice(this.defaultExpandedKeys.indexOf(selfId), 1) }
    },
    // 循环遍历找到所有的子节点
    loopFindChildrenId (data) {
      data.forEach(item => {
        this.childrenIds.push(item.sysDept.id)
        if (item.sysDeptListVO) {
          this.loopFindChildrenId(item.sysDeptListVO)
        }
      })
    },
    // 化建把是否为营销改成是
    getModuleTypeValue (value) {
      if (value === 1) {
        this.deptForm.isMarketing = 1
      }
    },
    clearDeptType () {
      this.deptForm.type = ''
    },
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    renderContent (h, { node, data, store }) {
      return (
        <span style="display:inline-block;width:100%;line-height:36px;"
          on-mousemove={ (e) => this.moveover(e, store, data, node)}
          on-mouseout={ (e) => this.moveout(e, store, data, node)}
        >
          <span style="position:relative">
            <span
              title={node.label}
              //  class="text-overflow"
              //  style="max-width:150px;display:block;font-size:14px;"
            >{node.label}</span>
          </span>
          <span style="position:absolute;display:none;right:10px;transform:translateY(-36px)" class={'hide-all' + ' ' + 'edit-tree-sp' + data.id}>
            <span style="position:relative" >
              {this.permission.indexOf('新增') > -1 && data.sysDept.grade !== 5 ? <el-tooltip class="item" effect="light" content="新增" placement="top"> <el-button size='mini' on-click={ (e) => this.addDepartment(e, store, data, node) } icon="el-icon-plus"></el-button> </el-tooltip> : null}
              {this.permission.indexOf('编辑') > -1 ? <el-tooltip class="item" effect="light" content="编辑" placement="top"> <el-button size='mini' on-click={ (e) => this.editDept(e, store, data, node) } icon="el-icon-edit"></el-button> </el-tooltip> : null}
              {this.permission.indexOf('删除') > -1 ? <el-tooltip class="item" effect="light" content="删除" placement="top"><el-button size='mini' on-click={ (e) => this.removeDept(e, store, data, node) } icon="el-icon-delete"></el-button></el-tooltip> : null}
            </span>
          </span>
        </span>)
    },
    moveover (e, store, data, node) {
      e.stopPropagation()
      // 做ie兼容性处理  类数组引用数组的prototype使其可以使用forEach方法
      Array.prototype.slice.call(document.querySelectorAll('.hide-all')).forEach(item => {
        item.style.display = 'none'
      })
      let curClass = 'edit-tree-sp' + data.sysDept.id
      document.querySelector('.' + curClass).style.display = 'block'
    },
    moveout (e, store, data, node) {
      let curClass = 'edit-tree-sp' + data.sysDept.id
      document.querySelector('.' + curClass).style.display = 'none'
    },
    addDepartment (e, store, data, node) {
      if (data.id !== 1) {
        this.gradeType = data.sysDept.grade
      } else {
        this.gradeType = -1
      }
      this.gradeSyncType = 6
      e.stopPropagation()
      this.orgDatas.orgId = data.sysDept.hrBelongId
      this.orgDatas.filterName = data.sysDept.hrBelongName
      this.deptVisible = true
      setTimeout(() => {
        this.$refs['deptForm'].resetFields()
        this.deptForm = {
          id: '',
          parentId: data.sysDept.id,
          parentName: data.name,
          fullName: '',
          name: '',
          grade: '',
          isCompany: '',
          hrBelongId: '',
          orgDeptId: '',
          currentHrBelongId: '',
          type: '',
          moduleType: data.moduleType ? data.moduleType : '',
          isMarketing: data.isMarketing,
          isWideAngle: 0
        }
      })
      this.deptTitle = '新增'
    },
    removeDept (e, store, data, node) {
      this.$confirm('确定要删除部门' + data.sysDept.name + '吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let delParams = {
          hrBelongId: data.sysDept.hrBelongId ? data.sysDept.hrBelongId : 0,
          id: data.id
        }
        deleteDept(delParams).then(data => {
          this.$message.success('删除成功')
          node.parent.removeChild(node)
        })
      }).catch(() => {})
    },
    editDept (e, store, data, node) {
      e.stopPropagation()
      this.deptVisible = true
      this.deptForm.parentId = data.sysDept.parentId
      this.deptForm.parentName = data.sysDept.parentName
      this.deptForm.name = data.sysDept.name
      this.deptForm.grade = data.sysDept.grade
      this.deptForm.isCompany = data.sysDept.isCompany
      this.orgDatas.orgId = data.sysDept.hrBelongId
      this.orgDatas.filterName = data.sysDept.hrBelongName
      this.deptForm.orgDeptId = data.sysDept.parentId
      this.deptForm.id = data.sysDept.id
      this.deptForm.type = data.sysDept.type
      this.deptForm.moduleType = data.sysDept.moduleType
      this.deptForm.isWideAngle = data.sysDept.isWideAngle
      this.deptForm.isMarketing = data.sysDept.isMarketing
      this.deptForm.isMarketLeader = data.sysDept.isMarketLeader
      this.deptTitle = '编辑'
      const mapSysDeptListVO = data.sysDeptListVO.map(item => item.sysDept.grade).sort()
      if (data.id !== 1 && node.parent.data.id !== 1) {
        this.gradeType = node.parent.data.sysDept.grade
      } else {
        this.gradeType = -1
      }
      this.gradeSyncType = mapSysDeptListVO[0]
      this.treeDataShow = 1
    },
    getDepartmentSaffs (dept, node) {
      // if (!node.isLeaf) {
      //   const childNodes = node.childNodes
      //   childNodes.forEach(child => {
      //     child.visible = true
      //     child.expand()
      //   })
      // }
      this.originOrgId = dept.sysDept.id
      this.staffNameData = []
      this.pageMsg.currentPage = 1
      this.pageMsg.pageSize = 10
      this.getAllStaffList(this.staffParams)
    },
    /** 分页**/
    handleSizeChange (pageSize) {
      this.pageMsg.currentPage = pageSize
      this.getAllStaffList(this.staffParams)
    },
    handleCurrentChange (currentPage) {
      this.pageMsg.currentPage = currentPage
      this.getAllStaffList(this.staffParams)
    },
    sureDept () {
      if (!this.btnMessage) return
      this.$refs['deptForm'].validate(valid => {
        if (valid) {
          if ((this.deptForm.grade === 2 || this.deptForm.grade === 3 || this.deptForm.grade === 4 || this.deptForm.grade === 5) && !this.deptForm.type) {
            this.$message.warning('组织类型Type不能为空')
            return
          }
          let type = ''
          if (this.deptForm.grade === 0) {
            type = 0
          } else if (this.deptForm.grade === 1) {
            type = 1
          } else {
            type = this.deptForm.type
          }
          let deptParams = {
            parentId: this.deptForm.parentId,
            fullName: this.orgDatas.filterName,
            name: this.deptForm.name,
            grade: this.deptForm.grade,
            isCompany: Number(this.deptForm.isCompany),
            hrBelongId: this.orgDatas.orgId,
            hrBelongName: this.orgDatas.filterName,
            id: this.deptForm.id,
            type: type,
            isMarketing: this.deptForm.isMarketing,
            moduleType: this.deptForm.moduleType,
            isWideAngle: this.deptForm.moduleType === '2' ? this.deptForm.isWideAngle : '0',
            isMarketLeader: this.deptForm.isMarketing === 1 ? this.deptForm.isMarketLeader : undefined
          }
          if (deptParams.hrBelongId === '') {
            deptParams.hrBelongId = 0
          }
          if (this.deptTitle === '新增') {
            addDept(deptParams).then(data => {
              this.$message.success('新增成功')
              this.defaultExpandedKeys.push(this.deptForm.parentId)
              setTimeout(() => {
                this._getTreeData()
                // append
              }, 400)

              setTimeout(() => { this.deptVisible = false }, 400)
            })
          } else if (this.deptTitle === '编辑') {
            if (deptParams.id === deptParams.parentId) {
              this.$message.warning('上级部门不能为自己')
              return
            }
            if (deptParams.parentId - deptParams.id > 0) {
              this.$message.warning('子部门不能做为上级组织哦')
              return
            }
            editCurrentDept(deptParams).then(data => {
              this.$message.success('编辑成功')
              this.treeDataShow = 2
              setTimeout(() => {
                this._getTreeData()
              }, 200)

              setTimeout(() => { this.deptVisible = false }, 400)
            })
          }
        }
      })
    },
    getAllStaffList (obj) {
      commonApi.getListForSys(obj).then(data => {
        if (data.result) {
          this.staffNameData = data.result.records
          this.pageMsg.total = data.result.total
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
    _getTreeData () {
      commonApi.getDeptTreelist(this.treeParams).then(data => {
        if (data.result) {
          this.dataTree = []
          data.result.forEach(item => {
            this.dataTree.push({
              sysDept: item.sysDept,
              sysDeptListVO: item.sysDeptListVO
            })
          })
          this._setIdAndNames(this.dataTree)
        }
      })
    }
  },
  filters: {
    filterStatus (status) {
      return getbaseStatus(status)
    }
  },
  computed: {
    // gradeNumbers () {},
    deptGrade () {
      return [
        { label: '事业组件', value: 0, disabled: this.gradeType >= 0 || this.gradeSyncType <= 0 },
        { label: '组件细分', value: 1, disabled: this.gradeType >= 1 || this.gradeSyncType <= 1 },
        { label: '一级成员', value: 2, disabled: this.gradeType >= 2 || this.gradeSyncType <= 2 },
        { label: '二级成员', value: 3, disabled: this.gradeType >= 3 || this.gradeSyncType <= 3 },
        { label: '三级成员', value: 4, disabled: this.gradeType >= 4 || this.gradeSyncType <= 4 },
        { label: '四级成员', value: 5, disabled: this.gradeType >= 5 || this.gradeSyncType <= 5 }
      ]
    },
    treeParams () {
      return {
        keyword: this.filterText,
        isLimit: '1'
      }
    },
    staffParams () {
      return {
        orgId: this.originOrgId,
        page: this.pageMsg.currentPage,
        size: this.pageMsg.pageSize
      }
    },
    permission () {
      return getExmine().sysOrigin
    }
  },
  created () {
    setTimeout(() => {
      this._getTreeData()
      this.getAllStaffList(this.staffParams)
    }, 200)
  }
}
</script>

<style scoped lang="less">
.origin-box{
  &/deep/.el-button--mini{
    padding:7px 8px;
  }
  &/deep/.el-button--mini.is-round{
    padding:7px 8px;
  }
  &/deep/.el-tree-node__content{
    height:36px;
  }
}
.row-tree{
  margin-top:20px;
  .el-tree{
    margin-top:10px;
    /*height: 478px;*/
    /*overflow-y: auto;*/
  }
 }
.dept-title{
  font-size:16px;
  font-weight:bold;
  color:#fff;
}
.el-select{
  width:100%;
}
.tab-wraps{
    width:300px;
    margin: 0 auto;
    height:410px;
    dl{
      dt{
        text-align:center;
        font-size:16px;
        font-weight:bold;
        margin-bottom:20px;
       }
       dd{
         line-height:36px;
         text-align:center;
       }
    }
}
</style>
