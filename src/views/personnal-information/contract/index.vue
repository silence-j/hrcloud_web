<template>
  <div class="container">
    <el-form :model="contractForm">
      <div class="search-form_box clearfix">
        <div class="search-form_item">
          <el-input v-model="contractForm.keyword" placeholder="输入关键词" @keyup.enter.native="searchList"></el-input>
        </div>
        <div class="search-form_item" v-if="this.$route.name === '劳动合同管理'">
          <el-date-picker
            v-model="contractForm.endDate"
            type="date"
            clearable
            placeholder="合同结束时间">
          </el-date-picker>
        </div>
        <div class="search-form_item" v-if="getContractAllSelect">
          <el-select v-model="contractForm.status" clearable placeholder="请选择">
            <el-option
              v-for="item in statueSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-form_button pt-3">
          <el-button type="primary" size="small" @click="searchList">查询</el-button>
         <el-button size="mini" @click="deepLevelAcceptSearch.deepLevelSearchVisible = true">高级查询</el-button>
         <i class="el-icon-refresh ml-15" @click="refresh" title="重置搜索条件"/>
        </div>
      </div>
    </el-form>
    <el-row class="mt-20">
      <el-col :span="24">
        <div class="tab-wrap clearfix">
          <ul class="edit-tab clearfix">
            <li v-show="permission.indexOf('劳动合同列表') !=-1" @click="emptyClearMsg('contract')">
              <router-link :to="'/personnel-information/contract/contract'">劳动合同管理</router-link>
            </li>
            <li v-show="permission.indexOf('就业协议列表') !=-1" @click="emptyClearMsg('WorkAgreement')">
              <router-link :to="'/personnel-information/contract/employment'">就业协议管理</router-link>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <router-view></router-view>
    <!--高级查询-->
    <deep-level-search
      :deepLevelSearchObject="deepLevelAcceptSearch"
      @sureDeepSearch="sureDeepSearch"
      ref="deepSearchRef"
      v-draggable />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getExmine } from 'assets/js/exmine'
import DeepLevelSearch from '@/components/DeepLevelSearch.vue'
const contractForm = {
  keyword: '',
  status: '',
  endDate: ''
}
export default {
  data () {
    return {
      deepLevelAcceptSearch: {
        deepLevelSearchVisible: false,
        selectType: 'contract'
      },
      contractForm: Object.assign({}, contractForm),
      selectType1: 'contract',
      selectType2: 'WorkAgreement',
      statueSelect1: [
        { value: 1, label: '已签订' },
        { value: 2, label: '不签订' },
        { value: 3, label: '已解除' },
        /* {value: 4, label: '待解除'}, */
        { value: 5, label: '已报到' },
        { value: 6, label: '待签订' }
      ],
      statueSelect2: [
        { value: 1, label: '待签订' },
        { value: 2, label: '办理中' },
        { value: 3, label: '履行中' },
        { value: 4, label: '已到期' },
        { value: 5, label: '已解除' },
        { value: 6, label: '待履行' },
        { value: 7, label: '解除中' },
        { value: 8, label: '变更中' },
        { value: 9, label: '作废中' },
        { value: 10, label: '已作废' },
        { value: 11, label: '不签订' }
      ]
    }
  },
  computed: {
    ...mapGetters(['getContractAllSelect']),
    statueSelect () {
      return this.$route.name === '就业协议管理' ? this.statueSelect1 : this.statueSelect2
    },
    permission () {
      return getExmine().infoContract
    },
    currentRouteName () {
      return this.$route.name
    }
  },
  components: {
    DeepLevelSearch
  },
  watch: {
    getContractAllSelect (value) {
      /* console.log('value123', value) */
    }
  },
  methods: {
    refresh () {
      this.contractForm = Object.assign({}, contractForm)
      if (this.$refs.deepSearchRef) {
        this.$refs.deepSearchRef.selectedWordArr = [{ prop: '', op: '', value: '', width: '', searchFlag: '', orderColumn: '' }]
        this.$store.commit('SET_DEEP_SEARCH_OPTIONS', [])
      }
      this._setDefaultLocalData()
      this.searchList(true)
    },
    sureDeepSearch (deepSearchArr) {
      this.deepLevelAcceptSearch.deepLevelSearchVisible = false
      let options = []
      deepSearchArr.forEach(item => {
        if (item.width) {
          options.push({
            field: item.width,
            op: item.op,
            value: item.value,
            searchFlag: item.searchFlag
          })
        }
      })
      this.options = options
      this.$store.commit('SET_DEEP_SEARCH_OPTIONS', options)
    },
    setSerchList (boolean) {
      this.$store.dispatch('setContractSearch', this.contractForm)
      this.$store.commit('SET_CONTRACT_CLICKED', boolean)
    },
    /* 搜索 */
    searchList () {
      this.$bus.$emit('contractSearch', this.contractForm, true)
    },
    /* 切换清空数据 */
    emptyClearMsg (str) {
      this.contractForm.keyword = ''
      this.contractForm.status = ''
      this.contractForm.endDate = ''
      this.setSerchList(false)
      this.deepLevelAcceptSearch.selectType = str
      this.$store.commit('SET_CONTRACT_ALL_SELECT', false)
      this.$bus.$off('contractSearch')
    },
    _setDefaultLocalData () {
      const searchParams = Object.assign({}, this.contractForm)
      const searchParamsForm = Object.assign({}, { searchForm: JSON.stringify(searchParams) })
      this.setSearchParams(searchParamsForm, this.currentRouteName)
    },
    // 设置默认搜索项
    _setDefaultSearch () {
      const searchParams = this.getSearchParams({}, this.$route.name)
      const { searchForm } = searchParams
      const postParams = searchForm ? JSON.parse(searchForm) : Object.assign({}, contractForm)
      this.contractForm = postParams
      setTimeout(() => {
        this.searchList()
      }, 200)
    }
  },
  beforeRouteLeave (to, from, next) {
    this._setDefaultLocalData()
    next()
  },
  created () {
    this.setSerchList(false)
    this._setDefaultSearch()
    if (this.$store.state.clickType === 'left') {
      this.refresh()
    }
  }
}
</script>
