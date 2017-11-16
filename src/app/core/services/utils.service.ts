import { Injectable } from '@angular/core'

declare const qq: any

@Injectable()
export class UtilsService {
  constructor() {}

  get phoneRe(): RegExp {
    return /^1[0-9]{10}$/
  }

  objFrom(search) {
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
}
