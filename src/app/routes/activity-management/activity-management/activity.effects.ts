import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromActivity from './activity.action'
import { ActivityService } from '../activity.service'

import { TenantService } from 'app/core/services/tenant.service'

@Injectable()
export class ActivityEffects {
  @Effect()
  fetchActivity = this.actions$.ofType(fromActivity.FETCH_ACTIVITY)
  .switchMap(() => {
    return this.activityService.fetchActivity(this.tenantService.tenantId)
    .map(activities => new fromActivity.FetchActivitySuccessAction(activities))
    .catch(e => Observable.of(new fromActivity.FetchActivityFailureAction()))
  })

  @Effect()
  fetchActivityCount$ = this.actions$.ofType(fromActivity.FETCH_ACTIVITY_COUNT)
  .switchMap(() => {
    return this.activityService.fetchActivityCount(this.tenantService.tenantId)
    .map(count => new fromActivity.FetchActivityCountSuccessAction(count))
    .catch(e => Observable.of(new fromActivity.FetchActivityCountFailureAction()))
  })

  constructor(
    private actions$: Actions,
    private activityService: ActivityService,
    private tenantService: TenantService
  ) {}
}
