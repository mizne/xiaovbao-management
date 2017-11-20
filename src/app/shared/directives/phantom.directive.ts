import {
  Directive,
  Input,
  HostListener,
  OnInit,
  ElementRef,
  Renderer2
} from '@angular/core'

import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
export interface Position {
  x: number
  y: number
  end: boolean
}

@Directive({ selector: '[appPhantom]' })
export class AppPhantomDirective implements OnInit {
  @Input()
  set appPhantom(value: string) {
    this.num = value ? Number(value) : 3
  }

  private num: number

  mousedownSub: Subject<MouseEvent> = new Subject<MouseEvent>()
  mousemoveSub: Subject<MouseEvent> = new Subject<MouseEvent>()
  mouseupSub: Subject<MouseEvent> = new Subject<MouseEvent>()

  constructor(private el: ElementRef, private rd: Renderer2) {
  }

  ngOnInit() {
    const els = Array.from({ length: this.num }, () =>
      this.el.nativeElement.cloneNode(true)
    )
    els.forEach(el => {
      this.rd.setStyle(el, 'display', 'none')
      this.rd.setStyle(el, 'z-index', '2000')
      document.body.appendChild(el)
    })

    const nativeEle = this.el.nativeElement
    const { top, left } = nativeEle.getBoundingClientRect()
    const move$: Observable<MouseEvent> = Observable.fromEvent(
      document,
      'mousemove'
    )
    const mouseup$: Observable<MouseEvent> = Observable.fromEvent(
      document,
      'mouseup'
    )
    const drag$ = this.mousedownSub.mergeMap(e =>
      move$.takeUntil(mouseup$).let(obs => {
        return new Observable(observer => {
          return obs.subscribe({
            next: ev =>
              observer.next({
                x: (ev as MouseEvent).clientX,
                y: (ev as MouseEvent).clientY,
                end: false
              }),
            error: ev => observer.error(ev),
            complete: () => {
              observer.next({
                x: left,
                y: top,
                end: true
              })
            }
          })
        }) as Observable<Position>
      })
    )

    const delayDrags$ = Array.from({ length: this.num }, (_, i) =>
      drag$.delay(i * 1e2)
    )

    delayDrags$.forEach((d$, i) => {
      d$.subscribe(pos => {
        this.rd.setStyle(els[i], 'top', pos.y + 'px')
        this.rd.setStyle(els[i], 'left', pos.x + 'px')
        if (pos.end) {
          this.rd.setStyle(els[i], 'display', 'none')
        } else {
          this.rd.setStyle(els[i], 'display', 'block')
          this.rd.setStyle(els[i], 'position', 'absolute')
        }
      })
    })
  }

  @HostListener('mousedown', ['$event'])
  mousedownHandler(ev) {
    this.mousedownSub.next(ev)
  }

  @HostListener('touchstart', ['$event'])
  touchStartHandler(ev) {
    this.mousedownSub.next(ev)
  }

}
