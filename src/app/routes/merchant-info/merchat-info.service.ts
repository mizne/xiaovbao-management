import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import { APIResponse } from 'app/core/interceptors/api-error-interceptor'
import { MerchantInfo, MerchantInfoResp } from './models/merchat-info.model'

@Injectable()
export class MerchantInfoService {
  private merchantInfoUrl = '/admin/deal/tenantInfo'
  private changePasswordUrl = '/admin/changePassword'

  constructor(private http: HttpClient) {}

  fetchMerchantInfo(
    tenantId: string,
  ): Observable<MerchantInfo> {
    const query = `?tenantId=${tenantId}`
    
    return this.http.get(this.merchantInfoUrl + query)
    .map(res => (res as APIResponse).result[0] as MerchantInfoResp)
    .map(MerchantInfo.convertFromResp)
    .catch(this.handleError)

    // return Observable.of({
    //   name: 'testName',
    //   industry: 'email'
    // }).delay(3e3)
  }

  editMerchantInfo(tenantId: string, merchantInfo: MerchantInfo): Observable<any> {
    return this.http.put(this.merchantInfoUrl, {
      tenantConfig: MerchantInfo.convertFromModel(merchantInfo),
      condition: {
        tenantId
      }
    })
    .map(res => (res as APIResponse).result)
    .catch(this.handleError)
  }

  changePassword(tenantId: string, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(this.changePasswordUrl, {
      oldPassword,
      newPassword,
      tenantId
    })
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
