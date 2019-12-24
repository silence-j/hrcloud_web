// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './router/router.config'
import store from './store'
import ElementUI from 'element-ui'
import VCharts from 'v-charts'
import 'assets/less/index.less'
import DlgDraggable from 'assets/js/dialog-drag'
import GlobalMixins from 'assets/js/globalMixins'
import { cloneDeep } from 'lodash'
import '../theme/index.css'
import 'font-awesome/css/font-awesome.css'
import { setSearchParams, getSearchParams } from './assets/js/common'
Vue.filter('formatMonth', (value) => {
  if (typeof value === 'string') {
    return value.substring(0, value.lastIndexOf('-'))
  }
})
Vue.use(DlgDraggable)
Vue.use(ElementUI)
Vue.use(VCharts)
Vue.mixin(GlobalMixins)
// 全局bus===把一些搜索查询参数从vuex里面解放出来 bus emit出去的事件 在on调用的页面需要销毁
var eventBus = {
  install (Vue, options) {
    Vue.prototype.$bus = new Vue()
  }
}
Vue.use(eventBus)
// 深拷贝方法
export const deepClone = (source) => cloneDeep(source)
Vue.prototype.deepClone = deepClone
Vue.config.productionTip = false
Vue.prototype.getSearchParams = getSearchParams
Vue.prototype.setSearchParams = setSearchParams
if (process.env.NODE_ENV === 'production') { // production环境下才去执行
  var versionScript = document.createElement('script')
  versionScript.src = location.origin + '/version.js?v=' + new Date().getTime()
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(versionScript, s)
}
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
