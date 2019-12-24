<!--高级查询的功能-->
<!--跟chooseColumn合并为一个组件ChooseColumnsearch-->
<template>
  <div class="deep-level_box">
  <el-dialog
  title="高级查询"
  :visible.sync="deepLevelSearchObject.deepLevelSearchVisible"
  width="760px"
  >
    <div class="deep-dialog_body">
      <ul>
        <li v-for="(item,index) in selectedWordArr" :key="index">
          <dl class="select-dl clearfix">
            <dd>
              <el-select
              @change="getItemSearchFlag"
              v-model="item.width">
                <el-option
                v-for="(option,optionIndex) in allSelectWordArr"
                :key="optionIndex"
                :disabled="option.disabled"
                :label="option.name"
                :value="option.width"
                >
                </el-option>
              </el-select>
            </dd>
            <dd>
              <el-select v-model="item.op">
                <el-option v-for="(symbol,symbolIndex) in symbolOptions" :key="symbolIndex"
                :label="symbol.name"
                :value="symbol.value"
                ></el-option>
              </el-select>
            </dd>
            <dd v-if="item.width == 'sex'">
                <el-select v-model="item.value">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
            </dd>
             <dd v-else-if="item.width == 'isMarried'">
                <el-select v-model="item.value">
                  <el-option label="是" value="是"></el-option>
                  <el-option label="否" value="否"></el-option>
                </el-select>
            </dd>
            <dd v-else>
             <el-input v-model="item.value" placeholder="请输入关键字搜索"></el-input>
            </dd>
            <dd @click="delSelectOption(item, index)" class="del-opeator">删除</dd>
          </dl>
        </li>
        <div class="mt-20" style="margin-left:20px;">
          <el-button type="primary" size="mini" @click="addSelectOption">添加</el-button>
        </div>
      </ul>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="deepLevelSearchObject.deepLevelSearchVisible = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="sureDeepSearch" size="mini">确 定</el-button>
  </span>
  </el-dialog>
  </div>
</template>
<script>
import { listAllColumn } from 'static/api/common/common'
export default {
  data () {
    return {
      allSelectWordArr: [],
      selectedWordArr: [{ prop: '', op: '', value: '', width: '', searchFlag: '', orderColumn: '' }],
      symbolOptions: [
        { name: '包含', value: '包含' },
        { name: '不包含', value: '不包含' },
        { name: '大于', value: '大于' },
        { name: '大于等于', value: '大于等于' },
        { name: '小于', value: '小于' },
        { name: '小于等于', value: '小于等于' },
        { name: '等于', value: '等于' },
        { name: '不等于', value: '不等于' }
      ]
    }
  },
  props: {
    deepLevelSearchObject: {
      type: Object,
      deepLevelSearchVisible: {
        type: Boolean,
        default: false
      },
      selectType: {
        type: String
      }
    }
  },
  methods: {
    // 选择显示字段
    chooseMsg () {
      let preload = {
        type: this.deepLevelSearchObject.selectType
      }
      listAllColumn(preload).then(data => {
        this.allSelectWordArr = []
        if (data.result && data.result.length) {
          // this.allSelectWordArr = data.result
          data.result.forEach(item => {
            if (item.searchFlag !== 0) {
              this.allSelectWordArr.push(item)
            }
          })
        }
      })
    },
    // 添加筛选项目
    addSelectOption (value) {
      this.selectedWordArr.push({ prop: '', op: '', value: '', width: '', searchFlag: '', orderColumn: '' })
    },
    getItemSearchFlag (value) {
      let searchFlag = ''
      this.allSelectWordArr.forEach(item => {
        if (item.width === value) {
          searchFlag = item.searchFlag
        }
      })
      setTimeout(() => {
        this.selectedWordArr.forEach(item => {
          if (item.width === value) {
            item.searchFlag = searchFlag
          }
        })
      }, 500)
      // this.selectedWordArr[index].searchFlag = flag
    },
    // 删除筛选项目
    delSelectOption (item, index) {
      this.selectedWordArr.splice(index, 1)
    },
    sureDeepSearch () {
      this.$emit('sureDeepSearch', this.selectedWordArr)
    }
  },
  watch: {
    deepLevelSearchObject: {
      handler (newValue, oldValue) {
        // this.chooseMsg()
        // this.symbolOptions = []
        // this.selectedWordArr = []
      },
      deep: true
    },
    'deepLevelSearchObject.selectType': {
      handler (newValue, oldValue) {
        this.chooseMsg()
      },
      deep: true
    }
  },
  created () {
    this.chooseMsg()
  }
}
</script>
<style lang="less" scoped>
@import '~assets/less/variable';
.deep-dialog_body{
  ul{
    li{
      position:relative;
     &:not(:nth-of-type(1)) {
       margin-top:20px;
     }
    .select-dl{
      dd{
        float: left;
        margin-left:10px;
        &.del-opeator{
          margin-top:15px;
          cursor:pointer;
          color:@base-color;
          &:hover{
            text-decoration: underline;
          }
        }
      }
    }
   }
  }
}
</style>
