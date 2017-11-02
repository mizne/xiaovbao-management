import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/map'
import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { of } from 'rxjs/observable/of'

import * as fromDiscountActivity from './discount-activity.action'
import { ActivityService } from '../activity.service'

import { LocalStorageService } from 'app/core/services/localstorage.service'

@Injectable()
export class DiscountActivityEffects {
  @Effect()
  fetchDiscountActivity = this.actions$.ofType(fromDiscountActivity.FETCH_DISCOUNT_ACTIVITY)
  .switchMap(() => {
    return this.activityService.fetchDiscountActivity(this.local.tenantId)
    .map(activities => new fromDiscountActivity.FetchDiscountActivitySuccessAction(activities))
    .catch(e => of(new fromDiscountActivity.FetchDiscountActivityFailureAction()))
  })

  @Effect()
  fetchDiscountActivityCount$ = this.actions$.ofType(fromDiscountActivity.FETCH_DISCOUNT_ACTIVITY_COUNT)
  .switchMap(() => {
    return this.activityService.fetchDiscountActivityCount(this.local.tenantId)
    .map(count => new fromDiscountActivity.FetchDiscountActivityCountSuccessAction(count))
    .catch(e => of(new fromDiscountActivity.FetchDiscountActivityCountFailureAction()))
  })

  constructor(
    private actions$: Actions,
    private activityService: ActivityService,
    private local: LocalStorageService
  ) {}
}
