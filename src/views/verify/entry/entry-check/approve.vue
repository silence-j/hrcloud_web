<template>
  <div class="mt-20 approve-box">
    <div v-if="$route.params.backReason && $route.params.backReason!='null' " style="margin-bottom:20px">
      <div class="ft16" style="color:#009688">被驳回</div>
      <div class="mt-10">{{$route.params.backReason.split(' ')[0]}}</div>
      <div class="mt-10">{{$route.params.backReason.split(' ')[1]}}</div>
    </div>
    <div v-else>
      <p class="mean-title ft14">入职类型</p>
      <el-form label-width="180px" class="ml-30 mt-10">
        <el-row class="lt-20">
          <el-col :span="24" style="font-size:14px;">
            <span v-if="checkDetailDatas.candidateType === 1">社会人员</span>
            <span v-if="checkDetailDatas.candidateType === 2">在校生</span>
            <span v-if="checkDetailDatas.candidateType === 3">应届生</span>
            <span v-if="checkDetailDatas.candidateType === 4">退休人员</span>
          </el-col>
        </el-row>
        <el-row v-show="checkDetailDatas.preEntryDate">
          <el-form-item label="拟报到时间：">
          {{checkDetailDatas.preEntryDate}}
          </el-form-item>
        </el-row>
        <el-row v-show="checkDetailDatas.candidateType == 2 ">
          <el-col :span="12"><el-form-item label="实习开始时间:">{{checkDetailDatas.exercitationBeginTime}}</el-form-item></el-col>
          <el-col :span="12"><el-form-item label="实习结束时间:" >{{checkDetailDatas.exercitationEndTime}}</el-form-item></el-col>
        </el-row>
        <el-row v-show="checkDetailDatas.candidateType == 2 ">
          <el-col :span="12"><el-form-item label="实习期工资:" >{{exercitationSalary}}</el-form-item></el-col>
          <el-col :span="12"><el-form-item label="实习期津贴:" >{{exercitationAllowance}}</el-form-item></el-col>
        </el-row>
        <el-row>
          <el-col :span="12" v-if="checkDetailDatas.noProbation!='1'"><el-form-item label="试用期开始时间:" ><span>{{checkDetailDatas.probationBeginTime}}</span></el-form-item></el-col>
          <el-col :span="12" v-if="checkDetailDatas.noProbation!='1'"><el-form-item label="试用期结束时间:" ><span>{{checkDetailDatas.probationEndTime}}</span></el-form-item></el-col>
        </el-row>
        <el-row class="mt-10">
          <el-col :span="12" v-if="checkDetailDatas.noProbation == '1'" class="ft14"><span>无试用期</span></el-col>
        </el-row>
      </el-form>
      </div>
      <!--<div v-if="checkDetailDatas.candidateType === 2">-->
        <!--<div class="check-count">-->
           <!--<p class="mean-title ft14">实习期工资标准</p>-->
          <!--<div class="ft14 ml-30 mt-10">-->
            <!--<span v-if="formalSalaryStr">{{formalSalaryStr}}</span>-->
            <!--<span v-else class="color999">未填写</span>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <div>
       <div class="check-count mt-20">
        <p class="mean-title ft14">转正后工资标准</p>
        <div class="ft14 ml-30 mt-10">
          <span v-if="formalSalaryStr">{{formalSalaryStr}}</span>
          <span v-else class="color999">未填写</span>
        </div>
      </div>
      <br/>
      <div class="mt-20">
        <p class="mean-title ft14">试用期工资标准</p>
        <div class="ft14 ml-30 mt-10">
          <span v-if="probationSalaryStr">{{probationSalaryStr}}</span>
          <span v-else class="color999">未填写</span>
        </div>
      </div>
      </div>
   </div>
</template>

<script>
import { checkDetail } from 'static/api/recruit/entry/entry'
import { getSalaryDeatil } from 'static/api/setting/index'
export default {
  data () {
    return {
      checkDetailDatas: {},
      formalSalaryStr: '',
      probationSalaryStr: '',
      exercitationSalary: '',
      exercitationAllowance: ''
    }
  },
  methods: {
    // 查询薪资
    _getSalaryDetail () {
      let userId = Number(this.$route.params.employeeId)
      checkDetail(userId).then(data => {
        if (data.result) {
          this.checkDetailDatas = data.result
        }
      })
      let detailParms
      let comeRouter = this.$route.query.come
      if (comeRouter === 'hasRealityEndTime') {
        detailParms = {
          userId
        }
      } else {
        detailParms = {
          userId,
          deleteTag: 5
        }
      }
      getSalaryDeatil(detailParms).then(data => {
        this.probationSalaryStr = data.result.probationStandard
        this.formalSalaryStr = data.result.formStandard
        this.exercitationSalary = data.result.exercitationSalary
        this.exercitationAllowance = data.result.exercitationAllowance
      })
    }
    // 薪资详情
  },
  created () {
    this.$store.commit('SET_ACTIVE_ROUTER', false)
    this._getSalaryDetail()
  }
}
</script>

<style lang="less" scoped>
.approve-box{
  .el-row{
    width:700px;
  }
}
.mean-title{
  &&:after{
    top:0px;
  }
}
.el-select{
    width:100%;
  }
  .title-span{
    color:#009688;
    margin-right:10px;
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
  .infor-title{
    border-left:4px solid #FF7500 ;
    padding-left: 12px;
    margin:15px 0px 1% 0%;
    font-size: 14px
  }
  .el-form-item{
    margin-bottom: 10px
  }
  .salary-form .el-col{
    margin-right:15px;
  }
  .el-select{width: 100%!important;}
  .salary-div{
    margin: 10px 0px;
    span{
      font-size:14px;
      margin:0px 10px;
    }
  }
  .salary-txt{
    line-height:32px;
  }
</style>
