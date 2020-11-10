import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPaperTypeComponent } from './list-paper-type.component';

describe('ListPaperTypeComponent', () => {
  let component: ListPaperTypeComponent;
  let fixture: ComponentFixture<ListPaperTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPaperTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPaperTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
