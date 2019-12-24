<template>
<div class="container">
     <el-row class="mt-20">
         <el-button type="primary" size="small" @click="$router.push({name:$route.query.come, query:{type: 'look'}})">返  回</el-button>
         <el-button type="primary" size="small" @click="goTo('PersonnalBaseUpdate', $route.params)" v-if="isUseUpdate">更  新</el-button>
         <el-button type="primary" size="small" @click="goTo('PersonnalBaseCorrections', $route.params)" v-if="isUseUpdate">更  正</el-button>
    </el-row>
    <el-row class="mt-20">
    <el-col :span="24">
      <div class="tab-wrap clearfix">
        <ul class="edit-tab clearfix">
          <li @click="skipPersonnal" >
            <a :class="{'router-link-active': activeRouter == '2'}">个人档案</a>
          </li>
          <li @click="skipLabor">
            <a :class="{'router-link-active': activeRouter == '1'}">劳动人事信息</a>
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
    return {
    }
  },
  computed: {
    isUseUpdate () {
      return ['5', '7', '13', '14', '16'].indexOf(`${this.$route.params.status}`) !== -1
    },
    ...mapGetters({
      'activeRouter': 'getActiveRouter'
    })
  },
  methods: {
    goTo (name, params) {
      const { baseId: id, status } = params
      const routeParams = {
        name,
        params: {
          id,
          status
        },
        query: {
          key: 'first',
          come: this.$route.query.come
        }
      }
      this.$router.push(routeParams)
    },
    skipLabor () {
      this.$router.push({ name: 'BaseLabor',
        params: {
          baseId: this.$route.params.baseId,
          status: this.$route.params.status
        },
        query: {
          come: this.$route.query.come
        } })
    },
    skipPersonnal () {
      this.$router.push({ name: '员工基本信息劳动个人档案',
        params: {
          baseId: this.$route.params.baseId,
          status: this.$route.params.status
        },
        query: {
          come: this.$route.query.come
        } })
    },
    skipReport () {
      this.$router.push({ name: '员工基本信息操作记录',
        params: {
          baseId: this.$route.params.baseId,
          status: this.$route.params.status
        },
        query: {
          come: this.$route.query.come
        } })
    },
    skipJob () {
      this.$router.push({ name: '员工基本信息职务信息',
        params: {
          baseId: this.$route.params.baseId,
          status: this.$route.params.status
        },
        query: {
          come: this.$route.query.come
        } })
    },
    skipChange () {
      this.$router.push({ name: '员工基本信息变动记录',
        params: {
          baseId: this.$route.params.baseId,
          status: this.$route.params.status
        },
        query: {
          come: this.$route.query.come
        } })
    },
    skipContract () {
      this.$router.push({ name: '员工基本信息劳动',
        params: {
          baseId: this.$route.params.baseId,
          status: this.$route.params.status
        },
        query: {
          come: this.$route.query.come
        }
      })
    },
    skipSocial () {
      this.$router.push({ name: '员工基本信息社保参保',
        params: {
          baseId: this.$route.params.baseId,
          status: this.$route.params.status
        },
        query: {
          come: this.$route.query.come
        } })
    },
    skipFunds () {
      this.$router.push({ name: '员工基本信息公积金',
        params: {
          baseId: this.$route.params.baseId,
          status: this.$route.params.status
        },
        query: {
          come: this.$route.query.come
        } })
    },
    skipSalary () {
      this.$router.push({ name: '员工基本信息薪酬',
        params: {
          baseId: this.$route.params.baseId,
          status: this.$route.params.status
        },
        query: {
          come: this.$route.query.come
        } })
    },
    skipRemark () {
      this.$router.push({ name: '员工基本信息备注',
        params: {
          baseId: this.$route.params.baseId,
          status: this.$route.params.status
        },
        query: {
          come: this.$route.query.come
        } })
    }
  },
  /* watch: {
    activeRouter (val) {
      console.log(val)
    }
  }, */
  created () {
  }
}
</script>
