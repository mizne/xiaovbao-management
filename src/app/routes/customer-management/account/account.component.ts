import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'

import { Observable } from 'rxjs/Observable'

import { Store } from '@ngrx/store'
import { State, getCurrentAccounts, getAccountLoading, getAccountsTotalCount } from '../reducers'
import { FectchAccountsAction, FectchAccountsCountAction, SendSMSAction, EnsureDeleteAccountAction } from './account.action'

import { Account } from '../models/account.model'
import { EditAccountModalComponent } from '../modals/edit-account-modal.component'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less']
})
export class AccountComponent implements OnInit {
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
    this.loading$ = this.store.select(getAccountLoading)
    this.showAccounts$ = this.store.select(getCurrentAccounts).startWith([])
    this.total$ = this.store.select(getAccountsTotalCount)
  }

  private fetchData(): void {
    this.fetchAccounts()
    this.fetchAccountsCount()
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

  ensureDelete(id: string) {
    this.store.dispatch(new EnsureDeleteAccountAction({
      id,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    }))
  }

  sendSms(phone: string) {
    this.store.dispatch(new SendSMSAction([phone]))
  }

  addAccount() {
    const subscription = this.modalService.open({
      title          : '新增顾客',
      content        : EditAccountModalComponent,
      footer         : false,
      componentParams: {
        phone: '',
        isVip: false,
        action: 'create'
      }
    });
    subscription.subscribe(result => {
      if (typeof result !== 'string') {
        console.log('to add account: ', result)
      }
      if (result === 'onDestroy') {
        subscription.unsubscribe()
      }
    })
  }

  pageIndexChange(pageIndex) {
    console.log('page index: ' + this.pageIndex)
    this.fetchAccounts()
  }

  pageSizeChange(pageSize) {
    console.log('page size: ' + this.pageSize)
    this.fetchAccounts()
  }
}
