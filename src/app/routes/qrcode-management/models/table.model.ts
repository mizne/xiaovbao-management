import * as R from 'ramda'

export class Table {
  id?: string
  name?: string
  tenantId?: string
  tenantName?: string
  consigneeId?: string
  consigneeName?: string
  description?: string

  static convertFromResp(resp: TableResp): Table {
    return R.reject(R.isNil, {
      id: resp.id,
      name: resp.name,
      tenantId: resp.tenantId,
      tenantName: resp.tenantName,
      consigneeId: resp.consigneeId,
      consigneeName: resp.consigneeName,
      description: resp.info
    })
  }
}

export interface TableResp {
  id?: string
  name?: string
  tenantId?: string
  tenantName?: string
  consigneeId?: string
  consigneeName?: string
  info?: string
}
