import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFeesMastersComponent } from './list-fees-masters.component';

describe('ListFeesMastersComponent', () => {
  let component: ListFeesMastersComponent;
  let fixture: ComponentFixture<ListFeesMastersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFeesMastersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFeesMastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
