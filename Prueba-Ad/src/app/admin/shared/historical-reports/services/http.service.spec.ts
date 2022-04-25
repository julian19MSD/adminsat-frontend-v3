import { TestBed } from '@angular/core/testing';

import { SharedHistoricalReportsHttpService } from './http.service';

describe('HistoricalReportsHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedHistoricalReportsHttpService = TestBed.get(SharedHistoricalReportsHttpService);
    expect(service).toBeTruthy();
  });
});
