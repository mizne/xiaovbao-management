import * as fromSales from './sales.action'
import { Vip } from '../models/vip.model'

export interface State {
  loading: boolean
  vips: Vip[]
  totalCount: number
}

const initialState: State = {
  loading: false,
  vips: [],
  totalCount: 0
}

export function reducer(
  state: State = initialState,
  action: fromSales.Actions
): State {
  switch (action.type) {
    case fromSales.FETCH_VIPS:
      return {
        ...state,
        loading: true
      }
    case fromSales.FETCH_VIPS_SUCCESS:
      return {
        ...state,
        loading: false,
        vips: action.vips
      }
    case fromSales.FETCH_VIPS_FAILURE:
      return {
        ...state,
        loading: false
      }

    case fromSales.FETCH_VIPS_COUNT_SUCCESS: {
      return {
        ...state,
        totalCount: action.count
      }
    }
    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getVips = (state: State) => state.vips
export const getTotalCount = (state: State) => state.totalCount
