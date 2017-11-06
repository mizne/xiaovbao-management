import { SharedModule } from '@shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { ManagementAnalysisEffects } from './management-analysis/management-analysis.effects'

import { ManagementAnalysisComponent } from './management-analysis/management-analysis.component'

const modals = [
]

const effects = [
  ManagementAnalysisEffects
]

const routes: Routes = [
  { path: '', component: ManagementAnalysisComponent }
]

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('managementAnalysis', reducers),
    EffectsModule.forFeature(effects)
  ],
  exports: [],
  declarations: [
    ManagementAnalysisComponent,
    ...modals
  ],
  providers: [],
  entryComponents: [
    ...modals
  ]
})
export class ManagementAnalysisModule { }
