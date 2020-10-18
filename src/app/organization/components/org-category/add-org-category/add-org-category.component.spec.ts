import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrgCategoryComponent } from './add-org-category.component';

describe('AddOrgCategoryComponent', () => {
  let component: AddOrgCategoryComponent;
  let fixture: ComponentFixture<AddOrgCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrgCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrgCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
