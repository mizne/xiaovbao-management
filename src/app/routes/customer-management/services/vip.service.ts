import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Vip } from '../models/vip.model'
import { APIResponse } from 'app/core/interceptors/api-error-interceptor'

@Injectable()
export class VipService {
    private fetchVipsUrl = '/admin/vip'
    private fetchVipsCountUrl = '/admin/vipByCount'
    private delVipUrl = '/admin/customerById'

    constructor(private http: HttpClient) {
    }

    fetchVips(tenantId: string, pageIndex: number, pageSize: number): Observable<Vip[]> {
      const query = `?tenantId=${tenantId}&pageNumber=${pageIndex}&pageSize=${pageSize}`
      return this.http.get(this.fetchVipsUrl + query)
      .map(resp => (resp as APIResponse).result)
      .map(result => result.map(e => ({
        id: e.id,
        name: e.name,
        level: e.vipLevel,
        phone: e.phone,
        birthday: e.birthday
      })))
      .catch(this.handleError)
    }

    fetchVipsCount(tenantId: string): Observable<number> {
      return this.http.get(this.fetchVipsCountUrl + `/?tenantId=${tenantId}`)
      .map(resp => (resp as APIResponse).result)
      .catch(this.handleError)
    }

    delVip(tenantId: string, id: string): Observable<any> {
      return this.http.delete(this.delVipUrl + `?tenantId=${tenantId}&id=${id}`)
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
