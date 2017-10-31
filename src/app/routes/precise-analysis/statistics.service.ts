import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';

import { PreciseAnalysis } from './models/precise-analysis.model'
import { APIResponse } from 'app/shared/api-error-interceptor'

@Injectable()
export class StatisticsService {
    private fetchQrcodesUrl = '/admin/QRCodeTemplate'
    private fetchQrcodessCountUrl = '/admin/QRCodeTemplateCount'
    private delQrcodeUrl = '/admin/QRCodeTemplate'

    private tenantId = '18d473e77f459833bb06c60f9a8f0001'

    constructor(private http: HttpClient) {
    }

    fetchPreciseAnalysis({ action, startDate, endDate, pageIndex, pageSize }): Observable<PreciseAnalysis[]> {
      const query = `?tenantId=${this.tenantId}&pageNumber=${pageIndex}&pageSize=${pageSize}`
      // return this.http.get(this.fetchQrcodesUrl + query)
      // .map(resp => (resp as APIResponse).result)
      // .map(result => result.map(e => ({
      //   id: e.id,
      //   bizType: e.bizType,
      //   consigneeId: e.consigneeId,
      //   consigneeName: e.consigneeName,
      //   couponRate: e.couponRate,
      //   couponType: e.couponType,
      //   couponValue: e.couponValue,
      //   description: e.descriptor,
      //   tableName: e.tableName,
      //   tenantId: e.tenantId,
      //   tenantName: e.tenantName
      // })))
      // .catch(this.handleError);

      return Observable.of(Array.from({length: 11}, (_, i) => ({
        name: `fakeName${i}`,
        phone: `fakePhone${i}`,
        isVip: i % 2 === 0
      })))
    }

    fetchPreciseAnalysisCount({ action, startDate, endDate }): Observable<number> {
      // return this.http.get(this.fetchQrcodessCountUrl + `/?tenantId=${this.tenantId}`)
      // .map(resp => (resp as APIResponse).result)
      // .catch(this.handleError)
      return Observable.of(11)
    }

    private handleError(error: any) {
      const errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
      return Observable.throw(errMsg);
  }


}
