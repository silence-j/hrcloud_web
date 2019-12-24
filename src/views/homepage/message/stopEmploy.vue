<template>
  <div class="mt-20">
    <div class="table-setting-warp">
      <div class="table-setting-icon el-icon-setting" @click="chooseMsg"></div>
      <el-table
        :data="employmentListDatas"
        border
        @sort-change="sortChange">
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
                <div v-if="scope.row.canOperate === 0">
                  <span v-show="scope.row.status == 1 && (permission.indexOf('查看'))!=-1" @click="lookSignMsg(scope.row)">查看</span>
                </div>
                <div v-else>
                  <span v-show="(scope.row.status == 6 || scope.row.status == 2) && (permission.indexOf('签订'))==-1" @click="concludeMsg(scope.row)">签订</span>
                  <span v-show="scope.row.status == 6 && (permission.indexOf('不签订'))!=-1" @click="UnconcludeMsg(scope.row)">不签订</span>
                  <span v-show="(scope.row.status == 1 || scope.row.status == 5) && (permission.indexOf('解除'))!=-1" @click="moveMsg(scope.row)">解除</span>
                  <!-- <span v-show="scope.row.status == 1 && (permission.indexOf('报道'))!==-1" @click="reportMsg(scope.row)">报到</span> -->
                  <span v-show="scope.row.status == 1 && (permission.indexOf('查看'))!=-1" @click="lookSignMsg(scope.row)">查看</span>
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
    <!-- 查看签订协议信息 -->
    <el-dialog title="查看签订协议信息" :visible.sync="cancelCheckVisible" width="500px">
      <el-form label-width="80px">
        <el-form-item label="信息：">
          {{employeeInfo}}&nbsp;&nbsp;{{schoolSignedInfo}}&nbsp;&nbsp;{{unitSignedInfo}}&nbsp;&nbsp;{{talentsInfo}}
        </el-form-item>
        <el-form-item label="备注：">
          <span v-if="signDetailDatas.remark">{{signDetailDatas.remark}}</span>
          <span v-else class="color999">未填写</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelCheckVisible = false" class="false" size="mini">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 解除 -->
    <el-dialog title="解除" :visible.sync="moveVisible" width="500px">
      <div class="module-opera">
        <el-form :model="moveForm" label-width="85px">
          <el-form-item label="类型：" class="mustForm">
            <el-radio-group v-model="moveForm.relieveType">
              <el-radio label= 0 >解除</el-radio>
              <el-radio label= 1 >解除并改派</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="原因：" class="mustForm">
            <el-select v-model="moveForm.reason" placeholder="请选择">
              <el-option
                v-for="item in reasonOption"
                :key="item.id"
                :label="item.codeText"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="说明：">
          <el-input type="textarea" v-model="moveForm.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="moveVisible = false" class="false" size="mini">取 消</el-button>
        <el-button type="primary" @click="moveSave" size="mini">确 定</el-button>
      </span>
    </el-dialog>
    <!--选择显示字段-->
    <ChooseColumn :chooseData="chooseData" ref="chooseColumn"></ChooseColumn>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getEmploymentWaitReleaseList } from 'static/api/contract/contract'
import { commonEmploy, stopEmploy } from 'assets/mixins/employMixins'
export default {
  mixins: [commonEmploy, stopEmploy],
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['getContracrArr', 'getContractClicked']),
    employParams () {
      return {
        keyword: this.searchForm.keyword,
        /* status: 4, */
        page: this.pageMsg.currentPage,
        size: this.pageMsg.pageSize,
        prop: this.prop,
        order: this.order
      }
    }
  },
  methods: {
    /** 待解除列表**/
    _getEmploymentList () {
      getEmploymentWaitReleaseList(this.employParams).then(data => {
        if (data.result) {
          if (data.result.records) {
            this.employmentListDatas = data.result.records
          }
          this.pageMsg.total = data.result.total
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.el-select{
  width:100%!important;
}
.checkbox-box{
  .el-checkbox{
    &:last-child{
      margin-left:0px;
    }
  }
}
</style>
