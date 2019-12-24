import * as types from './mutation-types'
import { getUserLogin, getUserInfo } from 'static/api/login/login'
import { setToken, unsetToken, getToken } from 'assets/js/util'
import { roleGroupDetail } from 'static/api/setting/index'
/**
 * 登录
 * **/
export const userLogin = ({ commit, state }, preload) => {
  return new Promise((resolve, reject) => {
    getUserLogin(preload).then(res => {
      if (res.subCode !== 400) {
        setToken('userExperience', 'have')
        setToken('queryOptions', [])
        commit(types.USER_LOGIN, true)
        commit(types.USER_TOKEN, res.sessionId)
        setToken('token', res.sessionId)
        getUserInfo(res)
        setToken('isLogin', true)
      }
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}
/***
 * 退出登录
 * ***/
export const userLoginOut = ({ commit, state }) => {
  commit(types.USER_LOGIN, false)
  commit(types.USER_TOKEN, '')
  unsetToken('isLogin')
  unsetToken('meauList')
  unsetToken('token')
  unsetToken('loginId')
  unsetToken('loginDeptId')
  unsetToken('loginDeptName')
  unsetToken('loginName')
  unsetToken('userExperience')
  unsetToken('closeUser')
  unsetToken('queryOptions')
}
/* 人才库搜索设置 */
export const setAcceptTalentSearch = ({ commit, state }, preload) => {
  commit(types.SET_ACCEPT_TALENT_KEYWORDS, preload.keyword)
  commit(types.SET_ACCEPT_TALENT_INTERVIEWVALUE, preload.interviewValue)
  commit(types.SET_ACCEPT_TALENT_CREATETIMESTART, preload.createTimeStart)
  commit(types.SET_ACCEPT_TALENT_CREATETIMEEND, preload.createTimeEnd)
  // commit(types.SET_ACCEPT_TALENT_CLICKED, true)
}
/* 邮件模板搜索设置 */
export const setSettingMailSearch = ({ commit, state }, preload) => {
  commit(types.SET_SETTING_MAIL_KEYWORDS, preload.keyword)
  commit(types.SET_SETTING_MAIL_ENABLED, preload.enabled)
  // commit(types.SET_SETTING_MAIL_CLICKED, true)
}

// 入职审核
export const setVerifyEntrySearch = ({ commit, state }, preload) => {
  commit(types.SET_VERIFY_ENTRY_KEYWORD, preload.keyword)
  commit(types.SET_VERIFY_ENTRY_ID_KEYWORD, preload.idKeyword)
  commit(types.SET_VERIFY_ENTRY_STARTTIME, preload.startTime)
  commit(types.SET_VERIFY_ENTRY_ENDTIME, preload.endTime)
  // commit(types.SET_VERIFY_ENTRY_CLICKED, true)
}
// 勾选树形 -  多选树
export const setTreeCheckedData = ({ commit, state }, preload) => {
  commit(types.SET_TREE_CHECKED_ORGIDS, preload)
  commit(types.SET_TREE_CHECKED_VAL, true)
}
// 勾选树形 - 单选树
export const setSingleCheckedData = ({ commit, state }, preload) => {
  commit(types.SET_SINGLE_CHECKED_ORGID, preload)
  commit(types.SET_SINGLE_TREE_CHECKED_VAL, true)
}
// 给勾选树形设置被选中的名字 - 多选
export const setTreeCheckedName = ({ commit, state }) => {
  let data = state.treeCheckedAllOrgIds
  if (data.length) {
    let nameString = ''
    data.forEach(item => {
      if (state.treeCheckedOrgIds.indexOf(item.id) !== -1) {
        nameString += item.name + ' '
      }
    })
    commit(types.SET_TREE_CHECKED_NAME, nameString)
  }
}
// 给勾选树形设置被选中的名字 - 单选
export const setSingleTreeCheckedName = ({ commit, state }, preload) => {
  let data = state.treeCheckedAllOrgIds
  if (data.length) {
    data.forEach(item => {
      if (state.treeSingleCheckedOrgId === item.id) {
        commit(types.SET_SINGLE_TREE_CHECKED_NAME, item.name)
      }
    })
  } else {
    commit(types.SET_SINGLE_TREE_CHECKED_NAME, preload)
  }
}
// 营销人员入职审核
export const setMarketVerifyEntrySearch = ({ commit, state }, preload) => {
  commit(types.SET_MARKET_VERIFY_ENTRY_KEYWORD, preload.keyword)
  commit(types.SET_MARKET_VERIFY_ENTRY_ID_KEYWORD, preload.idKeyword)
  commit(types.SET_MARKET_VERIFY_ENTRY_STARTTIME, preload.startTime)
  commit(types.SET_MARKET_VERIFY_ENTRY_ENDTIME, preload.endTime)
  // commit(types.SET_MARKET_VERIFY_ENTRY_CLICKED, true)
}
// 员工基本信息
export const setPersonnalBaseSearch = ({ commit, state }, preload) => {
  commit(types.SET_PERSONNAL_BASE_KEYWORD, preload.keyword)
  commit(types.SET_PERSONNAL_BASE_SEARCHORGDS, preload.searchOrgIds)
  commit(types.SET_PERSONNAL_BASE_STATUS, preload.status)
  commit(types.SET_PERSONNAL_BASE_ENTRYDATESTART, preload.entryDateStart)
  commit(types.SET_PERSONNAL_BASE_ENTRYDATEEND, preload.entryDateEnd)
  // commit(types.SET_PERSONNAL_BASE_CLICKED, true)
}
// 报表
export const setMainReportSearch = ({ commit, state }, preload) => {
  commit(types.REPORT_MOVEDEPATID, preload.organizationId)
  commit(types.REPORT_MOVEDEPATNAME, preload.organizationName)
  commit(types.REPORT_MOVESTARTTIME, preload.startTime)
  commit(types.REPORT_MOVEENDTIME, preload.endTime)
}
// 干部管理营销人员
export const setMarketVerifyJobSearch = ({ commit, state }, preload) => {
  commit(types.SET_MARKETVERIFYJOB_KEYWORD, preload.keyword)
  commit(types.SET_MARKETVERIFYJOB_STARTTIME, preload.startTime)
  commit(types.SET_MARKETVERIFYJOB_ENDTIME, preload.endTime)
  commit(types.SET_MARKETVERIFYJOB_CLICKED, true)
}

// 劳动营销人员
export const setMarketVerifyContractSearch = ({ commit, state }, preload) => {
  commit(types.SET_MARKETVERIFYCONTRACT_KEYWORD, preload.keyword)
  commit(types.SET_MARKETVERIFYCONTRACT_STARTTIME, preload.startTime)
  commit(types.SET_MARKETVERIFYCONTRACT_ENDTIME, preload.endTime)
  commit(types.SET_MARKETVERIFYCONTRACT_CLICKED, true)
}

// 劳动普通审核
export const setVerifyContractSearch = ({ commit, state }, preload) => {
  commit(types.SET_VERIFYCONTRACT_KEYWORD, preload.keyword)
  commit(types.SET_VERIFYCONTRACT_STARTTIME, preload.startTime)
  commit(types.SET_VERIFYCONTRACT_ENDTIME, preload.endTime)
  commit(types.SET_VERIFYCONTRACT_CLICKED, true)
}

// 更新更正审核
export const setCorrectSearch = ({ commit, state }, preload) => {
  commit(types.SET_CORRECT_NAMEPHONE, preload.namePhone)
  commit(types.SET_CORRECT_STARTTIME, preload.startTime)
  commit(types.SET_CORRECT_ENDTIME, preload.endTime)
  // commit(types.SET_CORRECT_FIELD, preload.field)
  commit(types.SET_CORRECT_CLICKED, true)
}

// 更新更正审核(营销)
export const setMarketCorrectSearch = ({ commit, state }, preload) => {
  commit(types.SET_MARKET_CORRECT_NAMEPHONE, preload.namePhone)
  commit(types.SET_MARKET_CORRECT_STARTTIME, preload.startTime)
  commit(types.SET_MARKET_CORRECT_ENDTIME, preload.endTime)
  // commit(types.SET_MARKET_CORRECT_FIELD, preload.field)
  commit(types.SET_MARKET_CORRECT_CLICKED, true)
}

// 干部普通审核
export const setVerifyJobSearch = ({ commit, state }, preload) => {
  commit(types.SET_VERIFYJOB_KEYWORD, preload.keyword)
  commit(types.SET_VERIFYJOB_STARTTIME, preload.startTime)
  commit(types.SET_VERIFYJOB_ENDTIME, preload.endTime)
  commit(types.SET_VERIFYJOB_CLICKED, true)
}

// 营销人员离职
export const setMarketVerifyLeaveSearch = ({ commit, state }, preload) => {
  commit(types.SET_MARKETVERIFYLEAVE_KEYWORD, preload.keyword)
  commit(types.SET_MARKETVEIFYLEAVE_STARTTIME, preload.startTime)
  commit(types.SET_MARKETVERIFYLEAVE_ENDTIME, preload.endTime)
  // commit(types.SET_MARKETVERIFY_CLICKED, true)
}
// 营销人员调动
export const setMarketVerifyTransferSearch = ({ commit, state }, preload) => {
  commit(types.SET_MARKETVERIFYTRANSFER_KEYWORD, preload.keyword)
  commit(types.SET_MARKETVERIFYTRANSFER_STARTTIME, preload.startTime)
  commit(types.SET_MARKETVERIFYTRANSFER_ENDTIME, preload.endTime)
  // commit(types.SET_MARKETVERIFYTRANSFER_CLICKED, true)
}
/* 公积金 */
export const setFundsSearch = ({ commit, state }, preload) => {
  commit(types.SET_FUND_KEYWORDS, preload.keyword)
  commit(types.SET_FUND_STATUS, preload.status)
  commit(types.SET_FUND_STARTTIME, preload.startTime)
  commit(types.SET_FUND_ENDTIME, preload.endTime)
  commit(types.SET_FUND_CLICKED, true)
}

/* 社保参保 */
export const setSocialSearch = ({ commit, state }, preload) => {
  commit(types.SET_SOCIAL_KEYWORDS, preload.keyword)
  commit(types.SET_SOCIAL_STATUS, preload.status)
  commit(types.SET_SOCIAL_NATURE, preload.nature)
  commit(types.SET_SOCIAL_CLICKED, true)
}

/* 社保待遇 */
export const setSocialSecuritylSearch = ({ commit, state }, preload) => {
  commit(types.SET_SOCIALSECURITY_KEYWORDS, preload.keyword)
  commit(types.SET_SOCIALSECURITY_START, preload.startTime)
  commit(types.SET_SOCIALSECURITY_END, preload.endTime)
  commit(types.SET_SOCIALSECURITY_CLICKED, true)
}

/* 劳动列表 */
export const setContractSearch = ({ commit, state }, preload) => {
  commit(types.SET_CONTRACT_KEYWORDS, preload.keyword)
  commit(types.SET_CONTRACT_STATUS, preload.status)
  commit(types.SET_CONTRACT_ENDDATE, preload.endDate)
  commit(types.SET_CONTRACT_CLICKED, true)
}

// 设置工资
export const setSalaryStardand = ({ commit, state }, preload) => {
  commit(types.SET_SALARY_STARDAND, preload.salaryStardand)
  commit(types.SET_TRY_SALARY_STARDAND, preload.trySalaryStardand)
}
// 获取当前登录用户审批角色权限
export const getCurrentUserRoleGroup = ({ commit, state }) => {
  let userParams = {
    userId: getToken('loginId')
  }
  roleGroupDetail(userParams).then(data => {
    if (data.result) {
      let roles = data.result.map(item => item.groupId)
      commit(types.SET_CURRENT_ROLE_GROUPS, roles)
    }
  })
}

// 存储搜索条件

export const setSearchConditions = ({ commit, state }, preload) => {

}
