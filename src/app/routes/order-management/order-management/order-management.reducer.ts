import * as fromOrder from './order-management.action'
import { Order } from '../models/order.model'

export interface State {
  loading: boolean
  orders: Order[]
  orderTotalCount: number
}

const initialState: State = {
  loading: false,
  orders: [],
  orderTotalCount: 0,
}

export function reducer(
  state: State = initialState,
  action: fromOrder.Actions
): State {
  switch (action.type) {
    case fromOrder.FETCH_ORDERS:
      return {
        ...state,
        loading: true
      }
    case fromOrder.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.orders
      }
    case fromOrder.FETCH_ORDERS_FAILURE:
      return {
        ...state,
        loading: false
      }
    case fromOrder.FETCH_ORDERS_COUNT_SUCCESS:
      return {
        ...state,
        orderTotalCount: action.count
      }
    
    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getOrders = (state: State) => state.orders
export const getOrderTotalCount = (state: State) => state.orderTotalCount

