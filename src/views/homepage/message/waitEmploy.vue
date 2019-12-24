<template>
  <div class="mt-20" @click="orgDatas1.showTree=false">
    <div class="table-setting-warp">
      <div class="table-setting-icon el-icon-setting" @click="chooseMsg"></div>
        <el-table
          :data="employmentListDatas"
          border @sort-change="sortChange">
          <el-table-column
            label="序号"
            type="index"
            width="60">
          </el-table-column>
          <div v-for="item in fieldList" :key="item.id">
            <template v-if="item.prop == 'status'">
              <el-table-column
                label="状态"
                prop="status">
                <template slot-scope="scope">
                    <span>{{scope.row.status | filterEmployStatus}}</span>
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
            width="160px">
            <template slot-scope="scope">
              <div class="operation">
                <div v-if="scope.row.canOperate === 1">
                  <span v-show="(scope.row.status == 6 || scope.row.status == 2) && (permission.indexOf('签订'))!=-1" @click="concludeMsg(scope.row)">签订</span>
                  <span v-show="scope.row.status == 6 && (permission.indexOf('不签订'))!==-1" @click="UnconcludeMsg(scope.row)">不签订</span>
                  <span v-show="(scope.row.status == 2 || scope.row.status == 6) && (permission.indexOf('异地签')!=-1) " @click="placeSignMsg(scope.row)">异地签</span>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination
        @size-change="handleEmploySizeChange"
        @current-change="handleEmployCurrentChange"
        :current-page="pageMsg.currentPage"
        :page-sizes="pageMsg.pageSizes"
        :page-size="pageMsg.pageSize"
        :total="pageMsg.total">
      </pagination>
      <!-- 签订协议 -->
      <el-dialog title="签订协议" :visible.sync="cancelVisible" width="500px">
        <div class="module-opera">
          <el-form :model="signForm" label-width="80px">
            <el-form-item label="信息：">
              <el-checkbox-group v-model="signForm.checkedNames" class="checkbox-box">
                <el-checkbox v-for="(check, index) in checkSelect" :label="check.value" :key="index">{{check.label}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input type="textarea" v-model="signForm.remark"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="concludeSave" size="mini">保 存</el-button>
            <el-button type="primary" @click="concludeSure" size="mini">确定签订</el-button>
        </span>
      </el-dialog>
      <!-- 不签订协议 -->
      <el-dialog  title="不签订协议" :visible.sync="UncancelVisible" width="500px">
        <div class="module-opera">
          <el-form :model="UnsignForm" label-width="125px">
            <el-form-item label="不签订原因：" class="mustForm">
              <el-select v-model="UnsignForm.reason" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in resonSelect"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备 注：">
              <el-input type="textarea" v-model="UnsignForm.noSignedRemark"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="UncancelVisible = false" class="false" size="mini">取 消</el-button>
          <el-button type="primary" @click="UnconcludeSave" size="mini">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 异地签 -->
      <el-dialog title="异地签" :visible.sync="SignVisible" width="500px">
        <el-form :model="SignForm" label-width="110px">
          <el-form-item label="签订主体：" class="mustForm">
            <div class="search-form_item">
              <search-dept-tree :orgDatas="orgDatas1" ref="deptTree"/>
            </div>
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
import { waitEmployment, commonEmploy } from 'assets/mixins/employMixins'
const pageMsg = {
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 20, 50],
  total: 0
}
export default {
  mixins: [waitEmployment, commonEmploy],
  data () {
    return {
    }
  },
  computed: {
    employParams () {
      return {
        keyword: this.searchForm.keyword,
        status: 6,
        page: this.pageMsg.currentPage,
        size: this.pageMsg.pageSize,
        prop: this.prop,
        order: this.order
      }
    }
  },
  methods: {
    // 设置默认搜索项
    _setDefaultSearch () {
      const pages = this.getSearchParams({}, '就业协议管理待签订')
      const pageMsg1 = pages.pageMsg ? JSON.parse(pages.pageMsg) : Object({}, pageMsg)
      setTimeout(() => {
        this.pageMsg = pageMsg1
      }, 400)
    },
    _setDefaultLocalData () {
      const searchParamsForm = Object.assign({}, { pageMsg: JSON.stringify(this.pageMsg) })
      this.setSearchParams(searchParamsForm, '就业协议管理待签订')
    }
  }
}
</script>

<style scoped lang="less">
.el-select{
  width:100%!important;
}
.el-checkbox-group{
  .el-checkbox:last-child{
    margin-left:0px!important;
  }
}
</style>
