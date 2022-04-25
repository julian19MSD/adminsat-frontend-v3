import { TestBed } from '@angular/core/testing';

import { ProfileHttpService } from './http.service';

describe('DeviceDetailsHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileHttpService = TestBed.get(ProfileHttpService);
    expect(service).toBeTruthy();
  });
});
