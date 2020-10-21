import { TestBed } from '@angular/core/testing';

import { AssociatedPostService } from './associated-post.service';

describe('AssociatedPostService', () => {
  let service: AssociatedPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssociatedPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
