<template>
<div class="mt-20">
  <el-collapse v-model="activeNames" accordion>
    <!-- 劳动人事信息 -->
    <el-collapse-item title="劳动人事信息" name="1">
      <!--<template slot="title">
        劳动人事信息 <span class="collapse-down">[展开]</span><span class="collapse-up">[收起]</span>
      </template>-->
      <el-form  label-width="135px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="参加工作时间：">
              <span>{{entryInformation.takejobDate}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本次入职时间：">
              <span>{{entryInformation.entryDate}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任职部门：">
              <span>{{entryInformation.orgName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="岗　 位：">
              <span>{{entryInformation.postName}}</span>
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
                <span>{{entryInformation.insuredOldMonth | formatMonth}}</span>
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
                <span>{{entryInformation.fundedOldMonth | formatMonth}}</span>
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
      <p class="mean-title">需提供材料</p>
      <dl class="dic-dl clearfix">
        <dd v-for="item in allDicOptions" :key="item.id">
          {{item.dictName}}
        </dd>
      </dl>
      <br/>
      <p class="mean-title">已提供材料</p>
      <dl class="dic-dl clearfix">
        <dd v-for="(item,index) in fininshDicOptions" :key="index">
          {{item.dictName}}
        </dd>
      </dl>
    </el-collapse-item>
  </el-collapse>
</div>
</template>
<script>
import { getInsuredInOld } from 'assets/js/filters'
import { getUserInfoDetail } from 'static/api/recruit/entry/entry'
import { checkMaterial } from 'static/api/common/common'
export default {
  data () {
    return {
      activeNames: '1',
      /** 入职信息**/
      entryInformation: [],
      /** 材料信息**/
      allDicOptions: [],
      fininshDicOptions: [],
      currentStatus: '',
      curStatusDatas: [],
      personStatusDatas: [],
      reportForm: {
        graduationDate: '',
        probationBeginTime: '',
        probationEndTime: '',
        formalSalary: '',
        probationSalary: '',
        salaryType: 0,
        exercitationAllowance: '',
        exercitationBeginTime: '',
        exercitationEndTime: '',
        exercitationSalary: '',
        positiveTime: '',
        workAgreement: ''
      }
    }
  },
  methods: {
    /** 查看劳动信息**/
    _getUserInfo () {
      getUserInfoDetail(this.$route.params.baseId).then((data) => {
        if (data.result) {
          this.entryInformation = data.result
        }
      })
    },
    /** 获取已提交的入职材料**/
    _getFininshMaterial () {
      let userId = this.$route.params.baseId
      checkMaterial(userId).then(data => {
        if (data.result) {
          this.allDicOptions = data.result
          data.result.forEach(item => {
            if (item.status === 1) {
              this.fininshDicOptions.push(item)
            }
          })
        }
      })
    }
  },
  filters: {
    filterInsuredInOld (str) {
      return getInsuredInOld(str)
    }
  },
  created () {
    this._getFininshMaterial()
    this._getUserInfo()
    this.$store.commit('SET_ACTIVE_ROUTER', '1')
  }
}
</script>
<style scoped lang="less">
  .el-checkbox{
      width: 15%;
      margin-left: 0px!important;
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
.dic-dl{
   dd{
     float: left;
     margin: 5px;
    &.active{
      position: relative;
     &::after{
       content: '';
       position:absolute;
       height: 2px;
       width:100%;
       background:red;
       bottom:0px;
       left:0px;
     }
    }
   }
  }
 .tryDate-p{
  font-size:14px;
  color:#009688;
 }
</style>
