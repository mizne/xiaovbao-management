import { Component, OnInit } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { SettingsService } from '@core/services/settings.service'

import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'
import {
  State,
  getLoginLoading,
  getLoginFailureMsg,
  getCaptchaUrl,
  getFetchCaptchaLoading,
} from '../reducers'
import { LoginRequestAction, FetchCaptchaAction } from './login.action'

@Component({
  selector: 'app-pages-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  valForm: FormGroup
  loading$: Observable<boolean>
  loginFailureMsg$: Observable<string>
  captcha$: Observable<SafeHtml>
  fetchCaptchaLoading$: Observable<boolean>

  constructor(
    public settings: SettingsService,
    private fb: FormBuilder,
    private store: Store<State>,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this.buildForm()
    this.initDataSource()
  }

  private buildForm(): void {
    this.valForm = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      password: [null, Validators.required],
      rememberMe: [true],
      captcha: [null, Validators.required]
    })
  }

  private initDataSource(): void {
    this.loading$ = this.store.select(getLoginLoading)
    this.loginFailureMsg$ = this.store.select(getLoginFailureMsg)
    this.captcha$ = this.store.select(getCaptchaUrl)
    .map(this.sanitizer.bypassSecurityTrustHtml)
    this.store.dispatch(new FetchCaptchaAction())

    this.fetchCaptchaLoading$ = this.store.select(getFetchCaptchaLoading)
  }

  getFormControl(key: string) {
    return this.valForm.controls[key]
  }

  getFormControlValidator(key: string, error: string) {
    return (
      this.getFormControl(key).dirty && this.getFormControl(key).hasError(error)
    )
  }

  refreshCaptcha() {
    this.store.dispatch(new FetchCaptchaAction())
  }

  submit() {
    if (this.valForm.valid) {
      Object.keys(this.valForm.controls).forEach(e => {
        this.valForm.controls[e].markAsDirty()
      })

      const params = {
        captcha: this.valForm.value.captcha,
        name: this.valForm.value.name,
        password: this.valForm.value.password
      }

      this.store.dispatch(
        new LoginRequestAction(params)
      )
    }
  }
}
