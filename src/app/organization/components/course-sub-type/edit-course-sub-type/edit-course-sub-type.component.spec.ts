import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseSubTypeComponent } from './edit-course-sub-type.component';

describe('EditCourseSubTypeComponent', () => {
  let component: EditCourseSubTypeComponent;
  let fixture: ComponentFixture<EditCourseSubTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCourseSubTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseSubTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
