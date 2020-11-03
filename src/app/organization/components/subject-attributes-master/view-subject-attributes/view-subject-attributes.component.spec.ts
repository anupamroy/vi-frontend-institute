import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubjectAttributesComponent } from './view-subject-attributes.component';

describe('ViewSubjectAttributesComponent', () => {
  let component: ViewSubjectAttributesComponent;
  let fixture: ComponentFixture<ViewSubjectAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSubjectAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubjectAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
