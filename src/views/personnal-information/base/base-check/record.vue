<template>
  <div class="mt-20">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="更正记录" name="1">
        <el-table
          :data="correctRecords"
          border
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            width="70">
          </el-table-column>

          <el-table-column
            prop="changeName"
            label="操作字段">
          </el-table-column>

          <el-table-column
            prop="oldValue"
            label="原内容">
            <template slot-scope="scope">
              <span v-if="scope.row.changeName == '人员状态变化'" @mouseover="lookDesc(scope.row, 'old')" class="btn">查看</span>
              <span @mouseover="lookFamilyDesc(scope.row, 'old')" v-else-if="scope.row.changeName == '健康状况' || scope.row.changeName == '学习简历' || scope.row.changeName == '工作简历'
             || scope.row.changeName == '家庭成员信息'" class="btn">查看</span>
              <span v-else-if="scope.row.changeName == '体重'">{{scope.row.oldValue ? scope.row.oldValue : 0}}KG</span>
              <span v-else-if="scope.row.changeName == '身高'">{{scope.row.oldValue ? scope.row.oldValue : 0}}CM</span>
              <span v-else="" v-html="scope.row.oldValue"></span>
            </template>
          </el-table-column>

          <el-table-column
            prop="newValue"
            label="新内容">
            <template slot-scope="scope">
              <span v-if="scope.row.changeName === '人员状态变化'" @mouseover="lookDesc(scope.row, 'new')" class="btn">查看</span>
              <span @mouseover="lookFamilyDesc(scope.row, 'new')" v-else-if="scope.row.changeName == '健康状况' || scope.row.changeName == '学习简历' || scope.row.changeName == '工作简历'
             || scope.row.changeName == '家庭成员信息'" class="btn">查看</span>
              <span v-else-if="scope.row.changeName == '体重'">{{scope.row.newValue ? scope.row.newValue : 0}}KG</span>
              <span v-else-if="scope.row.changeName == '身高'">{{scope.row.newValue ? scope.row.newValue : 0}}CM</span>
              <span v-else="" v-html="scope.row.newValue"></span>
            </template>
          </el-table-column>

          <el-table-column
            prop="remark"
            label="说明">
          </el-table-column>

          <el-table-column
            prop="creator"
            label="申请人">
          </el-table-column>

          <el-table-column
            prop="createTime"
            label="申请时间">
          </el-table-column>

          <el-table-column
            prop="updator"
            label="审核人">
          </el-table-column>

          <el-table-column
            prop="updateTime"
            label="审核时间">
          </el-table-column>

        </el-table>
        <Pagination
          v-if="updateMsg.total > 10"
          @size-change="handleIncorrectSizeChange"
          @current-change="handleIncorrectCurrentChange"
          :current-page="updateMsg.currentPage"
          :page-sizes="updateMsg.pageSizes"
          :page-size="updateMsg.pageSize"
          :total="updateMsg.total">
        </Pagination>
      </el-collapse-item>

      <el-collapse-item title="更新记录" name="2">
        <el-table
          :data="updateRecords"
          border
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            width="70">
          </el-table-column>

          <el-table-column
            prop="changeName"
            label="操作字段">
          </el-table-column>

          <el-table-column
            prop="oldValue"
            label="原内容">
            <template slot-scope="scope">
              <span v-if="scope.row.changeName == '人员状态变化'" @mouseover="lookDesc(scope.row, 'old')" class="btn">查看</span>
              <span @mouseover="lookFamilyDesc(scope.row, 'old')" v-else-if="scope.row.changeName == '健康状况' || scope.row.changeName == '学习简历' || scope.row.changeName == '工作简历'
             || scope.row.changeName == '家庭成员信息'" class="btn">查看</span>
              <span v-else-if="scope.row.changeName == '体重'">{{scope.row.oldValue ? scope.row.oldValue : 0}}KG</span>
              <span v-else-if="scope.row.changeName == '身高'">{{scope.row.oldValue ? scope.row.oldValue : 0}}CM</span>
              <span v-else="" v-html="scope.row.oldValue"></span>
            </template>
          </el-table-column>

          <el-table-column
            prop="newValue"
            label="新内容">
            <template slot-scope="scope">
              <span v-if="scope.row.changeName === '人员状态变化'" @mouseover="lookDesc(scope.row, 'new')" class="btn">查看</span>
              <span @mouseover="lookFamilyDesc(scope.row, 'new')" v-else-if="scope.row.changeName == '健康状况' || scope.row.changeName == '学习简历' || scope.row.changeName == '工作简历'
             || scope.row.changeName == '家庭成员信息'" class="btn">查看</span>
              <span v-else-if="scope.row.changeName == '体重'">{{scope.row.newValue ? scope.row.newValue : 0}}KG</span>
              <span v-else-if="scope.row.changeName == '身高'">{{scope.row.newValue ? scope.row.newValue : 0}}CM</span>
              <span v-else="" v-html="scope.row.newValue"></span>
            </template>
          </el-table-column>

          <el-table-column
            prop="remark"
            label="说明">
          </el-table-column>

          <el-table-column
            prop="creator"
            label="更新人">
          </el-table-column>

          <el-table-column
            prop="updateTime"
            label="更新时间">
          </el-table-column>

        </el-table>
        <Pagination
          v-if="updateMsgTwo.total > 10"
          @size-change="handleupdateSizeChange"
          @current-change="handleupdateCurrentChange"
          :current-page="updateMsgTwo.currentPage"
          :page-sizes="updateMsgTwo.pageSizes"
          :page-size="updateMsgTwo.pageSize"
          :total="updateMsgTwo.total">
        </Pagination>
      </el-collapse-item>
    </el-collapse>
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
// import { getPersonChangeDetails } from 'static/api/personnel-information/base/base'
import { updatesList, updateDesc, updateFamilyDesc, isInCompany } from 'static/api/personnel-information/job/job'
import Pagination from 'components/Pagination.vue'
import OldCarrer from 'components/infoDesc/oldCarrer.vue' // 入职旧值
import NewCarrer from 'components/infoDesc/newCarrer.vue' // 入职新值
import OldReport from 'components/infoDesc/oldReport.vue' // 报到新值
import NewReport from 'components/infoDesc/newReport.vue' // 报到新值
import OldPosition from 'components/infoDesc/oldPosition.vue' // 转正新值
import NewPosition from 'components/infoDesc/newPosition.vue' // 转正新值
import PersonTable from 'components/infoDesc/personTable.vue' // 转正新值
import NoData from 'components/infoDesc/noData.vue'
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
      oldCarrerData: false,
      noData: false,
      personData: '',
      // personData: {
      //   type: '',
      //   isIn: 0,
      //   person: []
      // },
      activeName: '1',
      dimissionInfoDatas: [],
      salarySettingListDatas: [],
      orgTransferListDatas: [],
      correctRecords: [],
      updateRecords: [],
      reemployInfoDatas: [],
      resMapList: [],
      showLeave: true,
      entryListCmputedList: [],
      reportListCmputedList: [],
      regularListCmputedList: [],
      showDimission: false,
      showReemploy: false,
      ChangeDetailsDatas: '',
      updateMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      updateMsgTwo: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      }
    }
  },
  computed: {
    paramsList () {
      return {
        type: 2, // 更正
        userId: this.$route.params.baseId,
        page: this.updateMsg.currentPage,
        size: this.updateMsg.pageSize
      }
    },
    params () {
      return {
        type: 1, // 更新
        userId: this.$route.params.baseId,
        page: this.updateMsgTwo.currentPage,
        size: this.updateMsgTwo.pageSize
      }
    }
  },
  components: {
    Pagination, OldCarrer, NewCarrer, OldReport, NewReport, OldPosition, NewPosition, PersonTable, NoData
  },
  methods: {
    handleIncorrectSizeChange (val) {
      this.updateMsg.pageSize = val
      this._getIncorrect()
    },
    handleIncorrectCurrentChange (val) {
      this.updateMsg.currentPage = val
      this._getIncorrect()
    },
    // 个人信息查看
    lookFamilyDesc (row, type) {
      let value = type === 'old' ? row.oldValue : row.newValue
      if (!value) {
        this.noData = true
        return
      }
      let params = {
        changeName: row.changeName,
        ids: type === 'old' ? row.oldValue : row.newValue,
        type: type === 'old' ? 1 : 2
      }
      updateFamilyDesc(params).then(res => {
        const personData = {}
        personData.type = row.changeName
        console.log('5:', res.result)
        if (row.changeName === '工作简历') {
          isInCompany({ id: row.id }).then(resd => {
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
      updateDesc({ id: type === 'old' ? row.oldId : row.newId }).then(res => {
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
        } else {
          this.oldCarrerData = null
          this.newPosition = true
        }
      })
    },
    _getIncorrect () {
      updatesList(this.paramsList).then(res => {
        if (res.result) {
          this.correctRecords = res.result.records
        }
        this.updateMsg.total = res.result.total
      })
    },
    handleupdateSizeChange (val) {
      this.updateMsgTwo.pageSize = val
      this._getList()
    },
    handleupdateCurrentChange (val) {
      this.updateMsgTwo.currentPage = val
      this._getList()
    },
    _getList () {
      updatesList(this.params).then(res => {
        if (res.result) {
          this.updateRecords = res.result.records
        }
        this.updateMsgTwo.total = res.result.total
      })
    }
  },
  filters: {

  },
  created () {
    this._getIncorrect()
    this._getList()
    this.$store.commit('SET_ACTIVE_ROUTER', '3')
  }
}
</script>

<style scoped lang="less">
  .person-tit{
    border-left:5px solid #ff7500;
  }
  .leave-info.el-form-item{
    margin-bottom:10px;
  }
  .base-sec-title::after{
    left: 80px;
  }
  .btn{
    color: @base-color;
    cursor: pointer;
  }
  .work-table{
    &/deep/.el-dialog__body{
      padding: 25px 0 20px!important;
    }
    &/deep/.el-dialog__header{
      padding: 0;
      background: none
    }
  }
</style>

<!--<template>-->
<!--<div class="mt-20">-->
  <!--<el-table-->
    <!--:data="operatorHistoryList"-->
    <!--border>-->
    <!--<el-table-column-->
      <!--type="index"-->
      <!--label="序号"-->
      <!--width="70">-->
    <!--</el-table-column>-->

    <!--<el-table-column-->
      <!--label="操作类别"-->
      <!--width="120"-->
      <!--prop="title">-->
    <!--</el-table-column>-->

    <!--<el-table-column-->
      <!--width="120"-->
      <!--label="操作类型">-->
      <!--<template slot-scope="scope">-->
        <!--<span v-if="scope.row.type == 1">新增</span>-->
        <!--<span v-else-if="scope.row.type == 2">修改</span>-->
        <!--<span v-else-if="scope.row.type == 3">删除</span>-->
      <!--</template>-->
    <!--</el-table-column>-->

    <!--<el-table-column-->
      <!--label="操作内容"-->
      <!--min-width="400">-->
      <!--<template slot-scope="scope">-->
      <!--<div v-html="scope.row.changeContent"></div>-->
      <!--&lt;!&ndash;   <div class="moveBtn">-->
          <!--<el-tooltip placement="top" effect="light">-->
            <!--<div slot="content" class="text-content"><div v-html="scope.row.changeContent"></div></div>-->
            <!--<div v-html="scope.row.changeContent"></div>-->
          <!--</el-tooltip>-->
        <!--</div>&ndash;&gt;-->
      <!--</template>-->
    <!--</el-table-column>-->

    <!--<el-table-column-->
      <!--label="操作人"-->
      <!--width="180"-->
      <!--prop="creator">-->
    <!--</el-table-column>-->

    <!--<el-table-column-->
      <!--label="操作时间"-->
      <!--width="180"-->
      <!--prop="createTime">-->
    <!--</el-table-column>-->
  <!--</el-table>-->
  <!--<pagination-->
    <!--@size-change="handleSizeChange"-->
    <!--@current-change="handleCurrentChange"-->
    <!--:current-page="pageMsg.currentPage"-->
    <!--:page-sizes="pageMsg.pageSizes"-->
    <!--:page-size="pageMsg.pageSize"-->
    <!--:total="pageMsg.total">-->
  <!--</pagination>-->

<!--</div>-->
<!--</template>-->
<!--<script>-->
<!--import { getHistoryList } from 'static/api/personnel-information/base/base'-->
<!--import Pagination from 'components/Pagination.vue'-->
<!--export default {-->
  <!--data () {-->
    <!--return {-->
      <!--operatorHistoryList: [],-->
      <!--pageMsg: {-->
        <!--currentPage: 1,-->
        <!--pageSize: 10,-->
        <!--pageSizes: [10, 20, 50],-->
        <!--total: 0-->
      <!--}-->
    <!--}-->
  <!--},-->
  <!--methods: {-->
    <!--/** 分页**/-->
    <!--handleSizeChange (pageSize) {-->
      <!--this.pageMsg.pageSize = pageSize-->
      <!--this._getHistory()-->
    <!--},-->
    <!--handleCurrentChange (currentPage) {-->
      <!--this.pageMsg.currentPage = currentPage-->
      <!--this._getHistory()-->
    <!--},-->
    <!--/** 获取操作记录**/-->
    <!--_getHistory () {-->
      <!--getHistoryList(this.historyParams).then(data => {-->
        <!--if (data.result) {-->
          <!--if (data.result.records) {-->
            <!--this.operatorHistoryList = data.result.records-->
          <!--}-->
          <!--this.pageMsg.total = data.result.total-->
        <!--}-->
      <!--})-->
    <!--}-->
  <!--},-->
  <!--computed: {-->
    <!--historyParams () {-->
      <!--return {-->
        <!--userId: this.$route.params.baseId,-->
        <!--page: this.pageMsg.currentPage,-->
        <!--size: this.pageMsg.pageSize-->
      <!--}-->
    <!--}-->
  <!--},-->
  <!--components: {-->
    <!--Pagination-->
  <!--},-->
  <!--created () {-->
    <!--this._getHistory()-->
    <!--this.$store.commit('SET_ACTIVE_ROUTER', '3')-->
  <!--}-->
<!--}-->
<!--</script>-->
<!--<style scoped lang="less">-->
<!--.text-content{-->
  <!--width: 800px;-->
  <!--height: 70px;-->
  <!--overflow: auto;-->
  <!--padding:5px;-->
  <!--font-size:14px;-->
  <!--line-height:20px;-->
<!--}-->
<!--</style>-->
