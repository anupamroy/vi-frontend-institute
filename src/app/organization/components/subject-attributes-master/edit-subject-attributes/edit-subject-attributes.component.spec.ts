import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { EditSubjectAttributesComponent } from './edit-subject-attributes.component';

describe('EditSubjectAttributesComponent', () => {
  let component: EditSubjectAttributesComponent;
  let fixture: ComponentFixture<EditSubjectAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSubjectAttributesComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [
          FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                property: 'masterId',
                someId: 123
              }
            }
          }
        }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubjectAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
