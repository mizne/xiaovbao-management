import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromRoot from '../../../reducers'
import * as fromOrder from '../order-management/order-management.reducer'
import * as fromOrderDetail from '../order-detail/order-detail.reducer'


export interface OrderState {
  order: fromOrder.State
  orderDetail: fromOrderDetail.State
}

export interface State extends fromRoot.State {
  orderManagement: OrderState
}

export const reducers = {
  order: fromOrder.reducer,
  orderDetail: fromOrderDetail.reducer
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

export const getOrderDetailState = createSelector(
  getOrderModuleState,
  (state: OrderState) => state.orderDetail
)
export const getOrderDetailLoading = createSelector(
  getOrderDetailState,
  fromOrderDetail.getLoading
)
export const getOrderDetail = createSelector(
  getOrderDetailState,
  fromOrderDetail.getOrderDetail
)

