import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ListOrganizationService } from './list-organization.service';

describe('ListOrganizationService', () => {
  let service: ListOrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(ListOrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
