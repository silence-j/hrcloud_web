<template>
  <div class="container">
    <el-row>
      <el-col :span="3">
        <el-button type="primary" size="small" @click="addAccount" v-show="(permission.indexOf('新增'))!==-1">新增账号</el-button>
      </el-col>
    </el-row>
    <div class="search-form_box clearfix mt-20">
      <div class="search-form_item">
        <el-input v-model="accountForm.keyword" placeholder="请输入关键字" @keyup.enter.native="searchAccount"></el-input>
      </div>
      <div class="search-form_item">
        <el-select
          clearable
          placeholder="请选择状态"
          v-model="accountForm.status">
          <el-option
            v-for="item in statusSelect"
            :key="item.index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="search-form_button pt-3">
        <el-button size="small" type="primary" @click="searchAccount">查询</el-button>
      </div>
    </div>
    <el-row class="mt-20">
      <el-col :span="24">
        <el-table
          :data="accountDatas"
          border>
          <el-table-column
            type="index"
            label="序号"
            width="60">
          </el-table-column>
          <el-table-column
            prop="name"
            label="员工姓名"
            width="160px">
          </el-table-column>
          <el-table-column
            prop="account"
            label="登录账号"
            width="200px">
          </el-table-column>
          <el-table-column
            label="所属角色"
            width="150px">
            <template slot-scope="scope">
              <span>{{scope.row.roleName | filterRoleName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="账号状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == '1'">正常</span>
              <span v-else-if="scope.row.status == '2'">失效</span>
              <span v-else-if="scope.row.status == '0'">禁用</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="creator"
            label="创建人"
            width="200px">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="200px">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="140px">
            <template slot-scope="scope">
              <div class="operation">
                <span @click="editAccount(scope.row)" v-show="(permission.indexOf('编辑'))!==-1&&scope.row.status != '2'">编辑</span>
                <span @click="stopAccount(scope.row)" v-show="(permission.indexOf('禁用'))!==-1&&scope.row.status !='0'&&scope.row.status != '2'">禁用</span>
                <!--<span @click="deleteAccount(scope.row)" v-show="(permission.indexOf('删除'))!==-1">删除</span>-->
                <span @click="runAccount(scope.row)" v-show="(permission.indexOf('启用'))!==-1&&scope.row.status =='0'&&scope.row.status != '2'">启用</span>
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
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getRoleList, getAccountList, forbiddenAccount, delAccount } from 'static/api/setting/index'
import Pagination from 'components/Pagination.vue'
import { getExmine } from 'assets/js/exmine'
import { getToken } from 'assets/js/util'
import { delUserInfo } from 'static/api/login/login'
export default {
  data () {
    return {
      accountForm: {
        keyword: '',
        roleId: '',
        status: ''
      },
      pageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      statusSelect: [
        { label: '正常', value: 1 },
        { label: '失效', value: 2 },
        { label: '禁用', value: 0 }
      ],
      roleOptions: [],
      accountDatas: []
    }
  },
  components: {
    Pagination
  },
  computed: {
    accountParams () {
      return {
        keyword: this.accountForm.keyword,
        roleId: this.accountForm.roleId,
        page: this.pageMsg.currentPage,
        size: this.pageMsg.pageSize,
        status: this.accountForm.status
      }
    },
    permission () {
      return getExmine().sysAccount
    }
  },
  methods: {
    addAccount () {
      this.$router.push({ name: 'AccountAdd' })
    },
    editAccount (row) {
      this.$router.push({
        name: 'AccountEdit',
        params: {
          id: row.id ? row.id : 'null',
          userId: row.userId ? row.userId : 'null',
          roleName: row.name ? row.name : 'null',
          status: row.status ? row.status : 'null',
          account: row.account ? row.account : 'null',
          remark: row.remark ? row.remark : 'null'
        }

      })
    },
    stopAccount (row) {
      this.$confirm('禁用后' + row.account + '将无法使用', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let stopParams = {
          accountId: Number(row.id),
          status: 0
        }
        forbiddenAccount(stopParams).then(data => {
          this.$message.success('成功')
          setTimeout(() => {
            this._getAccountList()
          }, 400)
        })
      }).catch(() => {})
    },
    deleteAccount (row) {
      this.$confirm('确定删除' + row.account + '吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delAccount(Number(row.id)).then(data => {
          this.$message.success('成功')
          if (Number(row.userId) === getToken('loginId')) {
            delUserInfo()
            setTimeout(() => {
              this.$router.replace('/login')
            }, 200)
          } else {
            setTimeout(() => {
              this._getAccountList()
            }, 400)
          }
        })
      }).catch(() => {})
    },
    runAccount (row) {
      this.$confirm('确认要重新启用' + row.account + '吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let runParams = {
          accountId: Number(row.id),
          status: 1
        }
        forbiddenAccount(runParams).then(data => {
          this.$message.success('成功')
          setTimeout(() => {
            this._getAccountList()
          }, 400)
        })
      }).catch(() => {})
    },
    searchAccount () {
      this.handleCurrentChange(1)
    },
    _getRoleList () {
      this.roleOptions = []
      getRoleList().then(data => {
        if (data.result && data.result.length) {
          data.result.forEach((role) => {
            this.roleOptions.push({
              value: role.id,
              label: role.roleName
            })
          })
        }
      })
    },
    _getAccountList () {
      getAccountList(this.accountParams).then(data => {
        if (data.result) {
          this.accountDatas = data.result.records
          this.pageMsg.total = data.result.total
        }
      })
    },
    handleSizeChange (pageSize) {
      this.pageMsg.pageSize = pageSize
      this._getAccountList()
    },
    handleCurrentChange (currentPage) {
      this.pageMsg.currentPage = currentPage
      this._getAccountList()
    }
  },
  filters: {
    filterRoleName (value) { // 去掉字符串最后一个—
      let valueLength = value.lastIndexOf('|')
      value = value.slice(0, valueLength)
      return value
    }
  },
  created () {
    this._getRoleList()
    this._getAccountList()
  }
}
</script>
<style lang="less">
</style>
