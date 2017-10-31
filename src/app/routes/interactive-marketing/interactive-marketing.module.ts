import { SharedModule } from '@shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HongbaojieComponent } from './hongbaojie/hongbaojie.component';

const routes: Routes = [
  { path: 'hongbaojie', component: HongbaojieComponent }
]

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [],
  declarations: [HongbaojieComponent],
  providers: [],
})
export class InteractiveMarketingModule { }
