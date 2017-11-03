import { SharedModule } from '@shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { OrderEffects } from './order-management/order-management.effects'

import { OrderManagementComponent } from './order-management/order-management.component';
import { OrderService } from './order.service'

const modals = [
]

const effects = [
  OrderEffects
]

const routes: Routes = [
  { path: '', component: OrderManagementComponent }
]

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('orderManagement', reducers),
    EffectsModule.forFeature(effects)
  ],
  exports: [],
  declarations: [OrderManagementComponent],
  providers: [OrderService],
  entryComponents: [
    ...modals
  ]
})
export class OrderManagementModule { }
