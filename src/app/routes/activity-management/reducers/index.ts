import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromActivity from '../activity-management/activity.reducer'
import * as fromDiscountActivity from '../discount-activity/discount-activity.reducer'
import * as fromRoot from '../../../reducers'

export interface ActivityManagementState {
  activity: fromActivity.State
  discountActivity: fromDiscountActivity.State
}

export interface State extends fromRoot.State {
  activityManagement: ActivityManagementState
}

export const reducers = {
  activity: fromActivity.reducer,
  discountActivity: fromDiscountActivity.reducer
}

export const getActivityManagementModule = createFeatureSelector<ActivityManagementState>('activityManagement')

export const getActivityState = createSelector(getActivityManagementModule, (state: ActivityManagementState) => state.activity)
export const getActivityLoading = createSelector(getActivityState, fromActivity.getLoading)
export const getActivities = createSelector(getActivityState, fromActivity.getActivities)
export const getActivityTotalCount = createSelector(getActivityState, fromActivity.getTotalCount)


export const getDiscountActivityState = createSelector(
  getActivityManagementModule,
  (state: ActivityManagementState) => state.discountActivity
)
export const getDiscountActivityLoading = createSelector(
  getDiscountActivityState,
  fromDiscountActivity.getLoading
)
export const getDiscountActivities = createSelector(
  getDiscountActivityState,
  fromDiscountActivity.getActivities
)
export const getDiscountActivityTotalCount = createSelector(
  getDiscountActivityState,
  fromDiscountActivity.getTotalCount
)
export const getCurrentGoods = createSelector(
  getDiscountActivityState,
  fromDiscountActivity.getCurrentGoods
)
export const getFetchGoodsLoading = createSelector(
  getDiscountActivityState,
  fromDiscountActivity.getFetchGoodsLoading
)
export const getGoodsTotalCount = createSelector(
  getDiscountActivityState,
  fromDiscountActivity.getGoodsTotalCount
)
export const getToAddActivities = createSelector(
  getDiscountActivityState,
  fromDiscountActivity.getToAddActivities
)
export const getToAddActivitiesTotalCount = createSelector(
  getDiscountActivityState,
  fromDiscountActivity.getToAddActivitiesTotalCount
)
export const getToAddActivitiesToShow = createSelector(
  getDiscountActivityState,
  fromDiscountActivity.getToAddactivitiesToShow
)
export const getQrcodeTpls = createSelector(
  getDiscountActivityState,
  fromDiscountActivity.getQrcodeTpls
)
