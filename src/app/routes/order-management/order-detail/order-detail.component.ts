import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store'
import { State, getOrderDetailLoading, getOrderDetail } from '../reducers'
import { FectchOrderDetailAction } from './order-detail.action'

import { Order } from '../models/order.model'
import { DestroyService } from 'app/core/services/destroy.service'

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.less'],
  providers: [DestroyService]
})
export class OrderDetailComponent implements OnInit {

  loading$: Observable<boolean>
  currentOrder$: Observable<Order>

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>,
    private destroyService: DestroyService,
  ) { }

  ngOnInit() {
    this.initDataSource()
    this.iniSubscriber()
  }

  private initDataSource(): void {
    this.loading$ = this.store.select(getOrderDetailLoading)
    this.currentOrder$ = this.store.select(getOrderDetail)
  }

  private iniSubscriber(): void {
    this.route.params.map(e => e.tradeNo)
    .takeUntil(this.destroyService)
    .subscribe(tradeNo => {
      this.store.dispatch(new FectchOrderDetailAction(tradeNo))
    })
  }

}
