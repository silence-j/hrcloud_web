<template>
  <div class="container">
    <el-table
      :data="verifyOwnerDatas"
      border
      tooltip-effect="dark"
      class="mt-20"
    >
      <el-table-column
        label="序号"
        type="index"
        width="60">
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="name"
        width="120px">
      </el-table-column>
      <el-table-column
        label="身份证号"
        prop="idNo"
        width="180px">
      </el-table-column>
      <el-table-column
        label="手机号"
        prop="telephone"
        width="140px">
      </el-table-column>
      <el-table-column
        label="一级成员"
        prop="levelOne"
        width="150px">
      </el-table-column>
      <el-table-column
        label="所在部门"
        prop="deptName"
        width="150px">
      </el-table-column>
      <el-table-column
        label="修改字段"
        prop="changeName"
        width="150px">
      </el-table-column>
      <el-table-column
        label="原值"
        prop="oldData"
        width="150px">
        <template slot-scope="scope">
          <span v-if="scope.row.changeName == '人员状态变化'" @mouseover="lookDesc(scope.row, 'old')" class="btn">查看</span>
          <span @mouseover="lookFamilyDesc(scope.row, 'old')" v-else-if="scope.row.changeName == '健康状况' || scope.row.changeName == '学习简历' || scope.row.changeName == '工作简历'
             || scope.row.changeName == '家庭成员信息' || scope.row.changeName == '学历信息' || scope.row.changeName == '工资卡信息'" class="btn">查看</span>
          <span v-else-if="scope.row.changeName == '体重'">{{scope.row.oldData ? scope.row.oldData : 0}}KG</span>
          <span v-else-if="scope.row.changeName == '身高'">{{scope.row.oldData ? scope.row.oldData : 0}}CM</span>
          <span v-else="" v-html="scope.row.oldData"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="新值"
        prop="newData"
        width="150px">
        <template slot-scope="scope">
          <span v-if="scope.row.changeName === '人员状态变化'" @mouseover="lookDesc(scope.row, 'new')" class="btn">查看</span>
          <span @mouseover="lookFamilyDesc(scope.row, 'new')" v-else-if="scope.row.changeName == '健康状况' || scope.row.changeName == '学习简历' || scope.row.changeName == '工作简历'
             || scope.row.changeName == '家庭成员信息' || scope.row.changeName == '学历信息' || scope.row.changeName == '工资卡信息'" class="btn">查看</span>
          <span v-else-if="scope.row.changeName == '体重'">{{scope.row.newData ? scope.row.newData : 0}}KG</span>
          <span v-else-if="scope.row.changeName == '身高'">{{scope.row.newData ? scope.row.newData : 0}}CM</span>
          <span v-else="" v-html="scope.row.newData"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="说明"
        prop="remark"
        width="150px">
      </el-table-column>
      <el-table-column
        label="申请人"
        prop="userName"
        width="120px">
      </el-table-column>
      <el-table-column
        label="申请时间"
        prop="createTime"
        width="200px">
      </el-table-column>
      <el-table-column
        label="状态"
        width="150px">
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
        label="操作"
        fixed="right"
        min-width="120px">
        <template slot-scope="scope">
          <div class="operation">
            <span @click="reBack(scope.row)"
                  v-if="scope.row.task !== null && scope.row.task.name === '人事负责人审批'">撤销</span>
            <!--<span @click="reStart(scope.row)"-->
                  <!--v-if="scope.row.realityEndTime !== null && scope.row.historicVariableInstance && scope.row.reason !==''">重新发起</span>-->
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      @size-change="handleCownerSizeChange"
      @current-change="handleCownerCurrentChange"
      :current-page="cownerPageMsg.currentPage"
      :page-sizes="cownerPageMsg.pageSizes"
      :page-size="cownerPageMsg.pageSize"
      :total="cownerPageMsg.total">
    </pagination>
    <OldCarrer v-if="oldCarrer" :form="oldCarrerData" @close="oldCarrer = false;oldCarrerData = {}"/>
    <NewCarrer v-if="newCarrer" :form="oldCarrerData" @close="newCarrer = false;oldCarrerData = {}"/>
    <OldReport v-if="oldReport" :form="oldCarrerData" @close="oldReport = false;oldCarrerData = {}"/>
    <NewReport v-if="newReport" :form="oldCarrerData" @close="newReport = false;oldCarrerData = {}"/>
    <OldPosition v-if="oldPosition" :form="oldCarrerData" @close="oldPosition = false;oldCarrerData = {}"/>
    <NewPosition v-if="newPosition" :form="oldCarrerData" @close="newPosition = false;oldCarrerData = {}"/>
    <PersonTable v-if="personTable" :form="personData" @close="personTable = false;personData = {}"/>
    <NoData v-if="noData" @close="noData = false;"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { timeZeroToString } from 'assets/js/common'
import { getToken } from 'assets/js/util'
import { getTaskFinshed, changeUpdateAuit, changeUpdateDesc } from 'static/api/recruit/entry/entry'
import { updateDesc, updateFamilyDesc, isInCompany, checkAccept } from 'static/api/personnel-information/job/job'
import Pagination from 'components/Pagination.vue'
import OldCarrer from 'components/infoDesc/oldCarrer.vue' // 入职旧值
import NewCarrer from 'components/infoDesc/newCarrer.vue' // 入职新值
import OldReport from 'components/infoDesc/oldReport.vue' // 报到新值
import NewReport from 'components/infoDesc/newReport.vue' // 报到新值
import OldPosition from 'components/infoDesc/oldPosition.vue' // 转正新值
import NewPosition from 'components/infoDesc/newPosition.vue' // 转正新值
import PersonTable from 'components/infoDesc/personTable.vue' // 转正新值
import NoData from 'components/infoDesc/noData.vue' // 无数据
import { Promise } from 'q'
export default {
  data () {
    return {
      oldCarrer: false,
      newCarrer: false,
      oldReport: false,
      newReport: false,
      oldPosition: false,
      newPosition: false,
      personTable: false,
      noData: false,
      oldCarrerData: {},
      personData: '',
      // personData: {
      //   type: '',
      //   isIn: '',
      //   person: []
      // },
      cownerPageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      verifyOwnerDatas: []
    }
  },
  computed: {
    ...mapGetters(['getCorrectSearchArr', 'getCorrectSearchClick']),
    correctOwnerParams () {
      return {
        actType: 'correct',
        searchType: 'owner',
        userId: getToken('loginId').toString(),
        keyword: this.getCorrectSearchArr.namePhone,
        // changeNames: this.getCorrectSearchArr.field ? this.getCorrectSearchArr.field.join(',') : '',
        startTime: this.getCorrectSearchArr.startTime ? timeZeroToString(this.getCorrectSearchArr.startTime) : '',
        endTime: this.getCorrectSearchArr.endTime ? timeZeroToString(this.getCorrectSearchArr.endTime) : '',
        page: this.cownerPageMsg.currentPage,
        size: this.cownerPageMsg.pageSize
      }
    }
  },
  components: {
    Pagination, OldCarrer, NewCarrer, OldReport, NewReport, OldPosition, NewPosition, PersonTable, NoData
  },
  methods: {
    handleCownerSizeChange (pageSize) {
      this.cownerPageMsg.pageSize = pageSize
      this._getOwnerTaskList()
    },
    handleCownerCurrentChange (currentPage) {
      this.cownerPageMsg.currentPage = currentPage
      this._getOwnerTaskList()
    },
    // 个人信息查看
    lookFamilyDesc (row, type) {
      let value = type === 'old' ? row.oldData : row.newData
      if (!value) {
        this.noData = true
        return
      }
      let params = {
        changeName: row.changeName,
        ids: type === 'old' ? row.oldData : row.newData,
        type: type === 'old' ? 1 : 2
      }
      updateFamilyDesc(params).then(res => {
        const personData = {}
        personData.type = row.changeName
        console.log('5:', res.result)
        if (row.changeName === '工作简历') {
          isInCompany({ id: row.uniqueId }).then(resd => {
            new Promise(resolve => {
              personData.isIn = type === 'old' ? resd.result.inZcBeforeOld : resd.result.inZcBeforeNew
              resolve(resd)
            }).then(result => {
              if (result) {
                personData.person = res.result
                console.log('result.result', result.result)
                this.personData = personData
                this.personTable = true
              }
            })
          })
        } else {
          personData.person = res.result
          this.personData = personData
          this.personTable = true
        }
      })
    },
    // 人员状态查看
    lookDesc (row, type) {
      updateDesc({ id: type === 'old' ? row.oldData : row.newData }).then(res => {
        if (res.result) {
          let data = res.result
          this.oldCarrerData = data
          if (data.logType === 1) {
            this.oldCarrerData.typeData = res.result.candidateType
            if (type === 'old') {
              this.oldCarrer = true
            } else {
              this.newCarrer = true
            }
          } else if (data.logType === 2) {
            if (type === 'old') {
              this.oldReport = true
            } else {
              this.newReport = true
            }
          } else if (data.logType === 3) {
            if (type === 'old') {
              this.oldPosition = true
            } else {
              this.newPosition = true
            }
          }
        }
      })
    },
    // 撤销操作
    reBack (row) {
      this.$confirm(`确定要撤销${row.name}吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        let params = {
          actType: 'correct',
          userId: 'rolluser',
          pId: row.task ? row.task.processInstanceId ? row.task.processInstanceId : 'null' : 'null',
          taskId: row.task ? row.task.id ? row.task.id : 'null' : 'null',
          uniqueId: row.uniqueId,
          var: {
            keys: 'correctHrPass,correctHrBackReason',
            values: 'false,撤销操作',
            types: 'S,S'
          }
        }
        changeUpdateAuit(params).then(data => {
          this.$message.success('撤销成功')
          // this.handleCownerCurrentChange(1)
          this._getOwnerTaskList()
        })
      }).catch(() => {})
    },
    // 重新发起()
    reStart (row) {
      checkAccept({ id: row.employeeId }).then(res => {
        console.log(res)
        if (res.result) {
          if (res.result.status === 5 || res.result.status === 7 || res.result.status === 13 || res.result.status === 14 || res.result.status === 16) {
            changeUpdateDesc({ id: row.uniqueId }).then(res => {
              this.$router.push({
                path: '/personnel-information/base/corrections/' + row.employeeId + '/' + null,
                query: {
                  key: res.result.tab === 1 ? 'first' : res.result.tab === 2 ? 'second' : 'third'
                }
              })
            })
          } else {
            this.$message.warning(this.$message.warning('该人员正在审核中,不能重新发起'))
          }
        } else {
          this.$message.warning('该人员正在审核中,不能重新发起')
        }
      })
    },
    /** 我发起的**/
    _getOwnerTaskList () {
      getTaskFinshed(this.correctOwnerParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.verifyOwnerDatas = data.result.records
          }
          this.cownerPageMsg.total = data.result.total
        }
      })
    }
  },
  watch: {
    getCorrectSearchClick (val) {
      if (val) {
        this.handleCownerCurrentChange(1)
        // this._getOwnerTaskList()
      }
      this.$store.commit('SET_CORRECT_CLICKED', false)
    }
  },
  created () {
    this._getOwnerTaskList()
  }
}
</script>
<style scoped lang="less">
  .el-select{width: 100%}
  .text-contract{
    width: 600px;
    height: 55px;
    line-height:20px;
    font-size:14px;
    overflow: auto;
    padding:5px;
  }
  .btn{
    color: @base-color;
    cursor: pointer;
  }
  .work-table{
    &/deep/.el-dialog__body{
      padding: 20px 0!important;
    }
    &/deep/.el-dialog__header{
      padding: 0;
      background: none
    }
  }
</style>
