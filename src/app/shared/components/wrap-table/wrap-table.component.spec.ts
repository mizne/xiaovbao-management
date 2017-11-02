import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapTableComponent } from './wrap-table.component';

describe('WrapTableComponent', () => {
  let component: WrapTableComponent;
  let fixture: ComponentFixture<WrapTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrapTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
