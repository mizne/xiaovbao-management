import { NzNotificationService } from 'ng-zorro-antd'

import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromGoods from './goods.action'
import { GoodsService } from 'app/core/services/goods.service'

import { TenantService } from 'app/core/services/tenant.service'

@Injectable()
export class GoodsEffects {
  @Effect()
  fetchGoods$ = this.actions$
    .ofType(fromGoods.FETCH_GOODS)
    .map((action: fromGoods.FetchGoodsAction) => action.payload)
    .switchMap(({ pageIndex, pageSize, goodsName, goodsType }) => {
      return this.goodsService
        .fetchGoods(
          this.tenantService.tenantId,
          pageIndex,
          pageSize,
          goodsName,
          goodsType
        )
        .map(goods => new fromGoods.FetchGoodsSuccessAction(goods))
        .catch(e => Observable.of(new fromGoods.FetchGoodsFailureAction()))
    })

  @Effect()
  fetchSingleGoods$ = this.actions$
    .ofType(fromGoods.FETCH_SINGLE_GOODS)
    .map((action: fromGoods.FetchSingleGoodsAction) => action.goodsId)
    .switchMap(goodsId => {
      return this.goodsService
        .fetchSingleGoods(this.tenantService.tenantId, goodsId)
        .map(goods => new fromGoods.FetchSingleGoodsSuccessAction(goods))
        .catch(e =>
          Observable.of(new fromGoods.FetchSingleGoodsFailureAction())
        )
    })

  @Effect()
  fetchGoodsCount$ = this.actions$
    .ofType(fromGoods.FETCH_GOODS_COUNT)
    .map((action: fromGoods.FetchGoodsCountAction) => action.payload)
    .switchMap(({ goodsName, goodsType }) => {
      return this.goodsService
        .fetchGoodsCount(this.tenantService.tenantId, goodsName, goodsType)
        .map(count => new fromGoods.FetchGoodsCountSuccessAction(count))
        .catch(e => Observable.of(new fromGoods.FetchGoodsCountFailureAction()))
    })

  @Effect()
  fetchAllGoodsTypes$ = this.actions$
    .ofType(fromGoods.FETCH_GOODS_TYPES)
    .switchMap(tenantId => {
      return this.goodsService
        .fetchAllGoodsTypes(this.tenantService.tenantId)
        .map(
          goodsTypes => new fromGoods.FetchGoodsTypesSuccessAction(goodsTypes)
        )
        .catch(e => Observable.of(new fromGoods.FetchGoodsTypesFailureAction()))
    })

  @Effect()
  addGoodsType$ = this.actions$
    .ofType(fromGoods.ADD_GOODS_TYPE)
    .map((action: fromGoods.AddGoodsTypeAction) => action.goodsTypeName)
    .switchMap(goodsTypeName => {
      return this.goodsService
        .addGoodsType(this.tenantService.tenantId, goodsTypeName)
        .concatMap(() => [
          new fromGoods.AddGoodsTypeSuccessAction(goodsTypeName),
          new fromGoods.FectchGoodsTypesAction()
        ])
        .catch(() =>
          Observable.of(new fromGoods.AddGoodsTypeFailureAction(goodsTypeName))
        )
    })

  @Effect({ dispatch: false })
  addGoodsTypeSuccess$ = this.actions$
    .ofType(fromGoods.ADD_GOODS_TYPE_SUCCESS)
    .map((action: fromGoods.AddGoodsTypeSuccessAction) => action.goodsTypeName)
    .do(goodsTypeName => {
      this.notify.success(
        '添加商品类别',
        `恭喜您 添加商品类别 ${goodsTypeName} 成功！`
      )
    })

  @Effect({ dispatch: false })
  addGoodsTypeFailure$ = this.actions$
    .ofType(fromGoods.ADD_GOODS_TYPE_FAILURE)
    .map((action: fromGoods.AddGoodsTypeFailureAction) => action.goodsTypeName)
    .do(goodsTypeName => {
      this.notify.error('添加商品类别', `添加商品类别 ${goodsTypeName} 失败！`)
    })

  @Effect()
  addGoods$ = this.actions$
    .ofType(fromGoods.ADD_GOODS)
    .map((action: fromGoods.AddGoodsAction) => action.goods)
    .switchMap(goods => {
      return this.goodsService
        .addGoods(this.tenantService.tenantId, goods)
        .concatMap(() => [
          new fromGoods.AddGoodsSuccessAction(goods.name),
          new fromGoods.FetchGoodsCountAction()
        ])
        .catch(() =>
          Observable.of(new fromGoods.AddGoodsFailureAction(goods.name))
        )
    })

  @Effect({ dispatch: false })
  addGoodsSuccess$ = this.actions$
    .ofType(fromGoods.ADD_GOODS_SUCCESS)
    .map((action: fromGoods.AddGoodsSuccessAction) => action.goodsName)
    .do(goodsName => {
      this.notify.success('添加商品类别', `恭喜您 添加商品 ${goodsName} 成功！`)
    })

  @Effect({ dispatch: false })
  addGoodsFailure$ = this.actions$
    .ofType(fromGoods.ADD_GOODS_FAILURE)
    .map((action: fromGoods.AddGoodsFailureAction) => action.goodsName)
    .do(goodsName => {
      this.notify.error('添加商品类别', `添加商品 ${goodsName} 失败！`)
    })

  @Effect()
  fetchAllGoodsUnits$ = this.actions$
    .ofType(fromGoods.FETCH_GOODS_UNITS)
    .switchMap(() => {
      return this.goodsService
        .fetchAllGoodsUnits(this.tenantService.tenantId)
        .map(
          goodsUnits => new fromGoods.FetchGoodsUnitsSuccessAction(goodsUnits)
        )
        .catch(e => Observable.of(new fromGoods.FetchGoodsUnitsFailureAction()))
    })

  @Effect()
  addGoodsUnit$ = this.actions$
    .ofType(fromGoods.ADD_GOODS_UNIT)
    .map((action: fromGoods.AddGoodsUnitAction) => action.goodsUnit)
    .switchMap(goodsUnit => {
      return this.goodsService
        .addGoodsUnit(this.tenantService.tenantId, goodsUnit)
        .concatMap(e => [
          new fromGoods.AddGoodsUnitSuccessAction(goodsUnit),
          new fromGoods.FetchGoodsUnitsAction()
        ])
        .catch(e =>
          Observable.of(new fromGoods.AddGoodsUnitFailureAction(goodsUnit))
        )
    })

  @Effect({ dispatch: false })
  addGoodsUnitSuccess$ = this.actions$
    .ofType(fromGoods.ADD_GOODS_UNIT_SUCCESS)
    .map((action: fromGoods.AddGoodsUnitSuccessAction) => action.goodsUnit)
    .do(goodsUnit => {
      this.notify.success(
        '添加商品单位',
        `恭喜您 添加商品单位 ${goodsUnit} 成功！`
      )
    })

  @Effect({ dispatch: false })
  addGoodsUnitFailure$ = this.actions$
    .ofType(fromGoods.ADD_GOODS_UNIT_FAILURE)
    .map((action: fromGoods.AddGoodsUnitFailureAction) => action.goodsUnit)
    .do(goodsUnit => {
      this.notify.error('添加商品单位', `添加商品单位 ${goodsUnit} 失败！`)
    })

  @Effect()
  offShelfGoods$ = this.actions$
    .ofType(fromGoods.OFF_SHELF_GOODS)
    .map((action: fromGoods.OffShelfGoodsAction) => action.goodsId)
    .switchMap(goodsId => {
      return this.goodsService
        .offShelfGoods(this.tenantService.tenantId, goodsId)
        .concatMap(e => [
          new fromGoods.OffShelfGoodsSuccessAction(),
          new fromGoods.FetchSingleGoodsAction(goodsId)
        ])
        .catch(e => Observable.of(new fromGoods.OffShelfGoodsFailureAction()))
    })
  @Effect({ dispatch: false })
  offShelfGoodsSuccess$ = this.actions$
    .ofType(fromGoods.OFF_SHELF_GOODS_SUCCESS)
    .do(() => {
      this.notify.success('下架商品', '恭喜您 下架商品成功！')
    })
  @Effect({ dispatch: false })
  offShelfGoodsFailure$ = this.actions$
    .ofType(fromGoods.OFF_SHELF_GOODS_FAILURE)
    .do(() => {
      this.notify.error('下架商品', '下架商品失败！')
    })

  @Effect()
  onShelfGoods$ = this.actions$
    .ofType(fromGoods.ON_SHELF_GOODS)
    .map((action: fromGoods.OnShelfGoodsAction) => action.goodsId)
    .switchMap(goodsId => {
      return this.goodsService
        .onShelfGoods(this.tenantService.tenantId, goodsId)
        .concatMap(e => [
          new fromGoods.OnShelfGoodsSuccessAction(),
          new fromGoods.FetchSingleGoodsAction(goodsId)
        ])
        .catch(e => Observable.of(new fromGoods.OnShelfGoodsFailureAction()))
    })
  @Effect({ dispatch: false })
  onShelfGoodsSuccess$ = this.actions$
    .ofType(fromGoods.ON_SHELF_GOODS_SUCCESS)
    .do(() => {
      this.notify.success('上架商品', '恭喜您 上架商品成功！')
    })

  @Effect({ dispatch: false })
  onShelfGoodsFailure$ = this.actions$
    .ofType(fromGoods.ON_SHELF_GOODS_FAILURE)
    .do(() => {
      this.notify.error('上架商品', '上架商品失败！')
    })

  /**
   * 编辑成功 再获取当前编辑的这个商品
   *
   * @memberof GoodsEffects
   */
  @Effect()
  editGoods$ = this.actions$
    .ofType(fromGoods.EDIT_GOODS)
    .map((action: fromGoods.EditGoodsAction) => action.goods)
    .switchMap(goods => {
      return this.goodsService
        .editGoods(this.tenantService.tenantId, goods.id, goods)
        .concatMap(() => [
          new fromGoods.EditGoodsSuccessAction(),
          new fromGoods.FetchSingleGoodsAction(goods.id)
        ])
        .catch(e => Observable.of(new fromGoods.EditGoodsFailureAction()))
    })

  @Effect({ dispatch: false })
  editGoodsSuccess$ = this.actions$
    .ofType(fromGoods.EDIT_GOODS_SUCCESS)
    .do(() => {
      this.notify.success('编辑商品', '恭喜您 编辑商品成功！')
    })
  @Effect({ dispatch: false })
  editGoodsFailure$ = this.actions$
    .ofType(fromGoods.EDIT_GOODS_FAILURE)
    .do(() => {
      this.notify.error('编辑商品', '编辑商品失败！')
    })

  constructor(
    private actions$: Actions,
    private goodsService: GoodsService,
    private tenantService: TenantService,
    private notify: NzNotificationService
  ) {}
}
