import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFeesHeadComponent } from './edit-fees-head.component';

describe('EditFeesHeadComponent', () => {
  let component: EditFeesHeadComponent;
  let fixture: ComponentFixture<EditFeesHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFeesHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFeesHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
