<template>
  <div @click="mutilTreeData.showTree = false">
    <el-button style="position: absolute;top: 0;" @click="ExportMsg" type="primary">导出</el-button>
    <el-form :model="searchForm" class="mt-20">
      <div class="search-form_box length-box clearfix">
        <div class="search-form_item">
          <el-input
            v-model="searchForm.namePhone"
            placeholder="请输入关键词"
            @keyup.enter.native="searchList">
          </el-input>
        </div>
        <div class="search-form_item">
          <mutil-search-dept-tree
            placeTxt="组织架构"
            :mutilTreeData="mutilTreeData"
            @selectParent="selectParent"
          />
        </div>
        <div class="search-form_item start-line">
          <el-date-picker
            v-model="searchForm.updatesDateStart"
            type="date"
            clearable
            placeholder="请选择更新开始时间">
          </el-date-picker>
        </div>
        <div class="search-form_item">
          <el-date-picker
            v-model="searchForm.updatesDateEnd"
            type="date"
            clearable
            :picker-options="pickerOptions"
            placeholder="请选择更新结束时间">
          </el-date-picker>
        </div>
        <div class="search-form_item">
          <el-select
            v-model="searchForm.field"
            multiple
            collapse-tags
            placeholder="请选择字段(多选)">
            <el-option
              v-for="item in fieldLists"
              :label="item.label"
              :value="item.value"
              :key="item.index">
            </el-option>
          </el-select>
        </div>
        <div class="search-form_button pt-3">
          <el-button type="primary" size="mini" @click="searchList">搜索</el-button>
        </div>
      </div>
    </el-form>
    <div class="mt-20">
      <el-table :data="list">
        <el-table-column label="序号" width="60" type="index"></el-table-column>
        <el-table-column label="姓名" prop="userName"></el-table-column>
        <el-table-column label="身份证号" prop="idNo" width="200"></el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
        <el-table-column label="一级成员" prop="levelOne"></el-table-column>
        <el-table-column label="所在部门" prop="orgName">
        </el-table-column>
        <el-table-column label="操作字段" prop="changeName"></el-table-column>
        <el-table-column label="原内容" prop="oldValue">
          <template slot-scope="scope">
            <span v-if="scope.row.changeName == '人员状态变化'" @mouseover="lookDesc(scope.row, 'old')" class="btn">查看</span>
            <span @mouseover="lookFamilyDesc(scope.row, 'old')" v-else-if="scope.row.changeName == '健康状况' || scope.row.changeName == '学习简历' || scope.row.changeName == '工作简历'
             || scope.row.changeName == '家庭成员信息'" class="btn">查看</span>
            <span v-else-if="scope.row.changeName == '体重'">{{scope.row.oldValue ? scope.row.oldValue : 0}}KG</span>
            <span v-else-if="scope.row.changeName == '身高'">{{scope.row.oldValue ? scope.row.oldValue : 0}}CM</span>
            <span v-else="" v-html="scope.row.oldValue"></span>
          </template>
        </el-table-column>
        <el-table-column label="新内容" prop="newValue">
          <template slot-scope="scope">
            <span v-if="scope.row.changeName === '人员状态变化'" @mouseover="lookDesc(scope.row, 'new')" class="btn">查看</span>
            <span @mouseover="lookFamilyDesc(scope.row, 'new')" v-else-if="scope.row.changeName == '健康状况' || scope.row.changeName == '学习简历' || scope.row.changeName == '工作简历'
             || scope.row.changeName == '家庭成员信息'" class="btn">查看</span>
            <span v-else-if="scope.row.changeName == '体重'">{{scope.row.newValue ? scope.row.newValue : 0}}KG</span>
            <span v-else-if="scope.row.changeName == '身高'">{{scope.row.newValue ? scope.row.newValue : 0}}CM</span>
            <span v-else="" v-html="scope.row.newValue"></span>
          </template>
        </el-table-column>
        <el-table-column label="说明" prop="remark"></el-table-column>
        <el-table-column label="更新人" prop="creator"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime"></el-table-column>
      </el-table>
      <Pagination
        v-if="updateMsg.total > 10"
        @size-change="handleupdateSizeChange"
        @current-change="handleupdateCurrentChange"
        :current-page="updateMsg.currentPage"
        :page-sizes="updateMsg.pageSizes"
        :page-size="updateMsg.pageSize"
        :total="updateMsg.total">
      </Pagination>
    </div>
    <!-- 导出列表 -->
    <form style="display:none" name="form" method="POST" ref="submitExcel" id="submitExcel" :action="hostBaseUrl+'/user/userChangeData/updateExport'">
      <p>keyword: <input type="text" id="keyword" name="keyword" value="" /></p>
      <p>searchOrgIds: <input type="text" id="searchOrgIds" name="searchOrgIds" value="" /></p>
      <p>beginDate: <input type="text" id="beginDate" name="beginDate" value="" /></p>
      <p>endDate: <input type="text" id="endDate" name="endDate" value="" /></p>
      <p>changeNames: <input type="text" id="changeNames" name="changeNames" value="" /></p>
      <input type="submit" value="Submit"/>
    </form>
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
import MutilSearchDeptTree from 'components/MutilSearchDeptTree'
// import { getToken } from 'assets/js/util'
import { timeZeroToString } from 'assets/js/common'
import { updatesList, updateDesc, updateFamilyDesc, isInCompany } from 'static/api/personnel-information/job/job'
import Pagination from 'components/Pagination.vue'
import OldCarrer from 'components/infoDesc/oldCarrer.vue' // 入职旧值
import NewCarrer from 'components/infoDesc/newCarrer.vue' // 入职新值
import OldReport from 'components/infoDesc/oldReport.vue' // 报到新值
import NewReport from 'components/infoDesc/newReport.vue' // 报到新值
import OldPosition from 'components/infoDesc/oldPosition.vue' // 转正新值
import NewPosition from 'components/infoDesc/newPosition.vue' // 转正新值
import PersonTable from 'components/infoDesc/personTable.vue' // 转正新值
import NoData from 'components/infoDesc/noData.vue' // 转正新值
import { hostBaseUrl } from 'utils/config'
export default {
  data () {
    return {
      hostBaseUrl: hostBaseUrl,
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
      updateMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      list: [],
      showTable: false,
      searchForm: {
        namePhone: '',
        updatesDateStart: '',
        updatesDateEnd: '',
        field: []
      },
      mutilTreeData: {
        filterName: '',
        orgIds: [],
        dataTree: [],
        checkDatas: [],
        showTree: false
      },
      fieldLists: [
        {
          value: '是否与原单位解除劳动关系',
          label: '是否与原单位解除劳动关系'
        },
        {
          value: '原单位是否缴纳社保',
          label: '原单位是否缴纳社保'
        },
        {
          value: '原单位是否缴纳公积金',
          label: '原单位是否缴纳公积金'
        },
        {
          value: '身份证地址',
          label: '身份证地址'
        },
        {
          value: '户籍性质',
          label: '户籍性质'
        },
        {
          value: '户籍地址',
          label: '户籍地址'
        },
        {
          value: '出生地址',
          label: '出生地址'
        },
        {
          value: '政治面貌',
          label: '政治面貌'
        },
        {
          value: '籍贯地址',
          label: '籍贯地址'
        },
        {
          value: '婚姻状况',
          label: '婚姻状况'
        },
        {
          value: '曾用名',
          label: '曾用名'
        },
        {
          value: '体重',
          label: '体重'
        },
        {
          value: '身高',
          label: '身高'
        },
        {
          value: '最高学历',
          label: '最高学历'
        },
        {
          value: '毕业时间',
          label: '毕业时间'
        },
        {
          value: '毕业院校',
          label: '毕业院校'
        },
        {
          value: '所学专业',
          label: '所学专业'
        },
        {
          value: '学历获取形式',
          label: '学历获取形式'
        },
        {
          value: '学历认证情况',
          label: '学历认证情况'
        },
        {
          value: '技术职称',
          label: '技术职称'
        },
        {
          value: '职业资格',
          label: '职业资格'
        },
        {
          value: '技能等级',
          label: '技能等级'
        },
        {
          value: '档案存放地',
          label: '档案存放地'
        },
        {
          value: '现居住地址',
          label: '现居住地址'
        },
        {
          value: '通讯地址',
          label: '通讯地址'
        },
        {
          value: '联系电话',
          label: '联系电话'
        },
        {
          value: '电子邮箱',
          label: '电子邮箱'
        },
        {
          value: '工资卡号',
          label: '工资卡号'
        },
        {
          value: '开户行',
          label: '开户行'
        },
        {
          value: '健康状况',
          label: '健康状况'
        },
        {
          value: '学习简历',
          label: '学习简历'
        },
        {
          value: '工作简历',
          label: '工作简历'
        },
        {
          value: '家庭成员信息',
          label: '家庭成员信息'
        },
        {
          value: '人员状态变化',
          label: '人员状态变化'
        }
      ]
    }
  },
  components: {
    Pagination, MutilSearchDeptTree, OldCarrer, NewCarrer, OldReport, NewReport, OldPosition, NewPosition, PersonTable, NoData
  },
  computed: {
    pickerOptions () {
      return {
        disabledDate: (time) => {
          return new Date(time).getTime() < new Date(this.searchForm.updatesDateStart).getTime()
        }
      }
    },
    paramsList () {
      return {
        type: 1, // 更新
        keyword: this.searchForm.namePhone,
        page: this.updateMsg.currentPage,
        size: this.updateMsg.pageSize,
        searchOrgIds: this.mutilTreeData.orgIds ? this.mutilTreeData.orgIds.join(',') : null,
        beginDate: this.searchForm.updatesDateStart ? timeZeroToString(this.searchForm.updatesDateStart) : '',
        endDate: this.searchForm.updatesDateEnd ? timeZeroToString(this.searchForm.updatesDateEnd) : '',
        changeNames: this.searchForm.field ? this.searchForm.field.join(',') : null
      }
    }
  },
  methods: {
    ExportMsg () {
      document.getElementById('keyword').setAttribute('value', this.searchForm.namePhone)
      document.getElementById('searchOrgIds').setAttribute('value', this.mutilTreeData.orgIds ? this.mutilTreeData.orgIds.join(',') : '')
      document.getElementById('beginDate').setAttribute('value', this.searchForm.updatesDateStart ? timeZeroToString(this.searchForm.updatesDateStart) : '')
      document.getElementById('endDate').setAttribute('value', this.searchForm.updatesDateEnd ? timeZeroToString(this.searchForm.updatesDateEnd) : '')
      document.getElementById('changeNames').setAttribute('value', this.searchForm.field ? this.searchForm.field.join(',') : null)
      console.log(this.$refs.submitExcel)
      this.$refs.submitExcel.submit()
    },
    searchList () {
      this.handleupdateCurrentChange(1)
    },
    selectParent () {},
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
        }
      })
    },
    handleupdateSizeChange (val) {
      this.updateMsg.pageSize = val
      this._getList()
    },
    handleupdateCurrentChange (val) {
      this.updateMsg.currentPage = val
      this._getList()
    },
    _getList () {
      updatesList(this.paramsList).then(res => {
        if (res.result) {
          this.list = res.result.records
        }
        this.updateMsg.total = res.result.total
      })
    }
  },
  created () {
    this._getList()
  }
}
</script>

<style scoped lang="less">
  .btn{
    color: @base-color;
    cursor: pointer;
  }
  &/deep/.el-select__tags{
    .el-tag:first-child{
      max-width: 55%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
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
