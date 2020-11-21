import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { QuotaTypeService } from './quota-type.service';

describe('QuotaTypeService', () => {
  let service: QuotaTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(QuotaTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
