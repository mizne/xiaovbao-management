import { SharedModule } from '@shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AqmModule } from 'angular-qq-maps';

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { MerchantInfoEffects } from './merchant-info/merchant-info.effects'

import { MerchantInfoComponent } from './merchant-info/merchant-info.component'

const modals = [
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
      apiKey: 'P2KBZ-AEUCF-4VFJP-JLLMO-NXG4K-J7B2T'
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
  providers: [],
  entryComponents: [
    ...modals
  ]
})
export class MerchantInfoModule { }
