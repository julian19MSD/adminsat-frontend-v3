import { TestBed } from '@angular/core/testing';

import { NoveltyHttpService } from './http.service';

describe('NoveltyHttpServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoveltyHttpService = TestBed.get(NoveltyHttpService);
    expect(service).toBeTruthy();
  });
});
