import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubjectAttributesComponent } from './edit-subject-attributes.component';

describe('EditSubjectAttributesComponent', () => {
  let component: EditSubjectAttributesComponent;
  let fixture: ComponentFixture<EditSubjectAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSubjectAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubjectAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
