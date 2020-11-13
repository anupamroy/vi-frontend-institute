import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeesMastersComponent } from './add-fees-masters.component';

describe('AddFeesMastersComponent', () => {
  let component: AddFeesMastersComponent;
  let fixture: ComponentFixture<AddFeesMastersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFeesMastersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeesMastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
