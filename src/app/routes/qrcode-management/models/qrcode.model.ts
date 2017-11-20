import * as R from 'ramda'

export class Qrcode {
  static URL_PREFIX = 'https://sales.xiaovbao.cn/?id='

  id?: string
  QRCodeTemplateId?: string
  bizType?: string
  consigneeId?: string
  consigneeName?: string
  couponRate?: string
  couponType?: string
  couponValue?: string
  description?: string
  tableName?: string
  tenantId?: string
  tenantName?: string

  static convertFromResp(resp: QrcodeResp): Qrcode {
    return R.reject(R.isNil, {
      id: resp.id,
      QRCodeTemplateId: resp.QRCodeTemplateId,
      bizType: resp.bizType,
      consigneeId: resp.consigneeId,
      consigneeName: resp.consigneeName,
      couponRate: resp.couponRate,
      couponType: resp.couponType,
      couponValue: resp.couponValue,
      description: resp.descriptor,
      tableName: resp.tableName,
      tenantId: resp.tenantId,
      tenantName: resp.tenantName
    })
  }

  static convertFromModel(qrcode: Qrcode): QrcodeResp {
    return R.reject(R.isNil, {
      id: qrcode.id,
      QRCodeTemplateId: qrcode.QRCodeTemplateId,
      bizType: qrcode.bizType,
      consigneeId: qrcode.consigneeId,
      consigneeName: qrcode.consigneeName,
      couponRate: qrcode.couponRate,
      couponType: qrcode.couponType,
      couponValue: qrcode.couponValue,
      descriptor: qrcode.description,
      tableName: qrcode.tableName,
      tenantId: qrcode.tenantId,
      tenantName: qrcode.tenantName
    })
  }
}

export interface QrcodeResp {
  id?: string
  QRCodeTemplateId?: string
  bizType?: string
  consigneeId?: string
  consigneeName?: string
  couponRate?: string
  couponType?: string
  couponValue?: string
  descriptor?: string
  tableName?: string
  tenantId?: string
  tenantName?: string
}
