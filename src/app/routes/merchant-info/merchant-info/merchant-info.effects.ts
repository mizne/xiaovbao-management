import { NzNotificationService } from 'ng-zorro-antd'

import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromMerchantInfo from './merchant-info.action'
import { MerchantInfoService } from '../merchat-info.service'
import { TenantService } from 'app/core/services/tenant.service'

@Injectable()
export class MerchantInfoEffects {
  @Effect()
  fetchMerchantInfo$ = this.actions$.ofType(fromMerchantInfo.FETCH_MERCHANT_INFO)
  .switchMap(() => {
    return this.merchantInfoService.fetchMerchantInfo(this.tenantService.tenantId)
    .map(merchantInfo => new fromMerchantInfo.FetchMerchantInfoSuccessAction(merchantInfo))
    .catch(e => Observable.of(new fromMerchantInfo.FetchMerchantInfoFailureAction()))
  })

  @Effect()
  editMerchantInfo$ = this.actions$.ofType(fromMerchantInfo.EDIT_MERCHANT_INFO)
  .map((action: fromMerchantInfo.EditMerchantInfoAction) => action.merchantInfo)
  .switchMap((merchantInfo) => {
    return this.merchantInfoService.editMerchantInfo(this.tenantService.tenantId, merchantInfo)
    .map((_) => new fromMerchantInfo.EditMerchatInfoSuccessAction())
    .catch(e => Observable.of(new fromMerchantInfo.EditMerchantInfoFailureAction()))
  })

  @Effect({ dispatch: false })
  editMerchantInfoSuccess$ = this.actions$.ofType(fromMerchantInfo.EDIT_MERCHANT_INFO_SUCCESS)
  .do(() => {
    this.notify.success('商家信息', '恭喜您 保存商家信息成功！')
  })

  @Effect({ dispatch: false })
  editMerchantInfoFailure$ = this.actions$.ofType(fromMerchantInfo.EDIT_MERCHANT_INFO_FAILURE)
  .do(() => {
    this.notify.error('商家信息', '保存商家信息失败！')
  })


  @Effect()
  changePassword$ = this.actions$.ofType(fromMerchantInfo.CHANGE_PASSWORD)
  .map((action: fromMerchantInfo.ChangePasswordAction) => action.payload)
  .switchMap(({ oldPassword, newPassword }) => {
    return this.merchantInfoService.changePassword(this.tenantService.tenantId, oldPassword, newPassword)
    .map((_) => new fromMerchantInfo.ChangePasswordSuccessAction())
    .catch(e => Observable.of(new fromMerchantInfo.ChangePasswordFailureAction()))
  })

  @Effect({ dispatch: false })
  changePasswordSuccess$ = this.actions$.ofType(fromMerchantInfo.CHANGE_PASSWORD_SUCCESS)
  .do(() => {
    this.notify.success('更正密码', '恭喜您 修改密码成功！')
  })

  @Effect({ dispatch: false })
  changePasswordFailure$ = this.actions$.ofType(fromMerchantInfo.CHANGE_PASSWORD_FAILURE)
  .do(() => {
    this.notify.error('更正密码', '修改密码失败！')
  })


  constructor(
    private actions$: Actions,
    private merchantInfoService: MerchantInfoService,
    private tenantService: TenantService,
    private notify: NzNotificationService
  ) {}
}
