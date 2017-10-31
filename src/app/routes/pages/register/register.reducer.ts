import * as fromRegister from './register.action'
import { Captcha } from '../models/captcha.model'

export interface State {
  loading: boolean
}

const initialState: State = {
  loading: false,
}

type Action = fromRegister.Actions

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case fromRegister.REGISTRY_REQUEST:
      return {
        ...state,
        loading: true
      }
    case fromRegister.REGISTRY_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case fromRegister.REGISTRY_FAILURE:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
