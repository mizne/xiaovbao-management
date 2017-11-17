import { NzNotificationService } from 'ng-zorro-antd'
import { Component, OnInit, ViewChild, NgZone, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AqmComponent } from 'angular-qq-maps'
import { FileUploader } from 'ng2-file-upload'

import { DestroyService } from 'app/core/services/destroy.service'
import { environment } from '../../../../environments/environment'

import { Store } from '@ngrx/store'
import { State, getMerchantInfo, getLoading } from '../reducers'
import {
  FetchMerchantInfoAction,
  EditMerchantInfoAction,
  ChangePasswordAction,
  ChangePasswordParams,
} from './merchant-info.action'

import * as R from 'ramda'
import * as moment from 'moment'
import { Observable } from 'rxjs/Observable'
import { MerchantInfo } from 'app/routes/merchant-info/models/merchat-info.model'
import { patch } from 'webdriver-js-extender'
import { FormControl } from '@angular/forms/src/model';

declare const qq: any

@Component({
  selector: 'app-merchant-info',
  templateUrl: './merchant-info.component.html',
  providers: [DestroyService]
})
export class MerchantInfoComponent implements OnInit, OnDestroy {
  active = 1
  merchantForm: FormGroup
  passwordForm: FormGroup

  loading$: Observable<boolean>

  pwd = {
    old_password: '',
    new_password: '',
    confirm_new_password: ''
  }

  DEFAULT_LAT_LNG = {
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
    private notify: NzNotificationService,
    private zone: NgZone,
    private store: Store<State>,
    private destoryService: DestroyService,
  ) {}

  onReady(mapNative: any) {
    const latLng = new qq.maps.LatLng(
      this.merchantForm.controls['latitude'].value || this.DEFAULT_LAT_LNG.lat,
      this.merchantForm.controls['longitude'].value || this.DEFAULT_LAT_LNG.lng
    )
    this.map = mapNative
    this.setMapCenterAndMarker(latLng)

    // 解析经纬度为 描述性的地理位置
    this.initGeoCoder()

    // 添加监听事件
    this.registerMapEvents()
  }

  getFormControl(formName: string, key: string) {
    return this[formName].controls[key]
  }

  getFormControlValidator(formName: string, key: string, error: string) {
    return (
      this.getFormControl(formName, key).dirty && this.getFormControl(formName, key).hasError(error)
    )
  }

  changePwd(value) {
    const params: ChangePasswordParams = {
      oldPassword: value.oldPassword,
      newPassword: value.newPassword
    }

    console.log(params)
    this.store.dispatch(new ChangePasswordAction(params))
  }

  ngOnInit() {
    this.buildForm()
    this.initUploader()
    this.initDataSource()
    this.initSubscriber()
  }

  ngOnDestroy(): void {
    this.unregisterMapEvents()
  }

  saveBaseInfo(formValue) {
    const params: MerchantInfo = {
      aliasName: formValue.aliasName,
      address: formValue.address,
      advertising: formValue.advertising,
      lat: formValue.latitude,
      lng: formValue.longitude,
      indexPageImgUrl: formValue.indexPageImgUrl
    }

    // 需将 startTime endTime转化为 HH:mm 字符串
    if (formValue.startTime) {
      Object.assign(params, {
        startTime: moment(formValue.startTime).format('HH:mm')
      })
    }
    if (formValue.endTime) {
      Object.assign(params, {
        endTime: moment(formValue.endTime).format('HH:mm')
      })
    }

    console.log('to save merchant info ', params)

    this.store.dispatch(new EditMerchantInfoAction(params))
  }

  private setMapCenterAndMarker(latLng): void {
    this.map.setOptions({
      zoom: 16,
      center: latLng
    })
    this.marker = new qq.maps.Marker({
      map: this.map,
      position: latLng
    })
  }

  private initGeoCoder(): void {
    this.geocoder = new qq.maps.Geocoder({
      complete: result => {
        this.zone.run(() => {
          const detailAddr = this.computeDetailAddr(
            result.detail.addressComponents
          )
          const { lat, lng } = result.detail.location
          this.patchForm({
            address: detailAddr,
            latitude: lat,
            longitude: lng
          })
        })
      }
    })
  }

  private registerMapEvents(): void {
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

  private unregisterMapEvents(): void {
    ['click'].forEach(eventName => {
      qq.maps.event.clearListeners(this.map, eventName)
    })
  }

  private buildForm(): void {
    this.buildMerchantForm()
    this.buildPasswordForm()
  }

  private buildMerchantForm(): void {
    this.merchantForm = this.fb.group({
      aliasName: [null],
      advertising: [null],
      address: [null],
      longitude: [null],
      latitude: [null],
      startTime: [null],
      endTime: [null],
      indexPageImgUrl: [null]
    })
  }

  private buildPasswordForm(): void {
    this.passwordForm = this.fb.group({
      oldPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      confirmPassword: [null, this.confirmPasswordValidator]
    })
  }

  confirmPasswordValidator = (control: FormControl): {[s: string]: boolean} => {
    if (!control.value) {
      return { required: true }
    } else if (control.value !== this.passwordForm.controls['newPassword'].value) {
      return { confirm: true, error: true }
    }
  }

  private initDataSource(): void {
    this.loading$ = this.store.select(getLoading)
  }

  private initSubscriber(): void {
    this.store.dispatch(new FetchMerchantInfoAction())

    this.store
      .select(getMerchantInfo)
      .filter(R.complement(R.isNil))
      .takeUntil(this.destoryService)
      .subscribe(merchantInfo => {
        this.patchForm(this.computePatchObj(merchantInfo))
      })
  }

  private computePatchObj(merchantInfo: MerchantInfo): any {
    const today = moment().format('YYYY-MM-DD')
    const patchObj = {
      aliasName: merchantInfo.aliasName,
      advertising: merchantInfo.advertising,
      address: merchantInfo.address,
      indexPageImgUrl: merchantInfo.indexPageImgUrl
    }
    if (merchantInfo.startTime) {
      Object.assign(patchObj, {
        startTime: moment(
          today + ' ' + merchantInfo.startTime,
          'YYYY-MM-DD HH:mm'
        ).toDate()
      })
    }
    if (merchantInfo.endTime) {
      Object.assign(patchObj, {
        endTime: moment(
          today + ' ' + merchantInfo.endTime,
          'YYYY-MM-DD HH:mm'
        ).toDate()
      })
    }
    if (merchantInfo.lat) {
      Object.assign(patchObj, {
        longitude: merchantInfo.lng,
        latitude: merchantInfo.lat
      })
      if (this.map) {
        const latLng = new qq.maps.LatLng(merchantInfo.lat, merchantInfo.lng)
        this.setMapCenterAndMarker(latLng)
      }
    }

    return patchObj
  }

  private patchForm(patchObj: any) {
    this.merchantForm.patchValue(patchObj)
  }

  private initUploader(): void {
    this.uploader.onAfterAddingFile = f => {
      f.upload()
    }

    this.uploader.onSuccessItem = (fileItem, resp, status, headers) => {
      try {
        const file_path = JSON.parse(resp).result[0]
        this.merchantForm.patchValue({
          indexPageImgUrl: environment.SERVER_URL + `/${file_path}`
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
