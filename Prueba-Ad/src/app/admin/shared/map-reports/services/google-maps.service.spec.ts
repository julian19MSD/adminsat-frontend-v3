import { TestBed } from '@angular/core/testing';

import { SharedGoogleMapsService } from './google-maps.service';

describe('GoogleMapsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedGoogleMapsService = TestBed.get(SharedGoogleMapsService);
    expect(service).toBeTruthy();
  });
});
