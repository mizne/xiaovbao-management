import { Action } from '@ngrx/store'
import { User } from '../models/user.model'

export interface CheckSuccessResp {
  destination: string
  user: User
}

export const TO_SHOW_BIND_WECHAT_FORM = '[BindWechat] To Show Bind Wechat Form'

export const CHECK_WECHAT_HAS_BIND = '[BindWehcat] Check Wechat Has Bind'
export const CHECK_WECHAT_HAS_BIND_SUCCESS = '[BindWechat] Check Wechat Has Bind Success'
export const CHECK_WECHAT_HAS_BIND_FAILURE = '[BindWechat] Check Wechat Has Bind Failure'

export const BIND_WECHAT = '[BindWechat] Bind Wechat'
export const BIND_WECHAT_SUCCESS = '[BindWechat] Bind Wechat Success'
export const BIND_WECHAT_FAILURE = '[BindWechat] Bind Wechat Failure'


export class ToShowBindWechatFormAction implements Action {
  readonly type = TO_SHOW_BIND_WECHAT_FORM
}

export class CheckWechatHasBindAction implements Action {
  readonly type = CHECK_WECHAT_HAS_BIND
  constructor(public payload: {
    code: string,
    destination: string
  }) {}
}
export class CheckWechatHasBindSuccessAction implements Action {
  readonly type = CHECK_WECHAT_HAS_BIND_SUCCESS
  constructor(public payload: CheckSuccessResp) {}
}
export class CheckWechatHasBindFailreAction implements Action {
  readonly type = CHECK_WECHAT_HAS_BIND_FAILURE
}


export class BindWehcatAction implements Action {
  readonly type = BIND_WECHAT
  constructor(public payload: {
    userName: string,
    password: string,
    code: string,
    destination: string
  }) {}
}
export class BindWechatSuccessAction implements Action {
  readonly type = BIND_WECHAT_SUCCESS
  constructor(public payload: CheckSuccessResp) {}
}
export class BindWechatFailureAction implements Action {
  readonly type = BIND_WECHAT_FAILURE
  constructor(public resCode: string) {}
}




export type Actions =
ToShowBindWechatFormAction |

CheckWechatHasBindAction |
CheckWechatHasBindSuccessAction |
CheckWechatHasBindFailreAction |

BindWehcatAction |
BindWechatSuccessAction |
BindWechatFailureAction
