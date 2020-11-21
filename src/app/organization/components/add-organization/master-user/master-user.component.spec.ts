import { HarnessLoader } from '@angular/cdk/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormsModule, RadioControlValueAccessor, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatRadioButtonHarness, MatRadioGroupHarness} from '@angular/material/radio/testing';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { RouterTestingModule } from '@angular/router/testing';

import { MasterUserComponent } from './master-user.component';

describe('MasterUserComponent', () => {
  let component: MasterUserComponent;
  let fixture: ComponentFixture<MasterUserComponent>;
  const formbuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterUserComponent ],
      providers: [{ provide: FormBuilder, useValue: formbuilder } ],
      imports: [HttpClientTestingModule, MatRadioModule, MatFormFieldModule, RouterTestingModule, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(MasterUserComponent);
    component = fixture.componentInstance;
    // component.fifthFormGroup = formbuilder.group({
    //   firstName: new FormControl('', Validators.required),
    //   middleName: new FormControl(''),
    //   lastName: new FormControl(''),
    //   emailAddress: new FormControl('', Validators.required),
    //   phoneNumber: new FormControl('', Validators.required),
    //   authType: new FormControl('mfa', Validators.required),
    //   password: new FormControl(''),
    //   confirmPassword: new FormControl(''),
    // });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
