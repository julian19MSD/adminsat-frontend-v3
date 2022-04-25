import { TestBed } from '@angular/core/testing';

import { OpenedSessionsHttpService } from './http.service';

describe('AlarmsHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpenedSessionsHttpService = TestBed.get(OpenedSessionsHttpService);
    expect(service).toBeTruthy();
  });
});
