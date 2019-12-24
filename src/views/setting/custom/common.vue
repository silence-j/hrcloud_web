<template>
<div class="container">
  <div class="mt-20">
    <el-table
      :data="commonList"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="60">
      </el-table-column>
      <el-table-column
        prop="codeText"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="selectionType"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="model"
        label="对应位置">
      </el-table-column>
      <el-table-column
        label="选项值"
        width="700">
          <template slot-scope="scope">
            <span>{{scope.row.options | getOptionsValue}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <div class="operation">
            <span @click="editMsg(scope.row)" v-show="permission.indexOf('编辑')!==-1">编辑</span>
            <span @click="sortMsg(scope.row)" v-show="permission.indexOf('排序')!==-1">排序</span>
            <span @click="levelMsg(scope.row)" v-show="permission.indexOf('级别设置')!==-1&&scope.row.hasLevel===1">级别设置</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 编辑弹框 -->
  <el-dialog title="编辑" :visible.sync="editVisible" width="500px">
    <el-form :model="editForm" label-width="80px">
      <el-form-item label="名称:" class="">
        <el-input v-model="this.editForm.codeText" disabled></el-input>
      </el-form-item>
      <el-form-item label="类型:" class="">
        <el-input v-model="this.editForm.selectionType" disabled></el-input>
      </el-form-item>
      <div style="height:350px;overflow:auto;">
        <el-form-item label="选项值:" class="content-infor">
          <div v-for="item in optionsList" :key="item.id">
            <el-input v-model="item.codeText" class="fl" v-if="item.editable == 1"></el-input>
            <el-input v-model="item.codeText" class="fl" v-if="item.editable == 2" disabled></el-input>
            <div class="content-btnMsg fl">
              <span class="baseColor" v-show="item.editable == 1 && item.enable == 1" @click="enableMsg(item)">停用</span>
              <span class="red" v-show="item.editable == 1 && item.enable == 2" @click="enableMsg(item)">启用</span>
              <span class="baseColor" v-show="item.canDelete == 1" @click="deleteMsg(item,'optionsList','1')">删除</span>
            </div>
          </div>
        </el-form-item>
        <div class="addtext" @click="addContent">+新增</div>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editVisible = false" class="false" size="mini">取 消</el-button>
      <el-button type="primary" @click="editSave" size="mini">确 定</el-button>
    </span>
  </el-dialog>

  <!-- 级别设置 -->
  <el-dialog title="级别设置" :visible.sync="leveVisible" width="500px">
    <div style="height:400px;overflow:auto;">
      <div class="level-info" v-for="item in levelOptionDatas" :key="item.index">
        <span class="level-span">{{item.codeText}}</span>
        <input class="level-input" type="number" min="0" v-model="item.levelNoView">
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="leveVisible = false" class="false" size="mini">取 消</el-button>
      <el-button type="primary" @click="levelSaveMsg" size="mini">确 定</el-button>
    </span>
  </el-dialog>

  <!-- 排序弹框 -->
  <el-dialog title="排序" :visible.sync="sortVisible" width="500px">
    <div>
      <el-table
        class="sort-table"
        :data="sortOptionDatas"
        height="250"
        style="width: 100%;height:400px;overflow:auto;">
        <el-table-column
          prop="codeText"
          label="选项值">
        </el-table-column>
        <el-table-column
          label="操作"
          width="140">
          <template slot-scope="scope">
            <div class="operation">
              <span class="el-icon-upload2" @click="upWard(scope.$index)" v-show="scope.$index !== 0"></span>
              <span class="el-icon-download" @click="downWard(scope.$index)" v-show="scope.$index < sortLength - 1"></span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="sortVisible = false" class="false" size="mini">取 消</el-button>
      <el-button type="primary" @click="sortSaveMsg" size="mini">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import { getCommonList, getSaveCommon, getLeaveSave, getSortSave } from 'static/api/zdy/zdy'
import { compare } from 'assets/js/common'
import { getExmine } from 'assets/js/exmine'
export default {
  data () {
    return {
      commonList: [],
      editVisible: false,
      editForm: {
        id: '',
        code: '',
        codeText: '',
        selectionType: '',
        canDelete: '',
        editable: '',
        enable: ''
      },
      optionsList: [],
      levelOptionDatas: '',
      leveVisible: false,
      paramArray: [],
      /* 排序 */
      sortVisible: false,
      sortOptionDatas: [],
      sortLength: ''
    }
  },
  computed: {
    permission () {
      return getExmine().customCommon
    }
  },
  methods: {
    /* 获取列表 */
    _getList () {
      getCommonList().then(data => {
        if (data.result) {
          this.commonList = data.result
        }
      })
    },
    /* 新增 */
    addContent () {
      this.optionsList.push({
        id: '',
        codeText: '',
        enable: 1,
        editable: 1,
        canDelete: 1
      })
    },
    /* 删除 */
    deleteMsg (item, arr, type) {
      if (item.id) {
        this.$confirm('确定要删除' + item.codeText + '这条吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.optionsList.forEach(function (item1, index, array) {
            if (item1.id === item.id) {
              array.splice(index, 1)
            }
          })
        }).catch(() => {})
      } else {
        // console.log(this[arr])
        this[arr].splice(this[arr].findIndex(data => JSON.stringify(data) === JSON.stringify(item)), 1)
      }
    },

    /* 停用 */
    enableMsg (val) {
      if (val.enable === 1) {
        val.enable = 2
      } else {
        val.enable = 1
      }
    },
    /* 编辑 */
    editMsg (row) {
      this._getList()
      this.editForm.id = row.id
      this.editForm.code = row.code
      this.editForm.codeText = row.codeText
      this.editForm.selectionType = row.selectionType
      this.optionsList = row.options
      this.editForm.canDelete = row.canDelete
      this.editForm.editable = row.editable
      this.editForm.enable = row.enable
      this.editVisible = true
    },
    editSave () {
      let optionsMember = []
      this.optionsList.forEach((item) => {
        optionsMember.push({
          id: item.id,
          codeText: item.codeText,
          enable: item.enable
        })
      })
      let param = {
        dic: {
          code: this.editForm.code,
          id: this.editForm.id
        },
        options: optionsMember
      }
      /* 判断新增的选项值是否为空 */
      let codeTextFlag = false
      this.optionsList.filter(item => {
        item.codeText ? codeTextFlag = true : codeTextFlag = false
      })
      // console.log('11', this.optionsList)
      if (!codeTextFlag) {
        this.$message.warning({
          message: '请填写完整选项值内容'
        })
        return
      }
      getSaveCommon(param).then(data => {
        this.$message.success('保存成功!')
        this._getList()
        this.editVisible = false
      })
    },
    /* 级别设置 */
    levelMsg (row) {
      this._getList()
      this.leveVisible = true
      this.levelOptionDatas = row.options
      this.levelOptionDatas.sort(compare('levelNoView'))
    },
    levelSaveMsg () {
      let leaveArray = []
      this.levelOptionDatas.forEach(item => {
        leaveArray.push({
          id: item.id,
          levelNoView: item.levelNoView
        })
      })
      this.paramArray = leaveArray
      getLeaveSave(this.paramArray).then(data => {
        this.$message.success('保存成功!')
        this.leveVisible = false
        this._getList()
      })
    },
    /* 排序 */
    sortMsg (row) {
      this._getList()
      this.sortVisible = true
      this.sortOptionDatas = row.options
      this.sortOptionDatas.sort(compare('sortNo'))
      this.sortLength = this.sortOptionDatas.length
    },
    /* up 上移 */
    upWard (index) {
      let org1Item = Object.assign({}, this.sortOptionDatas[index])
      let org2Item = Object.assign({}, this.sortOptionDatas[index - 1])
      this.sortOptionDatas[index].sortNo = org2Item.sortNo
      this.sortOptionDatas[index - 1].sortNo = org1Item.sortNo
      this.sortOptionDatas.sort(compare('sortNo'))
    },
    /* down 下移 */
    downWard (index) {
      let org1Item = Object.assign({}, this.sortOptionDatas[index])
      let org2Item = Object.assign({}, this.sortOptionDatas[index + 1])
      this.sortOptionDatas[index].sortNo = org2Item.sortNo
      this.sortOptionDatas[index + 1].sortNo = org1Item.sortNo
      this.sortOptionDatas.sort(compare('sortNo'))
    },
    sortSaveMsg () {
      let sortArray = []
      this.sortOptionDatas.forEach(item => {
        sortArray.push({
          id: item.id,
          sortNo: item.sortNo
        })
      })
      this.paramSortArray = sortArray
      getSortSave(this.paramSortArray).then(data => {
        this.$message.success('保存成功!')
        this.sortVisible = false
        this._getList()
      })
    }
  },
  filters: {
    getOptionsValue (value) {
      return value.reduce((total, item, index, value) => index < value.length - 1 ? total + item.codeText + '，' : total + item.codeText, '')
    }
  },
  created () {
    this._getList()
  }
}
</script>

<style scoped lang="less">
.content-infor div .el-input{
    margin-bottom:10px;
    margin-right:10px;
    width:260px;
}
.content-btnMsg span{
    padding-left:8px;
    cursor:pointer;
}
.baseColor{
    color:#FF7500;
}
.fl{
    float:left;
}
.fr{
    float:right;
}
.operation span{
    padding:0px 6px;
}
.addtext{
  color:#FF7500;
  padding-left:85px;
  margin-top:-10px;
  &:hover{
    cursor: pointer;
  }
}
.red{
  color:red;
}
.clearfix{
 &::after{
   clear:both;
   font-size:0;
   height:0;
   display:block;
   visibility:hidden;
   content:"";
   line-height:0
 }
 &::before{
    clear:both;
    font-size:0;
    height:0;
    display:block;
    visibility:hidden;
    content:"";
    line-height:0
 }
}
.clearfix{
zoom:1
}

/* 级别设置 */
.level-info{
  height:30px;
  margin-bottom:10px;
  border-bottom:1px solid #f9f9f9;
  padding-bottom:10px;
}
.level-span{
  float:left;
  padding-left:10px;
  font-size:15px;
  line-height:30px;
}
.level-input{
  float: right;
  height: 15px;
  line-height: 15px;
  width: 45px;
  padding: 5px;
  margin-right:10px;
}
.el-dialog__body{
  padding:30px 0px!important;
}
/* 排序设置 */
.sort-icon i{
  padding:0px 5px;
  font-size:15px;
}
</style>
