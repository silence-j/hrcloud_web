<template>
  <div class="container">
    <el-form>
      <el-row :gutter="22"  type="flex">
        <el-col :span='8'>
          <el-input v-model="socialForm.keyword" placeholder="输入关键词" @keyup.enter.native="searchList"></el-input>
        </el-col>
        <el-col :span='8'>
          <el-date-picker
            v-model="socialForm.startTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-col>
        <span class="lineSearch"> - </span>
        <el-col :span='8'>
          <el-date-picker
            v-model="socialForm.endTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-col>
        <el-col class="pt-3">
          <el-button type="primary" size="small" @click="searchList">查询</el-button>
        </el-col>
      </el-row>
    </el-form>

    <div class="mt-20 mb-20">
      <el-button type="primary" size="small" @click="addBtn()" v-show="permission.indexOf('新增') !=-1">新 增</el-button>
      <el-button type="primary" size="small" @click="exportBtn" v-show="permission.indexOf('导出') !=-1">导 出</el-button>
      <a href="static/xlsFile/医疗报销人员.xls" class="moban" v-show="permission.indexOf('导入') !=-1"><el-button type="primary" size="small">下载模板</el-button></a>
      <el-button type="primary" size="small" @click="leadingInMsg" v-show="permission.indexOf('导入') !=-1">导 入</el-button>
    </div>

    <el-row class="mt-20 mb-20">
      <el-col :span="24">
        <div class="tab-wrap clearfix">
          <ul class="edit-tab clearfix">
            <li>
              <router-link :to="'/personnel-information/security/securityTransfer'">社保转移记录</router-link>
            </li>
            <li>
              <router-link :to="'/personnel-information/security/securityRetiree'">退休人员管理</router-link>
            </li>
            <li>
              <router-link :to="'/personnel-information/security/stationedHospital'">驻外定点医院 </router-link>
            </li>
            <li>
              <router-link :to="'/personnel-information/security/medicalReimbursement'">医疗报销人员 </router-link>
            </li>
            <li>
              <router-link :to="'/personnel-information/security/birthTreatment'">生育待遇 </router-link>
            </li>
            <li>
              <router-link :to="'/personnel-information/security/occupationalInjury'">工伤待遇 </router-link>
            </li>
            <li>
              <router-link :to="'/personnel-information/security/unemploymentTreatment'">失业待遇 </router-link>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>

    <el-table
        :data="medicalList"
        border
        style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          width="70">
        </el-table-column>
        <el-table-column
            prop="userName"
            label="姓名">
        </el-table-column>
        <el-table-column
            prop="idCardNumber"
            label="身份证号">
        </el-table-column>
        <el-table-column
            prop="medicalType"
            label="住院/门诊">
            <template slot-scope="scope">
              <span>{{scope.row.medicalType | filterMedicalType}}</span>
            </template>
        </el-table-column>
        <el-table-column
            prop="occurrenceTime"
            label="发生时间">
        </el-table-column>
        <el-table-column
            prop="paymentAmount"
            label="费用总额(元)">
        </el-table-column>
        <el-table-column
            prop="reimbursementTime"
            label="报销时间">
        </el-table-column>
        <el-table-column
            prop="orgName"
            label="参保公司">
        </el-table-column>
        <el-table-column
            prop="areaName"
            label="参保地">
        </el-table-column>
        <el-table-column
            label="操作"
            fixed="right"
            width="180px">
            <template slot-scope="scope">
            <div class="operation">
                <span @click="updateBtn(scope.row)" >修改</span>
                <span @click="deleteBtn(scope.row)">删除</span>
            </div>
            </template>
        </el-table-column>
    </el-table>
    <pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageMsg.currentPage"
      :page-sizes="pageMsg.pageSizes"
      :page-size="pageMsg.pageSize"
      :total="pageMsg.total">
    </pagination>

    <!-- 新增/修改弹框 -->
    <el-dialog :title="title" :visible.sync="medicalVisible" width="500px">
        <el-form :model="form" :rules="rules" ref="form" label-width="120px">
            <el-form-item label="姓 名：" prop="userName">
                <el-input v-model="form.userName" placeholder="请选择姓名"></el-input>
            </el-form-item>
            <el-form-item label="身份证号：" prop="idCardNumber">
                <el-input v-model="form.idCardNumber" placeholder="请选择身份证号"></el-input>
            </el-form-item>
            <el-form-item label="住院/门诊：" prop="medicalType">
                <el-select v-model="form.medicalType" placeholder="请选择住院/门诊">
                    <el-option
                    v-for="item in medicalTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发生时间：" prop="occurrenceTime">
                <el-date-picker
                    v-model="form.occurrenceTime"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="费用总额：" prop="paymentAmount">
                <el-input type="number" min="0" v-model="form.paymentAmount" placeholder="请输入费用总额"><template slot="append">元</template></el-input>
            </el-form-item>
            <el-form-item label="报销时间：" prop="reimbursementTime">
                <el-date-picker
                    v-model="form.reimbursementTime"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="参保公司：" prop="orgName">
                <el-input v-model="form.orgName" placeholder="请输入参保公司"></el-input>
            </el-form-item>
            <el-form-item label="参 保 地：" prop="areaName">
                <el-input v-model="form.areaName" placeholder="请输入参保地"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" v-if="title==='新增'">
            <el-button @click="medicalVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="addSaveBtn('form')" size="mini">确 定</el-button>
        </div>
        <div slot="footer" class="dialog-footer" v-else>
            <el-button @click="medicalVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="updateSaveBtn('form')" size="mini">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 导出列表 -->
    <form style="display:none" name="form" method="POST" ref="submitExcel" id="submitExcel" :action="hostBaseUrl+'/funds/treatment/medical/export'">
      <p>startTime: <input type="text" id="startTime" name="startTime" value="" /></p>
      <p>endTime: <input type="text" id="endTime" name="endTime" value="" /></p>
      <p>keyword: <input type="text" id="keyword" name="keyword" value="" /></p>
      <input type="submit" value="Submit"/>
    </form>

    <!-- 导入列表 -->
    <el-dialog title="选择导入文件" :visible.sync="leadingInVisible" width="500px">
      <div class="module-opera">
        <form>
          <label>选择文件：</label>
          <input type="file" name="file" id="fileField" @change="getFile($event)" onchange="document.getElementById('textfield').value=this.value" />
          <input type='text' id="textfield" />&nbsp;&nbsp;&nbsp;
          <el-button size="mini" type="primary">浏览</el-button>
        </form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="leadingInVisible = false" class="false" size="mini">取 消</el-button>
        <el-button type="primary" @click="fileUpload($event)" size="mini">导 入</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getMedicalList, getAddMedical, getUpdateMedical, getDeleteMedical } from 'static/api/socialSecurity'
import { timeZeroToString } from 'assets/js/common'
import Pagination from 'components/Pagination.vue'
import { hostBaseUrl } from 'utils/config'
import { getExmine } from 'assets/js/exmine'
import axios from 'axios'
export default {
  data () {
    return {
      socialForm: {
        startTime: '',
        endTime: '',
        keyword: ''
      },
      hostBaseUrl: '',
      medicalList: [],
      title: '',
      medicalVisible: false,
      form: {
        userName: '',
        idCardNumber: '',
        medicalType: '',
        occurrenceTime: '',
        paymentAmount: '',
        reimbursementTime: '',
        orgName: '',
        areaName: ''
      },
      medicalTypeOptions: [
        { value: 1, label: '住院' },
        { value: 2, label: '门诊' }
      ],
      rules: {
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        idCardNumber: [
          { required: true, message: '请输入身份证号码', trigger: 'blur' }
        ],
        medicalType: [
          { required: true, message: '请选择住院/门诊', trigger: 'change' }
        ],
        occurrenceTime: [
          { type: 'date', required: true, message: '请选择发生时间', trigger: 'change' }
        ],
        paymentAmount: [
          { required: true, message: '请输入费用总额', trigger: 'blur' }
        ],
        reimbursementTime: [
          { type: 'date', required: true, message: '请选择报销时间', trigger: 'change' }
        ],
        orgName: [
          { required: true, message: '请输入参保公司', trigger: 'blur' }
        ],
        areaName: [
          { required: true, message: '请输入参保地', trigger: 'blur' }
        ]
      },
      updateId: '',
      deletId: '',
      pageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      leadingInVisible: false
    }
  },
  components: {
    Pagination
  },
  computed: {
    permission () {
      return getExmine().allSecurityTransfer
    },
    listParams () {
      return {
        startTime: this.socialForm.startTime ? timeZeroToString(this.socialForm.startTime) : '',
        endTime: this.socialForm.endTime ? timeZeroToString(this.socialForm.endTime) : '',
        keyword: this.socialForm.keyword,
        page: this.pageMsg.currentPage,
        size: this.pageMsg.pageSize
      }
    }
  },
  methods: {
    searchList () {
      this.handleCurrentChange(1)
    },
    exportBtn () {
      document.getElementById('startTime').setAttribute('value', this.socialForm.startTime ? timeZeroToString(this.socialForm.startTime) : '')
      document.getElementById('endTime').setAttribute('value', this.socialForm.endTime ? timeZeroToString(this.socialForm.endTime) : '')
      document.getElementById('keyword').setAttribute('value', this.socialForm.keyword ? this.socialForm.keyword : '')
      this.$refs.submitExcel.submit()
    },
    /* 导入 */
    leadingInMsg () {
      this.leadingInVisible = true
    },
    getFile (event) {
      this.file = event.target.files[0]
      let type = this.file.name.substring((this.file.name.lastIndexOf('.')) + 1, this.file.name.length)
      // console.log(type)
      if (type !== 'xls' && type !== 'xlsx') {
        this.$message.warning('不支持该文件类型导入！')
        document.getElementById('textfield').value = ''
      }
    },
    fileUpload (event) {
      event.preventDefault()
      let formData = new FormData()
      formData.append('file', this.file)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      if (this.file === undefined) {
        this.$message.warning('请选择导入文件!')
        return
      }
      axios.post(this.hostBaseUrl + '/funds/treatment/medical/upload', formData, config).then((res) => {
        if (res.data.subCode === 10000) {
          this.chooseVisible = false
          this.$message.success('导入成功')
          this.leadingInVisible = false
          setTimeout(() => {
            this._getMedicaltList()
          }, 400)
        } else {
          this.$confirm('导入失败! 请修改后重新导入。' + res.data.subMsg, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
          }).catch(() => {
          })
        }
      })
    },
    /* 获取列表 */
    _getMedicaltList () {
      getMedicalList(this.listParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.medicalList = data.result.records
          }
          this.pageMsg.total = data.result.total
        }
      })
    },
    /** 分页**/
    handleSizeChange (pageSize) {
      this.pageMsg.pageSize = pageSize
      this._getMedicaltList()
    },
    handleCurrentChange (currentPage) {
      this.pageMsg.currentPage = currentPage
      this._getMedicaltList()
    },
    /* 新增 */
    addBtn () {
      this.medicalVisible = true
      this.title = '新增'
      this.form.userName = ''
      this.form.idCardNumber = ''
      this.form.medicalType = ''
      this.form.occurrenceTime = ''
      this.form.paymentAmount = ''
      this.form.reimbursementTime = ''
      this.form.orgName = ''
      this.form.areaName = ''
    },
    addSaveBtn (formName) {
      let addParam = {
        userName: this.form.userName,
        idCardNumber: this.form.idCardNumber,
        medicalType: this.form.medicalType,
        occurrenceTime: timeZeroToString(this.form.occurrenceTime),
        paymentAmount: this.form.paymentAmount,
        reimbursementTime: timeZeroToString(this.form.reimbursementTime),
        orgName: this.form.orgName,
        areaName: this.form.areaName,
        insuranceId: -1,
        userId: -1
      }
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (reg.test(this.form.idCardNumber) === false) {
            this.$message.warning('身份证输入不合法!')
            return false
          }
          if (this.form.paymentAmount <= 0) {
            this.$message.warning('费用总额不能小于等于0!')
            return false
          }
          getAddMedical(addParam).then(data => {
            this.$message.success('新增成功!')
            setTimeout(() => {
              this._getMedicaltList()
              this.medicalVisible = false
            }, 500)
          })
        }
      })
    },
    /* 修改 */
    updateBtn (row) {
      this.title = '修改'
      this.medicalVisible = true
      this.form.userName = row.userName
      this.form.idCardNumber = row.idCardNumber
      this.form.medicalType = row.medicalType
      this.form.occurrenceTime = new Date(row.occurrenceTime)
      this.form.paymentAmount = row.paymentAmount
      this.form.reimbursementTime = new Date(row.reimbursementTime)
      this.form.orgName = row.orgName
      this.form.areaName = row.areaName
      this.updateId = row.id
    },
    updateSaveBtn (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let updateParam = {
            userName: this.form.userName,
            idCardNumber: this.form.idCardNumber,
            medicalType: this.form.medicalType,
            occurrenceTime: timeZeroToString(this.form.occurrenceTime),
            paymentAmount: this.form.paymentAmount,
            reimbursementTime: timeZeroToString(this.form.reimbursementTime),
            orgName: this.form.orgName,
            areaName: this.form.areaName,
            userId: -1,
            insuranceId: -1,
            id: this.updateId
          }
          var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
          if (reg.test(this.form.idCardNumber) === false) {
            this.$message.warning('身份证输入不合法!')
            return false
          }
          if (this.form.paymentAmount <= 0) {
            this.$message.warning('费用总额不能小于等于0!')
            return false
          }
          getUpdateMedical(updateParam).then(data => {
            this.$message.success('修改成功!')
            setTimeout(() => {
              this._getMedicaltList()
              this.medicalVisible = false
            }, 500)
          })
        }
      })
    },
    /* 删除 */
    deleteBtn (row) {
      this.deletId = row.id
      let deleteParam = {
        id: this.deletId
      }
      this.$confirm('删除后不可恢复，确定要删除' + row.userName + '吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        getDeleteMedical(deleteParam).then(data => {
          setTimeout(() => {
            this.$message.success('删除成功!')
            this._getMedicaltList()
          }, 500)
        })
      }).catch(() => {})
    }
  },
  filters: {
    filterMedicalType (status) {
      if (status === 1) {
        status = '住院'
      } else {
        status = '门诊'
      }
      return status
    }
  },
  created () {
    this._getMedicaltList()
    this.hostBaseUrl = hostBaseUrl
    /* console.log(this.permission) */
  }
}
</script>

<style scoped lang="less">
.el-select{
  width:100%;
}
#fileField{
  width: 80%;
  height: 30px;
  position: absolute;
  top: 90px;
  left: 98px;
  opacity: 0;
}
#textfield{
  height: 25px;
  line-height: 25px;
   width: 62%;
  padding:0px 10px;
}
.btnMsg{
  font-size: 14px;
  color: #fff;
  background: #FF7500;
  border: none;
  padding: 6px 20px;
  border-radius: 5px;
}
</style>
