import { Component, Input, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { NzModalSubject } from 'ng-zorro-antd'

@Component({
  selector: 'app-edit-vip-level-settings-modal',
  template: `
    <div class="custome-modal-container">
      <form nz-form [nzType]="'horizontal'" [formGroup]="editVipLevelSettingsForm">
        <div nz-form-item nz-row>
          <div nz-form-label nz-col [nzSpan]="6">
            <label nz-form-item-required>等级名称</label>
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
            <label nz-form-item-required>兑换比例</label>
          </div>
          <div nz-col [nzSpan]="14" nz-form-control [nzValidateStatus]="getFormControl('ratio')">
            <nz-input formControlName="ratio" [nzType]="'text'" [nzSize]="'large'">
            </nz-input>
            <div nz-form-explain *ngIf="getFormControlError('ratio', 'required')">
              {{ 'Please input your ratio!' | translate }}
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
export class EditVipLevelSettingsModalComponent implements OnInit {
  editVipLevelSettingsForm: FormGroup

  _level: number
  _ratio: string

  @Input()
  set level(value: number) {
    this._level = value
  }
  @Input()
  set ratio(value: string) {
    this._ratio = value
  }

  constructor(
    private subject: NzModalSubject,
    private fb: FormBuilder,
  ) {
  }

  getFormControl(name) {
    return this.editVipLevelSettingsForm.controls[name]
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

  birthDayValidator = (control: FormControl): any => {
    if (new Date(control.value) > new Date()) {
      return { expired: true, error: true }
    }
  };

  ngOnInit() {
    this.editVipLevelSettingsForm = this.fb.group({
      level: [this._level, Validators.required],
      ratio: [this._ratio, Validators.required],
    })
  }
}
