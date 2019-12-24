import { getLeftMenu } from 'assets/js/getDatas'
//   权限配置细到每一个按钮操作
export const getExmine = () => {
  let indexExime = [] // 首页
  let recruitPost = [] // 职位
  let recruitAccept = [] // 人才库
  let recruitMeans = [] // 资料移交
  let recruitMeansReceive = [] // 资料移交-移交
  let recruitMeansTransfer = [] // 资料移交-接受
  let infoBase = [] // 员工基本信息管理
  let infoJob = [] // 干部管理
  let infoContract = [] // 劳动关系管理
  let infoContractContract = [] // 劳动合同管理
  let infoContractEmployment = [] // 就业协议管理
  let infoAllSocial = [] // 社保参保管理
  let infoAllProviden = [] // 公积金管理
  let allSecurityTransfer = [] // 社保待遇管理
  let salaryWage = [] // 工资管理
  let salaryAnnualLeave = []// 年假管理
  let welfareGiftBag = [] // 节日礼包
  let giftReportMg = [] // 节日礼包--发放管理
  let giftGrantMg = [] // 节日礼包--上报管理
  let welfareGrant = [] // 实物发放
  let welfwReportMg = [] // 实物发放--发放管理
  let welfGrantMg = [] // 实物发放--上报管理
  let welfareNourishGold = [] // 营养金
  let welfareStudyGold = [] // 助学金
  let reportManage = [] // 报表管理
  let reportMange2 = [] // 报表管理-辖属公司
  let reportCustom = [] // 报表管理-自定义报表
  let verifyEntry = []// 入职审核
  let verifyLeave = [] // 离职审核
  let verifyTransfer = [] // 调动审核
  let verifyJob = [] // 干部审核
  let verifyContract = [] // 劳动关系
  let marketVerifyEntry = [] // 营销入职审核
  let marketVerifyLeave = [] // 营销离职审核
  let marketVerifyTransfer = [] // 营销调动审核
  let marketVerifyJob = [] // 营销干部审核
  let marketVerifyContract = [] // 营销劳动关系
  let sysOrigin = [] // 组织架构
  let sysRole = [] // 角色管理
  let sysAccount = [] // 账号管理
  let sysMail = [] // 邮箱
  let sysWage = [] // 工资管理
  let customSetting = [] // 自定义设置
  let customCommon = []
  let customSalary = []
  let customOther = []
  let marketReportSystem = [] // 人事线组织架构
  let menus = getLeftMenu()
  if (menus) {
    if (menus.index && menus.index.children && menus.index.children.length) {
      indexExime = getChildrenExmine(menus.index.children)
    }
    if (menus.recruit && menus.recruit.children && menus.recruit.children.length) {
      menus.recruit.children.forEach(item => {
        if (item) {
          if (item.NAME === '职位') {
            recruitPost = getChildrenExmine(item.children)
          }
          if (item.NAME === '人才库') {
            recruitAccept = getChildrenExmine(item.children)
          }
          if (item.NAME === '资料移交') {
            if (item.children && item.children.length) {
              item.children.forEach(child => {
                if (child) {
                  recruitMeans.push(child.NAME)
                  if (child.NAME === '接收列表') {
                    recruitMeansReceive = getChildrenExmine(child.children)
                  }
                  if (child.NAME === '移交列表') {
                    recruitMeansTransfer = getChildrenExmine(child.children)
                  }
                }
              })
            }
          }
        }
      })
    }
    if (menus.info && menus.info.children && menus.info.children.length) {
      menus.info.children.forEach(item => {
        if (item) {
          if (item.NAME === '员工基本信息管理') {
            infoBase = getChildrenExmine(item.children)
          }
          if (item.NAME === '干部管理') {
            infoJob = getChildrenExmine(item.children)
          }
          if (item.NAME === '劳动关系管理') {
            if (item.children && item.children.length) {
              item.children.forEach(child => {
                infoContract.push(child.NAME)
                if (child) {
                  if (child.NAME === '劳动合同列表') {
                    infoContractContract = getChildrenExmine(child.children)
                  }
                  if (child.NAME === '就业协议列表') {
                    infoContractEmployment = getChildrenExmine(child.children)
                  }
                }
              })
            }
          }
          if (item.NAME === '社保参保管理') {
            infoAllSocial = getChildrenExmine(item.children)
          }
          if (item.NAME === '公积金管理') {
            infoAllProviden = getChildrenExmine(item.children)
          }
          if (item.NAME === '社保待遇管理') {
            allSecurityTransfer = getChildrenExmine(item.children)
          }
        }
      })
    }
    if (menus.salary && menus.salary.children && menus.salary.children.length) {
      menus.salary.children.forEach(item => {
        if (item.NAME === '工资管理') {
          salaryWage = getChildrenExmine(item.children)
        }
        if (item.NAME === '年假管理') {
          salaryAnnualLeave = getChildrenExmine(item.children)
        }
      })
    }
    if (menus.welfare && menus.welfare.children && menus.welfare.children.length) {
      menus.welfare.children.forEach(item => {
        if (item.NAME === '节日礼包') {
          welfareGiftBag = getChildrenExmine(item.children)
          item.children.forEach(child => {
            if (child.NAME === '管理者') {
              if (child.children) giftGrantMg = getChildrenExmine(child.children)
            }
            if (child.NAME === '上报者') {
              if (child.children) giftReportMg = getChildrenExmine(child.children)
            }
          })
        }
        if (item.NAME === '实物发放') {
          welfareGrant = getChildrenExmine(item.children)
          item.children.forEach(child => {
            if (child.NAME === '管理者') {
              if (child.children) welfGrantMg = getChildrenExmine(child.children)
            }
            if (child.NAME === '上报者') {
              if (child.children) welfwReportMg = getChildrenExmine(child.children)
            }
          })
        }
        if (item.NAME === '营养金') {
          welfareNourishGold = getChildrenExmine(item.children)
        }
        if (item.NAME === '助学金') {
          welfareStudyGold = getChildrenExmine(item.children)
        }
      })
    }
    if (menus.report && menus.report.children && menus.report.children.length) {
      menus.report.children.forEach(item => {
        if (item) {
          if (item.NAME === '报表管理') {
            reportManage = getChildrenExmine(item.children)
          }
          if (item.NAME === '报表管理（辖属公司）') {
            reportMange2 = getChildrenExmine(item.children)
          }
          if (item.NAME === '自定义报表') {
            reportCustom.push({
              frameUrl: item.remark
            })
          }
          if (item.NAME === '人事线组织架构管理') {
            marketReportSystem = getChildrenExmine(item.children)
          }
        }
      })
    }
    if (menus.verify && menus.verify.children && menus.verify.children.length) {
      menus.verify.children.forEach(item => {
        if (item) {
          if (item.NAME === '入职管理') {
            verifyEntry = getChildrenExmine(item.children)
          }
          if (item.NAME === '离职审核') {
            verifyLeave = getChildrenExmine(item.children)
          }
          if (item.NAME === '调动审核') {
            verifyTransfer = getChildrenExmine(item.children)
          }
          if (item.NAME === '干部审核') {
            verifyJob = getChildrenExmine(item.children)
          }
          if (item.NAME === '劳动关系') {
            verifyContract = getChildrenExmine(item.children)
          }
        }
      })
    }
    if (menus.market && menus.market.children && menus.market.children.length) {
      menus.market.children.forEach(item => {
        if (item) {
          if (item.NAME === '入职审核') {
            marketVerifyEntry = getChildrenExmine(item.children)
          }
          if (item.NAME === '离职审核') {
            marketVerifyLeave = getChildrenExmine(item.children)
          }
          if (item.NAME === '调动审核') {
            marketVerifyTransfer = getChildrenExmine(item.children)
          }
          if (item.NAME === '干部审核') {
            marketVerifyJob = getChildrenExmine(item.children)
          }
          if (item.NAME === '劳动关系') {
            marketVerifyContract = getChildrenExmine(item.children)
          }
        }
      })
    }
    if (menus.sys && menus.sys.children && menus.sys.children.length) {
      menus.sys.children.forEach(item => {
        if (item) {
          if (item.NAME === '组织架构') {
            sysOrigin = getChildrenExmine(item.children)
          }
          if (item.NAME === '角色管理') {
            sysRole = getChildrenExmine(item.children)
          }
          if (item.NAME === '账号管理') {
            sysAccount = getChildrenExmine(item.children)
          }
          if (item.NAME === '邮箱模板') {
            sysMail = getChildrenExmine(item.children)
          }
          if (item.NAME === '工资设置') {
            sysWage = getChildrenExmine(item.children)
          }
          if (item.NAME === '自定义设置') {
            customSetting = getChildrenExmine(item.children)
            if (item.children && item.children.length) {
              item.children.forEach(child => {
                infoContract.push(child.NAME)
                if (child) {
                  if (child.NAME === '常用字段') {
                    customCommon = getChildrenExmine(child.children)
                  }
                  if (child.NAME === '工资系列') {
                    customSalary = getChildrenExmine(child.children)
                  }
                  if (child.NAME === '工资其他构成') {
                    customOther = getChildrenExmine(child.children)
                  }
                }
              })
            }
          }
        }
      })
    }
  }
  /*  console.log(menus)
  console.log(indexExime)
  console.log(recruitPost)
  console.log(recruitAccept)
  console.log(recruitMeansReceive)
  console.log(recruitMeansTransfer)
  console.log(infoBase)
  console.log(infoJob)
  console.log(infoContractContract)
  console.log(infoContractEmployment)
  console.log(verifyJob)
  console.log(verifyContract)
  console.log(temporaryMax)
  console.log(temporaryMin)
  console.log(sysOrigin)
  console.log(sysRole)
 console.log(sysAccount) */
  /* console.log(allSecurityTransfer) */
  let exmineObj = {
    indexExime: indexExime,
    recruitPost: recruitPost,
    recruitAccept: recruitAccept,
    recruitMeans: recruitMeans,
    recruitMeansReceive: recruitMeansReceive,
    recruitMeansTransfer: recruitMeansTransfer,
    infoBase: infoBase,
    infoJob: infoJob,
    infoContract: infoContract,
    infoContractContract: infoContractContract,
    infoContractEmployment: infoContractEmployment,
    infoAllSocial: infoAllSocial,
    infoAllProviden: infoAllProviden,
    allSecurityTransfer: allSecurityTransfer,
    salaryWage: salaryWage,
    salaryAnnualLeave: salaryAnnualLeave,
    welfareGiftBag: welfareGiftBag,
    giftReportMg: giftReportMg,
    giftGrantMg: giftGrantMg,
    welfwReportMg: welfwReportMg,
    welfGrantMg: welfGrantMg,
    welfareGrant: welfareGrant,
    welfareNourishGold: welfareNourishGold,
    welfareStudyGold: welfareStudyGold,
    reportManage: reportManage,
    reportMange2: reportMange2,
    reportCustom: reportCustom,
    verifyEntry: verifyEntry,
    verifyLeave: verifyLeave,
    verifyTransfer: verifyTransfer,
    verifyJob: verifyJob,
    verifyContract: verifyContract,
    marketVerifyEntry: marketVerifyEntry,
    marketVerifyLeave: marketVerifyLeave,
    marketVerifyTransfer: marketVerifyTransfer,
    marketVerifyJob: marketVerifyJob,
    marketVerifyContract: marketVerifyContract,
    sysOrigin: sysOrigin,
    sysRole: sysRole,
    sysAccount: sysAccount,
    sysMail: sysMail,
    sysWage: sysWage,
    customSetting: customSetting,
    customCommon: customCommon,
    customSalary: customSalary,
    customOther: customOther,
    marketReportSystem: marketReportSystem
  }
  return exmineObj
}
export const getChildrenExmine = (arr) => {
  if (!arr || !arr.length) return
  let arrName = []
  arr.forEach(arr => {
    arrName.push(arr.NAME)
  })
  if (arr.children && arr.children.length) {
    this.getChildrenExmine(arr.children)
  }
  return arrName
}
