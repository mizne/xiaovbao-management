import { SharedModule } from '@shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { AccountEffects } from './account/account.effects'
import { VipEffects } from './vip/vip.effects'

import { AccountComponent } from './account/account.component';
import { VipComponent } from './vip/vip.component'
import { VipLevelPipe } from './pipes/vip-level.pipe'
import { BooleanPipe } from './pipes/boolean.pipe'
import { EditAccountModalComponent } from './modals/edit-account-modal.component'
import { EditVipModalComponent } from './modals/edit-vip-modal.component'
import { EditVipLevelSettingsModalComponent } from './modals/edit-vip-level-settings-modal.component'

import { AccountService } from './services/account.service'
import { VipService } from './services/vip.service'

const modals = [
  EditAccountModalComponent,
  EditVipModalComponent,
  EditVipLevelSettingsModalComponent
]

const effects = [
  AccountEffects,
  VipEffects
]

const routes: Routes = [
  { path: 'account', component: AccountComponent },
  { path: 'vip', component: VipComponent }
]

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('customerManagement', reducers),
    EffectsModule.forFeature(effects)
  ],
  exports: [],
  declarations: [
    AccountComponent,
    VipComponent,
    VipLevelPipe,
    BooleanPipe,
    ...modals
  ],
  providers: [
    AccountService,
    VipService
  ],
  entryComponents: [
    ...modals
  ]
})
export class CustomerManagementModule { }
