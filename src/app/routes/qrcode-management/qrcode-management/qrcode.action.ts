import { Action } from '@ngrx/store'
import { Qrcode } from '../models/qrcode.model'
import { Table } from '../models/table.model'

export const FETCH_QRCODES = '[Qrcode] Fetch Qrcodes'
export const FETCH_QRCODES_SUCCESS = '[Qrcode] Fetch Qrcodes Success'
export const FETCH_QRCODES_FAILURE = '[Qrcode] Fetch Qrcodes Failure'

export const FETCH_QRCODE_COUNT = '[Qrcode] Fetch Qrcode Count'
export const FETCH_QRCODE_COUNT_SUCCESS = '[Qrcode] Fetch Qrcode Count Success'
export const FETCH_QRCODE_COUNT_FAILURE = '[Qrcode] Fetch Qrcode Count Failure'

export const DELETE_QRCODE = '[Qrcode] Delete Qrcode'
export const DELETE_QRCODE_SUCCESS = '[Qrcode] Delete Qrcode Success'
export const DELETE_QRCODE_FAILURE = '[Qrcode] Delete Qrcode Failure'

export const EDIT_QRCODE = '[Qrcode] Edit Qrcode'
export const EDIT_QRCODE_SUCCESS = '[Qrcode] Edit Qrcode Success'
export const EDIT_QRCODE_FAILURE = '[Qrcode] Edit Qrcode Failure'

export const CREATE_QRCODE = '[Qrcode] Create Qrcode'
export const CREATE_QRCODE_SUCCESS = '[Qrcode] Create Qrcode Success'
export const CREATE_QRCODE_FAILURE = '[Qrcode] Create Qrcode Failure'

export const FETCH_TABLE = '[Qrcode] Fetch Table'
export const FETCH_TABLE_SUCCESS = '[Qrcode] Fetch Table Success'
export const FETCH_TABLE_FAILURE = '[Qrcode] Fetch Table Failure'

export interface FetchQrcodeParams {
  pageIndex: number,
  pageSize: number
}
export const emptyFetchQrcodeParams = {
  pageIndex: 1,
  pageSize: 10
}
export class FectchQrcodesAction implements Action {
  readonly type = FETCH_QRCODES
  constructor(public payload: FetchQrcodeParams = emptyFetchQrcodeParams) {}
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


export class DeleteQrcodeAction implements Action {
  readonly type = DELETE_QRCODE
  constructor(public qrcodeId: string) {}
}
export class DeleteQrcodeSuccessAction implements Action {
  readonly type = DELETE_QRCODE_SUCCESS
}
export class DeleteQrcodeFailureAction implements Action {
  readonly type = DELETE_QRCODE_FAILURE
}


export class EditQrcodeAction implements Action {
  readonly type = EDIT_QRCODE
  constructor(public qrcode: Qrcode) {}
}
export class EditQrcodeSuccessAction implements Action {
  readonly type = EDIT_QRCODE_SUCCESS
}
export class EditQrcodeFailureAction implements Action {
  readonly type = EDIT_QRCODE_FAILURE
}

export class CreateQrcodeAction implements Action {
  readonly type = CREATE_QRCODE
  constructor(public qroce: Qrcode) {}
}
export class CreateQrcodeSuccessAction implements Action {
  readonly type = CREATE_QRCODE_SUCCESS
}
export class CreateQrcodeFailureAction implements Action {
  readonly type = CREATE_QRCODE_FAILURE
}


export class FetchTableAction implements Action {
  readonly type = FETCH_TABLE
}
export class FetchTableSuccessAction implements Action {
  readonly type = FETCH_TABLE_SUCCESS
  constructor(public tables: Table[]) {}
}
export class FetchTableFailureAction implements Action {
  readonly type = FETCH_TABLE_FAILURE
}


export type Actions =
FectchQrcodesAction |
FetchQrcodesSuccessAction |
FetchQrcodesFailureAction |

FetchQrcodeCountAction |
FetchQrcodeCountSuccessAction |
FetchQrcodeCountFailureAction |

DeleteQrcodeAction |
DeleteQrcodeSuccessAction |
DeleteQrcodeFailureAction |

EditQrcodeAction |
EditQrcodeSuccessAction |
EditQrcodeFailureAction |

CreateQrcodeAction |
CreateQrcodeSuccessAction |
CreateQrcodeFailureAction |

FetchTableAction |
FetchTableSuccessAction |
FetchTableFailureAction
