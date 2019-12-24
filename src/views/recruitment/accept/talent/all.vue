<template>
  <div class="all-box">
    <div class="table-setting-warp">
      <div class="table-setting-icon el-icon-setting" @click="chooseMsg"></div>
      <el-table
        :data="recruitList"
        border
        tooltip-effect="dark" @sort-change="sortChange">
        <el-table-column
          label="序号"
          type="index"
          width="60px">
        </el-table-column>

        <div v-for="item in fieldList" :key="item.id">
          <template v-if="item.prop == 'name'">
            <el-table-column
              label="姓名"
              prop="name"
              width="150px"
              :sortable="item.orderFlag === 1">
              <template slot-scope="scope">
                <i class="icon-font" v-if="scope.row.isReaded!=1" style="color: red;font-size: 20px;position: absolute;left: 25px;">&#xe628;</i>
                <span style="position: relative;">{{scope.row.name}}</span>
                <span class="entry-iconcolor" v-if="scope.row.entryTimes > 0 || scope.row.inZcBefore == 1" @click="entryList(scope.row)"><i class="fa fa-thumb-tack"></i></span>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.prop == 'status'">
            <el-table-column
              label="人才分类" prop="status"
              min-width="120px" :sortable="item.orderFlag === 1">
              <template slot-scope="scope">
                <div v-if="scope.row.status == 1 || scope.row.status == 4 || scope.row.status == 17">
                  <el-tooltip placement="top" effect="light">
                    <div slot="content" style="width: 120px;height: 35px;overflow: auto;">{{scope.row.remark}}</div>
                    <span>{{scope.row.status | filterEmployeeStatus}}</span>
                  </el-tooltip>
                </div>
                <div v-else>
                  <span>{{scope.row.status | filterEmployeeStatus}}</span>
                </div>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column
              :label="item.name"
              :prop="item.prop" :key="item.name" :sortable="item.orderFlag === 1" min-width="120">
            </el-table-column>
          </template>
        </div>

        <el-table-column
          fixed="right"
          label="操作"
          width="180px">
          <template slot-scope="scope">
            <div class="operation">
              <span v-show="permission.indexOf('查看')!=-1" @click="acceptCheck(scope.row)">查看</span>
              <span v-show="permission.indexOf('编辑')!=-1&&(scope.row.statusText !== '入职审批' && scope.row.statusText !== '已面试' && scope.row.statusText !== '已录用')" @click="acceptEdit(scope.row)">编辑</span>
              <span v-show="permission.indexOf('面试评估')!=-1&&(scope.row.statusText === '待面试')" @click="classifyMsg(scope.row)">评估</span>
              <span v-show="permission.indexOf('删除')!=-1&&(scope.row.statusText === '待面试' || scope.row.statusText === '未面试')" @click="deleteData(scope.row)">删除</span>
              <span v-show="permission.indexOf('面试评估')!=-1&&(scope.row.statusText === '储备' || scope.row.statusText === '不录用' || scope.row.statusText === '未面试')" @click="classifyMsg(scope.row)">重新评估</span>
              <span v-show="permission.indexOf('审批进度')!=-1&&scope.row.statusText === '入职审批'&&scope.row.isMarketing !== 1" @click="progressData(scope.row)">审批进度</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageMsg.currentPage"
      :page-sizes="pageMsg.pageSizes"
      :page-size="pageMsg.pageSize"
      :total="pageMsg.total">
    </pagination>
  </div>
</template>
<script>
import { getRecruitList } from 'static/api/recruit/accept/accept'
import { getAcceptStatus } from 'assets/js/filters'
import { timeZeroToString } from 'assets/js/common'
import Pagination from 'components/Pagination.vue'
import { mapGetters, mapMutations } from 'vuex'
import { setCurrentInterview } from 'assets/js/mixins'
import { listByUserId } from 'static/api/common/common'
import { getToken } from 'assets/js/util'
import { getExmine } from 'assets/js/exmine'
const pageMsg = {
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 20, 50],
  total: 0
}
export default {
  mixins: [setCurrentInterview],
  data () {
    return {
      defaultInterview: '',
      recruitList: [],
      pageMsg: Object.assign({}, pageMsg),
      // 选择显示字段
      fieldList: [],
      prop: '',
      order: '',
      options: this.getDeepSearchOptions
    }
  },
  computed: {
    ...mapGetters(['getIsDel', 'getAcceptTalentSearchArr', 'getAcceptTalentClick', 'getDeepSearchOptions', 'getChooseCheck']),
    permission () {
      return getExmine().recruitAccept
    },
    recruitPoolParams () {
      return {
        page: this.pageMsg.currentPage,
        size: this.pageMsg.pageSize,
        dataType: 0,
        tag: 0,
        createTimeStart: this.getAcceptTalentSearchArr.createTimeStart ? timeZeroToString(this.getAcceptTalentSearchArr.createTimeStart) : '',
        createTimeEnd: this.getAcceptTalentSearchArr.createTimeEnd ? timeZeroToString(this.getAcceptTalentSearchArr.createTimeEnd) : '',
        keyword: this.getAcceptTalentSearchArr.keyword,
        prop: this.prop,
        order: this.order,
        options: this.getDeepSearchOptions
      }
    },
    currentRouteName () {
      return this.$route.name
    }
  },
  methods: {
    ...mapMutations({
      setAcceptClick: 'SET_ACCEPT_TALENT_CLICKED',
      setDelType: 'SET_ACCEPT_IS_DELETE',
      setAcceptUserId: 'SET_ACCEPT_TALENT_USERTID',
      setAcceptUserDelId: 'SET_ACCEPT_TALENT_DEL_USERTID',
      setAcceptUserProgressId: 'SET_ACCEPT_TALENT_PROGRESS_USERTID',
      setAcceptIdCardNumber: 'SET_ACCEPT_TALENT_IDCARDNUMBER',
      setAcceptPName: 'SET_ACCEPT_P_NAME',
      setAcceptParamOrgId: 'SET_ACCEPT_PARAM_ORGID',
      setAcceptParamOrgName: 'SET_ACCEPT_PARAM_ORGNAME',
      setAcceptParamPostName: 'SET_ACCEPT_PARAM_POSTNAME',
      setAcceptDemandId: 'SET_ACCEPT_DEMAND_ID'
    }),
    _getAcceptList () {
      getRecruitList(this.recruitPoolParams).then((data) => {
        if (data.result) {
          this.recruitList = data.result.records
          this.pageMsg.total = data.result.total
        }
      })
    },
    acceptCheck (row) {
      this.$router.push({ name: '应聘人员库查看', params: { acceptId: row.id }, query: { name: this.$route.name } })
    },
    acceptEdit (row) {
      this.$router.push({ name: '应聘人员库编辑', params: { acceptId: row.id }, query: { name: this.$route.name } })
    },
    /* 评估 */
    classifyMsg (row) {
      if (row.idCardNumber === null) {
        this.$message.warning('请把信息补充完整')
        return
      }
      this.setAcceptUserId(row.id)
      this.setAcceptPName(row.pName)
      this.setAcceptDemandId(row.demandId)
      this.setAcceptParamOrgId(row.paramOrgId)
      this.setAcceptParamOrgName(row.paramOrgName)
      this.setAcceptParamPostName(row.paramPostName)
    },
    /* 删除 */
    deleteData (row) {
      this.setAcceptUserDelId(row.id)
    },
    progressData (row) {
      this.setAcceptUserProgressId(row.id)
    },
    handleSizeChange (pageSize) {
      this.pageMsg.pageSize = pageSize
      this._getAcceptList()
    },
    handleCurrentChange (currentPage) {
      this.pageMsg.currentPage = currentPage
      this._getAcceptList()
    },
    /* 小钉子 */
    entryList (row) {
      this.setAcceptIdCardNumber(row.idCardNumber)
    },
    // 选择显示字段
    chooseMsg () {
      this.$store.commit('SET_CHOOSE_VIS', true)
    },
    // 获取原来选择字段
    _getUserFiled () {
      this.fieldList = []
      let preload = {
        userId: getToken('loginId').toString(),
        type: 'candidate'
      }
      listByUserId(preload).then((data) => {
        if (data.result) {
          this.fieldList = data.result
          this.$store.commit('SET_CHOOSE_FILELIST', data.result.map(item => item.prop))
        }
        setTimeout(() => {
          this._getAcceptList()
        }, 10)
      })
    },
    // 排序
    sortChange (column, prop, order) {
      if (column && column.prop) {
        let orderColumn = this.fieldList.filter(item => item.prop === column.prop)[0].orderColumn
        this.prop = orderColumn
        this.order = column.order
        this._getAcceptList()
      } else {
        this.prop = ''
        this.order = ''
        this._getAcceptList()
      }
    },
    // 设置默认搜索项
    _setDefaultSearch () {
      const pageMsg1 = this.getSearchParams({}, this.currentRouteName + '1')
      let lists = ['currentPage', 'pageSize', 'pageSizes', 'total']
      let keys = []
      for (let key in pageMsg1) {
        keys.push(key)
      }
      lists.forEach(item => {
        let r = keys.findIndex(x => x + '' === item + '')
        if (r === -1) {
          if (item === 'currentPage') pageMsg1.currentPage = this.pageMsg.currentPage
          if (item === 'pageSize') {
            pageMsg1.pageSize = this.pageMsg.pageSize
          }
          if (item === 'pageSizes') pageMsg1.pageSizes = this.pageMsg.pageSizes
          if (item === 'total') pageMsg1.total = this.pageMsg.total
        }
      })
      this.pageMsg = pageMsg1
    },
    _setDefaultLocalData (page) {
      if (page) {
        this.pageMsg.currentPage = 1
        this.pageMsg.pageSize = 10
      }
      const searchParams = Object.assign({}, this.pageMsg)
      const searchParamsForm = Object.assign({}, searchParams)
      this.setSearchParams(searchParamsForm, this.currentRouteName + '1')
    }
  },
  watch: {
    getAcceptTalentClick (val) {
      if (val) {
        this.handleCurrentChange(1)
      }
      this.setAcceptClick(false)
    },
    getIsDel (val) {
      if (val) {
        this.pageMsg.currentPage = 1
        this._getAcceptList()
      }
      this.setDelType('')
    },
    getDeepSearchOptions (val) {
      if (val) {
        this.recruitPoolParams.options = val
        this.handleCurrentChange(1)
      }
    },
    getChooseCheck (value) {
      if (value) {
        this._getUserFiled()
      }
    }
  },
  components: {
    Pagination
  },
  filters: {
    filterEmployeeStatus (per) {
      return getAcceptStatus(per)
    }
  },
  beforeRouteLeave (to, from, next) {
    if (!to.path.includes('/recruitment/accept')) {
      this._setDefaultLocalData('1')
    } else {
      this._setDefaultLocalData()
    }
    next()
  },
  created () {
    // this._getAcceptList()
    this._getUserFiled()
    this.setAcceptClick(false)
    this._setDefaultSearch()
    /* console.log(this.permission) */
  }
}
</script>
