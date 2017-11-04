import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromPurchase from '../purchase-management/purchase.reducer'
import * as fromSales from '../sales-management/sales.reducer'
import * as fromStock from '../stock-management/stock.reducer'
import * as fromRoot from '../../../reducers'

export interface JinXiaoCunState {
  purchase: fromPurchase.State
  sales: fromSales.State
  stock: fromStock.State
}

export interface State extends fromRoot.State {
  jinxiaocunManagement: JinXiaoCunState
}

export const reducers = {
  account: fromPurchase.reducer,
  vip: fromSales.reducer,
  stock: fromStock.reducer
}

export const getJinXiaoCunModuleState = createFeatureSelector<JinXiaoCunState>('jinxiaocunManagement')

export const getPurchaseState = createSelector(getJinXiaoCunModuleState, (state: JinXiaoCunState) => state.purchase)
export const getPurchaseLoading = createSelector(getPurchaseState, fromPurchase.getLoading)



export const getSalesState = createSelector(getJinXiaoCunModuleState, (state: JinXiaoCunState) => state.sales)
export const getSalesLoading = createSelector(getSalesState, fromSales.getLoading)


export const getStockState = createSelector(
  getJinXiaoCunModuleState, 
  (state: JinXiaoCunState) => state.stock
)
export const getStockLoading = createSelector(
  getStockState,
  fromStock.getLoading
)
