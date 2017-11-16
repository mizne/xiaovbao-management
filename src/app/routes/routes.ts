import { Routes } from '@angular/router'

import { AuthGuard } from 'app/core/services/auth-guard.service'

import { LayoutComponent } from '../layout/layout.component'
import { LoginComponent } from './pages/login/login.component'
import { LockComponent } from './pages/lock/lock.component'
import { RegisterComponent } from './pages/register/register.component'
import { RegisterSuccessComponent } from './pages/register-success/register-success.component'
import { ForgetComponent } from './pages/forget/forget.component'
import { BindWechatComponent } from './pages/bind-wechat/bind-wechat.component'
// import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
// import { Page404Component } from './pages/404/404.component';
// import { Page500Component } from './pages/500/500.component';
import { IndexPageComponent } from './dashboard/index/index-page.component'

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'index-page', pathMatch: 'full' },
      { path: 'dashboard', redirectTo: 'index-page', pathMatch: 'full' },
      {
        path: 'index-page',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'activity-management',
        loadChildren:
          './activity-management/activity-management.module#ActivityManagementModule'
      },
      {
        path: 'interactive-marketing',
        loadChildren:
          './interactive-marketing/interactive-marketing.module#InteractiveMarketingModule'
      },
      {
        path: 'goods-management',
        loadChildren:
          './goods-management/goods-management.module#GoodsManagementModule'
      },
      {
        path: 'order-management',
        loadChildren:
          './order-management/order-management.module#OrderManagementModule'
      },
      {
        path: 'jinxiaocun-management',
        loadChildren:
          './jinxiaocun-management/jinxiaocun-management.module#JinXiaoCunManagementModule'
      },
      {
        path: 'customer-management',
        loadChildren:
          './customer-management/customer-management.module#CustomerManagementModule'
      },
      {
        path: 'qrcode-management',
        loadChildren:
          './qrcode-management/qrcode-management.module#QrcodeManagementModule'
      },
      {
        path: 'precise-analysis',
        loadChildren:
          './precise-analysis/precise-analysis.module#PreciseAnalysisModule'
      },
      {
        path: 'management-analysis',
        loadChildren:
          './management-analysis/management-analysis.module#ManagementAnalysisModule'
      },
      {
        path: 'merchant-info',
        loadChildren:
          './merchant-info/merchant-info.module#MerchantInfoModule'
      }
    ]
  },
  // 单页不包裹Layout
  {
    path: 'register',
    component: RegisterComponent,
    data: { translate: 'register' }
  },
  {
    path: 'register-success',
    component: RegisterSuccessComponent,
    data: { translate: 'register-success' }
  },
  { path: 'login', component: LoginComponent },
  { path: 'forget', component: ForgetComponent, data: { translate: 'forget' } },
  { path: 'lock', component: LockComponent, data: { translate: 'lock' } },
  { path: 'bind-wechat', component: BindWechatComponent }
]
