import * as fromGoods from './goods.action'
import { Goods } from '../models/goods.model'
import { GoodsType } from '../models/goodsType.model'

export interface State {
  loading: boolean
  goods: Goods[]
  goodsTypes: GoodsType[]
  goodsTotalCount: number
}

const initialState: State = {
  loading: false,
  goods: [],
  goodsTypes: [],
  goodsTotalCount: 0
}

export function reducer(
  state: State = initialState,
  action: fromGoods.Actions
): State {
  switch (action.type) {
    case fromGoods.FETCH_GOODS:
      return {
        ...state,
        loading: true
      }
    case fromGoods.FETCH_GOODS_SUCCESS:
      return {
        ...state,
        loading: false,
        goods: action.goods
      }
    case fromGoods.FETCH_GOODS_FAILURE:
      return {
        ...state,
        loading: false
      }
    case fromGoods.FETCH_GOODS_COUNT_SUCCESS:
      return {
        ...state,
        goodsTotalCount: action.count
      }
    case fromGoods.FETCH_ALL_GOODS_TYPE_SUCCESS:
      return {
        ...state,
        goodsTypes: action.goodsTypes
      }
    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getGoods = (state: State) => state.goods
export const getGoodsTyps = (state: State) => state.goodsTypes
export const getGoodsTotalCount = (state: State) => state.goodsTotalCount
