import Pagination from 'components/Pagination'
import ChooseColumn from 'components/ChooseColumn'
import { timeZeroToString, timeToString } from 'assets/js/common'
import { getExmine } from 'assets/js/exmine'
import { getToken } from 'assets/js/util'
import { listByUserId } from 'static/api/common/common'
import { contractStatus, getfilterworkStatus } from 'assets/js/filters'
import { editContract, getOffsiteSave, startContract } from 'static/api/contract/contract'
import SearchDeptTree from 'components/SearchDeptTree'
import { mapGetters } from 'vuex'
export const waitContract = {
  data () {
    return {
      // 签订
      concludeForm: {
        id: '',
        userId: '',
        status: '',
        contractPeriod: ''
      },
      // 不签定
      UncancelVisible: false,
      UnconcludeForm: {
        id: '',
        userId: '',
        contractCancelReason: ''
      },
      // 办结
      BanjieForm: {
        id: '',
        status: '',
        userId: ''
      },
      // 取消
      CancelForm: {
        id: '',
        status: '',
        userId: ''
      },
      // 不签订原因
      resonSelect: [
        { value: '离职', label: '离职' },
        { value: '调出', label: '调出' },
        { value: '终止挂靠', label: '终止挂靠' },
        { value: '其它', label: '其它' }
      ],
      // 异地签
      SignVisible: false,
      SignForm: {
        orgName: '',
        signTime: ''
      },
      contractStatusNumber: '',
      orgDatas1: {
        filterName: '',
        orgId: '',
        dataTree: [],
        showTree: false,
        isLimit: '0',
        bindData: 'different'
      }
    }
  },
  methods: {
    //  签订
    concludeMsg (row) {
      this.concludeForm.userAdress = row.userAdress
      if (!this.concludeForm.userAdress) {
        this.$message.warning('请将信息填写完整才可进行签订操作!')
        return
      }
      this.concludeForm.userId = row.userId
      this.concludeForm.id = row.id
      this.$confirm('确定' + row.name + '的合同已打印，并且完成线下签订', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let preload = {
          id: this.concludeForm.id,
          status: 2,
          userId: this.concludeForm.userId
        }
        editContract(preload).then(res => {
          this.$message.success('操作成功')
          setTimeout(() => {
            this._getContractList()
          }, 500)
        })
      }).catch(() => {})
    },
    // 不签订原因
    UnconcludeMsg (row) {
      this.UncancelVisible = true
      this.UnconcludeForm.id = row.id
      this.UnconcludeForm.userId = row.userId
    },
    UnconcludeSave () {
      let preload = {
        id: this.UnconcludeForm.id,
        contractCancelReason: this.UnconcludeForm.contractCancelReason,
        status: 11,
        userId: this.UnconcludeForm.userId,
        noSignedRemark: this.UnconcludeForm.noSignedRemark
      }
      if (!this.UnconcludeForm.contractCancelReason) {
        this.$message.warning('请选择不签订原因!')
        return
      }
      editContract(preload).then(res => {
        this.$message.success('操作成功')
        setTimeout(() => {
          this._getContractList()
          this.UncancelVisible = false
        }, 500)
      })
    },
    // 办结
    BanjieMsg (row) {
      this.BanjieForm.id = row.id
      this.BanjieForm.userId = row.userId
      this.$confirm('确定' + row.name + '合同手续已办结，并且已盖章', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let preload = {
          id: this.BanjieForm.id,
          status: 6,
          userId: this.BanjieForm.userId
        }
        editContract(preload).then((res) => {
          this.$message.success('操作成功')
          setTimeout(() => {
            this._getContractList()
          }, 500)
        })
      }).catch(() => {})
    },
    // 取消
    CancelMsg (row) {
      this.CancelForm.id = row.id
      this.CancelForm.userId = row.userId
      this.$confirm('确定取消，重新打印并签订合同', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let preload = {
          id: this.CancelForm.id,
          status: 1,
          userId: this.CancelForm.userId
        }
        editContract(preload).then(res => {
          this.$message.success('操作成功')
          setTimeout(() => {
            this._getContractList()
          }, 500)
        })
      }).catch(() => {})
    },
    // 异地签
    placeSignMsg (row) {
      this.SignVisible = true
      this.contractId = row.id
      this.contractStatusNumber = row.status
      setTimeout(() => {
        this.$refs.deptTree.clearSelectTree()
      })
    },
    SignSave () {
      const param = {
        id: this.contractId,
        contractSubjectId: this.orgDatas1.orgId,
        contractCancelTime: this.SignForm.signTime ? timeToString(this.SignForm.signTime) : ''
      }
      if (!this.orgDatas1.orgId) {
        this.$message.warning('请填写合同主体!')
        return false
      }
      if (this.contractStatusNumber === 3 || this.contractStatusNumber === 4) {
        if (!this.SignForm.signTime) {
          this.$message.warning('请填写解除时间!')
          return false
        }
      }
      getOffsiteSave(param).then(data => {
        this.$message.success('操作成功')
        this._getContractList()
        this.SignVisible = false
      })
    }
  },
  components: {
    SearchDeptTree
  }
}
export const stopContract = {
  data () {
    return {
      // 解除
      RemoveVisible: false,
      RemoveForm: {
        id: '',
        userId: '',
        contractCancelReason: '',
        contractCancelTime: '',
        reson: '',
        contractSubjectId: '',
        periodType: ''
      },
      RemoveSelect: [
        { value: 1, label: '辞职' },
        { value: 2, label: '终止' },
        { value: 3, label: '协商解除' },
        { value: 4, label: '合同终止' },
        { value: 5, label: '自动离职' },
        { value: 6, label: '自动终止' },
        { value: 7, label: '调动解除' },
        { value: 8, label: '调动终止' }
      ]
    }
  },
  methods: {
    // 解除
    RemoveMsg (row) {
      this.RemoveVisible = true
      this.RemoveForm.id = row.id
      this.RemoveForm.userId = row.userId
      this.RemoveForm.contractSubject = row.contractSubject
      this.RemoveForm.name = row.name
      this.RemoveForm.telephone = row.telephone
      this.RemoveForm.idCardNumber = row.idCardNumber
      this.RemoveForm.contractNumber = row.contractNumber
      this.RemoveForm.contractPeriod = row.contractPeriod
      this.RemoveForm.contractBeginDate = row.contractBeginDate
      this.RemoveForm.contractEndDate = row.contractEndDate
      this.RemoveForm.workSchedule = row.workSchedule
      this.RemoveForm.salary = row.salary
      this.RemoveForm.trySalary = row.trySalary
      this.RemoveForm.workContent = row.workContent
      this.RemoveForm.workAdress = row.workAdress
      this.RemoveForm.userAdress = row.userAdress
      this.RemoveForm.zipCode = row.zipCode
      // this.RemoveForm.contractCancelReason = row.contractCancelReason
      this.RemoveForm.contractCancelReason = ''
      this.RemoveForm.contractCancelTime = ''
      // this.RemoveForm.contractCancelTime = row.contractCancelTime
      this.RemoveForm.reason = ''
      this.RemoveForm.contractSubjectId = row.contractSubjectId
      this.RemoveForm.periodType = row.periodType
      this.deptNo = row.oldSubjectId
    },
    RemoveSave () {
      let RemoveParams = {
        userId: getToken('loginId'),
        actType: 'contractRelease',
        id: this.RemoveForm.id,
        employeeId: this.RemoveForm.userId,
        deptNo: this.deptNo,
        name: this.RemoveForm.name,
        telephone: this.RemoveForm.telephone,
        idNo: this.RemoveForm.idCardNumber,
        contractSubject: this.RemoveForm.contractSubject,
        contractNumber: this.RemoveForm.contractNumber,
        contractPeriod: this.RemoveForm.contractPeriod,
        contractBeginDate: this.RemoveForm.contractBeginDate,
        contractEndDate: this.RemoveForm.contractEndDate,
        workSchedule: this.RemoveForm.workSchedule,
        salary: this.RemoveForm.salary,
        trySalary: this.RemoveForm.trySalary,
        workContent: this.RemoveForm.workContent,
        workAdress: this.RemoveForm.workAdress,
        userAdress: this.RemoveForm.userAdress,
        zipCode: this.RemoveForm.zipCode,
        remark: this.RemoveForm.remark,
        contractCancelReason: this.RemoveForm.contractCancelReason,
        contractCancelTime: timeToString(this.RemoveForm.contractCancelTime),
        reson: this.RemoveForm.reson,
        periodType: this.RemoveForm.periodType,
        contractSubjectId: this.RemoveForm.contractSubjectId
      }
      let contractBeginDate = this.RemoveForm.contractBeginDate
      let newBeginDate = contractBeginDate ? new Date(contractBeginDate.replace('-', '/').replace('-', '/')) : ''
      let contractEndDate = this.RemoveForm.contractEndDate
      let newEndDate = contractEndDate ? new Date(contractEndDate.replace('-', '/').replace('-', '/')) : ''
      let newCancelTime = this.RemoveForm.contractCancelTime
      /* 判断是否有合同结束时间 */
      if (this.RemoveForm.contractEndDate) {
        if (newEndDate < newCancelTime || newBeginDate > newCancelTime) {
          this.$message.warning('解除时间段不正确!')
          return
        }
      } else {
        if (newBeginDate > newCancelTime) {
          this.$message.warning('解除时间段不正确!')
          return
        }
      }
      if (!this.RemoveForm.contractCancelTime) {
        this.$message.warning('请填写解除时间!')
        return
      }
      if (!this.RemoveForm.contractCancelReason) {
        this.$message.warning('请填写解除原因!')
        return
      }
      startContract(RemoveParams).then(data => {
        this.$message.success('操作成功')
        setTimeout(() => {
          this._getContractList()
        }, 400)
        this.RemoveVisible = false
      })
    }
  }
}
export const renewalContract = {
  filters: {
    filterworkStatus (str) {
      return getfilterworkStatus(str)
    }
  }
}
export const commonContract = {
  data () {
    return {
      contractList: [],
      searchForm: {
        keyword: '',
        status: '',
        endDate: ''
      },
      pageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      },
      chooseData: {
        chooseVisible: false,
        filedType: 'contract',
        fieldList: []
      },
      fieldList: [],
      prop: '',
      order: '',
      options: [],
      searchFlag: false
    }
  },
  components: {
    ChooseColumn,
    Pagination
  },
  computed: {
    ...mapGetters(['getDeepSearchOptions']),
    permission () {
      return getExmine().infoContractContract
    },
    contractListParams () {
      return {
        page: this.pageMsg.currentPage,
        size: this.pageMsg.pageSize,
        // sList: 1,
        keyword: this.searchForm.keyword,
        status: this.searchForm.status,
        endDate: this.searchForm.endDate ? timeZeroToString(this.searchForm.endDate) : null,
        prop: this.prop,
        order: this.order,
        options: this.options
      }
    }
  },
  methods: {
    chooseMsg () {
      this.chooseData.chooseVisible = true
      this.chooseData.fieldList = this.fieldList
      this.$refs.chooseColumn.chooseMsg()
    },
    /** 分页**/
    handleContractSizeChange (pageSize) {
      this.pageMsg.currentPage = 1
      this.pageMsg.pageSize = pageSize
      this._getContractList()
    },
    handleContractCurrentChange (currentPage) {
      this.pageMsg.currentPage = currentPage
      this._getContractList()
    },
    // 获取原来选择字段
    _getUserFiled () {
      let preload = {
        userId: getToken('loginId').toString(),
        type: 'contract'
      }
      listByUserId(preload).then(data => {
        if (data.result && data.result.length) {
          this.fieldList = []
          data.result.forEach((obj) => {
            this.fieldList.push({
              name: obj.name,
              prop: obj.prop,
              orderFlag: obj.orderFlag
            })
          })
          setTimeout(() => {
            this._getContractList()
          }, 400)
        }
      })
    },
    // 排序
    sortChange (column, prop, order) {
      if (column && column.prop) {
        this.prop = column.prop
        this.order = column.order
        this._getContractList()
      } else {
        this.prop = ''
        this.order = ''
        this._getContractList()
      }
    },
    // 查看
    checkContractMsg (row) {
      this.$router.push({
        name: '合同详情',
        params: {
          contractId: row.id
        },
        query: {
          come: this.$route.name,
          active: this.$route.query.active
        }
      })
    },
    editContractMsg (row, type) {
      this.$router.push({
        name: '合同编辑',
        params: {
          contractId: row.id,
          type: type
        },
        query: {
          come: this.$route.name,
          active: this.$route.query.active
        }
      })
    },
    // 通过bus获取搜索的值
    _getSearchDatas () {
      this.$bus.$on('contractSearch', (data, search) => {
        this.searchForm.keyword = data.keyword
        this.searchForm.status = data.status
        this.searchForm.endDate = data.endDate
        this.searchFlag = search
      })
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
        // this.contractListParams.options = value
        this.options = value
        this._getContractList()
      }
    }
  },
  filters: {
    filterStatus (str) {
      return contractStatus(str)
    }
  },
  created () {
    this._getUserFiled()
    this._getSearchDatas()
  }
}
