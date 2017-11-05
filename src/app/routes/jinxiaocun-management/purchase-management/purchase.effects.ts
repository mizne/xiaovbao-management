import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/observable'

import { NzNotificationService } from 'ng-zorro-antd'

import * as fromAccount from './purchase.action'
import { PurchaseService } from '../services/purchase.service'
import { SMSService } from 'app/core/services/sms.service'
import { LocalStorageService } from 'app/core/services/localstorage.service'

@Injectable()
export class PurchaseEffects {
  @Effect()
  fetchAccounts$ = this.actions$
    .ofType(fromAccount.FETCH_ACCOUNTS)
    .map((action: fromAccount.FectchAccountsAction) => action.payload)
    .switchMap(({ pageIndex, pageSize }) => {
      return this.purchaseService
        .fetchAccounts(this.local.tenantId, pageIndex, pageSize)
        .map(accounts => new fromAccount.FetchAccountsSuccessAction(accounts))
        .catch(e => Observable.of(new fromAccount.FetchAccountsFailureAction()))
    })

  @Effect()
  fetchAccountsCount$ = this.actions$
    .ofType(fromAccount.FETCH_ACCOUNTS_COUNT)
    .switchMap(() =>
      this.purchaseService
        .fetchAccountsCount(this.local.tenantId)
        .map(count => new fromAccount.FetchAccountsCountSuccessAction(count))
        .catch(e => Observable.of(new fromAccount.FetchAccountsCountFailureAction()))
    )

  @Effect()
  sendSMS$ = this.actions$
    .ofType(fromAccount.SEND_SMS)
    .map((action: fromAccount.SendSMSAction) => action.phones)
    .switchMap(phones => {
      return this.smsService
        .sendSMS(this.local.tenantId, phones)
        .map(res => new fromAccount.SendSMSSuccessAction())
        .catch(e => Observable.of(new fromAccount.SendSMSFailureAction()))
    })

  @Effect({ dispatch: false })
  sendSMSSuccess$ = this.actions$
    .ofType(fromAccount.SEND_SMS_SUCCESS)
    .do(() => {
      this.notify.create('success', '发送短信', '恭喜发送短信成功')
    })

  @Effect({ dispatch: false })
  sendSMSFailure$ = this.actions$
    .ofType(fromAccount.SEND_SMS_FAILURE)
    .do(() => {
      this.notify.create('error', '发送短信', '发送短信失败')
    })

  @Effect()
  ensureDeleteAccount$ = this.actions$
    .ofType(fromAccount.ENSURE_DELETE_ACCOUNT)
    .map((action: fromAccount.EnsureDeleteAccountAction) => action.payload)
    .switchMap(({ id, pageIndex, pageSize }) => {
      return this.purchaseService
        .delAccount(this.local.tenantId, id)
        .concatMap(res => [
          new fromAccount.DeleteAccountSuccessAction(),
          new fromAccount.FectchAccountsAction({ pageIndex, pageSize })
        ])
        .catch(e => Observable.of(new fromAccount.DeleteAccountFailureAction()))
    })

  @Effect({ dispatch: false })
  delAccountSuccess$ = this.actions$
    .ofType(fromAccount.DELETE_ACCOUNT_SUCCESS)
    .do(() => {
      this.notify.create('success', '删除顾客', '恭喜删除顾客成功')
    })

  @Effect({ dispatch: false })
  delAccountFailure$ = this.actions$
    .ofType(fromAccount.DELETE_ACCOUNT_FAILURE)
    .do(() => {
      this.notify.create('error', '删除顾客', '删除顾客失败')
    })

  constructor(
    private actions$: Actions,
    private purchaseService: PurchaseService,
    private smsService: SMSService,
    private notify: NzNotificationService,
    private local: LocalStorageService
  ) {}
}
