import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'


import { NzNotificationService } from 'ng-zorro-antd'

import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { of } from 'rxjs/observable/of'

import * as fromIndexPage from './index-page.action'
import { StatisticsService } from '../statistics.service'
import { LocalStorageService } from 'app/core/services/localstorage.service'

@Injectable()
export class IndexPageEffects {
  @Effect()
  fetchTodayStatistics$ = this.actions$.ofType(fromIndexPage.FETCH_TODAY_STATISTICS)
  .switchMap(() => {
    return this.statisticsService.fetchOrderStatisticsOfToday(this.local.tenantId)
    .map(statistics => new fromIndexPage.FetchTodayStatisticsSuccessAction(statistics))
    .catch(e => of(new fromIndexPage.FetchTodayStatisticsFailureAction()))
  })

  @Effect()
  fetchMonthStatistics$ = this.actions$.ofType(fromIndexPage.FETCH_MONTH_STATISTICS)
  .switchMap(() => {
    return this.statisticsService.fetchOrderStatisticsOfThisMonth(this.local.tenantId)
    .map(statistics => new fromIndexPage.FetchMonthStatisticsSuccessAction(statistics))
    .catch(e => of(new fromIndexPage.FetchMonthStatisticsFailureAction()))
  })

  @Effect()
  fetchYearStatistics$ = this.actions$.ofType(fromIndexPage.FETCH_YEAR_STATISTICS)
  .switchMap(() => {
    return this.statisticsService.fetchOrderStatisticsOfThisYear(this.local.tenantId)
    .map(statistics => new fromIndexPage.FetchYearStatisticsSuccessAction(statistics))
    .catch(e => of(new fromIndexPage.FetchYearStatisticsFailureAction()))
  })


  constructor(
    private actions$: Actions,
    private statisticsService: StatisticsService,
    private local: LocalStorageService,
    private notify: NzNotificationService
  ) {}
}
