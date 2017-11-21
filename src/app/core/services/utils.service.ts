import { Injectable } from '@angular/core'
import * as moment from 'moment'
import * as Qrcode from 'qrcode'

declare const qq: any

@Injectable()
export class UtilsService {
  constructor(
  ) {}
  /**
 * 获取 验证电话号码的 正则
 *
 * @readonly
 * @type {RegExp}
 * @memberof UtilsService
 */
  get phoneRe(): RegExp {
    return /^1[0-9]{10}$/
  }
  /**
 * 将location的search参数 转化为 键值对的对象结构
 *
 * @param {string} search
 * @returns {{[key: string]: string}}
 * @memberof UtilsService
 */
  objFrom(search: string): { [key: string]: string | string[] } {
    if (!search) {
      return {}
    }

    const arr = search.slice(1).split('&')
    return arr.reduce((accu, curr) => {
      const [key, val] = curr.split('=')
      if (accu[key]) {
        accu[key] = [accu[key], val]
      } else {
        accu[key] = val
      }

      return accu
    }, {})
  }
  /**
 * 获取当前用户的qq地图 位置经纬度
 *
 * @returns {Promise<{ lat: number; lng: number }>}
 * @memberof UtilsService
 */
  fetchQQLatLng(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          const lat = position.coords.latitude
          const lng = position.coords.longitude

          // 调用地图命名空间中的转换接口   type的可选值为 1:GPS经纬度，2:搜狗经纬度，3:百度经纬度，4:mapbar经纬度，5:google经纬度，6:搜狗墨卡托
          qq.maps.convertor.translate(new qq.maps.LatLng(lat, lng), 1, function(
            res
          ) {
            resolve(res[0])
          })
        })
      } else {
        reject(new Error('您的浏览器不支持获取地理位置功能'))
      }
    })
  }
/**
 * 下载指定url地址的二维码图片 为指定的filename
 *
 * @param {string} url
 * @param {string} [filename=moment().format('YYYYMMDDHHmmss') + '.png']
 * @returns {Promise<any>}
 * @memberof UtilsService
 */
downloadQrcode(url: string, filename: string = moment().format('YYYYMMDDHHmmss') + '.png'): Promise<any> {
    return new Promise((res, rej) => {
      Qrcode.toDataURL(
        url,
        {
          version: '',
          errorCorrectionLevel: 'M'
        },
        (err, dataUrl) => {
          if (err) {
            rej(err)
          } else {
            const element = document.createElement('a');
            element.href = dataUrl
            element.download = filename
            element.dispatchEvent(new MouseEvent('click'))
            res(element)
          }
        })
    })
  }
}
