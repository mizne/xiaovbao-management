import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/concatMap';

import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { of } from 'rxjs/observable/of'

import * as fromActivity from './activity.action'
import { ActivityService } from '../activity.service'

import { LocalStorageService } from 'app/core/services/localstorage.service'

@Injectable()
export class ActivityEffects {
  @Effect()
  fetchActivity = this.actions$.ofType(fromActivity.FETCH_ACTIVITY)
  .switchMap(() => {
    return this.activityService.fetchActivity(this.local.tenantId)
    .map(activities => new fromActivity.FetchActivitySuccessAction(activities))
    .catch(e => of(new fromActivity.FetchActivityFailureAction()))
  })

  @Effect()
  fetchActivityCount$ = this.actions$.ofType(fromActivity.FETCH_ACTIVITY_COUNT)
  .switchMap(() => {
    return this.activityService.fetchActivityCount(this.local.tenantId)
    .map(count => new fromActivity.FetchActivityCountSuccessAction(count))
    .catch(e => of(new fromActivity.FetchActivityCountFailureAction()))
  })

  constructor(
    private actions$: Actions,
    private activityService: ActivityService,
    private local: LocalStorageService
  ) {}
}
