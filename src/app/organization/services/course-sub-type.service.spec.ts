import { TestBed } from '@angular/core/testing';

import { CourseSubTypeService } from './course-sub-type.service';

describe('CourseSubTypeService', () => {
  let service: CourseSubTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseSubTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
