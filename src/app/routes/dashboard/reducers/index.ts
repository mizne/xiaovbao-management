import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromIndexPage from '../index/index-page.reducer'
import * as fromRoot from '../../../reducers'

export interface IndexPageState {
  indexPage: fromIndexPage.State
}

export interface State extends fromRoot.State {
  dashboard: IndexPageState
}

export const reducers = {
  indexPage: fromIndexPage.reducer
}

export const getDashboardModule = createFeatureSelector<IndexPageState>('dashboard')

export const getIndexPageState = createSelector(getDashboardModule, (state: IndexPageState) => state.indexPage)
export const getIndexPageLoading = createSelector(getIndexPageState, fromIndexPage.getLoading)
export const getCurrentStatistics = createSelector(
  getIndexPageState,
  fromIndexPage.getStatistics
)



