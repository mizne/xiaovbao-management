import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/exhaustMap'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { of } from 'rxjs/observable/of'

import * as fromPreciseAnalysis from './precise-analysis.action'
import { StatisticsService } from '../statistics.service'

@Injectable()
export class PreciseAnalysisEffects {
  @Effect()
  fetchPreciseAnalysis$ = this.actions$.ofType(fromPreciseAnalysis.FETCH_PRECISE_ANALYSIS)
  .map((action: fromPreciseAnalysis.FectchPreciseAnalysisAction) => action.payload)
  .mergeMap(({ action, startDate, endDate, pageIndex, pageSize }) => {
    return this.statisticsService.fetchPreciseAnalysis({ action, startDate, endDate, pageIndex, pageSize })
    .map(preciseAnalysis => new fromPreciseAnalysis.FetchPreciseAnalysisSuccessAction(preciseAnalysis))
    .catch(e => of(new fromPreciseAnalysis.FetchPreciseAnalysisFailureAction()))
  })

  @Effect()
  fetchPreciseAnalysisCount$ = this.actions$.ofType(fromPreciseAnalysis.FETCH_PRECISE_ANALYSIS_COUNT)
  .map((action: fromPreciseAnalysis.FetchPreciseAnalysisCountAction) => action.payload)
  .mergeMap(({ action, startDate, endDate }) => {
    return this.statisticsService.fetchPreciseAnalysisCount({ action, startDate, endDate })
    .map(count => new fromPreciseAnalysis.FetchPreciseAnalysisCountSuccessAction(count))
    .catch(e => of(new fromPreciseAnalysis.FetchPreciseAnalysisCountFailureAction()))
  })


  constructor(
    private actions$: Actions,
    private statisticsService: StatisticsService
  ) {}
}
