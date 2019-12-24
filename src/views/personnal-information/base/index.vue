<template>
<div class="base-box" @click="mutilTreeData.showTree=false;deptOrgDatas.showTree = false">
    <div class="btn-box">
      <el-button type="primary"
        size="mini"
       @click="addPersonUser"
       v-if="permission.indexOf('新增') !=-1">新 增</el-button>
      <el-button type="primary" size="small" v-if="getBaseExport && permission.indexOf('导出') !=-1" @click="exportBtn">导 出</el-button>
      <el-button type="primary" size="mini" @click="bitchMove" v-if="permission.indexOf('批量调动')!=-1">{{bitchMoveTitle}}</el-button>
      <el-button type="primary" size="mini" @click="showBitchMove" v-if="bitchMoveArr.length">确认调动</el-button>
    </div>
    <el-form :model="baseForm" class="mt-20">
      <div class="search-form_box length-box clearfix">
        <div class="search-form_item">
          <el-input
            v-model="baseForm.keyword"
            placeholder="请输入关键字"
            @keyup.enter.native="searchBaseList">
          </el-input>
        </div>
        <div class="search-form_item">
        <mutil-search-dept-tree
        ref="mutilRef"
        :mutilTreeData="mutilTreeData"
        @selectParent="selectParent"
        />
        </div>
        <div class="search-form_item">
          <el-select
            v-model="baseForm.status"
            filterable
            clearable
            placeholder="人员状态">
            <el-option
              v-for="item in getPersonnalBaseStatusSelect"
              :label="item.label"
              :value="item.value"
              :key="item.index">
            </el-option>
          </el-select>
        </div>
        <div class="search-form_item start-line">
          <el-date-picker
            v-model="baseForm.entryDateStart"
            type="date"
            clearable
            placeholder="入职开始时间">
          </el-date-picker>
        </div>
        <div class="search-form_item">
          <el-date-picker
            v-model="baseForm.entryDateEnd"
            type="date"
            clearable
             :picker-options="pickerOptions"
            placeholder="入职结束时间">
          </el-date-picker>
        </div>
        <div class="search-form_button pt-3">
          <el-button type="primary" size="mini" @click="searchBaseList">查询</el-button>
         <el-button size="mini" @click="chooseData.deepSearchVisible = true">高级查询</el-button>
         <i class="el-icon-refresh ml-15" @click="refresh" title="重置搜索条件"/>
        </div>
      </div>
    </el-form>
    <div class="tab-wrap mt-20">
      <ul class="edit-tab clearfix">
        <li @click="clearSearchData('PersonnalInformationBaseOnJob')">
          <router-link to="/personnel-information/base/on-job">在职人员</router-link>
        </li>
        <li @click="clearSearchData('PersonnalInformationBaseQuitJob')">
          <router-link to="/personnel-information/base/quit-job">离职人员</router-link>
        </li>
      </ul>
    </div>
  <div class="router-view_box mt-20">
    <router-view/>
  </div>

  <!-- 导出列表 -->
  <form style="display:none" name="form" method="POST" ref="submitExcel" id="submitExcel" :action="hostBaseUrl+'/user/export/user/list'">
    <p>keyword: <input type="text" id="keyword" name="keyword" value="" /></p>
    <p>status: <input type="text" id="status" name="status" value="" /></p>
    <p>entryDateStart: <input type="text" id="entryDateStart" name="entryDateStart" value="" /></p>
    <p>entryDateEnd: <input type="text" id="entryDateEnd" name="entryDateEnd" value="" /></p>
    <p>dataType: <input type="text" id="dataType" name="dataType" value="" /></p>
    <p>searchOrgIds: <input type="text" id="searchOrgIds" name="searchOrgIds" value="" /></p>
    <input type="submit" value="Submit"/>
  </form>

  <form style="display:none" name="form1" method="POST" ref="submitExcel1" id="submitExcel1" :action="hostBaseUrl+'/user/export/user/list'">
    <p>keyword1: <input type="text" id="keyword1" name="keyword1" value="" /></p>
    <input type="submit" value="Submit"/>
  </form>

  <choose-column-search
    :chooseData="chooseData"
    ref="chooseDataRef"
    @sureDeepSearch="sureDeepSearch"
  />
  <!--批量调动-->
  <el-dialog
  title="批量调动"
  :visible.sync="bitchMoveVisible"
  width="500px"
  v-draggable
  >
  <div class="bitch-move_box">
    <el-form
     label-width="105px"
     :model="bitchMoveForm"
     ref="bitchMoveForm"
    :rules="moveFormRules"
    >
      <el-form-item
        label="调 入 公 司："
        prop="companyId"
        >
      <search-dept-tree
      :orgDatas="deptOrgDatas"
      @selectChange="selectDeptChange"
       ref="searchDeptTreeRef"
        />
      </el-form-item>
      <el-form-item
      prop="postName"
      label="新岗位:">
        <el-input
        placeholder="请输入新岗位"
        v-model="bitchMoveForm.postName" />
      </el-form-item>
    </el-form>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="bitchMoveVisible = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="sureBitchMove" size="mini">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>
<script>
import MutilSearchDeptTree from 'components/MutilSearchDeptTree'
import { mapGetters } from 'vuex'
import { getExmine } from 'assets/js/exmine'
import { timeZeroToString } from 'assets/js/common'
import { hostBaseUrl } from 'utils/config'
import ChooseColumnSearch from 'components/ChooseColumnSearch.vue'
import SearchDeptTree from 'components/SearchDeptTree'
import { batchMove } from 'static/api/personnel-information/base/base'
import { getToken } from 'assets/js/util'
// import { setToken, getToken } from "../../../assets/js/util";
const baseForm = {
  keyword: '',
  orgName: '',
  status: '',
  entryDateStart: '',
  entryDateEnd: '',
  searchOrgIds: [],
  orgIds: []
}
export default {
  data () {
    return {
      isRefresh: false,
      optionsLen: [],
      deptOrgDatas: {
        filterName: '',
        orgId: '',
        dataTree: [],
        showTree: false,
        disabled: true,
        bindData: '',
        isLimit: '0'
      },
      mutilTreeData: {
        filterName: '',
        orgIds: [],
        dataTree: [],
        checkDatas: [],
        showTree: false
      },
      chooseData: {
        chooseVisible: false,
        deepSearchVisible: false,
        filedType: this.$route.name === 'PersonnalInformationBaseOnJob' ? 'user' : 'out',
        fieldList: [],
        selectedWordArr: [{ prop: '', op: '', value: '', width: '', searchFlag: '' }]
      },
      hostBaseUrl: '',
      baseForm: Object.assign({}, baseForm),
      statusSelect: [
        // {value: 5, label: '已入职'},
        // {value: 8, label: '离职申请中'},
        // {value: 9, label: '离职办理中'},
        // {value: 10, label: '已离职'},
        // {value: 11, label: '调动中'},
        // {value: 12, label: '已调出'},
        // {value: 13, label: '试用'},
        // {value: 14, label: '实习'}
      ],
      bitchMoveForm: {
        moveType: '0',
        postName: '',
        orgId: '',
        companyId: ''
      },
      bitchMoveArr: [],
      bitchMoveVisible: false,
      bitchMoveTitle: '批量调动',
      moveFormRules: {
        companyId: { required: true, message: '请选择调入公司', trigger: 'change' },
        postName: { required: true, message: '请写岗位', trigger: 'blur' }
      },
      dataType: ''
    }
  },
  components: {
    MutilSearchDeptTree,
    ChooseColumnSearch,
    SearchDeptTree
  },
  computed: {
    pickerOptions () {
      return {
        disabledDate: (time) => {
          return new Date(time).getTime() < new Date(this.baseForm.entryDateStart).getTime()
        }
      }
    },
    ...mapGetters(['getPersonnalBaseStatusSelect', 'getBaseExport', 'getPersonnalBaseSearchArr', 'getBaseExport', 'getChooseVis', 'getChooseFieldList']),
    permission () {
      return getExmine().infoBase
    },
    currentRouteName () {
      return this.$route.name
    }
  },
  mounted () {
    if (this.$route.name === 'PersonnalInformationBaseOnJob') {
      this.dataType = 3
    } else {
      this.dataType = 4
    }
  },
  methods: {
    // 清空搜索条件
    refresh () {
      this.chooseData.selectedWordArr = [{ prop: '', op: '', value: '', width: '', searchFlag: '' }]
      this.$store.commit('SET_DEEP_SEARCH_OPTIONS', [])
      this.baseForm = Object.assign({}, baseForm)
      this.mutilTreeData.orgIds = []
      setTimeout(() => {
        this.$refs['mutilRef'] && this.$refs['mutilRef']._setCheckedKeys([])
        this.setSearchList(true)
        this._setDefaultLocalData()
      }, 500)
    },
    selectParent (orgId) {
      this.bitchMoveForm.orgId = orgId
    },
    bitchMove () {
      let targetHTML = this.bitchMoveTitle
      if (targetHTML === '批量调动') {
        this.$bus.$emit('bitchMove', true, 'bitch')
        this.bitchMoveTitle = '取消批量'
        // this.bitchMoveVisible = true
        // batchMove()
      } else {
        this.$bus.$emit('bitchMove', false, 'bitch')
        this.bitchMoveTitle = '批量调动'
      }
    },
    showBitchMove () {
      this.deptOrgDatas.orgId = ''
      this.bitchMoveForm.companyId = ''
      this.bitchMoveForm.postName = ''
      this.bitchMoveVisible = true
      setTimeout(() => {
        this.$refs.bitchMoveForm.resetFields()
      })
    },
    _getAllBitchMoveArr () {
      this.$bus.$on('bitchArr', data => {
        this.bitchMoveArr = data
      })
    },
    selectDeptChange (orgId) {
      this.bitchMoveForm.companyId = orgId
    },
    // 选择带应聘职位
    _getUserFiled () {
      this.$store.commit('SET_CHOOSE_CHECK', true)
    },
    // 批量调动确认，
    sureBitchMove () {
      this.$refs.bitchMoveForm.validate(valid => {
        if (valid) {
          let batchParams = {
            orgId: this.deptOrgDatas.orgId,
            postName: this.bitchMoveForm.postName,
            userIds: this.bitchMoveArr.map(x => x.id)
          }
          batchMove(batchParams).then(() => {
            this.$message.success('调动成功')
            setTimeout(() => {
              this.bitchMoveVisible = false
              this.setSearchList(true)
              this.bitchMoveTitle = '批量调动'
              this.$bus.$emit('bitchMove', false)
            }, 200)
          })
        }
      })
    },
    searchQuery () {
      let options = []
      let list = getToken('queryOptions')
      console.log('list', list)
      if (list.length > 0) {
        list.forEach(item => {
          options.push({
            prop: '',
            op: item.op,
            value: item.value,
            width: item.field,
            searchFlag: item.searchFlag
          })
        })
      }
      this.chooseData.selectedWordArr = options
      console.log('111', this.chooseData, this.chooseData.selectedWordArr)
      this.$nextTick(() => {
        this.isRefresh = true
      })
      this.sureDeepSearch(this.chooseData.selectedWordArr)
    },
    // 高级查询确认
    sureDeepSearch (deepSearchArr) {
      this.chooseData.deepSearchVisible = false
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
    /* 导出 */
    exportBtn () {
      document.getElementById('keyword').setAttribute('value', this.getPersonnalBaseSearchArr.keyword)
      document.getElementById('entryDateStart').setAttribute('value', this.getPersonnalBaseSearchArr.entryDateStart ? timeZeroToString(this.getPersonnalBaseSearchArr.entryDateStart) : '')
      document.getElementById('entryDateEnd').setAttribute('value', this.getPersonnalBaseSearchArr.entryDateEnd ? timeZeroToString(this.getPersonnalBaseSearchArr.entryDateEnd) : '')
      document.getElementById('dataType').setAttribute('value', '3')
      document.getElementById('status').setAttribute('value', this.getPersonnalBaseSearchArr.status ? this.getPersonnalBaseSearchArr.status : null)
      document.getElementById('searchOrgIds').setAttribute('value', this.mutilTreeData.orgIds.length ? this.mutilTreeData.orgIds.join(' ') : null)
      console.log(this.$refs.submitExcel)
      this.$refs.submitExcel.submit()
    },
    _getRouterName () {
      if (this.$route.name === 'PersonnalInformationBaseOnJob') {
        this.$store.commit('SET_BASE_EXPORT_STATUE', true)
      } else {
        this.$store.commit('SET_BASE_EXPORT_STATUE', false)
      }
    },
    addPersonUser () {
      this.$store.commit('SET_INFO_BY_ORG_ID', '')
      this.$store.commit('SET_SALARY_ID', '')
      this.$router.push('/personnel-information/add?come=' + this.$route.name)
    },
    clearSearchData (val) {
      this.baseForm.keyword = ''
      this.baseForm.orgName = ''
      this.baseForm.status = ''
      this.baseForm.entryDateStart = ''
      this.baseForm.entryDateEnd = ''
      this.baseForm.searchOrgIds = []
      this.chooseData.selectedWordArr = [{ prop: '', op: '', value: '', width: '', searchFlag: '' }]
      // setToken('queryOptions', [])
      if (val === 'PersonnalInformationBaseOnJob') {
        this.chooseData.filedType = 'user'
        this.$store.commit('SET_BASE_EXPORT_STATUE', true)
      } else {
        this.chooseData.filedType = 'out'
        this.$store.commit('SET_BASE_EXPORT_STATUE', false)
      }
      this.setSearchList(false)
      this.$refs.chooseDataRef._getAllList()
      // this.$store.dispatch('setPersonnalBaseSearch', this.baseForm)
      // this.$store.commit('SET_PERSONNAL_BASE_CLICKED', false)
    },
    setSearchList (boolen) {
      this.baseForm.searchOrgIds = this.mutilTreeData.orgIds
      this.$store.dispatch('setPersonnalBaseSearch', this.baseForm)
      this.$store.commit('SET_PERSONNAL_BASE_CLICKED', boolen)
    },
    searchBaseList () {
      this.setSearchList(true)
      this.bitchMoveTitle = '批量调动'
      this.$bus.$emit('bitchMove', false)
      // this.$store.dispatch('setPersonnalBaseSearch', this.baseForm)
    },
    _setDefaultLocalData () {
      const searchParams = Object.assign({}, this.baseForm, {
        orgIds: this.mutilTreeData.orgIds
      })
      const searchParamsForm = Object.assign({}, { searchForm: JSON.stringify(searchParams) })
      this.setSearchParams(searchParamsForm, this.currentRouteName)
    },
    // 设置默认搜索项
    _setDefaultSearch (boolen) {
      const searchParams = this.getSearchParams({}, this.$route.name)
      const { pageMsg, searchForm } = searchParams
      const pageMsg1 = pageMsg ? JSON.parse(pageMsg) : Object.assign({}, pageMsg)
      const postParams = searchForm ? JSON.parse(searchForm) : Object.assign({}, baseForm)
      this.pageMsg = pageMsg1
      this.baseForm = postParams
      this.mutilTreeData.orgIds = searchForm ? JSON.parse(searchForm).orgIds : []
      // mutilRef
      setTimeout(() => {
        this.$refs['mutilRef'] && this.$refs['mutilRef']._setCheckedKeys(postParams.orgIds)
        setTimeout(() => {
          this.setSearchList(boolen)
        }, 100)
      }, 200)
      // this.$refs.mutilRef._setCheckedKeys(JSON.parse(searchForm).orgIds)
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
  beforeDestroy () {
    this.$bus.$off('bitchArr')
  },
  beforeRouteLeave (to, from, next) {
    this._setDefaultLocalData()
    // if (!to.path.includes('/personnel-information/base') && !to.path.includes('/personnel-information/add')) {
    //   alert('beforeLeave')
    //   setToken('queryOptions', [])
    // }
    next()
  },
  created () {
    // this.setSearchList(false)
    this._getRouterName()
    this.hostBaseUrl = hostBaseUrl
    this._getAllBitchMoveArr()
    // if (getToken('queryOptions').length > 0) {
    //   this.searchQuery()
    // } else {
    //   this.isRefresh = true
    // }
    if (this.$route.query.type === 'look') {
      this._setDefaultSearch('look')
    } else {
      this._setDefaultSearch('created')
    }
    if (this.$store.state.clickType === 'left') {
      this.refresh()
    }
  }
}
</script>
