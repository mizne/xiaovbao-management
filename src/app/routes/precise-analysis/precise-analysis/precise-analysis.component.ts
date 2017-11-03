import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NzMessageService, NzModalService, NzModalSubject } from 'ng-zorro-antd'

import * as moment from 'moment'
import { Subject } from 'rxjs/Subject'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/combineLatest'

import { Observer } from 'rxjs/Observer'

import 'rxjs/add/observable/of'
import 'rxjs/add/observable/merge'
import 'rxjs/add/operator/skip'

import 'rxjs/add/operator/startWith'
import { Store } from '@ngrx/store'
import {
  State,
  getCurrentPreciseAnalysis,
  getPreciseAnalysisTotalCount,
  getPreciseAnalysisLoading,
  getBatchSendSMSLoading
} from '../reducers'
import {
  FectchPreciseAnalysisAction,
  FetchPreciseAnalysisCountAction,
  SendSMSAction,
  BatchSendSMSAction
} from './precise-analysis.action'

import { PreciseAnalysis } from '../models/precise-analysis.model'
import { DestroyService } from 'app/core/services/destroy.service'

import { Column, Action, PageChangeOption, ActionExecuteOption } from 'app/shared/components/wrap-table/wrap-table.component'

@Component({
  selector: 'app-precise-analysis',
  templateUrl: './precise-analysis.component.html',
  providers: [DestroyService]
})
export class PreciseAnalysisComponent implements OnInit {
  private oneMonthOfMills = 31 * 24 * 60 * 60 * 1000
  durations = [
    {
      id: 0,
      label: '最近一个月',
      value: 0,
      offsetMills: this.oneMonthOfMills
    },
    {
      id: 1,
      label: '最近三个月',
      value: 1,
      offsetMills: 3 * this.oneMonthOfMills
    },
    {
      id: 2,
      label: '最近半年',
      value: 2,
      offsetMills: 6 * this.oneMonthOfMills
    }
  ]
  actions = [
    {
      id: 0,
      label: '潜在客户',
      value: 0
    },
    {
      id: 1,
      label: '有购买一次客户',
      value: 1
    },
    {
      id: 2,
      label: '有多次购买客户',
      value: 2
    }
  ]
  searchForm: FormGroup
  searchSub: BehaviorSubject<{
    duration: number
    action: number
  }> = new BehaviorSubject<{
    duration: number
    action: number
  }>({
    action: this.actions[0].value,
    duration: this.durations[0].value
  })

  currentPreciseAnalysis: Observable<PreciseAnalysis[]>
  fetchPreciseAnalysisLoading: Observable<boolean>
  preciseAnalysisTotalCount: Observable<number>

  batchSendSMSLoading$: Observable<boolean>
  toBatchSendSMSSub: Subject<void> = new Subject<void>()

  selectedIdsChange$: Subject<string[]> = new Subject<string[]>()
  pageIndexAndSizeChange$: Subject<PageChangeOption> = new Subject<PageChangeOption>()
  actionExecute$: Subject<ActionExecuteOption> = new Subject<ActionExecuteOption>()
  columns: Column[] = [
    {
      label: '手机',
      key: 'phone'
    },
    {
      label: '是否会员',
      key: 'isVip',
      transform: (rowDada) => {
        return rowDada.isVip ? '是' : '否'
      }
    }
  ]
  executeActions: Action[] = [
    {
      label: '发送短信',
      key: 'SEND_SMS'
    }
  ]

  constructor(
    private message: NzMessageService,
    private modalService: NzModalService,
    private fb: FormBuilder,
    private store: Store<State>,
    private destroyService: DestroyService
  ) {}

  ngOnInit() {
    this.buildForm()
    this.initDataSource()
    this.initSubscriber()
  }

  search() {
    this.searchSub.next(this.searchForm.value)
  }

  toBatchSendSMS(): void {
    this.toBatchSendSMSSub.next()
  }

  private initDataSource() {
    this.currentPreciseAnalysis = this.store.select(getCurrentPreciseAnalysis)
    this.fetchPreciseAnalysisLoading = this.store.select(
      getPreciseAnalysisLoading
    )
    this.preciseAnalysisTotalCount = this.store.select(
      getPreciseAnalysisTotalCount
    )
  }

  private initSubscriber(): void {
    this.initFetchPreciseAnalysis()
    this.initSendSMS()
    this.initBatchSendSMS()
  }

  private initFetchPreciseAnalysis(): void {
    const fetchPreciseAnalysis$ = Observable.merge(
      this.searchSub
        .asObservable()
        .withLatestFrom(
          this.pageIndexAndSizeChange$.startWith({
            index: 1,
            size: 10
          }),
          (_, { index, size }) => ({
            index,
            size,
            action: 'SEARCH'
          })
        ),
      this.pageIndexAndSizeChange$.skip(1).map(e => ({
        index: e.index,
        size: e.size,
        action: 'INDEX_AND_SIZE_CHANGE'
      }))
    )
      .map(({ index, size, action }) => {
        return {
          index,
          size,
          needFetchCount: action === 'SEARCH'
        }
      })
      .takeUntil(this.destroyService)

    fetchPreciseAnalysis$.subscribe(({ index, size, needFetchCount }) => {
      this.fectchPreciseAnalysis({ index, size })
      if (needFetchCount) {
        this.fetchPreciseAnalysisCount()
      }
    })
  }

  private initSendSMS(): void {
    const sendSMS$ = this.actionExecute$
      .filter(e => e.type === 'SEND_SMS')
      .mergeMap(e => {
        const data = e.payload.data as PreciseAnalysis
        return Observable.create(observer => {
          this.modalService.open({
            title: '发送短信',
            content: `确定给 ${data.phone} 这个号码发送短信么?`,
            onCancel: () => {
              observer.complete()
            },
            onOk: () => {
              observer.next(e)
              observer.complete()
            }
          })
        }) as Observable<{ type: string; payload: any }>
      })
      .takeUntil(this.destroyService)

    sendSMS$.subscribe(({ type, payload }) => {
      this.sendSMS(payload)
    })
  }

  private initBatchSendSMS(): void {
    const batchSendSMS$ = this.toBatchSendSMSSub
      .asObservable()
      .withLatestFrom(this.selectedIdsChange$, (_, ids) => ids)
      .withLatestFrom(this.currentPreciseAnalysis, (ids, items) => {
        return items
          .filter(item => ids.indexOf(item.id) >= 0)
          .map(item => item.phone)
      })
      .filter(phones => phones.length > 0)
      .mergeMap(phones => {
        return Observable.create(observer => {
          this.modalService.open({
            title: '群发短信',
            content: `确定给这 ${phones.length} 个号码发送短信么?`,
            onCancel: () => {
              observer.complete()
            },
            onOk: () => {
              observer.next(phones)
              observer.complete()
            }
          })
        }) as Observable<string[]>
      })
      .takeUntil(this.destroyService)

    batchSendSMS$.subscribe(phones => {
      console.log(phones)
      this.ensureBatchSendSMS(phones)
    })
  }

  private fetchPreciseAnalysisCount(): void {
    this.store.dispatch(
      new FetchPreciseAnalysisCountAction({
        action: this.searchForm.value.action,
        ...this.computeDuration(this.searchForm.value.duration)
      })
    )
  }

  private buildForm() {
    this.searchForm = this.fb.group({
      duration: [0, Validators.required],
      action: [0, Validators.required]
    })
  }

  private fectchPreciseAnalysis({ index, size }): void {
    this.store.dispatch(
      new FectchPreciseAnalysisAction({
        action: this.searchForm.value.action,
        ...this.computeDuration(this.searchForm.value.duration),
        pageIndex: index,
        pageSize: size
      })
    )
  }

  private sendSMS({ id, phone }): void {
    this.store.dispatch(new SendSMSAction([phone]))
  }

  private ensureBatchSendSMS(phones: string[]): void {
    this.store.dispatch(new BatchSendSMSAction(phones))
  }

  private computeDuration(
    duration: number
  ): { startDate: string; endDate: string } {
    const endMills = Date.now()
    const startMills = endMills - this.durations[duration].offsetMills
    return {
      startDate: moment(startMills).format('YYYY-MM-DD'),
      endDate: moment(endMills).format('YYYY-MM-DD')
    }
  }
}
