import { Action } from '@ngrx/store'
import { MerchantInfo } from '../models/merchat-info.model'

export const FETCH_MERCHANT_INFO = '[MerchantInfo] Fetch Merchant Info'
export const FETCH_MERCHANT_INFO_SUCCESS = '[MerchantInfo] Fetch Merchant Info Success'
export const FETCH_MERCHANT_INFO_FAILURE = '[MerchantInfo] Fetch Merchant Info Failure'

export const EDIT_MERCHANT_INFO = '[MerchantInfo] Edit Merchant Info'
export const EDIT_MERCHANT_INFO_SUCCESS = '[MerchantInfo] Edit Merchant Info Success'
export const EDIT_MERCHANT_INFO_FAILURE = '[MerchantInfo] Edit Merchant Info Failure'


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



export type Actions =
FetchMerchantInfoAction |
FetchMerchantInfoSuccessAction |
FetchMerchantInfoFailureAction |

EditMerchantInfoAction |
EditMerchatInfoSuccessAction |
EditMerchantInfoFailureAction



