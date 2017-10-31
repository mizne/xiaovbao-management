import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromPreciseAnalysis from '../precise-analysis/precise-analysis.reducer'
import * as fromRoot from '../../../reducers'

export interface PreciseAnalysisState {
  preciseAnalysis: fromPreciseAnalysis.State
}

export interface State extends fromRoot.State {
  preciseAnalysis: PreciseAnalysisState
}

export const reducers = {
  preciseAnalysis: fromPreciseAnalysis.reducer
}

export const getPreciseAnalysisModuleState = createFeatureSelector<PreciseAnalysisState>('preciseAnalysis')

export const getPreciseAnalysisState = createSelector(getPreciseAnalysisModuleState, (state: PreciseAnalysisState) => state.preciseAnalysis)
export const getPreciseAnalysisLoading = createSelector(getPreciseAnalysisState, fromPreciseAnalysis.getLoading)
export const getCurrentPreciseAnalysis = createSelector(
  getPreciseAnalysisState,
  fromPreciseAnalysis.getPreciseAnalysis
)
export const getPreciseAnalysisTotalCount = createSelector(
  getPreciseAnalysisState,
  fromPreciseAnalysis.getTotalCount
)

