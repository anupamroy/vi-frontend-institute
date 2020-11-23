import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseCombinationComponent } from './edit-course-combination.component';

describe('EditCourseCombinationComponent', () => {
  let component: EditCourseCombinationComponent;
  let fixture: ComponentFixture<EditCourseCombinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCourseCombinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseCombinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
