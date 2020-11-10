import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCourseTypeComponent } from './list-course-type.component';

describe('ListCourseTypeComponent', () => {
  let component: ListCourseTypeComponent;
  let fixture: ComponentFixture<ListCourseTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCourseTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCourseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
