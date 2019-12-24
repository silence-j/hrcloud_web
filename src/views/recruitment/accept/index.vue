<template>
  <div class="accept-box" @click="showTreeTag=false">
    <ul class="tab-bar-ul clearfix">
      <li><el-button type="primary" size="mini" @click="postAdd" v-show="permission.indexOf('新增')!=-1">新增应聘人员</el-button></li>
      <li><el-button type="primary" size="mini" @click="invite" v-show="permission.indexOf('面试邀请')!=-1">面试邀约</el-button></li>
      <li><el-button type="primary" size="mini" @click="exportBtn" v-show="permission.indexOf('导出')!=-1 && !exportTag">导 出</el-button></li>
    </ul>
    <el-form :model="acceptForm" class="mt-20">
      <div class="search-form_box clearfix">
        <div class="search-form_item">
          <el-input v-model="acceptForm.keyword" placeholder="输入关键词" @keyup.enter.native="searchAcceptList"></el-input>
        </div>
        <div class="search-form_item start-line">
          <el-date-picker
            v-model="acceptForm.createTimeStart"
            type="date"
            clearable
            placeholder="开始时间">
          </el-date-picker>
        </div>
        <div class="search-form_item">
          <el-date-picker
            v-model="acceptForm.createTimeEnd"
            type="date"
            clearable
            :picker-options="pickerOptions"
            placeholder="结束时间">
          </el-date-picker>
        </div>
        <div class="search-form_button pt-3">
          <el-button type="primary" size="mini" @click="searchAcceptList">查询</el-button>
          <el-button size="mini" @click="chooseData.deepSearchVisible = true">高级查询</el-button>
          <i class="el-icon-refresh ml-15" @click="refresh" title="重置搜索条件"/>
        </div>
      </div>
    </el-form>
    <div class="tab-wrap mt-20">
      <ul class="edit-tab clearfix">
        <li @click="clearSearchData(0)">
          <router-link to="/recruitment/accept/all">全部</router-link>
        </li>
        <li @click="clearSearchData(1)">
          <router-link to="/recruitment/accept/wait-interview">待面试</router-link>
        </li>
        <li @click="clearSearchData(2)">
          <router-link to="/recruitment/accept/entry">入职审批</router-link>
        </li>
        <li @click="clearSearchData(3)">
          <router-link to="/recruitment/accept/reserve">储备</router-link>
        </li>
        <li @click="clearSearchData(4)">
          <router-link to="/recruitment/accept/non-employment">不录用</router-link>
        </li>
        <li @click="clearSearchData(5)">
          <router-link to="/recruitment/accept/have-hired">已录用</router-link>
        </li>
        <li @click="clearSearchData(6)">
          <router-link to="/recruitment/accept/non-interview">未面试</router-link>
        </li>
      </ul>
    </div>
    <div class="mt-20">
      <router-view/>
    </div>

    <!-- 删除 -->
    <el-dialog @close="setAcceptUserDelId('')"  title="删除" :visible.sync="deleteVisible" width="300px">
      <span style="color: #ff7500;" class="el-icon-warning el-icon-show"></span>
      <span class="content">删除后不能恢复,确定要删除吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDelete" size="mini">取消</el-button>
        <el-button type="primary" @click="sureDel" size="mini">确定</el-button>
      </span>
    </el-dialog>

    <!-- 审核进度 -->
    <el-dialog @close="setacceptUserProgressId('')" class="progressDialog" title="审核进度" :visible.sync="progressVisible" width="380px">
      <div v-if="finishProgress === '-1'">
        <span>流程已结束</span>
      </div>
      <div v-else="" class="progress">
        <div class="step"><em class="havedStep"></em><span class="line"></span><span>发起人：</span><span class="contain-step" :title="progressData.createName">{{progressData.createName}}</span> <span>{{progressData.createTime}}</span>
        </div>
        <div class="step"><em :class="head.endTime !== null && head.endTime !== '' ? 'havedStep' : ''"></em><span class="line"></span><span>录用审核：</span> <span class="contain-step" :title="head.name">{{head.name}}</span> <span>{{head.endTime | getTime}}</span></div>
        <div class="step"><em :class="rehead.endTime !== null && rehead.endTime !== '' ? 'havedStep' : ''"></em><span class="line"></span><span>录用复核审核：</span> <span class="contain-step" :title="rehead.name">{{rehead.name}}</span> <span>{{rehead.endTime | getTime}}</span></div>
        <div class="step"><em :class="ToIn.endTime !== null && ToIn.endTime !== '' ? 'havedStep' : ''"></em><span class="line"></span><span>入职专员审核：</span> <span class="contain-step" :title="ToIn.name">{{ToIn.name}}</span> <span>{{ToIn.endTime | getTime}}</span></div>
        <div class="step"><em :class="reIn.endTime !== null && reIn.endTime !== '' ? 'havedStep' : ''"></em><span>复核人员审批：</span> <span class="contain-step" :title="reIn.name">{{reIn.name}}</span> <span>{{reIn.endTime | getTime}}</span></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="close-btn" @click="closeProgress">关闭</el-button>
      </span>
    </el-dialog>

    <!-- 面试评估 -->
    <el-dialog
      @close="setAcceptUserId('')"
      title="面试评估"
      :visible.sync="classifyVisible"
      v-draggable
      width="500px">
      <div class="module-opera">
        <el-form :model="classifyForm" label-width="110px" class="dialog-form" ref="classifyForm">
          <el-form-item label="人才分类：" class="mustForm">
            <el-select v-model="classifyForm.status" @change="selectJoy" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in classifySelect"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <div v-if="classifyForm.status == 3">
            <el-form-item label="录用岗位：" class="mustForm" style="width: 100%">
              <el-input readonly @focus="chooseJoy"  v-model="classifyForm.postName" placeholder="请输入新岗位"></el-input>
            </el-form-item>
          </div>
          <div v-if="classifyForm.status == 1">
            <el-form-item label="填写原因："  class="mustForm" >
              <el-input type="textarea" v-model="classifyForm.testRemark"></el-input>
            </el-form-item>
          </div>
          <div v-if="classifyForm.status == 4">
            <el-form-item label="储备原因："  class="mustForm" >
              <el-input type="textarea" v-model="classifyForm.remark"></el-input>
            </el-form-item>
          </div>
          <div v-if="classifyForm.status == 17">
            <el-form-item label="未面试原因："  class="noView" >
              <el-input type="textarea" v-model="classifyForm.remarks"></el-input>
            </el-form-item>
          </div>
          <div v-if="classifyForm.status == 18">
            <el-form-item label="初试时间："  class="mustForm" >
              <el-date-picker
                v-model="classifyForm.startTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </div>
          <div v-if="classifyForm.status == 2">
            <el-form-item label="复试时间："  class="mustForm" >
              <el-date-picker
                v-model="classifyForm.endTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelComfire" class="false" size="mini">取 消</el-button>
        <el-button type="primary" :loading="$store.state.btnLoading" @click="classifyComfire" size="mini">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 该人员曾在中财就职 -->
    <EntryList
      v-draggable
      @handleColse="setAcceptIdCardNumber('')"
      :dialogVisible="entryVisible" :entryDatas="entryDatas">
    </EntryList>

    <!-- 导出列表 -->
    <form style="display:none" name="form" method="POST" ref="submitExcel" id="submitExcel" :action="hostBaseUrl+'/user/user/exportCandidate'">
      <p>createTimeStart: <input type="text" id="createTimeStart" name="createTimeStart" value="" /></p>
      <p>createTimeEnd: <input type="text" id="createTimeEnd" name="createTimeEnd" value="" /></p>
      <p>keyword: <input type="text" id="keyword" name="keyword" value="" /></p>
      <p>dataType: <input type="text" id="dataType" name="dataType" value="0" /></p>
      <!--<p>tag: <input type="text" id="tag" name="tag" value="" /></p>-->
      <input type="submit" value="Submit"/>
    </form>

    <!-- 应聘岗位 -->
    <el-dialog title="应聘岗位" :visible.sync="applyJoy" width="680px" class="interViewDialog">
      <el-table :data="joyList">
        <el-table-column width="30">
          <template slot-scope="scope">
            <el-radio v-model="isChoose" :label="scope.$index"></el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="identifier" label="需求编号" width="150" sortable></el-table-column>
        <el-table-column prop="levelOne" label="一级组织" width="150" sortable></el-table-column>
        <el-table-column prop="orgName" label="需求部门" width="150" sortable></el-table-column>
        <el-table-column prop="postName" label="需求岗位" width="150" sortable></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="applyJoy = false" size="mini">取消</el-button>
        <el-button type="primary" @click="sureApply" size="mini">确定</el-button>
      </div>
    </el-dialog>

    <!-- 高级搜索和筛选字段的dialog-->
    <choose-column-search
    :chooseData="chooseData"
    @sureDeepSearch="sureDeepSearch"
    />
  </div>
</template>
<script>
import { getTime } from 'assets/js/filters'
import { editClassify, getEntryList, delUndetermined, howProgress, searchJoy } from 'static/api/recruit/accept/accept'
import ChooseColumnSearch from 'components/ChooseColumnSearch.vue'
import EntryList from 'components/EntryList.vue'
import { mapGetters, mapMutations } from 'vuex'
import { timeZeroToString } from 'assets/js/common'
import { hostBaseUrl } from 'utils/config'
import { getExmine } from 'assets/js/exmine'
const acceptForm = {
  keyword: '',
  createTimeStart: '',
  createTimeEnd: '',
  interviewValue: ''
}
export default {
  data () {
    return {
      chooseData: {
        chooseVisible: false,
        deepSearchVisible: false,
        filedType: 'candidate',
        fieldList: [],
        selectedWordArr: [{ prop: '', op: '', value: '', width: '', searchFlag: '' }]
      },
      demandId: '',
      // 应聘岗位查询
      exportTag: 0,
      applyJoy: false,
      joyList: [],
      isChoose: -1,
      prossData: '',
      hostBaseUrl: '',
      entryDatas: [],
      entryVisible: false,
      showTreeTag: false,
      classifyVisible: false,
      deleteVisible: false,
      progressVisible: false,
      acceptForm: Object.assign({}, acceptForm),
      progressData: {
        createName: '',
        createTime: ''
      },
      progressList: [],
      classifyForm: {
        status: '',
        orgName: '',
        remark: '',
        postName: this.getAcceptPName,
        orgId: '',
        remarks: '',
        testRemark: '',
        startTime: '',
        endTime: ''
      },
      finishProgress: '',
      classifyFormSelect: [
        { value: '0', label: '待评估' },
        { value: '1', label: '不录用' },
        { value: '3', label: '入职审批' },
        { value: '4', label: '储备' },
        // {value: '5', label: '录用'},
        { value: '15', label: '已录用' }
        // {value: '11', label: '录用'}
      ],
      head: {
        startTime: '',
        endTime: '',
        name: ''
      },
      rehead: {
        startTime: '',
        endTime: '',
        name: ''
      },
      ToIn: {
        startTime: '',
        endTime: '',
        name: ''
      },
      reIn: {
        startTime: '',
        endTime: '',
        name: ''
      },
      classifySelect: [
        { value: '1', label: '不录用' },
        { value: '3', label: '录用' },
        { value: '4', label: '储备' },
        { value: '17', label: '未面试' },
        { value: '18', label: '初试' },
        { value: '2', label: '复试' }
      ]
    }
  },
  mounted () {
    // this.postForm.keyword = this.recruitPoolParams.keyword
  },
  computed: {
    chooseVisible () {
      return false
      // return this.$route.matched[this.$route.matched.length - 1].instances.default.chooseVisible
    },
    ...mapGetters(['getAcceptUserId',
      'getAcceptIdCardNumber',
      'getAcceptUserDelId',
      'getAcceptUserProgressId',
      'getAcceptTalentInterviewValue',
      'getAcceptPName',
      'getAcceptDemandId',
      'getAcceptParamOrgId',
      'getAcceptParamOrgName',
      'getAcceptParamPostName',
      'getChooseFieldList',
      'getChooseVis'
    ]
    ),
    permission () {
      return getExmine().recruitAccept
    },
    pickerOptions () {
      return {
        disabledDate: (time) => {
          return new Date(time).getTime() < new Date(this.acceptForm.createTimeStart).getTime()
        }
      }
    },
    currentRouteName () {
      return this.$route.name
    }
  },
  filters: {
    getTime (str) {
      return getTime(str)
    }
  },
  methods: {
    refresh () {
      this.chooseData.selectedWordArr = [{ prop: '', op: '', value: '', width: '', searchFlag: '' }]
      this.$store.commit('SET_DEEP_SEARCH_OPTIONS', [])
      this.acceptForm = Object.assign({}, acceptForm)
      this.setSerchList(true)
      this._setDefaultLocalData()
    },
    // 选择带应聘职位
    _getUserFiled () {
      this.$store.commit('SET_CHOOSE_CHECK', true)
    },
    chooseJoy () {
      this.joyList = []
      searchJoy({ selectFlag: '1', size: 10000 }).then(res => {
        if (res.result) {
          this.joyList = res.result.records
        }
      })
      this.applyJoy = true
    },
    // 高级搜索
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
    selectJoy () {
      if (this.classifyForm.status === '3') {
        this.classifyForm.postName = this.getAcceptPName
        this.demandId = this.getAcceptDemandId
      }
    },
    sureApply () {
      if (this.isChoose === -1) {
        this.$message.warning('请选择要招聘的岗位')
      } else {
        let cur = ''
        let level = this.joyList[this.isChoose].levelOne || ''
        let org = this.joyList[this.isChoose].orgName || ''
        let post = this.joyList[this.isChoose].postName || ''
        if (level !== '' && org !== '' && post !== '') {
          cur = level + '-' + org + '-' + post
        } else if (level === '' && org !== '' && post !== '') {
          cur = org + '-' + post
        } else if (level !== '' && org === '' && post !== '') {
          cur = level + '-' + post
        } else if (level !== '' && org !== '' && post === '') {
          cur = level + '-' + org
        }
        this.classifyForm.postName = cur
        this.demandId = this.joyList[this.isChoose].id
        this.prossData = this.joyList[this.isChoose]
        this.setAcceptPName(this.classifyForm.postName)
        this.setAcceptParamOrgId(this.joyList[this.isChoose].orgId)
        this.setAcceptParamOrgName(this.joyList[this.isChoose].orgName)
        this.setAcceptParamPostName(this.joyList[this.isChoose].postName)
        this.applyJoy = false
      }
    },
    exportBtn () {
      document.getElementById('createTimeStart').setAttribute('value', this.acceptForm.createTimeStart ? timeZeroToString(this.acceptForm.createTimeStart) : '')
      document.getElementById('createTimeEnd').setAttribute('value', this.acceptForm.createTimeEnd ? timeZeroToString(this.acceptForm.createTimeEnd) : '')
      document.getElementById('keyword').setAttribute('value', this.acceptForm.keyword)
      document.getElementById('dataType').setAttribute('value', 0)
      // document.getElementById('tag').setAttribute('value', this.exportTag)
      this.$refs.submitExcel.submit()
    },
    ...mapMutations({
      setAcceptUserId: 'SET_ACCEPT_TALENT_USERTID',
      setAcceptIdCardNumber: 'SET_ACCEPT_TALENT_IDCARDNUMBER',
      setAcceptUserDelId: 'SET_ACCEPT_TALENT_DEL_USERTID',
      setacceptUserProgressId: 'SET_ACCEPT_TALENT_PROGRESS_USERTID',
      setAcceptTalentKeywords: 'SET_ACCEPT_TALENT_KEYWORDS',
      setAcceptTalentCreateTimeStart: 'SET_ACCEPT_TALENT_CREATETIMESTART',
      setAcceptTalentCreateTimeEnd: 'SET_ACCEPT_TALENT_CREATETIMEEND',
      setIsDel: 'SET_ACCEPT_IS_DELETE',
      setAcceptPName: 'SET_ACCEPT_P_NAME',
      setAcceptParamOrgId: 'SET_ACCEPT_PARAM_ORGID',
      setAcceptParamOrgName: 'SET_ACCEPT_PARAM_ORGNAME',
      setAcceptParamPostName: 'SET_ACCEPT_PARAM_POSTNAME'
    }),
    // 切换路由清空搜索条件
    clearSearchData (val) {
      this.chooseData.selectedWordArr = [{ prop: '', op: '', value: '', width: '', searchFlag: '' }]
      this.exportTag = val
      this.acceptForm.keyword = ''
      this.acceptForm.createTimeStart = ''
      this.acceptForm.createTimeEnd = ''
      this.setSerchList(false)
    },
    // 录入记录
    entryList () {
      this.entryVisible = true
      getEntryList(this.getAcceptIdCardNumber).then(res => {
        if (res.result) {
          this.entryDatas = res.result
        }
      })
    },
    changeDate (value) {
      let time = new Date(value)
      let year = time.getFullYear()
      let month = (time.getMonth() < 9 ? '0' : '') + (time.getMonth() + 1)
      let day = (time.getDate() < 10 ? '0' : '') + time.getDate()
      let hour = (time.getHours() < 10 ? '0' : '') + time.getHours()
      let minute = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes()
      // let second = (time.getSeconds() < 10 ? '0' : '') + time.getSeconds()
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    },
    /* 删除 */
    sureDel () {
      delUndetermined(this.getAcceptUserDelId).then(res => {
        this.$message.success('删除成功')
        this.deleteVisible = false
        this.setIsDel('del')
      })
    },
    postAdd () {
      this.$router.push({ path: '/recruitment/accept/accept-add', query: { name: this.$route.name } })
      this.setAcceptTalentKeywords('')
      this.setAcceptTalentCreateTimeStart('')
      this.setAcceptTalentCreateTimeEnd('')
    },
    invite () {
      this.$router.push({ path: '/recruitment/accept/viewInvite', query: { come: this.$route.name } })
    },
    setSerchList (boolean) {
      this.$store.dispatch('setAcceptTalentSearch', this.acceptForm)
      this.$store.commit('SET_ACCEPT_TALENT_CLICKED', boolean)
    },
    searchAcceptList () {
      this.setSerchList(true)
    },
    _progressDetail () {
      this.head.endTime = ''
      this.head.name = ''
      this.rehead.endTime = ''
      this.rehead.name = ''
      this.ToIn.endTime = ''
      this.ToIn.name = ''
      this.reIn.endTime = ''
      this.reIn.name = ''
      let preload = {
        employeeId: this.getAcceptUserProgressId,
        actType: 'entry'
      }
      howProgress(preload).then(res => {
        this.finishProgress = res.subCode
        this.progressData.createName = res.subMsg
        this.progressData.createTime = res.createTime
        if (res.result && res.result.length > 0) {
          this.progressList = res.result
          this.progressList.forEach(res => {
            if (res.name === '录用审核') {
              this.head.endTime = res.endTime
              this.head.name = res.assignee
            }
            if (res.name === '录用复核审核') {
              this.rehead.endTime = res.endTime
              this.rehead.name = res.assignee
            }
            if (res.name === '入职专员审核') {
              this.ToIn.endTime = res.endTime
              this.ToIn.name = res.assignee
            }
            if (res.name === '复核人员审批') {
              this.reIn.endTime = res.endTime
              this.reIn.name = res.assignee
            }
          })
          if (res.resMap) {
            let name = res.resMap
            if (name === '录用审核') {
              this.head.endTime = ''
              this.head.name = ''
            }
            if (name === '录用复核审核') {
              this.rehead.endTime = ''
              this.rehead.name = ''
            }
            if (name === '入职专员审核') {
              this.ToIn.endTime = ''
              this.ToIn.name = ''
            }
            if (name === '复核人员审批') {
              this.reIn.endTime = ''
              this.reIn.name = ''
            }
          }
        }
        if (res.subCode !== 1000) {
          this.finishProgress = res.subCode
        }
      })
    },
    cancelComfire () {
      this.setAcceptUserId('')
      this.classifyForm.status = ''
    },
    // 面试评估
    classifyComfire () {
      let preload = {
        userId: this.getAcceptUserId,
        remark: this.classifyForm.status === '1' ? this.classifyForm.testRemark : this.classifyForm.remark,
        status: this.classifyForm.status,
        orgId: this.classifyForm.orgName.split('-')[0],
        orgName: this.classifyForm.orgName.split('-')[1],
        postName: this.classifyForm.postName,
        actType: 'entry',
        deptNo: this.classifyForm.orgName.split('-')[0]
      }
      if (!this.classifyForm.status) {
        this.$message.warning('请选择人才分类')
        return
      }
      if (this.classifyForm.status === '3') {
        preload.orgId = this.getAcceptParamOrgId
        preload.demandId = this.demandId
        preload.orgName = this.getAcceptParamOrgName
        // preload.postName = this.getAcceptParamPostName
        preload.deptNo = this.getAcceptParamOrgId
        if (this.classifyForm.postName === '') {
          this.$message.warning('请填写录用岗位')
          return
        }
      }
      if (this.classifyForm.status === '1') {
        if (this.classifyForm.testRemark === '') {
          this.$message.warning('请填写原因')
          return
        }
      }
      if (this.classifyForm.status === '4') {
        if (this.classifyForm.remark === '') {
          this.$message.warning('请填写原因')
          return
        }
      }
      if (this.classifyForm.status === '17') {
        if (!this.classifyForm.remarks) {
          this.$message.warning('请填写原因')
          return
        } else {
          preload.remark = this.classifyForm.remarks
        }
      }
      if (this.classifyForm.status === '18') {
        if (!this.classifyForm.startTime) {
          this.$message.warning('请填写初试日期')
          return
        } else {
          preload.interview1 = this.classifyForm.startTime ? this.changeDate(this.classifyForm.startTime) : ''
          preload.status = '0'
        }
      }
      if (this.classifyForm.status === '2') {
        if (!this.classifyForm.endTime) {
          this.$message.warning('请填写复试日期')
          return
        } else {
          preload.interview2 = this.classifyForm.endTime ? this.changeDate(this.classifyForm.endTime) : ''
          preload.status = '0'
        }
      }
      this.$store.commit('BTN_LOADING', true)
      editClassify(preload).then(res => {
        this.$message.success('评估成功')
        this.setAcceptUserId('')
        setTimeout(() => {
          this.classifyVisible = false
          this.searchAcceptList()
          this.classifyForm = {
            status: '',
            orgName: '',
            remark: '',
            testRemark: '',
            postName: '',
            orgId: '',
            startTime: '',
            endTime: ''
          }
          this.setAcceptUserId('')
        }, 400)
      })
    },
    closeProgress () {
      this.progressVisible = false
      this.setacceptUserProgressId('')
    },
    cancelDelete () {
      this.deleteVisible = false
      this.setAcceptUserDelId('')
    },
    showDeptTree () {
      this.showTreeTag = true
    },
    getSerId (val) {
      if (val) {
        this.classifyForm.orgName = val
      }
      this.showTreeTag = false
    },
    _setDefaultLocalData () {
      const searchParams = Object.assign({}, this.acceptForm)
      const searchParamsForm = Object.assign({}, { searchForm: JSON.stringify(searchParams) })
      this.setSearchParams(searchParamsForm, this.currentRouteName)
    },
    // 设置默认搜索项
    _setDefaultSearch () {
      const searchParams = this.getSearchParams({}, this.$route.name)
      console.log('searchParams', searchParams)
      const { pageMsg, searchForm } = searchParams
      const pageMsg1 = pageMsg ? JSON.parse(pageMsg) : Object.assign({}, pageMsg)
      const postParams = searchForm ? JSON.parse(searchForm) : Object.assign({}, acceptForm)
      this.pageMsg = pageMsg1
      this.acceptForm = postParams
      this.setSerchList(true)
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
    },
    getAcceptUserId (val) {
      if (val) {
        this.classifyForm.remark = ''
        this.classifyForm.remarks = ''
        this.classifyForm.testRemark = ''
        this.classifyForm.startTime = ''
        this.classifyForm.endTime = ''
        this.classifyVisible = true
      } else {
        this.classifyVisible = false
      }
    },
    getAcceptIdCardNumber (val) {
      if (val) {
        this.entryList()
      } else {
        this.entryVisible = false
      }
    },
    getAcceptUserDelId (val) {
      if (val) {
        this.deleteVisible = true
      } else {
        this.deleteVisible = false
      }
    },
    getAcceptUserProgressId (val) {
      if (val) {
        this._progressDetail()
        this.progressVisible = true
      } else {
        this.progressVisible = false
      }
    },
    getAcceptTalentInterviewValue (val) {
      this.acceptForm.interviewValue = val
    }
  },
  components: {
    ChooseColumnSearch,
    EntryList
  },
  beforeRouteLeave (to, from, next) {
    this._setDefaultLocalData()
    next()
  },
  created () {
    this.hostBaseUrl = hostBaseUrl
    this.setSerchList(false)
    this._setDefaultSearch()
    if (this.$store.state.clickType === 'left') {
      this.refresh()
    }
  }
}
</script>
<style lang="less" scoped>
  .el-form-item.mustForm1::before{
    left: 8px;
  }
  .el-form-item.noView{
    position: relative;
  }
  .el-form-item.noView:before {
    content: "*";
    color: red;
    position: absolute;
    top: 13px;
    left: 4px;
  }
  &/deep/.el-button{
    padding: 0 20px;
  }
  .progressDialog{
    .progress{
      padding: 0 0 0 12px;
      /*border-left: 1px solid;*/
      .step{
        position: relative;
        margin-bottom: 20px;
        /*border-left: 1px solid;*/
        em{
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          border: 2px solid;
          top: 0;
          left: -9px;
        }
        .contain-step {
          width: 78px;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .havedStep{
          border-color: #ff7500;
          background: #ff7500;
        }
        .line{
          display: inline-block;
          height: 20px;
          width: 2px;
          background: #ccc;
          position: relative;
          top: 24px;
          left: -16px
        }
      }
    }
    .close-btn{
      margin-left: 130px;
      margin-top: 8px;
      padding: 0 20px;
    }
    &/deep/.el-dialog__footer{
      text-align: left;
    }
  }

</style>
