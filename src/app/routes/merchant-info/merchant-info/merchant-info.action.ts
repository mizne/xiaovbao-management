import { Action } from '@ngrx/store'
import { MerchantInfo } from '../models/merchat-info.model'

export const FETCH_MERCHANT_INFO = '[MerchantInfo] Fetch Merchant Info'
export const FETCH_MERCHANT_INFO_SUCCESS = '[MerchantInfo] Fetch Merchant Info Success'
export const FETCH_MERCHANT_INFO_FAILURE = '[MerchantInfo] Fetch Merchant Info Failure'

export const EDIT_MERCHANT_INFO = '[MerchantInfo] Edit Merchant Info'
export const EDIT_MERCHANT_INFO_SUCCESS = '[MerchantInfo] Edit Merchant Info Success'
export const EDIT_MERCHANT_INFO_FAILURE = '[MerchantInfo] Edit Merchant Info Failure'

export const CHANGE_PASSWORD = '[MerchantInfo] Change Password'
export const CHANGE_PASSWORD_SUCCESS = '[MerchantInfo] Change Password Success'
export const CHANGE_PASSWORD_FAILURE = '[MerchantInfo] Change Password Failure'


export class FetchMerchantInfoAction implements Action {
  readonly type = FETCH_MERCHANT_INFO
}
export class FetchMerchantInfoSuccessAction implements Action {
  readonly type = FETCH_MERCHANT_INFO_SUCCESS
  constructor(public merchantInfo: MerchantInfo) {}
}
export class FetchMerchantInfoFailureAction implements Action {
  readonly type = FETCH_MERCHANT_INFO_FAILURE
}


export class EditMerchantInfoAction implements Action {
  readonly type = EDIT_MERCHANT_INFO
  constructor(public merchantInfo: MerchantInfo) {}
}
export class EditMerchatInfoSuccessAction implements Action {
  readonly type = EDIT_MERCHANT_INFO_SUCCESS
}
export class EditMerchantInfoFailureAction implements Action {
  readonly type = EDIT_MERCHANT_INFO_FAILURE
}

export interface ChangePasswordParams {
  oldPassword: string
  newPassword: string
}
export class ChangePasswordAction implements Action {
  readonly type = CHANGE_PASSWORD
  constructor(public payload: ChangePasswordParams) {}
}
export class ChangePasswordSuccessAction implements Action {
  readonly type = CHANGE_PASSWORD_SUCCESS
}
export class ChangePasswordFailureAction implements Action {
  readonly type = CHANGE_PASSWORD_FAILURE
}



export type Actions =
FetchMerchantInfoAction |
FetchMerchantInfoSuccessAction |
FetchMerchantInfoFailureAction |

EditMerchantInfoAction |
EditMerchatInfoSuccessAction |
EditMerchantInfoFailureAction |

ChangePasswordAction |
ChangePasswordSuccessAction |
ChangePasswordFailureAction

