import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { SettingsService } from '@core/services/settings.service'

import { Store } from '@ngrx/store'
import { State, getRegisterLoading } from '../reducers'
import { RegistryRequestAction } from './register.action'

import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-pages-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  valForm: FormGroup

  loading$: Observable<boolean>

  roles = [
    {
      label: '商家',
      value: '商家'
    },
    {
      label: '商圈',
      value: '商圈'
    },
    {
      label: '代理商',
      value: '代理商'
    }
  ]

  industries = [
    {
      label: '教育',
      value: 'education'
    },
    {
      label: '婚庆',
      value: 'wedding'
    },
    {
      label: '超市',
      value: 'supermarket'
    },
    {
      label: '酒店',
      value: 'hotel'
    },
    {
      label: '会销公司',
      value: 'annualMeeting'
    },
    {
      label: '餐饮',
      value: 'supermarket'
    },
    {
      label: '培训',
      value: 'supermarket'
    },
    {
      label: '旅游',
      value: 'supermarket'
    },
    {
      label: '丽人',
      value: 'supermarket'
    },
    {
      label: '保健',
      value: 'supermarket'
    },
    {
      label: '其他',
      value: 'supermarket'
    }
  ]

  searchOptions = [
    { value: 'jack', label: '杰克' },
    { value: 'lucy', label: '露西' },
    { value: 'tom', label: '汤姆' }
  ]

  constructor(
    public settings: SettingsService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.buildForm()
    this.loading$ = this.store.select(getRegisterLoading)
  }

  private buildForm() {
    this.valForm = this.fb.group({
      name: [null, Validators.required],
      password: [null, Validators.required],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      phone: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^1[0-9]{10}$')
        ])
      ],
      role: [this.roles[0].value],
      industry: [this.industries[0].value],
      agreed: [null, Validators.required]
    })
  }

  hasSelectedMerchant() {
    return this.valForm.controls['role'].value === this.roles[0].value
  }

  getFormControl(key: string) {
    return this.valForm.controls[key]
  }

  getFormControlValidator(key: string, error: string) {
    return (
      this.getFormControl(key).dirty && this.getFormControl(key).hasError(error)
    )
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true }
    } else if (control.value !== this.valForm.controls['password'].value) {
      return { confirm: true, error: true }
    }
  }

  submit() {
    // tslint:disable-next-line:forin
    for (const i in this.valForm.controls) {
      this.valForm.controls[i].markAsDirty()
    }

    if (this.valForm.valid) {
      console.log('Valid!')
      console.log(this.valForm.value)

      const params = {
        name: this.valForm.value.name,
        password: this.valForm.value.password,
        phone: this.valForm.value.phone,
        role: this.valForm.value.role
      }
      if (this.valForm.value.industry) {
        Object.assign(params, {
          industry: this.valForm.value.industry
        })
      }
      this.store.dispatch(new RegistryRequestAction(params))
    }
  }
}
