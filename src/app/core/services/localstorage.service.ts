import { Injectable } from '@angular/core'

import * as store from 'store'

@Injectable()
export class LocalStorageService {
  get tenantId() {
    return this.get('tenantId')
  }

  set(key: string, value: any): LocalStorageService {
    store.set(key, value)
    return this
  }

  get(key: string, optionalDefaultValue?: any) {
    return store.get(key)
  }

  remove(key: string | string[]): LocalStorageService {
    if (Array.isArray(key)) {
      key.forEach(e => this.remove(e))
    } else {
      store.remove(key)
    }
    return this
  }

  clear() {
    store.clearAll()
  }
}
