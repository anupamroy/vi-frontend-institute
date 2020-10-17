import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFeesHeadComponent } from './list-fees-head.component';

describe('ListFeesHeadComponent', () => {
  let component: ListFeesHeadComponent;
  let fixture: ComponentFixture<ListFeesHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFeesHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFeesHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
