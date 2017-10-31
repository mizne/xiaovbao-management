import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { Vip } from '../models/vip.model'

import { APIResponse } from '../../../shared/api-error-interceptor'

@Injectable()
export class VipService {
    private fetchVipsUrl = '/admin/vip'
    private fetchVipsCountUrl = '/admin/vipByCount'
    private delVipUrl = '/admin/customerById'

    private tenantId = '18d473e77f459833bb06c60f9a8f0001'
    constructor(private http: HttpClient) {
    }

    fetchVips(pageIndex: number, pageSize: number): Observable<Vip[]> {
      const query = `?tenantId=${this.tenantId}&pageNumber=${pageIndex}&pageSize=${pageSize}`
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

    fetchVipsCount(): Observable<number> {
      return this.http.get(this.fetchVipsCountUrl + '/?tenantId=18d473e77f459833bb06c60f9a8f0001')
      .map(resp => (resp as APIResponse).result)
      .catch(this.handleError)
    }

    delVip(id: string): Observable<any> {
      return this.http.delete(this.delVipUrl + `?tenantId=18d473e77f459833bb06c60f9a8f0001&id=${id}`)
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
