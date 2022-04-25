import { TestBed } from '@angular/core/testing';

import { TableauEnturnamientoHttpService } from './http.service';

describe('TableauEnturnamientoHttpService', () => {
  let service: TableauEnturnamientoHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableauEnturnamientoHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
