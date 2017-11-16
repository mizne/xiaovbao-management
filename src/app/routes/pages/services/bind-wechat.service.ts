import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'

import { APIResponse } from 'app/core/interceptors/api-error-interceptor'
import { Captcha } from '../models/captcha.model'
import { User, ROLES } from '../models/user.model'

@Injectable()
export class BindWechatService {
  private bindWechatUrl = '/admin/bindOpenId'
  constructor(private http: HttpClient) {}

  checkWechatHasBind(code: string): Observable<User> {
    const query = `?code=${code}`
    return this.http
      .get(this.bindWechatUrl + query)
      .map(res => (res as APIResponse).result[0])
      .map(User.convertFromResp)
      .catch(this.handleError)

    // return Observable.of({
    //   name: 'testName',
    //   industry: 'hotel',
    //   token: 'testToken',
    //   tenantId: '33333ce0f7e31d8b92c4472a8ad3eeb3'
    // }).delay(4e3)
    // .mergeMap(() => Observable.throw('fake failed'))
  }

  bindWechat(
    userName: string,
    password: string,
    code: string
  ): Observable<User> {
    const params = {
      userName: name,
      password,
      code
    }

    return this.http
      .post(this.bindWechatUrl, params)
      .map(res => (res as any).result[0])
      .map(User.convertFromResp)
      .catch(this.handleError)

    // return Observable.of({
    //   name: 'testName',
    //   industry: 'hotel',
    //   token: 'testToken',
    //   tenantId: '33333ce0f7e31d8b92c4472a8ad3eeb3'
    // }).delay(4e3)
    // .mergeMap(() => Observable.throw('error'))
  }

  private handleError(error: any) {
    let errMsg = error.status
      ? `${error.status}`
      : error.message ? error.message : '服务器繁忙 请稍候'

    if (errMsg === '500') {
      errMsg = '服务器繁忙 请稍候'
    }

    console.error(errMsg) // log to console instead
    return Observable.throw(errMsg)
  }
}
