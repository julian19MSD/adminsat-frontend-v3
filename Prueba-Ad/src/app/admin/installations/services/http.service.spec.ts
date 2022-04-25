import { TestBed } from '@angular/core/testing';

import { InstallationsHttpService } from './http.service';

describe('InstallationsHttpService', () => {
  let service: InstallationsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstallationsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
