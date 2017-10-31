import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromApp from '../core/reducers/layout.reducer'

export interface State {
  test: fromApp.State
}

export const reducers = {
  test: fromApp.reducer
}

export const getAppState = createFeatureSelector<fromApp.State>('test')
export const getRootPageState = createSelector(
  getAppState,
  fromApp.getShowSidenav
)

