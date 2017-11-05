import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable';
import { NzNotificationService } from 'ng-zorro-antd'

import * as fromDiscountActivity from './discount-activity.action'
import { ActivityService } from '../activity.service'
import { GoodsService } from 'app/core/services/goods.service'
import { QrcodeService } from 'app/core/services/qrcode.service'

import { LocalStorageService } from 'app/core/services/localstorage.service'

@Injectable()
export class DiscountActivityEffects {
  @Effect()
  fetchDiscountActivity = this.actions$
    .ofType(fromDiscountActivity.FETCH_DISCOUNT_ACTIVITY)
    .map(
      (action: fromDiscountActivity.FectchDiscountActivityAction) =>
        action.payload
    )
    .switchMap(({ pageIndex, pageSize }) => {
      return this.activityService
        .fetchDiscountActivity(this.local.tenantId, pageIndex, pageSize)
        .map(
          activities =>
            new fromDiscountActivity.FetchDiscountActivitySuccessAction(
              activities
            )
        )
        .catch(e =>
          Observable.of(new fromDiscountActivity.FetchDiscountActivityFailureAction())
        )
    })

  @Effect()
  fetchDiscountActivityCount$ = this.actions$
    .ofType(fromDiscountActivity.FETCH_DISCOUNT_ACTIVITY_COUNT)
    .switchMap(() => {
      return this.activityService
        .fetchDiscountActivityCount(this.local.tenantId)
        .map(
          count =>
            new fromDiscountActivity.FetchDiscountActivityCountSuccessAction(
              count
            )
        )
        .catch(e =>
          Observable.of(new fromDiscountActivity.FetchDiscountActivityCountFailureAction())
        )
    })

  @Effect()
  createDiscountActivity$ = this.actions$
    .ofType(fromDiscountActivity.CREATE_DISCOUNT_ACTIVITY)
    .map(
      (action: fromDiscountActivity.CreateDiscountActivityAction) =>
        action.discountActivity
    )
    .switchMap(discountActivity => {
      return this.activityService
        .createDiscountActivity(this.local.tenantId, discountActivity)
        .concatMap(e => [
          new fromDiscountActivity.CreateDiscountActivitySuccessAction(
            discountActivity.goodsName
          ),
          new fromDiscountActivity.RemoveToAddActivityAction(discountActivity.goodsId),
          new fromDiscountActivity.FectchDiscountActivityAction(),
          new fromDiscountActivity.FetchDiscountActivityCountAction()
        ])
        .catch(e =>
          Observable.of(
            new fromDiscountActivity.CreateDiscountActivityFailureAction(
              discountActivity.goodsName
            )
          )
        )
    })
  @Effect({ dispatch: false })
  createDiscountActivitySuccess$ = this.actions$
    .ofType(fromDiscountActivity.CREATE_DISCOUNT_ACTIVITY_SUCCESS)
    .map(
      (action: fromDiscountActivity.CreateDiscountActivitySuccessAction) =>
        action.goodsName
    )
    .do(goodsName => {
      this.notify.success('添加折扣活动', `恭喜您 添加 ${goodsName} 折扣活动成功！`)
    })
  @Effect({ dispatch: false })
  createDiscountActivityFailure$ = this.actions$
    .ofType(fromDiscountActivity.CREATE_DISCOUNT_ACTIVITY_FAILURE)
    .map(
      (action: fromDiscountActivity.CreateDiscountActivityFailureAction) =>
        action.goodsName
    )
    .do(goodsName => {
      this.notify.success('添加折扣活动', `添加 ${goodsName} 折扣活动失败！`)
    })

  @Effect()
  deleteDiscountActivity$ = this.actions$
    .ofType(fromDiscountActivity.DELETE_DISCOUNT_ACTIVITY)
    .map(
      (action: fromDiscountActivity.DeleteDiscountActivityAction) => action.id
    )
    .switchMap(id => {
      return this.activityService
        .deleteDiscountActivity(this.local.tenantId, id)
        .concatMap(e => [
          new fromDiscountActivity.DeleteDiscountActivitySuccessAction(),
          new fromDiscountActivity.FectchDiscountActivityAction(),
          new fromDiscountActivity.FetchDiscountActivityCountAction()
        ])
        .catch(e =>
          Observable.of(new fromDiscountActivity.DeleteDiscountActivityFailureAction())
        )
    })
  @Effect({ dispatch: false })
  deleteDiscountActivitySuccess$ = this.actions$
    .ofType(fromDiscountActivity.DELETE_DISCOUNT_ACTIVITY_SUCCESS)
    .do(() => {
      this.notify.success('删除折扣活动', `恭喜您 删除商品折扣活动成功！`)
    })
  @Effect({ dispatch: false })
  deleteDiscountActivityFailure$ = this.actions$
    .ofType(fromDiscountActivity.DELETE_DISCOUNT_ACTIVITY_FAILURE)
    .do(() => {
      this.notify.success('删除折扣活动', `删除商品折扣活动失败！`)
    })

  @Effect()
  fetchGoods$ = this.actions$
    .ofType(fromDiscountActivity.FETCH_GOODS)
    .map((action: fromDiscountActivity.FetchGoodsAction) => action.payload)
    .switchMap(({ pageIndex, pageSize, goodsName, goodsType }) => {
      return this.goodsService
        .fetchGoods(
          this.local.tenantId,
          pageIndex,
          pageSize,
          goodsName,
          goodsType
        )
        .map(goods => new fromDiscountActivity.FetchGoodsSuccessAction(goods))
        .catch(e => Observable.of(new fromDiscountActivity.FetchGoodsFailureAction([])))
    })

  @Effect()
  fetchGoodsCount$ = this.actions$
    .ofType(fromDiscountActivity.FETCH_GOODS_COUNT)
    .map((action: fromDiscountActivity.FetchGoodsCountAction) => action.payload)
    .switchMap(({ goodsName, goodsType }) => {
      return this.goodsService
        .fetchGoodsCount(this.local.tenantId, goodsName, goodsType)
        .map(
          count => new fromDiscountActivity.FetchGoodsCountSuccessAction(count)
        )
        .catch(e => Observable.of(new fromDiscountActivity.FetchGoodsCountFailureAction()))
    })

  @Effect()
  fetchQrcodeTpl$ = this.actions$
    .ofType(fromDiscountActivity.FETCH_QRCODE_TEMPLATE)
    .switchMap(() => {
      return this.qrcodeService
        .fetchQrcodes(this.local.tenantId)
        .map(
          qrcodes =>
            new fromDiscountActivity.FetchQrcodeTemplateSuccessAction(qrcodes)
        )
        .catch(e =>
          Observable.of(new fromDiscountActivity.FetchQrcodeTemplateFailureAction())
        )
    })

  constructor(
    private actions$: Actions,
    private activityService: ActivityService,
    private goodsService: GoodsService,
    private qrcodeService: QrcodeService,
    private local: LocalStorageService,
    private notify: NzNotificationService
  ) {}
}
