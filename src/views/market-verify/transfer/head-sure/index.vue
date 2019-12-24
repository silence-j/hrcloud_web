<template>
<div class="come-on_box">
<div class="tab-wrap mt-20">
      <ul class="edit-tab clearfix">
        <li @click="$store.commit('SET_CLEAR_TRANSFERSEARCH', true)">
          <router-link to="/market-verify/transfer/head-sure/owner">我发起的</router-link>
        </li>
         <li @click="$store.commit('SET_CLEAR_TRANSFERSEARCH', true)" v-show="getCurrentRoleGroups.indexOf('newChangeHr')!==-1">
          <router-link to="/market-verify/transfer/head-sure/head-outHr">新部门人事接收</router-link>
        </li>
         <li @click="$store.commit('SET_CLEAR_TRANSFERSEARCH', true)" v-show="getCurrentRoleGroups.indexOf('newChangeCEO')!==-1">
          <router-link to="/market-verify/transfer/head-sure/head-outCeo">新市场总部CEO（调入）</router-link>
        </li>
        <li @click="$store.commit('SET_CLEAR_TRANSFERSEARCH', true)" v-show="permission.indexOf('总部确认')!==-1">
          <router-link to="/market-verify/transfer/head-sure/head-outSure">总部确认</router-link>
        </li>
      </ul>
    </div>
     <div class="mt-20">
        <router-view/>
    </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getExmine } from 'assets/js/exmine'
export default {
  computed: {
    ...mapGetters(['getCurrentRoleGroups']),
    permission () {
      return getExmine().marketVerifyTransfer
    }
  }
}
</script>
