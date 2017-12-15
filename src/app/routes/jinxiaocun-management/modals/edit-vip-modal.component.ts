import { Component, Input, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { NzModalSubject } from 'ng-zorro-antd'

@Component({
  selector: 'app-edit-vip-modal',
  template: `
    <div class="custome-modal-container">
      <form nz-form [nzType]="'horizontal'" [formGroup]="editVipForm">
        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label nz-form-item-required>姓名</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('name')">
            <nz-input formControlName="name" [nzType]="'text'" [nzSize]="'large'">
            </nz-input>
            <div nz-form-explain *ngIf="getFormControlError('name', 'required')">
              {{ 'Please input your name!' | translate }}
            </div>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label nz-form-item-required>电话</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('phone')">
            <nz-input formControlName="phone" [nzType]="'text'" [nzSize]="'large'">
            </nz-input>
            <div nz-form-explain *ngIf="getFormControlError('phone', 'required')">
              {{ 'Please input your phone!' | translate }}
            </div>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label nz-form-item-required>类型</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('level')">
            <nz-select formControlName="level" [nzSize]="'large'">
              <nz-option [nzLabel]="'普通会员'" [nzValue]="0"></nz-option>
              <nz-option [nzLabel]="'银卡会员'" [nzValue]="1"></nz-option>
            </nz-select>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label>会员生日</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('birthday')">
            <nz-datepicker formControlName="birthday" [nzSize]="'large'" [nzPlaceHolder]="'选择您的生日'" style="width: 100%;">
            </nz-datepicker>
          <div nz-form-explain *ngIf="getFormControlError('birthday', 'required')">
            Please input your birthday!
          </div>
          <div nz-form-explain *ngIf="getFormControlError('birthday', 'expired')">
            Birthday must less than today!
          </div>
          </div>
        </div>
      </form>

      <div class="customize-footer">
        <button nz-button (click)="cancel()">{{ 'cancel' | translate }}</button>
        <button nz-button [nzType]="'primary'" (click)="ok()">{{ 'ok' | translate }}</button>
      </div>
    </div>
  `
})
export class EditVipModalComponent implements OnInit {
  editVipForm: FormGroup

  _name: string
  _phone: string
  _level: number
  _birthday: string

  @Input()
  set name(value: string) {
    this._name = value
  }
  @Input()
  set phone(value: string) {
    this._phone = value
  }
  @Input()
  set level(value: number) {
    this._level = value
  }
  @Input()
  set birthday(value: string) {
    this._birthday = value
  }

  constructor(
    private subject: NzModalSubject,
    private fb: FormBuilder,
  ) {
  }

  getFormControl(name) {
    return this.editVipForm.controls[name]
  }

  getFormControlError(name: string, error: string) {
    return this.getFormControl(name).dirty && this.getFormControl(name)[error]
  }

  ok() {
    this.subject.next({})
    this.subject.destroy('onOk')
  }

  cancel() {
    this.subject.destroy('onCancel')
  }

  birthDayValidator = (control: FormControl): any => {
    if (new Date(control.value) > new Date()) {
      return { expired: true, error: true }
    }
  };

  ngOnInit() {
    this.editVipForm = this.fb.group({
      name: [this._name, Validators.required],
      phone: [this._phone, Validators.required],
      level: [this._level, Validators.required],
      birthday: [this._birthday],
    })
  }
}
