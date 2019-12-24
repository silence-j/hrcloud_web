const state = {
  activeIndex: '',
  isLogin: false,
  loading: false,
  btnLoading: false,
  userToken: '',
  entryKeyWorks: '',
  entryidKeyWord: '',
  entryStartTime: '',
  entryEndTime: '',
  entryClicked: '',
  activeRouter: false,
  meansKeyWorks: '',
  meansStartTime: '',
  meansEndTime: '',
  meansClicked: false,
  meansOrg: '',
  orgId: '',
  mainReportClicked: false,

  /* 劳动列表 */
  contractKeyWorks: '',
  contractStatus: '',
  contractClicked: false,
  contractendDate: '',

  /* 干部审核 */
  verifyJobKeyWords: '',
  verifyJobStartTime: '',
  verifyJobEndTime: '',
  verifyJobClicked: false,

  /* 劳动审核 */
  verifyContractKeyWords: '',
  verifyStartTime: '',
  verifyEndTime: '',
  verifyContractClicked: false,

  tableName: '',
  moveDeptId: '',
  moveDeptName: '',
  moveDeptStartTime: '',
  moveDeptEndTime: '',

  /* 社保待遇 */
  socialsecurityKeyWords: '',
  socialsecurityStart: '',
  socialsocialSecurityEnd: '',
  socialSecurityClicked: false,

  /* 首页消息提醒 */
  uninsuredMsg: '',

  /* 公积金 */
  fundKeyword: '',
  fundStatus: '',
  fundStartTime: '',
  fundEndTime: '',
  fundClicked: false,

  /* 社保参保 */
  socialKeyword: '',
  socialStatus: '',
  socialNature: '',
  socialClicked: false,

  // 人才库
  acceptTalentKeywords: '',
  acceptTalentInterviewValue: '',
  acceptTalentCreatedTimeStart: '',
  acceptTalentCreatedTimeEnd: '',
  acceptTalentClicked: false, // 写一个字段判断按钮被点击通过watch这个字段的变化去重新请求接口，这样在父组件的vuex数据传递给子组件可以实时实现数据变化
  acceptUserId: '',
  acceptPName: '',
  acceptDemandId: '',
  acceptParamOrgId: '',
  acceptParamOrgName: '',
  acceptParamPostName: '',
  isDelType: '',
  acceptUserDelId: '',
  acceptUserProgressId: '',
  acceptIdCardNumber: '',
  // 邮件模板
  settingMailKeyword: '',
  settingMailEnabled: null,
  settingMailClicked: false,
  // 入职审核
  verifyEntryKeyword: '',
  verifyEntryIdKeyword: '',
  verifyEntryStartTime: '',
  verifyEntryEndTime: '',
  verifyEntryClicked: false,

  // 勾选树的vuex - 多选
  treeCheckedVal: false,
  treeCheckedOrgIds: [],
  treeCheckedName: '',
  treeCheckedAllOrgIds: [],
  // 勾选树 - 单选
  treeSingleCheckedVal: false,
  treeSingleCheckedOrgId: '',
  treeSingleCheckedName: '',
  // 入职审核
  marketVerifyEntryKeyword: '',
  marketVerifyEntryIdKeyword: '',
  marketVerifyEntryStartTime: '',
  marketVerifyEntryEndTime: '',
  marketVerifyEntryClicked: false,
  // 员工基本信息
  personnalBaseKeyword: '',
  personnalBaseStatus: '',
  personnalBaseEntryDateStart: '',
  personnalBaseEntryDateEnd: '',
  personnalBaseSearchOrgIds: [],
  personnalBaseClicked: false,
  personnalBaseStatusSelect: [],

  /* 营销干部审核 */
  marketverifyjobKeywords: '',
  marketverifyjobStartTime: '',
  marketverifyjobEndTime: '',
  marketVerifyJobClicked: '',

  /* 营销劳动审核 */
  marketverifyContractKeywords: '',
  marketverifyContractStartTime: '',
  marketverifyContractEndTime: '',
  marketVerifyContractClicked: false,

  // 更正更新审核
  correctNamePhone: '',
  correctStartTime: '',
  correctEndTime: '',
  correctField: [],
  correctClicked: false,

  // 更正更新审核(营销)
  marketCorrectNamePhone: '',
  marketCorrectStartTime: '',
  marketCorrectEndTime: '',
  marketCorrectField: [],
  marketCorrectClicked: false,

  // 营销离职审核
  marketVerifyLeaveKeyword: '',
  marketVerifyLeaveStartTime: '',
  marketVerifyLeaveEndTime: '',
  marketVerifyLeaveClick: false,
  // 营销人员电动审核
  marketVerifyTransferRouteSelects: '',
  marketVerifyTransferKeyword: '',
  marketVerifyTransferStartTime: '',
  marketVerifyTransferEndTime: '',
  marketVerfiyTransferClick: false,
  // 面包屑导航数据
  breadcrumbDatas: [],
  // 定义公司薪资结构设置信息的公司Id
  infoByOrgId: '',
  // 设置获取薪资详情的id
  salaryId: '',
  salaryChange: false,
  // 获取选择公司有哪些津贴
  selectCompanyWageArray: [],
  // 劳动合同状态select
  contractAllSelect: false,
  // 公积金select
  fundAllSelect: false,
  // 社保select
  socialAllSelect: false,
  // 营销调动清空搜索条件
  clearTransferSearch: false,
  companyType: '',
  // 调动部门的公司id
  userOrgId: '',
  transferId: '',
  // 高级查询的options
  deepSearchOptions: [],
  // 员工基本信息
  baseExportStatue: false,
  // 工资标准
  salaryStardand: '',
  trySalaryStardand: '',
  // 设置保存
  save1: false,
  save2: false,
  /*  healthArr: {}, */
  healthArr: [],
  // 设置齿轮出现的值
  chooseVis: false,
  chooseCheck: false,
  chooseFiles: [],
  // 设置入职的类型===实习期不用验证薪资必填
  candidateType: '',
  probation: false,
  // 当前登录角色的审批角色
  currentRoleGroups: [],
  // pdf file
  pdffile: '',
  // 人事主体id
  hrBelongId: '',
  // 入职详情id
  entryDetailId: '',
  // 入职身份证号码
  entryIdCardNumber: '',
  inZcBefore: '',
  setCheckes: '',
  clickType: 'default'
}
export default state
