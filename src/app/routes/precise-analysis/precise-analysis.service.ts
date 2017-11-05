import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as R from 'ramda'

import { PreciseAnalysis } from './models/precise-analysis.model'
import { APIResponse } from 'app/core/interceptors/api-error-interceptor'

@Injectable()
export class PreciseAnalysisService {
    private fetchPreciseAnalysisUrl = '/admin/customerEchats'
    private fetchPreciseAnalysisCountUrl = '/admin/customerEchatsCount'

    constructor(private http: HttpClient) {
    }

    fetchPreciseAnalysis({ tenantId, action, startDate, endDate, pageIndex, pageSize }): Observable<PreciseAnalysis[]> {
      const query = `
      ?tenantId=${tenantId}
      &action=${action}
      &startDate=${startDate}
      &endDate=${endDate}
      &pageNumber=${pageIndex}
      &pageSize=${pageSize}
      `

      return this.http.get(this.fetchPreciseAnalysisUrl + query)
      .map(resp => (resp as APIResponse).result)
      .map(e => e.map(this.convert))
      .catch(this.handleError)
    }

    fetchPreciseAnalysisCount({ tenantId, action, startDate, endDate }): Observable<number> {
      const query = `?tenantId=${tenantId}&action=${action}&startDate=${startDate}&endDate=${endDate}`

      return this.http.get(this.fetchPreciseAnalysisCountUrl + query)
      .map(resp => (resp as APIResponse).result)
      .catch(this.handleError)
    }

    private convert(srcObj): PreciseAnalysis {
      return {
        id: srcObj.id,
        name: srcObj.name,
        phone: srcObj.phone,
        isVip: !R.isEmpty(srcObj.vip),
        selected: false
      }
    }

    private handleError(error: any) {
      const errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
      return Observable.throw(errMsg);
  }


}
