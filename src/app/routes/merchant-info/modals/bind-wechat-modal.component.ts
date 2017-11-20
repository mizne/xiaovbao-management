import { Component, OnInit } from '@angular/core'
import { NzModalSubject } from 'ng-zorro-antd'
import { BIND_WECHAT_HREF } from '../../../../config'

@Component({
  selector: 'app-bind-wechat-modal',
  template: `
    <div class="custome-modal-container text-center">
      <ul>
        <li>1. 请用微信扫描二维码</li>
        <li>2. 输入帐号密码绑定微信帐号</li>
      </ul>
    
      <ngx-qrcode [qrc-element-type]="'url'" [qrc-value] = "bindWechatHref">
      </ngx-qrcode>

      <div class="customize-footer">
        <button nz-button (click)="cancel()">我已绑定好了</button>
      </div>
    </div>
  `
})
export class BindWechatModalComponent implements OnInit {
  bindWechatHref = BIND_WECHAT_HREF

  cancel() {
    this.subject.destroy('onOk')
  }

  constructor(
    private subject: NzModalSubject,
  ) {
  }

  ngOnInit() {
  }

}
