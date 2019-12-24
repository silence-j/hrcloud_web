export function browserRedirect (token) {
  var sUserAgent = navigator.userAgent.toLowerCase()
  if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
    // 跳转移动端页面
    //  alert('移动端')
    window.location.href = 'http://hr-mobile.zcabc.com/#/home?copyToken=' + token
  } else {
    // 跳转pc端页面
    // alert('pc页面')
    // window.location.href="http://f.jcngame.com/fanfan20171208//fanmai/index.html";
  }
}
