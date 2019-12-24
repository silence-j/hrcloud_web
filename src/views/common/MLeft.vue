<template>
 <div class="left-box scroll-box">
<el-scrollbar style="height:100%">
<el-menu :default-active="activeIndex" unique-opened
  @open="handleOpen"
  @close="handleClose"
 :collapse="isCollapse"
 class="menu-box"
 >
  <div v-for="(item,index) in menuDatas" :key="index">
    <el-submenu v-if="item.children" :index="item.id">
     <template slot="title"><i class="icon-font" v-html="item.remark"></i><span class="icon-title">{{item.NAME}}</span></template>
      <!--<el-menu-item index="0" v-if="index==0" class="single-icon-div" style="padding-left:24px;"><div @click="routeLinkTo({url:'homepage'})"><span class="textCode"><i class="small-circl"></i>首页</span></div></el-menu-item>-->
      <el-menu-item  v-for="(data,childIndex) in item.children" :key="childIndex" :index="data.id+''" style="padding-left:0px;">
        <div class="icon-name" @click="routeLinkTo(data)">
          <span class="textCode"><i class="small-circl"></i>{{data.NAME}}</span>
        </div>
      </el-menu-item>
  </el-submenu>
  <el-menu-item :index="item.id" class="top-menu-item" v-else>
  <router-link :to="'/' + item.url" tag="div">
    <i class="icon-font" v-html="item.remark"></i>
    <span class="title">{{item.NAME}}</span></router-link>
  </el-menu-item>
  </div>
</el-menu>
</el-scrollbar>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import { transData } from 'assets/js/common'
import { getToken } from 'assets/js/util'
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {
    menuDatas () {
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
    },
    ...mapGetters({
      'activeIndex': 'getActiveIndex'
    })
  },
  methods: {
    // 获取页面权限,
    routeLinkTo (data) {
      this.$store.commit('SET_CLICK_TYPE', 'left')
      if (data.url.slice(0, 1) !== '/') {
        this.$router.push({ path: '/' + data.url })
      } else {
        this.$router.push({ path: data.url })
      }
      setTimeout(() => {
        this.$store.commit('SET_CLICK_TYPE', 'default')
      }, 100)
    },
    handleOpen (key, keyPath) {
      /* console.log(key, keyPath) */
    },
    handleClose (key, keyPath) {
      /* console.log(key, keyPath) */
    }
  }
}
</script>
<style lang="less">
.left-box{
  height:100%;
  width:auto;
  background:#fff;
  overflow:hidden;
  position:relative;
 .el-menu{
    .top-menu-item{
      &>div{
      width: 200px;
      height: 40px;
      line-height: 40px;
      border-radius: 25px;
      margin-top: 20px;
      margin-right: 30px;
      padding-left:20px;
      box-sizing: border-box;
      background:rgba(243,246,249,1);
      div.router-div{
        padding-left:30px;
        width:100%;
        box-sizing: border-box;
      }
      span{
        font-size:14px;
        position: relative;
      }
      i{
        color: #163457;
        margin-right:10px;
        font-size:16px;
        display: inline-block;
      }
       &.router-link-active{
        background: @main-color;
        color:#fff;
        i{
          color:#fff;
        }
       }
     }
    }
   &.menu-box{
   text-align:left;
   height: 100%;
  // min-width:180px;
   width:250px;
   box-sizing: border-box;
   overflow: hidden;
   .el-submenu__title{
        width: 200px;
        height: 40px;
        line-height: 40px;
        border-radius: 25px;
        background:rgba(243,246,249,1);
        span{
          font-size:14px;
          position: relative;
        }
        i{
          color: #163457;
          margin-right:10px;
          display: inline-block;
          font-size:16px;
        }
        .icon{
          width:18px;
          height:18px;
        }
        .menu-name{
          margin-left:12px;
          font-size:15px;
        }
    }
    .el-submenu{
      margin-top: 20px;
      margin-left: 22px;
    }
   .el-menu-item{
      color:#333;
      line-height:40px;
      height:40px;
     &:hover{
       background:none;
     }
     &.is-active{
        background: none;
        span{
          &.textCode{
          color: @main-color;
          &::before{
             border: 2px solid @main-color !important;
          }
          }
        }
     }
    .icon-name{
      line-height:50px;
      height:50px;
      width:100%;
      text-indent: 24px;
     span{
       font-size:14px;
       position: relative;
       padding-left:8px;
       line-height:50px;
       color:#333;
       &::before{
         position: absolute;
         content: '';
         display: inline-block;
         width: 3px;
         height: 3px;
         border-radius: 50%;
         border: 2px solid #909399;
         position: relative;
         top:-2px;
         left: -8px;
       }
     }
     }
   }
   }
  }
  .single-icon-div{
      span{
       font-size:14px;
       position: relative;
       padding-left:8px;
       line-height:50px;
       color:#333;
       &::before{
         position: absolute;
         content: '';
         display: inline-block;
         width: 3px;
         height: 3px;
         border-radius: 50%;
         border: 2px solid #909399;
         position: relative;
         top:-2px;
         left: -8px;
       }
     }
  }
}
</style>
