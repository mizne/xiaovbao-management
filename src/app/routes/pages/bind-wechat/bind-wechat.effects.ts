import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { NzNotificationService } from 'ng-zorro-antd'

import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { State, getCaptchaKey } from '../reducers'

import * as fromBindWechat from './bind-wechat.action'
import { BindWechatService } from '../services/bind-wechat.service'
import { ACLService } from 'app/core/acl/acl.service'
import { MenuService } from 'app/core/services/menu.service'
import { LocalStorageService } from 'app/core/services/localstorage.service'
import { TitleService } from 'app/core/services/title.service'
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
            ...user,
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
    .do(({ name, industry, token, tenantId, destination }) => {
      this.notify.success('微信帐号绑定', '您已成功绑定，马上跳转页面！')
      this.localStorage.set('name', name)
      this.localStorage.set('token', token)
      this.localStorage.set('tenantId', tenantId)

      this.router.navigate([DESTINATION_MAP[destination]])
      this.aclService.set({
        role: [industry]
      })
    })

  @Effect({ dispatch: false })
  checkWechatHasBindFailure$ = this.actions$
    .ofType(fromBindWechat.CHECK_WECHAT_HAS_BIND_FAILURE)
    .do(() => {
      this.notify.error('微信帐号绑定', '你还没有绑定微信帐号，马上去绑定！')
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
              ...user,
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
    .do(({ name, industry, token, tenantId, destination }) => {
      this.notify.success('绑定微信账户', '恭喜您 绑定微信账户成功！')

      this.localStorage.set('name', name)
      this.localStorage.set('token', token)
      this.localStorage.set('tenantId', tenantId)

      if (DESTINATION_MAP[destination]) {
        this.router.navigate([DESTINATION_MAP[destination]])
      }
      this.aclService.set({
        role: [industry]
      })
    })

  @Effect({ dispatch: false })
  bindWechatFailure$ = this.actions$
    .ofType(fromBindWechat.BIND_WECHAT_FAILURE)
    .do(() => {
      this.notify.error('绑定微信账户', '绑定微信账户失败！')
    })

  constructor(
    private actions$: Actions,
    private bindWechatService: BindWechatService,
    private router: Router,
    private store: Store<State>,
    private aclService: ACLService,
    private menuService: MenuService,
    private localStorage: LocalStorageService,
    private notify: NzNotificationService,
    private titleService: TitleService
  ) {}
}
