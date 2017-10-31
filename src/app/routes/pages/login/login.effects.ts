import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/exhaustMap'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/withLatestFrom'

import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'

import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { State, getCaptchaKey } from '../reducers'

import * as fromLogin from './login.action'
import { LoginService, errorMsgMap } from '../services/login.service'
import { ACLService } from 'app/core/acl/acl.service'
import { MenuService } from 'app/core/services/menu.service'
import { LocalStorageService } from 'app/core/services/localstorage.service'


@Injectable()
export class LoginEffects {
  @Effect()
  loginRequest$ = this.actions$
    .ofType(fromLogin.LOGIN_REQUEST)
    .map((action: fromLogin.LoginRequestAction) => action.payload)
    .withLatestFrom(
      this.store.select(getCaptchaKey),
      ({ name, password, captcha }, captchaKey) => ({
        name,
        password,
        captchaKey,
        captcha
      })
    )
    .mergeMap(({ name, password, captchaKey, captcha }) => {
      return this.loginService
        .login(name, password, captchaKey, captcha)
        .map(user => new fromLogin.LoginSuccessAction(user))
        .catch(errorMsg => {
          const msg = errorMsgMap[errorMsg] || errorMsg
          return Observable.of(new fromLogin.LoginFailureAction(msg))
        })
    })

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$
    .ofType(fromLogin.LOGIN_SUCCESS)
    .map((action: fromLogin.LoginSuccessAction) => action.user)
    .do(({ name, industry, token }) => {
      this.router.navigate(['dashboard'])
      this.localStorage.set('hasLogin', true)
      this.localStorage.set('token', token)
      this.aclService.set({
        role: [industry]
      })
    })

  @Effect()
  fetchCaptch$ = this.actions$.ofType(fromLogin.FETCH_CAPTCHA).mergeMap(() => {
    return this.loginService
      .fetchCaptcha()
      .map(captcha => new fromLogin.FetchCaptchaSuccessAction(captcha))
      .catch(e => Observable.of(new fromLogin.FetchCaptchaFailureAction()))
  })

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router,
    private store: Store<State>,
    private aclService: ACLService,
    private menuService: MenuService,
    private localStorage: LocalStorageService
  ) {}
}
