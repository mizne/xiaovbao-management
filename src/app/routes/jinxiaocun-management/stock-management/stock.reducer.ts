import * as fromStock from './stock.action'
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
  action: fromStock.Actions
): State {
  switch (action.type) {
    case fromStock.FETCH_VIPS:
      return {
        ...state,
        loading: true
      }
    case fromStock.FETCH_VIPS_SUCCESS:
      return {
        ...state,
        loading: false,
        vips: action.vips
      }
    case fromStock.FETCH_VIPS_FAILURE:
      return {
        ...state,
        loading: false
      }

    case fromStock.FETCH_VIPS_COUNT_SUCCESS: {
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
