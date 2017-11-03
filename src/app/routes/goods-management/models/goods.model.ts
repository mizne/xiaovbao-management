import * as R from 'ramda'

export class Goods {
  id?: string
  name?: string
  listImageUrl?: string
  detailImageUrl?: string[]
  description?: string
  goodsTypeId?: string
  goodsTypeName?: string
  buyPrice?: number
  price?: number
  oldPrice?: number
  vipPrice?: number
  goodsUnitId?: string
  goodsUnitName?: string
  sellCount?: number
  totalCount?: number
  restCount?: number
  isActive?: boolean

  static convertFromResp(goodsResp: GoodsResp): Goods {
    return R.reject(R.isNil, {
      id: goodsResp.id,
      name: goodsResp.name,
      listImageUrl: goodsResp.image,
      detailImageUrl: goodsResp.minuteImage,
      description: goodsResp.info,
      goodsTypeId: goodsResp.menuId,
      goodsTypeName: goodsResp.menuName,
      buyPrice: goodsResp.constPrice,
      price: goodsResp.price,
      oldPrice: goodsResp.oldPrice,
      vipPrice: goodsResp.vipPrice,
      goodsUnitId: goodsResp.unitId,
      goodsUnitName: goodsResp.unit,
      sellCount: goodsResp.sellCount,
      totalCount: goodsResp.foodNum,
      restCount: goodsResp.rest,
      isActive: goodsResp.isActive,
    })
  }

  static convertFromModel(goods: Goods): GoodsResp {
    return R.reject(R.isNil, {
      id: goods.id,
      name: goods.name,
      image: goods.listImageUrl,
      minuteImage: goods.detailImageUrl,
      info: goods.description,
      menuName: goods.goodsTypeName,
      menuId: goods.goodsTypeId,
      isActive: goods.isActive,
      constPrice: goods.buyPrice,
      price: goods.price,
      oldPrice: goods.price,
      vipPrice: goods.vipPrice,
      unit: goods.goodsUnitName,
      unitId: goods.goodsUnitId,
      sellCount: goods.sellCount,
      foodNum: goods.totalCount,
      rest: goods.sellCount
    })
  }
}

export interface GoodsResp {
  id?: string
  name?: string
  image?: string
  minuteImage?: string[]
  info?: string
  menuName?: string
  menuId?: string
  isActive?: boolean
  constPrice?: number
  price?: number
  oldPrice?: number
  vipPrice?: number
  unit?: string
  unitId?: string
  sellCount?: number
  foodNum?: number
  rest?: number
}

