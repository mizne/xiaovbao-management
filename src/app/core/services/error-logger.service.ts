import { Injectable } from '@angular/core'
import * as Raven from 'raven-js'


export interface ErrorOptions {
  module: string
  method: string
  description: string
}

@Injectable()
export class ErrorLoggerService {
  constructor() {
    Raven.config(
      'https://00c4d9765ab6484eaa9b84b8a5de210a@sentry.io/258086'
    ).install()
  }

  error(options: ErrorOptions): any {
    const msg = `Module: ${options.module}, Method: ${
      options.method
    }, description: ${options.description}`

    return Raven.captureMessage(msg)
  }

  info(options: ErrorOptions): any {
    const msg = `Module: ${options.module}, Method: ${
      options.method
    }, description: ${options.description}`

    return Raven.captureMessage(msg, {
      level: 'info'
    })
  }
}
