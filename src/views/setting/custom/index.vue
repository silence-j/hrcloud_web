<template>
<div class="custom-box">
<div class="tab-wrap mt-20">
      <ul class="edit-tab clearfix">
        <li v-show="permission.indexOf('常用字段')!==-1">
          <router-link to="/setting/custom/common">常用字段设置</router-link>
        </li>
        <li v-show="permission.indexOf('工资系列')!==-1">
          <router-link to="/setting/custom/wage-series">工资系列设置</router-link>
        </li>
         <li v-show="permission.indexOf('工资其他构成')!==-1">
          <router-link to="/setting/custom/wage-other">工资其它构成设置</router-link>
        </li>
      </ul>
    </div>
    <div class="mt-20">
        <router-view/>
    </div>
</div>
</template>
<script>
import { getExmine } from 'assets/js/exmine'
export default {
  computed: {
    permission () {
      return getExmine().customSetting
    }
  },
  methods: {
    _redirect () {
      if (this.permission.indexOf('常用字段') === -1 && this.permission.indexOf('工资系列') !== -1) {
        this.$router.push('/setting/custom/wage-series')
      }
      if (this.permission.indexOf('常用字段') === -1 && this.permission.indexOf('工资系列') === -1) {
        this.$router.push('/setting/custom/wage-other')
      }
    }
  },
  created () {
    this._redirect()
  }
}
</script>
