import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { SettingsService } from '@core/services/settings.service'

import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'
import {
  State,
  getBindWechatLoading,
  getBindWechatPrompt,
  getShowBindWechatForm,
  getBindWechatFailureMsg,
  getNeedShowBindWechatBtn
} from '../reducers'
import {
  ToShowBindWechatFormAction,
  CheckWechatHasBindAction,
  BindWehcatAction
} from './bind-wechat.action'
import { UtilsService } from 'app/core/services/utils.service'
import { DestroyService } from 'app/core/services/destroy.service'
import { BindWechatState } from '../models/bind-wechat.model'

@Component({
  selector: 'app-pages-bind-wechat',
  templateUrl: './bind-wechat.component.html',
  providers: [DestroyService]
})
export class BindWechatComponent implements OnInit {
  bindWechatForm: FormGroup
  loading$: Observable<boolean>
  bindWechatPrompt$: Observable<string>
  showBindWechatForm$: Observable<boolean>
  bindWechatFailureMsg$: Observable<string>

  needShowBindWechatBtn$: Observable<boolean>

  showBindWechatForm = false
  private code: string
  private state: string

  constructor(
    public settings: SettingsService,
    private fb: FormBuilder,
    private store: Store<State>,
    private utils: UtilsService,
    private destroyService: DestroyService
  ) {}

  ngOnInit() {
    this.buildForm()
    this.initDataSource()
    this.initLocationSearch()
    this.initSubscriber()
  }

  toBindWechat() {
    // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?
    // appid=wx09b412b006792e2c&redirect_uri=http%3A%2F%2Fdeal.xiaovbao.cn%2Fwechatpay
    // &response_type=code&scope=snsapi_base
    // &state=bindWechat#wechat_redirect`
  }

  private buildForm(): void {
    this.bindWechatForm = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      password: [null, Validators.required]
    })
  }

  private initDataSource(): void {
    this.loading$ = this.store.select(getBindWechatLoading)
    this.bindWechatPrompt$ = this.store.select(getBindWechatPrompt)
    this.showBindWechatForm$ = this.store.select(getShowBindWechatForm)
    this.bindWechatFailureMsg$ = this.store.select(getBindWechatFailureMsg)

    this.needShowBindWechatBtn$ = this.store.select(getNeedShowBindWechatBtn)
  }

  private initLocationSearch(): void {
    const { code, state } = this.utils.objFrom(location.search)
    if (typeof code === 'string') {
      this.code = code
    }
    if (typeof state === 'string') {
      this.state = state
    }

    switch (this.state) {
      case BindWechatState.BIND_WECHAT:
        this.store.dispatch(new ToShowBindWechatFormAction())
        break
      case BindWechatState.ORDER:
        this.store.dispatch(
          new CheckWechatHasBindAction({
            code: this.code,
            destination: this.state
          })
        )
        break
      default:
        console.error(`Unknwon bind wechat state: ${this.state}`)
        break
    }
  }

  private initSubscriber(): void {
    this.store
      .select(getShowBindWechatForm)
      .takeUntil(this.destroyService)
      .subscribe(isFailed => {
        if (isFailed) {
          this.showBindWechatForm = true
        }
      })
  }

  getFormControl(key: string) {
    return this.bindWechatForm.controls[key]
  }

  getFormControlValidator(key: string, error: string) {
    return (
      this.getFormControl(key).dirty && this.getFormControl(key).hasError(error)
    )
  }

  submit() {
    if (this.bindWechatForm.valid) {
      Object.keys(this.bindWechatForm.controls).forEach(e => {
        this.bindWechatForm.controls[e].markAsDirty()
      })

      const params = {
        userName: this.bindWechatForm.value.name,
        password: this.bindWechatForm.value.password
      }

      this.store.dispatch(
        new BindWehcatAction({
          ...params,
          code: this.code,
          destination: this.state
        })
      )
    }
  }
}
