import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountActivityComponent } from './discount-activity.component';

describe('DiscountActivityComponent', () => {
  let component: DiscountActivityComponent;
  let fixture: ComponentFixture<DiscountActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
