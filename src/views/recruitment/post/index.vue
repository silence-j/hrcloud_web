<template>
<div @click="mutilTreeData.showTree=false">
  <el-button type="primary" size="small" @click="addPost" v-show="permission.indexOf('新增')!=-1">新增需求</el-button>
  <el-button type="primary" size="small" @click="ExportMsg">导  出</el-button>
  <div class="mt-20">
    <el-form :model="postForm">
      <div class="search-form_box clearfix length-box">
        <div class="search-form_item">
          <el-input v-model="postForm.keyWords" placeholder="请输入关键字" @keyup.enter.native="searchPostList"></el-input>
        </div>
        <div class="search-form_item">
          <mutil-search-dept-tree ref="mutilRef" :mutilTreeData="mutilTreeData" />
        </div>
        <div class="search-form_item">
          <el-select v-model="postForm.status" filterable clearable placeholder="全部状态">
            <el-option
              v-for="item in statusSelect"
              :label="item.label"
              :value="item.value"
              :key="item.index">
            </el-option>
          </el-select>
        </div>
        <div class="search-form_item start-line">
          <el-date-picker
            v-model="postForm.startTime"
            type="date"
            clearable
            placeholder="创建开始时间">
          </el-date-picker>
        </div>
        <div class="search-form_item">
          <el-date-picker
            v-model="postForm.endTime"
            type="date"
            clearable
             :picker-options="pickerOptions"
            placeholder="创建结束时间">
          </el-date-picker>
        </div>
        <div class="search-form_button pt3">
          <el-button type="primary" size="small"  @click="searchPostList">查询</el-button>
          <el-button size="small" @click="chooseData.deepSearchVisible = true">高级查询</el-button>
          <i class="el-icon-refresh ml-15" @click="refresh" title="重置搜索条件"/>
        </div>
      </div>
    </el-form>
  </div>
  <div class="table-setting-warp">
    <div class="table-setting-icon el-icon-setting" @click="chooseMsg"></div>
    <el-table
      class="mt-20"
      :data="postListDatas"
      tooltip-effect="dark"
      border
      @sort-change="sortChange">
      <el-table-column
        label="序号"
        type="index"
        width="60">
      </el-table-column>
      <template v-for="item in fieldList">
        <template v-if="item.prop == 'status'">
          <el-table-column
            prop="status"
            label="状态"
            min-width="120px"
            :key="item.id"
            :sortable="item.orderFlag === 1">
            <template slot-scope="scope">
              <div v-if="scope.row.status==4 || scope.row.status==5" class="moveBtn">
                <el-tooltip placement="top" effect="light">
                  <div slot="content" style="width: 130px;height: 55px;overflow: auto;">{{scope.row.reasonForCancel?scope.row.reasonForCancel:'未填写'}}</div>
                  <span>{{scope.row.status | filterRecuitStatus}}</span>
                </el-tooltip>
              </div>
              <div v-else>
                <span>{{scope.row.status | filterRecuitStatus}}</span>
              </div>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column
            :label="item.name"
            :prop="item.prop"
            :key="item.name"
            :sortable="item.orderFlag === 1"
            min-width="120">
          </el-table-column>
        </template>
      </template>
      <el-table-column
        width="180px"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <div class="operation">
            <span v-show="permission.indexOf('查看')!=-1" @click="lookMsg(scope.row,$event)">查看</span>
            <span v-show="scope.row.status == '2' && permission.indexOf('撤销')!=-1" @click="cancelMsg(scope.row)">撤销</span>
            <span v-show="scope.row.status == '2' && permission.indexOf('归档')!=-1" @click="fileMsg(scope.row)">归档</span>
            <span @click="reStart(scope.row)" v-show="permission.indexOf('再发起')!=-1">再发起</span>
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

  <!--撤销原因 -->
  <el-dialog title="提示" :visible.sync="cancelVisible" v-draggable width="500px">
    <div class="module-opera">
      <el-form :model="cancelForm" label-width="85px">
        <el-form-item label="撤销原因：" class="mustForm mustForm-10">
          <el-input type="textarea" v-model="cancelForm.reasonForCancel"></el-input>
        </el-form-item>
      </el-form>
    </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="cancelVisible = false" class="false" size="mini">取 消</el-button>
    <el-button type="primary" @click="cancelComfire" size="mini">确 定</el-button>
	</span>
  </el-dialog>

  <!--归档原因 -->
  <el-dialog title="提示" :visible.sync="fileVisible" v-draggable width="500px">
    <div class="module-opera">
      <el-form :model="cancelForm" label-width="85px">
        <el-form-item label="归档原因：">
          <el-input type="textarea" v-model="fileForm.reasonForCancel"></el-input>
        </el-form-item>
      </el-form>
    </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="fileVisible = false" class="false" size="mini">取 消</el-button>
    <el-button type="primary" @click="fileComfire" size="mini">确 定</el-button>
	</span>
  </el-dialog>

  <!-- 导出列表 -->
  <form style="display:none" name="form" method="POST" ref="submitExcel" id="submitExcel" :action="hostBaseUrl+'/recruit/demand/exportDemand'">
    <p>startTime: <input type="text" id="startTime" name="startTime" value="" /></p>
    <p>endTime: <input type="text" id="endTime" name="endTime" value="" /></p>
    <p>status: <input type="text" id="status" name="status" value="" /></p>
    <p>keyword: <input type="text" id="keyword" name="keyword" value="" /></p>
    <p>orgIds: <input type="text" id="orgIds" name="orgIds" value="" /></p>
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
import { getPostList, updatePost } from 'static/api/recruit/post/post'
import { getRecuitStatus } from 'assets/js/filters'
import Pagination from 'components/Pagination.vue'
import { timeZeroToString } from 'assets/js/common'
import { listByUserId } from 'static/api/common/common'
import { getToken } from 'assets/js/util'
import { hostBaseUrl } from 'utils/config'
import ChooseColumnSearch from 'components/ChooseColumnSearch'
import { getExmine } from 'assets/js/exmine'
import MutilSearchDeptTree from 'components/MutilSearchDeptTree'
import { debounce } from 'lodash'
const postForm = {
  orgIds: [],
  keyWords: '',
  orgName: '',
  startTime: '',
  endTime: '',
  status: ''
}
const pageMsg = {
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 20, 50],
  total: 0
}
export default {
  data () {
    return {
      /* 多选树 */
      mutilTreeData: {
        filterName: '',
        orgIds: [],
        dataTree: [],
        checkDatas: [],
        showTree: false
      },
      /* 高级查询 */
      chooseData: {
        chooseVisible: false,
        deepSearchVisible: false,
        filedType: 'demand',
        fieldList: [],
        selectedWordArr: [{ orderColumn: '', prop: '', op: '', value: '', width: '', searchFlag: '' }]
      },
      hostBaseUrl: '',
      cancelVisible: false,
      cancelForm: {
        id: '',
        reasonForCancel: '',
        status: ''
      },
      postListDatas: [],
      postForm: Object.assign({}, postForm),
      statusSelect: [
        { value: '2', label: '招聘中' },
        { value: '4', label: '已撤销' },
        { value: '5', label: '已归档' }
      ],
      pageMsg: Object.assign({}, pageMsg),
      // 选择显示字段
      fieldList: [],
      prop: '',
      order: '',
      options: [],
      fileVisible: false,
      fileForm: {
        reasonForCancel: '',
        id: '',
        status: ''
      }
    }
  },
  methods: {
    // 清空搜索条件
    refresh () {
      this.chooseData.selectedWordArr = [{ orderColumn: '', prop: '', op: '', value: '', width: '', searchFlag: '' }]
      this.options = []
      this.postForm = Object.assign({}, postForm)
      this.pageMsg = Object.assign({}, pageMsg)
      this.mutilTreeData.orgIds = []
      setTimeout(() => {
        this.$refs['mutilRef']._setCheckedKeys([])
        this.searchPostList()
        this._setDefaultLocalData()
      }, 100)
    },
    /* 导出 */
    ExportMsg () {
      document.getElementById('startTime').setAttribute('value', this.postForm.startTime ? timeZeroToString(this.postForm.startTime) : '')
      document.getElementById('endTime').setAttribute('value', this.postForm.endTime ? timeZeroToString(this.postForm.endTime) : '')
      document.getElementById('status').setAttribute('value', this.postForm.status)
      document.getElementById('keyword').setAttribute('value', this.postForm.keyWords)
      document.getElementById('orgIds').setAttribute('value', this.mutilTreeData.orgIds.length ? this.mutilTreeData.orgIds.join(' ') : '')
      // console.log(this.$refs.submitExcel)
      this.$refs.submitExcel.submit()
    },
    lookMsg (row, event) {
      this.$router.push({ name: '职位查看', params: { postId: row.id } })
    },
    _getpostList () {
      getPostList(this.postParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.postListDatas = data.result.records
          }
          this.pageMsg.total = data.result.total
        }
      })
    },
    handleSizeChange (pageSize) {
      this.pageMsg.pageSize = pageSize
      this._getpostList()
    },
    handleCurrentChange (currentPage) {
      this.pageMsg.currentPage = currentPage
      this._getpostList()
    },
    addPost () {
      this.$router.push('/recruitment/post/post-add')
    },
    // 再发起
    reStart (row) {
      this.$router.push({
        path: '/recruitment/post/post-add',
        query: { edit: 'true', postId: row.id }
      })
    },
    /* 归档确认 */
    fileMsg (row) {
      this.fileForm.id = row.id
      this.fileForm.status = row.status
      this.$confirm('我已完成招聘，是否要归档', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.fileForm.reasonForCancel = ''
        this.fileVisible = true
      }).catch(() => {})
    },
    /* 再次归档确认 */
    fileComfire () {
      this.fileForm.status = 5
      let preload = {
        id: this.fileForm.id,
        status: this.fileForm.status,
        reasonForCancel: this.fileForm.reasonForCancel
      }
      updatePost(preload).then(res => {
        this.$message.success('归档成功')
        setTimeout(() => {
          this._getpostList()
        }, 500)
        this.fileVisible = false
      })
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
      setTimeout(() => {
        this.handleCurrentChange(1)
      }, 200)
    },
    cancelMsg (row) {
      this.cancelForm.id = row.id
      this.cancelForm.status = 4
      this.cancelForm.reasonForCancel = ''
      this.cancelVisible = true
    },
    cancelComfire: debounce(function () {
      this.$store.commit('BTN_LOADING', true)
      let preload = {
        id: this.cancelForm.id,
        reasonForCancel: this.cancelForm.reasonForCancel,
        status: this.cancelForm.status
      }
      if (!this.cancelForm.reasonForCancel) {
        this.$message.warning('请填写撤销原因!')
        return
      }
      updatePost(preload).then(res => {
        this.$message.success('撤销成功')
        setTimeout(() => {
          this.cancelVisible = false
          this._getpostList()
        }, 500)
      })
    }, 500),
    searchPostList () {
      this.handleCurrentChange(1)
    },
    // 选择显示字段
    chooseMsg () {
      this.chooseData.chooseVisible = true
      this.chooseData.fieldList = this.fieldList.map(item => item.prop)
      // this.$refs.chooseColumn.chooseMsg()
    },
    // 获取原来选择字段
    _getUserFiled () {
      let preload = {
        userId: getToken('loginId').toString(),
        type: 'demand'
      }
      listByUserId(preload).then(data => {
        if (data.result) {
          this.fieldList = data.result
        }
        setTimeout(() => {
          this._getpostList()
        }, 10)
      })
    },
    // 排序
    sortChange (column, prop, order) {
      if (column && column.prop) {
        let orderColumn = this.fieldList.filter(item => item.prop === column.prop)[0].orderColumn
        this.prop = orderColumn
        this.order = column.order
        this._getpostList()
      } else {
        this.prop = ''
        this.order = ''
        this._getpostList()
      }
    },
    _setDefaultLocalData () {
      const searchParams = Object.assign({}, this.postForm, {
        orgIds: this.mutilTreeData.orgIds
      })
      const searchParamsForm = Object.assign({}, { searchForm: JSON.stringify(searchParams) }, { pageMsg: JSON.stringify(this.pageMsg) })
      this.setSearchParams(searchParamsForm, this.currentRouteName)
    },
    // 设置默认搜索项
    _setDefaultSearch () {
      const searchParams = this.getSearchParams({}, this.$route.name)
      const { pageMsg, searchForm } = searchParams
      const pageMsg1 = pageMsg ? JSON.parse(pageMsg) : Object.assign({}, pageMsg)
      const postParams = searchForm ? JSON.parse(searchForm) : Object.assign({}, postForm)
      console.log('searchForm', searchForm)
      this.pageMsg = pageMsg1
      this.postForm = postParams
      this.mutilTreeData.orgIds = searchForm ? JSON.parse(searchForm).orgIds : []
      // mutilRef
      setTimeout(() => {
        this.$refs['mutilRef']._setCheckedKeys(postParams.orgIds)
      }, 100)
      // this.$refs.mutilRef._setCheckedKeys(JSON.parse(searchForm).orgIds)
    }
  },
  components: {
    Pagination,
    ChooseColumnSearch,
    MutilSearchDeptTree
  },
  computed: {
    currentRouteName () {
      return this.$route.name
    },
    permission () {
      return getExmine().recruitPost
    },
    postParams () {
      return {
        page: this.pageMsg.currentPage,
        size: this.pageMsg.pageSize,
        status: this.postForm.status,
        startTime: this.postForm.startTime ? timeZeroToString(this.postForm.startTime) : '',
        endTime: this.postForm.endTime ? timeZeroToString(this.postForm.endTime) : '',
        keyword: this.postForm.keyWords,
        orgIds: this.mutilTreeData.orgIds ? this.mutilTreeData.orgIds : [],
        options: this.options,
        prop: this.prop,
        order: this.order
      }
    },
    pickerOptions () {
      return {
        disabledDate: (time) => {
          return new Date(time).getTime() < new Date(this.postForm.startTime).getTime()
        }
      }
    }
  },
  filters: {
    filterRecuitStatus (status) {
      return getRecuitStatus(status)
    }
  },
  beforeRouteLeave (to, from, next) {
    this._setDefaultLocalData()
    next()
  },
  created () {
    this._getUserFiled()
    this.hostBaseUrl = hostBaseUrl
    this._setDefaultSearch()
    if (this.$store.state.clickType === 'left') {
      this.refresh()
    }
  }
}
</script>

<style scoped lang="less">
.pt3{
  padding-top:3px;
}
</style>
