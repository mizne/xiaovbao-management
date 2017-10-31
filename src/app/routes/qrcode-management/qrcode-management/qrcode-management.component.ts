import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'

import { Subject } from 'rxjs/Subject'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/startWith'
import { Store } from '@ngrx/store'
import { State, getCurrentQrcodes, getQrcodesTotalCount, getQrcodeLoading } from '../reducers'
import { FectchQrcodesAction, FetchQrcodeCountAction } from './qrcode.action'

import { Qrcode } from '../models/qrcode.model'
import { AddQrcodeModalComponent } from '../modals/add-qrcode-modal.component'

@Component({
  selector: 'app-qrcode-management',
  templateUrl: './qrcode-management.component.html'
})
export class QrcodeManagementComponent implements OnInit {
  pageIndex = 1
  pageSize = 10

  showQrcodes$: Observable<Qrcode[]>
  total$: Observable<number>
  loading$: Observable<boolean>

  constructor(
    private message: NzMessageService,
    private modalService: NzModalService,
    private fb: FormBuilder,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.initDataSource()

    this.store.dispatch(new FectchQrcodesAction({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    }))
    this.store.dispatch(new FetchQrcodeCountAction())
  }

  private initDataSource() {
    this.showQrcodes$ = this.store.select(getCurrentQrcodes)
    this.total$ = this.store.select(getQrcodesTotalCount)
    this.loading$ = this.store.select(getQrcodeLoading)
  }

  addQrcode() {
    const subscription = this.modalService.open({
      title          : '添加二维码',
      content        : AddQrcodeModalComponent,
      footer         : false
    });
    subscription.subscribe(result => {
      if (result.data) {
        console.log('to add goods type: ' + result.data)
      }
      if (result === 'onDestroy') {
        subscription.unsubscribe()
      }
    })
  }

  toEdit(qrcode: Qrcode) {
    const subscription = this.modalService.open({
      title          : '编辑二维码',
      content        : AddQrcodeModalComponent,
      footer         : false,
      componentParams: {
        // qrcodeType: qrcode.
      }
    });
    subscription.subscribe(result => {
      if (result.data) {
        console.log('to add goods type: ' + result.data)
      }
      if (result === 'onDestroy') {
        subscription.unsubscribe()
      }
    })
  }

  ensureDelete(id: string) {

  }

  pageIndexChange(pageIndex) {
    console.log('page index: ' + this.pageIndex)
    this.store.dispatch(new FectchQrcodesAction({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    }))
  }

  pageSizeChange(pageSize) {
    console.log('page size: ' + this.pageSize)
    this.store.dispatch(new FectchQrcodesAction({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    }))
  }
}
