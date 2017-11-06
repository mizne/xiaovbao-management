import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'

// 保留上一次 文件名 用于检测如果是同一个文件的日志 则不用再次打印文件名
let lastPrintOfFileName = ''

@Injectable()
export class LoggerFactory {
  constructor() {}

  createLogger(fileName): Logger {
    return new Logger(fileName)
  }
}

const loggerLevels = {
  TRACE: {
    level: 0,
    method: 'trace',
    style: 'color: #999; font-weight: bold;',
    emoji: {
      unicode: '\u{1F60F}',
      style: 'font-size: 100%; color: #999; font-weight: bold;'
    }
  },
  DEBUG: {
    level: 1,
    method: 'debug',
    style: 'color: #13ce66; font-weight: bold;',
    emoji: {
      unicode: '\u{1F636}',
      style: 'font-size: 100%; color: #13ce66; font-weight: bold;'
    }
  },
  INFO: {
    level: 2,
    method: 'info',
    style: 'color: #50bfff; font-weight: bold;',
    emoji: {
      unicode: '\u{1F614}',
      style: 'font-size: 100%; color: #50bfff; font-weight: bold;'
    }
  },
  WARN: {
    level: 3,
    method: 'warn',
    style: 'color: #f7ba2a; font-weight: bold;',
    emoji: {
      unicode: '\u{1F632}',
      style: 'font-size: 100%; color: #f7ba2a; font-weight: bold;'
    }
  },
  ERROR: {
    level: 4,
    method: 'error',
    style: 'color: #ff4949; font-weight: bold;',
    emoji: {
      unicode: '\u{1F631}',
      style: 'font-size: 100%; color: #ff4949; font-weight: bold;'
    }
  },
  FATAL: {
    level: 5,
    method: 'error',
    style: 'color: #dd29e8; font-weight: bold;',
    emoji: {
      unicode: '\u{1F635}',
      style: 'font-size: 100%; color: #dd29e8; font-weight: bold;'
    }
  }
}

// 当前日志等级
const currentLevel = environment.loggerLevel

export class Logger {
  constructor(private fileName: string) {}

  group(...args) {
    if (currentLevel <= loggerLevels.DEBUG.level) {
      console.groupCollapsed(...args)
    }
  }

  groupEnd(...args) {
    if (currentLevel <= loggerLevels.DEBUG.level) {
      this.debug(...args)
      console.groupEnd()
    }
  }

  trace(...args) {
    this._log(loggerLevels.TRACE)(...args)
  }

  debug(...args) {
    this._log(loggerLevels.DEBUG)(...args)
  }

  info(...args) {
    this._log(loggerLevels.INFO)(...args)
  }

  warn(...args) {
    this._log(loggerLevels.WARN)(...args)
  }

  error(...args) {
    this._log(loggerLevels.ERROR)(...args)
  }

  fatal(...args) {
    this._log(loggerLevels.FATAL)(...args)
  }

  private _log(level) {
    return (...args) => {
      if (currentLevel <= level.level) {
        if (this.fileName !== lastPrintOfFileName) {
          console[level.method](
            `%c${this.fileName}`,
            level.style
          )
          lastPrintOfFileName = this.fileName
        }

        console[level.method](`%c${level.emoji.unicode}`, level.emoji.style, ...args)
      }
    }
  }
}
