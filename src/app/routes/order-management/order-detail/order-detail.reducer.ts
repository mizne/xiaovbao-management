import * as fromOrderDetail from './order-detail.action'
import { Order } from '../models/order.model'

export interface State {
  loading: boolean
  orderDetail: Order
}

const initialState: State = {
  loading: false,
  orderDetail: null,
}

export function reducer(
  state: State = initialState,
  action: fromOrderDetail.Actions
): State {
  switch (action.type) {
    case fromOrderDetail.FETCH_ORDER_DETAIL:
      return {
        ...state,
        loading: true,
        orderDetail: null
      }

    case fromOrderDetail.FETCH_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        orderDetail: action.order,
        loading: false
      }
    case fromOrderDetail.FETCH_ORDER_DETAIL_FAILURE:
      return {
        ...state,
        loading: false
      }
    
    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getOrderDetail = (state: State) => state.orderDetail
