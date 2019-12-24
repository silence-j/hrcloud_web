<template>
 <div class="contain">
   <div class="box">
     <img :src="require('assets/img/maintain.png')" alt="">
     <div class="little-box">
       <p>系统正在维护中...</p>
       <p>给你带来不便，敬请谅解！</p>
     </div>
   </div>
   <p class="foot">Copyright © 2018 中财招商投资集团有限公司 浙ICP备11029880号</p>
 </div>
</template>

<script>
export default {
  name: 'Maintain',
  data () {
    return {

    }
  }
}
</script>

<style scoped lang="less">
  .contain{
    position: relative;
    width: inherit;
    height: inherit;
    .box{
      position: relative;
      top: 30%;
      left: 30%;
      img{
        display: inline-block;
      }
      .little-box{
        vertical-align: middle;
        display: inline-block;
        position: relative;
        top: -180px;
        margin-left: 15px;
        p:first-child{
          font-size: 46px;
          color: #55647A;
          margin-bottom: 10px;
        }
        p:last-child{
          font-size: 20px;
          color: #55647A;
        }
      }
    }
    .foot{
      position: absolute;
      width: 100%;
      bottom: 20px;
      font-size: 12px;
      color: #55647A;
      text-align: center;
    }
  }
</style>
