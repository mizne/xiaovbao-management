import { NzNotificationService } from 'ng-zorro-antd'

import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromPreciseAnalysis from './precise-analysis.action'
import { PreciseAnalysisService } from '../precise-analysis.service'
import { LocalStorageService } from 'app/core/services/localstorage.service'
import { SMSService } from 'app/core/services/sms.service'

import { Store } from '@ngrx/store'
import { State, getCurrentPreciseAnalysis } from '../reducers'

@Injectable()
export class PreciseAnalysisEffects {
  @Effect()
  fetchPreciseAnalysis$ = this.actions$.ofType(fromPreciseAnalysis.FETCH_PRECISE_ANALYSIS)
  .map((action: fromPreciseAnalysis.FectchPreciseAnalysisAction) => action.payload)
  .switchMap(({ action, startDate, endDate, pageIndex, pageSize }) => {
    return this.preciseAnalysisService.fetchPreciseAnalysis({
      tenantId: this.local.tenantId,
      action,
      startDate,
      endDate,
      pageIndex,
      pageSize
    })
    .map(preciseAnalysis => new fromPreciseAnalysis.FetchPreciseAnalysisSuccessAction(preciseAnalysis))
    .catch(e => Observable.of(new fromPreciseAnalysis.FetchPreciseAnalysisFailureAction()))
  })

  @Effect()
  fetchPreciseAnalysisCount$ = this.actions$.ofType(fromPreciseAnalysis.FETCH_PRECISE_ANALYSIS_COUNT)
  .map((action: fromPreciseAnalysis.FetchPreciseAnalysisCountAction) => action.payload)
  .switchMap(({ action, startDate, endDate }) => {
    return this.preciseAnalysisService.fetchPreciseAnalysisCount({
      tenantId: this.local.tenantId,
      action,
      startDate,
      endDate })
    .map(count => new fromPreciseAnalysis.FetchPreciseAnalysisCountSuccessAction(count))
    .catch(e => Observable.of(new fromPreciseAnalysis.FetchPreciseAnalysisCountFailureAction()))
  })

  @Effect()
  sendSMS$ = this.actions$.ofType(fromPreciseAnalysis.SEND_SMS)
  .map((action: fromPreciseAnalysis.SendSMSAction) => action.phones)
  .switchMap((phones) => {
    return this.smsService.sendSMS(this.local.tenantId, phones)
    .map(e => new fromPreciseAnalysis.SendSMSSuccessAction())
    .catch(e => Observable.of(new fromPreciseAnalysis.SendSMSFailureAction()))
  })

  @Effect({ dispatch: false })
  sendSMSSuccess$ = this.actions$.ofType(fromPreciseAnalysis.SEND_SMS_SUCCESS)
  .do(() => {
    this.notify.create('success', '发送短信', '恭喜成功发送短信')
  })

  @Effect({ dispatch: false })
  sendSMSFailure$ = this.actions$.ofType(fromPreciseAnalysis.SEND_SMS_FAILURE)
  .do(() => {
    this.notify.create('error', '发送短信', '发送短信失败')
  })

  @Effect()
  batchSendSMS$ = this.actions$.ofType(fromPreciseAnalysis.BATCH_SEND_SMS)
  .withLatestFrom(this.store.select(getCurrentPreciseAnalysis))
  .switchMap(([_, users]) => {
    const phones = users.filter(e => e.selected).map(e => e.phone)
    console.log('batch send sms, phones: ', phones)
    return this.smsService.sendSMS(this.local.tenantId, phones)
    .map(e => new fromPreciseAnalysis.BatchSendSMSSuccessAction(phones.length))
    .catch(e => Observable.of(new fromPreciseAnalysis.BatchSendSMSFailureAction()))
  })

  @Effect({ dispatch: false })
  batchSendSMSSuccess$ = this.actions$.ofType(fromPreciseAnalysis.BATCH_SEND_SMS_SUCCESS)
  .map((action: fromPreciseAnalysis.BatchSendSMSSuccessAction) => action.phonesCount)
  .do((count) => {
    this.notify.create('success', '群发短信', `恭喜给 ${count} 个号码成功发送短信`)
  })

  @Effect({ dispatch: false })
  batchSendSMSFailure$ = this.actions$.ofType(fromPreciseAnalysis.BATCH_SEND_SMS_FAILURE)
  .do(() => {
    this.notify.create('error', '群发短信', '群发短信失败')
  })


  constructor(
    private actions$: Actions,
    private preciseAnalysisService: PreciseAnalysisService,
    private smsService: SMSService,
    private local: LocalStorageService,
    private store: Store<State>,
    private notify: NzNotificationService
  ) {}
}
