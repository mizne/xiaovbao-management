import { Action } from '@ngrx/store'
import { Account } from '../models/account.model'
import { Vip } from '../models/vip.model'

export const FETCH_VIPS = '[Vip] Fetch Vips'
export const FETCH_VIPS_SUCCESS = '[Vip] Fetch Vips Success'
export const FETCH_VIPS_FAILURE = '[Vip] Fetch Vips Failure'

export const FETCH_VIPS_COUNT = '[Vip] Fetch Vips Count'
export const FETCH_VIPS_COUNT_SUCCESS = '[Vip] Fetch Vips Count Success'
export const FETCH_VIPS_COUNT_FAILURE = '[Vip] Fetch Vips Count Failure'

export const SEND_SMS = '[Vip] Send SMS'
export const SEND_SMS_SUCCESS = '[Vip] Send SMS Success'
export const SEND_SMS_FAILURE = '[Vip] Send SMS Failure'

export const ENSURE_DELETE_VIP = '[Vip] Ensure Delete Vip'
export const DELETE_VIP_SUCCESS = '[Vip] Delete Vip Success'
export const DELETE_VIP_FAILURE = '[Vip] Delete Vip Failure'

export class FectchVipsAction implements Action {
  readonly type = FETCH_VIPS
  constructor(public payload: { pageIndex: number, pageSize: number }) {}
}

export class FetchVipsSuccessAction implements Action {
  readonly type = FETCH_VIPS_SUCCESS
  constructor(public vips: Vip[]) {}
}

export class FetchVipsFailureAction implements Action {
  readonly type = FETCH_VIPS_FAILURE
}



export class FectchVipsCountAction implements Action {
  readonly type = FETCH_VIPS_COUNT
}

export class FetchVipsCountSuccessAction implements Action {
  readonly type = FETCH_VIPS_COUNT_SUCCESS
  constructor(public count: number) {}
}

export class FetchVipsCountFailureAction implements Action {
  readonly type = FETCH_VIPS_COUNT_FAILURE
}



export class SendSMSAction implements Action {
  readonly type = SEND_SMS
  constructor(public phones: string[]) {}
}

export class SendSMSSuccessAction implements Action {
  readonly type = SEND_SMS_SUCCESS
}

export class SendSMSFailureAction implements Action {
  readonly type = SEND_SMS_FAILURE
}


export class EnsureDeleteVipAction implements Action {
  readonly type = ENSURE_DELETE_VIP
  constructor(public payload: { id: string, pageIndex: number, pageSize: number }) {}
}

export class DeleteVipSuccessAction implements Action {
  readonly type = DELETE_VIP_SUCCESS
}

export class DeleteVipFailureAction implements Action {
  readonly type = DELETE_VIP_FAILURE
}

export type Actions =
FectchVipsAction |
FetchVipsSuccessAction |
FetchVipsFailureAction |

FectchVipsCountAction |
FetchVipsCountSuccessAction |
FetchVipsCountFailureAction |

SendSMSAction |
SendSMSSuccessAction |
SendSMSFailureAction |

EnsureDeleteVipAction |
DeleteVipSuccessAction |
DeleteVipFailureAction
