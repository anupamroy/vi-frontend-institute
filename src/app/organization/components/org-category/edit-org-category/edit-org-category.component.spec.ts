import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrgCategoryComponent } from './edit-org-category.component';

describe('EditOrgCategoryComponent', () => {
  let component: EditOrgCategoryComponent;
  let fixture: ComponentFixture<EditOrgCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrgCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrgCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
