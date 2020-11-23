import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseCombinationComponent } from './add-course-combination.component';

describe('AddCourseCombinationComponent', () => {
  let component: AddCourseCombinationComponent;
  let fixture: ComponentFixture<AddCourseCombinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCourseCombinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseCombinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
