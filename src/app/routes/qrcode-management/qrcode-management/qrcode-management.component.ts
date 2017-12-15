import { Component, OnInit } from '@angular/core'
import { NzModalService, NzNotificationService } from 'ng-zorro-antd'

import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { Store } from '@ngrx/store'
import {
  State,
  getCurrentQrcodes,
  getQrcodesTotalCount,
  getQrcodeLoading
} from '../reducers'
import {
  FectchQrcodesAction,
  FetchQrcodeCountAction,
  CreateQrcodeAction,
  EditQrcodeAction,
  DeleteQrcodeAction
} from './qrcode.action'

import { Qrcode } from '../models/qrcode.model'
import {
  AddQrcodeModalComponent,
  QrcodeModalActionType
} from '../modals/add-qrcode-modal.component'
import { ShowQrcodeModalComponent } from '../modals/show-qrcode-modal.component'

import {
  Column,
  Action,
  PageChangeOption,
  ActionExecuteOption
} from 'app/shared/components/wrap-table/wrap-table.component'
import { DestroyService } from 'app/core/services/destroy.service'
import { UtilsService } from 'app/core/services/utils.service'

import * as R from 'ramda'

@Component({
  selector: 'app-qrcode-management',
  templateUrl: './qrcode-management.component.html',
  providers: [DestroyService]
})
export class QrcodeManagementComponent implements OnInit {
  columns: Column[] = [
    {
      label: '桌号',
      key: 'tableName'
    },
    {
      label: '商铺名称',
      key: 'tenantName'
    },
    {
      label: '代售点名称',
      key: 'consigneeName'
    }
  ]

  actions: Action[] = [
    {
      label: '编辑',
      key: 'EDIT'
    },
    {
      label: '删除',
      key: 'DELETE'
    },
    {
      label: '查看',
      key: 'VIEW'
    },
    {
      label: '下载',
      key: 'DOWNLOAD'
    }
  ]
  pageIndexAndSizeChange$: Subject<PageChangeOption> = new Subject<
    PageChangeOption
  >()
  actionExecute$: Subject<ActionExecuteOption> = new Subject<
    ActionExecuteOption
  >()
  currentQrcodeTpls$: Observable<any>
  fetchQrcodeTplsLoading$: Observable<boolean>
  qrcodeTplsTotalCount$: Observable<number>

  createQrcodeSub: Subject<void> = new Subject<void>()

  constructor(
    private modalService: NzModalService,
    private notify: NzNotificationService,
    private store: Store<State>,
    private destroyService: DestroyService,
    private util: UtilsService,
  ) {}

  ngOnInit() {
    this.initDataSource()
    this.initSubscriber()
  }

  toCreateQrcode() {
    this.createQrcodeSub.next()
  }

  private initDataSource(): void {
    this.currentQrcodeTpls$ = this.store.select(getCurrentQrcodes)
    this.qrcodeTplsTotalCount$ = this.store.select(getQrcodesTotalCount)
    this.fetchQrcodeTplsLoading$ = this.store.select(getQrcodeLoading)
  }

  private initSubscriber(): void {
    this.initPageChange()
    this.initEditQrcodeTpl()
    this.initDeleteQrcodeTpl()
    this.initCreateQrcodeTpl()

    this.initViewQrcodeTpl()
    this.initDownloadQrcodeTpl()
  }

  private initPageChange(): void {
    this.pageIndexAndSizeChange$.first().subscribe(({ index, size }) => {
      this.store.dispatch(new FetchQrcodeCountAction())
      this.store.dispatch(
        new FectchQrcodesAction({
          pageIndex: index,
          pageSize: size
        })
      )
    })

    this.pageIndexAndSizeChange$.skip(1).subscribe(({ index, size }) => {
      this.store.dispatch(
        new FectchQrcodesAction({
          pageIndex: index,
          pageSize: size
        })
      )
    })
  }

  private initEditQrcodeTpl(): void {
    this.actionExecute$
      .filter(R.propEq('type', 'EDIT'))
      .switchMap(({ payload }) => {
        return this.modalService.open({
          title: '编辑二维码',
          content: AddQrcodeModalComponent,
          footer: false,
          componentParams: {
            action: QrcodeModalActionType.EDIT,
            data: payload.data
          }
        })
      })
      .filter(R.is(Object))
      .takeUntil(this.destroyService)
      .subscribe(e => {
        console.log('to edit qrcode ', e)

        this.store.dispatch(new EditQrcodeAction(e as Qrcode))
      })
  }

  private initDeleteQrcodeTpl(): void {
    this.actionExecute$
      .filter(R.propEq('type', 'DELETE'))
      .switchMap(({ payload }) => {
        return Observable.create(observer => {
          const modal = this.modalService.open({
            title: '删除二维码',
            content: '确定删除此二维码么?',
            onCancel: () => {
              observer.complete()
            },
            onOk: () => {
              observer.next(payload.data.id)
              observer.complete()
            }
          })
          return () => {
            modal.destroy('onCancel')
          }
        }) as Observable<string>
      })
      .takeUntil(this.destroyService)
      .subscribe(e => {
        console.log('to delete qrcode ', e)

        this.store.dispatch(new DeleteQrcodeAction(e))
      })
  }

  private initCreateQrcodeTpl(): void {
    this.createQrcodeSub
      .switchMap(() => {
        return this.modalService.open({
          title: '创建二维码',
          content: AddQrcodeModalComponent,
          footer: false,
          componentParams: {
            action: QrcodeModalActionType.CREATE
          }
        })
      })
      .filter(R.is(Object))
      .takeUntil(this.destroyService)
      .subscribe(e => {
        console.log('to create qrcode ', e)

        this.store.dispatch(new CreateQrcodeAction(e as Qrcode))
      })
  }

  private initViewQrcodeTpl(): void {
    this.actionExecute$
      .filter(R.propEq('type', 'VIEW'))
      .switchMap(({ payload }) => {
        return this.modalService.open({
          title: '查看二维码',
          content: ShowQrcodeModalComponent,
          footer: false,
          componentParams: {
            tplId: payload.data.tplId
          }
        })
      })
      .filter(R.is(Object))
      .takeUntil(this.destroyService)
      .subscribe(e => {
        this.download(e.url)
      })
  }


  private initDownloadQrcodeTpl(): void {
    this.actionExecute$.filter(R.propEq('type', 'DOWNLOAD'))
    .subscribe(({ payload }) => {
      const url = `https://sales.xiaovbao.cn/?id=${payload.data.tplId}`
      this.download(url)
    })
  }

  private download(url: string) {
    this.util.downloadQrcode(url)
    .catch(err => {
      this.notify.error('下载二维码', '下载二维码失败！')
    })
  }
}
