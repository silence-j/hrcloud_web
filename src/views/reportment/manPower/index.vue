<template>
  <div class="container" @click="orgDatas.showTree = false">
    <el-form :model="manForm" class="mt-20">
      <el-row :gutter="20" type="flex">
        <el-col :span="8">
          <search-dept-tree
          :orgDatas="orgDatas"
          />
        </el-col>
        <el-col class="pt-3">
          <el-button type="primary" size="small" @click="searchManReport">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- <div class="mainForm mt-20">
      <el-row>
        <el-col :span="5"><strong>一、期末总人数</strong></el-col>
        <el-col :span="3"></el-col>
        <el-col :span="5"><strong>二、性别分布</strong></el-col>
        <el-col :span="3"></el-col>
        <el-col :span="5"><strong>三、年龄结构</strong></el-col>
        <el-col :span="3"></el-col>
      </el-row>
      <el-row>
        <el-col :span="5">1、正式员工</el-col>
        <el-col :span="3">{{manPowerDatas['正式']}}</el-col>
        <el-col :span="5">1、男</el-col>
        <el-col :span="3">{{manPowerDatas['男']}}</el-col>
        <el-col :span="5">1、50岁以上</el-col>
        <el-col :span="3">{{manPowerDatas['50岁以上']}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">2、试用期员工</el-col>
        <el-col :span="3">{{manPowerDatas['试用']}}</el-col>
        <el-col :span="5">2、女</el-col>
        <el-col :span="3">{{manPowerDatas['女']}}</el-col>
        <el-col :span="5">2、40-50岁</el-col>
        <el-col :span="3">{{manPowerDatas['40-50岁']}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">3、达到法定退休年龄</el-col>
        <el-col :span="3">{{manPowerDatas['达到法定退休年龄']}}</el-col>
        <el-col :span="5"></el-col>
        <el-col :span="3"></el-col>
        <el-col :span="5">3、30-40岁</el-col>
        <el-col :span="3">{{manPowerDatas['30-40岁']}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">4、实习生</el-col>
        <el-col :span="3">{{manPowerDatas['实习']}}</el-col>
        <el-col :span="5"></el-col>
        <el-col :span="3"></el-col>
        <el-col :span="5">4、25-30岁</el-col>
        <el-col :span="3">{{manPowerDatas['25-30岁']}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5"></el-col>
        <el-col :span="3"></el-col>
        <el-col :span="5"></el-col>
        <el-col :span="3"></el-col>
        <el-col :span="5">5、25岁以下</el-col>
        <el-col :span="3">{{manPowerDatas['25岁以下']}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5"></el-col>
        <el-col :span="3"></el-col>
        <el-col :span="5"></el-col>
        <el-col :span="3"></el-col>
        <el-col :span="5">6、平均年龄</el-col>
        <el-col :span="3">{{manPowerDatas['平均年龄']}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5"><strong>四、学历分布</strong></el-col>
        <el-col :span="3"></el-col>
        <el-col :span="5"><strong>五、工龄结构</strong></el-col>
        <el-col :span="3"></el-col>
        <el-col :span="5"></el-col>
        <el-col :span="3"></el-col>
      </el-row>
      <el-row>
        <el-col :span="5">1、博士</el-col>
        <el-col :span="3">{{manPowerDatas['博士']}}</el-col>
        <el-col :span="5">1、10年以上</el-col>
        <el-col :span="3">{{manPowerDatas['10年以上']}}</el-col>
        <el-col :span="5"></el-col>
        <el-col :span="3"></el-col>
      </el-row>
      <el-row>
        <el-col :span="5">2、硕士</el-col>
        <el-col :span="3">{{manPowerDatas['硕士']}}</el-col>
        <el-col :span="5">2、5-10年</el-col>
        <el-col :span="3">{{manPowerDatas['5-10年']}}</el-col>
        <el-col :span="5"></el-col>
        <el-col :span="3"></el-col>
      </el-row>
      <el-row>
        <el-col :span="5">3、本科</el-col>
        <el-col :span="3">{{manPowerDatas['本科']}}</el-col>
        <el-col :span="5">3、3-5年</el-col>
        <el-col :span="3">{{manPowerDatas['3-5年']}}</el-col>
        <el-col :span="5"></el-col>
        <el-col :span="3"></el-col>
      </el-row>
      <el-row>
        <el-col :span="5">4、大专</el-col>
        <el-col :span="3">{{manPowerDatas['大专']}}</el-col>
        <el-col :span="5">4、1-3年</el-col>
        <el-col :span="3">{{manPowerDatas['1-3年']}}</el-col>
        <el-col :span="5"></el-col>
        <el-col :span="3"></el-col>
      </el-row>
      <el-row>
        <el-col :span="5">5、高中</el-col>
        <el-col :span="3">{{manPowerDatas['高中']}}</el-col>
        <el-col :span="5">5、1年及以下</el-col>
        <el-col :span="3">{{manPowerDatas['1年及以下']}}</el-col>
        <el-col :span="5"></el-col>
        <el-col :span="3"></el-col>
      </el-row>
      <el-row>
        <el-col :span="5">6、中专</el-col>
        <el-col :span="3">{{manPowerDatas['中专']}}</el-col>
        <el-col :span="5"></el-col>
        <el-col :span="3"></el-col>
        <el-col :span="5"></el-col>
        <el-col :span="3"></el-col>
      </el-row>
      <el-row>
        <el-col :span="5">7、初中及以下</el-col>
        <el-col :span="3">{{manPowerDatas['初中及以下']}}</el-col>
        <el-col :span="5"></el-col>
        <el-col :span="3"></el-col>
        <el-col :span="5"></el-col>
        <el-col :span="3"></el-col>
      </el-row>
    </div> -->

    <div class="mainForm mt-20">
      <el-row>
        <el-col class="colTitleWidth"><strong>一、期末总人数</strong></el-col>
        <el-col class="colContentWidth"></el-col>
        <el-col class="colContentWidth"><strong>比例</strong></el-col>
        <el-col class="colTitleWidth"><strong>二、性别分布</strong></el-col>
        <el-col class="colContentWidth"></el-col>
        <el-col class="colContentWidth"><strong>比例</strong></el-col>
        <el-col class="colTitleWidth"><strong>三、年龄结构</strong></el-col>
        <el-col class="colContentWidth"></el-col>
        <el-col class="colContentWidth"><strong>比例</strong></el-col>
        <el-col class="colTitleWidth"><strong>四、工龄结构</strong></el-col>
        <el-col class="colContentWidth"></el-col>
        <el-col class="colContentWidth"><strong>比例</strong></el-col>
      </el-row>
      <el-row>
        <el-col class="colTitleWidth">1、正式员工</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['正式']}}</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['正式占比']}}</el-col>
        <el-col class="colTitleWidth">1、男</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['男']}}</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['男占比']}}</el-col>
        <el-col class="colTitleWidth">1、50岁以上</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['50岁以上']}}</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['50岁以上占比']}}</el-col>
        <el-col class="colTitleWidth">1、10年以上</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['10年以上']}}</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['10年以上占比']}}</el-col>
      </el-row>
      <el-row>
        <el-col class="colTitleWidth">2、试用期员工</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['试用']}}</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['试用占比']}}</el-col>
        <el-col class="colTitleWidth">2、女</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['女']}}</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['女占比']}}</el-col>
        <el-col class="colTitleWidth">2、40-50岁</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['40-50岁']}}</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['40-50岁占比']}}</el-col>
        <el-col class="colTitleWidth">2、5-10年</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['5-10年']}}</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['5-10年占比']}}</el-col>
      </el-row>
      <el-row>
        <el-col class="colTitleWidth">3、实习生</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['实习']}}</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['实习占比']}}</el-col>
        <el-col class="colTitleWidth"></el-col>
        <el-col class="colContentWidth"></el-col>
        <el-col class="colContentWidth"></el-col>
        <el-col class="colTitleWidth">3、30-40岁</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['30-40岁']}}</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['30-40岁占比']}}</el-col>
         <el-col class="colTitleWidth">3、3-5年</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['3-5年']}}</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['3-5年占比']}}</el-col>
      </el-row>
      <el-row>
        <el-col class="colTitleWidth"></el-col>
        <el-col class="colContentWidth"></el-col>
        <el-col class="colContentWidth"></el-col>
        <el-col class="colTitleWidth"></el-col>
        <el-col class="colContentWidth"></el-col>
        <el-col class="colContentWidth"></el-col>
        <el-col class="colTitleWidth">4、25-30岁</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['25-30岁']}}</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['25-30岁占比']}}</el-col>
        <el-col class="colTitleWidth">4、1-3年</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['1-3年']}}</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['1-3年占比']}}</el-col>
      </el-row>
      <el-row>
         <el-col class="colTitleWidth">达到法定退休年龄</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['达到法定退休年龄']}}</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['达到法定退休年龄占比']}}</el-col>
        <el-col class="colTitleWidth"></el-col>
        <el-col class="colContentWidth"></el-col>
        <el-col class="colContentWidth"></el-col>
        <el-col class="colTitleWidth">5、25岁以下</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['25岁以下']}}</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['25岁以下占比']}}</el-col>
         <el-col class="colTitleWidth">5、1年及以下</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['1年及以下']}}</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['1年及以下占比']}}</el-col>
      </el-row>
      <el-row>
        <el-col class="colTitleWidth"></el-col>
        <el-col class="colContentWidth"></el-col>
        <el-col class="colContentWidth"></el-col>
        <el-col class="colTitleWidth"></el-col>
        <el-col class="colContentWidth"></el-col>
        <el-col class="colContentWidth"></el-col>
        <el-col class="colTitleWidth">6、平均年龄</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['平均年龄']}}</el-col>
        <el-col class="colContentWidth">{{manPowerDatas['平均年龄占比']}}</el-col>
        <el-col class="colTitleWidth"></el-col>
        <el-col class="colContentWidth"></el-col>
        <el-col class="colContentWidth"></el-col>
      </el-row>
    </div>
    <br/>
    <el-table
      :data="educationDatas"
      border
      style="width: 100%">
      <el-table-column
        prop="statusStr"
        label="五、学历分布">
      </el-table-column>
      <el-table-column
        prop="number"
        label="人数(人)">
      </el-table-column>
      <el-table-column
        prop="percent"
        label="比例">
      </el-table-column>
    </el-table>

    <!-- 查询 -->
    <el-row class="mt-20">
      <el-col :span="3">
        <el-select v-model="manForm.dataUserType" placeholder="请选择">
          <el-option
            v-for="item in dataUserSelect"
            :label="item.label"
            :value="item.value"
            :key="item.index">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2" class="m-l-20 pt-3" >
        <el-button type="primary" size="small" @click="searchDataUser">查询</el-button>
      </el-col>
    </el-row>
    <el-table
      class="mt-20"
      :data="dataUserDatas"
      v-if="this.changeType =='marital'"
      border>
      <el-table-column
        prop="maritalStatus"
        label="婚姻状况">
      </el-table-column>
      <el-table-column
        prop="count"
        label="人数（人）">
      </el-table-column>
      <el-table-column
        prop="percent"
        label="比例">
      </el-table-column>
    </el-table>
    <el-table
    class="mt-20"
      :data="dataUserDatas"
      v-if="this.changeType =='politics'"
      border>
      <el-table-column
        prop="politicsStatus"
        label="政治面貌">
      </el-table-column>
      <el-table-column
        prop="count"
        label="人数（人）">
      </el-table-column>
      <el-table-column
        prop="percent"
        label="比例">
      </el-table-column>
    </el-table>
    <el-table
    class="mt-20"
      :data="dataUserDatas"
      v-if="this.changeType =='nature'"
      border>
      <el-table-column
        prop="nature"
        label="户籍类型">
      </el-table-column>
      <el-table-column
        prop="count"
        label="人数（人）">
      </el-table-column>
      <el-table-column
        prop="percent"
        label="比例">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getReportManPower, getDataUser } from 'static/api/report/index'
import { getToken } from 'assets/js/util'
import SearchDeptTree from 'components/SearchDeptTree'
export default {
  data () {
    return {
      orgDatas: {
        filterName: '',
        orgId: '',
        dataTree: [],
        showTree: false
      },
      changeType: 'marital',
      manPowerDatas: {},
      dataUserDatas: [],
      manForm: {
        organizationId: '',
        organizationName: '',
        startTime: '',
        endTime: '',
        dataUserType: 'marital'
      },
      dataUserSelect: [
        { value: 'marital', label: '婚姻状况' },
        { value: 'politics', label: '政治面貌' },
        { value: 'nature', label: '户籍性质' }
      ],
      educationDatas: []
    }
  },
  components: {
    SearchDeptTree
  },
  methods: {
    _getManDeatil () {
      getReportManPower(this.manPowerParams).then(res => {
        if (res && res.result) {
          this.manPowerDatas = res.result
          this.educationDatas = this.manPowerDatas.education
        }
      })
    },
    _getDataUser () {
      let dataUserParams = {
        organizationId: this.manPowerParams.organizationId,
        type: this.dataUserType
      }
      getDataUser(dataUserParams).then(res => {
        if (res && res.result) {
          this.dataUserDatas = res.result
        }
      })
    },
    // 还不如听首情歌
    searchDataUser () {
      if (this.manForm.dataUserType === 'marital') {
        this.changeType = 'marital'
      } else if (this.manForm.dataUserType === 'politics') {
        this.changeType = 'politics'
      } else if (this.manForm.dataUserType === 'nature') {
        this.changeType = 'nature'
      }
      this._getDataUser()
    },
    searchManReport () {
      this._getManDeatil()
      this._getDataUser()
    }
  },
  computed: {
    manPowerParams () {
      return {
        organizationId: this.orgDatas.orgId ? this.orgDatas.orgId : getToken('loginDeptId')
        // startTime: this.manForm.startTime ? timeZeroToString(this.manForm.startTime).split(' ')[0] : monthToString(new Date()).split(' ')[0],
        // endTime: this.manForm.endTime ? timeZeroToString(this.manForm.endTime) : toMonthEndTime(new Date())
      }
    },
    dataUserType () {
      return this.manForm.dataUserType
    }
  },
  created () {
    this._getManDeatil()
    this._getDataUser()
  }
}
</script>
<style lang="less" scoped>
  .mainForm{border-bottom:1px solid #d8d8d8;}
  .mainForm{
    .colTitleWidth{
      width: 13% !important;
    }
    .colContentWidth{
      width: 6% !important;
    }
    .el-row{
      .el-col{
        border-right:1px solid #d8d8d8;
        height:38px;
        line-height:38px;
        text-indent:10px;
        font-size: 14px;
        /*padding-left: 15px;*/
      }
    }
  }
  .mainForm{
    .el-row{
      border-top:1px solid #d8d8d8;
      border-left:1px solid #d8d8d8;
    }
  }
  .m-l-20{margin-left: 20px;}
  strong{font-size: 14px;color: #FF7500;}
  .pt-3{padding-top:3px;}
</style>
