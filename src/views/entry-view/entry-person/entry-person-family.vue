<template>
<div class="person-familt_box">
  <el-table
    :data="familyForm"
    highlight-current-row
    border>
    <el-table-column
      type="index"
      width="60px"
      label="序号">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名">
      <template slot-scope="scope">
        <el-input v-model="scope.row.name"  placeholder="请填写姓名"></el-input>
      </template>
    </el-table-column>
    <el-table-column
      label="称呼">
      <template slot-scope="scope">
        <el-select v-model="scope.row.relation"  placeholder="请选择称呼">
          <el-option
            v-for="item in relationOption"
            :label="item.codeText"
            :value="item.id"
            :key="item.id"
            :disabled="item.disabled">
          </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column
      label="年龄">
      <template slot-scope="scope">
        <el-input type="number" v-model="scope.row.age"  placeholder="请填写年龄"></el-input>
      </template>
    </el-table-column>
    <el-table-column
      prop="workUnit"
      label="工作单位">
      <template slot-scope="scope">
        <el-input v-model="scope.row.workUnit"  placeholder="请填写工作单位"></el-input>
      </template>
    </el-table-column>
    <el-table-column
      prop="post"
      label="职务">
      <template slot-scope="scope">
        <el-input v-model="scope.row.post"  placeholder="请填写职务"></el-input>
      </template>
    </el-table-column>
    <el-table-column
      prop="telephone"
      label="联系电话">
      <template slot-scope="scope">
        <el-input type="number" min="0" v-model="scope.row.telephone"  placeholder="请填写联系电话" ></el-input>
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
    <el-col :span="1"><el-button type="primary" size="small" @click="addFamilyMsg">新增</el-button></el-col>
  </el-row>
</div>
</template>
<script>
import { checkAcceptFamilyDetail, checkAcceptFamilyDetailStaff } from 'static/api/recruit/accept/accept'
import { getSysDic } from 'static/api/common/common'
export default {
  data () {
    return {
      familyForm: [],
      relationOption: []
    }
  },
  computed: {
    employeeId () {
      return this.$route.query.employeeId || this.$route.params.id
    }
  },
  methods: {
    addFamilyMsg () {
      this.familyForm.push({
        name: '',
        relation: '',
        birthday: '',
        workUnit: '',
        post: '',
        telephone: ''
      })
    },
    delListData (id, index) {
      this.$emit('delFamily', id, index)
    },
    getFamilyDatas () {
      return this.familyForm.filter(x => x.name || x.relation || x.birthday || x.workUnit || x.post || x.telephone || x.age)
    },
    _getFamilyDatas () {
      return this.familyForm
    },
    _getFamilyList () {
      const copyToken = this.$route.query.copyToken
      if (!copyToken) {
        if (this.employeeId) {
          checkAcceptFamilyDetail(this.employeeId).then(data => {
            if (data.result) {
              this.familyForm = data.result
              // console.log('家庭显示', this.familyForm)
            }
          })
        }
      }
    },
    /* 获取数字字典 */
    async _getQueryClassList () {
      /* 家庭成员称呼 */
      await getSysDic('relation').then((data) => {
        if (data.result) {
          let reaIds = this.familyForm.map(item => item.relation)
          data.result.forEach(item => {
            if (item.enable === 1 || reaIds.indexOf(item.id) !== -1) {
              item.disabled = false
              if (item.enable === 2) {
                item.disabled = true
              }
              this.relationOption.push(item)
            }
          })
        }
      })
    }
  },
  watch: {
    '$store.state.entryDetailId' (value) {
      if (value && this.$route.query.copyToken) {
        checkAcceptFamilyDetailStaff(this.$store.state.entryDetailId).then(data => {
          if (data.result) {
            this.familyForm = data.result
          }
        })
      }
    }
  },
  /* watch: {
    'familyForm' (value) {
      if (value && !this.relationCount) {
        this._getQueryClassList()
        this.relationCount = true
      }
    }
  }, */
  created () {
    this._getFamilyList()
    this._getQueryClassList()
  }
}
</script>
