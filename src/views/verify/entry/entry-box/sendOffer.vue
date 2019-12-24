<template>
  <div class="view">
    <el-button size="small" type="primary" @click="$router.go(-1)">返回</el-button>
    <el-button size="small" type="primary" @click="sendTemp">发送</el-button>
    <el-button type="primary" size="mini" @click="preview">预览</el-button>
    <div class="content interView2">
      <el-form label-width="120px" :model="viewData" ref="viewData" :rules="rules">
        <el-form-item label="邮件模板：" prop="temp">
          <div v-if="tempList.length > 0" class="temp tempValue">
            <el-radio :title="item.name" @change="tempVal" v-for="(item, index) in tempList" :key=index v-model="viewData.temp" :label="index">{{item.name}}</el-radio>
          </div>
          <div v-else="" class="temp tempValue">
            <span style="width: auto;padding-left: 10px">暂无邮件模板可用，请设置</span>
          </div>
        </el-form-item>
        <el-form-item label="收件人邮箱：" prop="email">
          <el-input placeholder="多个邮箱请以英文逗号隔开" v-model="viewData.email"></el-input>
        </el-form-item>
        <el-form-item label="发件人邮箱：" prop="mail">
          <!-- <el-input disabled v-model="viewData.mail"></el-input> -->
          <el-select  placeholder="请填写发件人邮箱" v-model="viewData.mail" style="width:270px;">
            <el-option
              v-for="(item, index) in mailOption"
              :key="index"
              :label="item.mail"
              :value="item.senderId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预览：">
          <div style="display: inline-block; width: 60%;" class="mail-add-form_editor mail-edittor">
            <p style="margin-bottom: 10px">主题: {{viewData.title}}</p>
            <html5-editor
              id="html5editor"
              ref="html5editor"
              :content="content"
              :fileList="fileList"
              :height="1500"
              @updateFile="files=>fileList=files"
              @updateEditor="data=>content= data"/>
            <!--<span v-if="upLoadMax" class="mail-add-editor_file" title="附件" @click="uploaderFile">附件</span>-->
            <!--<el-upload-->
            <!--class="editor-upload"-->
            <!--ref="editorUpload"-->
            <!--:auto-upload="false"-->
            <!--:limit="10"-->
            <!--:on-exceed="handleExceed"-->
            <!--:on-remove="removeFiles"-->
            <!--:on-change="changeFiles"-->
            <!--:before-upload="beforeFiles"-->
            <!--id="editorUpload"-->
            <!--action="https://jsonplaceholder.typicode.com/posts/"-->
            <!--:file-list="fileList">-->
            <!--</el-upload>-->
          </div>
        </el-form-item>
      </el-form>
      <div>
        <p v-if="AlreadyArr.length > 0" class="tempDefault">模板自带文件：</p>
        <p class="tempDefault" v-for="(name, index) in AlreadyArr" :key="index"><span>{{name.name}}</span><span @click="delAlready(index)" class="el-icon-close"></span></p>
      </div>
    </div>
    <el-dialog title="预览" :visible.sync="imgShow" width="860px">
      <img :src="htmlUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { searchJoy } from 'static/api/recruit/accept/accept'
import html2canvas from '@/utils/html2canvas'
import Html5Editor from '@/components/Html5Editor'
import { getMailTemplateListNew, getMailTemplateDetail, sendOfferNew } from 'static/api/setting/index'
export default {
  data () {
    var checkmail = (rule, value, callback) => {
      let Rxg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      let arr = []
      let num = 0
      arr = value.split(',')
      if (value === '') {
        callback(new Error('请输入邮箱地址'))
      } else {
        arr.forEach(res => {
          if (!Rxg.test(res)) {
            callback(new Error('请填写正确的邮箱'))
            num++
          } else {
            num = 0
          }
        })
        if (num === 0) {
          callback()
        }
      }
    }
    return {
      htmlUrl: '',
      imgShow: false,
      checkEmail: checkmail,
      rules: {
        temp: { required: true, message: '请选择模板', trigger: ['blur', 'change'] },
        email: [{ validator: checkmail, trigger: 'blur' },
          { required: true, message: '请输入正确的收件人邮箱', trigger: ['blur', 'change'] }],
        mail: { required: true, message: '请选择发件人邮箱', trigger: ['blur', 'change'] }
      },
      content: '',
      changeContent: '',
      fileList: [],
      AlreadyArr: [],
      // 应聘岗位查询
      applyJoy: false,
      joyList: [],
      isChoose: -1,
      prossId: '',
      value1: '',
      radio: '1',
      isRxg: '',
      orgId: this.$route.query.orgId ? this.$route.query.orgId : '',
      upLoadMax: true,
      viewPositong: false,
      tempList: [],
      tempId: '',
      fileArray: [],
      viewData: {
        name: '',
        post: '',
        firstTime: '',
        title: '',
        email: this.$route.query.email,
        temp: '',
        mail: ''
      },
      mailOption: [],
      senderListDatas: []
    }
  },
  components: {
    Html5Editor
  },
  mounted () {
    this._tempList(this.orgId)
  },
  methods: {
    // 预览
    preview () {
      html2canvas('.vue-html5-editor .content', 'view').then(image => {
        this.htmlUrl = image
        this.imgShow = true
      })
    },
    base64 (file) {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      return reader
    },
    sendTemp () {
      if (this.tempId) {
        let baseArray = []
        if (this.fileList.length > 0) {
          this.fileList.forEach(res => {
            let reader = this.base64(res.raw)
            reader.onload = function () { // onload方法放到这边确保执行完onload方法在去获取值
              baseArray.push({
                name: res.name,
                content: reader.result
              })
            }
          })
        }
        setTimeout(() => {
          this.AlreadyArr.forEach(res => {
            baseArray.push({
              name: res.name,
              content: res.content
            })
          })
          // html2canvas('.vue-html5-editor .content', 'post').then(image => {
          let params = {
            userId: this.$route.query.employeeId,
            tempId: this.tempId,
            type: 2,
            to: this.viewData.email,
            copyto: '',
            title: this.viewData.title,
            content: `<div class="content123" style="position:relative;overflow-x:hidden;min-height:640px;height: auto;margin-bottom:80px;">
              <style>
              .content123{
              width: 800px
              }
              p{
              font-size: 18px;
              margin-top: 22px;
              }
              p span:not(.title) {
              min-width:30px;
             position: relative;
              }
              .code::after{
              position:absolute;
            content: "";
            width:100%;
            height:2px;
            background-color:#01795B;
            left:0px;
            bottom: 0px;
              }
              button{
              color:#ffffff!important;
              position: relative;
              left:5%
              }
              </style>
              ${this.content}
              </div>`,
            fileData: JSON.stringify(baseArray),
            senderId: this.viewData.mail,
            pid: this.$route.query.processInstanceId,
            actId: this.$route.query.actId
          }
          this.$refs['viewData'].validate((valid) => {
            if (valid) {
              sendOfferNew(params).then(res => {
                this.$message.success('offer发送成功')
                this.$router.go(-1)
              })
            }
          })
          // })
        }, 200)
      } else {
        this.$message.warning('请选择邮件模板')
      }
    },
    delAlready (index) {
      this.AlreadyArr.splice(index, 1)
    },
    tempVal (val) {
      this.tempId = this.tempList[val].id
      this.viewData.mail = ''
      this.viewData.title = this.tempList[val].title
      getMailTemplateDetail(this.tempId).then(res => {
        this.viewData.mail = res.result.senderId
        this.mailOption = res.result.senderList
        this.content = `${res.result.content}`
        this.viewData.title = res.result.title
        if (res.result.fileData) {
          this.AlreadyArr = []
          let curArr = JSON.parse(res.result.fileData)
          curArr.forEach(res => {
            this.AlreadyArr.push({
              name: res.name,
              content: res.content
            })
          })
        }
      })
    },
    // uploaderFile () {
    //   this.$refs['editorUpload'].$el.querySelector('input').click()
    // },
    // beforeFiles (file) {
    // },
    // changeFiles (file, fileList) {
    //   this.fileArray = []
    //   this.fileArray = fileList
    // },
    // handleExceed (file, fileList) {
    //   this.$message.warning('最多只能上传10个文件')
    //   this.upLoadMax = false
    // },
    // removeFiles (file, fileList) {
    //   this.fileArray = []
    //   this.fileArray = fileList
    //   if (fileList.length <= 10) {
    //     this.upLoadMax = true
    //   }
    // },
    changeDate (value) {
      let time = new Date(value)
      let year = time.getFullYear()
      let month = (time.getMonth() < 9 ? '0' : '') + (time.getMonth() + 1)
      let day = (time.getDate() < 10 ? '0' : '') + time.getDate()
      let hour = (time.getHours() < 10 ? '0' : '') + time.getHours()
      let minute = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes()
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    },
    _tempList (orgId) {
      let params = {
        orgId: orgId,
        type: 2
      }
      getMailTemplateListNew(params).then(res => {
        if (res.result && res.result.records) {
          this.tempList = res.result.records
        }
      })
    },
    // 选择带应聘职位
    chooseJoy () {
      searchJoy({ selectFlag: '1', size: 10000 }).then(res => {
        if (res.result) {
          this.joyList = res.result
        }
      })
      this.applyJoy = true
    },
    sureApply () {
      if (this.isChoose === -1) {
        this.$message.warning('请选择要应聘的岗位')
      } else {
        let cur = ''
        let level = this.joyList[this.isChoose].levelOne || ''
        let org = this.joyList[this.isChoose].orgName || ''
        let post = this.joyList[this.isChoose].postName || ''
        if (level !== '' && org !== '' && post !== '') {
          cur = level + '-' + org + '-' + post
        } else if (level === '' && org !== '' && post !== '') {
          cur = org + '-' + post
        } else if (level !== '' && org === '' && post !== '') {
          cur = level + '-' + post
        } else if (level !== '' && org !== '' && post === '') {
          cur = level + '-' + org
        }
        this.viewData.post = cur
        this.prossId = this.joyList[this.isChoose].id
        this.applyJoy = false
        this._tempList(this.joyList[this.isChoose].orgId)
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import "~assets/less/homePage";
  .view{
    &/deep/.el-button{
      padding: 0 20px;
    }
    .interView2{
      &/deep/.el-form-item__content{
        &/deep/.el-input{
          width: 270px;
        }
      }
    }
    .must{
      color: red;
    }
    .content{
      padding: 20px;
      box-sizing: border-box;
      ul{
        li{
          margin-top: 20px;
          .temp{
            display: inline-block;
          }
          .temp:first-child{
            vertical-align: top;
          }
          .tempValue{
            width: 80%;
            &/deep/.el-radio{
              margin-bottom: 5px;
              width: 25%;
              word-wrap: break-word;
              overflow: hidden;
              text-overflow: ellipsis
            }
            &/deep/.el-radio+.el-radio{
              margin-left: 0;
            }
          }
          em{
            font-size: 16px;
          }
          &/deep/.el-date-editor{
            width: 270px;
            height: 34px;
          }
          &/deep/.el-input{
            width: 270px;
            /*height: 34px;*/
            box-sizing: border-box;
            &/deep/.el-input__inner{
              width: 270px;
              height: 34px;
            }
          }
          span {
            width: 92px;
            font-size: 14px;
            color: #4B5564;
            margin-right: 6px;
            display: inline-block;
            text-align: right;
            em{
              padding-right: 10px;
            }
          }
          .textCopy{
            border: none;
            resize: none;
            outline: none;
            font-size: 14px;
            height: 34px;
            vertical-align: middle;
            padding-top: 6px;
            box-sizing: border-box;
          }
          .copy{
            cursor: pointer;
            color: #FF7500;
            font-size: 14px;
          }
        }
      }
    }
    .mail-add-form_editor .editor-upload {
      width: 80%;
    }
    .interViewDialog{
      &/deep/.el-dialog__body{
        &/deep/.el-table{
          max-height: 500px;
          overflow-y: auto;
        }
      }
    }
  }
  .tempDefault{
    margin-bottom: 10px;
    padding-left: 110px;
    font-size: 14px;
    color: #606266;
    width: 52%;
    .el-icon-close{
      float: right;
    }
  }
  .mail-add-form_editor{
    width:100%;
    min-width:600px;
    position: relative;
    .editor-upload{
      width:200px;
    }
    .mail-add-editor_file{
      position: absolute;
      top:48px;
      left:440px;
      z-index:998;
      cursor: pointer;
      font-size:12px;
    }
  }

</style>
