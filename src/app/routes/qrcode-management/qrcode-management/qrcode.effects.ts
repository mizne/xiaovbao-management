import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/exhaustMap'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { of } from 'rxjs/observable/of'

import * as fromQrcode from './qrcode.action'
import { QrcodeService } from '../qrcode.service'

@Injectable()
export class QrcodeEffects {
  @Effect()
  fetchQrcodes$ = this.actions$.ofType(fromQrcode.FETCH_QRCODES)
  .map((action: fromQrcode.FectchQrcodesAction) => action.payload)
  .mergeMap(({ pageIndex, pageSize }) => {
    return this.qrcodeService.fetchQrcodes(pageIndex, pageSize)
    .map(qrcodes => new fromQrcode.FetchQrcodesSuccessAction(qrcodes))
    .catch(e => of(new fromQrcode.FetchQrcodesFailureAction()))
  })

  @Effect()
  fetchQrcodesCount$ = this.actions$.ofType(fromQrcode.FETCH_QRCODE_COUNT)
  .mergeMap(() => {
    return this.qrcodeService.fetchQrcodesCount()
    .map(count => new fromQrcode.FetchQrcodeCountSuccessAction(count))
    .catch(e => of(new fromQrcode.FetchQrcodeCountFailureAction()))
  })

  @Effect()
  delQrcode$ = this.actions$.ofType(fromQrcode.ENSURE_DELETE_QRCODE)
  .map((action: fromQrcode.EnsureDeleteQrcodeAction) => action.payload)
  .mergeMap(({ id, pageIndex, pageSize }) => {
    return this.qrcodeService.delQrcode(id)
    .concatMap(() => [
      new fromQrcode.DeleteQrcodeSuccessAction(),
      new fromQrcode.FectchQrcodesAction({ pageIndex, pageSize })
    ])
    .catch(e => of(new fromQrcode.DeleteQrcodeFailureAction()))
  })


  constructor(
    private actions$: Actions,
    private qrcodeService: QrcodeService
  ) {}
}
