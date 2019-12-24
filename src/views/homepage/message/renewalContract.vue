<template>
 <div class="mt-20">
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
                label="状态" min-width="120">
                <template slot-scope="scope">
                  <span>{{scope.row.status | filterStatus }}</span>
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
            width="120px">
            <template slot-scope="scope">
              <div class="operation">
                <div v-if="scope.row.canOperate === 0">
                  <span v-show="(permission.indexOf('查看'))!=-1" @click="checkContractMsg(scope.row)" >查看</span>
                </div>
                <div v-else>
                  <span v-show="(scope.row.status === 3 || scope.row.status === 4) && (permission.indexOf('续签'))!=-1" @click="editContractMsg(scope.row, 'renew')">续签</span>
                  <span v-show="(permission.indexOf('查看'))!=-1" @click="checkContractMsg(scope.row)" >查看</span>
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

      <!--选择显示字段-->
    <ChooseColumn :chooseData="chooseData" ref="chooseColumn"></ChooseColumn>
</div>
</template>
<script>
import { commonContract, renewalContract } from 'assets/mixins/contractMixins'
import { getContractSelect } from 'static/api/contract/contract'
import { contractStatus, getfilterworkStatus } from 'assets/js/filters'
const pageMsg = {
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 20, 50],
  total: 0
}
export default {
  mixins: [commonContract, renewalContract],
  methods: {
    _getContractList () {
      getContractSelect(this.contractListParams).then(data => {
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
      const pages = this.getSearchParams({}, '劳动合同管理待续签')
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
      this.setSearchParams(searchParamsForm, '劳动合同管理待续签')
    },
    _setPage () {
      this.pageMsg.currentPage = 1
      this.pageMsg.pageSize = 10
    }
  },
  computed: {
    currentRouteName () {
      return this.$route.name
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
