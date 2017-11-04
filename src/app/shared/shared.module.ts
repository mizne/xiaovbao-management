import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { TranslateModule } from '@ngx-translate/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { BooleanPipe } from './pipes/boolean.pipe';
import { MomentPipe } from './pipes/moment.pipe';
import { OrderStatusPipe } from './pipes/order-status.pipe';
import { WrapTableComponent } from './components/wrap-table/wrap-table.component'

const pipes = [
  BooleanPipe,
  MomentPipe,
  OrderStatusPipe,
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
        ChartsModule,
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
        ChartsModule,
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
