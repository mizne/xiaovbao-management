import { Component, OnInit } from '@angular/core'
import { NzMessageService } from 'ng-zorro-antd'
import { SettingsService } from '@core/services/settings.service'

import { Store } from '@ngrx/store'
import { State, getLoginName } from '../../routes/pages/reducers'
import { LogoutAction } from 'app/routes/pages/login/login.action'
import { Observable } from 'rxjs/Observable'

import { TenantService } from 'app/core/services/tenant.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  constructor(
    public settings: SettingsService,
    public msgSrv: NzMessageService,
    private store: Store<State>,
    private tenantService: TenantService
  ) {}

  ngOnInit() {
  }

  logout() {
    this.store.dispatch(new LogoutAction())
  }
}
