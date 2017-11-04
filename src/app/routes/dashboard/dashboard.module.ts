import { SharedModule } from '@shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { IndexPageEffects } from './index/index-page.effects'

import { IndexPageComponent } from './index/index-page.component';
import { StatisticsService } from './statistics.service'

const effects = [
  IndexPageEffects
]

const modals = [
]

const routes: Routes = [
  { path: '', component: IndexPageComponent }
]

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('dashboard', reducers),
    EffectsModule.forFeature(effects)
  ],
  exports: [],
  declarations: [
    IndexPageComponent,
    ...modals
  ],
  providers: [StatisticsService],
  entryComponents: [
    ...modals
  ]
})
export class DashboardModule { }
