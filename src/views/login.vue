<template>
<div class="login-wrap">
    <div class="ms-login">
      <img v-if="preIcon && preIcon==='开发版'" class="logTrial" :src="require('assets/img/hr-dev.png')"/>
      <img v-if="preIcon &&  preIcon==='测试版'" class="logTrial" :src="require('assets/img/hr-test.png')"/>
      <img v-if="preIcon && preIcon==='预发布'" class="logTrial" :src="require('assets/img/hr-redev.png')"/>
      <div class="ms-logo clearfix"><img :src="require('assets/img/login-logo.png')" />
      </div>
       <!--<el-form label-width="0px" class="demo-ruleForm loginFrom" :model="user" :rules="rules" ref="user">-->
       <el-form label-width="0px" class="demo-ruleForm loginFrom" :model="user" ref="user">
         <el-form-item prop="account" class="mt-40">
            <el-input @change="changeUtf" v-model="user.account" placeholder="账号" ></el-input>
         </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="user.password" placeholder="密码" @keyup.enter.native="login('user')"></el-input>
        </el-form-item>
         <!--这是图片验证码的Html片段-->
         <!--<img-check-code @changeCheckStatus="receiveCheckStatus"></img-check-code>-->
        <div class="login-btn">
          <el-button @click="login('user')">登录</el-button>
        </div>
        <div class="forgetPassword"><span @click="findPass">找回密码</span></div>
      </el-form>
    </div>
  <div class="foot">©2019&nbsp;&nbsp;中财集团 • 互联网金融处&nbsp;&nbsp;<span @click="jumpLink" class="jumpLink">浙ICP备11029880号-2</span></div>
</div>
</template>
<script>
import { md5Encrypt } from 'assets/js/util'
import checkWebp from 'assets/js/checkWebp'
// import imgCheckCode from '../components/ImgCheckCode/imgCheckCode'
export default {
  name: 'Login',
  components: {
    // imgCheckCode
  },
  data () {
    return {
      rules: {
        account: [
          { required: true, message: '请输入用户名' }
        ],
        password: [
          { required: true, message: '请输入密码' }
        ]
      },
      user: {
        account: '',
        password: ''
      },
      preIcon: '',
      checkStatus: true // 图片验证码是否验证通过 (为了登陆流程顺利进行，注释掉验证码组件这里改成了true， 放开验证码组件时要改为false)
    }
  },
  mounted () {
    checkWebp(document.getElementsByClassName('login-wrap')[0])
    this._getIcon()
  },
  methods: {
    jumpLink () {
      window.open('http://www.beian.miit.gov.cn/', '_blank')
    },
    _getIcon () {
      this.preIcon = window.location.host === 'hr.zcabc.com' || window.location.host.indexOf('localhost') > -1 ? '开发版' : window.location.host === 'test.hr.zcabc.com' ? '测试版' : window.location.host === 'hr-pre.zhongcaicloud.com' ? '预发布' : ''
    },
    changeUtf (val) {
      this.user.account = val
    },
    // 父组件接收子组件校验是否通过的方法
    receiveCheckStatus (status) {
      if (status) {
        // 验证通过时，checkStatus为true
        this.checkStatus = true
      } else {
        this.checkStatus = false
      }
    },
    login (formName) {
      if (this.checkStatus) {
        console.log('sssss', this.user.account, this.user.account.length)
        if (this.user.account.trim()) {
          if (this.user.password) {
            let loginParams = {
              account: this.user.account,
              password: md5Encrypt(this.user.password)
            }
            this.$store.dispatch('userLogin', loginParams).then(res => {
              if (res.subCode === 400) {
                this.$bus.$emit('loginStatus', false)
              } else {
                this.$bus.$emit('loginStatus', true)
                this.$router.replace('/firstPage')
              }
              /* if (res.meta && res.meta.code === 200) {
                this.$router.replace('/homepage')
              } else {
                this.$message.error({
                  message: res.data.meta.msg
                })
              } */
            })
          } else {
            this.$message.error('请输入密码')
          }
        } else {
          this.$message.error('请输入用户名')
        }
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //   }
        // })
      } else {
        this.$message.error('请先完成滑块验证！')
      }
    },
    findPass () {
      this.$msgbox('请联系公司人事重置密码或联系集团总部0571-87112057', '找回密码')
    }
  }
}
</script>

<style scoped lang="less">
.login-wrap {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: url("~assets/img/login-bg.jpg") no-repeat center;
  background-size: 100% 100%;
  &.webps{
    background: url("~assets/webp/login-bg.jpg.webp") no-repeat center;
  }
}

.ms-logo {
  margin-bottom: 50px;
  text-align: center;
  img {
    width: 240px;
    height: 40px;
    display: inline-block;
  }
}
.foot {
  position: fixed;
  bottom: 0;
  margin: 0 auto;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  z-index: 10;
  line-height: 50px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  .jumpLink:hover {
    color: #cecece;
    cursor: pointer;
  }
}
.ms-login {
  width: 310px;
  height: 460px;
  background: #fff;
  padding:78px 65px 0 65px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -220px;
  margin-top: -280px;
  .logTrial{
    position: absolute;
    transform: scale(0.25);
    right: -113px;
    top: -113px;
  }
}

.login-btn {
  text-align: center;
  margin-top: 50px;
}

.login-btn button {
  width: 310px;
  height: 50px;
  line-height: 26px;
  background: #FF7500;
  border: none;
  outline: none;
  color: #fff;
  font-size: 16px;
  border-radius: 3px;
}

.login-btn button:hover {
  background: #EA6100;
}

.el-form-item {
  margin-bottom:20px;
}

.forgetPassword {
  font-size: 14px;
  color: #6E7382;
  padding-top: 30px;
  text-align: right;
}
.forgetPassword span{
  cursor: pointer;
}

.copyType {
  display: block;
  width: 100%;
  color: #fff;
  position: absolute;
  bottom: 20px;
  text-align: center;
  font-size: 14px;
}
</style>
