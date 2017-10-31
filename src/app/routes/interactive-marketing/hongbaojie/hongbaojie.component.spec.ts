import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HongbaojieComponent } from './hongbaojie.component';

describe('HongbaojieComponent', () => {
  let component: HongbaojieComponent;
  let fixture: ComponentFixture<HongbaojieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HongbaojieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HongbaojieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
