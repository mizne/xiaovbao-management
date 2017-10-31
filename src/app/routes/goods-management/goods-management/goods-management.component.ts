import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'

import { Subject } from 'rxjs/Subject'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/combineLatest'
import 'rxjs/add/operator/startWith'

import { Store } from '@ngrx/store'
import {
  State,
  getCurrentGoods,
  getAllGoodsTypes,
  getGoodsLoading,
  getGoodsTotalCount
} from '../reducers'
import {
  FectchGoodsAction,
  FectchAllGoodsTypeAction,
  FetchGoodsCountAction
} from './goods.action'

import { AddGoodsTypeModalComponent } from '../modals/add-goods-type-modal.component'
import { AddGoodsModalComponent } from '../modals/add-goods-modal.component'

@Component({
  selector: 'app-goods-management',
  templateUrl: './goods-management.component.html'
})
export class GoodsManagementComponent implements OnInit {
  pageIndex = 1
  pageSize = 10

  total$: Observable<number>
  loading$: Observable<boolean>

  searchForm: FormGroup

  showGoods$: Observable<any>
  goodsTypes$: Observable<any>

  constructor(
    private message: NzMessageService,
    private modalService: NzModalService,
    private fb: FormBuilder,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.buildSearchForm()
    this.initDataSource()

    this.store.dispatch(
      new FectchGoodsAction({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
    )
    this.store.dispatch(new FectchAllGoodsTypeAction())
    this.store.dispatch(new FetchGoodsCountAction())
  }

  private buildSearchForm() {
    this.searchForm = this.fb.group({
      name: [null],
      type: [null]
    })
  }

  private initDataSource() {
    this.showGoods$ = this.store.select(getCurrentGoods)
    this.total$ = this.store.select(getGoodsTotalCount)
    this.loading$ = this.store.select(getGoodsLoading)
    this.goodsTypes$ = this.store.select(getAllGoodsTypes)
  }

  search() {
    Object.keys(this.searchForm.controls).forEach(e => {
      this.searchForm.controls[e].markAsDirty()
    })
  }

  clear() {
    this.searchForm.reset()
  }

  showMsg(msg: string) {
    this.message.info(msg)
  }

  addGoodsType() {
    const subscription = this.modalService.open({
      title: '添加商品类别',
      content: AddGoodsTypeModalComponent,
      footer: false
    })
    subscription.subscribe(result => {
      if (result.data) {
        console.log('to add goods type: ' + result.data)
      }
      if (result === 'onDestroy') {
        subscription.unsubscribe()
      }
    })
  }

  addGoods() {
    const subscription = this.modalService.open({
      title: '添加商品',
      content: AddGoodsModalComponent,
      footer: false
    })
    subscription.subscribe(result => {
      if (result.data) {
        console.log('to add goods: ' + result.data)
      }
      if (result === 'onDestroy') {
        subscription.unsubscribe()
      }
    })
  }

  pageIndexChange(pageIndex) {
    console.log('page index: ' + this.pageIndex)
    this.store.dispatch(
      new FectchGoodsAction({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
    )
  }

  pageSizeChange(pageSize) {
    console.log('page size: ' + this.pageSize)
    this.store.dispatch(
      new FectchGoodsAction({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
    )
  }
}
