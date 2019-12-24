<template>
  <div class="html-edit-box">
    <vue-html5-editor
      :content.sync="content"
      @change="updateEditor">
    </vue-html5-editor>
    <el-upload
      class="editor-upload"
      ref="editorUpload"
      :auto-upload="false"
      :limit="10"
      :on-exceed="handleExceed"
      :on-remove="removeFiles"
      :on-change="changeFiles"
      id="editorUpload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :file-list="fileList">
    </el-upload>
  </div>
</template>
<script>
import Vue from 'vue'
import VueHtml5Editor from 'vue-html5-editor'
Vue.use(VueHtml5Editor,
  {
    visibleModules: [
      // 'info',
      'text',
      'color',
      'font',
      'align',
      'tabulation',
      'hr',
      'list',
      'link',
      'unlink',
      // 'full-screen',
      'image',
      'file'
    ],
    date: {
      format: 'YYYY-MM-DD'
    },
    i18n: {
      // i18n for custom module
      'zh-cn': {
        file: '附件'
      }
    },
    modules: [
      {
        name: 'file',
        icon: 'fa fa-file-o',
        i18n: 'file',
        show: true,
        handler: function (editor) {
          document.getElementById('editorUpload').querySelector('input').click()
        }
      }
    ],
    language: 'zh-cn'
  })
export default {
  name: 'HtmlEditor',
  props: ['content', 'fileList', 'height'],
  data () {
    return {
      // content: interview(),
      changeContent: ''
      // fileList: []
    }
  },
  methods: {
    handleExceed (file, fileList) {
      this.$message.warning('最多只能上传10个文件')
      this.upLoadMax = false
    },
    delErrorFile (arr) {
      arr.splice(arr.length - 1, 1)
    },
    changeFiles (file, fileList) {
      let isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error('上传附件大小不能超过 5MB!')
        setTimeout(() => {
          this.delErrorFile(this.$refs.editorUpload.uploadFiles)
        }, 200)
      } else {
        // this.fileList = []
        // this.fileList = fileList
        this.$emit('updateFile', fileList)
      }
    },
    removeFiles (file, fileList) {
      // this.fileArray = []
      //  this.fileList = fileList
      this.$emit('updateFile', fileList)
      if (fileList.length <= 10) {
        this.upLoadMax = true
      }
    },
    updateEditor (data) {
      // const targets = document.querySelector('.vue-html5-editor').querySelector('.content').querySelectorAll('.code')
      // targets.forEach(target => {
      //   const tValue = target.value
      //   const oSpan = document.createElement('span')
      //   oSpan.innerHTML = tValue
      //   document.body.appendChild(oSpan)
      //   const width1 = oSpan.offsetWidth
      //   // sensor.remove()
      //   target.style.width = width1
      //   console.log(tValue, width1, target)
      // })
      this.changeContent = data
      this.$emit('updateEditor', data)
    }
  }
}
</script>

<style lang="less" scoped>
  // ,url("~assets/img/mail-module1-content.png") center bottom no-repeat
  .html-edit-box{
    .vue-html5-editor {
      width:800px;
      color: #034743;
      /deep/.content{
        width: 800px;
        overflow-x:hidden;
        min-height:640px;
        height: auto;
        padding:0 0 100px 0;
        .line{
          border-bottom: 1px dashed #01795B;
        }
        p{
          font-size: 18px;
          margin-top: 22px;
          span{
            &:not(.title){
              min-width:30px;
              display: inline-block;
              position: relative;
            }
          }
          .code{
            color: #01795B;
            &::after{
              position:absolute;
              content: "";
              width:100%;
              height:2px;
              background-color:#01795B;
              left:0px;
              bottom: 0px;
            }
          }
        }
      }
    }
  }
</style>
