import { TestBed } from '@angular/core/testing';

import { SharedWorkdayDetailsHttpService } from './http.service';

describe('SharedWorkdayDetailsHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedWorkdayDetailsHttpService = TestBed.get(SharedWorkdayDetailsHttpService);
    expect(service).toBeTruthy();
  });
});
