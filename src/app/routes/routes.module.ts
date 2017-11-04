import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@shared/shared.module'
import { PagesModule } from './pages/pages.module'

import { routes } from './routes'
import { IndexPageComponent } from './dashboard/index/index-page.component'

@NgModule({
  imports: [SharedModule, RouterModule.forRoot(routes), PagesModule],
  declarations: [IndexPageComponent],
  exports: [RouterModule]
})
export class RoutesModule {}
