<template>
<div class="mt-20">
  <el-collapse v-model="activeNames" accordion>
    <!-- 劳动人事信息 -->
    <el-collapse-item title="劳动人事信息" name="1">
      <el-form  label-width="135px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="参加工作时间：">
              {{entryInformation.takejobDate}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本次入职时间：">
              {{entryInformation.entryDate}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  label="任职部门：">
              {{entryInformation.orgName}}
            </el-form-item>
           </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="岗  位：">
            {{entryInformation.postName}}
            </el-form-item>
          </el-col>
          <el-col :span="17">
            <el-form-item label="是否已与原单位解除劳动关系：" label-width="250px">
              <span>{{entryInformation.cancelConctractWithOldText}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="原单位是否缴纳社保：" label-width="180px">
              <span>{{entryInformation.insuredInOld | filterInsuredInOld}}</span>
            </el-form-item>
          </el-col>
          <div v-show="entryInformation.insuredInOld === 1">
            <el-col :span="8">
              <el-form-item label="缴纳至：">
                <span>{{entryInformation.insuredOldMonth}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="缴纳地：">
                <span>{{entryInformation.insuredOldArea}}</span>
              </el-form-item>
            </el-col>
          </div>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="原单位是否缴纳公积金：" label-width="180px">
              <span>{{entryInformation.fundedInOld | filterInsuredInOld}}</span>
            </el-form-item>
          </el-col>
          <div v-show="entryInformation.fundedInOld === 1">
            <el-col :span="8">
            <el-form-item label="缴纳至：">
              <span>{{entryInformation.fundedOldMonth}}</span>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="缴纳地：">
              <span>{{entryInformation.fundedOldArea}}</span>
              </el-form-item>
            </el-col>
          </div>
        </el-row>
      </el-form>
    </el-collapse-item>
    <!-- 材料附件 -->
    <el-collapse-item title="材料附件" name="2">
      <el-form>
        <el-row>
          <el-col>
            <p class="mean-title">需提供材料</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label-width="30px">
              <el-checkbox-group v-model="userEntryInfoExtraList">
                <el-checkbox
                  v-for="(item,index) in allDicOptions"
                  :key="index" name="userEntryInfoExtraList"
                  :label="item.dictId"
                  :disabled="item.disabled"
                  @change="getDicId(item, $event)">
                  {{item.dictName}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <h3 class="mean-title">已提供材料</h3>
            <el-checkbox-group
            v-model="userEntryInfoExtraList2">
              <el-tag
                v-for="(item,index) in userOtherEntryInfoExtraList"
                :key="index"
                class="el-tag-check">
                <el-checkbox
                  :disabled="item.disabled"
                  name="userEntryInfoExtraList2"
                  :label="item.dictId">{{item.dictName}}
                  <i :class="item.disabled?'':'el-icon-close'" @click.stop="delDic(item)"></i>
                </el-checkbox>
              </el-tag>
            </el-checkbox-group>
          </el-col>
        </el-row>
      </el-form>
      <el-row style="margin-top: 30px">
        <el-col :span="2" :offset="10">
            <el-button type="primary" size="small" style="width:100%" @click="entrySave">保　存</el-button>
        </el-col>
      </el-row>
    </el-collapse-item>
  </el-collapse>
</div>
</template>
<script>
import { getToken } from 'assets/js/util'
import { timeToString, returnFloat } from 'assets/js/common'
import { checkMaterial, getSysDic } from 'static/api/common/common'
import { getUserInfoDetail, delEntryMaterial, saveSalarySetting, saveMeterial } from 'static/api/recruit/entry/entry'
import {
  getSex,
  getPoltic,
  getEducationWay,
  getMarriage,
  getEdu,
  getCertificateStatus,
  getRelation,
  getfilternature,
  getInsuredInOld,
  getfilterRelieveStatus,
  getConctractWithOld,
  getWorkStaue
} from 'assets/js/filters'
export default {
  data () {
    return {
      activeNames: ['1'],
      entryInformation: {
        takejobDate: '',
        entryDate: '',
        orgId: '',
        orgName: '',
        postName: '',
        cancelConctractWithOld: '',
        fundedInOld: '',
        fundedOldArea: '',
        fundedOldMonth: '',
        insuredInOld: '',
        insuredOldMonth: '',
        insuredOldArea: '',
        selectProv: '',
        selectCity: '',
        hujiAddress: '',
        archivesAddress: ''
      },
      newAllDicArr: [],
      allDicOptions: [],
      userOtherEntryInfoExtraList: [],
      userEntryInfoExtraList: [],
      userEntryInfoExtraList2: [],
      baseInformation: [],
      salaryId: '',
      formSalaryParams: '',
      probaSalaryParams: '',
      currentStatus: '',
      reportForm: {
        graduationDate: '',
        probationBeginTime: '',
        probationEndTime: '',
        formalSalary: '',
        probationSalary: '',
        orgProbationSalary: '',
        salaryType: 0,
        exercitationAllowance: '',
        exercitationBeginTime: '',
        exercitationEndTime: '',
        exercitationSalary: '',
        positiveTime: '',
        workAgreement: 1
      },
      ytgDatas: []
    }
  },
  methods: {
    getDicId (item, event) {
      if (this.userEntryInfoExtraList.indexOf(item.dictId) !== -1) {
        this.userOtherEntryInfoExtraList.push(Object.assign({}, item, { enable: 1 }))
        item.disabled = true
      }
    },
    /** 获取劳动信息**/
    _getUserInfo () {
      getUserInfoDetail(this.$route.params.baseId).then(data => {
        if (data.result) {
          this.entryInformation = data.result
        }
      })
    },
    /** 删除材料**/
    delDic (item) {
      let itemId = item.id
      if (itemId) {
        let delParams = {
          id: item.id,
          operator: getToken('loginId'),
          userId: item.userId
        }
        delEntryMaterial(delParams).then(data => {
          setTimeout(() => {
            this._getSysDic()
            this._getPersonalMaterial()
          }, 200)
        })
      } else {
        let dictId = item.dictId
        this.userOtherEntryInfoExtraList.forEach(item => {
          if (item.dictId === dictId) {
            this.userOtherEntryInfoExtraList.splice(this.userOtherEntryInfoExtraList.indexOf(item), 1)
          }
        })
        this.userEntryInfoExtraList.forEach(arr => {
          if (arr === dictId) {
            this.userEntryInfoExtraList.splice(this.userEntryInfoExtraList.indexOf(arr), 1)
          }
        })
        let newAllDicArr = this.allDicOptions
        console.log('newAll', this.allDicOptions)
        let emtpArr = []
        newAllDicArr.forEach(item => {
          if (item.dictId === dictId) {
            item.disabled = false
          }
          emtpArr.push(item)
        })
        this.allDicOptions = emtpArr
      }
    },
    /** 获取入职资料信息**/
    _getSysDic () {
      getSysDic('ENTRYINFOTYPE').then(data => {
        if (data.result) {
          /* 需提供 */
          this.newAllDicArr = []
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.newAllDicArr.push({
                id: '',
                dictId: Number(item.id),
                dictName: item.codeText,
                disabled: false,
                enable: item.enable
              })
            }
          })
        }
      })
    },

    /** 获取资料信息**/
    _getPersonalMaterial () {
      checkMaterial(this.$route.params.baseId).then(data => {
        setTimeout(() => {
          if (data.result) {
            this.ytgDatas = data.result
            // console.log('已提供1', this.ytgDatas)
            // console.log('需提供', this.newAllDicArr)
            let newDicIds = this.newAllDicArr.map(item => item.dicId)
            this.userOtherEntryInfoExtraList = []
            this.userEntryInfoExtraList = []
            this.userEntryInfoExtraList2 = []
            this.allDicOptions = []
            data.result.forEach(item => {
              if (newDicIds.indexOf(item.dicId) === -1 || item.enable === 2) {
                this.newAllDicArr.push({
                  id: item.id,
                  dictId: item.dictId,
                  dictName: item.dictName,
                  enable: item.enable,
                  disabled: true
                })
              }
              this.userEntryInfoExtraList.push(item.dictId)
              if (item.status === 1) {
                this.userEntryInfoExtraList2.push(item.dictId)
              }
              this.userOtherEntryInfoExtraList.push({
                id: item.id,
                dictId: item.dictId,
                dictName: item.dictName,
                userId: item.userId,
                enable: item.enable,
                disabled: item.enable === 2
              })
            })
            this.newAllDicArr.forEach(item => {
              if (this.userEntryInfoExtraList.indexOf(item.dictId) !== -1) {
                this.allDicOptions.push({
                  dictId: item.dictId,
                  id: item.id,
                  dictName: item.dictName,
                  userId: item.userId,
                  disabled: true
                })
              } else {
                this.allDicOptions.push({
                  dictId: item.dictId,
                  id: item.id,
                  dictName: item.dictName,
                  disabled: false,
                  userId: item.userId
                })
              }
            })
          } else {
            this.allDicOptions = this.newAllDicArr
          }
        }, 500)
      })
    },
    /** 劳动信息保存**/
    entrySave () {
      let getId = []
      this.userOtherEntryInfoExtraList.forEach(item => {
        if (this.userEntryInfoExtraList2.indexOf(item.dictId) !== -1) {
          getId.push({ dictId: item.dictId, userId: this.$route.params.baseId, operator: getToken('loginId'), status: 1, id: item.id })
        } else {
          getId.push({ dictId: item.dictId, userId: this.$route.params.baseId, operator: getToken('loginId'), status: 0, id: item.id })
        }
      })
      saveMeterial(getId).then(data => {
        this.$message.success('保存成功')
        this._getSysDic()
        this._getPersonalMaterial()
      })
    },
    /** 入职信息保存**/
    saveSalaryMsg () {
      this.getSalaryStructure()
      let salaryParams = {
        id: this.salaryId ? this.salaryId : '',
        operator: getToken('loginId'),
        formalSalary: this.salarySelectForm.firstSalaryName ? (this.formSalaryParams ? this.formSalaryParams : this.reportForm.formalSalary) : ' ',
        probationSalary: this.currentStatus === 13 ? this.salarySelectForm.firstSalaryName ? this.probaSalaryParams ? this.probaSalaryParams : this.reportForm.probationSalary : ' ' : this.reportForm.probationSalary,
        positiveTime: timeToString(this.changeToWorkForm.changeTime),
        userId: this.$route.params.baseId.toString(),
        graduationDate: timeToString(this.reportForm.graduationDate),
        probationBeginTime: timeToString(this.reportForm.probationBeginTime),
        probationEndTime: timeToString(this.reportForm.probationEndTime),
        exercitationBeginTime: timeToString(this.reportForm.exercitationBeginTime),
        exercitationEndTime: timeToString(this.reportForm.exercitationEndTime),
        exercitationSalary: this.reportForm.exercitationSalary,
        exercitationAllowance: this.reportForm.exercitationAllowance,
        salaryMonthInfo: {
          salary: '',
          expenditure: '',
          technicalAllowance: '',
          skillAllowance: '',
          ageAllowance: '',
          dutyAllowance: '',
          postAllowance: '',
          gradeAllowance: '',
          other1: '',
          other2: '',
          other3: ''
        }
      }
      saveSalarySetting(salaryParams).then(data => {
        this.$message.success('薪资保存成功')
        setTimeout(() => {
          this._getCheckDetail()
        }, 200)
      })
    }
  },
  filters: {
    returnFloat (value) {
      return returnFloat(value)
    },
    filterSex (sex) {
      return getSex(sex)
    },
    filterPoltic (poltic) {
      return getPoltic(poltic)
    },
    filterMarriage (marriage) {
      return getMarriage(marriage)
    },
    filterEducationWay (str) {
      return getEducationWay(str)
    },
    filterEdu (edu) {
      return getEdu(edu)
    },
    filterCertificateStatus (str) {
      return getCertificateStatus(str)
    },
    filterRelation (relation) {
      return getRelation(relation)
    },
    filternature (str) {
      return getfilternature(str)
    },
    filterInsuredInOld (str) {
      return getInsuredInOld(str)
    },
    filterRelieveStatus (str) {
      return getfilterRelieveStatus(str)
    },
    filterConctractWithOld (str) {
      return getConctractWithOld(str)
    },
    filterWorkStaue (str) {
      return getWorkStaue(str)
    },
    filterStatus (value) {
      value = value + ''
      let status = ''
      if (value === '5') {
        status = '已入职'
      } else if (value === '8') {
        status = '离职申请中'
      } else if (value === '9') {
        status = '离职办理中'
      } else if (value === '10') {
        status = '已离职'
      } else if (value === '11') {
        status = '调动中'
      } else if (value === '12') {
        status = '已调出'
      } else if (value === '13') {
        status = '试用'
      } else if (value === '14') {
        status = '实习'
      }
      return status
    }
  },
  created () {
    this._getSysDic()
    this._getUserInfo()
    this._getPersonalMaterial()
    this.$store.commit('SET_ACTIVE_ROUTER', '1')
  }
}
</script>
<style scoped lang="less">
 .el-checkbox+.el-checkbox{
    margin-left:0px!important;
  }
  .el-checkbox{ width: 16%;}
  .el-form-item.mustForm{
    position: relative;
  }
  .abs-but{
    width:100px;
    height:36px;
    position:absolute;
    left:50%;
    bottom: 0px;
    transform: translateX(-50%);
  }
  .try-salary-text{
    font-size:14px;
    margin-left:15px;
  }
  .try-f-left{
    float:left;
  }
  .try-r-left{
    float: left;
    margin-left:10px;
    max-width:200px;
  }
  .salary-div{
    span{
      font-size:14px;
      margin:0px 2px;
    }
  }
.status-ul{
    li{
      float: left;
      margin-right:20px;
      position: relative;
    &.active{
      &::after{
      content: '';
      position: absolute;
      bottom:-4px;
      left:0px;
      width:100%;
      height:2px;
      background:red;
     }
   }
  }
}
.cur-status-div{
  span{
    color:#009688;
    font-size:14px;
  }
}
.price-title{
  font-size:13px;
  color:#009688;
}
.price-text{
  font-size:13px;
  color:#333;
  margin-left:10px;
}
.tryDate-p{
  font-size:14px;
  color:#009688;
}
.el-tag-check{
  margin: 5px;
  .el-checkbox__label{
    color:#fff;
  }
}
</style>
