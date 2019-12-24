<template>
  <div class="interview-add-box">
    <el-row>
      <el-button type="primary" size="mini" @click="$router.push('/setting/mail-template/offer')">返回</el-button>
      <el-button type="primary" size="mini" @click="subInterview">提交</el-button>
      <el-button type="primary" size="mini" @click="preview">预览</el-button>
    </el-row>
    <detail class="mt-30" :detailForm="editForm" ref="detailRef"/>
    <el-dialog title="预览" :visible.sync="imgShow" width="860px">
      <img :src="htmlUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import Detail from '../detail'
import offer from '@/components/templates/offer'
import settingApi from 'api/setting'
import { setTimeout } from 'timers'
import html2canvas from '@/utils/html2canvas'
export default {
  name: 'OfferEdit',
  data () {
    return {
      htmlUrl: '',
      imgShow: false,
      editForm: {
        no: '',
        name: '',
        title: '',
        description: '',
        orgIds: '',
        senderId: '',
        content: offer(),
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
    subInterview () {
      const vail = this.$refs.detailRef.validate()
      if (vail) {
        const baseArray = []
        if (this.editForm.fileList.length > 0) {
          this.editForm.fileList.forEach(res => {
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
            id: this.editForm.id,
            no: this.editForm.no,
            name: this.editForm.name,
            description: this.editForm.description,
            enabled: 1,
            type: 2,
            senderId: this.editForm.senderId,
            orgIds: `${this.$refs.detailRef.mutilTreeData.orgIds}`,
            title: this.editForm.title,
            content: this.editForm.content,
            fileData: JSON.stringify(baseArray),
            defaultMail: this.editForm.senderId,
            mmailSenders: mailSenders
          }
          settingApi.updateTemplate(tempalteParams).then(data => {
            this.$message.success('编辑成功')
            setTimeout(() => {
              this.$router.push('/setting/mail-template/offer')
            }, 200)
          })
        }, 500)
      }
    },
    /* 获取详情 */
    _getTempalteDetail () {
      settingApi.getMailTemplateDetail(this.$route.params.id).then(data => {
        const { id, no, name, description, senderId, orgIds, title, content, fileData } = data.result
        this.editForm.id = id
        this.editForm.no = no
        this.editForm.name = name
        this.editForm.description = description
        this.editForm.senderId = senderId
        this.editForm.orgIds = orgIds
        this.editForm.title = title
        this.editForm.content = content
        this.editForm.fileList = JSON.parse(fileData)
        this.$refs.detailRef._setCheckedKeys(orgIds)
        this.$refs.detailRef.mutilTreeData.orgIds = orgIds.split(',')
        // setTimeout(() => {
        //   this.$store.dispatch('setTreeCheckedData', `${orgIds}`)
        //   this.$store.dispatch('setTreeCheckedName')
        // }, 200)
      })
    }
  },
  components: {
    Detail
  },
  created () {
    this._getTempalteDetail()
  }
}
</script>
