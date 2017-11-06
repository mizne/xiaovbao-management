import { NzMessageService } from 'ng-zorro-antd'
import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'

import { Observable } from 'rxjs/Observable'


import { Store } from '@ngrx/store'
import {
  State,
  getTodayStatistics,
  getMonthStatistics,
  getYearStatistics
} from '../reducers'
import {
  FectchTodayStatisticsAction,
  FectchMonthStatisticsAction,
  FectchYearStatisticsAction
} from './management-analysis.action'

import { DestroyService } from 'app/core/services/destroy.service'
import * as R from 'ramda'

export interface ChartDataOption {
  chartLabel: any[]
  chartData: any[]
  total: {
    num: number
    merchantAmount: number
    merchantCouponFee: number
    platformCouponFee: number
    platformAmount: number
  }
}

export interface TotalItem {
  color: string
  label: string
  value: number
  unit: string
  field: string
}

@Component({
  selector: 'app-management-analysis',
  templateUrl: './management-analysis.component.html',
  providers: [DestroyService]
})
export class ManagementAnalysisComponent implements OnInit {
  dateType = new FormControl('today')

  constructor(
    public msg: NzMessageService,
    private store: Store<State>,
    private destroyService: DestroyService
  ) {}

  chartData = [
    {
      label: '订单价格',
      fillColor: 'rgba(220,220,220,0.2)',
      strokeColor: 'rgba(220,220,220,1)',
      pointColor: 'rgba(220,220,220,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(220,220,220,1)',
      data: []
    },
    {
      label: '我的收入',
      fillColor: 'rgba(151,187,205,0.2)',
      strokeColor: 'rgba(151,187,205,1)',
      pointColor: 'rgba(151,187,205,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(151,187,205,1)',
      data: []
    }
  ]

  chartLabel = []

  totalItems: TotalItem[] = [
    {
      color: 'bg-primary',
      label: '订单总数',
      value: 0,
      unit: '个',
      field: 'num'
    },
    {
      color: 'bg-success',
      label: '商家实收总计',
      value: 0,
      unit: '元',
      field: 'merchantAmount'
    },
    {
      color: 'bg-orange',
      label: '商家优惠',
      value: 0,
      unit: '元',
      field: 'merchantCouponFee'
    },
    {
      color: 'bg-pink',
      label: '平台优惠',
      value: 0,
      unit: '元',
      field: 'platformCouponFee'
    },
    {
      color: 'bg-yellow',
      label: '平台服务费',
      value: 0,
      unit: '元',
      field: 'platformAmount'
    }
  ]


  monthChartLabels = Array.from(new Array(5)).map((_, i) =>
    String(`第${i + 1}周`)
  )

  quickMenu = false

  dateTypeChange$: Observable<string>

  ngOnInit() {
    this.initFetchData()
    this.initDataSource()
    this.initSubscriber()
  }

  private initFetchData(): void {
    this.store.dispatch(new FectchTodayStatisticsAction())
    this.store.dispatch(new FectchMonthStatisticsAction())
    this.store.dispatch(new FectchYearStatisticsAction())
  }

  private initDataSource(): void {
    this.dateTypeChange$ = this.dateType.valueChanges.startWith('today').share()
  }

  private initSubscriber(): void {
    this.initTodayChart()
    this.initMonthChart()
    this.initYearChart()
  }

  private initTodayChart(): void {
    this.initChart('today', getTodayStatistics)
  }

  private initMonthChart(): void {
    this.initChart('month', getMonthStatistics)
  }

  private initYearChart(): void {
    this.initChart('year', getYearStatistics)
  }

  private initChart(dateType, selector): void {
    const chart$: Observable<ChartDataOption> = Observable.combineLatest(
      this.dateTypeChange$.filter(R.equals(dateType)),
      this.store.select(selector).filter(e => e.length > 0)
    )
      .map(([date, dataItems]) => this.mapToChartDataOption(date, dataItems))
      .takeUntil(this.destroyService)

    chart$.subscribe(this.patchDataToChart.bind(this))
  }

  private mapToChartDataOption(dateType, dataItems): ChartDataOption {
    const total = this.totalItems.map(e => e.field).reduce((accu, curr) => {
      const accumulateField = this.accumulateField(curr)
      accu[curr] = accumulateField(dataItems)

      return accu
    }, {})
    return {
      chartLabel: this.generateChartLabel(dateType),
      chartData: this.transform(dataItems),
      total
    } as ChartDataOption
  }

  private patchDataToChart(chartData: ChartDataOption): void {
    console.log(chartData)
    this.chartLabel = chartData.chartLabel
    this.chartData.forEach(e => {
      const f = chartData.chartData.find(g => g.label === e.label)
      e.data = f.data
    })

    this.totalItems.forEach(item => {
      item.value = chartData.total[item.field]
    })
  }

  private generateChartLabel(dateType): string[] {
    switch (dateType) {
      case 'today':
        return Array.from(new Array(8)).map((_, i) =>
          String(`${i * 3}-${(i + 1) * 3}时`)
        )
      case 'month':
        return Array.from(new Array(5)).map((_, i) => String(`第${i + 1}周`))
      case 'year':
        return Array.from(new Array(12)).map((_, i) => String(`${i + 1}月`))
      default:
        console.error(`Unknown date type: ${dateType}`)
        break
    }
  }

  /**
 * 转化 成适当的图表数据格式
 *
 * @private
 * @param {any} result
 * @returns {*}
 * @memberof IndexPageComponent
 */
  private transform(result): any {
    return [
      {
        data: result.map(e => e.merchantAmount.value).map(Number),
        label: '我的收入',
        // fillColor: 'rgba(151,187,205,0.5)',
        // strokeColor: 'rgba(151,187,205,0.8)',
        // highlightFill: 'rgba(151,187,205,0.75)',
        // highlightStroke: 'rgba(151,187,205,1)'
      },
      {
        data: result.map(e => e.totalPrice.value).map(Number),
        label: '订单价格',
        // fillColor: 'rgba(220,220,220,0.1)',
        // strokeColor: 'rgba(220,220,220,0.1)',
        // highlightFill: 'rgba(220,220,220,0.1)',
        // highlightStroke: 'rgba(220,220,220,1)'
      }
    ]
  }
  /**
 * 返回 计算某个属性值的 函数
 *
 * @private
 * @param {string} field
 * @returns {Function}
 * @memberof IndexPageComponent
 */
  private accumulateField(field: string): Function {
    return arr =>
      arr.reduce((accu, curr) => {
        accu += Number(curr[field].value)
        return accu
      }, 0)
  }
}
