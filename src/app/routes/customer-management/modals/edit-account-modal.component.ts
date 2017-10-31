import { Component, Input, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NzModalSubject } from 'ng-zorro-antd'

import { Observable } from 'rxjs/Observable'
import { Account } from '../models/account.model'

@Component({
  selector: 'app-edit-account-modal',
  template: `
    <div class="custome-modal-container">
      <form nz-form [nzType]="'horizontal'" [formGroup]="editAccountForm">
        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label nz-form-item-required>电话</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('phone')" nzHasFeedback>
            <nz-input formControlName="phone" [nzType]="'text'" [nzSize]="'large'" [nzDisabled]="action === 'edit'">
            </nz-input>
            <div nz-form-explain *ngIf="getFormControlError('phone', 'required')">
              {{ 'Please input your phone!' | translate }}
            </div>

            <div nz-form-explain *ngIf="getFormControlError('phone', 'pattern')">
              {{ 'Wrong phone format!' | translate }}
            </div>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label nz-form-item-required>是否会员</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('isVip')">
            <nz-select formControlName="isVip" [nzSize]="'large'">
              <nz-option [nzLabel]="'是'" [nzValue]="true"></nz-option>
              <nz-option [nzLabel]="'否'" [nzValue]="false"></nz-option>
            </nz-select>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label>消费金额</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('consumpAmount')">
            <nz-input type="number" formControlName="consumpAmount" [nzType]="'text'" [nzSize]="'large'">
            </nz-input>
          </div>
        </div>
      </form>

      <div class="customize-footer">
        <button nz-button (click)="cancel()">{{ 'cancel' | translate }}</button>
        <button nz-button [disabled]="editAccountForm.invalid" [nzType]="'primary'" (click)="ok()">{{ 'ok' | translate }}</button>
      </div>
    </div>
  `
})
export class EditAccountModalComponent implements OnInit {
  editAccountForm: FormGroup

  _phone: string
  _isVip: boolean
  _consumpAmount = 1

  @Input()
  set phone(value: string) {
    this._phone = value
  }

  @Input()
  set isVip(value) {
    this._isVip = value
  }

  constructor(private subject: NzModalSubject, private fb: FormBuilder) {}

  getFormControl(name) {
    return this.editAccountForm.controls[name]
  }

  getFormControlError(name: string, error: string) {
    return this.getFormControl(name).dirty && this.getFormControl(name).hasError(error)
  }

  ok() {
    this.subject.next(this.editAccountForm.value)
    this.subject.destroy('onOk')
  }

  cancel() {
    this.subject.destroy('onCancel')
  }

  ngOnInit() {
    const phoneRe = /^1[3|4|5|7|8][0-9]{9}$/
    const numberRe = /^[1-9]\d*$/
    this.editAccountForm = this.fb.group({
      phone: [this._phone, [Validators.required, Validators.pattern(phoneRe)]],
      isVip: [this._isVip, Validators.required],
      consumpAmount: [this._consumpAmount, [Validators.pattern(numberRe)]]
    })
  }
}
