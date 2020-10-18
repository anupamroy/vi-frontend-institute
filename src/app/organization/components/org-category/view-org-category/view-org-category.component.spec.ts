import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrgCategoryComponent } from './view-org-category.component';

describe('ViewOrgCategoryComponent', () => {
  let component: ViewOrgCategoryComponent;
  let fixture: ComponentFixture<ViewOrgCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOrgCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrgCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
