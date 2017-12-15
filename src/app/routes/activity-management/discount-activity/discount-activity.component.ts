import { Component, OnInit } from '@angular/core'
import { NzModalService } from 'ng-zorro-antd'
import { Subject } from 'rxjs/Subject'
import * as R from 'ramda'

import { Observable } from 'rxjs/Observable'


import { Store } from '@ngrx/store'
import {
  State,
  getDiscountActivityLoading,
  getDiscountActivities,
  getDiscountActivityTotalCount,
  getCurrentGoods,
  getToAddActivitiesToShow,
  getToAddActivitiesTotalCount
 } from '../reducers'
import {
  FectchDiscountActivityAction,
  FetchDiscountActivityCountAction,
  SelectGoodsAction,
  GetToAddActivityToShowAction,
  CreateDiscountActivityAction,
  RemoveToAddActivityAction,
  DeleteDiscountActivityAction
} from './discount-activity.action'

import { DiscountActivity } from '../models/discount-activity.model'

import {
  Column,
  Action,
  PageChangeOption,
  ActionExecuteOption
} from 'app/shared/components/wrap-table/wrap-table.component'
import { DestroyService } from 'app/core/services/destroy.service'

import { SelectGoodsModalComponent } from '../modals/select-goods-modal.component'
import { AddDiscountActivityModalComponent } from '../modals/add-discount-activity-modal.component'

@Component({
  selector: 'app-discount-activity',
  templateUrl: './discount-activity.component.html',
  styleUrls: ['./discount-activity.component.less'],
  providers: [DestroyService]
})
export class DiscountActivityComponent implements OnInit {
  toAddColumns: Column[] = [
    {
      label: '商品名称',
      key: 'goodsName',
    },
    {
      label: '原价',
      key: 'originalPrice'
    },
    {
      label: '折扣',
      key: 'discount'
    },
    {
      label: '活动价',
      key: 'activityPrice'
    },
    {
      label: '每单限购',
      key: 'limitPerOrder'
    }
  ]

  toAddActions: Action[] = [
    {
      label: '新增',
      key: 'CREATE'
    },
    {
      label: '移除',
      key: 'REMOVE'
    }
  ]
  toAddPageIndexAndSizeChange$: Subject<PageChangeOption> = new Subject<
    PageChangeOption
  >()
  toAddActionExecute$: Subject<ActionExecuteOption> = new Subject<
    ActionExecuteOption
  >()
  toAddActivitiesToShow$: Observable<any>
  toAddActivityLoading$: Observable<boolean> = Observable.of(false)
  toAddActivityTotalCount$: Observable<number>


  columns: Column[] = [
    {
      label: '商品名称',
      key: 'goodsName',
    },
    {
      label: '原价',
      key: 'originalPrice'
    },
    {
      label: '折扣',
      key: 'discount'
    },
    {
      label: '活动价',
      key: 'activityPrice'
    },
    {
      label: '每单限购',
      key: 'limitPerOrder'
    }
  ]

  actions: Action[] = [
    {
      label: '删除',
      key: 'DELETE'
    }
  ]
  pageIndexAndSizeChange$: Subject<PageChangeOption> = new Subject<
    PageChangeOption
  >()
  actionExecute$: Subject<ActionExecuteOption> = new Subject<
    ActionExecuteOption
  >()
  currentActivities$: Observable<any>
  fetchActivityLoading$: Observable<boolean>
  activityTotalCount$: Observable<number>

  selectGoodsSub: Subject<void> = new Subject<void>()

  constructor(
    private modalService: NzModalService,
    private store: Store<State>,
    private destroyService: DestroyService
  ) {}

  ngOnInit() {
    this.initDataSource()
    this.initSubscriber()
  }

  toSelectGoods() {
    this.selectGoodsSub.next()
  }

  private initDataSource() {
    this.currentActivities$ = this.store.select(getDiscountActivities)
    this.activityTotalCount$ = this.store.select(getDiscountActivityTotalCount)
    this.fetchActivityLoading$ = this.store.select(getDiscountActivityLoading)

    this.toAddActivitiesToShow$ = this.store.select(getToAddActivitiesToShow)
    this.toAddActivityTotalCount$ = this.store.select(getToAddActivitiesTotalCount)
  }

  private initSubscriber() {
    // 第一个表格的 操作动作
    this.initToAddPageChange()
    this.initSelectGoods()
    this.initAddActivity()
    this.initRemoveActivity()

    // 第二个表格的操作动作
    this.initPageChange()
    this.initDeleteActivity()
  }

  private initToAddPageChange(): void {
    this.toAddPageIndexAndSizeChange$
    .takeUntil(this.destroyService)
    .subscribe(({ index, size }) => {
      this.store.dispatch(new GetToAddActivityToShowAction({
        pageIndex: index,
        pageSize: size
      }))
    })
  }

  private initSelectGoods(): void {
    this.selectGoodsSub.switchMap(() => {
      return this.modalService.open({
        title: '选择商品',
        content: SelectGoodsModalComponent,
        footer: false,
      })
    })
    .filter(R.is(Object))
    .withLatestFrom(this.store.select(getCurrentGoods), (ids, goods) => goods.filter(e => ids.indexOf(e.id) >= 0))
    .takeUntil(this.destroyService)
    .subscribe((goods) => {
      this.store.dispatch(new SelectGoodsAction(goods))
    })
  }


  private initAddActivity(): void {
    this.toAddActionExecute$.filter(R.propEq('type', 'CREATE'))
    .switchMap(({ payload }) => {
      return this.modalService.open({
        title: '商品折扣信息',
        content: AddDiscountActivityModalComponent,
        footer: false,
        componentParams: {
          goodsPrice: payload.data.originalPrice,
          goodsId: payload.data.goodsId,
          goodsName: payload.data.goodsName
        }
      })
    })
    .filter(R.is(Object))
    .takeUntil(this.destroyService)
    .subscribe(activity => {
      this.store.dispatch(new CreateDiscountActivityAction(activity as DiscountActivity))
    })
  }

  private initRemoveActivity(): void {
    this.toAddActionExecute$.filter(R.propEq('type', 'REMOVE'))
    .switchMap(({ payload }) => {
      return Observable.create(observer => {
        const modal = this.modalService.open({
          title: '移除商品',
          content: `确定移除 ${payload.data.goodsName} 这个商品么?`,
          onCancel: () => {
            observer.complete()
          },
          onOk: () => {
            observer.next(payload.data.goodsId)
            observer.complete()
          }
        })
        return () => {
          modal.destroy('onCancel')
        }
      }) as Observable<string>
    })
    .takeUntil(this.destroyService)
    .subscribe(goodsId => {
      this.store.dispatch(new RemoveToAddActivityAction(goodsId))
    })
  }

  private initPageChange(): void {
    this.pageIndexAndSizeChange$.first()
    .takeUntil(this.destroyService)
    .subscribe(e => {
      this.store.dispatch(new FetchDiscountActivityCountAction())
      this.store.dispatch(new FectchDiscountActivityAction())
    })

    this.pageIndexAndSizeChange$.skip(1)
    .takeUntil(this.destroyService)
    .subscribe(({ index, size }) => {
      this.store.dispatch(new FectchDiscountActivityAction({
        pageIndex: index,
        pageSize: size
      }))
    })
  }


  private initDeleteActivity(): void {
    this.actionExecute$.filter(R.propEq('type', 'DELETE'))
    .switchMap(({ payload }) => {
      return Observable.create(observer => {
        const modal = this.modalService.open({
          title: '删除折扣商品活动',
          content: `确定删除 ${payload.data.goodsName} 这个折扣商品活动么?`,
          onCancel: () => {
            observer.complete()
          },
          onOk: () => {
            observer.next(payload.data.id)
            observer.complete()
          }
        })
        return () => {
          modal.destroy('onCancel')
        }
      }) as Observable<string>
    })
    .takeUntil(this.destroyService)
    .subscribe(id => {
      this.store.dispatch(new DeleteDiscountActivityAction(id))
    })
  }
}


