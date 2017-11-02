import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

import * as R from 'ramda'

import { Activity } from './models/activity.model'
import { DiscountActivity } from './models/discount-activity.model'
import { APIResponse } from 'app/core/interceptors/api-error-interceptor'

@Injectable()
export class ActivityService {
    private fetchActivityUrl = '/admin/goodsPromotion'
    private fetchActivityCountUrl = '/admin/goodsPromotionCount'

    constructor(private http: HttpClient) {
    }

    fetchActivity(tenantId: string): Observable<Activity[]> {
      const query = `
      ?tenantId=${tenantId}
      `
      return this.http.get(this.fetchActivityUrl + query)
      .map(resp => (resp as APIResponse).result)
      .map(e => e.map(this.convert))
      .catch(this.handleError)
    }

    fetchActivityCount(tenantId: string): Observable<number> {
      const query = `?tenantId=${tenantId}`
      
      return this.http.get(this.fetchActivityCountUrl + query)
      .map(resp => (resp as APIResponse).result)
      .catch(this.handleError)
    }


    fetchDiscountActivity(tenantId: string): Observable<DiscountActivity[]> {
      return Observable.of([
        {
          id: '11',
          goodsId: '22',
          goodsName: 'testGoodsName',
          originalPrice: 11,
          discount: 0.6,
          activityPrice: 8,
          purchaseLimitCount: 3,
          target: 'all',
          qrcodeTemplateId: 'templateId'
        }
      ])
    }

    fetchDiscountActivityCount(tenantId: string): Observable<number> {
      return Observable.of(11)
    }

    private convert(srcObj): Activity {
      return {
        id: srcObj.id as string,
        type: srcObj.type as number,
        name: srcObj.name as string,
        status: srcObj.status as string
      }
    }

    private handleError(error: any) {
      const errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
      return Observable.throw(errMsg);
  }


}
