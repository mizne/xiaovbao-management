import { Action } from '@ngrx/store'
import { DiscountActivity } from '../models/discount-activity.model'
import { Goods } from 'app/routes/goods-management/models/goods.model'
import { Qrcode } from 'app/routes/qrcode-management/models/qrcode.model'

import { 
  FetchGoodsParams, 
  emptyFetchGoodsParams,
  FetchGoodsCountParams,
  emptyFetchGoodsCountParams
 } from '../../goods-management/goods-management/goods.action'

export const FETCH_DISCOUNT_ACTIVITY = '[Activity] Fetch Discount Activity'
export const FETCH_DISCOUNT_ACTIVITY_SUCCESS = '[Activity] Fetch Discount Activity Success'
export const FETCH_DISCOUNT_ACTIVITY_FAILURE = '[Activity] Fetch Discount Activity Failure'

export const FETCH_DISCOUNT_ACTIVITY_COUNT = '[Activity] Fetch Discount Activity Count'
export const FETCH_DISCOUNT_ACTIVITY_COUNT_SUCCESS = '[Activity] Fetch Discount Activity Count Success'
export const FETCH_DISCOUNT_ACTIVITY_COUNT_FAILURE = '[Activity] Fetch Discount Activity Count Failure'

export const CREATE_DISCOUNT_ACTIVITY = '[Activity] Create Discount Activity'
export const CREATE_DISCOUNT_ACTIVITY_SUCCESS = '[Activity] Create Discount Activity Success'
export const CREATE_DISCOUNT_ACTIVITY_FAILURE = '[Activity] Create Discount Activity Failure'

export const DELETE_DISCOUNT_ACTIVITY = '[Activity] Delete Discount Activity'
export const DELETE_DISCOUNT_ACTIVITY_SUCCESS = '[Activity] Delete Discount Activity Success'
export const DELETE_DISCOUNT_ACTIVITY_FAILURE = '[Activity] Delete Discount Activity Failure'

export const FETCH_GOODS = '[Activity] Fetch Goods'
export const FETCH_GOODS_SUCCESS = '[Activity] Fetch Goods Success'
export const FETCH_GOODS_FAILURE = '[Activity] Fetch Goods Failure'

export const FETCH_GOODS_COUNT = '[Activity] Fetch Goods Count'
export const FETCH_GOODS_COUNT_SUCCESS = '[Activity] Fetch Goods Count Success'
export const FETCH_GOODS_COUNT_FAILURE = '[Activity] Fetch Goods Count Failure'

export const SELECT_GOODS = '[Activity] Select Goods'

export const FETCH_QRCODE_TEMPLATE = '[Activity] Fetch Qrcode Template'
export const FETCH_QRCODE_TEMPLATE_SUCCESS = '[Activity] Fetch Qrcode Template Success'
export const FETCH_QRCODE_TEMPLATE_FAILURE = '[Activity] Fetch Qrcode Template Failure'

export const GET_TO_ADD_ACTIVITY_TO_SHOW = '[Activity] Get To Add Activity To Show'
export const REMOVE_TO_ADD_ACTIVITY = '[Activity] Remove To Add Activity'


export interface FetchDiscountActivityParams {
  pageIndex: number
  pageSize: number
}
export const emptyFetchDiscountActivityParams = {
  pageIndex: 1,
  pageSize: 10
}
export class FectchDiscountActivityAction implements Action {
  readonly type = FETCH_DISCOUNT_ACTIVITY
  constructor(public payload: FetchDiscountActivityParams = emptyFetchDiscountActivityParams) {}
}
export class FetchDiscountActivitySuccessAction implements Action {
  readonly type = FETCH_DISCOUNT_ACTIVITY_SUCCESS
  constructor(public activities: DiscountActivity[]) {}
}
export class FetchDiscountActivityFailureAction implements Action {
  readonly type = FETCH_DISCOUNT_ACTIVITY_FAILURE
}


export class FetchDiscountActivityCountAction implements Action {
  readonly type = FETCH_DISCOUNT_ACTIVITY_COUNT
}
export class FetchDiscountActivityCountSuccessAction implements Action {
  readonly type = FETCH_DISCOUNT_ACTIVITY_COUNT_SUCCESS
  constructor(public count: number) {}
}
export class FetchDiscountActivityCountFailureAction implements Action {
  readonly type = FETCH_DISCOUNT_ACTIVITY_COUNT_FAILURE
}


export class CreateDiscountActivityAction implements Action {
  readonly type = CREATE_DISCOUNT_ACTIVITY
  constructor(public discountActivity: DiscountActivity) {}
}
export class CreateDiscountActivitySuccessAction implements Action {
  readonly type = CREATE_DISCOUNT_ACTIVITY_SUCCESS
  constructor(public goodsName: string) {}
}
export class CreateDiscountActivityFailureAction implements Action {
  readonly type = CREATE_DISCOUNT_ACTIVITY_FAILURE
  constructor(public goodsName: string) {}
}


export class DeleteDiscountActivityAction implements Action {
  readonly type = DELETE_DISCOUNT_ACTIVITY
  constructor(public id: string) {}
}
export class DeleteDiscountActivitySuccessAction implements Action {
  readonly type = DELETE_DISCOUNT_ACTIVITY_SUCCESS
}
export class DeleteDiscountActivityFailureAction implements Action {
  readonly type = DELETE_DISCOUNT_ACTIVITY_FAILURE
}


export class FetchGoodsAction implements Action {
  readonly type = FETCH_GOODS
  constructor(public payload: FetchGoodsParams = emptyFetchGoodsParams) {}
}
export class FetchGoodsSuccessAction implements Action {
  readonly type = FETCH_GOODS_SUCCESS
  constructor(public goods: Goods[]) {}
}
export class FetchGoodsFailureAction implements Action {
  readonly type = FETCH_GOODS_FAILURE
  constructor(public goods: Goods[]) {}
}

export class FetchGoodsCountAction implements Action {
  readonly type = FETCH_GOODS_COUNT
  constructor(public payload: FetchGoodsCountParams = emptyFetchGoodsCountParams) {}
}
export class FetchGoodsCountSuccessAction implements Action {
  readonly type = FETCH_GOODS_COUNT_SUCCESS
  constructor(public count: number) {}
}
export class FetchGoodsCountFailureAction implements Action {
  readonly type = FETCH_GOODS_COUNT_FAILURE
}


export class SelectGoodsAction implements Action {
  readonly type = SELECT_GOODS
  constructor(public goods: Goods[]) {}
}

export class FetchQrcodeTemplateAction implements Action {
  readonly type = FETCH_QRCODE_TEMPLATE
}
export class FetchQrcodeTemplateSuccessAction implements Action {
  readonly type = FETCH_QRCODE_TEMPLATE_SUCCESS
  constructor(public qrcodeTpls: Qrcode[]) {}
}
export class FetchQrcodeTemplateFailureAction implements Action {
  readonly type = FETCH_QRCODE_TEMPLATE_FAILURE
}


export class GetToAddActivityToShowAction implements Action {
  readonly type = GET_TO_ADD_ACTIVITY_TO_SHOW
  constructor(public payload: { pageIndex: number, pageSize: number }) {}
}
export class RemoveToAddActivityAction implements Action {
  readonly type = REMOVE_TO_ADD_ACTIVITY
  constructor(public goodsId: string) {}
}


export type Actions =
FectchDiscountActivityAction |
FetchDiscountActivitySuccessAction |
FetchDiscountActivityFailureAction |

FetchDiscountActivityCountAction |
FetchDiscountActivityCountSuccessAction |
FetchDiscountActivityCountFailureAction |

CreateDiscountActivityAction |
CreateDiscountActivitySuccessAction |
CreateDiscountActivityFailureAction |

DeleteDiscountActivityAction |
DeleteDiscountActivitySuccessAction |
DeleteDiscountActivityFailureAction |

FetchGoodsAction |
FetchGoodsSuccessAction |
FetchGoodsFailureAction |

FetchGoodsCountAction |
FetchGoodsCountSuccessAction |
FetchGoodsCountFailureAction |

SelectGoodsAction |

FetchQrcodeTemplateAction |
FetchQrcodeTemplateSuccessAction |
FetchQrcodeTemplateFailureAction |

GetToAddActivityToShowAction |
RemoveToAddActivityAction
