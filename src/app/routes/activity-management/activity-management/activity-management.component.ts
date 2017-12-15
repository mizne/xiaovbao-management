import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

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
// import { Logger, LoggerFactory } from 'app/core/services/logger.service'

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

  // private logger: Logger
  constructor(
    private store: Store<State>,
    private router: Router,
    private route: ActivatedRoute,
    // private loggerFactory: LoggerFactory
  ) {
    // this.logger = loggerFactory.createLogger('activity-management')
  }

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
