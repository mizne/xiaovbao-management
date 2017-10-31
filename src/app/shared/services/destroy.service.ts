import { Subject } from 'rxjs/Subject'
import { Injectable, OnDestroy } from '@angular/core'

@Injectable()
export class DestroyService extends Subject<void> implements OnDestroy {
  constructor() {
    super()
    console.log('destroy service constructor')
  }

  ngOnDestroy() {
    console.log('destroy service destroy hook')
    this.next()
    this.complete()
  }
}
