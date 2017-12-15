import { BrowserModule } from '@angular/platform-browser'
import {
  NgModule,
  APP_INITIALIZER,
  LOCALE_ID,
  ErrorHandler
} from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

import * as Raven from 'raven-js'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { reducers } from './reducers'

import { AppComponent } from './app.component'
import { StartupService } from './core/services/startup.service'

import { SharedModule } from './shared/shared.module'
import { RoutesModule } from './routes/routes.module'
import { LayoutModule } from './layout/layout.module'
import { CoreModule } from './core/core.module'

import { ApiErrorInterceptor } from './core/interceptors/api-error-interceptor'
import { TokenInterceptor } from './core/interceptors/token.interceptor'

import { environment } from '../environments/environment'

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `assets/i18n/`, '.json')
}

export function StartupServiceFactory(
  startupService: StartupService
): Function {
  return () => startupService.load()
}

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err)
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    LayoutModule,
    RoutesModule,

    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule,
    !environment.production
      ? StoreDevtoolsModule.instrument({
          maxAge: 42
        })
      : [],
    EffectsModule.forRoot([]),

    SharedModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'zh-Hans' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiErrorInterceptor, multi: true },
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: StartupServiceFactory,
      deps: [StartupService],
      multi: true
    },
    { provide: ErrorHandler, useClass: RavenErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
