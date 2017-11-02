import { Component, OnInit } from '@angular/core'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { Subject } from 'rxjs/Subject'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/combineLatest'
import 'rxjs/add/operator/startWith'
import { Store } from '@ngrx/store'
import { State, getDiscountActivityLoading, getDiscountActivities, getDiscountActivityTotalCount } from '../reducers'
import { FectchDiscountActivityAction, FetchDiscountActivityCountAction } from './discount-activity.action'

import { DiscountActivity } from '../models/discount-activity.model'

@Component({
  selector: 'app-discount-activity',
  templateUrl: './discount-activity.component.html',
  styleUrls: ['./discount-activity.component.less']
})
export class DiscountActivityComponent implements OnInit {
  pageIndex = 1
  pageSize = 10

  total$: Observable<number>
  loading$: Observable<boolean>

  discountActivities$: Observable<DiscountActivity[]>

  constructor(
    private message: NzMessageService,
    private modalService: NzModalService,
    private store: Store<State>,
  ) {}

  ngOnInit() {
    this.initDataSource()
    this.fetchData()
  }

  private initDataSource() {
    this.discountActivities$ = this.store.select(getDiscountActivities)
    this.total$ = this.store.select(getDiscountActivityTotalCount)
    this.loading$ = this.store.select(getDiscountActivityLoading)
  }

  private fetchData(): void {
    this.store.dispatch(
      new FectchDiscountActivityAction({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
    )
    this.store.dispatch(new FetchDiscountActivityCountAction())
  }

  toSelectGoods(): void {
    
  }

  toEditGoods(activity: DiscountActivity): void {
    // const subscription = this.modalService.open({
    //   title: '编辑商品',
    //   content: AddGoodsTypeModalComponent,
    //   footer: false,
    //   componentParams: {
    //     action: 'edit'
    //   }
    // })
    // subscription.subscribe(result => {
    //   if (typeof result !== 'string') {
    //     console.log('to edit goods: ', result)
    //   }
    //   if (result === 'onDestroy') {
    //     subscription.unsubscribe()
    //   }
    // })
  }

  ensureDelGoods(id: string): void {

  }

  pageIndexChange(pageIndex) {
    console.log('page index: ' + this.pageIndex)
    this.store.dispatch(
      new FectchDiscountActivityAction({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
    )
  }

  pageSizeChange(pageSize) {
    console.log('page size: ' + this.pageSize)
    this.store.dispatch(
      new FectchDiscountActivityAction({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
    )
  }
}


