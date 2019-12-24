<template>
  <div class="container"
  style="overflow:initial"
  @click="showTreeTag=false"
  >
    <el-button type="primary" @click="goBack" size="small">返 回</el-button>
    <el-button type="primary" @click="_updateTemplate" size="small" v-if="type == 'edit'">提 交</el-button>
    <p class="infor-title">基本信息</p>
    <div class="content-box">
      <el-form :model="addReportForm" :rules="addReportRules" ref="addReportForm" label-width="105px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="报表名称:" prop="name">
              <el-input v-model="addReportForm.name" placeholder="" @blur="_selectTemplateName" :disabled="disableShow"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报表描述:">
              <el-input type="textarea" v-model="addReportForm.remark" placeholder="" :disabled="disableShow"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
             label="开始时间:" prop="startTime">
              <el-date-picker
                v-model="addReportForm.startTime"
                @change="changeTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                placeholder="选择日期时间" :disabled="disableShow">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="截止时间:" prop="endTime">
              <el-date-picker
               @change="changeTime"
                v-model="addReportForm.endTime"
                type="datetime"
                @focus="focusEndTime"
                format="yyyy-MM-dd HH:mm"
                placeholder="选择日期时间" :disabled="ShowStar">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="填报机构:" prop="orgIds">
              <template v-if="disableShow">
                <el-input v-model="orgNames" placeholder="" :disabled="disableShow"></el-input>
              </template>
              <template v-else>
              <mutil-search-tree
                :ZIndex='999'
                :showTreeTag="showTreeTag"
                @show-tree="showDeptTree"
                @getAllDept="getSerId"
              />
               </template>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <p class="infor-title">字段设置</p>
    <div class="content-box">
      <template v-for="(item,index) in addFieldData">
        <div :key="index">
         <div class="field-mod">
          <el-form label-width="105px">
            <el-row>
              <el-col :span="12">
                <el-form-item class="mustForm" label="字段名称:">
                  <el-input v-model="item.name" placeholder="" :disabled="disableShow"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="mustForm" label="字段类型:">
                  <el-radio-group v-model="item.type" :disabled="disableShow">
                    <el-radio label="varchar" >文本型</el-radio>
                    <!--<el-radio label="下拉选项" >下拉选项</el-radio>-->
                    <el-radio label="decimal">数字型</el-radio>
                    <el-radio label="datetime">日历型</el-radio>
                  </el-radio-group>
                  <span style="color: #999999">（填写格式：20170927；2017-09-27；2017.09.27；2017/09/27）</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        </div>
      </template>

      <div class="field-btns" v-if="disableShow == false">
        <el-button type="primary" size="small" @click="addFieldMod">添  加</el-button>
        <el-button type="primary" size="small" @click="deletFieldMod">删  除</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { timeToString } from 'assets/js/common'
import { selectTemplateName, selectTemplateDetail, updateTemplate } from 'static/api/temporary/report-add'
import { getToken } from 'assets/js/util'
import MutilSearchTree from 'components/MutilSearchTree'
import { mapGetters } from 'vuex'
import { debounce } from 'lodash'
export default {
  data () {
    return {
      addReportForm: {
        createName: '',
        name: '',
        remark: '',
        startTime: '',
        endTime: '',
        orgIds: '',
        orgNames: ''
      },
      addFieldData: [{
        name: '',
        type: ''
      }],
      type: '',
      itemId: '',
      ShowStar: false,
      showTreeTag: false,
      ifrepeat: false,
      disableShow: false,
      orgNames: '',
      addReportRules: {
        name: { required: true, message: '请填写报表名称', trigger: 'blur' },
        startTime: { required: true, message: '请选择开始时间', trigger: 'blur' },
        endTime: { required: true, message: '请选择截止时间', trigger: 'blur' },
        orgIds: { required: true, message: '请选择任职部门', trigger: 'blur' }
      },
      originaName: ''
    }
  },
  computed: {
    ...mapGetters(['getTreeCheckedName'])
  },
  methods: {
    /** 树结构**/
    showDeptTree () {
      this.showTreeTag = true
    },
    getChangeVal (val) {
      this.addReportForm.orgNames = val
    },
    getSerId (val) {
      this.addReportForm.orgIds = val
    },
    goBack () {
      window.history.go(-1)
    },
    addFieldMod () {
      this.addFieldData.push({
        name: '',
        type: ''
      })
    },
    deletFieldMod () {
      this.addFieldData.splice(this.addFieldData.length - 1, 1)
    },
    changeTime (value) {
      console.log(value)
    },
    focusEndTime () {
      console.log('1111')
    },
    _selectTemplateName () {
      if (this.addReportForm.name === this.originaName) return
      let preload = {
        name: this.addReportForm.name
      }
      selectTemplateName(preload).then(data => {
        if (data.result) {
          if (data.result.length) {
            this.$message.warning('报表名称不能重复')
            this.ifrepeat = true
          } else {
            this.ifrepeat = false
          }
        }
      })
    },
    _selectTemplateDetail () {
      let preload = {
        id: this.itemId
      }
      let orgIdArr = []
      this.addFieldData = []
      selectTemplateDetail(preload).then(data => {
        if (data.result.columnName.length) {
          let eStartTime = data.result.template.startTime
          let eEndTime = data.result.template.endTime
          this.addReportForm = data.result.template
          this.originaName = data.result.template.name
          this.addReportForm.startTime = new Date(eStartTime.replace(/-/g, '/'))
          this.addReportForm.endTime = new Date(eEndTime.replace(/-/g, '/'))
          if (this.disableShow) {
            this.orgNames = this.addReportForm.orgNames
          } else {
            let newOrgArr = (this.addReportForm.orgIds).split(',')
            // console.log(this.addReportForm.orgIds)
            orgIdArr = newOrgArr
            this.$store.commit('SET_TREE_CHECKED_ORGIDS', orgIdArr.map(item => Number(item)))
            // this.$refs.deptTree1.setValAndName(this.addReportForm.orgNames, orgIdArr)
            this.addReportForm.orgIds = newOrgArr
            //  this.$refs.deptTree1.setValAll(newIds)
            // this.$refs.deptTree.setValAndName('heheda', orgIdArr)
          }
          data.result.columnName.forEach((item) => {
            if (item.name !== 'id' && item.name !== 'create_id' && item.name !== 'create_time' && item.name !== '导入时间' && item.name !== '创建人' && item.name !== '所属公司') {
              this.addFieldData.push(item)
            }
          })
        }
      })
    },
    _updateTemplate: debounce(function () {
      this.addReportForm.createName = getToken('loginName')
      // this.addReportForm.startTime = timeToString(this.addReportForm.startTime)
      // this.addReportForm.endTime = timeToString(this.addReportForm.endTime)
      // let newAddreportForm = this.deepClone(this.addReportForm)
      let newAddreportForm = Object.assign({}, this.addReportForm)
      newAddreportForm.startTime = timeToString(newAddreportForm.startTime)
      newAddreportForm.endTime = timeToString(newAddreportForm.endTime)
      let preload = {
        template: newAddreportForm,
        column: this.addFieldData
      }
      // console.log(this.addReportForm.orgIds)
      // if (!this.addReportForm.name) {
      //   this.$message.warning('请填写报表名称')
      //   return
      // }
      // if (this.ifrepeat === true) {
      //   this.$message.warning('报表名称不能重复')
      //   return
      // }
      // if (!this.addReportForm.startTime) {
      //   this.$message.warning('请选择开始时间')
      //   return
      // }
      // if (!this.addReportForm.endTime) {
      //   this.$message.warning('请选择截止时间')
      //   return
      // }
      this.$refs['addReportForm'].validate((valid) => {
        if (valid) {
          if (this.addReportForm.startTime > this.addReportForm.endTime) {
            this.$message.warning('截止时间不能小于开始时间')
            return
          }
          if (this.addReportForm.orgIds.length !== 0) {
            if (this.disableShow) {
              preload.template.orgIds = this.addReportForm.orgIds
            } else {
              preload.template.orgIds = (this.addReportForm.orgIds).join(',')
            }
          }
          for (var item in this.addFieldData) {
            if (!this.addFieldData[item].name) {
              this.$message.warning('请填写字段名称')
              return
            }
            if (!this.addFieldData[item].type) {
              this.$message.warning('请选择字段类型')
              return
            }
            if (this.addFieldData[item].name === 'id') {
              this.$message.warning('字段名称不能为id')
              return
            }
            if (this.addFieldData[item].name === 'create_id') {
              this.$message.warning('字段名称不能为create_id')
              return
            }
            if (this.addFieldData[item].name === 'create_time') {
              this.$message.warning('字段名称不能为create_time')
              return
            }
          }
          updateTemplate(preload).then(data => {
            this.$message.success('编辑成功!')
            setTimeout(() => {
              this.$router.push({ path: '/temporary/report-manage' })
            }, 400)
          })
        }
      })
    }, 500)
  },
  components: {
    MutilSearchTree
  },
  created () {
    if (this.$route.query.id) {
      this.itemId = this.$route.query.id
      this._selectTemplateDetail()
      if (this.$route.query.over) {
        this.disableShow = true
      }
    }
    this.type = this.$route.query.type
  }
}
</script>

<style scoped lang="less">
  .infor-title{margin: 20px 0;}
  .field-mod{border-bottom: 1px solid #bfcbd9;padding-top: 10px}
  .field-mod .el-form-item{margin-bottom: 12px;}
  .field-btns{padding: 15px 0 0 0px;}
</style>
