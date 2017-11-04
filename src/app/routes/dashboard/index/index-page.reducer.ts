import * as fromIndexPage from './index-page.action'
import { Statistics } from '../models/statistics.model'

export interface State {
  loading: boolean
  statistics: Statistics[]
}

const initialState: State = {
  loading: false,
  statistics: []
}

export function reducer(
  state: State = initialState,
  action: fromIndexPage.Actions
): State {
  switch (action.type) {
    case fromIndexPage.FETCH_STATISTICS:
      return {
        ...state,
        loading: true
      }

    case fromIndexPage.FETCH_STATISTICS_SUCCESS:
      return {
        ...state,
        loading: false,
        statistics: action.statistics
      }
    case fromIndexPage.FETCH_STATISTICS_FAILURE:
      return {
        ...state,
        loading: false
      }

    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getStatistics = (state: State) => state.statistics
