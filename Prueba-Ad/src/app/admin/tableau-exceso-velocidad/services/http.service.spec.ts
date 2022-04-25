import { TestBed } from '@angular/core/testing';

import { TableauExcesoVelocidadHttpService } from './http.service';

describe('TableauExcesoVelocidadHttpService', () => {
  let service: TableauExcesoVelocidadHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableauExcesoVelocidadHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
