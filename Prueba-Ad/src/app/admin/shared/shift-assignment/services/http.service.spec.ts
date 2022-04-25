import { TestBed } from '@angular/core/testing';

import { SharedShiftAssignmentDetailsHttpService } from './http.service';

describe('ShiftAssignmentHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedShiftAssignmentDetailsHttpService = TestBed.get(SharedShiftAssignmentDetailsHttpService);
    expect(service).toBeTruthy();
  });
});
