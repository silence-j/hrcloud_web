export let hostBaseUrl = ''
let host = document.location.host
const apiConfig = {
  '115.236.183.210:2017': 'http://115.236.183.210:2017',
  '172.16.9.180:86': 'http://172.16.9.180:86',
  '172.16.9.180:88': 'http://172.16.9.180:86',
  'test.hr.zcabc.com': 'http://test.hr.zcabc.com',
  '172.16.9.172:82': 'http://172.16.9.172:82',
  'hr.zhongcaicloud.com': 'https://hr.zhongcaicloud.com',
  '122.224.203.238:20086': 'http://122.224.203.238:20086',
  'dev.hr.zcabc.com': 'http://172.16.9.195:80',
  '172.16.9.195': 'http://172.16.9.195:80',
  'hr.zcabc.com': 'http://hr.zcabc.com',
  'localhost:8088': 'http://hr.zcabc.com',
  'hr-pre.zhongcaicloud.com': 'https://hr-pre.zhongcaicloud.com'
  // 'localhost:8088': 'https://hr.zhongcaicloud.com'
}
hostBaseUrl = apiConfig[host] ? apiConfig[host] : 'https://hr-pre.zhongcaicloud.com'
if (process.env.NODE_ENV === 'testApi') {
  hostBaseUrl = 'http://test.hr.zcabc.com'
}
// 地址
export const areaJson = {
  optionProvinces: [],
  optionCities: [],
  optionZones: [],
  provinceName: '',
  provinceId: '',
  areaName: '',
  areaId: '',
  cityName: '',
  cityId: '',
  id: ''
}
export const salaryStandarJson = {
  mlist: [],
  selecteSalarydOptions: [],
  commonSalaryArr: [],
  selectOtherOptions: [],
  otherArr: {
    money: '0',
    unit: '元/月'
  },
  postArr: [],
  percent: 80,
  showParcent: false,
  optionArr: ''
}
