<template>
<div class="container" @click="mutilTreeData.showTree=false">
    <el-form :model="meansForm">
      <div class="search-form_box clearfix">
        <div class="search-form_item">
          <mutil-search-dept-tree
          :mutilTreeData="mutilTreeData"
          ref="deptTree"
          />
        </div>

        <div class="search-form_item start-line">
          <el-date-picker
            v-model="meansForm.startTime"
            type="date"
            clearable
            placeholder="开始时间">
          </el-date-picker>
        </div>
        <div class="search-form_item">
          <el-date-picker
            v-model="meansForm.endTime"
            type="date"
            clearable
            :picker-options="pickerOptions"
            placeholder="结束时间">
          </el-date-picker>
        </div>
        <div class="search-form_button pt-3">
          <el-button type="primary" size="small" @click="searchList">查询</el-button>
           <i class="el-icon-refresh ml-15" @click="refresh" title="重置搜索条件"/>
        </div>
      </div>
    </el-form>
    <el-row class="mt-20">
    <el-col :span="24">
      <div class="tab-wrap clearfix">
        <ul class="edit-tab clearfix">
          <li @click="emptyClearMsg('transfer')">
            <router-link :to="'/recruitment/means/transfer'">资料移交</router-link>
          </li>
          <li @click="emptyClearMsg('receive')">
            <router-link :to="'/recruitment/means/receive'">资料接收</router-link>
          </li>
        </ul>
      </div>
    </el-col>
  </el-row>
    <router-view></router-view>
</div>
</template>
<script>
/* import MutilSearchTree from 'components/MutilSearchTree' */
import { mapMutations } from 'vuex'
import MutilSearchDeptTree from 'components/MutilSearchDeptTree'
const meansForm = {
  keyWords: '',
  startTime: '',
  endTime: '',
  orgName: '',
  orgId: '',
  orgIds: []
}
export default {
  data () {
    return {
      showTreeTag: false,
      mutilTreeData: {
        filterName: '',
        orgIds: [],
        dataTree: [],
        checkDatas: [],
        showTree: false
      },
      meansForm: Object.assign({}, meansForm)
    }
  },
  computed: {
    pickerOptions () {
      return {
        disabledDate: (time) => {
          return new Date(time).getTime() < new Date(this.meansForm.startTime).getTime()
        }
      }
    },
    currentRouteName () {
      return this.$route.name
    }
  },
  methods: {
    ...mapMutations({
      geMeansKeyWords: 'SET_MEANS_KEYWORDS',
      getMeansStartTime: 'SET_MEANS_STARTTIME',
      getMeansEndTime: 'SET_MEANS_ENDTIME',
      getMeansOrg: 'SET_MEANS_ORG',
      getMeansClicked: 'SET_MEANS_CLICKED'
    }),
    refresh () {
      this.meansForm = Object.assign({}, meansForm)
      this.mutilTreeData.orgIds = []
      setTimeout(() => {
        this.$refs['deptTree']._setCheckedKeys([])
        this.searchList()
        this._setDefaultLocalData()
      }, 100)
    },
    searchList () {
      this.setSerchList(true)
    },
    setSerchList (boolean) {
      this.geMeansKeyWords(this.meansForm.keyWords)
      this.getMeansStartTime(this.meansForm.startTime)
      this.getMeansEndTime(this.meansForm.endTime)
      /* this.getMeansOrg(this.meansForm.orgName) */
      this.getMeansOrg(this.mutilTreeData.orgIds)
      this.getMeansClicked(boolean)
    },
    emptyClearMsg () {
      this.meansForm.keyWords = ''
      this.meansForm.startTime = ''
      this.meansForm.endTime = ''
      this.getMeansOrg()
      setTimeout(() => {
        this.$refs.deptTree.clearSelectTree()
      })
    },
    _setDefaultLocalData () {
      const searchParams = Object.assign({}, this.meansForm, {
        orgIds: this.mutilTreeData.orgIds
      })
      const searchParamsForm = Object.assign({}, { searchForm: JSON.stringify(searchParams) })
      this.setSearchParams(searchParamsForm, this.currentRouteName)
    },
    // 设置默认搜索项
    _setDefaultSearch () {
      const searchParams = this.getSearchParams({}, this.$route.name)
      console.log('searchParams', searchParams)
      const { searchForm } = searchParams
      const postParams = searchForm ? JSON.parse(searchForm) : Object.assign({}, meansForm)
      this.meansForm = postParams
      this.mutilTreeData.orgIds = searchForm ? JSON.parse(searchForm).orgIds : []
      // mutilRef
      setTimeout(() => {
        this.$refs['deptTree']._setCheckedKeys(postParams.orgIds)
        this.searchList()
      }, 100)
      // this.setSerchList(true)
      //
      // this.$refs.mutilRef._setCheckedKeys(JSON.parse(searchForm).orgIds)
    }
  },
  components: {
    /* MutilSearchTree */
    MutilSearchDeptTree
  },
  beforeRouteLeave (to, from, next) {
    this._setDefaultLocalData()
    next()
  },
  created () {
    // this.searchList(false)
    this._setDefaultSearch()
    if (this.$store.state.clickType === 'left') {
      this.refresh()
    }
    // this.searchList(false)
  }
}
</script>
