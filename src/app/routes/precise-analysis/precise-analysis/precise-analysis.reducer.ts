import * as fromPreciseAnalysis from './precise-analysis.action'
import { PreciseAnalysis } from '../models/precise-analysis.model'

export interface State {
  loading: boolean
  preciseAnalysis: PreciseAnalysis[]
  totalCount: number
}

const initialState: State = {
  loading: false,
  preciseAnalysis: [],
  totalCount: 0
}

export function reducer(
  state: State = initialState,
  action: fromPreciseAnalysis.Actions
): State {
  switch (action.type) {
    case fromPreciseAnalysis.FETCH_PRECISE_ANALYSIS:
      return {
        ...state,
        loading: true
      }
    case fromPreciseAnalysis.FETCH_PRECISE_ANALYSIS_SUCCESS:
      return {
        ...state,
        loading: false,
        preciseAnalysis: action.preciseAnalysis
      }
    case fromPreciseAnalysis.FETCH_PRECISE_ANALYSIS_FAILURE:
      return {
        ...state,
        loading: false
      }

    case fromPreciseAnalysis.FETCH_PRECISE_ANALYSIS_COUNT_SUCCESS:
      return {
        ...state,
        totalCount: action.count
      }
    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getPreciseAnalysis = (state: State) => state.preciseAnalysis
export const getTotalCount = (state: State) => state.totalCount
