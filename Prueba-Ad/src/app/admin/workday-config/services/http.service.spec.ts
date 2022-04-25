import { TestBed } from '@angular/core/testing';

import { WorkdayConfigHttpService } from './http.service';

describe('WorkdayConfigHttpService', () => {
  let service: WorkdayConfigHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkdayConfigHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
