<template>
  <div class="container">
    <el-tabs
      type="border-card"
      class="mt-20"
      @tab-click="tabClick">
      <el-tab-pane>
        <span slot="label">待审核</span>
        <el-table
          :data="verifyOwnerDatas"
          border>
          <el-table-column
            label="序号"
            type="index"
            width="70">
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
            width="150px">
          </el-table-column>
          <el-table-column
            label="人事负责人"
            prop="hrName"
            width="200px">
          </el-table-column>
          <el-table-column
            label="人事负责人审核时间"
            prop="hrAuditTime"
            width="200px">
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            min-width="120px">
            <template slot-scope="scope">
              <div class="operation">
                <span @click="isAgree(scope.row)">同意</span>
                <span @click="resonVisible = true;row = scope.row;">不同意</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          @size-change="handleMownerSizeChange"
          @current-change="handleMownerCurrentChange"
          :current-page="mownerPageMsg.currentPage"
          :page-sizes="mownerPageMsg.pageSizes"
          :page-size="mownerPageMsg.pageSize"
          :total="mownerPageMsg.total">
        </pagination>
      </el-tab-pane>

      <el-tab-pane>
        <span slot="label">已审核</span>
        <el-table
          :data="verifywaitDatas"
          border>
          <el-table-column
            label="序号"
            type="index"
            width="70">
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
            label="审批时间"
            prop="updateTime"
            width="200px">
          </el-table-column>
          <el-table-column
            label="人事负责人"
            prop="hrName"
            width="200px">
          </el-table-column>
          <el-table-column
            label="人事负责人审核时间"
            prop="hrAuditTime"
            width="200px">
          </el-table-column>
          <el-table-column
            label="状态"
            width="175px">
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
        </el-table>
        <pagination
          @size-change="handleMwaitSizeChange"
          @current-change="handleMwaitCurrentChange"
          :current-page="mwaitPageMsg.currentPage"
          :page-sizes="mwaitPageMsg.pageSizes"
          :page-size="mwaitPageMsg.pageSize"
          :total="mwaitPageMsg.total">
        </pagination>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="不同意原因"
      :visible.sync="resonVisible"
      @close="$refs.reasonForm.resetFields();resonVisible = false;row = []"
      width="500px">
      <div class="module-opera">
        <el-form :model="reasonForm" ref="reasonForm" label-width="80px">
          <el-form-item prop="reason"  label="说明：" label-width="80px"
                        :rules="{required: true, message: '不同意原因必填'}">
            <el-input type="textarea" :rows="3" v-model="reasonForm.reason"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
				<el-button @click="$refs.reasonForm.resetFields();resonVisible = false;row = []" class="false" size="mini">取 消</el-button>
				<el-button type="primary" @click="resonComfire()" size="mini">确 定</el-button>
			</span>
    </el-dialog>
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
import { getToken } from 'assets/js/util'
import { getTaskFinshed, getTaskList, changeUpdateAuit } from 'static/api/recruit/entry/entry'
import { updateDesc, updateFamilyDesc, isInCompany } from 'static/api/personnel-information/job/job'
import { timeZeroToString } from 'assets/js/common'
import Pagination from 'components/Pagination.vue'
import OldCarrer from 'components/infoDesc/oldCarrer.vue' // 入职旧值
import NewCarrer from 'components/infoDesc/newCarrer.vue' // 入职新值
import OldReport from 'components/infoDesc/oldReport.vue' // 报到新值
import NewReport from 'components/infoDesc/newReport.vue' // 报到新值
import OldPosition from 'components/infoDesc/oldPosition.vue' // 转正新值
import NewPosition from 'components/infoDesc/newPosition.vue' // 转正新值
import PersonTable from 'components/infoDesc/personTable.vue' // 转正新值
import NoData from 'components/infoDesc/noData.vue' // 转正新值
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
      //   isIn: 0,
      //   person: []
      // },
      row: [],
      resonVisible: false,
      reasonForm: [],
      verifyOwnerDatas: [],
      mwaitPageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      mownerPageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      verifywaitDatas: [],
      tabTitle: '待审核'
    }
  },
  computed: {
    ...mapGetters(['getMarketCorrectSearchArr', 'getMarketCorrectSearchClick']),
    contractOwnerParams () {
      return {
        actType: 'correctMarket',
        groupId: 'headHr',
        userId: getToken('loginId').toString(),
        keyword: this.getMarketCorrectSearchArr.namePhone,
        startTime: this.getMarketCorrectSearchArr.startTime ? timeZeroToString(this.getMarketCorrectSearchArr.startTime) : '',
        endTime: this.getMarketCorrectSearchArr.endTime ? timeZeroToString(this.getMarketCorrectSearchArr.endTime) : '',
        // changeNames: this.getMarketCorrectSearchArr.field ? this.getMarketCorrectSearchArr.field.join(',') : '',
        page: this.mownerPageMsg.currentPage,
        size: this.mownerPageMsg.pageSize
      }
    },
    contractWaitParams () {
      return {
        actType: 'correctMarket',
        taskDId: 'headHrAudit',
        userId: getToken('loginId').toString(),
        keyword: this.getMarketCorrectSearchArr.namePhone,
        startTime: this.getMarketCorrectSearchArr.startTime ? timeZeroToString(this.getMarketCorrectSearchArr.startTime) : '',
        endTime: this.getMarketCorrectSearchArr.endTime ? timeZeroToString(this.getMarketCorrectSearchArr.endTime) : '',
        // changeNames: this.getMarketCorrectSearchArr.field ? this.getMarketCorrectSearchArr.field.join(',') : '',
        page: this.mwaitPageMsg.currentPage,
        size: this.mwaitPageMsg.pageSize
      }
    }
  },
  components: {
    Pagination, OldCarrer, NewCarrer, OldReport, NewReport, OldPosition, NewPosition, PersonTable, NoData
  },
  methods: {
    handleMownerSizeChange (pageSize) {
      this.mownerPageMsg.pageSize = pageSize
      this._getOwnerTaskList()
    },
    handleMownerCurrentChange (currentPage) {
      this.mownerPageMsg.currentPage = currentPage
      this._getOwnerTaskList()
    },
    handleMwaitSizeChange (pageSize) {
      this.mwaitPageMsg.pageSize = pageSize
      this._getwaitTaskList()
    },
    handleMwaitCurrentChange (currentPage) {
      this.mwaitPageMsg.currentPage = currentPage
      this._getwaitTaskList()
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
    tabClick (tab, event) {
      if (tab.index === '0') {
        this.tabTitle = '待审核'
        this.handleMownerCurrentChange(1)
      } else if (tab.index === '1') {
        this.tabTitle = '已审核'
        this.handleMwaitCurrentChange(1)
      }
    },
    // 不同意
    resonComfire () {
      this.$refs.reasonForm.validate(valid => {
        if (valid) {
          let row = this.row
          let params = {
            actType: 'correctMarket',
            userId: getToken('loginId').toString,
            pId: row.task ? row.task.processInstanceId ? row.task.processInstanceId : 'null' : 'null',
            taskId: row.task ? row.task.id ? row.task.id : 'null' : 'null',
            uniqueId: row.uniqueId,
            var: {
              keys: 'headMarketHrPass,headMarketHrBackReason',
              values: `false,${this.reasonForm.reason}`,
              types: 'S,S'
            }
          }
          changeUpdateAuit(params).then(res => {
            this.$message.success('操作成功')
            this.resonVisible = false
            if (this.tabTitle === '待审核') {
              this._getOwnerTaskList()
              // this.handleMownerCurrentChange(1)
            } else {
              this._getwaitTaskList()
              // this.handleMwaitCurrentChange(1)
            }
          })
        }
      })
    },
    //   同意或不同意操作
    isAgree (row) {
      this.$confirm(`确定要同意${row.name}的${row.changeName}变更申请`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        let params = {
          actType: 'correctMarket',
          userId: getToken('loginId').toString,
          pId: row.task ? row.task.processInstanceId ? row.task.processInstanceId : 'null' : 'null',
          taskId: row.task ? row.task.id ? row.task.id : 'null' : 'null',
          uniqueId: row.uniqueId,
          var: {
            keys: 'headMarketHrPass',
            values: 'true',
            types: 'S'
          }
        }
        changeUpdateAuit(params).then(res => {
          this.$message.success('操作成功')
          if (this.tabTitle === '待审核') {
            this._getOwnerTaskList()
            // this.handleMownerCurrentChange(1)
          } else {
            this._getwaitTaskList()
            // this.handleMwaitCurrentChange(1)
          }
        })
      }).catch(() => {})
    },
    /** 待审核**/
    _getOwnerTaskList () {
      getTaskList(this.contractOwnerParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.verifyOwnerDatas = data.result.records
          }
          this.mownerPageMsg.total = data.result.total
        }
      })
    },
    /** 已审核**/
    _getwaitTaskList () {
      getTaskFinshed(Object.assign(this.contractWaitParams)).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.verifywaitDatas = data.result.records
          }
          this.mwaitPageMsg.total = data.result.total
        }
      })
    }
  },
  filters: {
  },
  watch: {
    getMarketCorrectSearchClick (val) {
      if (val) {
        if (this.tabTitle === '待审核') {
          // this._getOwnerTaskList()
          this.handleMownerCurrentChange(1)
        } else if (this.tabTitle === '已审核') {
          // this._getwaitTaskList()
          this.handleMwaitCurrentChange(1)
        }
      }
      this.$store.commit('SET_MARKET_CORRECT_CLICKED', false)
    }
  },
  created () {
    this._getOwnerTaskList()
  }
}
</script>

<style scoped lang="less">
  .el-select{width: 100%}
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
