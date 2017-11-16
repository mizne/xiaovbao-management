export interface User {
  id?: string
  name: string
  industry: string
  token: string
  tenantId: string
}

export const ROLES = ['', '代理商', '商圈', '商家']

export const ERROR_CODE_MAP = {
  10000: '用户名和密码不匹配',
  10001: '验证码错误',
  10002: '验证码过期，请点击验证码重新获取'
}
