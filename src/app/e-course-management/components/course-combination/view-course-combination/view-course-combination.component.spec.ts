import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseCombinationComponent } from './view-course-combination.component';

describe('ViewCourseCombinationComponent', () => {
  let component: ViewCourseCombinationComponent;
  let fixture: ComponentFixture<ViewCourseCombinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCourseCombinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCourseCombinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
