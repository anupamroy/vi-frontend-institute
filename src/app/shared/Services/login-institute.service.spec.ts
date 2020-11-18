import { TestBed } from '@angular/core/testing';

import { LoginInstituteService } from './login-institute.service';

describe('LoginInstituteService', () => {
  let service: LoginInstituteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginInstituteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
