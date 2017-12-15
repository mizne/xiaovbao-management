import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { NzModalService } from 'ng-zorro-antd'

import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'
import {
  State,
} from '../reducers'
import {
  FectchVipsAction,
  SendSMSAction,
  EnsureDeleteVipAction
} from './stock.action'

import { Vip } from '../models/vip.model'
import { EditVipModalComponent } from '../modals/edit-vip-modal.component'
import { EditVipLevelSettingsModalComponent } from '../modals/edit-vip-level-settings-modal.component'

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.less']
})
export class StockComponent implements OnInit {
  searchForm: FormGroup
  pageIndex = 1
  pageSize = 10

  total$: Observable<number>
  loading$: Observable<boolean>
  showVips$: Observable<Vip[]>

  fakeVips: Vip[] = [
    {
      name: 'testVip',
      level: 0,
      phone: '123456789963',
      birthday: ''
    }
  ]
  constructor(
    private modalService: NzModalService,
    private fb: FormBuilder,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.buildForm()
    this.initDataSource()

    // this.store.dispatch(new FectchVipsAction({ pageIndex: 1, pageSize: 10 }))

    // this.store.dispatch(new FectchVipsCountAction())
  }

  private buildForm() {
    this.searchForm = this.fb.group({
      phone: [null]
    })
  }

  private initDataSource() {
    this.loading$ = Observable.of(false)
    this.showVips$ = Observable.of([])
    this.total$ = Observable.of(0)
  }

  search() {}

  addVip() {
    const subscription = this.modalService.open({
      title: '新增会员',
      content: EditVipModalComponent,
      footer: false,
      componentParams: {
        name: '',
        phone: '',
        level: 0,
        birthday: ''
      }
    })
    subscription.subscribe(result => {
      if (result.data) {
        console.log('to add vip: ' + result.data)
      }
      if (result === 'onDestroy') {
        subscription.unsubscribe()
      }
    })
  }

  toEditVipLevelSetting() {
    const subscription = this.modalService.open({
      title: '会员等级设置',
      content: EditVipLevelSettingsModalComponent,
      footer: false,
      componentParams: {
        level: 0,
        ratio: ''
      }
    })
    subscription.subscribe(result => {
      if (result.data) {
        console.log('to add vip: ' + result.data)
      }
      if (result === 'onDestroy') {
        subscription.unsubscribe()
      }
    })
  }

  toEditVipLevel() {}

  toEdit(vip: Vip) {
    const subscription = this.modalService.open({
      title: '编辑会员',
      content: EditVipModalComponent,
      footer: false,
      componentParams: {
        name: vip.name,
        phone: vip.phone,
        level: vip.level,
        birthday: vip.birthday
      }
    })
    subscription.subscribe(result => {
      if (result.data) {
        console.log('to edit vip: ' + result.data)
      }
      if (result === 'onDestroy') {
        subscription.unsubscribe()
      }
    })
  }

  ensureDelete(id: string) {
    this.store.dispatch(
      new EnsureDeleteVipAction({
        id,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
    )
  }

  sendSms(phone: string) {
    this.store.dispatch(new SendSMSAction([phone]))
  }

  pageIndexChange(pageIndex) {
    this.store.dispatch(
      new FectchVipsAction({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
    )
  }

  pageSizeChange(pageSize) {
    this.store.dispatch(
      new FectchVipsAction({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
    )
  }
}
