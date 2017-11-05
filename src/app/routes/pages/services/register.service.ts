import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import { APIResponse } from 'app/core/interceptors/api-error-interceptor'
import { Captcha } from '../models/captcha.model'
import { User, ROLES } from '../models/user.model'

@Injectable()
export class RegisterService {
  private registryUrl = '/admin/register'
  constructor(private http: HttpClient) {}

  registry(
    name: string,
    password: string,
    phone: string,
    role: string,
    industry?: string
  ): Observable<User> {
    // return Observable.of('login success').delay(1e3)
    const params = {
      userName: name,
      password,
      phone,
      role: ROLES.indexOf(role)
    }
    if (industry) {
      Object.assign(params, {
        industry
      })
    }
    return this.http.post(this.registryUrl, params)
    .map(res => (res as any).result)
    .do((result) => {
      console.log(result)
    })
    .catch(this.handleError)

    // return Observable.of({
    //   name: 'testName',
    //   industry: 'email'
    // }).delay(3e3)
  }

  private handleError(error: any) {
    const errMsg = error.message
      ? error.message
      : error.status ? `${error.status} - ${error.statusText}` : 'Server error'
    console.error(errMsg) // log to console instead
    return Observable.throw(errMsg)
  }
}
