import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'

import { APIResponse } from 'app/core/interceptors/api-error-interceptor'
import { Captcha } from '../models/captcha.model'
import { User, ROLES } from '../models/user.model'

import { UADetectorService } from 'app/core/services/ua-detector.service'

@Injectable()
export class LoginService {
  private fetchCaptchaUrl = '/admin/login'
  constructor(
    private http: HttpClient,
    private ua: UADetectorService
  ) {}

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

    const params = {
      captcha,
      key: captchaKey,
      userName: name,
      password
    }

    if (this.ua.isPCBrowser()) {
      Object.assign(params, {
        loginMode: 'pc'
      })
    } else if (this.ua.isWechat()) {
      Object.assign(params, {
        loginMode: 'wechat'
      })
    }

    return this.http
      .post(this.fetchCaptchaUrl, params)
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
