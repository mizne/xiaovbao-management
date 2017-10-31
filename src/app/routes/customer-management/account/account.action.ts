import { Action } from '@ngrx/store'
import { Account } from '../models/account.model'
import { Vip } from '../models/vip.model'

export const FETCH_ACCOUNTS = '[Account] Fetch Accounts'
export const FETCH_ACCOUNTS_SUCCESS = '[Account] Fetch Accounts Success'
export const FETCH_ACCOUNTS_FAILURE = '[Account] Fetch Accounts Failure'

export const FETCH_ACCOUNTS_COUNT = '[Account] Fetch Accounts Count'
export const FETCH_ACCOUNTS_COUNT_SUCCESS = '[Account] Fetch Accounts Count Success'
export const FETCH_ACCOUNTS_COUNT_FAILURE = '[Account] Fetch Accounts Count Failure'

export const SEND_SMS = '[Account] Send SMS'
export const SEND_SMS_SUCCESS = '[Account] Send SMS Success'
export const SEND_SMS_FAILURE = '[Account] Send SMS Failure'

export const ENSURE_DELETE_ACCOUNT = '[Account] Ensure Delete Account'
export const DELETE_ACCOUNT_SUCCESS = '[Account] Delete Account Success'
export const DELETE_ACCOUNT_FAILURE = '[Account] Delete Account Failure'

export class FectchAccountsAction implements Action {
  readonly type = FETCH_ACCOUNTS
  constructor(public payload: { pageIndex: number, pageSize: number }) {}
}

export class FetchAccountsSuccessAction implements Action {
  readonly type = FETCH_ACCOUNTS_SUCCESS
  constructor(public accounts: Account[]) {}
}

export class FetchAccountsFailureAction implements Action {
  readonly type = FETCH_ACCOUNTS_FAILURE
}



export class FectchAccountsCountAction implements Action {
  readonly type = FETCH_ACCOUNTS_COUNT
}

export class FetchAccountsCountSuccessAction implements Action {
  readonly type = FETCH_ACCOUNTS_COUNT_SUCCESS
  constructor(public count: number) {}
}

export class FetchAccountsCountFailureAction implements Action {
  readonly type = FETCH_ACCOUNTS_COUNT_FAILURE
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


export class EnsureDeleteAccountAction implements Action {
  readonly type = ENSURE_DELETE_ACCOUNT
  constructor(public payload: { id: string, pageIndex: number, pageSize: number }) {}
}

export class DeleteAccountSuccessAction implements Action {
  readonly type = DELETE_ACCOUNT_SUCCESS
}

export class DeleteAccountFailureAction implements Action {
  readonly type = DELETE_ACCOUNT_FAILURE
}

export type Actions =
FectchAccountsAction |
FetchAccountsSuccessAction |
FetchAccountsFailureAction |

FectchAccountsCountAction |
FetchAccountsCountSuccessAction |
FetchAccountsCountFailureAction |

SendSMSAction |
SendSMSSuccessAction |
SendSMSFailureAction |

EnsureDeleteAccountAction |
DeleteAccountSuccessAction |
DeleteAccountFailureAction
