import { Component, Input, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NzModalSubject } from 'ng-zorro-antd'
import { FileUploader } from 'ng2-file-upload'

import { Observable } from 'rxjs/Observable'
import { GoodsType } from '../models/goodsType.model'
import { Store } from '@ngrx/store'
import { State, getAllGoodsTypes } from '../reducers'

@Component({
  selector: 'app-add-goods-modal',
  template: `
    <div class="custome-modal-container">
      <form nz-form [nzType]="'horizontal'" [formGroup]="addGoodsForm">
        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label nz-form-item-required>名称</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('name')" nzHasFeedback>
            <nz-input formControlName="name" [nzType]="'text'" [nzSize]="'large'">
            </nz-input>
            <div nz-form-explain *ngIf="getFormControlError('name', 'required')">
              {{ 'Please input your name!' | translate }}
            </div>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label nz-form-item-required>单价</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('price')" nzHasFeedback>
            <nz-input formControlName="price" [nzType]="'text'" [nzSize]="'large'">
            </nz-input>
            <div nz-form-explain *ngIf="getFormControlError('price', 'required')">
              {{ 'Please input price!' | translate }}
            </div>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label>会员价</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('vipPrice')">
            <nz-input formControlName="vipPrice" [nzType]="'text'" [nzSize]="'large'">
            </nz-input>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label>可售数量</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('totalCount')">
            <nz-input formControlName="totalCount" [nzType]="'text'" [nzSize]="'large'">
            </nz-input>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label>卡券编号</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('cardNo')">
            <nz-input formControlName="cardNo" [nzType]="'text'" [nzSize]="'large'">
            </nz-input>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label nz-form-item-required>单位</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('unit')">
            <nz-select formControlName="unit" [nzSize]="'large'">
              <nz-option [nzLabel]="'份'" [nzValue]="'份'"></nz-option>
              <nz-option [nzLabel]="'杯'" [nzValue]="'杯'"></nz-option>
            </nz-select>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label nz-form-item-required>商品类别</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('goodsType')">
            <nz-select formControlName="goodsType" [nzSize]="'large'">
              <nz-option *ngFor="let goodsType of allGoodsTypes$ | async" [nzLabel]="goodsType.name" [nzValue]="goodsType.name"></nz-option>
            </nz-select>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label>状态</label>
          </div>
          <div nz-form-control nz-col [nzSpan]="14">
            <nz-radio-group formControlName="status">
              <label nz-radio [nzValue]="1">
                <span>上架</span>
              </label>
              <label nz-radio [nzValue]="0">
                <span>下架</span>
              </label>
            </nz-radio-group>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-col [nzSpan]="6" nz-form-label>
            <label>备注</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('comment')">
            <nz-input formControlName="comment" [nzRows]="3" [nzType]="'textarea'" [nzPlaceHolder]="'填写点商品备注'" [nzSize]="'large'">
            </nz-input>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-col [nzSpan]="6" nz-form-label>
            <label>上传图片</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('comment')">
            <nz-card>
              <ng-template #body>
                <button nz-button class="ant-btn__block file-upload mt-sm">
                  <input id="file1" accept type="file" ng2FileSelect [uploader]="uploader" />
                  <i class="anticon anticon-upload"></i>
                </button>
              </ng-template>
            </nz-card>
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
export class AddGoodsModalComponent implements OnInit {
  addGoodsForm: FormGroup
  allGoodsTypes$: Observable<GoodsType[]>

  // TODO 上传图片功能未完善
  uploader: FileUploader = new FileUploader({
    url: 'https://test.com/',
    isHTML5: true
  })

  constructor(
    private subject: NzModalSubject,
    private fb: FormBuilder,
    private store: Store<State>
  ) {
    this.uploader.onAfterAddingFile = f => {
      console.log(f)
      f.upload()
    }
  }

  getFormControl(name) {
    return this.addGoodsForm.controls[name]
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

  ngOnInit() {
    this.allGoodsTypes$ = this.store.select(getAllGoodsTypes)

    this.addGoodsForm = this.fb.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
      vipPrice: [null],
      totalCount: [null],
      cardNo: [null],
      unit: ['杯', Validators.required],
      goodsType: [null, Validators.required],
      status: [1, Validators.required],
      comment: [null]
    })
  }
}
