import { Component, Input, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { NzModalSubject, NzNotificationService } from 'ng-zorro-antd'
import { FileUploader } from 'ng2-file-upload'

import { Subject } from 'rxjs/Subject';

import { Observable } from 'rxjs/Observable'
import { Goods } from '../models/goods.model'
import { GoodsType } from '../models/goodsType.model'
import { GoodsUnit } from '../models/goodsUnit.model'

import { Store } from '@ngrx/store'
import { State, getAllGoodsTypes, getAllGoodsUnits, getAddGoodsUnitLoading } from '../reducers'
import { AddGoodsUnitAction, FetchGoodsUnitsAction } from '../goods-management/goods.action'
import { environment } from '../../../../environments/environment'

import * as R from 'ramda'

export enum GoodsModalActionType {
  CREATE, EDIT
}

@Component({
  selector: 'app-add-goods-modal',
  template: `
    <div class="custome-modal-container">
      <form nz-form [nzType]="'horizontal'" [formGroup]="goodsForm">
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
            <label nz-form-item-required>进价</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('buyPrice')" nzHasFeedback>
            <nz-input formControlName="buyPrice" [nzType]="'number'" [nzSize]="'large'">
            </nz-input>
            <div nz-form-explain *ngIf="getFormControlError('buyPrice', 'required')">
              {{ 'Please input price!' | translate }}
            </div>
            <div nz-form-explain *ngIf="getFormControlError('buyPrice', 'pattern')">
              {{ 'Wrong price format!' | translate }}
          </div>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label nz-form-item-required>单价</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('price')" nzHasFeedback>
            <nz-input formControlName="price" [nzType]="'number'" [nzSize]="'large'">
            </nz-input>
            <div nz-form-explain *ngIf="getFormControlError('price', 'required')">
              {{ 'Please input price!' | translate }}
            </div>
            <div nz-form-explain *ngIf="getFormControlError('price', 'pattern')">
              {{ 'Wrong price format!' | translate }}
          </div>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label nz-form-item-required>会员价</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('vipPrice')" nzHasFeedback>
            <nz-input formControlName="vipPrice" [nzType]="'number'" [nzSize]="'large'">
            </nz-input>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label nz-form-item-required>可售数量</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('totalCount')" nzHasFeedback>
            <nz-input formControlName="totalCount" [nzType]="'number'" [nzSize]="'large'">
            </nz-input>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label nz-form-item-required>单位</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('goodsUnitId')" nzHasFeedback>
            <nz-select formControlName="goodsUnitId" [nzSize]="'large'">
              <nz-option *ngFor="let unit of allGoodsUnits$ | async" [nzLabel]="unit.name" [nzValue]="unit.id"></nz-option>
            </nz-select>
          </div>
        </div>

        <div nz-form-item nz-row [nzGutter]="8" class="pl-lg pr-lg">
          <div nz-col [nzSpan]="8">
            <i class="anticon anticon-question-circle"></i>
            <label>没有可用单位?</label>
          </div>
          <div nz-col class="gutter-row" [nzSpan]="8">
            <nz-input [formControl]="addGoodsUnitControl" [nzType]="'text'" [nzSize]="'large'">
            </nz-input>
          </div>
          <div nz-col class="gutter-row" [nzSpan]="8">
            <button nz-button [nzType]="'primary'" [nzLoading]="addGoodsUnitLoading$ | async" 
            [disabled]="addGoodsUnitControl.invalid" (click)="addUnit()">{{ 'add' | translate }}</button>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label nz-form-item-required>商品类别</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('goodsTypeId')" nzHasFeedback>
            <nz-select formControlName="goodsTypeId" [nzSize]="'large'">
              <nz-option *ngFor="let goodsType of allGoodsTypes$ | async" 
              [nzLabel]="goodsType.name" [nzValue]="goodsType.id"></nz-option>
            </nz-select>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label nz-form-item-required>状态</label>
          </div>
          <div nz-form-control nz-col [nzSpan]="14">
            <nz-radio-group formControlName="isActive">
              <label nz-radio [nzValue]="true">
                <span>上架</span>
              </label>
              <label nz-radio [nzValue]="false">
                <span>下架</span>
              </label>
            </nz-radio-group>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-col [nzSpan]="6" nz-form-label>
            <label>备注</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('description')">
            <nz-input formControlName="description" [nzRows]="3" [nzType]="'textarea'" [nzPlaceHolder]="'填写点商品备注'" [nzSize]="'large'">
            </nz-input>
          </div>
        </div>

        <div nz-form-item nz-row>
          <div nz-col [nzSpan]="6" nz-form-label>
            <label nz-form-item-required>上传图片</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('listImageUrl')" nzHasFeedback>
            <nz-card>
              <ng-template #body>
                <button nz-button class="ant-btn__block file-upload mt-sm">
                  <input id="file1" accept type="file" ng2FileSelect [uploader]="uploader" />
                  <i class="anticon anticon-upload"></i>
                </button>

                <img *ngIf="uploadImageUrl" [src]="uploadImageUrl" width="100px" height="100px">
              </ng-template>
            </nz-card>
            <nz-input [hidden]="true" formControlName="listImageUrl" [nzType]="'text'" [nzSize]="'large'">
            </nz-input>
          </div>
        </div>
      </form>

      <div class="customize-footer">
        <button nz-button (click)="cancel()">{{ 'cancel' | translate }}</button>
        <button nz-button [nzType]="'primary'" [disabled]="goodsForm.invalid" (click)="ok()">{{ 'ok' | translate }}</button>
      </div>
    </div>
  `
})
export class AddGoodsModalComponent implements OnInit {
  goodsForm: FormGroup
  allGoodsTypes$: Observable<GoodsType[]>
  allGoodsUnits$: Observable<GoodsUnit[]>
  addGoodsUnitLoading$: Observable<boolean>

  addGoodsUnitControl = new FormControl(null, Validators.required)
  addGoodsUnitSub: Subject<void> = new Subject<void>()

  uploader: FileUploader = new FileUploader({
    url: environment.SERVER_URL + '/api/test/upload',
    isHTML5: true
  })

  uploadImageUrl = ''

  private toEditId: string

  @Input() action: GoodsModalActionType

  @Input() data: Goods

  constructor(
    private subject: NzModalSubject,
    private fb: FormBuilder,
    private store: Store<State>,
    private notify: NzNotificationService
  ) {
    this.uploader.onAfterAddingFile = f => {
      f.upload()
    }

    this.uploader.onSuccessItem = (fileItem, resp, status, headers) => {
      try {
        const file_path = JSON.parse(resp).file_path
        console.log(file_path)
        this.uploadImageUrl = environment.SERVER_URL + `/${file_path}`
        this.goodsForm.controls['listImageUrl'].setValue(this.uploadImageUrl)
      } catch (e) {
        this.notify.error('上传图片', '上传图片失败，请稍后重试！')
      }
    }
  }

  getFormControl(name) {
    return this.goodsForm.controls[name]
  }

  getFormControlError(name: string, error: string) {
    return this.getFormControl(name).dirty && this.getFormControl(name).hasError(error)
  }

  ok() {
    if (this.action === GoodsModalActionType.CREATE) {
      this.subject.next(this.goodsForm.value)
    } 
    if (this.action === GoodsModalActionType.EDIT) {
      this.subject.next(R.assoc('id', this.toEditId, this.goodsForm.value))
    }
    
    this.subject.destroy('onOk')
  }

  cancel() {
    this.subject.destroy('onCancel')
  }

  addUnit() {
    this.addGoodsUnitSub.next()
  }

  ngOnInit() {
    this.buildForm()
    this.initDataResource()
    this.initSubscriber()
  }

  private buildForm(): void {
    if (this.action === GoodsModalActionType.CREATE) {
      this.goodsForm = this.fb.group({
        name: [null, Validators.required],
        buyPrice: [null, [Validators.required, Validators.pattern(/\d+/)]],
        price: [null, [Validators.required, Validators.pattern(/\d+/)]],
        vipPrice: [null, [Validators.required, Validators.pattern(/\d+/)]],
        totalCount: [null, [Validators.required, Validators.pattern(/\d+/)]],
        goodsUnitId: [null, Validators.required],
        goodsTypeId: [null, Validators.required],
        isActive: [true, Validators.required],
        description: [null],
        listImageUrl: [null, Validators.required],
      })

      this.uploadImageUrl = ''
    }

    if (this.action === GoodsModalActionType.EDIT) {
      
      this.goodsForm = this.fb.group({
        name: [this.data.name, Validators.required],
        buyPrice: [this.data.buyPrice, [Validators.required, Validators.pattern(/\d+/)]],
        price: [this.data.price, [Validators.required, Validators.pattern(/\d+/)]],
        vipPrice: [this.data.vipPrice, [Validators.required, Validators.pattern(/\d+/)]],
        totalCount: [this.data.totalCount, [Validators.required, Validators.pattern(/\d+/)]],
        goodsUnitId: [this.data.goodsUnitId, Validators.required],
        goodsTypeId: [this.data.goodsTypeId, Validators.required],
        isActive: [this.data.isActive, Validators.required],
        description: [this.data.description],
        listImageUrl: [this.data.listImageUrl, Validators.required],
      })
      this.toEditId = this.data.id
      this.uploadImageUrl = this.data.listImageUrl
    }
    
  }

  private initDataResource(): void {
    this.allGoodsTypes$ = this.store.select(getAllGoodsTypes)
    this.allGoodsUnits$ = this.store.select(getAllGoodsUnits)
    this.addGoodsUnitLoading$ = this.store.select(getAddGoodsUnitLoading)
  }

  private initSubscriber(): void {
    this.addGoodsUnitSub.asObservable()
    .withLatestFrom(this.addGoodsUnitControl.valueChanges, (_, value) => value)
    .subscribe(value => {
      console.log('to add goods unit ' + value)

      this.store.dispatch(new AddGoodsUnitAction(value))
      this.addGoodsUnitControl.reset()
    })
  }
}
