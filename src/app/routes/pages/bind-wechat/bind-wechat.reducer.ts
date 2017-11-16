import * as fromBindWechat from './bind-wechat.action'

export interface State {
  loading: boolean
  bindWechatPrompt: string
  showBindWechatForm: boolean
  bindWechatFailureMsg: string

  needShowToBindWechatBtn: boolean
}

const initialState: State = {
  loading: false,
  bindWechatPrompt: '',
  showBindWechatForm: false,
  bindWechatFailureMsg: '',

  needShowToBindWechatBtn: false
}

type Action = fromBindWechat.Actions

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case fromBindWechat.TO_SHOW_BIND_WECHAT_FORM:
      return {
        ...state,
        showBindWechatForm: true
      }
    case fromBindWechat.CHECK_WECHAT_HAS_BIND:
      return {
        ...state,
        loading: true,
        showBindWechatForm: false,
        bindWechatPrompt: '正在检查是否已经绑定微信...'
      }
    case fromBindWechat.BIND_WECHAT:
      return {
        ...state,
        loading: true
      }
    case fromBindWechat.CHECK_WECHAT_HAS_BIND_SUCCESS:
      return {
        ...state,
        loading: false,
        bindWechatPrompt: '微信帐号已绑定，正在跳转页面！'
      }
    case fromBindWechat.CHECK_WECHAT_HAS_BIND_FAILURE:
      return {
        ...state,
        loading: false,
        showBindWechatForm: false,
        needShowToBindWechatBtn: true,
        bindWechatFailureMsg: '微信帐号未绑定，请先绑定，才能更好地为您服务！'
      }

    case fromBindWechat.BIND_WECHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        showBindWechatForm: false,
        bindWechatPrompt: `恭喜您 绑定微信账户成功！您可以返回公众号使用商家版能力！`
      }
      case fromBindWechat.BIND_WECHAT_FAILURE:
      return {
        ...state,
        loading: false,
        bindWechatFailureMsg: `绑定微信帐号失败`,
      }
    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getBindWechatPrompt = (state: State) => state.bindWechatPrompt
export const getShowBindWechatForm = (state: State) => state.showBindWechatForm
export const getBindWechatFailureMsg = (state: State) => state.bindWechatFailureMsg
export const getNeedShowBindWechatBtn = (state: State) => state.needShowToBindWechatBtn
