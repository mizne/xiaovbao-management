import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { APIResponse } from 'app/core/interceptors/api-error-interceptor'
import * as moment from 'moment'

@Injectable()
export class StatisticsService {
  private statisticsUrl = '/admin/echats/orderStatisticByTime'
  constructor(private http: HttpClient) {}

  /**
   * 获取 当天 所有订单统计信息
   *
   * @param {string} tenantId
   * @returns {Observable<Array<any>>}
   * @memberof StatisticsService
   */
  fetchOrderStatisticsOfToday(tenantId: string): Observable<Array<any>> {
    const now = new Date()
    const nextDay = new Date(now.getTime() + 24 * 60 * 60 * 1000)

    const startTime = moment(now).format('YYYY-M-DD')
    const endTime = moment(nextDay).format('YYYY-M-DD')
    return this._fetchOrderStatistics({
      tenantId,
      startTime,
      endTime,
      type: 1,
      status: 3
    })
  }

  /**
   * 获取 当月 所有订单统计信息
   *
   * @param {string} tenantId
   * @returns {Observable<Array<any>>}
   * @memberof StatisticsService
   */
  fetchOrderStatisticsOfThisMonth(tenantId: string): Observable<Array<any>> {
    const [startYear, startMonth] = moment()
      .format('YYYY-MM')
      .split('-')
      .map(Number)
    let endTime

    if (startMonth === 12) {
      endTime = `${startYear + 1}-1`
    } else {
      endTime = `${startYear}-${startMonth + 1}`
    }

    return this._fetchOrderStatistics({
      tenantId,
      startTime: `${startYear}-${startMonth}`,
      endTime,
      type: 2,
      status: 3
    })
  }

  /**
   * 获取 当年 所有订单统计信息
   *
   * @param {string} tenantId
   * @returns {Observable<Array<any>>}
   * @memberof StatisticsService
   */
  fetchOrderStatisticsOfThisYear(tenantId: string): Observable<Array<any>> {
    const startYear = moment().format('YYYY')
    const endYear = String(+startYear + 1)

    return this._fetchOrderStatistics({
      tenantId,
      startTime: startYear,
      endTime: endYear,
      type: 3,
      status: 3
    })
  }

  /**
   * 获取 统计信息
   *
   * @private
   * @param {any} {
   *     tenantId,
   *     startTime,
   *     endTime,
   *     type,
   *     status
   *   }
   * @returns {Observable<Array<any>>}
   * @memberof StatisticsService
   */
  private _fetchOrderStatistics({
    tenantId,
    startTime,
    endTime,
    type,
    status
  }): Observable<Array<any>> {
    return this.http
      .post(this.statisticsUrl, { tenantId, startTime, endTime, type, status })
      .map(resp => (resp as APIResponse).result)
      .catch(this.handleError)
  }

  private handleError(error: any) {
    const errMsg = error.message
      ? error.message
      : error.status ? `${error.status} - ${error.statusText}` : 'Server error'
    console.error(errMsg) // log to console instead
    return Observable.throw(errMsg)
  }
}
