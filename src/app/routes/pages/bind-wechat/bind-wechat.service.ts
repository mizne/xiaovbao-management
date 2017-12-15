import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'

import { APIResponse } from 'app/core/interceptors/api-error-interceptor'
import { User } from '../models/user.model'

@Injectable()
export class BindWechatService {
  private bindWechatUrl = '/admin/bindOpenId'
  private checkWechat = '/admin/tenantIds'
  constructor(private http: HttpClient) {}

  checkWechatHasBind(code: string): Observable<User> {
    const query = `?code=${code}`
    return this.http
      .get(this.checkWechat + query)
      .map(res => (res as APIResponse).result[0])
      .map(User.convertFromResp)
      .catch(this.handleError)
  }

  bindWechat(
    userName: string,
    password: string,
    code: string
  ): Observable<User> {
    const params = {
      userName,
      password,
      code
    }

    return this.http
      .post(this.bindWechatUrl, params)
      .map(res => (res as APIResponse).result[0])
      .map(User.convertFromResp)
      .catch(this.handleError)
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
