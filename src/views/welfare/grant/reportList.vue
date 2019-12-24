<template>
  <div @click="orgDatas2.showTree = false">
    <div style="margin-bottom: 20px" v-if="isExport === 'true' || isExport === true">
      <el-button @click.stop="$router.go(-1)" type="primary" size="small">返回</el-button>
      <el-button v-if="isOperation !== '1'" @click="finish" type="primary" size="small">完成核对</el-button>
      <el-button v-if="isOperation !== '1'"  @click="addPerson" type="primary" size="small">新增人员</el-button>
      <el-button v-if="permission.indexOf('导出')!=-1"  @click="exportList" type="primary" size="small">导出</el-button>
    </div>
    <div style="margin-bottom: 20px" v-else="">
      <el-button @click="$router.go(-1)">返回</el-button>
      <el-button v-if="isOperation !== '1'" @click="addPerson" type="primary" size="small">新增人员</el-button>
      <el-button v-if="isOperation !== '1'" @click="isSureReport" type="primary" size="small">上报名单</el-button>
    </div>
    <el-form :model="postForm">
      <div class="search-form_box clearfix length-box search">
        <div class="search-form_item">
          <el-input @keyup.enter.native="normalSearch" :disabled="isSearch" v-model="postForm.keyWords" placeholder="请输入关键字" ></el-input>
        </div>
        <div class="search-form_button pt-3">
          <el-button :disabled="isSearch" type="primary" size="small" @click="normalSearch">查询</el-button>
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
            <el-table-column prop="idCardNumber" label="身份证" ></el-table-column>
            <el-table-column prop="userStatus" label="人员类别">
              <template slot-scope="scope">
              <span v-if="scope.row.userStatus === 1" class="brokenStyle">实习</span>
              <span v-if="scope.row.userStatus === 2" class="brokenStyle">试用</span>
              <span v-if="scope.row.userStatus === 3" class="brokenStyle">正式</span>
              <span v-if="scope.row.userStatus === 4" class="brokenStyle">退休</span>
              </template>
            </el-table-column>
            <el-table-column prop="companyName" label="发放地" ></el-table-column>
            <el-table-column prop="disbursement" label="发放方式"></el-table-column>
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
            style="margin-top: 20px"
            v-if="page.totalCount > 10"
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
        <el-table show-summary style="margin-top: 20px; width: 950px;" :data="summaryList" border>
          <el-table-column prop="companyName" label="发放地" width="150px">
            <template slot-scope="scope">
              <span>{{scope.row.companyName || ''}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="zhengShi" label="正式员工" width="200px">
          </el-table-column>
          <el-table-column prop="shiYong" label="试用" width="200px">
          </el-table-column>
          <el-table-column prop="tuiXiu" label="退休" width="200px">
          </el-table-column>
          <el-table-column prop="count" label="小计" width="200px">
          </el-table-column>
        </el-table>
      </div>
    </lenTabs>
    <el-dialog @close="cancelAdd" :title="title" width="520px" :visible.sync="addDialog" class="add-dialog">
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
              :rules="{required: true, message: '人员类别不能为空', trigger: ['blur']}"
              prop="userStatusl"
              label="人员类别:">
              <el-select v-model="addEdit.userStatusl" @change="user" style="width: 100%;">
                <el-option v-for="(item, index) in userStatus"
                :label="item.label"
                :value="item.value"
                :key="index">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item
              label="发放地:">
              <search-dept-tree :orgDatas="orgDatas2" ref="deptTree2"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item
              :rules="{required: true, message: '发放方式不能为空', trigger: ['blur']}"
              prop="disbursementl"
              label="发放方式:">
              <el-select style="width: 100%;" v-model="addEdit.disbursementl" @change="user">
                <el-option value="自提"></el-option>
                <el-option value="发货"></el-option>
              </el-select>
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
        <el-button @click="cancelAdd">取消</el-button>
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
    <form  style="display:none" name="form" method="POST" ref="submitExcel" target="_blank" :action="hostBaseUrl+'/duty/welfareDetail/entityDetail'">
      <p>companyId: <input type="text" id="companyId" name="companyId" value="" /></p>
      <p>repotredId: <input type="text" id="repotredId" name="repotredId" value="" /></p>
      <p>templateId: <input type="text" id="templateId" name="templateId" value="" /></p>
      <input type="submit" value="Submit"  />
    </form>
  </div>
</template>

<script>
import WelfareApi from 'static/api/welfare/welfare'
import SearchDeptTree from 'components/SearchDeptTree'
import { hostBaseUrl } from 'utils/config'
import lenTabs from 'components/lenTabs'
import { getToken } from 'assets/js/util'
import { getExmine } from 'assets/js/exmine'
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
      hostBaseUrl: '',
      addDialog: false,
      isSearch: false,
      msgRemind: [
        { name: '明细表', unReadCount: 0 },
        { name: '汇总表', unReadCount: 0 }
      ],
      addEdit: {
        oraNamel: '',
        departmentl: '',
        userNamel: '',
        idCardNumberl: '',
        userStatusl: '',
        companyName: '',
        disbursementl: '',
        remarkl: ''
      },
      orgDatas2: {
        filterName: '',
        orgId: '',
        dataTree: [],
        showTree: false
        // bindData: 'company'
      },
      userStatus: [
        { label: '实习', value: 1 },
        { label: '试用', value: 2 },
        { label: '正式', value: 3 },
        { label: '退休', value: 4 }
      ],
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
    lenTabs,
    SearchDeptTree
  },
  mounted () {
    this._getControllerList()
    // this.$store.commit('SET_TREE_CHECKED_ALL_ORGIDS', [])
  },
  created () {
    this.hostBaseUrl = hostBaseUrl
  },
  computed: {
    permission () {
      return getExmine().welfareGrant
    }
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
        companyId: this.companyId ? String(this.companyId) : this.companyId,
        repotredId: this.id ? String(this.id) : this.id,
        templateId: this.templateId ? String(this.templateId) : this.templateId,
        keyword: this.postForm.keyWords
      }
      WelfareApi.getReportNameList(params).then(res => {
        if (res.result.records) {
          this.grantDetailList = res.result.records
          this.page.totalCount = res.result.total
        }
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
    _getSummaryList () {
      let params = {
        companyId: this.companyId ? String(this.companyId) : this.companyId,
        repotredId: this.id ? String(this.id) : this.id
      }
      WelfareApi.getSummaryList0(params).then(res => {
        if (res.result) {
          let curList = []
          curList = res.result
          curList.forEach(res => {
            let cur = 0
            cur = res.shiYong + res.tuiXiu + res.zhengShi
            res.count = cur
          })
          this.summaryList = curList
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
      this.addEdit.userStatusl = ''
      this.addEdit.disbursementl = ''
      this.addEdit.remarkl = ''
      this.addDialog = true
      this.addEdit.departmentl = ''
      this.$store.commit('SET_COMPANY_TYPE', 'company')
    },
    user () {
      console.log(this.addEdit.userStatus)
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
      this.addEdit.userStatusl = this.oneData.userStatus
      // this.addEdit.companyName = '杭州'
      this.addEdit.disbursementl = this.oneData.disbursement
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
          path: '/welfare/grant',
          query: { gift: '11' }
        })
      })
    },
    cancelAdd () {
      this.addDialog = false
      this.orgDatas2.filterName = ''
      this.orgDatas2.orgId = ''
    },
    sureAdd (form) {
      console.log(this.addEdit.userStatus)
      this.$refs[form].validate((valid) => {
        if (valid) {
          let params = {
            companyId: this.$route.query.companyId,
            remark: this.addEdit.remarkl,
            userName: this.addEdit.userNamel,
            userStatus: this.addEdit.userStatusl ? Number(this.addEdit.userStatusl) : '',
            idCardNumber: this.addEdit.idCardNumberl,
            repotredId: this.id,
            department: this.addEdit.departmentl,
            oraName: this.addEdit.oraNamel,
            // companyName: this.addEdit.companyName,
            companyName: this.orgDatas2.filterName,
            disbursement: this.addEdit.disbursementl
          }
          if (this.title === '编辑') params.id = this.oneData.id
          WelfareApi.pushReportListName(params).then(res => {
            this.$message.success(this.title + '成功')
            this.orgDatas2.filterName = ''
            this.orgDatas2.orgId = ''
            this._getControllerList()
            this.addDialog = false
          })
        } else {
          this.$message.error('error submit')
          return false
        }
      })
    },
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
      margin-left: 20px;
    }
  }
</style>
