import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromAccount from '../account/account.reducer'
import * as fromVip from '../vip/vip.reducer'
import * as fromRoot from '../../../reducers'

export interface CustomerState {
  account: fromAccount.State
  vip: fromVip.State
}

export interface State extends fromRoot.State {
  customerManagement: CustomerState
}

export const reducers = {
  account: fromAccount.reducer,
  vip: fromVip.reducer
}

export const getCustomerModuleState = createFeatureSelector<CustomerState>('customerManagement')

export const getAccountState = createSelector(getCustomerModuleState, (state: CustomerState) => state.account)
export const getAccountLoading = createSelector(getAccountState, fromAccount.getLoading)
export const getCurrentAccounts = createSelector(
  getAccountState,
  fromAccount.getAccounts
)
export const getAccountsTotalCount = createSelector(
  getAccountState,
  fromAccount.getTotalCount
)


export const getVipState = createSelector(getCustomerModuleState, (state: CustomerState) => state.vip)
export const getVipLoading = createSelector(getVipState, fromVip.getLoading)
export const getCurrentVips = createSelector(getVipState, fromVip.getVips)
export const getVipsTotalCount = createSelector(getVipState, fromVip.getTotalCount)
