import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SubjectAttributeService } from './subject-attribute.service';

describe('SubjectAttributeService', () => {
  let service: SubjectAttributeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(SubjectAttributeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
