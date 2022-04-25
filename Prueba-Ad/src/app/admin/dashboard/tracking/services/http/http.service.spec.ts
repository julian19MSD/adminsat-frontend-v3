import { TestBed } from '@angular/core/testing';

import { DashboardTrackingHttpService } from './http.service';

describe('DashboardTrackingHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardTrackingHttpService = TestBed.get(DashboardTrackingHttpService);
    expect(service).toBeTruthy();
  });
});
