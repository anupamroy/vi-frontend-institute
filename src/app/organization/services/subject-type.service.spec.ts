import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SubjectTypeService } from './subject-type.service';

describe('SubjectTypeService', () => {
  let service: SubjectTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(SubjectTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
