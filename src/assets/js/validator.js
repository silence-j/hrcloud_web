export const validatoRules = {
  idCardNumber: [
    {
      required: true,
      trigger: 'blur',
      message: '请填写身份证号码'
    },
    {
      pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
      trigger: 'blur',
      message: '请填写正确的身份证号码'
    }
  ],
  /* mail: {validator: validateMail, required: true, trigger: 'blur'}, */
  /* mail: [
    {
      required: true,
      trigger: 'blur',
      message: '请填写电子邮箱'
    },
    {
      pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
      trigger: 'blur',
      message: '请填写正确的电子邮箱'
    }
  ], */
  telephone: [
    {
      required: true,
      trigger: 'blur',
      message: '请输入手机号码'
    },
    {
      pattern: /^1[123456789]\d{9}$/, // [34578]
      trigger: 'blur',
      message: '请填写正确的手机号码'
    }
  ]
}
export const personnelRules = {
  name: { required: true, message: '请填写员工姓名', trigger: 'blur' },
  sex: { required: true, message: '请选择性别', trigger: 'change' },
  nation: { required: true, message: '请填写民族', trigger: 'blur' },
  birthday: { required: true, message: '请选择出生日期', trigger: 'change', type: 'date' },
  idCardNumber: validatoRules.idCardNumber,
  mail: validatoRules.mail,
  height: { required: true, message: '请填写身高', trigger: 'blur' },
  maritalStatus: { required: true, message: '请选择婚姻状况', trigger: 'change' },
  politicsStatus: { required: true, message: '请选择政治面貌', trigger: 'change' },
  highestEducation: { required: true, message: '请选择最高学历', trigger: 'change' },
  graduationDate: { required: true, message: '请选择毕业时间', trigger: 'change', type: 'date' },
  schoolOfGraduation: { required: true, message: '请填写毕业院校', trigger: 'blur' },
  major: { required: true, message: '请填写所学专业', trigger: 'blur' },
  telephone: validatoRules.telephone,
  nature: { required: true, message: '请选择户籍性质', trigger: 'change' },
  idCardAddress: { required: true, message: '身份证地址详细地址不能为空', trigger: 'blur' },
  hujiAddress: { required: true, message: '户籍地址详细地址不能为空', trigger: 'blur' },
  archivesAddress: { required: true, message: '档案地址详细地址不能为空', trigger: 'blur' },
  nowAddress: { required: true, message: '现住址详细地址不能为空', trigger: 'blur' },
  contactAddress: { required: true, message: '通讯地址详情地址不能为空', trigger: 'blur' }
}
