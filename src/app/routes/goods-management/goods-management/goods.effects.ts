import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/exhaustMap'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { of } from 'rxjs/observable/of'

import * as fromGoods from './goods.action'
import { GoodsService } from '../goods.service'

@Injectable()
export class GoodsEffects {
  @Effect()
  fetchGoods$ = this.actions$.ofType(fromGoods.FETCH_GOODS)
  .map((action: fromGoods.FectchGoodsAction) => action.payload)
  .mergeMap(({ pageIndex, pageSize }) => {
    return this.goodsService.fetchGoods(pageIndex, pageSize)
    .map(goods => new fromGoods.FetchGoodsSuccessAction(goods))
    .catch(e => of(new fromGoods.FetchGoodsFailureAction()))
  })

  @Effect()
  fetchGoodsCount$ = this.actions$.ofType(fromGoods.FETCH_GOODS_COUNT)
  .mergeMap(() => {
    return this.goodsService.fetchGoodsCount()
    .map(count => new fromGoods.FetchGoodsCountSuccessAction(count))
    .catch(e => of(new fromGoods.FetchGoodsCountFailureAction()))
  })

  @Effect()
  fetchAllGoodsTypes$ = this.actions$.ofType(fromGoods.FETCH_ALL_GOODS_TYPE)
  .mergeMap(() => {
    return this.goodsService.fetchAllGoodsTypes()
    .map(goodsTypes => new fromGoods.FetchAllGoodsTypeSuccessAction(goodsTypes))
    .catch(e => of(new fromGoods.FetchAllGoodsTypeFailureAction()))
  })

  constructor(
    private actions$: Actions,
    private goodsService: GoodsService
  ) {}
}
