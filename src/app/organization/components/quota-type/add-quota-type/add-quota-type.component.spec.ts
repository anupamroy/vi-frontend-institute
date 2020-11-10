import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuotaTypeComponent } from './add-quota-type.component';

describe('AddQuotaTypeComponent', () => {
  let component: AddQuotaTypeComponent;
  let fixture: ComponentFixture<AddQuotaTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuotaTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuotaTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
