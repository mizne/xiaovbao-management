import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { State, getCaptchaKey } from '../reducers'

import * as fromLogin from './login.action'
import { LoginService } from './login.service'
import { ACLService } from 'app/core/acl/acl.service'
import { MenuService } from 'app/core/services/menu.service'
import { TenantService } from 'app/core/services/tenant.service'
import { ERROR_CODE_MAP } from '../models/user.model'

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
        captcha,
      })
    )
    .switchMap(({ name, password, captchaKey, captcha }) => {
      return this.loginService
        .login(name, password, captchaKey, captcha)
        .map(user => new fromLogin.LoginSuccessAction(user))
        .catch(errorMsg => {
          const msg = ERROR_CODE_MAP[errorMsg] || errorMsg
          return Observable.of(new fromLogin.LoginFailureAction(msg))
        })
    })

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$
    .ofType(fromLogin.LOGIN_SUCCESS)
    .map((action: fromLogin.LoginSuccessAction) => action.user)
    .do((user) => {
      this.tenantService.login(user)

      this.router.navigate(['dashboard'])
    })

  @Effect()
  fetchCaptch$ = this.actions$.ofType(fromLogin.FETCH_CAPTCHA).switchMap(() => {
    return this.loginService
      .fetchCaptcha()
      .map(captcha => new fromLogin.FetchCaptchaSuccessAction(captcha))
      .catch(e => Observable.of(new fromLogin.FetchCaptchaFailureAction()))
  })

  @Effect({ dispatch: false })
  logout$ = this.actions$.ofType(fromLogin.LOGOUT)
  .do(() => {
    this.tenantService.logout()

    this.router.navigate(['login'])
  })

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router,
    private store: Store<State>,
    private aclService: ACLService,
    private menuService: MenuService,
    private tenantService: TenantService,
  ) {}
}
