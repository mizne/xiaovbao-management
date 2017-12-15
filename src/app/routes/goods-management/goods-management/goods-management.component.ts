import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { NzModalService } from 'ng-zorro-antd'

import { Subject } from 'rxjs/Subject'

import { Observable } from 'rxjs/Observable'

import * as R from 'ramda'

import { Store } from '@ngrx/store'
import {
  State,
  getCurrentGoods,
  getAllGoodsTypes,
  getGoodsLoading,
  getGoodsTotalCount,
  getAllGoodsUnits
} from '../reducers'

import {
  FetchGoodsAction,
  FectchGoodsTypesAction,
  FetchGoodsCountAction,
  AddGoodsTypeAction,
  AddGoodsAction,
  FetchGoodsCountParams,
  FetchGoodsParams,
  OffShelfGoodsAction,
  OnShelfGoodsAction,
  FetchGoodsUnitsAction,
  EditGoodsAction
} from './goods.action'

import { AddGoodsTypeModalComponent } from '../modals/add-goods-type-modal.component'
import { AddGoodsModalComponent, GoodsModalActionType } from '../modals/add-goods-modal.component'

import { Goods } from '../models/goods.model'
import { GoodsType } from '../models/goodsType.model'

import { DestroyService } from 'app/core/services/destroy.service'

import {
  Column,
  Action,
  PageChangeOption,
  ActionExecuteOption
} from 'app/shared/components/wrap-table/wrap-table.component'

export interface SearchOption {
  goodsName: string
  goodsType: string
}

@Component({
  selector: 'app-goods-management',
  templateUrl: './goods-management.component.html',
  providers: [DestroyService]
})
export class GoodsManagementComponent implements OnInit {
  searchForm: FormGroup

  goodsTypes$: Observable<GoodsType[]>

  addGoodsTypeSub: Subject<void> = new Subject<void>()
  addGoodsSub: Subject<void> = new Subject<void>()
  onInitSub: Subject<void> = new Subject<void>()
  searchSub: Subject<SearchOption> = new Subject<SearchOption>()

  columns: Column[] = [
    {
      label: '图片',
      key: 'listImageUrl',
      type: 'IMAGE'
    },
    {
      label: '商品名称',
      key: 'name'
    },
    {
      label: '价格',
      key: 'price'
    }
  ]

  actions: Action[] = [
    {
      label: '编辑',
      key: 'EDIT'
    },
    {
      label: '下架',
      key: 'OFF_SHELF',
      disabled: data => !data.isActive
    },
    {
      label: '上架',
      key: 'ON_SHELF',
      disabled: data => data.isActive
    }
  ]
  pageIndexAndSizeChange$: Subject<PageChangeOption> = new Subject<
    PageChangeOption
  >()
  actionExecute$: Subject<ActionExecuteOption> = new Subject<
    ActionExecuteOption
  >()
  currentGoods$: Observable<any>
  fetchGoodsLoading$: Observable<boolean>
  goodsTotalCount$: Observable<number>

  constructor(
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

  toAddGoodsType(): void {
    this.addGoodsTypeSub.next()
  }

  toAddGoods(): void {
    this.addGoodsSub.next()
  }

  search() {
    this.searchSub.next({
      goodsName: this.searchForm.value.name,
      goodsType: this.searchForm.value.type
    })
  }

  clear(): void {
    this.searchForm.reset()
    this.searchSub.next({
      goodsName: '',
      goodsType: ''
    })
  }


  private buildForm() {
    this.searchForm = this.fb.group({
      name: [null],
      type: [null]
    })
  }

  private initDataSource() {
    this.goodsTypes$ = this.store.select(getAllGoodsTypes)
    this.currentGoods$ = this.store.select(getCurrentGoods)
    this.goodsTotalCount$ = this.store.select(getGoodsTotalCount)
    this.fetchGoodsLoading$ = this.store.select(getGoodsLoading).share()
  }

  private initSubscriber(): void {
    // 添加类别 添加商品 获取满足条件的商品 获取所有商品类别 编辑或删除某个商品
    this.initSearch()
    this.initAddGoodsType()
    this.initAddGoods()
    this.initPageChange()
    this.initEditGoods()
    this.initOffShelfGoods()
    this.initOnShelfGoods()
  }

  private initSearch(): void {
    this.searchSub.takeUntil(this.destroyService).subscribe(e => {
      const fetchGoodsParams: FetchGoodsParams = {
        pageIndex: 1,
        pageSize: 10
      }
      const fetchGoodsCountParams: FetchGoodsCountParams = {}
      if (e.goodsName) {
        fetchGoodsParams.goodsName = e.goodsName
        fetchGoodsCountParams.goodsName = e.goodsName
      }
      if (e.goodsType) {
        fetchGoodsParams.goodsType = e.goodsType
        fetchGoodsCountParams.goodsType = e.goodsType
      }

      this.store.dispatch(new FetchGoodsAction(fetchGoodsParams))
      this.store.dispatch(new FetchGoodsCountAction(fetchGoodsCountParams))
    })
  }

  private initAddGoodsType(): void {
    const addGoodsType$ = this.addGoodsTypeSub
      .asObservable()
      .mergeMap(() => {
        return this.modalService.open({
          title: '添加商品类别',
          content: AddGoodsTypeModalComponent,
          footer: false,
          maskClosable: false
        })
      })
      .filter(e => {
        return typeof e !== 'string'
      })
      .takeUntil(this.destroyService)

    addGoodsType$.subscribe(({ goodsTypeName }) => {
      this.ensureAddGoodsType(goodsTypeName)
    })
  }

  private initAddGoods(): void {
    const addGoods$ = this.addGoodsSub
      .asObservable()
      .mergeMap(() => {
        return this.modalService.open({
          title: '添加商品',
          content: AddGoodsModalComponent,
          wrapClassName: 'modal-lg',
          footer: false,
          maskClosable: false,
          componentParams: {
            action: GoodsModalActionType.CREATE
          }
        })
      })
      .filter(e => {
        return typeof e !== 'string'
      })
      .takeUntil(this.destroyService)

    addGoods$.subscribe((goods: Goods) => {
      this.ensureAddGoods(goods)
    })
  }

  private initPageChange(): void {
    this.pageIndexAndSizeChange$
      .skip(1)
      .withLatestFrom(
        this.searchSub.startWith({ goodsName: '', goodsType: '' }),
        ({ index, size }, { goodsName, goodsType }) => ({
          pageIndex: index,
          pageSize: size,
          goodsName,
          goodsType
        })
      )
      .takeUntil(this.destroyService)
      .subscribe(e => {
        const fetchGoodsParams = R.reject(R.isNil, e) as FetchGoodsParams

        this.store.dispatch(new FetchGoodsAction(fetchGoodsParams))
      })

    this.pageIndexAndSizeChange$.first().subscribe(e => {
      this.initFetchData()
    })
  }

  private initEditGoods(): void {
    this.actionExecute$
      .filter(e => e.type === 'EDIT')
      .withLatestFrom(this.store.select(getAllGoodsTypes), (e, allGoodsType) => {
        const data = e.payload.data as Goods
        const goodsTypeId = allGoodsType.find(goodsType => goodsType.name === data.goodsTypeName).id
        return R.assoc('goodsTypeId', goodsTypeId, data)
      })
      .withLatestFrom(this.store.select(getAllGoodsUnits), (goods, allUnits) => {
        const goodsUnitId = allUnits.find(unit => unit.name === goods.goodsUnitName).id
        return R.assoc('goodsUnitId', goodsUnitId, goods)
      })
      .switchMap(goods => {
        return this.modalService.open({
          title: '编辑商品',
          content: AddGoodsModalComponent,
          wrapClassName: 'modal-lg',
          footer: false,
          componentParams: {
            action: GoodsModalActionType.EDIT,
            data: goods
          }
        })
      })
      .takeUntil(this.destroyService)
      .subscribe((e) => {
        if (typeof e !== 'string') {
          this.store.dispatch(new EditGoodsAction(e as Goods))
        }
      })
  }

  private initOffShelfGoods(): void {
    this.actionExecute$
      .filter(e => e.type === 'OFF_SHELF')
      .switchMap(e => {
        return Observable.create(obserser => {
          const modal = this.modalService.open({
            title: '下架商品',
            content: `确定下架 ${e.payload.data.name} 这个商品么?`,
            onCancel: () => {
              obserser.complete()
            },
            onOk: () => {
              obserser.next(e.payload.data.id)
              obserser.complete()
            }
          })
          return () => {
            modal.destroy('onCancel')
          }
        }) as Observable<string>
      })
      .takeUntil(this.destroyService)
      .subscribe(goodsId => {
        this.store.dispatch(new OffShelfGoodsAction(goodsId))
      })
  }

  private initOnShelfGoods(): void {
    this.actionExecute$
      .filter(e => e.type === 'ON_SHELF')
      .switchMap(e => {
        return Observable.create(obserser => {
          const modal = this.modalService.open({
            title: '上架商品',
            content: `确定上架 ${e.payload.data.name} 这个商品么?`,
            onCancel: () => {
              obserser.complete()
            },
            onOk: () => {
              obserser.next(e.payload.data.id)
              obserser.complete()
            }
          })
          return () => {
            modal.destroy('onCancel')
          }
        }) as Observable<string>
      })
      .takeUntil(this.destroyService)
      .subscribe(goodsId => {
        this.store.dispatch(new OnShelfGoodsAction(goodsId))
      })
  }

  private initFetchData(): void {
    this.store.dispatch(
      new FetchGoodsAction({
        pageIndex: 1,
        pageSize: 10
      })
    )

    this.store.dispatch(new FectchGoodsTypesAction())
    this.store.dispatch(new FetchGoodsCountAction())
    this.store.dispatch(new FetchGoodsUnitsAction())
  }

  private ensureAddGoodsType(goodsTypeName: string) {
    this.store.dispatch(new AddGoodsTypeAction(goodsTypeName))
  }

  private ensureAddGoods(goods: Goods) {
    this.store.dispatch(new AddGoodsAction(goods))
  }
}
