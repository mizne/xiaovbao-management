import { Component, Input, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NzModalSubject } from 'ng-zorro-antd'
import { FileUploader } from 'ng2-file-upload'

import { Observable } from 'rxjs/Observable'
import { Qrcode } from '../models/qrcode.model'
import { Table } from '../models/table.model'
import { Store } from '@ngrx/store'
import { State, getTables } from '../reducers'
import { FetchTableAction } from '../qrcode-management/qrcode.action'

export enum QrcodeModalActionType {
  CREATE, EDIT
}

@Component({
  selector: 'app-add-qrcode-modal',
  template: `
    <div class="custome-modal-container">
      <form nz-form [nzType]="'horizontal'" [formGroup]="qrcodeForm">
        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label nz-form-item-required>二维码类型</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('bizType')">
            <nz-select formControlName="bizType" [nzSize]="'large'">
              <nz-option [nzLabel]="'点餐'" [nzValue]="'deal'"></nz-option>
              <nz-option [nzLabel]="'代售'" [nzValue]="'eshop'"></nz-option>
              <nz-option [nzLabel]="'积分购买'" [nzValue]="'积分购买'"></nz-option>
            </nz-select>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label nz-form-item-required>桌号</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('tableName')">
            <nz-select formControlName="tableName" [nzSize]="'large'">
              <nz-option *ngFor="let table of tables$ | async" [nzLabel]="table.name" [nzValue]="table.name"></nz-option>
            </nz-select>
            <div nz-form-explain *ngIf="getFormControlError('tableName', 'required')">
              请选择桌号
            </div>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label>优惠券类型</label>
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
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('couponValue')">
            <nz-input formControlName="couponValue" [nzType]="'text'" [nzSize]="'large'">
            </nz-input>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label>优惠券占比</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('couponRate')">
            <nz-input formControlName="couponRate" [nzType]="'text'" [nzSize]="'large'">
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
        <button nz-button [nzType]="'primary'" [disabled]="qrcodeForm.invalid" (click)="ok()">{{ 'ok' | translate }}</button>
      </div>
    </div>
  `
})
export class AddQrcodeModalComponent implements OnInit {
  qrcodeForm: FormGroup

  tables$: Observable<Table[]>

  @Input() action: QrcodeModalActionType
  @Input() data: Qrcode

  constructor(
    private subject: NzModalSubject,
    private fb: FormBuilder,
    private store: Store<State>
  ) {
  }

  getFormControl(name) {
    return this.qrcodeForm.controls[name]
  }

  getFormControlError(name: string, error: string) {
    return this.getFormControl(name).dirty && this.getFormControl(name).hasError(error)
  }

  ok() {
    this.subject.next(this.qrcodeForm.value)
    this.subject.destroy('onOk')
  }

  cancel() {
    this.subject.destroy('onCancel')
  }

  ngOnInit() {
    this.buildForm()
    this.initDataSource()
    this.initSubscriber()
  }

  private buildForm(): void {
    if (this.action === QrcodeModalActionType.CREATE) {
      this.qrcodeForm = this.fb.group({
        bizType: ['deal', Validators.required],
        tableName: [null, Validators.required],
        couponType: [null],
        couponValue: [null],
        couponRate: [null],
        description: [null]
      })
    }
    if (this.action === QrcodeModalActionType.EDIT) {
      this.qrcodeForm = this.fb.group({
        bizType: [this.data.bizType, Validators.required],
        tableName: [this.data.tableName, Validators.required],
        couponType: [this.data.couponType],
        couponValue: [this.data.couponValue],
        couponRate: [this.data.couponRate],
        description: [this.data.description]
      })
    }
  }

  private initDataSource(): void {
    this.tables$ = this.store.select(getTables)

    this.tables$.filter(e => e.length > 0).first()
    .subscribe(e => {
      this.qrcodeForm.patchValue({
        tableName: e[0].name
      })
    })
  }

  private initSubscriber(): void {
    this.store.dispatch(new FetchTableAction())
  }
}
