import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'

import { Goods } from './models/goods.model'
import { GoodsType } from './models/goodsType.model'

import { APIResponse } from '../../shared/api-error-interceptor'

@Injectable()
export class GoodsService {
  private fetchGoodsUrl = '/admin/food'
  private fetchGoodsCountUrl = '/admin/foodByCount'
  private fetchGoodsTypeUrl = '/admin/menus'
  private tenantId = '18d473e77f459833bb06c60f9a8f0001'
  constructor(private http: HttpClient) {}

  fetchAllGoods(): Observable<Goods[]> {
    return this.http
      .get(this.fetchGoodsUrl + '/?tenantId=18d473e77f459833bb06c60f9a8f0001')
      .map(resp => (resp as APIResponse).result)
      .map(result =>
        result.map(e => ({
          id: e.id,
          name: e.name,
          imageUrl: e.image,
          description: e.info,
          goodsType: e.menuName,
          price: e.price,
          oldPrice: e.oldPrice,
          vipPrice: e.vipPrice,
          unit: e.unit,
          sellCount: e.sellCount,
          totalCount: e.foodNum,
          restCount: e.rest
        }))
      )
      .catch(this.handleError)
  }

  fetchGoods(pageIndex: number, pageSize: number): Observable<Goods[]> {
    const query = `?tenantId=${this
      .tenantId}&pageNumber=${pageIndex}&pageSize=${pageSize}`
    return this.http
      .get(this.fetchGoodsUrl + query)
      .map(resp => (resp as APIResponse).result)
      .map(result =>
        result.map(e => ({
          id: e.id,
          name: e.name,
          imageUrl: e.image,
          description: e.info,
          goodsType: e.menuName,
          price: e.price,
          oldPrice: e.oldPrice,
          vipPrice: e.vipPrice,
          unit: e.unit,
          sellCount: e.sellCount,
          totalCount: e.foodNum,
          restCount: e.rest
        }))
      )
      .catch(this.handleError)
  }

  fetchGoodsCount(): Observable<number> {
    return this.http
      .get(
        this.fetchGoodsCountUrl + '/?tenantId=18d473e77f459833bb06c60f9a8f0001'
      )
      .map(resp => (resp as APIResponse).result)
      .catch(this.handleError)
  }

  fetchAllGoodsTypes(): Observable<GoodsType[]> {
    return this.http
      .get(
        this.fetchGoodsTypeUrl + '/?tenantId=18d473e77f459833bb06c60f9a8f0001'
      )
      .map(resp => (resp as APIResponse).result)
      .map(result =>
        result.map(e => ({
          id: e.id,
          name: e.name
        }))
      )
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
