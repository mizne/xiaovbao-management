import { Component, OnInit, Input } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
import { DestroyService } from 'app/core/services/destroy.service'

export interface PageChangeOption {
  index: number // pageIndex
  size: number // pageSize
}

export interface ActionExecuteOption {
  type: string
  payload: {
    index: number // 当前行数据的index
    data: any // 当前行数据
  }
}

export interface Column {
  label: string // 当前列的 head显示
  key: string // data的 key
  type?: string // 当前列的 显示类型 譬如是image类型 则需img标签显示
  transform?: Function // 根据当前行数据计算 显示的文本
}

export interface Action {
  label: string // action的显示名称
  key: string // action的标识 actionExecute会发射 此action的标识
  disabled?: Function // 根据当前行数据计算 是否需要禁用此action
}

@Component({
  selector: 'app-wrap-table',
  templateUrl: './wrap-table.component.html',
  styleUrls: ['./wrap-table.component.less'],
  providers: [DestroyService]
})
export class WrapTableComponent implements OnInit {
  constructor(private destroyService: DestroyService) {}
  _showCheckbox = true
  @Input()
  set showCheckbox(value: boolean) {
    this._showCheckbox = value
  }

  _columns = []
  @Input()
  set columns(value: Column[]) {
    this._columns = value
  }

  _actions = []
  @Input()
  set actions(value: Action[]) {
    this._actions = value
  }

  @Input() dataSource: Observable<any[]>
  @Input() loading: Observable<boolean>
  @Input() total: Observable<boolean>

  @Input() pageIndexAndSizeChange: Subject<PageChangeOption>
  @Input() selectedIdsChange: Subject<string[]>
  @Input() actionExecute: Subject<ActionExecuteOption>

  pageIndex = 1
  pageSize = 10

  pageIndexSub: BehaviorSubject<number> = new BehaviorSubject<number>(1)
  pageSizeSub: BehaviorSubject<number> = new BehaviorSubject<number>(10)
  /**
 * 是否全部选中 待优化 这个有可能是通过外部的交互(譬如外部的搜索)触发改变
 *
 * @type {Observable<boolean>}
 * @memberof WrapTableComponent
 */
  isAllSelected$: Observable<boolean>
  indeterminate$: Observable<boolean>

  private allChangeSub: Subject<boolean> = new Subject<boolean>()
  private allChange$: Observable<boolean> = this.allChangeSub.asObservable()

  private singleChangeSub: Subject<{
    id: string
    selected: boolean
  }> = new Subject<{ id: string; selected: boolean }>()

  private singleChange$: Observable<{
    id: string
    selected: boolean
  }> = this.singleChangeSub.asObservable()

  ngOnInit() {
    const pageIndexAndSize$ = Observable.merge(
      this.pageIndexSub.withLatestFrom(this.pageSizeSub, (index, size) => ({
        index,
        size
      })),
      this.pageSizeSub.withLatestFrom(this.pageIndexSub, (size, index) => ({
        index,
        size
      }))
    )
      .distinctUntilChanged((a, b) => {
        return a.index === b.index && a.size === b.size
      })
      .takeUntil(this.destroyService)

    const selectedIds$ = Observable.merge(this.singleChange$, this.allChange$)
      .withLatestFrom(this.dataSource, (select, dataItems) => ({
        select,
        dataItems
      }))
      .map(({ select, dataItems }) => {
        // 全选按钮
        if (typeof select === 'boolean') {
          dataItems.forEach(e => (e._selected = select))
        } else {
          // 单个选中按钮
          const user = dataItems.find(e => e.id === select.id)
          if (user) {
            user._selected = select.selected
          }
        }
        return dataItems.filter(e => !e._disabled).filter(e => e._selected).map(e => e.id)
      })
      .share()
      .takeUntil(this.destroyService)

    const diffCount$: Observable<{
      selectedIds: string[]
      totalCount: number
    }> = selectedIds$
      .withLatestFrom(this.dataSource, (selectedIds, dataItems) => ({
        selectedIds,
        totalCount: dataItems.length
      }))
      .share()

    pageIndexAndSize$.subscribe(this.pageIndexAndSizeChange)
    selectedIds$.startWith([]).subscribe(this.selectedIdsChange)
    this.isAllSelected$ = diffCount$.map(({ selectedIds, totalCount }) => {
      return selectedIds.length === totalCount
    })
    this.indeterminate$ = diffCount$.map(({ selectedIds, totalCount }) => {
      return selectedIds.length !== 0 && selectedIds.length !== totalCount
    })
  }

  disabledAction(action: Action, data: any): boolean {
    if (!action.disabled) {
      return false
    }
    return action.disabled(data)
  }

  needShowAction(action: Action, data: any) {}

  toExecute(action: Action, data: any, index: number) {
    if (action.disabled && action.disabled(data)) {
      // 禁用 此action
    } else {
      this.actionExecute.next({
        type: action.key,
        payload: { data, index }
      })
    }
  }

  allChange(isAllSelected) {
    this.allChangeSub.next(isAllSelected)
  }

  singleChange([id, selected]) {
    this.singleChangeSub.next({
      id,
      selected
    })
  }

  pageIndexChange() {
    this.pageIndexSub.next(this.pageIndex)
  }

  pageSizeChange() {
    this.pageSizeSub.next(this.pageSize)
  }
}
