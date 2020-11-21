import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { EditQuotaTypeComponent } from './edit-quota-type.component';

describe('EditQuotaTypeComponent', () => {
  let component: EditQuotaTypeComponent;
  let fixture: ComponentFixture<EditQuotaTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditQuotaTypeComponent],
      providers: [

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
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuotaTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
