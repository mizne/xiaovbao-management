import * as R from 'ramda'

export class User {
  id?: string
  name?: string
  role?: string
  aliasName?: string
  industry?: string
  token?: string
  tenantId?: string

  static convertFromResp(resp: UserResp): User {
    return R.reject(R.isNil, {
      id: resp.id,
      name: resp.name,
      role: ROLES[resp.correspondingType],
      aliasName: resp.aliasName,
      industry: resp.style,
      token: resp.token,
      tenantId: resp.tenantId
    })
  }
}

export interface UserResp {
  id?: string,
  name: string
  aliasName: string
  correspondingType: number
  style: string
  token: string
  tenantId: string
}

export const ROLES = ['', '代理商', '商圈', '商家']

export const ERROR_CODE_MAP = {
  10000: '用户名和密码不匹配',
  10001: '验证码错误',
  10002: '验证码过期，请点击验证码重新获取'
}
