import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaperTypeComponent } from './edit-paper-type.component';

describe('EditPaperTypeComponent', () => {
  let component: EditPaperTypeComponent;
  let fixture: ComponentFixture<EditPaperTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPaperTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaperTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
