<template>
<div class="report-custom_box">
    <iframe
    id="cus-iframe"
    frameborder=0 name="showHere" scrolling=auto :src="iframeUrl"></iframe>
</div>
</template>
<script>
import { getExmine } from 'assets/js/exmine'
export default {
  computed: {
    iframeUrl () {
      return getExmine().reportCustom[0].frameUrl
    }
  }
}
</script>
<style scoped lang="less">
#cus-iframe{
   width:95%;
   max-width:1200px;
   height:600px;
}
</style>
