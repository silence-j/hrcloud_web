<template>
<div class="transfer-box">
   <div class="search-form_box clearfix mt-20">
         <div class="search-form_item">
          <el-input @keyup.enter.native="searchLeaveList" v-model="transferForm.keyword" placeholder="请输入姓名/身份证号"></el-input>
        </div>
          <div class="search-form_item start-line">
          <el-date-picker
            v-model="transferForm.startTime"
            type="date"
            clearable
            placeholder="开始时间">
          </el-date-picker>
        </div>
         <div class="search-form_item">
          <el-date-picker
            v-model="transferForm.endTime"
            type="date"
            clearable
             :picker-options="pickerOptions"
            placeholder="结束时间">
          </el-date-picker>
        </div>
        <div class="search-form_button pt-3">
          <el-button type="primary" size="mini" @click="searchLeaveList">查询</el-button>
        </div>
     </div>
     <div class="search-form_box clearfix mt-20">
        <div class="search-form_item">
         <el-select :value="getMarketVerifyTransferRouteSelects"
         @change="changeRouteSelectValue">
            <el-option label="市场总部间" value="1"></el-option>
            <el-option label="市场总部-外部" value="2"></el-option>
            <el-option label="外部-市场总部" value="3"></el-option>
         </el-select>
        </div>
     </div>
     <div class="mt-20">
      <router-view/>
     </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      transferForm: {
        routeSelects: '2',
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
          return new Date(time).getTime() < new Date(this.transferForm.startTime).getTime()
        }
      }
    },
    ...mapGetters(['getMarketVerifyTransferRouteSelects', 'getClearTransferSearch'])
  },
  watch: {
    getMarketVerifyTransferRouteSelects (value) {
      this.transferForm.routeSelects = value
    },
    getClearTransferSearch (value) {
      if (value) {
        this.transferForm.keyword = ''
        this.transferForm.startTime = ''
        this.transferForm.endTime = ''
        this.setSearchList(false)
        this.$store.commit('SET_CLEAR_TRANSFERSEARCH', false)
      }
    }
  },
  methods: {
    setSearchList (boolean) {
      this.$store.dispatch('setMarketVerifyTransferSearch', this.transferForm)
      this.$store.commit('SET_MARKETVERIFYTRANSFER_CLICKED', boolean)
    },
    searchLeaveList () {
      this.setSearchList(true)
    },
    changeRouteSelectValue (value) {
      this.$store.commit('SET_MARKETVERIFYTRANSFER_ROUTESELECTS', value)
      this.$store.commit('SET_CLEAR_TRANSFERSEARCH', true)
      if (value === '1') {
        this.$router.push('/market-verify/transfer/come-in')
      } else if (value === '2') {
        this.$router.push('/market-verify/transfer/come-out')
      } else if (value === '3') {
        this.$router.push('/market-verify/transfer/head-sure')
      }
    }
  },
  created () {
    this.setSearchList(false)
  }
}
</script>
