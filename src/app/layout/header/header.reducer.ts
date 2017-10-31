import * as fromHeader from './header.action'

export interface State {
  loading: boolean
}

const initialState: State = {
  loading: false
}

export function reducer(state: State = initialState, action: fromHeader.Actions): State {
  switch (action.type) {
    case fromHeader.SEARCH_TEXT:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
