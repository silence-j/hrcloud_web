<template>
  <div class="container">
    <el-form>
      <el-row :gutter="24"  type="flex">
        <el-col :span='8'>
          <el-input v-model="socialForm.keyword" placeholder="输入关键词" @keyup.enter.native="searchSocialList"></el-input>
        </el-col>
        <el-col :span='8' v-if="getSocialAllSelect">
          <el-select v-model="socialForm.status" clearable placeholder="状态">
            <el-option
              v-for="item in socialStatue"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span='8'>
        <el-select  v-model="socialForm.nature" clearable placeholder="户籍性质">
          <el-option
            v-for="item in natureStatue"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col class="pt-3">
        <el-button type="primary" size="small" @click="searchSocialList">查询</el-button>
      <!--  <el-button size="mini" @click="deepLevelAcceptSearch.deepLevelSearchVisible = true">高级查询</el-button> -->
        <el-button size="mini" @click="chooseData.deepSearchVisible = true">高级查询</el-button>
      </el-col>
    </el-row>
  </el-form>
  <br/>
  <el-button type="primary" size="small"  v-show="permission.indexOf('标准调整') !=-1" @click="StandardBtn">标准调整</el-button>
  <el-button type="primary" size="small"  v-show="permission.indexOf('导出') !=-1" @click="ExportSocialMsg" v-if="getSocialAllSelect">导 出</el-button>
  <br/>
  <el-row class="mt-20">
    <el-col :span="24">
      <div class="tab-wrap clearfix">
        <ul class="edit-tab clearfix">
          <li @click="socialMsg('waitSocial')">
            <router-link :to="'/personnel-information/social/waitSocial'">待参保</router-link>
          </li>
          <li @click="socialMsg('stopSocial')">
            <router-link :to="'/personnel-information/social/stopSocial'">待停保</router-link>
          </li>
          <li @click="socialMsg('allSocial')">
            <router-link :to="'/personnel-information/social/allSocial'">全部</router-link>
          </li>
        </ul>
      </div>
    </el-col>
  </el-row>
  <router-view></router-view>
  <!-- 导出列表 -->
  <form style="display:none" name="form" method="POST" ref="submitExcel" id="submitExcel" :action="hostBaseUrl+'/funds/insurance/exportInsur'">
    <p>nature: <input type="text" id="nature" name="nature" value="" /></p>
    <p>keyword: <input type="text" id="keyword" name="keyword" value="" /></p>
    <p>status: <input type="text" id="status" name="status" value="" /></p>
    <input type="submit" value="Submit"/>
  </form>
  <!--高级搜索和筛选字段的dialog-->
  <choose-column-search
  :chooseData="chooseData"
  @sureDeepSearch="sureDeepSearch"
  />
</div>
</template>
<script>
import { hostBaseUrl } from 'utils/config'
import { mapGetters } from 'vuex'
/* import {getToken} from 'assets/js/util' */
import { getExmine } from 'assets/js/exmine'
import ChooseColumnSearch from 'components/ChooseColumnSearch'
export default {
  data () {
    return {
      chooseData: {
        chooseVisible: false,
        deepSearchVisible: false,
        filedType: 'insurance',
        fieldList: [],
        selectedWordArr: [{ prop: '', op: '', value: '', width: '', searchFlag: '' }]
      },
      hostBaseUrl: '',
      socialForm: {
        keyword: '',
        status: '',
        nature: ''
      },
      socialStatue: [
        { value: 0, label: '不参保' },
        { value: 1, label: '待参保' },
        { value: 2, label: '参保中' },
        { value: 9, label: '已停保' }
      ],
      natureStatue: [
        { value: 1, label: '城镇' },
        { value: 2, label: '农村' }
      ]
    }
  },
  components: {
    ChooseColumnSearch
  },
  computed: {
    ...mapGetters(['getSocialSearchArr', 'getSocialClicked', 'getSocialAllSelect', 'getChooseFieldList', 'getChooseVis']),
    permission () {
      return getExmine().infoAllSocial
    }
  },
  methods: {
    // 选择带应聘职位
    _getUserFiled () {
      this.$store.commit('SET_CHOOSE_CHECK', true)
    },
    sureDeepSearch (deepSearchArr) {
      this.chooseData.deepSearchVisible = false
      this.setSerchList(true)
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
    StandardBtn () {
      this.$router.push({ path: '/personnel-information/social/standard' })
    },
    setSerchList (boolean) {
      this.$store.dispatch('setSocialSearch', this.socialForm)
      this.$store.commit('SET_SOCIAL_CLICKED', boolean)
    },
    searchSocialList () {
      this.setSerchList(true)
    },
    ExportSocialMsg () {
      document.getElementById('nature').setAttribute('value', this.getSocialSearchArr.nature ? this.getSocialSearchArr.nature : null)
      document.getElementById('keyword').setAttribute('value', this.getSocialSearchArr.keyword)
      document.getElementById('status').setAttribute('value', this.getSocialSearchArr.status ? this.getSocialSearchArr.status : null)
      /* console.log(document.getElementById('keyword').getAttribute('value'))
      console.log(this.$refs.submitExcel) */
      this.$refs.submitExcel.submit()
    },
    socialMsg (val) {
      this.socialForm.keyword = ''
      this.socialForm.status = ''
      this.socialForm.nature = ''
      this.setSerchList(false)
      if (val === 'allSocial') {
        this.$store.commit('SET_SOCIALL_SELECT', true)
      } else if (val === 'waitSocial') {
        this.$store.commit('SET_SOCIALL_SELECT', false)
      } else if (val === 'stopSocial') {
        this.$store.commit('SET_SOCIALL_SELECT', false)
      }
    },
    _jugeStatus () {
      if (this.$route.name === '全部社保') {
        this.$store.commit('SET_SOCIALL_SELECT', true)
      } else if (this.$route.name === '待参保') {
        this.$store.commit('SET_SOCIALL_SELECT', false)
      } else if (this.$route.name === '待停保') {
        this.$store.commit('SET_SOCIALL_SELECT', false)
      }
    }
  },
  watch: {
    getChooseVis (value) {
      if (value) {
        this.chooseData.chooseVisible = true
        this.chooseData.fieldList = this.getChooseFieldList
      }
      this.$store.commit('SET_CHOOSE_VIS', false)
    }
  },
  created () {
    this.hostBaseUrl = hostBaseUrl
    this._jugeStatus()
    this.setSerchList(false)
  }
}
</script>

<style>
.el-select{
  width:100%;
}
</style>
