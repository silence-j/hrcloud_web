<template>
<div class="mt-20">
  <el-collapse v-model="activeNames">
    <el-collapse-item title="入职及劳动人事信息" name="1">
      <el-form  label-width="200px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="参加工作时间：">
              <span v-if="entryInformation.takejobDate">{{entryInformation.takejobDate}}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="本次入职时间：">
              <span v-if="entryInformation.entryDate">{{entryInformation.entryDate}}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item  label="任 职 部 门：">
              <span v-if="entryInformation.orgName">{{entryInformation.orgName}}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="岗    位：">
              <span v-if="entryInformation.postName">{{entryInformation.postName}}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="原单位是否已缴纳社保：" >
              <span v-if="entryInformation.insuredInOld!=null">{{entryInformation.insuredInOld | filterInsuredInOld}}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="entryInformation.insuredInOld == 1">
          <el-col :span="12">
            <el-form-item label="社保缴纳至:">
              <span>{{entryInformation.insuredOldMonth | formatMonth}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="社保缴纳地：">
              <span>{{entryInformation.insuredOldArea}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="原单位是否已缴纳公积金：" >
              <span v-if="entryInformation.fundedInOld!=null">{{entryInformation.fundedInOld | filterInsuredInOld }}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="entryInformation.fundedInOld == 1">
          <el-col :span="12">
            <el-form-item label="公积金缴纳至:">
              <span>{{entryInformation.fundedOldMonth | formatMonth}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公积金缴纳地：">
              <span>{{entryInformation.fundedOldArea}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否与原单位解除劳动合同:">
              <span v-if="entryInformation.cancelConctractWithOldText!=null">{{entryInformation.cancelConctractWithOldText}}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="户 籍 性 质：">
              {{entryInformation.nature | filternature}}
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>
    </el-collapse-item>

     <el-collapse-item title="材料附件" name="2">
      <p class="mean-title">需提供材料</p>
      <span v-if="fininshDicOptions.length>0">
        <dl class="dic-dl clearfix ml-30">
          <dd v-for="(item,index) in fininshDicOptions" :key="index">{{item.dictName}}</dd>
        </dl>
      </span>
      <span v-else class="color999" style="padding-left:30px;">未填写</span>
      <br/>
      <br/>
      <p class="mean-title">已提供材料</p>
      <span v-if="fininshDicOptions.length>0">
        <dl class="dic-dl clearfix ml-30">
          <dd v-for="(item,index) in fininshDicOptions" :key="index">
            <span v-if="item.status===1"> {{item.dictName}} </span>
          </dd>
        </dl>
      </span>
      <span v-else class="color999" style="padding-left:30px;">未填写</span>
    </el-collapse-item>

    <el-collapse-item title="入职类型及薪资信息" name="3">
      <p class="mean-title">入职类型</p>
      <el-form label-width="180px" class="ml-30">
        <el-row class="lt-20">
          <el-col :span="24" style="font-size:14px;">
            <span v-if="checkDetailDatas.candidateType === 1">社会人员</span>
            <span v-if="checkDetailDatas.candidateType === 2">在校生</span>
            <span v-if="checkDetailDatas.candidateType === 3">应届生</span>
            <span v-if="checkDetailDatas.candidateType === 4">退休人员</span>
          </el-col>
        </el-row>
        <el-row v-show="checkDetailDatas.candidateType == 2 ">
          <el-col :span="8">
            <el-form-item label="实习开始时间:">
              <span v-if="checkDetailDatas.exercitationBeginTime">{{checkDetailDatas.exercitationBeginTime}}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实习结束时间:" >
              <span v-if="checkDetailDatas.exercitationEndTime">{{checkDetailDatas.exercitationEndTime}}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="checkDetailDatas.candidateType == 2 ">
          <el-col :span="8">
            <el-form-item label="实习期工资:" >
              <span v-if="checkDetailDatas.exercitationSalary">{{checkDetailDatas.exercitationSalary}}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实习期津贴:" >
              <span v-if="checkDetailDatas.exercitationAllowance">{{checkDetailDatas.exercitationAllowance}}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" v-if="checkDetailDatas.noProbation!='1'">
            <el-form-item label="试用期开始时间:" >
              <span v-if="checkDetailDatas.probationBeginTime">{{checkDetailDatas.probationBeginTime}}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="checkDetailDatas.noProbation!='1'">
            <el-form-item label="试用期结束时间:" >
              <span v-if="checkDetailDatas.probationEndTime">{{checkDetailDatas.probationEndTime}}</span>
              <span v-else class="color999">未填写</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="mt-20">
          <el-col :span="6" v-if="checkDetailDatas.noProbation == '1'" class="ft14"><span>无试用期</span></el-col>
        </el-row>
      </el-form>
      <br/>
      <!--<div v-if="checkDetailDatas.candidateType === 2">-->
        <!--<div class="check-count">-->
           <!--<p class="mean-title">实习期工资标准</p>-->
          <!--<div class="ft14 ml-30">-->
            <!--<span v-if="checkDetailDatas.standard">{{checkDetailDatas.standard}}</span>-->
            <!--<span v-else class="color999">未填写</span>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <div>
       <div class="check-count">
        <p class="mean-title">转正后工资标准</p>
        <div class="ft14 ml-30">
          <span v-if="checkDetailDatas.formStandard">{{checkDetailDatas.formStandard}}</span>
          <span v-else class="color999">未填写</span>
        </div>
      </div>
      <br/>
      <div>
        <p class="mean-title">试用期工资标准</p>
        <div class="ft14 ml-30">
          <span v-if="checkDetailDatas.probationStandard">{{checkDetailDatas.probationStandard}}</span>
          <span v-else class="color999">未填写</span>
        </div>
      </div>
      </div>
    </el-collapse-item>
  </el-collapse>
</div>
</template>
<script>
import { getInsuredInOld, getfilterRelieveStatus, getfilternature } from 'assets/js/filters'
export default {
  data () {
    return {
      activeNames: ['1']
    }
  },
  props: {
    entryInformation: {
      type: Object
    },
    allDicOptions: {
      type: Array
    },
    fininshDicOptions: {
      type: Array
    },
    checkDetailDatas: {
      type: Object
    }
  },
  filters: {
    filterInsuredInOld (str) {
      return getInsuredInOld(str)
    },
    filterRelieveStatus (str) {
      return getfilterRelieveStatus(str)
    },
    filternature (str) {
      return getfilternature(str)
    }
  },
  created () {

  }
}
</script>
<style scoped lang="less">
  .infor-title{
    border-left: 4px solid #FF7500;
    padding-left: 10px;
    margin: 5px 0px 16px 16px;
    font-size: 14px;
    color: #48576a!important;
  }
  .dic-dl{
   dd{
     float: left;
     margin: 5px 20px;
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
</style>
