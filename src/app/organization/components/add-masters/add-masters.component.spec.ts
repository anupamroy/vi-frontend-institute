import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMastersComponent } from './add-masters.component';

describe('AddDashboardComponent', () => {
  let component: AddMastersComponent;
  let fixture: ComponentFixture<AddMastersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMastersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
