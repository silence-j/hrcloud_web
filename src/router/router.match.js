
export const routersConfig = {
  '/homepage/cockpit': '28',
  '/recruitment/post': '16',
  '/recruitment/accept': '17',
  '/personnel-information/contract': '11',
  '/salary/wage': '130',
  '/salary/annualLeave': '131',
  '/salary/annualLeave/annualMag': '131',
  '/salary/annualLeave/annualRecord': '131',
  '/salary/annualLeave/peopleCount': '131',
  '/salary/annualLeave/annualOverview': '131',
  '/salary/annualLeave/detailAnnualMag': '131',
  '/welfare/giftBag': '133',
  '/temporary/report-manage': '30',
  '/temporary/report-manage2': '31',
  '/reportment/main': '6',
  '/reportment/manPower': '7',
  '/reportment/market/system': '238',
  '/reportment/market/manPower': '237',
  '/reportment/custom': '212',
  '/reportment/monthCompare': '234',
  '/setting/origin': '2'
}
export const regRoutersConfig = {
  '/homepage/message': '251',
  '/recruitment/post': '16',
  '/recruitment/accept': '17',
  '/welfare/giftBag': '133',
  '/welfare/grant': '134',
  '/welfare/nourishGold': '135',
  '/welfare/studyGold': '136',
  '/recruitment/means': '23',
  '/personnel-information/base': '9',
  '/personnel-information/add': '9',
  '/personnel-information/job': '10',
  '/personnel-information/contract': '11',
  '/personnel-information/social': '12',
  '/personnel-information/security': '111',
  '/personnel-information/providentFund': '13',
  '/personnel-information/changeData': '248',
  '/verify/entry': '18',
  '/verify/leave': '24',
  '/verify/transfer': '25',
  '/verify/job': '26',
  '/verify/contract': '27',
  '/verify/correct': '249',
  '/temporary/report-add': '30',
  '/reportment/move': '5',
  '/setting/role': '22',
  '/setting/number': '3',
  '/temporary/report-edit': '30',
  '/temporary/report-report': '31',
  '/reportment/market/move': '236',
  '/reportment/market/main': '235',
  '/setting/mail': '150',
  '/market-verify/entry': '105',
  '/market-verify/contract': '109',
  '/market-verify/job': '108',
  '/market-verify/leave': '106',
  '/market-verify/transfer': '107',
  '/market-verify/correct': '250',
  '/verify/verify/exmine': '18',
  '/setting/wage': '151',
  '/setting/custom': '193'
}
export const verifyTransRoutersConfig = {
  '/market-verify/transfer/come-in': '1',
  '/market-verify/transfer/come-out': '2',
  '/market-verify/transfer/head-sure': '3'
}

export const routersMatchPath = (item) => {
  switch (Number(item.id)) {
    case 251:
      return { path: '/homepage', index: 251 }
    case 28:
      return { path: '/homepage/cockpit', index: 28 }
    case 16:
      return { path: '/recruitment/post', index: 16 }
    case 17:
      return { path: '/recruitment/accept', index: 17 }
    case 23:
      return { path: '/recruitment/means', index: 23 }
    case 9:
      return { path: '/personnel-information/base/on-job', index: 9 }
    case 10:
      return { path: '/personnel-information/job', index: 10 }
    case 11:
      return { path: '/personnel-information/contract', index: 11 }
    case 12:
      return { path: '/personnel-information/social', index: 12 }
    case 13:
      return { path: '/personnel-information/providentFund', index: 13 }
    case 111:
      return { path: '/personnel-information/security', index: 111 }
    case 248:
      return { path: '/personnel-information/changeData', index: 248 }
    case 130:
      return { path: '/salary/wage', index: 130 }
    case 131:
      return { path: '/salary/annualLeave/annualMag', index: 131 }
    case 133:
      return { path: '/welfare/giftBag', index: 133 }
    case 134:
      return { path: '/welfare/grant', index: 134 }
    case 135:
      return { path: '/welfare/nourishGold', index: 135 }
    case 136:
      return { path: '/welfare/studyGold', index: 136 }
    case 30:
      return { path: '/temporary/report-manage', index: 30 }
    case 31:
      return { path: '/temporary/report-manage2', index: 31 }
    case 6:
      return { path: '/reportment/main', index: 6 }
    case 5:
      return { path: '/reportment/move', index: 5 }
    case 7:
      return { path: '/reportment/manPower', index: 7 }
    case 212:
      return { path: '/reportment/custom', index: 212 }
    case 234:
      return { path: '/reportment/monthCompare', index: 234 }
    case 235:
      return { path: '/reportment/market/main', index: 235 }
    case 236:
      return { path: '/reportment/market/move', index: 236 }
    case 237:
      return { path: '/reportment/market/manPower', index: 237 }
    case 238:
      return { path: '/reportment/market/system', index: 238 }
    case 18:
      return { path: '/verify/entry', index: 18 }
    case 24:
      return { path: '/verify/leave', index: 24 }
    case 25:
      return { path: '/verify/transfer/transferMsg', index: 25 }
    case 29:
      return { path: '/verify/job', index: 26 }
    case 27:
      return { path: '/verify/contract/changeContract', index: 27 }
    case 249:
      return { path: '/verify/correct/started', index: 249 }
    case 105:
      return { path: '/market-verify/entry', index: 105 }
    case 106:
      return { path: '/market-verify/leave', index: 106 }
    case 107:
      return { path: '/market-verify/transfer', index: 107 }
    case 108:
      return { path: '/market-verify/job', index: 108 }
    case 109:
      return { path: '/market-verify/contract', index: 109 }
    case 250:
      return { path: '/market-verify/correct', index: 250 }
    case 2:
      return { path: '/setting/origin', index: 2 }
    case 3:
      return { path: '/setting/number-setting', index: 3 }
    case 22:
      return { path: '/setting/role-setting', index: 22 }
    case 150:
      return { path: '/setting/mail-template/interview', index: 150 }
    case 151:
      return { path: '/setting/wage', index: 15 }
    case 193:
      return { path: '/setting/custom/common', index: 193 }
    default: {
      return { path: '/business/phoneAppointment', index: 2 }
    }
  }
}
