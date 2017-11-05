import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as R from 'ramda'

import { Activity, ActivityType, ActivityStatus } from './models/activity.model'
import { DiscountActivity } from './models/discount-activity.model'
import { APIResponse } from 'app/core/interceptors/api-error-interceptor'

@Injectable()
export class ActivityService {
    private discountActivityUrl = '/admin/goodsPromotion'
    private discountActivityCountUrl = '/admin/goodsPromotionCount'

    constructor(private http: HttpClient) {
    }

    fetchActivity(tenantId: string): Observable<Activity[]> {
      return Observable.of([
        {
          id: '1',
          type: ActivityType.DISCOUNT,
          name: '折扣商品',
          status: ActivityStatus.PROCESSING
        }
      ])
    }

    fetchActivityCount(tenantId: string): Observable<number> {
      return Observable.of(1)
    }


    fetchDiscountActivity(tenantId: string, pageIndex: number = 1, pageSize: number = 10): Observable<DiscountActivity[]> {
      const query = `?tenantId=${tenantId}&pageNumber=${pageIndex}&pageSize=${pageSize}`
      return this.http.get(this.discountActivityUrl + `?tenantId=${tenantId}`)
      .map(resp => (resp as APIResponse).result)
      .map(res => res.map(DiscountActivity.convertFromResp))
      .catch(this.handleError)
    }

    fetchDiscountActivityCount(tenantId: string): Observable<number> {
      return this.http.get(this.discountActivityCountUrl + `?tenantId=${tenantId}`)
      .map(resp => (resp as APIResponse).result)
      .catch(this.handleError)
    }

    createDiscountActivity(tenantId: string, activity: DiscountActivity): Observable<any> {
      return this.http.post(this.discountActivityUrl, {
        tenantId,
        ...DiscountActivity.convertFromModel(activity)
      })
      .map(resp => (resp as APIResponse).result)
      .catch(this.handleError)
    }

    deleteDiscountActivity(tenantId: string, activityId: string) {
      return this.http.delete(this.discountActivityUrl + `?tenantId=${tenantId}&id=${activityId}`)
      .map(resp => (resp as APIResponse).result)
      .catch(this.handleError)
    }

    private handleError(error: any) {
      const errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
      return Observable.throw(errMsg);
  }


}
