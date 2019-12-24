import { getAgreementDetail, getEmploySign, getEmployUnSign, getEmployOffsite, getEmploymentList, getEmployMove } from 'static/api/contract/contract'
import { getToken } from 'assets/js/util'
import { listByUserId, getSysDic } from 'static/api/common/common'
import { getEmployStatus, getRelieveType, getRelieveReasonType } from 'assets/js/filters'
import { getExmine } from 'assets/js/exmine'
import SearchDeptTree from 'components/SearchDeptTree'
import Pagination from 'components/Pagination.vue'
import ChooseColumn from 'components/ChooseColumn'
import { mapGetters } from 'vuex'
export const waitEmployment = {
  data () {
    return {
      // 异地签
      SignVisible: false,
      SignForm: {
        orgName: '',
        signTime: ''
      },
      orgDatas1: {
        filterName: '',
        orgId: '',
        dataTree: [],
        showTree: false,
        isLimit: '0',
        bindData: 'different'
      },
      // 签订
      cancelVisible: false,
      checkSelect: [
        { label: '员工本人已签', value: '0' },
        { label: '学校已盖章', value: '1' },
        { label: '单位已盖章 ', value: '2' },
        { label: '人才中心已盖章', value: '3' }
      ],
      // 不签订
      UncancelVisible: false,
      UnsignForm: {
        id: '',
        reason: ''
      },
      resonSelect: [
        { value: '离职', label: '离职' },
        { value: '调出', label: '调出' },
        { value: '终止挂靠', label: '终止挂靠' },
        { value: '其它', label: '其它' }
      ],
      contractId: ''
    }
  },
  components: {
    SearchDeptTree
  },
  methods: {
    /** 签订协议**/
    concludeMsg (row) {
      this.signForm.uwaId = row.uwaId
      this.signForm.checkedNames = []
      getAgreementDetail(row.uwaId).then((data) => {
        if (data.result) {
          this.signDetailDatas = data.result
        }
        if (this.signDetailDatas.employeeSigned === 1) {
          this.signForm.checkedNames.push('0')
        }
        if (this.signDetailDatas.schoolSigned === 1) {
          this.signForm.checkedNames.push('1')
        }
        if (this.signDetailDatas.unitSigned === 1) {
          this.signForm.checkedNames.push('2')
        }
        if (this.signDetailDatas.talentsSigned === 1) {
          this.signForm.checkedNames.push('3')
        }
        if (this.signDetailDatas.remark !== '' || data.data.remark !== null) {
          this.signForm.remark = data.result.remark
        }
      })
      this.cancelVisible = true
    },
    /** 不签订协议**/
    UnconcludeMsg (row) {
      this.UnsignForm.uwaId = row.uwaId
      this.UncancelVisible = true
    },
    /* 异地签 */
    placeSignMsg (row) {
      this.SignVisible = true
      this.contractId = row.uwaId
      setTimeout(() => {
        this.$refs.deptTree.clearSelectTree()
      })
    },
    concludeSave () {
      let SaveParams = {
        uwaId: this.signForm.uwaId,
        remark: this.signForm.remark,
        employeeSigned: this.signForm.checkedNames.indexOf('0') !== -1 ? 1 : 0,
        schoolSigned: this.signForm.checkedNames.indexOf('1') !== -1 ? 1 : 0,
        unitSigned: this.signForm.checkedNames.indexOf('2') !== -1 ? 1 : 0,
        talentsSigned: this.signForm.checkedNames.indexOf('3') !== -1 ? 1 : 0
      }
      getEmploySign(SaveParams).then(data => {
        this.$message.success('操作成功')
        setTimeout(() => {
          this.cancelVisible = false
          this._getEmploymentList()
        }, 500)
      })
    },
    concludeSure () {
      let SureParams = {
        uwaId: this.signForm.uwaId,
        remark: this.signForm.remark,
        employeeSigned: this.signForm.checkedNames.indexOf('0') !== -1 ? 1 : 0,
        schoolSigned: this.signForm.checkedNames.indexOf('1') !== -1 ? 1 : 0,
        unitSigned: this.signForm.checkedNames.indexOf('2') !== -1 ? 1 : 0,
        talentsSigned: this.signForm.checkedNames.indexOf('3') !== -1 ? 1 : 0,
        status: 1
      }
      getEmploySign(SureParams).then((data) => {
        this.$message.success('操作成功')
        setTimeout(() => {
          this.cancelVisible = false
          this._getEmploymentList()
        }, 500)
      })
    },
    UnconcludeSave () {
      let Params = {
        uwaId: this.UnsignForm.uwaId,
        relieveReason: this.UnsignForm.reason,
        noSignedRemark: this.UnsignForm.noSignedRemark
      }
      if (!this.UnsignForm.reason) {
        this.$message.warning('请填写原因')
        return
      }
      getEmployUnSign(Params).then((data) => {
        this.$message.success('操作成功')
        setTimeout(() => {
          this.UncancelVisible = false
          this._getEmploymentList()
        }, 500)
      })
    },
    SignSave () {
      let param = {
        id: this.contractId,
        agreeSubjectId: this.orgDatas1.orgId
      }
      if (!param.agreeSubjectId) {
        this.$message.warning('请选择签订主体!')
        return
      }
      getEmployOffsite(param).then(data => {
        this.$message.success('操作成功')
        this._getEmploymentList()
        this.SignVisible = false
      })
    },
    // 获取列表
    _getEmploymentList () {
      getEmploymentList(this.employParams).then((data) => {
        if (data.result) {
          if (data.result.records) {
            this.employmentListDatas = data.result.records
          }
          this.pageMsg.total = data.result.total
        }
      })
    }
  },
  created () {
    // this._getEmploymentList()
  }
}
export const stopEmploy = {
  data () {
    return {
      employeeInfo: '',
      schoolSignedInfo: '',
      unitSignedInfo: '',
      talentsInfo: '',
      moveVisible: false,
      moveForm: {
        uwaId: '',
        relieveType: '',
        reason: '',
        remark: ''
      },
      moveCheckVisible: false,
      cancelCheckVisible: false,
      MoveDetailDatas: [],
      reasonOption: []
    }
  },
  methods: {
    lookSignMsg (row) {
      this.cancelCheckVisible = true
      this.signForm.checkedNames = []
      getAgreementDetail(row.uwaId).then((data) => {
        if (data.result) {
          this.signDetailDatas = data.result
        }
        if (this.signDetailDatas.employeeSigned === 1) {
          this.employeeInfo = '员工本人已签'
        }
        if (this.signDetailDatas.schoolSigned === 1) {
          this.schoolSignedInfo = '学校已盖章'
        }
        if (this.signDetailDatas.unitSigned === 1) {
          this.unitSignedInfo = '单位已盖章'
        }
        if (this.signDetailDatas.talentsSigned === 1) {
          this.talentsInfo = '人才中心已盖章'
        }
      })
    },
    moveMsg (row) {
      this.moveForm.relieveType = ''
      this.moveForm.reason = ''
      this.moveForm.remark = ''
      this.moveForm.uwaId = row.uwaId
      this.moveVisible = true
      if (row.status === 5 && row.graduationDate) {
        this.graduationDate = new Date(row.graduationDate).getFullYear()
        this.nowDate = new Date().getFullYear()
        if (this.graduationDate < this.nowDate) {
          this.$message.warning('该人员已不是应届生，不能解除!')
          this.moveVisible = false
        }
      }
    },
    moveSave () {
      let Params = {
        uwaId: this.moveForm.uwaId,
        relieveType: Number(this.moveForm.relieveType),
        relieveReasonType: this.moveForm.reason,
        remark: this.moveForm.remark
      }
      if (!this.moveForm.relieveType) {
        this.$message.warning({
          message: '请选择类型'
        })
        return
      } else if (!this.moveForm.reason) {
        this.$message.warning('请选择原因')
        return
      }
      getEmployMove(Params).then((data) => {
        this.$message.success('操作成功')
        setTimeout(() => {
          this._getEmploymentList()
          this.moveVisible = false
        }, 500)
      })
    },
    // 解除详情
    lookMoveMsg (row) {
      this.moveCheckVisible = true
      getAgreementDetail(row.uwaId).then((data) => {
        if (data.result) {
          this.MoveDetailDatas = data.result
        }
      })
    },
    // 获取数字字典
    _getQueryClassList () {
      // 就业协议解除
      getSysDic('relieveReasonType').then((data) => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.reasonOption.push(item)
            }
          })
        }
      })
    }
  },
  created () {
    this._getQueryClassList()
  }
}
export const commonEmploy = {
  data () {
    return {
      signDetailDatas: [],
      chooseData: {
        chooseVisible: false,
        filedType: 'WorkAgreement',
        fieldList: []
      },
      fieldList: [],
      prop: '',
      order: '',
      employmentListDatas: [],
      options: this.getDeepSearchOptions,
      pageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      searchForm: {
        keyword: '',
        status: ''
      },
      signForm: {
        uwaId: '',
        remark: '',
        checkedNames: []
      },
      searchFlag: false
    }
  },
  computed: {
    permission () {
      return getExmine().infoContractEmployment
    },
    ...mapGetters(['getDeepSearchOptions'])
  },
  components: {
    Pagination,
    ChooseColumn
  },
  methods: {
    chooseMsg () {
      this.chooseData.chooseVisible = true
      this.chooseData.fieldList = this.fieldList
      this.$refs.chooseColumn.chooseMsg()
    },
    // 排序
    sortChange (column, prop, order) {
      if (column && column.prop) {
        let orderColumn = this.fieldList.filter(item => item.prop === column.prop)[0].orderColumn
        this.prop = orderColumn
        this.order = column.order
        this._getEmploymentList()
      } else {
        this.prop3 = ''
        this.order3 = ''
        this._getEmploymentList()
      }
    },
    // 获取原来选择字段
    _getUserFiled () {
      let preload = {
        userId: getToken('loginId').toString(),
        type: 'WorkAgreement'
      }
      listByUserId(preload).then(data => {
        this.fieldList = []
        if (data.result.length) {
          data.result.forEach((obj) => {
            this.fieldList.push({
              name: obj.name,
              prop: obj.prop,
              orderColumn: obj.orderColumn,
              orderFlag: obj.orderFlag
            })
          })
          setTimeout(() => {
            this._getEmploymentList()
          }, 400)
        }
      })
    },
    /** 分页**/
    handleEmploySizeChange (pageSize) {
      this.pageMsg.pageSize = pageSize
      this._getEmploymentList()
    },
    handleEmployCurrentChange (currentPage) {
      this.pageMsg.currentPage = currentPage
      this._getEmploymentList()
    },
    // 通过bus获取搜索的值
    _getSearchDatas () {
      this.$bus.$on('contractSearch', (data, search) => {
        this.searchForm.keyword = data.keyword
        this.searchForm.status = data.status
        this.searchFlag = search
      })
    }
  },
  filters: {
    filterEmployStatus (status) {
      return getEmployStatus(status)
    },
    filterRelieveType (value) {
      return getRelieveType(value)
    },
    filterRelieveReasonType (value) {
      return getRelieveReasonType(value)
    }
  },
  watch: {
    searchFlag (value) {
      if (value) {
        this.pageMsg.currentPage = 1
        this._getUserFiled()
        this.searchFlag = false
      }
    },
    getDeepSearchOptions (value) {
      if (value) {
        this.employParams.options = value
        this._getEmploymentList()
      }
    }
  },
  created () {
    this._getUserFiled()
    this._getSearchDatas()
  }
}
