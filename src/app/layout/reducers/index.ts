import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromHeader from '../header/header.reducer'
import * as fromRoot from '../../reducers'

export interface LayoutState {
  header: fromHeader.State
}

export interface State extends fromRoot.State {
  layout: LayoutState
}

export const reducers = {
  header: fromHeader.reducer
}

export const getLayoutModuleState = createFeatureSelector<LayoutState>('layout')

export const getHeaderState = createSelector(getLayoutModuleState, (state: LayoutState) => state.header)
export const getHeaderLoading = createSelector(
  getHeaderState,
  fromHeader.getLoading
)

