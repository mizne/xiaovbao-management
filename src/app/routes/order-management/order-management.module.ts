import { SharedModule } from '@shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { OrderEffects } from './order-management/order-management.effects'
import { OrderDetailEffects } from './order-detail/order-detail.effects'
import { OrderService } from './order.service';

import { OrderManagementComponent } from './order-management/order-management.component';
import { OrderDetailComponent } from './order-detail/order-detail.component'

const modals = [
]

const effects = [
  OrderEffects,
  OrderDetailEffects
]

const routes: Routes = [
  { path: '', component: OrderManagementComponent },
  { path: ':tradeNo', component: OrderDetailComponent }
]

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('orderManagement', reducers),
    EffectsModule.forFeature(effects)
  ],
  exports: [],
  declarations: [OrderManagementComponent, OrderDetailComponent],
  providers: [OrderService],
  entryComponents: [
    ...modals
  ]
})
export class OrderManagementModule { }
