import * as fromQrcode from './qrcode.action'
import { Qrcode } from '../models/qrcode.model'
import { Table } from '../models/table.model'

export interface State {
  loading: boolean
  qrcodes: Qrcode[]
  totalCount: number

  tables: Table[]
}

const initialState: State = {
  loading: false,
  qrcodes: [],
  totalCount: 0,

  tables: []
}

export function reducer(
  state: State = initialState,
  action: fromQrcode.Actions
): State {
  switch (action.type) {
    case fromQrcode.FETCH_QRCODES:
      return {
        ...state,
        loading: true,
        qrcodes: []
      }
    case fromQrcode.FETCH_QRCODES_SUCCESS:
      return {
        ...state,
        loading: false,
        qrcodes: action.qrcodes
      }
    case fromQrcode.FETCH_QRCODES_FAILURE:
      return {
        ...state,
        loading: false,
        qrcodes: []
      }

    case fromQrcode.FETCH_QRCODE_COUNT_SUCCESS:
      return {
        ...state,
        totalCount: action.count
      }

    case fromQrcode.FETCH_TABLE_SUCCESS:
      return {
        ...state,
        tables: action.tables
      }
    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getQrcodes = (state: State) => state.qrcodes
export const getTotalCount = (state: State) => state.totalCount
export const getTables = (state: State) => state.tables
