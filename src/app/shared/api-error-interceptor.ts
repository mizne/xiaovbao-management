import { Injectable, Injector } from '@angular/core'
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http'
import { Router } from '@angular/router'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'
import { _throw } from 'rxjs/Observable/throw'

import { LocalStorageService } from 'app/core/services/localstorage.service'
import { LoginService } from 'app/routes/pages/services/login.service'

export const HOST = 'https://deal.xiaovbao.cn/api/test'
// export const HOST = 'http://192.168.1.122:3012'

export const BASE_URL = `${HOST}`

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
  private url: string = BASE_URL
  private router: Router

  constructor(private local: LocalStorageService, private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const cloneParams: {
      url?: string
      headers?: HttpHeaders
    } = {}
    if (this.requestWithSelf(req.url)) {
      cloneParams.url = `${this.url}${req.url}`

      if (!this.requestWithAuth(req.url)) {
        cloneParams.headers = req.headers.set(
          'Authorization',
          'Bearer ' + this.local.get('token')
        )
      }
    } else {
      cloneParams.url = req.url
    }

    return next
      .handle(
        req.clone(cloneParams)
      )
      .do((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.body && event.url.indexOf(HOST) >= 0) {
            if (event.body.resCode !== 0) {
              console.error(`API Error; ${event.body.resMsg}`)
              throw new Error(event.body.resCode)
            }
          }
        }
      })
      .catch(res => {
        console.log(res)
        this.router = this.injector.get(Router)

        if (res.status === 401) {
          console.log('resp status: ' + 401)
          this.router.navigate(['login'])
        }
        return Observable.throw(res)
      })
  }

  /**
 * 是否 与自己后台服务交互
 *
 * @private
 * @param {string} url
 * @returns {boolean}
 * @memberof ApiErrorInterceptor
 */
  private requestWithSelf(url: string): boolean {
    return !/http|assets/i.test(url)
  }
  /**
 * 是否 与自己后台服务的登录、注册请求
 *
 * @private
 * @param {string} url
 * @returns {boolean}
 * @memberof ApiErrorInterceptor
 */
  private requestWithAuth(url: string): boolean {
    return /login|register/i.test(url)
  }
}

export interface APIResponse {
  resCode: number
  resMsg: string
  result: any[]
}
