import { addClass } from './dom'
// 判断浏览是否支持webp
export default function checkWebp (el) {
  if (!/(^|;\s?)webps=A/.test(document.cookie)) {
    var image = new Image()
    // 图片加载完成时候的操作
    image.onload = function () {
      // 图片加载成功且宽度为1，那么就代表支持webp了，因为这张base64图是webp格式。如果不支持会触发image.error方法
      if (image.width === 1) {
        // html根节点添加class，并且埋入cookie
        addClass(el, 'webps')
        document.cookie = 'webps=A; max-age=31536000; domain=58.com'
      }
    }
    // 一张支持alpha透明度的webp的图片，使用base64编码
    image.src = 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA=='
  } else {
    addClass(el, 'webps')
  }
}
