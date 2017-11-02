import * as fromPreciseAnalysis from './precise-analysis.action'
import { PreciseAnalysis } from '../models/precise-analysis.model'

export interface State {
  loading: boolean
  preciseAnalysis: PreciseAnalysis[]
  totalCount: number
  batchSendSMSLoading: boolean
}

const initialState: State = {
  loading: false,
  preciseAnalysis: [],
  totalCount: 0,
  batchSendSMSLoading: false
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

    case fromPreciseAnalysis.SEND_SMS:
      return {
        ...state,
        loading: true
      }

    case fromPreciseAnalysis.SEND_SMS_SUCCESS:
    case fromPreciseAnalysis.SEND_SMS_FAILURE:
      return {
        ...state,
        loading: false
      }

    case fromPreciseAnalysis.BATCH_SEND_SMS: 
      return {
        ...state,
        batchSendSMSLoading: true
      }
    case fromPreciseAnalysis.BATCH_SEND_SMS_SUCCESS:
    case fromPreciseAnalysis.BATCH_SEND_SMS_FAILURE: 
      return {
        ...state,
        batchSendSMSLoading: false
      }
    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getPreciseAnalysis = (state: State) => state.preciseAnalysis
export const getTotalCount = (state: State) => state.totalCount

export const getBatchSendSMSLoading = (state: State) => state.batchSendSMSLoading
