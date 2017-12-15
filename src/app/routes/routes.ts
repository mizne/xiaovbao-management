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
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        data: { translate: 'index-page' }
      },
      {
        path: 'activity-management',
        loadChildren:
          './activity-management/activity-management.module#ActivityManagementModule',
        data: { translate: 'activity-management' }
      },
      {
        path: 'interactive-marketing',
        loadChildren:
          './interactive-marketing/interactive-marketing.module#InteractiveMarketingModule',
          data: { translate: 'interactive-marketing' }
      },
      {
        path: 'goods-management',
        loadChildren:
          './goods-management/goods-management.module#GoodsManagementModule',
          data: { translate: 'goods-management' }
      },
      {
        path: 'order-management',
        loadChildren:
          './order-management/order-management.module#OrderManagementModule',
          data: { translate: 'order-management' }
      },
      {
        path: 'jinxiaocun-management',
        loadChildren:
          './jinxiaocun-management/jinxiaocun-management.module#JinXiaoCunManagementModule',
          data: { translate: 'jinxiaocun-management' }
      },
      {
        path: 'customer-management',
        loadChildren:
          './customer-management/customer-management.module#CustomerManagementModule',
          data: { translate: 'customer-management' }
      },
      {
        path: 'qrcode-management',
        loadChildren:
          './qrcode-management/qrcode-management.module#QrcodeManagementModule',
          data: { translate: 'qrcode-management' }
      },
      {
        path: 'precise-analysis',
        loadChildren:
          './precise-analysis/precise-analysis.module#PreciseAnalysisModule',
          data: { translate: 'precise-analysis' }
      },
      {
        path: 'management-analysis',
        loadChildren:
          './management-analysis/management-analysis.module#ManagementAnalysisModule',
          data: { translate: 'management-analysis' }
      },
      {
        path: 'merchant-info',
        loadChildren: './merchant-info/merchant-info.module#MerchantInfoModule',
        data: { translate: 'merchant-info' }
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
  {
    path: 'login',
    component: LoginComponent,
    data: { translate: 'login' }
   },
  {
    path: 'forget',
    component: ForgetComponent,
    data: { translate: 'forget' }
  },
  {
    path: 'lock',
    component: LockComponent,
    data: { translate: 'lock' }
  },
  {
    path: 'bind-wechat',
    component: BindWechatComponent,
    data: { translate: 'bind-wechat' }
   }
]
