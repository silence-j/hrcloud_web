<template>
    <div class="mt-20">
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="人员状态变化" name="1" v-if="ChangeDetailsDatas.dimissionInfo=== null && ChangeDetailsDatas.reemployInfo === null && ChangeDetailsDatas.orgTransferList.length <= 0 && ChangeDetailsDatas.salarySettingList.length <= 0">
                <p style="color:#FF7500">暂无人员状态变化</p>
            </el-collapse-item>

            <el-collapse-item title="人员状态变化" name="1" v-else>
                <div>
                    <div class="leave-info" v-show="showDimission">
                        <p class="base-sec-title">离 职</p>
                        <el-form label-width="160px">
                            <el-row align="center">
                                <el-col :span="6">
                                    <el-form-item label="申请离职日期:">
                                        <span>{{dimissionInfoDatas.dimissionDate}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="离职原因:">
                                        <span>{{dimissionInfoDatas.dimissionReason}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="确定离职日期:">
                                        <span>{{dimissionInfoDatas.dimissionDateComfirmed}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="离职类型:">
                                        <span>{{dimissionInfoDatas.dimissionType}}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row align="center">
                                <el-col :span="6">
                                    <el-form-item label="工资:">
                                        <span>{{dimissionInfoDatas.salaryDate}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="补贴:">
                                        <span>{{dimissionInfoDatas.subsidyDate}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="社保:">
                                        <span>{{dimissionInfoDatas.insuranceDate}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="公积金:">
                                        <span>{{dimissionInfoDatas.fundDate}}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row align="center">
                                <el-col :span="6">
                                    <el-form-item label="人事档案及户口:">
                                        <span>{{dimissionInfoDatas.archivesHousehold}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="备注:">
                                        <span>{{dimissionInfoDatas.remark}}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row align="center">
                                <el-col :span="6">
                                    <el-form-item label="工作已移交:">
                                        <span v-show="dimissionInfoDatas.workHandover===1">是</span>
                                        <span v-show="dimissionInfoDatas.workHandover===0">否</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="纸质及电子档案已移交:">
                                        <span v-show="dimissionInfoDatas.archivesHandover===1">是</span>
                                        <span v-show="dimissionInfoDatas.archivesHandover===0">否</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <br/>
                    </div>

                    <div v-show="showReemploy">
                        <p class="base-sec-title">退休返聘</p>
                        <el-form label-width="160px">
                            <el-row align="center">
                                <el-col :span="6">
                                    <el-form-item label="退休时间:">
                                        <span>{{reemployInfoDatas.retireDate}}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row align="center">
                                <el-col :span="6">
                                    <el-form-item label="返聘开始时间:">
                                        <span>{{reemployInfoDatas.reemployStart}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="返聘结束时间:">
                                        <span>{{reemployInfoDatas.reemployEnd}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="备注:">
                                        <span>{{reemployInfoDatas.reemployRemark}}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <br/>
                    </div>

                    <div v-show="regularListCmputedList.length > 0">
                        <p class="base-sec-title">转 正</p>
                        <el-form label-width="160px" v-for="item in regularListCmputedList" :key="item.id">
                            <el-row align="center">
                                <el-col :span="6">
                                    <el-form-item label="转正时间:">
                                        <span>{{item.positiveTime}}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row align="center">
                                <el-col :span="24">
                                    <el-form-item label="转正后工资标准:">
                                        <span>{{item.formalSalary}}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        <!-- <el-row align="center">
                                <el-col :span="24">
                                    <el-form-item label="试用期工资标准:">
                                        <span>{{item.probationSalary}}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        -->
                        </el-form>
                        <br/>
                    </div>

                    <div v-show="reportListCmputedList.length > 0">
                        <p class="base-sec-title">报 到</p>
                        <el-form label-width="160px"  v-for="item in reportListCmputedList" :key="item.id">
                            <el-row align="center">
                                <el-col :span="6">
                                    <el-form-item label="毕业时间:">
                                        <span>{{item.graduationDate}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="试用期开始时间:">
                                        <span>{{item.probationBeginTime}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="试用期结束时间:">
                                        <span>{{item.probationEndTime}}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row align="center">
                                <el-col :span="24">
                                    <el-form-item label="试用期工资标准:">
                                        <span>{{item.probationSalary}}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row align="center">
                                <el-col :span="24">
                                    <el-form-item label="转正后工资标准:">
                                        <span>{{item.formalSalary}}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <br/>
                    </div>

                    <div v-show="entryListCmputedList.length > 0">
                        <p class="base-sec-title">入 职</p>
                        <el-form label-width="160px"  v-for="item in entryListCmputedList" :key="item.id">
                            <el-row align="center">
                                <el-col :span="6">
                                    <el-form-item label="入职类型:">
                                        <span v-if="item.candidateType === 1">社会人员</span>
                                        <span v-if="item.candidateType === 2">在校生</span>
                                        <span v-if="item.candidateType === 3">应届生</span>
                                        <span v-if="item.candidateType === 4">退休人员</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <!--1 3 4社会人员入职 -->
                            <div v-if="item.candidateType === 1 || item.candidateType === 3 || item.candidateType === 4">
                                <el-row>
                                    <div v-show="item.noProbation === '0'">
                                        <el-col :span="6">
                                            <el-form-item label="试用开始时间:">
                                                <span>{{item.probationBeginTime}}</span>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-form-item label="试用结束时间:">
                                                <span>{{item.probationEndTime}}</span>
                                            </el-form-item>
                                        </el-col>
                                    </div>
                                    <el-col :span="6" v-show="item.noProbation === '1'">
                                        <el-form-item label="有无试用期:">
                                            <span v-if="item.noProbation === '0'">有试用期</span>
                                            <span v-if="item.noProbation === '1'">无试用期</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row align="center" v-if="item.noProbation === '0'">
                                    <el-col :span="20">
                                        <el-form-item label="试用期工资标准:">
                                            <span v-if="item.probationSalary">{{item.probationSalary}}</span>
                                            <span v-else class="color999">未填写</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row align="center">
                                    <el-col :span="20">
                                        <el-form-item label="转正后工资标准:">
                                            <span v-if="item.formalSalary">{{item.formalSalary}}</span>
                                            <span v-else class="color999">未填写</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </div>
                            <!-- 2在校生入职 -->
                            <div v-if="item.candidateType === 2">
                                <el-row align="center">
                                    <el-col :span="6">
                                        <el-form-item label="实习开始时间:">
                                            <span>{{item.exercitationBeginTime}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="实习结束时间:">
                                            <span v-if="item.exercitationEndTime">{{item.exercitationEndTime}}</span>
                                            <span v-else class="color999">未填写</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row align="center">
                                    <el-col :span="6">
                                        <el-form-item label="实习期工资:">
                                            <span>{{item.exercitationSalary}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="实习期津贴:">
                                            <span v-if="item.exercitationAllowance">{{item.exercitationAllowance}}</span>
                                            <span v-else class="color999">未填写</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row align="center">
                                    <el-col :span="6">
                                        <el-form-item label="试用期开始时间:">
                                            <span v-if="item.probationBeginTime">{{item.probationBeginTime}}</span>
                                            <span v-else class="color999">未填写</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="试用期结束时间:">
                                            <span v-if="item.probationEndTime">{{item.probationEndTime}}</span>
                                            <span v-else class="color999">未填写</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row align="center">
                                    <el-col :span="20">
                                        <el-form-item label="试用期工资标准:">
                                            <span v-if="item.probationSalary">{{item.probationSalary}}</span>
                                            <span v-else class="color999">未填写</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row align="center">
                                    <el-col :span="20">
                                        <el-form-item label="转正后工资标准:">
                                            <span v-if="item.formalSalary">{{item.formalSalary}}</span>
                                            <span v-else class="color999">未填写</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-form>
                        <br/>
                    </div>
                </div>
            </el-collapse-item>

            <el-collapse-item title="调动管理" name="2">
                <el-table
                    :data="orgTransferListDatas"
                    border
                    style="width: 100%">
                    <el-table-column
                        label="序号"
                        type="index"
                        width="70">
                    </el-table-column>

                    <el-table-column
                        prop="type"
                        label="调动方式">
                    </el-table-column>

                    <el-table-column
                        prop="transferDate"
                        label="调动日期">
                    </el-table-column>

                    <el-table-column
                        prop="levelOne"
                        label="原一级组织">
                    </el-table-column>

                    <el-table-column
                        prop="fromDeptName"
                        label="原部门">
                    </el-table-column>

                    <el-table-column
                        prop="oldPostName"
                        label="原岗位">
                    </el-table-column>

                    <el-table-column
                      prop="newLevelOne"
                      label="调入一级组织">
                    </el-table-column>

                     <el-table-column
                        prop="toCompanyName"
                        label="调入公司">
                    </el-table-column>

                    <el-table-column
                        prop="toDeptName"
                        label="调入部门">
                    </el-table-column>

                    <el-table-column
                        prop="newPostName"
                        label="新岗位">
                    </el-table-column>

                    <el-table-column
                        prop="remark"
                        label="其他说明">
                    </el-table-column>
                </el-table>
            </el-collapse-item>

        </el-collapse>
    </div>
</template>

<script>
import { getPersonChangeDetails } from 'static/api/personnel-information/base/base'
export default {
  data () {
    return {
      activeName: '1',
      dimissionInfoDatas: [],
      salarySettingListDatas: [],
      orgTransferListDatas: [],
      correctRecords: [],
      updateRecords: [],
      reemployInfoDatas: [],
      resMapList: [],
      showLeave: true,
      entryListCmputedList: [],
      reportListCmputedList: [],
      regularListCmputedList: [],
      showDimission: false,
      showReemploy: false,
      ChangeDetailsDatas: ''
    }
  },
  methods: {
    _getPersonChangeDetails () {
      getPersonChangeDetails(this.$route.params.baseId).then(data => {
        if (data.result) {
          this.ChangeDetailsDatas = data.result
          /* 离职信息 */
          if (data.result.dimissionInfo) {
            this.dimissionInfoDatas = data.result.dimissionInfo
            if (this.dimissionInfoDatas === null) {
              this.showDimission = false
            } else {
              this.showDimission = true
            }
          }
          /* 返聘信息 */
          if (data.result.reemployInfo) {
            this.reemployInfoDatas = data.result.reemployInfo
            if (this.reemployInfoDatas === null) {
              this.showReemploy = false
            } else {
              this.showReemploy = true
            }
          }
          /* 调动信息 */
          if (data.result.orgTransferList.length > 0) {
            this.orgTransferListDatas = data.result.orgTransferList
          }
          /* 入职薪资信息 */
          if (data.result.salarySettingList.length > 0) {
            this.salarySettingListDatas = data.result.salarySettingList
            this.salarySettingListDatas.forEach(item => {
              if (item.logType === 1) {
                this.entryListCmputedList.push(item)
              }
              if (item.logType === 2) {
                this.reportListCmputedList.push(item)
              }
              if (item.logType === 3) {
                this.regularListCmputedList.push(item)
              }
            })
          }
        }
      })
    }

  },
  filters: {

  },
  created () {
    this._getPersonChangeDetails()
    this.$store.commit('SET_ACTIVE_ROUTER', '4')
  }
}
</script>

<style scoped lang="less">
.person-tit{
    border-left:5px solid #ff7500;
}
.leave-info.el-form-item{
    margin-bottom:10px;
}
.base-sec-title::after{
    left: 80px;
}
.work-table{
  &/deep/.el-dialog__body{
    padding: 25px 0 20px!important;
  }
  &/deep/.el-dialog__header{
    padding: 0;
    background: none
  }
}
</style>
