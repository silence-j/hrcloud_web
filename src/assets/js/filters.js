/**
 * 一些公共的过滤方法
 * ***/
export const getTureFalse = (value) => {
  value = value + ''
  switch (value) {
    case '0':
      return '无'
    case '1':
      return '有'
  }
}
export const getSex = (sex) => {
  sex = sex + ''
  switch (sex) {
    case '0':
      return '女'
    case '1':
      return '男'
  }
}
export const getMarriage = (marriage) => {
  marriage = marriage + ''
  switch (marriage) {
    case '0':
      return '未婚'
    case '1':
      return '已婚'
    case '2':
      return '离异'
    case '3':
      return '再婚'
    case '4':
      return '丧偶'
  }
}
export const getPoltic = (poltic) => {
  poltic = poltic + ''
  switch (poltic) {
    case '0':
      return '群众'
    case '1':
      return '中共党员'
    case '2':
      return '预备党员'
    case '3':
      return '共青团员'
    case '4':
      return '民主党派'
    case '5':
      return '其它'
  }
}
export const getRelation = (relation) => {
  relation = relation + ''
  switch (relation) {
    case '0':
      return ''
    case '1':
      return '父亲'
    case '2':
      return '母亲'
    case '3':
      return '儿子'
    case '4':
      return '女儿'
    case '5':
      return '配偶'
    case '6':
      return '兄弟姐妹'
    case '7':
      return '兄弟姐妹之配偶'
    case '8':
      return '兄弟姐妹之子女'
  }
}
export const getEdu = (edu) => {
  edu = edu + ''
  switch (edu) {
    case '1':
      return '初中及以下'
    case '2':
      return '中专'
    case '3':
      return '高中'
    case '4':
      return '大专'
    case '5':
      return '本科'
    case '6':
      return '硕士'
    case '7':
      return '博士'
  }
}
export const getCandidateType = (type) => {
  type = type + ''
  switch (type) {
    case '1':
      return '社会人员'
    case '2':
      return '在校生'
    case '3':
      return '应届生'
    case '4':
      return '退休人员'
  }
}
export const getAcquaintance = (ace) => {
  ace = ace + ''
  switch (ace) {
    case '0':
      return '无'
    case '1':
      return '亲戚'
    case '2':
      return '朋友'
    case '3':
      return '同学'
  }
}
export const getRecuitStatus = (status) => {
  status = status + ''
  switch (status) {
    case '1':
      return '申请中'
    case '2':
      return '招聘中'
    case '3':
      return '撤销中'
    case '4':
      return '已撤销'
    case '5':
      return '已归档'
  }
}
export const getAcceptStatus = (per) => {
  per = per + ''
  switch (per) {
    case '0':
      return '待面试'
    case '1':
      return '不录用'
    case '3':
      return '入职审批'
    case '4':
      return '储备'
    case '5':
      return '录用'
    case '15':
      return '已录用'
    case '17':
      return '未面试'
  }
}
export const getbaseStatus = (str) => {
  str = str + ''
  switch (str) {
    case '5':
      return '正式员工'
    case '8':
      return '离职申请中'
    case '9':
      return '离职办理中'
    case '10':
      return '已离职'
    case '11':
      return '调动中'
    case '12':
      return '已调出'
    case '13':
      return '试用'
    case '14':
      return '实习'
  }
}
export const contractStatus = (str) => {
  str = str + ''
  switch (str) {
    case '1':
      return '待签订'
    case '2':
      return '办理中'
    case '3':
      return '履行中'
    case '4':
      return '已到期'
    case '5':
      return '已解除'
    case '6':
      return '待履行'
    case '7':
      return '解除中'
    case '8':
      return '变更中'
    case '9':
      return '作废中'
    case '10':
      return '已作废'
    case '11':
      return '不签订'
  }
}
export const getfilterNumber = (str) => {
  str = str + ''
  switch (str) {
    case '1':
      return '1期'
    case '2':
      return '2期'
    case '3':
      return '3期'
    case '4':
      return '固定期限'
  }
}
export const getfilterUtype = (str) => {
  str = str + ''
  switch (str) {
    case '0':
      return '否'
    case '1':
      return '是'
  }
}
export const getfilterworkStatus = (str) => {
  str = str + ''
  switch (str) {
    case '1':
      return '不定时工时制度'
    case '2':
      return '标准工时制度'
    case '3':
      return '综合计算工时制度'
  }
}
export const getfilterReasonStatus = (str) => {
  str = str + ''
  switch (str) {
    case '1':
      return '离职'
    case '2':
      return '调出'
    case '3':
      return '终止挂靠'
    case '4':
      return '其它'
  }
}
export const getfiltermoveReason = (str) => {
  str = str + ''
  switch (str) {
    case '1':
      return '辞职'
    case '2':
      return '终止'
    case '3':
      return '协商解除'
    case '4':
      return '合同终止'
    case '5':
      return '自动离职'
    case '6':
      return '自动终止'
    case '7':
      return '调动解除'
    case '8':
      return '调动终止'
  }
}
export const getMeansStatus = (status) => {
  status = status + ''
  switch (status) {
    case '0':
      return '待移交'
    case '1':
      return '待接收'
    case '2':
      return '已接收'
    case '3':
      return '驳回'
    case '4':
      return '已移交'
    case '6':
      return '自动终止'
  }
}
export const getEmployStatus = (status) => {
  status = status + ''
  switch (status) {
    case '6':
      return '待签定'
    case '1':
      return '已签订'
    case '2':
      return '不签订'
    case '3':
      return '已解除'
    case '4':
      return '待解除'
    case '5':
      return '已报到'
  }
}
export const getRelieveType = (type) => {
  type = type + ''
  switch (type) {
    case '0':
      return '解除'
    case '1':
      return '解除并改派'
  }
}
export const getRelieveReasonType = (type) => {
  type = type + ''
  switch (type) {
    case '1':
      return '原因1'
    case '2':
      return '原因2'
  }
}
export const getJobStatus = (type) => {
  type = type + ''
  switch (type) {
    case '0':
      return '主职'
    case '1':
      return '兼职'
  }
}
export const getfilterInsuranceStatus = (type) => {
  type = type + ''
  switch (type) {
    case '0':
      return '否'
    case '1':
      return '是'
    case '2':
      return '无'
  }
}
export const getfilterRelieveStatus = (type) => {
  type = type + ''
  switch (type) {
    case '1':
      return '已解除'
    case '0':
      return '未解除'
  }
}
export const getWorkStaue = (type) => {
  type = type + ''
  switch (type) {
    case '1':
      return '是'
    case '0':
      return '否'
  }
}
export const getEducationWay = (str) => {
  str = str + ''
  switch (str) {
    case '0':
      return '国家统招(全日制)'
    case '1':
      return '专升本'
    case '2':
      return '成人'
    case '3':
      return '远程'
    case '4':
      return '自考'
    case '5':
      return '留学'
  }
}
export const getCertificateStatus = (str) => {
  str = str + ''
  switch (str) {
    case '0':
      return '认证失败'
    case '1':
      return '认证成功'
  }
}
export const getInsuredInOld = (str) => {
  str = str + ''
  switch (str) {
    case '0':
      return '未缴纳'
    case '1':
      return '缴纳'
  }
}
export const getfilternature = (str) => {
  str = str + ''
  switch (str) {
    case '1':
      return '城镇'
    case '2':
      return '农村'
  }
}
export const getConctractWithOld = (str) => {
  str = str + ''
  switch (str) {
    case '0':
      return '未解除'
    case '1':
      return '解除'
  }
}
export const getfilterPeriodType = (str) => {
  str = str + ''
  switch (str) {
    case '0':
      return '固定'
    case '1':
      return '无固定'
  }
}

export const getTransferType = (str) => {
  str = str + ''
  switch (str) {
    case '1':
      return '转入'
    case '2':
      return '转出'
  }
}
/* 社保待遇 */
export const getRetiredSex = (str) => {
  str = str + ''
  switch (str) {
    case '1':
      return '男'
    case '2':
      return '女'
  }
}
// 年月日
export const getTime = (value) => {
  if (!value || value === '') {
    return ''
  }
  // 返回处理后的值
  let time = new Date(value)
  let year = time.getFullYear()
  let month = (time.getMonth() < 9 ? '0' : '') + (time.getMonth() + 1)
  let day = (time.getDate() < 10 ? '0' : '') + time.getDate()
  let hour = (time.getHours() < 10 ? '0' : '') + time.getHours()
  let minute = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes()
  let second = (time.getSeconds() < 10 ? '0' : '') + time.getSeconds()
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
}
