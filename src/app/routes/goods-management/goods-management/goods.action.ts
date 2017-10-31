import { Action } from '@ngrx/store'
import { Goods } from '../models/goods.model'
import { GoodsType } from '../models/goodsType.model'

export const FETCH_GOODS = '[Goods] Fetch Goods'
export const FETCH_GOODS_SUCCESS = '[Goods] Fetch Goods Success'
export const FETCH_GOODS_FAILURE = '[Goods] Fetch Goods Failure'

export const FETCH_GOODS_COUNT = '[Goods] Fetch Goods Count'
export const FETCH_GOODS_COUNT_SUCCESS = '[Goods] Fetch Goods Count Success'
export const FETCH_GOODS_COUNT_FAILURE = '[Goods] Fetch Goods Count Failure'

export const FETCH_ALL_GOODS_TYPE = '[Goods] Fetch All Goods Type'
export const FETCH_ALL_GOODS_TYPE_SUCCESS = '[Goods] Fetch All Goods Type Success'
export const FETCH_ALL_GOODS_TYPE_FAILURE = '[Goods] Fetch All Goods Type Failure'

export class FectchGoodsAction implements Action {
  readonly type = FETCH_GOODS
  constructor(public payload: { pageIndex: number, pageSize: number }) {}
}
export class FetchGoodsSuccessAction implements Action {
  readonly type = FETCH_GOODS_SUCCESS
  constructor(public goods: Goods[]) {}
}
export class FetchGoodsFailureAction implements Action {
  readonly type = FETCH_GOODS_FAILURE
}

export class FetchGoodsCountAction implements Action {
  readonly type = FETCH_GOODS_COUNT
}
export class FetchGoodsCountSuccessAction implements Action {
  readonly type = FETCH_GOODS_COUNT_SUCCESS
  constructor(public count: number) {}
}
export class FetchGoodsCountFailureAction implements Action {
  readonly type = FETCH_GOODS_COUNT_FAILURE
}


export class FectchAllGoodsTypeAction implements Action {
  readonly type = FETCH_ALL_GOODS_TYPE
}

export class FetchAllGoodsTypeSuccessAction implements Action {
  readonly type = FETCH_ALL_GOODS_TYPE_SUCCESS
  constructor(public goodsTypes: GoodsType[]) {}
}

export class FetchAllGoodsTypeFailureAction implements Action {
  readonly type = FETCH_ALL_GOODS_TYPE_FAILURE
}




export type Actions =
FectchGoodsAction |
FetchGoodsSuccessAction |
FetchGoodsFailureAction |

FetchGoodsCountAction |
FetchGoodsCountSuccessAction |
FetchGoodsCountFailureAction |

FectchAllGoodsTypeAction |
FetchAllGoodsTypeSuccessAction |
FetchAllGoodsTypeFailureAction
