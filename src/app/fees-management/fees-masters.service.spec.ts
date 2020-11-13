import { TestBed } from '@angular/core/testing';

import { FeesMastersService } from './fees-masters.service';

describe('FeesMastersService', () => {
  let service: FeesMastersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeesMastersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
