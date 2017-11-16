import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { SharedModule } from '@shared/shared.module'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { LoginEffects } from './login/login.effects'
import { RegisterEffects } from './register/register.effects'
import { BindWechatEffects } from './bind-wechat/bind-wechat.effects'
import { LoginService } from './services/login.service'
import { RegisterService } from './services/register.service'
import { BindWechatService } from './services/bind-wechat.service'

import { RegisterComponent } from './register/register.component'
import { RegisterSuccessComponent } from './register-success/register-success.component'
import { LoginComponent } from './login/login.component'
import { LockComponent } from './lock/lock.component'
import { ForgetComponent } from './forget/forget.component'
import { BindWechatComponent } from './bind-wechat/bind-wechat.component'

const effects = [
  LoginEffects,
  RegisterEffects,
  BindWechatEffects,
]

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('pages', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [
    RegisterComponent,
    RegisterSuccessComponent,
    LoginComponent,
    LockComponent,
    ForgetComponent,
    BindWechatComponent,
  ],
  providers: [
    LoginService,
    RegisterService,
    BindWechatService,
  ]
})
export class PagesModule {}
