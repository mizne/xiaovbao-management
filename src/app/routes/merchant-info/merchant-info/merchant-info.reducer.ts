import * as fromMerchantInfo from './merchant-info.action'
import { MerchantInfo } from '../models/merchat-info.model'

export interface State {
  loading: boolean
  merchantInfo: MerchantInfo
}


const initialState: State = {
  loading: false,
  merchantInfo: null
}

export function reducer(
  state: State = initialState,
  action: fromMerchantInfo.Actions
): State {
  switch (action.type) {
    case fromMerchantInfo.FETCH_MERCHANT_INFO:
      return {
        ...state,
        loading: true
      }
    case fromMerchantInfo.FETCH_MERCHANT_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        merchantInfo: action.merchantInfo
      }
    case fromMerchantInfo.FETCH_MERCHANT_INFO_FAILURE:
      return {
        ...state,
        loading: false,
      }
    case fromMerchantInfo.EDIT_MERCHANT_INFO:
      return {
        ...state,
        loading: true
      }
    case fromMerchantInfo.EDIT_MERCHANT_INFO_SUCCESS:
    case fromMerchantInfo.EDIT_MERCHANT_INFO_FAILURE: 
      return {
        ...state,
        loading: false
      }

    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getMerchantInfo = (state: State) => state.merchantInfo
