import { Action } from '@ngrx/store'
import { DiscountActivity } from '../models/discount-activity.model'

export const FETCH_DISCOUNT_ACTIVITY = '[Activity] Fetch Discount Activity'
export const FETCH_DISCOUNT_ACTIVITY_SUCCESS = '[Activity] Fetch Discount Activity Success'
export const FETCH_DISCOUNT_ACTIVITY_FAILURE = '[Activity] Fetch Discount Activity Failure'

export const FETCH_DISCOUNT_ACTIVITY_COUNT = '[Activity] Fetch Discount Activity Count'
export const FETCH_DISCOUNT_ACTIVITY_COUNT_SUCCESS = '[Activity] Fetch Discount Activity Count Success'
export const FETCH_DISCOUNT_ACTIVITY_COUNT_FAILURE = '[Activity] Fetch Discount Activity Count Failure'


export class FectchDiscountActivityAction implements Action {
  readonly type = FETCH_DISCOUNT_ACTIVITY
  constructor(public payload: {pageIndex: number, pageSize: number}) {}
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


export type Actions =
FectchDiscountActivityAction |
FetchDiscountActivitySuccessAction |
FetchDiscountActivityFailureAction |

FetchDiscountActivityCountAction |
FetchDiscountActivityCountSuccessAction |
FetchDiscountActivityCountFailureAction
