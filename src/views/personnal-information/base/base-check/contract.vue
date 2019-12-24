<template>
    <div class="mt-20">
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="当前合同" name="1">
                <div v-if="nowContractList.length > 0">
                    <el-form label-width="120px" v-for="item in nowContractList" :key="item.id">
                        <p class="base-sec-title">当前合同</p>
                        <el-row align="center">
                            <el-col :span="8">
                                <el-form-item label="身 份 证 号:">
                                <span>{{item.idCardNumber}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="姓  名:" >
                                <span>{{item.name}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="联 系 电 话:">
                                <span>{{item.telephone}}</span>
                                </el-form-item>
                            </el-col>
                            </el-row>
                            <el-row align="center">
                            <el-col :span="8">
                                <el-form-item label="合 同 主 体:">
                                <span>{{item.contractSubject}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="合 同 期 数:" >
                                <span>{{item.contractNumber}}期</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="是否固定期限:" >
                                <span>{{item.periodType | filterPeriodType}}</span>
                                </el-form-item>
                            </el-col>
                            </el-row>
                            <el-row align="center">
                            <el-col :span="8">
                                <el-form-item label="合 同 期 限:">
                                <span>{{item.contractPeriod}}月</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="合同开始时间:">
                                <span>{{item.contractBeginDate}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="合同结束时间:" >
                                <span>{{item.contractEndDate}}</span>
                                </el-form-item>
                            </el-col>
                            </el-row>
                            <el-row align="center">
                            <el-col :span="8">
                                <el-form-item label="工  时  制  度:" >
                                <span>{{item.workSchedule | filterworkScheduleStatus}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="劳 动 报 酬:" >
                                <span>{{item.salary}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="试用期工资:" >
                                <span>{{item.trySalary}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row align="center">
                        <el-col :span="24">
                            <el-form-item label="工 作 内 容:">
                            <span>{{item.workContent}}</span>
                            </el-form-item>
                        </el-col>
                        </el-row>
                        <el-row align="center">
                        <el-col :span="24">
                            <el-form-item label="工 作 地 点:" >
                            <span>{{item.workAdress}}</span>
                            </el-form-item>
                        </el-col>
                        </el-row>
                        <el-row align="center">
                        <el-col :span="16">
                            <el-form-item label="乙方送达地址:" >
                            <span>{{item.userAdress}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="邮  编:" >
                            <span v-if="item.zipCode">{{item.zipCode}}</span>
                            <span v-else class="color999">未填写</span>
                            </el-form-item>
                        </el-col>
                        </el-row>
                        <el-row align="center">
                        <el-col :span="24">
                            <el-form-item label="备  注:" >
                            <span v-if="item.remark">{{item.remark}}</span>
                            <span v-else class="color999">未填写</span>
                            </el-form-item>
                        </el-col>
                        </el-row>
                    </el-form>
                </div>
                <div v-else class="hint">暂无当前合同</div>
            </el-collapse-item>

            <el-collapse-item title="历史合同" name="2">
                <div v-if="historyContractList.length > 0">
                    <el-form label-width="120px" v-for="item in historyContractList" :key="item.id">
                        <p class="base-sec-title">历史合同</p>
                        <el-row align="center">
                            <el-col :span="8">
                                <el-form-item label="身 份 证 号:">
                                <span>{{item.idCardNumber}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="姓　名:" >
                                <span>{{item.name}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="联 系 电 话:">
                                <span>{{item.telephone}}</span>
                                </el-form-item>
                            </el-col>
                            </el-row>
                            <el-row align="center">
                            <el-col :span="8">
                                <el-form-item label="合 同 主 体:">
                                <span>{{item.contractSubject}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="合 同 期 数:" >
                                <span>{{item.contractNumber}}期</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="是否固定期限:" >
                                <span>{{item.periodType | filterPeriodType}}</span>
                                </el-form-item>
                            </el-col>
                            </el-row>
                            <el-row align="center">
                            <el-col :span="8">
                                <el-form-item label="合 同 期 限:">
                                <span>{{item.contractPeriod}}月</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="合同开始时间:">
                                <span>{{item.contractBeginDate}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="合同结束时间:" >
                                <span>{{item.contractEndDate}}</span>
                                </el-form-item>
                            </el-col>
                            </el-row>
                            <el-row align="center">
                            <el-col :span="8">
                                <el-form-item label="工  时  制  度:" >
                                <span>{{item.workSchedule | filterworkScheduleStatus}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="劳 动 报 酬:" >
                                <span>{{item.salary}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="试用期工资:" >
                                <span>{{item.trySalary}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row align="center">
                        <el-col :span="24">
                            <el-form-item label="工 作 内 容:">
                            <span>{{item.workContent}}</span>
                            </el-form-item>
                        </el-col>
                        </el-row>
                        <el-row align="center">
                        <el-col :span="24">
                            <el-form-item label="工 作 地 点:" >
                            <span>{{item.workAdress}}</span>
                            </el-form-item>
                        </el-col>
                        </el-row>
                        <el-row align="center">
                        <el-col :span="16">
                            <el-form-item label="乙方送达地址:" >
                            <span>{{item.userAdress}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="邮  编:" >
                            <span v-if="item.zipCode">{{item.zipCode}}</span>
                            <span v-else class="color999">未填写</span>
                            </el-form-item>
                        </el-col>
                        </el-row>
                        <el-row align="center">
                        <el-col :span="24">
                            <el-form-item label="备  注:" >
                            <span v-if="item.remark">{{item.remark}}</span>
                            <span v-else class="color999">未填写</span>
                            </el-form-item>
                        </el-col>
                        </el-row>
                    </el-form>
                </div>
                <div v-else class="hint">暂无历史合同</div>
            </el-collapse-item>

            <el-collapse-item title="变更记录" name="3">
                <el-table
                    :data="resMapList"
                    border
                    style="width: 100%">
                    <el-table-column
                        label="序号"
                        type="index"
                        width="70">
                    </el-table-column>

                    <el-table-column
                        prop="changeContent"
                        label="变更内容"
                        width="600px">
                        <template slot-scope="scope">
                            <div v-html="scope.row.changeContent"></div>
                            <!-- <div class="moveBtn">
                            <el-tooltip placement="top" effect="light">
                                <div slot="content" class="text-content"><div v-html="scope.row.changeContent"></div></div>
                                <div v-html="scope.row.changeContent"></div>
                            </el-tooltip>
                            </div>-->
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="createTime"
                        label="变更时间">
                    </el-table-column>

                     <el-table-column
                        prop="creator"
                        label="操作人">
                    </el-table-column>
                </el-table>
            </el-collapse-item>

        </el-collapse>
    </div>
</template>

<script>
import { getPersonContractDetails } from 'static/api/personnel-information/base/base'
import { getfilterworkStatus, getfilterPeriodType } from 'assets/js/filters'
export default {
  data () {
    return {
      contractDetailsData: [],
      activeName: '1',
      nowContractList: [],
      historyContractList: [],
      resMapList: []
    }
  },
  methods: {
    _getContractDetails () {
      getPersonContractDetails(this.$route.params.baseId).then((data) => {
        if (data.result) {
          this.contractDetailsData = data.result
          if (data.resMap) {
            this.resMapList = data.resMap.list
          }
          this.contractDetailsData.forEach(item => {
            if (item.status === 3) {
              this.nowContractList.push(item)
            }
            if (item.status !== 3) {
              this.historyContractList.push(item)
            }
          })
        }
      })
    }
  },
  filters: {
    filterworkScheduleStatus (str) {
      return getfilterworkStatus(str)
    },
    filterPeriodType (str) {
      return getfilterPeriodType(str)
    }
  },
  created () {
    this._getContractDetails()
    this.$store.commit('SET_ACTIVE_ROUTER', '6')
  }
}
</script>

<style scoped lang="less">
.tit{
    border-left:5px solid #FF7500;
    font-size:16px;
}
.base-sec-title{
    width:98%
}
.base-sec-title::after{
    left: 90px;
}

</style>
