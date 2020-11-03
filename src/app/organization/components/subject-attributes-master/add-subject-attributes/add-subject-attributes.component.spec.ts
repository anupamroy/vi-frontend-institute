import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubjectAttributesComponent } from './add-subject-attributes.component';

describe('AddSubjectAttributesComponent', () => {
  let component: AddSubjectAttributesComponent;
  let fixture: ComponentFixture<AddSubjectAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubjectAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubjectAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
