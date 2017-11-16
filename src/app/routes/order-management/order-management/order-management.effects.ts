import { NzNotificationService } from 'ng-zorro-antd'

import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromOrder from './order-management.action'
import { OrderService } from '../order.service'

import { TenantService } from 'app/core/services/tenant.service'

@Injectable()
export class OrderEffects {
  @Effect()
  fetchOrders$ = this.actions$
    .ofType(fromOrder.FETCH_ORDERS)
    .map((action: fromOrder.FectchOrdersAction) => action.payload)
    .switchMap(({ pageIndex, pageSize }) => {
      return this.orderService
        .fetchOrders(
          this.tenantService.tenantId,
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
        .fetchOrderCount(this.tenantService.tenantId)
        .map(count => new fromOrder.FetchOrdersCountSuccessAction(count))
        .catch(e => Observable.of(new fromOrder.FetchOrdersCountFailureAction()))
    })

  constructor(
    private actions$: Actions,
    private orderService: OrderService,
    private tenantService: TenantService,
    private notify: NzNotificationService
  ) {}
}
