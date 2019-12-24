<template>
  <div class="wage-box">
  <div class="search-form_box clearfix">
    <div class="search-form_item" style="min-width: 200px">
      <el-input v-model="wageForm.keyword" placeholder="公司搜索" @keyup.enter.native="_getComSalaryList"></el-input>
    </div>
    <div class="search-form_button pt-3">
      <el-button type="primary" size="mini" @click="searchMsg">查询</el-button>
    </div>
  </div>
  <div class="table-box mt-20">
     <el-table
      :data="salaryListDatas"
      border>
        <el-table-column
          type="index"
          label="序号"
          width="60">
        </el-table-column>
        <el-table-column
          prop="companyName"
          label="公司名称">
        </el-table-column>
        <el-table-column
          label="结构类型组成">
        <template slot-scope="scope">
          <div class="salary-box" :title="readSalaryTypes(scope.row.salarySysNames, scope.row.otherTypeNames)">
            {{readSalaryTypes(scope.row.salarySysNames, scope.row.otherTypeNames)}}
          </div>
        </template>
        </el-table-column>
        <el-table-column
          label="操作人"
          prop="creator">
        </el-table-column>
        <el-table-column
          label="操作时间"
          prop="updateTime">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100px"
          fixed="right">
          <template slot-scope="scope">
            <div class="operation">
              <span @click="updateCurrentSalary(scope.row)" v-show="permission.indexOf('管理')!=-1">编辑</span>
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
  <el-dialog
    title="编辑"
    :visible.sync="dialogSalary"
    width="500px"
    >
    <div class="dialog-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">工资类型</el-checkbox>
        </div>
         <el-checkbox-group v-model="checkedSalaryIds" @change="handleCheckedSalaryIdsChange">
        <dl class="check-dl_box clearfix">
          <dd
          v-for="salary in salarySysIds"
          :label="salary.value"
          :key="salary.value"
          >
            <el-checkbox :label="salary.value" :disabled="allEnableIds.indexOf(salary.value)!==-1">
            {{salary.label}}<span style="color:red" v-if="allEnableIds.indexOf(salary.value)!==-1">(已禁用)</span>
            </el-checkbox>
          </dd>
        </dl>
         </el-checkbox-group>
      </el-card>
      <el-card class="box-card mt-15">
        <div slot="header" class="clearfix">
          <el-checkbox :indeterminate="isIndeterminateOther" v-model="checkOtherAll" @change="handleCheckAllOtherChange">其他构成</el-checkbox>
        </div>
        <el-checkbox-group v-model="checkedOtherSalaryIds" @change="handleCheckedSalaryIdsOtherChange">
        <dl class="check-dl_box clearfix">
          <dd
          v-for="salary in salarySysOtherIds"
          :key="salary.value"
          >
            <el-checkbox :label="salary.value" :disabled="allEnableIds.indexOf(salary.value)!==-1">
            {{salary.label}}<span style="color:red" v-if="allEnableIds.indexOf(salary.value)!==-1">(已禁用)</span>
            </el-checkbox>
          </dd>
        </dl>
      </el-checkbox-group>
      </el-card>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogSalary = false" size="mini">取 消</el-button>
      <el-button type="primary" @click="saveCurrentComSType" size="mini">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>
<script>
import { getCompanySalaryList, saveCurrentComSalaryType, getSalarySettingList } from 'static/api/setting/index'
import Pagination from 'components/Pagination'
import { getExmine } from 'assets/js/exmine'
export default {
  data () {
    return {
      checkAll: false,
      checkOtherAll: false,
      checkedSalaryIds: [],
      checkedOtherSalaryIds: [],
      salarySysIds: [],
      salarySysOtherIds: [],
      matchNumberSysIds: [],
      isIndeterminate: true,
      isIndeterminateOther: true,
      dialogSalary: false,
      wageForm: {
        keyword: ''
      },
      pageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      allEnableIds: [],
      salaryListDatas: [],
      salaryOrgId: ''
    }
  },
  computed: {
    permission () {
      return getExmine().sysWage
    },
    comSalaryParams () {
      return {
        page: this.pageMsg.currentPage,
        size: this.pageMsg.pageSize,
        keyword: this.wageForm.keyword,
        companyId: this.$route.query.id
      }
    }
  },
  components: {
    Pagination
  },
  methods: {
    searchMsg () {
      this.$router.push('/setting/wage')
      this.handleCurrentChange(1)
    },
    handleCheckAllChange (val) {
      this.checkedSalaryIds = val ? this.matchNumberSysIds.filter(x => this.allEnableIds.indexOf(x) === -1) : []
      this.isIndeterminate = false
    },
    handleCheckedSalaryIdsChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.salarySysIds.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.salarySysIds.length
    },
    handleCheckAllOtherChange (val) {
      this.checkedOtherSalaryIds = val ? this.matchOtherNumberSysIds.filter(x => this.allEnableIds.indexOf(x) === -1) : []
      this.isIndeterminateOther = false
    },
    handleCheckedSalaryIdsOtherChange (value) {
      let checkedCount = value.length
      this.checkOtherAll = checkedCount === this.salarySysOtherIds.length
      this.isIndeterminateOther = checkedCount > 0 && checkedCount < this.salarySysOtherIds.length
    },
    handleSizeChange (pageSize) {
      this.pageMsg.pageSize = pageSize
      this._getComSalaryList()
    },
    handleCurrentChange (currentPage) {
      this.pageMsg.currentPage = currentPage
      this._getComSalaryList()
    },
    updateCurrentSalary (row) {
      this.salaryOrgId = row.companyId
      this.dialogSalary = true
      if (row.salarySysIds) {
        this.checkedSalaryIds = row.salarySysIds.split(',').filter(x => this.allEnableIds.indexOf(x) === -1)
      } else {
        this.checkedSalaryIds = []
      }
      if (row.otherTypes) {
        this.checkedOtherSalaryIds = row.otherTypes.split(',').filter(x => this.allEnableIds.indexOf(x) === -1)
      } else {
        this.checkedOtherSalaryIds = []
      }
      this.handleCheckedSalaryIdsChange(this.checkedSalaryIds)
      this.handleCheckedSalaryIdsOtherChange(this.checkedOtherSalaryIds)
    },
    // 保存薪资结构
    saveCurrentComSType () {
      let salaryStypeparams = {
        companyId: this.salaryOrgId,
        salarySysIds: this.checkedSalaryIds.join(','),
        otherTypes: this.checkedOtherSalaryIds.join(',')
      }
      saveCurrentComSalaryType(salaryStypeparams).then(data => {
        this.$message.success('编辑成功')
        setTimeout(() => {
          this.dialogSalary = false
          this._getComSalaryList()
        }, 200)
      })
    },
    // 薪资结构类型判断
    readSalaryTypes (salary1, salary2) {
      let salary3 = salary1 ? salary1.trim() : ''
      let salary4 = salary2 ? salary2.trim() : ''
      if (salary3 && salary4) {
        return salary1 + ',' + salary2
      } else {
        if (salary3 && !salary4) {
          return salary1
        }
        if (!salary3 && salary4) {
          return salary2
        }
        if (!salary3 && !salary4) {
          return '暂无薪资类型'
        }
      }
    },
    _getComSalaryList () {
      getCompanySalaryList(this.comSalaryParams).then(data => {
        if (data.result) {
          this.salaryListDatas = data.result.records
          this.pageMsg.total = data.result.total
        }
      })
    },
    // 获取所有的工资类型和其它构成
    _getAllSalaryStructure () {
      let typeParams = {
        types: ['3', '4']
      }
      getSalarySettingList(typeParams).then(data => {
        this.allEnableIds = []
        this.salarySysIds = []
        this.salarySysOtherIds = []
        this.matchNumberSysIds = []
        this.matchOtherNumberSysIds = []
        if (data.result && data.result.length) {
          // salarySysOtherIds matchNumberSysIds
          data.result.forEach(item => {
            item.id = item.id + ''
            if (item.enable === '0' || item.enable === 0) {
              this.allEnableIds.push(item.id + '')
            }
            if (item.type === '3' || item.type === 3) {
              this.matchOtherNumberSysIds.push(item.id.toString())
              this.salarySysOtherIds.push({
                label: item.name,
                value: item.id
              })
            }
            if (item.type === '4' || item.type === 4) {
              this.matchNumberSysIds.push(item.id.toString())
              this.salarySysIds.push({
                label: item.name,
                value: item.id
              })
            }
          })
        }
      })
    }
  },
  created () {
    this._getComSalaryList()
    this._getAllSalaryStructure()
  }
}
</script>

<style lang="less" scoped>
.salary-box{
  width:100%;
  overflow: hidden;
  text-overflow:ellipsis;
  /*white-space: nowrap*/
}
.check-dl_box{
  dd{
    float:left;
    margin: 10px 10px 0px 0px;
    &.no-mt{
      margin-top:0px;
    }
  }
}
&/deep/.el-card__body{
  padding-top:10px;
}
</style>
