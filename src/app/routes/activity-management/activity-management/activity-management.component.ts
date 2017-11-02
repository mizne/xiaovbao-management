import { Component, OnInit } from '@angular/core'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { Router } from '@angular/router'

import { Subject } from 'rxjs/Subject'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/merge'
import 'rxjs/add/observable/combineLatest'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/distinctUntilChanged';

import { Store } from '@ngrx/store'
import {
  State,
  getActivityLoading,
  getActivities,
  getActivityTotalCount
} from '../reducers'
import {
  FectchActivityAction,
  FetchActivityCountAction
} from './activity.action'

import { Activity } from '../models/activity.model'

@Component({
  selector: 'app-activity-management',
  templateUrl: './activity-management.component.html',
  styleUrls: ['./activity-management.component.less']
})
export class ActivityManagementComponent implements OnInit {
  pageIndex = 1
  pageSize = 10

  total$: Observable<number>
  loading$: Observable<boolean>

  showActivities$: Observable<Activity[]>

  constructor(
    private message: NzMessageService,
    private modalService: NzModalService,
    private store: Store<State>,
    private router: Router
  ) {}

  ngOnInit() {
    this.initDataSource()
    this.fetchData()
  }

  private toEdit(id): void {
    console.log(`store dispatch to edit activity: ${id}`)
  }

  private toDelete(id: string): void {
    this.modalService.open({
      title: '删除活动',
      content: '确定删除这项活动么?',
      onOk: () => {
        console.log('store dispatch to delete activity: ' + id)
      },
      onCancel() {
      }
    })
  }

  private initDataSource() {
    this.showActivities$ = this.store.select(getActivities)
    this.total$ = this.store.select(getActivityTotalCount)
    this.loading$ = this.store.select(getActivityLoading)
  }

  private fetchData(): void {
    this.store.dispatch(
      new FectchActivityAction({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
    )
    this.store.dispatch(new FetchActivityCountAction())
  }

  toCreateDiscountActivity(): void {
    this.router.navigate(['activity-management', 'discount'])
  }

  toEditGoods(activity: Activity): void {
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

  ensureDelGoods(id: string): void {}

  pageIndexChange(pageIndex) {
    console.log('page index: ' + this.pageIndex)
    this.store.dispatch(
      new FectchActivityAction({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
    )
  }

  pageSizeChange(pageSize) {
    console.log('page size: ' + this.pageSize)
    this.store.dispatch(
      new FectchActivityAction({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
    )
  }
}
