import { TestBed } from '@angular/core/testing';

import { TableauFlotaTotalHttpService } from './http.service';

describe('TableauFlotaTotalHttpService', () => {
  let service: TableauFlotaTotalHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableauFlotaTotalHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
