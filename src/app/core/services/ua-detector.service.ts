import { Injectable } from '@angular/core';
import * as uaDetector from 'ua-discover'

@Injectable()
export class UADetectorService {

  constructor() { }

  isWechat() {
    return uaDetector.browser.isWechat
  }

  isPCBrowser() {
    return !uaDetector.browser.isMobile
  }

  isMobileBrowser() {
    return uaDetector.browser.isMobile
  }
}
