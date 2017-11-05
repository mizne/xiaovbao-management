import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { Goods, GoodsResp } from 'app/routes/goods-management/models/goods.model'
import { GoodsType } from 'app/routes/goods-management/models/goodsType.model'
import { GoodsUnit } from 'app/routes/goods-management/models/goodsUnit.model'

import { APIResponse } from 'app/core/interceptors/api-error-interceptor'

@Injectable()
export class GoodsService {
  private goodsUrl = '/admin/food'
  private goodsCountUrl = '/admin/foodByCount'
  private goodsTypeUrl = '/admin/menus'
  private goodsUnitUrl = '/admin/units'
  constructor(private http: HttpClient) {}

  fetchGoods(
    tenantId: string,
    pageIndex: number,
    pageSize: number,
    goodsName?: string,
    goodsType?: string
  ): Observable<Goods[]> {
    let query = `?tenantId=${tenantId}&pageNumber=${pageIndex}&pageSize=${pageSize}`
    if (goodsName) {
      query += `&name=${goodsName}`
    }
    if (goodsType) {
      query += `&menuId=${goodsType}`
    }
    return this.http
      .get(this.goodsUrl + query)
      .map(resp => (resp as APIResponse).result as GoodsResp[])
      .map(result =>
        result.map(Goods.convertFromResp)
      )
      .catch(this.handleError)
  }

  addGoods(tenantId: string, goods: Goods): Observable<any> {
    return this.http
      .post(this.goodsUrl, {
        tenantId,
        food: Goods.convertFromModel(goods)
      })
      .map(resp => (resp as APIResponse).result)
      .catch(this.handleError)
  }

  offShelfGoods(tenantId: string, goodsId: string): Observable<any> {
    return this.editGoods(tenantId, goodsId, {isActive: false})
  }

  onShelfGoods(tenantId: string, goodsId: string): Observable<any> {
    return this.editGoods(tenantId, goodsId, {isActive: true})
  }

  editGoods(tenantId: string, goodsId: string, goods: Goods): Observable<any> {
    return this.http
    .put(this.goodsUrl, {
      food: Goods.convertFromModel(goods),
      condition: {
        tenantId,
        id: goodsId
      }
    })
    .map(resp => (resp as APIResponse).result)
    .catch(this.handleError)
  }


  fetchGoodsCount(tenantId: string, goodsName?: string, goodsType?: string): Observable<number> {
    let query = `/?tenantId=${tenantId}`
    if (goodsName) {
      query += `&name=${goodsName}`
    }
    if (goodsType) {
      query += `&menuId=${goodsType}`
    }

    return this.http
      .get(this.goodsCountUrl + query)
      .map(resp => (resp as APIResponse).result)
      .catch(this.handleError)
  }

  fetchAllGoodsTypes(tenantId: string): Observable<GoodsType[]> {
    return this.http
      .get(this.goodsTypeUrl + `/?tenantId=${tenantId}`)
      .map(resp => (resp as APIResponse).result)
      .map(result =>
        result.map(e => ({
          id: e.id,
          name: e.name
        }))
      )
      .catch(this.handleError)
  }

  addGoodsType(tenantId: string, goodsTypeName: string): Observable<any> {
    return this.http
      .post(this.goodsTypeUrl, {
        tenantId,
        menu: {
          name: goodsTypeName
        }
      })
      .map(resp => (resp as APIResponse).result)
      .catch(this.handleError)
  }

  fetchAllGoodsUnits(tenantId: string): Observable<GoodsUnit[]> {
    return this.http
      .get(this.goodsUnitUrl + `?tenantId=${tenantId}`)
      .map(resp => (resp as APIResponse).result)
      .map(e =>
        e.map(f => ({
          id: f.id,
          name: f.goodUnit
        }))
      )
      .catch(this.handleError)
  }

  addGoodsUnit(tenantId: string, goodsUnit: string): Observable<any> {
    return this.http
      .post(this.goodsUnitUrl, {
        unit: {
          tenantId,
          goodUnit: goodsUnit
        }
      })
      .map(resp => (resp as APIResponse).result)
      .map(e => ({
        id: name
      }))
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
