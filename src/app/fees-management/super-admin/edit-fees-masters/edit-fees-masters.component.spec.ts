import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFeesMastersComponent } from './edit-fees-masters.component';

describe('EditFeesMastersComponent', () => {
  let component: EditFeesMastersComponent;
  let fixture: ComponentFixture<EditFeesMastersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFeesMastersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFeesMastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
