import { TestBed } from '@angular/core/testing';

import { SharedTpmsHttpService } from './http.service';

describe('SharedTpmsHttpService', () => {
  let service: SharedTpmsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedTpmsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
