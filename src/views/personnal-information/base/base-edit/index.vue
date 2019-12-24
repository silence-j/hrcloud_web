<template>
<div class="container">
  <el-row class="mt-20">
    <ul class="tab-bar-ul clearfix">
      <li><el-button type="primary" size="small" @click="goBack">返  回</el-button></li>
    </ul>
  </el-row>

  <el-row class="mt-20">
    <el-col :span="24">
      <div class="tab-wrap clearfix">
        <ul class="edit-tab clearfix">
          <li @click="skipLabor">
            <a :class="{'router-link-active': activeRouter == '1'}">劳动人事信息</a>
          </li>
          <li @click="skipPersonnal" >
            <a :class="{'router-link-active': activeRouter == '2'}">个人档案</a>
          </li>
          <li @click="skipReport" >
            <a :class="{'router-link-active': activeRouter == '3'}">操作记录</a>
          </li>
          <li @click="skipChange" >
            <a :class="{'router-link-active': activeRouter == '4'}">变动记录</a>
          </li>
          <li @click="skipJob" >
            <a :class="{'router-link-active': activeRouter == '5'}">职务信息</a>
          </li>
          <li @click="skipContract" >
            <a :class="{'router-link-active': activeRouter == '6'}">劳动合同</a>
          </li>
          <li @click="skipSocial" >
            <a :class="{'router-link-active': activeRouter == '7'}">社保管理</a>
          </li>
          <li @click="skipFunds" >
            <a :class="{'router-link-active': activeRouter == '8'}">公积金管理</a>
          </li>
          <li @click="skipSalary" >
            <a :class="{'router-link-active': activeRouter == '9'}">薪酬管理</a>
          </li>
          <li @click="skipRemark" >
            <a :class="{'router-link-active': activeRouter == '10'}">备 注</a>
          </li>
        </ul>
      </div>
    </el-col>
  </el-row>

  <router-view></router-view>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      'activeRouter': 'getActiveRouter'
    })
  },
  methods: {
    goBack () {
      this.$router.replace('/personnel-information/base')
    },
    skipLabor () {
      this.$router.push({ name: 'BaseEditLabor',
        params: {
          baseId: this.$route.params.baseId,
          status: this.$route.params.status
        } })
    },
    skipPersonnal () {
      this.$router.push({ name: 'BaseEditPersonnal',
        params: {
          baseId: this.$route.params.baseId,
          status: this.$route.params.status
        } })
    },
    skipReport () {
      this.$router.push({ name: 'BaseEditReport',
        params: {
          baseId: this.$route.params.baseId,
          status: this.$route.params.status
        } })
    },
    skipJob () {
      this.$router.push({ name: 'BaseEditJob',
        params: {
          baseId: this.$route.params.baseId,
          status: this.$route.params.status
        } })
    },
    skipChange () {
      this.$router.push({ name: 'BaseEditChange',
        params: {
          baseId: this.$route.params.baseId,
          status: this.$route.params.status
        } })
    },
    skipContract () {
      this.$router.push({ name: 'BaseEditContract',
        params: {
          baseId: this.$route.params.baseId,
          status: this.$route.params.status
        } })
    },
    skipSocial () {
      this.$router.push({ name: 'BaseEditSocial',
        params: {
          baseId: this.$route.params.baseId,
          status: this.$route.params.status
        } })
    },
    skipFunds () {
      this.$router.push({ name: 'BaseEditFunds',
        params: {
          baseId: this.$route.params.baseId,
          status: this.$route.params.status
        } })
    },
    skipSalary () {
      this.$router.push({ name: 'BaseEditSalary',
        params: {
          baseId: this.$route.params.baseId,
          status: this.$route.params.status
        } })
    },
    skipRemark () {
      this.$router.push({ name: 'BaseEditRemark',
        params: {
          baseId: this.$route.params.baseId,
          status: this.$route.params.status
        } })
    }
  }
}
</script>
