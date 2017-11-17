import * as fromManagementAnalysis from './merchant-info.action'
import { Statistics } from '../../dashboard/models/statistics.model'

export interface State {
  loading: boolean
  todayStatistics: Statistics[]
  monthStatisstics: Statistics[]
  yearStatistics: Statistics[]
}

const initialState: State = {
  loading: false,
  todayStatistics: [],
  monthStatisstics: [],
  yearStatistics: []
}

export function reducer(
  state: State = initialState,
  action: fromManagementAnalysis.Actions
): State {
  switch (action.type) {
    // case fromManagementAnalysis.FETCH_TODAY_STATISTICS:
    //   return {
    //     ...state,
    //     loading: true
    //   }
    // case fromManagementAnalysis.FETCH_TODAY_STATISTICS_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     todayStatistics: action.statistics
    //   }
    // case fromManagementAnalysis.FETCH_MONTH_STATISTICS_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     monthStatisstics: action.statistics
    //   }
    // case fromManagementAnalysis.FETCH_YEAR_STATISTICS_SUCCESS:
    //   return {
    //     ...state,
    //     yearStatistics: action.statistics
    //   }
    // case fromManagementAnalysis.FETCH_TODAY_STATISTICS_FAILURE:
    // case fromManagementAnalysis.FETCH_MONTH_STATISTICS_FAILURE: 
    // case fromManagementAnalysis.FETCH_YEAR_STATISTICS_FAILURE: 
    //   return {
    //     ...state,
    //     loading: false
    //   }

    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getTodayStatistics = (state: State) => state.todayStatistics
export const getMonthStatistics = (state: State) => state.monthStatisstics
export const getYearStatistics = (state: State) => state.yearStatistics
