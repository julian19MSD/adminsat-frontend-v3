import { TestBed } from '@angular/core/testing';

import { AlarmsHttpService } from './http.service';

describe('AlarmsHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlarmsHttpService = TestBed.get(AlarmsHttpService);
    expect(service).toBeTruthy();
  });
});
