import { TestBed } from '@angular/core/testing';

import { DashboardHttpService } from './http.service';

describe('TasksHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardHttpService = TestBed.get(DashboardHttpService);
    expect(service).toBeTruthy();
  });
});
