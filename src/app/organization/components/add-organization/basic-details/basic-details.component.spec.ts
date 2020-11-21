import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSelectModule } from '@angular/material/select';
import { validatorForFormControl } from '../common/Validations/MyErrorStateMatcher';

import { BasicDetailsComponent } from './basic-details.component';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BasicDetailsComponent', () => {
  let component: BasicDetailsComponent;
  let fixture: ComponentFixture<BasicDetailsComponent>;
  const formbuilder : FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicDetailsComponent ],
      providers: [ { provide: FormBuilder, useValue: formbuilder } ],
      imports: [HttpClientTestingModule, BrowserAnimationsModule, MatFormFieldModule, MatSelectModule, RouterTestingModule, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDetailsComponent);
    component = fixture.componentInstance;
    component.secondFormGroup = formbuilder.group({
      instituteTypeSelector: new FormControl("" , Validators.required),
      orgName: new FormControl('orgName', validatorForFormControl("")),
      orgShortCode: new FormControl('ORG', validatorForFormControl(""))
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
