<template>
  <div>
    <div style="margin-bottom: 20px" v-if="isExport == 'true' || isExport == true">
      <el-button @click="$router.go(-1)" type="primary" size="small">返回</el-button>
      <el-button v-if="isOperation !== '1'" @click="finish" type="primary" size="small">完成核对</el-button>
      <el-button v-if="isOperation !== '1'"  @click="addPerson" type="primary" size="small">新增人员</el-button>
      <el-button @click="exportList" type="primary" size="small">导出</el-button>
    </div>
    <div style="margin-bottom: 20px" v-else="">
      <el-button @click="$router.go(-1)">返回</el-button>
      <el-button v-if="isOperation !== '1'" @click="addPerson" type="primary" size="small">新增人员</el-button>
      <el-button v-if="isOperation !== '1'" @click="isSureReport" type="primary" size="small">上报名单</el-button>
      <!--<el-button>打印</el-button>-->
    </div>
    <el-form :model="postForm">
      <div class="search-form_box clearfix length-box search">
        <div class="search-form_item">
          <el-input :disabled="isSearch" v-model="postForm.keyWords" placeholder="请输入关键字" @keyup.enter.native="normalSearch"></el-input>
        </div>
        <div class="search-form_button pt-3">
          <el-button :disabled="isSearch" type="primary" size="mini" @click="normalSearch">查询</el-button>
        </div>
      </div>
    </el-form>
    <lenTabs :tabDatas="msgRemind" @getItem="getWhichPage">
      <div slot="tableBox1">
        <div class="table-data">
          <el-table :data="grantDetailList" border>
            <el-table-column prop="a" label="序号" width="60px">
              <template slot-scope="scope">
                <span>{{scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="oraName" label="一级组织">
              <template slot-scope="scope">
              <span class="brokenStyle">{{scope.row.oraName || ''}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="department" label="部门">
              <template slot-scope="scope">
              <span class="brokenStyle">{{scope.row.department}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="userName" label="姓名"></el-table-column>
            <el-table-column prop="idCardNumber" label="身份证"></el-table-column>
            <el-table-column prop="telephone" label="手机号码"></el-table-column>
            <el-table-column prop="entryDate" label="入司时间">
              <template slot-scope="scope">
              <span>{{scope.row.entryDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="amount" label="发放金额(元)"></el-table-column>
            <el-table-column prop="remark" label="备注">
              <template slot-scope="scope">
              <span class="brokenStyle">{{scope.row.remark || ''}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="isOperation !== '1'" label="操作" width="120px" fixed="right">
              <template slot-scope="scope">
                <div class="operation">
                  <span @click="editDialog(scope.row)">编辑</span>
                  <span @click="isDel(scope.row)">删除</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            v-if="page.totalCount > 10"
            style="margin-top: 20px"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.page"
            :page-size="page.pageSize"
            layout="total, prev, pager, next, sizes, jumper"
            :total="page.totalCount">
          </el-pagination>
        </div>
      </div>
      <div slot="tableBox2" class="sumTableBox">
        <el-table show-summary style="margin-top: 20px; width: 750px;" :data="summaryList" border>
          <el-table-column prop="a" label="序号" width="150px">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="department" label="部门">
            <template slot-scope="scope">
              <span class="brokenStyle">{{scope.row.department}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="num" label="人数">
            <template slot-scope="scope">
              <span class="brokenStyle">{{scope.row.num || ''}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="发放金额(元)">
          </el-table-column>
        </el-table>
      </div>
    </lenTabs>
    <el-dialog :title="title" width="520px" :visible.sync="addDialog" class="add-dialog">
      <el-form ref="addEdit"  :model="addEdit" label-width="110px">
        <el-row>
          <el-col :span="20">
            <el-form-item label="一级组织:">
              <el-input v-model="addEdit.oraNamel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="部门:">
              <el-input v-model="addEdit.departmentl"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item
              :rules="{required: true, message: '姓名不能为空', trigger: ['blur']}"
              prop="userNamel"
              label="姓名:">
              <el-input v-model="addEdit.userNamel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item
              :rules="{validator: idCart, required: true, message: '请输入正确的身份证号', trigger: ['blur']}"
              prop="idCardNumberl"
              label="身份证号:">
              <el-input v-model="addEdit.idCardNumberl"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item
              :rules="{validator: validatorTel1, required: true, message: '请输入正确的手机号码', trigger: ['blur']}"
              prop="telephonel"
              label="手机号码">
              <el-input v-model="addEdit.telephonel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item
              :rules="{required: true, message: '入司时间不能为空', trigger: ['blur']}"
              prop="entryDatel"
              label="入司时间">
              <el-date-picker
                v-model="addEdit.entryDatel"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item
              :rules="{required: true, message: '发放金额不能为空', trigger: ['blur']}"
              prop="amountl"
              label="发放金额">
              <el-input v-model.number="addEdit.amountl" type="number" min="0"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="备注">
              <el-input v-model="addEdit.remarkl" type="textarea" :rows="4"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align: center; margin-top: 10px">
        <el-button @click="addDialog = false">取消</el-button>
        <el-button @click="sureAdd('addEdit')">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="delReport"
      width="300px">
      <span v-if="dialogTitle === '删除'" class="content">删除后不可撤回，确定要删除该人员？</span>
      <span v-if="dialogTitle === '提醒'" class="content">提交后不可撤回，确定要上报该名单？</span>
      <span slot="footer" class="dialog-footer">
    <div>
      <el-button @click="delReport = false">取消</el-button>
      <el-button type="primary" @click="sureDel">确定</el-button>
    </div>
  </span>
    </el-dialog>
    <form  style="display:none" name="form" method="POST" ref="submitExcel" target="_blank" :action="hostBaseUrl+'/duty/welfareDetail/exportDetail'">
    <!--<form  style="display:none" name="form" method="POST" ref="submitExcel" target="_blank" :action="pp">-->
      <p>companyId: <input type="text" id="companyId" name="companyId" value="" /></p>
      <p>repotredId: <input type="text" id="repotredId" name="repotredId" value="" /></p>
      <p>templateId: <input type="text" id="templateId" name="templateId" value="" /></p>
      <input type="submit" value="Submit"  />
    </form>
  </div>
</template>

<script>
import WelfareApi from 'static/api/welfare/welfare'
import lenTabs from 'components/lenTabs'
import { hostBaseUrl } from 'utils/config'
import { getToken } from 'assets/js/util'
import { debounce } from 'lodash'
export default {
  data () {
    var validatorTel = (rule, value, callback) => {
      let rxg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!rxg.test(value)) {
        return callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    var idCartRg = (rule, value, callback) => {
      let rxg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!rxg.test(value)) {
        return callback(new Error('请输入正确的身份证号码'))
      } else {
        callback()
      }
    }
    return {
      grantDetailList: [],
      summaryList: [],
      addDialog: false,
      isSearch: false,
      msgRemind: [
        { name: '明细表', unReadCount: 0 },
        { name: '汇总表', unReadCount: 0 }
      ],
      hostBaseUrl: '',
      addEdit: {
        oraNamel: '',
        departmentl: '',
        userNamel: '',
        idCardNumberl: '',
        telephonel: '',
        entryDatel: '',
        amountl: '',
        remarkl: ''
      },
      title: '',
      dialogTitle: '删除',
      delReport: false,
      isOperation: this.$route.query.isOperation,
      isExport: this.$route.query.isExport,
      id: this.$route.query.id,
      companyId: this.$route.query.companyId,
      templateId: this.$route.query.templateId,
      postForm: {
        keyWords: '',
        gerIds: '',
        status: ''
      },
      delId: '',
      oneData: {},
      state: [
        { name: '未上报', value: 1 },
        { name: '未核准', value: 2 },
        { name: '已审核', value: 3 }
      ],
      page: {
        page: 1,
        pageSize: 10,
        totalCount: 0
      },
      validatorTel1: validatorTel,
      idCart: idCartRg
    }
  },
  components: {
    lenTabs
  },
  mounted () {
    this._getControllerList()
  },
  created () {
    this.hostBaseUrl = hostBaseUrl
  },
  computed: {
  },
  methods: {
    exportList () {
      document.getElementById('companyId').setAttribute('value', this.companyId)
      document.getElementById('repotredId').setAttribute('value', this.id)
      document.getElementById('templateId').setAttribute('value', this.templateId)
      this.$refs.submitExcel.submit()
    },
    _getControllerList () {
      let params = {
        page: this.page.page,
        size: this.page.pageSize,
        companyId: String(this.companyId),
        repotredId: String(this.id),
        templateId: String(this.templateId),
        keyword: this.postForm.keyWords
      }
      WelfareApi.getReportNameList(params).then(res => {
        if (res.result.records) {
          this.grantDetailList = res.result.records
          this.page.totalCount = res.result.total
        }
      })
    },
    _getSummaryList () {
      let params = {
        companyId: String(this.companyId),
        repotredId: String(this.id)
      }
      WelfareApi.getSummaryList1(params).then(res => {
        if (res.result) {
          this.summaryList = res.result
        }
      })
    },
    getWhichPage (row, index) {
      if (index === 1) {
        this.isSearch = true
        this._getSummaryList()
      } else {
        this.isSearch = false
      }
    },
    addPerson () {
      this.title = '新增'
      this.addEdit.oraNamel = ''
      this.addEdit.departmentl = ''
      this.addEdit.userNamel = ''
      this.addEdit.idCardNumberl = ''
      this.addEdit.telephonel = ''
      this.addEdit.entryDatel = ''
      this.addEdit.amountl = ''
      this.addEdit.remarkl = ''
      this.addDialog = true
    },
    editDialog (row) {
      this.oneData = {}
      this.title = '编辑'
      this.addDialog = true
      this.oneData = row
      // this.addEdit = this.oneData
      this.addEdit.oraNamel = this.oneData.oraName
      this.addEdit.departmentl = this.oneData.department
      this.addEdit.userNamel = this.oneData.userName
      this.addEdit.idCardNumberl = this.oneData.idCardNumber
      this.addEdit.telephonel = this.oneData.telephone
      this.addEdit.entryDatel = this.oneData.entryDate
      this.addEdit.amountl = this.oneData.amount
      this.addEdit.remarkl = this.oneData.remark
    },
    // 上报确认
    isSureReport () {
      this.delReport = true
      this.dialogTitle = '提醒'
    },
    // 上报名单
    pushReport () {
      let params = {
        id: this.$route.query.id,
        status: 2,
        createName: getToken('loginName')
      }
      WelfareApi.pushAllReport(params).then(res => {
        this.$message.success('上报名单成功')
        this.delReport = false
        this.$router.push({
          path: '/welfare/giftBag',
          query: { gift: '11' }
        })
      })
    },
    // 完成核准
    finish () {
      let params = {
        id: this.$route.query.id,
        status: 3
      }
      WelfareApi.finishReport(params).then(res => {
        this.$message.success('核准完成')
        this.$router.go(-1)
      })
    },
    sureAdd: debounce(function (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let params = {
            amount: this.addEdit.amountl,
            companyId: this.$route.query.companyId,
            entryDate: this.addEdit.entryDatel ? this.changeDate(this.addEdit.entryDatel) : '',
            remark: this.addEdit.remarkl,
            userName: this.addEdit.userNamel,
            telephone: this.addEdit.telephonel,
            idCardNumber: this.addEdit.idCardNumberl,
            repotredId: this.id,
            department: this.addEdit.departmentl,
            oraName: this.addEdit.oraNamel
          }
          if (this.title === '编辑') params.id = this.oneData.id
          WelfareApi.pushReportListName(params).then(res => {
            this.$message.success(this.title + '成功')
            this._getControllerList()
            this.addDialog = false
          })
        } else {
          return false
        }
      })
    }, 500),
    isDel (row) {
      this.delReport = true
      this.dialogTitle = '删除'
      this.delId = row.id
    },
    sureDel () {
      if (this.dialogTitle === '删除') {
        let params = {
          id: this.delId,
          delete_tag: 1
        }
        WelfareApi.delReportList(params).then(res => {
          this.$message.success('删除成功')
          this.delReport = false
          this._getControllerList()
        })
      }
      if (this.dialogTitle === '提醒') {
        this.pushReport()
      }
    },
    changeDate (value) {
      let time = new Date(value)
      let year = time.getFullYear()
      let month = (time.getMonth() < 9 ? '0' : '') + (time.getMonth() + 1)
      let day = (time.getDate() < 10 ? '0' : '') + time.getDate()
      return year + '-' + month + '-' + day
    },
    normalSearch () {
      this.page.page = 1
      this.page.pageSize = 10
      this._getControllerList()
    },
    handleSizeChange (val) {
      this.page.page = 1
      this.page.pageSize = val
      this._getControllerList()
    },
    handleCurrentChange (val) {
      this.page.page = val
      this._getControllerList()
    }
  }
}
</script>

<style scoped lang="less">
  @import "~assets/less/page";
  &/deep/.el-button{
    padding: 0 20px;
  }
  .table-data{
    margin-top: 30px;
  }
  @media screen and (max-width: 1600px) {
    .search-form_box.length-box .search-form_button{
      margin-top: 0;
      .el-button{
        margin-left: 20px;
      }
    }
  }
  @media screen and (max-width: 744px) {
    .search-form_box.length-box .search-form_button{
      margin-top: 20px;
    }
  }
</style>
