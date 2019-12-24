<template>
<div class="home-box">
  <!--<div v-if="borwseInt()" style="position: fixed;-->
    <!--font-size: 13px;-->
    <!--left: 40%;-->
    <!--width: 210px;-->
    <!--top: 10px;">-->
    <!--<el-alert-->
      <!--title="为了更好的用户体验"-->
      <!--@close="closeUser"-->
      <!--type="warning">-->
    <!--</el-alert>-->
  <!--</div>-->
     <el-container>
  <el-header>
    <m-header  @handleCommand="handleCommand"/>
  </el-header>
  <el-container>
    <el-aside style="width:auto; height:100%;">
      <m-left/>
    </el-aside>
    <el-container style="width: 100%;">
      <el-main style="height:100%;overflow:hidden;" class="scroll-box">
        <el-scrollbar style="height:100%">
        <div class="main-content">
        <bread-crumb :data="breadcrumbDatas"/>
        <div class="mt-20">
          <router-view/>
        </div>
        </div>
        </el-scrollbar>
      </el-main>
      <el-footer>
        <m-footer/>
      </el-footer>
    </el-container>
  </el-container>
</el-container>
<loading/>
   <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
     width="500px">
      <el-form :model="passForm"  :rules="passRules" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="原密码:" prop="oldPassword" >
              <el-input type="password" style="position: fixed;bottom: -99999px;" v-model="passForm.oldPassword" ></el-input>
              <el-input type="password" v-model="passForm.oldPassword"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item  label="新密码:" prop="password" >
              <el-input type="password" v-model="passForm.password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="重复新密码:" prop="againPassWord">
              <el-input type='password' v-model="passForm.againPassWord"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="sureUpdatePassWord" size="mini">确 定</el-button>
  </span>
    </el-dialog>
    <loading/>
</div>
  <!-- <div style="position:relative;min-height:100%">
   <m-header/>
    <div class="container-row" id="container">
      <router-view></router-view>
    </div>
    <m-footer/>
  </div> -->
</template>
<script>
import { getToken, setToken, md5Encrypt } from 'assets/js/util'
import MHeader from './common/MHeader'
import MFooter from './common/MFooter'
import MLeft from './common/MLeft'
import Loading from '@/components/Loading'
import BreadCrumb from '@/components/BreadCrumb'
import { updatePassword } from 'static/api/common/common'
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      dialogVisible: false,
      passForm: {
        oldPassword: '',
        password: '',
        againPassWord: ''
      },
      passRules: {
        oldPassword: [
          { required: true, message: '原始密码不能为空' }
        ],
        password: [
          {
            required: true,
            message: '新密码不能为空'
          },
          {
            pattern: /^[0-9a-zA_Z]+$/,
            message: '密码只能是数字和字母'
          }
        ],
        againPassWord: [
          {
            required: true,
            message: '请重复密码'
          }
        ]
      }
    }
  },
  components: {
    MHeader,
    MFooter,
    MLeft,
    BreadCrumb,
    Loading
  },
  computed: {
    ...mapGetters({ breadcrumbDatas: 'getBreadcrumbDatas' }),
    // breadcrumbData () {
    //   let array = []
    //   this.$route.matched.forEach((router, index) => {
    //     array.push({
    //       name: router.meta.title,
    //       path: router.path
    //     })
    //   })
    //   return array
    // }
    ugent () {
      return navigator.userAgent.toLowerCase()
    }
  },
  created () {
    // if (getToken('closeUser' !== 'close')) {
    //   setToken('userExperience', 'have')
    // }
    // this.borwseInt()
  },
  // watch: {
  //   ugent () {
  //     alert('55')
  //     setToken('userExperience', 'have')
  //     this.borwseInt()
  //   }
  // },
  methods: {
    borwseInt () {
      // var UserAgent = navigator.userAgent.toLowerCase()
      let UserAgent = this.ugent
      console.log('UserAgent:', UserAgent, getToken('userExperience'))
      console.log(!(UserAgent.indexOf('chrome') > -1 && UserAgent.indexOf('safari') > -1) &&
        (getToken('userExperience') && getToken('userExperience') === 'have'))
      return (!(UserAgent.indexOf('chrome') > -1 && UserAgent.indexOf('safari') > -1)) &&
        (getToken('userExperience') && getToken('userExperience') === 'have')
    },
    closeUser () {
      setToken('userExperience', 'close')
    },
    handleCommand (command) {
      this.dialogVisible = true
    },
    sureUpdatePassWord () {
      let passParams = {
        id: getToken('accountId'),
        oldPassword: md5Encrypt(this.passForm.oldPassword),
        password: md5Encrypt(this.passForm.password)
      }
      if (!this.passForm.oldPassword) {
        this.$message.warning('原密码不能为空')
        return
      }
      if (!this.passForm.password) {
        this.$message.warning('新密码不能为空')
        return
      }
      if (this.passForm.password !== this.passForm.againPassWord) {
        this.$message.warning('两次输入的密码不一致')
        this.passForm.againPassWord = ''
        return
      }
      updatePassword(passParams).then(data => {
        this.$message.success('修改密码成功,请重新登录')
        setTimeout(() => {
          this.$router.replace('/login')
        }, 800)
      })
    }
  }
}
</script>
<style scoped lang="less">
  .home-box{
    height:100%;
    width:100%;
    overflow: hidden;
    /deep/ .el-container{
      height:100%;
    .el-main {
      background-color: #fff;
      color: #333;
      padding:0px;
      margin:15px 0px 0px 15px;
      height:100%;
      .main-content{
        padding:20px;
        height:100%;
        box-sizing: border-box;
        background-color:#fff;
      }
     }
     .el-header{
       width:100%;
       height:60px;
       line-height:60px;
       background-color:#263946;
     }
    }
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    height: 100%;
    position: relative;
    z-index:100;
  }
</style>
