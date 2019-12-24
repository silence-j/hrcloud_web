<template>
<div class="entry-person_box">
  <el-collapse v-model="activePersonCollapseName" @change="handlePresonChange">
    <el-collapse-item title="基本信息">
        <entry-person-base
        ref="entryPersonBaseRef"
        @changeSex="changeSex"
        />
    </el-collapse-item>
    <el-collapse-item
     title="健康情况">
      <entry-person-health
      :sex="changeSexVal" ref="entryHealth"/>
    </el-collapse-item>
    <el-collapse-item
    title="学习简历"
    >
      <entry-person-resume @delResume="delResume"
      ref="entryResume"
      />
    </el-collapse-item>
    <el-collapse-item title="工作简历">
      <el-form label-width="150px">
        <el-form-item required label=" 是否在中财工作过">
           <el-radio-group v-model="inZcBefore">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <entry-person-job class="mt-20" @delJob="delJob" ref="entryJob" />
    </el-collapse-item>
    <el-collapse-item title="家庭成员信息">
      <entry-person-family @delFamily="delFamily" ref="entryFamily"/>
    </el-collapse-item>
  </el-collapse>
  <div class="btn-box mt-20" v-if="routeName.indexOf($route.query.come)!==-1 || this.$route.query.copyToken">
    <el-button type="primary" size="small" @click="savePersonalInfo">保存</el-button>
  </div>
</div>
</template>
<script>
import EntryPersonBase from './entry-person/entry-person-base'
import EntryPersonHealth from './entry-person/entry-person-health'
import EntryPersonResume from './entry-person/entry-person-resume'
import EntryPersonJob from './entry-person/entry-person-job'
import EntryPersonFamily from './entry-person/entry-person-family'
import { savePersonnelMsg, saveLinkPersonelMsg } from 'static/api/recruit/accept/accept'
import { getEntryParams } from 'assets/js/mixins'
import { getToken } from 'assets/js/util'
import { debounce } from 'lodash'
import { delFamilyList,
  delResumeList,
  delEduList,
  delEduListStaff,
  delResumeListStaff,
  delFamilyListStaff
} from 'static/api/personnel-information/base/base'
export default {
  mixins: [getEntryParams],
  data () {
    return {
      routeName: ['VerifyEntryEntry', 'MarketVerifyEntryEntry', 'MarketVerifyEntryHeadquarters'],
      activePersonCollapseName: 'first',
      changeSexVal: '',
      inZcBefore: 0
    }
  },
  components: {
    EntryPersonBase,
    EntryPersonHealth,
    EntryPersonResume,
    EntryPersonJob,
    EntryPersonFamily
  },
  computed: {
    employeeId () {
      return this.$route.query.employeeId
    },
    actId () {
      return this.$route.query.exmineId
    },
    personData () {
      return this.getAllDatas()
    },
    resumeForm () {
      return this.$refs.entryResume._getResumeDatas()
    },
    jobForm () {
      return this.$refs.entryJob._getJobDatas()
    },
    familyForm () {
      return this.$refs.entryFamily._getFamilyDatas()
    },
    copyToken () {
      return this.$route.query.copyToken
    }
  },
  methods: {
    handlePresonChange () {},
    // 获取数据
    getAllDatas () {
      let allDatas = {
        areaCollections: this.$refs.entryPersonBaseRef.getBaseDatas().areaCollections,
        personBaseForm: Object.assign({}, this.$refs.entryPersonBaseRef.getBaseDatas().personBaseForm, { inZcBefore: this.inZcBefore }),
        healthForm: this.$refs.entryHealth.getHealthDatas(),
        resumeForm: this.resumeForm,
        jobForm: this.jobForm,
        familyForm: this.familyForm
      }
      return allDatas
    },
    vaildPersonBase () {
      return this.$refs.entryPersonBaseRef.vaildPersonBaseForm()
    },
    vaildHealth () {
      return this.$refs.entryHealth.vailHealthForm()
    },
    commonPersonVaildata () {
      // return this.vaildPersonBase()
      return this.vaildPersonBase() && this.vaildHealth()
    },
    changeSex (value) {
      this.changeSexVal = value
    },
    handleResResult () {
      this.$message.success('个人档案保存成功!')
      this.$refs.entryResume._getResumeList()
      this.$refs.entryJob._getJobList()
      this.$refs.entryFamily._getFamilyList()
      this.$store.commit('SET_SAVE2', true)
    },
    // 个人信息保存
    savePersonalInfo: debounce(function (e) {
      let validate = this.commonPersonVaildata()
      const copyToken = this.$route.query.copyToken
      if (validate) {
        if (!copyToken) {
          savePersonnelMsg(this.getUserPersonalInfo()).then(res => {
            this.handleResResult()
          })
        } else {
          saveLinkPersonelMsg(Object.assign({}, this.getUserPersonalInfo(), { copyToken })).then(res => {
            this.handleResResult()
          })
        }
      }
    }, 500),
    delResume (id, index) {
      this.delListData(id, index, this.resumeForm, '学历')
    },
    delJob (id, index) {
      this.delListData(id, index, this.jobForm, '工作简历')
    },
    delFamily (id, index) {
      this.delListData(id, index, this.familyForm, '家庭成员')
    },
    _getReturnCode (data, callback) {
      this.$message.success('删除成功')
    },
    delListData (id, index, arr, msg) {
      this.$confirm('确定要删除这条' + msg + '吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        arr.splice(index, 1)
        if (id) {
          let delParams = {
            id,
            operator: getToken('loginId')
          }
          switch (msg) {
            case '学历' :
              this.copyToken
                ? delEduListStaff(Object.assign({}, delParams, { copyToken: this.copyToken, userId: this.$store.state.entryDetailId })).then(data => {
                  this._getReturnCode(data)
                }) : delEduList(delParams).then(data => {
                  this._getReturnCode(data)
                })
              break
            case '工作简历' :
              this.copyToken
                ? delResumeListStaff(Object.assign({}, delParams, { copyToken: this.copyToken, userId: this.$store.state.entryDetailId })).then(data => {
                  this._getReturnCode(data)
                }) : delResumeList(delParams).then(data => {
                  this._getReturnCode(data)
                })
              break
            case '家庭成员' :
              this.copyToken
                ? delFamilyListStaff(Object.assign({}, delParams, { copyToken: this.copyToken, userId: this.$store.state.entryDetailId })).then(data => {
                  this._getReturnCode(data)
                })
                : delFamilyList(delParams).then(data => {
                  this._getReturnCode(data)
                })
          }
        }
      }).catch(() => {})
    }
  },
  watch: {
    '$store.state.inZcBefore' (value) {
      this.inZcBefore = value
    }
  }
}
</script>
<style lang="less" scoped>
.btn-box{
  text-align:center;
  .el-button{
    display: inline-block;
    // width:200px;
  }
}
</style>
