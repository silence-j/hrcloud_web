<template>
  <el-table
    :data="data"
    border
    min-width="500px"
    style="width: 100%;"
    :row-style="showTr">
    <el-table-column
    align="center"
    v-for="(column, index) in columns"
    :key="column.dataIndex"
    :label="column.text">
      <template slot-scope="scope">
        <div
         @click="toggle(scope.$index, scope.row, $event)"
         style="cursor:pointer;max-width:500px"
         class="text-overflow"
         :title="scope.row[column.dataIndex]"
        >
        <span
        v-if="spaceIconShow(index)"
        v-for="(space, levelIndex) in scope.row._level"
        :key="levelIndex"
         class="ms-tree-space"></span>
        <span class="button is-outlined is-primary is-small"
         v-if="toggleIconShow(index,scope.row)"
         >
          <i v-if="!scope.row._expanded" class="el-icon-caret-right" aria-hidden="true"></i>
          <i v-if="scope.row._expanded" class="el-icon-caret-bottom" aria-hidden="true"></i>
        </span>
        <span v-else-if="index===0" class="ms-tree-space"></span>
        {{scope.row[column.dataIndex]}}
        </div>
      </template>
    </el-table-column>
    <el-table-column
    label="操作"
    width="220px"
    align="center"
    v-if="treeType === 'normal'">
      <template slot-scope="scope">
        <el-button
        v-show="permission.indexOf('新增')!==-1"
        @click="handleAdd(scope.row)"
        type="small">
            新增
        </el-button>
        <el-button
        type="small"
        v-show="permission.indexOf('编辑')!==-1"
        @click="handleEdit(scope.row)"
       >
            编辑
        </el-button>
        <el-button
         v-show="permission.indexOf('删除')!==-1"
          size="small"
          type="danger"
          @click="handleDelete(scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { treeToArray } from 'assets/js/getDatas'
import { getExmine } from 'assets/js/exmine'
export default {
  name: 'tree-grid',
  props: {
    // 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
    treeStructure: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    // 这是相应的字段展示
    columns: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 这是数据源
    dataSource: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 这个作用是根据自己需求来的，比如在操作中涉及相关按钮编辑，删除等，需要向服务端发送请求，则可以把url传过来
    requestUrl: {
      type: String,
      default: function () {
        return ''
      }
    },
    // 这个是是否展示操作列
    treeType: {
      type: String,
      default: function () {
        return 'normal'
      }
    },
    // 是否默认展开所有树
    defaultExpandAll: {
      type: Boolean,
      default: function () {
        return false
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    permission () {
      return getExmine().sysOrigin
    },
    // 格式化数据源
    data: function () {
      let me = this
      if (me.treeStructure) {
        let data = treeToArray(me.dataSource, null, null, me.defaultExpandAll)
        return data
      }
      return me.dataSource
    }
  },
  methods: {
    // 显示行
    showTr: function ({ row, index }) {
      let show = (row._parent ? (row._parent._expanded && row._parent._show) : true)
      row._show = show
      return show ? '' : 'display:none;'
    },
    // 展开下级
    toggle: function (trIndex, row, event) {
      let me = this
      let record = me.data[trIndex]
      record._expanded = !record._expanded
      this.$emit('getRole', row)
    },
    // 显示层级关系的空格和图标
    spaceIconShow (index) {
      let me = this
      if (me.treeStructure && index === 0) {
        return true
      }
      return false
    },
    // 点击展开和关闭的时候，图标的切换
    toggleIconShow (index, record) {
      let me = this
      if (me.treeStructure && index === 0 && record.children && record.children.length > 0) {
        return true
      }
      return false
    },
    handleAdd (row) {
      this.$emit('handleAdd', row)
    },
    handleEdit (row) {
      this.$emit('handleEdit', row)
    },
    handleDelete (row) {
      this.$emit('handleDelete', row)
    }
  }
}
</script>
<style lang="less" scoped>
  .ms-tree-space{position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    font-size:20px;
    height: 14px;}
  .ms-tree-space::before{content: ""}
  .el-table .el-table__header th{
    text-align: center !important;
  }
  table td{
    line-height: 26px;
  }
</style>
