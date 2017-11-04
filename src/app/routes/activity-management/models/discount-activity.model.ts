import { Goods } from 'app/routes/goods-management/models/goods.model'

import * as R from 'ramda'

export class DiscountActivity {
  id?: string
  goodsId?: string
  goodsName?: string
  originalPrice?: number
  discount?: number
  limitPerOrder?: number
  couponRate?: number
  target?: string
  qrcodeTemplateId?: string
  status?: number // 0 待添加 1 已添加

  static convertFromGoods(goods: Goods): DiscountActivity {
    return R.reject(R.isNil, {
      goodsId: goods.id,
      goodsName: goods.name,
      originalPrice: goods.price
    })
  }

  static convertFromResp(resp: DiscountActivityResp): DiscountActivity {
    return R.reject(R.isNil, {
      id: resp.id,
      goodsId: resp.goodsId,
      goodsName: resp.goodsName,
      originalPrice: resp.originalPrice,
      discount: resp.discount,
      limitPerOrder: resp.purchaseLimit,
      couponRate: resp.couponRate,
      target: resp.target,
      qrcodeTemplateId: resp.QRCodeTemplateId
      // status?: number
    })
  }

  static convertFromModel(activity: DiscountActivity): DiscountActivityResp {
    return R.reject(R.isNil, {
      id: activity.id,
      goodsId: activity.goodsId,
      goodsName: activity.goodsName,
      target: activity.target,
      originalPrice: activity.originalPrice,
      discount: activity.discount,
      activityPrice: parseFloat((activity.discount * activity.originalPrice).toFixed(2)),
      couponRate: activity.couponRate,
      purchaseLimit: activity.limitPerOrder,
      QRCodeTemplateId: activity.qrcodeTemplateId
    }) as DiscountActivityResp
  }
}

export interface DiscountActivityResp {
  id?: string
  goodsId?: string
  goodsName?: string
  target?: string
  originalPrice?: number
  discount?: number
  activityPrice?: number
  couponRate?: number
  purchaseLimit?: number
  QRCodeTemplateId: string
}

