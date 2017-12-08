import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'

import { APIResponse } from 'app/core/interceptors/api-error-interceptor'
import { Captcha } from '../models/captcha.model'
import { User, ROLES } from '../models/user.model'

import { UADetectorService } from 'app/core/services/ua-detector.service'
import { UtilsService } from 'app/core/services/utils.service'

@Injectable()
export class LoginService {
  private fetchCaptchaUrl = '/admin/login'
  constructor(
    private http: HttpClient,
    private ua: UADetectorService,
    private utils: UtilsService
  ) {}

  fetchCaptcha(): Observable<Captcha> {
    return this.http
      .get(this.fetchCaptchaUrl)
      .map(res => ({
        key: (res as any).result.key,
        content: (res as any).result.svg
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
    const paramsAttachBrowserInfo = this.attachBrowserInfo({
      captcha,
      key: captchaKey,
      userName: name,
      password
    })

    return this.http
      .post(this.fetchCaptchaUrl, paramsAttachBrowserInfo)
      .map(res => (res as APIResponse).result[0])
      .map(User.convertFromResp)
      .catch(this.handleError)
  }

  private attachBrowserInfo(originalParams: { [key: string]: string }) {
    const ret = { ...originalParams }
    if (this.ua.isPCBrowser()) {
      Object.assign(ret, {
        loginMode: 'pc'
      })
    } else if (this.ua.isWechat()) {
      Object.assign(ret, {
        loginMode: 'wechat'
      })
      const { code } = this.utils.objFrom(location.search)
      if (typeof code === 'string') {
        Object.assign(ret, { code })
      }
    } else if (this.ua.isMobileBrowser()) {
      Object.assign(ret, {
        loginMode: 'mobile'
      })
    }
    return ret
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
