import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/observable'
import { NzNotificationService } from 'ng-zorro-antd'

import * as fromQrcode from './qrcode.action'
import { QrcodeService } from 'app/core/services/qrcode.service'
import { LocalStorageService } from 'app/core/services/localstorage.service'
import { TableService } from '../table.service'

@Injectable()
export class QrcodeEffects {
  @Effect()
  fetchQrcodes$ = this.actions$
    .ofType(fromQrcode.FETCH_QRCODES)
    .map((action: fromQrcode.FectchQrcodesAction) => action.payload)
    .switchMap(({ pageIndex, pageSize }) => {
      return this.qrcodeService
        .fetchQrcodes(this.local.tenantId, pageIndex, pageSize)
        .map(qrcodes => new fromQrcode.FetchQrcodesSuccessAction(qrcodes))
        .catch(e => Observable.of(new fromQrcode.FetchQrcodesFailureAction()))
    })

  @Effect()
  fetchQrcodesCount$ = this.actions$
    .ofType(fromQrcode.FETCH_QRCODE_COUNT)
    .switchMap(() => {
      return this.qrcodeService
        .fetchQrcodesCount(this.local.tenantId)
        .map(count => new fromQrcode.FetchQrcodeCountSuccessAction(count))
        .catch(e => Observable.of(new fromQrcode.FetchQrcodeCountFailureAction()))
    })

  @Effect()
  delQrcode$ = this.actions$
    .ofType(fromQrcode.DELETE_QRCODE)
    .map((action: fromQrcode.DeleteQrcodeAction) => action.qrcodeId)
    .switchMap(id => {
      return this.qrcodeService
        .delQrcode(this.local.tenantId, id)
        .concatMap(() => [
          new fromQrcode.DeleteQrcodeSuccessAction(),
          new fromQrcode.FectchQrcodesAction(),
          new fromQrcode.FetchQrcodeCountAction()
        ])
        .catch(e => Observable.of(new fromQrcode.DeleteQrcodeFailureAction()))
    })
  @Effect({ dispatch: false })
  delQrcodeSuccess$ = this.actions$
    .ofType(fromQrcode.DELETE_QRCODE_SUCCESS)
    .do(() => {
      this.notify.success('删除二维码', '恭喜您 删除二维码成功！')
    })
  @Effect({ dispatch: false })
  delQrcodeFailure$ = this.actions$
    .ofType(fromQrcode.DELETE_QRCODE_FAILURE)
    .do(() => {
      this.notify.error('删除二维码', '删除二维码失败！')
    })

  @Effect()
  editQrcode$ = this.actions$
    .ofType(fromQrcode.EDIT_QRCODE)
    .map((action: fromQrcode.EditQrcodeAction) => action.qrcode)
    .switchMap(qrcode => {
      return this.qrcodeService
        .editQrcode(this.local.tenantId, qrcode)
        .concatMap(() => [
          new fromQrcode.EditQrcodeSuccessAction(),
          new fromQrcode.FectchQrcodesAction()
        ])
        .catch(e => Observable.of(new fromQrcode.EditQrcodeFailureAction()))
    })
  @Effect({ dispatch: false })
  editQrcodeSuccess$ = this.actions$
    .ofType(fromQrcode.EDIT_QRCODE_SUCCESS)
    .do(() => {
      this.notify.success('编辑二维码', '恭喜您 编辑二维码成功！')
    })
  @Effect({ dispatch: false })
  editQrcodeFailure$ = this.actions$
    .ofType(fromQrcode.EDIT_QRCODE_FAILURE)
    .do(() => {
      this.notify.error('编辑二维码', '编辑二维码失败！')
    })

  @Effect()
  fetchTable$ = this.actions$.ofType(fromQrcode.FETCH_TABLE).switchMap(() => {
    return this.tableService
      .fetchQrcodes(this.local.tenantId)
      .map(tables => new fromQrcode.FetchTableSuccessAction(tables))
      .catch(e => Observable.of(new fromQrcode.FetchTableFailureAction()))
  })

  constructor(
    private actions$: Actions,
    private qrcodeService: QrcodeService,
    private tableService: TableService,
    private local: LocalStorageService,
    private notify: NzNotificationService
  ) {}
}
