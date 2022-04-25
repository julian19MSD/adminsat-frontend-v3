import { TestBed } from '@angular/core/testing';

import { HistoricalShiftAssignmentHttpService } from './http.service';

describe('HistoricalShiftAssignmentHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HistoricalShiftAssignmentHttpService = TestBed.get(HistoricalShiftAssignmentHttpService);
    expect(service).toBeTruthy();
  });
});
