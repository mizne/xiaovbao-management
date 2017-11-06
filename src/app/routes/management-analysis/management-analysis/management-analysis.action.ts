import { Action } from '@ngrx/store'
import { Statistics } from '../../dashboard/models/statistics.model'

export const FETCH_TODAY_STATISTICS = '[ManagementAnalysis] Fetch Today Statistics'
export const FETCH_TODAY_STATISTICS_SUCCESS = '[ManagementAnalysis] Fetch Today Statistics Success'
export const FETCH_TODAY_STATISTICS_FAILURE = '[ManagementAnalysis] Fetch Today Statistics Failure'

export const FETCH_MONTH_STATISTICS = '[ManagementAnalysis] Fetch Month Statistics'
export const FETCH_MONTH_STATISTICS_SUCCESS = '[ManagementAnalysis] Fetch Month Statistics Success'
export const FETCH_MONTH_STATISTICS_FAILURE = '[ManagementAnalysis] Fetch Month Statistics Failure'

export const FETCH_YEAR_STATISTICS = '[ManagementAnalysis] Fetch Year Statistics'
export const FETCH_YEAR_STATISTICS_SUCCESS = '[ManagementAnalysis] Fetch Year Statistics Success'
export const FETCH_YEAR_STATISTICS_FAILURE = '[ManagementAnalysis] Fetch Year Statistics Failure'

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
