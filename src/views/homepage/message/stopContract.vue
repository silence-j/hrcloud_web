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
                <span @click="checkContractMsg(scope.row)" v-show="(permission.indexOf('查看'))!==-1">查看</span>
              </div>
              <div v-else>
                <span v-show="(scope.row.status === 3 || scope.row.status === 4) && (permission.indexOf('解除'))!==-1" @click="RemoveMsg(scope.row)">解除</span>
                <span @click="checkContractMsg(scope.row)" v-show="(permission.indexOf('查看'))!==-1">查看</span>
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
    <!-- 解除合同 -->
    <el-dialog title="解除合同"
      :visible.sync="RemoveVisible"
      v-draggable
      width="500px">
      <el-form :model="RemoveForm"
        label-width="120px"
        class="dialog-form">
        <el-form-item label="姓 名：">
          {{RemoveForm.name}}
        </el-form-item>
        <el-form-item label="身份证号：">
          {{RemoveForm.idCardNumber}}
        </el-form-item>
        <el-form-item label="合同开始时间：">
          {{RemoveForm.contractBeginDate}}
        </el-form-item>
        <el-form-item label="合同结束时间：">
          {{RemoveForm.contractEndDate ? RemoveForm.contractEndDate :'未填写'}}
        </el-form-item>
        <el-form-item label="解 除 时 间：" class="mustForm">
          <el-date-picker
            v-model="RemoveForm.contractCancelTime"
            type="date"
            placeholder="请选择解除时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="解 除 原 因：" class="mustForm">
          <el-select v-model="RemoveForm.contractCancelReason" clearable placeholder="请选择解除原因"  style="width:100%">
            <el-option
              v-for="item in RemoveSelect"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备　　注：">
          <el-input type="textarea" v-model="RemoveForm.reson"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
              <el-button @click="RemoveVisible = false" class="false" size="mini">取 消</el-button>
              <el-button type="primary" @click="RemoveSave" size="mini">确 定</el-button>
      </span>
    </el-dialog>
    <!--选择显示字段-->
    <ChooseColumn :chooseData="chooseData" ref="chooseColumn"></ChooseColumn>
  </div>
</template>
<script>
import { getWaitReleaseList } from 'static/api/contract/contract'
import { commonContract, stopContract } from 'assets/mixins/contractMixins'
import { contractStatus, getfilterworkStatus } from 'assets/js/filters'
const pageMsg = {
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 20, 50],
  total: 0
}
export default {
  mixins: [commonContract, stopContract],
  data () {
    return {
    }
  },
  methods: {
    // 待解除列表
    _getContractList () {
      getWaitReleaseList(this.contractListParams).then(data => {
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
      const pages = this.getSearchParams({}, '劳动合同管理待解除')
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
      this.setSearchParams(searchParamsForm, '劳动合同管理待解除')
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
  width:100%;
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
