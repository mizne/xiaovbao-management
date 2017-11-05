import { Component, OnInit } from '@angular/core'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { Router, ActivatedRoute } from '@angular/router'

import { Subject } from 'rxjs/Subject'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { Observable } from 'rxjs/Observable'

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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initDataSource()
    this.fetchData()
  }

  viewActivity(): void {
    this.router.navigate(['discount'], { relativeTo: this.route })
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
    this.router.navigate(['discount'], { relativeTo: this.route })
  }
}
