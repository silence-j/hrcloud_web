<template>
<div class="entry-labor_box" @click="laborForm.orgDatas.showTree = false">
  <el-form
    :model="laborForm"
    label-width="150px"
    :rules="laborFormRules"
    ref="laborFormRef">
    <div class="entry-labor_row clearfix">
      <div class="entry-labor_item">
        <el-form-item  prop="takejobDate" label="参加工作时间：">
          <el-date-picker
            v-model="laborForm.takejobDate"
            type="date"
            placeholder="参加工作时间">
          </el-date-picker>
        </el-form-item>
      </div>
      <div class="entry-labor_item">
        <el-form-item prop="entryDate" label="本次入职时间：">
          <el-date-picker
            v-model="laborForm.entryDate"
            type="date"
            placeholder="本次入职时间">
          </el-date-picker>
        </el-form-item>
      </div>
      <div class="entry-labor_row clearfix">
        <div class="entry-labor_item">
          <el-form-item prop="orgId" label="任 职 部 门：">
            <el-input v-model="laborForm.orgDatas.filterName" placeholder="请选择任职部门" disabled v-if="disabledMessage"></el-input>
            <search-dept-tree
              v-else
              :orgDatas="laborForm.orgDatas"
              @selectChange="selectChange"
              />
          </el-form-item>
        </div>
        <div class="entry-labor_item">
          <el-form-item  prop="postName" label="岗 位：">
            <el-input v-model="laborForm.postName" disabled v-if="disabledMessage"></el-input>
            <el-input v-else style="width:100%" v-model="laborForm.postName" placeholder="请填写岗位"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="entry-labor_row">
        <el-form-item
          label="原单位是否已缴纳社保："
          prop="insuredInOld"
          label-width="220px">
          <el-radio-group v-model="laborForm.insuredInOld">
            <el-radio :label="0" >未缴纳</el-radio>
            <el-radio :label="1" >缴纳</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <div class="entry-labor_row clearfix" v-if="laborForm.insuredInOld == 1">
        <div class="entry-labor_item">
          <el-form-item  prop="insuredOldMonth" label="社保缴纳至：">
            <el-date-picker
              v-model="laborForm.insuredOldMonth"
              type="month"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="entry-labor_item">
          <el-form-item prop="insuredOldArea"  label="社保缴纳地：">
            <el-input  style="width:100%" v-model.trim="laborForm.insuredOldArea" placeholder="请填写社保缴纳地"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="entry-labor_row">
        <el-form-item label="原单位是否已缴纳公积金：" label-width="220px" prop="fundedInOld">
          <el-radio-group v-model="laborForm.fundedInOld">
            <el-radio :label="0" >未缴纳</el-radio>
            <el-radio :label="1" >缴纳</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <div class="entry-labor_row clearfix" v-if="laborForm.fundedInOld == 1">
        <div class="entry-labor_item">
          <el-form-item  prop="fundedOldMonth" label="公积金缴纳至：">
            <el-date-picker
              v-model="laborForm.fundedOldMonth"
              type="month"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="entry-labor_item">
          <el-form-item  label="公积金缴纳地：" prop="fundedOldArea">
            <el-input  style="width:100%" placeholder="请填写公积金缴纳地" v-model="laborForm.fundedOldArea"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="entry-labor_row clearfix">
        <div class="entry-labor_item">
          <el-form-item label="是否与原单位解除劳动合同:" label-width="220px" prop="cancelConctractWithOld">
            <el-radio-group v-model="laborForm.cancelConctractWithOld">
              <el-radio v-for="item in cancelConctractWithOldOption" :label="item.id" :key="item.id" :disabled="item.disabled">{{item.codeText}}</el-radio>
            </el-radio-group>
           <!--   <el-radio-group v-model="laborForm.cancelConctractWithOld">
             <el-radio :label="0">未解除</el-radio>
             <el-radio :label="1">已解除</el-radio>
            </el-radio-group> -->
          </el-form-item>
        </div>
      </div>
    </div>
  </el-form>
</div>
</template>
<script>
import SearchDeptTree from 'components/SearchDeptTree'
import { getSysDic } from 'static/api/common/common'
import dayjs from 'dayjs'
export default {
  props: {
    laborForm: {
      type: Object,
      orgDatas: {
        type: Object
      }
    }
  },
  components: {
    SearchDeptTree
  },
  data () {
    let validateEnteryDate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择本次入职时间'))
      } else if (dayjs(value).format('YYYY-MM-DD') < dayjs(this.laborForm.takejobDate).format('YYYY-MM-DD')) {
        callback(new Error('本次入职时间要大于等于参加工作的时间!'))
      } else {
        callback()
      }
    }
    return {
      cancelConctractWithOldOption: [],
      disabledMessage: false,
      originalData: {},
      routeName: ['VerifyEntryEntry', 'MarketVerifyEntryEntry', 'MarketVerifyEntryHeadquarters'],
      // laborForm: {
      //   takejobDate: '',
      //   entryDate: '',
      //   orgId: '',
      //   postName: '',
      //   insuredInOld: '',
      //   insuredOldMonth: '',
      //   insuredOldArea: '',
      //   fundedInOld: '',
      //   fundedOldMonth: '',
      //   fundedOldArea: '',
      //   cancelConctractWithOld: ''
      // },
      laborFormRules: {
        takejobDate: {
          required: true, message: '请选择参加工作的时间', trigger: 'change', type: 'date'
        },
        entryDate: { validator: validateEnteryDate, required: true, trigger: 'change', type: 'date' },
        orgId: { required: true, message: '请选择任职部门', trigger: 'change' },
        postName: {
          required: true, message: '请填写岗位', trigger: 'blur'
        },
        insuredInOld: {
          required: true, message: '请选择原单位是否已缴纳社保', trigger: 'change'
        },
        insuredOldMonth: {
          required: true, message: '请选择社保缴纳至', trigger: 'change', type: 'date'
        },
        insuredOldArea: {
          required: true, message: '请填写社保缴纳地', trigger: 'blur'
        },
        fundedInOld: {
          required: true, message: '请选择原单位是否已缴纳公积金', trigger: 'change'
        },
        fundedOldMonth: {
          required: true, message: '请选择公积金缴纳至', trigger: 'change', type: 'date'
        },
        fundedOldArea: {
          required: true, message: '请填写公积金缴纳地址', trigger: 'blur'
        },
        cancelConctractWithOld: {
          required: true, message: '请选择是否与原单位解除劳动合同', trigger: 'change'
        }
      }
    }
  },
  watch: {
    laborForm: {
      deep: true,
      handler (value) {
        this.$store.commit('SET_SAVE1', false)
      }
    }
  },
  methods: {
    selectChange (orgId) {
      this.laborForm.orgId = orgId
    },
    // 调用验证的方法
    vaildLaborForm () {
      let vailLabor = ''
      this.$refs.laborFormRef.validate(valid => {
        vailLabor = !!valid
      })
      return vailLabor
    },
    setDisabledVaule () {
      if (this.routeName.indexOf(this.$route.query.come) !== -1) {
        this.disabledMessage = true
      } else {
        this.disabledMessage = false
      }
    },
    /* 获取数字字典 */
    _getQueryClassList () {
      /* 是否与原单位解除劳动合同 */
      getSysDic('cancelConctractWithOld').then((data) => {
        // console.log('是否与原单位解除劳动合同', data.result)
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.cancelConctractWithOldOption.push(item)
            }
          })
        }
      })
    }
  },
  created () {
    this.setDisabledVaule()
    this._getQueryClassList()
  }
}
</script>
<style lang="less" scoped>
.entry-labor_row{
  .entry-labor_item{
    float:left;
    min-width:480px;
    &/deep/.el-input{
     // width:230px;
    }
  }
}
</style>
