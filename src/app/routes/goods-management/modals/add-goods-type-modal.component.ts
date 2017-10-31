import { Component, Input, OnInit } from '@angular/core'
import { NzModalSubject } from 'ng-zorro-antd'

@Component({
  selector: 'app-add-goods-type-modal',
  template: `
    <div class="custome-modal-container">
      <div nz-row [nzGutter]="16">
        <div nz-col [nzSpan]="6">
            <label for="name">商品类别</label>
        </div>
        <div nz-col [nzSpan]="14">
            <nz-input [nzType]="'text'" [(ngModel)]="inputValue"></nz-input>
        </div>
      </div>

      <div class="customize-footer">
        <button nz-button (click)="cancel()">{{ 'cancel' | translate }}</button>
        <button nz-button [nzType]="'primary'" (click)="ok()">{{ 'ok' | translate }}</button>
      </div>
    </div>
  `
})
export class AddGoodsTypeModalComponent implements OnInit {
  inputValue = ''

  ok() {
    this.subject.next({
      data: this.inputValue
    })
    this.subject.destroy('onOk')
  }

  cancel() {
    this.subject.destroy('onCancel')
  }

  constructor(private subject: NzModalSubject) {
  }

  ngOnInit() {}
}
