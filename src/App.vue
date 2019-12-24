<template>
  <div id="app">
    <transition name="page-toggle"
       mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
@import "~assets/less/index";
#app {
  height:100%;
  overflow:hidden;
  box-sizing:border-box;
  position :relative;
  background: #f2f2f2;
  width: 100%;
}
</style>
