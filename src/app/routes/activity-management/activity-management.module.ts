import { SharedModule } from '@shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { ActivityEffects } from './activity-management/activity.effects'
import { DiscountActivityEffects } from './discount-activity/discount-activity.effects'

import { ActivityService } from './activity.service'
import { ActivityManagementComponent } from './activity-management/activity-management.component';
import { DiscountActivityComponent } from './discount-activity/discount-activity.component';
import { SelectGoodsModalComponent } from './modals/select-goods-modal.component'
import { AddDiscountActivityModalComponent } from './modals/add-discount-activity-modal.component'
import { ActivityStatusPipe } from './pipes/activity-status.pipe'

const effects = [
  ActivityEffects,
  DiscountActivityEffects
]

const modals = [
  SelectGoodsModalComponent,
  AddDiscountActivityModalComponent
]

const routes: Routes = [
  { path: '', component: ActivityManagementComponent },
  { path: 'discount', component: DiscountActivityComponent }
]

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('activityManagement', reducers),
    EffectsModule.forFeature(effects)
  ],
  exports: [],
  declarations: [
    ActivityManagementComponent, 
    DiscountActivityComponent,
    ActivityStatusPipe,
    ...modals
  ],
  providers: [ActivityService],
  entryComponents: [
    ...modals
  ]
})
export class ActivityManagementModule { }
