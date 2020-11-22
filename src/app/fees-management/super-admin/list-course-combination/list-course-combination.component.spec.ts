import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCourseCombinationComponent } from './list-course-combination.component';

describe('ListCourseCombinationComponent', () => {
  let component: ListCourseCombinationComponent;
  let fixture: ComponentFixture<ListCourseCombinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCourseCombinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCourseCombinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
