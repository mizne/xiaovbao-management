import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NzModalSubject } from 'ng-zorro-antd'

@Component({
  selector: 'app-add-goods-type-modal',
  template: `
    <div class="custome-modal-container">
    <form nz-form [nzType]="'horizontal'" [formGroup]="addGoodsTypeForm">
    <div nz-form-item nz-row>
      <div nz-form-label nz-col [nzSpan]="6">
        <label nz-form-item-required>商品类别</label>
      </div>
      <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('goodsTypeName')" nzHasFeedback>
        <nz-input formControlName="goodsTypeName" [nzType]="'text'" [nzSize]="'large'">
        </nz-input>
        <div nz-form-explain *ngIf="getFormControlError('goodsTypeName', 'required')">
          请输入商品类别
        </div>
      </div>
    </div>
    </form>

      <div class="customize-footer">
        <button nz-button (click)="cancel()">{{ 'cancel' | translate }}</button>
        <button nz-button [nzType]="'primary'" [disabled]="addGoodsTypeForm.invalid" (click)="ok()">{{ 'ok' | translate }}</button>
      </div>
    </div>
  `
})
export class AddGoodsTypeModalComponent implements OnInit {

  addGoodsTypeForm: FormGroup

  getFormControl(name) {
    return this.addGoodsTypeForm.controls[name]
  }

  getFormControlError(name: string, error: string) {
    return this.getFormControl(name).dirty && this.getFormControl(name).hasError(error)
  }

  ok() {
    this.subject.next(this.addGoodsTypeForm.value)
    this.subject.destroy('onOk')
  }

  cancel() {
    this.subject.destroy('onCancel')
  }

  constructor(
    private subject: NzModalSubject,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.buildForm()
  }

  private buildForm() {
    this.addGoodsTypeForm = this.fb.group({
      goodsTypeName: [null, Validators.required]
    })
  }
}
