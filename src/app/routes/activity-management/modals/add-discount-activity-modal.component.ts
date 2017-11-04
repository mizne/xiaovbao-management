import { Component, Input, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { NzModalSubject, NzNotificationService } from 'ng-zorro-antd'
import { FileUploader } from 'ng2-file-upload'

import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/first'
import 'rxjs/add/operator/filter'

import { Store } from '@ngrx/store'
import { State, getQrcodeTpls } from '../reducers'
import { FetchQrcodeTemplateAction } from '../discount-activity/discount-activity.action'
import * as R from 'ramda'

import { Qrcode } from '../../qrcode-management/models/qrcode.model'

@Component({
  selector: 'app-add-discount-activity-modal',
  template: `
    <div class="custome-modal-container">
      <form nz-form [nzType]="'horizontal'" [formGroup]="activityForm">
        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label nz-form-item-required>原价</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('originalPrice')" nzHasFeedback>
            <nz-input formControlName="originalPrice" [nzType]="'text'" [nzSize]="'large'">
            </nz-input>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label nz-form-item-required>面向用户</label>
          </div>
          <div nz-form-control nz-col [nzSpan]="14">
            <nz-radio-group formControlName="target">
              <label nz-radio [nzValue]="'all'">
                <span>全部用户</span>
              </label>
              <label nz-radio [nzValue]="'new'">
                <span>仅限门店新客</span>
              </label>
            </nz-radio-group>
          </div>
        </div>


        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label nz-form-item-required>折扣</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('discount')" nzHasFeedback>
            <nz-input-number formControlName="discount" [nzMin]="0" [nzMax]="1" [nzStep]="0.1" [nzSize]="'large'">
            </nz-input-number>
            <div nz-form-explain *ngIf="getFormControlError('discount', 'required')">
              请输入折扣
            </div>
            <div nz-form-extra>
              折扣在0-1之间
            </div>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label nz-form-item-required>每单限购</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('limitPerOrder')" nzHasFeedback>
            <nz-input-number formControlName="limitPerOrder" [nzMin]="-1" [nzStep]="1" [nzSize]="'large'">
            </nz-input-number>
            <div nz-form-explain *ngIf="getFormControlError('limitPerOrder', 'required')">
              请输入限购数量
            </div>
            <div nz-form-extra>
              不限购填-1
            </div>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label nz-form-item-required>二维码选择</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('qrcodeTemplateId')" nzHasFeedback>
            <nz-select formControlName="qrcodeTemplateId" [nzSize]="'large'">
              <nz-option *ngFor="let tpl of qrcodeTpls$ | async" [nzLabel]="tpl.id" [nzValue]="tpl.id"></nz-option>
            </nz-select>
          </div>
        </div>
      </form>

      <div class="customize-footer">
        <button nz-button (click)="cancel()">{{ 'cancel' | translate }}</button>
        <button nz-button [nzType]="'primary'" [disabled]="activityForm.invalid" (click)="ok()">{{ 'ok' | translate }}</button>
      </div>
    </div>
  `
})
export class AddDiscountActivityModalComponent implements OnInit {
  activityForm: FormGroup
  qrcodeTpls$: Observable<Qrcode[]>

  @Input() goodsPrice: number
  @Input() goodsId: string
  @Input() goodsName: string

  constructor(
    private subject: NzModalSubject,
    private fb: FormBuilder,
    private store: Store<State>
  ) {}

  getFormControl(name) {
    return this.activityForm.controls[name]
  }

  getFormControlError(name: string, error: string) {
    return (
      this.getFormControl(name).dirty &&
      this.getFormControl(name).hasError(error)
    )
  }

  ok() {
    this.subject.next(this.activityForm.value)
    this.subject.destroy('onOk')
  }

  cancel() {
    this.subject.destroy('onCancel')
  }

  ngOnInit() {
    this.buildForm()
    this.initDataResource()
    this.initSubscriber()
  }

  private buildForm(): void {
    this.activityForm = this.fb.group({
      goodsId: this.goodsId,
      goodsName: this.goodsName,
      couponRate: 0,
      originalPrice: [this.goodsPrice, Validators.required],
      target: ['all', Validators.required],
      discount: [0.8, [Validators.required]],
      limitPerOrder: [10, [Validators.required]],
      qrcodeTemplateId: [null, Validators.required]
    })
  }

  private initDataResource(): void {
    this.qrcodeTpls$ = this.store.select(getQrcodeTpls)

    this.qrcodeTpls$
      .filter(e => e.length > 0)
      .first()
      .subscribe(tpls => {
        this.activityForm.patchValue({
          qrcodeTemplateId: tpls[0].id
        })
      })
  }

  private initSubscriber(): void {
    this.store.dispatch(new FetchQrcodeTemplateAction())
  }
}
