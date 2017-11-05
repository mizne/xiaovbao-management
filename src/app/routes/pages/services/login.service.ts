import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'


import { APIResponse } from 'app/core/interceptors/api-error-interceptor'
import { Captcha } from '../models/captcha.model'
import { User, ROLES } from '../models/user.model'

export const errorMsgMap = {
  10000: '用户名和密码不匹配',
  10001: '验证码错误',
  10002: '验证码过期，请点击验证码重新获取'
}

@Injectable()
export class LoginService {
  private fetchCaptchaUrl = '/admin/login'
  constructor(private http: HttpClient) {}

  fetchCaptcha(): Observable<Captcha> {
    return this.http
      .get(this.fetchCaptchaUrl)
      .map(res => ({
        key: (res as any).result.key,
        base64: 'data:image/jpg;base64,' + (res as any).result.buf
      }))
      .catch(this.handleError)
  }

  login(
    name: string,
    password: string,
    captchaKey: string,
    captcha: string
  ): Observable<User> {
    // return Observable.of('login success').delay(1e3)

    return this.http
      .post(this.fetchCaptchaUrl, {
        captcha,
        key: captchaKey,
        userName: name,
        password
      })
      .map(res => (res as any).result)
      .map(e => ({
        name: e.name,
        role: ROLES[e.correspondingType],
        industry: e.style,
        token: e.token,
        tenantId: e.tenantId
      }))
      .catch(this.handleError)
  }

  private handleError(error: any) {
    let errMsg = error.status ?
    `${error.status}`
    : error.message ? error.message
    : '服务器繁忙 请稍候'

    if (errMsg === '500') {
      errMsg = '服务器繁忙 请稍候'
    }


    console.error(errMsg) // log to console instead
    return Observable.throw(errMsg)
  }
}
