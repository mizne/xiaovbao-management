import * as fromLogin from './login.action'
import { Captcha } from '../models/captcha.model'

export interface State {
  loading: boolean
  login: boolean
  loginName: string
  loginFailureMsg: string
  captcha: Captcha
}

const initialState: State = {
  loading: false,
  login: false,
  loginName: '',
  loginFailureMsg: '',
  captcha: {
    key: '',
    base64: ''
  }
}

type Action = fromLogin.Actions

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case fromLogin.LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      }
    case fromLogin.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        login: true,
        loginName: action.user.name,
        loginFailureMsg: ''
      }
    case fromLogin.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        login: false,
        loginFailureMsg: action.loginFailureMsg
      }

    case fromLogin.FETCH_CAPTCHA_SUCCESS:
      return {
        ...state,
        captcha: action.captcha
      }
    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
// 是否已经登录
export const getLogin = (state: State) => state.login
export const getLoginName = (state: State) => state.loginName
export const getLoginFailureMsg = (state: State) => state.loginFailureMsg
export const getCaptchaUrl = (state: State) => state.captcha.base64
export const getCaptchaKey = (state: State) => state.captcha.key
