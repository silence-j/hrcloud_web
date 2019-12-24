<template>
    <div class="cockpit">
        <div class="cockpit-total clearfix">
            <div class="total-mod">
                <div class="onJob">
                    <span class="num">{{onJob}} 人</span>
                    <span class="name">在职员工</span>
                </div>
            </div>
            <div class="total-mod">
                <div class="dimission">
                    <p class="num">{{dimission}} 人</p>
                    <p class="name">离职员工</p>
                </div>
            </div>
            <div class="total-mod">
                <div class="age">
                    <p class="num">{{age}} 岁</p>
                    <p class="name">平均年龄</p>
                </div>
            </div>
            <div class="total-mod">
                <div class="duty">
                    <p class="num">{{dutyNum}} 人</p>
                    <p class="name">干部人数</p>
                </div>
            </div>
        </div>
        <el-row class="cockpit-charts">
            <el-col :xs="24" :sm="12" :md="12" :lg="8">
                <div class="report-tit">年龄分布</div>
                <ve-ring :data="chartAge" :colors="colorsArr" :settings="chartSettings"></ve-ring>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8">
                <div class="report-tit">性别比例</div>
                <ve-ring :data="chartSex" :colors="colorsArr" :settings="chartSettings"></ve-ring>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8">
                <div class="report-tit">工龄分布</div>
                <ve-ring :data="chartWorkingAge" :colors="colorsArr" :settings="chartSettings"></ve-ring>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8">
                <div class="report-tit">学历分布</div>
                <ve-ring :data="chartEducation" :colors="colorsArr" :settings="chartSettings"></ve-ring>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8">
                <div class="report-tit">人员状态</div>
                <ve-ring :data="chartUserStatus" :colors="colorsArr" :settings="chartSettings"></ve-ring>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8">
                <div class="report-tit">政治面貌</div>
                <ve-ring :data="chartPoliticsStatus" :colors="colorsArr" :settings="chartSettings"></ve-ring>
            </el-col>
        </el-row>
        <el-row class="cockpit-charts">
            <el-col :xs="24" :sm="12" :md="12" :lg="12">
              <div class="report-tit">招聘人员</div>
              <div class="chart-mod">
                <ve-waterfall :data="workrecruitData" :colors="colorsArr" :settings="chartSettings1"></ve-waterfall>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12">
              <div class="report-tit">离职人员</div>
              <div class="chart-mod">
                <ve-histogram :data="chartWorkingAge2" :legend-visible="false" :colors="colorsArr" :settings="chartSettings2"></ve-histogram>
              </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { getQueryUserStatus, getUserSituation, getWeekrecruitNum, getWorkingAge, getPoliticsStatus } from 'static/api/homepage/homepage'
export default {
  data () {
    return {
      onJob: '',
      dimission: '',
      age: '',
      dutyNum: '',
      chartAge: {
        columns: ['statusStr', 'number'],
        rows: []
      },
      chartSex: {
        columns: ['statusStr', 'number'],
        rows: []
      },
      chartWorkingAge: {
        columns: ['statusStr', 'number'],
        rows: []
      },
      chartEducation: {
        columns: ['statusStr', 'number'],
        rows: []
      },
      chartUserStatus: {
        columns: ['statusStr', 'number'],
        rows: []
      },
      chartPoliticsStatus: {
        columns: ['name', 'num'],
        rows: []
      },
      workrecruitData: {
        columns: ['name', '人数'],
        rows: [
          { name: '录用', '人数': 0 },
          { name: '储备', '人数': 0 },
          { name: '不录用', '人数': 0 }
        ]
      },
      chartSettings: {
        radius: ['30%', '50%'],
        label: {
          show: false
        },
        labelLine: {
          show: false
        }
      },
      chartSettings1: {
        totalNum: 0,
        totalName: '应聘'
      },
      chartWorkingAge2: {
        columns: ['name', 'num'],
        rows: []
      },
      chartSettings2: {
        yAxisName: ['离职人数'],
        labelMap: {
          num: '人数'
        }
      },
      colorsArr: ['#FF963D', '#6EC4E2', '#FFBB82', '#95B6EC', '#EA9090', '#A39FEC', '#8FDB9C']
    }
  },
  methods: {
    _getTotal () {
      getQueryUserStatus().then(data => {
        if (data.result) {
          this.onJob = data.result.onJob
          this.dimission = data.result.dimission
          this.age = data.result.age
          this.dutyNum = data.result.dutyNum
        }
      })
    },
    _getChart () {
      getUserSituation().then(data => {
        if (data.result) {
          this.chartAge.rows = data.result.age
          this.chartSex.rows = data.result.sex
          this.chartWorkingAge.rows = data.result.workingAge
          this.chartEducation.rows = data.result.education
          this.chartUserStatus.rows = data.result.userStatus
        }
      })
      getPoliticsStatus().then(data => {
        if (data.result) {
          this.chartPoliticsStatus.rows = data.result
        }
      })
      getWeekrecruitNum(2).then(data => {
        if (data.result) {
          this.chartSettings1.totalNum = data.result.candidate
          this.workrecruitData.rows[0].人数 = data.result.entryNum
          this.workrecruitData.rows[1].人数 = data.result.store
          this.workrecruitData.rows[2].人数 = data.result.noEntryNum
        }
      })
      getWorkingAge().then((data) => {
        if (data.result) {
          this.chartWorkingAge2.rows = data.result
        }
      })
    }
  },
  created () {
    this._getTotal()
    this._getChart()
  }
}
</script>
<style scoped lang="less">
  @import "~assets/less/homePage";
</style>
