import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModuleComponent } from './list-module.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListModuleComponent', () => {
  let component: ListModuleComponent;
  let fixture: ComponentFixture<ListModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule],
      declarations: [ ListModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
