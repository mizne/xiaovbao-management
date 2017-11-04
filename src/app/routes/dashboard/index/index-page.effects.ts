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
  fetchStatistics$ = this.actions$.ofType(fromIndexPage.FETCH_STATISTICS)
  .map((action: fromIndexPage.FectchStatisticsAction) => action.payload)
  .switchMap(({ action, startDate, endDate, pageIndex, pageSize }) => {
    return this.statisticsService.fetchOrderStatisticsOfToday(this.local.tenantId)
    .map(statistics => new fromIndexPage.FetchStatisticsSuccessAction(statistics))
    .catch(e => of(new fromIndexPage.FetchStatisticsFailureAction()))
  })


  constructor(
    private actions$: Actions,
    private statisticsService: StatisticsService,
    private local: LocalStorageService,
    private notify: NzNotificationService
  ) {}
}
