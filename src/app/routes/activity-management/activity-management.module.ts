import { SharedModule } from '@shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ActivityManagementComponent } from './activity-management/activity-management.component';

const routes: Routes = [
  { path: '', component: ActivityManagementComponent }
]

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [],
  declarations: [ActivityManagementComponent],
  providers: [],
})
export class ActivityManagementModule { }
