import { TestBed } from '@angular/core/testing';

import { TableauJornadaLaboralHttpService } from './http.service';

describe('TableauJornadaLaboralHttpService', () => {
  let service: TableauJornadaLaboralHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableauJornadaLaboralHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
