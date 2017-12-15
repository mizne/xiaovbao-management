// import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

// import { APIResponse } from 'app/core/interceptors/api-error-interceptor'

@Injectable()
export class SMSService {

  constructor(
    // private http: HttpClient
  ) {}

  sendSMS(tenantId: string, phones: string[]): Observable<any> {
    // return this.http.post(this.fetchAccountsUrl, {
    //   tenantId: '18d473e77f459833bb06c60f9a8f0001',
    //   pageNumber: pageIndex,
    //   pageSize
    // })
    // .map(resp => (resp as APIResponse).result)
    // .map(result => result.map(e => ({
    //   id: e.id,
    //   date: new Date(e.createdAt),
    //   phone: e.phone,
    //   isVip: e.isVip
    // })))
    // .catch(this.handleError)

    return Observable.of({}).delay(1e3)
  }

  // private handleError(error: any) {
  //   const errMsg = error.message
  //     ? error.message
  //     : error.status ? `${error.status} - ${error.statusText}` : 'Server error'
  //   console.error(errMsg) // log to console instead
  //   return Observable.throw(errMsg)
  // }
}
