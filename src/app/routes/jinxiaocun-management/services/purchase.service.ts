import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Account } from '../models/account.model'
import { APIResponse } from 'app/core/interceptors/api-error-interceptor'

@Injectable()
export class PurchaseService {
    private fetchAccountsUrl = '/admin/customerByTenantId'
    private fetchAccountsCountUrl = '/admin/customerByCount'
    private delAccountUrl = '/admin/customerById'
    constructor(private http: HttpClient) {
    }

    fetchAccounts(tenantId: string, pageIndex: number, pageSize: number): Observable<Account[]> {
      const query = `?tenantId=${tenantId}&pageNumber=${pageIndex}&pageSize=${pageSize}`
      return this.http.get(this.fetchAccountsUrl + query)
      .map(resp => (resp as APIResponse).result)
      .map(result => result.map(e => ({
        id: e.id,
        date: new Date(e.createdAt),
        phone: e.phone,
        isVip: e.isVip
      })))
      .catch(this.handleError)
    }

    fetchAccountsCount(tenantId: string): Observable<number> {
      return this.http.get(this.fetchAccountsCountUrl + `/?tenantId=${tenantId}`)
      .map(resp => (resp as APIResponse).result)
      .catch(this.handleError)
    }

    delAccount(tenantId: string, id: string): Observable<any> {
      return this.http.delete(this.delAccountUrl + `?tenantId=${tenantId}&id=${id}`)
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
