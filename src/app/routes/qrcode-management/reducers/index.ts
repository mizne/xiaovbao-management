import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromQrcode from '../qrcode-management/qrcode.reducer'
import * as fromRoot from '../../../reducers'

export interface QrcodeState {
  qrcode: fromQrcode.State
}

export interface State extends fromRoot.State {
  goodsManagement: QrcodeState
}

export const reducers = {
  qrcode: fromQrcode.reducer
}

export const getQrcodeModuleState = createFeatureSelector<QrcodeState>('qrcodeManagement')

export const getQrcodeState = createSelector(getQrcodeModuleState, (state: QrcodeState) => state.qrcode)
export const getQrcodeLoading = createSelector(getQrcodeState, fromQrcode.getLoading)
export const getCurrentQrcodes = createSelector(
  getQrcodeState,
  fromQrcode.getQrcodes
)
export const getQrcodesTotalCount = createSelector(
  getQrcodeState,
  fromQrcode.getTotalCount
)

