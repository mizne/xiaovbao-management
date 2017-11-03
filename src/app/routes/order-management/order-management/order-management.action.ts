import { Action } from '@ngrx/store'
import { Order } from '../models/order.model'

export const FETCH_ORDERS = '[Order] Fetch Orders'
export const FETCH_ORDERS_SUCCESS = '[Order] Fetch Orders Success'
export const FETCH_ORDERS_FAILURE = '[Order] Fetch Orders Failure'


export const FETCH_ORDERS_COUNT = '[Order] Fetch Orders Count'
export const FETCH_ORDERS_COUNT_SUCCESS = '[Order] Fetch Orders Count Success'
export const FETCH_ORDERS_COUNT_FAILURE = '[Order] Fetch Orders Count Failure'


export interface FetchOrderssParams {
  pageIndex: number, 
  pageSize: number,
}
const emptyFetchOrderssParams: FetchOrderssParams = {
  pageIndex: 1,
  pageSize: 10
}
export class FectchOrdersAction implements Action {
  readonly type = FETCH_ORDERS
  constructor(public payload: FetchOrderssParams = emptyFetchOrderssParams) {}
}
export class FetchOrdersSuccessAction implements Action {
  readonly type = FETCH_ORDERS_SUCCESS
  constructor(public orders: Order[]) {}
}
export class FetchOrdersFailureAction implements Action {
  readonly type = FETCH_ORDERS_FAILURE
}


export class FetchOrdersCountAction implements Action {
  readonly type = FETCH_ORDERS_COUNT
}
export class FetchOrdersCountSuccessAction implements Action {
  readonly type = FETCH_ORDERS_COUNT_SUCCESS
  constructor(public count: number) {}
}
export class FetchOrdersCountFailureAction implements Action {
  readonly type = FETCH_ORDERS_COUNT_FAILURE
}





export type Actions =
FectchOrdersAction |
FetchOrdersSuccessAction |
FetchOrdersFailureAction |

FetchOrdersCountAction |
FetchOrdersCountSuccessAction |
FetchOrdersCountFailureAction

