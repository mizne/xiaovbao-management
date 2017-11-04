import { SharedModule } from '@shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { reducers } from './reducers'
import { PurchaseEffects } from './purchase-management/purchase.effects'
import { SalesEffects } from './sales-management/sales.effects'
import { StockEffects } from './stock-management/stock.effects'

import { PurchaseComponent } from './purchase-management/purchase.component';
import { SalesComponent } from './sales-management/sales.component'
import { StockComponent } from './stock-management/stock.component'

import { PurchaseService } from './services/purchase.service'
import { SalesService } from './services/sales.service'

const modals = [
]

const effects = [
  PurchaseEffects,
  SalesEffects,
  StockEffects
]

const routes: Routes = [
  { path: 'purchase', component: PurchaseComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'stock', component: StockComponent }
]

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('jinxiaocunManagement', reducers),
    EffectsModule.forFeature(effects)
  ],
  exports: [],
  declarations: [
    PurchaseComponent,
    SalesComponent,
    StockComponent,
    ...modals
  ],
  providers: [
    PurchaseService,
    SalesService
  ],
  entryComponents: [
    ...modals
  ]
})
export class JinXiaoCunManagementModule { }
