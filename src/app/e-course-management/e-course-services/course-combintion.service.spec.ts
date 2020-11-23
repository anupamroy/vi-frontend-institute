import { TestBed } from '@angular/core/testing';

import { CourseCombintionService } from './course-combintion.service';

describe('CourseCombintionService', () => {
  let service: CourseCombintionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseCombintionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
