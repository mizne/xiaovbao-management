import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'

import { Table } from 'app/routes/qrcode-management/models/table.model'
import { APIResponse } from 'app/core/interceptors/api-error-interceptor'

@Injectable()
export class TableService {
  private tableUrl = '/admin/deal/table'
  // private qrcodeCountUrl = '/admin/QRCodeTemplateCount'

  constructor(private http: HttpClient) {}

  fetchQrcodes(
    tenantId: string,
  ): Observable<Table[]> {
    const query = `?tenantId=${tenantId}`
    return this.http
      .get(this.tableUrl + query)
      .map(resp => (resp as APIResponse).result)
      .map(result =>
        (result as any[]).map(Table.convertFromResp)
      )
      .catch(this.handleError)
  }

  // fetchQrcodesCount(tenantId: string): Observable<number> {
  //   return this.http
  //     .get(this.qrcodeCountUrl + `/?tenantId=${tenantId}`)
  //     .map(resp => (resp as APIResponse).result)
  //     .catch(this.handleError)
  // }

  private handleError(error: any) {
    const errMsg = error.message
      ? error.message
      : error.status ? `${error.status} - ${error.statusText}` : 'Server error'
    console.error(errMsg) // log to console instead
    return Observable.throw(errMsg)
  }
}
