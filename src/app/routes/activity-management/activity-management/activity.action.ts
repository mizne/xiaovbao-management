import { Action } from '@ngrx/store'
import { Activity } from '../models/activity.model'

export const FETCH_ACTIVITY = '[Activity] Fetch Activity'
export const FETCH_ACTIVITY_SUCCESS = '[Activity] Fetch Activity Success'
export const FETCH_ACTIVITY_FAILURE = '[Activity] Fetch Activity Failure'

export const FETCH_ACTIVITY_COUNT = '[Activity] Fetch Activity Count'
export const FETCH_ACTIVITY_COUNT_SUCCESS = '[Activity] Fetch Activity Count Success'
export const FETCH_ACTIVITY_COUNT_FAILURE = '[Activity] Fetch Activity Count Failure'


export class FectchActivityAction implements Action {
  readonly type = FETCH_ACTIVITY
  constructor(public payload: {pageIndex: number, pageSize: number}) {}
}
export class FetchActivitySuccessAction implements Action {
  readonly type = FETCH_ACTIVITY_SUCCESS
  constructor(public activities: Activity[]) {}
}
export class FetchActivityFailureAction implements Action {
  readonly type = FETCH_ACTIVITY_FAILURE
}


export class FetchActivityCountAction implements Action {
  readonly type = FETCH_ACTIVITY_COUNT
}
export class FetchActivityCountSuccessAction implements Action {
  readonly type = FETCH_ACTIVITY_COUNT_SUCCESS
  constructor(public count: number) {}
}
export class FetchActivityCountFailureAction implements Action {
  readonly type = FETCH_ACTIVITY_COUNT_FAILURE
}


export type Actions =
FectchActivityAction |
FetchActivitySuccessAction |
FetchActivityFailureAction |

FetchActivityCountAction |
FetchActivityCountSuccessAction |
FetchActivityCountFailureAction
