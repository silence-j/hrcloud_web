<template>
<div class="container">
  <el-row>
    <el-col :span="3">
      <el-button type="primary" size="small" @click="addRole" v-show="(permission.indexOf('新增'))!==-1" >新增角色</el-button>
    </el-col>
  </el-row>
  <el-row class="mt-20">
    <el-col :span="24">
      <el-table
        :data="roleListData"
        border>
        <el-table-column
          type="index"
          label="序号"
          width="60">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="角色描述">
        </el-table-column>
        <el-table-column
          label="是否启用">
          <template slot-scope="scope">
            <span v-if="scope.row.enable=='1'">启用</span>
            <span v-else-if="scope.row.enable=='2'">未启用</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createByName"
          label="创建人">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="200px">
          <template slot-scope="scope">
            <div class="operation">
              <span @click="editRole(scope.row)" v-show="(permission.indexOf('编辑'))!==-1" >编辑</span>
              <span @click="getRoleLogs(scope.row)" v-show="(permission.indexOf('修改记录'))!==-1">修改记录</span>
             <!-- <span @click="deleteRole(scope.row)" v-show="(permission.indexOf('删除'))!==-1">删除</span>-->
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
  <el-dialog
    title="修改记录"
    :visible.sync="logVisible"
    v-draggable
    width="700px"
    class="scroll-infor">
    <div class="logs-wrap clearfix">
      <div class="log-content" v-if="roleLogList.length">
        <dl v-for="(log,index) in roleLogList" :key="index">
          <dt>修改时间:{{log.updateTime}} 修改人:{{log.updateName}}</dt>
          <dt>修改内容:</dt>
          <dd v-if="log.nameBefore!== log.nameAfter">角色名称修改:由<span class="name-before">{{log.nameBefore}}</span>改为<span class="name-after">{{log.nameAfter}}</span></dd>
          <dd v-else>角色名称修改:无修改</dd>
          <dd v-if="log.contentBefore!== log.contentAfter">角色说明修改:由<span class="name-before">{{log.contentBefore}}</span>改为<span class="name-after">{{log.contentAfter}}</span></dd>
          <dd v-else>角色说明修改:无修改</dd>
          <dd v-if="log.enableBefore!== log.enableAfter">是否可用修改:由<span class="name-before">{{log.enableBefore | filterStatus}}</span>改为<span class="name-after">{{log.enableAfter | filterStatus}}</span></dd>
          <dd v-else>是否可用修改:无修改</dd>
          <dd>新增权限:</dd>
          <dd v-html="log.addPermission"></dd>
          <!--<dd>新增权限: {{log.addPermission}}</dd>-->
          <dd>删除权限:</dd>
          <dd v-html="log.delPermission"></dd>
        </dl>
      </div>
      <div class="log-content" v-else>
        无修改记录
      </div>
    </div>
    <span slot="footer"></span>
  </el-dialog>
</div>
</template>
<script>
import { getRoleList, delRole, getRoleLogs } from 'static/api/setting/index'
import Pagination from 'components/Pagination.vue'
import { getExmine } from 'assets/js/exmine'
export default {
  data () {
    return {
      roleListData: [],
      roleLogList: [],
      logVisible: false,
      pageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      }
    }
  },
  components: {
    Pagination
  },
  methods: {
    addRole () {
      this.$router.push('/setting/role/add')
    },
    editRole (row) {
      let urlParmas = {
        roleId: row.id ? escape(row.id.toString()) : escape('roleIdNull'),
        roleName: row.roleName ? escape(row.roleName) : escape('roleNameNull'),
        remark: row.remark ? escape(row.remark) : escape('remarkNull'),
        enable: escape(row.enable)
      }
      // if (row.id) {
      //   urlParmas.roleId = row.id.toString()
      // }
      // if (row.roleName) {
      //   urlParmas.roleName = row.roleName
      // }
      // if (row.remark) {
      //   urlParmas.remark = row.remark
      // }
      // let enCodeUrl = this.encodeUrl(urlParmas)
      // let enCodeUrl = this.encodeUrl('roleId=' + row.id.toString() + '&roleName=' + row.roleName + '&remark=' + row.remark + '&enable=' + row.enable)
      this.$router.push({ path: '/setting/role/edit', query: urlParmas })
    },
    deleteRole (row) {
      this.$confirm('确定要删除角色' + row.roleName + '吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delRole(Number(row.id)).then(data => {
          this.$message.success('删除成功')
          this._getRoleList()
        })
      }).catch(() => {})
    },
    _getRoleList () {
      getRoleList(this.roleListParams).then(roleList => {
        if (roleList.result) {
          this.roleListData = roleList.result.records
          this.pageMsg.total = roleList.result.total
        }
      })
    },
    handleSizeChange (pageSize) {
      this.pageMsg.pageSize = pageSize
      this._getRoleList()
    },
    handleCurrentChange (currentPage) {
      this.pageMsg.currentPage = currentPage
      this._getRoleList()
    },
    getRoleLogs (row) {
      this.logVisible = true
      getRoleLogs(Number(row.id)).then(data => {
        if (data.result) {
          this.roleLogList = data.result
        }
      })
    }
  },
  filters: {
    filterStatus (value) {
      if (value === '1') {
        value = '启用'
      } else if (value === '0') {
        value = '未启用'
      }
      return value
    }
  },
  computed: {
    roleListParams () {
      return {
        page: this.pageMsg.currentPage,
        size: this.pageMsg.pageSize
      }
    },
    permission () {
      return getExmine().sysRole
    }
  },
  created () {
    this._getRoleList()
  }
}
</script>
<style lang="less">
  .logs-wrap {
    width:100%;
    height:500px;
    overflow-y:auto;
    .log-content {
      padding-left:40px;
      position: relative;
      &:before{
        content: '';
        width:2px;
        height:100%;
        background:#999;
        position: absolute;
        top:0px;
        left:10px;
      }
      dl{
        position: relative;
        &:before{
          content: '';
          width:15px;
          height:15px;
          border-radius:20px;
          background:#999;
          position: absolute;
          top:0px;
          left:-36px;
          z-index:400;
        }
        dt{
          font-size:14px;
          font-weight:bold;
          margin-top:10px;
        }
        dd{
          margin-top:10px;
          line-height:24px;
          .name-before{
            color:red;
          }
          .name-after{
            color: #009688;
          }
        }
      }
    }
  }
</style>
