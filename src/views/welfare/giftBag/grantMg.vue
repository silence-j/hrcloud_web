<template>
  <div class="grant-data" @click="showTreeTag = false">
    <el-button class="new-add" type="primary" size="small" @click.stop="add" v-show="permission.indexOf('新增')!==-1">新增</el-button>
    <div class="search-form_box clearfix length-box search">
      <div class="search-form_item">
        <el-input placeholder="请输入关键词" @keyup.enter.native="searchWidth" v-model="keyWords"></el-input>
      </div>
      <div class="pt-3">
        <el-button type="primary" @click="searchWidth" size="mini">查询</el-button>
      </div>
      <!--<el-button @click="deepLevelSearchObject.deepLevelSearchVisible = true">高级查询</el-button>-->
    </div>
    <deep-level-search
      :deepLevelSearchObject="deepLevelSearchObject"
      @sureDeepSearch="sureDeepSearch"
      v-draggable />
    <div class="table-data">
      <el-table :data="grantList" border>
        <el-table-column prop="a" label="序号" width="120px">
          <template slot-scope="scope">
            <span>{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="festivalName" label="发放节日"></el-table-column>
        <el-table-column v-if="type === '节日'" prop="startTime" label="上报开始时间"></el-table-column>
        <el-table-column v-else prop="startTime" label="上报开始时间"></el-table-column>
        <el-table-column v-if="type === '节日'" prop="endTime" label="上报截止时间"></el-table-column>
        <el-table-column v-else prop="endTime" label="上报截止时间"></el-table-column>
        <el-table-column v-if="type === '节日'" prop="createTime" label="创建时间"></el-table-column>
        <el-table-column v-else prop="createTime" label="创建时间"></el-table-column>
        <el-table-column v-if="type === '节日'" prop="createName" label="创建人"></el-table-column>
        <el-table-column v-else="" prop="createName" label="创建人"></el-table-column>
        <el-table-column v-if="type === '节日'" prop="regulationCopy" label="发放规则">
          <template slot-scope="scope">
            <span v-html="scope.row.regulationCopy" class="brokenStyle"></span>
          </template>
        </el-table-column>
        <el-table-column v-if="type === '节日'" prop="amount" label="发放金额"></el-table-column>
        <el-table-column v-if="type === '节日'" prop="issueTime" label="发放统计时间"></el-table-column>
        <el-table-column v-else="" prop="issueTime" label="发放统计时间"></el-table-column>
        <el-table-column label="操作" fixed="right" min-width="120">
          <template slot-scope="scope">
            <div class="operation">
              <span @click="lookDetail(scope.row)" v-show="permission.indexOf('查看')!==-1 || permission.indexOf('核准')!==-1 || permission.indexOf('导出')!==-1">查看详情</span>
              <span v-if="curDate <= scope.row.endTime" @click="editor(scope.row)" v-show="permission.indexOf('编辑')!==-1">编辑</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="page.totalCount > 10"
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.page"
        :page-size="page.pageSize"
        layout="total, prev, pager, next, sizes, jumper"
        :total="page.totalCount">
      </el-pagination>
    </div>
    <el-dialog :title="title" width="600px" :visible.sync="addDialog" class="add-dialog">
      <el-form :model="addEdit" ref="addEdit" label-width="110px">
        <el-row>
          <el-col>
            <el-form-item label="发放节日:"
                          :rules="{required: true, message: '请输入发放节日', trigger: ['blur']}"
                          prop="grantFes">
              <el-input :disabled="timeRules" v-model="addEdit.grantFes"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="上报开始时间:"
                          :rules="{required: true, message: '请输入上报开始时间', trigger: ['blur']}"
                          prop="grantTimeStart">
              <el-date-picker
                :disabled="timeRules"
                v-model="addEdit.grantTimeStart"
                @change="grantStart"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="上报截止时间:"
                          :rules="{required: true, message: '请输入上报截止时间', trigger: ['blur']}"
                          prop="grantTimeEnd">
              <el-date-picker
                v-model="addEdit.grantTimeEnd"
                type="date"
                @change="grantTime"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="type === '节日'">
          <el-col :span="24">
            <el-form-item label="发放规则:"
                          :rules="{required: true, message: '请输入发放规则', trigger: ['blur']}"
                          >
              <el-table
                :data="grantRules"
                style="width: 100%">
                <el-table-column  prop="startMonth"  label="入职年限(>月)">
                  <template slot-scope="scope">
                    <el-input :disabled="timeRules"
                              @blur="startInput(scope.row.startMonth, scope.$index)"
                      v-model.number="scope.row.startMonth"></el-input>
                  </template>
                </el-table-column>
                <el-table-column  prop="endMonth"  label="入职年限(<=月)">
                  <template slot-scope="scope">
                    <el-input
                      @blur="endInput(scope.row.endMonth, scope.$index)"
                      :disabled="timeRules"
                      v-model.number="scope.row.endMonth"></el-input>
                  </template>
                </el-table-column>
                <el-table-column  prop="amount"  label="发放金额">
                  <template slot-scope="scope">
                    <el-input :disabled="timeRules" v-model.number="scope.row.amount" type="number" min="0"></el-input>
                  </template>
                </el-table-column>
                <el-table-column  prop=""  label="操作" width="60">
                  <template slot-scope="scope">
                    <em v-if="timeRules == false" @click="reduce" class="el-icon-minus"></em>
                    <em v-if="timeRules == false" @click="addGrantSub(scope.row.startMonth, scope.$index)" class="el-icon-plus"></em>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="发放统计时间"
                          :rules="{required: true, message: '请输入发放统计时间', trigger: ['blur']}"
                          prop="grantCountTime">
              <el-date-picker
                :disabled="timeRules"
                v-model="addEdit.grantCountTime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="发放范围"
                          :rules="{required: true, message: '请输入发放范围', trigger: ['blur']}"
                          >
              <mutil-search-tree
                :isCompany="'1'"
                :ZIndex='999'
                :isAbled="timeRules"
                :showTreeTag="showTreeTag"
                @show-tree="showDeptTree"
                @getAllDeptData="getAllDeptData"
              />
              <!--<el-input v-else="" disabled placeholder="输入部门名称"></el-input>-->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false" class="false" size="mini">取 消</el-button>
        <el-button @click="sureAdd('addEdit')" type="primary" size="mini">确 定</el-button>
      </span>
    <!--  <div style="text-align: center; margin-top: 10px">
        <el-button @click="addDialog = false">取消</el-button>
        <el-button @click="sureAdd('addEdit')">确定</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
import DeepLevelSearch from '@/components/DeepLevelSearch.vue'
import MutilSearchTree from 'components/MutilSearchTree'
import WelfareApi from 'static/api/welfare/welfare'
import { getToken } from 'assets/js/util'
import { getTime } from 'assets/js/filters'
import { getExmine } from 'assets/js/exmine'
import { debounce } from 'lodash'
export default {
  props: {
    type: String
  },
  data () {
    return {
      deepLevelSearchObject: {
        deepLevelSearchVisible: false,
        selectType: 'demand'
      },
      timeRules: false,
      keyWords: '',
      options: [],
      title: '',
      id: '',
      showTreeTag: false,
      addDialog: false,
      curDate: this.changeDate(new Date()),
      addEdit: {
        grantFes: '',
        grantTimeStart: '',
        grantTimeEnd: '',
        howGrant: '',
        grantCountTime: '',
        gerIds: ''
      },
      isStartTrue: true,
      isEndTrue: true,
      isCenterTrue: true,
      grantList: [],
      grantRules: [
        { startMonth: 0, endMonth: 0, amount: 0 }
      ],
      grantSubList: [
        { howGrant: '', money: '' }
      ],
      page: {
        page: 1,
        pageSize: 10,
        totalCount: 0
      }
    }
  },
  components: {
    MutilSearchTree,
    DeepLevelSearch
  },
  computed: {
    permission () {
      return getExmine().giftGrantMg
    }
  },
  mounted () {
    this._getGrantMg()
  },
  filters: {
    getTimeDay (str) {
      return getTime(str)
    }
  },
  methods: {
    //
    startInput (value, index) {
      // let num = this.grantRules.length
      if (!(index === 0)) {
        if (value >= this.grantRules[index - 1].endMonth) {
          this.isStartTrue = true
          console.log('succeed')
          if (this.grantRules[index].endMonth) {
            if (this.grantRules[index].endMonth >= this.grantRules[index].startMonth) {
              this.isEndTrue = true
            } else {
              this.isEndTrue = false
            }
          }
        } else {
          this.isStartTrue = false
          this.$message.warning('开始月份不能小于上一个规则的结束月份')
        }
      } else {
        if (this.grantRules[index].startMonth >= this.grantRules[index].endMonth) {
          this.isCenterTrue = false
          this.$message.warning('开始月份不能大于等于结束月份')
        } else {
          this.isCenterTrue = true
        }
      }
      console.log('val234', value, index)
    },
    endInput (value, index) {
      // let num = this.grantRules.length
      if (!(index === 0)) {
        if (value > this.grantRules[index].startMonth) {
          this.isEndTrue = true
          console.log('succeed')
          if (this.grantRules[index].startMonth) {
            if (this.grantRules[index].startMonth >= this.grantRules[index - 1].endMonth) {
              this.isStartTrue = true
            } else {
              this.isStartTrue = false
            }
          }
        } else {
          this.isEndTrue = false
          this.$message.warning('结束月份不能小于开始月份')
        }
      } else {
        if ((this.grantRules[index].endMonth ? this.grantRules[index].endMonth : -1) < this.grantRules[index].startMonth) {
          this.isCenterTrue = false
          this.$message.warning('结束月份不能小于开始月份   ')
        } else {
          this.isCenterTrue = true
        }
      }
    },
    // 高级搜索确认
    sureDeepSearch (deepSearchArr) {
      this.deepLevelSearchObject.deepLevelSearchVisible = false
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
        this.searchWidth()
      }, 200)
    },
    _getGrantMg () {
      let params = {
        page: this.page.page,
        size: this.page.pageSize,
        type: this.type === '节日' ? 1 : 2,
        options: this.options,
        keyword: this.keyWords
      }
      WelfareApi.getGrantMg(params).then(res => {
        if (res.result && res.result.records && res.result.records !== null) {
          let curGrantList = []
          curGrantList = res.result.records
          this.page.totalCount = res.result.total
          curGrantList.forEach(res => {
            if (res.regulation) {
              res.regulationCopy = ''
              let arr = []
              let curStr = ''
              arr = JSON.parse(res.regulation)
              arr.forEach(item => {
                let cur = item.startMonth + '月' + (item.endMonth !== 9999 ? '至' + item.endMonth + '月' : '以上') + '发放' + (item.amount ? item.amount : 0) + '元' + '</br>'
                curStr += cur
              })
              res.regulationCopy = curStr
            }
          })
          this.grantList = curGrantList
        }
      })
    },
    searchWidth () {
      this.page.page = 1
      this.page.pageSize = 10
      this._getGrantMg()
    },
    grantTime (val) {
      this.addEdit.grantTimeEnd = val ? this.changeDate(val) : ''
    },
    grantStart (val) {
      this.addEdit.grantTimeStart = val ? this.changeDate(val) : ''
    },
    lookDetail (row) {
      if (this.type === '节日') {
        this.$router.push({
          path: '/welfare/giftBag/grantDetail',
          query: {
            id: row.id
          }
        })
      } else if (this.type === '实物') {
        this.$router.push({
          path: '/welfare/grant/grantDetail',
          query: {
            id: row.id
          }
        })
      }
    },
    editor (row) {
      this.title = '编辑'
      this.addDialog = true
      this.id = row.id
      this.addEdit.grantFes = row.festivalName
      this.addEdit.grantTimeStart = row.startTime ? row.startTime : ''
      this.addEdit.grantTimeEnd = row.endTime ? row.endTime : ''
      this.grantRules = JSON.parse(row.regulation)
      if (this.grantRules[this.grantRules.length - 1].endMonth === 9999) {
        this.grantRules[this.grantRules.length - 1].endMonth = ''
      }
      this.addEdit.grantCountTime = row.issueTime ? row.issueTime : ''
      if (this.curDate >= this.addEdit.grantTimeStart && this.curDate <= this.addEdit.grantTimeEnd) {
        this.timeRules = true
      } else {
        this.timeRules = false
      }
      WelfareApi.getSelectCompanyIds({ id: row.id }).then(res => {
        let arr = []
        if (res.result) {
          res.result.forEach(rs => {
            arr.push(rs.companyId.toString())
          })
        }
        this.$store.commit('SET_TREE_CHECKED_ORGIDS', arr)
      })
    },
    add () {
      this.$store.commit('SET_TREE_CHECKED_ORGIDS', [])
      this.$store.commit('SET_TREE_CHECKED_NAME', '')
      this.timeRules = false
      this.title = '新增'
      this.addEdit.grantFes = ''
      this.addEdit.grantTimeStart = ''
      this.addEdit.grantTimeEnd = ''
      this.addEdit.howGrant = ''
      this.addEdit.grantCountTime = ''
      this.addEdit.gerIds = ''
      this.grantRules = []
      this.grantRules.push({
        startMonth: 0,
        endMonth: 0,
        amount: 0
      })
      this.addDialog = true
    },
    showDeptTree () {
      this.showTreeTag = true
    },
    addGrantSub (start, index) {
      this.startInput(start, index)
      if (this.isStartTrue && this.isEndTrue && this.isCenterTrue) {
        let len = this.grantRules.length
        if (this.grantRules[len - 1].startMonth !== '' && this.grantRules[len - 1].endMonth !== '') {
          this.grantRules.push({
            startMonth: this.grantRules[len - 1].endMonth,
            endMonth: '',
            amount: ''
          })
        } else {
          this.$message.warning('请先输入上一个发放规则')
        }
      } else {
        this.$message.warning('请按规则输入')
      }
    },
    reduce () {
      if (this.grantRules.length > 1) {
        let len = this.grantRules.length - 1
        this.grantRules.splice(len, 1)
        this.isStartTrue = true
        this.isEndTrue = true
      }
    },
    getAllDeptData (data) {
      this.addEdit.gerIds = this.forEachOrgIds(data)
      // this.showTreeTag = false
    },
    forEachOrgIds (arr) {
      let orgIds = []
      arr.forEach(item => {
        orgIds.push({
          companyId: item.id,
          companyName: item.name
        })
        if (item.children && item.children.length) {
          this.forEachOrgIds(item.children)
        }
      })
      return orgIds
    },
    sureAdd: debounce(function (formName) {
      let flag = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.type === '节日') {
            if (this.grantRules.length >= 1 && this.grantRules[0].amount !== 0) {
              if (this.isStartTrue && this.isEndTrue && this.isCenterTrue) {
                if (this.addEdit.grantTimeStart <= this.addEdit.grantTimeEnd) {
                  if (this.addEdit.gerIds !== '') {
                    flag = true
                  } else {
                    flag = false
                    this.$message.warning('请输入发放范围')
                  }
                } else {
                  flag = false
                  this.$message.warning('上报截止时间不能小于上报开始时间')
                }
              } else {
                flag = false
                this.$message.warning('请输入正确的发放规则')
              }
            } else {
              flag = false
              this.$message.warning('请输入第一条规则的发放金额')
            }
          }
          if (this.type === '实物') {
            if (this.addEdit.grantTimeStart <= this.addEdit.grantTimeEnd) {
              if (this.addEdit.gerIds !== '') {
                flag = true
              } else {
                flag = false
                this.$message.warning('请输入发放范围')
              }
            } else {
              flag = false
              this.$message.warning('上报截止时间不能小于上报开始时间')
            }
          }
          if (flag) {
            if (this.grantRules[this.grantRules.length - 1].endMonth === '') {
              this.grantRules[this.grantRules.length - 1].endMonth = 9999
            }
            let params = {
              type: this.type === '节日' ? 1 : 2,
              festivalName: this.addEdit.grantFes,
              startTime: this.addEdit.grantTimeStart ? this.changeDate(this.addEdit.grantTimeStart) : '',
              endTime: this.addEdit.grantTimeEnd ? this.changeDate(this.addEdit.grantTimeEnd) : '',
              regulation: JSON.stringify(this.grantRules),
              issueTime: this.addEdit.grantCountTime ? this.changeDate(this.addEdit.grantCountTime) : '',
              company: JSON.stringify(this.addEdit.gerIds),
              createName: getToken('loginName')
            }
            if (this.title === '编辑') params.id = this.id
            WelfareApi.addTemplate(params).then(res => {
              this.$message.success(this.title + '成功')
              this.addDialog = false
              this._getGrantMg()
            })
          }
        } else {
          return false
        }
      })
    }, 500),
    changeDate (value) {
      let time = new Date(value)
      let year = time.getFullYear()
      let month = (time.getMonth() < 9 ? '0' : '') + (time.getMonth() + 1)
      let day = (time.getDate() < 10 ? '0' : '') + time.getDate()
      return year + '-' + month + '-' + day
    },
    handleSizeChange (val) {
      this.page.page = 1
      this.page.pageSize = val
      this._getGrantMg()
    },
    handleCurrentChange (val) {
      this.page.page = val
      this._getGrantMg()
    }
  }
}
</script>

<style scoped lang="less">
  @import "~assets/less/page";
  /*&/deep/.tree-div{*/
    /*&/deep/.scroll-infor{*/
      /*!*overflow: hidden!important;*!*/
      /*&/deep/.el-tree--highlight-current{*/
        /*!*height: 500px;*!*/
        /*!*overflow: auto!important;*!*/
      /*}*/
    /*}*/
  /*}*/
  .grant-data{
    margin-top: 10px;
    &/deep/.el-button{
      padding: 0 20px;
    }
    .new-add{
      margin-bottom: 10px;
    }
   .search{
     .el-button{
       margin-left: 10px;
     }
   }
    .table-data{
      margin-top: 20px;
    }
    .add-dialog{
      .ul-grant{
        position: relative;
        width: 300px;
        height: 40px;
        li{
          width: 80px;
          text-align: center;
          float: left;
          border: 1px solid #dcdfe6;
        }
        .operation{
          position: absolute;
          right: 24px;
          top: 12px;
          border-radius: 6px;
          display: inline-block;
          height: 20px;
          width: 20px;
          border: 1px solid #dcdfe6;
          .line{
            display: inline-block;
            position: relative;
            top: -14px;
            left: 3px;
            height: 2px;
            width: 13px;
            background: #1E283C;
          }
        }
        .select-container{
          .el-select{
            &/deep/.el-input__inner{
              height: 34px;
              width: 98px;
            }
          }
        }
        .top{
          border-top: none;
        }
        .left{
          border-left: none;
        }
        li:first-child{
          border-radius: 4px 0 0 0;
        }
        li:last-child{
          border-left: none;
          border-radius: 0 4px 0 0;
        }
      }
    }
  }
  @media screen and (max-width: 1600px) {
    .search-form_box.length-box .search-form_button{
      margin-top: 0;
      margin-left: 20px;
    }
  }
  @media screen and (max-width: 744px) {
    .search-form_box.length-box .search-form_button{
      margin-top: 20px;
      margin-left: 20px;
    }
  }
</style>
