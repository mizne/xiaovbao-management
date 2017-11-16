import { Component, OnInit } from '@angular/core'
import { NzMessageService } from 'ng-zorro-antd'
import { SettingsService } from '@core/services/settings.service'

import { Store } from '@ngrx/store'
import { State, getLoginName } from '../../routes/pages/reducers'
import { Observable } from 'rxjs/Observable'

import { LocalStorageService } from 'app/core/services/localstorage.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  loginName: string
  constructor(
    public settings: SettingsService,
    public msgSrv: NzMessageService,
    private store: Store<State>,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit() {
    this.loginName = this.localStorage.get('name')
  }
}
