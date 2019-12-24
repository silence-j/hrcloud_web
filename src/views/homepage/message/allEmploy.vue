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
                <div v-if="scope.row.status==2" class="moveBtn">
                  <el-tooltip placement="top" effect="light">
                    <div slot="content" style="width: 130px;height: 55px;overflow: auto;">{{scope.row.relieveReason}}{{scope.row.noSignedRemark?'，'+scope.row.noSignedRemark:''}}</div>
                    <span>{{scope.row.status | filterEmployStatus}}</span>
                  </el-tooltip>
                </div>
                <div v-else>
                  <span>{{scope.row.status | filterEmployStatus}}</span>
                </div>
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
                <span v-show="(scope.row.status == 1 || scope.row.status == 3 || scope.row.status == 4 || scope.row.status == 5 ) && (permission.indexOf('查看'))!==-1" @click="lookSignMsg(scope.row)">查看</span>
              </div>
              <div v-else>
                <span v-show="(scope.row.status == 6 || scope.row.status == 2) && (permission.indexOf('签订'))!==-1" @click="concludeMsg(scope.row)">签订</span>
                <span v-show="scope.row.status == 6 && (permission.indexOf('不签订'))!==-1" @click="UnconcludeMsg(scope.row)">不签订</span>
                <span v-show="(scope.row.status == 1 || scope.row.status == 5) && (permission.indexOf('解除'))!==-1" @click="moveMsg(scope.row)">解除</span>
                <span v-show="scope.row.status == 3 && (permission.indexOf('解除详情'))!==-1" @click="lookMoveMsg(scope.row)">解除详情</span>
                <span v-show="(scope.row.status == 1 || scope.row.status == 3 || scope.row.status == 4 || scope.row.status == 5 ) && (permission.indexOf('查看'))!==-1" @click="lookSignMsg(scope.row)">查看</span>
                <span v-show="(scope.row.status == 2 || scope.row.status == 6) && (permission.indexOf('异地签')!==-1) " @click="placeSignMsg(scope.row)">异地签</span>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br/>
    <el-button type="primary" size="mini" @click="exportBtn" v-show="permission.indexOf('导出')">导出</el-button>
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
          <el-form-item label="不签订说明：">
            <el-input type="textarea" v-model="UnsignForm.noSignedRemark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="UncancelVisible = false" class="false" size="mini">取 消</el-button>
        <el-button type="primary" @click="UnconcludeSave" size="mini">确 定</el-button>
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
    <!-- 查看解除信息 -->
    <el-dialog title="查看解除信息" :visible.sync="moveCheckVisible" width="500px">
      <el-form label-width="100px">
        <el-row align="center">
          <el-form-item label="类  型:">
            <span>{{MoveDetailDatas.relieveType | filterRelieveType}}</span>
          </el-form-item>
        </el-row>
        <el-row align="center">
          <el-form-item label="原  因:">
            <span>{{MoveDetailDatas.relieveReason}}</span>
          </el-form-item>
        </el-row>
        <el-row align="center">
          <el-form-item label="说  明:">
            <span v-if="MoveDetailDatas.remark">{{MoveDetailDatas.remark}}</span>
            <span v-else class="color999">未填写</span>
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="moveCheckVisible = false" class="false" size="mini">取 消</el-button>
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
    <!-- 下载 -->
    <form style="display:none" name="form" method="POST" ref="submitExcel" id="submitExcel" :action="hostBaseUrl+'/user/user/work/agreement/exportDetail'">
      <p>status: <input type="text" id="status" name="status" value="" /></p>
      <p>keyword: <input type="text" id="keyword" name="keyword" value="" /></p>
      <input type="submit" value="Submit"/>
    </form>
    <!--选择显示字段-->
    <ChooseColumn :chooseData="chooseData" ref="chooseColumn"></ChooseColumn>
</div>
</template>
<script>
import { commonEmploy, waitEmployment, stopEmploy } from 'assets/mixins/employMixins'
import { hostBaseUrl } from 'utils/config'
export default {
  mixins: [commonEmploy, waitEmployment, stopEmploy],
  data () {
    return {
      hostBaseUrl
    }
  },
  methods: {
    exportBtn () {
      document.getElementById('status').setAttribute('value', this.searchForm.status ? this.searchForm.status : '')
      document.getElementById('keyword').setAttribute('value', this.searchForm.keyword ? this.searchForm.keyword : '')
      this.$refs.submitExcel.submit()
    }
  },
  computed: {
    employParams () {
      return {
        keyword: this.searchForm.keyword,
        status: this.searchForm.status,
        page: this.pageMsg.currentPage,
        size: this.pageMsg.pageSize,
        prop: this.prop,
        order: this.order,
        options: this.getDeepSearchOptions
      }
    }
  },
  destroyed () {
    this.$store.commit('SET_CONTRACT_ALL_SELECT', false)
  }
}
</script>
