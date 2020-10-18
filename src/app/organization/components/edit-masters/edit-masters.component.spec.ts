import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMastersComponent } from './edit-masters.component';

describe('EditMastersComponent', () => {
  let component: EditMastersComponent;
  let fixture: ComponentFixture<EditMastersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMastersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
