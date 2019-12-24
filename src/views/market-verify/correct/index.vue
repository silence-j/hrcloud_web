<template>
  <div class="container">
    <el-form :model="correctForm">
      <div class="search-form_box clearfix">
        <div class="search-form_item">
          <el-input v-model="correctForm.namePhone" placeholder="请输入姓名/身份证" @keyup.enter.native="searchContractList"></el-input>
        </div>
        <div class="search-form_item start-line">
          <el-date-picker
            v-model="correctForm.startTime"
            type="date"
            placeholder="申请开始时间">
          </el-date-picker>
        </div>
        <div class="search-form_item">
          <el-date-picker
            v-model="correctForm.endTime"
            type="date"
            :picker-options="pickerOptions"
            placeholder="申请结束时间">
          </el-date-picker>
        </div>
        <!--<div class="search-form_item" style="height: auto">-->
          <!--<el-select-->
            <!--v-model="correctForm.field"-->
            <!--multiple-->
            <!--placeholder="请选择字段(多选)">-->
            <!--<el-option-->
              <!--v-for="item in fieldLists"-->
              <!--:label="item.label"-->
              <!--:value="item.value"-->
              <!--:key="item.index">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</div>-->
        <div class="search-form_button pt-3">
          <el-button type="primary" size="small" @click="searchContractList">查询</el-button>
        </div>
      </div>
    </el-form>
    <el-row class="mt-20">
      <el-col :span="24">
        <div class="tab-wrap clearfix">
          <ul class="edit-tab clearfix">
            <li @click="emptyClearMsg">
              <router-link :to="'/market-verify/correct/started'">我发起的</router-link>
            </li>
            <li v-if="getCurrentRoleGroups.indexOf('correctMarketHr') !== -1" @click="emptyClearMsg">
              <router-link :to="'/market-verify/correct/personal'">人事负责人审核</router-link>
            </li>
            <li v-if="getCurrentRoleGroups.indexOf('headHr') !== -1" @click="emptyClearMsg">
              <router-link :to="'/market-verify/correct/group'">集团总部审核</router-link>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <router-view></router-view>
  </div>
</template>
<script>
import { getExmine } from 'assets/js/exmine'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      correctForm: {
        namePhone: '',
        startTime: '',
        endTime: '',
        field: []
      },
      fieldLists: [
        {
          value: '参加工作时间',
          label: '参加工作时间'
        },
        {
          value: '本次入职时间',
          label: '本次入职时间'
        },
        {
          value: '任职部门',
          label: '任职部门'
        },
        {
          value: '岗位',
          label: '岗位'
        },
        {
          value: '是否与原单位解除劳动关系',
          label: '是否与原单位解除劳动关系'
        },
        {
          value: '原单位是否缴纳社保',
          label: '原单位是否缴纳社保'
        },
        {
          value: '原单位是否缴纳公积金',
          label: '原单位是否缴纳公积金'
        },
        {
          value: '入职信息',
          label: '入职信息'
        },
        {
          value: '姓名',
          label: '姓名'
        },
        {
          value: '民族',
          label: '民族'
        },
        {
          value: '性别',
          label: '性别'
        },
        {
          value: '出生日期',
          label: '出生日期'
        },
        {
          value: '身份证号码',
          label: '身份证号码'
        },
        {
          value: '身份证地址',
          label: '身份证地址'
        },
        {
          value: '户籍性质',
          label: '户籍性质'
        },
        {
          value: '户籍地址',
          label: '户籍地址'
        },
        {
          value: '出生地址',
          label: '出生地址'
        },
        {
          value: '政治面貌',
          label: '政治面貌'
        },
        {
          value: '籍贯地址',
          label: '籍贯地址'
        },
        {
          value: '婚姻状况',
          label: '婚姻状况'
        },
        {
          value: '曾用名',
          label: '曾用名'
        },
        {
          value: '体重',
          label: '体重'
        },
        {
          value: '身高',
          label: '身高'
        },
        {
          value: '最高学历',
          label: '最高学历'
        },
        {
          value: '毕业时间',
          label: '毕业时间'
        },
        {
          value: '毕业院校',
          label: '毕业院校'
        },
        {
          value: '所学专业',
          label: '所学专业'
        },
        {
          value: '学历获取形式',
          label: '学历获取形式'
        },
        {
          value: '学历认证情况',
          label: '学历认证情况'
        },
        {
          value: '技术职称',
          label: '技术职称'
        },
        {
          value: '职业资格',
          label: '职业资格'
        },
        {
          value: '技能等级',
          label: '技能等级'
        },
        {
          value: '档案存放地',
          label: '档案存放地'
        },
        {
          value: '现居住地址',
          label: '现居住地址'
        },
        {
          value: '通讯地址',
          label: '通讯地址'
        },
        {
          value: '联系电话',
          label: '联系电话'
        },
        {
          value: '电子邮箱',
          label: '电子邮箱'
        },
        {
          value: '工资卡号',
          label: '工资卡号'
        },
        {
          value: '开户行',
          label: '开户行'
        },
        {
          value: '健康状况',
          label: '健康状况'
        },
        {
          value: '学习简历',
          label: '学习简历'
        },
        {
          value: '工作简历',
          label: '工作简历'
        },
        {
          value: '家庭成员信息',
          label: '家庭成员信息'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['getCurrentRoleGroups']),
    pickerOptions () {
      return {
        disabledDate: (time) => {
          return new Date(time).getTime() < new Date(this.contractForm.startTime).getTime()
        }
      }
    },
    permission () {
      return getExmine().verifyContract
    }
  },
  methods: {
    setSerchList (boolean) {
      this.$store.dispatch('setMarketCorrectSearch', this.correctForm)
      this.$store.commit('SET_MARKET_CORRECT_CLICKED', boolean)
    },
    searchContractList () {
      this.setSerchList(true)
    },
    emptyClearMsg () {
      this.correctForm.namePhone = ''
      this.correctForm.startTime = ''
      this.correctForm.endTime = ''
      // this.correctForm.field = []
      this.setSerchList(true)
    }
  },
  filters: {},
  created () {
    this.setSerchList(false)
  }
}
</script>

<style scoped lang="less">
  .el-select{width: 100%}
</style>
