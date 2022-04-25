import { TestBed } from '@angular/core/testing';

import { SharedZonesHttpService } from './http.service';

describe('SharedZonesHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedZonesHttpService = TestBed.get(SharedZonesHttpService);
    expect(service).toBeTruthy();
  });
});
