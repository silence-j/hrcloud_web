<template>
  <div class="container">
    <div>
      <el-button type="primary" size="small" @click="goBack">返 回</el-button>
      <el-button type="primary" size="small" @click="addBtn">新 增</el-button>
    </div>
    <br/>
    <el-form>
      <el-row :gutter="22"  type="flex">
        <el-col :span='8'>
          <el-input v-model="socialForm.keyword" placeholder="输入关键词" @keyup.enter.native="searchList"></el-input>
        </el-col>
        <el-col style="padding-top:4px;">
          <el-button type="primary" size="small" @click="searchList">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <br/>
    <div>
      <el-table
          :data="StandardList"
          border>
          <el-table-column
              label="序号"
              type="index"
              width="70">
          </el-table-column>
          <el-table-column
          prop="areaName"
          label="参保机构"
          width="180">
          </el-table-column>
          <el-table-column
          prop="orgName"
          label="参保单位"
          width="180">
          </el-table-column>
          <el-table-column
          prop="householdNature"
          label="户籍性质">
          <template slot-scope="scope">
              <span>{{scope.row.householdNature | filterHouseholdNature}}</span>
          </template>
          </el-table-column>
          <el-table-column
          prop="personalPensionPercent"
          label="养老保险">
          <template slot-scope="scope">
            <span>{{(scope.row.personalPensionPercent*100).toFixed(2)}}%</span>
          </template>
          </el-table-column>
          <el-table-column
          prop="personalMedicalPercent"
          label="医疗保险">
          <template slot-scope="scope">
            <span>{{(scope.row.personalMedicalPercent*100).toFixed(2)}}%   +   {{scope.row.personalMedicalFixedMoney}}元</span>
          </template>
          </el-table-column>
          <el-table-column
          prop="personalUnemploymentPercent"
          label="失业保险">
          <template slot-scope="scope">
            <span>{{(scope.row.personalUnemploymentPercent*100).toFixed(2)}}%</span>
          </template>
          </el-table-column>
          <el-table-column
          prop="handleMonth"
          label="生效月份">
          </el-table-column>
          <el-table-column
          prop="settlementMonth"
          label="结算月份">
          </el-table-column>
          <el-table-column
              label="操作"
              fixed="right"
              width="220px">
              <template slot-scope="scope">
              <div class="operation">
                  <span @click="adjustBtn(scope.row)">调整</span>
                  <span @click="adjustmentBtn(scope.row)">调整记录</span>
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
    </div>
    <!-- 调整弹框 -->
    <el-dialog :title='title' :visible.sync="dialogFormVisible" width="600px">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="参保机构：" prop="areaName" v-if="title==='新增'">
            <el-input v-model="form.areaName" placeholder="请输入参保机构" ></el-input>
        </el-form-item>
        <el-form-item label="参保机构：" prop="areaName" v-else>
          <el-input v-model="form.areaName" placeholder="请输入参保机构" disabled></el-input>
        </el-form-item>
        <el-form-item label="参保单位：" prop="orgName" v-if="title==='新增'" class="mustForm">
          <div class="search-form_item">
            <search-dept-tree :orgDatas="orgDatas1" ref="deptTree"/>
          </div>
        </el-form-item>
        <el-form-item label="参保单位：" prop="orgName" v-else class="mustForm">
          <el-input v-model="orgName" placeholder="请输入参保单位" disabled></el-input>
        </el-form-item>
        <el-form-item label="户籍性质：" prop="householdNature" v-if="title==='新增'">
          <el-checkbox-group  v-model="form.householdNature" @change="checkHjxz" placeholder="请选择户籍性质">
            <el-checkbox :label="1">本地城镇</el-checkbox>
            <el-checkbox :label="2">本地农村</el-checkbox>
            <el-checkbox :label="3">外地城镇</el-checkbox>
            <el-checkbox :label="4">外地农村</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="户籍性质：" prop="householdNature" v-else>
          <el-checkbox-group v-model="form.householdNature" placeholder="请选择户籍性质">
            <el-checkbox :label="1" disabled>本地城镇</el-checkbox>
            <el-checkbox :label="2" disabled>本地农村</el-checkbox>
            <el-checkbox :label="3" disabled>外地城镇</el-checkbox>
            <el-checkbox :label="4" disabled>外地农村</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="养老保险：" prop="personalPensionPercent">
          <el-input v-model="form.personalPensionPercent" placeholder="请输入养老保险个人缴纳比例"><template slot="append">%</template></el-input>
        </el-form-item>
        <el-form-item label="医疗保险：" prop="personalMedicalPercent">
          <el-input v-model="form.personalMedicalPercent" style="width:220px" placeholder="请输入医疗保险个人缴纳比例"><template slot="append">%</template></el-input>
          <span> + </span>
          <el-input v-model="form.personalMedicalFixedMoney" style="width:220px" placeholder="请输入个人固定金额"><template slot="append">元</template></el-input>
        </el-form-item>
        <el-form-item label="失业保险：" prop="personalUnemploymentPercent">
          <el-input v-model="form.personalUnemploymentPercent" placeholder="请输入失业保险个人缴纳比例"><template slot="append">%</template></el-input>
        </el-form-item>
        <el-form-item label="生效月份：" prop="handleMonth">
          <el-date-picker
            v-model="form.handleMonth"
            type="month"
            placeholder="选择生效月份">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结算月份：" prop="settlementMonth">
          <el-date-picker
            v-model="form.settlementMonth"
            type="month"
            placeholder="选择结算月份">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="title==='新增'">
        <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addSaveBtn('form')" size="mini">确 定</el-button>
      </div>
      <div slot="footer" class="dialog-footer" v-else>
        <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="updateSaveBtn('form')" size="mini">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 调整记录 -->
    <el-dialog title="调整记录" :visible.sync="dialogVisible" width="500px">
      <div v-if="SelectOldFirstList.length>0">
        <div class="adjust-info"  v-for="(item,index) in SelectOldFirstList" :key="index">
          <p>{{item.createTime}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.operator}}</p>
          <p v-for="(sitem,index) in item.hisList" :key="index">{{sitem.changeContent}}</p>
        </div>
      </div>
      <div v-else>
        <p style="text-align:center">暂无记录</p>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getStandardList, getAddStandard, getUpdateStandard, getSocialSelectOldList } from 'static/api/socialSecurity'
import { monthToString } from 'assets/js/common'
import Pagination from 'components/Pagination.vue'
import { getToken } from 'assets/js/util'
import SearchDeptTree from 'components/SearchDeptTree'
export default {
  data () {
    return {
      orgDatas1: {
        filterName: '',
        orgId: '',
        dataTree: [],
        showTree: false
      },
      title: '',
      form: {
        areaName: '',
        handleMonth: '',
        handleTime: '',
        householdNature: [],
        orgId: '',
        orgName: '',
        personalMedicalFixedMoney: '',
        personalMedicalPercent: '',
        personalPensionPercent: '',
        personalUnemploymentPercent: '',
        settlementMonth: ''
      },
      StandardList: [],
      pageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      rules: {
        areaName: [
          { required: true, message: '请填写参保机构', trigger: 'blur' }
        ],
        householdNature: [
          { type: 'array', required: true, message: '请至少选择一个户籍性质', trigger: 'change' }
        ],
        personalPensionPercent: [
          { required: true, message: '请填写养老保险个人缴纳比例', trigger: 'blur' }
        ],
        personalMedicalPercent: [
          { required: true, message: '请填写医疗保险个人缴纳比例', trigger: 'blur' }
        ],
        personalUnemploymentPercent: [
          { required: true, message: '请填写失业保险个人缴纳比例', trigger: 'blur' }
        ],
        handleMonth: [
          { type: 'date', required: true, message: '请选择生效月份', trigger: 'change' }
        ],
        settlementMonth: [
          { type: 'date', required: true, message: '请选择结算月份', trigger: 'change' }
        ]
      },
      natureDatas: [
        { value: 1, label: '本地城镇' },
        { value: 2, label: '本地农村' },
        { value: 3, label: '外地城镇' },
        { value: 4, label: '外地农村' }
      ],
      socialForm: {
        keyword: ''
      },
      dialogFormVisible: false,
      dialogVisible: false,
      NatureArray: [],
      NatureId: [],
      householdNatureId: '',
      deletId: '',
      updateId: '',
      householdNatureIds: '',
      /* 公司 */
      SignVisible: false,
      SignForm: {
        orgName: '',
        signTime: ''
      },
      orgId: '',
      orgName: '',
      SelectOldFirstList: [],
      oldPercentId: ''
    }
  },
  components: {
    Pagination,
    SearchDeptTree
  },
  computed: {
    listParams () {
      return {
        keyword: this.socialForm.keyword,
        page: this.pageMsg.currentPage,
        size: this.pageMsg.pageSize
      }
    }
  },
  methods: {
    searchList () {
      this._getStandardList()
      this.pageMsg.currentPage = 1
    },
    /* 获取列表 */
    _getStandardList () {
      getStandardList(this.listParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.StandardList = data.result.records
          }
          this.pageMsg.total = data.result.total
        }
      })
    },
    /** 分页**/
    handleSizeChange (pageSize) {
      this.pageMsg.pageSize = pageSize
      this._getStandardList()
    },
    handleCurrentChange (currentPage) {
      this.pageMsg.currentPage = currentPage
      this._getStandardList()
    },
    /* 新增 */
    checkHjxz (val) {
      this.householdNatureIds = (val).join(',')
    },
    getCompanyId (val) {
      this.orgId = val.split('-')[0]
      this.orgName = val.split('-')[1]
    },
    addBtn () {
      this.title = '新增'
      setTimeout(() => {
        this.$refs.deptTree.clearSelectTree()
      })
      this.dialogFormVisible = true
      this.form.areaName = ''
      this.form.handleMonth = ''
      this.form.householdNature = ''
      this.form.householdNature = []
      this.form.orgName = ''
      this.form.personalMedicalFixedMoney = ''
      this.form.personalMedicalPercent = ''
      this.form.personalPensionPercent = ''
      this.form.personalUnemploymentPercent = ''
      this.form.settlementMonth = ''
      setTimeout(() => {
        this.$refs.deptTree.getCompany('1')
      }, 200)
    },
    addSaveBtn (formName) {
      let addParam = {
        areaName: this.form.areaName,
        handleMonth: monthToString(this.form.handleMonth),
        householdNature: this.householdNatureIds,
        orgId: this.orgDatas1.orgId,
        orgName: this.orgDatas1.filterName,
        personalMedicalFixedMoney: this.form.personalMedicalFixedMoney,
        personalMedicalPercent: this.form.personalMedicalPercent / 100,
        personalPensionPercent: this.form.personalPensionPercent / 100,
        personalUnemploymentPercent: this.form.personalUnemploymentPercent / 100,
        settlementMonth: monthToString(this.form.settlementMonth),
        status: 1
      }
      let ws = /^\d+\.?\d{0,2}$/
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.orgDatas1.orgId) {
            this.$message.warning('参保单位不能为空!')
            return false
          } if (this.form.personalPensionPercent > 100 || new RegExp(ws).test(this.form.personalPensionPercent) === false) {
            this.$message.warning('请填写正确格式的养老保险!')
            return false
          } if (this.form.personalMedicalPercent > 100 || new RegExp(ws).test(this.form.personalMedicalPercent) === false) {
            this.$message.warning('请填写正确格式的医疗保险!')
            return false
          } if (!this.form.personalMedicalFixedMoney || new RegExp(ws).test(this.form.personalMedicalFixedMoney) === false) {
            this.$message.warning('请填写正确医疗保险个人缴纳比例!')
            return false
          } if (this.form.personalUnemploymentPercent > 100 || new RegExp(ws).test(this.form.personalUnemploymentPercent) === false) {
            this.$message.warning('请填写正确格式的失业保险!')
            return false
          }
          if (monthToString(this.form.settlementMonth) < monthToString(this.form.handleMonth)) {
            this.$message.warning('结算月份不能小于生效月份!')
            return false
          }
          getAddStandard(addParam).then(data => {
            this.$message.success('新增成功!')
            setTimeout(() => {
              this._getStandardList()
              this.dialogFormVisible = false
            }, 500)
          })
        }
      })
    },
    /* 调整 */
    adjustBtn (row) {
      this.title = '调整'
      this.form.areaName = row.areaName
      this.form.handleMonth = row.handleMonth
      this.form.householdNature = []
      this.form.householdNature.push(Number(row.householdNature))
      this.householdNatureId = row.householdNature
      this.orgName = row.orgName
      this.orgId = row.orgId
      this.form.personalMedicalFixedMoney = (row.personalMedicalFixedMoney).toFixed(2)
      this.form.personalMedicalPercent = (row.personalMedicalPercent * 100).toFixed(2)
      this.form.personalPensionPercent = (row.personalPensionPercent * 100).toFixed(2)
      this.form.personalUnemploymentPercent = (row.personalUnemploymentPercent * 100).toFixed(2)
      this.form.settlementMonth = row.settlementMonth
      this.updateId = row.id
      this.dialogFormVisible = true
    },
    updateSaveBtn (formName) {
      this.form.handleMonth = new Date(this.form.handleMonth)
      this.form.settlementMonth = new Date(this.form.settlementMonth)
      let updateParam = {
        areaName: this.form.areaName,
        handleMonth: monthToString(this.form.handleMonth),
        householdNature: this.householdNatureId,
        orgId: this.orgId,
        orgName: this.orgName,
        personalMedicalFixedMoney: this.form.personalMedicalFixedMoney,
        personalMedicalPercent: this.form.personalMedicalPercent / 100,
        personalPensionPercent: this.form.personalPensionPercent / 100,
        personalUnemploymentPercent: this.form.personalUnemploymentPercent / 100,
        settlementMonth: monthToString(this.form.settlementMonth),
        status: 1,
        id: this.updateId,
        operator: getToken('loginName')
      }
      let ws = /^\d+\.?\d{0,2}$/
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.personalPensionPercent > 100 || new RegExp(ws).test(this.form.personalPensionPercent) === false) {
            this.$message.warning('请填写正确格式的养老保险!')
            return false
          } if (this.form.personalMedicalPercent > 100 || new RegExp(ws).test(this.form.personalMedicalPercent) === false) {
            this.$message.warning('请填写正确格式的医疗保险!')
            return false
          } if (!this.form.personalMedicalFixedMoney || new RegExp(ws).test(this.form.personalMedicalFixedMoney) === false) {
            this.$message.warning('请填写正确医疗保险个人缴纳比例!')
            return false
          } if (this.form.personalUnemploymentPercent > 100 || new RegExp(ws).test(this.form.personalUnemploymentPercent) === false) {
            this.$message.warning('请填写正确格式的失业保险!')
            return false
          }
          if (monthToString(this.form.settlementMonth) < monthToString(this.form.handleMonth)) {
            this.$message.warning('结算月份不能小于生效月份!')
            return false
          }
          getUpdateStandard(updateParam).then(data => {
            this.$message.success('修改成功!')
            setTimeout(() => {
              this._getStandardList()
              this.dialogFormVisible = false
            }, 500)
          })
        }
      })
    },

    goBack () {
      /* this.$router.replace('/personnel-information/social/waitSocial') */
      history.go(-1)
    },
    /* 调整记录 */
    adjustmentBtn (row) {
      this.oldPercentId = row.id
      this.dialogVisible = true
      let param = {
        oldPercentId: this.oldPercentId
      }
      getSocialSelectOldList(param).then(data => {
        if (data.result) {
          this.SelectOldFirstList = data.result
        }
      })
    }
  },
  filters: {
    filterHouseholdNature (status) {
      if (status === '1') {
        status = '本地城镇'
      } else if (status === '2') {
        status = '本地农村'
      } else if (status === '3') {
        status = '外地城镇'
      } else if (status === '4') {
        status = '外地农村'
      }
      return status
    }
  },
  created () {
    this._getStandardList()
  }
}
</script>

<style scoped lang="less">
.el-select{
  width:100%;
}
.el-form-item.mustForm{
  position: relative;
}
.el-form-item.mustForm::before{
  content: '*';
  color:red;
  position: absolute;
  top:15px;
  left:5px;
}
.adjust-info{
  margin-bottom:30px;
  p{
    margin-bottom:10px;
    font-size:14px;
  }
}
.operation span{
  margin:0px 12px;
}
</style>
