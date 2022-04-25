import { TestBed } from '@angular/core/testing';

import { RouteDetailsHttpService } from './route-details-http.service';

describe('RouteDetailsHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouteDetailsHttpService = TestBed.get(RouteDetailsHttpService);
    expect(service).toBeTruthy();
  });
});
