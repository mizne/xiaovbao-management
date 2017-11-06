import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromManagementAnalysis from '../management-analysis/management-analysis.reducer'
import * as fromRoot from '../../../reducers'

export interface ManagementAnalysisState {
  managementAnalysis: fromManagementAnalysis.State
}

export interface State extends fromRoot.State {
  managementAnalysis: ManagementAnalysisState
}

export const reducers = {
  managementAnalysis: fromManagementAnalysis.reducer
}

export const getManagementAnalysisModule = createFeatureSelector<ManagementAnalysisState>('managementAnalysis')

export const getManagementAnalysisState = createSelector(
  getManagementAnalysisModule, 
  (state: ManagementAnalysisState) => state.managementAnalysis
)
export const getManagementAnalysisLoading = createSelector(getManagementAnalysisState, fromManagementAnalysis.getLoading)
export const getTodayStatistics = createSelector(
  getManagementAnalysisState,
  fromManagementAnalysis.getTodayStatistics
)
export const getMonthStatistics = createSelector(
  getManagementAnalysisState,
  fromManagementAnalysis.getMonthStatistics
)
export const getYearStatistics = createSelector(
  getManagementAnalysisState,
  fromManagementAnalysis.getYearStatistics
)

