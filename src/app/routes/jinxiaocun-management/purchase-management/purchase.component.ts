import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'

import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'
import { State } from '../reducers'
import {
  FectchAccountsAction,
  FectchAccountsCountAction,
  SendSMSAction,
  EnsureDeleteAccountAction
} from './purchase.action'

import { Account } from '../models/account.model'
import { EditAccountModalComponent } from '../modals/edit-account-modal.component'

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.less']
})
export class PurchaseComponent implements OnInit {
  pageIndex = 1
  pageSize = 10

  total$: Observable<number>
  loading$: Observable<boolean>
  showAccounts$: Observable<any>

  constructor(
    private message: NzMessageService,
    private modalService: NzModalService,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.initDataSource()
    this.fetchData()
  }

  private initDataSource() {
    this.showAccounts$ = Observable.of([])
    this.total$ = Observable.of(0)
    this.loading$ = Observable.of(false)
  }

  private fetchData(): void {
    // this.fetchAccounts()
    // this.fetchAccountsCount()
  }

  private fetchAccountsCount(): void {
    this.store.dispatch(new FectchAccountsCountAction())
  }

  private fetchAccounts(): void {
    this.store.dispatch(
      new FectchAccountsAction({ pageIndex: this.pageIndex, pageSize: this.pageSize })
    )
  }

  toEdit(account: Account) {
    const subscription = this.modalService.open({
      title          : '编辑顾客',
      content        : EditAccountModalComponent,
      footer         : false,
      componentParams: {
        phone: account.phone,
        isVip: account.isVip,
        action: 'edit'
      }
    });
    subscription.subscribe(result => {
      if (typeof result !== 'string') {
        console.log('to edit account: ', result)
      }
      if (result === 'onDestroy') {
        subscription.unsubscribe()
      }
    })
  }
}
