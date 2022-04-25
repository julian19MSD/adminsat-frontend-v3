import { TestBed } from '@angular/core/testing';

import { SharedControlZoneDetailsHttpService } from './http.service';

describe('ControlZoneDetailsHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedControlZoneDetailsHttpService = TestBed.get(SharedControlZoneDetailsHttpService);
    expect(service).toBeTruthy();
  });
});
