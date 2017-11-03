import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromOrder from '../order-management/order-management.reducer'
import * as fromRoot from '../../../reducers'

export interface OrderState {
  order: fromOrder.State
}

export interface State extends fromRoot.State {
  orderManagement: OrderState
}

export const reducers = {
  order: fromOrder.reducer
}

export const getOrderModuleState = createFeatureSelector<OrderState>('orderManagement')

export const getOrderState = createSelector(getOrderModuleState, (state: OrderState) => state.order)
export const getOrderLoading = createSelector(getOrderState, fromOrder.getLoading)
export const getCurrentOrders = createSelector(
  getOrderState,
  fromOrder.getOrders
)
export const getOrderTotalCount = createSelector(
  getOrderState,
  fromOrder.getOrderTotalCount
)

