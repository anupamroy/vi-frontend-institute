import { TestBed } from '@angular/core/testing';

import { SubjectAttributeService } from './subject-attribute.service';

describe('SubjectAttributeService', () => {
  let service: SubjectAttributeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectAttributeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
