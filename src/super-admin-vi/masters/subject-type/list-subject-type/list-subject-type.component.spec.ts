import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubjectTypeComponent } from './list-subject-type.component';

describe('ListSubjectTypeComponent', () => {
  let component: ListSubjectTypeComponent;
  let fixture: ComponentFixture<ListSubjectTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSubjectTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSubjectTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
