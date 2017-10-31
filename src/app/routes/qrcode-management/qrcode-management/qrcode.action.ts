import { Action } from '@ngrx/store'
import { Qrcode } from '../models/qrcode.model'

export const FETCH_QRCODES = '[Qrcode] Fetch Qrcodes'
export const FETCH_QRCODES_SUCCESS = '[Qrcode] Fetch Qrcodes Success'
export const FETCH_QRCODES_FAILURE = '[Qrcode] Fetch Qrcodes Failure'

export const FETCH_QRCODE_COUNT = '[Qrcode] Fetch Qrcode Count'
export const FETCH_QRCODE_COUNT_SUCCESS = '[Qrcode] Fetch Qrcode Count Success'
export const FETCH_QRCODE_COUNT_FAILURE = '[Qrcode] Fetch Qrcode Count Failure'

export const ENSURE_DELETE_QRCODE = '[Qrcode] Ensure Delete Qrcode'
export const DELETE_QRCODE_SUCCESS = '[Qrcode] Delete Qrcode Success'
export const DELETE_QRCODE_FAILURE = '[Qrcode] Delete Qrcode Failure'

export class FectchQrcodesAction implements Action {
  readonly type = FETCH_QRCODES
  constructor(public payload: { pageIndex: number, pageSize: number }) {}
}

export class FetchQrcodesSuccessAction implements Action {
  readonly type = FETCH_QRCODES_SUCCESS
  constructor(public qrcodes: Qrcode[]) {}
}

export class FetchQrcodesFailureAction implements Action {
  readonly type = FETCH_QRCODES_FAILURE
}


export class FetchQrcodeCountAction implements Action {
  readonly type = FETCH_QRCODE_COUNT
}

export class FetchQrcodeCountSuccessAction implements Action {
  readonly type = FETCH_QRCODE_COUNT_SUCCESS
  constructor(public count: number) {}
}

export class FetchQrcodeCountFailureAction implements Action {
  readonly type = FETCH_QRCODE_COUNT_FAILURE
}


export class EnsureDeleteQrcodeAction implements Action {
  readonly type = ENSURE_DELETE_QRCODE
  constructor(public payload: { id: string, pageIndex: number, pageSize: number }) {}
}

export class DeleteQrcodeSuccessAction implements Action {
  readonly type = DELETE_QRCODE_SUCCESS
}

export class DeleteQrcodeFailureAction implements Action {
  readonly type = DELETE_QRCODE_FAILURE
}


export type Actions =
FectchQrcodesAction |
FetchQrcodesSuccessAction |
FetchQrcodesFailureAction |

FetchQrcodeCountAction |
FetchQrcodeCountSuccessAction |
FetchQrcodeCountFailureAction |

EnsureDeleteQrcodeAction |
DeleteQrcodeSuccessAction |
DeleteQrcodeFailureAction
