import { Action } from '@ngrx/store'
import { Statistics } from '../models/statistics.model'

export const FETCH_STATISTICS = '[Dashboard] Fetch Statistics'
export const FETCH_STATISTICS_SUCCESS = '[Dashboard] Fetch Statistics Success'
export const FETCH_STATISTICS_FAILURE = '[Dashboard] Fetch Statistics Failure'


export class FectchStatisticsAction implements Action {
  readonly type = FETCH_STATISTICS
  constructor(public payload: any) {}
}

export class FetchStatisticsSuccessAction implements Action {
  readonly type = FETCH_STATISTICS_SUCCESS
  constructor(public statistics: Statistics[]) {}
}

export class FetchStatisticsFailureAction implements Action {
  readonly type = FETCH_STATISTICS_FAILURE
}



export type Actions =
FectchStatisticsAction |
FetchStatisticsSuccessAction |
FetchStatisticsFailureAction 
