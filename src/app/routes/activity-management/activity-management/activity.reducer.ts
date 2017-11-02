import * as fromActivity from './activity.action'
import { Activity } from '../models/activity.model'

export interface State {
  loading: boolean
  activities: Activity[]
  totalCount: number
}

const initialState: State = {
  loading: false,
  activities: [],
  totalCount: 0
}

export function reducer(
  state: State = initialState,
  action: fromActivity.Actions
): State {
  switch (action.type) {
    case fromActivity.FETCH_ACTIVITY:
      return {
        ...state,
        loading: true
      }
    case fromActivity.FETCH_ACTIVITY_SUCCESS:
      return {
        ...state,
        loading: false,
        activities: action.activities
      }
    case fromActivity.FETCH_ACTIVITY_FAILURE:
      return {
        ...state,
        loading: false
      }

    case fromActivity.FETCH_ACTIVITY_COUNT_SUCCESS: 
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
