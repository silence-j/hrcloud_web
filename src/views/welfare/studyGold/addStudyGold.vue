<template>
  <div>
    <div class="reback">
      <el-button @click="reback" type="primary" size="small">返回</el-button>
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
            <el-form-item label="入司时间:">
              <el-input disabled v-model="personDetail.entryDate"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="职务:">
              <el-input disabled v-model="personDetail.dutyName"></el-input>
              <!--<el-select v-model="personDetail.dutyName" filterable clearable placeholder="任职职务">-->
                <!--<el-option-->
                  <!--v-for="item in dutynameDatas"-->
                  <!--:label="item.codeText"-->
                  <!--:value="item.codeText"-->
                  <!--:key="item.index">-->
                <!--</el-option>-->
              <!--</el-select>-->
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
            <el-form-item  prop="sales" label="销量:" :rules="[{ required: true, message: '请输入销量', trigger: 'blur' }]">
              <el-input :disabled="justLook" v-model="personDetail.sales"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="子女姓名:" prop="childrenName"  :rules="[{ required: true, message: '请输入子女姓名', trigger: 'blur' }]">
              <el-input :disabled="justLook" v-model.number="personDetail.childrenName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="与申请人关系:" prop="relation"  :rules="[{ required: true, message: '请输入与申请人关系', trigger: 'blur' }]">
              <el-input :disabled="justLook" v-model="personDetail.relation"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="子女身份证号:"
                          prop="childrenIdCard"
                          :rules="{validator: idCart, required: true, message: '请输入正确的身份证号', trigger: ['blur']}"
                          >
              <el-input :disabled="justLook" v-model="personDetail.childrenIdCard"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="学校名称:"
                          :rules="{required: true, message: '请输入学校名称', trigger: ['blur']}"
                          prop="school">
              <el-input :disabled="justLook" v-model.number="personDetail.school"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="学制:"
                          :rules="{required: true, message: '请输入学制', trigger: ['blur']}"
                          prop="eductionalSystem">
              <el-input :disabled="justLook" v-model.number="personDetail.eductionalSystem"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="入学时间:"
                          :rules="{required: true, message: '请输入入学时间', trigger: ['blur']}"
                          prop="startSchoolTime">
              <el-date-picker
                :disabled="justLook"
                v-model="personDetail.startSchoolTime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
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
            <el-form-item label="可申领年限:"
                          :rules="{required: true, message: '请输入可申领年限', trigger: ['blur']}"
                          prop="validYear">
              <el-input :disabled="justLook" v-model.number="personDetail.validYear"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="已申领年限:"
                          :rules="{required: true, message: '请输入已申领年限', trigger: ['blur']}"
                          prop="usedYear">
              <el-input :disabled="justLook" v-model.number="personDetail.usedYear"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <p class="title-name">申领记录</p>
    <div class="table-data">
      <el-table :data="addList">
        <el-table-column prop="a" label="序号" width="120px">
          <template slot-scope="scope">
            <span>{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="duty" label="职务" width="185px"></el-table-column>
        <el-table-column prop="childrenName" label="子女姓名" width="185px"></el-table-column>
        <el-table-column prop="relation" label="与申请人关系" width="185px"></el-table-column>
        <el-table-column prop="childrenIdCard" label="子女身份证号" width="185px">
          <template slot-scope="scope">
            <span class="brokenStyle">{{scope.row.childrenIdCard}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="auditTime" label="学校名称" width="185px">
          <template slot-scope="scope">
            <span class="brokenStyle">{{scope.row.school}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="eductionalSystem" label="学制" width="175px">
        </el-table-column>
        <el-table-column prop="startSchoolTime" label="入学时间" width="175px">
        </el-table-column>
        <el-table-column prop="validYear" label="可申领年限" width="210px" >
        </el-table-column>
        <el-table-column prop="usedYear" label="已申领年限" width="210px" >
        </el-table-column>
        <el-table-column prop="currentYear" label="申领日期" width="210px" >
        </el-table-column>
        <el-table-column prop="sales" label="销量" width="210px">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import WelfareApi from 'static/api/welfare/welfare'
import { queryClassList } from 'static/api/personnel-information/job/job'
import { checkAcceptBaseDetail } from 'static/api/recruit/accept/accept'
export default {
  props: {
    type: String
  },
  data () {
    var idCartRg = (rule, value, callback) => {
      let rxg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!rxg.test(value)) {
        return callback(new Error('请输入正确的身份证号码'))
      } else {
        callback()
      }
    }
    return {
      idCart: idCartRg,
      addList: [],
      id: '',
      justLook: false,
      dutynameDatas: [],
      personDetail: {
        name: '',
        idCart: '',
        dutyName: '',
        copydutyName: '',
        entryDate: '',
        inCompany: '',
        position: '',
        sales: '',
        childrenName: '',
        relation: '',
        childrenIdCard: '',
        school: '',
        currentYear: '',
        eductionalSystem: '',
        startSchoolTime: '',
        validYear: '',
        usedYear: ''
      }
    }
  },
  mounted () {
    this._getQueryClassList()
    this._getAcceptDetail()
    this._historyList()
    if (this.$route.query.type === 'add') {
      this._postName()
    }
    if (this.$route.query.type === 'edit' || this.$route.query.type === 'look') {
      this._detail()
    }
  },
  methods: {
    _postName () {
      WelfareApi.getPostName({ userId: this.$route.query.userId }).then(res => {
        this.personDetail.dutyName = res.result.dutyName
        this.personDetail.copydutyName = res.result.dutyNameId
      })
    },
    _getQueryClassList () {
      queryClassList('DUTYNAME').then(data => {
        this.dutynameDatas = data.result
      })
    },
    _getAcceptDetail () {
      checkAcceptBaseDetail(this.$route.query.userId).then(data => {
        if (data.result) {
          let baseInfo = {}
          baseInfo = data.result
          this.personDetail.name = data.result.name
          this.personDetail.idCart = baseInfo.idCardNumber
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
      WelfareApi.getDetailStudyGold({ id: this.$route.query.id }).then(res => {
        let cur = {}
        cur = res.result
        this.personDetail.sales = cur.sales
        this.personDetail.childrenName = cur.childrenName
        this.personDetail.relation = cur.relation
        this.personDetail.childrenIdCard = cur.childrenIdCard
        this.personDetail.school = cur.school
        this.personDetail.dutyName = cur.duty
        this.personDetail.eductionalSystem = cur.eductionalSystem
        this.personDetail.currentYear = cur.currentYear
        this.personDetail.startSchoolTime = cur.startSchoolTime
        this.personDetail.validYear = cur.validYear
        this.personDetail.usedYear = cur.usedYear
      })
    },
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            userName: this.personDetail.name,
            idCardNumber: this.personDetail.idCart,
            duty: this.personDetail.copydutyName,
            entryDate: this.personDetail.entryDate,
            companyName: this.personDetail.inCompany,
            post: this.personDetail.position,
            userId: this.$route.query.userId,
            sales: this.personDetail.sales,
            childrenName: this.personDetail.childrenName,
            relation: this.personDetail.relation,
            childrenIdCard: this.personDetail.childrenIdCard,
            school: this.personDetail.school,
            eductionalSystem: this.personDetail.eductionalSystem,
            startSchoolTime: this.personDetail.startSchoolTime ? this.changeDate(this.personDetail.startSchoolTime) : '',
            currentYear: this.personDetail.currentYear ? this.changeDate(this.personDetail.currentYear) : '',
            validYear: this.personDetail.validYear,
            usedYear: this.personDetail.usedYear
          }
          if (this.$route.query.type === 'edit') {
            params.id = this.$route.query.id
          }
          WelfareApi.pushStudyGold(params).then(res => {
            this.$message.success('提交成功')
            this.$router.push({ path: '/welfare/studyGold' })
          })
        } else {
          return false
        }
      })
    },
    reback () {
      this.$router.push({ path: '/welfare/studyGold' })
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
      WelfareApi.getStudyHistoryList(param).then(res => {
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
