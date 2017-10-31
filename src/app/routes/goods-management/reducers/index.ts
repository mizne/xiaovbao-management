import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromGoods from '../goods-management/goods.reducer'
import * as fromRoot from '../../../reducers'

export interface GoodsState {
  goods: fromGoods.State
}

export interface State extends fromRoot.State {
  goodsManagement: GoodsState
}

export const reducers = {
  goods: fromGoods.reducer
}

export const getGoodsModuleState = createFeatureSelector<GoodsState>('goodsManagement')

export const getGoodsState = createSelector(getGoodsModuleState, (state: GoodsState) => state.goods)
export const getGoodsLoading = createSelector(getGoodsState, fromGoods.getLoading)
export const getCurrentGoods = createSelector(
  getGoodsState,
  fromGoods.getGoods
)
export const getAllGoodsTypes = createSelector(getGoodsState, fromGoods.getGoodsTyps)
export const getGoodsTotalCount = createSelector(
  getGoodsState,
  fromGoods.getGoodsTotalCount
)
