import { Component, OnInit } from '@angular/core'

import { Router } from '@angular/router'

import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'


@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html'
})
export class RegisterSuccessComponent implements OnInit {
  totalSeconds = 5
  restSeconds$: Observable<number>
  login$: Observable<void> = new Subject<void>()

  constructor(private router: Router) {}

  ngOnInit() {
    this.restSeconds$ = Observable.interval(1e3)
      .map(e => this.totalSeconds - 1 - e)
      .startWith(this.totalSeconds)
      .takeWhile(e => e > 0)
      .takeUntil(this.login$)
      .share()

    this.restSeconds$.subscribe({
      complete: () => {
        this.router.navigate(['login'])
      }
    })
  }
}
