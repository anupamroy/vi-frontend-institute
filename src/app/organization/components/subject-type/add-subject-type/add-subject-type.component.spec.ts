import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubjectTypeComponent } from './add-subject-type.component';

describe('AddSubjectTypeComponent', () => {
  let component: AddSubjectTypeComponent;
  let fixture: ComponentFixture<AddSubjectTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubjectTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubjectTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
