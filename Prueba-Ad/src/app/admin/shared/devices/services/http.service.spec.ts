import { TestBed } from '@angular/core/testing';

import { SharedDeviceHttpService } from './http.service';

describe('DeviceDetailsHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedDeviceHttpService = TestBed.get(SharedDeviceHttpService);
    expect(service).toBeTruthy();
  });
});
