import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { Qrcode } from 'app/routes/qrcode-management/models/qrcode.model'
import { APIResponse } from 'app/core/interceptors/api-error-interceptor'

@Injectable()
export class QrcodeService {
  private qrcodeUrl = '/admin/QRCodeTemplate'
  private qrcodeCountUrl = '/admin/QRCodeTemplateCount'

  constructor(private http: HttpClient) {}

  fetchQrcodes(
    tenantId: string,
    pageIndex: number = 1,
    pageSize: number = 10
  ): Observable<Qrcode[]> {
    const query = `?tenantId=${tenantId}&pageNumber=${pageIndex}&pageSize=${pageSize}`
    return this.http
      .get(this.qrcodeUrl + query)
      .map(resp => (resp as APIResponse).result)
      .map(result =>
        (result as any[]).map(Qrcode.convertFromResp)
      )
      .catch(this.handleError)
  }

  fetchQrcodesCount(tenantId: string): Observable<number> {
    return this.http
      .get(this.qrcodeCountUrl + `/?tenantId=${tenantId}`)
      .map(resp => (resp as APIResponse).result)
      .catch(this.handleError)
  }

  createQrcode(tenantId: string, qrcode: Qrcode): Observable<any> {
    return this.http.post(this.qrcodeUrl, {
      tenantId,
      ...Qrcode.convertFromModel(qrcode)
    })
    .map(resp => (resp as APIResponse).result)
    .catch(this.handleError)
  }

  editQrcode(tenantId: string, qrcode: Qrcode): Observable<any> {
    return this.http.put(this.qrcodeUrl, {
      condition: {
        QRCodeTemplateId: qrcode.id
      },
      QRCodeTemplate: {
        ...Qrcode.convertFromModel(qrcode),
        tenantId
      }
    })
    .map(resp => (resp as APIResponse).result)
    .catch(this.handleError)
  }

  delQrcode(tenantId: string, id: string): Observable<any> {
    return this.http
      .delete(this.qrcodeUrl + `?QRCodeTemplateId=${id}`)
      .map(resp => (resp as APIResponse).result)
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
