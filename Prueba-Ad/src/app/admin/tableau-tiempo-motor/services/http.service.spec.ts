import { TestBed } from '@angular/core/testing';

import { TableauTiempoMotorHttpService } from './http.service';

describe('TableauTiempoMotorHttpService', () => {
  let service: TableauTiempoMotorHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableauTiempoMotorHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
