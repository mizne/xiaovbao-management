import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'

import { Goods } from './models/goods.model'
import { GoodsType } from './models/goodsType.model'
import { GoodsUnit } from './models/goodsUnit.model'

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
      query += `&goodsName=${goodsName}`
    }
    if (goodsType) {
      query += `&goodsType=${goodsType}`
    }
    return this.http
      .get(this.goodsUrl + query)
      .map(resp => (resp as APIResponse).result)
      .map(result =>
        result.map(e => ({
          id: e.id,
          name: e.name,
          listImageUrl: e.image,
          description: e.info,
          goodsTypeName: e.menuName,
          isActive: e.isActive,
          price: e.price,
          oldPrice: e.oldPrice,
          vipPrice: e.vipPrice,
          goodsUnitName: e.unit,
          sellCount: e.sellCount,
          totalCount: e.foodNum,
          restCount: e.rest
        }))
      )
      .catch(this.handleError)
  }
  
  addGoods(tenantId: string, goods: Goods): Observable<any> {
    return this.http
      .post(this.goodsUrl, {
        tenantId,
        food: {
          name: goods.name,
          image: goods.listImageUrl,
          minuteImage: goods.detailImageUrl,
          constPrice: goods.buyPrice,
          oldPrice: goods.price,
          vipPrice: goods.vipPrice,
          price: goods.price,
          foodNum: goods.totalCount,
          unitId: goods.goodsUnitId,
          info: goods.description,
          menuId: goods.goodsTypeId,
          isActive: goods.isActive
        }
      })
      .map(resp => (resp as APIResponse).result)
      .catch(this.handleError)
  }

  deleteGoods(tenantId: string, goodsId: string): Observable<any> {
    return Observable.of()
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
      food: goods,
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
      query += `&goodsName=${goodsName}`
    }
    if (goodsType) {
      query += `&goodsType=${goodsType}`
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
