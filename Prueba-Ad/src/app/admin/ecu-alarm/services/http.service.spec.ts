import { TestBed } from '@angular/core/testing';

import { EcuAlarmHttpService } from './http.service';

describe('EcuAlarmHttpService', () => {
  let service: EcuAlarmHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcuAlarmHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
