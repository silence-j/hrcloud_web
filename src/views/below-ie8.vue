<template>
    <div class="content" style="width: 100%;height: 100%;margin: 100px auto;">
        <div class="content-txt" style="text-align: center">您当前的浏览器版本过低,可能导致网站不能正常访问! 为了您能正常使用网站功能,请使用以下这些浏览器。</div>
        <div class="content-right" style=" width: 570px; margin: 30px auto">
            <div class="items" style="">
                <div class="item" style="width: 120px;float: left; cursor: pointer;margin-right: 30px">
                    <a href="http://www.google.cn/chrome/browser/desktop/index.html">
                        <div class="img-content" style="width: 80px;height: 80px;margin: 0 auto;">
                            <img :src="require('assets/img/browserType/chrome.jpg')" style=" width: 100%;border: none">
                        </div>
                        <span style="display: inline-block;width: 100%;text-align: center;color: #333">Chrome</span>
                    </a>
                </div>

                <div class="item" style="width: 120px;float: left; cursor: pointer;margin-right: 30px">
                    <a href="http://www.firefox.com.cn/">
                        <div class="img-content" style="width: 80px;height: 80px;margin: 0 auto;">
                            <img :src="require('assets/img/browserType/firefox.jpg')" style=" width: 100%;border: none">
                        </div>
                        <span style="display: inline-block;width: 100%;text-align: center;color: #333">Firefox</span>
                    </a>
                </div>

                <div class="item" style="width: 120px;float: left; cursor: pointer;margin-right: 30px">
                  <!--http://rj.baidu.com/soft/detail/12966.html-->
                    <a href="https://www.apple.com/cn/safari">
                        <div class="img-content" style="width: 80px;height: 80px;margin: 0 auto;">
                            <img :src="require('assets/img/browserType/safari.jpg')" style=" width: 100%;border: none">
                        </div>
                        <span style="display: inline-block;width: 100%;text-align: center;color: #333">Safari</span>
                    </a>
                </div>

                <div class="item" style="width: 120px;float: left; cursor: pointer;">
                    <a href="https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads">
                        <div class="img-content" style="width: 80px;height: 80px;margin: 0 auto;">
                            <img :src="require('assets/img/browserType/ie.jpg')" style=" width: 100%;border: none">
                        </div>
                        <span style="display: inline-block;width: 100%;text-align: center;color: #333">IE9及以上</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'BelowIe8'
}
</script>

<style>

</style>
