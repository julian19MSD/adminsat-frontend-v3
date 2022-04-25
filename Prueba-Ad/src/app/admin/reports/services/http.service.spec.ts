import { TestBed } from '@angular/core/testing';

import { ReportsHttpService } from './http.service';

describe('ReportsHttpService', () => {
  let service: ReportsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
