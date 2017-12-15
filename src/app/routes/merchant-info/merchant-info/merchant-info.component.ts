import { NzNotificationService, NzModalService } from 'ng-zorro-antd'
import { Component, OnInit, ViewChild, NgZone, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { AqmComponent } from 'angular-qq-maps'
import { FileUploader } from 'ng2-file-upload'

import { DestroyService } from 'app/core/services/destroy.service'
import { UADetectorService } from 'app/core/services/ua-detector.service'
import { environment } from '../../../../environments/environment'
import { BIND_WECHAT_HREF } from '../../../../config'

import { Store } from '@ngrx/store'
import { State, getMerchantInfo, getLoading } from '../reducers'
import {
  FetchMerchantInfoAction,
  EditMerchantInfoAction,
  ChangePasswordAction,
  ChangePasswordParams
} from './merchant-info.action'

import * as R from 'ramda'
import * as moment from 'moment'
import { Observable } from 'rxjs/Observable'
import { MerchantInfo } from 'app/routes/merchant-info/models/merchat-info.model'
import { patch } from 'webdriver-js-extender'
import { Subject } from 'rxjs/Subject'

import { BindWechatModalComponent } from '../modals/bind-wechat-modal.component'

declare const qq: any

@Component({
  selector: 'app-merchant-info',
  templateUrl: './merchant-info.component.html',
  providers: [DestroyService]
})
export class MerchantInfoComponent implements OnInit, OnDestroy {
  activeTab = 1
  merchantForm: FormGroup
  updateMerchantFormSub: Subject<MerchantInfo> = new Subject<MerchantInfo>()

  passwordForm: FormGroup
  changePasswordFormSub: Subject<ChangePasswordParams> = new Subject<
    ChangePasswordParams
  >()

  loading$: Observable<boolean>
  hasBindWechat$: Observable<boolean>
  bindWechatText$: Observable<string>
  bindWechatSub: Subject<void> = new Subject<void>()
  bindWechatHref = BIND_WECHAT_HREF

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
    private ua: UADetectorService,
    private modalService: NzModalService
  ) {}

  onReady(mapNative: any): void {
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
      this.getFormControl(formName, key).dirty &&
      this.getFormControl(formName, key).hasError(error)
    )
  }

  ngOnInit(): void {
    this.initDispatch()
    this.buildForm()
    this.initUploader()
    this.initDataSource()
    this.initSubscriber()
  }

  ngOnDestroy(): void {
    this.unregisterMapEvents()
  }

  updateMerchantInfo(formValue): void {
    const params: MerchantInfo = {
      aliasName: formValue.aliasName,
      address: formValue.address,
      advertising: formValue.advertising,
      lat: formValue.latitude,
      lng: formValue.longitude,
      indexPageImgUrl: formValue.indexPageImgUrl
    }

    // 需将 startTime endTime deliveryStartTime deliveryEndTime转化为 HH:mm 字符串
    ; ['startTime', 'endTime', 'deliveryStartTime', 'deliveryEndTime'].forEach(prop => {
      if (formValue[prop]) {
        Object.assign(params, {
          [prop]: moment(formValue[prop]).format('HH:mm')
        })
      }
    })
    this.updateMerchantFormSub.next(params)
  }

  changePassword(value: any): void {
    const params: ChangePasswordParams = {
      oldPassword: value.oldPassword,
      newPassword: value.newPassword
    }
    this.changePasswordFormSub.next(params)
  }

  toBindWechat(): void {
    this.bindWechatSub.next()
  }

  private initDispatch(): void {
    this.store.dispatch(new FetchMerchantInfoAction())
  }

  private buildForm(): void {
    this.buildMerchantForm()
    this.buildPasswordForm()
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

  private initDataSource(): void {
    this.loading$ = this.store.select(getLoading)
    this.hasBindWechat$ = this.store
      .select(getMerchantInfo)
      .map(merchantInfo => {
        if (merchantInfo) {
          return !!merchantInfo.wechatOpenId
        } else {
          return false
        }
      })

    this.bindWechatText$ = this.hasBindWechat$.map(hasBind => {
      if (hasBind) {
        return '已绑定，去切换绑定'
      } else {
        return '去绑定'
      }
    })
  }

  private initSubscriber(): void {
    this.initPatchMerchantForm()
    this.initUpdateMerchantInfo()
    this.initChangePassword()
    this.initBindWechat()
  }

  private initPatchMerchantForm(): void {
    this.store
      .select(getMerchantInfo)
      .filter(R.complement(R.isNil))
      .takeUntil(this.destoryService)
      .subscribe(merchantInfo => {
        this.patchForm(this.computePatchObj(merchantInfo))
      })
  }

  private initUpdateMerchantInfo(): void {
    this.updateMerchantFormSub
      .asObservable()
      .takeUntil(this.destoryService)
      .subscribe(merchantInfo => {
        this.store.dispatch(new EditMerchantInfoAction(merchantInfo))
      })
  }

  private initChangePassword(): void {
    this.changePasswordFormSub
      .asObservable()
      .takeUntil(this.destoryService)
      .subscribe(params => {
        this.store.dispatch(new ChangePasswordAction(params))
      })
  }

  private initBindWechat(): void {
    // 绑定逻辑
    // 如果未绑定微信账号 则去绑定
    // 如果已绑定微信帐号 则去切换绑定帐号
    // 绑定交互方式
    // 如果是微信浏览器访问 则直接跳转 绑定微信页面
    // 如果不是微信浏览器 则 弹框提醒用户用微信扫描二维码 去绑定微信页面

    const bindWechat$: Observable<{
      hasBind: boolean
      isWechatBrowser: boolean
    }> = this.bindWechatSub
      .asObservable()
      .withLatestFrom(this.hasBindWechat$, (_, hasBindWechat) => hasBindWechat)
      .map(hasBind => {
        return {
          hasBind,
          isWechatBrowser: this.ua.isWechat()
        }
      })
      .takeUntil(this.destoryService)

    const inWechatBrowser$ = bindWechat$.filter(e => e.isWechatBrowser)
    const notInWechatBrowser$ = bindWechat$.filter(e => !e.isWechatBrowser)

    inWechatBrowser$.takeUntil(this.destoryService).subscribe(() => {
      window.location.href = BIND_WECHAT_HREF
    })

    notInWechatBrowser$
      .switchMap(() => {
        return this.modalService.open({
          title: '请用微信扫描二维码',
          content: BindWechatModalComponent,
          footer: false
        })
      })
      .takeUntil(this.destoryService)
      .subscribe(s => {
        if (s === 'onOk') {
          this.initDispatch()
        }
      })
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
    const eventNames = ['click']
    eventNames.forEach(eventName => {
      qq.maps.event.clearListeners(this.map, eventName)
    })
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
      indexPageImgUrl: [null],
      deliveryStartTime: [null],
      deliveryEndTime: [null]
    })
  }

  private buildPasswordForm(): void {
    this.passwordForm = this.fb.group({
      oldPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      confirmPassword: [null, this.confirmPasswordValidator]
    })
  }

  private confirmPasswordValidator = (
    control: FormControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true }
    } else if (
      control.value !== this.passwordForm.controls['newPassword'].value
    ) {
      return { confirm: true, error: true }
    }
  }

  private computePatchObj(merchantInfo: MerchantInfo): any {
    const today = moment().format('YYYY-MM-DD')
    const patchObj = {
      aliasName: merchantInfo.aliasName,
      advertising: merchantInfo.advertising,
      address: merchantInfo.address,
      indexPageImgUrl: merchantInfo.indexPageImgUrl
    }
    ; ['startTime', 'endTime', 'deliveryStartTime', 'deliveryEndTime'].forEach(
      prop => {
        if (merchantInfo[prop]) {
          Object.assign(patchObj, {
            [prop]: moment(
              today + ' ' + merchantInfo[prop],
              'YYYY-MM-DD HH:mm'
            ).toDate()
          })
        }
      }
    )

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

  private computeDetailAddr(obj): string {
    return Object.keys(obj).map(k => obj[k]).join('')
  }
}
