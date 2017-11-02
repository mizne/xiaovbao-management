export interface User {
  id?: string
  name: string
  industry: string
  token: string
  tenantId: string
}

export const ROLES = ['', '代理商', '商圈', '商家']
