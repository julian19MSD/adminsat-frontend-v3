import { TestBed } from '@angular/core/testing';

import { SharedMapReportHttpService } from './http.service';

describe('MapReportHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedMapReportHttpService = TestBed.get(SharedMapReportHttpService);
    expect(service).toBeTruthy();
  });
});
