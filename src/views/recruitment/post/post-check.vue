<template>
<div class="container">
  <p class="table-title">中财集团人力资源需求表</p>
  <div class="content-box">
    <el-form label-width="100px">
      <el-row align="center">
        <el-col :span="8">
          <el-form-item label="需求部门:">
            <span>{{postDetail.orgName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="需求岗位:" >
            <span>{{postDetail.postName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="需求人数:">
            <span>{{postDetail.needNumber}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="岗位类别:">
            <span>{{postDetail.postType}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="需求原因:">
            <span>{{postDetail.reasonForDemand}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工作地点:">
            <span>{{postDetail.areaName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="工资范围:">
            <span>{{postDetail.salaryRange}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="到岗时间:">
            <span>{{postDetail.arrivalTime}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联 络 人:">
            <span>{{postDetail.contactsName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="性    别:">
            <span>{{postDetail.sex}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="婚    否:">
            <span>{{postDetail.isMarried}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学    历:">
            <span>{{postDetail.edu}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="年    龄:">
            <span>{{postDetail.age}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="专    业:">
            <span>{{postDetail.major}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工    龄:">
            <span>{{postDetail.workingAge}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="身    高:">
            <span>{{postDetail.height}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="形    象:">
            <span>{{postDetail.personImage}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="外    语:">
            <span>{{postDetail.languageSkill}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="工作内容:">
            <span>{{postDetail.postContent}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="任职要求:">
            <span>{{postDetail.postRequirements}}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
  <el-row class="mt-20">
    <el-col :span="2" :offset="11"><el-button type="primary" size="mini" @click="goBack">返  回</el-button></el-col>
  </el-row>
</div>
</template>
<script>
import { checkPost } from 'static/api/recruit/post/post'
export default {
  data () {
    return {
      postDetail: ''
    }
  },
  methods: {
    goBack () {
      this.$router.replace('/recruitment/post')
    },
    _getPostDetail () {
      checkPost(this.$route.params.postId).then(data => {
        if (data.result) {
          this.postDetail = data.result
        }
      })
    }
  },
  created () {
    this._getPostDetail()
  }
}
</script>
<style lang="less" scoped>
 .content-box{
    width: 95%;
    margin: 0 auto;
    padding: 30px 0px 10px 11%;
    border: 1px solid #d8d8d8;
    box-sizing: border-box;
  }
</style>
