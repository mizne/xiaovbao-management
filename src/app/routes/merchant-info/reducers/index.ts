import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromMerchantInfo from '../merchant-info/merchant-info.reducer'
import * as fromRoot from '../../../reducers'

export interface MerchantInfoState {
  merchantInfo: fromMerchantInfo.State
}

export interface State extends fromRoot.State {
  merchantInfo: MerchantInfoState
}

export const reducers = {
  merchantInfo: fromMerchantInfo.reducer
}

export const getMerchantInfoModule = createFeatureSelector<MerchantInfoState>('merchantInfo')

export const getMerchantInfoState = createSelector(
  getMerchantInfoModule, 
  (state: MerchantInfoState) => state.merchantInfo
)
export const getMerchantInfo = createSelector(
  getMerchantInfoState,
  fromMerchantInfo.getMerchantInfo
)
export const getLoading = createSelector(
  getMerchantInfoState,
  fromMerchantInfo.getLoading
)


