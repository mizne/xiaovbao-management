import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromIndexPage from './index-page.action'
import { StatisticsService } from 'app/core/services/statistics.service'
import { TenantService } from 'app/core/services/tenant.service'

@Injectable()
export class IndexPageEffects {
  @Effect()
  fetchTodayStatistics$ = this.actions$.ofType(fromIndexPage.FETCH_TODAY_STATISTICS)
  .switchMap(() => {
    return this.statisticsService.fetchOrderStatisticsOfToday(this.tenantService.tenantId)
    .map(statistics => new fromIndexPage.FetchTodayStatisticsSuccessAction(statistics))
    .catch(e => Observable.of(new fromIndexPage.FetchTodayStatisticsFailureAction()))
  })

  @Effect()
  fetchMonthStatistics$ = this.actions$.ofType(fromIndexPage.FETCH_MONTH_STATISTICS)
  .switchMap(() => {
    return this.statisticsService.fetchOrderStatisticsOfThisMonth(this.tenantService.tenantId)
    .map(statistics => new fromIndexPage.FetchMonthStatisticsSuccessAction(statistics))
    .catch(e => Observable.of(new fromIndexPage.FetchMonthStatisticsFailureAction()))
  })

  @Effect()
  fetchYearStatistics$ = this.actions$.ofType(fromIndexPage.FETCH_YEAR_STATISTICS)
  .switchMap(() => {
    return this.statisticsService.fetchOrderStatisticsOfThisYear(this.tenantService.tenantId)
    .map(statistics => new fromIndexPage.FetchYearStatisticsSuccessAction(statistics))
    .catch(e => Observable.of(new fromIndexPage.FetchYearStatisticsFailureAction()))
  })


  constructor(
    private actions$: Actions,
    private statisticsService: StatisticsService,
    private tenantService: TenantService,
  ) {}
}
