import { post } from 'utils/http'
const SalaryApi = {
  getWageList: preload => post('/system/annual/leave/list', preload),

  pushRestNum: preload => post('/system/annual/leave/log/add', preload),

  modifyRest: preload => post('/system/annual/leave/update', preload),
  lookRest: preload => post('/system/annual/leave/log/list', preload),
  getSalaryList: preload => post('/user/salary/month/get/list', preload),
  upSalary: preload => post('/user/salary/month/change', preload),
  subSalary: preload => post('/user/salary/month/payrol/company/change', preload),

  lookSalary: preload => post('/user/salary/month/changes/list', preload),

  lookOffice: preload => post('/system/annual/leave/top/leader/get/list', preload),
  // 一把手年假计算
  officeAnnual: preload => post('/system/annual/leave/top/leader/calculate', preload),
  // 休假撤销
  revokeRecord: preload => post('/system/annual/leave/log/rollBack', preload),

  //  年假记录列表
  annualRecordList: preload => post('/system/annual/detail/list', preload),

  //  按人统计
  peopleCount: preload => post('/system/annual/detail/selectDeailCountPage', preload),

  //  年假概况
  annualOverview: preload => post('/system/annual/leave/selectAnnualCount', preload),

  //  年假概况详情
  detailAnnualOverview: preload => post('/system/annual/leave/selectAnnualCountPage', preload)
}
export default SalaryApi
