import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/combineLatest'
import 'rxjs/add/observable/interval'
import 'rxjs/add/observable/zip'
import 'rxjs/add/observable/throw'
import 'rxjs/add/observable/merge'
import 'rxjs/add/observable/timer'

import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/takeWhile'
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/let'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/withLatestFrom'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/first'
import 'rxjs/add/operator/repeat'
import 'rxjs/add/operator/skip'
import 'rxjs/add/operator/takeUntil'
import 'rxjs/add/operator/concatMap'

import { Observable } from 'rxjs/Observable'

export function endWith<T>(value: T) {
  return function(obs: Observable<T>): Observable<T> {
    return new Observable(observer => {
      return obs.subscribe({
        next: pos => observer.next(pos),
        error: ev => observer.error(ev),
        complete: () => {
          observer.next(value)
          observer.complete()
        }
      })
    })
  }
}
