// 从微信重定向来的state 用于区分绑定微信帐号后的路由去处
// http://test.xiaovbao.cn/bind-wechat?code=123456&state=state
export enum BindWechatState {
  BIND_WECHAT = 'bindWechat', // 仅仅用来绑定微信帐号的
  ORDER = 'order' // 用于查询订单的
}

// 根据重定向的state来路由到不同页面
export const DESTINATION_MAP = {
  'order': 'order-management'
}
