import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssociatedPostComponent } from './add-associated-post.component';

describe('AddAssociatedPostComponent', () => {
  let component: AddAssociatedPostComponent;
  let fixture: ComponentFixture<AddAssociatedPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssociatedPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssociatedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
