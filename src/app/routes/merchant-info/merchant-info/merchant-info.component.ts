import { NzMessageService, NzNotificationService } from 'ng-zorro-antd'
import { Component, OnInit, ViewChild, NgZone, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AqmComponent } from 'angular-qq-maps'
import { FileUploader } from 'ng2-file-upload'

import { UtilsService } from 'app/core/services/utils.service'
import { DestroyService } from 'app/core/services/destroy.service'
import { environment } from '../../../../environments/environment'

declare const qq: any

@Component({
  selector: 'app-merchant-info',
  templateUrl: './merchant-info.component.html',
  providers: [DestroyService]
})
export class MerchantInfoComponent implements OnInit, OnDestroy {
  active = 1
  merchantForm: FormGroup
  indexPageImgUrl: string

  pwd = {
    old_password: '',
    new_password: '',
    confirm_new_password: ''
  }

  currentLatLng: {
    lat: number
    lng: number
  } = {
    lat: 31.993390986477138, // 默认缤润汇地址
    lng: 118.7299132347107
  }

  uploader: FileUploader = new FileUploader({
    url: environment.SERVER_URL + '/api/test/upload',
    isHTML5: true
  })

  @ViewChild('map') mapComp: AqmComponent
  mapOptions: any = {}
  private map: any
  private geocoder: any
  private marker: any

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private notify: NzNotificationService,
    private utils: UtilsService,
    private zone: NgZone
  ) {
  }

  onReady(mapNative: any) {
    this.fetchLatLng()

    mapNative.setOptions({
      zoom: 12,
      center: new qq.maps.LatLng(this.currentLatLng.lat, this.currentLatLng.lng)
    })
    this.map = mapNative
    // 解析经纬度为 描述性的地理位置
    this.geocoder = new qq.maps.Geocoder({
      complete: result => {
        console.log(result)
        this.zone.run(() => {
          const detailAddr = this.computeDetailAddr(
            result.detail.addressComponents
          )
          const { lat, lng } = result.detail.location
          this.merchantForm.patchValue({
            address: detailAddr,
            latitude: lat,
            longitude: lng
          })
        })
      }
    })

    // 添加监听事件
    qq.maps.event.addListener(this.map, 'click', (event: any) => {
      const latLng = new qq.maps.LatLng(
        event.latLng.getLat(),
        event.latLng.getLng()
      )
      if (this.marker) {
        this.marker.setMap(null)
      }
      this.marker = new qq.maps.Marker({
        map: this.map,
        position: latLng
      })
      this.geocoder.getAddress(latLng)
    })
  }

  getFormControl(key: string) {
    return this.merchantForm.controls[key]
  }

  getFormControlValidator(key: string, error: string) {
    return (
      this.getFormControl(key).dirty && this.getFormControl(key).hasError(error)
    )
  }

  submit(event, value) {
    console.log(event, value)
  }

  pwdSave() {
    if (!this.pwd.old_password) {
      return this.msg.error('invalid old password')
    }
    if (!this.pwd.new_password) {
      return this.msg.error('invalid new password')
    }
    if (!this.pwd.confirm_new_password) {
      return this.msg.error('invalid confirm new password')
    }
    console.log('pwd value', this.pwd)
  }

  ngOnInit() {
    
    this.buildForm()
    this.initUploader()
    this.initSubscriber()
  }

  ngOnDestroy(): void {
    ['click'].forEach(eventName => {
      qq.maps.event.clearListeners(this.map, eventName)
    })
  }

  private fetchLatLng(): void {
    this.utils
      .fetchQQLatLng()
      .then(latlng => {
        this.currentLatLng = latlng
      })
      .catch(e => {
        console.error(e.message)
      })
  }

  private buildForm(): void {
    this.merchantForm = this.fb.group({
      name: [null, Validators.required],
      advertising: [null],
      address: [null, Validators.required],
      longitude: [null, Validators.required],
      latitude: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
      indexPageImgUrl: [null]
    })
  }

  private initSubscriber(): void {}

  private initUploader(): void {
    this.uploader.onAfterAddingFile = f => {
      f.upload()
    }

    this.uploader.onSuccessItem = (fileItem, resp, status, headers) => {
      try {
        const file_path = JSON.parse(resp).result[0]
        this.indexPageImgUrl = environment.SERVER_URL + `/${file_path}`
        this.merchantForm.patchValue({
          indexPageImgUrl: this.indexPageImgUrl
        })
      } catch (e) {
        this.notify.error('上传主页图', '上传主页图失败，请稍后重试！')
      }
    }
  }

  private computeDetailAddr(obj): string {
    return Object.values(obj).join('')
  }
}
