import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAssociatedPostComponent } from './list-associated-post.component';

describe('ListAssociatedPostComponent', () => {
  let component: ListAssociatedPostComponent;
  let fixture: ComponentFixture<ListAssociatedPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAssociatedPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAssociatedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
