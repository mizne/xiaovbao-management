import { Action } from '@ngrx/store'
import { Statistics } from '../models/statistics.model'

export const FETCH_TODAY_STATISTICS = '[Dashboard] Fetch Today Statistics'
export const FETCH_TODAY_STATISTICS_SUCCESS = '[Dashboard] Fetch Today Statistics Success'
export const FETCH_TODAY_STATISTICS_FAILURE = '[Dashboard] Fetch Today Statistics Failure'

export const FETCH_MONTH_STATISTICS = '[Dashboard] Fetch Month Statistics'
export const FETCH_MONTH_STATISTICS_SUCCESS = '[Dashboard] Fetch Month Statistics Success'
export const FETCH_MONTH_STATISTICS_FAILURE = '[Dashboard] Fetch Month Statistics Failure'

export const FETCH_YEAR_STATISTICS = '[Dashboard] Fetch Year Statistics'
export const FETCH_YEAR_STATISTICS_SUCCESS = '[Dashboard] Fetch Year Statistics Success'
export const FETCH_YEAR_STATISTICS_FAILURE = '[Dashboard] Fetch Year Statistics Failure'

export class FectchTodayStatisticsAction implements Action {
  readonly type = FETCH_TODAY_STATISTICS
  constructor() {}
}
export class FetchTodayStatisticsSuccessAction implements Action {
  readonly type = FETCH_TODAY_STATISTICS_SUCCESS
  constructor(public statistics: Statistics[]) {}
}
export class FetchTodayStatisticsFailureAction implements Action {
  readonly type = FETCH_TODAY_STATISTICS_FAILURE
}


export class FectchMonthStatisticsAction implements Action {
  readonly type = FETCH_MONTH_STATISTICS
  constructor() {}
}
export class FetchMonthStatisticsSuccessAction implements Action {
  readonly type = FETCH_MONTH_STATISTICS_SUCCESS
  constructor(public statistics: Statistics[]) {}
}
export class FetchMonthStatisticsFailureAction implements Action {
  readonly type = FETCH_MONTH_STATISTICS_FAILURE
}


export class FectchYearStatisticsAction implements Action {
  readonly type = FETCH_YEAR_STATISTICS
  constructor() {}
}
export class FetchYearStatisticsSuccessAction implements Action {
  readonly type = FETCH_YEAR_STATISTICS_SUCCESS
  constructor(public statistics: Statistics[]) {}
}
export class FetchYearStatisticsFailureAction implements Action {
  readonly type = FETCH_YEAR_STATISTICS_FAILURE
}



export type Actions =
FectchTodayStatisticsAction |
FetchTodayStatisticsSuccessAction |
FetchTodayStatisticsFailureAction |

FectchMonthStatisticsAction |
FetchMonthStatisticsSuccessAction |
FetchMonthStatisticsFailureAction |

FectchYearStatisticsAction |
FetchYearStatisticsSuccessAction |
FetchYearStatisticsFailureAction
