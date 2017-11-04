import * as fromDiscountActivity from './discount-activity.action'
import { DiscountActivity } from '../models/discount-activity.model'
import { Goods } from 'app/routes/goods-management/models/goods.model'
import { Qrcode } from 'app/routes/qrcode-management/models/qrcode.model'

import * as R from 'ramda'

export interface State {
  loading: boolean
  activities: DiscountActivity[]
  totalCount: number
  toAddActivities: DiscountActivity[]
  toAddActivitiesToShow: DiscountActivity[]
  toAddActivitiesTotalCount: number
  qrcodeTpls: Qrcode[]

  fetchGoodsLoading: boolean
  currentGoods: Goods[]
  goodsTotalCount: number
}

const initialState: State = {
  loading: false,
  activities: [],
  totalCount: 0,
  toAddActivities: [],
  toAddActivitiesToShow: [],
  toAddActivitiesTotalCount: 0,
  qrcodeTpls: [],

  fetchGoodsLoading: false,
  currentGoods: [],
  goodsTotalCount: 0
}

export function reducer(
  state: State = initialState,
  action: fromDiscountActivity.Actions
): State {
  switch (action.type) {
    case fromDiscountActivity.FETCH_DISCOUNT_ACTIVITY:
      return {
        ...state,
        loading: true
      }
    case fromDiscountActivity.FETCH_DISCOUNT_ACTIVITY_SUCCESS:
      return {
        ...state,
        loading: false,
        activities: action.activities
      }
    case fromDiscountActivity.FETCH_DISCOUNT_ACTIVITY_FAILURE:
      return {
        ...state,
        loading: false
      }

    case fromDiscountActivity.FETCH_DISCOUNT_ACTIVITY_COUNT_SUCCESS:
      return {
        ...state,
        totalCount: action.count
      }

    case fromDiscountActivity.FETCH_GOODS:
      return {
        ...state,
        fetchGoodsLoading: true
      }
    case fromDiscountActivity.FETCH_GOODS_SUCCESS:
    case fromDiscountActivity.FETCH_GOODS_FAILURE:
      return {
        ...state,
        fetchGoodsLoading: false,
        currentGoods: action.goods
      }

    case fromDiscountActivity.FETCH_GOODS_COUNT_SUCCESS:
      return {
        ...state,
        goodsTotalCount: action.count
      }

    case fromDiscountActivity.SELECT_GOODS:
      const toAddActivities = state.toAddActivities.concat(
        action.goods.map(DiscountActivity.convertFromGoods)
      )
      return {
        ...state,
        toAddActivities,
        toAddActivitiesToShow: toAddActivities.slice(0, 10),
        toAddActivitiesTotalCount: toAddActivities.length
      }

    case fromDiscountActivity.GET_TO_ADD_ACTIVITY_TO_SHOW:
      const { pageIndex, pageSize } = action.payload
      return {
        ...state,
        toAddActivitiesToShow: state.toAddActivities.slice(
          (pageIndex - 1) * pageSize,
          pageIndex * pageSize
        )
      }
    case fromDiscountActivity.REMOVE_TO_ADD_ACTIVITY:
      const activities = state.toAddActivities.filter(e => e.goodsId !== action.goodsId)

      return {
        ...state,
        toAddActivities: activities,
        toAddActivitiesToShow: activities.slice(0, 10),
        toAddActivitiesTotalCount: activities.length
      }
    case fromDiscountActivity.FETCH_QRCODE_TEMPLATE_SUCCESS:
      return R.evolve(
        {
          qrcodeTpls: R.always(action.qrcodeTpls)
        },
        state
      )
    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getActivities = (state: State) => state.activities
export const getTotalCount = (state: State) => state.totalCount

export const getCurrentGoods = (state: State) => state.currentGoods
export const getFetchGoodsLoading = (state: State) => state.fetchGoodsLoading
export const getGoodsTotalCount = (state: State) => state.goodsTotalCount
export const getToAddActivities = (state: State) => state.toAddActivities
export const getToAddActivitiesTotalCount = (state: State) =>
  state.toAddActivitiesTotalCount
export const getToAddactivitiesToShow = (state: State) => state.toAddActivitiesToShow

export const getQrcodeTpls = (state: State) => state.qrcodeTpls
