import { SharedModule } from '@shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ButtonsComponent } from './buttons/buttons.component';

const routes: Routes = [
  { path: 'buttons', component: ButtonsComponent }
]

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [],
  declarations: [ButtonsComponent],
  providers: [],
})
export class ElementsModule { }
