import { SharedModule } from '@shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { PreciseAnalysisEffects } from './precise-analysis/precise-analysis.effects'

import { PreciseAnalysisComponent } from './precise-analysis/precise-analysis.component';
import { PreciseAnalysisService } from './precise-analysis.service'

const effects = [
  PreciseAnalysisEffects
]

const modals = [
]

const routes: Routes = [
  { path: '', component: PreciseAnalysisComponent }
]

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('preciseAnalysis', reducers),
    EffectsModule.forFeature(effects)
  ],
  exports: [],
  declarations: [
    PreciseAnalysisComponent,
    ...modals
  ],
  providers: [PreciseAnalysisService],
  entryComponents: [
    ...modals
  ]
})
export class PreciseAnalysisModule { }
