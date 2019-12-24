<template>
  <div class="container">
     <el-form :model="contractForm">
       <div class="search-form_box clearfix">
         <div class="search-form_item">
           <el-input v-model="contractForm.keyword" placeholder="请输入姓名/身份证号" @keyup.enter.native="searchContractList"></el-input>
         </div>
         <div class="search-form_item start-line">
           <el-date-picker
             v-model="contractForm.startTime"
             type="date"
             placeholder="创建开始时间">
           </el-date-picker>
         </div>
         <div class="search-form_item">
           <el-date-picker
             v-model="contractForm.endTime"
             type="date"
             :picker-options="pickerOptions"
             placeholder="创建结束时间">
           </el-date-picker>
         </div>
         <div class="search-form_button pt-3">
           <el-button type="primary" size="small" @click="searchContractList">查询</el-button>
         </div>
       </div>
      </el-form>
     <el-row class="mt-20">
     <el-col :span="24">
      <div class="tab-wrap clearfix">
        <ul class="edit-tab clearfix">
          <li @click="emptyClearMsg" v-show="permission.indexOf('合同变更我发起的') !=-1">
             <router-link :to="'/verify/contract/changeContract'">合同变更</router-link>
          </li>
          <li @click="emptyClearMsg" v-show="permission.indexOf('合同解除我发起的') !=-1">
            <router-link :to="'/verify/contract/moveContract'">合同解除</router-link>
          </li>
          <li @click="emptyClearMsg" v-show="permission.indexOf('合同作废我发起的') !=-1">
            <router-link :to="'/verify/contract/cancelContract'">作废</router-link>
          </li>
        </ul>
      </div>
    </el-col>
  </el-row>
      <router-view></router-view>
    </div>
</template>
<script>
import { getExmine } from 'assets/js/exmine'
export default {
  data () {
    return {
      contractForm: {
        keyword: '',
        startTime: '',
        endTime: ''
      }
    }
  },
  computed: {
    pickerOptions () {
      return {
        disabledDate: (time) => {
          return new Date(time).getTime() < new Date(this.contractForm.startTime).getTime()
        }
      }
    },
    permission () {
      return getExmine().verifyContract
    }
  },
  methods: {
    setSerchList (boolean) {
      this.$store.dispatch('setVerifyContractSearch', this.contractForm)
      this.$store.commit('SET_VERIFYCONTRACT_CLICKED', boolean)
    },
    searchContractList () {
      this.setSerchList(true)
    },
    emptyClearMsg () {
      this.contractForm.keyword = ''
      this.contractForm.startTime = ''
      this.contractForm.endTime = ''
      this.setSerchList(false)
    }
  },
  filters: {},
  created () {
    this.setSerchList(false)
  }
}
</script>

<style scoped lang="less">
  .el-select{width: 100%}
</style>
