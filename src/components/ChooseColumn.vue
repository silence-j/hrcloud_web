<!--跟DeepLevelSearch合并为一个组件ChooseColumnsearch-->
<template>
    <el-dialog title="列表显示字段" width="650px" :visible.sync="chooseData.chooseVisible">
      <div class="module-opera table-setting-item">
        <el-form style="padding: 0 10px;">
          <el-form-item>
            <el-checkbox-group v-model="checkList">
              <el-checkbox v-for="item in fieldOptions" :label="item.name+';'+item.prop" :key="item.name">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
  <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="chooseData.chooseVisible = false" class="false">取 消</el-button>
      <el-button size="mini" type="primary" @click="chooseSure" >确 定</el-button>
	</span>
    </el-dialog>
</template>
<script>
import { listAllColumn, saveBatch } from 'static/api/common/common'
import { getToken } from 'assets/js/util'
export default {
  data () {
    return {
      checkList: [],
      fieldOptions: [],
      fieldChosen: []
    }
  },
  props: {
    chooseData: {
      chooseVisible: {
        type: Boolean,
        default: false
      },
      filedType: {
        type: String
      },
      fieldList: {
        type: Array
      }
    }
  },
  methods: {
    // 选择显示字段
    chooseMsg () {
      this.checkList = []
      this.fieldOptions = []
      let preload = {
        type: this.chooseData.filedType
      }
      listAllColumn(preload).then(data => {
        if (data.result && data.result.length) {
          data.result.forEach(obj => {
            this.fieldOptions.push({
              name: obj.name,
              prop: obj.prop
            })
          })
          this.chooseData.fieldList.forEach((obj) => {
            this.checkList.push(obj.name + ';' + obj.prop)
          })
        }
      })
    },
    // 选择显示字段-保存
    chooseSure () {
      this.fieldChosen = []
      this.checkList.forEach((obj) => {
        this.fieldChosen.push({
          name: obj.split(';')[0],
          prop: obj.split(';')[1]
        })
      })
      if (this.fieldChosen.length === 0) {
        this.$message.error('请至少选择一项')
        return false
      }
      let preload = {
        userId: getToken('loginId').toString(),
        filedType: this.chooseData.filedType,
        userFiledList: this.fieldChosen
      }
      saveBatch(preload).then(data => {
        this.$message.success('设置成功')
        this.chooseData.chooseVisible = false
        this.$parent._getUserFiled()
      })
      this.chooseData.chooseVisible = false
    }
  }
}
</script>
