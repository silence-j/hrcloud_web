<template>
    <footer>
        <!-- <div>Copyright &copy 2018 中财招商投资集团有限公司 浙ICP备11029880号</div> -->
      <div>©2019&nbsp;&nbsp;中财集团 • 互联网金融处&nbsp;&nbsp;<span @click="jumpLink" class="jumpLink">浙ICP备11029880号-2</span></div>
    </footer>
</template>
<script>
export default {
  methods: {
    jumpLink () {
      window.open('http://www.beian.miit.gov.cn/', '_blank')
    }
  }
}
</script>
<style scoped lang="less">
    footer {
        position: fixed;
        bottom: 0;
        margin: 0 auto;
        left: 0;
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        z-index: 10;
        line-height: 50px;
        text-align: center;
        font-size: 14px;
        background: #F5F5F5;
    .jumpLink:hover {
        color: #666666;
      cursor: pointer;
    }
    }
</style>
