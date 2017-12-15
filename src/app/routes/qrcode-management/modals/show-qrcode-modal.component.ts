import { Component, OnInit, Input } from '@angular/core'
import { NzModalSubject } from 'ng-zorro-antd'

import { Qrcode } from '../models/qrcode.model'

@Component({
  selector: 'app-show-qrcode-modal',
  template: `
    <div class="custome-modal-container text-center">
      <ngx-qrcode [qrc-element-type]="'url'" [qrc-value]="url">
      </ngx-qrcode>

      <div class="customize-footer">
        <button nz-button (click)="download()">下载</button>
      </div>
    </div>
  `
})
export class ShowQrcodeModalComponent implements OnInit {
  url: string

  @Input()
  set tplId(value: string) {
    this.url = `${Qrcode.URL_PREFIX}${value}`
  }

  download() {
    this.subject.next({
      url: this.url
    })
    this.subject.destroy('onOk')
  }

  constructor(
    private subject: NzModalSubject,
  ) {}

  ngOnInit() {}
}
