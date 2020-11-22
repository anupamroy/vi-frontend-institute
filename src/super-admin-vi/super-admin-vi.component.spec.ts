import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminViComponent } from './super-admin-vi.component';

describe('SuperAdminViComponent', () => {
  let component: SuperAdminViComponent;
  let fixture: ComponentFixture<SuperAdminViComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminViComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminViComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
