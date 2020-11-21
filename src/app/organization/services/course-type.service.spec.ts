import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CourseTypeService } from './course-type.service';

describe('CourseTypeService', () => {
  let service: CourseTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(CourseTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
