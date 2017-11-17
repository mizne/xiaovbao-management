import * as R from 'ramda'

export class MerchantInfo {
  id?: string
  aliasName?: string
  indexPageImgUrl?: string
  startTime?: string
  endTime?: string
  wechatOpenId?: string

  static convertFromResp(resp: MerchantInfoResp): MerchantInfo {
    return R.reject(R.isNil, {
      id: resp.id,
      aliasName: resp.aliasName,
      indexPageImgUrl: resp.homeImage,
      startTime: resp.startTime,
      endTime: resp.endTime,
      wechatOpenId: resp.wecharPayee_account
    })
  }

  static convertFromModel(merchantInfo: MerchantInfo): MerchantInfoResp {
    return R.reject(R.isNil, {
      id: merchantInfo.id,
      aliasName: merchantInfo.aliasName,
      homeImage: merchantInfo.indexPageImgUrl,
      startTime: merchantInfo.startTime,
      endTime: merchantInfo.endTime,
      wecharPayee_account: merchantInfo.wechatOpenId
    })
  }
}

export interface MerchantInfoResp {
  id?: string
  aliasName?: string
  homeImage?: string
  startTime?: string
  endTime?: string
  wecharPayee_account?: string
  payee_account?: string
}
