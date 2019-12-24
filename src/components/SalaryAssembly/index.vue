<template>
  <div class="salary-main_box">
    <el-form label-width="120px"
          ref="salaryRef"
          :model="salaryData"
          :rules="checkValidate ? salaryRules :salaryNoNeedRules"
        >
         <div>
            <el-form-item
              label=" "
              label-width="12px"
              prop="selecteSalarydOptions"
            >
              <el-row :gutter="20" class="not-wid">
                <el-col :span="12">
                  <el-cascader
                    v-if="mainSalaryDatas.length"
                    class="scroll-infor"
                    v-model="salaryData.selecteSalarydOptions"
                    :options="mainSalaryDatas"
                    :props="defaultPorps"
                    @focus="focusCascader"
                    @change = "handleChange"
                  ></el-cascader>
                </el-col>
                <el-col :span="11">
                  <el-row :gutter="22">
                    <el-col :span="11">
                      <div class="checkbox-div" v-if="postOption && postOption.length">
                        <el-select v-model="salaryData.optionArr" style="wdith:100%;font-size:14px;">
                          <el-option v-for="el in postOption" :key="el.id" :label="el.name" :value="el.id"></el-option>
                        </el-select>
                      </div>
                    </el-col>
                    <el-col :span="11">
                     {{postOption.length &&salaryData.optionArr ?postOption.filter(x => x.id === salaryData.optionArr)[0].amount + postOption.filter(x => x.id === salaryData.optionArr)[0].unit : ''}}
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <div
              v-if="salaryData.commonSalaryArr&&salaryData.commonSalaryArr.length"
              >
              <el-row class="mt-20">
                <el-col v-for="(el,index) in salaryData.commonSalaryArr.slice(0,2)"
                 :span="12" :key="el.id?el.id:index" >
                  <el-form-item
                      :label="el.name + ':'"
                      :prop="'commonSalaryArr.' + index + '.amount'"
                      :rules="{
                        required: true, message: '金额不能为空', trigger: 'blur'
                      }"
                      :title="el.name">
                      <el-input v-model="el.amount" @input="handleInput"><template slot="append">{{el.unit}}</template></el-input>
                    </el-form-item>
                </el-col>
              </el-row>
              <el-row class="mt-20">
                <el-col v-for="(el,index) in salaryData.commonSalaryArr.slice(2)"
                 :span="12" :key="el.id?el.id:index" >
                  <el-form-item
                      :label="el.name + ':'"
                      :prop="'commonSalaryArr.' + (index+2) + '.amount'"
                      :rules="{
                        required: true, message: '金额不能为空', trigger: 'blur'
                      }"
                      :title="el.name">
                      <el-input v-model="el.amount" @input="handleInput"><template slot="append">{{el.unit}}</template></el-input>
                    </el-form-item>
                </el-col>
              </el-row>
              </div>
              <div
              class="checkbox-div"><el-row
                class="post-row_box"
                :gutter="22"
              >
               <el-checkbox-group
                  v-model="salaryData.postArr">
                  <dl class="post-dl_box clearfix">
                    <dd v-for="el in postArr" :key="el.id">
                      <el-checkbox :label="el.id">{{el.name + el.amount + el.unit}}</el-checkbox>
                    </dd>
                  </dl>
                </el-checkbox-group>
              </el-row>
              </div>
            </el-form-item>
           <el-row :gutter="20" class="not-wid">
             <el-col :span="12">
               <el-cascader
                 v-if="otherSalaryDatas.length"
                 class="scroll-infor"
                 v-model="salaryData.selectOtherOptions"
                 :options="otherSalaryDatas"
                 :props="defaultPorps"
                 @focus="focusOtherCascader"
                 @change = "handleOtherChange"
               ></el-cascader>
             </el-col>
             <el-col style="height: 40px;line-height: 40px" v-if="salaryData.selectOtherOptions && salaryData.selectOtherOptions.length" :span="4">
               {{salaryData.otherArr.money}}{{salaryData.otherArr.unit}}</el-col>
           </el-row>
          </div>
    </el-form>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash'
import { getSalaryById } from 'static/api/setting/index'
export default {
  props: {
    checkValidate: {
      type: Boolean,
      default: true
    },
    mainSalaryDatas: {
      type: Array
    },
    otherSalaryDatas: {
      type: Array
    },
    salaryData: {
      mlist: {
        type: Array
      },
      commonSalaryArr: {
        type: Array
      },
      selecteSalarydOptions: {
        type: Array
      },
      selectOtherOptions: {
        type: Array
      },
      otherArr: {
        type: Object
      },
      postArr: {
        type: Array
      },
      optionArr: {
        type: String
      }
    }
  },
  data () {
    return {
      underIds: '',
      // commonSalaryArr: [],
      booleanFlag: true,
      standard: '',
      salaryRules: {
        selecteSalarydOptions: {
          required: true, message: '工资标准必选', trigger: 'change' || 'blur'
        }
      },
      salaryNoNeedRules: {
        selecteSalarydOptions: {
          required: false
        }
      },
      postArr: [],
      postOption: []
    }
  },
  mounted () {
    console.log('mainSalaryDatasg', this.mainSalaryDatas)
    console.log('otherSalaryDatasKK', this.otherSalaryDatas)
    console.log('salaryData', this.salaryData)
  },
  computed: {
    defaultPorps () {
      return {
        label: 'name',
        value: 'id',
        children: 'ssList',
        disabled: 'disabled'
      }
    }
  },
  methods: {
    // 获取所有岗位工资
    _getAllPostSalaryList (id) {
      getSalaryById(id).then(data => {
        if (data.result) {
          this.postArr = data.result.ssList.filter(x => (x.type === 2 || x.type === '2') && x.isPart === '1')
          this.postOption = data.result.ssList.filter(x => (x.type === 2 || x.type === '2') && x.isPart === '0')
        }
      })
    },
    // 获取被选择的最后一级id且isEnd === '1'的sslist
    _getCommonSalaryList (arr, searchId) {
      const newArr = cloneDeep(this.salaryData.mlist)
      arr.forEach(item => {
        if (item.id === searchId) {
          if (newArr.length && item.commArr && item.commArr.length) {
            this.salaryData.commonSalaryArr = item.commArr.map(item => {
              let filterArr = newArr.filter(x => x.ssId + '' === item.id + '')
              return Object.assign({}, item, filterArr.length ? {
                money: filterArr[0].money,
                amount: filterArr[0].money,
                editId: filterArr[0].id,
                ssId: filterArr[0].ssId,
                grandId: filterArr[0].grandId
              } : {
                money: item.money,
                grandId: item.grandId
              })
            })
            // this.salaryData.commonSalaryArr = newArr.filter(x => itemIds.indexOf(x.ssId + '') !== 1).map(item => {
            //   return Object.assign({}, item, {
            //     name: itemCom.filter(x => x.id + '' === item.ssId + '')[0].name,
            //     unit: itemCom.filter(x => x.id + '' === item.ssId + '')[0].unit
            //   })
            // })
          } else {
            this.salaryData.commonSalaryArr = item.commArr && item.commArr.length ? item.commArr.map(item => {
              return {
                id: item.id,
                money: item.amount,
                amount: item.amount,
                unit: item.unit,
                name: item.name,
                grandId: item.grandId
              }
            }) : []
          }
        }
        // item.commArr.filter(x => x.id === item.ssId)[0].name
        if (item.ssList && item.ssList.length) {
          this._getCommonSalaryList(item.ssList, searchId)
        }
      })
    },
    // 其它构成isEnd === '1'的放进otherArr里面
    _getOhterIsEndSalary (arr, searchId) {
      arr.forEach(item => {
        if (item.id + ' ' === searchId + ' ') {
          this.booleanFlag = true
          this.salaryData.otherArr = {
            id: item.id,
            money: item.amount,
            unit: item.unit,
            name: item.name,
            grandId: item.grandId
          }
        }
        if (item.ssList && item.ssList.length) {
          this._getOhterIsEndSalary(item.ssList, searchId)
        }
      })
    },
    handleChange (value) {
      const searchId = value[value.length - 1]
      // console.log('scc', this.salaryData.commonSalaryArr)
      const searchOrgArr = cloneDeep(this.mainSalaryDatas)
      this._getCommonSalaryList(searchOrgArr, searchId)
      if (searchId) {
        this._getAllPostSalaryList(searchId)
      }
      this.$emit('handleChange', value)
    },
    focusCascader (event) {
      if (!this.mainSalaryDatas.length) {
        this.$message.warning('请先选择任职部门')
      } else {
        this._setDisabled(this.mainSalaryDatas)
      }
    },
    focusOtherCascader () {
      if (!this.otherSalaryDatas.length) {
        this.$message.warning('请先选择任职部门')
      } else {
        this._setOtherDisabled(this.otherSalaryDatas)
      }
    },
    handleOtherChange (value) {
      const copyValue = cloneDeep(value)
      this.booleanFlag = false
      let searchId = copyValue[0]
      let otherSalaryItem = this.otherSalaryDatas.filter(item => item.id === searchId)
      this._getOhterIsEndSalary(otherSalaryItem, copyValue[value.length - 1])
      this.$emit('handleOtherChange', value)
    },
    // 薪资拼成字符串
    _getStandardString () {
      this.mainSalaryDatas.forEach(item => {
        if (this.salaryData.selecteSalarydOptions.indexOf(item.id) !== -1) {
          this.standard += item.name
        }
        if (item.ssList && item.ssList.length) {
          this._getStandardString(item.ssList)
        }
      })
    },
    checkSalaryValidate () {
      let vali = ''
      this.$refs.salaryRef.validate(valid => {
        vali = !!valid
      })
      return vali
    },
    resetSalaryValidate () {
      this.$refs.salaryRef.resetFields()
    },
    clearValidate () {
      this.$refs.salaryRef.clearValidate()
    },
    _setDisabled (arr) {
      arr.forEach(item => {
        if (item.isEnd === '0' || item.isEnd === 0) {
          if (!item.ssList || !item.ssList.length) {
            item.disabled = true
          }
        } else {
          if (item.parentId === 0) {
            if (!item.commArr) {
              item.disabled = true
            }
          }
        }
        if (item.ssList && item.ssList.length) {
          this._setDisabled(item.ssList)
        }
      })
    },
    _setOtherDisabled (arr) {
      arr.forEach(item => {
        if (item.ssList && item.ssList.length) {
          this._setOtherDisabled(item.ssList)
        } else {
          if (item.parentId === '0' || item.parentId === 0) {
            if (item.isEnd !== '1' || item.isEnd !== 1) {
              item.disabled = true
            }
          } else {
            if (item.isEnd === '0' || item.isEnd === 0) {
              item.disabled = true
            }
          }
        }
      })
      let copyValue = this.otherSalaryDatas[0]
      this.otherSalaryDatas.splice(this.otherSalaryDatas[0], 1, copyValue)
    },
    handleInput (val) {
      this.$emit('handleInput', val)
    }
  },
  watch: {
    'salaryData.selecteSalarydOptions' (value) {
      // console.log('valueSalary', this.mainSalaryDatas)
    },
    'mainSalaryDatas' (value) {
      if (!this.mainValue) {
        console.log('89')
        this.handleChange(this.salaryData.selecteSalarydOptions)
        // this.clearValidate()
        this.mainValue = true
      }
    },
    'otherSalaryDatas' (value) {
      if (!this.otherVaule) {
        this.handleOtherChange(this.salaryData.selectOtherOptions)
        // this.clearValidate()
        this.otherVaule = true
      }
    },
    'postArr' (value) {
      if (!this.postValue) {
        // this.handleGroupChange(this.salaryData.postArr)
        this.postValue = true
      }
    }
  }
}
</script>
<style scoped lang="less">
.salary-main_box{
  .el-row{
    &:not(.not-wid){
      .el-col{
        max-width:360px;
        height:50px;
        line-height:50px;
      }
      .post-dl_box{
        margin: 10px 0px;
        dd{
          float:left;
          margin-left:20px;
        }
      }
    }
  }
  .el-cascader{
    width:100%;
  }
  .el-form-item__label{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap
  }
  .other-txt-icon_box{
    span{
      font-size:13px;
    }
    i{
      font-size: 13px;
    }
  }
  .salary-row_box{
    .salary-col_left{
      float:left;
      width:100%;
      margin-right: 3%;
    }
    .salary-col_right{
      float:right;
      width:25%;
      font-size: 14px;
      margin-top:10px;
    }
  }
}
.checkbox-div{
  position: relative;
  top:-5px;
}
</style>
