import { SharedModule } from '@shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { QrcodeEffects } from './qrcode-management/qrcode.effects'

import { QrcodeManagementComponent } from './qrcode-management/qrcode-management.component';
import { AddQrcodeModalComponent } from './modals/add-qrcode-modal.component'
import { QrcodeService } from './qrcode.service'

const effects = [
  QrcodeEffects
]

const modals = [
  AddQrcodeModalComponent
]

const routes: Routes = [
  { path: '', component: QrcodeManagementComponent }
]

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('qrcodeManagement', reducers),
    EffectsModule.forFeature(effects)
  ],
  exports: [],
  declarations: [
    QrcodeManagementComponent,
    ...modals
  ],
  providers: [QrcodeService],
  entryComponents: [
    ...modals
  ]
})
export class QrcodeManagementModule { }
