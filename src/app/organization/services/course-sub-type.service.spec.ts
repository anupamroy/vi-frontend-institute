import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CourseSubTypeService } from './course-sub-type.service';

describe('CourseSubTypeService', () => {
  let service: CourseSubTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(CourseSubTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
