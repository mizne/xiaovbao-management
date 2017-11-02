import * as fromGoods from './goods.action'
import { Goods } from '../models/goods.model'
import { GoodsType } from '../models/goodsType.model'
import { GoodsUnit } from '../models/goodsUnit.model'

export interface State {
  loading: boolean
  goods: Goods[]
  goodsTypes: GoodsType[]
  goodsTotalCount: number

  addGoodsLoading: boolean

  goodsUnits: GoodsUnit[]
  addGoodsUnitLoading: boolean
}

const initialState: State = {
  loading: false,
  goods: [],
  goodsTypes: [],
  goodsTotalCount: 0,

  addGoodsLoading: false,

  goodsUnits: [],
  addGoodsUnitLoading: false
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
    case fromGoods.FETCH_GOODS_TYPES_SUCCESS:
      return {
        ...state,
        goodsTypes: action.goodsTypes
      }

    case fromGoods.ADD_GOODS_UNIT:
      return {
        ...state,
        addGoodsUnitLoading: true
      }
    case fromGoods.ADD_GOODS_UNIT_SUCCESS:
    case fromGoods.ADD_GOODS_UNIT_FAILURE:
      return {
        ...state,
        addGoodsUnitLoading: false
      }

    case fromGoods.ADD_GOODS:
      return {
        ...state,
        addGoodsLoading: true
      }

    case fromGoods.ADD_GOODS_SUCCESS:
    case fromGoods.ADD_GOODS_FAILURE:
      return {
        ...state,
        addGoodsLoading: false
      }

    case fromGoods.FETCH_GOODS_UNITS_SUCCESS:
      return {
        ...state,
        goodsUnits: action.goodsUnits
      }
    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getGoods = (state: State) => state.goods
export const getGoodsTyps = (state: State) => state.goodsTypes
export const getGoodsTotalCount = (state: State) => state.goodsTotalCount

export const getAddGoodsLoading = (state: State) => state.addGoodsLoading

export const getGoodsUnits = (state: State) => state.goodsUnits
export const getAddGoodsUnitLoading = (state: State) => state.addGoodsUnitLoading
