import html2canvas from 'html2canvas'
import getUpload from './axiosUpload'
export default (content, type) => {
  const canvas2 = document.createElement('canvas')
  const _canvas = document.querySelector(content)
  var w = parseInt(window.getComputedStyle(_canvas).width)
  var h = parseInt(window.getComputedStyle(_canvas).height)
  // 将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
  canvas2.width = w * 2
  canvas2.height = h * 2
  canvas2.style.width = w + 'px'
  canvas2.style.height = h + 'px'
  // canvas2.allowTaint = true
  // 可以按照自己的需求，对context的参数修改,translate指的是偏移量
  //  var context = canvas.getContext("2d");
  //  context.translate(0,0);
  const context = canvas2.getContext('2d')
  context.scale(1.85, 1.7)
  return new Promise((resolve, reject) => {
    html2canvas(_canvas, { canvas: canvas2 }).then(canvas => {
      const dataUrl = canvas.toDataURL('image/png')
      var arr = dataUrl.split(',')
      var mime = arr[0].match(/:(.*?);/)[1]
      var suffix = mime.split('/')[1]
      var bstr = atob(arr[1])
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      var filename = 'mail_img'
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      const file = new File([u8arr], `${filename}.${suffix}`, { type: mime })
      const formdata = new FormData()
      formdata.append('file', file)
      // resolve(canvas.toDataURL())
      if (type === 'view') {
        resolve(canvas.toDataURL())
      } else {
        getUpload(formdata).then(res => {
          resolve(res)
        })
      }
    })
  })
}
