import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMastersComponent } from './view-masters.component';

describe('ViewMastersComponent', () => {
  let component: ViewMastersComponent;
  let fixture: ComponentFixture<ViewMastersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMastersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
