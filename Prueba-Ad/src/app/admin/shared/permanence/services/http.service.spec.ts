import { TestBed } from '@angular/core/testing';

import { SharedPermanenceDetailsHttpService } from './http.service';

describe('SharedPermanenceDetailsHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedPermanenceDetailsHttpService = TestBed.get(SharedPermanenceDetailsHttpService);
    expect(service).toBeTruthy();
  });
});
