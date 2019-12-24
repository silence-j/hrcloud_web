<template>
  <div class="mt-20" @click="orgDatas1.showTree=false">
    <div class="table-setting-warp">
      <div class="table-setting-icon el-icon-setting" @click="chooseMsg"></div>
        <el-table
          :data="contractList"
          border @sort-change="sortChange">
          <el-table-column
            label="序号"
            type="index"
            width="60">
          </el-table-column>
          <div v-for="item in fieldList" :key="item.id">
            <template v-if="item.prop == 'status'">
              <el-table-column
                label="状态">
                <template slot-scope="scope">
                  <div v-if="scope.row.status==11||scope.row.status==10" class="moveBtn">
                    <el-tooltip placement="top" effect="light">
                      <div slot="content" style="width: 130px;height: 55px;overflow: auto;">{{scope.row.contractCancelReason}}{{scope.row.noSignedRemark?'，'+scope.row.noSignedRemark:''}}</div>
                      <span>{{scope.row.status | filterStatus }}</span>
                    </el-tooltip>
                  </div>
                  <div v-else>
                    <span>{{scope.row.status | filterStatus }}</span>
                  </div>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="item.prop == 'workSchedule'">
              <el-table-column
                prop="nature"
                label="工时制度" :sortable="item.orderFlag === 1">
                <template slot-scope="scope">
                  {{scope.row.workSchedule | filterworkStatus}}
                </template>
              </el-table-column>
            </template>
            <template v-else>
              <el-table-column
                :label="item.name"
                :prop="item.prop" :key="item.name" :sortable="item.orderFlag === 1" min-width="120">
              </el-table-column>
            </template>
          </div>

          <el-table-column
            label="操作"
            fixed="right"
            width="240px">
            <template slot-scope="scope">
              <div class="operation">
                <div v-if="scope.row.canOperate === 0">
                  <span v-show="scope.row.status === 2 && (permission.indexOf('查看')!=-1)" @click="checkContractMsg(scope.row)">查看</span>
                </div>
                <div v-else>
                  <span v-show="scope.row.status === 1 && (permission.indexOf('签订')!=-1)" @click="concludeMsg(scope.row)">签订</span>
                  <span v-show="scope.row.status === 1 && (permission.indexOf('不签订')!=-1)" @click="UnconcludeMsg(scope.row)">不签订</span>
                  <span v-show="scope.row.status === 2 && (permission.indexOf('办结')!=-1)" @click="BanjieMsg(scope.row)">办结</span>
                  <span v-show="scope.row.status === 2 && (permission.indexOf('取消')!=-1)" @click="CancelMsg(scope.row)">取消</span>
                  <span v-show="scope.row.status === 1 && (permission.indexOf('编辑')!=-1)" @click="editContractMsg(scope.row, 'edit')">编辑</span>
                  <span v-show="scope.row.status === 2 && (permission.indexOf('查看')!=-1)" @click="checkContractMsg(scope.row)">查看</span>
                  <!-- <span v-show="scope.row.status === 1 && (permission.indexOf('异地签')!=-1)" @click="placeSignMsg(scope.row)">异地签</span> -->
                  <span v-show="permission.indexOf('异地签')!=-1 && (scope.row.status === 1)" @click="placeSignMsg(scope.row)">异地签</span>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination
        @size-change="handleContractSizeChange"
        @current-change="handleContractCurrentChange"
        :current-page="pageMsg.currentPage"
        :page-sizes="pageMsg.pageSizes"
        :page-size="pageMsg.pageSize"
        :total="pageMsg.total">
      </pagination>
      <!-- 不签订原因 -->
      <el-dialog title="不签订原因" :visible.sync="UncancelVisible" width="500px">
        <el-form :model="UnconcludeForm" label-width="120px">
          <el-form-item label="不签订原因：" class="mustForm dialog-form">
            <el-select v-model="UnconcludeForm.contractCancelReason" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in resonSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="不签订说明">
            <el-input type="textarea" v-model="UnconcludeForm.noSignedRemark"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="UncancelVisible = false" class="false" size="mini">取 消</el-button>
          <el-button type="primary" @click="UnconcludeSave" size="mini">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 异地签 -->
      <el-dialog title="异地签" :visible.sync="SignVisible" width="500px">
        <el-form :model="SignForm" label-width="100px">
          <el-form-item label="合同主体：" class="mustForm">
              <div class="search-form_item">
                <search-dept-tree :orgDatas="orgDatas1" ref="deptTree"/>
              </div>
          </el-form-item>
          <el-form-item label="解除时间：" class="mustForm" v-show="this.contractStatusNumber === 3 || this.contractStatusNumber === 4">
            <el-date-picker
              v-model="SignForm.signTime"
              type="date"
              placeholder="选择解除时间">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="SignVisible = false" class="false" size="mini">取 消</el-button>
          <el-button type="primary" @click="SignSave" size="mini">确 定</el-button>
        </span>
      </el-dialog>
      <!--选择显示字段-->
      <ChooseColumn :chooseData="chooseData" ref="chooseColumn"></ChooseColumn>
  </div>
</template>
<script>
import { getContractList } from 'static/api/contract/contract'
import { commonContract, waitContract } from 'assets/mixins/contractMixins'
import { contractStatus, getfilterworkStatus } from 'assets/js/filters'
const pageMsg = {
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 20, 50],
  total: 0
}
export default {
  mixins: [commonContract, waitContract],
  data () {
    return {
    }
  },
  computed: {
    currentRouteName () {
      return this.$route.name
    }
  },
  methods: {
    // 待签订
    _getContractList () {
      // this.searchForm.status = 1
      getContractList(Object.assign({}, this.contractListParams, { sList: 1 })).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.contractList = data.result.records
          }
          this.pageMsg.total = data.result.total
        }
      })
    },
    // 设置默认搜索项
    _setDefaultSearch () {
      const pages = this.getSearchParams({}, '劳动合同管理待签订')
      const pageMsg1 = pages.pageMsg ? JSON.parse(pages.pageMsg) : Object({}, pageMsg)
      console.log('pages', pages)
      let lists = ['currentPage', 'pageSize', 'pageSizes', 'total']
      let keys = []
      for (let key in pageMsg1) {
        keys.push(key)
      }
      lists.forEach(item => {
        let r = keys.findIndex(x => x + '' === item + '')
        if (r === -1) {
          if (item === 'currentPage') pageMsg1.currentPage = this.pageMsg.currentPage
          if (item === 'pageSize') {
            pageMsg1.pageSize = this.pageMsg.pageSize
          }
          if (item === 'pageSizes') pageMsg1.pageSizes = this.pageMsg.pageSizes
          if (item === 'total') pageMsg1.total = this.pageMsg.total
        }
      })
      setTimeout(() => {
        this.pageMsg = pageMsg1
      }, 400)
    },
    _setDefaultLocalData () {
      const searchParamsForm = Object.assign({}, { pageMsg: JSON.stringify(this.pageMsg) })
      this.setSearchParams(searchParamsForm, '劳动合同管理待签订')
    },
    _setPage () {
      this.pageMsg.currentPage = 1
      this.pageMsg.pageSize = 10
    }
  },
  filters: {
    filterStatus (str) {
      return contractStatus(str)
    },
    filterworkStatus (str) {
      return getfilterworkStatus(str)
    }
  },
  destroyed () {
    // if (!this.$route.path.includes('/personnel-information/contract')) {
    //   this._setDefaultLocalData('1')
    // } else {
    //   this._setDefaultLocalData()
    // }
    this._setDefaultLocalData()
  },
  created () {
    this._setDefaultSearch()
  }
}
</script>

<style scoped lang="less">
.el-select{
  width:100%!important;
}
.el-form-item.mustForm {
  position: relative;
}
.el-form-item.mustForm:before {
  content: "*";
  color: red;
  position: absolute;
  top: 15px;
  left: 8px;
}
</style>
