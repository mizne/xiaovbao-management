import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store'
import { State, getCurrentOrders } from '../reducers'

import { Order } from '../models/order.model'

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.less']
})
export class OrderDetailComponent implements OnInit {

  currentOrder$: Observable<Order>

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.initDataSource()
  }

  private initDataSource(): void {
    this.currentOrder$ = this.route.params.map(e => e.tradeNo)
    .withLatestFrom(
      this.store.select(getCurrentOrders),
      (tradeNo, orders) => orders.find(e => e.tradeNo === tradeNo)
    )
  }

}
