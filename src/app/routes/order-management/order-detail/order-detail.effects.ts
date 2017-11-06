import { NzNotificationService } from 'ng-zorro-antd'

import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromOrderDetail from './order-detail.action'
import { OrderService } from '../order.service'

import { LocalStorageService } from 'app/core/services/localstorage.service'

@Injectable()
export class OrderDetailEffects {
  @Effect()
  fetchOrderDetail$ = this.actions$
    .ofType(fromOrderDetail.FETCH_ORDER_DETAIL)
    .map((action: fromOrderDetail.FectchOrderDetailAction) => action.tradeNo)
    .switchMap((tradeNo) => {
      return this.orderService
        .fetchOrderDetail(
          this.local.tenantId,
          tradeNo
        )
        .map(order => new fromOrderDetail.FetchOrderDetailSuccessAction(order))
        .catch(e => Observable.of(new fromOrderDetail.FetchOrderDetailFailureAction()))
    })


  constructor(
    private actions$: Actions,
    private orderService: OrderService,
    private local: LocalStorageService,
    private notify: NzNotificationService
  ) {}
}
