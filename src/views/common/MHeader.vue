<template>
  <div class="header-box clearfix">
    <div class="header-left clearfix">
      <img :src="require('assets/img/logo.png')" width="30px" height="30px">
      <span class="title">中财人力资源管理系统</span>
      <span v-if="preIcon" class="trialTitle">{{preIcon}}</span>
    </div>
    <div class="header-right">
      <ul class="right-ul">
        <li>
        <el-dropdown @command="changeUser" style="height:36px;">
            <span class="el-dropdown-link">
              <a class="account-name" style="color:#fff;">{{roleName}}</a>
              <i class="icon-font" style="color: #fff;">&#xe649;</i>
            </span>
            <el-dropdown-menu slot="dropdown" v-if="accountList.length">
              <el-dropdown-item v-for="item in accountList" :key="item.id" :command="JSON.stringify(item)">{{item.roleName}}</el-dropdown-item>
            </el-dropdown-menu>
            <el-dropdown-menu slot="dropdown" v-else>
              <el-dropdown-item>暂无可切换角色</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
         <li>
          <el-dropdown @command="handleCommand" style="height:36px;">
            <span class="el-dropdown-link">
              <a class="account-name" style="color:#fff">{{userName}}</a>
              <i class="el-icon-arrow-down el-icon--right" style="color: #fff;"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">修改密码</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
         <li class="exit ripple" @click="logout">
          <i class="icon-font" style="margin-right: 3px;color: #fff;" aria-hidden="true">&#xe648;</i>退出
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import { getToken } from 'assets/js/util'
import { getUserLogout, delUserInfo, getUserInfo } from 'static/api/login/login'
import { changeAccount, getByRoleList } from 'static/api/common/common'
export default {
  data () {
    return {
      preIcon: '',
      accountName: '',
      userName: '',
      accountList: [],
      roleName: ''
    }
  },
  computed: {
    ...mapGetters({
      'isLogin': 'getIsLogin'
    }),
    loginFlag () {
      return this.isLogin ? this.isLogin : getToken('isLogin')
    }
  },
  methods: {
    ...mapMutations({
      setUserToken: 'USER_TOKEN',
      setUserLogin: 'USER_LOGIN'
    }),
    handleCommand (command) {
      this.$emit('handleCommand', command)
    },
    _judgeLogin () {
      if (this.loginFlag) {
        this.accountName = getToken('loginAccount')
        this.userName = getToken('loginName')
        this.roleName = getToken('roleName')
      } else {
        this.loginOut()
      }
    },
    changeUser (account) {
      if (account) {
        let accountArr = JSON.parse(account)
        let changeParams = {
          roleId: accountArr.id
        }
        changeAccount(changeParams).then(res => {
          if (res.result) {
            this.setUserToken(res.result.sessionId)
            this.setUserLogin(true)
            getUserInfo(res)
            this.$message.success('切换成功')
            this.$router.push('/homepage')
            setTimeout(() => {
              window.location.reload()
            }, 400)
          }
        })
      } else {
        console.log('无可切换账号')
      }
    },
    _getAccountList () {
      let accountId = Number(getToken('accountId'))
      getByRoleList(accountId).then(data => {
        if (data.result && data.result.length) {
          data.result.forEach(item => {
            if (item.isUsed === 1) {
              this.roleName = item.roleName
            } else {
              this.accountList.push(item)
            }
          })
        }
      })
    },
    logout () {
      getUserLogout().then(data => {
        this.$store.dispatch('userLoginOut')
        delUserInfo()
        this.$router.replace('/login')
        this.$message.success('退出成功')
      })
    },
    // 获取当前登录用户的审批权限
    _getCurrentRoles () {
      this.$store.dispatch('getCurrentUserRoleGroup')
    },
    _getIcon () {
      this.preIcon = window.location.host === 'hr.zcabc.com' || window.location.host.indexOf('localhost') > -1 ? '开发版' : window.location.host === 'test.hr.zcabc.com' ? '测试版' : window.location.host === 'hr-pre.zhongcaicloud.com' ? '预发布' : ''
    }
  },
  created () {
    this._judgeLogin()
    this._getIcon()
    this._getAccountList()
    this._getCurrentRoles()
  }
}
</script>
<style lang="less" scoped>
.header-box{
  .header-left{
    float: left;
    img{
       vertical-align: middle;
    }
    span{
      &.title{
        margin-left:10px;
        font-size: 16px;
        color: #fff;
        //line-height: 80px;
        vertical-align: middle;
      }
    }
  }
  .trialTitle{
    font-size: 12px;
    color: #fff;
    padding: 2px 6px;
    background: #FF7500;
    border-radius: 4px;
    vertical-align: middle;
    margin-left: 8px;
  }
  .header-right{
    float:right;
    .right-ul{
      li{
        float:left;
        color:#fff;
        font-size:14px;
        cursor: pointer;
        &:not(:nth-of-type(1)){
          margin-left:30px;
        }
      }
    }
  }
}
</style>
