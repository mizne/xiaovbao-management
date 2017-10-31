import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/exhaustMap'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/withLatestFrom';

import { NzNotificationService } from 'ng-zorro-antd'

import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { of } from 'rxjs/observable/of'

import { Router } from '@angular/router'

import { Store } from '@ngrx/store'
import { State, getCaptchaKey } from '../reducers'

import * as fromRegister from './register.action'
import { RegisterService } from '../services/register.service'

import { ACLService } from 'app/core/acl/acl.service'
import { MenuService } from 'app/core/services/menu.service'

@Injectable()
export class RegisterEffects {
  @Effect()
  registryRequest$ = this.actions$.ofType(fromRegister.REGISTRY_REQUEST)
  .map((action: fromRegister.RegistryRequestAction) => action.payload)
  .mergeMap(({ name, password, phone, role, industry }) => {
    return this.registgerService.registry( name, password, phone, role, industry )
    .map(res => new fromRegister.RegistrySuccessAction())
    .catch(e => of(new fromRegister.RegistryFailureAction()))
  })

  @Effect({ dispatch: false })
  registrySuccess$ = this.actions$.ofType(fromRegister.REGISTRY_SUCCESS)
  .do(() => {
    this.router.navigate(['register-success'])
    // this.notificationService.success('注册成功', '恭喜注册成功, 4秒后自动跳转登录')
    // window.setTimeout(() => {
    //   this.router.navigate(['login'])
    // }, 4e3)
  })

  constructor(
    private actions$: Actions,
    private registgerService: RegisterService,
    private router: Router,
    private store: Store<State>,
    private aclService: ACLService,
    private menuService: MenuService,
    private notificationService: NzNotificationService
  ) {}
}
