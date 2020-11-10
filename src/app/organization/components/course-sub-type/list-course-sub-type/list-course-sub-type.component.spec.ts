import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCourseSubTypeComponent } from './list-course-sub-type.component';

describe('ListCourseSubTypeComponent', () => {
  let component: ListCourseSubTypeComponent;
  let fixture: ComponentFixture<ListCourseSubTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCourseSubTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCourseSubTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
