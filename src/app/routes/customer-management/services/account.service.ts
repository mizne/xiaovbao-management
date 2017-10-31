import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { Account } from '../models/account.model'
import { Vip } from '../models/vip.model'

import { APIResponse } from '../../../shared/api-error-interceptor'

@Injectable()
export class AccountService {
    private fetchAccountsUrl = '/admin/customerByTenantId'
    private fetchAccountsCountUrl = '/admin/customerByCount'
    private delAccountUrl = '/admin/customerById'

    private tenantId = '18d473e77f459833bb06c60f9a8f0001'
    constructor(private http: HttpClient) {
    }

    fetchAccounts(pageIndex: number, pageSize: number): Observable<Account[]> {
      const query = `?tenantId=${this.tenantId}&pageNumber=${pageIndex}&pageSize=${pageSize}`
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

    fetchAccountsCount(): Observable<number> {
      return this.http.get(this.fetchAccountsCountUrl + '/?tenantId=18d473e77f459833bb06c60f9a8f0001')
      .map(resp => (resp as APIResponse).result)
      .catch(this.handleError)
    }

    delAccount(id: string): Observable<any> {
      return this.http.delete(this.delAccountUrl + `?tenantId=18d473e77f459833bb06c60f9a8f0001&id=${id}`)
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
