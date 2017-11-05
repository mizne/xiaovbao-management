import { enableProdMode, ViewEncapsulation } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { hmrBootstrap } from './hmr';

import './app/core/preloader/preloader';
import './rxjs-imports.ts'

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => {
  return platformBrowserDynamic().bootstrapModule(AppModule, { defaultEncapsulation: ViewEncapsulation.None });
};

if (environment.hmr) {
  if (module['hot']) {
      hmrBootstrap(module, bootstrap);
  } else {
      console.error('HMR is not enabled for webpack-dev-server!');
      console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap().then(() => {
    if ((<any>window).appBootstrap) {
      (<any>window).appBootstrap();
    }
  });
}
