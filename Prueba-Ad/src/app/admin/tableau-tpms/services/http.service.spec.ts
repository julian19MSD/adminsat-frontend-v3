import { TestBed } from '@angular/core/testing';

import { TableauTPMSHttpService } from './http.service';

describe('TableauTPMSHttpService', () => {
  let service: TableauTPMSHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableauTPMSHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
