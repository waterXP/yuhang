export const registerStep = [
  '填写账号',
  '身份验证',
  '完成'
]

export const forgetStep = [
  '填写账号',
  '身份验证',
  '重置密码',
  '完成'
]

export const registerTab = [
  {
    key: 'mobile',
    value: '手机注册'
  }, {
    key: 'mail',
    value: '邮箱注册'
  }
]

export const regMobile = '^1[34578]\\d{9}$'
export const regMail = '^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$'
export const regPassword = '^[A-Za-z0-9_]{6,16}$'

export const registerForm = [
  {
    text: '手机号',
    key: 'mobile',
    type: 'text',
    isRequired: true,
    unique: 'mobile',
    regStr: regMobile,
    regFail: '手机号格式不正确'
  }, {
    text: '验证码',
    key: 'validate',
    type: 'validate',
    isRequired: true,
    unique: 'mobile'
  }, {
    text: '邮箱',
    key: 'mail',
    type: 'text',
    isRequired: true,
    unique: 'mail',
    regStr: regMail,
    regFail: '邮箱格式不正确'
  }, {
    text: '密码',
    key: 'password',
    type: 'password',
    isRequired: true,
    regStr: regPassword,
    regFail: '密码长度6-16位，支持数字字母，下划线'
  }, {
    text: '确认密码',
    key: 'confirm',
    type: 'password',
    isRequired: true
  }, {
    text: '真实姓名',
    key: 'name',
    type: 'text'
  }, {
    text: '公司名称',
    key: 'company',
    type: 'text'
  }, {
    text: '职位',
    key: 'position',
    type: 'text'
  }, {
    text: '工作地址',
    key: 'address',
    type: 'text'
  }, {
    text: '我已阅读并同意遵守',
    key: 'agree',
    type: 'checkbox',
    link: '《创新余杭用户服务协议》'
  }, {
    type: 'submit',
    text: '注册',
    key: 'submit'
  }
]
