<template>
  <div>
    <div class="reback">
      <el-button type="primary" size="small" @click="reback">返回</el-button>
      <el-button :disabled="justLook" @click="submit('personDetail')" type="primary" size="small">提交</el-button>
    </div>
    <div style="margin-top: 20px">
      <el-form :model="personDetail" ref="personDetail" label-width="140px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="姓名:">
              <el-input disabled v-model="personDetail.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="身份证号:">
              <el-input disabled v-model="personDetail.idCart"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="性别:">
              <el-input disabled v-model="personDetail.sex"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="入司时间:">
              <el-input disabled v-model="personDetail.entryDate"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="所在公司:">
              <el-input disabled v-model="personDetail.inCompany"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="岗位:">
              <el-input disabled v-model="personDetail.position"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="病种:"
                          :rules="{required: true, message: '请输入病种', trigger: ['blur']}"
                          prop="disease">
              <el-input :disabled="justLook" v-model="personDetail.disease"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="可申领年限:"
                          :rules="{required: true, message: '请输入可申领年限', trigger: ['blur']}"
                          prop="validYear">
              <el-input :disabled="justLook" v-model.number="personDetail.validYear"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="已申领年限:"
                          :rules="{required: true, message: '请输入已申领年限', trigger: ['blur']}"
                          prop="usedYear">
              <el-input :disabled="justLook" v-model.number="personDetail.usedYear"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="申领日期:"
                          :rules="{required: true, message: '请输入申领日期', trigger: ['blur']}"
                          prop="currentYear">
              <el-date-picker
                :disabled="justLook"
                v-model="personDetail.currentYear"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="审批时间:"
                          :rules="{required: true, message: '请输入审批时间', trigger: ['blur']}"
                          prop="auditTime">
              <el-date-picker
                :disabled="justLook"
                v-model="personDetail.auditTime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="申领金额:"
                          :rules="{required: true, message: '请输入申领金额', trigger: ['blur']}"
                          prop="amount">
              <el-input :disabled="justLook" v-model="personDetail.amount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <p class="title-name">申领记录</p>
    <div class="table-data">
      <el-table :data="addList" border>
        <el-table-column prop="a" label="序号" width="120px">
          <template slot-scope="scope">
            <span>{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="disease" label="病种" width="185px"></el-table-column>
        <el-table-column prop="validYear" label="可申领年限" width="185px"></el-table-column>
        <el-table-column prop="usedYear" label="已申领年限" width="185px"></el-table-column>
        <el-table-column prop="currentYear" label="申领日期" width="185px">
          <template slot-scope="scope">
            <span class="brokenStyle">{{scope.row.currentYear}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="auditTime" label="审批时间" width="185px">
          <template slot-scope="scope">
            <span class="brokenStyle">{{scope.row.auditTime}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="申领金额" width="175px"></el-table-column>
        <el-table-column prop="createTime" label="操作时间" width="175px"></el-table-column>
        <el-table-column prop="createName" label="操作人" width="210px" fixed="right">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import WelfareApi from 'static/api/welfare/welfare'
import { getToken } from 'assets/js/util'
import { checkAcceptBaseDetail } from 'static/api/recruit/accept/accept'
import { debounce } from 'lodash'
export default {
  props: {
    type: String
  },
  data () {
    return {
      addList: [],
      id: '',
      justLook: false,
      personDetail: {
        name: '',
        idCart: '',
        sex: '',
        entryDate: '',
        inCompany: '',
        position: '',
        disease: '',
        validYear: '',
        usedYear: '',
        currentYear: '',
        auditTime: '',
        amount: ''
      }
    }
  },
  mounted () {
    this._getAcceptDetail()
    this._historyList()
    if (this.$route.query.type === 'edit' || this.$route.query.type === 'look') {
      this._detail()
    }
  },
  methods: {
    _getAcceptDetail () {
      checkAcceptBaseDetail(this.$route.query.userId).then(data => {
        if (data.result) {
          let baseInfo = {}
          baseInfo = data.result
          this.personDetail.name = data.result.name
          this.personDetail.idCart = baseInfo.idCardNumber
          this.personDetail.sex = baseInfo.sex === 0 ? '女' : baseInfo.sex === 1 ? '男' : '其他'
          this.personDetail.entryDate = baseInfo.entryDate ? baseInfo.entryDate : ''
          this.personDetail.inCompany = baseInfo.companyName
          this.personDetail.position = baseInfo.postName
        }
      })
    },
    _detail () {
      if (this.$route.query.type === 'look') {
        this.justLook = true
      } else {
        this.justLook = false
      }
      WelfareApi.getDetailNourishGold({ id: this.$route.query.id }).then(res => {
        let cur = {}
        cur = res.result
        this.personDetail.disease = cur.disease
        this.personDetail.validYear = cur.validYear
        this.personDetail.usedYear = cur.usedYear
        this.personDetail.currentYear = cur.currentYear ? cur.currentYear.replace(/-/g, '/') : ''
        this.personDetail.auditTime = cur.auditTime ? cur.auditTime.replace(/-/g, '/') : ''
        this.personDetail.amount = cur.amount
      })
    },
    submit: debounce(function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            createName: getToken('loginName'),
            userName: this.personDetail.name,
            idCardNumber: this.personDetail.idCart,
            sex: this.personDetail.sex === '女' ? 0 : this.personDetail.sex === '男' ? 1 : 2,
            entryDate: this.personDetail.entryDate,
            companyName: this.personDetail.inCompany,
            post: this.personDetail.position,
            userId: this.$route.query.userId,
            disease: this.personDetail.disease,
            validYear: this.personDetail.validYear,
            usedYear: this.personDetail.usedYear,
            currentYear: this.personDetail.currentYear ? this.changeDate(this.personDetail.currentYear) : '',
            auditTime: this.personDetail.auditTime ? this.changeDate(this.personDetail.auditTime) : '',
            amount: this.personDetail.amount
          }
          if (this.$route.query.type === 'edit') {
            params.id = this.$route.query.id
          }
          WelfareApi.pushNourishGold(params).then(res => {
            this.$message.success('提交成功')
            this.$router.push({ path: '/welfare/nourishGold' })
          })
        } else {
          return false
        }
      })
    }, 500),
    reback () {
      this.$router.push({ path: '/welfare/nourishGold' })
    },
    changeDate (value) {
      let time = new Date(value)
      let year = time.getFullYear()
      let month = (time.getMonth() < 9 ? '0' : '') + (time.getMonth() + 1)
      let day = (time.getDate() < 10 ? '0' : '') + time.getDate()
      return year + '-' + month + '-' + day
    },
    _historyList () {
      let param = {
        userId: this.$route.query.userId,
        id: this.$route.query.id
      }
      WelfareApi.getHistoryList(param).then(res => {
        if (res.result) {
          this.addList = res.result
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .reback{
    .el-button{
      padding: 0 20px;
    }
  }
</style>
