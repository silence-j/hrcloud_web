<template>
  <div class="container" @click="orgDatas.showTree = false">
    <div class="mb-20">
      <el-button type="primary" size="small" @click="goBack()">返 回</el-button>
      <el-button type="primary" size="small" @click="addBtn()">新 增</el-button>
    </div>
    <el-form class="mb-20">
      <el-row :gutter="22" type="flex">
        <el-col :span='8'>
          <el-input v-model="socialForm.keyword" placeholder="输入关键词" @keyup.enter.native="searchList"></el-input>
        </el-col>
        <el-col style="padding-top:4px;">
          <el-button type="primary" size="small" @click="searchList">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="mb-20">
      <el-table
          :data="StandardList"
          border>
          <el-table-column
              prop="areaName"
              label="参保机构">
          </el-table-column>
          <el-table-column
              prop="orgName"
              label="参保单位">
          </el-table-column>
          <el-table-column
              prop="fundPercent"
              label="公积金">
            <template slot-scope="scope">
              <span>{{(scope.row.fundPercent*100).toFixed(2)}}%</span>
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
              width="200px">
              <template slot-scope="scope">
                <div class="operation">
                  <span @click="adjustBtn(scope.row)">调整</span>
                  <span @click="adjustment(scope.row)">调整记录</span>
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
    <el-dialog :title='title' :visible.sync="adjusFormVisible" width="500px">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="缴纳机构：" prop="areaName" v-if="title==='新增'">
          <el-input v-model="form.areaName" placeholder="请输入缴纳机构"></el-input>
        </el-form-item>
        <el-form-item label="缴纳机构：" prop="areaName" v-else>
          <el-input v-model="form.areaName" placeholder="请输入缴纳机构" disabled></el-input>
        </el-form-item>
        <el-form-item label="缴纳单位：" prop="orgName" class="mustForm" v-if="title==='新增'">
          <div class="search-form_item">
            <search-dept-tree :orgDatas="orgDatas1" ref="deptTree"/>
          </div>
        </el-form-item>
        <el-form-item label="缴纳单位：" prop="orgName" class="mustForm" v-else>
          <el-input v-model="form.orgName" disabled></el-input>
        </el-form-item>
        <el-form-item label="公 积 金：" prop="fundPercent">
          <el-input  v-model="form.fundPercent" placeholder="请输入公积金个人缴纳比例(保留两位小数)"><template slot="append">%</template></el-input>
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
      <div slot="footer" class="dialog-footer" v-if="title==='新增' ">
        <el-button @click="adjusFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addSaveBtn('form')" size="mini">确 定</el-button>
      </div>
      <div slot="footer" class="dialog-footer" v-else>
        <el-button @click="adjusFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="UpdateSaveBtn('form')" size="mini">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 调整记录 -->
    <el-dialog title="调整记录" :visible.sync="adjustmentVisible" width="500px">
      <div v-if="SelectOldList.length > 0">
        <div class="adjust-info"  v-for="(item,index) in SelectOldList" :key="index">
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
import { getFundStandardList, getFundAddStandard, getFundUpdateStandard, getFundSelectOldList } from 'static/api/socialSecurity'
import Pagination from 'components/Pagination.vue'
import { monthToString } from 'assets/js/common'
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
      socialForm: {
        keyword: ''
      },
      StandardList: [],
      pageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      title: '',
      updateId: '',
      adjusFormVisible: false,
      form: {
        areaName: '',
        orgName: '',
        fundPercent: '',
        handleMonth: '',
        settlementMonth: '',
        orgId: ''
      },
      rules: {
        areaName: [
          { required: true, message: '请输入缴纳机构', trigger: 'blur' }
        ],
        fundPercent: [
          { required: true, message: '请输入公积金个人缴纳比例', trigger: 'blur' }
        ],
        handleMonth: [
          { type: 'date', required: true, message: '请选择生效月份', trigger: 'change' }
        ],
        settlementMonth: [
          { type: 'date', required: true, message: '请选择结算月份', trigger: 'change' }
        ]
      },
      adjustmentVisible: false,
      dialogVisible: false,
      /* 公司 */
      SignVisible: false,
      SignForm: {
        orgName: '',
        signTime: ''
      },
      orgId: '',
      orgName: '',
      oldPercentId: '',
      SelectOldList: []
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
      this._getFundStandardList()
      this.pageMsg.currentPage = 1
    },
    /* 获取列表信息 */
    _getFundStandardList () {
      getFundStandardList(this.listParams).then(data => {
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
      this._getFundStandardList()
    },
    handleCurrentChange (currentPage) {
      this.pageMsg.currentPage = currentPage
      this._getFundStandardList()
    },
    /* 新增 */
    addBtn () {
      this.title = '新增'
      setTimeout(() => {
        this.$refs.deptTree.clearSelectTree()
      })
      this.adjusFormVisible = true
      this.form.orgName = ''
      this.form.areaName = ''
      this.form.fundPercent = ''
      this.form.handleMonth = ''
      this.form.settlementMonth = ''
      setTimeout(() => {
        this.$refs.deptTree.getCompany('1')
      }, 200)
    },
    addSaveBtn (formName) {
      let addParam = {
        orgId: this.orgDatas1.orgId,
        orgName: this.orgDatas1.filterName,
        areaName: this.form.areaName,
        fundPercent: this.form.fundPercent / 100,
        status: 1,
        handleMonth: monthToString(this.form.handleMonth),
        settlementMonth: monthToString(this.form.settlementMonth)
      }
      let ws = /^\d+\.?\d{0,2}$/
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!addParam.orgName) {
            this.$message.warning('缴纳单位不能为空!')
            return false
          } if (this.form.fundPercent > 100 || new RegExp(ws).test(this.form.fundPercent) === false) {
            this.$message.warning('请填写正确的公积金!')
            return false
          } if (monthToString(this.form.settlementMonth) < monthToString(this.form.handleMonth)) {
            this.$message.warning('结算月份不能小于生效月份!')
            return false
          }
          getFundAddStandard(addParam).then(data => {
            this.$message.success('新增成功!')
            setTimeout(() => {
              this._getFundStandardList()
              this.adjusFormVisible = false
            }, 500)
          })
        }
      })
    },
    /* 调整 */
    adjustBtn (row) {
      this.title = '修改'
      this.adjusFormVisible = true
      this.updateId = row.id
      this.form.areaName = row.areaName
      this.form.orgName = row.orgName
      this.form.orgId = row.orgId
      this.form.fundPercent = (row.fundPercent * 100).toFixed(2)
      this.form.handleMonth = row.handleMonth
      this.form.settlementMonth = row.settlementMonth
    },
    UpdateSaveBtn (formName) {
      this.form.handleMonth = new Date(this.form.handleMonth)
      this.form.settlementMonth = new Date(this.form.settlementMonth)
      let updateParam = {
        orgId: this.form.orgId,
        orgName: this.form.orgName,
        areaName: this.form.areaName,
        fundPercent: this.form.fundPercent / 100,
        status: 1,
        handleMonth: monthToString(this.form.handleMonth),
        settlementMonth: monthToString(this.form.settlementMonth),
        id: this.updateId,
        operator: getToken('loginName')
      }
      let ws = /^\d+\.?\d{0,2}$/
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.fundPercent > 100 || new RegExp(ws).test(this.form.fundPercent) === false) {
            this.$message.warning('请填写正确的公积金!')
            return false
          }
          if (monthToString(this.form.settlementMonth) < monthToString(this.form.handleMonth)) {
            this.$message.warning('结算月份不能小于生效月份!')
            return false
          }
          getFundUpdateStandard(updateParam).then(data => {
            this.$message.success('修改成功!')
            setTimeout(() => {
              this._getFundStandardList()
              this.adjusFormVisible = false
            }, 500)
          })
        }
      })
    },
    /* 调整记录 */
    adjustment (row) {
      this.oldPercentId = row.id
      this.adjustmentVisible = true
      let param = {
        oldPercentId: this.oldPercentId
      }
      getFundSelectOldList(param).then(data => {
        if (data.result) {
          this.SelectOldList = data.result
        }
      })
    },
    goBack () {
      history.go(-1)
    }
  },
  created () {
    this._getFundStandardList()
  }
}
</script>

<style scoped lang="less">
.el-form-item.mustForm {
  position: relative;
}
.el-form-item.mustForm:before {
  content: "*";
  color: #f56c6c;
  position: absolute;
  top: 15px;
  left: 8px;
}
.operation span{
  margin:0px 12px;
}
.adjust-info{
  margin-bottom:30px;
  p{
    margin-bottom:10px;
    font-size:14px;
  }
}
</style>
