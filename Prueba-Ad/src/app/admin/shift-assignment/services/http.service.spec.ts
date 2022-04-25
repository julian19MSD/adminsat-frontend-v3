import { TestBed } from '@angular/core/testing';

import { ShiftAssignmentHttpService } from './http.service';

describe('ShiftAssignmentHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShiftAssignmentHttpService = TestBed.get(ShiftAssignmentHttpService);
    expect(service).toBeTruthy();
  });
});
