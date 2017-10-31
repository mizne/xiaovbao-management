import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MenuService } from './menu.service';
import { TranslatorService } from '../translator/translator.service';
import { SettingsService } from './settings.service';
import { ACLService } from '../acl/acl.service';
import { TitleService } from '@core/services/title.service';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/withLatestFrom';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
    constructor(
        private menuService: MenuService,
        private tr: TranslatorService,
        private settingService: SettingsService,
        private aclService: ACLService,
        private titleService: TitleService,
        private httpClient: HttpClient,
      ) { }

    load(): Promise<any> {
        // only works with promises
        // https://github.com/angular/angular/issues/15088
        return new Promise((resolve, reject) => {
            this.httpClient.get('assets/app-data.json')
                           .subscribe((res) => {
                                this.settingService.setApp((res as any).app);
                                this.settingService.setUser((res as any).user);
                                this.aclService.set({
                                  role: ['hotel']
                                });
                                // 初始化菜单
                                this.menuService.add((res as any).menu);
                                // 调整语言
                                this.tr.use(this.settingService.layout.lang);
                                // 设置语言后缀
                                this.titleService.suffix = (res as any).app.name;

                                resolve(res);
                            }, (err: HttpErrorResponse) => {
                                resolve(null);
                            });
        });
    }
}
