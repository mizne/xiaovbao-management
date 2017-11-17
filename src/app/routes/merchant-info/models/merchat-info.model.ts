import * as R from 'ramda'

export class MerchantInfo {
  id?: string
  aliasName?: string
  advertising?: string
  indexPageImgUrl?: string
  startTime?: string
  endTime?: string
  wechatOpenId?: string
  address?: string
  lat?: number
  lng?: number

  static convertFromResp(resp: MerchantInfoResp): MerchantInfo {
    return R.reject(R.isNil, {
      id: resp.id,
      aliasName: resp.name,
      advertising: resp.officialNews,
      indexPageImgUrl: resp.homeImage,
      startTime: resp.startTime,
      endTime: resp.endTime,
      wechatOpenId: resp.wecharPayee_account,
      address: resp.address,
      lat: parseFloat(resp.latitude),
      lng: parseFloat(resp.longitude)
    })
  }

  static convertFromModel(merchantInfo: MerchantInfo): MerchantInfoResp {
    return R.reject(R.isNil, {
      id: merchantInfo.id,
      name: merchantInfo.aliasName,
      officialNews: merchantInfo.advertising,
      homeImage: merchantInfo.indexPageImgUrl,
      startTime: merchantInfo.startTime,
      endTime: merchantInfo.endTime,
      wecharPayee_account: merchantInfo.wechatOpenId,
      address: merchantInfo.address,
      latitude: String(merchantInfo.lat),
      longitude: String(merchantInfo.lng)
    })
  }
}

export interface MerchantInfoResp {
  id?: string
  name?: string
  officialNews?: string
  homeImage?: string
  startTime?: string
  endTime?: string
  wecharPayee_account?: string
  payee_account?: string
  address?: string
  latitude?: string
  longitude?: string
}
