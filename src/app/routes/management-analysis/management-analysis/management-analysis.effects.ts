import { NzNotificationService } from 'ng-zorro-antd'

import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromManagementAnalysis from './management-analysis.action'
import { StatisticsService } from 'app/core/services/statistics.service'
import { LocalStorageService } from 'app/core/services/localstorage.service'

@Injectable()
export class ManagementAnalysisEffects {
  @Effect()
  fetchTodayStatistics$ = this.actions$.ofType(fromManagementAnalysis.FETCH_TODAY_STATISTICS)
  .switchMap(() => {
    return this.statisticsService.fetchOrderStatisticsOfToday(this.local.tenantId)
    .map(statistics => new fromManagementAnalysis.FetchTodayStatisticsSuccessAction(statistics))
    .catch(e => Observable.of(new fromManagementAnalysis.FetchTodayStatisticsFailureAction()))
  })

  @Effect()
  fetchMonthStatistics$ = this.actions$.ofType(fromManagementAnalysis.FETCH_MONTH_STATISTICS)
  .switchMap(() => {
    return this.statisticsService.fetchOrderStatisticsOfThisMonth(this.local.tenantId)
    .map(statistics => new fromManagementAnalysis.FetchMonthStatisticsSuccessAction(statistics))
    .catch(e => Observable.of(new fromManagementAnalysis.FetchMonthStatisticsFailureAction()))
  })

  @Effect()
  fetchYearStatistics$ = this.actions$.ofType(fromManagementAnalysis.FETCH_YEAR_STATISTICS)
  .switchMap(() => {
    return this.statisticsService.fetchOrderStatisticsOfThisYear(this.local.tenantId)
    .map(statistics => new fromManagementAnalysis.FetchYearStatisticsSuccessAction(statistics))
    .catch(e => Observable.of(new fromManagementAnalysis.FetchYearStatisticsFailureAction()))
  })


  constructor(
    private actions$: Actions,
    private statisticsService: StatisticsService,
    private local: LocalStorageService,
    private notify: NzNotificationService
  ) {}
}
