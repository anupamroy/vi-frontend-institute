import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuotaTypeComponent } from './list-quota-type.component';

describe('ListQuotaTypeComponent', () => {
  let component: ListQuotaTypeComponent;
  let fixture: ComponentFixture<ListQuotaTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListQuotaTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListQuotaTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
