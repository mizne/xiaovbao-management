import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { Store } from '@ngrx/store'
import {
  State,
  getCurrentOrders,
  getOrderLoading,
  getOrderTotalCount
} from '../reducers'
import {
  FectchOrdersAction,
  FetchOrdersCountAction
} from './order-management.action'

import { Logger, LoggerFactory } from 'app/core/services/logger.service'
import * as moment from 'moment'

import {
  Column,
  Action,
  PageChangeOption,
  ActionExecuteOption
} from 'app/shared/components/wrap-table/wrap-table.component'
import { DestroyService } from 'app/core/services/destroy.service'

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.less'],
  providers: [DestroyService]
})
export class OrderManagementComponent implements OnInit {
  columns: Column[] = [
    {
      label: '下单时间',
      key: 'createdAt',
      transform: (rowData) => moment(rowData.createdAt).format('YYYY-MM-DD HH:mm')
    },
    {
      label: '订单状态',
      key: 'status',
      transform: (rowData) => rowData // TODO 转化 订单状态 描述性文字
    },
    {
      label: '手机号码',
      key: 'phone'
    },
    {
      label: '订单金额',
      key: 'orderAmount'
    },
  ]

  actions: Action[] = [
    {
      label: '查看',
      key: 'VIEW'
    }
  ]
  pageIndexAndSizeChange$: Subject<PageChangeOption> = new Subject<
    PageChangeOption
  >()
  actionExecute$: Subject<ActionExecuteOption> = new Subject<
    ActionExecuteOption
  >()
  currentOrders$: Observable<any>
  fetchOrderLoading$: Observable<boolean>
  orderTotalCount$: Observable<number>

  private logger: Logger
  constructor(
    private store: Store<State>,
    private destroyService: DestroyService,
    private router: Router,
    private route: ActivatedRoute,
    private loggerFactory: LoggerFactory
  ) {
    this.logger = loggerFactory.createLogger('order-management')
  }

  ngOnInit() {
    this.initDataSource()
    this.initSubscriber()
  }

  private initDataSource(): void {
    this.currentOrders$ = this.store.select(getCurrentOrders)
    this.fetchOrderLoading$ = this.store.select(getOrderLoading)
    this.orderTotalCount$ = this.store.select(getOrderTotalCount)

  }

  private initSubscriber(): void {
    this.initPageChange()

    this.initViewAction()
  }

  private initPageChange(): void {
    this.pageIndexAndSizeChange$
      .first()
      .takeUntil(this.destroyService)
      .subscribe(() => {
        this.initFetchData()
      })

    this.pageIndexAndSizeChange$
      .skip(1)
      .takeUntil(this.destroyService)
      .subscribe(({ index, size }) => {
        this.store.dispatch(
          new FectchOrdersAction({
            pageIndex: index,
            pageSize: size
          })
        )
      })
  }

  private initViewAction(): void {
    this.actionExecute$.filter(e => e.type === 'VIEW').subscribe(e => {
      this.router.navigate([e.payload.data.tradeNo], {relativeTo: this.route})
    })
  }

  private initFetchData(): void {
    this.store.dispatch(new FetchOrdersCountAction())
    this.store.dispatch(new FectchOrdersAction())
  }
}
