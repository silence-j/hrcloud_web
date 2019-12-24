import * as types from './mutation-types'
const mutations = {
  [types.ACTIVEINDEX] (state, activeIndex) {
    state.activeIndex = activeIndex
  },
  [types.LOADING] (state, loading) {
    state.loading = loading
  },
  [types.USER_LOGIN] (state, isLogin) {
    state.isLogin = isLogin
  },
  [types.BTN_LOADING] (state, load) {
    state.btnLoading = load
  },
  [types.USER_TOKEN] (state, userToken) {
    state.userToken = userToken
  },
  [types.SET_ENTRY_KEYWORDS] (state, entryKeyWorks) {
    state.entryKeyWorks = entryKeyWorks
  },
  [types.SET_ENTRY_IDKEYWORD] (state, entryidKeyWord) {
    state.entryidKeyWord = entryidKeyWord
  },
  [types.SET_ENTRY_STARTTIME] (state, entryStartTime) {
    state.entryStartTime = entryStartTime
  },
  [types.SET_ENTRY_ENDTIME] (state, entryEndTime) {
    state.entryEndTime = entryEndTime
  },
  [types.SET_ENTRY_CLICKED] (state, entryClicked) {
    state.entryClicked = entryClicked
  },
  [types.SET_ACTIVE_ROUTER] (state, activeRouter) {
    state.activeRouter = activeRouter
  },
  [types.SET_MEANS_KEYWORDS] (state, meansKeyWorks) {
    state.meansKeyWorks = meansKeyWorks
  },
  [types.SET_MEANS_STARTTIME] (state, meansStartTime) {
    state.meansStartTime = meansStartTime
  },
  [types.SET_MEANS_ENDTIME] (state, meansEndTime) {
    state.meansEndTime = meansEndTime
  },
  [types.SET_MEANS_CLICKED] (state, meansClicked) {
    state.meansClicked = meansClicked
  },
  [types.SET_MEANS_ORG] (state, meansOrg) {
    state.meansOrg = meansOrg
  },
  [types.SET_ORG_ID] (state, orgId) {
    state.orgId = orgId
  },
  [types.SET_MAIN_REPORT_CLICK] (state, mainReportClicked) {
    state.mainReportClicked = mainReportClicked
  },
  /*  劳动列表 */
  [types.SET_CONTRACT_KEYWORDS] (state, contractKeyWorks) {
    state.contractKeyWorks = contractKeyWorks
  },
  [types.SET_CONTRACT_STATUS] (state, contractStatus) {
    state.contractStatus = contractStatus
  },
  [types.SET_CONTRACT_ENDDATE] (state, contractendDate) {
    state.contractendDate = contractendDate
  },
  [types.SET_CONTRACT_CLICKED] (state, contractClicked) {
    state.contractClicked = contractClicked
  },

  /* 干部审核 */
  [types.SET_VERIFYJOB_KEYWORD] (state, verifyJobKeyWords) {
    state.verifyJobKeyWords = verifyJobKeyWords
  },
  [types.SET_VERIFYJOB_STARTTIME] (state, verifyJobStartTime) {
    state.verifyJobStartTime = verifyJobStartTime
  },
  [types.SET_VERIFYJOB_ENDTIME] (state, verifyJobEndTime) {
    state.verifyJobEndTime = verifyJobEndTime
  },
  [types.SET_VERIFYJOB_CLICKED] (state, verifyJobClicked) {
    state.verifyJobClicked = verifyJobClicked
  },

  /* 劳动审核 */
  [types.SET_VERIFYCONTRACT_KEYWORD] (state, verifyContractKeyWords) {
    state.verifyContractKeyWords = verifyContractKeyWords
  },
  [types.SET_VERIFYCONTRACT_STARTTIME] (state, verifyStartTime) {
    state.verifyStartTime = verifyStartTime
  },
  [types.SET_VERIFYCONTRACT_ENDTIME] (state, verifyEndTime) {
    state.verifyEndTime = verifyEndTime
  },
  [types.SET_VERIFYCONTRACT_CLICKED] (state, verifyContractClicked) {
    state.verifyContractClicked = verifyContractClicked
  },

  [types.REPORT_TABBLENAME] (state, tableName) {
    state.tableName = tableName
  },
  [types.REPORT_MOVEDEPATID] (state, moveDeptId) {
    state.moveDeptId = moveDeptId
  },
  [types.REPORT_MOVEDEPATNAME] (state, moveDeptName) {
    state.moveDeptName = moveDeptName
  },
  [types.REPORT_MOVESTARTTIME] (state, moveDeptStartTime) {
    state.moveDeptStartTime = moveDeptStartTime
  },
  [types.REPORT_MOVEENDTIME] (state, moveDeptEndTime) {
    state.moveDeptEndTime = moveDeptEndTime
  },

  /*  社保待遇 */
  [types.SET_SOCIALSECURITY_KEYWORDS] (state, socialsecurityKeyWords) {
    state.socialsecurityKeyWords = socialsecurityKeyWords
  },
  [types.SET_SOCIALSECURITY_START] (state, socialsecurityStart) {
    state.socialsecurityStart = socialsecurityStart
  },
  [types.SET_SOCIALSECURITY_END] (state, socialsocialSecurityEnd) {
    state.socialsocialSecurityEnd = socialsocialSecurityEnd
  },
  [types.SET_SOCIALSECURITY_CLICKED] (state, socialSecurityClicked) {
    state.socialSecurityClicked = socialSecurityClicked
  },

  /* 公积金 */
  [types.SET_FUND_KEYWORDS] (state, fundKeyword) {
    state.fundKeyword = fundKeyword
  },
  [types.SET_FUND_STATUS] (state, fundStatus) {
    state.fundStatus = fundStatus
  },
  [types.SET_FUND_STARTTIME] (state, fundStartTime) {
    state.fundStartTime = fundStartTime
  },
  [types.SET_FUND_ENDTIME] (state, fundEndTime) {
    state.fundEndTime = fundEndTime
  },
  [types.SET_FUND_CLICKED] (state, fundClicked) {
    state.fundClicked = fundClicked
  },

  /*  社保参保 */
  [types.SET_SOCIAL_KEYWORDS] (state, socialKeyword) {
    state.socialKeyword = socialKeyword
  },
  [types.SET_SOCIAL_STATUS] (state, socialStatus) {
    state.socialStatus = socialStatus
  },
  [types.SET_SOCIAL_NATURE] (state, socialNature) {
    state.socialNature = socialNature
  },
  [types.SET_SOCIAL_CLICKED] (state, socialClicked) {
    state.socialClicked = socialClicked
  },

  /* 人才库 */
  [types.SET_ACCEPT_TALENT_KEYWORDS] (state, acceptTalentKeywords) {
    state.acceptTalentKeywords = acceptTalentKeywords
  },
  [types.SET_ACCEPT_TALENT_INTERVIEWVALUE] (state, acceptTalentInterviewValue) {
    state.acceptTalentInterviewValue = acceptTalentInterviewValue
  },
  [types.SET_ACCEPT_TALENT_CREATETIMESTART] (state, acceptTalentCreatedTimeStart) {
    state.acceptTalentCreatedTimeStart = acceptTalentCreatedTimeStart
  },
  [types.SET_ACCEPT_TALENT_CREATETIMEEND] (state, acceptTalentCreatedTimeEnd) {
    state.acceptTalentCreatedTimeEnd = acceptTalentCreatedTimeEnd
  },
  [types.SET_ACCEPT_IS_DELETE] (state, isDelType) {
    state.isDelType = isDelType
  },
  [types.SET_ACCEPT_TALENT_CLICKED] (state, acceptTalentClicked) {
    state.acceptTalentClicked = acceptTalentClicked
  },
  [types.SET_ACCEPT_P_NAME] (state, acceptPName) {
    state.acceptPName = acceptPName
  },
  [types.SET_ACCEPT_DEMAND_ID] (state, acceptDemandId) {
    state.acceptDemandId = acceptDemandId
  },
  [types.SET_ACCEPT_PARAM_ORGID] (state, acceptParamOrgId) {
    state.acceptParamOrgId = acceptParamOrgId
  },
  [types.SET_ACCEPT_PARAM_ORGNAME] (state, acceptParamOrgName) {
    state.acceptParamOrgName = acceptParamOrgName
  },
  [types.SET_ACCEPT_PARAM_POSTNAME] (state, acceptParamPostName) {
    state.acceptParamPostName = acceptParamPostName
  },
  [types.SET_ACCEPT_TALENT_USERTID] (state, acceptUserId) {
    state.acceptUserId = acceptUserId
  },
  [types.SET_ACCEPT_TALENT_DEL_USERTID] (state, acceptUserDelId) {
    state.acceptUserDelId = acceptUserDelId
  },
  [types.SET_ACCEPT_TALENT_PROGRESS_USERTID] (state, acceptUserProgressId) {
    state.acceptUserProgressId = acceptUserProgressId
  },
  [types.SET_ACCEPT_TALENT_IDCARDNUMBER] (state, acceptIdCardNumber) {
    state.acceptIdCardNumber = acceptIdCardNumber
  },
  // 首页
  [types.SET_RECORD_NMINSURED_MSG] (state, uninsuredMsg) {
    state.uninsuredMsg = uninsuredMsg
  },
  // 邮件模板
  [types.SET_SETTING_MAIL_KEYWORDS] (state, settingMailKeyword) {
    state.settingMailKeyword = settingMailKeyword
  },
  [types.SET_SETTING_MAIL_ENABLED] (state, settingMailEnabled) {
    state.settingMailEnabled = settingMailEnabled
  },
  [types.SET_SETTING_MAIL_CLICKED] (state, settingMailClicked) {
    state.settingMailClicked = settingMailClicked
  },
  // 更正更新审核
  [types.SET_CORRECT_NAMEPHONE] (state, namePhone) {
    state.correctNamePhone = namePhone
  },
  [types.SET_CORRECT_STARTTIME] (state, start) {
    state.correctStartTime = start
  },
  [types.SET_CORRECT_ENDTIME] (state, end) {
    state.correctEndTime = end
  },
  [types.SET_CORRECT_FIELD] (state, field) {
    state.correctField = field
  },
  [types.SET_CORRECT_CLICKED] (state, click) {
    state.correctClicked = click
  },
  // 更正更新审核(营销)
  [types.SET_MARKET_CORRECT_NAMEPHONE] (state, namePhone) {
    state.marketCorrectNamePhone = namePhone
  },
  [types.SET_MARKET_CORRECT_STARTTIME] (state, start) {
    state.marketCorrectStartTime = start
  },
  [types.SET_MARKET_CORRECT_ENDTIME] (state, end) {
    state.marketCorrectEndTime = end
  },
  [types.SET_MARKET_CORRECT_FIELD] (state, field) {
    state.correctField = field
  },
  [types.SET_MARKET_CORRECT_CLICKED] (state, click) {
    state.marketCorrectClicked = click
  },
  // 入职审核
  [types.SET_VERIFY_ENTRY_KEYWORD] (state, verifyEntryKeyword) {
    state.verifyEntryKeyword = verifyEntryKeyword
  },
  [types.SET_VERIFY_ENTRY_ID_KEYWORD] (state, verifyEntryIdKeyword) {
    state.verifyEntryIdKeyword = verifyEntryIdKeyword
  },
  [types.SET_VERIFY_ENTRY_STARTTIME] (state, verifyEntryStartTime) {
    state.verifyEntryStartTime = verifyEntryStartTime
  },
  [types.SET_VERIFY_ENTRY_ENDTIME] (state, verifyEntryEndTime) {
    state.verifyEntryEndTime = verifyEntryEndTime
  },
  [types.SET_VERIFY_ENTRY_CLICKED] (state, verifyEntryClicked) {
    state.verifyEntryClicked = verifyEntryClicked
  },
  // 勾选树形vuex-多选
  [types.SET_TREE_CHECKED_VAL] (state, treeCheckedVal) {
    state.treeCheckedVal = treeCheckedVal
  },
  [types.SET_TREE_CHECKED_ORGIDS] (state, treeCheckedOrgIds) {
    state.treeCheckedOrgIds = treeCheckedOrgIds
  },
  [types.SET_TREE_CHECKED_NAME] (state, treeCheckedName) {
    state.treeCheckedName = treeCheckedName
  },
  [types.SET_TREE_CHECKED_ALL_ORGIDS] (state, treeCheckedAllOrgIds) {
    state.treeCheckedAllOrgIds = treeCheckedAllOrgIds
  },
  // 勾选树形vuex-单选
  [types.SET_SINGLE_TREE_CHECKED_VAL] (state, treeSingleCheckedVal) {
    state.treeSingleCheckedVal = treeSingleCheckedVal
  },
  [types.SET_SINGLE_CHECKED_ORGID] (state, treeSingleCheckedOrgId) {
    state.treeSingleCheckedOrgId = treeSingleCheckedOrgId
  },
  [types.SET_SINGLE_TREE_CHECKED_NAME] (state, treeSingleCheckedName) {
    state.treeSingleCheckedName = treeSingleCheckedName
  },
  // 营销人员入职审核
  [types.SET_MARKET_VERIFY_ENTRY_KEYWORD] (state, marketVerifyEntryKeyword) {
    state.marketVerifyEntryKeyword = marketVerifyEntryKeyword
  },
  [types.SET_MARKET_VERIFY_ENTRY_ID_KEYWORD] (state, marketVerifyEntryIdKeyword) {
    state.marketVerifyEntryIdKeyword = marketVerifyEntryIdKeyword
  },
  [types.SET_MARKET_VERIFY_ENTRY_STARTTIME] (state, marketVerifyEntryStartTime) {
    state.marketVerifyEntryStartTime = marketVerifyEntryStartTime
  },
  [types.SET_MARKET_VERIFY_ENTRY_ENDTIME] (state, marketVerifyEntryEndTime) {
    state.marketVerifyEntryEndTime = marketVerifyEntryEndTime
  },
  [types.SET_MARKET_VERIFY_ENTRY_CLICKED] (state, marketVerifyEntryClicked) {
    state.marketVerifyEntryClicked = marketVerifyEntryClicked
  },
  // 员工基本信息
  [types.SET_PERSONNAL_BASE_KEYWORD] (state, personnalBaseKeyword) {
    state.personnalBaseKeyword = personnalBaseKeyword
  },
  [types.SET_PERSONNAL_BASE_STATUS] (state, personnalBaseStatus) {
    state.personnalBaseStatus = personnalBaseStatus
  },
  [types.SET_PERSONNAL_BASE_SEARCHORGDS] (state, personnalBaseSearchOrgIds) {
    state.personnalBaseSearchOrgIds = personnalBaseSearchOrgIds
  },
  [types.SET_PERSONNAL_BASE_ENTRYDATESTART] (state, personnalBaseEntryDateStart) {
    state.personnalBaseEntryDateStart = personnalBaseEntryDateStart
  },
  [types.SET_PERSONNAL_BASE_ENTRYDATEEND] (state, personnalBaseEntryDateEnd) {
    state.personnalBaseEntryDateEnd = personnalBaseEntryDateEnd
  },
  [types.SET_PERSONNAL_BASE_CLICKED] (state, personnalBaseClicked) {
    state.personnalBaseClicked = personnalBaseClicked
  },
  [types.SET_PERSONNAL_BASE_STATUSSELECT] (state, personnalBaseStatusSelect) {
    state.personnalBaseStatusSelect = personnalBaseStatusSelect
  },

  /* 营销干部审核 */
  [types.SET_MARKETVERIFYJOB_KEYWORD] (state, marketverifyjobKeywords) {
    state.marketverifyjobKeywords = marketverifyjobKeywords
  },
  [types.SET_MARKETVERIFYJOB_STARTTIME] (state, marketverifyjobStartTime) {
    state.marketverifyjobStartTime = marketverifyjobStartTime
  },
  [types.SET_MARKETVERIFYJOB_ENDTIME] (state, marketverifyjobEndTime) {
    state.marketverifyjobEndTime = marketverifyjobEndTime
  },
  [types.SET_MARKETVERIFYJOB_CLICKED] (state, marketVerifyJobClicked) {
    state.marketVerifyJobClicked = marketVerifyJobClicked
  },

  /* 营销劳动审核 */
  [types.SET_MARKETVERIFYCONTRACT_KEYWORD] (state, marketverifyContractKeywords) {
    state.marketverifyContractKeywords = marketverifyContractKeywords
  },
  [types.SET_MARKETVERIFYCONTRACT_STARTTIME] (state, marketverifyContractStartTime) {
    state.marketverifyContractStartTime = marketverifyContractStartTime
  },
  [types.SET_MARKETVERIFYCONTRACT_ENDTIME] (state, marketverifyContractEndTime) {
    state.marketverifyContractEndTime = marketverifyContractEndTime
  },
  [types.SET_MARKETVERIFYCONTRACT_CLICKED] (state, marketVerifyContractClicked) {
    state.marketVerifyContractClicked = marketVerifyContractClicked
  },

  // 营销离职审核
  [types.SET_MARKETVERIFYLEAVE_KEYWORD] (state, marketVerifyLeaveKeyword) {
    state.marketVerifyLeaveKeyword = marketVerifyLeaveKeyword
  },
  [types.SET_MARKETVEIFYLEAVE_STARTTIME] (state, marketVerifyLeaveStartTime) {
    state.marketVerifyLeaveStartTime = marketVerifyLeaveStartTime
  },
  [types.SET_MARKETVERIFYLEAVE_ENDTIME] (state, marketVerifyLeaveEndTime) {
    state.marketVerifyLeaveEndTime = marketVerifyLeaveEndTime
  },
  [types.SET_MARKETVERIFY_CLICKED] (state, marketVerifyLeaveClick) {
    state.marketVerifyLeaveClick = marketVerifyLeaveClick
  },
  // 营销人员调动审核
  [types.SET_MARKETVERIFYTRANSFER_ROUTESELECTS] (state, marketVerifyTransferRouteSelects) {
    state.marketVerifyTransferRouteSelects = marketVerifyTransferRouteSelects
  },
  [types.SET_MARKETVERIFYTRANSFER_KEYWORD] (state, marketVerifyTransferKeyword) {
    state.marketVerifyTransferKeyword = marketVerifyTransferKeyword
  },
  [types.SET_MARKETVERIFYTRANSFER_STARTTIME] (state, marketVerifyTransferStartTime) {
    state.marketVerifyTransferStartTime = marketVerifyTransferStartTime
  },
  [types.SET_MARKETVERIFYTRANSFER_ENDTIME] (state, marketVerifyTransferEndTime) {
    state.marketVerifyTransferEndTime = marketVerifyTransferEndTime
  },
  [types.SET_MARKETVERIFYTRANSFER_CLICKED] (state, marketVerfiyTransferClick) {
    state.marketVerfiyTransferClick = marketVerfiyTransferClick
  },
  // 面包屑导航数据
  [types.SET_BREADCRUMB_DATA] (state, breadcrumbDatas) {
    state.breadcrumbDatas = breadcrumbDatas
  },
  // 设置新公司薪资结构设置信息的公司Id
  [types.SET_INFO_BY_ORG_ID] (state, infoByOrgId) {
    state.infoByOrgId = infoByOrgId
  },
  // 设置获取薪资详情的id
  [types.SET_SALARY_ID] (state, salaryId) {
    state.salaryId = salaryId
  },
  [types.SET_SALARY_CHANGE] (state, salaryChange) {
    state.salaryChange = salaryChange
  },
  [types.SET_CURRENT_COM__ARRAY] (state, selectCompanyWageArray) {
    state.selectCompanyWageArray = selectCompanyWageArray
  },
  // 劳动合同状态select
  [types.SET_CONTRACT_ALL_SELECT] (state, contractAllSelect) {
    state.contractAllSelect = contractAllSelect
  },
  // 公积金状态select
  [types.SET_FUNDALL_SELECT] (state, fundAllSelect) {
    state.fundAllSelect = fundAllSelect
  },
  // 社保状态select
  [types.SET_SOCIALL_SELECT] (state, socialAllSelect) {
    state.socialAllSelect = socialAllSelect
  },
  // 营销调动清空搜索条件
  [types.SET_CLEAR_TRANSFERSEARCH] (state, clearTransferSearch) {
    state.clearTransferSearch = clearTransferSearch
  },
  // companyType
  [types.SET_COMPANY_TYPE] (state, companyType) {
    state.companyType = companyType
  },
  // 获取调动的部门的公司id
  [types.SET_USER_ORGID] (state, userOrgId) {
    state.userOrgId = userOrgId
  },
  [types.SET_TRANSFER_ORGID] (state, transferId) {
    state.transferId = transferId
  },
  // 高级查询deepSearchOptions
  [types.SET_DEEP_SEARCH_OPTIONS] (state, deepSearchOptions) {
    state.deepSearchOptions = deepSearchOptions
  },
  // 员工基本信息导出状态
  [types.SET_BASE_EXPORT_STATUE] (state, baseExportStatue) {
    state.baseExportStatue = baseExportStatue
  },
  // 工资标准
  [types.SET_SALARY_STARDAND] (state, salaryStardand) {
    state.salaryStardand = salaryStardand
  },
  [types.SET_TRY_SALARY_STARDAND] (state, trySalaryStardand) {
    state.trySalaryStardand = trySalaryStardand
  },
  // 设置保存
  [types.SET_SAVE1] (state, save1) {
    state.save1 = save1
  },
  [types.SET_SAVE2] (state, save2) {
    state.save2 = save2
  },
  // 健康相关数据
  [types.SET_HEALTH_ARR] (state, healthArr) {
    state.healthArr = healthArr
  },
  // 设置齿轮出现的值
  [types.SET_CHOOSE_VIS] (state, chooseVis) {
    state.chooseVis = chooseVis
  },
  [types.SET_CHOOSE_CHECK] (state, chooseCheck) {
    state.chooseCheck = chooseCheck
  },
  [types.SET_CHOOSE_FILELIST] (state, chooseFiles) {
    state.chooseFiles = chooseFiles
  },
  // 设置薪资类型===实习期不用验证薪资必填
  [types.SET_CANDIDATE_TYPE] (state, candidateType) {
    state.candidateType = candidateType
  },
  [types.SET_PROBATION] (state, probation) {
    state.probation = probation
  },
  // 存储当前登录角色审批角色的权限
  [types.SET_CURRENT_ROLE_GROUPS] (state, currentRoleGroups) {
    state.currentRoleGroups = currentRoleGroups
  },
  //  pdf file
  [types.SET_PDF_FILE] (state, pdffile) {
    state.pdffile = pdffile
  },
  // 获取人事主体id
  [types.SET_HRBELONGID] (state, hrBelongId) {
    state.hrBelongId = hrBelongId
  },
  // 入职详情entryDetailId
  [types.SET_ENTRY_DETAIL_ID] (state, entryDetailId) {
    state.entryDetailId = entryDetailId
  },
  // 入职详情idCardNumber
  [types.SET_ENTRY_IDCARDNUMBER] (state, entryIdCardNumber) {
    state.entryIdCardNumber = entryIdCardNumber
  },
  [types.SET_INZCBEFORE] (state, inZcBefore) {
    state.inZcBefore = inZcBefore
  },
  [types.SET_CHECKS] (state, setCheckes) {
    state.setCheckes = setCheckes
  },
  [types.SET_CLICK_TYPE] (state, clickType) {
    state.clickType = clickType
  }
}
export default mutations
