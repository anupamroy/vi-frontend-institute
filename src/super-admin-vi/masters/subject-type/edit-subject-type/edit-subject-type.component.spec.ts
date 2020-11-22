import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubjectTypeComponent } from './edit-subject-type.component';

describe('EditSubjectTypeComponent', () => {
  let component: EditSubjectTypeComponent;
  let fixture: ComponentFixture<EditSubjectTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSubjectTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubjectTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
