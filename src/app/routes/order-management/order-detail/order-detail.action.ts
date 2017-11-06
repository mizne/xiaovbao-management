import { Action } from '@ngrx/store'
import { Order } from '../models/order.model'

export const FETCH_ORDER_DETAIL = '[Order] Fetch Order Detail'
export const FETCH_ORDER_DETAIL_SUCCESS = '[Order] Fetch Order Detail Success'
export const FETCH_ORDER_DETAIL_FAILURE = '[Order] Fetch Order Detail Failure'


export class FectchOrderDetailAction implements Action {
  readonly type = FETCH_ORDER_DETAIL
  constructor(public tradeNo: string) {}
}
export class FetchOrderDetailSuccessAction implements Action {
  readonly type = FETCH_ORDER_DETAIL_SUCCESS
  constructor(public order: Order) {}
}
export class FetchOrderDetailFailureAction implements Action {
  readonly type = FETCH_ORDER_DETAIL_FAILURE
}





export type Actions =
FectchOrderDetailAction |
FetchOrderDetailSuccessAction |
FetchOrderDetailFailureAction

