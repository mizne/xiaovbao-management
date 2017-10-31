import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'

import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/startWith'
import { Store } from '@ngrx/store'
import {
  State,
  getCurrentPreciseAnalysis,
  getPreciseAnalysisTotalCount,
  getPreciseAnalysisLoading
} from '../reducers'
import {
  FectchPreciseAnalysisAction,
  FetchPreciseAnalysisCountAction
} from './precise-analysis.action'

import { PreciseAnalysis } from '../models/precise-analysis.model'

@Component({
  selector: 'app-precise-analysis',
  templateUrl: './precise-analysis.component.html'
})
export class PreciseAnalysisComponent implements OnInit {
  pageIndex = 1
  pageSize = 10

  searchForm: FormGroup

  showPreciseAnalysis$: Observable<PreciseAnalysis[]>
  total$: Observable<number>
  loading$: Observable<boolean>

  constructor(
    private message: NzMessageService,
    private modalService: NzModalService,
    private fb: FormBuilder,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.buildForm()
    this.initDataSource()

    this.store.dispatch(new FectchPreciseAnalysisAction({
      action: 0,
      startDate: '',
      endDate: '',
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    }))
    this.store.dispatch(new FetchPreciseAnalysisCountAction({
      action: 0,
      startDate: '',
      endDate: ''
    }))
  }

  private buildForm() {
    this.searchForm = this.fb.group({
      action: 0,
      duration: ''
    })
  }

  private initDataSource() {
    this.showPreciseAnalysis$ = this.store.select(getCurrentPreciseAnalysis)
    this.total$ = this.store.select(getPreciseAnalysisTotalCount)
    this.loading$ = this.store.select(getPreciseAnalysisLoading)
  }

  pageIndexChange(pageIndex) {
    console.log('page index: ' + this.pageIndex)
    this.store.dispatch(new FectchPreciseAnalysisAction({
      action: 0,
      startDate: '',
      endDate: '',
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    }))
  }

  pageSizeChange(pageSize) {
    console.log('page size: ' + this.pageSize)
    this.store.dispatch(new FectchPreciseAnalysisAction({
      action: 0,
      startDate: '',
      endDate: '',
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    }))
  }
}
