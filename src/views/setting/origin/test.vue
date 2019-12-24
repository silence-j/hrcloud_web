<template>
  <div>
    <el-table
      :data="elTable"
      :span-method="mergeTable"
      border
      style="width: 500; margin-top: 20px">
      <el-table-column
        prop="month"
        label="时间"
        width="180">
        <template slot-scope="scope">
          <span>{{scope.row.month}}</span>
          <el-button type="danger" size="mini" @click="addItem(scope)">添加</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
      label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteItem(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="less" scoped>

</style>
<script>
export default {
  data () {
    return {
      // 这里假设同一日期的数据是紧邻的 比如同一天日期的数据在前后顺序紧挨着
      elTable: [
        {
          month: '2018-12-1',
          name: '张三',
          id: 1
        },
        {
          month: '2018-12-1',
          name: '李四',
          id: 2
        },
        {
          month: '2018-12-1',
          name: '王五',
          id: 3
        },
        {
          month: '2018-12-2',
          name: '张三',
          id: 1
        },
        {
          month: '2018-12-2',
          name: '李四',
          id: 2
        },
        {
          month: '2018-12-3',
          name: '王五',
          id: 3
        },
        {
          month: '2018-12-3',
          name: '张三',
          id: 1
        },
        {
          month: '2018-12-3',
          name: '李四',
          id: 2
        },
        {
          month: '2018-12-3',
          name: '王小虎',
          id: 6
        }
      ],
      // 存放表格日期单元格的rowspan和colspan信息
      spanArr: []
    }
  },

  watch: {
    // 观测表格数据 更新行列信息
    elTable: {
      handler: function () {
        this.spanArr = this.getSpanData()
      }
    }
  },

  methods: {
    // 遍历分析表格数据 记录每一行的rowspan和colspan
    getSpanData () {
      let spanArr = []
      for (let i = 0; i < this.elTable.length; i++) {
        let obj = {}
        if (i === 0) {
          // 第一项直接设置默认的值
          obj.rowspan = 1
          obj.colspan = 1
          spanArr.push(obj)
        } else {
          if (this.elTable[i].month === this.elTable[i - 1].month) {
            // 前后两项的month相同 后面那一项rowspan和rowspan都设置为0
            obj.rowspan = 0
            obj.rowspan = 0
            spanArr.push(obj)

            // 找到month相同项中第一项 rowspan值加1
            let index = this.elTable.findIndex((item) => item.month === this.elTable[i].month)
            ++spanArr[index].rowspan
          } else {
            // 前后不相同 一个新的日期 设置默认值就好
            obj.rowspan = 1
            obj.colspan = 1
            spanArr.push(obj)
          }
        }
      }
      return spanArr
    },

    mergeTable ({ row, column, rowIndex, columnIndex }) {
      // 这里只针对第一列进行合并操作
      if (columnIndex === 0) {
        let rowspan = this.spanArr[rowIndex].rowspan
        let colspan = this.spanArr[rowIndex].colspan
        return { rowspan, colspan }
      }
    },

    addItem (scope) {
      // 假数据
      let item = {
        id: 8,
        name: 'jack'
      }
      item.month = scope.row.month
      let inserIndex = scope.$index + 1
      for (let i = inserIndex; i < this.elTable.length; i++) {
        if (this.elTable[i].month === item.month) {
          ++inserIndex
        } else {
          break
        }
      }
      this.elTable.splice(inserIndex, 0, item)
      console.log(this.spanArr)
    },

    deleteItem (index) {
      this.elTable.splice(index, 1)
    }
  }
}
</script>
