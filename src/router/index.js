import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from 'assets/js/util'
const Recruitment = () => import(/* webpackChunkName: "Recruitment" */'views/recruitment/index')
const RecruitmentPost = () => import(/* webpackChunkName: "RecruitmentPost" */'views/recruitment/post/index')
/** 人才库**/
const RecruitmentAccept = () => import(/* webpackChunkName: "RecruitmentAccept" */'views/recruitment/accept/index')
// 全部
const AcceptAll = () => import(/* webpackChunkName: "AcceptAll" */'views/recruitment/accept/talent/all')
// 待面试
const AcceptWaitInterview = () => import(/* webpackChunkName: "AcceptWaitInterview" */'views/recruitment/accept/talent/wait-interview')
// 入职审批
const AcceptEntry = () => import(/* webpackChunkName: "AcceptEntry" */'views/recruitment/accept/talent/entry')
// 储备
const AcceptReserve = () => import(/* webpackChunkName: "AcceptReserve" */'views/recruitment/accept/talent/reserve')
// 不录用
const AcceptNonEmployment = () => import(/* webpackChunkName: "AcceptNonEmployment" */'views/recruitment/accept/talent/non-employment')
// 已录用
const AcceptHaveHired = () => import(/* webpackChunkName: "AcceptHaveHired" */'views/recruitment/accept/talent/have-hired')
// 未面试
const AcceptNonInterview = () => import(/* webpackChunkName: "AcceptNonInterview" */'views/recruitment/accept/talent/non-interview')
const PostCheck = () => import(/* webpackChunkName: "PostCheck" */'views/recruitment/post/post-check')
const PostAdd = () => import(/* webpackChunkName: "PostAdd" */'views/recruitment/post/post-add')
const AcceptCheck = () => import(/* webpackChunkName: "AcceptCheck" */'views/recruitment/accept/accept-check')
const AcceptEdit = () => import(/* webpackChunkName: "AcceptEdit" */'views/recruitment/accept/accept-edit')
const AcceptAdd = () => import(/* webpackChunkName: "AcceptAdd" */'views/recruitment/accept/accept-add')
const ViewInvite = () => import(/* webpackChunkName: "ViewInvite" */'views/recruitment/accept/viewInvite')
// 资料管理
const RecruitmentMeans = () => import(/* webpackChunkName: "RecruitmentMeans" */'views/recruitment/means/index')
const MeansTransfer = () => import(/* webpackChunkName: "MeansTransfer" */'views/recruitment/means/transfer')
const MeansReceive = () => import(/* webpackChunkName: "MeansReceive" */'views/recruitment/means/receive')
const ReceiveDetail = () => import(/* webpackChunkName: "ReceiveDetail" */'views/recruitment/means/receive-detail/index')
const ReceiveLabor = () => import(/* webpackChunkName: "ReceiveLabor" */'views/recruitment/means/receive-detail/labor')
const ReceivePersonnal = () => import(/* webpackChunkName: "ReceivePersonnal" */'views/recruitment/means/receive-detail/personnal')
const PersonnalInformation = () => import(/* webpackChunkName: "PersonnalInformation" */'views/personnal-information/index')
// 员工基本信息
const PersonnalInformationBase = () => import(/* webpackChunkName: "PersonnalInformationBase" */'views/personnal-information/base/index')
const PersonnalInformationBaseOnJob = () => import(/* webpackChunkName: "PersonnalInformationBaseOnJob" */'views/personnal-information/base/on-job')
const PersonnalInformationBaseOnQuit = () => import(/* webpackChunkName: "PersonnalInformationBaseOnQuit" */'views/personnal-information/base/quit-job')
const BaseCheck = () => import(/* webpackChunkName: "BaseCheck" */'views/personnal-information/base/base-check/index')
const BaseLabor = () => import(/* webpackChunkName: "BaseLabor" */'views/personnal-information/base/base-check/labor')
const BasePersonnal = () => import(/* webpackChunkName: "BasePersonnal" */'views/personnal-information/base/base-check/personnal')
const BaseReport = () => import(/* webpackChunkName: "BaseReport" */'views/personnal-information/base/base-check/record')
const BaseEdit = () => import(/* webpackChunkName: "BaseEdit" */'views/personnal-information/base/base-edit/index')
const BaseEditLabor = () => import(/* webpackChunkName: "BaseEditLabor" */'views/personnal-information/base/base-edit/labor')
const BaseEditPersonnal = () => import(/* webpackChunkName: "BaseEditPersonnal" */'views/personnal-information/base/base-edit/personnal')
// 员工基本信息
const PersonnalInformationChangeData = () => import(/* webpackChunkName: "PersonnalInformationChangeData" */'views/personnal-information/changeData/index')
const PersonnalInformationChangeDataUpdates = () => import(/* webpackChunkName: "PersonnalInformationChangeDataUpdates" */'views/personnal-information/changeData/updates')
const PersonnalInformationChangeDataIncorrect = () => import(/* webpackChunkName: "PersonnalInformationChangeDataIncorrect" */'views/personnal-information/changeData/incorrect')
// 员工基本信息职新增
const PersonEntryAdd = () => import(/* webpackChunkName: "PersonEntryAdd" */'views/entry-view/person-entry-add')
/* 补充员工基本信息 */
const BaseJob = () => import(/* webpackChunkName: "BaseJob" */'views/personnal-information/base/base-check/job')
const BaseChange = () => import(/* webpackChunkName: "BaseChange" */'views/personnal-information/base/base-check/change')
const BaseContract = () => import(/* webpackChunkName: "BaseContract" */'views/personnal-information/base/base-check/contract')
const BaseFunds = () => import(/* webpackChunkName: "BaseFunds" */'views/personnal-information/base/base-check/funds')
const BaseSocial = () => import(/* webpackChunkName: "BaseSocial" */'views/personnal-information/base/base-check/social')
const BaseSalary = () => import(/* webpackChunkName: "BaseSalary" */'views/personnal-information/base/base-check/salary')
const BaseRemark = () => import(/* webpackChunkName: "BaseRemark" */'views/personnal-information/base/base-check/remark')

const PersonnalInformationJob = () => import(/* webpackChunkName: "PersonnalInformationJob" */'views/personnal-information/job/index')
const PersonnalInformationJobAdd = () => import(/* webpackChunkName: "PersonnalInformationJobAdd" */'views/personnal-information/job/job-add')
const PersonnalInformationJobCheck = () => import(/* webpackChunkName: "PersonnalInformationJobCheck" */'views/personnal-information/job/job-check')
const PersonnalInformationJobExempt = () => import(/* webpackChunkName: "PersonnalInformationJobExempt" */'views/personnal-information/job/job-exempt')
const PersonnalInformationContract = () => import(/* webpackChunkName: "PersonnalInformationContract" */'views/personnal-information/contract/index')
const ContractContract = () => import(/* webpackChunkName: "ContractContract" */'views/personnal-information/contract/contract')
const ContractEmployment = () => import(/* webpackChunkName: "ContractEmployment" */'views/personnal-information/contract/employment')
const ContractEdit = () => import(/* webpackChunkName: "ContractEdit" */'views/personnal-information/contract/contract-edit')
const ContractPut = () => import(/* webpackChunkName: "ContractPut" */'views/personnal-information/contract/contract-put')

/* 社保参保管理 */
const PersonnalSocial = () => import(/* webpackChunkName: "PersonnalSocial" */'views/personnal-information/social')
const allSocial = () => import(/* webpackChunkName: "allSocial" */'views/personnal-information/social/allSocial')
const stopSocial = () => import(/* webpackChunkName: "stopSocial" */'views/personnal-information/social/stopSocial')
const checkSocial = () => import(/* webpackChunkName: "checkSocial" */'views/personnal-information/social/social-check')
const recordSocial = () => import(/* webpackChunkName: "recordSocial" */'views/personnal-information/social/recordSocial')
const Standard = () => import(/* webpackChunkName: "Standard" */'views/personnal-information/social/standard')

/* 社保公积金管理 */
const ProvidentFund = () => import(/* webpackChunkName: "ProvidentFund" */'views/personnal-information/providentFund')
const WaitProviden = () => import(/* webpackChunkName: "WaitProviden" */'views/personnal-information/providentFund/waitProviden')
const AllProviden = () => import(/* webpackChunkName: "AllProviden" */'views/personnal-information/providentFund/allProviden')
const StopProviden = () => import(/* webpackChunkName: "StopProviden" */'views/personnal-information/providentFund/stopProviden')
const HandleProviden = () => import(/* webpackChunkName: "HandleProviden" */'views/personnal-information/providentFund/handleProviden')
const ProvidentFundRecordSocial = () => import(/* webpackChunkName: "ProvidentFundRecordSocial" */'views/personnal-information/providentFund/recordSocial')
const ProvidentFundStandard = () => import(/* webpackChunkName: "ProvidentFundStandard" */'views/personnal-information/providentFund/standard')

/* 社保待遇管理 */
const getSecurityIndex = () => import(/* webpackChunkName: "getSecurityIndex" */'views/personnal-information/security')
/* 1.社保转移记录 */
const getSecurityTransfer = () => import(/* webpackChunkName: "getSecurityTransfer" */'views/personnal-information/security/securityTransfer')
/* 2.退休管理 */
const getSecurityRetiree = () => import(/* webpackChunkName: "getSecurityRetiree" */'views/personnal-information/security/securityRetiree')
/* 3.驻外定点医院 */
const getStationedHospital = () => import(/* webpackChunkName: "getStationedHospital" */'views/personnal-information/security/stationedHospital')
/* 4.医疗报销 */
const getMedicalReimbursement = () => import(/* webpackChunkName: "getMedicalReimbursement" */'views/personnal-information/security/medicalReimbursement')
/* 5.生育待遇 */
const getBirthTreatment = () => import(/* webpackChunkName: "getBirthTreatment" */'views/personnal-information/security/birthTreatment')
/* 6.工伤待遇 */
const getOccupationalInjury = () => import(/* webpackChunkName: "getOccupationalInjury" */'views/personnal-information/security/occupationalInjury')
/* 7.失业待遇 */
const getUnemploymentTreatment = () => import(/* webpackChunkName: "getUnemploymentTreatment" */'views/personnal-information/security/unemploymentTreatment')

const ContractCheck = () => import(/* webpackChunkName: "ContractCheck" */'views/personnal-information/contract/contract-check')
/* 审核 */
const Verify = () => import(/* webpackChunkName: "Verify" */'views/verify/index')
// 入职审核
const VerifyEntry = () => import(/* webpackChunkName: "VerifyEntry" */'views/verify/entry/index')
const SolveOffer = () => import(/* webpackChunkName: "SolveOffer" */'views/verify/entry/solveOffer')
// 入职审核我发起的
const VerifyEntryOwner = () => import(/* webpackChunkName: "VerifyEntryOwner" */'views/verify/entry/entry-box/owner')
// 入职审核录用
const VerifyEntryEmployment = () => import(/* webpackChunkName: "VerifyEntryEmployment" */'views/verify/entry/entry-box/employment')
// 发offer
const OfferSend = () => import(/* webpackChunkName: "OfferSend" */'views/verify/entry/entry-box/sendOffer')
// 入职审核录用复核
const VerifyEntryRecheck = () => import(/* webpackChunkName: "VerifyEntryRecheck" */'views/verify/entry/entry-box/recheck')
// 入职审核入职
const VerifyEntryEntry = () => import(/* webpackChunkName: "VerifyEntryEntry" */'views/verify/entry/entry-box/entry')
// 入职审核入职复核
const VerifyEntryReviewEntry = () => import(/* webpackChunkName: "VerifyEntryReviewEntry" */'views/verify/entry/entry-box/review-entry')
// 入职审核详情
const VerifyOwnerDetail = () => import(/* webpackChunkName: "VerifyOwnerDetail" */'views/verify/entry/entry-box/owner-detail')
const VerifyEntryCheck = () => import(/* webpackChunkName: "VerifyEntryCheck" */'views/verify/entry/entry-check/index')
const VerifyEntryCheckApprove = () => import(/* webpackChunkName: "VerifyEntryCheckApprove" */'views/verify/entry/entry-check/approve')
const VerifyEntryCheckForm = () => import(/* webpackChunkName: "VerifyEntryCheckForm" */'views/verify/entry/entry-check/check-form')
// 入职审核录用审核
const VerifyEntryOption = () => import(/* webpackChunkName: "VerifyEntryOption" */'views/verify/entry/entry-option/index')
// 入职审核入职审核
const VerifyEntryDetail = () => import(/* webpackChunkName: "VerifyEntryDetail" */'views/verify/entry/entry-detail/index')
const VerifyEntryDetailLabor = () => import(/* webpackChunkName: "VerifyEntryDetailLabor" */'views/verify/entry/entry-detail/labor')
const VerifyEntryDetailPersonnal = () => import(/* webpackChunkName: "VerifyEntryDetailPersonnal" */'views/verify/entry/entry-detail/personnal')
// 入职审核入职查看
const VerifyFnEntry = () => import(/* webpackChunkName: "VerifyFnEntry" */'views/verify/entry/entry-finCheck/index')
const VerifyEntryLabor = () => import(/* webpackChunkName: "VerifyEntryLabor" */'views/verify/entry/entry-finCheck/labor')
const VerifyEntryPersonnal = () => import(/* webpackChunkName: "VerifyEntryPersonnal" */'views/verify/entry/entry-finCheck/personnal')

const VerifyLeave = () => import(/* webpackChunkName: "VerifyLeave" */'views/verify/leave-msg/index')
const VerifyTransfer = () => import(/* webpackChunkName: "VerifyTransfer" */'views/verify/transfer-msg/index')
const VerifyJob = () => import(/* webpackChunkName: "VerifyJob" */'views/verify/job/index')
const VerifyJobAdd = () => import(/* webpackChunkName: "VerifyJobAdd" */'views/verify/job/job-add')
const VerifyJobMove = () => import(/* webpackChunkName: "VerifyJobMove" */'views/verify/job/job-move')
const VerifyJobAddCheck = () => import(/* webpackChunkName: "VerifyJobAddCheck" */'views/verify/job/job-add-check')
const VerifyJobMoveCheck = () => import(/* webpackChunkName: "VerifyJobMoveCheck" */'views/verify/job/job-move-check')
const VerifyContract = () => import(/* webpackChunkName: "VerifyContract" */'views/verify/contract/index')
const VerifyContractChange = () => import(/* webpackChunkName: "VerifyContractChange" */'views/verify/contract/change')
const VerifyContractMove = () => import(/* webpackChunkName: "VerifyContractMove" */'views/verify/contract/move')
const VerifyContractCancel = () => import(/* webpackChunkName: "VerifyContractCancel" */'views/verify/contract/cancel')

const VerifyCorrect = () => import(/* webpackChunkName: "VerifyCorrect" */'views/verify/correct/index')
const VerifyCorrectStarted = () => import(/* webpackChunkName: "VerifyCorrectStarted" */'views/verify/correct/started')
const VerifyCorrectPersonal = () => import(/* webpackChunkName: "VerifyCorrectPersonalAudit" */'views/verify/correct/personalAudit')
const VerifyCorrectGroup = () => import(/* webpackChunkName: "VerifyCorrectGroupAudit" */'views/verify/correct/groupAudit')
/* 营销人员审核 */
const MarketVerify = () => import(/* webpackChunkName: "MarketVerify" */'views/market-verify/index')
// 营销人员审核入职审核
const MarketVerifyEntry = () => import(/* webpackChunkName: "MarketVerifyEntry" */'views/market-verify/entry/index')
const MarketVerifyEntryOwner = () => import(/* webpackChunkName: "MarketVerifyEntryOwner" */'views/market-verify/entry/owner')
const MarketVerifyEntryEntry = () => import(/* webpackChunkName: "MarketVerifyEntryEntry" */'views/market-verify/entry/entry')
const MarketVerifyEntryHeadquarters = () => import(/* webpackChunkName: "MarketVerifyEntryHeadquarters" */'views/market-verify/entry/headquarters')
// 营销人员入职新增
const MarketEntryAdd = () => import(/* webpackChunkName: "MarketEntryAdd" */'views/entry-view/market-entry-add')
const MarketEntryReview = () => import(/* webpackChunkName: "MarketEntryReview" */'views/entry-view/market-entry-review')
const MarketEntryExmine = () => import(/* webpackChunkName: "MarketEntryExmine" */'views/entry-view/market-entry-exmine')
// 入职审核
const EntryExmine = () => import(/* webpackChunkName: "EntryExmine" */'views/entry-view/entry-exmine')
// 营销人员审核劳动审核
const marketVerifyContract = () => import(/* webpackChunkName: "MarketVerifyContract" */'views/market-verify/contract/index')
const marketVerifyContractChange = () => import(/* webpackChunkName: "MarketVerifyContractChange" */'views/market-verify/contract/change')
const marketVerifyContractMove = () => import(/* webpackChunkName: "MarketVerifyContractMove" */'views/market-verify/contract/move')
const marketVerifyContractCancel = () => import(/* webpackChunkName: "MarketVerifyContractCancel" */'views/market-verify/contract/cancel')

// 营销人员审核更正审核
const marketVerifyCorrect = () => import(/* webpackChunkName: "marketVerifyCorrect" */'views/market-verify/correct/index')
const marketVerifyCorrectStarted = () => import(/* webpackChunkName: "marketVerifyCorrectStarted" */'views/market-verify/correct/started')
const marketVerifyCorrectPersonal = () => import(/* webpackChunkName: "marketVerifyCorrectPersonal" */'views/market-verify/correct/personal')
const marketVerifyCorrectGroup = () => import(/* webpackChunkName: "marketVerifyCorrectGroup" */'views/market-verify/correct/group')

// 营销人员干部审核
const marketVerifyJob = () => import(/* webpackChunkName: "MarketVerifyJob" */'views/market-verify/job/index')
const marketVerifyJobAdd = () => import(/* webpackChunkName: "MarketVerifyJobAdd" */'views/market-verify/job/jobMarket-add')
const marketVerifyJobMove = () => import(/* webpackChunkName: "MarketVerifyJobMove" */'views/market-verify/job/jobMarket-move')
const marketVerifyJobAddCheck = () => import(/* webpackChunkName: "MarketVerifyJobAddCheck" */'views/market-verify/job/jobMarket-add-check')
const marketVerifyJobMoveCheck = () => import(/* webpackChunkName: "MarketVerifyJobMoveCheck" */'views/market-verify/job/jobMarket-move-check')

// 营销人员离职审核
const MarketVerifyLeave = () => import(/* webpackChunkName: "MarketVerifyLeave" */'views/market-verify/leave/index')
const MarketVerifyLeaveOwner = () => import(/* webpackChunkName: "MarketVerifyLeaveOwner" */'views/market-verify/leave/owner')
const MarketVerifyMarketCEO = () => import(/* webpackChunkName: "MarketVerifyMarketCEO" */'views/market-verify/leave/market-ceo')
const MarketVerifyMarketSure = () => import(/* webpackChunkName: "MarketVerifyMarketSure" */'views/market-verify/leave/market-sure')
// 营销人员调动审核
const MarketVerifyTransfer = () => import(/* webpackChunkName: "MarketVerifyTransfer" */'views/market-verify/transfer/index')
const MarketVerifyTransferComeIn = () => import(/* webpackChunkName: "MarketVerifyTransferComeIn" */'views/market-verify/transfer/come-in/index')
const MarketVerifyTransferComeInOwner = () => import(/* webpackChunkName: "MarketVerifyTransferComeInOwner" */'views/market-verify/transfer/come-in/owner')
const MarketVerifyTransferComeInTransferCeo = () => import(/* webpackChunkName: "MarketVerifyTransferComeInTransferCeo" */'views/market-verify/transfer/come-in/transfer-ceo')
const MarketVerifyTransferComeInTransferNewHr = () => import(/* webpackChunkName: "MarketVerifyTransferComeInTransferNewHr" */'views/market-verify/transfer/come-in/transfer-newHr')
const MarketVerifyTransferComeInTransferNewCeo = () => import(/* webpackChunkName: "MarketVerifyTransferComeInTransferNewCeo" */'views/market-verify/transfer/come-in/transfer-newCeo')
const MarketVerifyTransferComeInTransferSure = () => import(/* webpackChunkName: "MarketVerifyTransferComeInTransferSure" */'views/market-verify/transfer/come-in/transfer-sure')
const MarketVerifyTransferComeOut = () => import(/* webpackChunkName: "MarketVerifyTransferComeOut" */'views/market-verify/transfer/come-out/index')
const MarketVerifyTransferComeOutOwner = () => import(/* webpackChunkName: "MarketVerifyTransferComeOutOwner" */'views/market-verify/transfer/come-out/owner')
const MarketVerifyTransferComeOutOutHr = () => import(/* webpackChunkName: "MarketVerifyTransferComeOutOutHr" */'views/market-verify/transfer/come-out/come-outHr')
const MarketVerifyTransferComeOutOutCEO = () => import(/* webpackChunkName: "MarketVerifyTransferComeOutOutCEO" */'views/market-verify/transfer/come-out/come-outCeo')
const MarketVerifyTransferComeOutOutSure = () => import(/* webpackChunkName: "MarketVerifyTransferComeOutOutSure" */'views/market-verify/transfer/come-out/come-outSure')
const MarketVerifyTransferHeadSure = () => import(/* webpackChunkName: "MarketVerifyTransferHeadSure" */'views/market-verify/transfer/head-sure/index')
const MarketVerifyTransferHeadSureOwner = () => import(/* webpackChunkName: "MarketVerifyTransferHeadSureOwner" */'views/market-verify/transfer/head-sure/owner')
const MarketVerifyTransferHeadSureOutHr = () => import(/* webpackChunkName: "MarketVerifyTransferHeadSureOutHr" */'views/market-verify/transfer/head-sure/head-outHr')
const MarketVerifyTransferHeadSureOutCEO = () => import(/* webpackChunkName: "MarketVerifyTransferHeadSureOutCEO" */'views/market-verify/transfer/head-sure/head-outCeo')
const MarketVerifyTransferHeadSureOutSure = () => import(/* webpackChunkName: "MarketVerifyTransferHeadSureOutSure" */'views/market-verify/transfer/head-sure/head-outSure')
// 报表中心
const Temporary = () => import(/* webpackChunkName: "Temporary" */'views/temporary/index')
const TemporaryManger = () => import(/* webpackChunkName: "TemporaryManger" */'views/temporary/report-manage')
const TemporaryManger2 = () => import(/* webpackChunkName: "TemporaryManger2" */'views/temporary/report-manage2')
const TemporaryAdd = () => import(/* webpackChunkName: "TemporaryAdd" */'views/temporary/report-add')
const TemporaryEdit = () => import(/* webpackChunkName: "TemporaryEdit" */'views/temporary/report-edit')
const TemporaryDetail = () => import(/* webpackChunkName: "TemporaryDetail" */'views/temporary/report-detail')
const TemporaryReport = () => import(/* webpackChunkName: "TemporaryReport" */'views/temporary/report-report')
const ReportMent = () => import(/* webpackChunkName: "ReportMent" */'views/reportment/index')
const ReportMove = () => import(/* webpackChunkName: "ReportMove" */'views/reportment/move/index')
const ReportMoveAdd = () => import(/* webpackChunkName: "ReportMoveAdd" */'views/reportment/move/add')
const ReportMoveReduce = () => import(/* webpackChunkName: "ReportMoveReduce" */'views/reportment/move/reduce')
const ReportMoveMove = () => import(/* webpackChunkName: "ReportMoveMove" */'views/reportment/move/move')
const ReportMain = () => import(/* webpackChunkName: "ReportMain" */'views/reportment/main/index')
const ReportManPower = () => import(/* webpackChunkName: "ReportManPower" */'views/reportment/manPower/index')
// 人事线报表
const ReportMarketMain = () => import(/* webpackChunkName: "ReportMarketMain" */'views/reportment/market/main')
const ReportMarketMainDetail = () => import(/* webpackChunkName: "ReportMarketMainDetail" */'views/reportment/market/mainDetail')
const ReportMarketSystem = () => import(/* webpackChunkName: "ReportMarketSystem" */'views/reportment/market/system')
const ReportMarketMove = () => import(/* webpackChunkName: "ReportMarketMove" */'views/reportment/market/move')
const ReportMarketMoveAdd = () => import(/* webpackChunkName: "ReportMarketMoveAdd" */'views/reportment/market/move/add')
const ReportMarketMoveReduce = () => import(/* webpackChunkName: "ReportMarketMoveReduce" */'views/reportment/market/move/reduce')
const ReportMarketMoveMove = () => import(/* webpackChunkName: "ReportMarketMoveMove" */'views/reportment/market/move/move')
const ReportMarketMoveManPower = () => import(/* webpackChunkName: "ReportMarketMoveManPower" */'views/reportment/market/manPower')
/* 人员变化(环比) */
const ReporMonthCompare = () => import(/* webpackChunkName: "ReporMonthCompare" */'views/reportment/person/index')

// 自定义报表
const ReportCustom = () => import(/* webpackChunkName: "ReportCustom" */'views/reportment/custom/index')
const Salary = () => import(/* webpackChunkName: "Salary" */'views/salary/index')
const Wage = () => import(/* webpackChunkName: "Wage" */'views/salary/wage/index')
const AnnualLeave = () => import(/* webpackChunkName: "AnnualLeave" */'views/salary/annualLeave/index')
const AnnualMag = () => import(/* webpackChunkName: "annualMag" */'views/salary/annualLeave/annualMag')
const AnnualRecord = () => import(/* webpackChunkName: "AnnualRecord" */'views/salary/annualLeave/annualRecord')
const PeopleCount = () => import(/* webpackChunkName: "peopleCount" */'views/salary/annualLeave/peopleCount')
const AnnualOverview = () => import(/* webpackChunkName: "AnnualOverview" */'views/salary/annualLeave/annualOverview')
const DetailAnnualOverview = () => import(/* webpackChunkName: "DetailAnnualOverview" */'views/salary/annualLeave/detailAnnualMag')
const Welfare = () => import(/* webpackChunkName: "Welfare" */'views/welfare/index')
const GiftBag = () => import(/* webpackChunkName: "GiftBag" */'views/welfare/giftBag/index')
const GrantDetail = () => import(/* webpackChunkName: "GrantDetail" */'views/welfare/giftBag/grantDetail')
const GrantDetail1 = () => import(/* webpackChunkName: "GrantDetail1" */'views/welfare/grant/grantDetail')
const ReportList = () => import(/* webpackChunkName: "ReportList" */'views/welfare/giftBag/reportList')
const ReportList1 = () => import(/* webpackChunkName: "ReportList1" */'views/welfare/grant/reportList')
const Grant = () => import(/* webpackChunkName: "Grant" */'views/welfare/grant/index')
const NourishGold = () => import(/* webpackChunkName: "NourishGold" */'views/welfare/nourishGold/nourishGold')
const AddNourishGold = () => import(/* webpackChunkName: "AddNourishGold" */'views/welfare/nourishGold/addNourishGold')
const StudyGold = () => import(/* webpackChunkName: "StudyGold" */'views/welfare/studyGold/studyGold')
const AddStudyGold = () => import(/* webpackChunkName: "AddStudyGold" */'views/welfare/studyGold/addStudyGold')
const Setting = () => import(/* webpackChunkName: "Setting" */'views/setting/index')
const OriginTest = () => import(/* webpackChunkName: "OriginTest" */'views/setting/origin/test')
const SettingRole = () => import(/* webpackChunkName: "SettingRole" */'views/setting/role-setting/index')
// 邮箱模板
const SettingMail = () => import(/* webpackChunkName: "SettingMail" */'views/setting/mail/index')
const MailInterview = () => import(/* webpackChunkName: "MailInterview" */'views/setting/mail/interview')
const MailOffer = () => import(/* webpackChunkName: "MailOffer" */'views/setting/mail/offer')
// 自定义设置
const SettingCustom = () => import(/* webpackChunkName: "settingcustom" */ 'views/setting/custom/index')
const CustomCommon = () => import(/* webpackChunkName: "customcommon" */ 'views/setting/custom/common')
const CustomWageSeries = () => import(/* webpackChunkName: "customwageseries" */ 'views/setting/custom/wage-series')
const CustomWageOther = () => import(/* webpackChunkName: "customwageother" */ 'views/setting/custom/wage-other')
// 工资保准
const SettingWage = () => import(/* webpackChunkName: "SettingWage" */'views/setting/wage/index')
// 首页消息提醒
const HomeGiftBag = () => import(/* webpackChunkName: "HomeGiftBag" */'views/homepage/message/giftBag')
const HomeGrant = () => import(/* webpackChunkName: "HomeGrant" */'views/homepage/message/grant')
const WaitEmploy = () => import(/* webpackChunkName: "WaitEmploy" */'views/homepage/message/waitEmploy')
const StopEmploy = () => import(/* webpackChunkName: "StopEmploy" */'views/homepage/message/stopEmploy')
const WaitContract = () => import(/* webpackChunkName: "WaitContract" */'views/homepage/message/waitContract')
const StopContract = () => import(/* webpackChunkName: "StopContract" */'views/homepage/message/stopContract')
const ContinueContract = () => import(/* ContinueContract: "ContractPut" */'views/homepage/message/renewalContract')
const Cockpit = () => import(/* webpackChunkName: "Cockpit" */'views/homepage/cockpit')
// 获取版本更新的jsonp回调函数
window.getVersion = version => {
  if ((localStorage.frontendVersion && version !== localStorage.frontendVersion) || (window.frontendVersion && version !== window.frontendVersion)) {
    location.reload() // 刷新页面
  }
  localStorage.frontendVersion = version // 保存 以便下次使用判断
  window.frontendVersion = version // 保存 以便下次使用判断
}
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/404'
    },
    {
      path: '/',
      redirect: getToken('isLogin') ? '/homepage' : 'login'
    },
    {
      path: '/maintain',
      name: 'Maintain',
      component: () => import(/* webpackChunkName: "Maintain" */'views/maintain')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "Login" */'views/login')
    },
    {
      path: '/staffDetail',
      name: 'StaffDetail',
      component: () => import(/* webpackChunkName: "StaffDetail" */'views/staffDetail')
    },
    {
      path: '/whitePage',
      name: 'whitePage',
      component: () => import(/* webpackChunkName: "whitePage" */'views/whitePage')
    },
    {
      path: '/entryDetail',
      name: 'EntryDetail',
      component: () => import(/* webpackChunkName: "EntryDetail" */'views/entryDetail')
    },
    {
      path: '/below-ie8',
      name: 'BelowIe8',
      component: () => import(/* webpackChunkName: "BelowIe8" */'views/below-ie8')
    },
    {
      // path: '/home',
      path: '/',
      // name: '首页',
      meta: { title: '首页' },
      redirect: '/firstPage',
      component: () => import(/* webpackChunkName: "Home" */ 'views/home'),
      children: [
        {
          path: '/firstPage',
          meta: { title: '首页' },
          name: 'FirstPage',
          component: () => import(/* webpackChunkName: "FirstPage" */ '../views/firstPage')
        },
        {
          path: '/404',
          name: 'NotFound',
          component: () => import(/* webpackChunkName: "NotFound" */ 'views/404'),
          meta: { title: '错误页面' }
        },
        // {
        //   path: '/',
        //   redirect: '/homepage'
        // },
        {
          path: '/homepage',
          name: 'Index',
          meta: { title: '首页' },
          component: () => import(/* webpackChunkName: "Index" */'views/homepage/index'),
          children: [
            {
              path: '/',
              redirect: '/homepage/message/waitSocial'
            },
            {
              path: '/homepage/message/waitSocial',
              name: 'WaitSocial',
              meta: { title: '社保待参保' },
              component: () => import(/* webpackChunkName: "WaitSocial" */'views/personnal-information/social/waitSocial')
            },
            {
              path: '/homepage/message/stopSocial',
              name: '社保待停保',
              meta: { title: '社保待停保' },
              component: stopSocial
            },
            {
              path: '/homepage/message/waitProviden',
              name: '公积金待办理',
              meta: { title: '公积金待办理' },
              component: WaitProviden
            },
            {
              path: '/homepage/message/stopProviden',
              name: '公积金待停缴',
              meta: { title: '公积金待停缴' },
              component: StopProviden
            },
            {
              path: '/homepage/message/waitEmploy',
              name: '协议待签订',
              meta: { title: '协议待签订' },
              component: WaitEmploy
            },
            {
              path: '/homepage/message/stopEmploy',
              name: '协议待解除',
              meta: { title: '协议待解除' },
              component: StopEmploy
            },
            {
              path: '/homepage/message/waitContract',
              name: '合同待签订',
              meta: { title: '合同待签订' },
              component: WaitContract
            },
            {
              path: '/homepage/message/stopContract',
              name: '合同待解除',
              meta: { title: '合同待解除' },
              component: StopContract
            },
            {
              path: '/homepage/message/continueContract',
              name: '合同到期提醒',
              meta: { title: '合同到期提醒' },
              component: ContinueContract
            },
            {
              path: '/homepage/message/giftBag',
              name: '节日礼包上报提醒',
              meta: { title: '节日礼包上报提醒' },
              component: HomeGiftBag
            },
            {
              path: '/homepage/message/grant',
              name: '实物发放上报提醒',
              meta: { title: '实物发放上报提醒' },
              component: HomeGrant
            }
          ]
        },
        {
          path: '/homepage/cockpit',
          name: '驾驶舱',
          meta: { title: '驾驶舱' },
          component: Cockpit
        },
        {
          path: '/recruitment',
          // name: '招聘管理',
          meta: { title: '招聘管理' },
          component: Recruitment,
          children: [
            {
              path: '/',
              redirect: '/recruitment/post'
            },
            {
              path: '/recruitment/post',
              name: '职位',
              meta: { title: '职位' },
              component: RecruitmentPost
            },
            {
              path: '/recruitment/post/post-check/:postId',
              name: '职位查看',
              meta: { title: '职位查看' },
              component: PostCheck
            },
            {
              path: '/recruitment/post/post-add',
              name: '职位新增',
              meta: { title: '职位新增' },
              component: PostAdd
            },
            {
              path: '/recruitment/accept',
              // name: '应聘人员库',
              meta: { title: '人才库' },
              component: RecruitmentAccept,
              children: [
                {
                  path: '/',
                  redirect: '/recruitment/accept/all'
                },
                {
                  path: '/recruitment/accept/all',
                  name: AcceptAll,
                  meta: { title: '全部' },
                  component: AcceptAll
                },
                {
                  path: '/recruitment/accept/wait-interview',
                  name: AcceptWaitInterview,
                  meta: { title: '待面试' },
                  component: AcceptWaitInterview
                },
                {
                  path: '/recruitment/accept/entry',
                  name: AcceptEntry,
                  meta: { title: '入职审批' },
                  component: AcceptEntry
                },
                {
                  path: '/recruitment/accept/reserve',
                  name: AcceptReserve,
                  meta: { title: '储备' },
                  component: AcceptReserve
                },
                {
                  path: '/recruitment/accept/non-employment',
                  name: AcceptNonEmployment,
                  meta: { title: '不录用' },
                  component: AcceptNonEmployment
                },
                {
                  path: '/recruitment/accept/have-hired',
                  name: AcceptHaveHired,
                  meta: { title: '已录用' },
                  component: AcceptHaveHired
                },
                {
                  path: '/recruitment/accept/non-interview',
                  name: AcceptNonInterview,
                  meta: { title: '未面试' },
                  component: AcceptNonInterview
                }
              ]
            },
            {
              path: '/recruitment/accept/accept-check/:acceptId',
              name: '应聘人员库查看',
              meta: { title: '应聘人员库查看' },
              component: AcceptCheck
            },
            {
              path: '/recruitment/accept/accept-add',
              name: '应聘人员库新增',
              meta: { title: '应聘人员库新增' },
              component: AcceptAdd
            },
            {
              path: '/recruitment/accept/viewInvite',
              name: '面试邀约',
              meta: { title: '面试邀约' },
              component: ViewInvite
            },
            {
              path: '/recruitment/accept/accept-edit/:acceptId',
              name: '应聘人员库编辑',
              meta: { title: '应聘人员库编辑' },
              component: AcceptEdit
            },
            {
              path: '/recruitment/means',
              // name: '资料管理',
              meta: { title: '资料管理' },
              component: RecruitmentMeans,
              children: [
                {
                  path: '/',
                  redirect: '/recruitment/means/transfer'
                },
                {
                  path: '/recruitment/means/transfer',
                  // name: '资料移交',
                  meta: { title: '资料移交' },
                  component: MeansTransfer
                },
                {
                  path: '/recruitment/means/receive',
                  // name: '资料接受',
                  meta: { title: '资料接受' },
                  component: MeansReceive
                }
              ]
            },
            {
              path: '/recruitment/means/receive-detail',
              // name: '资料详情',
              meta: { title: '资料详情' },
              component: ReceiveDetail,
              children: [
                {
                  path: '/',
                  redirect: '/recruitment/means/receive-detail/labor/:meansId/:udtId'
                },
                {
                  path: '/recruitment/means/receive-detail/labor/:meansId/:udtId',
                  name: '资料详情劳动人事信息',
                  meta: { title: '资料详情劳动人事信息' },
                  component: ReceiveLabor
                },
                {
                  path: '/recruitment/means/receive-detail/personnal/:meansId/:udtId',
                  name: '资料详情个人档案',
                  meta: { title: '资料详情个人档案' },
                  component: ReceivePersonnal
                }
              ]
            }
          ]
        },
        {
          path: '/personnel-information',
          // name: '人事信息管理',
          meta: { title: '人事信息管理' },
          component: PersonnalInformation,
          children: [
            {
              path: '/',
              redirect: '/personnel-information/base'
            },
            {
              path: '/personnel-information/base/update/:id/:status',
              name: 'PersonnalBaseUpdate',
              meta: { title: '员工信息更新' },
              component: () => import(/* webpackChunkName: "PersonnalBaseUpdate" */ 'views/personnal-information/base/modifies/update')
            },
            {
              path: '/personnel-information/base/corrections/:id/:status',
              name: 'PersonnalBaseCorrections',
              meta: { title: '员工信息更正' },
              component: () => import(/* webpackChunkName: "PersonnalBaseCorrections" */ 'views/personnal-information/base/modifies/corrections')
            },
            {
              path: '/personnel-information/base',
              // name: 'PersonnalInformationBase',
              meta: { title: '员工基本信息管理' },
              component: PersonnalInformationBase,
              children: [
                {
                  path: '/',
                  redirect: '/personnel-information/base/on-job'
                },
                {
                  path: '/personnel-information/base/on-job',
                  name: 'PersonnalInformationBaseOnJob',
                  meta: { title: '在职人员' },
                  component: PersonnalInformationBaseOnJob
                },
                {
                  path: '/personnel-information/base/quit-job',
                  name: 'PersonnalInformationBaseOnQuit',
                  meta: { title: '离职人员' },
                  component: PersonnalInformationBaseOnQuit
                }
              ]
            },
            {
              path: '/personnel-information/changeData',
              meta: { title: '更新/更正查询' },
              component: PersonnalInformationChangeData,
              children: [
                {
                  path: '/',
                  redirect: '/personnel-information/changeData/updates'
                },
                {
                  path: '/personnel-information/changeData/updates',
                  name: 'PersonnalInformationSearchUpdates',
                  meta: { title: '更新' },
                  component: PersonnalInformationChangeDataUpdates
                },
                {
                  path: '/personnel-information/changeData/incorrect',
                  name: 'PersonnalInformationSearchIncorrect',
                  meta: { title: '更正' },
                  component: PersonnalInformationChangeDataIncorrect
                }
              ]
            },
            {
              path: '/personnel-information/add',
              meta: { title: '员工基本信息新增' },
              name: 'PersonEntryAdd',
              component: PersonEntryAdd
            },
            {
              path: '/personnel-information/base/base-check',
              // name: '员工基本信息详情',
              meta: { title: '员工基本信息详情' },
              component: BaseCheck,
              children: [
                {
                  path: '/',
                  redirect: '/personnel-information/base/base-check/labor/:baseId/:status'
                },
                {
                  path: '/personnel-information/base/base-check/labor/:baseId/:status',
                  name: 'BaseLabor',
                  meta: { title: '员工基本信息劳动人事信息' },
                  component: BaseLabor
                },
                {
                  path: '/personnel-information/base/base-check/personnal/:baseId/:status',
                  name: '员工基本信息劳动个人档案',
                  meta: { title: '员工基本信息劳动个人档案' },
                  component: BasePersonnal
                },
                {
                  path: '/personnel-information/base/base-check/report/:baseId/:status',
                  name: '员工基本信息操作记录',
                  meta: { title: '员工基本信息操作记录' },
                  component: BaseReport
                },
                {
                  path: '/personnel-information/base/base-check/change/:baseId/:status',
                  name: '员工基本信息变动记录',
                  meta: { title: '员工基本信息变动记录' },
                  component: BaseChange
                },
                {
                  path: '/personnel-information/base/base-check/job/:baseId/:status',
                  name: '员工基本信息职务信息',
                  meta: { title: '员工基本信息职务信息' },
                  component: BaseJob
                },
                {
                  path: '/personnel-information/base/base-check/contract/:baseId/:status',
                  name: '员工基本信息劳动',
                  meta: { title: '员工基本信息劳动' },
                  component: BaseContract
                },
                {
                  path: '/personnel-information/base/base-check/funds/:baseId/:status',
                  name: '员工基本信息公积金',
                  meta: { title: '员工基本信息公积金' },
                  component: BaseFunds
                },
                {
                  path: '/personnel-information/base/base-check/social/:baseId/:status',
                  name: '员工基本信息社保参保',
                  meta: { title: '员工基本信息社保参保' },
                  component: BaseSocial
                },
                {
                  path: '/personnel-information/base/base-check/salary/:baseId/:status',
                  name: '员工基本信息薪酬',
                  meta: { title: '员工基本信息薪酬' },
                  component: BaseSalary
                },
                {
                  path: '/personnel-information/base/base-check/remark/:baseId/:status',
                  name: '员工基本信息备注',
                  meta: { title: '员工基本信息备注' },
                  component: BaseRemark
                }
              ]
            },
            {
              path: '/personnel-information/base/base-edit',
              // name: '员工基本信息编辑',
              meta: { title: '员工基本信息编辑' },
              component: BaseEdit,
              children: [
                {
                  path: '/',
                  redirect: '/personnel-information/base/base-edit/labor/:baseId/:status'
                },
                {
                  path: '/personnel-information/base/base-edit/labor/:baseId/:status',
                  name: 'BaseEditLabor',
                  meta: { title: '员工基本信息劳动人事信息编辑' },
                  component: BaseEditLabor
                },
                {
                  path: '/personnel-information/base/base-edit/personnal/:baseId/:status',
                  name: 'BaseEditPersonnal',
                  meta: { title: '员工基本信息劳动个人档案编辑' },
                  component: BaseEditPersonnal
                },
                {
                  path: '/personnel-information/base/base-edit/report/:baseId/:status',
                  name: 'BaseEditReport',
                  meta: { title: '员工基本信息操作记录' },
                  component: BaseReport
                },
                {
                  path: '/personnel-information/base/base-edit/change/:baseId/:status',
                  name: 'BaseEditChange',
                  meta: { title: '员工基本信息变动记录' },
                  component: BaseChange
                },
                {
                  path: '/personnel-information/base/base-edit/job/:baseId/:status',
                  name: 'BaseEditJob',
                  meta: { title: '员工基本信息职务信息' },
                  component: BaseJob
                },
                {
                  path: '/personnel-information/base/base-edit/contract/:baseId/:status',
                  name: 'BaseEditContract',
                  meta: { title: '员工基本信息劳动' },
                  component: BaseContract
                },
                {
                  path: '/personnel-information/base/base-edit/funds/:baseId/:status',
                  name: 'BaseEditFunds',
                  meta: { title: '员工基本信息公积金' },
                  component: BaseFunds
                },
                {
                  path: '/personnel-information/base/base-edit/social/:baseId/:status',
                  name: 'BaseEditSocial',
                  meta: { title: '员工基本信息社保参保' },
                  component: BaseSocial
                },
                {
                  path: '/personnel-information/base/base-edit/salary/:baseId/:status',
                  name: 'BaseEditSalary',
                  meta: { title: '员工基本信息薪酬' },
                  component: BaseSalary
                },
                {
                  path: '/personnel-information/base/base-edit/remark/:baseId/:status',
                  name: 'BaseEditRemark',
                  meta: { title: '员工基本信息备注' },
                  component: BaseRemark
                }
              ]
            },
            {
              path: '/personnel-information/job',
              name: '干部管理',
              meta: { title: '干部管理' },
              component: PersonnalInformationJob
            },
            {
              path: '/personnel-information/job-add/:jobId',
              name: '新增干部',
              meta: { title: '新增干部' },
              component: PersonnalInformationJobAdd
            },
            {
              path: '/personnel-information/job-check/:jobId/:jobUserId',
              name: '干部详情',
              meta: { title: '干部详情' },
              component: PersonnalInformationJobCheck
            },
            {
              path: '/personnel-information/job-exempt/:jobId/:jobUserId',
              name: '干部免除',
              meta: { title: '干部免除' },
              component: PersonnalInformationJobExempt
            },
            {
              path: '/personnel-information/contract',
              // name: '劳动关系管理',
              meta: { title: '劳动关系管理' },
              component: PersonnalInformationContract,
              children: [
                {
                  path: '/',
                  redirect: '/personnel-information/contract/contract'
                },
                {
                  path: '/personnel-information/contract/contract',
                  name: '劳动合同管理',
                  meta: { title: '劳动合同管理' },
                  component: ContractContract
                },
                {
                  path: '/personnel-information/contract/employment',
                  name: '就业协议管理',
                  meta: { title: '就业协议管理' },
                  component: ContractEmployment
                }
              ]
            },
            {
              path: '/personnel-information/contract/contract-edit/:contractId/:type',
              name: '合同编辑',
              meta: { title: '合同编辑' },
              component: ContractEdit
            },
            {
              path: '/personnel-information/contract/contract-check/:contractId',
              name: '合同详情',
              meta: { title: '合同详情' },
              component: ContractCheck
            },
            {
              path: '/personnel-information/contract/contract-put/:contractId/:userId/:cancelTime/:contractSub',
              name: '解除合同打印',
              meta: { title: '解除合同打印' },
              component: ContractPut
            },

            /* 社保待遇 */
            {
              path: '/personnel-information/security',
              meta: { title: '社保待遇管理' },
              component: getSecurityIndex,
              children: [
                {
                  path: '/',
                  redirect: '/personnel-information/security'
                },
                {
                  path: '/personnel-information/security/securityTransfer',
                  name: '社保转移',
                  meta: { title: '社保转移' },
                  component: getSecurityTransfer
                },
                {
                  path: '/personnel-information/security/securityRetiree',
                  name: '退休管理',
                  meta: { title: '退休管理' },
                  component: getSecurityRetiree
                },
                {
                  path: '/personnel-information/security/stationedHospital',
                  name: '驻外定点医院',
                  meta: { title: '驻外定点医院' },
                  component: getStationedHospital
                },
                {
                  path: '/personnel-information/security/medicalReimbursement',
                  name: '医疗报销人员',
                  meta: { title: '医疗报销人员' },
                  component: getMedicalReimbursement
                },
                {
                  path: '/personnel-information/security/birthTreatment',
                  name: '生育待遇',
                  meta: { title: '生育待遇' },
                  component: getBirthTreatment
                },
                {
                  path: '/personnel-information/security/occupationalInjury',
                  name: '工伤待遇',
                  meta: { title: '工伤待遇' },
                  component: getOccupationalInjury
                },
                {
                  path: '/personnel-information/security/unemploymentTreatment',
                  name: '失业待遇',
                  meta: { title: '失业待遇' },
                  component: getUnemploymentTreatment
                }

              ]
            },
            /* 公积金 */
            {
              path: '/personnel-information/providentFund',
              meta: { title: '社保公积金管理' },
              component: ProvidentFund,
              children: [
                {
                  path: '/',
                  redirect: '/personnel-information/providentFund'
                },
                {
                  path: '/personnel-information/providentFund/waitProviden',
                  name: '待办理',
                  meta: { title: '待办理' },
                  component: WaitProviden
                },
                {
                  path: '/personnel-information/providentFund/stopProviden',
                  name: '待停缴',
                  meta: { title: '待停缴' },
                  component: StopProviden
                },
                {
                  path: '/personnel-information/providentFund/allProviden',
                  name: '全部公积金',
                  meta: { title: '全部' },
                  component: AllProviden
                }
              ]
            },
            {
              path: '/personnel-information/providentFund/handleProviden/:Id/:type',
              name: '公积金办理',
              meta: { title: '公积金办理' },
              component: HandleProviden
            },
            {
              path: '/personnel-information/providentFund/recordSocial/:Id',
              name: '公积金缴纳记录',
              meta: { title: '公积金缴纳记录' },
              component: ProvidentFundRecordSocial
            },
            {
              path: '/personnel-information/providentFund/standard',
              name: '公积金标准调整',
              meta: { title: '标准调整' },
              component: ProvidentFundStandard
            },

            /* 社保 */
            {
              path: '/personnel-information/social',
              meta: { title: '社保参保管理' },
              component: PersonnalSocial,
              children: [
                {
                  path: '/',
                  redirect: '/personnel-information/social'
                },
                {
                  path: '/personnel-information/social/waitSocial',
                  name: 'WaitSocial',
                  meta: { title: '待参保' },
                  component: () => import(/* webpackChunkName: "WaitSocial" */'views/personnal-information/social/waitSocial')
                },
                {
                  path: '/personnel-information/social/stopSocial',
                  name: '待停保',
                  meta: { title: '待停保' },
                  component: stopSocial
                },
                {
                  path: '/personnel-information/social/allSocial',
                  name: '全部社保',
                  meta: { title: '全部' },
                  component: allSocial
                }
              ]
            },
            {
              path: '/personnel-information/social/social-check/:Id/:type',
              name: '社保参保查看',
              meta: { title: '社保参保查看' },
              component: checkSocial
            },
            {
              path: '/personnel-information/social/recordSocial/:Id',
              name: '缴费记录',
              meta: { title: '缴费记录' },
              component: recordSocial
            },
            {
              path: '/personnel-information/social/standard',
              name: '社保标准调整',
              meta: { title: '标准调整' },
              component: Standard
            }
          ]
        },
        {
          path: '/verify',
          meta: { title: '我的审核' },
          component: Verify,
          children: [
            {
              path: '/',
              redirect: '/verify/entry'
            },
            {
              path: '/verify/examine',
              meta: { title: '已审核列表' },
              component: SolveOffer,
              children: [
                {
                  path: '/verify/examine/offer',
                  meta: { title: '发offer' },
                  name: 'OfferSend',
                  component: OfferSend
                }
              ]
            }
          ]
        },
        {
          path: '/verify',
          // name: '我的审核',
          meta: { title: '我的审核' },
          component: Verify,
          children: [
            {
              path: '/',
              redirect: '/verify/entry'
            },
            {
              path: '/verify/entry',
              meta: { title: '入职审核' },
              component: VerifyEntry,
              children: [
                {
                  path: '/',
                  redirect: '/verify/entry/owner'
                },
                {
                  path: '/verify/entry/owner',
                  meta: { title: '我发起的' },
                  name: 'VerifyEntryOwner',
                  component: VerifyEntryOwner
                },
                {
                  path: '/verify/entry/employment',
                  meta: { title: '录用' },
                  name: 'VerifyEntryEmployment',
                  component: VerifyEntryEmployment
                },
                {
                  path: '/verify/entry/recheck',
                  meta: { title: '录用复核' },
                  name: 'VerifyEntryRecheck',
                  component: VerifyEntryRecheck
                },
                {
                  path: '/verify/entry/entry',
                  meta: { title: '入职' },
                  name: 'VerifyEntryEntry',
                  component: VerifyEntryEntry
                },
                {
                  path: '/verify/entry/review-entry',
                  meta: { title: '入职复核' },
                  name: 'VerifyEntryReviewEntry',
                  component: VerifyEntryReviewEntry
                }
              ]
            },
            {
              path: '/common-verify/entry/entry-detail/:acceptId/:come',
              name: 'VerifyOwnerDetail',
              meta: { title: '入职审核详情' },
              component: VerifyOwnerDetail
            },
            {
              path: '/verify/entry/entry-check',
              // name: 'VerifyEntryCheck',
              meta: { title: '审批详情' },
              component: VerifyEntryCheck,
              children: [
                {
                  path: '/verify/entry/entry-check/approve/:employeeId/:exmineId/:exmineUserId/:exminePassKey/:exmineTaskId/:exminePid/:type/:backReason',
                  meta: { title: '审批详情审批意见' },
                  name: 'VerifyEntryCheckApprove',
                  component: VerifyEntryCheckApprove
                },
                {
                  path: '/verify/entry/entry-check/check-form/:employeeId/:exmineId/:exmineUserId/:exminePassKey/:exmineTaskId/:exminePid/:type/:backReason',
                  meta: { title: '审批详情登记表信息' },
                  name: 'VerifyEntryCheckForm',
                  component: VerifyEntryCheckForm
                }
              ]
            },
            {
              path: '/verify/entry/entry-option/:employeeId/:exmineId/:exmineUserId/:exminePassKey/:exmineTaskId/:exminePid/:type/:backReason',
              name: 'VerifyEntryOption',
              meta: { title: '入职审批录用审核' },
              component: VerifyEntryOption
            },
            {
              path: 'verify/exmine',
              name: 'EntryExmine',
              meta: { title: '入职审批' },
              component: EntryExmine
            },
            {
              path: '/come-verify/entry/entry-detail',
              meta: { title: '审批详情登记表信息' },
              component: VerifyEntryDetail,
              children: [
                {
                  // path: '/come-verify/entry-detail/labor',
                  path: '/come-verify/entry-detail/labor/:employeeId/:exmineId/:exmineUserId/:exminePassKey/:exmineTaskId/:exminePid/:type/:come/:actId',
                  name: 'VerifyEntryDetailLabor',
                  meta: { title: '入职审批劳动人事信息' },
                  component: VerifyEntryDetailLabor
                },
                {
                  // path: '/come-verfiy/entry/entry-detail/personnal',
                  path: '/come-verfiy/entry/entry-detail/personnal/:employeeId/:exmineId/:exmineUserId/:exminePassKey/:exmineTaskId/:exminePid/:type/:come/:actId',
                  name: 'VerifyEntryDetailPersonnal',
                  meta: { title: '入职审批个人档案' },
                  component: VerifyEntryDetailPersonnal
                }
              ]
            },
            {
              path: '/come-verify/entry/entry-finCheck',
              component: VerifyFnEntry,
              meta: { title: '入职审核详情' },
              children: [
                {
                  path: '/come-verify/verify/entry/entry-finCheck/labor/:employeeId/:exmineId/:exmineUserId/:exminePassKey/:exmineTaskId/:exminePid/:type/:come',
                  component: VerifyEntryLabor,
                  name: 'VerifyEntryLabor',
                  meta: { title: '入职审核劳动人事信息详情' }
                },
                {
                  path: '/come-verify/verify/entry/entry-finCheck/personnal/:employeeId/:exmineId/:exmineUserId/:exminePassKey/:exmineTaskId/:exminePid/:type/:come',
                  component: VerifyEntryPersonnal,
                  name: 'VerifyEntryPersonnal',
                  meta: { title: '入职审核个人档案详情' }
                }
              ]
            },
            {
              path: '/verify/leave/leaveMsg',
              name: '离职审核',
              meta: { title: '离职审核' },
              component: VerifyLeave
            },
            {
              path: '/verify/transfer/transferMsg',
              name: '调动审核',
              meta: { title: '调动审核' },
              component: VerifyTransfer
            },
            {
              path: '/verify/job',
              // name: '干部审核',
              meta: { title: '干部审核' },
              component: VerifyJob,
              children: [
                {
                  path: '/',
                  redirect: '/verify/job/addVerifyJob'
                },
                {
                  path: '/verify/job/addVerifyJob',
                  name: '新增干部审核',
                  meta: { title: '新增干部审核' },
                  component: VerifyJobAdd
                },
                {
                  path: '/verify/job/moveVerifyJob',
                  name: '免除干部审核',
                  meta: { title: '免除干部审核' },
                  component: VerifyJobMove
                }
              ]
            },
            {
              path: '/verify/job/checkVerifyJob/:jobId/:employeeId/:exmineId/:exmineUserId/:exminePassKey/:exmineTaskId/:exminePid',
              name: '新增干部详情审核',
              meta: { title: '新增干部详情审核' },
              component: VerifyJobAddCheck
            },
            {
              path: '/verify/job/checkMoveVerify/:jobId/:employeeId/:exmineId/:exmineUserId/:exminePassKey/:exmineTaskId/:exminePid',
              name: '免除干部详情审核',
              meta: { title: '免除干部详情审核' },
              component: VerifyJobMoveCheck
            },
            {
              path: '/verify/contract',
              // name: '劳动关系',
              meta: { title: '劳动关系' },
              component: VerifyContract,
              children: [
                {
                  path: '/',
                  redirect: '/verify/contract/changeContract'
                },
                {
                  path: '/verify/contract/changeContract',
                  name: '合同变更',
                  meta: { title: '合同变更' },
                  component: VerifyContractChange
                },
                {
                  path: '/verify/contract/moveContract',
                  name: '合同解除',
                  meta: { title: '合同解除' },
                  component: VerifyContractMove
                },
                {
                  path: '/verify/contract/cancelContract',
                  name: '作废',
                  meta: { title: '作废' },
                  component: VerifyContractCancel
                }
              ]
            },
            {
              path: '/verify/correct',
              meta: { title: '劳动关系' },
              component: VerifyCorrect,
              children: [
                {
                  path: '/',
                  redirect: '/verify/correct/started'
                },
                {
                  path: '/verify/correct/started',
                  name: '我发起的',
                  meta: { title: '我发起的' },
                  component: VerifyCorrectStarted
                },
                {
                  path: '/verify/correct/personalAudit',
                  name: '人事负责人审核',
                  meta: { title: '人事负责人审核' },
                  component: VerifyCorrectPersonal
                },
                {
                  path: '/verify/correct/groupAudit',
                  name: '集团总部审核',
                  meta: { title: '集团总部审核' },
                  component: VerifyCorrectGroup
                }
              ]
            }
          ]
        },
        {
          path: '/temporary',
          // name: '临时报表',
          meta: { title: '报表中心' },
          component: Temporary,
          children: [
            {
              path: '/',
              redirect: '/temporary/report-manage'
            },
            {
              path: '/temporary/report-manage',
              name: '报表管理',
              meta: { title: '报表管理' },
              component: TemporaryManger
            },
            {
              path: '/temporary/report-manage2',
              name: '报表管理（辖属公司）',
              meta: { title: '报表管理（辖属公司）' },
              component: TemporaryManger2
            },
            {
              path: '/temporary/report-add',
              name: '报表中心新增',
              meta: { title: '报表中心新增' },
              component: TemporaryAdd
            },
            {
              path: '/temporary/report-edit',
              name: '报表中心编辑',
              meta: { title: '报表中心编辑' },
              component: TemporaryEdit
            },
            {
              path: '/temporary/report-detail/:id/:name/:endTime/:tableName/:userType',
              name: '报表中心详情',
              meta: { title: '报表中心详情' },
              component: TemporaryDetail
            },
            {
              path: '/temporary/report-report/:id/:name/:endTime/:tableName',
              name: '报表中心上报',
              meta: { title: '报表中心上报' },
              component: TemporaryReport
            }
          ]
        },
        {
          path: '/market-verify',
          meta: { title: '营销人员审核' },
          // name: MarketVerify,
          component: MarketVerify,
          children: [
            {
              path: '/',
              redirect: '/market-verify/entry'
            },
            {
              path: '/market-verify/entry',
              meta: { title: '入职审核' },
              // name: MarketVerifyEntry,
              component: MarketVerifyEntry,
              children: [
                {
                  path: '/',
                  redirect: '/market-verify/entry/owner'
                },
                {
                  path: '/market-verify/entry/owner',
                  component: MarketVerifyEntryOwner,
                  meta: { title: '我发起的' },
                  name: 'MarketVerifyEntryOwner'
                },
                {
                  path: '/market-verify/entry/entry',
                  component: MarketVerifyEntryEntry,
                  meta: { title: '入职审核' },
                  name: 'MarketVerifyEntryEntry'
                },
                {
                  path: '/market-verify/entry/headquarters',
                  component: MarketVerifyEntryHeadquarters,
                  meta: { title: '总部审核' },
                  name: 'MarketVerifyEntryHeadquarters'
                }
              ]
            },
            {
              path: '/market-verify/entry/add',
              component: MarketEntryAdd,
              name: 'MarketEntryAdd',
              meta: { title: '营销人员入职新增' }
            },
            {
              path: '/market-verify/entry/review',
              component: MarketEntryReview,
              name: 'MarketEntryReview',
              meta: { title: '营销人员入职重新审核' }
            },
            {
              path: '/market-verify/entry/exmine',
              component: MarketEntryExmine,
              name: 'MarketEntryExmine',
              meta: { title: '营销人员入职审核' }
            },
            {
              path: '/market-verify/contract',
              // name: '劳动关系',
              meta: { title: '营销劳动审核' },
              component: marketVerifyContract,
              children: [
                {
                  path: '/',
                  redirect: '/market-verify/contract/change'
                },
                {
                  path: '/market-verify/contract/change',
                  name: '营销合同变更',
                  meta: { title: '营销合同变更' },
                  component: marketVerifyContractChange
                },
                {
                  path: '/market-verify/contract/move',
                  name: '营销合同解除',
                  meta: { title: '营销合同解除' },
                  component: marketVerifyContractMove
                },
                {
                  path: '/market-verify/contract/cancel',
                  name: '营销合同作废',
                  meta: { title: '营销合同作废' },
                  component: marketVerifyContractCancel
                }
              ]
            },
            {
              path: '/market-verify/correct',
              meta: { title: '更正审核' },
              component: marketVerifyCorrect,
              children: [
                {
                  path: '/',
                  redirect: '/market-verify/correct/started'
                },
                {
                  path: '/market-verify/correct/started',
                  name: '我发起的',
                  meta: { title: '我发起的' },
                  component: marketVerifyCorrectStarted
                },
                {
                  path: '/market-verify/correct/personal',
                  name: '人事负责人审核',
                  meta: { title: '人事负责人审核' },
                  component: marketVerifyCorrectPersonal
                },
                {
                  path: '/market-verify/correct/group',
                  name: '集团总部审核',
                  meta: { title: '集团总部审核' },
                  component: marketVerifyCorrectGroup
                }
              ]
            },
            /* 营销干部审核 */
            {
              path: '/market-verify/job',
              meta: { title: '营销干部审核' },
              component: marketVerifyJob,
              children: [
                {
                  path: '/',
                  redirect: '/market-verify/job/addVerifyJob'
                },
                {
                  path: '/market-verify/job/addVerifyJob',
                  name: '营销新增干部审核',
                  meta: { title: '营销新增干部审核' },
                  component: marketVerifyJobAdd
                },
                {
                  path: '/market-verify/job/moveVerifyJob',
                  name: '营销免除干部审核',
                  meta: { title: '营销免除干部审核' },
                  component: marketVerifyJobMove
                }
              ]
            },
            {
              path: '/market-verify/job/checkVerifyJob/:jobId/:employeeId/:exmineId/:exmineUserId/:exminePassKey/:exmineTaskId/:exminePid',
              name: '营销新增干部详情审核',
              meta: { title: '营销新增干部详情审核' },
              component: marketVerifyJobAddCheck
            },
            {
              path: '/market-verify/job/checkMoveVerify/:jobId/:employeeId/:exmineId/:exmineUserId/:exminePassKey/:exmineTaskId/:exminePid',
              name: '营销免除干部详情审核',
              meta: { title: '营销免除干部详情审核' },
              component: marketVerifyJobMoveCheck
            },
            {
              path: '/market-verify/leave',
              meta: { title: '离职审核' },
              // name: 'MarketVerifyLeave',
              component: MarketVerifyLeave,
              children: [
                {
                  path: '/',
                  redirect: '/market-verify/leave/owner'
                },
                {
                  path: '/market-verify/leave/owner',
                  meta: { title: '我发起的' },
                  name: MarketVerifyLeaveOwner,
                  component: MarketVerifyLeaveOwner
                },
                {
                  path: '/market-verify/leave/market-ceo',
                  meta: { title: '市场总部CEO' },
                  name: MarketVerifyMarketCEO,
                  component: MarketVerifyMarketCEO
                },
                {
                  path: '/market-verify/leave/market-sure',
                  meta: { title: '总部确认' },
                  name: MarketVerifyMarketSure,
                  component: MarketVerifyMarketSure
                }
              ]
            },
            {
              path: '/market-verify/transfer',
              meta: { title: '调动审核' },
              // name: 'MarketVerifyTransfer',
              component: MarketVerifyTransfer,
              children: [
                {
                  path: '/',
                  redirect: '/market-verify/transfer/come-in'
                },
                {
                  path: '/market-verify/transfer/come-in',
                  meta: { title: '市场总部间' },
                  // name: 'MarketVerifyTransferComeIn',
                  component: MarketVerifyTransferComeIn,
                  children: [
                    {
                      path: '/',
                      redirect: '/market-verify/transfer/come-in/owner'
                    },
                    {
                      path: '/market-verify/transfer/come-in/owner',
                      meta: { title: '我发起的' },
                      name: 'MarketVerifyTransferComeInOwner',
                      component: MarketVerifyTransferComeInOwner
                    },
                    {
                      path: '/market-verify/transfer/come-in/transfer-ceo',
                      meta: { title: '总部CEO' },
                      name: 'MarketVerifyTransferComeInTransferCeo',
                      component: MarketVerifyTransferComeInTransferCeo
                    },
                    {
                      path: '/market-verify/transfer/come-in/transfer-newHr',
                      meta: { title: '新部门人事审核' },
                      name: 'MarketVerifyTransferComeInTransferNewHr',
                      component: MarketVerifyTransferComeInTransferNewHr
                    },
                    {
                      path: '/market-verify/transfer/come-in/transfer-newCeo',
                      meta: { title: '新部门CEO审核' },
                      name: 'MarketVerifyTransferComeInTransferNewCeo',
                      component: MarketVerifyTransferComeInTransferNewCeo
                    },
                    {
                      path: '/market-verify/transfer/come-in/transfer-sure',
                      meta: { title: '总部确认' },
                      name: 'MarketVerifyTransferComeInTransferSure',
                      component: MarketVerifyTransferComeInTransferSure
                    }
                  ]
                },
                {
                  path: '/market-verify/transfer/come-out',
                  meta: { title: '市场总部-外部' },
                  // name: 'MarketVerifyTransferComeOut',
                  component: MarketVerifyTransferComeOut,
                  children: [
                    {
                      path: '/',
                      redirect: '/market-verify/transfer/come-out/owner'
                    },
                    {
                      path: '/market-verify/transfer/come-out/owner',
                      meta: { title: '我发起的' },
                      component: MarketVerifyTransferComeOutOwner,
                      name: 'MarketVerifyTransferComeOutOwner'
                    },
                    {
                      path: '/market-verify/transfer/come-out/come-outHr',
                      meta: { title: '人事接收' },
                      component: MarketVerifyTransferComeOutOutHr,
                      name: 'MarketVerifyTransferComeOutOutHr'
                    },
                    {
                      path: '/market-verify/transfer/come-out/come-outCeo',
                      meta: { title: '市场总部CEO' },
                      component: MarketVerifyTransferComeOutOutCEO,
                      name: 'MarketVerifyTransferComeOutOutCEO'
                    },
                    {
                      path: '/market-verify/transfer/come-out/come-outSure',
                      meta: { title: '集团总部' },
                      component: MarketVerifyTransferComeOutOutSure,
                      name: 'MarketVerifyTransferComeOutOutSure'
                    }
                  ]
                },
                {
                  path: '/market-verify/transfer/head-sure',
                  meta: { title: '外部-市场总部' },
                  // name: 'MarketVerifyTransferHeadSure',
                  component: MarketVerifyTransferHeadSure,
                  children: [
                    {
                      path: '/',
                      redirect: '/market-verify/transfer/head-sure/owner'
                    },
                    {
                      path: '/market-verify/transfer/head-sure/owner',
                      meta: { title: '我发起的' },
                      component: MarketVerifyTransferHeadSureOwner,
                      name: 'MarketVerifyTransferHeadSureOwner'
                    },
                    {
                      path: '/market-verify/transfer/head-sure/head-outHr',
                      meta: { title: '人事接收' },
                      component: MarketVerifyTransferHeadSureOutHr,
                      name: 'MarketVerifyTransferHeadSureOutHr'
                    },
                    {
                      path: '/market-verify/transfer/head-sure/head-outCeo',
                      meta: { title: '市场总部CEO' },
                      component: MarketVerifyTransferHeadSureOutCEO,
                      name: 'MarketVerifyTransferHeadSureOutCEO'
                    },
                    {
                      path: '/market-verify/transfer/head-sure/head-outSure',
                      meta: { title: '集团总部' },
                      component: MarketVerifyTransferHeadSureOutSure,
                      name: 'MarketVerifyTransferHeadSureOutSure'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          path: '/reportment',
          // name: '统计分析',
          meta: { title: '报表中心' },
          component: ReportMent,
          children: [
            {
              path: '/',
              redirect: '/reportment/move'
            },
            {
              path: '/reportment/custom',
              meta: { title: '自定义报表' },
              component: ReportCustom
            },
            {
              path: '/reportment/move',
              // name: '统计分析异动表',
              meta: { title: '报表中心异动表' },
              component: ReportMove,
              children: [
                {
                  path: '/',
                  redirect: '/reportment/move/add'
                },
                {
                  path: '/reportment/move/add',
                  name: '异动表新增人员',
                  meta: { title: '异动表新增人员' },
                  component: ReportMoveAdd
                },
                {
                  path: '/reportment/move/reduce',
                  name: '异动表减少人员',
                  meta: { title: '异动表减少人员' },
                  component: ReportMoveReduce
                },
                {
                  path: '/reportment/move/move',
                  name: '异动表内部调动人员',
                  meta: { title: '异动表内部调动人员' },
                  component: ReportMoveMove
                }
              ]
            },
            {
              path: '/reportment/main',
              name: '报表中心主表',
              meta: { title: '报表中心主表' },
              component: ReportMain
            },
            {
              path: '/reportment/manPower',
              name: '报表中心人力数据分析',
              meta: { title: '报表中心人力数据分析' },
              component: ReportManPower
            },
            {
              path: '/reportment/monthCompare',
              name: '人员变化(环比)',
              meta: { title: '人员变化(环比)' },
              component: ReporMonthCompare
            },
            {
              path: '/reportment/market/main',
              name: 'ReportMarketMain',
              meta: { title: '主表（人事线）' },
              component: ReportMarketMain
            },
            {
              path: '/reportment/market/main/detail/:id/:startTime/:endTime',
              name: 'ReportMarketMainDetail',
              meta: { title: '主表（人事线）公司详情' },
              component: ReportMarketMainDetail
            },
            {
              path: '/reportment/market/main/deptDetail/:id/:startTime/:endTime',
              name: 'ReportMarketDeptDetail',
              meta: { title: '主表（人事线）部门详情' },
              component: () => import(/* webpackChunkName: "ReportMarketDeptDetail" */'views/reportment/market/deptDetail')
            },
            {
              path: '/reportment/market/move',
              // name: 'ReportMarketMove',
              meta: { title: '异动表（人事线）' },
              component: ReportMarketMove,
              redirect: '/reportment/market/move/add',
              // ReportMarketMoveAdd
              children: [
                {
                  path: '/reportment/market/move/add',
                  name: 'ReportMarketMoveAdd',
                  meta: { title: '新增人员' },
                  component: ReportMarketMoveAdd
                },
                {
                  path: '/reportment/market/move/reduce',
                  name: 'ReportMarketMoveReduce',
                  meta: { title: '减少人员' },
                  component: ReportMarketMoveReduce
                },
                {
                  path: '/reportment/market/move/move',
                  name: 'ReportMarketMoveMove',
                  meta: { title: '内部调动人员' },
                  component: ReportMarketMoveMove
                }
              ]
            },
            {
              path: '/reportment/market/manpower',
              name: 'ReportMarketMoveManPower',
              meta: { title: '人力数据分析（人事线）' },
              component: ReportMarketMoveManPower
            },
            {
              path: '/reportment/market/system',
              name: 'ReportMarketSystem',
              meta: { title: '组织架构（人事线）' },
              component: ReportMarketSystem
            }
          ]
        },
        {
          path: '/salary',
          meta: { title: '薪酬管理' },
          component: Salary,
          children: [
            {
              path: '/',
              redirect: '/salary/wage'
            },
            {
              path: '/salary/wage',
              name: '工资管理',
              meta: { title: '工资管理' },
              component: Wage
            },
            {
              path: '/salary/annualLeave',
              name: '年假管理',
              meta: { title: '年假管理' },
              component: AnnualLeave,
              children: [
                {
                  path: '/',
                  redirect: '/salary/annualLeave/annualMag'
                },
                {
                  path: '/salary/annualLeave/annualMag',
                  name: '年假管理',
                  meta: { title: '年假管理' },
                  component: AnnualMag
                },
                {
                  path: '/salary/annualLeave/annualRecord',
                  name: '年假记录',
                  meta: { title: '年假记录' },
                  component: AnnualRecord
                },
                {
                  path: '/salary/annualLeave/peopleCount',
                  name: '按人统计',
                  meta: { title: '按人统计' },
                  component: PeopleCount
                },
                {
                  path: '/salary/annualLeave/annualOverview',
                  name: '年假概况',
                  meta: { title: '年假概况' },
                  component: AnnualOverview
                },
                {
                  path: '/salary/annualLeave/detailAnnualMag',
                  name: '年假管理',
                  component: DetailAnnualOverview
                }
              ]
            }
          ]
        },
        {
          path: '/welfare',
          meta: { title: '福利管理' },
          component: Welfare,
          children: [
            {
              path: '/',
              redirect: '/welfare/giftBag'
            },
            {
              path: '/welfare/giftBag',
              name: '节日礼包',
              meta: { title: '节日礼包' },
              component: GiftBag
            },
            {
              path: '/welfare/giftBag/grantDetail',
              meta: { title: '发放详情' },
              component: GrantDetail
            },
            {
              path: '/welfare/grant/grantDetail',
              meta: { title: '发放详情' },
              component: GrantDetail1
            },
            {
              path: '/welfare/giftBag/reportList',
              meta: { title: '上报者名单' },
              component: ReportList
            },
            {
              path: '/welfare/grant',
              name: '实物发放',
              meta: { title: '实物发放' },
              component: Grant
            },
            {
              path: '/welfare/grant/reportList',
              meta: { title: '上报者名单' },
              component: ReportList1
            },
            {
              path: '/welfare/nourishGold',
              name: '营养金',
              meta: { title: '营养金' },
              component: NourishGold
            },
            {
              path: '/welfare/nourishGold/add',
              name: '新增营养金',
              meta: { title: '新增营养金' },
              component: AddNourishGold
            },
            {
              path: '/welfare/studyGold',
              name: '助学金',
              meta: { title: '助学金' },
              component: StudyGold
            },
            {
              path: '/welfare/studyGold/add',
              meta: { title: '新增助学金' },
              name: '新增助学金',
              component: AddStudyGold
            }
          ]
        },
        {
          path: '/setting',
          // name: '系统设置',
          meta: { title: '系统设置' },
          component: Setting,
          children: [
            {
              path: '/',
              redirect: '/setting/origin'
            },
            {
              path: '/setting/origin',
              name: 'SettingOrigin',
              meta: { title: '组织架构' },
              component: () => import(/* webpackChunkName: "SettingOrigin" */'views/setting/origin/index')
            },
            {
              path: '/setting/test',
              name: '测试组织架构',
              meta: { title: '测试组织架构' },
              component: OriginTest
            },
            {
              path: '/setting/role-setting',
              name: '角色设置',
              meta: { title: '角色设置' },
              component: SettingRole
            },
            {
              path: '/setting/role/add',
              name: 'RoleAdd',
              meta: { title: '角色新增' },
              component: () => import(/* webpackChunkName: "RoleAdd" */'views/setting/role-setting/add')
            },
            {
              path: '/setting/role/edit',
              name: 'RoleEdit',
              meta: { title: '角色编辑' },
              component: () => import(/* webpackChunkName: "RoleEdit" */'views/setting/role-setting/edit')
            },
            {
              path: '/setting/number-setting',
              name: 'AccountSetting',
              meta: { title: '账号管理' },
              component: () => import(/* webpackChunkName:"AccountSetting" */ 'views/setting/number-setting/index')
            },
            {
              path: '/setting/number/add',
              name: 'AccountAdd',
              meta: { title: '账号新增' },
              component: () => import(/* webpackChunkName: "AccountAdd" */'views/setting/number-setting/number-add')
            },
            {
              path: '/setting/number/edit/:id/:userId/:roleName/:status/:account/:remark',
              name: 'AccountEdit',
              meta: { title: '账号编辑' },
              component: () => import(/* webpackChunkName: "AccountEdit" */'views/setting/number-setting/number-detail')
            },
            {
              path: '/setting/mail-template',
              // name: 'mailTemplate',
              meta: { title: '邮件模板' },
              component: SettingMail,
              children: [
                {
                  path: '/',
                  redirect: '/setting/mail-template/interview'
                },
                {
                  path: '/setting/mail-template/interview',
                  name: 'MailInterview',
                  meta: { title: '面试邀请模板' },
                  component: MailInterview
                },
                {
                  path: '/setting/mail-template/offer',
                  name: 'MailOffer',
                  meta: { title: 'offer模板' },
                  component: MailOffer
                }
              ]
            },
            {
              path: '/setting/mail-template/interview/add',
              name: 'InterviewAdd',
              meta: { title: '面试邀请模板新增' },
              component: () => import(/* webpackChunkName: "InterviewAdd" */'views/setting/mail/interview/add')
            },
            {
              path: '/setting/mail-template/interview/edit/:id',
              name: 'InterviewEdit',
              meta: { title: '面试邀请模板编辑' },
              component: () => import(/* webpackChunkName: "InterviewEdit" */'views/setting/mail/interview/edit')
            },
            {
              path: '/setting/mail-template/offer/add',
              name: 'OfferAdd',
              meta: { title: 'offer模板模板新增' },
              component: () => import(/* webpackChunkName: "OfferAdd" */'views/setting/mail/offer/add')
            },
            {
              path: '/setting/mail-template/offer/edit/:id',
              name: 'OfferEdit',
              meta: { title: 'offer模板编辑' },
              component: () => import(/* webpackChunkName: "OfferEdit" */'views/setting/mail/offer/edit')
            },
            {
              path: '/setting/wage',
              name: 'WageAdministration',
              meta: { title: '工资标准' },
              component: SettingWage
            },
            {
              path: '/setting/custom',
              // name: 'SettingCustom',
              meta: { title: '自定义设置' },
              component: SettingCustom,
              children: [
                {
                  path: '/',
                  redirect: '/setting/custom/common'
                },
                {
                  path: '/setting/custom/common',
                  component: CustomCommon,
                  meta: { title: '常用字段设置' },
                  name: 'CustomCommon'
                },
                {
                  path: '/setting/custom/wage-series',
                  component: CustomWageSeries,
                  meta: { title: '工资系列设置' },
                  name: 'CustomWageSeries'
                },
                {
                  path: '/setting/custom/wage-other',
                  component: CustomWageOther,
                  meta: { title: '工资其它构成设置' },
                  name: 'CustomWageOther'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})
