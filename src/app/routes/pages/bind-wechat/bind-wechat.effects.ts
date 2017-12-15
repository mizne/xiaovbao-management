import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import { Router } from '@angular/router'

import * as fromBindWechat from './bind-wechat.action'
import { BindWechatService } from './bind-wechat.service'
import { TenantService } from 'app/core/services/tenant.service'
import { SettingsService } from 'app/core/services/settings.service'
import { DESTINATION_MAP } from '../models/bind-wechat.model'

@Injectable()
export class BindWechatEffects {
  @Effect()
  checkWechatHasBind$ = this.actions$
    .ofType(fromBindWechat.CHECK_WECHAT_HAS_BIND)
    .map((action: fromBindWechat.CheckWechatHasBindAction) => action.payload)
    .switchMap(({ code, destination }) => {
      return this.bindWechatService
        .checkWechatHasBind(code)
        .map(user => {
          return new fromBindWechat.CheckWechatHasBindSuccessAction({
            user,
            destination
          })
        })
        .catch(() => {
          return Observable.of(
            new fromBindWechat.CheckWechatHasBindFailreAction()
          )
        })
    })

  @Effect({ dispatch: false })
  checkWechatHasBindSuccess$ = this.actions$
    .ofType(fromBindWechat.CHECK_WECHAT_HAS_BIND_SUCCESS)
    .map(
      (action: fromBindWechat.CheckWechatHasBindSuccessAction) => action.payload
    )
    .do(({ user, destination }) => {
      // this.notify.success('微信帐号绑定', '您已成功绑定，马上跳转页面！')
      this.tenantService.login(user)
      this.router.navigate([DESTINATION_MAP[destination]], { replaceUrl: true })
      this.settings.setLayout('collapsed', true)
    })

  @Effect({ dispatch: false })
  checkWechatHasBindFailure$ = this.actions$
    .ofType(fromBindWechat.CHECK_WECHAT_HAS_BIND_FAILURE)
    .do(() => {
      // this.notify.error('微信帐号绑定', '你还没有绑定微信帐号，马上去绑定！')
    })

  @Effect()
  bindWechat$ = this.actions$
    .ofType(fromBindWechat.BIND_WECHAT)
    .map((action: fromBindWechat.BindWehcatAction) => action.payload)
    .switchMap(({ userName, password, code, destination }) => {
      return this.bindWechatService
        .bindWechat(userName, password, code)
        .map(
          user =>
            new fromBindWechat.BindWechatSuccessAction({
              user,
              destination
            })
        )
        .catch(e =>
          Observable.of(new fromBindWechat.BindWechatFailureAction(e.message))
        )
    })

  @Effect({ dispatch: false })
  bindWechatSuccess$ = this.actions$
    .ofType(fromBindWechat.BIND_WECHAT_SUCCESS)
    .map((action: fromBindWechat.BindWechatSuccessAction) => action.payload)
    .do(({ user, destination }) => {
      // this.notify.success('绑定微信账户', '恭喜您 绑定微信账户成功！')

      this.tenantService.login(user)

      if (DESTINATION_MAP[destination]) {
        this.router.navigate([DESTINATION_MAP[destination]])
      }
    })

  @Effect({ dispatch: false })
  bindWechatFailure$ = this.actions$
    .ofType(fromBindWechat.BIND_WECHAT_FAILURE)
    .do(() => {
      // this.notify.error('绑定微信账户', '绑定微信账户失败！')
    })

  constructor(
    private actions$: Actions,
    private bindWechatService: BindWechatService,
    private router: Router,
    private tenantService: TenantService,
    private settings: SettingsService,
  ) {}
}
