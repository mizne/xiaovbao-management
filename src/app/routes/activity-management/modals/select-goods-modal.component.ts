import { Component, OnInit } from '@angular/core'
import { NzModalSubject } from 'ng-zorro-antd'

import {
  Column,
  PageChangeOption,
} from 'app/shared/components/wrap-table/wrap-table.component'
import { DestroyService } from 'app/core/services/destroy.service'

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Store } from '@ngrx/store'
import {
  State,
  getGoodsTotalCount,
  getFetchGoodsLoading,
  getCurrentGoods,
  getToAddActivities
} from '../reducers'
import { FetchGoodsAction, FetchGoodsCountAction } from '../discount-activity/discount-activity.action'

@Component({
  selector: 'app-add-goods-type-modal',
  template: `
    <div class="custome-modal-container">
    <app-wrap-table
      [pageIndexAndSizeChange]="pageIndexAndSizeChange$"
      [selectedIdsChange]="selectedIdsChange$"
      [dataSource]="currentGoods$"
      [loading]="fetchGoodsLoading$"
      [total]="goodsTotalCount$"
      [columns]="columns">
    </app-wrap-table>

      <div class="customize-footer">
        <button nz-button (click)="cancel()">{{ 'cancel' | translate }}</button>
        <button nz-button [nzType]="'primary'" [disabled]="disabledButton$ | async" (click)="ok()">{{ 'ok' | translate }}</button>
      </div>
    </div>
  `,
  providers: [DestroyService]
})
export class SelectGoodsModalComponent implements OnInit {
  columns: Column[] = [
    {
      label: '商品名称',
      key: 'name',
    },
    {
      label: '商品价格',
      key: 'price'
    },
    {
      label: '会员价格',
      key: 'vipPrice'
    },
    {
      label: '状态',
      key: 'isActive',
      transform: (data) => data.isActive ? '上架' : '下架'
    }
  ]

  pageIndexAndSizeChange$: Subject<PageChangeOption> = new Subject<
    PageChangeOption
  >()
  selectedIdsChange$: Subject<string[]> = new Subject<string[]>()

  currentGoods$: Observable<any>
  fetchGoodsLoading$: Observable<boolean>
  goodsTotalCount$: Observable<number>

  disabledButton$: Observable<boolean>
  ensureSub: Subject<void> = new Subject<void>()

  ok() {
    this.ensureSub.next()
  }

  cancel() {
    this.subject.destroy('onCancel')
  }

  constructor(
    private subject: NzModalSubject,
    private destroyService: DestroyService,
    private store: Store<State>
  ) {
  }

  ngOnInit() {
    this.initDataSource()
    this.initSubscriber()

  }

  private initDataSource(): void {
    this.currentGoods$ = this.store.select(getCurrentGoods)
    .withLatestFrom(this.store.select(getToAddActivities))
    .map(([goodses, toAddActivities]) => goodses.map(goods => {
      const added = toAddActivities.find(activity => activity.goodsId === goods.id)
      if (added) {
        return {
          ...goods,
          _disabled: true
        }
      }
      return goods
    }))
    this.fetchGoodsLoading$ = this.store.select(getFetchGoodsLoading)
    this.goodsTotalCount$ = this.store.select(getGoodsTotalCount)

    this.disabledButton$ = this.selectedIdsChange$.map(e => e.length === 0)
  }

  private initSubscriber(): void {
    this.initPageChange()
    this.initEnsure()
  }

  private initPageChange(): void {
    this.pageIndexAndSizeChange$.first()
    .subscribe(e => {
      this.store.dispatch(new FetchGoodsAction())
      this.store.dispatch(new FetchGoodsCountAction())
    })

    this.pageIndexAndSizeChange$.skip(1)
    .takeUntil(this.destroyService)
    .subscribe(({ index, size }) => {
      this.store.dispatch(new FetchGoodsAction({
        pageIndex: index,
        pageSize: size
      }))
    })
  }

  private initEnsure(): void {
    this.ensureSub.withLatestFrom(this.selectedIdsChange$, (_, ids) => ids)
    .takeUntil(this.destroyService)
    .subscribe(ids => {
      this.subject.next(ids)
      this.subject.destroy('onOk')
    })
  }
}
