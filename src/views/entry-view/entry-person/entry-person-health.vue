<template>
<div class="entry-person-health_box">
  <!--健康状况-->
  <el-form label-width="300px"
    ref="healthRef"
    :model="healthForm"
    class="health">
    <p class="base-sec-title">健康状况</p>
    <el-row v-for="(item, index) in healthForm.healthRadio" :label="item.codeText" :key="item.id?item.id:index">
      <el-col :span="12" :offset="3">
        <el-form-item
          :key="item.key"
          :prop="'healthRadio.' + index + '.status'"
          :rules="{ required: true, validator:(rule, value, callback) => {
              if (value === 0 || value === 1 && item.text ) {
                callback()
              } else {
                callback('请填写正确的健康状况')
              }
            }, trigger: 'change' || 'blur'}"
          :label='item.codeText'>
          <el-radio-group v-model="item.status" :disabled="item.enable === 2 ? true  : false">
            <el-radio class="radio"  :label="1" >有</el-radio>
            <el-radio class="radio"  :label="0">无</el-radio>
          </el-radio-group>
        <el-input v-model="item.text" :disabled="item.enable === 2 ? true  : false" v-if="item.status === 1" class="health-text"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getSysDic } from 'static/api/common/common'
export default {
  props: ['sex'],
  data () {
    var validatorHealth = (rule, value, callback) => {
      if (value === 0 || value === 1) {
        callback()
      } else {
        callback(new Error('请填写健康状况'))
      }
    }
    return {
      healthForm: {
        healthRadio: []
      },
      validatorHealth: validatorHealth
    }
  },
  computed: {
    ...mapGetters(['getHealthArr'])
  },
  methods: {
    vailHealthForm () {
      let vailHealth = ''
      this.$refs.healthRef.validate(valid => {
        vailHealth = !!valid
      })
      let filterHealth = this.healthForm.healthRadio.filter(x => x.status === undefined || (x.status === 1 && !x.text))
      if (filterHealth.length) {
        this.$message.warning('请填写完整健康信息')
        return
      }
      return vailHealth
    },
    getHealthDatas () {
      return this.healthForm.healthRadio
    },
    _setHealthData () {
    },
    /* 获取数字字典 */
    _getQueryClassList () {
      /* 健康状况 */
      if (!this.$route.query.employeeId) {
        getSysDic('healthStatus').then(data => {
          if (data.result) {
            data.result.forEach(item => {
              if (item.enable === 1) {
                this.healthForm.healthRadio.push(item)
              }
            })
          }
        })
      }
    }
  },
  watch: {
    getHealthArr (value) {
      if (value) {
        this.healthForm.healthRadio = JSON.parse(value)
        this.$store.commit('SET_HEALTH_ARR', '')
      }
    }
  },
  created () {
    this._getQueryClassList()
  }
}
</script>
<style lang="less" scoped>
.entry-person_row{
  .entry-person_item{
    float:left;
    min-width:680px;
    &/deep/.el-input{
      margin-left:50px;
      width:230px;
    }
  }
}
.health{
  .health-text{
    width: 45%;
    margin-left: 5%;
  }
}
</style>
