import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AddQuotaTypeComponent } from './add-quota-type.component';

describe('AddQuotaTypeComponent', () => {
  let component: AddQuotaTypeComponent;
  let fixture: ComponentFixture<AddQuotaTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuotaTypeComponent ],
      providers: [FormBuilder],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuotaTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
