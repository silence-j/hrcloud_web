import router from './index'
import { Message } from 'element-ui'
import { getToken, browserType } from 'assets/js/util'
import { routersConfig, regRoutersConfig, verifyTransRoutersConfig } from './router.match'
import store from '../store'
let loggedIE = browserType(window.navigator.userAgent)
if (loggedIE) {
  alert('你的浏览器版本过低，请升级浏览器到ie9以上')
}
router.beforeEach(({ matched, meta, path, name }, from, next) => {
  if (process.env.NODE_ENV === 'production') { // production环境下才去执行
    var versionScript = document.createElement('script')
    versionScript.src = location.origin + '/version.js?v=' + new Date().getTime()
    var s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(versionScript, s)
  }
  // 重置高级搜索的options
  store.commit('SET_DEEP_SEARCH_OPTIONS', [])
  store.commit('SET_COMPANY_TYPE', '')
  store.commit('REPORT_MOVEDEPATID', '')
  let array = []
  matched.forEach((router, index) => {
    array.push({
      name: router.meta.title,
      path: router.path
    })
  })
  store.commit('SET_BREADCRUMB_DATA', array)
  let loggedUser = store.getters.getIsLogin ? store.getters.getIsLogin : getToken('isLogin')
  if (path !== '/staffDetail' && path !== '/whitePage' && path !== '/entryDetail') {
    if (path !== '/login') { // 拦截路由 如果未登录提示需要登录并且跳转登录页
      if (!loggedUser) {
        Message.error('用户未登录,请先登录')
        router.replace('/login')
        return
      }
    }
  } else {
    next()
  }
  store.commit('ACTIVEINDEX', routersConfig[path])
  for (let key in regRoutersConfig) {
    if (path.includes(key)) {
      store.commit('ACTIVEINDEX', regRoutersConfig[key])
    }
  }
  // 设置一些默认vuex选项
  for (let key in verifyTransRoutersConfig) {
    if (path.includes(key)) {
      store.commit('SET_MARKETVERIFYTRANSFER_ROUTESELECTS', verifyTransRoutersConfig[key])
    }
  }
  next()
})
