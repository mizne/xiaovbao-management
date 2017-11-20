import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { TranslateModule } from '@ngx-translate/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgZorroAntdExtraModule } from 'ng-zorro-antd-extra'
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { BooleanPipe } from './pipes/boolean.pipe';
import { MomentPipe } from './pipes/moment.pipe';
import { OrderStatusPipe } from './pipes/order-status.pipe';
import { WrapTableComponent } from './components/wrap-table/wrap-table.component'


import {
  // LoggerModule,
  // NzLocaleModule,
  NzButtonModule,
  NzAlertModule,
  NzBadgeModule,
  // NzCalendarModule,
  NzCascaderModule,
  NzCheckboxModule,
  NzDatePickerModule,
  NzFormModule,
  NzInputModule,
  NzInputNumberModule,
  NzGridModule,
  NzMessageModule,
  NzModalModule,
  NzNotificationModule,
  NzPaginationModule,
  NzPopconfirmModule,
  NzPopoverModule,
  NzRadioModule,
  NzRateModule,
  NzSelectModule,
  NzSpinModule,
  NzSliderModule,
  NzSwitchModule,
  NzProgressModule,
  NzTableModule,
  NzTabsModule,
  NzTagModule,
  NzTimePickerModule,
  NzUtilModule,
  NzStepsModule,
  NzDropDownModule,
  NzMenuModule,
  NzBreadCrumbModule,
  NzLayoutModule,
  NzRootModule,
  NzCarouselModule,
  // NzCardModule,
  NzCollapseModule,
  NzTimelineModule,
  NzToolTipModule,
  // NzBackTopModule,
  // NzAffixModule,
  // NzAnchorModule,
  NzAvatarModule,
  // SERVICES
  NzNotificationService,
  NzMessageService
} from 'ng-zorro-antd';
const ZORROMODULES = [
  // LoggerModule,
  // NzLocaleModule,
  NzButtonModule,
  NzAlertModule,
  NzBadgeModule,
  // NzCalendarModule,
  NzCascaderModule,
  NzCheckboxModule,
  NzDatePickerModule,
  NzFormModule,
  NzInputModule,
  NzInputNumberModule,
  NzGridModule,
  NzMessageModule,
  NzModalModule,
  NzNotificationModule,
  NzPaginationModule,
  NzPopconfirmModule,
  NzPopoverModule,
  NzRadioModule,
  NzRateModule,
  NzSelectModule,
  NzSpinModule,
  NzSliderModule,
  NzSwitchModule,
  NzProgressModule,
  NzTableModule,
  NzTabsModule,
  NzTagModule,
  NzTimePickerModule,
  NzUtilModule,
  NzStepsModule,
  NzDropDownModule,
  NzMenuModule,
  NzBreadCrumbModule,
  NzLayoutModule,
  NzRootModule,
  NzCarouselModule,
  // NzCardModule,
  NzCollapseModule,
  NzTimelineModule,
  NzToolTipModule,
  // NzBackTopModule,
  // NzAffixModule,
  // NzAnchorModule,
  NzAvatarModule
];

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
        ChartsModule,
        // NgxQRCodeModule,
        ...ZORROMODULES,
        NgZorroAntdExtraModule.forRoot(),
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
        ...ZORROMODULES,
        NgZorroAntdExtraModule,
        RouterModule,
        TranslateModule,
        FileUploadModule,
        ChartsModule,
        NgxQRCodeModule,
        ...pipes,
        ...components,
        ...directives
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
              NzNotificationService,
              NzMessageService
            ]
        };
    }
}
