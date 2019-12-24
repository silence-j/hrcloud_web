<template>
  <div>
    <span>首页</span>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
// import { getStorage } from 'assets/js/global'
import { routersMatchPath } from '../router/router.match'
import { getToken } from 'assets/js/util'
import { transData } from 'assets/js/common'

export default {
  name: 'homePage',
  computed: {
    userMenuList () {
      let menuList = Array.from(new Set(JSON.parse(getToken('meauList'))))
      let filterArr = menuList.find(x => x.NAME === '系统首页')
      let index1 = menuList.findIndex(x => x.NAME === '首页')
      let index2 = menuList.find(x => x.NAME === '驾驶舱')
      if (!filterArr) {
        if (index1 > -1 || index2 > -1) {
          menuList.unshift({
            NAME: '系统首页',
            id: '19',
            parentId: 0,
            permission: 'home',
            remark: '&#xe614; ',
            sort_no: 100,
            type: true,
            url: 'homepage'
          })
        }
      }
      console.log('transData', transData(menuList, 'id', 'parentId', 'children'))
      return transData(menuList, 'id', 'parentId', 'children')
    }
  },
  watch: {
    userMenuList (value) {
      this._setDefaultPage()
    }
  },
  created () {
    this._setDefaultPage()
  },
  methods: {
    _setDefaultPage () {
      let val = ''
      console.log('value', this.userMenuList)
      if (this.userMenuList.length > 0) {
        if (this.userMenuList[0] && this.userMenuList[0].children[0]) {
          val = this.userMenuList[0].children[0]
        }
        const routerPath = routersMatchPath(val).path
        const routerVal = `${val.id}`
        this.$store.commit('ACTIVEINDEX', routerVal)
        console.log('routerVal', routerVal, routerPath)
        this.$router.replace(routerPath)
      }
    }
  }
  // created() {
  //   this.$router.push('/business/phoneAppointment');
  // },
}
</script>

<style scoped lang="less">

</style>
