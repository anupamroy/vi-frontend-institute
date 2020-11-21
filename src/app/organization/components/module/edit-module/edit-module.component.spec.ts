import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModuleComponent } from './edit-module.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

describe('EditModuleComponent', () => {
  let component: EditModuleComponent;
  let fixture: ComponentFixture<EditModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ActivatedRoute, 
          useValue: { queryParams: of(
            { params: '{"masterId": 123, "parentModule":"parentModule", "connectedModules" : "connectedModules", "moduleName": "moduleName"}' }
            ) } },
      ],
      declarations: [EditModuleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
