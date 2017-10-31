import { NgModule, Optional, SkipSelf } from '@angular/core'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { throwIfAlreadyLoaded } from './module-import-guard'

import { SettingsService } from './services/settings.service'
import { MenuService } from './services/menu.service'
import { ThemesService } from './services/themes.service'
import { TranslatorService } from './translator/translator.service'
import { ScrollService } from './services/scroll.service'
import { ColorsService } from './services/colors.service'
import { ACLService } from './acl/acl.service'
import { TokenService } from './net/token/token.service'
import { _HttpClient } from './services/http.client'
import { TitleService } from '@core/services/title.service'
import { LocalStorageService } from './services/localstorage.service'
import { SMSService } from './services/sms.service'
import { AuthGuard } from './services/auth-guard.service'


@NgModule({
  imports: [],
  providers: [
    ThemesService,
    SettingsService,
    MenuService,
    TranslatorService,
    ScrollService,
    ColorsService,
    ACLService,
    TokenService,
    TitleService,
    LocalStorageService,
    SMSService,
    AuthGuard,
  ],
  declarations: [],
  exports: []
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule')
  }
}
