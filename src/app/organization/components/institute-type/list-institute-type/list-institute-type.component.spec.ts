import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInstituteTypeComponent } from './list-institute-type.component';

describe('ListInstituteTypeComponent', () => {
  let component: ListInstituteTypeComponent;
  let fixture: ComponentFixture<ListInstituteTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInstituteTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInstituteTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
