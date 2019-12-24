<template>
  <div class="owner-box" @click="showTreeTag=false">
    <el-table
      :data="taskFinshDatas"
      border>
      <el-table-column
        label="序号"
        type="index"
        width="60px">
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="name"
        width="150px">
      </el-table-column>
      <el-table-column
        label="身份证号"
        prop="idNo">
      </el-table-column>
      <el-table-column
        label="部门"
        prop="deptName">
      </el-table-column>
      <el-table-column
        label="岗位"
        prop="postName"
        width="230px">
      </el-table-column>
      <el-table-column
        label="联系方式"
        prop="telephone">
      </el-table-column>
      <el-table-column
        label="创建时间">
        <template slot-scope="scope">
          {{scope.row.createTime}}
        </template>
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <div v-if="scope.row.realityEndTime === null && scope.row.task !== null" >
            {{scope.row.task.name}}中
          </div>
          <div v-else>
            <div v-if="scope.row.historicVariableInstance !== null && scope.row.reason !==''">
              <div v-if="scope.row.historicVariableInstance.value === '撤销操作'">
                <span>已撤销</span>
              </div>
              <div v-else>
                <el-tooltip placement="top" effect="light">
                  <div slot="content" style="width: 130px;height: 55px;overflow: auto;">{{scope.row.historicVariableInstance.value}}</div>
                  <span>被驳回</span>
                </el-tooltip>
              </div>
            </div>
            <span v-else>已完成</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="办理人">
        <template slot-scope="scope">
          <div v-if="scope.row.historicTaskInstance!==null">
            {{scope.row.historicTaskInstance.assignee | filterName}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="140px"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <div class="operation">
            <span @click="lookMsg(scope.row)">查看</span>
             <span @click="revoke(scope.row)"
                  v-if="scope.row.task !== null && scope.row.task.name === '录用审核'">撤销</span>
            <span @click="classifyMsg(scope.row)"
                  v-if="scope.row.realityEndTime !== null && scope.row.historicVariableInstance && scope.row.reason !==''">重新评估</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageMsg.currentPage"
      :page-sizes="pageMsg.pageSizes"
      :page-size="pageMsg.pageSize"
      :total="pageMsg.total">
    </pagination>

    <el-dialog
      title="重新评估"
      :visible.sync="classifyVisible"
      v-draggable
      width="500px">
      <div class="module-opera">
        <el-form
        :model="classifyForm"
         label-width="118px"
         >
          <el-form-item label="人 才 分 类：" class="mustForm">
            <el-select v-model="classifyForm.status" placeholder="请选择" style="width:100%">
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
              <el-input readonly @focus="chooseJoy"  v-model="classifyForm.entryType" placeholder="请输入新岗位"></el-input>
            </el-form-item>
          </div>
          <div v-if="classifyForm.status == 1">
            <el-form-item class="mustForm" label="填写原因：">
              <el-input type="textarea" v-model="classifyForm.remark"></el-input>
            </el-form-item>
          </div>
          <div v-if="classifyForm.status == 4">
            <el-form-item class="mustForm" label="储备原因：">
              <el-input type="textarea" v-model="classifyForm.remark"></el-input>
            </el-form-item>
          </div>
           <div v-if="classifyForm.status == 17">
            <el-form-item label="未面试原因："  class="mustForm mustForm1" >
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
    <el-button @click="classifyVisible = false" class="false" size="mini">取 消</el-button>
    <el-button type="primary" @click="classifyComfire" size="mini">确 定</el-button>
	</span>
    </el-dialog>
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
      <div style="text-align: center;margin-top: 10px">
        <el-button @click="applyJoy = false">取消</el-button>
        <el-button @click="sureApply">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getTaskFinshed, assessCallback } from 'static/api/recruit/entry/entry'
import { getToken } from 'assets/js/util'
import { timeZeroToString } from 'assets/js/common'
import { editClassify, searchJoy } from 'static/api/recruit/accept/accept'
import { getTaskComplete } from 'static/api/exmine/exmine'
import Pagination from 'components/Pagination.vue'
import { mapGetters } from 'vuex'
import { getExmine } from 'assets/js/exmine'
import { debounce } from 'lodash'
export default {
  data () {
    return {
      taskFinshDatas: [],
      classifyVisible: false,
      showTreeTag: false,
      pageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      demandId: '',
      joyList: [],
      applyJoy: false,
      isChoose: -1,
      classifyForm: {
        status: '',
        orgName: '',
        remark: '',
        postName: this.getAcceptPName,
        orgId: '',
        remarks: '',
        startTime: '',
        endTime: ''
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
  computed: {
    ...mapGetters(['getVerifyEntrySearchArr', 'getVerifyEntryClick', 'getAcceptPName']),
    permission () {
      return getExmine().recruitAccept
    },
    taskFinshedParams () {
      return {
        userId: getToken('loginId').toString(),
        actType: 'entry',
        searchType: 'ower',
        keyword: this.getVerifyEntrySearchArr.keyWord,
        /* idKeyWord: this.getVerifyEntrySearchArr.idKeyWord, */
        startTime: this.getVerifyEntrySearchArr.startTime ? timeZeroToString(this.getVerifyEntrySearchArr.startTime) : '',
        endTime: this.getVerifyEntrySearchArr.endTime ? timeZeroToString(this.getVerifyEntrySearchArr.endTime) : '',
        page: this.pageMsg.currentPage,
        size: this.pageMsg.pageSize
      }
    }
  },
  components: {
    Pagination
  },
  methods: {
    // 选择带应聘职位
    chooseJoy () {
      searchJoy({ selectFlag: '1', size: 10000 }).then(res => {
        if (res.result) {
          this.joyList = res.result.records
        }
      })
      this.applyJoy = true
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
        this.classifyForm.entryType = cur
        this.demandId = this.joyList[this.isChoose].id
        this.prossData = this.joyList[this.isChoose]
        this.$store.commit('SET_ACCEPT_P_NAME', this.classifyForm.postName)
        this.$store.commit('SET_ACCEPT_PARAM_ORGID', this.joyList[this.isChoose].orgId)
        this.$store.commit('SET_ACCEPT_PARAM_ORGNAME', this.joyList[this.isChoose].orgName)
        this.$store.commit('SET_ACCEPT_PARAM_POSTNAME', this.joyList[this.isChoose].postName)
        this.applyJoy = false
      }
    },
    // 获取列表
    _getTaskList () {
      this.taskFinshDatas = []
      getTaskFinshed(this.taskFinshedParams).then(data => {
        if (data.result) {
          this.taskFinshDatas = data.result.records
          this.pageMsg.total = data.result.total
        }
      })
    },
    // 撤销
    revoke (row) {
      let newPassKey = row.task.taskDefinitionKey
      newPassKey = (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass') + ',' + (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'BackReason')
      let valuePost = false + ',撤销操作'
      let revokeParams = {
        actType: 'entry',
        userId: 'rolluser',
        pId: row.task.processInstanceId,
        id: row.id,
        taskId: row.task.id,
        owner: row.userId,
        var: {
          keys: newPassKey,
          values: valuePost,
          types: 'B,S'
        }
      }
      let Params = {
        auditStatus: 2,
        userId: row.employeeId
      }
      this.$confirm('确定要撤销' + row.name + '入职申请吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        assessCallback(Params).then(res => {
          getTaskComplete(revokeParams).then(data => {
            this.$message.success('撤销成功')
            this._getTaskList()
          })
        })
      }).catch(() => {})
    },
    handleSizeChange (pageSize) {
      this.pageMsg.pageSize = pageSize
      this._getTaskList()
    },
    handleCurrentChange (currentPage) {
      this.pageMsg.currentPage = currentPage
      this._getTaskList()
    },
    // 查看详情
    lookMsg (row) {
      this.$router.push({ name: 'VerifyOwnerDetail', params: { acceptId: row.employeeId, come: '/verify/entry/owner' } })
    },
    showDeptTree () {
      this.showTreeTag = true
    },
    getSerId (val) {
      if (val) {
        this.classifyForm.orgId = val.split('-')[0]
        this.classifyForm.orgName = val.split('-')[1]
      }
    },
    /** 驳回重新评估**/
    classifyMsg (row) {
      this.classifyForm.startTime = ''
      this.classifyForm.status = ''
      this.demandId = ''
      this.classifyForm.userId = row.employeeId
      this.classifyForm.entryType = row.entryType
      this.classifyForm.postName = row.postName
      this.classifyForm.orgName = row.deptName
      this.classifyForm.orgId = row.deptNo
      this.classifyVisible = true
    },
    classifyComfire: debounce(function () {
      let preload = {
        userId: this.classifyForm.userId,
        remark: this.classifyForm.remark,
        status: this.classifyForm.status,
        orgId: this.classifyForm.orgId,
        orgName: this.classifyForm.orgName,
        postName: this.classifyForm.postName,
        isRedo: 1
      }
      if (!this.classifyForm.status) {
        this.$message.warning('请选择人才分类')
        return
      }
      if (this.classifyForm.status === '3') {
        if (this.classifyForm.postName === '') {
          this.$message.warning('请填新岗位')
          return
        } else {
          if (this.demandId) preload.demandId = this.demandId
        }
      }
      if (this.classifyForm.status === '1' || this.classifyForm.status === '4') {
        if (this.classifyForm.remark === '') {
          this.$message.warning('请填原因')
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
      editClassify(preload).then(res => {
        this.$message.success('评估成功')
        setTimeout(() => {
          this._getTaskList()
        }, 400)

        setTimeout(() => {
          this.classifyVisible = false
        }, 100)
      })
    }, 500),
    changeDate (value) {
      let time = new Date(value)
      let year = time.getFullYear()
      let month = (time.getMonth() < 9 ? '0' : '') + (time.getMonth() + 1)
      let day = (time.getDate() < 10 ? '0' : '') + time.getDate()
      let hour = (time.getHours() < 10 ? '0' : '') + time.getHours()
      let minute = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes()
      // let second = (time.getSeconds() < 10 ? '0' : '') + time.getSeconds()
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    }
  },
  filters: {
    filterName (value) {
      return value
    }
  },
  watch: {
    getVerifyEntryClick (value) {
      if (value) {
        this.handleCurrentChange(1)
        this.$store.commit('SET_VERIFY_ENTRY_CLICKED', false)
      }
    }
  },
  created () {
    this._getTaskList()
  }
}
</script>
