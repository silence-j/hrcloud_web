import { returnFloat, timeToString, timeZeroToString } from './common'
import { mapGetters } from 'vuex'
import { getToken } from './util'
import dayjs from 'dayjs'
// import {setGoBackFinRouter} from 'assets/js/mixins'
export const setCurrentInterview = {
  methods: {
    _setCurrentInterview () {
      this.$store.commit('SET_ACCEPT_TALENT_INTERVIEWVALUE', this.defaultInterview)
    }
  },
  created () {
    this._setCurrentInterview()
  }
}
export const setGoBackRouter = {
  // mixins: [setGoBackFinRouter],
  methods: {
    goBack () {
      let routeCome = this.$route.params.come
      this.$router.replace({ path: routeCome, query: { active: 'first' } })
    },
    // 判断路由来自哪里给不同的定位
    jugeSkipRouter () {
      let routeCome = this.$route.params.come
      if (routeCome.match(/^\/verify\/entry/)) {
        this.$store.commit('ACTIVEINDEX', '18')
        this.$store.commit('SET_COMPANY_TYPE', '')
      } else if (routeCome.match(/^\/personnel-information\/base/)) {
        this.$store.commit('ACTIVEINDEX', '9')
        this.orgDatas.bindData = 'noMarket'
        this.salarySelectForm.isSalaryStandar = ''
      } else if (routeCome.match(/^\/market-verify\/entry/)) {
        this.$store.commit('ACTIVEINDEX', '105')
        this.orgDatas.bindData = 'market'
        if (this.$route.query.opeator !== 'remine') {
          this.salarySelectForm.isSalaryStandar = ''
        }
        if (routeCome.match(/^\/market-verify\/entry\/entry/)) {
          this.salarySelectForm.isSalaryStandar = 1
        }
      //  this.salarySelectForm.isSalaryStandar = 1
      }
    },
    // 面包屑导航修改
    setBreadData () {
      let routeCome = this.$route.params.come
      if (routeCome.match(/^\/market-verify\/entry/)) {
        let array = [{ name: '首页', path: '/home' }, { name: '营销人员审核', path: '/market-verify' }, { name: '入职审核', path: '/market-verify/entry' }]
        let selfRouteMessage = []
        if (routeCome.match(/^\/market-verify\/entry\/entry/)) {
          selfRouteMessage = [{ name: '营销人员审核', path: this.$route.path }]
        } else if (routeCome.match(/^\/market-verify\/entry\/headquarters/)) {
          selfRouteMessage = [{ name: '营销人员复核', path: this.$route.path }]
        } else {
          selfRouteMessage = [{ name: '新增营销人员', path: this.$route.path }]
        }
        this.$store.commit('SET_BREADCRUMB_DATA', array.concat(selfRouteMessage))
      } else if (routeCome.match(/^\/personnel-information\/base/)) {
        let array = [{ name: '首页', path: '/home' }, { name: '人事信息管理', path: '/personnel-information' }, { name: '员工基本信息管理', path: '/personnel-information/base' }]
        let selfRouteMessage = [{ name: '新增员工', path: this.$route.path }]
        this.$store.commit('SET_BREADCRUMB_DATA', array.concat(selfRouteMessage))
      }
    }
  },
  created () {
    this.jugeSkipRouter()
    this.setBreadData()
  }
}
export const setGoBackFinRouter = {
  methods: {
    goBack () {
      let routeCome = this.$route.params.come
      this.$router.replace(routeCome)
    },
    // 判断路由来自哪里给不同的定位
    jugeSkipRouter () {
      let routeCome = this.$route.params.come
      if (routeCome.match(/^\/verify\/entry/)) {
        this.$store.commit('ACTIVEINDEX', '18')
      } else if (routeCome.match(/^\/personnel-information\/base/)) {
        this.$store.commit('ACTIVEINDEX', '9')
      } else if (routeCome.match(/^\/market-verify\/entry/)) {
        this.$store.commit('ACTIVEINDEX', '105')
      }
    }
  },
  created () {
    this.jugeSkipRouter()
  }
}
// 薪资mixin
export const setSalaryType = {
  computed: {
    ...mapGetters(['getSelectCompanyWageArr'])
  },
  methods: {
    _getAllowance (salaryObject, precent) {
      if (!salaryObject) return ''
      let strSpliting = ''
      if (this.getSelectCompanyWageArr.indexOf('1') !== -1 && (salaryObject.postAllowance || salaryObject.postAllowance === 0)) {
        strSpliting += '岗位津贴:' + salaryObject.postAllowance * precent + '元/月,'
      }
      if (this.getSelectCompanyWageArr.indexOf('2') !== -1 && (salaryObject.ageAllowance || salaryObject.ageAllowance === 0)) {
        strSpliting += '工龄津贴:' + salaryObject.ageAllowance * precent + '元/月,'
      }
      if (this.getSelectCompanyWageArr.indexOf('3') !== -1 && (salaryObject.dutyAllowance || salaryObject.dutyAllowance === 0)) {
        strSpliting += '职务津贴:' + salaryObject.dutyAllowance * precent + '元/月,'
      }
      if (this.getSelectCompanyWageArr.indexOf('4') !== -1 && (salaryObject.technicalAllowance || salaryObject.technicalAllowance === 0)) {
        strSpliting += '技术津贴:' + salaryObject.technicalAllowance * precent + '元/月,'
      }
      if (this.getSelectCompanyWageArr.indexOf('5') !== -1 && (salaryObject.skillAllowance || salaryObject.skillAllowance === 0)) {
        strSpliting += '技能津贴:' + salaryObject.skillAllowance * precent + '元/月,'
      }
      if (this.getSelectCompanyWageArr.indexOf('6') !== -1 && (salaryObject.gradeAllowance || salaryObject.gradeAllowance === 0)) {
        strSpliting += '等级津贴:' + salaryObject.gradeAllowance * precent + '元/月,'
      }
      if (this.getSelectCompanyWageArr.indexOf('7') !== -1 && (salaryObject.other1 || salaryObject.other1 === 0)) {
        strSpliting += '其他1:' + salaryObject.other1 * precent + '元/月,'
      }
      if (this.getSelectCompanyWageArr.indexOf('8') !== -1 && (salaryObject.other2 || salaryObject.other2 === 0)) {
        strSpliting += '其他2:' + salaryObject.other2 * precent + '元/月,'
      }
      if (this.getSelectCompanyWageArr.indexOf('9') !== -1 && (salaryObject.other3 || salaryObject.other1 === 3)) {
        strSpliting += '其他3:' + salaryObject.other3 * precent + '元/月,'
      }
      return strSpliting.substring(0, strSpliting.lastIndexOf(','))
    },
    getSalaryStructure () {
      // console.log(this.typeAndSalaryForm)
      // if (this.typeAndSalaryForm && this.typeAndSalaryForm.candidateType === 2) this.typeAndSalaryForm.noProbation = true
      let jugeSalaryType = this.salarySelectForm.firstSalary
      let subsidySalary = this._getAllowance(this.salarySelectForm.salaryMonthInfo, 1)
      let warehouse = this.salarySelectForm.isWarehouse ? '兼职仓管' : ''
      switch (jugeSalaryType) {
        case '1':
          this.salarySelectForm.salaryMonthInfo.salary = returnFloat(this.salarySelectForm.baseSalary / 12)
          this.salarySelectForm.salaryMonthInfo.expenditure = returnFloat(this.salarySelectForm.operationSalary / 12)
          this.formSalaryParams = this.salarySelectForm.firstSalaryName + ',' +
            this.salarySelectForm.SecondSalaryName + ',' +
            this.salarySelectForm.thirdSalaryName + ',' +
            this.salarySelectForm.fourSalaryName + ',' +
            '工资标准' + this.salarySelectForm.baseSalary + '元/年' + '-' +
            returnFloat(this.salarySelectForm.baseSalary / 12) + '元/月' + ',' +
            '业务经费' + this.salarySelectForm.operationSalary + '元/年' + '-' +
            returnFloat(this.salarySelectForm.operationSalary / 12) + '元/月' + ',' +
            subsidySalary
          break
        case '137':
          this.salarySelectForm.salaryMonthInfo.salary = this.salarySelectForm.baseSalary
          this.formSalaryParams = this.salarySelectForm.firstSalaryName + ',' +
            '工资标准' + this.salarySelectForm.baseSalary + '元/月' + '-' +
            returnFloat(this.salarySelectForm.baseSalary * 12) + '元/年' + ',' +
            subsidySalary
          break
        case '138':
          this.salarySelectForm.salaryMonthInfo.salary = Number(this.salarySelectForm.countBasicsSalary) + Number(this.salarySelectForm.levelSalary) + Number(this.salarySelectForm.postTestSalary)
          this.formSalaryParams = this.salarySelectForm.firstSalaryName + ',' +
            this.salarySelectForm.SecondSalaryName + ',' +
            this.salarySelectForm.thirdSalaryName + ',' +
            this.salarySelectForm.fourSalaryName + ',' +
            this.salarySelectForm.fiveSalaryName + ',' +
            warehouse + ',' +
            '基本工资' + this.salarySelectForm.countBasicsSalary + '元/月' + '-' +
            returnFloat(this.salarySelectForm.countBasicsSalary * 12) + '元/年' + ',' +
            '级别考核奖' + this.salarySelectForm.levelSalary + '元/月' + '-' +
            returnFloat(this.salarySelectForm.levelSalary * 12) + '元/年' + ',' +
            '岗位考核奖' + this.salarySelectForm.postTestSalary + '元/月' + '-' +
            returnFloat(this.salarySelectForm.postTestSalary * 12) + '元/年' + ',' +
            subsidySalary
          break
        case '139':
          this.salarySelectForm.salaryMonthInfo.salary = returnFloat(this.salarySelectForm.baseSalary / 12)
          this.salarySelectForm.salaryMonthInfo.expenditure = returnFloat(this.salarySelectForm.businessSalary / 12)
          this.formSalaryParams = this.salarySelectForm.firstSalaryName + ',' +
            '工资标准' + this.salarySelectForm.baseSalary + '元/年' + '-' +
            returnFloat(this.salarySelectForm.baseSalary / 12) + '元/月' + ',' +
            '业务经费' + this.salarySelectForm.businessSalary + '元/年' + '-' +
            returnFloat(this.salarySelectForm.businessSalary / 12) + '元/月' + ',' +
            subsidySalary
          break
      }
      this.$store.commit('SET_SALARY_STARDAND', this.formSalaryParams)
      this.$store.commit('SET_TRY_SALARY_STARDAND', this.probaSalaryParams) // SET_TRY_SALARY_STARDAND
    },
    getTrySalaryStructure () {
      let jugeTrySalaryType = this.trySalaryForm.firstSalary
      let trySubsidySalary = this._getAllowance(this.trySalaryForm.salaryMonthInfo, 1)
      let warehouse = this.trySalaryForm.isWarehouse ? '兼职仓管' : ''
      switch (jugeTrySalaryType) {
        case '1':
          this.trySalaryForm.salaryMonthInfo.salary = returnFloat(this.trySalaryForm.baseSalary / 12)
          this.trySalaryForm.salaryMonthInfo.expenditure = returnFloat(this.trySalaryForm.operationSalary / 12)
          this.probaSalaryParams = this.trySalaryForm.firstSalaryName + ',' +
          this.trySalaryForm.SecondSalaryName + ',' +
          this.trySalaryForm.thirdSalaryName + ',' +
          this.trySalaryForm.fourSalaryName + ',' +
          '工资标准' + this.trySalaryForm.baseSalary + '元/年' + '-' +
          returnFloat(this.trySalaryForm.baseSalary / 12) + '元/月' + ',' +
          '业务经费' + this.trySalaryForm.operationSalary + '元/年' + '-' +
          returnFloat(this.trySalaryForm.operationSalary / 12) + '元/月' + ',' +
          trySubsidySalary
          break
        case '137':
          this.trySalaryForm.salaryMonthInfo.salary = this.trySalaryForm.baseSalary
          this.probaSalaryParams = this.trySalaryForm.firstSalaryName + ',' +
          '工资标准' + this.trySalaryForm.baseSalary + '元/月' + '-' +
          returnFloat(this.trySalaryForm.baseSalary * 12) + '元/年' + ',' +
          trySubsidySalary
          break
        case '138':
          this.trySalaryForm.salaryMonthInfo.salary = Number(this.trySalaryForm.countBasicsSalary) + Number(this.trySalaryForm.levelSalary) + Number(this.salarySelectForm.postTestSalary)
          this.probaSalaryParams = this.trySalaryForm.firstSalaryName + ',' +
          this.trySalaryForm.SecondSalaryName + ',' +
          this.trySalaryForm.thirdSalaryName + ',' +
          this.trySalaryForm.fourSalaryName + ',' +
          this.trySalaryForm.fiveSalaryName + ',' +
          warehouse + ',' +
          '基本工资' + this.trySalaryForm.countBasicsSalary + '元/月' + '-' +
          returnFloat(this.trySalaryForm.countBasicsSalary * 12) + '元/年' + ',' +
          '级别考核奖' + this.trySalaryForm.levelSalary + '元/月' + '-' +
          returnFloat(this.trySalaryForm.levelSalary * 12) + '元/年' + ',' +
          '岗位考核奖' + this.trySalaryForm.postTestSalary + '元/月' + '-' +
          returnFloat(this.trySalaryForm.postTestSalary * 12) + '元/年' + ',' +
          trySubsidySalary
          break
        case '139':
          this.trySalaryForm.salaryMonthInfo.salary = returnFloat(this.trySalaryForm.baseSalary / 12)
          this.trySalaryForm.salaryMonthInfo.expenditure = returnFloat(this.trySalaryForm.businessSalary / 12)
          this.probaSalaryParams = this.trySalaryForm.firstSalaryName + ',' +
          '工资标准' + this.trySalaryForm.baseSalary + '元/年' + '-' +
          returnFloat(this.trySalaryForm.baseSalary / 12) + '元/月' + ',' +
          '业务经费' + this.trySalaryForm.businessSalary + '元/年' + '-' +
          returnFloat(this.trySalaryForm.businessSalary / 12) + '元/月' + ',' +
          trySubsidySalary
          break
      }
    }
  }
}

// 薪资的验证rules
export const entryRulesMixin = {
  data () {
    let validateExercitationEndDate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择实习结束时间'))
      } else if (value < this.typeAndSalaryForm.exercitationBeginTime) {
        callback(new Error('实习结束时间要大于实习开始时间!'))
      } else {
        callback()
      }
    }
    let validateProbationEndDate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择试用期结束时间'))
      } else if (value < this.typeAndSalaryForm.probationBeginTime) {
        callback(new Error('试用期结束时间要大于试用期开始时间!'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        exercitationBeginTime: { required: true, message: '请选择实习期开始时间', trigger: 'change', type: 'date' },
        exercitationEndTime: { validator: validateExercitationEndDate, required: true, trigger: 'change', type: 'date' },
        // exercitationEndTime: {required: true, message: '请选择试用期结束时间', trigger: 'change', type: 'date'},
        exercitationSalary: { required: true, message: '请填写实习期工资', trigger: 'blur' },
        workAgreement: { required: true, message: '是否签订就业协议', trigger: 'change' },
        probationBeginTime: { required: true, message: '请选择试用期开始时间', trigger: 'change', type: 'date' },
        probationEndTime: { validator: validateProbationEndDate, required: true, trigger: 'change', type: 'date' }
      }
    }
  }
}
// 入职各种参数mixin
export const getEntryParams = {
  methods: {
    getUserPersonalInfo () {
      let jobData = []
      let eduData = []
      let familyMember = []
      this.personData.familyForm.forEach((item) => {
        if (item.name || item.relation || item.workUnit || item.post || item.telephone || item.age) {
          familyMember.push({
            operator: getToken('loginId').toString(),
            id: item.id,
            userId: item.userId,
            name: item.name,
            relation: item.relation,
            age: item.age,
            workUnit: item.workUnit,
            post: item.post,
            telephone: item.telephone,
            type: item.type,
            isEmployee: item.isEmployee,
            isKeAbove: item.isKeAbove,
            marryDate: item.marryDate
          })
        }
      })
      this.personData.jobForm.forEach((item) => {
        if (item.startDate || item.endDate || item.workUnit || item.post || item.certifier || item.telephone) {
          jobData.push({
            operator: getToken('loginId').toString(),
            id: item.id,
            userId: item.userId,
            idCardNumber: item.idCardNumber,
            startDate: timeToString(item.startDate),
            endDate: timeToString(item.endDate),
            workUnit: item.workUnit,
            post: item.post,
            nature: item.nature,
            certifier: item.certifier,
            telephone: item.telephone,
            dimissionReason: item.dimissionReason
          })
        }
      })
      this.personData.resumeForm.forEach((item) => {
        if (item.startDate || item.endDate || item.school || item.major || item.studyMode || item.education || item.educationWay) {
          eduData.push({
            operator: getToken('loginId').toString(),
            id: item.id,
            idCardNumber: item.idCardNumber,
            userId: item.userId,
            startDate: timeToString(item.startDate),
            endDate: timeToString(item.endDate),
            school: item.school,
            major: item.major,
            studyMode: item.studyMode,
            education: item.education,
            educationWay: item.educationWay
          })
        }
      })
      /* 健康状况 */
      let healthList = []
      if (this.employeeId || this.$route.query.copyToken) {
        this.personData.healthForm.forEach(item => {
          healthList.push({
            id: item.id,
            deleteTag: item.deleteTag,
            dictId: item.dictId,
            status: item.status,
            text: item.status === 1 ? item.text : ''
          })
        })
      } else {
        this.personData.healthForm.forEach(item => {
          healthList.push({
            deleteTag: 0,
            dictId: item.id,
            status: item.status,
            text: item.status === 1 ? item.text : ''
          })
        })
      }
      let savePersonalParams = {
        'userBaseInfo': {
          'operator': getToken('loginId').toString(),
          'name': this.personData.personBaseForm.name,
          'idCardNumber': this.personData.personBaseForm.idCardNumber,
          'sex': this.personData.personBaseForm.sex,
          'formerName': this.personData.personBaseForm.formerName,
          'nature': this.personData.personBaseForm.nature,
          'nation': this.personData.personBaseForm.nation,
          'birthday': timeToString(this.personData.personBaseForm.birthday),
          'maritalStatus': this.personData.personBaseForm.maritalStatus,
          'politicsStatus': this.personData.personBaseForm.politicsStatus,
          'highestEducation': this.personData.personBaseForm.highestEducation,
          'major': this.personData.personBaseForm.major,
          'technicalTitle': this.personData.personBaseForm.technicalTitle,
          'schoolOfGraduation': this.personData.personBaseForm.schoolOfGraduation,
          'graduationDate': dayjs(this.personData.personBaseForm.graduationDate).format('YYYY-MM-DD'),
          'vocationalQualification': this.personData.personBaseForm.vocationalQualification,
          'highestEducationWay': this.personData.personBaseForm.highestEducationWay,
          'educationCertificateStatus': this.personData.personBaseForm.educationCertificateStatus,
          'technicalGrade': this.personData.personBaseForm.technicalGrade,
          'height': this.personData.personBaseForm.height,
          'weight': this.personData.personBaseForm.weight || '',
          'telephone': this.personData.personBaseForm.telephone,
          'mail': this.personData.personBaseForm.mail,
          'payCardNo': this.personData.personBaseForm.payCardNo,
          'openBank': this.personData.personBaseForm.openBank,
          'healthStatusList': healthList,
          'inZcBefore': this.personData.personBaseForm.inZcBefore,
          'id': !this.$route.query.copyToken ? this.employeeId : this.$store.state.entryDetailId.toString(),
          'contactAddressMod': {
            operator: getToken('loginId').toString(),
            id: this.personData.personBaseForm.contactAddressId,
            address: this.personData.personBaseForm.contactAddress,
            areaId: this.personData.areaCollections.contactAddressArea.areaId,
            areaName: this.personData.areaCollections.contactAddressArea.areaName,
            cityId: this.personData.areaCollections.contactAddressArea.cityId,
            cityName: this.personData.areaCollections.contactAddressArea.cityName,
            provinceId: this.personData.areaCollections.contactAddressArea.provinceId,
            provinceName: this.personData.areaCollections.contactAddressArea.provinceName
          },
          'idCardAddressMod': {
            operator: getToken('loginId').toString(),
            id: this.personData.personBaseForm.idCardAddressId,
            // address: this.idCardForm.address ? this.idCardForm.address : '',
            address: this.personData.personBaseForm.idCardAddress,
            areaId: this.personData.areaCollections.idCardAddressArea.areaId,
            areaName: this.personData.areaCollections.idCardAddressArea.areaName,
            cityId: this.personData.areaCollections.idCardAddressArea.cityId,
            cityName: this.personData.areaCollections.idCardAddressArea.cityName,
            provinceId: this.personData.areaCollections.idCardAddressArea.provinceId,
            provinceName: this.personData.areaCollections.idCardAddressArea.provinceName
          },
          'nowAddressMod': {
            operator: getToken('loginId').toString(),
            id: this.personData.personBaseForm.nowAddressId,
            address: this.personData.personBaseForm.nowAddress,
            areaId: this.personData.areaCollections.nowAddressArea.areaId,
            areaName: this.personData.areaCollections.nowAddressArea.areaName,
            cityId: this.personData.areaCollections.nowAddressArea.cityId,
            cityName: this.personData.areaCollections.nowAddressArea.cityName,
            provinceId: this.personData.areaCollections.nowAddressArea.provinceId,
            provinceName: this.personData.areaCollections.nowAddressArea.provinceName
          },
          'birthplaceMod': {
            operator: getToken('loginId').toString(),
            id: this.personData.personBaseForm.birthAddressId,
            address: this.personData.personBaseForm.birthAddress,
            areaId: this.personData.areaCollections.birthAddressArea.areaId,
            areaName: this.personData.areaCollections.birthAddressArea.areaName,
            cityId: this.personData.areaCollections.birthAddressArea.cityId,
            cityName: this.personData.areaCollections.birthAddressArea.cityName,
            provinceId: this.personData.areaCollections.birthAddressArea.provinceId,
            provinceName: this.personData.areaCollections.birthAddressArea.provinceName
          },
          'nativePlaceMod': {
            operator: getToken('loginId').toString(),
            id: this.personData.personBaseForm.nativeAddressId,
            address: this.personData.personBaseForm.nativeAddress,
            areaId: this.personData.areaCollections.nativeAddressArea.areaId,
            areaName: this.personData.areaCollections.nativeAddressArea.areaName,
            cityId: this.personData.areaCollections.nativeAddressArea.cityId,
            cityName: this.personData.areaCollections.nativeAddressArea.cityName,
            provinceId: this.personData.areaCollections.nativeAddressArea.provinceId,
            provinceName: this.personData.areaCollections.nativeAddressArea.provinceName
          },
          'hujiAddressMod': {
            operator: getToken('loginId').toString(),
            id: this.personData.personBaseForm.hujiAddressId,
            // address: this.hujiForm.address ? this.hujiForm.address : '',
            address: this.personData.personBaseForm.hujiAddress,
            areaId: this.personData.areaCollections.hujiAddressArea.areaId,
            areaName: this.personData.areaCollections.hujiAddressArea.areaName,
            cityId: this.personData.areaCollections.hujiAddressArea.cityId,
            cityName: this.personData.areaCollections.hujiAddressArea.cityName,
            provinceId: this.personData.areaCollections.hujiAddressArea.provinceId,
            provinceName: this.personData.areaCollections.hujiAddressArea.provinceName
          },
          'archivesAddressMod': {
            operator: getToken('loginId').toString(),
            id: this.personData.personBaseForm.archivesAddressId,
            address: this.personData.personBaseForm.archivesAddress,
            areaId: this.personData.areaCollections.archivesAddressArea.areaId,
            areaName: this.personData.areaCollections.archivesAddressArea.areaName,
            cityId: this.personData.areaCollections.archivesAddressArea.cityId,
            cityName: this.personData.areaCollections.archivesAddressArea.cityName,
            provinceId: this.personData.areaCollections.archivesAddressArea.provinceId,
            provinceName: this.personData.areaCollections.archivesAddressArea.provinceName
          }
        },
        'familyMembers': familyMember,
        'jobResume': jobData,
        'userEducations': eduData,
        actId: this.actId
      }
      savePersonalParams.userBaseInfo = Object.assign(savePersonalParams.userBaseInfo, {
        'idCardAddress': savePersonalParams.userBaseInfo.idCardAddressMod.provinceName + savePersonalParams.userBaseInfo.idCardAddressMod.cityName +
          savePersonalParams.userBaseInfo.idCardAddressMod.areaName + savePersonalParams.userBaseInfo.idCardAddressMod.address,
        'contactAddress': savePersonalParams.userBaseInfo.contactAddressMod.provinceName + savePersonalParams.userBaseInfo.contactAddressMod.cityName +
          savePersonalParams.userBaseInfo.contactAddressMod.areaName + savePersonalParams.userBaseInfo.contactAddressMod.address,
        'birthplace': savePersonalParams.userBaseInfo.birthplaceMod.provinceName + savePersonalParams.userBaseInfo.birthplaceMod.cityName +
          savePersonalParams.userBaseInfo.birthplaceMod.areaName + savePersonalParams.userBaseInfo.birthplaceMod.address,
        'nativePlace': savePersonalParams.userBaseInfo.nativePlaceMod.provinceName + savePersonalParams.userBaseInfo.nativePlaceMod.cityName +
          savePersonalParams.userBaseInfo.nativePlaceMod.areaName + savePersonalParams.userBaseInfo.nativePlaceMod.address,
        'hujiAddress': savePersonalParams.userBaseInfo.hujiAddressMod.provinceName + savePersonalParams.userBaseInfo.hujiAddressMod.cityName +
          savePersonalParams.userBaseInfo.hujiAddressMod.areaName + savePersonalParams.userBaseInfo.hujiAddressMod.address,
        'nowAddress': savePersonalParams.userBaseInfo.nowAddressMod.provinceName + savePersonalParams.userBaseInfo.nowAddressMod.cityName +
          savePersonalParams.userBaseInfo.nowAddressMod.areaName + savePersonalParams.userBaseInfo.nowAddressMod.address,
        'archivesAddress': savePersonalParams.userBaseInfo.archivesAddressMod.provinceName + savePersonalParams.userBaseInfo.archivesAddressMod.cityName +
          savePersonalParams.userBaseInfo.archivesAddressMod.areaName + savePersonalParams.userBaseInfo.archivesAddressMod.address
      })
      return savePersonalParams
    },
    getEntryInfo () {
      let getId = []
      if (this.laborData.extraList) {
        this.laborData.extraList.userOtherEntryInfoExtraList.forEach(item => {
          if (this.laborData.extraList.userEntryInfoExtraList2.indexOf(item.dictId) !== -1) {
            getId.push({ dictId: item.dictId, userId: '', operator: getToken('loginId'), status: 1, id: item.id })
          } else {
            getId.push({ dictId: item.dictId, userId: '', operator: getToken('loginId'), status: 0, id: item.id })
          }
        })
      }
      let entryInfoParams = {
        actId: this.actId,
        idCardNumber: this.laborData.laborForm.idCardNumber ? this.laborData.laborForm.idCardNumber : this.idCardNumber,
        orgId: this.laborData.laborForm.orgDatas.orgId,
        orgName: this.laborData.laborForm.orgDatas.filterName,
        userId: !this.$route.query.copyToken ? this.employeeId : this.$store.state.entryDetailId,
        userEntryInfo: {
          archivesAddress: '',
          operator: getToken('loginId'),
          cancelConctractWithOld: this.laborData.laborForm.cancelConctractWithOld,
          entryDate: timeToString(this.laborData.laborForm.entryDate),
          fundedInOld: this.laborData.laborForm.fundedInOld,
          fundedOldArea: this.laborData.laborForm.fundedOldArea,
          fundedOldMonth: timeToString(this.laborData.laborForm.fundedOldMonth),
          insuredInOld: this.laborData.laborForm.insuredInOld,
          insuredOldArea: this.laborData.laborForm.insuredOldArea,
          insuredOldMonth: timeToString(this.laborData.laborForm.insuredOldMonth),
          nature: '',
          postName: this.laborData.laborForm.postName,
          takejobDate: timeToString(this.laborData.laborForm.takejobDate),
          userId: !this.$route.query.copyToken ? this.employeeId : this.$store.state.entryDetailId
        },
        userEntryInfoExtraList: getId
      }
      return entryInfoParams
    },
    getUserSalarySettingInfo () {
      let userSalaryparams = {
        candidateType: this.laborData.typeAndSalaryForm.candidateType,
        probationBeginTime: this.laborData.typeAndSalaryForm.probationBeginTime ? timeZeroToString(this.laborData.typeAndSalaryForm.probationBeginTime) : '',
        probationSalary: this.laborData.probaSalaryParams,
        probationEndTime: this.laborData.typeAndSalaryForm.probationEndTime ? timeZeroToString(this.laborData.typeAndSalaryForm.probationEndTime) : '',
        exercitationBeginTime: this.laborData.typeAndSalaryForm.exercitationBeginTime ? timeZeroToString(this.laborData.typeAndSalaryForm.exercitationBeginTime) : '',
        exercitationEndTime: this.laborData.typeAndSalaryForm.exercitationEndTime ? timeZeroToString(this.laborData.typeAndSalaryForm.exercitationEndTime) : '',
        workAgreement: this.laborData.typeAndSalaryForm.workAgreement,
        operator: getToken('loginId').toString(),
        noProbation: this.laborData.typeAndSalaryForm.noProbation ? 1 : 0,
        exercitationSalary: this.laborData.typeAndSalaryForm.exercitationSalary,
        exercitationAllowance: this.laborData.typeAndSalaryForm.exercitationAllowance,
        userId: !this.$route.query.copyToken ? this.employeeId : this.$store.state.entryDetailId,
        salaryMonth: this.laborData.typeAndSalaryForm.salaryMonth,
        allowanceMonth: this.laborData.typeAndSalaryForm.allowanceMonth,
        expenditureMonth: this.laborData.typeAndSalaryForm.expenditureMonth,
        positiveTime: timeToString(this.laborData.typeAndSalaryForm.entryDate),
        salaryMonthInfo: this.laborData.salaryMonthInfo
      }
      return userSalaryparams
    }
  }
}
export const salaryParams = {
  methods: {
    _getSalaryParams () {
      const salaryMlist = this.salaryForm.commonSalaryArr.map(item => {
        return {
          id: item.ssId ? item.editId : '',
          ssId: item.ssId ? item.ssId : item.id,
          grandId: item.grandId,
          money: Number(item.amount),
          type: 1
        }
      })
      return {
        ssId: this.salaryForm.selecteSalarydOptions.join(','),
        otherSsId: this.salaryForm.selectOtherOptions.join(','),
        postId: this.salaryForm.postArr.length ? this.salaryForm.postArr.join(',') + ',' + this.salaryForm.optionArr : this.salaryForm.optionArr,
        mlist: this.salaryForm.selectOtherOptions.join(',') ? salaryMlist.concat([{ id: this.salaryForm.otherArr.ssId ? this.salaryForm.otherArr.editId : '',
          ssId: this.salaryForm.otherArr.ssId ? this.salaryForm.otherArr.ssId : this.salaryForm.otherArr.id,
          money: Number(this.salaryForm.otherArr.money),
          type: 1 }]) : salaryMlist
      }
    },
    _getTrySalaryParams () {
      let salaryMlist = this.salaryForm.commonSalaryArr.map(item => {
        return {
          id: item.ssId ? item.editId : '',
          ssId: item.ssId ? item.ssId : item.id,
          money: Number(item.amount),
          grandId: item.grandId,
          type: 1
        }
      }).concat(this.trySalaryForm.commonSalaryArr.map(item => {
        return {
          id: item.ssId ? item.editId : '',
          ssId: item.ssId ? item.ssId : item.id,
          money: Number(item.amount),
          grandId: item.grandId,
          type: 2
        }
      }))
      if (this.salaryForm.selectOtherOptions.join(',')) {
        salaryMlist.push({ id: this.salaryForm.otherArr.ssId ? this.salaryForm.otherArr.editId : '',
          ssId: this.salaryForm.otherArr.ssId ? this.salaryForm.otherArr.ssId : this.salaryForm.otherArr.id,
          money: Number(this.salaryForm.otherArr.money),
          grandId: this.salaryForm.otherArr.grandId,
          type: 1 })
      }
      if (this.trySalaryForm.selectOtherOptions.join(',')) {
        salaryMlist.push({ id: this.trySalaryForm.otherArr.ssId ? this.trySalaryForm.otherArr.editId : '',
          ssId: this.trySalaryForm.otherArr.ssId ? this.trySalaryForm.otherArr.ssId : this.trySalaryForm.otherArr.id,
          money: Number(this.trySalaryForm.otherArr.money),
          grandId: this.trySalaryForm.otherArr.grandId,
          type: 2 })
      }
      return {
        ssId: this.salaryForm.selecteSalarydOptions.join(','),
        otherSsId: this.salaryForm.selectOtherOptions.join(','),
        postId: this.salaryForm.postArr.length ? this.salaryForm.optionArr + ',' + this.salaryForm.postArr.join(',') : this.salaryForm.optionArr,
        probationSsId: this.trySalaryForm.selecteSalarydOptions.join(','),
        probationOtherSsId: this.trySalaryForm.selectOtherOptions.join(','),
        probationPostId: this.trySalaryForm.postArr.length ? this.trySalaryForm.optionArr + ',' + this.trySalaryForm.postArr.join(',') : this.trySalaryForm.optionArr,
        percent: this.trySalaryForm.precent,
        mlist: salaryMlist
      }
    }
  }
}
