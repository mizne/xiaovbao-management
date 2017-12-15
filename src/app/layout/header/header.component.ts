import { Component, ViewChild, OnInit } from '@angular/core'
import * as screenfull from 'screenfull'

import {
  SettingsService,
} from '@core/services/settings.service'
import { ThemesService } from '@core/services/themes.service'
import { ThemeType } from '@core/services/themes.service'
import { TranslatorService } from '@core/translator/translator.service'

import { Store } from '@ngrx/store'
import { State } from 'app/routes/pages/reducers'
import { LogoutAction } from 'app/routes/pages/login/login.action'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  q: string
  focus = false
  isFullscreen = false
  searchToggled = false
  _isSpinning = false
  themes: { l: ThemeType; bg: string; nav: string; con: string }[] = [
    { l: 'A', bg: '#108ee9', nav: '#fff', con: '#f5f7fa' },
    { l: 'B', bg: '#00a2ae', nav: '#fff', con: '#f5f7fa' },
    { l: 'C', bg: '#00a854', nav: '#fff', con: '#f5f7fa' },
    { l: 'D', bg: '#f04134', nav: '#fff', con: '#f5f7fa' },
    { l: 'E', bg: '#373d41', nav: '#fff', con: '#f5f7fa' },
    { l: 'F', bg: '#108ee9', nav: '#404040', con: '#f5f7fa' },
    { l: 'G', bg: '#00a2ae', nav: '#404040', con: '#f5f7fa' },
    { l: 'H', bg: '#00a854', nav: '#404040', con: '#f5f7fa' },
    { l: 'I', bg: '#f04134', nav: '#404040', con: '#f5f7fa' },
    { l: 'J', bg: '#373d41', nav: '#404040', con: '#f5f7fa' }
  ]

  @ViewChild('qIpt') private qIpt: any

  constructor(
    public settings: SettingsService,
    public tsServ: TranslatorService,
    private themeServ: ThemesService,
    private store: Store<State>
  ) {}

  ngOnInit() {}
  toggleCollapsedSideabar() {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed)
  }

  toggleFullScreen() {
    if (screenfull.enabled) {
      screenfull.toggle()
    }
    this.isFullscreen = !screenfull.isFullscreen
  }

  qFocus() {
    this.focus = true
  }

  qBlur() {
    this.focus = false
    this.searchToggled = false
  }

  searchToggleChange() {
    this.searchToggled = true
    this.focus = true
    this.qIpt._el.focus()
  }

  appChange() {
    this._isSpinning = true
    window.setTimeout(() => {
      this._isSpinning = false
    }, 2e3)
  }

  changeTheme(theme: ThemeType) {
    this.themeServ.setTheme(theme);
    this.settings.setLayout('theme', theme)
  }

  changeLang(lang: string) {
    this.tsServ.use(lang)
    this.settings.setLayout('lang', lang)
  }

  logout() {
    this.store.dispatch(new LogoutAction())
  }
}
