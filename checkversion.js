const fs = require('fs')
const path = require('path')
// 打包时设置当前时间做版本号 根据这个判断是否刷新页面
const version = new Date().getTime()
const content = `getVersion('${version}')`
fs.writeFile('./dist/version.js', content, (err) => {
  if (err) {
    return console.log(err)
  }
})
