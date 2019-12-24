<template>
  <div class="interview-add-box">
    <el-row>
      <el-button type="primary" size="mini" @click="$router.push('/setting/mail-template/interview')">返回</el-button>
      <el-button type="primary" size="mini" @click="subInterview">提交</el-button>
      <el-button type="primary" size="mini" @click="preview">预览</el-button>
    </el-row>
    <detail class="mt-30" :detailForm="addForm" ref="detailRef"/>
    <el-dialog title="预览" :visible.sync="imgShow" width="860px">
      <img :src="htmlUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import Detail from '../detail'
import interview from '@/components/templates/interview'
import settingApi from 'api/setting'
import html2canvas from '@/utils/html2canvas'
// import { debounce } from '../../../../assets/js/util'
import { debounce } from 'lodash'

export default {
  name: 'InterviewAdd',
  data () {
    return {
      htmlUrl: '',
      imgShow: false,
      addForm: {
        no: '',
        name: '',
        title: '',
        description: '',
        orgIds: '',
        senderId: '',
        content: interview(),
        fileList: []
      }
    }
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
      const reader = new FileReader()
      reader.readAsDataURL(file)
      return reader
    },
    subInterview: debounce(function () {
      const vail = this.$refs.detailRef.validate()
      if (vail) {
        const baseArray = []
        if (this.addForm.fileList.length > 0) {
          this.addForm.fileList.forEach(res => {
            const reader = this.base64(res.raw)
            reader.onload = function () { // onload方法放到这边确保执行完onload方法在去获取值
              baseArray.push({
                name: res.name,
                content: reader.result
              })
            }
          })
        }
        setTimeout(() => {
          const mailSenders = []
          this.$refs.detailRef.senderTabDatas.filter(x => x.mail && x.nick).forEach(item => {
            mailSenders.push({
              mail: item.mail,
              password: item.newPassword,
              nick: item.nick
            })
          })

          const tempalteParams = {
            no: this.addForm.no,
            name: this.addForm.name,
            description: this.addForm.description,
            enabled: 1,
            type: 1,
            orgIds: `${this.$refs.detailRef.mutilTreeData.orgIds}`,
            title: this.addForm.title,
            content: this.addForm.content,
            fileData: JSON.stringify(baseArray),
            defaultMail: this.addForm.senderId,
            mailSenders: mailSenders
          }
          settingApi.addMailTemplate(tempalteParams).then(data => {
            this.$message.success('新增成功')
            setTimeout(() => {
              this.$router.push('/setting/mail-template/interview')
            }, 200)
          })
        }, 500)
      }
    }, 500)
  },
  components: {
    Detail
  }
}
</script>
