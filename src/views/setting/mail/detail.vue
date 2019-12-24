<template>
<div class="interview-detail-box"  @click="mutilTreeData.showTree=false">
  <el-form
  :rules="detailRules"
  label-width="120px"
  ref="detailForm"
  :model="detailForm"
  >
  <el-form-item label="模板编号：" prop="no">
    <el-input v-model="detailForm.no" placeholder="模板编号"/>
  </el-form-item>
  <el-form-item label="模板名称：" prop="name">
    <el-input v-model="detailForm.name" placeholder="模板名称"/>
  </el-form-item>
   <el-form-item label="模板说明：">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="模板说明"
              v-model.trim="detailForm.description">
            </el-input>
    </el-form-item>
    <el-form-item label="使用范围：" prop="orgIds" placeholder="请填写使用范围">
          <mutil-search-dept-tree
          :mutilTreeData="mutilTreeData"
          :ZIndex='1002'
          ref="treeGrid"
          @selectChange="selectChange"
          />
          </el-form-item>
          <el-form-item label="发件人邮箱：" prop="senderId">
            <el-select  placeholder="请填写发件人邮箱" v-model="detailForm.senderId">
              <el-option
                v-for="(item, index) in senderTaOption"
                :key="index"
                :label="item.mail"
                :value="item.id? item.id:0"
                >
              </el-option>
            </el-select>
            <span class="sender-manger_span" @click="dialogVisible=true">管理</span>
          </el-form-item>
          <el-form-item label="邮件主题：" prop="title">
          <el-input v-model.trim="detailForm.title" placeholder="请填写邮件主题"></el-input>
          </el-form-item>
          <el-form-item
          prop="content"
          label=" ">
             <html5-editor
             :content="detailForm.content"
             :fileList="detailForm.fileList"
             :height="$route.name.includes('Offer')? 1500:600"
             @updateFile="files=>detailForm.fileList=files"
              @updateEditor="data=>detailForm.content= data"/>
          </el-form-item>
  </el-form>
     <!--发件人邮箱管理弹窗-->
    <el-dialog title="管理" :visible.sync="dialogVisible" width="800px">
      <div class="table-box">
         <el-table :data="senderTabDatas">
          <el-table-column prop="nick" label="名称">
            <template slot-scope="scope">
              <span v-if="!scope.row.edit">{{scope.row.nick}}</span>
              <span v-else><el-input v-model="scope.row.nick" placeholder="用户名称"></el-input></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="mail"
            label="邮箱账号">
            <template slot-scope="scope">
              <span v-if="!scope.row.edit">{{scope.row.mail}}</span>
              <span v-else>
                <el-input v-model="scope.row.mail" placeholder="邮箱账号"></el-input>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="oldPassword"
            label="密码">
            <template slot-scope="scope">
              <span v-if="!scope.row.edit">{{scope.row.oldPassword}}</span>
              <span v-else><el-input v-model="scope.row.newPassword" placeholder="密码"></el-input></span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="operation" v-if="$route.params.id">
                <span v-if="!scope.row.edit" @click="editSenderMail(scope.row)">编辑</span>
                <span v-else @click="upateSender(scope.row)">保存</span>
                <span @click="delSender(scope.row)">删除</span>
              </div>
              <div class="operation" v-else>
                <span @click="delSender(scope.row)">删除</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="add-mail_btn mt-20">
          <el-button size="mini" @click="addSenderMail">新增</el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button @click="saveBtn" size="mini" type="primary">确 定</el-button>
      </span>
    </el-dialog>
</div>
</template>
<script>
import Html5Editor from '@/components/Html5Editor'
import MutilSearchDeptTree from 'components/MutilSearchDeptTree'
import settingApi from 'api/setting'
export default {
  props: {
    detailForm: {
      type: Object
    }
  },
  data () {
    return {
      mutilTreeData: {
        filterName: '',
        orgIds: [],
        dataTree: [],
        checkDatas: [],
        showTree: false
      },
      detailRules: {
        no: { required: true, message: '请填写模板编号', trigger: ['blur', 'change'] },
        name: { required: true, message: '请填写模板名称', trigger: ['blur', 'change'] },
        orgIds: { required: true, message: '请选择邮件使用范围', trigger: ['blur', 'change'] },
        senderId: { required: true, message: '请选择发件人邮箱', trigger: ['blur', 'change'] },
        title: { required: true, message: '请输入邮件主题', trigger: ['blur', 'change'] },
        content: { required: true, message: '邮件内容不能为空', trigger: ['blur', 'change'] }
      },
      // 发件人管理table数据
      senderTabDatas: [
        {
          nick: '',
          mail: '',
          oldPassword: '******',
          newPassword: '',
          edit: true,
          id: ''
        }
      ],
      dialogVisible: false
    }
  },
  computed: {
    senderTaOption () {
      return this.senderTabDatas.filter(item => item.nick && item.mail)
    }
  },
  components: {
    Html5Editor,
    MutilSearchDeptTree
  },
  methods: {
    _setCheckedKeys (checkedKeys) {
      this.$refs.treeGrid._setCheckedKeys(checkedKeys)
    },
    _getNonParentId (arr) {
      const nonPids = []
      function findNonPid (array) {
        array.forEach(item => {
          if (!item.sysDeptListVO || !item.sysDeptListVO.length) {
            nonPids.push(`${item.sysDept.id}`)
          } else {
            findNonPid(item.sysDeptListVO)
          }
        })
      }
      findNonPid(arr)
      return nonPids
    },
    _getPureChildIds () {
      const pureIds = this._getNonParentId(this.mutilTreeData.dataTree)
      return `${this.mutilTreeData.orgIds.filter(x => pureIds.indexOf(`${x}`) !== -1)}`
    },
    selectChange (orgIds) {
      this.detailForm.orgIds = orgIds
    },
    validate () {
      let validate1 = ''
      this.$refs.detailForm.validate(valid => { validate1 = valid })
      return validate1
    },
    // 新增发件人邮箱信息
    saveBtn () {
      let nameFlag = false
      let mailFlag = false
      let passwordFlag = false
      let i = 0
      this.senderTabDatas.filter(item => {
        item.nick ? nameFlag = true : nameFlag = false
      })
      this.senderTabDatas.filter(item => {
        item.mail ? mailFlag = true : mailFlag = false
      })
      this.senderTabDatas.filter(item => {
        item.newPassword ? passwordFlag = true : passwordFlag = false
      })
      this.senderTabDatas.forEach(item => {
        if (!item.id) {
          if (!item.newPassword) i++
        }
      })
      if (!nameFlag) {
        this.$message.warning({ message: '请填写名称' })
        return
      }
      if (!mailFlag) {
        this.$message.warning({ message: '请填写邮箱账号' })
        return
      }
      if (this.$route.params.id) {
        if (i > 0) {
          this.$message.warning({ message: '请填写正确的密码' })
          return
        }
      } else {
        if (!passwordFlag) {
          this.$message.warning({ message: '请填写正确的密码' })
          return
        }
      }
      this.dialogVisible = false
    },
    // 新增
    addSenderMail () {
      this.senderTabDatas.push({
        nick: '',
        mail: '',
        oldPassword: '******',
        newPassword: '',
        edit: true,
        id: ''
      })
    },
    // 编辑
    editSenderMail (item) {
      item.edit = true
    },
    // 删除
    delSender (row) {
      if (!row.id) {
        const indexOf = this.senderTabDatas.indexOf(row)
        this.senderTabDatas.splice(indexOf, 1)
      } else {
        this.$confirm('确认要删除' + row.nick + '吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          settingApi.delSender(row.id).then(data => {
            this.$message.success('删除成功')
            this.detailForm.senderId = ''
            setTimeout(() => {
              this._getSenderMailList()
            }, 200)
          })
        }).catch(() => {})
      }
    },
    /* 保存(单个) */
    upateSender (row) {
      if (row.nick === '') {
        this.$message.warning('请输入名称')
        return
      }
      if (row.mail === '') {
        this.$message.warning('请输入邮箱账号')
        return
      } else if (!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/).test(row.mail)) {
        this.$message.warning('请输入正确的邮箱账号')
        return
      }
      if (row.newPassword === '') {
        this.$message.warning('请输入邮箱密码')
        return
      }
      const senderParams = {
        id: row.id,
        password: row.newPassword,
        mail: row.mail,
        nick: row.nick,
        tempId: this.$route.params.id
      }
      if (row.id) {
        settingApi.modifySenderMessage(senderParams).then(data => {
          this.$message.success('修改成功')
          setTimeout(() => {
            this._getSenderMailList()
          }, 200)
        })
      } else {
        settingApi.addSender(senderParams).then(data => {
          this.$message.success('新增成功')
          setTimeout(() => {
            this._getSenderMailList()
          }, 200)
        })
      }
    },
    // 获取信息列表
    _getSenderMailList () {
      if (!this.$route.params.id) return
      const params = {
        page: 1,
        size: 20,
        tempId: this.$route.params.id
      }
      this.senderTabDatas = []
      settingApi.getSenderMailList(params).then(data => {
        if (data.result && data.result.records) {
          data.result.records.forEach(item => {
            this.senderTabDatas.push({
              nick: item.nick,
              mail: item.mail,
              oldPassword: '*******',
              newPassword: '',
              edit: false,
              id: item.id
            })
          })
        }
      })
    }
  },
  created () {
    this._getSenderMailList()
  }
}
</script>
<style lang="less" scoped>
.interview-detail-box{
  width: 920px;
  /deep/ .el-form-item{
      position: relative;
      width:600px;
    span{
      &.sender-manger_span{
          position: absolute;
          right:-40px;
          top:0px;
          color:#FF7500;
          cursor: pointer;
          &:hover{
              text-decoration: underline;
            }
          }
    }
    .el-select{
      width:100%;
    }
  }
}
</style>
