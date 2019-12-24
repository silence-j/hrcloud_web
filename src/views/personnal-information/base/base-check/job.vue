<template>
<div class="mt-20">
    <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="职务信息" name="1">
            <div v-if="dutyInfoVODatas.length > 0" >
                <el-form label-width="120px" v-for="item in dutyInfoVODatas" :key="item.id">
                    <p class="base-sec-title">当前职务</p>
                    <el-row align="center">
                        <el-col :span="8">
                            <el-form-item label="姓  名:">
                            <span>{{item.name}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="身份证号:" >
                            <span>{{item.idCardNumber}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="组织架构:">
                            <span>{{item.organizationName}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row align="center">
                        <el-col :span="8">
                            <el-form-item label="任职组织:">
                            <span>{{item.organizationName}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="任职职务:" >
                            <span>{{item.dutyName}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="是否负责人:">
                            <span>{{item.isPrincipal}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row align="center">
                        <el-col :span="8">
                            <el-form-item label="职务级别:">
                            <span>{{item.dutyRank}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="职务性质:">
                            <span>{{item.status | filterExemptStatus}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="待遇级别:">
                            <span>{{item.treatmentRank}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row align="center">
                        <el-col :span="24">
                            <el-form-item label="工资标准:" >
                            <div class="salary-div">
                                {{item.wageLevel}}
                            </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row align="center">
                        <el-col :span="8">
                            <el-form-item label="发文号:">
                            <span>{{item.dispatchNumber}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="发文时间:" >
                            <span>{{item.dutyDispatchTime}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="执行时间:">
                            <span>{{item.dutyExecuteTime}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row align="center">
                        <el-col :span="24">
                            <el-form-item label="任免发文:">
                            <span>{{item.appointRemoveDispatch}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row align="center">
                        <el-col :span="24">
                            <el-form-item label="备注:">
                            <span>{{item.remark}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div v-else class="hint">暂无职务信息</div>
        </el-collapse-item>

        <el-collapse-item title="职务变动记录" name="2">
            <el-table
                :data="userDutyChangeLogDatas"
                border
                style="width: 100%">
                <el-table-column
                    label="序号"
                    type="index"
                    width="70">
                </el-table-column>

                <el-table-column
                    prop="companyName"
                    label="任职组织">
                </el-table-column>

                <el-table-column
                    prop="dutyName"
                    label="职务名称">
                </el-table-column>

                <el-table-column
                    prop="isPartTimeJob"
                    label="职务性质">
                    <template slot-scope="scope">
                        <span>{{scope.row.isPartTimeJob | filterExemptStatus}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="appointRemove"
                    label="任免性质">
                </el-table-column>

                    <el-table-column
                    prop="issuedNumber"
                    label="发文号">
                </el-table-column>

                <el-table-column
                    prop="appointTime"
                    label="执行时间">
                </el-table-column>

                <el-table-column
                    prop="createTime"
                    label="操作时间">
                </el-table-column>
            </el-table>
        </el-collapse-item>
    </el-collapse>
</div>
</template>
<script>
import { getJobStatus } from 'assets/js/filters'
import { getPersonJobDetails } from 'static/api/personnel-information/base/base'
export default {
  data () {
    return {
      activeName: '1',
      dutyInfoVODatas: [],
      userDutyChangeLogDatas: []
    }
  },
  methods: {
    /* 获取职务详情 */
    _getPersonJobDetails () {
      getPersonJobDetails(this.$route.params.baseId).then(data => {
        if (data.result) {
          this.dutyInfoVODatas = data.result.dutyInfoVO
          this.userDutyChangeLogDatas = data.result.userDutyChangeLog
        }
      })
    }
  },
  filters: {
    filterExemptStatus (status) {
      return getJobStatus(status)
    }
  },
  created () {
    this._getPersonJobDetails()
    this.$store.commit('SET_ACTIVE_ROUTER', '5')
  }
}
</script>
<style scoped lang="less">
.cancel-font{font-size: 14px;color: #009688;}
    .salary-div {
    span:nth-child(1){
        margin-left: 0px;
    }
    span{
        margin: 0px 10px;
    }
}
.base-sec-title{
    width:98%
}
.base-sec-title::after{
    left: 90px;
}
</style>
