import { Component, Input, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NzModalSubject } from 'ng-zorro-antd'
import { FileUploader } from 'ng2-file-upload'

import { Observable } from 'rxjs/Observable'
import { Qrcode } from '../models/qrcode.model'
import { Store } from '@ngrx/store'
import { State } from '../reducers'

@Component({
  selector: 'app-add-qrcode-modal',
  template: `
    <div class="custome-modal-container">
      <form nz-form [nzType]="'horizontal'" [formGroup]="addQrcodeForm">
        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label nz-form-item-required>二维码类型</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('qrcodeType')">
            <nz-select formControlName="qrcodeType" [nzSize]="'large'">
              <nz-option [nzLabel]="'点餐'" [nzValue]="'点餐'"></nz-option>
              <nz-option [nzLabel]="'积分购买'" [nzValue]="'积分购买'"></nz-option>
            </nz-select>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label nz-form-item-required>桌号</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('tableNo')">
            <nz-input formControlName="tableNo" [nzType]="'text'" [nzSize]="'large'">
            </nz-input>
            <div nz-form-explain *ngIf="getFormControlError('tableNo', 'required')">
              {{ 'Please input price!' | translate }}
            </div>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label nz-form-item-required>优惠券类型</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('couponType')">
            <nz-select formControlName="couponType" [nzSize]="'large'">
              <nz-option [nzLabel]="'金额'" [nzValue]="'金额'"></nz-option>
              <nz-option [nzLabel]="'折扣'" [nzValue]="'折扣'"></nz-option>
              <nz-option [nzLabel]="'满减'" [nzValue]="'满减'"></nz-option>
            </nz-select>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label>优惠券金额</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('couponAmount')">
            <nz-input formControlName="couponAmount" [nzType]="'text'" [nzSize]="'large'">
            </nz-input>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label>优惠券占比</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('couponRatio')">
            <nz-input formControlName="couponRatio" [nzType]="'text'" [nzSize]="'large'">
            </nz-input>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label>二维码信息描述</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('description')">
            <nz-input formControlName="description" [nzType]="'text'" [nzSize]="'large'">
            </nz-input>
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
export class AddQrcodeModalComponent implements OnInit {
  addQrcodeForm: FormGroup

  _qrcodeType: string
  _tableNo: string
  _couponType: string
  _couponAmount: string
  _couponRatio: string
  _description: string

  @Input()
  set qrcodeType(value: string) {
    this._qrcodeType = value
  }
  @Input()
  set tableNo(value: string) {
    this._tableNo = value
  }
  @Input()
  set couponType(value: string) {
    this._couponType = value
  }
  @Input()
  set couponAmount(value: string) {
    this._couponAmount = value
  }
  @Input()
  set couponRatio(value: string) {
    this._couponRatio = value
  }
  @Input()
  set description(value: string) {
    this._description = value
  }

  constructor(
    private subject: NzModalSubject,
    private fb: FormBuilder,
    private store: Store<State>
  ) {
  }

  getFormControl(name) {
    return this.addQrcodeForm.controls[name]
  }

  getFormControlError(name: string, error: string) {
    return this.getFormControl(name).dirty && this.getFormControl(name).hasError(error)
  }

  ok() {
    this.subject.next({})
    this.subject.destroy('onOk')
  }

  cancel() {
    this.subject.destroy('onCancel')
  }

  ngOnInit() {
    this.addQrcodeForm = this.fb.group({
      qrcodeType: [this._qrcodeType, Validators.required],
      tableNo: [this._tableNo, Validators.required],
      couponType: [this._couponType, Validators.required],
      couponAmount: [this._couponAmount, Validators.required],
      couponRatio: [this._couponRatio, Validators.required],
      description: [this._description]
    })
  }
}
