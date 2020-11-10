import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuotaTypeComponent } from './edit-quota-type.component';

describe('EditQuotaTypeComponent', () => {
  let component: EditQuotaTypeComponent;
  let fixture: ComponentFixture<EditQuotaTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditQuotaTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuotaTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
