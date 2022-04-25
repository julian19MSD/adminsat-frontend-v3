import { TestBed } from '@angular/core/testing';

import { TrackingHttpService } from './http.service';

describe('MapReportHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrackingHttpService = TestBed.get(TrackingHttpService);
    expect(service).toBeTruthy();
  });
});
