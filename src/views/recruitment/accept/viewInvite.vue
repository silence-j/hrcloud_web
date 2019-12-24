<template>
  <div class="view">
    <el-row>
      <el-button type="primary" size="mini" @click="goBack">返 回</el-button>
      <el-button type="primary" size="mini" :loading="$store.state.btnLoading" @click="sendTemp">发 送</el-button>
      <el-button type="primary" size="mini" @click="preView">预览</el-button>
    </el-row>
    <div class="content mt-20">
      <p class="title-name">面试邀请</p>
      <div class="interView2">
        <el-form label-width="120px" ref="viewData" :model="viewData" :rules="rules">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="viewData.name" placeholder="请填写姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="tel">
            <el-input v-model="viewData.tel" placeholder="请填写手机号"></el-input>
          </el-form-item>
          <el-form-item label="面试岗位：" prop="post">
            <el-input readonly v-model="viewData.post" @focus="chooseJoy" placeholder="请填写面试岗位"></el-input>
          </el-form-item>
          <el-form-item label="初试时间：" prop="firstTime">
            <el-date-picker
              style="width: 270px!important;"
              v-model="viewData.firstTime"
              type="datetime"
              placeholder="请选择初试时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="收件人邮箱：" prop="email">
            <el-input placeholder="多个邮箱请以英文逗号隔开" v-model="viewData.email"></el-input>
          </el-form-item>
          <el-form-item label="邮件模板：">
            <div v-if="tempList.length > 0" class="temp tempValue">
              <el-radio
                v-for="(item, index) in tempList"
                :title="item.name"
                :key=index
                :label="index"
                @change="tempVal"
                v-model="viewData.temp" >
                {{item.name}}
              </el-radio>
            </div>
            <div v-else="" class="temp tempValue">
              <span style="width: auto;padding-left: 10px">暂无邮件模板可用，请<span style="width: auto;" v-html="!isTitle ? '设置' : '选择岗位'"></span></span>
            </div>
          </el-form-item>
          <el-form-item label="发件人邮箱：" prop="mail">
            <!-- <el-input disabled v-model="viewData.mail" placeholder="暂无发件人邮箱"></el-input> -->
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
              <p style="margin-bottom: 10px">主题： {{viewData.title}}</p>
              <html5-editor
                id="html5editor"
                ref="html5editor"
                :content="content"
                :fileList="fileList"
                :height="600"
                @updateFile="files=>fileList=files"
                @updateEditor="data=>content= data"/>
            </div>
          </el-form-item>
        </el-form>
        <div>
          <p v-if="AlreadyArr.length > 0" class="tempDefault">模板自带文件：</p>
          <p class="tempDefault" v-for="(name, index) in AlreadyArr" :key="index"><span>{{name.name}}</span><span @click="delAlready(index)" class="el-icon-close"></span></p>
        </div>
      </div>
    </div>
    <el-dialog title="面试岗位" :visible.sync="applyJoy" width="676px" class="interViewDialog">
      <el-table :data="joyList">
        <el-table-column width="30">
          <template slot-scope="scope">
            <el-radio v-model="isChoose" :label="scope.$index"></el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="identifier" label="需求编号" width="150" sortable></el-table-column>
        <el-table-column prop="levelOne" label="一级组织" width="150" sortable></el-table-column>
        <el-table-column prop="orgName" label="需求部门" width="150" sortable></el-table-column>
        <el-table-column prop="postName" label="需求岗位" width="150" sortable></el-table-column>
      </el-table>
      <div style="text-align: center; margin-top: 10px">
        <el-button type="primary" size="small" @click="applyJoy = false">取消</el-button>
        <el-button type="primary" size="small"  @click="sureApply">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="预览" :visible.sync="imgShow" width="860px">
      <img :src="htmlUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { searchJoy } from 'static/api/recruit/accept/accept'
import { validatoRules } from '@/assets/js/validator'
import { getToken } from 'assets/js/util'
import Html5Editor from '@/components/Html5Editor'
import html2canvas from '@/utils/html2canvas'
import { getMailTemplateListNew, getMailTemplateDetail, sendInterView } from 'static/api/setting/index'
export default {
  data () {
    const checkmail = (rule, value, callback) => {
      let Rxg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      let arr = []
      let num = 0
      arr = value.split(',')
      arr.forEach(res => {
        if (!Rxg.test(res)) {
          callback(new Error('请填写正确的邮箱格式'))
          num++
        } else {
          num = 0
        }
      })
      if (num === 0) {
        callback()
      }
    }
    return {
      checkEmail: checkmail,
      rules: {
        name: { required: true, message: '请输入姓名', trigger: ['blur'] },
        tel: validatoRules.telephone,
        post: { required: true, message: '请输入职位名称', trigger: ['change'] },
        firstTime: { required: true, message: '请选择初试时间', trigger: ['blur', 'change'] },
        email: [{ validator: checkmail, trigger: 'blur' },
          { required: true, message: '请选择收件人邮箱', trigger: ['blur', 'change'] }],
        mail: { required: true, message: '请选择发件人邮箱', trigger: ['blur', 'change'] }
      },
      content: '',
      changeContent: '',
      isTitle: true,
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
      upLoadMax: true,
      viewPositong: false,
      tempList: [],
      tempId: '',
      viewData: {
        name: '',
        tel: '',
        post: '',
        firstTime: '',
        title: '',
        email: '',
        temp: '',
        mail: ''
      },
      mailOption: [],
      senderListDatas: [],
      imgShow: false,
      htmlUrl: ''
    }
  },
  components: {
    Html5Editor
  },
  computed: {
    comeRoute () {
      return this.$route.query.come
    }
  },
  methods: {
    goBack () {
      this.$router.push({ name: this.comeRoute })
    },
    preView () {
      html2canvas('.vue-html5-editor .content', 'view').then(image => {
        this.htmlUrl = image
        this.imgShow = true
      })
    },
    base64 (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      return reader
    },
    delAlready (index) {
      this.AlreadyArr.splice(index, 1)
    },
    /* 发送邮箱 */
    sendTemp () {
      if (this.tempId) {
        const baseArray = []
        if (this.fileList.length > 0) {
          this.fileList.forEach(res => {
            if (res.raw) {
              const reader = this.base64(res.raw)
              reader.onload = function () { // onload方法放到这边确保执行完onload方法在去获取值
                baseArray.push({
                  name: res.name,
                  content: reader.result
                })
              }
            } else {
              baseArray.push({
                name: res.name,
                content: res.content
              })
            }
          })
        }
        this.$store.commit('BTN_LOADING', true)
        const params = {
          creator: getToken('loginName'),
          name: this.viewData.name,
          telephone: this.viewData.tel,
          postName: this.viewData.post,
          firstTime: this.viewData.firstTime ? this.changeDate(this.viewData.firstTime) : '',
          tempId: this.tempId,
          type: 1,
          demandId: this.prossId,
          to: this.viewData.email,
          copyto: '',
          title: this.viewData.title,
          content: `<div class="content123" style="position:relative;overflow-x:hidden;min-height:640px;height: auto;margin-bottom:80px;">
              <style>
              .content123{
              width: 800px;
              }
              p{
              font-size: 18px;
              margin-top: 22px;
              }
              p span:not(.title) {
              min-width:30px;
             position: relative;
             white-space: nowrap;
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
              <span style="display: block;">${this.content}</span>
              </div>`,
          fileData: JSON.stringify(baseArray),
          senderId: this.viewData.mail
        }
        this.$refs['viewData'].validate((valid) => {
          if (valid) {
            sendInterView(params).then(res => {
              this.$message.success('面试邀请发送成功')
              this.goBack()
            })
          } else {
            this.$store.commit('BTN_LOADING', false)
          }
        })
        // setTimeout(() => {
        //   html2canvas('.vue-html5-editor .content', 'post').then(image => {
        //
        //   })
        // }, 200)
      } else {
        this.$message.warning('请选择邮件模板')
      }
    },
    /* 日期处理 */
    changeDate (value) {
      let time = new Date(value)
      let year = time.getFullYear()
      let month = (time.getMonth() < 9 ? '0' : '') + (time.getMonth() + 1)
      let day = (time.getDate() < 10 ? '0' : '') + time.getDate()
      let hour = (time.getHours() < 10 ? '0' : '') + time.getHours()
      let minute = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes()
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    },
    /* 选择邮件模板 */
    tempVal (val) {
      this.tempId = this.tempList[val].id
      this.viewData.title = this.tempList[val].title
      getMailTemplateDetail(this.tempId).then(res => {
        const { senderList, content, senderId, fileData, title } = res.result
        this.mailOption = senderList
        this.viewData.mail = senderId
        this.content = content
        this.viewData.title = title
        this.fileList = JSON.parse(fileData)
      })
    },
    /* 邮件模板list */
    _tempList (orgId) {
      let params = {
        orgId: orgId,
        type: 1
      }
      getMailTemplateListNew(params).then(res => {
        if (res.result && res.result.records) {
          this.isTitle = true
          this.tempList = res.result.records
        } else {
          this.isTitle = false
        }
      })
    },
    /* 选择面试岗位 */
    chooseJoy () {
      searchJoy({ selectFlag: '1', size: 10000 }).then(res => {
        if (res.result && res.result.records && res.result.records.length) {
          this.joyList = res.result.records
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
        &/deep/.el-input__inner{
          width: 270px;
        }
      }
    }
    .must{
      color: red;
      font-style: normal;
    }
    .content{
      padding: 20px;
      box-sizing: border-box;
      ul{
        li{
          margin-top: 20px;
          .el-date-editor{
            &/deep/.el-input__icon{
              line-height: 0;
            }
          }
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
