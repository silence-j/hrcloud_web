<template>
  <div class="tabs-box">
    <div class="tabs-wrap">
      <ul class="tabs-box-ul clearfix">
        <li v-for="(item,index) in tabDatas" :key="index" @click="getItemMess(item,index,$event)" :class="{'active':index==indexLi}">
          <span class="msg">{{typeof item == 'object' ? item.name : item}}</span>
          <em class="warn" v-if="item.unReadCount">{{item.unReadCount}}</em>
        </li>
      </ul>
    </div>
    <div v-for="item in tabDatas.length" :key="item" class="slot-warp">
      <div v-if="item == activeTabIndex">
         <slot :name="'tableBox' + item"
      ></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { addClass, removeClass } from 'assets/js/dom'
export default {
  data () {
    return {
      indexLi: this.indexLiProp ? this.indexLiProp : 0,
      activeTabIndex: this.activeTabIndexProp ? this.activeTabIndexProp : 1
    }
  },
  props: {
    indexLiProp: Number,
    activeTabIndexProp: Number,
    tabDatas: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getItemMess (row, index, event) {
      this.$emit('getItem', row, index)
      this.activeTabIndex = index + 1
      let elementLi = document.querySelector('.tabs-box-ul').querySelectorAll('li')
      Array.prototype.slice.call(elementLi).forEach(item => {
        removeClass(item, 'active')
      })
      let target = event.target.getAttribute('class') ? event.target.parentNode : event.target
      addClass(target, 'active')
    }
  },
  mounted () {
    let elementUl = document.querySelector('.tabs-box-ul')
    let arrLi = elementUl.querySelectorAll('li')
    let liW = 0
    // arrLi.forEach(item => {
    //   liW += item.getBoundingClientRect().width
    // })
    // 兼容ie哈
    let ieArr = Array.prototype.slice.call(arrLi)
    for (let i = 0; i < ieArr.length; i++) {
      liW += ieArr[i].getBoundingClientRect().width
    }
    elementUl.style.width = liW + 'px'
  },
  created () {
    console.log(this.$slots)
  }
}
</script>
<style scoped lang="less">
  @import "~assets/less/variable";
.tabs-box{
  .tabs-wrap{
    min-width:700px;
    width:100%;
    overflow-x:auto;
    overflow-y:hidden;
    ul{
      // dth:1200px;
      margin-top:20px;
      &.tabs-box-ul {
        li{
          float: left;
          position: relative;
          font-size: @font-size-medium;
          color: #6E7382;
          cursor: pointer;
          height:42px;
          line-height:42px;
          .msg{
            padding: 0px 8px;
            border-right: 1px solid #E9E9EA;
          }
          &.active{
            position: relative;
            color:@base-color;
            &:after{
              content: '';
              width:90%;
              position: absolute;
              left:5%;
              height:2px;
              bottom:0px;
              background: @main-color;
              // border-bottom: 2px solid @main-color;
            }
            .msg{
              color: @main-color;
              width: 100%;
            }
          }
          &:hover{
            .msg{
              color: @main-color;
              // width: 100%;
              // padding: 10px 0;
              //  cursor: pointer;
              // border-bottom: 2px solid @main-color;
            }
          }
          .warn{
            line-height:14px;
            position: absolute;
            right: -5px;
            top: -5px;
            width: 18px;
            height: 18px;
            color: #fff;
            font-size: 10px;
            text-align: center;
            border-radius: 50%;
            background: #FF1A1A;
          }
        }
      }
    }
  }
  .slot-warp{
    margin-top:0px;
  }
}
</style>
