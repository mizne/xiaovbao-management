import { NzNotificationService } from 'ng-zorro-antd'

import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/observable'

import * as fromOrder from './order-management.action'
import { OrderService } from '../order.service'

import { LocalStorageService } from 'app/core/services/localstorage.service'

@Injectable()
export class OrderEffects {
  @Effect()
  fetchOrders$ = this.actions$
    .ofType(fromOrder.FETCH_ORDERS)
    .map((action: fromOrder.FectchOrdersAction) => action.payload)
    .switchMap(({ pageIndex, pageSize }) => {
      return this.orderService
        .fetchOrders(
          this.local.tenantId,
          pageIndex,
          pageSize,
        )
        .map(orders => new fromOrder.FetchOrdersSuccessAction(orders))
        .catch(e => Observable.of(new fromOrder.FetchOrdersFailureAction()))
    })

  @Effect()
  fetchGoodsCount$ = this.actions$
    .ofType(fromOrder.FETCH_ORDERS_COUNT)
    .switchMap(() => {
      return this.orderService
        .fetchOrderCount(this.local.tenantId)
        .map(count => new fromOrder.FetchOrdersCountSuccessAction(count))
        .catch(e => Observable.of(new fromOrder.FetchOrdersCountFailureAction()))
    })

  constructor(
    private actions$: Actions,
    private orderService: OrderService,
    private local: LocalStorageService,
    private notify: NzNotificationService
  ) {}
}
