import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import { APIResponse } from 'app/core/interceptors/api-error-interceptor'
import { MerchantInfo, MerchantInfoResp } from './models/merchat-info.model'

@Injectable()
export class MerchantInfoService {
  private merchantInfoUrl = '/admin/deal/tenantInfo'
  constructor(private http: HttpClient) {}

  fetchMerchantInfo(
    tenantId: string,
  ): Observable<MerchantInfo> {
    const query = `?tenantId=${tenantId}`
    
    return this.http.get(this.merchantInfoUrl + query)
    .map(res => (res as APIResponse).result as MerchantInfoResp)
    .map(MerchantInfo.convertFromResp)
    .catch(this.handleError)

    // return Observable.of({
    //   name: 'testName',
    //   industry: 'email'
    // }).delay(3e3)
  }

  updateMerchantInfp(tenantId: string, merchantInfo: MerchantInfo): Observable<any> {
    return this.http.post(this.merchantInfoUrl, MerchantInfo.convertFromModel(merchantInfo))
    .map(res => (res as APIResponse).result)
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
