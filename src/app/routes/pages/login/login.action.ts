import { Action } from '@ngrx/store'
import { Captcha } from '../models/captcha.model'
import { User } from '../models/user.model'

export const LOGIN_REQUEST = '[Login] Login Request'
export const LOGIN_SUCCESS = '[Login] Login Success'
export const LOGIN_FAILURE = '[Login] Login Failure'

export const FETCH_CAPTCHA = '[Login] Fetch Captcha'
export const FETCH_CAPTCHA_SUCCESS = '[Login] Fetch Captcha Success'
export const FETCH_CAPTCHA_FAILURE = '[Login] Fetch Captcha Failure'


export class LoginRequestAction implements Action {
  readonly type = LOGIN_REQUEST
  constructor(public payload: { captcha: string, name: string, password: string}) {}
}

export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS
  constructor(public user: User) {}
}

export class LoginFailureAction implements Action {
  readonly type = LOGIN_FAILURE
  constructor(public loginFailureMsg: string) {}
}


export class FetchCaptchaAction implements Action {
  readonly type = FETCH_CAPTCHA
}
export class FetchCaptchaSuccessAction implements Action {
  readonly type = FETCH_CAPTCHA_SUCCESS
  constructor(public captcha: Captcha) {}
}
export class FetchCaptchaFailureAction implements Action {
  readonly type = FETCH_CAPTCHA_FAILURE
}



export type Actions =
LoginRequestAction |
LoginSuccessAction |
LoginFailureAction |

FetchCaptchaAction |
FetchCaptchaSuccessAction |
FetchCaptchaFailureAction
