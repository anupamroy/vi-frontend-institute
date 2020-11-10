import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseSubTypeComponent } from './add-course-sub-type.component';

describe('AddCourseSubTypeComponent', () => {
  let component: AddCourseSubTypeComponent;
  let fixture: ComponentFixture<AddCourseSubTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCourseSubTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseSubTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
