import { NzNotificationService } from 'ng-zorro-antd'

import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import { Router } from '@angular/router'

import { Store } from '@ngrx/store'
import { State, getCaptchaKey } from '../reducers'

import * as fromRegister from './register.action'
import { RegisterService } from './register.service'

import { ACLService } from 'app/core/acl/acl.service'
import { MenuService } from 'app/core/services/menu.service'

@Injectable()
export class RegisterEffects {
  @Effect()
  registryRequest$ = this.actions$.ofType(fromRegister.REGISTRY_REQUEST)
  .map((action: fromRegister.RegistryRequestAction) => action.payload)
  .switchMap(({ name, password, phone, role, industry }) => {
    return this.registgerService.registry( name, password, phone, role, industry )
    .map(res => new fromRegister.RegistrySuccessAction())
    .catch(e => Observable.of(new fromRegister.RegistryFailureAction()))
  })

  @Effect({ dispatch: false })
  registrySuccess$ = this.actions$.ofType(fromRegister.REGISTRY_SUCCESS)
  .do(() => {
    this.router.navigate(['register-success'])
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
