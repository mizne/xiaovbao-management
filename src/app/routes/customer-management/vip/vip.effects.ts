import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/exhaustMap'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/concatMap';

import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { of } from 'rxjs/observable/of'

import {NzNotificationService} from 'ng-zorro-antd';

import * as fromVip from './vip.action'
import { VipService } from '../services/vip.service'
import { SMSService } from 'app/core/services/sms.service'

@Injectable()
export class VipEffects {
  @Effect()
  fetchVips$ = this.actions$.ofType(fromVip.FETCH_VIPS)
  .map((action: fromVip.FectchVipsAction) => action.payload)
  .mergeMap(({ pageIndex, pageSize }) => {
    return this.vipService.fetchVips(pageIndex, pageSize)
    .map(vips => new fromVip.FetchVipsSuccessAction(vips))
    .catch(e => of(new fromVip.FetchVipsFailureAction()))
  })

  @Effect()
  fetchVipsCount$ = this.actions$.ofType(fromVip.FETCH_VIPS_COUNT)
  .mergeMap(() =>
    this.vipService.fetchVipsCount()
    .map(count => new fromVip.FetchVipsCountSuccessAction(count))
    .catch(e => of(new fromVip.FetchVipsCountFailureAction()))
  )

  @Effect()
  sendSMS$ = this.actions$.ofType(fromVip.SEND_SMS)
  .map((action: fromVip.SendSMSAction) => action.phones)
  .mergeMap((phones) => {
    return this.smsService.sendSMS(phones)
    .map(res => new fromVip.SendSMSSuccessAction())
    .catch(e => of(new fromVip.SendSMSFailureAction()))
  })

  @Effect({ dispatch: false })
  sendSMSSuccess$ = this.actions$.ofType(fromVip.SEND_SMS_SUCCESS)
  .do(() => {
    this._notification.create('success', '发送短信', '恭喜发送短信成功')
  })

  @Effect({ dispatch: false })
  sendSMSFailure$ = this.actions$.ofType(fromVip.SEND_SMS_FAILURE)
  .do(() => {
    this._notification.create('error', '发送短信', '发送短信失败')
  })


  @Effect()
  ensureDeleteVip$ = this.actions$.ofType(fromVip.ENSURE_DELETE_VIP)
  .map((action: fromVip.EnsureDeleteVipAction) => action.payload)
  .mergeMap(({ id, pageIndex, pageSize }) => {
    return this.vipService.delVip(id)
    .concatMap(res => [
      new fromVip.DeleteVipSuccessAction(),
      new fromVip.FectchVipsAction({pageIndex, pageSize})
    ])
    .catch(e => of(new fromVip.DeleteVipFailureAction()))
  })

  @Effect({ dispatch: false })
  delVipSuccess$ = this.actions$.ofType(fromVip.DELETE_VIP_SUCCESS)
  .do(() => {
    this._notification.create('success', '删除会员', '恭喜删除会员成功')
  })

  @Effect({ dispatch: false })
  delVipFailure$ = this.actions$.ofType(fromVip.DELETE_VIP_FAILURE)
  .do(() => {
    this._notification.create('error', '删除会员', '删除会员失败')
  })

  constructor(
    private actions$: Actions,
    private vipService: VipService,
    private smsService: SMSService,
    private _notification: NzNotificationService
  ) {}
}
