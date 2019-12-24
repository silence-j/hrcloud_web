<template>
<div class="person-resume_box">
  <el-form label-width="100px">
    <el-table
    :data="resumeForm"
    :highlight-current-row="true"
    border>
    <el-table-column
      type="index"
      width="70"
      label="序号">
    </el-table-column>
    <el-table-column
      label="开始年月"
      prop="startDate">
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
            placeholder="选择时间">
          </el-date-picker>
        </template>
      </el-table-column>
      <el-table-column
        prop="school"
        label="学校">
        <template slot-scope="scope">
          <el-input v-model="scope.row.school" placeholder="请填写学校"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="major"
        label="专业">
        <template slot-scope="scope">
          <el-input v-model="scope.row.major" placeholder="请填写专业"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="学历">
        <template slot-scope="scope">
          <el-select v-model="scope.row.education" placeholder="请选择学历">
          <el-option
            v-for="item in eduOption"
            :label="item.codeText"
            :value="item.id"
            :key="item.id"
            :disabled="item.disabled">
          </el-option>
          </el-select>
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
  </el-form>
  <el-row class="mt-15">
    <el-col :span="1"><el-button type="primary" size="small" @click="addEduMsg">新增</el-button></el-col>
      <!-- <el-col :span="1"  v-if="resumeInformation.length!==0"><el-button type="danger" size="small" @click="deletEduMsg">删除</el-button></el-col> -->
  </el-row>
</div>
</template>
<script>
import { checkAcceptResumeDetail, checkAcceptResumeDetailStaff } from 'static/api/recruit/accept/accept'
import { getSysDic } from 'static/api/common/common'
export default {
  data () {
    return {
      resumeForm: [],
      SelectOption: [],
      eduOption: []
    }
  },
  computed: {
    employeeId () {
      return this.$route.query.employeeId || this.$route.params.id
    }
  },
  methods: {
    addEduMsg () {
      this.resumeForm.push({
        startDate: '',
        endDate: '',
        school: '',
        pross: '',
        record: '',
        major: '',
        id: ''
      })
    },
    delListData (id, index) {
      this.$emit('delResume', id, index)
    },
    getResumeDatas () {
      return this.resumeForm.filter(x => x.startDate || x.endDate || x.school || x.pross || x.record || x.major || x.education)
    },
    _getResumeDatas () {
      return this.resumeForm
    },
    // 获取学历经历
    _getResumeList () {
      const copyToken = this.$route.query.copyToken
      if (!copyToken) {
        if (this.employeeId) {
          checkAcceptResumeDetail(this.employeeId).then(data => {
            if (data.result) {
              this.resumeForm = data.result
            }
          })
        }
      }
    },
    /* 获取数字字典 */
    async _getQueryClassList () {
      /* 学历 */
      await getSysDic('education').then(data => {
        if (data.result) {
          let eduIds = this.resumeForm.map(item => item.education)
          data.result.forEach(item => {
            if (item.enable === 1 || eduIds.indexOf(item.id) !== -1) {
              item.disabled = false
              if (item.enable === 2) {
                item.disabled = true
              }
              this.eduOption.push(item)
            }
          })
        }
      })
    }
  },
  watch: {
    '$store.state.entryDetailId' (value) {
      if (value && this.$route.query.copyToken) {
        checkAcceptResumeDetailStaff(this.$store.state.entryDetailId).then(data => {
          if (data.result) {
            this.resumeForm = data.result
          }
        })
      }
    }
  },
  /*  watch: {
    'resumeForm' (value) {
      if (value && !this.educationCount) {
        this._getQueryClassList()
        this.educationCount = true
      }
    }
  }, */
  created () {
    this._getResumeList()
    this._getQueryClassList()
  }
}
</script>
