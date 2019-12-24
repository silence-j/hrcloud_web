<template>
<div class="series-box">
  <div class="btn-collection_box">
    <el-button size="mini" type="primary" @click="showSalary" v-show="permission.indexOf('新增')!==-1">新增</el-button>
    <el-button size="mini" type="primary" @click="showOrdinary" v-show="permission.indexOf('普通构成设置')!==-1">普通构成设置</el-button>
    <el-button size="mini" type="primary" @click="showPost" v-show="permission.indexOf('岗位构成设置')!==-1">岗位构成设置</el-button>
  </div>
  <div class="tree-box mt-20">
    <el-tree
    :data="salayTree"
    :props="defaultProps"
     :default-expanded-keys="defaultExpandedKeys"
     @node-expand="nodeExpand"
     @node-collapse="nodeCollapse"
     node-key="id"
     ref="salaryTreeRef"
    @node-click="handleNodeClick">
       <span class="custom-tree-node" slot-scope="{ node, data }">
        <span class="node-label">{{node.label}}<a style="color:red" v-if="data.enable === '0'">（已停用）</a></span>
        <span class="tree-btns clearfix">
          <el-button
            type="text"
            size="mini"
            v-if="permission.indexOf('新增')!==-1&&data.enable === '1' && data.isEnd !=='1'"
            @click="(e) => append(e,node,data)">
            新增
          </el-button>
          <el-button
            type="text"
            size="mini"
            v-if="permission.indexOf('编辑')!==-1&&data.enable === '1'"
            @click="(e) => editSalary(e,node, data)">
            编辑
          </el-button>
          <el-button
            type="text"
            size="mini"
            v-if="permission.indexOf('停用')!==-1"
            @click="(e) => stopSalary(e,node, data)">
            {{data.enable === '1'? '停用':'启用'}}
          </el-button>
          <el-button
            type="text"
            size="mini"
            v-if="permission.indexOf('删除')!==-1"
            @click="(e) => remove(e,node, data)">
            删除
          </el-button>
          <el-button
            type="text"
            size="mini"
            v-show="data.ssList&&data.ssList.length"
            @click="(e) => expendAll(e,node, data)">
            展开全部
          </el-button>
          <el-button
            type="text"
            size="mini"
            v-show="permission.indexOf('排序')!==-1"
            v-if="node.previousSibling"
            @click="(e) => upItem(e,node, data)">
            上移
          </el-button>
          <el-button
            type="text"
            size="mini"
            v-show="permission.indexOf('排序')!==-1"
            v-if="node.nextSibling"
            @click="(e) => downItem(e,node, data)">
            下移
          </el-button>
        </span>
      </span>
    </el-tree>
    <!--新增工资系列-->
    <el-dialog
      :title="addTitle+'工资系列'"
      :visible.sync="seriesVisible"
      width="700px"
      :model="seriesForm"
      v-draggable
      >
    <el-form
    :model="seriesForm"
      label-width="96px"
      class="series-form"
      ref="serieRef"
    >
      <el-form-item
      v-show="showIsEnd"
      label="是否最末级："
      >
        <el-radio-group v-model="seriesForm.isEnd" size="mini">
        <el-radio label="1">是</el-radio>
        <el-radio label="0">否</el-radio>
      </el-radio-group>
      </el-form-item>
      <el-form-item
      label="名字："
      prop="name"
      :rules="{
        required: true, message: '名字不能为空', trigger: 'blur'
      }"
      >
        <el-input v-model.trim="seriesForm.name" style="width:250px" placeholder="请输入名字"></el-input>
      </el-form-item>
      <el-form-item
        label="单位："
      >
        <el-select v-model="seriesForm.unit" style="width:250px">
          <el-option label="元/月" value="元/月"></el-option>
          <el-option label="元/年" value="元/年"></el-option>
        </el-select>
      </el-form-item>
      <!--<el-form-item label="sortNo" v-if="addTitle==='编辑'">
        <el-input v-model="seriesForm.editSortNo" type="number"></el-input>
      </el-form-item>-->
      <el-row
          :gutter="10"
          v-for="(item,index) in ordinaryArr" :key="item.id? item.id: index"
          :class="{'mt-10':index!==0}"
          >
            <el-col :span="1" class="mt-15"><el-checkbox class="ripple" v-model="item.checked" :disabled="item.disabled"></el-checkbox>
            </el-col>
            <el-col :span="6" class="mt-15">{{item.name}}</el-col>
            <el-col :span="10">
              <el-input v-model.trim="item.amount" type="number" :disabled="item.disabled">
                <!--<template slot="append">{{seriesForm.unit}}</template>-->
              </el-input>
            </el-col>
      </el-row>
      <el-row
      :gutter="10"
      class="mt-20"
      v-for="(item,index) in postArr" :key="item.id? item.id: index"
      >
      <el-col :span="1"><el-checkbox class="ripple" v-model="item.checked" :disabled="item.disabled"></el-checkbox>
            </el-col>
            <el-col :span="6">{{item.name}}</el-col>
            <el-col :span="6">
              {{item.amount}}{{item.unit}}
            </el-col>
            <el-col :span="6">
              {{item.isPart === '1' ? '可兼职' : '不可兼职'}}
            </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="seriesVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" @click="sureSerives" size="mini">确 定</el-button>
    </span>
  </el-dialog>
  <!--普通构成设置-->
    <el-dialog
     title="普通系列构成"
     class="normal-sys"
      :visible.sync="ordinaryVisible"
      width="600px"
      v-draggable
    >
      <div class="ordinary-box ordinary-box-style">
        <el-row
         v-for="(item,index) in ordinaryArr"
         :key="index"
         class="mt-10 m-10-style"
        >
          <div v-if="!item.id">
            <el-col :span="16">
               <el-input v-model.trim="item.name" placeholder="请输入名称"></el-input>
          </el-col>
          <el-col style="width: auto;">
              <el-button type="text"  class="ordinary-btn ripple" @click="delSalary(item, 'ordinaryArr','1')">删除</el-button>
              <el-button type="text" class="ordinary-btn ripple" @click="saveSalary(item ,'新增','1')">保存</el-button>
          </el-col>
          </div>
          <div v-else>
              <el-col :span="16">
               <el-input v-model.trim="item.name" placeholder="请输入名称" v-if="item.edit"></el-input>
               <span v-else>{{item.name}}</span>
          </el-col>
          <el-col style="width: auto">
              <el-button type="text"  class="ordinary-btn ripple" @click="delSalary(item, 'ordinaryArr','1')">删除</el-button>
               <el-button type="text"  class="ordinary-btn ripple" @click="saveSalary(item, '编辑','1')" v-if="item.edit">保存</el-button>
              <el-button v-else  class="ordinary-btn ripple" @click="item.edit = true" type="text">编辑</el-button>
          </el-col>
          </div>
        </el-row>
        <el-button type="text" class="mt-20 addRipple ripple" @click="addSalary('ordinaryArr')"><i class="el-icon-plus">新增</i></el-button>
      </div>
     <span slot="footer" class="dialog-footer">
      <el-button @click="ordinaryVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" @click="sureSalary('1')" size="mini">确 定</el-button>
    </span>
    </el-dialog>
      <!--岗位构成设置-->
      <el-dialog
      :visible.sync="postVisible"
      width="600px"
      title="岗位构成设置"
      v-draggable
      >
      <div class="post-vis-box">
        <el-row
        v-for="(item,index) in postArr"
         :key="index"
         :gutter="20"
         class="mt-10">
           <div v-if="item.edit">
            <el-col :span="8">
               <el-input v-model.trim="item.name" placeholder="请输入名称">
               </el-input>
          </el-col>
            <el-col :span="8">
               <el-input v-model="item.amount" placeholder="请输入金额">
               <template slot="append">元/月</template>
               </el-input>
          </el-col>
          <el-col :span="3">
            <el-checkbox v-model="item.isParting" class="mt-10" @change="getItemIsPart">可兼职</el-checkbox>
          </el-col>
          <el-col style="width: auto">
              <el-button type="text"  class="ordinary-btn ripple" @click="delSalary(item, 'postArr','2')">删除</el-button>
              <el-button type="text" class="ordinary-btn ripple" @click="saveSalary(item ,'新增', '2')">保存</el-button>
          </el-col>
          </div>
          <div v-else>
            <el-col :span="16">
              <dl class="salary-dl">
                <dd class="dd-name">{{item.name}}</dd>
                <dd style="margin-left:20px">{{item.amount}}元/月</dd>
                <dd style="margin-left:40px"><span v-if="item.isPart=='1'">可兼职</span><span v-else>不可兼职</span></dd>
              </dl>
            </el-col>
             <el-col style="margin-top:-13px; width: auto;">
              <el-button type="text"  class="ordinary-btn ripple" @click="delSalary(item, 'postArr', '2')">删除</el-button>
               <el-button type="text"  class="ordinary-btn ripple" @click="saveSalary(item, '编辑', '2')" v-if="item.edit">保存</el-button>
              <el-button v-else  class="ordinary-btn ripple" @click="item.edit = true" type="text">编辑</el-button>
          </el-col>
          </div>
         </el-row>
          <el-button type="text" class="mt-20 ripple" @click="addSalary('postArr')"><i class="el-icon-plus">新增</i></el-button>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="postVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" @click="sureSalary('2')" size="mini">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</div>
</template>
<script>
import { getExmine } from 'assets/js/exmine'
import anime from 'animejs'
import { debounce } from 'lodash'
import { getSalaryListByPid, saveSingleSalary, getSalarySettingList, saveListSalary } from 'static/api/setting/index'
let originSalaryObj = { name: '', id: '', parentId: '', gradeType: '', sortNo: '', amount: '', checked: false, edit: true, disabled: false }
export default {
  data () {
    return {
      defaultExpandedKeys: [],
      seriesVisible: false,
      ordinaryVisible: false,
      postVisible: false,
      bestSortNo: 0,
      seriesForm: {
        isEnd: '0',
        name: '',
        unit: '元/月',
        id: '',
        parentId: '0',
        gradeType: '0',
        sortNo: '',
        editSortNo: ''
      },
      addTitle: '新增',
      ordinaryArr: [Object.assign({}, originSalaryObj)],
      otherOrdinaryArr: [],
      postArr: [Object.assign({}, originSalaryObj, { amount: '', isPart: false })],
      otherPostArr: [],
      salayTree: [],
      defaultProps: {
        children: 'ssList',
        label: 'name'
      },
      childrenIds: [],
      showIsEnd: true
    }
  },
  computed: {
    permission () {
      return getExmine().customSalary
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
    // 循环遍历找到所有的子节点
    loopFindChildrenId (data, arr) {
      data.forEach(item => {
        arr.push(item.id)
        if (item.ssList) {
          this.loopFindChildrenId(item.ssList, arr)
        }
      })
    },
    // 获取sortNo 有sslit获取sslist里面的最大值 +1 没有获取 当前的sortNo + 1
    _getBestSortNo (data) {
      let sortNo = 0
      if (data.ssList && data.ssList.length) {
        sortNo = Math.max(...data.ssList.map(item => Number(item.sortNo))) + 1
      } else {
        sortNo = Number(data.sortNo) + 1
      }
      return sortNo
    },
    // 新增节点
    append (e, node, data) {
      this.addTitle = '新增'
      // this._getAllSalaryList()
      this.showIsEnd = true
      e.stopPropagation()
      this.seriesForm.name = ''
      // this._getSalaryList('2')
      this.seriesForm.parentId = data.id
      this.seriesForm.gradeType = Number(data.gradeType) + 1
      this.seriesForm.isEnd = '0'
      this.seriesForm.id = ''
      this.seriesForm.unit = data.unit || '元/月'
      this.seriesForm.sortNo = this._getBestSortNo(data)
      // this._getAllSalaryList()
      if (data.parentId !== 0 && data.ordArr) {
        this.ordinaryArr = []
        // let nowOrdArr = data.ordArr ? data.ordArr.map(item => item.name) : []
        // let parentOrds = this.deepClone(node.parent.data.ordArr)
        data.ordArr.forEach(item =>
          this.ordinaryArr.push(Object.assign({}, item, { edit: false, checked: false, disabled: false }))
        )
        // parentOrds.forEach(item => {
        //   item.id = ''
        //   if (nowOrdArr.indexOf(item.name) === -1) {
        //     this.ordinaryArr.push(Object.assign({}, item, { edit: false, checked: false, disabled: true, grandId: item.grandId }))
        //   }
        // })
        // this.ordinaryArr = node.parent.data.ordArr.map(item => Object.assign({}, item, {edit: false, checked: false, disabled: nowOrdArr.indexOf(item.name) === -1}))
        // 当前data和父级data underIds的差集===disbeld的岗位
        // const nodePrarentUnderIds = node.parent.data.underIds ? node.parent.data.underIds.split(',') : []
        const constArr = data.underIds ? data.underIds.split(',') : []
        // const constArr = nodePrarentUnderIds.concat((data.underIds ? data.underIds.split(',') : [])).filter(v => !node.parent.data.underIds.split(',').includes(v) || !data.underIds.split(',').includes(v))
        this.postArr = this.otherPostArr.filter(item => constArr.indexOf(item.id + '') !== -1).map(item => Object.assign({}, item, { checked: false, disabled: false }))
      } else {
        this.ordinaryArr = []
        if (data.ordArr && data.ordArr.length) {
          let selfOrdArr = data.ordArr ? data.ordArr : []
          // let selfOrdNames = selfOrdArr.map(item => item.name)
          // let newOtherArr = this.deepClone(this.otherOrdinaryArr)
          selfOrdArr.forEach(item => {
            this.ordinaryArr.push(Object.assign({}, item, { edit: false, checked: false, disabled: false }))
          })
          // newOtherArr.forEach(item => {
          //   item.id = ''
          //   if (selfOrdNames.indexOf(item.name) === -1) {
          //     this.ordinaryArr.push(Object.assign({}, item, { edit: false, checked: false, disabled: true, grandId: item.grandId }))
          //   }
          // })
          // this.ordinaryArr = data.ordArr.map(item => Object.assign({}, item, {edit: false, checked: false, disabled: false}))
        } else {
          // this.ordinaryArr = this.otherOrdinaryArr
          this.ordinaryArr = []
        }
        this.postArr = []
        if (data.underIds) {
          let selfPostIds = data.underIds.split(',')
          // console.log('self', selfPostIds, this.otherPostArr)
          this.otherPostArr.forEach(item => {
            if (selfPostIds.indexOf(item.id + '') !== -1) {
              this.postArr.push(Object.assign({}, item, { edit: false, checked: false, disabled: false }))
            }
          })
        } else {
          // this.postArr = this.otherPostArr
          this.postArr = []
        }
      }
      this.seriesVisible = true
    },
    // 编辑节点
    editSalary (e, node, data) {
      this.addTitle = '编辑'
      e.stopPropagation()
      if (data.ssList && data.ssList.length) {
        this.showIsEnd = false
      } else {
        this.showIsEnd = true
      }
      let indexOf = data.name.indexOf(' ')
      this.seriesForm.name = indexOf === -1 ? data.name : data.name.slice(0, data.name.indexOf(' '))
      this.seriesForm.isEnd = data.isEnd
      this.seriesForm.parentId = data.parentId
      this.seriesForm.id = data.id
      this.seriesForm.gradeType = data.gradeType
      this.seriesForm.unit = data.unit || '元/月'
      this.seriesForm.sortNo = ''
      // this.seriesForm.editSortNo = data.sortNo
      if (data.parentId !== 0) {
        // const ordNames = data.ordArr ? data.ordArr.map(item => item.name) : []
        const dataOrdNmaes = data.ordArr ? data.ordArr.map(item => item.name) : []
        const parentOrds = this.deepClone(node.parent.data.ordArr)
        // const parentNames = parentOrds.map(item => item.name)
        const ords = []
        parentOrds.forEach(item => {
          if (dataOrdNmaes.indexOf(item.name) !== -1) {
            item.id = data.ordArr.find(x => x.name === item.name).id
            item.amount = data.ordArr.find(x => x.name === item.name).amount
            ords.push(Object.assign({}, item, { edit: false, checked: true, disabled: false }))
          } else {
            item.id = ''
            ords.push(Object.assign({}, item, { edit: false, checked: false, disabled: false }))
          }
        })
        // parentOrds.forEach(item => {
        //   item.id = ''
        //   if (ordNames.indexOf(item.name) === -1) {
        //     ords.push(Object.assign({}, item, {edit: false, checked: false, disabled: false, grandId: item.grandId}))
        //   }
        // }) // 获取当前的ordArr, 父级里面有自己里面没有的给disbled:true
        this.ordinaryArr = ords
        // let constArr = node.parent.data.underIds.split(',').concat(data.underIds.split(',')).filter(v => node.parent.data.underIds.split(',').includes(v) ^ data.underIds.split(',').includes(v))
        let parentPostIds = node.parent.data.underIds ? node.parent.data.underIds.split(',') : []
        let dataPostIds = data.underIds ? data.underIds.split(',') : []
        this.postArr = this.otherPostArr.filter(item => parentPostIds.indexOf(item.id + '') !== -1).map(item =>
          Object.assign({}, item, { checked: dataPostIds.indexOf(item.id + '') !== -1, disabled: false
          }))
      } else {
        this.postArr = []
        if (data.underIds) {
          let selfPostIds = data.underIds.split(',')
          this.otherPostArr.forEach(item => {
            if (selfPostIds.indexOf(item.id + '') === -1) {
              this.postArr.push(Object.assign({}, item, { edit: false, checked: false, disabled: false }))
            } else {
              this.postArr.push(Object.assign({}, item, { edit: false, checked: true, disabled: false }))
            }
          })
        } else {
          this.postArr = this.otherPostArr
        }
        //  this.postArr = this.otherPostArr
        const selfOrdIds = data.ordArr ? data.ordArr : []
        const selfIds = selfOrdIds.map(item => item.name)
        const newOtherArr = this.deepClone(this.otherOrdinaryArr)
        this.ordinaryArr = []
        selfOrdIds.forEach(item => {
          this.ordinaryArr.push(Object.assign({}, item, { edit: false, checked: true, disabled: false, grandId: item.grandId }))
        })
        newOtherArr.forEach(item => {
          item.id = ''
          if (selfIds.indexOf(item.name) === -1) {
            this.ordinaryArr.push(Object.assign({}, item, { edit: false, checked: false, disabled: false, grandId: item.grandId }))
          }
        })
      }
      this.seriesVisible = true
    },
    // 停用
    stopSalary (e, node, data) {
      e.stopPropagation()
      let id = data.id
      let enableParams = {
        id,
        enable: data.enable === '1' ? '0' : '1'
      }
      let stopTxt = data.enable === '1' ? '停用' : '启用'
      this.$confirm('确认' + stopTxt + (data.isEnd === '1' ? data.name.split(' ')[0] : data.name) + '吗？', '提示', {
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
    // 删除
    remove (e, node, data) {
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
    // 展开全部
    expendAll (e, node, data) {
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
    // 上移
    upItem (e, node, data) {
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
        // this.animeFn(e, -26, 'up')
        setTimeout(() => {
          this._getSalaryTree()
        }, 200)
      })
    },
    // 移动动画
    animeFn (e, px, type) {
      let target = e.target.parentNode.parentNode.parentNode.parentNode.parentNode
      let targetGrand = e.target.parentNode.parentNode.parentNode.parentNode.parentNode
      let targetNext = type === 'up' ? targetGrand.previousElementSibling : targetGrand.nextElementSibling
      anime({
        targets: target,
        translateY: px,
        complete: (anim) => {
        }
      })
      anime({
        targets: targetNext,
        translateY: -px,
        complete: (anim) => {
        }
      })
    },
    // 下移
    downItem (e, node, data) {
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
        // this.animeFn(e, 26, 'down')
        setTimeout(() => {
          this._getSalaryTree()
        }, 200)
      })
    },
    handleNodeClick (data) {
      console.log(data)
    },
    // 新增工资系列
    sureSerives: debounce(function () {
      this.$refs.serieRef.validate(valid => {
        if (valid) {
          let checkArr = this.ordinaryArr.filter(x => x.checked)
          if (this.seriesForm.isEnd === '1' && !checkArr.length) {
            this.$message.warning('最末级的薪资必须选择基本构成')
            return
          }
          // let newOrdianry = this.ordinaryArr.filter(item => item.checked)
          const postIds = this.postArr.filter(item => item.checked).map(item => item.id)
          const saveListParams = [
            {
              id: this.seriesForm.id,
              type: '4',
              // grandId: '',
              parentId: this.seriesForm.parentId,
              gradeType: this.seriesForm.gradeType,
              name: this.seriesForm.name,
              isEnd: this.seriesForm.isEnd,
              unit: this.seriesForm.unit,
              underIds: postIds.join(','),
              sortNo: this.addTitle === '新增' ? this.seriesForm.sortNo : ''
            }
            // type: '4'
          ]
          if (this.ordinaryArr.length) {
            console.log('ordinaryArr', this.ordinaryArr)
            this.ordinaryArr.forEach(item => {
              const itemParams = {
                id: this.addTitle === '编辑' ? item.id : '',
                amount: item.amount,
                unit: this.seriesForm.unit,
                isEnd: this.seriesForm.isEnd,
                name: item.name,
                type: '1'
              }
              if (this.seriesForm.parentId === 0 || this.seriesForm.parentId === '0') {
                itemParams.grandId = item.grandId
              } else {
                itemParams.grandId = item.grandId
              }
              if (this.addTitle === '编辑') {
                if (item.id) {
                  saveListParams.push(
                    item.checked ? Object.assign({}, itemParams) : Object.assign({}, itemParams, { deleteTag: '1' })
                  )
                } else {
                  if (item.checked) {
                    saveListParams.push(Object.assign({}, itemParams))
                  }
                }
              } else {
                if (item.checked) {
                  saveListParams.push(Object.assign({}, itemParams))
                }
              }
            })
          }
          saveListSalary(saveListParams).then(data => {
            this.$message.success(this.addTitle + '成功')
            setTimeout(() => {
              this.seriesVisible = false
              this._getSalaryTree()
            }, 200)
          })
        }
      })
    }, 500),
    // 递归把有isEnd='1'的name拼成 name+amount+unit
    _getSplitEndName (arr) {
      arr.forEach(item => {
        if (item.isEnd === '1' && (item.type === 4 || item.type === '4')) {
          // item.name = item.name
          if (item.ssList && item.ssList.length) {
            item.name = item.name + ' ' + this._splitCommonAndPostName(item.ssList)
          }
        }
        if (item.ssList && item.ssList.length) {
          this._getSplitEndName(item.ssList)
        }
      })
    },
    // 普通工资构成和岗位工资构成拼成字符串给name

    _splitCommonAndPostName (arr) {
      let splitName = ''
      arr.forEach(item => {
        if (item.type === 1 || item.type === '1') {
          splitName += item.name + ':' + item.amount + item.unit
        }
      })
      return splitName
    },
    // 把type =3的单独取出来
    _getType3 (arr) {
      arr.forEach(item => {
        if (item.ssList && item.ssList.length) {
          let orgItem = Object.assign({}, item)
          item.ssList = orgItem.ssList.filter(item => item.type === 4)
          item.ordArr = orgItem.ssList.filter(item => item.type !== 4)
          this._getType3(item.ssList)
        }
      })
    },
    _getSalaryTree () {
      getSalaryListByPid({ type: '4' }).then(data => {
        if (data.result) {
          this._getSplitEndName(data.result)
          this._getType3(data.result)
          this.salayTree = data.result
          if (data.result.length) {
            this.seriesForm.sortNo = Math.max(...data.result.map(item => Number(item.sortNo))) + 1
          }
        }
      })
    },
    // 新增
    addSalary (arr) {
      if (arr === 'ordinaryArr') {
        this.ordinaryArr.push(Object.assign({}, originSalaryObj, { sortNo: this.otherOrdinaryArr.length ? Number(this.otherOrdinaryArr[this.otherOrdinaryArr.length - 1].sortNo) + 1 : 0 }))
      } else if (arr === 'postArr') {
        this.postArr.push(Object.assign({}, originSalaryObj, { isPart: '0', isParting: false, sortNo: this.otherPostArr ? Number(this.otherPostArr[this.otherPostArr.length - 1].sortNo) + 1 : 0 }))
      }
    },
    getItemIsPart (value) {
      if (value) {}
    },
    showSalary () {
      this.addTitle = '新增'
      this.seriesForm.name = ''
      this.seriesForm.parentId = '0'
      this.seriesForm.gradeType = '0'
      this.seriesForm.id = ''
      this._getAllSalaryList()
      this.seriesVisible = true
      this.showIsEnd = true
    },
    _getAllSalaryList () {
      this._getSalaryList('1')
      this._getSalaryList('2')
    },
    // 显示普通系列构成 ===调list接口放在这边
    showOrdinary () {
      this.ordinaryVisible = true
      this._getSalaryList('1')
    },
    showPost () {
      this.postVisible = true
      this._getSalaryList('2')
    },
    // 单个保存
    saveSalary (item, msg, type) {
      if (!item.name) {
        this.$message.warning('名称必填')
        return
      }
      let singleParams = {
        type: type,
        gradeType: item.gradeType ? item.gradeType : '0',
        parentId: item.parentId ? item.parentId : '0',
        name: item.name,
        id: item.id,
        sortNo: item.id ? '' : item.sortNo
      }
      if (item.amount) {
        singleParams.amount = item.amount
      }
      if (item.isPart) {
        item.isParting ? singleParams.isPart = '1' : singleParams.isPart = '0'
      }
      saveSingleSalary(singleParams).then(data => {
        this.$message.success(item.id ? '保存成功' : msg + '成功')
        setTimeout(() => {
          this._getSalaryList(type)
        }, 200)
      })
    },
    // 删除
    delSalary (item, arr, type) {
      if (item.id) {
        this.$confirm('确认删除' + item.name, '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let delParams = {
            id: item.id,
            deleteTag: 1
          }
          saveSingleSalary(delParams).then(data => {
            this.$message.success('删除成功')
            setTimeout(() => {
              this._getSalaryList(type)
              this._getSalaryTree()
            }, 200)
          })
        }).catch(() => {
        })
      } else {
        this[arr].splice(this[arr].findIndex(data => JSON.stringify(data) === JSON.stringify(item)), 1)
      }
    },
    // 批量保存
    sureSalary (type) {
      let saveListParams = []
      if (type === '1') {
        this.ordinaryArr.forEach(item => {
        //  if (!item.id) this.bestSortNo = this.bestSortNo + 1
          if (item.name) {
            saveListParams.push({
              type: '1',
              gradeType: item.gradeType ? item.gradeType : '0',
              parentId: item.parentId ? item.parentId : '0',
              name: item.name,
              id: item.id,
              sortNo: item.id ? '' : item.sortNo
            })
          }
        })
      } else if (type === '2') {
        this.postArr.forEach(item => {
          // if (!item.id) this.bestSortNo = this.bestSortNo + 1
          saveListParams.push({
            type: '2',
            gradeType: item.gradeType ? item.gradeType : '0',
            parentId: item.parentId ? item.parentId : '0',
            name: item.name,
            id: item.id,
            sortNo: item.id ? '' : item.sortNo,
            amount: item.amount,
            isPart: item.isParting ? '1' : '0'
          })
        })
      }
      saveListSalary(saveListParams).then(data => {
        this.$message.success('保存成功')
        setTimeout(() => {
          type === '2' ? this.postVisible = false : this.ordinaryVisible = false
          this._getSalaryList(type)
        }, 200)
      })
    },
    // 获取薪资list
    _getSalaryList (type) {
      let salaryListParams = {
        type: type
      }
      getSalarySettingList(salaryListParams).then(data => {
        if (data.result) {
          if (type === '1') {
            this.ordinaryArr = this.otherOrdinaryArr = data.result.map(item => Object.assign({}, item, { edit: false, checked: false, disabled: false, grandId: item.grandId ? item.grandId : item.id }))
          } else if (type === '2') {
            this.postArr = this.otherPostArr = data.result.map(item => Object.assign({}, item, { edit: false, isPart: item.isPart, isParting: item.isPart === '1', checked: false, disabled: false }))
          }
          // 获取返回的数组里面最大的sortNo
          // this.bestSortNo = Math.max(...data.result.map(item => Number(item.sortNo)))
        }
      })
    }
  },
  created () {
    this._getSalaryTree()
    this._getAllSalaryList()
  }
}
</script>
<style lang="less" scoped>
.tree-box{
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
      .el-button{
        padding:0px;
      }
    }
  }
  .normal-sys{
    &/deep/.el-dialog__body{
      position: relative;
      .addRipple{
        position: absolute;
        left: 20px;
      }
    }
  }
}
.ordinary-box-style{
  .m-10-style{
    height: 40px;
    line-height: 40px;
  }
}
.ordinary-btn{
  height:40px;
  float:right;
  margin-left:10px;
}
.salary-dl{
  dd{
    float:left;
    &.dd-name{
      width:80px;
      text-align:left;
    }
  }
}
.series-form{
  width:500px;
  margin:0 auto;
}
</style>
