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
      <el-button type="primary" size="small" @click="addBtn()"  v-show="permission.indexOf('新增') !=-1">新 增</el-button>
      <el-button type="primary" size="small" @click="exportBtn" v-show="permission.indexOf('导出') !=-1">导 出</el-button>
      <a href="static/xlsFile/驻外定点医院.xls" class="moban" v-show="permission.indexOf('导入') !=-1"><el-button type="primary" size="small">下载模板</el-button></a>
      <el-button type="primary" size="small" @click="leadingInMsg" v-show="permission.indexOf('导入') !=-1">导 入</el-button>
    </div>

    <el-row class="mt-20 mb-20">
      <el-col :span="24">
        <div class="tab-wrap clearfix">
          <ul class="edit-tab clearfix">
            <li @click="emptyClearMsg">
              <router-link :to="'/personnel-information/security/securityTransfer'">社保转移记录</router-link>
            </li>
            <li @click="emptyClearMsg">
              <router-link :to="'/personnel-information/security/securityRetiree'">退休人员管理</router-link>
            </li>
            <li @click="emptyClearMsg">
              <router-link :to="'/personnel-information/security/stationedHospital'">驻外定点医院 </router-link>
            </li>
            <li @click="emptyClearMsg">
              <router-link :to="'/personnel-information/security/medicalReimbursement'">医疗报销人员 </router-link>
            </li>
            <li @click="emptyClearMsg">
              <router-link :to="'/personnel-information/security/birthTreatment'">生育待遇 </router-link>
            </li>
            <li @click="emptyClearMsg">
              <router-link :to="'/personnel-information/security/occupationalInjury'">工伤待遇 </router-link>
            </li>
            <li @click="emptyClearMsg">
              <router-link :to="'/personnel-information/security/unemploymentTreatment'">失业待遇 </router-link>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>

    <el-table
        :data="stationedHospitalList"
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
            label="身份证号"
              width="180">
        </el-table-column>
        <el-table-column
            prop="abroadCity"
            label="驻外城市">
        </el-table-column>
        <el-table-column
            prop="hospitalLevel1"
            label="定点医院名称及等级(一)"
            width="190px;">
        </el-table-column>
        <el-table-column
            prop="hospitalLevel2"
            label="定点医院名称及等级(二)"
            width="190px;">
        </el-table-column>
        <el-table-column
            prop="hospitalLevel3"
            label="定点医院名称及等级(三)"
            width="190px;">
        </el-table-column>
        <el-table-column
            prop="orgName"
            label="参保公司"
            width="180px;">
        </el-table-column>
        <el-table-column
            prop="areaName"
            label="参保地">
        </el-table-column>
        <el-table-column
            prop="operateTime"
            label="办理时间">
        </el-table-column>
        <el-table-column
            label="操作"
            fixed="right"
            width="150px">
            <template slot-scope="scope">
            <div class="operation">
                <span @click="updateBtn(scope.row)">修改</span>
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
    <el-dialog :title="title" :visible.sync="HospitalVisible" width="500px">
      <el-form :model="form" :rules="rules" ref="form" label-width="190px">
          <el-form-item label="姓名：" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：" prop="idCardNumber">
              <el-input v-model="form.idCardNumber" placeholder="请输入身份证号"></el-input>
          </el-form-item>
          <el-form-item label="驻外城市：" prop="abroadCity">
              <el-input v-model="form.abroadCity" placeholder="请输入驻外城市"></el-input>
          </el-form-item>
          <el-form-item label="定点医院名称及等级(一)：" prop="hospitalLevel1">
              <el-input v-model="form.hospitalLevel1" placeholder="请输入定点医院名称及等级(一)"></el-input>
          </el-form-item>
          <el-form-item label="定点医院名称及等级(二)：" prop="hospitalLevel2">
              <el-input v-model="form.hospitalLevel2" placeholder="请输入定点医院名称及等级(二)"></el-input>
          </el-form-item>
          <el-form-item label="定点医院名称及等级(三)：" prop="hospitalLevel3">
              <el-input v-model="form.hospitalLevel3" placeholder="请输入定点医院名称及等级(三)"></el-input>
          </el-form-item>
          <el-form-item label="参保公司：" prop="orgName">
              <el-input v-model="form.orgName" placeholder="请输入参保公司"></el-input>
          </el-form-item>
          <el-form-item label="参保地：" prop="areaName">
              <el-input v-model="form.areaName" placeholder="请输入参保地"></el-input>
          </el-form-item>
          <el-form-item label="办理时间：" prop="operateTime">
              <el-date-picker
                  v-model="form.operateTime"
                  type="date"
                  placeholder="选择办理时间">
              </el-date-picker>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="title === '新增' ">
          <el-button @click="HospitalVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="addSaveBtn('form')" size="mini">确 定</el-button>
      </div>
      <div slot="footer" class="dialog-footer" v-else>
          <el-button @click="HospitalVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="updateSaveBtn('form')" size="mini">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 导出列表 -->
    <form style="display:none" name="form" method="POST" ref="submitExcel" id="submitExcel" :action="hostBaseUrl+'/funds/treatment/hospital/export'">
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
import { getdeleteHospital, getAddHospital, getUpdateHospital, getHospitalList } from 'static/api/socialSecurity'
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
      stationedHospitalList: [],
      title: '',
      HospitalVisible: false,
      form: {
        userName: '',
        idCardNumber: '',
        abroadCity: '',
        hospitalLevel1: '',
        hospitalLevel2: '',
        hospitalLevel3: '',
        orgName: '',
        areaName: '',
        operateTime: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        idCardNumber: [
          { required: true, message: '请输入身份证号码', trigger: 'blur' }
        ],
        abroadCity: [
          { required: true, message: '请输入驻外城市', trigger: 'blur' }
        ],
        hospitalLevel1: [
          { required: true, message: '请输入定点医院名称及等级(一)', trigger: 'blur' }
        ],
        hospitalLevel2: [
          { required: true, message: '请输入定点医院名称及等级(二)', trigger: 'blur' }
        ],
        hospitalLevel3: [
          { required: true, message: '请输入定点医院名称及等级(三)', trigger: 'blur' }
        ],
        orgName: [
          { required: true, message: '请输入参保公司', trigger: 'blur' }
        ],
        areaName: [
          { required: true, message: '请输入参保地', trigger: 'blur' }
        ],
        operateTime: [
          { type: 'date', required: true, message: '请选择办理时间', trigger: 'change' }
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
    emptyClearMsg () {

    },
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
      axios.post(this.hostBaseUrl + '/funds/treatment/hospital/upload', formData, config).then((res) => {
        if (res.data.subCode === 10000) {
          this.chooseVisible = false
          this.$message.success('导入成功')
          this.leadingInVisible = false
          setTimeout(() => {
            this._getStationedHospitalList()
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
    _getStationedHospitalList () {
      getHospitalList(this.listParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.stationedHospitalList = data.result.records
          }
          this.pageMsg.total = data.result.total
        }
      })
    },
    /** 分页**/
    handleSizeChange (pageSize) {
      this.pageMsg.pageSize = pageSize
      this._getStationedHospitalList()
    },
    handleCurrentChange (currentPage) {
      this.pageMsg.currentPage = currentPage
      this._getStationedHospitalList()
    },
    /* 新增 */
    addBtn () {
      this.title = '新增'
      this.HospitalVisible = true
      this.form.userName = ''
      this.form.idCardNumber = ''
      this.form.abroadCity = ''
      this.form.hospitalLevel1 = ''
      this.form.hospitalLevel2 = ''
      this.form.hospitalLevel3 = ''
      this.form.orgName = ''
      this.form.areaName = ''
      this.form.operateTime = ''
    },
    addSaveBtn (formName) {
      let addParam = {
        userName: this.form.userName,
        idCardNumber: this.form.idCardNumber,
        abroadCity: this.form.abroadCity,
        hospitalLevel1: this.form.hospitalLevel1,
        hospitalLevel2: this.form.hospitalLevel2,
        hospitalLevel3: this.form.hospitalLevel3,
        orgName: this.form.orgName,
        areaName: this.form.areaName,
        operateTime: timeZeroToString(this.form.operateTime),
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
          getAddHospital(addParam).then(data => {
            this.$message.success('新增成功!')
            setTimeout(() => {
              this._getStationedHospitalList()
              this.HospitalVisible = false
            }, 500)
          })
        }
      })
    },
    /* 修改 */
    updateBtn (row) {
      this.title = '修改'
      this.HospitalVisible = true
      this.form.userName = row.userName
      this.form.idCardNumber = row.idCardNumber
      this.form.abroadCity = row.abroadCity
      this.form.hospitalLevel1 = row.hospitalLevel1
      this.form.hospitalLevel2 = row.hospitalLevel2
      this.form.hospitalLevel3 = row.hospitalLevel3
      this.form.orgName = row.orgName
      this.form.areaName = row.areaName
      this.form.operateTime = new Date(row.operateTime)
      this.updateId = row.id
    },
    updateSaveBtn (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let updateParam = {
            userName: this.form.userName,
            idCardNumber: this.form.idCardNumber,
            abroadCity: this.form.abroadCity,
            hospitalLevel1: this.form.hospitalLevel1,
            hospitalLevel2: this.form.hospitalLevel2,
            hospitalLevel3: this.form.hospitalLevel3,
            orgName: this.form.orgName,
            areaName: this.form.areaName,
            operateTime: timeZeroToString(this.form.operateTime),
            insuranceId: -1,
            userId: -1,
            id: this.updateId
          }
          var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
          if (reg.test(this.form.idCardNumber) === false) {
            this.$message.warning('身份证输入不合法!')
            return false
          }
          getUpdateHospital(updateParam).then(data => {
            this.$message.success('修改成功!')
            setTimeout(() => {
              this._getStationedHospitalList()
              this.HospitalVisible = false
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
        getdeleteHospital(deleteParam).then(data => {
          setTimeout(() => {
            this.$message.success('删除成功!')
            this._getStationedHospitalList()
          }, 500)
        })
      }).catch(() => {})
    }
  },
  created () {
    this._getStationedHospitalList()
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
