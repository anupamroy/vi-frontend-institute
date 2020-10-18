import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssociatedPostComponent } from './edit-associated-post.component';

describe('EditAssociatedPostComponent', () => {
  let component: EditAssociatedPostComponent;
  let fixture: ComponentFixture<EditAssociatedPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAssociatedPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssociatedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
