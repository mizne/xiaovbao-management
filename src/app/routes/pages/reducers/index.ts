import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromRoot from '../../../reducers'
import * as fromLogin from '../login/login.reducer'
import * as fromRegister from '../register/register.reducer'
import * as fromBindWechat from '../bind-wechat/bind-wechat.reducer'

export interface PagesState {
  login: fromLogin.State
  register: fromRegister.State
  bindWechat: fromBindWechat.State
}

export interface State extends fromRoot.State {
  pages: PagesState
}

export const reducers = {
  login: fromLogin.reducer,
  register: fromRegister.reducer,
  bindWechat: fromBindWechat.reducer
}

export const getPagesModuleState = createFeatureSelector<PagesState>('pages')

export const getLoginState = createSelector(getPagesModuleState, (state: PagesState) => state.login)
export const getLoginLoading = createSelector(
  getLoginState,
  fromLogin.getLoading
)
export const getLogin = createSelector(getLoginState, fromLogin.getLogin)
export const getLoginName = createSelector(getLoginState, fromLogin.getLoginName)
export const getTenantId = createSelector(getLoginState, fromLogin.getTenantId)
export const getLoginFailureMsg = createSelector(getLoginState, fromLogin.getLoginFailureMsg)
export const getCaptchaUrl = createSelector(getLoginState, fromLogin.getCaptchaUrl)
export const getCaptchaKey = createSelector(getLoginState, fromLogin.getCaptchaKey)


export const getRegisterState = createSelector(
  getPagesModuleState,
  (state: PagesState) => state.register
)
export const getRegisterLoading = createSelector(
  getRegisterState,
  fromRegister.getLoading
)


export const getBindWechatState = createSelector(
  getPagesModuleState,
  (state: PagesState) => state.bindWechat
)
export const getBindWechatLoading = createSelector(
  getBindWechatState,
  fromBindWechat.getLoading
)
export const getBindWechatPrompt = createSelector(
  getBindWechatState,
  fromBindWechat.getBindWechatPrompt
)
export const getShowBindWechatForm = createSelector(
  getBindWechatState,
  fromBindWechat.getShowBindWechatForm
)
export const getBindWechatFailureMsg = createSelector(
  getBindWechatState,
  fromBindWechat.getBindWechatFailureMsg
)
