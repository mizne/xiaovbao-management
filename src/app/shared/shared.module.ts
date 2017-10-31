import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { TranslateModule } from '@ngx-translate/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { ApiErrorInterceptor } from './api-error-interceptor'
import { BooleanPipe } from './pipes/boolean.pipe'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        // HttpClientModule,
        FileUploadModule,
        NgZorroAntdModule.forRoot(),
    ],
    declarations: [
      BooleanPipe
    ],
    providers: [
      // { provide: HTTP_INTERCEPTORS, useClass: ApiErrorInterceptor, multi: true }
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        // HttpClientModule,
        NgZorroAntdModule,
        RouterModule,
        TranslateModule,
        FileUploadModule,
        BooleanPipe
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
