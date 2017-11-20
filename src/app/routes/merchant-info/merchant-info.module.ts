import { SharedModule } from '@shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AqmModule } from 'angular-qq-maps';
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { MerchantInfoEffects } from './merchant-info/merchant-info.effects'

import { MerchantInfoComponent } from './merchant-info/merchant-info.component'
import { BindWechatModalComponent } from './modals/bind-wechat-modal.component'

import { MerchantInfoService } from './merchat-info.service'
import { QQ_MAP_API_KEY } from '../../../config'

const modals = [
  BindWechatModalComponent
]

const effects = [
  MerchantInfoEffects
]

const routes: Routes = [
  { path: '', component: MerchantInfoComponent }
]

@NgModule({
  imports: [
    SharedModule,
    AqmModule.forRoot({
      apiKey: QQ_MAP_API_KEY
    }),
    RouterModule.forChild(routes),
    StoreModule.forFeature('merchantInfo', reducers),
    EffectsModule.forFeature(effects)
  ],
  exports: [],
  declarations: [
    MerchantInfoComponent,
    ...modals
  ],
  providers: [
    MerchantInfoService
  ],
  entryComponents: [
    ...modals
  ]
})
export class MerchantInfoModule { }
