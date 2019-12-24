<template>
<div class="person-job_box">
  <el-table
    :data="jobForm"
    highlight-current-row
    border>
    <el-table-column
      type="index"
      width="60"
      label="序号">
    </el-table-column>
    <el-table-column
      prop="startDate"
      label="开始年月">
      <template slot-scope="scope">
        <el-date-picker
          v-model="scope.row.startDate"
          type="month"
          value-format="yyyy-MM-dd"
          placeholder="选择时间">
        </el-date-picker>
      </template>
    </el-table-column>
    <el-table-column
      prop="endDate"
      label="结束年月">
      <template slot-scope="scope">
        <el-date-picker
          v-model="scope.row.endDate"
          type="month"
           value-format="yyyy-MM-dd"
          placeholder="选择时间"
          width="200">
        </el-date-picker>
      </template>
    </el-table-column>
    <el-table-column
      prop="workUnit"
      label="工作单位">
      <template slot-scope="scope">
        <el-input v-model="scope.row.workUnit" placeholder="请填写工作单位"></el-input>
      </template>
    </el-table-column>
    <el-table-column
      prop="post"
      label="岗位">
      <template slot-scope="scope">
        <el-input v-model="scope.row.post" placeholder="请填写岗位"></el-input>
      </template>
    </el-table-column>
    <el-table-column
      prop="certifier"
      label="证明人">
      <template slot-scope="scope">
        <el-input v-model="scope.row.certifier" placeholder="请填写证明人"></el-input>
      </template>
    </el-table-column>
    <el-table-column
      prop="telephone"
      label="证明人电话">
      <template slot-scope="scope">
        <el-input type="number" min='0' v-model="scope.row.telephone" placeholder="请填写证明人电话" ></el-input>
      </template>
    </el-table-column>
      <el-table-column
      label="操作"
      width="120px">
        <template slot-scope="scope">
          <span @click="delListData(scope.row.id, scope.$index)" class="icon delete-color">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="mt-15">
      <el-col :span="1"><el-button type="primary" size="small" @click="addWorkMsg">新增</el-button></el-col>
        <!-- <el-col :span="1"  v-if="resumeInformation.length!==0"><el-button type="danger" size="small" @click="deletEduMsg">删除</el-button></el-col> -->
    </el-row>
</div>
</template>
<script>
import { checkAcceptJobDetail, checkAcceptJobDetailStaff } from 'static/api/recruit/accept/accept'
export default {
  data () {
    return {
      jobForm: []
    }
  },
  computed: {
    employeeId () {
      return this.$route.query.employeeId || this.$route.params.id
    }
  },
  methods: {
    addWorkMsg () {
      this.jobForm.push({
        startDate: '',
        endDate: '',
        workUnit: '',
        certifier: '',
        post: '',
        phone: ''
      })
    },
    getJobDatas () {
      return this.jobForm.filter(x => x.startDate || x.endDate || x.workUnit || x.certifier || x.post || x.telephone)
    },
    _getJobDatas () {
      return this.jobForm
    },
    delListData (id, index) {
      this.$emit('delJob', id, index)
    },
    _getJobList () {
      const copyToken = this.$route.query.copyToken
      if (!copyToken) {
        if (this.employeeId) {
          checkAcceptJobDetail(this.employeeId).then(data => {
            if (data.result) {
              this.jobForm = data.result
            }
          })
        }
      }
    }
  },
  watch: {
    '$store.state.entryDetailId' (value) {
      if (value && this.$route.query.copyToken) {
        checkAcceptJobDetailStaff(this.$store.state.entryDetailId).then(data => {
          if (data.result) {
            this.jobForm = data.result
          }
        })
      }
    }
  },
  created () {
    this._getJobList()
  }
}
</script>
