export const getActiveIndex = state => state.activeIndex
export const getLoading = state => state.loading
export const getIsLogin = state => state.isLogin
export const getEntryKeyWords = state => state.entryKeyWorks
export const getEntryidKeyWord = state => state.entryidKeyWord
export const getEntryStartTime = state => state.entryStartTime
export const getEntryEndTime = state => state.entryEndTime
export const getEntryClicked = state => state.entryClicked
export const getActiveRouter = state => state.activeRouter
export const getMeansKeyWords = state => state.meansKeyWorks
export const getMeansStartTime = state => state.meansStartTime
export const getMeansEndTime = state => state.meansEndTime
export const getMeansClicked = state => state.meansClicked
export const getMeansOrg = state => state.meansOrg
export const getOrgId = state => state.orgId
export const getMainReportClick = state => state.mainReportClicked
/* 劳动合同列表 */
export const getContracrArr = state => {
  return {
    keyword: state.contractKeyWorks,
    status: state.contractStatus,
    endDate: state.contractendDate
  }
}
export const getContractClicked = state => state.contractClicked

/* 干部审核列表 */
export const getVerifyJobArr = state => {
  return {
    keyword: state.verifyJobKeyWords,
    startTime: state.verifyJobStartTime,
    endTime: state.verifyJobEndTime
  }
}
export const getVerifyJobClicked = state => state.verifyJobClicked

/* 劳动审核列表 */
export const getVerifyContracrArr = state => {
  return {
    keyword: state.verifyContractKeyWords,
    startTime: state.verifyStartTime,
    endTime: state.verifyEndTime
  }
}
export const getVerifyContractClicked = state => state.verifyContractClicked

export const getTableName = state => state.tableName
export const reportMoveDeptId = state => state.moveDeptId
export const reportMoveDeptName = state => state.moveDeptName
export const reportMoveStartTime = state => state.moveDeptStartTime
export const reportMoveEndTime = state => state.moveDeptEndTime

/* 社保待遇 */
export const getSocialSecurityArr = state => {
  return {
    keyword: state.socialsecurityKeyWords,
    startTime: state.socialsecurityStart,
    endTime: state.socialsocialSecurityEnd
  }
}
export const getSocialSecurityClicked = state => state.socialSecurityClicked

/* 公积金 */
export const getFundSearchArr = state => {
  return {
    keyword: state.fundKeyword,
    status: state.fundStatus,
    startTime: state.fundStartTime,
    endTime: state.fundEndTime
  }
}
export const getFundClicked = state => state.fundClicked

/* 社保参保 */
export const getSocialSearchArr = state => {
  return {
    keyword: state.socialKeyword,
    status: state.socialStatus,
    nature: state.socialNature
  }
}
export const getSocialClicked = state => state.socialClicked

/* 人才库 */
export const getAcceptTalentSearchArr = state => {
  return {
    keyword: state.acceptTalentKeywords,
    interviewValue: state.acceptTalentInterviewValue,
    createTimeStart: state.acceptTalentCreatedTimeStart,
    createTimeEnd: state.acceptTalentCreatedTimeEnd
  }
}
export const getAcceptTalentInterviewValue = state => state.acceptTalentInterviewValue
export const getAcceptTalentClick = state => state.acceptTalentClicked
export const getAcceptUserId = state => state.acceptUserId
export const getAcceptUserDelId = state => state.acceptUserDelId
export const getIsDel = state => state.isDelType
export const getAcceptUserProgressId = state => state.acceptUserProgressId
export const getAcceptIdCardNumber = state => state.acceptIdCardNumber
export const getAcceptPName = state => state.acceptPName
export const getAcceptDemandId = state => state.acceptDemandId
export const getAcceptParamOrgId = state => state.acceptParamOrgId
export const getAcceptParamOrgName = state => state.acceptParamOrgName
export const getAcceptParamPostName = state => state.acceptParamPostName

// 首页
export const getUninsuredMsg = state => state.uninsuredMsg
/* 邮件模板 */
export const getSettingMailSearchArr = state => {
  return {
    keyword: state.settingMailKeyword,
    enabled: state.settingMailEnabled
  }
}
export const getSettingMailClick = state => state.settingMailClicked

// 入职审核
export const getVerifyEntrySearchArr = state => {
  return {
    keyWord: state.verifyEntryKeyword,
    idKeyWord: state.verifyEntryIdKeyword,
    startTime: state.verifyEntryStartTime,
    endTime: state.verifyEntryEndTime
  }
}
export const getVerifyEntryClick = state => state.verifyEntryClicked

// 勾选树形 - 多选
export const getTreeCheckedVal = state => state.treeCheckedVal
export const getTreeCheckedOrgIds = state => state.treeCheckedOrgIds
export const getTreeCheckedName = state => state.treeCheckedName
export const getTreeCheckedAllOrgIds = state => state.treeCheckedAllOrgIds
// 勾选树形 - 单选
export const getTreeSingleCheckedVal = state => state.treeSingleCheckedVal
export const getTreeSingleCheckedName = state => state.treeSingleCheckedName
export const getTreeSingleCheckedOrgId = state => state.treeSingleCheckedOrgId
// 营销人员入职审核
export const getMarketVerifyEntrySearchArr = state => {
  return {
    keyWord: state.marketVerifyEntryKeyword,
    idKeyWord: state.marketVerifyEntryIdKeyword,
    startTime: state.marketVerifyEntryStartTime,
    endTime: state.marketVerifyEntryEndTime
  }
}
export const getMarketVerifyEntryClick = state => state.marketVerifyEntryClicked

// 员工基本信息
export const getPersonnalBaseSearchArr = state => {
  return {
    keyword: state.personnalBaseKeyword,
    status: state.personnalBaseStatus,
    entryDateStart: state.personnalBaseEntryDateStart,
    entryDateEnd: state.personnalBaseEntryDateEnd,
    searchOrgIds: state.personnalBaseSearchOrgIds
  }
}
export const getPersonBaseClick = state => state.personnalBaseClicked
export const getPersonnalBaseStatusSelect = state => state.personnalBaseStatusSelect

/* 营销干部审核 */
export const getMarketJobSearchArr = state => {
  return {
    keyword: state.marketverifyjobKeywords,
    startTime: state.marketverifyjobStartTime,
    endTime: state.marketverifyjobEndTime
  }
}
export const getMarketVerifyJobClick = state => state.marketVerifyJobClicked

/* 营销劳动审核 */
export const getMarketContractSearchArr = state => {
  return {
    keyword: state.marketverifyContractKeywords,
    startTime: state.marketverifyContractStartTime,
    endTime: state.marketverifyContractEndTime
  }
}
export const getMarketVerifyContractClick = state => state.marketVerifyContractClicked

// 营销人员离职
export const getMarketVerifyLeaveSearchArr = state => {
  return {
    keyword: state.marketVerifyLeaveKeyword,
    startTime: state.marketVerifyLeaveStartTime,
    endTime: state.marketVerifyLeaveEndTime
  }
}
// 更新更正
export const getCorrectSearchArr = state => {
  return {
    namePhone: state.correctNamePhone,
    startTime: state.correctStartTime,
    endTime: state.correctEndTime,
    field: state.correctField
  }
}
export const getCorrectSearchClick = state => state.correctClicked

// 更新更正营销
export const getMarketCorrectSearchArr = state => {
  return {
    namePhone: state.marketCorrectNamePhone,
    startTime: state.marketCorrectStartTime,
    endTime: state.marketCorrectEndTime,
    field: state.marketCorrectField
  }
}
export const getMarketCorrectSearchClick = state => state.marketCorrectClicked
export const getMarketVerifyLeaveClick = state => state.marketVerifyLeaveClick
// 营销人员调动审核
export const getMarketVerifyTransferRouteSelects = state => state.marketVerifyTransferRouteSelects
export const getMarketVerifyTransferSearchArr = state => {
  return {
    keyword: state.marketVerifyTransferKeyword,
    startTime: state.marketVerifyTransferStartTime,
    endTime: state.marketVerifyTransferEndTime
  }
}
export const getMarketVerifyTransferClick = state => state.marketVerfiyTransferClick
// 面包屑导航数据
export const getBreadcrumbDatas = state => state.breadcrumbDatas
// 获取公司薪资结构设置信息的公司Id
export const getInfoByOrgId = state => state.infoByOrgId

// 获取薪资详情的id
export const getSalaryId = state => state.salaryId
export const getSalaryChange = state => state.salaryChange
// 获取选择的公司有哪些津贴福利
export const getSelectCompanyWageArr = state => state.selectCompanyWageArray
// 劳动合同状态select
export const getContractAllSelect = state => state.contractAllSelect
// 公积金状态
export const getFundAllSelect = state => state.fundAllSelect
// 社保状态
export const getSocialAllSelect = state => state.socialAllSelect

// 营销调动清空搜索条件
export const getClearTransferSearch = state => state.clearTransferSearch
// companyType
export const getCompanyType = state => state.companyType
// 调动部门的公司id
export const getUserOrgId = state => state.userOrgId
// 高级查询deepSearchOptions
export const getDeepSearchOptions = state => state.deepSearchOptions

// 员工基本信息导出状态
export const getBaseExport = state => state.baseExportStatue

// 薪资
export const getSalaryArr = state => {
  return {
    formalSalaryStr: state.salaryStardand,
    probationSalaryStr: state.trySalaryStardand
  }
}
// 获取保存
export const getAllSave = state => {
  return {
    save1: state.save1,
    save2: state.save2
  }
}
// 获取健康相关数据
export const getHealthArr = state => state.healthArr
export const getTransferId = state => state.transferId
// 获取齿轮显示的值
export const getChooseVis = state => state.chooseVis
export const getChooseCheck = state => state.chooseCheck
export const getChooseFieldList = state => state.chooseFiles

// 获取入职类型
export const getCandidateType = state => state.candidateType
export const getProbation = state => state.probation
// 获取当前登录员工的审批权限
export const getCurrentRoleGroups = state => state.currentRoleGroups
// 获取人事主体id
export const getHrBelongId = state => state.hrBelongId
// 入职详情id
export const getEntryDetailId = state => state.entryDetailId
export const getEntryIdCardNumber = state => state.entryIdCardNumber

export const getClickType = state => state.clickType
