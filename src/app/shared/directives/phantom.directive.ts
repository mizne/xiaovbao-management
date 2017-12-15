import {
  Directive,
  Input,
  HostListener,
  OnInit,
  ElementRef,
  Renderer2,
  OnDestroy,
} from '@angular/core'

import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

import { UADetectorService } from 'app/core/services/ua-detector.service'
import { endWith } from 'rxjs-imports'

export interface Position {
  x: number
  y: number
  end: boolean
}

@Directive({ selector: '[appPhantom]' })
export class AppPhantomDirective implements OnInit, OnDestroy {
  @Input()
  set appPhantom(value: string) {
    let num: number

    if (value && !Number.isNaN(Number(value))) {
      num = Number(value)
    } else {
      num = 5
    }

    this.num = num
  }

  private num: number
  private els: Element[]
  private subscriptions: Subscription[]
  private startPos: Position

  startSub: Subject<MouseEvent> = new Subject<MouseEvent>()

  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    private ua: UADetectorService
  ) {}

  ngOnInit() {
    this.initEles()
    this.initStartPos()
    this.initDelayDrag()
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach(sub => {
        sub.unsubscribe()
      })
    }
  }

  private initEles(): void {
    this.els = Array.from({ length: this.num }, () =>
      this.el.nativeElement.cloneNode(true)
    )
    this.els.forEach(el => {
      this.rd.setStyle(el, 'display', 'none')
      this.rd.setStyle(el, 'z-index', '2000')
      document.body.appendChild(el)
    })
  }
  private initStartPos(): void {
    const nativeEle = this.el.nativeElement
    const { top, left } = nativeEle.getBoundingClientRect()
    this.startPos = {
      x: left,
      y: top,
      end: false
    }
  }

  private initDelayDrag(): void {
    const event = this.ua.isMobileBrowser() ? {
      move: 'touchmove',
      end: 'touchend'
    } : {
      move: 'mousemove',
      end: 'mouseup'
    }
    const move$: Observable<MouseEvent | TouchEvent> = Observable.fromEvent(
      document,
      event.move
    )
    const end$: Observable<MouseEvent | TouchEvent> = Observable.fromEvent(
      document,
      event.end
    )
    const drag$: Observable<Position> = this.startSub.mergeMap(e =>
      move$
        .takeUntil(end$)
        .map(ev => {
          if (ev instanceof MouseEvent) {
            return {
              x: ev.clientX,
              y: ev.clientY,
              end: false
            }
          }
          if (ev instanceof TouchEvent) {
            return {
              x: ev.changedTouches[0].clientX,
              y: ev.changedTouches[0].clientY,
              end: false
            }
          }
        })
        .let(
          endWith({
            x: this.startPos.x,
            y: this.startPos.y,
            end: true
          })
        )
    )

    const delayDrags$ = Array.from({ length: this.num }, (_, i) =>
      drag$.delay(i * 1e2)
    )
    this.subscriptions = delayDrags$.map((d$, i) => {
      return d$.subscribe(pos => {
        this.rd.setStyle(this.els[i], 'top', pos.y + 'px')
        this.rd.setStyle(this.els[i], 'left', pos.x + 'px')
        if (pos.end) {
          this.rd.setStyle(this.els[i], 'display', 'none')
        } else {
          this.rd.setStyle(this.els[i], 'display', 'block')
          this.rd.setStyle(this.els[i], 'position', 'absolute')
        }
      })
    })
  }

  @HostListener('mousedown', ['$event'])
  mousedownHandler(ev) {
    this.startSub.next(ev)
  }

  @HostListener('touchstart', ['$event'])
  touchStartHandler(ev) {
    this.startSub.next(ev)
  }
}
