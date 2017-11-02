import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { TranslateModule } from '@ngx-translate/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { BooleanPipe } from './pipes/boolean.pipe';
import { WrapTableComponent } from './components/wrap-table/wrap-table.component'

const pipes = [
  BooleanPipe
]

const components = [
  WrapTableComponent
]

const directives = [

]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FileUploadModule,
        NgZorroAntdModule.forRoot(),
    ],
    declarations: [
      ...pipes,
      ...components,
      ...directives
    ],
    providers: [
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        RouterModule,
        TranslateModule,
        FileUploadModule,
        ...pipes,
        ...components,
        ...directives
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
