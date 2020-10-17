import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInstituteTypeComponent } from './edit-institute-type.component';

describe('EditInstituteTypeComponent', () => {
  let component: EditInstituteTypeComponent;
  let fixture: ComponentFixture<EditInstituteTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInstituteTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInstituteTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
