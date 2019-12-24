import { getToken } from 'assets/js/util'
import { transData } from 'assets/js/common'
import { getAllOrganize } from 'static/api/common/common'
import Vue from 'vue'
/**
 * 左侧菜单权限数据
 * ***/
export const getLeftMenu = () => {
  let userLeftMenu = {
    index: {
      NAME: '系统首页',
      children: [],
      id: '19',
      parentId: 0,
      permission: 'home',
      sort_no: 100,
      type: 2,
      url: 'homepage',
      remark: '&#xe614;'
    },
    recruit: {
      NAME: '招聘管理',
      children: [],
      id: '15',
      parentId: 0,
      permission: 'recruit',
      sort_no: 200,
      type: 2,
      remark: '&#xe60d;',
      url: '#'
    },
    info: {
      NAME: '人事管理',
      children: [],
      id: '8',
      parentId: 0,
      permission: 'info',
      sort_no: 300,
      remark: '&#xe619;',
      type: 2,
      url: '#'
    },
    salary: {
      NAME: '薪酬管理',
      children: [],
      id: '4',
      parentId: 0,
      permission: 'salary',
      remark: '&#xe610;',
      sort_no: 400,
      type: 1,
      url: '#'
    },
    welfare: {
      NAME: '福利管理',
      children: [],
      id: '132',
      parentId: 0,
      permission: 'welfare',
      remark: '&#xe610;',
      sort_no: 410,
      type: 1,
      url: '#'
    },
    report: {
      NAME: '报表中心',
      children: [],
      id: '29',
      parentId: 0,
      permission: 'report',
      remark: '&#xe61b;',
      sort_no: 500,
      type: 1,
      url: '#'
    },
    verify: {
      NAME: '我的审核',
      children: [],
      id: '14',
      parentId: 0,
      permission: 'act',
      remark: '&#xe617;',
      sort_no: 1400,
      type: 2,
      url: 'personnel-information/exmine-msg/come'
    },
    market: {
      NAME: '营销审核',
      children: [],
      id: '104',
      parentId: 0,
      permission: 'market',
      remark: '&#xe617;',
      sort_no: 1410,
      type: 1,
      url: ''
    },
    sys: {
      NAME: '系统设置',
      children: [],
      id: '1',
      parentId: 0,
      permission: 'sys',
      sort_no: 1500,
      type: 1,
      url: '#'
    }
  }
  let menus = getToken('meauList')
  if (menus) {
    let leftMenus = transData(Array.from(new Set(JSON.parse(menus))), 'id', 'parentId', 'children')
    leftMenus.forEach(menu => {
      if (menu.NAME === '系统首页') userLeftMenu.index = menu
      if (menu.NAME !== '系统首页' && menu.NAME === '驾驶舱') {
        userLeftMenu.index.children.push(menu)
      }
      if (menu.NAME === '招聘管理') userLeftMenu.recruit = menu
      if (menu.NAME !== '招聘管理' && (menu.NAME === '职位' || menu.NAME === '人才库' || menu.NAME === '资料移交')) {
        userLeftMenu.recruit.children.push(menu)
      }
      if (menu.NAME === '人事管理') userLeftMenu.info = menu
      if (menu.NAME !== '人事管理' && (menu.NAME === '员工基本信息管理' || menu.NAME === '干部管理' || menu.NAME === '劳动关系管理' || menu.NAME === '社保参保管理' || menu.NAME === '公积金管理' || menu.NAME === '社保待遇管理' || menu.NAME === '更新/更正查询')) {
        userLeftMenu.info.children.push(menu)
      }
      if (menu.NAME === '薪酬管理') userLeftMenu.salary = menu
      if (menu.NAME !== '薪酬管理' && (menu.NAME === '工资管理' || menu.NAME === '年假管理')) {
        userLeftMenu.salary.children.push(menu)
      }
      if (menu.NAME === '福利管理') userLeftMenu.welfare = menu
      if (menu.NAME !== '福利管理' && (menu.NAME === '节日礼包' || menu.NAME === '实物发放' || menu.NAME === '营养金' || menu.NAME === '助学金')) {
        userLeftMenu.welfare.children.push(menu)
      }
      if (menu.NAME === '报表中心') userLeftMenu.report = menu
      if (menu.NAME !== '报表中心' && (menu.NAME === '报表管理' || menu.NAME === '报表管理（辖属公司）' || menu.NAME === '异动表' || menu.NAME === '主表' || menu.NAME === '人力数据分析')) {
        userLeftMenu.report.children.push(menu)
      }
      if (menu.NAME === '我的审核') userLeftMenu.verify = menu
      if (menu.NAME !== '我的审核' && (menu.NAME === '入职管理' || menu.NAME === '离职审核' || menu.NAME === '调动审核' || menu.NAME === '干部审核' || menu.NAME === '劳动关系')) {
        userLeftMenu.verify.children.push(menu)
      }
      if (menu.NAME === '营销审核') userLeftMenu.market = menu
      if (menu.NAME !== '营销审核' && (menu.NAME === '入职审核' || menu.NAME === '离职审核' || menu.NAME === '调动审核' || menu.NAME === '干部审核' || menu.NAME === '劳动关系')) {
        userLeftMenu.market.children.push(menu)
      }
      if (menu.NAME === '系统设置') userLeftMenu.sys = menu
      if (menu.NAME !== '系统设置' && (menu.NAME === '组织架构' || menu.NAME === '角色管理' || menu.NAME === '账号管理')) {
        userLeftMenu.sys.children.push(menu)
      }
    })
    return userLeftMenu
  }
}
// 获取所有组织架构的parentId
export const allDeptPidArr = []
//  获取所有部门的名字
export const allDeptArr = []
// 获取所有部门全部名字
export const allNameDept = []
export const getAllDept = () => {
  if (getToken('token')) {
    getAllOrganize().then(data => {
      data.data.forEach(dept => {
        allDeptArr.push(dept)
        allDeptPidArr.push(dept.parentId)
        allNameDept.push({
          pid: dept.parentId,
          id: dept.id,
          fullPath: findAllName(qcArray(dept.fullPath.split('<').join('>').split('>')).sort((a, b) => a - b), data.data)
        })
      })
    })
  }
}

//  数组排序
export const compare = (property) => {
  return (a, b) => {
    let value1 = a[property]
    let value2 = b[property]
    return value1 - value2
  }
}
// 把数组转为字符串
export const getString = (arr) => {
  if (!arr) return
  let stringSplit = ''
  arr.forEach(ar => {
    stringSplit += ar + ' '
  })
  return stringSplit
}
// 数组去重
export const qcArray = (arr) => {
  var newArr = [arr[0]]
  for (var i = 1; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i])
    }
  }
  return newArr
}
//  删除数组中pid === id 的对象
export const delPid = (arr) => {
  var newArr = []
  for (var i = 0; i < arr.length; i++) {
    if (allDeptPidArr.indexOf(arr[i].id) === -1) {
      newArr.push(arr[i])
    }
  }
  return newArr
}
// 数组去空
export const delSpaceArray = (arr) => {
  arr.forEach(item => {
    if (item === '') {
      arr.splice(item, 1)
    }
  })
  return arr
}
//  去掉字符串最后一个符号 '-'拼接全地址
export const delLastStringFlag = (string) => {
  let valueLength = string.lastIndexOf('-')
  string = string.slice(0, valueLength)
  return string
}
export const findAllName = (arr, allArr) => {
  let fullName = ''
  arr.forEach(item => {
    allArr.forEach(dept => {
      if (dept.id === item) fullName += dept.name + '-'
    })
  })
  return delLastStringFlag(fullName)
}
// 数组转换为全路径的名字
export const getAllFullPathName = (arr, allFullPathNameString) => {
  if (!arr) return
  arr.forEach(ar => {
    allFullPathNameString += getFullName(delSpaceArray(Array.from(new Set(ar.split('<').join('>').split('>'))).sort((a, b) => a - b))) + ' '
  })
  return allFullPathNameString
}
export const getFullName = (arr) => {
  let fullName = ''
  arr.forEach(item => {
    allDeptArr.forEach(dept => {
      if (dept.id === item) fullName += dept.name + '-'
    })
  })
  return delLastStringFlag(fullName)
}
// 树形结构
export function treeToArray (data, parent, level, expandedAll) {
  let tmp = []
  Array.from(data).forEach(function (record) {
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandedAll)
    }
    if (parent) {
      Vue.set(record, '_parent', parent)
    }
    let _level = 0
    if (level !== undefined && level !== null) {
      _level = level + 1
    }
    Vue.set(record, '_level', _level)
    tmp.push(record)
    if (record.children && record.children.length > 0) {
      let children = treeToArray(record.children, record, _level, expandedAll)
      tmp = tmp.concat(children)
    }
  })
  return tmp
}
