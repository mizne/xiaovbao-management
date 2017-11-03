import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'

import { Order, OrderResp } from './models/order.model'

import { APIResponse } from 'app/core/interceptors/api-error-interceptor'

@Injectable()
export class OrderService {
  private orderUrl = '/admin/order'
  private orderCountUrl = '/admin/orderByCount'
  constructor(private http: HttpClient) {}

  fetchOrders(
    tenantId: string,
    pageIndex: number,
    pageSize: number,
  ): Observable<Order[]> {
    const query = `?tenantId=${tenantId}&pageNumber=${pageIndex}&pageSize=${pageSize}`
    
    return this.http
      .get(this.orderUrl + query)
      .map(resp => (resp as APIResponse).result as OrderResp[])
      .map(result =>
        result.map(Order.convertFromResp)
      )
      .catch(this.handleError)
  }


  fetchOrderCount(tenantId: string): Observable<number> {
    const query = `/?tenantId=${tenantId}`

    return this.http
      .get(this.orderCountUrl + query)
      .map(resp => (resp as APIResponse).result)
      .catch(this.handleError)
  }


  private handleError(error: any) {
    const errMsg = error.message
      ? error.message
      : error.status ? `${error.status} - ${error.statusText}` : 'Server error'
    console.error(errMsg) // log to console instead
    return Observable.throw(errMsg)
  }
}
