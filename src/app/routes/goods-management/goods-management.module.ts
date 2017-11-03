import { SharedModule } from '@shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { GoodsEffects } from './goods-management/goods.effects'

import { GoodsManagementComponent } from './goods-management/goods-management.component';
import { AddGoodsTypeModalComponent } from './modals/add-goods-type-modal.component'
import { AddGoodsModalComponent } from './modals/add-goods-modal.component'
import { GoodsService } from './goods.service'

const modals = [
  AddGoodsTypeModalComponent,
  AddGoodsModalComponent
]

const effects = [
  GoodsEffects
]

const routes: Routes = [
  { path: '', component: GoodsManagementComponent }
]

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('goodsManagement', reducers),
    EffectsModule.forFeature(effects)
  ],
  exports: [],
  declarations: [
    GoodsManagementComponent,
    ...modals
  ],
  providers: [GoodsService],
  entryComponents: [
    ...modals
  ]
})
export class GoodsManagementModule { }
