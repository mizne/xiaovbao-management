import * as fromDiscountActivity from './discount-activity.action'
import { DiscountActivity } from '../models/discount-activity.model'

export interface State {
  loading: boolean
  activities: DiscountActivity[]
  totalCount: number
}

const initialState: State = {
  loading: false,
  activities: [],
  totalCount: 0
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
    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getActivities = (state: State) => state.activities
export const getTotalCount = (state: State) => state.totalCount
