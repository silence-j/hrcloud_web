<template>
<div class="choose-search_box">
    <!--齿轮筛选字段-->
   <el-dialog title="列表显示字段" width="650px" :visible.sync="chooseData.chooseVisible">
      <div class="module-opera table-setting-item">
        <el-form style="padding: 0 10px;">
          <el-form-item>
            <el-checkbox-group v-model="chooseData.fieldList">
              <el-checkbox v-for="item in fieldOptions" :label="item.prop" :key="item.name">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
   <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="chooseData.chooseVisible = false" class="false">取 消</el-button>
        <el-button size="mini" type="primary" @click="chooseSure" >确 定</el-button>
	</span>
    </el-dialog>
    <!--高级查询-->
    <el-dialog title="高级查询" width="760px" :visible.sync="chooseData.deepSearchVisible">
          <div class="deep-dialog_body">
      <ul>
        <li v-for="(item,index) in chooseData.selectedWordArr" :key="index">
          <dl class="select-dl clearfix">
            <dd>
              <el-select
              @change="getItemSearchFlag(item.width, index)"
              v-model="item.width">
                <el-option
                v-for="(option,optionIndex) in deepLevelOptions"
                :key="optionIndex"
                :disabled="option.disabled"
                :label="option.name"
                :value="option.width"
                >
                </el-option>
              </el-select>
            </dd>
            <dd v-if="item.showSearchFlag">
              <el-select
              @change="changeItemValue(item.width, index)"
              v-model="item.op">
                <el-option v-for="(symbol,symbolIndex) in symbolOtherOptions" :key="symbolIndex"
                :label="symbol.name"
                :value="symbol.value"
                ></el-option>
              </el-select>
            </dd>
            <dd v-else>
              <el-select
              @change="changeItemValue(item.width, index)"
              v-model="item.op">
                <el-option v-for="(symbol,symbolIndex) in symbolOptions" :key="symbolIndex"
                :label="symbol.name"
                :value="symbol.value"
                ></el-option>
              </el-select>
            </dd>
            <dd v-if="item.showSearchFlag">
                <el-select v-model="item.value">
                  <el-option
                  v-for="item in searchTypes"
                  :label="item.codeText"
                  :value="item.id"
                  :key="item.id"
                  ></el-option>
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
    <el-button @click="chooseData.deepSearchVisible = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="sureDeepSearch" size="mini">确 定</el-button>
    </span>
    </el-dialog>
</div>
</template>
<script>
import { listAllColumn, saveBatch, getListByTypes } from 'static/api/common/common'
import { getToken } from 'assets/js/util'
export default {
  data () {
    return {
      fieldOptions: [],
      deepLevelOptions: [],
      searchTypes: [],
      // selectedWordArr: [{prop: '', op: '', value: '', width: '', searchFlag: ''}],
      symbolOptions: [
        { name: '包含', value: '包含' },
        { name: '不包含', value: '不包含' },
        { name: '大于', value: '大于' },
        { name: '大于等于', value: '大于等于' },
        { name: '小于', value: '小于' },
        { name: '小于等于', value: '小于等于' },
        { name: '等于', value: '等于' },
        { name: '不等于', value: '不等于' }
      ],
      symbolOtherOptions: [
        { name: '包含', value: '包含' },
        { name: '不包含', value: '不包含' },
        { name: '等于', value: '等于' },
        { name: '不等于', value: '不等于' }
      ]
    }
  },
  props: {
    chooseData: {
      chooseVisible: {
        type: Boolean,
        default: false
      },
      deepSearchVisible: {
        type: Boolean,
        default: false
      },
      filedType: {
        type: String
      },
      fieldList: {
        type: Array
      },
      selectedWordArr: {
        type: Array
      }
    }
  },
  methods: {
    chooseSure () {
      if (this.chooseData.fieldList.length === 0) {
        this.$message.error('请至少选择一项')
        return false
      }
      let fieldChosen = []
      this.fieldOptions.forEach(item => {
        if (this.chooseData.fieldList.indexOf(item.prop) !== -1) {
          fieldChosen.push({
            name: item.name,
            prop: item.prop
          })
        }
      })
      let preload = {
        userId: getToken('loginId').toString(),
        filedType: this.chooseData.filedType,
        userFiledList: fieldChosen
      }
      saveBatch(preload).then(data => {
        // this.$message.success('设置成功')
        this.chooseData.chooseVisible = false
        this.$parent._getUserFiled()

        setTimeout(() => {
          this.chooseData.chooseVisible = false
          this.$store.commit('SET_CHOOSE_CHECK', false)
        })
      })
    },
    sureDeepSearch () {
      let pass = 0
      this.chooseData.selectedWordArr.forEach(item => {
        if (!item.width || !item.op) {
          pass++
        }
      })
      if (pass > 0) {
        this.$message.warning('请完善搜索条件')
      } else {
        this.$emit('sureDeepSearch', this.chooseData.selectedWordArr)
      }
    },
    getItemSearchFlag (value, index) {
      this.chooseData.selectedWordArr[index].showSearchFlag = false
      this.chooseData.selectedWordArr[index].op = ''
      this.chooseData.selectedWordArr[index].value = ''
      let searchFlag = ''
      this.deepLevelOptions.forEach(item => {
        if (item.width === value) {
          searchFlag = item.searchFlag
        }
      })
      setTimeout(() => {
        this.chooseData.selectedWordArr.forEach(item => {
          if (item.width === value) {
            item.searchFlag = searchFlag
          }
        })
      }, 500)
      let searchFlagTypes = this.deepLevelOptions.filter(x => x.width === value)
      let searchFlagType = searchFlagTypes[0].searchFlag
      if (searchFlagType === 4) {
        this.chooseData.selectedWordArr[index].showSearchFlag = true
        let types = searchFlagTypes[0].searchType
        getListByTypes({ types }).then(data => {
          this.searchTypes = data.result[types]
        })
      }
      // this.selectedWordArr[index].searchFlag = flag
    },
    changeItemValue (value, index) {
      this.chooseData.selectedWordArr[index].value = ''
    },
    // 添加筛选项目
    addSelectOption (value) {
      this.chooseData.selectedWordArr.push({ prop: '', op: '', value: '', width: '', searchFlag: '' })
    },
    // 删除筛选项目
    delSelectOption (item, index) {
      this.chooseData.selectedWordArr.splice(index, 1)
    },
    _getAllList () {
      this.fieldOptions = []
      let preload = {
        type: this.chooseData.filedType
      }
      listAllColumn(preload).then(data => {
        if (data.result) {
          this.fieldOptions = data.result
          this.deepLevelOptions = data.result.filter(item => item.searchFlag !== 0)
          this.chooseData.selectedWordArr = [{ prop: '', op: '', value: '', width: '', searchFlag: '' }]
        }
      })
    }
  },
  created () {
    this._getAllList()
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
