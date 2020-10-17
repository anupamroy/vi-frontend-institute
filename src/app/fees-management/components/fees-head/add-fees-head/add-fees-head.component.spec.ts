import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeesHeadComponent } from './add-fees-head.component';

describe('AddFeesHeadComponent', () => {
  let component: AddFeesHeadComponent;
  let fixture: ComponentFixture<AddFeesHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFeesHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeesHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
