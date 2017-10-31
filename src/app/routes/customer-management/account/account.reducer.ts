import * as fromAccount from './account.action'
import { Account } from '../models/account.model'

export interface State {
  loading: boolean
  accounts: Account[]
  totalCount: number
}

const initialState: State = {
  loading: false,
  accounts: [],
  totalCount: 0
}

export function reducer(
  state: State = initialState,
  action: fromAccount.Actions
): State {
  switch (action.type) {
    case fromAccount.FETCH_ACCOUNTS:
      return {
        ...state,
        loading: true
      }
    case fromAccount.FETCH_ACCOUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        accounts: action.accounts
      }
    case fromAccount.FETCH_ACCOUNTS_FAILURE:
      return {
        ...state,
        loading: false
      }

    case fromAccount.FETCH_ACCOUNTS_COUNT_SUCCESS: {
      return {
        ...state,
        totalCount: action.count
      }
    }
    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getAccounts = (state: State) => state.accounts
export const getTotalCount = (state: State) => state.totalCount
