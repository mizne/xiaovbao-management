import { Action } from '@ngrx/store'
import { Goods } from '../models/goods.model'
import { GoodsType } from '../models/goodsType.model'
import { GoodsUnit } from '../models/goodsUnit.model'

export const FETCH_GOODS = '[Goods] Fetch Goods'
export const FETCH_GOODS_SUCCESS = '[Goods] Fetch Goods Success'
export const FETCH_GOODS_FAILURE = '[Goods] Fetch Goods Failure'

export const OFF_SHELF_GOODS = '[Goods] Off Shelf Goods'
export const OFF_SHELF_GOODS_SUCCESS = '[Goods] Off Shelf Goods Success'
export const OFF_SHELF_GOODS_FAILURE = '[Goods] Off Shelf Goods Failure'

export const ON_SHELF_GOODS = '[Goods] On Shelf Goods'
export const ON_SHELF_GOODS_SUCCESS = '[Goods] On Shelf Goods Success'
export const ON_SHELF_GOODS_FAILURE = '[Goods] On Shelf Goods Success'

export const EDIT_GOODS = '[Goods] Edit Goods'
export const EDIT_GOODS_SUCCESS = '[Goods] Edit Goods Success'
export const EDIT_GOODS_FAILURE = '[Goods] Edit Goods Failure'

export const FETCH_GOODS_COUNT = '[Goods] Fetch Goods Count'
export const FETCH_GOODS_COUNT_SUCCESS = '[Goods] Fetch Goods Count Success'
export const FETCH_GOODS_COUNT_FAILURE = '[Goods] Fetch Goods Count Failure'

export const FETCH_GOODS_TYPES = '[Goods] Fetch Goods Types'
export const FETCH_GOODS_TYPES_SUCCESS = '[Goods] Fetch Goods Types Success'
export const FETCH_GOODS_TYPES_FAILURE = '[Goods] Fetch Goods Types Failure'

export const ADD_GOODS_TYPE = '[Goods] Add Goods Type'
export const ADD_GOODS_TYPE_SUCCESS = '[Goods] Add Goods Type Success'
export const ADD_GOODS_TYPE_FAILURE = '[Goods] Add Goods Type Failure'

export const ADD_GOODS = '[Goods] Add Goods'
export const ADD_GOODS_SUCCESS = '[Goods] Add Goods Success'
export const ADD_GOODS_FAILURE = '[Goods] Add Goods Failure'

export const ADD_GOODS_UNIT = '[Goods] Add Goods Unit'
export const ADD_GOODS_UNIT_SUCCESS = '[Goods] Add Goods Unit Success'
export const ADD_GOODS_UNIT_FAILURE = '[Goods] Add Goods Unit Failure'

export const FETCH_GOODS_UNITS = '[Goods] Fetch Goods Units'
export const FETCH_GOODS_UNITS_SUCCESS = '[Goods] Fetch Goods Units Success'
export const FETCH_GOODS_UNITS_FAILURE = '[Goods] Fetch Goods Units Failure'

export interface FetchGoodsParams {
  pageIndex: number, 
  pageSize: number,
  goodsName?: string,
  goodsType?: string 
}
export const emptyFetchGoodsParams: FetchGoodsParams = {
  pageIndex: 1,
  pageSize: 10
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
}


export class OffShelfGoodsAction implements Action {
  readonly type = OFF_SHELF_GOODS
  constructor(public goodsId: string) {}
}
export class OffShelfGoodsSuccessAction implements Action {
  readonly type = OFF_SHELF_GOODS_SUCCESS
}
export class OffShelfGoodsFailureAction implements Action {
  readonly type = OFF_SHELF_GOODS_FAILURE
}


export class OnShelfGoodsAction implements Action {
  readonly type = ON_SHELF_GOODS
  constructor(public goodsId: string) {}
}
export class OnShelfGoodsSuccessAction implements Action {
  readonly type = ON_SHELF_GOODS_SUCCESS
}
export class OnShelfGoodsFailureAction implements Action {
  readonly type = ON_SHELF_GOODS_FAILURE
}


export class EditGoodsAction implements Action {
  readonly type = EDIT_GOODS
  constructor(public goods: Goods) {}
}
export class EditGoodsSuccessAction implements Action {
  readonly type = EDIT_GOODS_SUCCESS
}
export class EditGoodsFailureAction implements Action {
  readonly type = EDIT_GOODS_FAILURE
}


export interface FetchGoodsCountParams {
  goodsName?: string,
  goodsType?: string
}
export const emptyFetchGoodsCountParams: FetchGoodsCountParams = {
  goodsName: '',
  goodsType: ''
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


export class FectchGoodsTypesAction implements Action {
  readonly type = FETCH_GOODS_TYPES
}
export class FetchGoodsTypesSuccessAction implements Action {
  readonly type = FETCH_GOODS_TYPES_SUCCESS
  constructor(public goodsTypes: GoodsType[]) {}
}
export class FetchGoodsTypesFailureAction implements Action {
  readonly type = FETCH_GOODS_TYPES_FAILURE
}


export class AddGoodsTypeAction implements Action {
  readonly type = ADD_GOODS_TYPE
  constructor(public goodsTypeName: string) {}
}
export class AddGoodsTypeSuccessAction implements Action {
  readonly type = ADD_GOODS_TYPE_SUCCESS
  constructor(public goodsTypeName: string) {}
}
export class AddGoodsTypeFailureAction implements Action {
  readonly type = ADD_GOODS_TYPE_FAILURE
  constructor(public goodsTypeName: string) {}
}


export class AddGoodsAction implements Action {
  readonly type = ADD_GOODS
  constructor(public goods: Goods) {}
}
export class AddGoodsSuccessAction implements Action {
  readonly type = ADD_GOODS_SUCCESS
  constructor(public goodsName: string) {}
}
export class AddGoodsFailureAction implements Action {
  readonly type = ADD_GOODS_FAILURE
  constructor(public goodsName: string) {}
}


export class AddGoodsUnitAction implements Action {
  readonly type = ADD_GOODS_UNIT
  constructor(public goodsUnit: string) {}
}
export class AddGoodsUnitSuccessAction implements Action {
  readonly type = ADD_GOODS_UNIT_SUCCESS
  constructor(public goodsUnit: string) {}
}
export class AddGoodsUnitFailureAction implements Action {
  readonly type = ADD_GOODS_UNIT_FAILURE
  constructor(public goodsUnit: string) {}
}


export class FetchGoodsUnitsAction implements Action {
  readonly type = FETCH_GOODS_UNITS
}
export class FetchGoodsUnitsSuccessAction implements Action {
  readonly type = FETCH_GOODS_UNITS_SUCCESS
  constructor(public goodsUnits: GoodsUnit[]) {}
}
export class FetchGoodsUnitsFailureAction implements Action {
  readonly type = FETCH_GOODS_UNITS_FAILURE
}




export type Actions =
FetchGoodsAction |
FetchGoodsSuccessAction |
FetchGoodsFailureAction |

OffShelfGoodsAction |
OffShelfGoodsSuccessAction |
OffShelfGoodsFailureAction |

OnShelfGoodsAction |
OnShelfGoodsSuccessAction |
OnShelfGoodsFailureAction |

EditGoodsAction |
EditGoodsSuccessAction |
EditGoodsFailureAction |

FetchGoodsCountAction |
FetchGoodsCountSuccessAction |
FetchGoodsCountFailureAction |

FectchGoodsTypesAction |
FetchGoodsTypesSuccessAction |
FetchGoodsTypesFailureAction |

AddGoodsTypeAction |
AddGoodsTypeSuccessAction |
AddGoodsTypeFailureAction |

AddGoodsAction |
AddGoodsSuccessAction |
AddGoodsFailureAction |

AddGoodsUnitAction |
AddGoodsUnitSuccessAction |
AddGoodsUnitFailureAction |

FetchGoodsUnitsAction |
FetchGoodsUnitsSuccessAction |
FetchGoodsUnitsFailureAction
