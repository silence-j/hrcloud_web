import { post } from 'utils/http'
const WelfareApi = {
  getGrantMg: preload => post('/duty/welfareTemplate/list', preload),

  addTemplate: preload => post('/duty/welfareTemplate/save', preload),
  getControllerList: preload => post('/duty/welfareTemplate/manageTalble', preload),
  getControllerListMang: preload => post('/duty/welfareTemplate/manageTalbleEntity', preload),
  getReportList: preload => post('/duty/welfareRepotred/list', preload),
  getReportNameList: preload => post('/duty/welfareDetail/list', preload),
  pushReportListName: preload => post('/duty/welfareDetail/save', preload),
  delReportList: preload => post('/duty/welfareDetail/save', preload),
  pushAllReport: preload => post('/duty/welfareRepotred/save', preload),
  // 实物发放汇总
  getSummaryList0: preload => post('/duty/welfareDetail/companyNameNum', preload),
  // 节日礼包汇总
  getSummaryList1: preload => post('/duty/welfareDetail/departmentNum', preload),
  getExportData: preload => post('/duty/welfareTemplate/exportManageTalble', preload),
  getNourishGoldList: preload => post('/duty/nutritionMoney/list', preload),
  getHistoryList: preload => post('/duty/nutritionMoney/selectByUserId', preload),
  pushNourishGold: preload => post('/duty/nutritionMoney/save', preload),
  getDetailNourishGold: preload => post('/duty/nutritionMoney/detail', preload),
  getStudyList: preload => post('/duty/studentGrant/list', preload),
  getStudyHistoryList: preload => post('/duty/studentGrant/selectByUserId', preload),
  pushStudyGold: preload => post('/duty/studentGrant/save', preload),
  getDetailStudyGold: preload => post('/duty/studentGrant/detail', preload),
  finishReport: preload => post('/duty/welfareRepotred/save', preload),
  getPostName: preload => post('/duty/selectDutys', preload),
  getSelectCompanyIds: preload => post('/duty/welfareTemplate/selectCompanyId', preload)

}
export default WelfareApi
