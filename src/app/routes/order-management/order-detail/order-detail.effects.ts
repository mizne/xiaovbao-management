import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromOrderDetail from './order-detail.action'
import { OrderService } from '../order.service'

import { TenantService } from 'app/core/services/tenant.service'

@Injectable()
export class OrderDetailEffects {
  @Effect()
  fetchOrderDetail$ = this.actions$
    .ofType(fromOrderDetail.FETCH_ORDER_DETAIL)
    .map((action: fromOrderDetail.FectchOrderDetailAction) => action.tradeNo)
    .switchMap((tradeNo) => {
      return this.orderService
        .fetchOrderDetail(
          this.tenantService.tenantId,
          tradeNo
        )
        .map(order => new fromOrderDetail.FetchOrderDetailSuccessAction(order))
        .catch(e => Observable.of(new fromOrderDetail.FetchOrderDetailFailureAction()))
    })


  constructor(
    private actions$: Actions,
    private orderService: OrderService,
    private tenantService: TenantService,
  ) {}
}
