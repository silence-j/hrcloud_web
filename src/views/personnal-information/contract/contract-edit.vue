<template>
    <div class="container">
    <div class="content-edit">
      <el-form :model="contractDetailsData" label-width="145px" :rules="rules" ref="contractDetailsData">
        <el-row>
          <el-col :span="8">
            <el-form-item label="身 份 证 号 ：" >
              <el-input v-model="contractDetailsData.idCardNumber" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓    名 ：">
              <el-input  v-model="contractDetailsData.name" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联 系 电 话：">
              <el-input v-model="contractDetailsData.telephone" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="合 同 主 体 ：">
              <el-input v-model="contractDetailsData.contractSubject" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="$route.params.type == 'edit'">
            <el-form-item label="合 同 期 数 ：" prop="contractNumber">
              <el-input type="number" min='0' oninput="if(value.length>1)value=value.slice(0,1)" v-model="contractDetailsData.contractNumber" placeholder="请填写合同期数(保留1位数)"><template slot="append">期</template></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="$route.params.type == 'change'">
            <el-form-item label="合 同 期 数 ：">
              <el-input type="number" min='0' v-model="contractDetailsData.contractNumber" disabled placeholder="请填写合同期数(保留1位数)"><template slot="append">期</template></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="$route.params.type == 'renew'">
            <el-form-item label="合 同 期 数 ：" prop="contractNumber">
              <el-input type="number" min='0' oninput="if(value.length>1)value=value.slice(0,1)" v-model="contractDetailsData.contractNumber" placeholder="请填写合同期数(保留1位数)"><template slot="append">期</template></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否固定期限：" prop="periodType">
              <el-radio-group v-model="contractDetailsData.periodType">
                <el-radio :label="0">固定</el-radio>
                <el-radio :label="1">无固定</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <!-- 续签 -->
          <div v-if="$route.params.type == 'renew'">
            <el-col :span="8">
              <el-form-item label="合同开始时间 ：">
                <el-input v-model="contractDetailsData.contractBeginDate" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="this.contractDetailsData.periodType === 0">
              <el-form-item label="合 同 期 限 ：" prop="contractPeriod">
                <el-input type="number" min="1"
                  v-model="contractDetailsData.contractPeriod" placeholder="请填写合同期限"
                  @input="getEndTime"
                  @focus="focusEndTime"
                  @blur="blurMsg">
                  <template slot="append">月</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-else>
              <el-form-item label="合 同 期 限 ：">
                <el-input type="number" min="1" disabled placeholder="请填写合同期限"><template slot="append">月</template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="this.contractDetailsData.periodType === 0">
              <el-form-item label="合同结束时间 ：">
                <el-input v-model="contractDetailsData.contractEndDate" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-else>
              <el-form-item label="合同结束时间 ：">
                <el-input placeholder="请填写合同结束时间" disabled></el-input>
              </el-form-item>
            </el-col>
          </div>

          <!-- 编辑 -->
          <div v-if="$route.params.type == 'edit'">
            <el-col :span="8">
              <el-form-item label="合同开始时间 ：" prop="contractBeginDate">
                <el-date-picker
                  v-model="contractDetailsData.contractBeginDate"
                  type="date"
                  placeholder="请填写合同开始时间"
                  @change="BeginDateChange">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="this.contractDetailsData.periodType === 0">
              <el-form-item label="合 同 期 限 ：" prop="contractPeriod">
                <el-input type="number" min="1"
                  v-model="contractDetailsData.contractPeriod"
                  placeholder="请填写合同期限(保留3位数)"
                  @input="getEndTime"
                  @focus="focusEndTime"
                  @blur="blurMsg">
                  <template slot="append">月</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-else>
              <el-form-item label="合 同 期 限 ：">
                <el-input type="number" min="1" disabled  placeholder="请填写合同期限"><template slot="append">月</template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="this.contractDetailsData.periodType === 0">
              <el-form-item label="合同结束时间 ：" prop="contractEndDate">
                <el-input
                  :value="contractDetailsData.contractEndDate"
                  placeholder="合同结束时间"
                  disabled>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-else>
              <el-form-item label="合同结束时间 ：">
                <el-date-picker
                  placeholder="请填写合同结束时间"
                  disabled
                  type="date">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </div>

          <!-- 变更 -->
          <div v-if="$route.params.type == 'change'">
            <el-col :span="8">
              <el-form-item label="合同开始时间 ：" class="mustForm">
                <el-date-picker
                  disabled
                  v-model="contractDetailsData.contractBeginDate"
                  type="date"
                  placeholder="请填写合同开始时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="this.contractDetailsData.periodType === 0">
              <el-form-item label="合 同 期 限 ：" prop="contractPeriod">
                <el-input type="number" min="1"
                  v-model="contractDetailsData.contractPeriod" placeholder="请填写合同期限"
                  @input="getEndTime"
                  @focus="focusEndTime"
                  @blur="blurMsg">
                  <template slot="append">月</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-else>
              <el-form-item label="合 同 期 限 ：">
                <el-input type="number" min="1" disabled placeholder="请填写合同期限"><template slot="append">月</template></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="this.contractDetailsData.periodType === 0">
              <el-form-item label="合同结束时间 ：" class="mustForm">
                <el-date-picker
                  :value="contractDetailsData.contractEndDate"
                  disabled
                  placeholder="请填写合同结束时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-else>
              <el-form-item label="合同结束时间 ：">
                <el-date-picker
                  placeholder="请填写合同结束时间"
                  disabled
                  type="date">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </div>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="工  时  制  度 ：" prop="workSchedule">
              <el-select v-model="contractDetailsData.workSchedule" clearable placeholder="请选择工时制度">
                <el-option
                  v-for="item in workScheduleSelect"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="劳 动 报 酬：" prop="salary">
              <el-input v-model="contractDetailsData.salary" placeholder="请填写劳动报酬"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="试 用 期 工 资：" prop="trySalary">
              <el-input v-model="contractDetailsData.trySalary" placeholder="请填写试用期工资"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="工 作 地 点 ：" prop="workAdress">
              <el-input v-model="contractDetailsData.workAdress" placeholder="请填写工作地点"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="工 作 内 容 ：" prop="workContent">
              <el-input type="textarea" v-model="contractDetailsData.workContent" placeholder="请填写工作内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="16">
            <el-form-item label="乙方送达地址 ：" prop="userAdress">
              <el-input type="textarea" v-model="contractDetailsData.userAdress" placeholder="请填写乙方送达地址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮  编 ：">
              <el-input type="number" v-model="contractDetailsData.zipCode" placeholder="请填写邮编(保留6位数)" oninput="if(value.length>6)value=value.slice(0,6)"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="备  注：">
              <el-input type="textarea" v-model="contractDetailsData.remark" placeholder="请填写备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </div>
    <br/>
    <el-row class="mt-20">
      <el-col :span="2" :push="9"><el-button type="primary" size="small" @click="goBack">返  回</el-button></el-col>
      <el-col :span="2" :push="10" v-if="this.$route.params.type === 'renew'"><el-button type="primary" size="small"  @click="editContractSave('contractDetailsData')">续  签</el-button></el-col>
      <el-col :span="2" :push="10" v-else><el-button type="primary" size="small"  @click="editContractSave('contractDetailsData')">保  存</el-button></el-col>
    </el-row>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { timeZeroToString } from 'assets/js/common'
import { getContractDetails, editContract, renewContract, startContract } from 'static/api/contract/contract'
/*   import { checkAcceptBaseDetail } from 'static/api/recruit/accept/accept' */
import { getToken } from 'assets/js/util'
import { debounce } from 'lodash'
export default {
  data () {
    return {
      rules: {
        contractNumber: [
          { required: true, message: '请填写合同期数', trigger: 'blur' }
        ],
        contractPeriod: [
          { required: true, message: '请填写合同期限', trigger: 'blur' }
        ],
        contractBeginDate: [
          { type: 'date', required: true, message: '请填写合同开始时间', trigger: 'change' }
        ],
        contractEndDate: [
          { type: 'date', required: true, message: '请填写合同结束时间', trigger: 'change' }
        ],
        workSchedule: [
          { required: true, message: '请选择工时制度', trigger: 'change' }
        ],
        salary: [
          { required: true, message: '请填写劳动报酬', trigger: 'blur' }
        ],
        trySalary: [
          { required: true, message: '请填写试用期工资', trigger: 'blur' }
        ],
        workAdress: [
          { required: true, message: '请填写工作地点', trigger: 'blur' }
        ],
        workContent: [
          { required: true, message: '请填写工作内容', trigger: 'blur' }
        ],
        userAdress: [
          { required: true, message: '请填写乙方送达地址', trigger: 'blur' }
        ]
      },
      contractDetailsData: {
        contractNumber: '',
        contractPeriod: '',
        contractBeginDate: '',
        contractEndDate: '',
        workSchedule: '',
        salary: '',
        trySalary: '',
        workAdress: '',
        workContent: '',
        userAdress: ''
      },
      contractTitle: '',
      loading: false,
      list: [],
      organizeSelect: [],
      workScheduleSelect: [
        { value: 1, label: '不定时工时制度' },
        { value: 2, label: '标准工时制度' },
        { value: 3, label: '综合计算工时制度' }
      ],
      baseInformation: [],
      contractSubjectId: ''
    }
  },
  methods: {
    /* 保存 */
    editContractSave: debounce(function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let ContractParams = {
            idCardNumber: this.contractDetailsData.idCardNumber,
            name: this.contractDetailsData.name,
            telephone: this.contractDetailsData.telephone,
            contractSubject: this.contractDetailsData.contractSubject,
            contractNumber: this.contractDetailsData.contractNumber,
            contractPeriod: this.contractDetailsData.periodType === 0 && this.contractDetailsData.contractPeriod ? Number(this.contractDetailsData.contractPeriod) : null,
            contractBeginDate: this.contractDetailsData.contractBeginDate ? timeZeroToString(this.contractDetailsData.contractBeginDate) : '',
            contractEndDate: this.contractDetailsData.periodType === 0 && this.contractDetailsData.contractEndDate ? timeZeroToString(this.contractDetailsData.contractEndDate) : '',
            workSchedule: this.contractDetailsData.workSchedule,
            salary: this.contractDetailsData.salary,
            trySalary: this.contractDetailsData.trySalary,
            workAdress: this.contractDetailsData.workAdress,
            zipCode: this.contractDetailsData.zipCode,
            workContent: this.contractDetailsData.workContent,
            userAdress: this.contractDetailsData.userAdress,
            remark: this.contractDetailsData.remark,
            periodType: this.contractDetailsData.periodType
          }
          if (!this.contractDetailsData.contractNumber) {
            Message.warning({
              message: '请填写合同期数!'
            })
            return
          } else if (!this.contractDetailsData.periodType.toString()) {
            Message.warning({
              message: '请选择是否为固定期限!'
            })
            return
          } else if (this.contractDetailsData.periodType === 0 && !this.contractDetailsData.contractPeriod) {
            Message.warning({
              message: '请填写合同期限!'
            })
            return
          } else if (this.contractDetailsData.periodType === 0 && this.contractDetailsData.contractPeriod.length > 3) {
            Message.warning({
              message: '合同期限不能超过3位数!'
            })
            return this.contractDetailsData.contractPeriod.length > 3
          } else if (!this.contractDetailsData.contractBeginDate) {
            Message.warning({
              message: '请填写合同开始时间!'
            })
            return
          } else if (this.contractDetailsData.periodType === 0 && !this.contractDetailsData.contractEndDate) {
            Message.warning({
              message: '请填写合同结束时间!'
            })
            return
          } else if (!this.contractDetailsData.workSchedule) {
            Message.warning({
              message: '请选择工时制度!'
            })
            return
          } else if (!this.contractDetailsData.salary) {
            Message.warning({
              message: '请填写劳动报酬!'
            })
            return
          } else if (!this.contractDetailsData.trySalary) {
            Message.warning({
              message: '请填写试用期工资!'
            })
            return
          } else if (!this.contractDetailsData.workAdress) {
            Message.warning({
              message: '请填写工作地点!'
            })
            return
          } else if (!this.contractDetailsData.workContent) {
            Message.warning({
              message: '请填写工作内容!'
            })
            return
          } else if (!this.contractDetailsData.userAdress) {
            Message.warning({
              message: '请填写乙方送达地址!'
            })
            return
          }
          if (this.contractDetailsData.zipCode) {
            if (this.contractDetailsData.zipCode.length < 6) {
              Message.warning({
                message: '请填写正确的邮编!'
              })
              return
            }
          }
          if (this.$route.params.type === 'edit') {
            let editParams = Object.assign({}, ContractParams, {
              id: this.contractDetailsData.id
            })
            editContract(editParams).then((data) => {
              this.$message.success('编辑操作成功')
              setTimeout(() => {
                this.$router.replace('/personnel-information/contract/contract')
              }, 500)
            })
          } else if (this.$route.params.type === 'renew') {
            let renewParams = Object.assign({}, ContractParams, {
              id: this.contractDetailsData.id,
              contractSubjectId: this.contractDetailsData.contractSubjectId,
              userId: this.contractDetailsData.userId
            })
            renewContract(renewParams).then(data => {
              this.$message.success('续签操作成功')
              setTimeout(() => {
                this.$router.replace('/personnel-information/contract/contract')
              }, 500)
            })
          } else if (this.$route.params.type === 'change') {
            let newContractParams = Object.assign({}, ContractParams, {
              id: this.contractDetailsData.id,
              actType: 'contractUpdate',
              userId: getToken('loginId'),
              employeeId: this.contractDetailsData.userId,
              idNo: this.contractDetailsData.idCardNumber,
              deptNo: this.contractSubjectId,
              contractSubjectId: this.contractSubjectId,
              levelOne: this.contractDetailsData.levelOne
            })
            startContract(newContractParams).then((data) => {
              this.$message.success('变更操作成功')
              setTimeout(() => {
                this.$router.replace('/personnel-information/contract/contract')
              }, 500)
            })
          }
        } else {
          return false
        }
      })
    }, 500),
    goBack () {
      // this.$router.replace('/personnel-information/contract/contract')
      // window.history.go(-1)
      this.$router.push({ name: this.$route.query.come, query: { active: this.$route.query.active } })
    },
    /** 查询**/
    _getContractDetails () {
      getContractDetails(this.$route.params.contractId).then((data) => {
        if (data.result) {
          // console.log(data.result)
          this.contractDetailsData = data.result
          if (this.contractDetailsData.workSchedule === null) {
            this.contractDetailsData.workSchedule = 2
          }
          if (this.contractDetailsData.contractBeginDate) this.contractDetailsData.contractBeginDate = new Date(data.result.contractBeginDate)
          this.contractSubjectId = this.contractDetailsData.contractSubjectId
        }

        if (this.$route.params.type === 'renew') {
          this.getDates()
        }
      })
      /*  setTimeout(() => {
          this._getAcceptDetail()
        }, 400) */
    },
    /* 改变合同开始时间清空--合同期限 */
    BeginDateChange () {
      this.contractDetailsData.contractPeriod = ''
    },
    /* 合同期限--焦点判断合同开始时间 */
    focusEndTime () {
      if (!this.contractDetailsData.contractBeginDate) {
        this.$message.warning('请先填写合同开始时间')
        return false
      }
    },
    /* 合同期限--焦点判断位数 */
    blurMsg () {
      if (this.contractDetailsData.contractPeriod && this.contractDetailsData.contractPeriod.length > 3) {
        this.$message.warning('合同期限不能超过3位数')
        return false
      }
    },
    /* 合同期限计算 */
    getEndTime (value) {
      if (!/^[1-9]\d*$/.test(value)) {
        this.contractDetailsData.contractPeriod = Math.floor(value)
        return false
      } else {
        this.contractDetailsData.contractEndDate = this.getEndDate()
      }
    },
    /* 时间计算 */
    getDates () {
      let oldDate = new Date((this.contractDetailsData.contractEndDate))
      oldDate.setDate(oldDate.getDate() + 1)
      var newYear = oldDate.getFullYear()
      var newMonth = oldDate.getMonth() + 1
      var newDays = oldDate.getDate()
      let newStartDay = newYear + '-' + this.addZero(newMonth) + '-' + this.addZero((newDays))
      this.contractDetailsData.contractBeginDate = newStartDay
      this.contractDetailsData.contractEndDate = this.getEndDate()
      let oldNumber = this.contractDetailsData.contractNumber
      let newNumber = oldNumber + 1
      this.contractDetailsData.contractNumber = newNumber
    },
    getEndDate () {
      var dtstr = timeZeroToString(this.contractDetailsData.contractBeginDate)
      var num = this.contractDetailsData.contractPeriod
      var s = dtstr.split('-')
      var n = Number(num)
      var yy = parseInt(s[0])
      var mm = parseInt(s[1] - 1)
      var dd = parseInt(s[2])
      var dt = new Date(yy, mm, dd)
      dt.setMonth(dt.getMonth() + n)
      if ((dt.getYear() * 12 + dt.getMonth()) > (yy * 12 + mm + n)) {
        dt = new Date(dt.getYear(), dt.getMonth(), 0)
      }
      dt.setDate(dt.getDate() - 1)
      var year = dt.getFullYear()
      var month = dt.getMonth() + 1
      var days = dt.getDate()
      return year + '-' + this.addZero(month) + '-' + (this.addZero(days))
    },
    addZero (value) {
      if (value < 10) {
        value = '0' + value
      }
      return value
    }
  },
  created () {
    this._getContractDetails()
  }
}
</script>
<style scoped lang="less">
.el-select{width: 100%}
.content-edit {
  width:95%;
  margin:4% auto auto auto;
}
.el-form-item.mustForm {
  position: relative;
  &::before{
    content: '*';
    color: #f56c6c;
    position: absolute;
    top: 12px;
    left: 22px;
  }
}
</style>
