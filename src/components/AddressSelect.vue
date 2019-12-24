<template>
  <div class="container">
      <el-form
       :model="area"
       :rulesRequire="rulesRequire"
       :rules="AddressRules"
       ref="AddressRulesRef">
        <el-row>
          <el-col :span="colSpan">
            <el-form-item prop="provinceId">
              <el-select
                v-model="area.provinceId"
                class="province-select"
                :clearable="clearable"
                @clear="clearProvince"
                @change="getProvince">
                <el-option
                  v-for="(p,index) in area.optionProvinces"
                  :label="p.name"
                  :value="p.id"
                  :key="index">
                  {{p.name}}
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="lineSpan" class="center" v-if="showZone">  -  </el-col>
          <el-col :span="colSpan">
            <el-form-item prop="cityId">
              <el-select
                v-model="area.cityId"
                :clearable="clearable"
                class="city-select"
                @clear="clearCity"
                @change="getCity">
                <el-option
                  :label="c.name"
                  v-for="(c,index) in area.optionCities"
                  :value="c.id"
                  :key="index">
                  {{c.name}}
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="lineSpan" class="center" v-if="showZone"> - </el-col>
          <el-col :span="colSpan">
            <el-form-item prop="areaId">
              <el-select
                class="zone-select"
                :clearable="clearable"
                @change="getArea"
                v-model="area.areaId"
                @clear="clearArea"
                v-if="showZone">
                <el-option
                  v-for="(z,index) in area.optionZones"
                  :label="z.name"
                  :value="z.id"
                  :key="index">
                  {{z.name}}
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
  </div>
</template>
<script>
import { getAllarea, getAllareaStaff } from 'static/api/common/common'
export default {
  data () {
    return {
      /*  AddressRules: {
        provinceId: {required: true, message: '请选择省', trigger: 'change'},
        cityId: {required: true, message: '请选择市', trigger: 'change'},
        areaId: {required: true, message: '请选择区', trigger: 'change'}
      } */
    }
  },
  computed: {
    AddressRules () {
      return this.rulesRequire ? {
        provinceId: { required: true, message: '请选择省', trigger: 'change' },
        cityId: { required: true, message: '请选择市', trigger: 'change' },
        areaId: { required: true, message: '请选择区', trigger: 'change' }
      } : {
        provinceId: { required: false },
        cityId: { required: false },
        areaId: { required: false }
      }
    }
  },
  methods: {
    resetFieldForm () {
      this.$refs.AddressRulesRef.resetFields()
    },
    addressCheck () {
      let vali = ''
      this.$refs.AddressRulesRef.validate(valid => {
        vali = !!valid
      })
      return vali
    },
    getProvince (value) {
      if (!value) return
      if (value) {
        this.$emit('getProvince', value)
        this.area.cityId = ''
        this.area.cityName = ''
        this.area.areaId = ''
        this.area.areaName = ''
        this.area.optionCities = []
        this.area.optionZones = []
        // console.log(value)
        this.area.optionCities = []
        this.area.optionProvinces.forEach(item => {
          if (item.id === value) {
            this.area.provinceName = item.name
          }
        })
        if (this.noLogin && this.noLogin === 'not') {
          getAllareaStaff(value).then((data) => {
            if (data.result && data.result.length) {
              data.result.forEach((area) => {
                this.area.optionCities.push(area)
              })
            }
          })
        } else {
          getAllarea(value).then((data) => {
            if (data.result && data.result.length) {
              data.result.forEach((area) => {
                this.area.optionCities.push(area)
              })
            }
          })
        }
      }
    },
    clearProvince () {
      this.area.provinceName = ''
    },
    clearCity () {
      this.area.cityName = ''
    },
    clearArea () {
      this.area.areaName = ''
    },
    getCity (value) {
      if (!value) return
      if (value) {
        this.$emit('getCity', value)
        this.area.areaId = ''
        this.areaName = ''
        this.area.optionZones = []
        this.area.optionCities.forEach(item => {
          if (item.id === value) {
            this.area.cityName = item.name
          }
        })
        if (this.noLogin === 'not') {
          getAllareaStaff(value).then(data => {
            if (data.result && data.result.length) {
              data.result.forEach((area) => {
                this.area.optionZones.push(area)
              })
            }
          })
        } else {
          getAllarea(value).then(data => {
            if (data.result && data.result.length) {
              data.result.forEach((area) => {
                this.area.optionZones.push(area)
              })
            }
          })
        }
      }
    },
    getArea (value) {
      if (value) {
        this.$emit('getZone', value)
        this.area.optionZones.forEach(item => {
          if (item.id === value) {
            this.area.areaName = item.name
          }
        })
      }
    }
  },
  props: {
    noLogin: String,
    rulesRequire: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showZone: {
      type: Boolean,
      default: false
    },
    colSpan: {
      type: Number
    },
    lineSpan: {
      type: Number
    },
    area: {
      type: Object
    }
  }
}
</script>

<style scoped lang="less">
  .el-select{width: 100%}
  .province-select{
    margin-right:30px;
    position: relative;
  }
  .center{
    text-align: center;
    margin: 0px 3.8px 0px 3.8px;
  }
</style>
