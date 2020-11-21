import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterTestingModule } from '@angular/router/testing';
import { formContainer } from 'aws-amplify';
import { OrganizationTypeComponent } from './organization-type.component';

describe('OrganizationTypeComponent', () => {
  let component: OrganizationTypeComponent;
  let fixture: ComponentFixture<OrganizationTypeComponent>;
  const formbuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationTypeComponent ],
      providers: [{
        provide: FormBuilder, useValues : formbuilder
      }],
      imports: [HttpClientTestingModule,MatFormFieldModule, RouterTestingModule, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationTypeComponent);
    component = fixture.componentInstance;
    component.firstFormGroup = formbuilder.group({
      organizationType: new FormControl("" , Validators.required),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
